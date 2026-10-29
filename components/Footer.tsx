"use client";

import React, { useSyncExternalStore } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { useApp } from "@/context/AppContext";

function GitHubSvg({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInSvg({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: "#hero", label: { es: "Inicio", en: "Home" } },
  { href: "#about", label: { es: "Sobre mí", en: "About" } },
  { href: "#projects", label: { es: "Proyectos", en: "Projects" } },
  { href: "#testimonials", label: { es: "Testimonios", en: "Testimonials" } },
  { href: "#experience", label: { es: "Experiencia", en: "Experience" } },
  { href: "#skills", label: { es: "Skills", en: "Skills" } },
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
    <footer className="relative z-20 border-t border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-950/65 backdrop-blur-2xl backdrop-saturate-150 text-zinc-600 dark:text-zinc-400 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand & Mandatory Credit */}
          <div className="space-y-2">
            <a
              href="#hero"
              className="cursor-can-hover inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              <span>Gabriel Esteban Paz Guerrero</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </a>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {lang === "es"
                ? "Hecho con Next.js + Tailwind CSS · Fundador de VICARDEV"
                : "Built with Next.js + Tailwind CSS · Founder of VICARDEV"}
            </p>
          </div>

          {/* Section Links */}
          <nav
            aria-label={lang === "es" ? "Enlaces del pie de página" : "Footer links"}
            className="flex flex-wrap items-center gap-4 text-xs font-medium"
          >
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-can-hover text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                {link.label[lang]}
              </a>
            ))}
          </nav>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/itsGabo22"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub @itsGabo22"
              className="cursor-can-hover inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <GitHubSvg className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/itsgabo22"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Gabriel Esteban Paz Guerrero"
              className="cursor-can-hover inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <LinkedInSvg className="h-4 w-4" />
            </a>

            <a
              href="mailto:vicardev2026@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email vicardev2026@gmail.com"
              className="cursor-can-hover inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={handleBackToTop}
              className="cursor-can-hover inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 px-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>{lang === "es" ? "Volver arriba" : "Back to top"}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-zinc-300/60 dark:border-zinc-800/70 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {currentYear} Gabriel Esteban Paz Guerrero.{" "}
            {lang === "es"
              ? "Todos los derechos reservados."
              : "All rights reserved."}
          </p>
          <p>Pasto, Nariño — Colombia · Ingeniería de Software (UCC)</p>
        </div>
      </div>
    </footer>
  );
}
