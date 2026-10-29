"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";
import TiltSurface from "./TiltSurface";

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

const GLASS_CARD_CLASS =
  "rounded-2xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 ring-1 ring-zinc-900/[0.06] shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150";

export default function About() {
  const { lang } = useApp();
  const [imageError, setImageError] = useState(false);

  const quickFacts = [
    {
      id: "location",
      label: { es: "Ubicación", en: "Location" },
      value: {
        es: "Pasto, Nariño, Colombia",
        en: "Pasto, Nariño, Colombia",
      },
    },
    {
      id: "semester",
      label: { es: "Educación", en: "Education" },
      value: {
        es: "5.º Semestre — Ingeniería de Software (UCC)",
        en: "5th Semester — Software Engineering (UCC)",
      },
    },
    {
      id: "agency",
      label: { es: "Marca Fundada", en: "Founded Brand" },
      value: {
        es: "VICARDEV (vicardev.digital)",
        en: "VICARDEV (vicardev.digital)",
      },
    },
    {
      id: "interests",
      label: { es: "Enfoque Técnico", en: "Technical Focus" },
      value: {
        es: "Arquitectura Cloud, E-Commerce, IA & Automatización",
        en: "Cloud Architecture, E-Commerce, AI & Automation",
      },
    },
  ];

  return (
    <section
      id="about"
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean Monumental Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl">
            {lang === "es" ? "Sobre mí" : "About Me"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            {lang === "es"
              ? "Ingeniería de software, arquitectura escalable y productos digitales en producción."
              : "Software engineering, scalable architecture, and digital products in live production."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Column: 3D-Tilted Portrait Frame with Frosted Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <TiltSurface maxTilt={7}>
              <div className={`overflow-hidden p-4 ${GLASS_CARD_CLASS}`}>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-950">
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
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-zinc-400">
                      Gabriel Paz
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between px-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Gabriel Esteban Paz Guerrero
                  </span>
                  <span className="font-mono">@itsGabo22</span>
                </div>
              </div>
            </TiltSurface>
          </motion.div>

          {/* Right Column: Editorial Bio + Minimalist Facts + Real SVG Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <TiltSurface maxTilt={4}>
              <div className={`p-6 sm:p-8 ${GLASS_CARD_CLASS}`}>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {lang === "es" ? (
                    <>
                      Soy estudiante de 5.º semestre de Ingeniería de Software
                      en la Universidad Cooperativa de Colombia (UCC),
                      desarrollador Full-Stack y fundador de{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        VICARDEV
                      </strong>
                      . Diseño arquitecturas web de alto rendimiento, tiendas de
                      comercio electrónico en producción para clientes como{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        Brisal
                      </strong>
                      ,{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        Blue Velvet
                      </strong>
                      ,{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        Carlin Cosméticos
                      </strong>{" "}
                      y{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        ElectroTech Pasto
                      </strong>
                      , además de integraciones de inteligencia artificial que
                      convierten problemas reales en productos escalables.
                    </>
                  ) : (
                    <>
                      I am a 5th-semester Software Engineering student at
                      Universidad Cooperativa de Colombia (UCC), a Full-Stack
                      Developer, and the founder of{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        VICARDEV
                      </strong>
                      . I architect high-performance web systems and live
                      production e-commerce platforms for clients including{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        Brisal
                      </strong>
                      ,{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        Blue Velvet
                      </strong>
                      ,{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        Carlin Cosmetics
                      </strong>
                      , and{" "}
                      <strong className="font-semibold text-zinc-950 dark:text-white">
                        ElectroTech Pasto
                      </strong>
                      , alongside artificial intelligence integrations that turn
                      real-world challenges into scalable products.
                    </>
                  )}
                </p>

                {/* Clean Typographic Facts Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-zinc-300/60 dark:border-zinc-800/80 pt-6 sm:grid-cols-2">
                  {quickFacts.map((fact) => (
                    <div key={fact.id} className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {fact.label[lang]}
                      </div>
                      <div className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {fact.value[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltSurface>

            {/* Real Vector SVG Tech Stack Badges */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {lang === "es" ? "Stack Principal" : "Core Stack"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK_PILLS.map((tech) => (
                  <TechBadge
                    key={tech}
                    name={tech}
                    size="sm"
                    interactive
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
