"use client";

import { ArrowUpRight, CircleCheck, CircleDashed, Clock, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { isTodo } from "@/data/projects";
import { useT } from "@/messages";
import { GitHubIcon } from "../icons";

/** "Terminado" / "En desarrollo" badge. `tone` adapts it to dark media overlays. */
export function StatusBadge({
  status,
  tone = "surface",
}: {
  status: NonNullable<Project["status"]>;
  tone?: "surface" | "overlay";
}) {
  const t = useT();
  const done = status === "completed";
  const Icon = done ? CircleCheck : CircleDashed;
  const palette =
    tone === "overlay"
      ? done
        ? "bg-black/70 text-emerald-300"
        : "bg-black/70 text-amber-300"
      : done
        ? "border border-primary-line bg-primary-soft text-primary-ink"
        : "border border-warn/35 bg-warn-soft text-warn";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${palette}`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span>{t.projects.status[status]}</span>
    </span>
  );
}

const ghostButton =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-control border border-dashed border-line-strong px-3 py-2.5 text-xs font-medium text-ink-muted";
const secondaryButton =
  "cursor-can-hover inline-flex min-h-11 items-center justify-center gap-1.5 rounded-control border border-line bg-surface-1 px-3 py-2.5 text-xs font-medium text-ink transition-[background-color,transform] duration-150 hover:bg-surface-2 active:scale-[0.98]";
const primaryButton =
  "cursor-can-hover group/btn inline-flex min-h-11 items-center justify-center gap-1.5 rounded-control bg-primary px-3.5 py-2.5 text-xs font-semibold text-on-primary transition-[background-color,transform] duration-150 hover:bg-primary-strong active:scale-[0.98]";

/** GitHub + demo actions shared by the project cards and the Device Lab panel. */
export function ProjectActions({ project }: { project: Project }) {
  const t = useT();
  const privateCode = project.nda || project.privateRepo || !project.github;

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {privateCode ? (
        <span
          title={project.nda ? t.projects.privateNdaTitle : t.projects.privateRepoTitle}
          className={ghostButton}
        >
          <Lock className="h-3.5 w-3.5 shrink-0 text-warn" aria-hidden="true" />
          <span className="truncate">
            {project.nda ? t.projects.privateNda : t.projects.privateRepo}
          </span>
        </span>
      ) : (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{t.common.github}</span>
          <span className="sr-only"> {t.common.newTab}</span>
        </a>
      )}

      {isTodo(project.demo) ? (
        <span title={t.projects.demoSoonTitle} className={ghostButton}>
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{t.projects.demoSoon}</span>
        </span>
      ) : (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={primaryButton}>
          <span className="truncate">{t.projects.demo[project.demoType]}</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            aria-hidden="true"
          />
          <span className="sr-only"> {t.common.newTab}</span>
        </a>
      )}
    </div>
  );
}
