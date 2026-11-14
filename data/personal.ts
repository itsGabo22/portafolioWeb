import { projects, type BilingualText, type DeviceLabId } from "./projects";

/**
 * Personal data for the "Fuera del código" section (PS5-style home menu).
 * Only facts Gabo provided or that a cited source supports. Optional fields
 * (`note`, `supporterSince`, art) stay hidden until they have real data.
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
  | "residentevil"
  | "deathstranding"
  | "gtavi"
  | "nexo"
  | "barca";

import type { BeyondTabId } from "./beyondTabs";
export { BEYOND_TAB_IDS, type BeyondTabId } from "./beyondTabs";

/** On-console trophy figures, transcribed by Gabo from his own console (not recomputed). */
export interface Trophies {
  /** Progress % exactly as the console shows it. */
  progress: number;
  earned: number;
  total: number;
  platinum: boolean;
  gold: number;
  silver: number;
  bronze: number;
}

export type PrimaryAction =
  /** Non-interactive "Favorito" label: no fake "Play" for games that live on a console. */
  | { kind: "favorite" }
  /** Non-interactive "Próximamente" label for a game Gabo will play soon. */
  | { kind: "upcoming" }
  /** Spotify facade: the embed is only requested after an explicit click. */
  | { kind: "play"; embedUrl: string }
  /** Scroll to #projects and select this project in the Device Lab. */
  | { kind: "project"; projectId: DeviceLabId };

export interface SecondaryAction {
  href: string;
  label: BilingualText;
  external: boolean;
}

/** Small label above the stage title; strings live in messages (beyond.kicker). */
export type KickerKey =
  | "ownGame"
  | "playlist"
  | "artist"
  | "favoriteClub"
  | "favoritePlayer"
  | "match"
  | "stadium"
  | "supporter"
  | "upcoming";

export interface MenuItem {
  /** Lowercase-kebab slug; also the key in components/beyond/ps5-art.generated.ts. */
  id: string;
  title: BilingualText;
  kicker?: KickerKey;
  mood: MoodId;
  /** Existing art (exact on-disk case). When absent, the ps5-art manifest is used, then the typographic fallback. */
  tile?: string;
  stage?: string;
  /** CSS object-position for the stage crop. */
  position?: string;
  /** Tile composition when there is no tile art: 2×2 photo mosaic or club colours. */
  cover?: "mosaic" | "club";
  primaryAction: PrimaryAction;
  secondary?: SecondaryAction;
  trophies?: Trophies;
  note?: BilingualText;
}

const same = (text: string): BilingualText => ({ es: text, en: text });

export interface Playlist {
  name: string;
  /** Public playlist URL (tracking params stripped). */
  url: string;
  /** Embed URL, only requested after the visitor presses Play. */
  embedUrl: string;
  trackCount: number;
}

export interface Artist {
  id: "joji" | "radiohead" | "macdemarco";
  name: string;
  spotifyUrl: string;
  /** Credited CC photo (public/CREDITS.md). */
  photo: string;
  position: string;
}

export interface Club {
  name: string;
  /** Club colours, used as plain colour only (no crest, no sponsor or kit logos). */
  colors: { primary: string; secondary: string };
  /** "Hincha desde" — optional slot, hidden until Gabo provides the year. */
  supporterSince?: number;
}

export const playlist: Playlist = {
  name: "git statüs",
  url: "https://open.spotify.com/playlist/2OnPAr6iXT6nBWShBzmjqG",
  embedUrl: "https://open.spotify.com/embed/playlist/2OnPAr6iXT6nBWShBzmjqG?utm_source=generator&theme=0",
  trackCount: 48,
};

export const artists: Artist[] = [
  {
    id: "joji",
    name: "Joji",
    spotifyUrl: "https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq",
    photo: "/images/beyond/joji.webp",
    position: "65% 40%",
  },
  {
    id: "radiohead",
    name: "Radiohead",
    spotifyUrl: "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb",
    photo: "/images/beyond/radiohead.webp",
    position: "50% 35%",
  },
  {
    id: "macdemarco",
    name: "Mac DeMarco",
    spotifyUrl: "https://open.spotify.com/artist/3Sz7ZnJQBIHsXLUSo0OQtM",
    photo: "/images/beyond/macdemarco.webp",
    position: "45% 30%",
  },
];

