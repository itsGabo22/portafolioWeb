"use client";

import React, { useSyncExternalStore } from "react";
import {
  Terminal,
  ArrowUp,
  Code2,
  Briefcase,
  Mail,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const QUICK_LINKS = [
  { href: "#hero", label: { es: "Inicio", en: "Home" } },
  { href: "#about", label: { es: "Acerca de mí", en: "About" } },
  { href: "#projects", label: { es: "Proyectos", en: "Projects" } },
  { href: "#testimonials", label: { es: "Testimonios", en: "Testimonials" } },
  { href: "#experience", label: { es: "Experiencia", en: "Experience" } },
  { href: "#skills", label: { es: "Habilidades", en: "Skills" } },
  { href: "#contact", label: { es: "Contacto", en: "Contact" } },
];

const subscribeNoop = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

export default function Footer() {
  const { lang } = useApp();
  const currentYear = useSyncExternalStore(
    subscribeNoop,
    getClientYear,
    getServerYear
  );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-700 dark:text-zinc-300 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Columna 1: Identidad de Marca & Ecosistema (5 columnas) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="inline-flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 transition-colors group-hover:border-emerald-500/60">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold tracking-wider text-zinc-900 dark:text-zinc-50">
                  <span className="text-emerald-600 dark:text-emerald-400">&lt;</span>
                  GP
                  <span className="text-indigo-600 dark:text-indigo-400">/&gt;</span>{" "}
                  <span className="text-xs font-normal text-zinc-500">
                    {"// @itsGabo22"}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  VICARDEV · ElectroTech Pasto · Obsidion
                </div>
              </div>
            </a>

            <p className="max-w-sm text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {lang === "es"
                ? "Portafolio profesional y académico de Gabriel Esteban Paz Guerrero. Ingeniería de Software (5.º semestre, UCC Pasto), arquitectura Full-Stack, automatización e Inteligencia Artificial."
                : "Professional and academic portfolio of Gabriel Esteban Paz Guerrero. Software Engineering (5th semester, UCC Pasto), Full-Stack architecture, automation, and Artificial Intelligence."}
            </p>

            {/* Insignia Explícita de Créditos Obligatoria */}
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {lang === "es"
                    ? "Hecho con Next.js + Tailwind CSS"
                    : "Built with Next.js + Tailwind CSS"}
                </span>
              </span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos a Secciones (4 columnas) */}
          <div className="md:col-span-4">
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {lang === "es" ? "NAVEGACIÓN RÁPIDA" : "QUICK LINKS"}
            </h3>
            <ul className="grid grid-cols-2 gap-2 font-mono text-xs">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    {link.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Redes Sociales & Botón Volver Arriba (3 columnas) */}
          <div className="md:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                {lang === "es" ? "CONECTAR" : "CONNECT"}
              </h3>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/itsGabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub @itsGabo22"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-all hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Code2 className="h-4 w-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/itsgabo22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Gabriel Esteban Paz Guerrero"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-all hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Briefcase className="h-4 w-4" />
                </a>

                <a
                  href="mailto:contacto@vicardev.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email contacto@vicardev.digital"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-all hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Botón «Volver arriba» / «Back to top» */}
            <div>
              <button
                type="button"
                onClick={handleBackToTop}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                <ArrowUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === "es" ? "Volver arriba" : "Back to top"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Barra Inferior: Año Dinámico + Copyright Bilingüe */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800/80 pt-6 sm:flex-row font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            © {currentYear} Gabriel Esteban Paz Guerrero.{" "}
            {lang === "es"
              ? "Todos los derechos reservados."
              : "All rights reserved."}
          </p>
          <p className="text-[11px]">
            {lang === "es"
              ? "Pasto, Nariño — Colombia // Ingeniería de Software (UCC)"
              : "Pasto, Nariño — Colombia // Software Engineering (UCC)"}
          </p>
        </div>
      </div>
    </footer>
  );
}
