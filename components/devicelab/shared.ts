import type { DeviceLabId, Project, ProjectMedia } from "@/data/projects";

export type DeviceKind = "watch" | "phone" | "laptop" | "monitor";

export const DEVICE_KIND: Record<DeviceLabId, DeviceKind> = {
  "wgo-smartwatch": "watch",
  "gamerbox-ai": "phone",
  "ocioflex-desktop": "laptop",
  "nexo-protocolo-sombra": "monitor",
};

/** Screen size in canvas pixels for each device (keeps the placeholder art crisp). */
export const SCREEN_PX: Record<DeviceKind, [number, number]> = {
  watch: [512, 512],
  phone: [480, 1000],
  laptop: [1024, 640],
  monitor: [1024, 576],
};

export interface LabItem {
  project: Project;
  kind: DeviceKind;
  media?: ProjectMedia;
}

export interface ScreenCopy {
  title: string;
  platform: string;
  headline: string;
  note: string;
  inProgress: boolean;
}

/**
 * Honest placeholder screen drawn into a 2D canvas (used as a 3D texture):
 * finished projects say "video coming soon", in-progress ones say "in development".
 * No fake UI footage is ever drawn.
 */
export function drawPlaceholderScreen(
  canvas: HTMLCanvasElement,
  kind: DeviceKind,
  copy: ScreenCopy
) {
  const [w, h] = SCREEN_PX[kind];
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0b1210");
  bg.addColorStop(1, "#111827");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // dot grid
  ctx.fillStyle = "rgba(52, 211, 153, 0.14)";
  const step = Math.round(Math.min(w, h) / 18);
  for (let x = step / 2; x < w; x += step) {
    for (let y = step / 2; y < h; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const unit = Math.min(w, h);
  const cx = w / 2;
  const accent = copy.inProgress ? "#fbbf24" : "#34d399";

  if (copy.inProgress) {
    // hazard band
    const bandH = unit * 0.06;
    const bandY = h * 0.3;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, bandY, w, bandH);
    ctx.clip();
    ctx.fillStyle = "#1f1a0b";
    ctx.fillRect(0, bandY, w, bandH);
    ctx.fillStyle = "rgba(251, 191, 36, 0.55)";
    for (let x = -bandH; x < w + bandH; x += bandH * 1.4) {
      ctx.beginPath();
      ctx.moveTo(x, bandY + bandH);
      ctx.lineTo(x + bandH * 0.7, bandY);
      ctx.lineTo(x + bandH * 1.2, bandY);
      ctx.lineTo(x + bandH * 0.5, bandY + bandH);
      ctx.fill();
    }
    ctx.restore();
  } else {
    // outlined play glyph
    const r = unit * 0.11;
    const cy = h * 0.36;
    ctx.lineWidth = Math.max(3, unit * 0.012);
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.32, cy - r * 0.45);
    ctx.lineTo(cx + r * 0.5, cy);
    ctx.lineTo(cx - r * 0.32, cy + r * 0.45);
    ctx.closePath();
    ctx.fill();
  }

  const font = (size: number, weight: number) =>
    `${weight} ${Math.round(size)}px "IBM Plex Sans", "Segoe UI", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const wrap = (text: string, maxWidth: number) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const maxW = w * (kind === "watch" ? 0.66 : 0.82);
  let y = h * (kind === "phone" ? 0.5 : 0.56);

  ctx.fillStyle = accent;
  ctx.font = font(unit * 0.075, 700);
  for (const line of wrap(copy.headline, maxW)) {
    ctx.fillText(line, cx, y);
    y += unit * 0.09;
  }

  ctx.fillStyle = "#e4e4e7";
  ctx.font = font(unit * 0.05, 600);
  y += unit * 0.02;
  for (const line of wrap(copy.title, maxW)) {
    ctx.fillText(line, cx, y);
    y += unit * 0.065;
  }

  ctx.fillStyle = "#a1a1aa";
  ctx.font = font(unit * 0.04, 500);
  ctx.fillText(copy.platform, cx, y + unit * 0.02);

  if (copy.note && kind !== "watch") {
    ctx.font = font(unit * 0.036, 400);
    y += unit * 0.1;
    for (const line of wrap(copy.note, maxW)) {
      ctx.fillText(line, cx, y);
      y += unit * 0.05;
    }
  }
}
