"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowDown, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/messages";
import TechBadge from "../TechBadge";
import { ProjectActions, StatusBadge } from "../projects/ProjectBits";
import { ScreenContent } from "./DeviceMockups2D";
import type { LabItem } from "./shared";

/**
 * Side panel (bottom sheet on phones) with the same data as the project card.
 * Esc / scrim / close button dismiss it; focus moves in on open and the caller
 * restores it to the device that opened it. Tab is kept inside while open.
 */
export default function DevicePanel({
  item,
  reducedMotion,
  onClose,
}: {
  item: LabItem;
  reducedMotion: boolean;
  onClose: () => void;
}) {
  const { lang } = useApp();
  const t = useT();
  const { project } = item;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `lab-panel-title-${project.id}`;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-950/45 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reducedMotion ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={transition}
        className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-stage border border-line bg-surface-1 p-5 shadow-elev-3 sm:inset-y-3 sm:right-3 sm:left-auto sm:max-h-none sm:w-[26rem] sm:rounded-stage sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-accent">{t.deviceLab.panel.label}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.deviceLab.panel.close}
            className="cursor-can-hover -mr-1 -mt-1 inline-flex h-11 w-11 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <h3 id={titleId} className="mt-1 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
          {project.title[lang]}
        </h3>

        <div className="mt-4 aspect-video overflow-hidden rounded-card border border-line bg-zinc-950">
          <ScreenContent item={item} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-ink-subtle">{t.deviceLab.panel.platform}</dt>
            <dd className="font-medium text-ink">{t.deviceLab.platform[project.platform ?? "web"]}</dd>
          </div>
          {project.status && (
            <div>
              <dt className="text-xs text-ink-subtle">{t.deviceLab.panel.status}</dt>
              <dd className="mt-0.5">
                <StatusBadge status={project.status} />
              </dd>
            </div>
          )}
          <div className="col-span-2">
            <dt className="text-xs text-ink-subtle">{t.deviceLab.panel.context}</dt>
            <dd className="font-medium text-ink">{project.tagline[lang]}</dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{project.description[lang]}</p>

        <p className="mt-5 text-xs text-ink-subtle">{t.deviceLab.panel.stack}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <TechBadge name={tag} size="xs" />
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-ink-subtle">{t.deviceLab.panel.links}</p>
        <div className="mt-2">
          <ProjectActions project={project} />
        </div>

        <a
          href={`#project-${project.id}`}
          onClick={onClose}
          className="cursor-can-hover mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          <span>{project.title[lang].split(" — ")[0]}</span>
        </a>
      </motion.div>
    </div>,
    document.body
  );
}
