"use client";

import React, { useEffect, useRef } from "react";
import { CirclePlay, Hammer } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/messages";
import { StatusBadge } from "../projects/ProjectBits";
import type { DeviceKind, LabItem } from "./shared";

/** Muted looping demo that only gets a `src` (and plays) while on screen. */
export function LazyVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.setAttribute("src", src);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className="h-full w-full object-cover"
    />
  );
}

export function ScreenContent({ item }: { item: LabItem }) {
  const { lang } = useApp();
  const t = useT();
  const { project, media } = item;
  if (media?.video) {
    return <LazyVideo src={media.video} poster={media.poster} label={project.title[lang]} />;
  }
  if (media?.poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.poster} alt="" className="h-full w-full object-cover" loading="lazy" />;
  }
  const inProgress = project.status === "in-progress";
  const Icon = inProgress ? Hammer : CirclePlay;
  return (
    <div className="bg-dot-matrix flex h-full w-full flex-col items-center justify-center gap-2 bg-[#0b1210] p-3 text-center">
      <Icon
        aria-hidden="true"
        className={`h-[18%] max-h-10 min-h-5 w-auto ${inProgress ? "text-amber-300" : "text-emerald-300"}`}
      />
      <span
        className={`text-[clamp(0.6rem,2.4vw,0.85rem)] font-bold leading-tight ${inProgress ? "text-amber-300" : "text-emerald-300"}`}
      >
        {inProgress ? t.deviceLab.screen.inDevelopment : t.deviceLab.screen.comingSoon}
      </span>
      <span className="text-[clamp(0.55rem,2vw,0.75rem)] font-medium leading-tight text-zinc-300">
        {project.title[lang].split(" — ")[0]}
      </span>
    </div>
  );
}

const FRAME: Record<DeviceKind, { outer: string; screen: string }> = {
  watch: {
    outer: "mx-auto aspect-square w-[62%] rounded-full border-[10px] border-zinc-800 bg-zinc-900 shadow-elev-3",
    screen: "h-full w-full overflow-hidden rounded-full",
  },
  phone: {
    outer: "mx-auto aspect-[9/19] w-[46%] rounded-[1.6rem] border-[7px] border-zinc-800 bg-zinc-900 shadow-elev-3 ring-1 ring-inset ring-white/10",
    screen: "h-full w-full overflow-hidden rounded-[1.1rem]",
  },
  laptop: {
    outer: "mx-auto aspect-[16/10] w-[84%] rounded-t-xl border-[6px] border-zinc-800 bg-zinc-900 shadow-elev-3",
    screen: "h-full w-full overflow-hidden rounded-sm",
  },
  monitor: {
    // slim bezel: gaming panel
    outer: "aspect-[16/9] w-full rounded-md border-[3px] border-zinc-950 bg-zinc-950 shadow-elev-3 ring-1 ring-inset ring-white/10",
    screen: "h-full w-full overflow-hidden rounded-[2px]",
  },
};

/** Original keyboard artwork: rows of keys (relative widths), drawn once as plain SVG rects. */
const DECK_ROWS: number[][] = [
  Array(14).fill(1),
  [...Array(13).fill(1), 2],
  [1.5, ...Array(12).fill(1), 1.5],
  [1.75, ...Array(11).fill(1), 2.25],
  [2.25, ...Array(10).fill(1), 2.75],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1, 1, 1],
];

function KeyRects({ x0, y0, width, height, gap = 1.2 }: { x0: number; y0: number; width: number; height: number; gap?: number }) {
  const rowH = height / DECK_ROWS.length;
  const rects: React.ReactElement[] = [];
  DECK_ROWS.forEach((row, r) => {
    const unit = width / row.reduce((a, b) => a + b, 0);
    let x = x0;
    row.forEach((w, c) => {
      rects.push(
        <rect key={`${r}-${c}`} x={x + gap / 2} y={y0 + r * rowH + gap / 2} width={Math.max(1, w * unit - gap)} height={rowH - gap} rx={1.1} />
      );
      x += w * unit;
    });
  });
  return <>{rects}</>;
}

/** Laptop base seen from slightly above: hinge, key deck, trackpad and a thick front edge. */
function LaptopDeck() {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 70" className="mx-auto -mt-px block w-[100%]">
      <defs>
        <linearGradient id="lap-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f3f46" />
          <stop offset="1" stopColor="#27272a" />
        </linearGradient>
      </defs>
      <path d="M12 0h196l12 56a6 6 0 0 1-6 7H6a6 6 0 0 1-6-7z" fill="url(#lap-base)" />
      <rect x="86" y="0" width="48" height="3.4" rx="1.7" fill="#18181b" />
      <path d="M0 56h220l-1 3a6 6 0 0 1-6 4H7a6 6 0 0 1-6-4z" fill="#18181b" opacity="0.7" />
      <rect x="22" y="7" width="176" height="35" rx="3" fill="#0b0b0f" />
      <g fill="#3a3a44">
        <KeyRects x0={25} y0={9} width={170} height={31} />
      </g>
      <rect x="86" y="46" width="48" height="12" rx="2.5" fill="#3a3a44" opacity="0.9" />
    </svg>
  );
}