export const club: Club = {
  name: "FC Barcelona",
  colors: { primary: "#004D98", secondary: "#A50044" },
};

const nexo = projects.find((p) => p.id === "nexo-protocolo-sombra");
const embedFor = (url: string) => `${url.replace("open.spotify.com/", "open.spotify.com/embed/")}?utm_source=generator&theme=0`;
const spotifyLink = (href: string): SecondaryAction => ({
  href,
  label: { es: "Abrir en Spotify", en: "Open in Spotify" },
  external: true,
});
const gamerboxLink: SecondaryAction = {
  href: "#project-gamerbox-ai",
  label: { es: "Lo que construyo con juegos: GamerBox", en: "What I build around games: GamerBox" },
  external: false,
};

/** Clásico facts verified against the club's own page (see public/CREDITS.md). */
const CLASICO_SOURCE = "https://www.fcbarcelona.com/en/club/news/4263015/travis-scott-in-the-crowd-at-montjuic";

export const beyondMenu: Record<BeyondTabId, MenuItem[]> = {
  games: [
    {
      id: "elden-ring",
      title: same("Elden Ring"),
      mood: "eldenring",
      tile: "/images/beyond/eldenring-tile.webp",
      stage: "/images/beyond/eldenring.webp",
      position: "55% 35%",
      primaryAction: { kind: "favorite" },
      secondary: gamerboxLink,
      trophies: { progress: 100, earned: 42, total: 42, platinum: true, gold: 3, silver: 14, bronze: 24 },
    },
    {
      id: "red-dead-redemption-2",
      title: same("Red Dead Redemption 2"),
      mood: "rdr2",
      tile: "/images/beyond/rdr2-tile.webp",
      stage: "/images/beyond/rdr2.webp",
      position: "60% 40%",
      primaryAction: { kind: "favorite" },
      secondary: gamerboxLink,
      trophies: { progress: 42, earned: 23, total: 52, platinum: false, gold: 1, silver: 2, bronze: 20 },
    },
    {
      id: "bloodborne",
      title: same("Bloodborne"),
      mood: "bloodborne",
      tile: "/images/beyond/bloodborne-tile.webp",
      stage: "/images/beyond/bloodborne.webp",
      position: "70% 30%",
      primaryAction: { kind: "favorite" },
      secondary: gamerboxLink,
      trophies: { progress: 40, earned: 19, total: 34, platinum: false, gold: 1, silver: 4, bronze: 14 },
    },
    {
      id: "resident-evil-requiem",
      title: same("Resident Evil Requiem"),
      mood: "residentevil",
      position: "58% 30%",
      primaryAction: { kind: "favorite" },
      secondary: gamerboxLink,
      trophies: { progress: 44, earned: 31, total: 50, platinum: false, gold: 0, silver: 0, bronze: 31 },
    },
    {
      id: "death-stranding-dc",
      title: same("Death Stranding Director's Cut"),
      mood: "deathstranding",
      position: "50% 25%",
      primaryAction: { kind: "favorite" },
      secondary: gamerboxLink,
      trophies: { progress: 62, earned: 43, total: 63, platinum: false, gold: 0, silver: 1, bronze: 42 },
    },
    {
      id: "skyrim",
      title: same("Skyrim"),
      mood: "skyrim",
      tile: "/images/beyond/skyrim-tile.webp",
      stage: "/images/beyond/skyrim.webp",
      position: "50% 45%",
      primaryAction: { kind: "favorite" },
      secondary: gamerboxLink,
    },
    {
      id: "gta-vi",
      title: same("Grand Theft Auto VI"),
      kicker: "upcoming",
      mood: "gtavi",
      position: "50% 35%",
      primaryAction: { kind: "upcoming" },
      // Date as published on Rockstar's official page (rockstargames.com/VI), checked 2026-11-14.
      note: {
        es: "Lanzamiento anunciado por Rockstar Games: 19 de noviembre de 2026.",
        en: "Release announced by Rockstar Games: November 19, 2026.",
      },
      secondary: {
        href: "https://www.rockstargames.com/VI",
        label: { es: "Página oficial", en: "Official page" },
        external: true,
      },
    },
    {
      id: "nexo-protocolo-sombra",
      title: same("Nexo: Protocolo Sombra"),
      kicker: "ownGame",
      mood: "nexo",
      primaryAction: { kind: "project", projectId: "nexo-protocolo-sombra" },
      ...(nexo?.github
        ? { secondary: { href: nexo.github, label: { es: "Ver código en GitHub", en: "View code on GitHub" }, external: true } }
        : {}),
    },
  ],
  media: [
    {
      id: "git-status",
      title: same(playlist.name),
      kicker: "playlist",
      mood: "base",
      cover: "mosaic",
      primaryAction: { kind: "play", embedUrl: playlist.embedUrl },
      secondary: spotifyLink(playlist.url),
    },
    ...artists.map<MenuItem>((artist) => ({
      id: artist.id,
      title: same(artist.name),
      kicker: "artist",
      mood: artist.id,
      tile: artist.photo,
      stage: artist.photo,
      position: artist.position,
      primaryAction: { kind: "play", embedUrl: embedFor(artist.spotifyUrl) },
      secondary: spotifyLink(artist.spotifyUrl),
    })),
  ],
  likes: [
    {
      id: "fc-barcelona",
      title: same(club.name),
      kicker: "favoriteClub",
      mood: "barca",
      position: "50% 40%",
      cover: "club",
      primaryAction: { kind: "favorite" },
    },
    {
      id: "pedri",
      title: same("Pedri"),
      kicker: "favoritePlayer",
      mood: "barca",
      position: "55% 25%",
      cover: "club",
      primaryAction: { kind: "favorite" },
    },
    {
      id: "clasico-2025-05-11",
      title: { es: "Clásico · 11 mayo 2025", en: "El Clásico · 11 May 2025" },
      kicker: "match",
      mood: "barca",
      position: "50% 60%",
      cover: "club",
      primaryAction: { kind: "favorite" },
      note: {
        es: "Barça 4–3 Real Madrid en Montjuïc. Travis Scott lo vio desde el palco y el equipo jugó con una camiseta con su logo Cactus Jack, cierre de su colaboración con Spotify y el FC Barcelona para el Clásico.",
        en: "Barça 4–3 Real Madrid at Montjuïc. Travis Scott watched from the directors' box as the team wore a shirt bearing his Cactus Jack logo, rounding off his collaboration with Spotify and FC Barcelona for the Clásico.",
      },
      secondary: { href: CLASICO_SOURCE, label: { es: "Fuente: fcbarcelona.com", en: "Source: fcbarcelona.com" }, external: true },
    },
    {
      id: "camp-nou",
      title: same("Camp Nou"),
      kicker: "stadium",
      mood: "barca",
      tile: "/images/beyond/barca.webp",
      stage: "/images/beyond/barca.webp",
      position: "50% 55%",
      primaryAction: { kind: "favorite" },
    },
    ...(club.supporterSince
      ? [
          {
            id: "hincha-desde",
            title: same(String(club.supporterSince)),
            kicker: "supporter",
            mood: "barca",
            cover: "club",
            primaryAction: { kind: "favorite" },
          } satisfies MenuItem,
        ]
      : []),
  ],
};

export const INITIAL_ITEM: Record<BeyondTabId, string> = {
  games: "elden-ring",
  media: "git-status",
  likes: "fc-barcelona",
};

/**
 * Build-time integrity check (runs on the server during `next build` prerender
 * and in dev): earned must equal platinum + gold + silver + bronze. A mismatch
 * fails the build instead of shipping wrong numbers. Progress is never recomputed.
 */
export function trophyMismatches(menu: Record<BeyondTabId, MenuItem[]> = beyondMenu): string[] {
  return Object.values(menu)
    .flat()
    .filter((item): item is MenuItem & { trophies: Trophies } => Boolean(item.trophies))
    .filter(({ trophies: t }) => t.earned !== (t.platinum ? 1 : 0) + t.gold + t.silver + t.bronze || t.earned > t.total)
    .map(({ id, trophies: t }) => `${id}: earned ${t.earned} ≠ ${t.platinum ? 1 : 0}+${t.gold}+${t.silver}+${t.bronze}`);
}
if (typeof window === "undefined") {
  const bad = trophyMismatches();
  if (bad.length) throw new Error(`Trophy data mismatch — ${bad.join("; ")}`);
}
