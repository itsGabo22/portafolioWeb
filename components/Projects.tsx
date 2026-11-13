"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { projects, type Project, type MediaManifest } from "@/data/projects";
import { useApp } from "@/context/AppContext";
import { fmt, useT } from "@/messages";
import TechBadge from "./TechBadge";
import { ProjectActions, StatusBadge } from "./projects/ProjectBits";
import DeviceLab from "./devicelab/DeviceLab";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useApp();
  const t = useT();
  const [imgError, setImgError] = useState(false);
  const isCommercial = project.category === "commercial";

  return (
    <article
      id={`project-${project.id}`}
      data-reveal
      style={{ "--reveal-i": index % 3 } as React.CSSProperties}
      className="group flex scroll-mt-24 flex-col justify-between overflow-hidden rounded-card border border-line bg-surface-1/85 shadow-elev-1 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-elev-2"
    >
      <div>
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-950">
          {project.image && !imgError ? (
            <Image
              src={project.image}
              alt={fmt(t.projects.imageAlt, { title: project.title[lang] })}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
              onError={() => setImgError(true)}
              className="sp-shot object-cover object-top"
            />
          ) : (
            <div
              aria-hidden="true"
              className="bg-dot-matrix flex h-full w-full items-center justify-center bg-zinc-900 px-6 text-center font-display text-lg font-semibold text-zinc-300"
            >
              {project.title[lang].split(" — ")[0]}
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-zinc-100 backdrop-blur-md">
              {isCommercial ? t.projects.pill.commercial : t.projects.pill.academic}
            </span>
            <span className="flex flex-wrap items-center gap-1.5">
              {project.status && <StatusBadge status={project.status} tone="overlay" />}
              {project.nda && (
                <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-md">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  <span>NDA</span>
                </span>
              )}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-28 flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent p-4">
            <h4 className="font-display text-lg font-bold leading-snug text-white">
              {project.title[lang]}
            </h4>
            <span className="mt-1 w-fit rounded-md bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-zinc-100 backdrop-blur-sm">
              {project.tagline[lang]}
            </span>
          </div>
        </div>

        <p className="p-5 text-sm leading-relaxed text-ink-muted">{project.description[lang]}</p>
      </div>

      <div className="px-5 pb-5 pt-1">
        <ul className="mb-4 flex flex-wrap gap-1.5" aria-label={project.title[lang]}>
          {project.tags.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} size="xs" />
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-4">
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectGroup({
  id,
  title,
  subtitle,
  items,
  columnsClass,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: Project[];
  columnsClass: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-20 first:mt-0" aria-labelledby={id} role="group">
      <div className="mb-6 border-b border-line pb-3" data-reveal>
        <h3 id={id} className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
      </div>
      {children}
      <div className={`grid grid-cols-1 gap-6 ${columnsClass}`}>
        {items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function Projects({ media = {} }: { media?: MediaManifest }) {
  const t = useT();

  const designProjects = projects.filter((p) => p.category === "interface-design");
  const academicProjects = projects.filter((p) => p.category === "academic");
  const commercialProjects = projects.filter((p) => p.category === "commercial");

  return (
    <section id="projects" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center" data-reveal>
          <h2 className="font-display text-[length:var(--text-h2)] font-bold leading-[var(--leading-tight)] tracking-tight text-ink">
            {t.projects.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-muted">{t.projects.subtitle}</p>
        </div>

        <ProjectGroup
          id="projects-design"
          title={t.projects.groups.design.title}
          subtitle={t.projects.groups.design.subtitle}
          items={designProjects}
          columnsClass="md:grid-cols-2"
        >
          <DeviceLab projects={designProjects} media={media} />
        </ProjectGroup>

        <ProjectGroup
          id="projects-academic"
          title={t.projects.groups.academic.title}
          subtitle={t.projects.groups.academic.subtitle}
          items={academicProjects}
          columnsClass="md:grid-cols-2"
        />

        <ProjectGroup
          id="projects-commercial"
          title={t.projects.groups.commercial.title}
          subtitle={t.projects.groups.commercial.subtitle}
          items={commercialProjects}
          columnsClass="md:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </section>
  );
}
