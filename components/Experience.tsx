"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Cloud,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/messages";
import TechBadge from "./TechBadge";
import { useReducedMotion } from "@/lib/capabilities";
import SectionEyebrow from "./SectionEyebrow";

interface TimelineItem {
  id: string;
  eraIndex: number;
  active?: boolean;
  period: {
    es: string;
    en: string;
  };
  title: {
    es: string;
    en: string;
  };
  organization: {
    es: string;
    en: string;
  };
  url?: string;
  description: {
    es: string;
    en: string;
  };
  highlights: string[];
}

interface EngineeringEra {
  index: number;
  stageLabel: {
    es: string;
    en: string;
  };
  year: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
}

const ENGINEERING_ERAS: EngineeringEra[] = [
  {
    index: 0,
    stageLabel: { es: "Etapa 1", en: "Stage 1" },
    year: "2023",
    title: {
      es: "Lógica Algorítmica & Fundamentos",
      en: "Algorithmic Logic & Foundations",
    },
    subtitle: {
      es: "Bases de programación, entornos Linux y pensamiento lógico-matemático",
      en: "Foundational programming, Linux environments & mathematical logic",
    },
  },
  {
    index: 1,
    stageLabel: { es: "Etapa 2", en: "Stage 2" },
    year: "2024 – 2025",
    title: {
      es: "Ingeniería de Software & Sistemas UCC",
      en: "Software Engineering & UCC Systems",
    },
    subtitle: {
      es: "Estructuras de datos, arquitectura relacional/PostGIS y backends tipados",
      en: "Data structures, relational/PostGIS architecture & typed backends",
    },
  },
  {
    index: 2,
    stageLabel: { es: "Etapa 3", en: "Stage 3" },
    year: "2025 – 2026",
    title: {
      es: "E-Commerce en Producción & Cloud",
      en: "Production E-Commerce & Cloud Scale",
    },
    subtitle: {
      es: "Plataformas comerciales para Brisal, Blue Velvet, Carlin Cosméticos y ElectroTech Pasto",
      en: "Commercial platforms for Brisal, Blue Velvet, Carlin Cosmetics & ElectroTech Pasto",
    },
  },
  {
    index: 3,
    stageLabel: { es: "Etapa 4", en: "Stage 4" },
    year: "2026+",
    title: {
      es: "Ecosistemas con IA & Dirección en VICARDEV",
      en: "AI Ecosystems & VICARDEV Leadership",
    },
    subtitle: {
      es: "Agentes con Gemini AI, apps nativas Rust/Tauri, Wear OS y liderazgo técnico",
      en: "Gemini AI agents, Rust/Tauri native apps, Wear OS & technical leadership",
    },
  },
];

