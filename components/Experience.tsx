"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface TimelineItem {
  id: string;
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
    period: {
      es: "Ene 2026 – Presente",
      en: "Jan 2026 – Present",
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
    highlights: ["Next.js", "Astro", "Supabase", "Vercel"],
  },
  {
    id: "work-electrotech",
    period: {
      es: "Sep 2026 – Presente",
      en: "Sep 2026 – Present",
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
      es: "Diseño y puesta en producción de la plataforma digital de automatización industrial y servicios electromecánicos, integrando flujos transaccionales con Resend API, configuración DNS en Hostinger y SEO técnico regional.",
      en: "Design and production rollout of the industrial automation and electromechanical services web platform, integrating transactional workflows with Resend API, Hostinger DNS configuration, and regional technical SEO.",
    },
    highlights: ["Next.js", "Resend API", "Hostinger DNS", "Tailwind CSS"],
  },
  {
    id: "work-obsidion",
    period: {
      es: "Mar 2026 – Presente",
      en: "Mar 2026 – Present",
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
    highlights: ["React", "TypeScript", "FastAPI", "AI Integration"],
  },
];

const ACADEMIC_EXPERIENCE: TimelineItem[] = [
  {
    id: "acad-ucc",
    period: {
      es: "2024 – Presente (5.º Semestre)",
      en: "2024 – Present (5th Semester)",
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
      es: "Formación universitaria enfocada en arquitectura de software, estructuras de datos, ingeniería de requisitos, bases de datos relacionales, diseño de interfaces y desarrollo de sistemas distribuidos.",
      en: "University degree focused on software architecture, data structures, requirements engineering, relational databases, interface design, and distributed systems development.",
    },
    highlights: ["Software Architecture", "Algorithms", "Databases", "UI Engineering"],
  },
  {
    id: "acad-practicum",
    period: {
      es: "2025 – 2026",
      en: "2025 – 2026",
    },
    title: {
      es: "Prácticum en Cloud, IA & Sistemas Embebidos",
      en: "Cloud, AI & Embedded Systems Practicum",
    },
    organization: {
      es: "AWS Serverless (S3, Lambda, IAM), Gemini AI, Wear OS, Tauri & Arduino Labs",
      en: "AWS Serverless (S3, Lambda, IAM), Gemini AI, Wear OS, Tauri & Arduino Labs",
    },
    description: {
      es: "Investigación aplicada y laboratorios prácticos en arquitecturas serverless en AWS, integración de modelos generativos Gemini AI, desarrollo nativo en Tauri v2 / Wear OS y prototipado electrónico con Arduino y C/Assembly.",
      en: "Applied research and hands-on labs in AWS serverless architectures, Gemini AI generative model integration, native desktop/wearable development with Tauri v2 & Wear OS, and hardware prototyping with Arduino & C/Assembly.",
    },
    highlights: ["AWS Lambda & S3", "Gemini AI", "Tauri v2", "Arduino & C"],
  },
  {
    id: "acad-highschool",
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
      es: "Graduación con énfasis en ciencias exactas, pensamiento lógico-matemático y fundamentos iniciales de programación y electrónica.",
      en: "Graduated with an emphasis on exact sciences, mathematical logic, and foundational programming and electronics.",
    },
    highlights: ["Mathematics", "Logic", "Foundational Computing"],
  },
];

function TimelineColumn({
  items,
  trackLabel,
  icon: TrackIcon,
}: {
  items: TimelineItem[];
  trackLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const { lang } = useApp();

  return (
    <div className="flex flex-col">
      {/* Encabezado de Columna (Laboral o Académica) */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <TrackIcon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {trackLabel}
        </h3>
      </div>

      {/* Línea de Tiempo Vertical Estricta: border-l-2 border-emerald-500/40 dark:border-emerald-400/40 */}
      <div className="relative ml-3 space-y-8 border-l-2 border-emerald-500/40 dark:border-emerald-400/40 pl-6 sm:pl-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative"
          >
            {/* Punto indicador absoluto obligatorio: absolute -left-[9px] */}
            <span className="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-emerald-500 bg-white dark:bg-zinc-950 transition-transform duration-200 group-hover:scale-125 group-hover:bg-emerald-500" />

            {/* Tarjeta del Hito */}
            <div className="interactive-surface rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-5 sm:p-6 shadow-sm backdrop-blur-md transition-all duration-200 group-hover:border-emerald-500/50 group-hover:shadow-md">
              {/* Fecha / Periodo */}
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <Calendar className="h-3 w-3" />
                  {item.period[lang]}
                </span>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Web</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Cargo / Título */}
              <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {item.title[lang]}
              </h4>

              {/* Organización / Institución */}
              <p className="mt-0.5 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {item.organization[lang]}
              </p>

              {/* Descripción */}
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {item.description[lang]}
              </p>

              {/* Etiquetas clave */}
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                {item.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
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
      className="relative border-t border-zinc-200 dark:border-zinc-800/80 bg-transparent py-20 sm:py-28 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-2xs">
              <Briefcase className="h-3.5 w-3.5" />
              <span>
                {lang === "es"
                  ? "04 // TRAYECTORIA & EXPERIENCIA"
                  : "04 // EXPERIENCE & TIMELINE"}
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
              {lang === "es" ? (
                <>
                  Experiencia laboral y{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    formación académica
                  </span>
                </>
              ) : (
                <>
                  Work experience &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    academic background
                  </span>
                </>
              )}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {lang === "es"
              ? "Cronología ordenada de más reciente a más antigua (2026 a 2023), combinando liderazgo en proyectos en producción y rigor universitario."
              : "Chronological timeline ordered from most recent to oldest (2026 down to 2023), combining production leadership and university rigor."}
          </p>
        </motion.div>

        {/* Dos Columnas en Desktop: Experiencia Laboral + Experiencia Académica */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          <TimelineColumn
            items={WORK_EXPERIENCE}
            trackLabel={
              lang === "es" ? "Experiencia Laboral" : "Work Experience"
            }
            icon={Briefcase}
          />

          <TimelineColumn
            items={ACADEMIC_EXPERIENCE}
            trackLabel={
              lang === "es" ? "Experiencia Académica" : "Academic Experience"
            }
            icon={GraduationCap}
          />
        </div>
      </div>
    </section>
  );
}
