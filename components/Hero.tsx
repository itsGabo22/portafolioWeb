"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";

function GitHubSvg({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInSvg({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const HERO_TECH = [
  "Next.js",
  "TypeScript",
  "React",
  "Python",
  "PostgreSQL",
  "AWS",
];

export default function Hero() {
  const { lang } = useApp();
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100dvh-4rem)] w-full overflow-hidden bg-transparent py-16 sm:py-24 lg:py-28 flex items-center"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Monumental Typography & Tactile CTAs (nareshkhatri.dev aesthetic) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:col-span-7"
          >
            {/* Subtle Greeting + Verified Avatar Pill */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 pr-3 pl-1 py-1 backdrop-blur-md">
                <div className="relative h-6 w-6 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  {!imageError ? (
                    <Image
                      src="/images/avatar.jpeg"
                      alt="Gabriel Esteban Paz Guerrero"
                      fill
                      sizes="24px"
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
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {lang === "es" ? "Hola, soy" : "Hi, I am"}
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {lang === "es"
                  ? "Disponible para proyectos"
                  : "Available for projects"}
              </span>
            </div>

            {/* Monumental Solid Stacked Name (Zero gradient clichés, pure architectural weight) */}
            <h1 className="-ml-[3px] font-display text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-7xl lg:text-8xl xl:text-[6.25rem] leading-[0.9]">
              <span className="block">Gabriel</span>
              <span className="block">Esteban</span>
              <span className="block text-zinc-700 dark:text-zinc-300">
                Paz Guerrero
              </span>
            </h1>

            {/* Clean Understated Role Subtitle */}
            <p className="mt-5 font-display text-lg font-medium text-zinc-600 dark:text-zinc-400 sm:text-xl md:text-2xl">
              {lang === "es"
                ? "Desarrollador de Software Full-Stack & Fundador Tecnológico"
                : "A Full-Stack Software Developer & Tech Founder"}
            </p>

            {/* Unboxed High-Legibility Editorial Copy */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              {lang === "es" ? (
                <>
                  Construyo plataformas web de alta conversión, comercio
                  electrónico en producción e integraciones de inteligencia
                  artificial desde Pasto, Colombia. Fundador de{" "}
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    VICARDEV
                  </strong>
                  ,{" "}
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    ElectroTech Pasto
                  </strong>{" "}
                  y{" "}
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Obsidion
                  </strong>{" "}
                  — 5.º semestre de Ingeniería de Software en la UCC.
                </>
              ) : (
                <>
                  Building high-conversion web platforms, live production
                  e-commerce, and artificial intelligence integrations from
                  Pasto, Colombia. Founder of{" "}
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    VICARDEV
                  </strong>
                  ,{" "}
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    ElectroTech Pasto
                  </strong>
                  , and{" "}
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Obsidion
                  </strong>{" "}
                  — 5th-semester Software Engineering at UCC.
                </>
              )}
            </p>

            {/* Tactile CTA Cluster (matching naresh_ref Hero button layout) */}
            <div className="mt-8 flex flex-col gap-3 w-fit">
              <a
                href="/cv.pdf"
                download
                className="cursor-can-hover inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 px-7 py-3.5 text-sm font-semibold text-white dark:text-zinc-950 shadow-sm transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                <FileText className="h-4 w-4" />
                <span>{lang === "es" ? "Descargar CV" : "Resume / CV"}</span>
              </a>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#projects"
                  className="cursor-can-hover group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-5 text-sm font-medium text-zinc-900 dark:text-zinc-100 backdrop-blur-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <span>
                    {lang === "es" ? "Ver proyectos" : "View Projects"}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#contact"
                  className="cursor-can-hover inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-5 text-sm font-medium text-zinc-900 dark:text-zinc-100 backdrop-blur-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <span>{lang === "es" ? "Contratar" : "Hire Me"}</span>
                </a>

                <a
                  href="https://github.com/itsGabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub @itsGabo22"
                  className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 backdrop-blur-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <GitHubSvg className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/itsgabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Gabriel Esteban Paz Guerrero"
                  className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 backdrop-blur-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <LinkedInSvg className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Real Vector SVG Tech Stack Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {HERO_TECH.map((tech) => (
                <TechBadge key={tech} name={tech} size="xs" />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Open Spatial Stage for Interactive 3D Mechanical Keyboard */}
          <div className="pointer-events-none relative min-h-[340px] lg:col-span-5 lg:min-h-[540px]" />
        </div>

        {/* Minimalist Scroll Down Indicator */}
        <div className="mt-10 flex justify-center">
          <a
            href="#about"
            aria-label={
              lang === "es" ? "Desplazarse a Sobre mí" : "Scroll to About Me"
            }
            className="cursor-can-hover inline-flex h-10 w-6 items-start justify-center rounded-full border-2 border-zinc-400/70 dark:border-zinc-600 p-1.5 transition-colors hover:border-zinc-900 dark:hover:border-zinc-200"
          >
            <ChevronDown className="h-3 w-3 animate-bounce text-zinc-600 dark:text-zinc-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
