import Image from "next/image";
import { ListMusic } from "lucide-react";
import type { MenuItem } from "@/data/personal";
import { artFor, MOSAIC_PHOTOS } from "./art";
import { FACE_CLASS, MOODS, moodStyle } from "./moods";
import { BEYOND_PHOTOS } from "./photos";

const TILE_SIZES = "(max-width: 767px) 112px, 128px";

/** Square cover for a menu item: art, 2×2 mosaic, club colours or typographic fallback. Decorative. */
export default function Tile({ item, title }: { item: MenuItem; title: string }) {
  const art = artFor(item);
  const mood = MOODS[item.mood];

  if (art.tile) {
    return (
      <Image
        src={art.tile}
        alt=""
        fill
        sizes={TILE_SIZES}
        className="object-cover"
        style={{ objectPosition: item.tile === item.stage ? art.position : "50% 50%" }}
      />
    );
  }

  if (item.cover === "mosaic" && BEYOND_PHOTOS) {
    return (
      <span className="ps-mosaic" style={moodStyle(item.mood)}>
        {MOSAIC_PHOTOS.map((photo) => (
          <span key={photo.src} className="relative">
            <Image src={photo.src} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: photo.position }} />
          </span>
        ))}
        <span className="ps-mosaic-cell">
          <ListMusic className="h-1/2 w-1/2" aria-hidden="true" />
        </span>
      </span>
    );
  }

  return (
    <span className="ps-tile-type" data-art={item.cover === "club" ? "club" : "mood"} style={moodStyle(item.mood)}>
      {item.cover !== "club" && <span className="bx-texture" data-texture={mood.texture} />}
      <span className={`ps-tile-mono ${FACE_CLASS[mood.face]}`} aria-hidden="true">
        {title.trim().charAt(0).toUpperCase()}
      </span>
      <span className={`ps-tile-type-title ${FACE_CLASS[mood.face]} ${mood.caps ? "uppercase" : ""}`}>{title}</span>
    </span>
  );
}
