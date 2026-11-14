"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { MediaManifest, Project } from "@/data/projects";
import { useApp } from "@/context/AppContext";
import { useLabMode } from "@/lib/capabilities";
import { fmt, useT } from "@/messages";
import { StatusBadge } from "../projects/ProjectBits";
import DeviceMockups2D from "./DeviceMockups2D";
import DevicePanel from "./DevicePanel";
import { DEVICE_KIND, type LabItem, type ScreenCopy } from "./shared";

function LabLoader() {
  const t = useT();
  return (
    <div role="status" className="flex h-full w-full flex-col items-center justify-center gap-3">
      <span className="text-sm font-medium text-ink-muted">{t.deviceLab.loading}</span>
      <span className="block h-1 w-40 overflow-hidden rounded-full bg-surface-2">
        <span className="progress-indeterminate block h-full w-1/3 rounded-full bg-accent-fill" />
      </span>
    </div>
  );
}

const DeviceLabScene = dynamic(() => import("./DeviceLabScene"), {
  ssr: false,
  loading: () => <LabLoader />,
});

export default function DeviceLab({
  projects,
  media,
}: {
  projects: Project[];
  media: MediaManifest;
}) {
  const { lang } = useApp();
  const t = useT();
  const mode = useLabMode();

  const items: LabItem[] = useMemo(
    () =>
      projects
        .filter((p): p is Project & { id: keyof typeof DEVICE_KIND } => p.id in DEVICE_KIND)
        .map((project) => ({ project, kind: DEVICE_KIND[project.id], media: media[project.id] })),
    [projects, media]
  );

  const copies: ScreenCopy[] = useMemo(
    () =>
      items.map(({ project }) => ({
        title: project.title[lang].split(" — ")[0],
        platform: t.deviceLab.platform[project.platform ?? "web"],
        headline:
          project.status === "in-progress" ? t.deviceLab.screen.inDevelopment : t.deviceLab.screen.comingSoon,
        note: project.status === "in-progress" ? t.deviceLab.screen.inDevelopmentNote : "",
        inProgress: project.status === "in-progress",
      })),
    [items, lang, t]
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Load the 3D chunk only when the lab approaches the viewport; render only while visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );
    const viewObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    nearObserver.observe(el);
    viewObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  // Scroll-driven tour (3D only): the stage is sticky inside a tall track and
  // ScrollTrigger maps the track's progress to the camera position.
  useEffect(() => {
    const track = trackRef.current;
    if (mode !== "3d" || !track) return;
    let cancelled = false;
    let trigger: { kill: () => void } | null = null;
    // GSAP + ScrollTrigger load with the 3D tour only (kept out of the first load).
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const last = items.length - 1;
      trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top+=72",
        end: "bottom bottom",
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const index = Math.round(self.progress * last);
          setActive((prev) => (prev === index ? prev : index));
        },
      });
    });
    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [mode, items.length]);

  const scrollToDevice = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (mode !== "3d" || !track) {
        setActive(index);
        return;
      }
      const rect = track.getBoundingClientRect();
      const top = window.scrollY + rect.top - 72;
      const span = track.offsetHeight - (window.innerHeight - 72);
      window.scrollTo({ top: top + (span * index) / Math.max(1, items.length - 1), behavior: "smooth" });
    },
    [mode, items.length]
  );

  const open = useCallback((index: number, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    setOpenIndex(null);
    const trigger = triggerRef.current;
    window.requestAnimationFrame(() => trigger?.focus());
  }, []);

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeItem = items[active] ?? items[0];
  const reduced = mode === "static";

  const header = (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" data-reveal>
      <div>
        <h4 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">{t.deviceLab.title}</h4>
        <p className="mt-1 max-w-xl text-sm text-ink-muted">{t.deviceLab.subtitle}</p>
      </div>
      {reduced && <p className="text-xs text-ink-subtle">{t.deviceLab.reducedNote}</p>}
    </div>
  );

  const panel =
    openIndex !== null && items[openIndex] ? (
      <DevicePanel item={items[openIndex]} reducedMotion={reduced} onClose={close} />
    ) : null;

  if (mode !== "3d") {
    return (
      <div ref={rootRef} className="mb-12" data-lab-mode={mode}>
        {header}
        {mode === "pending" ? (
          <div className="aspect-[2/1] w-full rounded-stage border border-line bg-surface-1/60 sm:aspect-[4/1]" />
        ) : (
          <DeviceMockups2D items={items} onOpen={open} />
        )}
        {panel}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="mb-12" data-lab-mode="3d">
      {header}
      <div ref={trackRef} className="relative" style={{ height: `calc(100dvh + ${items.length - 1} * 55dvh)` }}>
        <div className="sticky top-[72px] grid h-[calc(100dvh-88px)] max-h-[820px] grid-cols-12 gap-4 overflow-hidden rounded-stage border border-line bg-gradient-to-b from-zinc-100/90 to-zinc-200/60 shadow-elev-2 dark:from-zinc-900/90 dark:to-zinc-950/90">
          <div className="relative col-span-8" aria-hidden="true" data-interactive>
            {near && (
              <DeviceLabScene
                items={items}
                copies={copies}
                progressRef={progressRef}
                focusIndex={focusIndex}
                activeIndex={active}
                playing={inView}
                onSelect={(index) => open(index, chipRefs.current[index])}
                onHover={() => {}}
              />
            )}
          </div>

          <div className="col-span-4 flex min-h-0 flex-col justify-between gap-4 overflow-y-auto border-l border-line bg-surface-1/70 p-5 backdrop-blur-xl lg:p-6">
            <div aria-live="polite">
              <p className="text-xs font-semibold text-ink-subtle">
                {fmt(t.deviceLab.progress, { current: active + 1, total: items.length })}
              </p>
              <h5 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
                {activeItem.project.title[lang].split(" — ")[0]}
              </h5>
              <p className="mt-1 text-sm text-ink-muted">{t.deviceLab.platform[activeItem.project.platform ?? "web"]}</p>
              {activeItem.project.status && (
                <div className="mt-3">
                  <StatusBadge status={activeItem.project.status} />
                </div>
              )}
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                {activeItem.project.description[lang]}
              </p>
            </div>

            <ul className="flex flex-col gap-1.5" aria-label={t.deviceLab.devicesAria}>
              {items.map((item, index) => {
                const selected = index === active;
                return (
                  <li key={item.project.id}>
                    <button
                      ref={(el) => {
                        chipRefs.current[index] = el;
                      }}
                      type="button"
                      aria-current={selected ? "true" : undefined}
                      aria-label={fmt(t.deviceLab.openDetails, { title: item.project.title[lang] })}
                      onFocus={() => setFocusIndex(index)}
                      onBlur={() => setFocusIndex(null)}
                      onMouseEnter={() => setFocusIndex(index)}
                      onMouseLeave={() => setFocusIndex(null)}
                      onClick={(event) => {
                        scrollToDevice(index);
                        open(index, event.currentTarget);
                      }}
                      className={`cursor-can-hover flex min-h-11 w-full items-center justify-between gap-3 rounded-control border px-3.5 py-2.5 text-left text-sm font-semibold transition-[background-color,border-color,color] duration-200 ${
                        selected
                          ? "border-accent-fill/50 bg-accent-soft text-ink"
                          : "border-line bg-surface-1/70 text-ink-muted hover:border-line-strong hover:text-ink"
                      }`}
                    >
                      <span className="truncate">{item.project.title[lang].split(" — ")[0]}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {panel}
    </div>
  );
}