// Ordered most recent first.
const WORK_EXPERIENCE: TimelineItem[] = [
  {
    id: "work-vicardev",
    eraIndex: 3,
    active: true,
    period: {
      es: "Ene 2026 - Presente",
      en: "Jan 2026 - Present",
    },
    title: {
      es: "Fundador & Desarrollador Full-Stack Principal",
      en: "Founder & Lead Full-Stack Developer",
    },
    organization: {
      es: "VICARDEV (vicardev.digital)",
      en: "VICARDEV (vicardev.digital)",
    },
    url: "https://vicardev.digital",
    description: {
      es: "Fundación y dirección técnica de mi marca de desarrollo de software comercial y tiendas e-commerce de alta conversión en producción (Brisal by Salvador, Blue Velvet, Carlin Cosméticos) con Next.js, Astro, Supabase y Vercel.",
      en: "Founding and technical leadership of my commercial software & high-conversion e-commerce agency delivering live platforms (Brisal by Salvador, Blue Velvet, Carlin Cosmetics) with Next.js, Astro, Supabase, and Vercel.",
    },
    highlights: [
      "Next.js",
      "Astro",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
    ],
  },
  {
    id: "work-ecommerce-clients",
    eraIndex: 2,
    active: true,
    period: {
      es: "2025 - Presente",
      en: "2025 - Present",
    },
    title: {
      es: "Arquitecto E-Commerce Full-Stack (Proyectos Comerciales)",
      en: "Full-Stack E-Commerce Architect (Commercial Clients)",
    },
    organization: {
      es: "Brisal by Salvador, Blue Velvet & Carlin Cosméticos",
      en: "Brisal by Salvador, Blue Velvet & Carlin Cosmetics",
    },
    url: "https://brisal.com.co",
    description: {
      es: "Arquitectura, desarrollo y despliegue en producción de tres plataformas completas de comercio electrónico con catálogos mayoristas/minoristas, bases de datos en Supabase/PostgreSQL y pasarelas de compra optimizadas.",
      en: "Architecture, development, and production deployment of three complete e-commerce platforms featuring wholesale/retail catalogs, Supabase/PostgreSQL persistence, and conversion-optimized checkouts.",
    },
    highlights: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "work-electrotech",
    eraIndex: 2,
    active: true,
    period: {
      es: "2025 - 2026",
      en: "2025 - 2026",
    },
    title: {
      es: "Desarrollador Web Full-Stack (Proyecto de Cliente)",
      en: "Full-Stack Web Developer (Client Project)",
    },
    organization: {
      es: "Cliente Comercial — ElectroTech Pasto (electrotechpasto.com)",
      en: "Commercial Client — ElectroTech Pasto (electrotechpasto.com)",
    },
    url: "https://electrotechpasto.com",
    description: {
      es: "Diseño y puesta en producción de la plataforma corporativa de automatización industrial y servicios electromecánicos para ElectroTech Pasto, integrando cotizaciones automatizadas con Resend API, configuración DNS y SEO técnico.",
      en: "Design and production rollout of the corporate industrial automation and electromechanical services platform for ElectroTech Pasto, integrating automated quoting via Resend API, DNS configuration, and technical SEO.",
    },
    highlights: [
      "Next.js",
      "TypeScript",
      "Resend API",
      "Cloudflare",
      "Tailwind CSS",
    ],
  },
];

// Ordered most recent first.
const ACADEMIC_EXPERIENCE: TimelineItem[] = [
  {
    id: "acad-ucc",
    eraIndex: 1,
    active: true,
    period: {
      es: "2024 - Presente (5.º Semestre)",
      en: "2024 - Present (5th Semester)",
    },
    title: {
      es: "Ingeniería de Software",
      en: "Software Engineering",
    },
    organization: {
      es: "Universidad Cooperativa de Colombia (UCC), Campus Pasto",
      en: "Universidad Cooperativa de Colombia (UCC), Campus Pasto",
    },
    description: {
      es: "Formación universitaria enfocada en arquitectura de software, estructuras de datos, ingeniería de requisitos, bases de datos espaciales/relacionales, diseño de interfaces y sistemas distribuidos.",
      en: "University degree focused on software architecture, data structures, requirements engineering, relational/spatial databases, interface design, and distributed systems.",
    },
    highlights: ["Java 17", "Spring Boot", "PostgreSQL", "TypeScript", "Git"],
  },
  {
    id: "acad-practicum",
    eraIndex: 3,
    active: false,
    period: {
      es: "2025 - 2026",
      en: "2025 - 2026",
    },
    title: {
      es: "Proyectos Aplicados en Cloud, IA, Wearables & Desktop",
      en: "Applied Projects in Cloud, AI, Wearables & Desktop",
    },
    organization: {
      es: "GamerBox, VibeRoute Colombia, WGO, OcioFlex & MusicScript",
      en: "GamerBox, VibeRoute Colombia, WGO, OcioFlex & MusicScript",
    },
    description: {
      es: "Desarrollo de aplicaciones móviles híbridas (Capacitor/WebAPK), apps nativas de escritorio en Rust/Tauri v2, navegación asistida por voz en Wear OS y backends geoespaciales con Google Gemini AI y Steam API.",
      en: "Development of hybrid mobile apps (Capacitor/WebAPK), native desktop apps in Rust/Tauri v2, voice-guided Wear OS navigation, and geospatial backends with Google Gemini AI and the Steam API.",
    },
    highlights: ["AWS", "Gemini AI", "Tauri v2 / Rust", "Steam API", "Docker"],
  },
  {
    id: "acad-highschool",
    eraIndex: 0,
    active: false,
    period: {
      es: "Dic 2023",
      en: "Dec 2023",
    },
    title: {
      es: "Bachiller Académico",
      en: "High School Diploma",
    },
    organization: {
      es: "Pasto, Colombia",
      en: "Pasto, Colombia",
    },
    description: {
      es: "Graduación con énfasis en ciencias exactas, pensamiento lógico-matemático y fundamentos de programación y electrónica.",
      en: "Graduated with an emphasis on exact sciences, mathematical logic, and foundational programming and electronics.",
    },
    highlights: ["JavaScript", "Python", "Linux"],
  },
];

