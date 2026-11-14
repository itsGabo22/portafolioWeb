"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { useT } from "@/messages";
import { GitHubIcon, LinkedInIcon } from "./icons";
import Rich from "./Rich";
import TechBadge from "./TechBadge";
import HeroParticleName from "./HeroParticleName";

const HERO_TECH = [
  "Next.js",
  "TypeScript",
  "React",
  "Python",
  "PostgreSQL",
  "AWS",
];

function usePastoClock() {
  const [timeStr, setTimeStr] = useState<string>("UTC-5");

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("es-CO", {
          timeZone: "America/Bogota",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setTimeStr(`${formatted} UTC-5`);
      } catch {
        setTimeStr("UTC-5");
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(timer);
  }, []);

  return timeStr;
}

export default function Hero() {
  const t = useT();
  const [imageError, setImageError] = useState(false);
  const pastoTime = usePastoClock();

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100dvh-4rem)] w-full overflow-hidden bg-transparent py-14 sm:py-20 lg:py-24 flex items-center"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Bespoke Telemetry Capsule, Particle-Dust Dual Typography & Tactile CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:col-span-7"
          >
            {/* Bespoke Multi-Segment Interactive Telemetry Header Capsule with True Frosted Glass */}
            <a
              href="#about"
              className="cursor-can-hover group mb-4 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 p-1.5 pr-3.5 ring-1 ring-zinc-900/[0.06] shadow-[0_8px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-md"
            >
              {/* Left Segment: Glowing Avatar + Serif-Italic Greeting */}
              <div className="flex items-center gap-2.5 rounded-xl bg-white/75 dark:bg-zinc-800/80 pl-1.5 pr-3 py-1 transition-colors group-hover:bg-emerald-500/10">
                <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-emerald-500/70 transition-transform duration-300 group-hover:scale-110">
                  {!imageError ? (
                    <Image
                      src="/images/avatar.jpeg"
                      alt={t.hero.avatarAlt}
                      fill
                      sizes="28px"
                      priority
                      onError={() => setImageError(true)}
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-[10px] font-bold text-zinc-700 dark:text-zinc-200">
                      GP
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif italic text-xs font-medium text-primary-ink">
                    {t.hero.greeting}
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    @itsGabo22
                  </span>
                </div>
              </div>

              {/* Center Segment: Live Equalizer Waveform + Status */}
              <div className="flex items-center gap-2 px-1.5">
                <span
                  aria-hidden="true"
                  className="inline-flex h-3 items-end gap-0.5"
                >
                  <span className="w-0.5 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="w-0.5 h-3 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-0.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {t.hero.available}
                </span>
              </div>

              {/* Right Segment: Live Pasto UTC-5 Telemetry Clock */}
              <span className="hidden sm:inline-flex items-center gap-1.5 border-l border-zinc-300/70 dark:border-zinc-800 pl-2.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>Pasto, CO</span>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <span className="tabular-nums font-medium text-zinc-700 dark:text-zinc-300">
                  {pastoTime}
                </span>
              </span>
            </a>

            {/* Dual-Typography + Interactive Particle-Dust Disintegration Hero Title */}
            <HeroParticleName />

            {/* Clean Understated Role Subtitle */}
            <p className="mt-3 font-display text-lg font-medium text-zinc-700 dark:text-zinc-300 sm:text-xl md:text-2xl">
              {t.hero.role}
            </p>

            {/* Unboxed High-Legibility Editorial Copy */}
            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              <Rich text={t.hero.bio} strongClassName="font-semibold text-zinc-900 dark:text-zinc-100" />
            </p>

            {/* Tactile CTA Cluster */}
            <div className="mt-7 flex flex-col gap-3 w-fit">
              <a
                href="/cv.pdf"
                download
                className="cursor-can-hover inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-on-primary shadow-sm transition-[background-color,transform,box-shadow] duration-150 hover:bg-primary-strong hover:shadow-glow active:scale-[0.98]"
              >
                <FileText className="h-4 w-4" />
                <span>{t.hero.downloadCv}</span>
              </a>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#projects"
                  className="cursor-can-hover group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 px-5 text-sm font-medium text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-[background-color,transform] duration-150 hover:bg-white/80 active:scale-[0.97] dark:hover:bg-zinc-800"
                >
                  <span>{t.hero.viewProjects}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#contact"
                  className="cursor-can-hover inline-flex h-11 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 px-5 text-sm font-medium text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-[background-color,transform] duration-150 hover:bg-white/80 active:scale-[0.97] dark:hover:bg-zinc-800"
                >
                  <span>{t.hero.hire}</span>
                </a>

                <a
                  href="https://github.com/itsGabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.common.githubAria} ${t.common.newTab}`}
                  className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-900/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-[background-color,transform] duration-150 hover:bg-white/80 active:scale-[0.97] dark:hover:bg-zinc-800"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/itsgabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.common.linkedinAria} ${t.common.newTab}`}
                  className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-900/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-[background-color,transform] duration-150 hover:bg-white/80 active:scale-[0.97] dark:hover:bg-zinc-800"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Real Vector SVG Tech Stack Badges */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {HERO_TECH.map((tech) => (
                <TechBadge key={tech} name={tech} size="xs" />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Open Spatial Stage for Interactive 3D Mechanical Keyboard */}
          <div className="pointer-events-none relative hidden lg:col-span-5 lg:block lg:min-h-[540px]" />
        </div>

        {/* Minimalist Scroll Down Indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            aria-label={t.hero.scrollAria}
            className="cursor-can-hover inline-flex h-11 w-7 items-start justify-center rounded-full border-2 border-zinc-400/70 dark:border-zinc-600 p-1.5 transition-colors hover:border-zinc-900 dark:hover:border-zinc-200"
          >
            <ChevronDown className="h-3 w-3 animate-bounce text-zinc-600 dark:text-zinc-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
