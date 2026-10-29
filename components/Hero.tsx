"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  ArrowUpRight,
  Terminal,
  Cpu,
  Layers,
  MapPin,
  Code2,
  Mail,
  Keyboard,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const TECH_BADGES = [
  { label: "Next.js", category: { es: "Framework", en: "Framework" } },
  { label: "TypeScript", category: { es: "Lenguaje", en: "Language" } },
  { label: "Python", category: { es: "IA & Backend", en: "AI & Backend" } },
  { label: "AWS", category: { es: "Cloud", en: "Cloud" } },
  {
    label: { es: "5to Semestre", en: "5th Semester" },
    category: { es: "UCC Ingeniería", en: "UCC Engineering" },
  },
];

const TELEMETRY_METRICS = [
  {
    code: "ORG.01",
    name: "VICARDEV",
    role: {
      es: "Fundador & Lead Dev",
      en: "Founder & Lead Dev",
    },
  },
  {
    code: "ORG.02",
    name: "ElectroTech Pasto",
    role: {
      es: "Fundador & Director Técnico",
      en: "Founder & Tech Director",
    },
  },
  {
    code: "ORG.03",
    name: "Obsidion",
    role: {
      es: "Arquitectura IA & Automatización",
      en: "AI Architecture & Automation",
    },
  },
];

