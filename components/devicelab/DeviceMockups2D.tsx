"use client";

import { useEffect, useRef } from "react";
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
    outer: "mx-auto aspect-[9/19] w-[46%] rounded-[1.6rem] border-[7px] border-zinc-800 bg-zinc-900 shadow-elev-3",
    screen: "h-full w-full overflow-hidden rounded-[1.1rem]",
  },
  laptop: {
    outer: "mx-auto aspect-[16/10] w-[92%] rounded-t-xl border-[7px] border-b-[10px] border-zinc-800 bg-zinc-900 shadow-elev-3",
    screen: "h-full w-full overflow-hidden rounded-sm",
  },
  monitor: {
    outer: "mx-auto aspect-[16/9] w-[92%] rounded-lg border-[7px] border-zinc-800 bg-zinc-900 shadow-elev-3",
    screen: "h-full w-full overflow-hidden rounded-sm",
  },
};

function DeviceFrame({ item }: { item: LabItem }) {
  const frame = FRAME[item.kind];
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
        <span aria-hidden="true" className="mx-auto h-2.5 w-full rounded-b-xl bg-zinc-700" />
      )}
      {item.kind === "monitor" && (
        <>
          <span aria-hidden="true" className="mx-auto h-6 w-[10%] bg-zinc-800" />
          <span aria-hidden="true" className="mx-auto h-2 w-[38%] rounded-full bg-zinc-700" />
        </>
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
