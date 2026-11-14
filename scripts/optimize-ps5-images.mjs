#!/usr/bin/env node
/**
 * PS5-style menu art pipeline (npm run ps5:images).
 *
 * Input : assets-src/ps5Menu/<slug>.(jpg|jpeg|png|webp)   — raw drops, untracked (.git/info/exclude)
 *         assets-src/ps5Menu/<slug>.tile.(…)            — optional separate source for the square cover
 * Output: public/images/ps5Menu/<slug>-stage.webp          — ≤ 2400 px wide, q≈78, target ≤ 250 KB
 *         public/images/ps5Menu/<slug>-tile.webp           — square crop (attention focus) ≤ 600 px, target ≤ 60 KB
 *         components/beyond/ps5-art.generated.ts           — manifest of slugs that have art
 *
 * Slugs must be lowercase-kebab (Netlify builds on a case-sensitive filesystem)
 * and should match a menu item id in data/personal.ts.
 * Reproducible: same inputs → same outputs; re-run after adding, replacing or
 * removing a raw file (outputs without a raw source are pruned). Without an
 * assets-src/ps5Menu folder (e.g. a fresh clone) nothing is touched.
 */
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "assets-src", "ps5Menu");
const OUT = path.join(ROOT, "public", "images", "ps5Menu");
const MANIFEST = path.join(ROOT, "components", "beyond", "ps5-art.generated.ts");
const EXT = /\.(jpe?g|png|webp)$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const STAGE = { maxWidth: 2400, quality: 78, minQuality: 56, targetKB: 250 };
const TILE = { size: 600, quality: 78, minQuality: 50, targetKB: 60 };

const kb = (bytes) => Math.round((bytes / 1024) * 10) / 10;

/** Encode, lowering quality (then size, in 10 % integer steps down to 50 %) until the target is met. */
async function encode(make, { quality, minQuality, targetKB }, shrink) {
  let q = quality;
  let step = 0;
  for (;;) {
    const scale = 1 - step / 10;
    const buffer = await make(q, scale).webp({ quality: q, effort: 6 }).toBuffer();
    if (buffer.length <= targetKB * 1024) return { buffer, q, scale };
    if (q > minQuality) q -= 4;
    else if (shrink && step < 5) step += 1;
    else return { buffer, q, scale, overTarget: true };
  }
}

/** Menu item ids declared in data/personal.ts (for a friendly warning on unknown slugs). */
async function menuIds() {
  try {
    const src = await readFile(path.join(ROOT, "data", "personal.ts"), "utf8");
    return new Set([...src.matchAll(/\bid: "([a-z0-9-]+)"/g)].map((m) => m[1]));
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  let files;
  try {
    files = (await readdir(SRC)).filter((f) => EXT.test(f)).sort();
  } catch {
    console.log(`No ${path.relative(ROOT, SRC)} folder — nothing to do (outputs and manifest left untouched).`);
    return;
  }
  const ids = await menuIds();

  // <slug>.<ext> = stage source (also the cover when there is no separate one);
  // <slug>.tile.<ext> = square-cover source (e.g. official box art), alone or with a stage
  const sources = new Map(); // slug -> { stage?: string, tile?: string }
  for (const file of files) {
    let slug = path.basename(file, path.extname(file));
    const isTile = slug.endsWith(".tile");
    if (isTile) slug = slug.slice(0, -".tile".length);
    if (!SLUG.test(slug)) {
      console.warn(`skip ${file}: slug must be lowercase-kebab (e.g. resident-evil-requiem.jpg)`);
      continue;
    }
    const entry = sources.get(slug) ?? {};
    const key = isTile ? "tile" : "stage";
    if (entry[key]) {
      console.warn(`skip ${file}: duplicate ${key} source for "${slug}"`);
      continue;
    }
    entry[key] = path.join(SRC, file);
    sources.set(slug, entry);
  }

  const size = async (input) => {
    const meta = await sharp(input).metadata();
    // EXIF orientations 5–8 swap width and height once .rotate() applies them
    const swapped = (meta.orientation ?? 1) >= 5;
    return { meta, w: (swapped ? meta.height : meta.width) ?? 0, h: (swapped ? meta.width : meta.height) ?? 0 };
  };

  const art = {};
  const report = [];
  for (const [slug, src] of [...sources].sort(([a], [b]) => a.localeCompare(b))) {
    if (ids && !ids.has(slug)) console.warn(`note: "${slug}" is not a menu item id in data/personal.ts (art will not be shown)`);
    const entry = {};
    const row = { slug, stage: "—", tile: "—" };

    if (src.stage) {
      const { meta, w } = await size(src.stage);
      const width = Math.min(w || STAGE.maxWidth, STAGE.maxWidth);
      const stage = await encode(
        (_q, scale) => sharp(src.stage).rotate().resize({ width: Math.round(width * scale), withoutEnlargement: true }),
        STAGE,
        true
      );
      await writeFile(path.join(OUT, `${slug}-stage.webp`), stage.buffer);
      entry.stage = `/images/ps5Menu/${slug}-stage.webp`;
      row.source = `${meta.width}×${meta.height} ${kb((await stat(src.stage)).size)} KB`;
      row.stage = `${kb(stage.buffer.length)} KB (q${stage.q}${stage.scale < 1 ? `, ×${stage.scale.toFixed(1)}` : ""})${stage.overTarget ? " OVER TARGET" : ""}`;
    }

    const tileInput = src.tile ?? src.stage;
    const { w, h } = await size(tileInput);
    const tileSize = Math.min(TILE.size, w || TILE.size, h || TILE.size);
    const tile = await encode(
      (_q, scale) =>
        sharp(tileInput)
          .rotate()
          .resize(Math.round(tileSize * scale), Math.round(tileSize * scale), {
            fit: "cover",
            position: sharp.strategy.attention, // keep the salient subject in the crop
          }),
      TILE,
      true
    );
    await writeFile(path.join(OUT, `${slug}-tile.webp`), tile.buffer);
    entry.tile = `/images/ps5Menu/${slug}-tile.webp`;
    row.tile = `${kb(tile.buffer.length)} KB (q${tile.q})${src.tile ? " [.tile]" : ""}${tile.overTarget ? " OVER TARGET" : ""}`;

    art[slug] = entry;
    report.push(row);
  }

  // prune outputs whose raw source was removed or renamed
  for (const out of await readdir(OUT)) {
    const m = out.match(/^(.+)-(stage|tile)\.webp$/);
    if (m && !art[m[1]]?.[m[2]]) {
      await unlink(path.join(OUT, out));
      console.log(`pruned ${out} (no raw source)`);
    }
  }

  const slugs = Object.keys(art).sort();
  const body = slugs
    .map((s) => {
      const fields = ["stage", "tile"].filter((k) => art[s][k]).map((k) => `${k}: "${art[s][k]}"`);
      return `  "${s}": { ${fields.join(", ")} },`;
    })
    .join("\n");
  await writeFile(
    MANIFEST,
    `// GENERATED by scripts/optimize-ps5-images.mjs (npm run ps5:images) — do not edit by hand.
// Slugs with optimized art in public/images/ps5Menu/. Items without an entry use the typographic fallback.
export const PS5_ART: Readonly<Record<string, { stage?: string; tile?: string }>> = {
${body}${body ? "\n" : ""}};
`
  );
  if (report.length) console.table(report);
  console.log(`${slugs.length} slug(s) with art → ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
