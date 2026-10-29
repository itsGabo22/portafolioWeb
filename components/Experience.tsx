"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";
import TiltSurface from "./TiltSurface";

interface TimelineItem {
  id: string;
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

const WORK_EXPERIENCE: TimelineItem[] = [
  {
    id: "work-vicardev",
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
      es: "Liderazgo de arquitectura y desarrollo integral de tiendas online (e-commerce) y landing pages de alta gama entregadas en producción (Brisal by Salvador, Blue Velvet, Carlin Cosméticos) con Next.js, Astro, Supabase y Vercel.",
      en: "Architecture leadership and end-to-end development of high-end commercial e-commerce stores and landing pages in live production (Brisal by Salvador, Blue Velvet, Carlin Cosmetics) with Next.js, Astro, Supabase, and Vercel.",
    },
    highlights: ["Next.js", "Astro", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
  },
  {
    id: "work-electrotech",
    active: true,
    period: {
      es: "Sep 2026 - Presente",
      en: "Sep 2026 - Present",
    },
    title: {
      es: "Desarrollador Web & Consultor de Infraestructura Digital",
      en: "Web Developer & Digital Infrastructure Consultant",
    },
    organization: {
      es: "ElectroTech Pasto (electrotechpasto.com)",
      en: "ElectroTech Pasto (electrotechpasto.com)",
    },
    url: "https://electrotechpasto.com",
    description: {
      es: "Diseño y puesta en producción de la plataforma digital de automatización industrial y servicios electromecánicos, integrando flujos transaccionales con Resend API, configuración DNS y SEO técnico regional.",
      en: "Design and production rollout of the industrial automation and electromechanical services web platform, integrating transactional workflows with Resend API, DNS configuration, and regional technical SEO.",
    },
    highlights: ["Next.js", "TypeScript", "Resend API", "Cloudflare", "Tailwind CSS"],
  },
  {
    id: "work-obsidion",
    active: true,
    period: {
      es: "Mar 2026 - Presente",
      en: "Mar 2026 - Present",
    },
    title: {
      es: "Co-Fundador & Arquitecto Frontend",
      en: "Co-Founder & Frontend Architect",
    },
    organization: {
      es: "Obsidion",
      en: "Obsidion",
    },
    description: {
      es: "Construcción de interfaces modulares de alta velocidad, sistemas de diseño escalables e integración de motores de inteligencia artificial y optimización algorítmica.",
      en: "Building high-velocity modular interfaces, scalable design systems, and integrations with artificial intelligence and algorithmic optimization engines.",
    },
    highlights: ["React", "TypeScript", "Python", "FastAPI", "Gemini AI"],
  },
];

const ACADEMIC_EXPERIENCE: TimelineItem[] = [
  {
    id: "acad-ucc",
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

function TimelineColumn({
  items,
  trackLabel,
}: {
  items: TimelineItem[];
  trackLabel: string;
}) {
  const { lang } = useApp();

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {trackLabel}
        </h3>
      </div>

      {/* Required Vertical Timeline Line: border-l-2 border-emerald-500/40 dark:border-emerald-400/40 */}
      <div className="relative ml-3 space-y-8 border-l-2 border-emerald-500/40 dark:border-emerald-400/40 pl-6 sm:pl-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative"
          >
            {/* Required Absolute Timeline Indicator Dot: absolute -left-[9px] */}
            <span className="absolute -left-[9px] top-7 h-4 w-4 rounded-full border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-950 transition-transform duration-200 group-hover:scale-125 group-hover:border-emerald-500" />

            <TiltSurface maxTilt={4}>
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/75 p-6 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h4 className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {item.title[lang]}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      <span>{item.organization[lang]}</span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-can-hover inline-flex items-center gap-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-200 underline underline-offset-4"
                        >
                          <span>Web</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Period indicator with live ping dot (from naresh_ref ExperienceCard) */}
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
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

                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.description[lang]}
                </p>

                {/* Real Vector SVG Tech Badges (matching naresh_ref Experience skills row) */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.highlights.map((tech) => (
                    <TechBadge key={tech} name={tech} size="xs" />
                  ))}
                </div>
              </div>
            </TiltSurface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const { lang } = useApp();

  return (
    <section
      id="experience"
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Monumental Section Header (naresh_ref style) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
            {lang === "es" ? "Experiencia" : "Experience"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
            {lang === "es"
              ? "Mi trayectoria profesional y académica."
              : "My professional and academic journey."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          <TimelineColumn
            items={WORK_EXPERIENCE}
            trackLabel={
              lang === "es" ? "Experiencia Laboral" : "Work Experience"
            }
          />

          <TimelineColumn
            items={ACADEMIC_EXPERIENCE}
            trackLabel={
              lang === "es" ? "Formación Académica" : "Academic Background"
            }
          />
        </div>
      </div>
    </section>
  );
}