/** Slim keyboard + mouse silhouettes for the gaming desk (the keys breathe in the RGB colours). */
function DeskPeripherals() {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 30" className="mx-auto mt-1 block w-[92%]">
      <rect x="0" y="9" width="160" height="21" rx="4" fill="#0a0a0d" />
      <g className="rgb-keys" fill="#52525b">
        <KeyRects x0={12} y0={12} width={100} height={15} gap={1} />
      </g>
      <rect x="128" y="11" width="13" height="18" rx="6" fill="#27272a" />
      <rect x="133" y="13" width="3" height="5" rx="1.5" className="rgb-keys" fill="#818cf8" />
    </svg>
  );
}

/** Tempered-glass tower with three RGB fan rings (CSS only). */
function GamingTower() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[1/2.05] w-[22%] shrink-0 rounded-md border border-zinc-700/80 bg-gradient-to-br from-zinc-900 to-zinc-950 p-[7%] shadow-elev-3"
    >
      <div className="absolute inset-[6%] rounded-[3px] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="flex h-full flex-col justify-around">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rgb-fan mx-auto block aspect-square w-[86%] rounded-full"
            style={{ animationDelay: `${i * -1.2}s` }}
          />
        ))}
      </div>
      <span className="rgb-glow absolute inset-x-[30%] bottom-[3%] h-[2px] rounded-full" />
    </div>
  );
}

function DeviceFrame({ item }: { item: LabItem }) {
  const frame = FRAME[item.kind];
  if (item.kind === "monitor") {
    return (
      <div className="relative flex h-full w-full flex-col justify-center gap-1">
        <div className="flex items-end justify-center gap-[3%]">
          <div className="w-[70%]">
            <div className="rgb-halo relative">
              <div className={frame.outer}>
                <div className={frame.screen}>
                  <ScreenContent item={item} />
                </div>
              </div>
              <span className="rgb-glow absolute inset-x-[30%] -bottom-[2px] h-[2px] rounded-full" />
            </div>
            {/* V stand + foot */}
            <span aria-hidden="true" className="relative mx-auto mt-0.5 block h-3 w-[26%]">
              <span className="absolute inset-y-0 left-0 w-1 origin-top -skew-x-[18deg] bg-zinc-700" />
              <span className="absolute inset-y-0 right-0 w-1 origin-top skew-x-[18deg] bg-zinc-700" />
            </span>
            <span aria-hidden="true" className="mx-auto block h-1 w-[46%] rounded-full bg-zinc-600" />
          </div>
          <GamingTower />
        </div>
        <DeskPeripherals />
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      {item.kind === "watch" && (
        <span aria-hidden="true" className="mx-auto -mb-1 h-6 w-[34%] rounded-t-lg bg-zinc-800" />
      )}
      <div className={frame.outer}>
        <div className={frame.screen}>
          <ScreenContent item={item} />
        </div>
      </div>
      {item.kind === "watch" && (
        <span aria-hidden="true" className="mx-auto -mt-1 h-6 w-[34%] rounded-b-lg bg-zinc-800" />
      )}
      {item.kind === "laptop" && (
        <div className="mx-auto w-[96%]">
          <LaptopDeck />
        </div>
      )}
    </div>
  );
}

/**
 * 2D fallback (no WebGL, small or modest devices) and the reduced-motion
 * static composition. Each device is a real button that opens the details panel.
 */
export default function DeviceMockups2D({
  items,
  onOpen,
}: {
  items: LabItem[];
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  const { lang } = useApp();
  const t = useT();
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label={t.deviceLab.devicesAria}>
      {items.map((item, index) => (
        <li key={item.project.id} className="flex">
          <button
            type="button"
            data-device-id={item.project.id}
            onClick={(event) => onOpen(index, event.currentTarget)}
            className="cursor-can-hover group flex w-full flex-col gap-3 rounded-card border border-line bg-surface-1/80 p-3 text-left shadow-elev-1 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent-fill/50 hover:shadow-glow sm:p-4"
          >
            <div
              aria-hidden="true"
              className="device-float flex aspect-square w-full items-center justify-center rounded-[calc(var(--radius-card)-0.5rem)] bg-gradient-to-b from-zinc-100 to-zinc-200/70 p-2 dark:from-zinc-900 dark:to-zinc-950"
              style={{ animationDelay: `${index * -1.1}s` }}
            >
              <DeviceFrame item={item} />
            </div>
            <span className="flex flex-col gap-1.5 px-0.5">
              <span className="font-display text-sm font-bold leading-snug text-ink sm:text-base">
                {item.project.title[lang].split(" — ")[0]}
              </span>
              <span className="text-xs text-ink-muted">{t.deviceLab.platform[item.project.platform ?? "web"]}</span>
              {item.project.status && (
                <span>
                  <StatusBadge status={item.project.status} />
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
