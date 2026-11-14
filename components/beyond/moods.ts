import type { CSSProperties } from "react";
import type { MoodId } from "@/data/personal";

/**
 * Original mood interpretations (palette, texture, easing, type feel). They
 * evoke a general atmosphere only — no official art, logos, crests or fonts.
 * Every fg/muted/accent pair is ≥ 5.4:1 against both bg and surface (WCAG AA).
 */
export interface Mood {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  line: string;
  /** Texture layer rendered behind the panel content. */
  texture: "dots" | "grain" | "scanlines" | "sun" | "paper" | "frost" | "beams" | "fog" | "stripes";
  /** Ambient particles for the texture layer. */
  particles?: "dust" | "snow" | "embers";
  /** Easing used for this mood's transitions. */
  ease: string;
  /** Display face for headings inside the mood. */
  face: "display" | "serif" | "mono";
  /** Letter-case / tracking feel. */
  caps: boolean;
}

export const MOODS: Record<MoodId, Mood> = {
  base: {
    bg: "#0b1210", surface: "#13201c", fg: "#ecfdf5", muted: "#a7c4b8", accent: "#34d399", accent2: "#6366f1", line: "#24443a",
    texture: "dots", ease: "cubic-bezier(0.16, 1, 0.3, 1)", face: "display", caps: false,
  },
  joji: {
    bg: "#14112b", surface: "#1f1a45", fg: "#f3eefe", muted: "#c9bff0", accent: "#ff5ad9", accent2: "#6c5ce7", line: "#33295f",
    texture: "grain", ease: "cubic-bezier(0.45, 0, 0.2, 1)", face: "display", caps: false,
  },
  radiohead: {
    bg: "#0d0d0d", surface: "#1a1a1a", fg: "#f2f2f2", muted: "#bdbdbd", accent: "#ff5a2e", accent2: "#f2f2f2", line: "#3a3a3a",
    texture: "scanlines", ease: "steps(6, end)", face: "mono", caps: true,
  },
  macdemarco: {
    bg: "#fff4d6", surface: "#ffeab3", fg: "#2b2111", muted: "#5c4a26", accent: "#9a4507", accent2: "#2f7d6d", line: "#e2c886",
    texture: "sun", ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", face: "display", caps: false,
  },
  rdr2: {
    bg: "#2a1d12", surface: "#3a2918", fg: "#f4e7d0", muted: "#d9c7a6", accent: "#e8ad62", accent2: "#a3442c", line: "#5d4429",
    texture: "paper", particles: "dust", ease: "cubic-bezier(0.65, 0, 0.35, 1)", face: "serif", caps: true,
  },
  skyrim: {
    bg: "#0f1a24", surface: "#182837", fg: "#eaf3fa", muted: "#b8ccdb", accent: "#9ccbee", accent2: "#dfe9f1", line: "#2c4358",
    texture: "frost", particles: "snow", ease: "cubic-bezier(0.16, 1, 0.3, 1)", face: "display", caps: true,
  },
  eldenring: {
    bg: "#0b0a08", surface: "#18150e", fg: "#f5ecd6", muted: "#cfc2a2", accent: "#d9b65c", accent2: "#8a6d2b", line: "#3b3120",
    texture: "beams", particles: "embers", ease: "cubic-bezier(0.45, 0, 0.2, 1)", face: "serif", caps: false,
  },
  bloodborne: {
    bg: "#1a0709", surface: "#2a0d11", fg: "#f1e6e6", muted: "#d2bcbc", accent: "#ea7880", accent2: "#8e8a8a", line: "#4d1d22",
    texture: "fog", ease: "cubic-bezier(0.45, 0, 0.2, 1)", face: "serif", caps: false,
  },
  barca: {
    bg: "#0a1630", surface: "#13255a", fg: "#ffffff", muted: "#cdd7ee", accent: "#ffd23f", accent2: "#a50044", line: "#2a3f78",
    texture: "dots", ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", face: "display", caps: true,
  },
};

/** CSS custom properties for a mood (consumed by the registered --mood-* properties). */
export function moodStyle(id: MoodId): CSSProperties {
  const m = MOODS[id] ?? MOODS.base;
  return {
    "--mood-bg": m.bg,
    "--mood-surface": m.surface,
    "--mood-fg": m.fg,
    "--mood-muted": m.muted,
    "--mood-accent": m.accent,
    "--mood-accent-2": m.accent2,
    "--mood-line": m.line,
    "--mood-ease": m.ease,
  } as CSSProperties;
}

export const FACE_CLASS: Record<Mood["face"], string> = {
  display: "font-display",
  serif: "font-serif",
  mono: "font-mono",
};
