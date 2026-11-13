import fs from "node:fs";
import path from "node:path";
import type { MediaManifest, ProjectMedia } from "@/data/projects";

/**
 * Server-only (runs at build/prerender time): looks for optional demo media so
 * the client never requests files that do not exist (zero 404s).
 *
 *   public/media/<project-id>/demo.webm   (preferred) or demo.mp4
 *   public/media/<project-id>/poster.webp
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");

const exists = (relative: string) => {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, relative)).isFile();
  } catch {
    return false;
  }
};

export function getMediaManifest(ids: readonly string[]): MediaManifest {
  const manifest: MediaManifest = {};
  for (const id of ids) {
    const media: ProjectMedia = {};
    const video = ["demo.webm", "demo.mp4"].find((file) => exists(`media/${id}/${file}`));
    if (video) media.video = `/media/${id}/${video}`;
    if (exists(`media/${id}/poster.webp`)) media.poster = `/media/${id}/poster.webp`;
    if (media.video || media.poster) manifest[id] = media;
  }
  return manifest;
}

/** Testimonial avatars: public/images/testimonials/<id>.(webp|jpg|png) — only returned if present. */
export function getTestimonialAvatars(ids: readonly string[]): Record<string, string> {
  const found: Record<string, string> = {};
  for (const id of ids) {
    const file = ["webp", "jpg", "png"].map((ext) => `images/testimonials/${id}.${ext}`).find(exists);
    if (file) found[id] = `/${file}`;
  }
  return found;
}