export default function Hero() {
  const { lang } = useApp();
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-transparent py-14 sm:py-20 lg:py-24 flex items-center transition-colors duration-200"
    >
      {/* Capas sutiles de fondo que permiten ver las partículas y el teclado 3D */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-55 dark:opacity-35" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Columna Izquierda: Tipografía Monumental Apilada, Identidad y CTAs (7 columnas en LG) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col items-start lg:col-span-7"
          >
            {/* Cabecera de Identidad + Avatar Verificado + Estado */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {/* Mini Avatar Verificado */}
              <div className="interactive-surface flex items-center gap-2.5 rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white/90 dark:bg-zinc-900/85 pr-3.5 pl-1.5 py-1 shadow-sm backdrop-blur-md">
                <div className="relative h-7 w-7 overflow-hidden rounded-full border border-emerald-500/50 bg-zinc-100 dark:bg-zinc-800">
                  {!imageError ? (
                    <Image
                      src="/images/avatar.jpeg"
                      alt="Gabriel Esteban Paz Guerrero"
                      fill
                      sizes="28px"
                      priority
                      onError={() => setImageError(true)}
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                      GP
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  @itsGabo22
                </span>
              </div>

              {/* Píldora de Estado del Sistema */}
              <div className="interactive-surface inline-flex flex-wrap items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/90 dark:bg-zinc-900/80 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
                  {lang === "es"
                    ? "DISPONIBLE PARA PROYECTOS"
                    : "AVAILABLE FOR PROJECTS"}
                </span>
                <span className="hidden text-zinc-300 dark:text-zinc-700 sm:inline">
                  |
                </span>
                <span className="hidden items-center gap-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 sm:inline-flex">
                  <MapPin className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                  Pasto, Colombia
                </span>
              </div>
            </div>

            {/* Etiqueta de Rol / Perfil */}
            <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 sm:text-sm">
              <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {lang === "es"
                  ? "Full-Stack Software Developer & Tech Entrepreneur | Ingeniería de Software"
                  : "Full-Stack Software Developer & Tech Entrepreneur | Software Engineering"}
              </span>
            </div>

            {/* Tipografía Monumental Apilada inspirada en nareshkhatri.dev */}
            <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[0.94]">
              <span className="block">Gabriel</span>
              <span className="block">Esteban</span>
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 dark:from-emerald-400 dark:via-teal-200 dark:to-indigo-400 bg-clip-text text-transparent">
                Paz Guerrero
              </span>
            </h1>

            {/* Pitch Profesional Bilingüe (ES por defecto / EN) */}
            <div className="interactive-surface mt-6 max-w-xl rounded-2xl border border-zinc-200/80 dark:border-zinc-800/70 bg-white/75 dark:bg-zinc-900/65 p-4 backdrop-blur-md shadow-xs">
              {lang === "es" ? (
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                  Arquitectando soluciones web escalables, automatización
                  industrial e integraciones de IA desde Pasto, Colombia.
                  Fundador de{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                    VICARDEV
                  </span>
                  ,{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-indigo-500/70 decoration-2 underline-offset-4">
                    ElectroTech Pasto
                  </span>{" "}
                  y{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                    Obsidion
                  </span>
                  , creador de productos digitales de alto rendimiento en 5.º
                  semestre de Ingeniería de Software (UCC).
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                  Architecting scalable web solutions, industrial automation,
                  and AI integrations from Pasto, Colombia. Founder of{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                    VICARDEV
                  </span>
                  ,{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-indigo-500/70 decoration-2 underline-offset-4">
                    ElectroTech Pasto
                  </span>
                  , and{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                    Obsidion
                  </span>
                  , building high-performance digital products as a
                  5th-semester Software Engineering student at UCC.
                </p>
              )}
            </div>

            {/* Botones de Llamada a la Acción (CTAs Obligatorios + Redes) */}
            <div className="mt-7 flex w-full flex-wrap items-center gap-3">
              {/* CTA Primario Obligatorio: Descargar CV */}
              <a
                href="/cv.pdf"
                download
                className="cursor-can-hover group inline-flex items-center justify-center gap-2.5 rounded-xl border border-emerald-600/40 dark:border-emerald-400/50 bg-emerald-500 px-6 py-3.5 font-mono text-sm font-bold text-zinc-950 shadow-[0_10px_25px_rgba(16,185,129,0.28)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_12px_32px_rgba(16,185,129,0.42)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>{lang === "es" ? "Descargar CV" : "Download CV"}</span>
              </a>

              {/* CTA Secundario Obligatorio: Ver proyectos */}
              <a
                href="#projects"
                className="cursor-can-hover group inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700/90 bg-white/90 dark:bg-zinc-900/85 px-5 py-3.5 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 backdrop-blur-md transition-all duration-200 hover:border-indigo-500/60 hover:bg-zinc-100 dark:hover:bg-zinc-800/90"
              >
                <span>{lang === "es" ? "Ver proyectos" : "View Projects"}</span>
                <ArrowUpRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* CTA Terciario: Contratar / Contacto */}
              <a
                href="#contact"
                className="cursor-can-hover inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/75 px-4 py-3.5 font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-md transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === "es" ? "Contacto" : "Contact"}</span>
              </a>

              {/* Botones Rápidos GitHub & LinkedIn */}
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/itsGabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub @itsGabo22"
                  className="cursor-can-hover flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/75 text-zinc-700 dark:text-zinc-300 backdrop-blur-md transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Code2 className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/itsgabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Gabriel Esteban Paz Guerrero"
                  className="cursor-can-hover flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/75 text-zinc-700 dark:text-zinc-300 backdrop-blur-md transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Briefcase className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Ecosistema Empresarial & Insignias de Telemetría Técnica */}
            <div className="interactive-surface mt-8 w-full max-w-xl rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/70 p-4 backdrop-blur-md">
              <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  {lang === "es"
                    ? "ECOSISTEMA FUNDADO & TELEMETRÍA"
                    : "VENTURE ECOSYSTEM & TELEMETRY"}
                </span>
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>UCC 5.º SEM</span>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TELEMETRY_METRICS.map((item) => (
                  <div
                    key={item.code}
                    className="rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/90 dark:bg-zinc-950/70 p-2.5 transition-colors hover:border-emerald-500/50"
                  >
                    <div className="font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                      {item.code}
                    </div>
                    <div className="mt-0.5 font-display text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] leading-tight text-zinc-600 dark:text-zinc-400">
                      {item.role[lang]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
                {TECH_BADGES.map((badge, index) => {
                  const badgeLabel =
                    typeof badge.label === "string"
                      ? badge.label
                      : badge.label[lang];
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1 font-mono text-[11px] font-semibold text-zinc-800 dark:text-zinc-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{badgeLabel}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Escenario Abierto para el Teclado Mecánico 3D Interactivo (5 columnas en LG) */}
          <div className="pointer-events-none relative flex min-h-[340px] flex-col items-center justify-end lg:col-span-5 lg:min-h-[540px]">
            <div className="pointer-events-none mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white/85 dark:bg-zinc-900/80 px-4 py-2 font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-lg backdrop-blur-md">
              <Keyboard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {lang === "es"
                  ? "Teclado 3D Interactivo — Pasa el cursor o presiona teclas"
                  : "Interactive 3D Keyboard — Hover keycaps or press keys"}
              </span>
            </div>
          </div>
        </div>

        {/* Indicador de Scroll Inferior */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            aria-label={
              lang === "es" ? "Desplazarse a Sobre mí" : "Scroll to About Me"
            }
            className="cursor-can-hover inline-flex flex-col items-center gap-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <span>{lang === "es" ? "EXPLORAR" : "SCROLL"}</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-emerald-600 dark:text-emerald-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
