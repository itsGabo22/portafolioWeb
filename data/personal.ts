import type { BilingualText } from "./projects";

/**
 * Personal data for the "Fuera del código" section. Only facts Gabo provided.
 * Optional `note` fields are intentionally empty: they stay hidden until Gabo
 * writes them, e.g. `note: { es: "…", en: "…" }`.
 */

export type MoodId =
  | "base"
  | "joji"
  | "radiohead"
  | "macdemarco"
  | "rdr2"
  | "skyrim"
  | "eldenring"
  | "bloodborne"
  | "barca";

export interface Playlist {
  name: string;
  /** Public playlist URL (tracking params stripped). */
  url: string;
  /** Embed URL, only requested after the visitor presses Play. */
  embedUrl: string;
  trackCount: number;
  isPublic: boolean;
}

export interface Artist {
  id: MoodId;
  name: string;
  spotifyUrl: string;
  note?: BilingualText;
}

export interface Game {
  id: MoodId;
  title: string;
  note?: BilingualText;
}

export interface Club {
  id: MoodId;
  name: string;
  /** Club colours, used as plain colour only (no crest, no sponsor or kit logos). */
  colors: { primary: string; secondary: string };
  note?: BilingualText;
}

export const playlist: Playlist = {
  name: "git statüs",
  url: "https://open.spotify.com/playlist/2OnPAr6iXT6nBWShBzmjqG",
  embedUrl: "https://open.spotify.com/embed/playlist/2OnPAr6iXT6nBWShBzmjqG?utm_source=generator&theme=0",
  trackCount: 48,
  isPublic: true,
};

export const artists: Artist[] = [
  { id: "joji", name: "Joji", spotifyUrl: "https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq" },
  { id: "radiohead", name: "Radiohead", spotifyUrl: "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb" },
  { id: "macdemarco", name: "Mac DeMarco", spotifyUrl: "https://open.spotify.com/artist/3Sz7ZnJQBIHsXLUSo0OQtM" },
];

export const games: Game[] = [
  { id: "rdr2", title: "Red Dead Redemption 2" },
  { id: "skyrim", title: "Skyrim" },
  { id: "eldenring", title: "Elden Ring" },
  { id: "bloodborne", title: "Bloodborne" },
];

export const club: Club = {
  id: "barca",
  name: "FC Barcelona",
  colors: { primary: "#004D98", secondary: "#A50044" },
};
