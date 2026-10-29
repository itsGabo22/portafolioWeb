"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";
import TiltSurface from "./TiltSurface";

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
              ? "(pista: pasa el cursor o presiona una tecla)"
              : "(hint: hover or press a key)"}
          </p>
        </motion.div>

        {/* Open Stage for the Center-Stage 3D Mechanical Keyboard */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-[400px] sm:h-[480px] lg:h-[540px] w-full"
        />

        {/* Domain Architecture & Interactive Filter Tabs */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/70 dark:border-zinc-800/70 pt-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
              {lang === "es"
                ? "Arquitectura por Dominio"
                : "Domain Architecture"}
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {lang === "es"
                ? "Ecosistema de herramientas utilizadas en producción"
                : "Ecosystem of tools used across live production"}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={
              lang === "es"
                ? "Filtrar categorías técnicas"
                : "Filter technical categories"
            }
            className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-900/75 p-1.5 backdrop-blur-md"
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
                  {category.title[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D-Tilted Domain Cards with Real Vector SVG Tech Logos */}
        <motion.div
          layout
          className={`grid grid-cols-1 gap-6 ${
            filteredCategories.length === 1 ? "lg:grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <TiltSurface maxTilt={4} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/75 p-6 sm:p-7 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-zinc-400 dark:hover:border-zinc-600">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">
                            {category.title[lang]}
                          </h4>
                          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                            {category.subtitle[lang]}
                          </p>
                        </div>
                        <span className="rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          {category.skills.length}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {category.serviceSummary[lang]}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-5">
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
                </TiltSurface>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
