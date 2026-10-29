"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  FileText,
  ChevronRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface NavItem {
  label: {
    es: string;
    en: string;
  };
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: { es: "Inicio", en: "Home" }, href: "#hero" },
  { label: { es: "Sobre mí", en: "About" }, href: "#about" },
  { label: { es: "Proyectos", en: "Projects" }, href: "#projects" },
  { label: { es: "Testimonios", en: "Testimonials" }, href: "#testimonials" },
  { label: { es: "Experiencia", en: "Experience" }, href: "#experience" },
  { label: { es: "Skills", en: "Skills" }, href: "#skills" },
  { label: { es: "Contacto", en: "Contact" }, href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, sfxMuted, toggleSfx } =
    useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = [
        "hero",
        "about",
        "projects",
        "testimonials",
        "experience",
        "skills",
        "contact",
      ];

      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/45 dark:bg-zinc-950/55 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/75 dark:border-white/10 shadow-[0_4px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.85)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-white/30 dark:bg-zinc-950/30 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 dark:border-white/5"
      }`}
    >
      <nav
        aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
      >
        {/* Minimalist Typographic Brand Mark */}
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="cursor-can-hover group flex items-center gap-2.5 px-2 py-1 focus:outline-none"
        >
          <span className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Gabriel Paz
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-150" />
        </a>

        {/* Clean Center Navigation Links inside Frosted Pill */}
        <div className="hidden lg:flex lg:items-center lg:gap-1 rounded-2xl border border-white/75 dark:border-white/10 bg-white/45 dark:bg-zinc-900/45 px-2 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-2xl">
          {NAV_ITEMS.map((item) => {
            const sectionKey = item.href.replace("#", "");
            const isActive = activeSection === sectionKey;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`cursor-can-hover relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                }`}
              >
                {item.label[lang]}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-600 dark:bg-emerald-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Sleek Right Controls: Language, SFX Toggle, Theme, CV */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={
              lang === "es"
                ? "Switch language to English"
                : "Cambiar idioma a Español"
            }
            className="cursor-can-hover inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-colors hover:bg-white/80 dark:hover:bg-zinc-800/70"
          >
            <span
              className={
                lang === "es"
                  ? "font-bold text-zinc-950 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500"
              }
            >
              ES
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span
              className={
                lang === "en"
                  ? "font-bold text-zinc-950 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500"
              }
            >
              EN
            </span>
          </button>

          {/* Integrated Keyboard SFX Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={toggleSfx}
            title={
              sfxMuted
                ? lang === "es"
                  ? "Activar sonidos del teclado 3D"
                  : "Unmute 3D keyboard sound effects"
                : lang === "es"
                  ? "Silenciar sonidos del teclado 3D"
                  : "Mute 3D keyboard sound effects"
            }
            aria-label={
              sfxMuted
                ? lang === "es"
                  ? "Activar sonidos del teclado"
                  : "Toggle keyboard sound effects (Unmute)"
                : lang === "es"
                  ? "Silenciar sonidos del teclado"
                  : "Toggle keyboard sound effects (Mute)"
            }
            className="cursor-can-hover inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 text-zinc-700 dark:text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-colors hover:bg-white/80 dark:hover:bg-zinc-800/70"
          >
            {sfxMuted ? (
              <VolumeX className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? lang === "es"
                  ? "Activar modo oscuro"
                  : "Enable dark mode"
                : lang === "es"
                  ? "Activar modo claro"
                  : "Enable light mode"
            }
            className="cursor-can-hover inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 text-zinc-700 dark:text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-colors hover:bg-white/80 dark:hover:bg-zinc-800/70"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 text-zinc-700 transition-transform duration-200 hover:-rotate-12" />
            ) : (
              <Sun className="h-4 w-4 text-zinc-200 transition-transform duration-200 hover:rotate-45" />
            )}
          </button>

          <a
            href="/cv.pdf"
            download
            className="cursor-can-hover inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3.5 text-xs font-semibold text-white dark:text-zinc-950 transition-all hover:bg-zinc-800 dark:hover:bg-white"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={
              lang === "es"
                ? "Switch language to English"
                : "Cambiar idioma a Español"
            }
            className="inline-flex h-9 items-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 px-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 backdrop-blur-xl md:hidden"
          >
            {lang.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={toggleSfx}
            aria-label={
              lang === "es"
                ? "Activar o silenciar sonidos del teclado"
                : "Toggle keyboard sound effects"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 text-zinc-700 dark:text-zinc-200 backdrop-blur-xl md:hidden"
          >
            {sfxMuted ? (
              <VolumeX className="h-4 w-4 text-zinc-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? lang === "es"
                  ? "Activar modo oscuro"
                  : "Enable dark mode"
                : lang === "es"
                  ? "Activar modo claro"
                  : "Enable light mode"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 text-zinc-700 dark:text-zinc-200 backdrop-blur-xl md:hidden"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 text-zinc-700" />
            ) : (
              <Sun className="h-4 w-4 text-zinc-200" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              isOpen
                ? lang === "es"
                  ? "Cerrar menú de navegación"
                  : "Close navigation menu"
                : lang === "es"
                  ? "Abrir menú de navegación"
                  : "Open navigation menu"
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 text-zinc-800 dark:text-zinc-200 backdrop-blur-xl focus:outline-none"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/75 dark:border-white/10 bg-white/65 dark:bg-zinc-950/75 backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 pt-2 pb-5">
              {NAV_ITEMS.map((item) => {
                const sectionKey = item.href.replace("#", "");
                const isActive = activeSection === sectionKey;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/70 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label[lang]}</span>
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  </a>
                );
              })}

              <div className="pt-3">
                <a
                  href="/cv.pdf"
                  download
                  onClick={handleLinkClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-white dark:text-zinc-950"
                >
                  <FileText className="h-4 w-4" />
                  <span>
                    {lang === "es" ? "Descargar CV" : "Download CV"}
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
