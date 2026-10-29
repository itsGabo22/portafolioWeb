"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects, Project, ProjectKind } from "@/data/projects";
import { useApp } from "@/context/AppContext";
import TechBadge from "./TechBadge";
import TiltSurface from "./TiltSurface";

function GitHubSvg({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useApp();
  const [imgError, setImgError] = useState(false);
  const isAcademic = project.projectType === "academic";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="flex w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1rem)]"
    >
      <TiltSurface maxTilt={6} className="w-full h-full">
        <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/80 dark:border-white/10 bg-white/52 dark:bg-zinc-900/60 ring-1 ring-zinc-900/[0.06] shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:bg-white/65 dark:hover:bg-zinc-900/75 hover:shadow-xl">
          <div>
            {/* Panoramic Showcase Window */}
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-950">
              {!imgError ? (
                <Image
                  src={project.image}
                  alt={project.title[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  onError={() => setImgError(true)}
                  className="sp-shot object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-sm font-medium text-zinc-400">
                  {project.title[lang]}
                </div>
              )}

              {/* Subtle Top Pill for Commercial vs Academic */}
              <div className="pointer-events-none absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-zinc-100 backdrop-blur-md">
                  {isAcademic
                    ? lang === "es"
                      ? "Académico UCC · IA"
                      : "UCC Academic · AI"
                    : lang === "es"
                      ? "Producción Comercial"
                      : "Live Commercial"}
                </span>

                {project.isPrivateRepo && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-md">
                    <Lock className="h-3 w-3" />
                    <span>NDA</span>
                  </span>
                )}
              </div>

              {/* Bottom Gradient Overlay with Title & Category Pill */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-28 flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent p-4">
                <h3 className="font-display text-lg font-bold leading-snug text-white drop-shadow-sm">
                  {project.title[lang]}
                </h3>
                <span className="mt-1 w-fit rounded-md bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-zinc-100 backdrop-blur-sm">
                  {project.category[lang]}
                </span>
              </div>
            </div>

            {/* Editorial Description */}
            <div className="p-5">
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.description[lang]}
              </p>
            </div>
          </div>

          {/* Card Footer: Real SVG Tech Badges + Action Links */}
          <div className="px-5 pb-5 pt-1">
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} size="xs" />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 border-t border-zinc-300/60 dark:border-zinc-800/80 pt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={
                  project.isPrivateRepo
                    ? lang === "es"
                      ? "Repositorio privado de cliente comercial — Ver perfil de GitHub"
                      : "Private commercial client repo — View GitHub profile"
                    : undefined
                }
                className="cursor-can-hover inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/80 px-3 py-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur-md transition-colors hover:bg-white/90 dark:hover:bg-zinc-800"
              >
                {project.isPrivateRepo ? (
                  <Lock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                ) : (
                  <GitHubSvg className="h-3.5 w-3.5 shrink-0" />
                )}
                <span className="truncate">
                  {project.isPrivateRepo
                    ? lang === "es"
                      ? "Código (NDA / GitHub)"
                      : "Code (Client NDA)"
                    : lang === "es"
                      ? "Código"
                      : "Source"}
                </span>
              </a>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-can-hover group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3.5 py-2.5 text-xs font-semibold text-white dark:text-zinc-950 transition-colors hover:bg-zinc-800 dark:hover:bg-white"
              >
                <span>{lang === "es" ? "Demo en vivo" : "Live Demo"}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </TiltSurface>
    </motion.article>
  );
}

export default function Projects() {
  const { lang } = useApp();
  const [filter, setFilter] = useState<"all" | ProjectKind>("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.projectType === filter);

  const commercialCount = projects.filter(
    (p) => p.projectType === "commercial"
  ).length;
  const academicCount = projects.filter(
    (p) => p.projectType === "academic"
  ).length;

  return (
    <section
      id="projects"
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Monumental Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
            {lang === "es" ? "Proyectos" : "Projects"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            {lang === "es"
              ? "Plataformas comerciales en producción y proyectos universitarios de Ingeniería de Software con IA."
              : "Live commercial production platforms and university Software Engineering + AI projects."}
          </p>

          {/* Frosted Glass Filter Tabs */}
          <div
            role="tablist"
            aria-label={
              lang === "es" ? "Filtrar proyectos" : "Filter projects"
            }
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 p-1.5 ring-1 ring-zinc-900/[0.06] shadow-[0_8px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              onClick={() => setFilter("all")}
              className={`cursor-can-hover rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {lang === "es"
                ? `Todos (${projects.length})`
                : `All (${projects.length})`}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={filter === "commercial"}
              onClick={() => setFilter("commercial")}
              className={`cursor-can-hover rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                filter === "commercial"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {lang === "es"
                ? `Comerciales & E-Commerce (${commercialCount})`
                : `Commercial & E-Commerce (${commercialCount})`}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={filter === "academic"}
              onClick={() => setFilter("academic")}
              className={`cursor-can-hover rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                filter === "academic"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {lang === "es"
                ? `Académicos UCC & IA (${academicCount})`
                : `UCC Academic & AI (${academicCount})`}
            </button>
          </div>
        </motion.div>

        {/* Centered Responsive Flex-Grid Architecture */}
        <div className="flex flex-wrap justify-center gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
