"use client";

import React, { useSyncExternalStore } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { useT } from "@/messages";
import { GitHubIcon, LinkedInIcon } from "./icons";

const QUICK_LINKS = [
  "hero",
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
  "beyond",
] as const;

const subscribeNoop = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

export default function Footer() {
  const t = useT();
  const currentYear = useSyncExternalStore(
    subscribeNoop,
    getClientYear,
    getServerYear
  );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="dark band-primary relative z-20 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-center">
          {/* Brand & Mandatory Credit */}
          <div className="space-y-2">
            <a
              href="#hero"
              className="cursor-can-hover inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              <span>Gabriel Esteban Paz Guerrero</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
            </a>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {t.footer.madeWith} · {t.footer.founder}
            </p>
          </div>

          {/* Section Links */}
          <nav
            aria-label={t.footer.linksAria}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium xl:max-w-xl"
          >
            {QUICK_LINKS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="cursor-can-hover inline-flex min-h-11 items-center text-ink-muted transition-colors hover:text-ink"
              >
                {t.nav.items[key]}
              </a>
            ))}
          </nav>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/itsGabo22"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.common.githubAria} ${t.common.newTab}`}
              className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/gabriel-paz-8ab49733a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.common.linkedinAria} ${t.common.newTab}`}
              className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>

            <a
              href="mailto:vicardev2026@gmail.com"
              aria-label={t.common.emailAria}
              className="cursor-can-hover inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={handleBackToTop}
              className="cursor-can-hover inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/70 px-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur-xl transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span className="whitespace-nowrap">{t.footer.backToTop}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-zinc-300/60 dark:border-zinc-800/70 pt-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {currentYear} Gabriel Esteban Paz Guerrero.{" "}
            {t.footer.rights}
          </p>
          <p>{t.footer.place}</p>
        </div>
      </div>
    </footer>
  );
}
