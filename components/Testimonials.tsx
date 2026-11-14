"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Quote, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { projects } from "@/data/projects";
import { TESTIMONIALS } from "@/data/testimonials";
import { useReducedMotion } from "@/lib/capabilities";
import { fmt, useT } from "@/messages";

// Only facts derivable from data/projects.ts (no self-reported percentages or ratings).
const METRICS = [
  {
    key: "live",
    value: projects.filter((p) => p.category === "commercial" && p.platform === "web").length,
  },
  { key: "design", value: projects.filter((p) => p.category === "interface-design").length },
  { key: "total", value: projects.length },
] as const;

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
      className={`relative flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-zinc-900 font-display font-bold tracking-wide text-emerald-300`}
    >
      {src ? <Image src={src} alt="" fill sizes="48px" className="object-cover" /> : initials(name)}
    </span>
  );
}

export default function Testimonials({ avatars = {} }: { avatars?: Record<string, string> }) {
  const { lang } = useApp();
  const t = useT();
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];

  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-14 flex flex-col justify-between gap-8 border-b border-line pb-10 lg:flex-row lg:items-end"
          data-reveal
        >
          <div>
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
          <figure
            className="relative flex flex-col justify-between overflow-hidden rounded-stage border border-line bg-surface-1/85 p-8 shadow-elev-2 backdrop-blur-xl sm:p-10 lg:col-span-7 lg:p-12"
            data-reveal
          >
            <Quote
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rotate-12 text-ink/[0.05]"
            />
            {active.badge?.confirmed && (
              <span className="relative mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-fill/35 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{active.badge[lang]}</span>
              </span>
            )}

            <div className="relative" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: reduced ? 0 : 0.28, ease: "easeOut" }}
                  className="font-serif text-xl italic leading-relaxed text-ink sm:text-2xl lg:text-[1.65rem]"
                >
                  &ldquo;{active.content[lang]}&rdquo;
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
                <span className="rounded-control border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-muted">
                  {active.impactMetric[lang]}
                </span>
                {active.projectUrl && (
                  <a
                    href={active.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${fmt(t.testimonials.visit, { name: active.name[lang] })} ${t.common.newTab}`}
                    className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-control border border-line bg-surface-1 text-ink transition-colors hover:border-accent-fill hover:text-accent"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </span>
            </figcaption>
          </figure>

          <ul
            aria-label={t.testimonials.listAria}
            className="flex flex-col divide-y divide-line overflow-hidden rounded-stage border border-line bg-surface-1/80 shadow-elev-1 backdrop-blur-xl lg:col-span-5"
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
                    onClick={() => setActiveIndex(index)}
                    className={`cursor-can-hover group relative flex w-full flex-col gap-2.5 p-5 text-left transition-colors duration-200 sm:p-6 ${
                      selected ? "bg-surface-2/80" : "hover:bg-surface-2/50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-1 transition-colors duration-200 ${
                        selected ? "bg-accent-fill" : "bg-transparent group-hover:bg-line-strong"
                      }`}
                    />
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar name={item.name[lang]} src={avatars[item.id]} size="sm" />
                      <span className="min-w-0">
                        <span className="block truncate font-display text-sm font-bold text-ink">
                          {item.name[lang]}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">{item.role[lang]}</span>
                      </span>
                    </span>
                    <span className="line-clamp-2 text-xs leading-relaxed text-ink-muted">
                      &ldquo;{item.content[lang]}&rdquo;
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
