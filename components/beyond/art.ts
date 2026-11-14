import { artists, type MenuItem } from "@/data/personal";
import { PS5_ART } from "./ps5-art.generated";
import { BEYOND_PHOTOS } from "./photos";

export interface ResolvedArt {
  tile?: string;
  stage?: string;
  position: string;
}

/**
 * Art for a menu item: optimized drops from the ps5-art manifest first
 * (official covers, author-supplied art), then the paths in data (existing
 * credited art), else nothing (typographic fallback). With BEYOND_PHOTOS = false everything is typographic.
 */
export function artFor(item: MenuItem): ResolvedArt {
  const position = item.position ?? "50% 50%";
  if (!BEYOND_PHOTOS) return { position };
  const drop = PS5_ART[item.id];
  return {
    tile: drop?.tile ?? item.tile,
    stage: drop?.stage ?? item.stage,
    position,
  };
}

/** Photos for the playlist's 2×2 mosaic tile (three artists + one mood-coloured cell). */
export const MOSAIC_PHOTOS: { src: string; position: string }[] = artists.map((a) => ({
  src: a.photo,
  position: a.position,
}));
