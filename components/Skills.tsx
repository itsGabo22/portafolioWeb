"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";

interface SkillCategory {
  id: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  serviceSummary: {
    es: string;
    en: string;
  };
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend-mobile",
    title: {
      es: "Frontend, Mobile & Desktop",
      en: "Frontend, Mobile & Desktop",
    },
    subtitle: {
      es: "Interfaces Web, Escritorio Nativo & Wearables",
      en: "Web Interfaces, Native Desktop & Wearables",
    },
    serviceSummary: {
      es: "Arquitectura de aplicaciones reactivas con SSR/ISR, diseño de alto contraste y empaquetado nativo e híbrido para escritorio, móviles y smartwatches.",
      en: "Reactive application architecture with SSR/ISR, high-contrast design, and native/hybrid packaging for desktop, mobile, and smartwatches.",
    },
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Astro",
      "Tailwind CSS",
      "Tauri v2 / Rust",
      "Capacitor Mobile",
      "Kotlin / Wear OS",
    ],
  },
  {
    id: "backend-ai",
    title: {
      es: "Backend, APIs & IA",
      en: "Backend, APIs & AI",
    },
    subtitle: {
      es: "Microservicios, Optimización & Modelos Generativos",
      en: "Microservices, Optimization & Generative Models",
    },
    serviceSummary: {
      es: "Desarrollo de APIs de baja latencia, motores de optimización matemática y logística geoespacial, e integración de agentes conversacionales con Gemini AI y Steam API.",
      en: "Low-latency API development, mathematical optimization and geospatial logistics engines, and conversational agent integration with Gemini AI and the Steam API.",
    },
    skills: [
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "Java 17",
      "Spring Boot",
      "Gemini AI",
      "Steam API",
    ],
  },
  {
    id: "cloud-devops",
    title: {
      es: "Bases de Datos, Cloud & DevOps",
      en: "Databases, Cloud & DevOps",
    },
    subtitle: {
      es: "Persistencia Relacional, Caché & Infraestructura Serverless",
      en: "Relational Persistence, Caching & Serverless Infrastructure",
    },
    serviceSummary: {
      es: "Modelado de datos transaccionales y geoespaciales (PostGIS), contenedores reproducibles con Docker, funciones serverless en AWS y despliegue continuo en producción.",
      en: "Transactional and geospatial data modeling (PostGIS), reproducible Docker containers, AWS serverless functions, and continuous production deployment.",
    },
    skills: [
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Docker",
      "AWS",
      "Vercel",
      "Cloudflare",
      "Resend API",
    ],
  },
  {
    id: "hardware-systems",
    title: {
      es: "Sistemas, Linux & Herramientas",
      en: "Systems, Linux & Tooling",
    },
    subtitle: {
      es: "Control de Versiones, Automatización & Entornos Unix",
      en: "Version Control, Automation & Unix Environments",
    },
    serviceSummary: {
      es: "Flujos de trabajo con commits atómicos en Git, administración de servidores Linux/Nginx, virtualización e integración de sistemas electromecánicos.",
      en: "Workflows with atomic Git commits, Linux/Nginx server administration, virtualization, and electromechanical systems integration.",
    },
    skills: ["Git", "Linux", "Docker", "JavaScript", "Python"],
  },
];

export default function Skills() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCategories =
    activeTab === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeTab);

  return (
    <section
      id="skills"
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Monumental Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
            {lang === "es" ? "Tech Stack" : "Tech Stack"}
          </h2>

          <p className="mx-auto mt-2 text-base text-zinc-600 dark:text-zinc-400">
            {lang === "es"
              ? "(pista: pasa el cursor o presiona una tecla en el teclado 3D)"
              : "(hint: hover or press a key on the 3D keyboard)"}
          </p>
        </motion.div>

        {/* Open Stage for the Center-Stage 3D Mechanical Keyboard */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-[400px] sm:h-[480px] lg:h-[540px] w-full"
        />

        {/* Editorial Header & Clean Filter Pill Bar */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-300/60 dark:border-zinc-800 pt-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {lang === "es"
                ? "Arquitectura y Ecosistema Técnico"
                : "Architecture & Tech Ecosystem"}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {lang === "es"
                ? "Tecnologías utilizadas en plataformas comerciales y sistemas universitarios"
                : "Technologies deployed across commercial platforms and university systems"}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={
              lang === "es"
                ? "Filtrar categorías técnicas"
                : "Filter technical categories"
            }
            className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 p-1.5 ring-1 ring-zinc-900/[0.06] shadow-[0_8px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              className={`cursor-can-hover rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {lang === "es" ? "Todos" : "All"}
            </button>

            {SKILL_CATEGORIES.map((category) => {
              const isSelected = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(category.id)}
                  className={`cursor-can-hover rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {category.title[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Translucent Liquid Frosted Glass Domain Rows (Zero percentages, zero robotic labels) */}
        <div className="divide-y divide-zinc-300/60 dark:divide-zinc-800/80 overflow-hidden rounded-3xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 px-6 sm:px-10 ring-1 ring-zinc-900/[0.06] shadow-[0_16px_48px_-12px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.92)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const isExpanded =
                expandedId === null || expandedId === category.id;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="py-8 sm:py-10"
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                    {/* Col 1 (4 cols): Clean Editorial Domain Title & Subtitle */}
                    <div className="lg:col-span-4">
                      <h4 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {category.title[lang]}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        {category.subtitle[lang]}
                      </p>
                    </div>

                    {/* Col 2 (4 cols): Concise Domain Summary */}
                    <div className="lg:col-span-4">
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {category.serviceSummary[lang]}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((prev) =>
                            prev === category.id ? null : category.id
                          )
                        }
                        className="cursor-can-hover mt-3 inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 lg:hidden"
                      >
                        <span>
                          {isExpanded
                            ? lang === "es"
                              ? "Ocultar tecnologías"
                              : "Hide technologies"
                            : lang === "es"
                              ? "Ver tecnologías"
                              : "Show technologies"}
                        </span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Col 3 (4 cols): High-Contrast SVG Logo Pills */}
                    <div
                      className={`lg:col-span-4 flex flex-wrap gap-2 ${
                        isExpanded ? "flex" : "hidden lg:flex"
                      }`}
                    >
                      {category.skills.map((skill) => (
                        <TechBadge
                          key={skill}
                          name={skill}
                          size="sm"
                          interactive
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
