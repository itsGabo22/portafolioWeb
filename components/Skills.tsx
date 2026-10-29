"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";

interface SkillCategory {
  id: string;
  indexCode: string;
  layerTag: string;
  proficiency: number;
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
    indexCode: "01",
    layerTag: "LAYER // CLIENT, MOBILE & DESKTOP",
    proficiency: 98,
    title: {
      es: "Frontend, Mobile & Desktop",
      en: "Frontend, Mobile & Desktop",
    },
    subtitle: {
      es: "Interfaces Web, Desktop Nativo & Wearables",
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
    indexCode: "02",
    layerTag: "LAYER // DISTRIBUTED CORE & AI",
    proficiency: 95,
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
    indexCode: "03",
    layerTag: "LAYER // DATA PERSISTENCE & CLOUD",
    proficiency: 94,
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
    indexCode: "04",
    layerTag: "LAYER // UNIX SYSTEMS & TOOLING",
    proficiency: 96,
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
        {/* Centered Monumental Section Header (exact naresh_ref Tech Stack style) */}
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

          <p className="mx-auto mt-2 text-base text-zinc-500 dark:text-zinc-400">
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

        {/* Engineering Specification Matrix Header & Filter Bar */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 border-t border-zinc-300/80 dark:border-zinc-800 pt-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              SPECIFICATION MATRIX // 01 – 04
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {lang === "es"
                ? "Arquitectura por Dominio"
                : "Domain Architecture"}
            </h3>
          </div>

          <div
            role="tablist"
            aria-label={
              lang === "es"
                ? "Filtrar categorías técnicas"
                : "Filter technical categories"
            }
            className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-1.5 backdrop-blur-md"
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
              {lang === "es" ? "Todos (4)" : "All (4)"}
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
                  {category.indexCode} · {category.title[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bespoke Horizontal Architectural Specification Bands (No repetitive card boxes) */}
        <div className="divide-y divide-zinc-300/80 dark:divide-zinc-800/90 border-y border-zinc-300/80 dark:border-zinc-800/90 bg-white/75 dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl px-6 sm:px-10">
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
                    {/* Col 1 (4 cols): Monumental Index + Title + Telemetry Bar */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-3xl sm:text-4xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400">
                          {category.indexCode}
                        </span>
                        <span className="rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                          {category.layerTag}
                        </span>
                      </div>

                      <h4 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {category.title[lang]}
                      </h4>
                      <p className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {category.subtitle[lang]}
                      </p>

                      {/* Capability Telemetry Bar */}
                      <div className="mt-4 flex items-center gap-3 max-w-xs">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                            style={{ width: `${category.proficiency}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                          {category.proficiency}%
                        </span>
                      </div>
                    </div>

                    {/* Col 2 (4 cols): Architectural Spec Summary */}
                    <div className="lg:col-span-4">
                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {category.serviceSummary[lang]}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((prev) =>
                            prev === category.id ? null : category.id
                          )
                        }
                        className="cursor-can-hover mt-3 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 lg:hidden"
                      >
                        <span>
                          {isExpanded
                            ? lang === "es"
                              ? "Ocultar stack"
                              : "Hide stack"
                            : lang === "es"
                              ? "Ver stack"
                              : "Show stack"}
                        </span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Col 3 (4 cols): High-Contrast SVG Logo Matrix */}
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
