"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { projects } from "@/data/projects";
import { TESTIMONIALS } from "@/data/testimonials";
import { useReducedMotion } from "@/lib/capabilities";
import { fmt, useT } from "@/messages";
import SectionEyebrow from "./SectionEyebrow";

// Only facts derivable from data/projects.ts (no self-reported percentages or ratings).
const METRICS = [
  {
    key: "live",
    value: projects.filter((p) => p.category === "commercial" && p.platform === "web").length,
  },
  { key: "design", value: projects.filter((p) => p.category === "interface-design").length },
  { key: "total", value: projects.length },
] as const;

const AUTO_ADVANCE_MS = 8000;

function initials(name: string): string {
  const words = name
    .replace(/[—&·]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(w));
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

/** Initials by default; a photo only when the file exists (resolved at build time). */
function Avatar({ name, src, size }: { name: string; src?: string; size: "sm" | "md" }) {
  const box = size === "md" ? "h-12 w-12 text-sm" : "h-9 w-9 text-xs";
  return (
    <span
      aria-hidden="true"
      className={`relative flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-primary-950 font-display font-bold tracking-wide text-primary-200`}
    >
      {src ? <Image src={src} alt="" fill sizes="48px" className="object-cover" /> : initials(name)}
    </span>
  );
}

export default function Testimonials({ avatars = {} }: { avatars?: Record<string, string> }) {
  const { lang } = useApp();
  const t = useT();
  const reduced = useReducedMotion();
  const count = TESTIMONIALS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // Auto-advance: off under reduced motion, paused by the button, by hover/focus
  // inside the carousel and whenever the section is off screen.
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const active = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];
  const running = !reduced && !userPaused && !hoverPaused && inView && count > 1;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setActiveIndex(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(activeIndex + 1, 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [running, activeIndex, go]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(activeIndex + 1, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(activeIndex - 1, -1);
    }
  };

  // Up to two "next" testimonials peek behind the active one for depth.
  const behind = [1, 2].filter((o) => o < count).map((o) => TESTIMONIALS[(activeIndex + o) % count]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-14 flex flex-col justify-between gap-8 border-b border-line pb-10 lg:flex-row lg:items-end"
          data-reveal
        >
          <div>
            <SectionEyebrow id="testimonials" align="start" />
            <h2 className="font-display text-[length:var(--text-h2)] font-bold leading-[var(--leading-tight)] tracking-tight text-ink">
              {t.testimonials.title}
            </h2>
          </div>
          <dl className="grid grid-cols-3 gap-6 sm:gap-10">
            {METRICS.map((metric) => (
              <div key={metric.key} className="flex flex-col-reverse justify-end border-l border-line-strong pl-3.5">
                <dt className="mt-0.5 text-xs leading-snug text-ink-muted">{t.testimonials.metrics[metric.key]}</dt>
                <dd className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Depth carousel */}
          <div
            role="region"
            aria-roledescription={t.testimonials.carouselRole}
            aria-label={t.testimonials.carouselAria}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            onFocus={() => setHoverPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverPaused(false);
            }}
            className="relative rounded-stage lg:col-span-8"
            data-reveal
          >
            {/* cards stacked behind (decorative depth) */}
            {!reduced &&
              behind.map((item, i) => (
                <div
                  key={`${item.id}-ghost`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-stage border border-line bg-surface-1/70 shadow-elev-1 backdrop-blur-xl transition-transform duration-500 ease-out-expo"
                  style={{
                    transform: `translate(${(i + 1) * 14}px, ${(i + 1) * -14}px) scale(${1 - (i + 1) * 0.035})`,
                    zIndex: -1 - i,
                    opacity: 0.6 - i * 0.25,
                  }}
                />
              ))}

            <figure className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-stage border border-line bg-surface-1 p-8 shadow-elev-3 sm:p-10 lg:p-12">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-10 select-none font-serif text-[14rem] leading-none text-primary-ink/15"
              >
                &ldquo;
              </span>

              <div className="relative flex items-center justify-between gap-4">
                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary-ink" aria-live="polite">
                  {fmt(t.testimonials.position, { i: activeIndex + 1, n: count })}
                </span>
                {active.badge?.confirmed && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-line bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-ink">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{active.badge[lang]}</span>
                  </span>
                )}
              </div>

              <div className="relative mt-8 grid flex-1 items-center">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.blockquote
                    key={active.id}
                    custom={direction}
                    initial={reduced ? false : { opacity: 0, x: direction * 40, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -40, filter: "blur(6px)" }}
                    transition={{ duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-2xl italic leading-snug tracking-tight text-ink sm:text-3xl lg:text-[2.1rem]"
                  >
                    {active.content[lang]}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <figcaption className="relative mt-8 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
                <span className="flex items-center gap-3.5">
                  <Avatar name={active.name[lang]} src={avatars[active.id]} size="md" />
                  <span>
                    <span className="block font-display text-base font-bold text-ink">{active.name[lang]}</span>
                    <span className="block text-xs text-ink-muted">{active.role[lang]}</span>
                  </span>
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="rounded-control border border-primary-line bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary-ink">
                    {active.impactMetric[lang]}
                  </span>
                  {active.projectUrl && (
                    <a
                      href={active.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${fmt(t.testimonials.visit, { name: active.name[lang] })} ${t.common.newTab}`}
                      className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-control border border-line bg-surface-1 text-ink transition-colors hover:border-primary-line hover:text-primary-ink"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </span>
              </figcaption>

              {/* auto-advance progress */}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-line/60">
                <span
                  key={`${active.id}-${running}`}
                  className="testimonial-progress block h-full origin-left bg-primary"
                  style={{
                    animationDuration: `${AUTO_ADVANCE_MS}ms`,
                    animationPlayState: running ? "running" : "paused",
                    transform: running ? undefined : "scaleX(0)",
                  }}
                />
              </span>
            </figure>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(activeIndex - 1, -1)}
                  aria-label={t.testimonials.prev}
                  className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface-1 text-ink transition-colors hover:border-primary-line hover:text-primary-ink"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(activeIndex + 1, 1)}
                  aria-label={t.testimonials.next}
                  className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface-1 text-ink transition-colors hover:border-primary-line hover:text-primary-ink"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {!reduced && count > 1 && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-pressed={userPaused}
                  className="cursor-can-hover inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface-1 px-4 text-xs font-semibold text-ink-muted transition-colors hover:text-ink"
                >
                  {userPaused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{userPaused ? t.testimonials.play : t.testimonials.pause}</span>
                </button>
              )}
            </div>
          </div>

          {/* Selector list */}
          <ul
            aria-label={t.testimonials.listAria}
            className="flex flex-col gap-2 lg:col-span-4"
            data-reveal
            style={{ "--reveal-i": 1 } as React.CSSProperties}
          >
            {TESTIMONIALS.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <li key={item.id} className="flex flex-1">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => go(index, index >= activeIndex ? 1 : -1)}
                    className={`cursor-can-hover group relative flex w-full items-center gap-3 overflow-hidden rounded-card border p-4 text-left transition-[background-color,border-color,transform] duration-200 ${
                      selected
                        ? "border-primary-line bg-primary-soft"
                        : "border-line bg-surface-1/70 hover:-translate-y-0.5 hover:bg-surface-1"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`font-mono text-xs font-bold tabular-nums ${selected ? "text-primary-ink" : "text-ink-subtle"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Avatar name={item.name[lang]} src={avatars[item.id]} size="sm" />
                    <span className="min-w-0">
                      <span className="block truncate font-display text-sm font-bold text-ink">{item.name[lang]}</span>
                      <span className="block truncate text-xs text-ink-muted">{item.role[lang]}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
