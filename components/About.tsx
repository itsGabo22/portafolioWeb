"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  UserCheck,
  MapPin,
  GraduationCap,
  Rocket,
  Gamepad2,
  Terminal,
  Code2,
  Layers,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const TECH_STACK_PILLS = [
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Python",
  "FastAPI",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "AWS",
];

export default function About() {
  const { lang } = useApp();
  const [imageError, setImageError] = useState(false);

  const quickFacts = [
    {
      id: "location",
      icon: MapPin,
      accent: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      label: { es: "Ubicación", en: "Location" },
      value: {
        es: "Pasto, Nariño, Colombia",
        en: "Pasto, Nariño, Colombia",
      },
    },
    {
      id: "semester",
      icon: GraduationCap,
      accent: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      label: { es: "Semestre", en: "Semester" },
      value: {
        es: "5.º Semestre — Ingeniería de Software (UCC)",
        en: "5th Semester — Software Engineering (UCC)",
      },
    },
    {
      id: "agency",
      icon: Rocket,
      accent: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      label: { es: "Agencia", en: "Agency" },
      value: {
        es: "Fundador de VICARDEV & ElectroTech Pasto",
        en: "Founder of VICARDEV & ElectroTech Pasto",
      },
    },
    {
      id: "interests",
      icon: Gamepad2,
      accent: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      label: { es: "Intereses", en: "Interests" },
      value: {
        es: "Arquitectura de Software, IA, Electrónica/Arduino, Ajedrez & Gaming",
        en: "Software Architecture, AI, DIY Electronics, Chess & Gaming",
      },
    },
  ];

  return (
    <section
      id="about"
      className="relative border-t border-zinc-200 dark:border-zinc-800/80 bg-transparent py-20 sm:py-28 transition-colors duration-200 overflow-hidden"
    >
      {/* Sutil cuadrícula de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-50 dark:opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-2xs">
            <UserCheck className="h-3.5 w-3.5" />
            <span>
              {lang === "es" ? "01 // ACERCA DE MÍ" : "01 // ABOUT ME"}
            </span>
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            {lang === "es" ? (
              <>
                Ingeniería, arquitectura escalable y{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  visión de producto
                </span>
              </>
            ) : (
              <>
                Engineering, scalable architecture &amp;{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  product vision
                </span>
              </>
            )}
          </h2>
        </motion.div>

        {/* Contenedor Principal: Columna Izquierda (Marco Visual / Arquitectura) + Columna Derecha (Bio + Quick Facts) */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Columna Visual (5 columnas en LG): Foto /images/about.jpg o Ilustración Interactiva de Arquitectura */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="interactive-surface relative overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-5 shadow-md dark:shadow-2xl backdrop-blur-md">
              {/* Cabecera del Marco Visual */}
              <div className="mb-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    architecture://gabo-paz.sys
                  </span>
                </div>
                <span className="rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                  UCC // 5TH SEM
                </span>
              </div>

              {/* Marco de Imagen /images/about.jpg con Fallback de Tarjeta de Código/Arquitectura */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                {!imageError ? (
                  <Image
                    src="/images/avatar.jpeg"
                    alt={
                      lang === "es"
                        ? "Gabriel Esteban Paz Guerrero — Ingeniería de Software"
                        : "Gabriel Esteban Paz Guerrero — Software Engineering"
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    onError={() => setImageError(true)}
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col justify-between bg-zinc-50 dark:bg-zinc-950 p-5 font-mono text-xs">
                    <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-60 dark:opacity-40" />

                    {/* Bloque de Código de Arquitectura Estilizado */}
                    <div className="relative z-10 space-y-2 rounded-lg border border-zinc-200 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/90 p-4 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                        <span>profile.config.ts</span>
                        <Code2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="space-y-1 text-[11px] leading-relaxed">
                        <div>
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                            const
                          </span>{" "}
                          <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                            engineer
                          </span>{" "}
                          ={" "}
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {"{"}
                          </span>
                        </div>
                        <div className="pl-3 text-zinc-700 dark:text-zinc-300">
                          name:{" "}
                          <span className="text-emerald-700 dark:text-emerald-300">
                            &quot;Gabriel Esteban Paz&quot;
                          </span>
                          ,
                        </div>
                        <div className="pl-3 text-zinc-700 dark:text-zinc-300">
                          role:{" "}
                          <span className="text-emerald-700 dark:text-emerald-300">
                            &quot;Full-Stack &amp; AI Architect&quot;
                          </span>
                          ,
                        </div>
                        <div className="pl-3 text-zinc-700 dark:text-zinc-300">
                          ventures:{" "}
                          <span className="text-indigo-600 dark:text-indigo-300">
                            [&quot;VICARDEV&quot;, &quot;ElectroTech&quot;]
                          </span>
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-400">
                          {"};"}
                        </div>
                      </div>
                    </div>

                    {/* Indicadores de Nodos de Sistema */}
                    <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-3">
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2">
                        <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div className="truncate">
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                            {lang === "es" ? "Arquitectura" : "Architecture"}
                          </div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">
                            Cloud &amp; Web
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2">
                        <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <div className="truncate">
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                            {lang === "es" ? "Automatización" : "Automation"}
                          </div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">
                            AI &amp; IoT Systems
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pie de Tarjeta Visual */}
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {lang === "es"
                    ? "Ingeniería de Software Activa"
                    : "Active Software Engineering"}
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  @itsGabo22
                </span>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha (7 columnas en LG): Párrafo en Primera Persona (3-5 líneas) + Quick Facts + Stack Pills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Presentación Personal en Primera Persona (3 a 5 líneas, lectura < 20 segundos) */}
            <div className="interactive-surface rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-6 sm:p-8 shadow-sm backdrop-blur-md">
              <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-200">
                {lang === "es" ? (
                  <>
                    Soy estudiante de 5.º semestre de Ingeniería de Software en la
                    Universidad Cooperativa de Colombia (UCC), desarrollador
                    Full-Stack y fundador de{" "}
                    <strong className="font-semibold text-zinc-950 dark:text-white underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                      VICARDEV
                    </strong>{" "}
                    y{" "}
                    <strong className="font-semibold text-zinc-950 dark:text-white underline decoration-indigo-500/70 decoration-2 underline-offset-4">
                      ElectroTech Pasto
                    </strong>
                    . Me apasiona diseñar arquitecturas web escalables, integrar
                    soluciones de inteligencia artificial y desarrollar sistemas de
                    automatización que transforman desafíos complejos en productos
                    digitales de alto impacto.
                  </>
                ) : (
                  <>
                    I am a 5th-semester Software Engineering student at Universidad
                    Cooperativa de Colombia (UCC), a Full-Stack Developer, and the
                    founder of{" "}
                    <strong className="font-semibold text-zinc-950 dark:text-white underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                      VICARDEV
                    </strong>{" "}
                    and{" "}
                    <strong className="font-semibold text-zinc-950 dark:text-white underline decoration-indigo-500/70 decoration-2 underline-offset-4">
                      ElectroTech Pasto
                    </strong>
                    . I am passionate about designing scalable web architectures,
                    integrating artificial intelligence, and building automation
                    systems that turn complex challenges into high-impact digital
                    products.
                  </>
                )}
              </p>
            </div>

            {/* Cuadrícula de Datos Rápidos (Quick Facts Grid) */}
            <div>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {lang === "es"
                  ? "DATOS RÁPIDOS // FICHA TÉCNICA"
                  : "QUICK FACTS // TECHNICAL SHEET"}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickFacts.map((fact) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={fact.id}
                      className="group flex items-start gap-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs transition-all duration-200 hover:border-emerald-500/50 hover:shadow-md"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${fact.accent}`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {fact.label[lang]}
                        </div>
                        <div className="mt-0.5 font-display text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-100">
                          {fact.value[lang]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Píldoras de Habilidades y Tecnologías (Skills / Tech Stack Pills) */}
            <div>
              <h3 className="mb-3.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {lang === "es"
                  ? " TECNOLOGÍAS PRINCIPALES // CORE STACK"
                  : "CORE TECHNOLOGIES // TECH STACK"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK_PILLS.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-1.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs transition-all duration-200 hover:border-emerald-500/60 hover:bg-emerald-500/5 hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
