"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
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
import TechBadge from "./TechBadge";
import TiltSurface from "./TiltSurface";

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
];

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

function TimelineColumn({
  items,
  trackLabel,
  trackSubtitle,
  activeEra,
  onHoverEra,
}: {
  items: TimelineItem[];
  trackLabel: string;
  trackSubtitle: string;
  activeEra: number;
  onHoverEra: (eraIndex: number) => void;
}) {
  const { lang } = useApp();
  const columnRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: columnRef,
    offset: ["start 80%", "end 35%"],
  });

  const smoothSpine = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const orbTop = useTransform(smoothSpine, [0, 1], ["0%", "100%"]);

  return (
    <div ref={columnRef} className="flex flex-col">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-zinc-300/60 dark:border-zinc-800/80 pb-4">
        <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {trackLabel}
        </h3>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
          {trackSubtitle}
        </span>
      </div>

      {/* Required Vertical Timeline Line: border-l-2 border-emerald-500/40 dark:border-emerald-400/40 */}
      <div className="relative ml-3 space-y-8 border-l-2 border-emerald-500/40 dark:border-emerald-400/40 pl-6 sm:pl-8">
        {/* Scroll-Driven Progressive Laser Spine Overlay */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: smoothSpine }}
          className="pointer-events-none absolute -left-[2px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-emerald-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(16,185,129,0.75)]"
        />

        {/* Glowing Leading Laser Orb */}
        <motion.span
          aria-hidden="true"
          style={{ top: orbTop }}
          className="pointer-events-none absolute -left-[6px] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_14px_3px_rgba(16,185,129,0.9)]"
        />

        {items.map((item, index) => {
          const isEraHighlighted = activeEra === item.eraIndex;
          const eraInfo = ENGINEERING_ERAS[item.eraIndex] ?? ENGINEERING_ERAS[0];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onMouseEnter={() => onHoverEra(item.eraIndex)}
              className="group relative"
            >
              {/* Required Absolute Timeline Indicator Dot: absolute -left-[9px] */}
              <span
                className={`absolute -left-[9px] top-7 h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                  isEraHighlighted
                    ? "scale-125 border-emerald-500 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                    : "border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-950 group-hover:scale-125 group-hover:border-emerald-500"
                }`}
              />

              <TiltSurface maxTilt={4}>
                <div
                  className={`rounded-2xl border p-6 ring-1 ring-zinc-900/[0.06] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
                    isEraHighlighted
                      ? "border-emerald-500/60 dark:border-emerald-400/50 bg-white/65 dark:bg-zinc-900/75 shadow-[0_16px_44px_-12px_rgba(16,185,129,0.14),inset_0_1px_0_0_rgba(255,255,255,0.95)]"
                      : "border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:bg-white/65 dark:hover:bg-zinc-900/75"
                  }`}
                >
                  {/* Top Period & Stage Pill */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 dark:border-zinc-700/80 bg-white/70 dark:bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                      {eraInfo.stageLabel[lang]} · {eraInfo.year}
                    </span>

                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 shrink-0">
                      <span className="relative flex h-2 w-2 shrink-0">
                        {item.active && (
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                        )}
                        <span
                          className={`relative h-2 w-2 rounded-full ${
                            item.active
                              ? "bg-emerald-500"
                              : "border border-zinc-400 dark:border-zinc-600"
                          }`}
                        />
                      </span>
                      <span>{item.period[lang]}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {item.title[lang]}
                    </h4>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      <span>{item.organization[lang]}</span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-can-hover inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 underline underline-offset-4"
                        >
                          <span>Web</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {item.description[lang]}
                  </p>

                  {/* Real Vector SVG Tech Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-zinc-300/60 dark:border-zinc-800/60 pt-4">
                    {item.highlights.map((tech) => (
                      <TechBadge key={tech} name={tech} size="xs" />
                    ))}
                  </div>
                </div>
              </TiltSurface>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Experience() {
  const { lang } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEra, setActiveEra] = useState<number>(0);

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
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      {/* Scroll-Driven 4-Stage Engineering Evolution Backdrop */}
      <EraSchematicBackdrop activeEra={activeEra} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Monumental Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {lang === "es"
                ? "Evolución Profesional y Académica · 2023 – 2026"
                : "Professional & Academic Evolution · 2023 – 2026"}
            </span>
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
            {lang === "es" ? "Experiencia" : "Experience"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            {lang === "es"
              ? "Evolución en 4 etapas: desde fundamentos lógicos y formación en Ingeniería de Software hasta e-commerce en producción y liderazgo en VICARDEV."
              : "4-stage evolution: from algorithmic foundations and Software Engineering academia to live production e-commerce and VICARDEV leadership."}
          </p>
        </motion.div>

        {/* Interactive Scroll-Scrubbed Stage Selector Bar with Frosted Glass */}
        <div className="mb-14 rounded-2xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 p-4 sm:p-5 ring-1 ring-zinc-900/[0.06] shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150">
          <div className="flex flex-col justify-between gap-4 border-b border-zinc-300/60 dark:border-zinc-800/80 pb-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs">
                {renderEraIcon(currentEraObj.index)}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {currentEraObj.stageLabel[lang]}
                  </span>
                  <span className="rounded-md bg-white/80 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                    {currentEraObj.year}
                  </span>
                </div>
                <p className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {currentEraObj.title[lang]}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
              {currentEraObj.subtitle[lang]}
            </p>
          </div>

          {/* 4-Stage Interactive Selector Strip */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {ENGINEERING_ERAS.map((era) => {
              const isSelected = activeEra === era.index;
              return (
                <button
                  key={era.year}
                  type="button"
                  onClick={() => setActiveEra(era.index)}
                  className={`cursor-can-hover flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-emerald-500/60 bg-emerald-500/10 dark:bg-emerald-500/15 shadow-xs"
                      : "border-white/70 dark:border-zinc-800/70 bg-white/45 dark:bg-zinc-950/40 hover:bg-white/70 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span
                    className={`text-[11px] font-medium ${
                      isSelected
                        ? "font-semibold text-emerald-700 dark:text-emerald-300"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {era.stageLabel[lang]} · {era.year}
                  </span>
                  <span className="mt-1 line-clamp-1 font-display text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {era.title[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Track Columns with Progressive Laser Spines */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          <TimelineColumn
            items={WORK_EXPERIENCE}
            trackLabel={
              lang === "es" ? "Experiencia Laboral" : "Work Experience"
            }
            trackSubtitle={
              lang === "es"
                ? "VICARDEV & Clientes en Producción"
                : "VICARDEV & Live Commercial Clients"
            }
            activeEra={activeEra}
            onHoverEra={setActiveEra}
          />

          <TimelineColumn
            items={ACADEMIC_EXPERIENCE}
            trackLabel={
              lang === "es" ? "Formación Académica" : "Academic Background"
            }
            trackSubtitle={
              lang === "es"
                ? "Ingeniería de Software · UCC Pasto"
                : "Software Engineering · UCC Pasto"
            }
            activeEra={activeEra}
            onHoverEra={setActiveEra}
          />
        </div>
      </div>
    </section>
  );
}
