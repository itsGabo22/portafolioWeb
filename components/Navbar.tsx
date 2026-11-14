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
import { useT } from "@/messages";
import { scrollToSection } from "@/lib/scrollToSection";

const NAV_KEYS = [
  "hero",
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
  "beyond",
] as const;

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, sfxMuted, toggleSfx } =
    useApp();
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = NAV_KEYS;

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

  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Mobile drawer: closing it changes layout mid-jump and cancels the native
  // smooth anchor scroll, so scroll programmatically after closing.
  const handleDrawerAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const target = document.getElementById(href.replace("#", ""));
    setIsOpen(false);
    if (!target) return;
    e.preventDefault();
    window.history.pushState(null, "", href);
    // Wait for the drawer exit animation (0.22s) so layout is stable.
    window.setTimeout(() => scrollToSection(target), 260);
  };

  // Every other in-page link (desktop nav, hero CTAs, footer, cross-links):
  // smooth jump with a landing correction instead of the native anchor scroll,
  // which stops short when lazily mounted content changes the page height.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return; // e.g. #beyond-games: handled by the Beyond tabs
      event.preventDefault();
      const next = `#${id}`;
      if (window.location.hash !== next) {
        window.history.pushState(null, "", next);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      scrollToSection(target);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/45 dark:bg-zinc-950/55 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/75 dark:border-white/10 shadow-[0_4px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.85)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-white/30 dark:bg-zinc-950/30 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 dark:border-white/5"
      }`}
    >
      <nav
        aria-label={t.nav.aria}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
      >
        {/* Minimalist Typographic Brand Mark */}
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="cursor-can-hover group flex items-center gap-2.5 px-2 py-1"
        >
          <span className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Gabriel Paz
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-150" />
        </a>

        {/* Clean Center Navigation Links inside Frosted Pill */}
        <div className="hidden xl:flex xl:items-center xl:gap-0.5 rounded-2xl border border-white/75 dark:border-white/10 bg-white/45 dark:bg-zinc-900/45 px-2 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-2xl">
          {NAV_KEYS.map((sectionKey) => {
            const href = `#${sectionKey}`;
            const isActive = activeSection === sectionKey;

            return (
              <a
                key={href}
                href={href}
                className={`cursor-can-hover relative rounded-xl px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary-ink font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                }`}
              >
                {t.nav.items[sectionKey]}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-ink"
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
            <span className="sr-only">: {t.nav.switchLang}</span>
          </button>

          {/* Integrated Keyboard SFX Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={toggleSfx}
            aria-pressed={!sfxMuted}
            aria-label={sfxMuted ? t.nav.sfxUnmute : t.nav.sfxMute}
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
            aria-label={theme === "light" ? t.nav.darkOn : t.nav.lightOn}
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
            className="cursor-can-hover inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all bg-primary text-on-primary hover:bg-primary-strong"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{t.nav.cv}</span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={`${lang.toUpperCase()}: ${t.nav.switchLang}`}
            className="inline-flex h-9 items-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 px-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 backdrop-blur-xl md:hidden"
          >
            {lang.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={toggleSfx}
            aria-label={sfxMuted ? t.nav.sfxUnmute : t.nav.sfxMute}
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
            aria-label={theme === "light" ? t.nav.darkOn : t.nav.lightOn}
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
            ref={menuButtonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isOpen ? t.nav.menuClose : t.nav.menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/55 text-zinc-800 dark:text-zinc-200 backdrop-blur-xl"
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
            className="overflow-hidden border-b border-white/75 dark:border-white/10 bg-white/65 dark:bg-zinc-950/75 backdrop-blur-2xl backdrop-saturate-150 xl:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 pt-2 pb-5">
              {NAV_KEYS.map((sectionKey) => {
                const href = `#${sectionKey}`;
                const isActive = activeSection === sectionKey;

                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleDrawerAnchorClick(e, href)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/70 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    <span>{t.nav.items[sectionKey]}</span>
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  </a>
                );
              })}

              <div className="pt-3">
                <a
                  href="/cv.pdf"
                  download
                  onClick={handleLinkClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold bg-primary text-on-primary hover:bg-primary-strong"
                >
                  <FileText className="h-4 w-4" />
                  <span>{t.nav.downloadCv}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
