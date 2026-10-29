"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Menu,
  X,
  Download,
  ChevronRight,
  Code2,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface NavItem {
  label: {
    es: string;
    en: string;
  };
  href: string;
  code: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: { es: "Inicio", en: "Home" }, href: "#hero", code: "00" },
  { label: { es: "Acerca de mí", en: "About" }, href: "#about", code: "01" },
  { label: { es: "Proyectos", en: "Projects" }, href: "#projects", code: "02" },
  {
    label: { es: "Testimonios", en: "Testimonials" },
    href: "#testimonials",
    code: "03",
  },
  {
    label: { es: "Experiencia", en: "Experience" },
    href: "#experience",
    code: "04",
  },
  { label: { es: "Habilidades", en: "Skills" }, href: "#skills", code: "05" },
  { label: { es: "Contacto", en: "Contact" }, href: "#contact", code: "06" },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "hero",
        "about",
        "projects",
        "testimonials",
        "experience",
        "skills",
        "contact",
      ];

      const scrollPosition = window.scrollY + 140;

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
          ? "backdrop-blur-md bg-white/85 dark:bg-zinc-950/85 border-b border-zinc-200/90 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.45)]"
          : "backdrop-blur-md bg-white/75 dark:bg-zinc-950/75 border-b border-zinc-200/70 dark:border-zinc-900"
      }`}
    >
      <nav
        aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
      >
        {/* Marca / Identidad Desarrollador */}
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 text-emerald-600 dark:text-emerald-400 transition-all duration-300 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.2)]">
            <Terminal className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-zinc-900 dark:text-zinc-50">
              <span className="text-emerald-600 dark:text-emerald-400">&lt;</span>
              <span>GP</span>
              <span className="text-indigo-600 dark:text-indigo-400">/&gt;</span>
              <span className="hidden rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400 sm:inline-block">
                VICARDEV
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 dark:text-zinc-400">
              GABO.DEV // @itsGabo22
            </span>
          </div>
        </a>

        {/* Navegación Desktop */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_ITEMS.map((item) => {
            const sectionKey = item.href.replace("#", "");
            const isActive = activeSection === sectionKey;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`group relative px-2.5 py-2 font-mono text-xs font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50"
                }`}
              >
                <span className="mr-1 text-[10px] text-zinc-400 dark:text-zinc-500 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400/80">
                  {item.code}.
                </span>
                {item.label[lang]}

                {isActive ? (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-transform duration-200 group-hover:scale-x-100" />
                )}
              </a>
            );
          })}
        </div>

        {/* Controles Desktop: Idioma (ES | EN), Tema (Light | Dark) y Descarga CV */}
        <div className="hidden md:flex md:items-center md:gap-2.5">
          {/* Conmutador de Idioma (ES | EN) */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={
              lang === "es"
                ? "Switch language to English"
                : "Cambiar idioma a Español"
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 px-2.5 py-2 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-all hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className={lang === "es" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-400 dark:text-zinc-500"}>
              ES
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className={lang === "en" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-400 dark:text-zinc-500"}>
              EN
            </span>
          </button>

          {/* Conmutador de Tema (Claro / Oscuro) */}
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-200 transition-all hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 text-zinc-700 transition-transform duration-200 hover:-rotate-12" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            )}
          </button>

          {/* Descarga rápida CV */}
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/30 dark:border-emerald-500/40 bg-emerald-500/10 px-3 py-2 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-zinc-950"
          >
            <Download className="h-3.5 w-3.5" />
            <span>CV.pdf</span>
          </a>
        </div>

        {/* Controles Móviles: Idioma + Tema + Botón Menú Hamburguesa */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={
              lang === "es"
                ? "Switch language to English"
                : "Cambiar idioma a Español"
            }
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 px-2.5 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 md:hidden"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{lang.toUpperCase()}</span>
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-200 md:hidden"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 text-zinc-700" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400" />
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Drawer de Navegación Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1.5 px-4 pt-2 pb-5">
              <div className="mb-3 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-2 font-mono text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {lang === "es" ? "DIRECTORIO DE SECCIONES" : "SECTION DIRECTORY"}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  SYS.ONLINE
                </span>
              </div>

              {NAV_ITEMS.map((item) => {
                const sectionKey = item.href.replace("#", "");
                const isActive = activeSection === sectionKey;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 font-mono text-sm transition-all ${
                      isActive
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
                        : "border-transparent bg-zinc-100/70 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400/80">
                        {item.code}
                      </span>
                      <span>{item.label[lang]}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                  </a>
                );
              })}

              {/* Controles de Idioma y Tema dentro del Drawer Móvil */}
              <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 py-2.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === "es" ? "Idioma: ES" : "Lang: EN"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 py-2.5 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4 text-indigo-600" />
                      <span>{lang === "es" ? "Modo Oscuro" : "Dark Mode"}</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4 text-amber-400" />
                      <span>{lang === "es" ? "Modo Claro" : "Light Mode"}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2">
                <a
                  href="/cv.pdf"
                  download
                  onClick={handleLinkClick}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600/40 dark:border-emerald-500/50 bg-emerald-500 px-4 py-2.5 font-mono text-xs font-bold text-zinc-950 transition-all hover:bg-emerald-400"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {lang === "es" ? "Descargar CV (PDF)" : "Download CV (PDF)"}
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
