"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layout,
  Server,
  Cloud,
  CircuitBoard,
  CheckCircle2,
  Layers,
  Sparkles,
  Code2,
  Keyboard,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

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
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend-mobile",
    title: {
      es: "Frontend & Mobile",
      en: "Frontend & Mobile",
    },
    subtitle: {
      es: "Interfaces Web, Desktop Nativo & Wearables",
      en: "Web Interfaces, Native Desktop & Wearables",
    },
    serviceSummary: {
      es: "Arquitectura de aplicaciones reactivas con SSR/ISR, diseño atómico de alto contraste y empaquetado híbrido para escritorio y dispositivos móviles.",
      en: "Reactive application architecture with SSR/ISR, high-contrast atomic design, and hybrid packaging for desktop and mobile devices.",
    },
    icon: Layout,
    accentClass:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Tauri",
      "Capacitor",
      "Wear OS",
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
      es: "Desarrollo de APIs de baja latencia, motores de optimización matemática para logística e integración de agentes inteligentes con Gemini AI.",
      en: "Low-latency API development, mathematical optimization engines for logistics, and intelligent agent integration with Gemini AI.",
    },
    icon: Server,
    accentClass:
      "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
    skills: [
      "Python",
      "FastAPI",
      "Java",
      "Spring Boot",
      "REST APIs",
      "Google OR-Tools",
      "Gemini AI",
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
      es: "Modelado de datos transaccionales, contenedores reproducibles, funciones serverless en AWS y despliegue continuo con gestión avanzada de DNS y correo transaccional.",
      en: "Transactional data modeling, reproducible containers, AWS serverless functions, and continuous deployment with advanced DNS and transactional email.",
    },
    icon: Cloud,
    accentClass:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    skills: [
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS (Lambda, S3)",
      "Vercel",
      "Hostinger DNS",
      "Resend",
    ],
  },
  {
    id: "hardware-systems",
    title: {
      es: "Hardware & Sistemas",
      en: "Hardware & Systems",
    },
    subtitle: {
      es: "Electrónica Aplicada, Microcontroladores & Bajo Nivel",
      en: "Applied Electronics, Microcontrollers & Low-Level",
    },
    serviceSummary: {
      es: "Prototipado electrónico, integración de sensores e instrumentación con Arduino y optimización de rutinas críticas en C y ensamblador.",
      en: "Electronic prototyping, sensor and instrumentation integration with Arduino, and critical routine optimization in C and Assembly.",
    },
    icon: CircuitBoard,
    accentClass:
      "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
    skills: ["Arduino", "DIY Electronics", "C / Assembly Optimization"],
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
      className="relative border-t border-zinc-200 dark:border-zinc-800/80 bg-transparent py-20 sm:py-28 transition-colors duration-200 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-40 dark:opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado Monumental Centrado + Escenario 3D del Teclado Interactivo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-2xs backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5" />
            <span>
              {lang === "es"
                ? "07 // ECOSISTEMA TÉCNICO & TECLADO 3D"
                : "07 // TECH ECOSYSTEM & 3D KEYBOARD"}
            </span>
          </div>

          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
            {lang === "es" ? "HABILIDADES" : "SKILLS"}
          </h2>

          <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white/85 dark:bg-zinc-900/80 px-4 py-1.5 font-mono text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-md">
            <Keyboard className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {lang === "es"
                ? "(pasa el cursor, haz clic o presiona una tecla para inspeccionar cada tecnología)"
                : "(hover, tap or press a key to inspect each technology in 3D)"}
            </span>
          </p>
        </motion.div>

        {/* Escenario Abierto para el Teclado Mecánico 3D en Posición Central */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-[380px] sm:h-[460px] lg:h-[520px] w-full"
        />

        {/* Barra de Filtrado de Arquitectura y Servicios */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
              {lang === "es"
                ? "Arquitectura por Dominio & Servicios de Ingeniería"
                : "Domain Architecture & Engineering Services"}
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {lang === "es"
                ? "Desglose estructurado de las 24 herramientas del ecosistema en producción"
                : "Structured breakdown of the 24 production ecosystem tools"}
            </p>
          </div>

          {/* Pestañas Interactivas de Filtrado (Tabs) */}
          <div
            role="tablist"
            aria-label={
              lang === "es"
                ? "Filtrar categorías técnicas"
                : "Filter technical categories"
            }
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              className={`cursor-can-hover inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 font-mono text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "border-emerald-500 bg-emerald-500 text-zinc-950 shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{lang === "es" ? "Todos (4)" : "All (4)"}</span>
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
                  className={`cursor-can-hover inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 font-mono text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500 text-zinc-950 shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50"
                  }`}
                >
                  <span>{category.title[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cuadrícula Bento de Categorías y Servicios */}
        <motion.div
          layout
          className={`grid grid-cols-1 gap-6 ${
            filteredCategories.length === 1 ? "lg:grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                  className="interactive-surface group flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-6 sm:p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-md"
                >
                  <div>
                    {/* Cabecera de la Tarjeta Bento */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${category.accentClass}`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">
                            {category.title[lang]}
                          </h4>
                          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                            {category.subtitle[lang]}
                          </p>
                        </div>
                      </div>

                      <span className="hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 sm:inline-flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {category.skills.length}{" "}
                        {lang === "es" ? "TECNOLOGÍAS" : "TECHS"}
                      </span>
                    </div>

                    {/* Resumen de Servicio de Ingeniería */}
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {category.serviceSummary[lang]}
                    </p>
                  </div>

                  {/* Píldoras de Tecnologías de la Categoría */}
                  <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-5">
                    <div className="mb-3 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      <Code2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>
                        {lang === "es"
                          ? "HERRAMIENTAS & ENTORNOS EN PRODUCCIÓN"
                          : "PRODUCTION TOOLS & ENVIRONMENTS"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
