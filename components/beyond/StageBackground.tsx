"use client";

import Image from "next/image";
import { useState } from "react";
import { beyondMenu, type MenuItem } from "@/data/personal";
import { artFor } from "./art";
import MoodTexture from "./MoodTexture";
import { MOODS } from "./moods";

const STAGE_SIZES = "(min-width: 1280px) 1216px, 100vw";
const ALL_ITEMS = Object.values(beyondMenu).flat();

/**
 * Full-bleed art of the selected item. Mounted layers: the current one, the
 * previous one (fading out) and the immediate neighbours (opacity 0, so the
 * next move crossfades from an already-loaded image). Decorative.
 */
export default function StageBackground({ items, index, title }: { items: MenuItem[]; index: number; title: string }) {
  const current = items[index];
  const [trail, setTrail] = useState<{ current: string; previous: string | null }>({
    current: current.id,
    previous: null,
  });
  if (trail.current !== current.id) setTrail({ current: current.id, previous: trail.current });

  const wanted = new Set([
    current.id,
    trail.previous,
    items[(index - 1 + items.length) % items.length].id,
    items[(index + 1) % items.length].id,
  ]);
  // Previous item may belong to another tab: look it up across the whole menu.
  const layers = ALL_ITEMS.filter((item) => wanted.has(item.id) && artFor(item).stage);
  const hasArt = Boolean(artFor(current).stage);

  return (
    <div className="ps-bg" aria-hidden="true" data-art={hasArt}>
      <MoodTexture mood={current.mood} texture={current.cover === "club" ? "stripes" : undefined} />
      {!hasArt && (
        <span key={current.id} className="ps-bg-word">
          {title}
        </span>
      )}
      {layers.map((item) => {
        const art = artFor(item);
        return (
          <div
            key={item.id}
            className="ps-bg-layer"
            data-on={item.id === current.id}
            data-tone={MOODS[item.mood].light ? "light" : "dark"}
          >
            <Image
              src={art.stage!}
              alt=""
              fill
              sizes={STAGE_SIZES}
              quality={72}
              className="object-cover"
              style={{ objectPosition: art.position }}
            />
          </div>
        );
      })}
      <div className="ps-scrim" />
    </div>
  );
}