function EraSchematicBackdrop({ activeEra }: { activeEra: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-45 dark:opacity-35"
    >
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background:
            activeEra === 0
              ? "radial-gradient(circle at 20% 25%, rgba(16,185,129,0.12), transparent 55%)"
              : activeEra === 1
                ? "radial-gradient(circle at 75% 35%, rgba(6,182,212,0.13), transparent 55%)"
                : activeEra === 2
                  ? "radial-gradient(circle at 30% 70%, rgba(99,102,241,0.14), transparent 55%)"
                  : "radial-gradient(circle at 70% 75%, rgba(16,185,129,0.15), rgba(99,102,241,0.1), transparent 65%)",
        }}
      />

      <svg
        viewBox="0 0 1200 800"
        fill="none"
        className="h-full w-full stroke-zinc-400/35 dark:stroke-zinc-600/35"
      >
        <path
          d="M 80 0 V 800 M 1120 0 V 800 M 0 120 H 1200 M 0 680 H 1200"
          strokeWidth="0.75"
          strokeDasharray="4 8"
        />

        {activeEra === 0 && (
          <g className="stroke-emerald-600/35 dark:stroke-emerald-400/30" strokeWidth="1.2">
            <path d="M 140 220 H 320 L 370 270 H 540" />
            <path d="M 140 320 H 290 L 340 270" />
            <circle cx="140" cy="220" r="5" />
            <circle cx="140" cy="320" r="5" />
            <circle cx="540" cy="270" r="7" />
            <rect x="640" y="180" width="180" height="120" rx="8" strokeDasharray="6 4" />
            <path d="M 820 240 H 980 L 1030 300" />
          </g>
        )}

        {activeEra === 1 && (
          <g className="stroke-cyan-600/35 dark:stroke-cyan-400/30" strokeWidth="1.2">
            <polygon points="600,140 760,220 600,300 440,220" />
            <polygon points="600,240 760,320 600,400 440,320" />
            <polygon points="600,340 760,420 600,500 440,420" />
            <line x1="440" y1="220" x2="440" y2="420" />
            <line x1="760" y1="220" x2="760" y2="420" />
            <line x1="600" y1="300" x2="600" y2="500" />
          </g>
        )}

        {activeEra === 2 && (
          <g className="stroke-indigo-600/35 dark:stroke-indigo-400/30" strokeWidth="1.2">
            <path d="M 100 450 Q 350 280, 600 450 T 1100 450" />
            <path d="M 100 510 Q 350 340, 600 510 T 1100 510" strokeDasharray="5 5" />
            <circle cx="350" cy="365" r="14" />
            <circle cx="600" cy="450" r="18" />
            <circle cx="850" cy="535" r="14" />
          </g>
        )}

        {activeEra === 3 && (
          <g className="stroke-emerald-500/40 dark:stroke-emerald-400/35" strokeWidth="1.2">
            <line x1="260" y1="240" x2="520" y2="190" />
            <line x1="520" y1="190" x2="840" y2="280" />
            <line x1="260" y1="240" x2="460" y2="460" />
            <line x1="520" y1="190" x2="720" y2="520" />
            <line x1="460" y1="460" x2="720" y2="520" />
            <line x1="840" y1="280" x2="720" y2="520" />
            <circle cx="260" cy="240" r="8" />
            <circle cx="520" cy="190" r="12" />
            <circle cx="840" cy="280" r="10" />
            <circle cx="460" cy="460" r="9" />
            <circle cx="720" cy="520" r="14" />
          </g>
        )}
      </svg>
    </div>
  );
}

type Track = "work" | "academic";
const TRACKS: readonly Track[] = ["work", "academic"];

/** First four-digit year in a period label ("Ene 2026 - Presente" -> "2026"). */
const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

