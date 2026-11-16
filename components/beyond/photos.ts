import type { MoodId } from "@/data/personal";

/**
 * Real photographs behind the "Fuera del código" moods.
 *
 * TEMPORARY: enabled at the author's request for the one-week course showcase.
 * To go back to the purely procedural moods set this to `false` (and, if you
 * want, delete public/images/beyond/). Provenance in public/CREDITS.md.
 */
export const BEYOND_PHOTOS = true;

export interface MoodPhoto {
  /** Full-bleed background (1600px WebP). */
  bg: string;
  /** Square cover for the console-style games menu. */
  tile?: string;
  /** CSS object-position for the background crop. */
  position?: string;
}

export const PHOTOS: Partial<Record<MoodId, MoodPhoto>> = {
  joji: { bg: "/images/beyond/joji.webp", position: "65% 40%" },
  radiohead: { bg: "/images/beyond/radiohead.webp", position: "50% 35%" },
  macdemarco: { bg: "/images/beyond/macdemarco.webp", position: "45% 30%" },
  rdr2: { bg: "/images/beyond/rdr2.webp", tile: "/images/beyond/rdr2-tile.webp", position: "60% 40%" },
  skyrim: { bg: "/images/beyond/skyrim.webp", tile: "/images/beyond/skyrim-tile.webp", position: "50% 45%" },
  eldenring: { bg: "/images/beyond/eldenring.webp", tile: "/images/beyond/eldenring-tile.webp", position: "55% 35%" },
  bloodborne: { bg: "/images/beyond/bloodborne.webp", tile: "/images/beyond/bloodborne-tile.webp", position: "70% 30%" },
  barca: { bg: "/images/beyond/barca.webp", position: "50% 55%" },
};

export const photoFor = (id: MoodId): MoodPhoto | undefined =>
  BEYOND_PHOTOS ? PHOTOS[id] : undefined;