function TimelineTrack({
  items,
  activeEra,
  onHoverEra,
}: {
  items: TimelineItem[];
  activeEra: number;
  onHoverEra: (eraIndex: number) => void;
}) {
  const { lang } = useApp();
  const t = useT();
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  // The rail draws itself as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <ol ref={listRef} className="relative space-y-10 sm:space-y-14">
      {/* Rail: faint track + primary line that draws on scroll */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-[4.75rem] top-3 w-px bg-white/10 sm:left-[9.75rem]"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : progress }}
        className="absolute bottom-3 left-[4.75rem] top-3 w-[2px] -translate-x-[0.5px] origin-top rounded-full bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 shadow-[0_0_14px_var(--primary-400)] sm:left-[9.75rem]"
      />

      {items.map((item, index) => {
        const isEraHighlighted = activeEra === item.eraIndex;
        const eraInfo = ENGINEERING_ERAS[item.eraIndex] ?? ENGINEERING_ERAS[0];
        const year = startYear(item.period[lang]);

        return (
          <li
            key={item.id}
            data-reveal
            onMouseEnter={() => onHoverEra(item.eraIndex)}
            onFocus={() => onHoverEra(item.eraIndex)}
            style={{ "--reveal-i": index } as React.CSSProperties}
            className="group relative grid grid-cols-[3.75rem_1fr] gap-x-8 sm:grid-cols-[8rem_1fr] sm:gap-x-14"
          >
            {/* Large year marker (the exact period is repeated in the card) */}
            <div aria-hidden="true" className="pt-5 text-right">
              <span
                className={`block font-display text-2xl font-extrabold leading-none tracking-tighter tabular-nums transition-colors duration-500 sm:text-6xl ${
                  isEraHighlighted ? "text-primary-200" : "text-primary-300 sm:text-transparent"
                }`}
                style={{ WebkitTextStroke: "1px var(--primary-300)" }}
              >
                {year}
              </span>
            </div>

            {/* Node on the rail */}
            <span
              aria-hidden="true"
              className={`absolute left-[4.75rem] top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all duration-300 sm:left-[9.75rem] ${
                isEraHighlighted
                  ? "scale-125 border-primary-200 bg-primary-300 shadow-[0_0_16px_var(--primary-300)]"
                  : "border-primary-300 bg-primary-950 group-hover:scale-125"
              }`}
            />

            <div
              className={`rounded-2xl border p-5 backdrop-blur-xl transition-[border-color,background-color,transform] duration-300 sm:p-6 ${
                isEraHighlighted
                  ? "border-primary-300/45 bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.035] hover:-translate-y-0.5 hover:border-white/20"
              }`}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full border border-primary-300/30 bg-primary-300/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary-200">
                  {eraInfo.stageLabel[lang]} · {eraInfo.year}
                </span>
                <span className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <span className="relative flex h-2 w-2 shrink-0">
                    {item.active && !reduced && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary-300/60" />
                    )}
                    <span
                      className={`relative h-2 w-2 rounded-full ${
                        item.active ? "bg-primary-300" : "border border-zinc-500"
                      }`}
                    />
                  </span>
                  <span>{item.period[lang]}</span>
                </span>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-zinc-50">
                {item.title[lang]}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-300">
                <span>{item.organization[lang]}</span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-can-hover inline-flex min-h-6 items-center gap-0.5 text-xs font-semibold text-primary-ink underline underline-offset-4"
                  >
                    <span>{t.experience.web}</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only"> {t.common.newTab}</span>
                  </a>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {item.description[lang]}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                {item.highlights.map((tech) => (
                  <TechBadge key={tech} name={tech} size="xs" />
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Experience() {
  const { lang } = useApp();
  const t = useT();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<Track, HTMLButtonElement | null>>({ work: null, academic: null });
  const [activeEra, setActiveEra] = useState<number>(0);
  const [track, setTrack] = useState<Track>("work");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    const nextEra =
      clamped < 0.25 ? 0 : clamped < 0.5 ? 1 : clamped < 0.75 ? 2 : 3;
    setActiveEra(nextEra);
  });

  const currentEraObj = ENGINEERING_ERAS[activeEra] ?? ENGINEERING_ERAS[0];
  const trackItems = track === "work" ? WORK_EXPERIENCE : ACADEMIC_EXPERIENCE;
  const trackLabel = (k: Track) => (k === "work" ? t.experience.work : t.experience.academic);
  const trackCount = (k: Track) =>
    (k === "work" ? WORK_EXPERIENCE : ACADEMIC_EXPERIENCE).length;

  // ARIA tabs keyboard pattern: arrows / Home / End move and select.
  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = TRACKS.indexOf(track);
    let next: Track | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = TRACKS[(i + 1) % TRACKS.length];
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = TRACKS[(i - 1 + TRACKS.length) % TRACKS.length];
    if (e.key === "Home") next = TRACKS[0];
    if (e.key === "End") next = TRACKS[TRACKS.length - 1];
    if (!next) return;
    e.preventDefault();
    setTrack(next);
    tabRefs.current[next]?.focus();
  };

  const renderEraIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Cpu className="h-4 w-4" />;
      case 1:
        return <Layers className="h-4 w-4" />;
      case 2:
        return <Cloud className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="dark band-primary band-gradient relative overflow-hidden py-24 sm:py-32"
    >
      <EraSchematicBackdrop activeEra={activeEra} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-12 text-center">
          <SectionEyebrow id="experience" />
          <h2 className="font-display text-[length:var(--text-h2)] font-bold leading-[var(--leading-tight)] tracking-tight text-zinc-50">
            {t.experience.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-300">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Scroll-scrubbed 4-stage evolution bar */}
        <div className="mb-14 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-200 text-primary-950">
                {renderEraIcon(currentEraObj.index)}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary-ink">
                    {currentEraObj.stageLabel[lang]}
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-200">
                    {currentEraObj.year}
                  </span>
                </div>
                <p className="font-display text-base font-bold text-zinc-50 sm:text-lg">
                  {currentEraObj.title[lang]}
                </p>
              </div>
            </div>
            <p className="max-w-md text-xs text-zinc-300 sm:text-sm">
              {currentEraObj.subtitle[lang]}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4" role="group" aria-label={t.experience.stagesAria}>
            {ENGINEERING_ERAS.map((era) => {
              const isSelected = activeEra === era.index;
              return (
                <button
                  key={era.year}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveEra(era.index)}
                  className={`cursor-can-hover relative flex min-h-11 flex-col items-start overflow-hidden rounded-xl border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-primary-300/50 bg-primary-300/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                  }`}
                >
                  <span className={`text-[11px] font-medium ${isSelected ? "font-semibold text-primary-200" : "text-zinc-400"}`}>
                    {era.stageLabel[lang]} · {era.year}
                  </span>
                  <span className="mt-1 line-clamp-2 font-display text-xs font-bold text-zinc-100">
                    {era.title[lang]}
                  </span>
                  {isSelected && (
                    <motion.span
                      layoutId="experience-era-bar"
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary-300"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Laboral / Académica switch */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label={t.experience.tracksAria}
            onKeyDown={onTabKey}
            className="inline-flex rounded-full border border-white/10 bg-white/[0.05] p-1"
          >
            {TRACKS.map((k) => {
              const selected = track === k;
              return (
                <button
                  key={k}
                  ref={(el) => {
                    tabRefs.current[k] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`experience-tab-${k}`}
                  aria-selected={selected}
                  aria-controls="experience-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTrack(k)}
                  className={`cursor-can-hover relative inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
                    selected ? "text-primary-950" : "text-zinc-300 hover:text-zinc-50"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="experience-track-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-primary-200"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{trackLabel(k)}</span>
                  <span
                    aria-hidden="true"
                    className={`relative rounded-full px-1.5 font-mono text-[11px] ${selected ? "bg-primary-950/10" : "bg-white/10"}`}
                  >
                    {trackCount(k)}
                  </span>
                </button>
              );
            })}
          </div>
          <span className="text-xs font-medium text-primary-ink">
            {track === "work" ? t.experience.workSubtitle : t.experience.academicSubtitle}
          </span>
        </div>

        <div
          role="tabpanel"
          id="experience-panel"
          aria-labelledby={`experience-tab-${track}`}
          tabIndex={0}
          className="rounded-2xl focus-visible:outline-offset-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={track}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <TimelineTrack items={trackItems} activeEra={activeEra} onHoverEra={setActiveEra} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
