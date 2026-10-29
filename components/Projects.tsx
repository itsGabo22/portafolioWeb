"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Code2,
  Globe,
  Layers,
  Terminal,
  Sparkles,
  Lock,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { projects, Project, ProjectKind } from "@/data/projects";
import { useApp } from "@/context/AppContext";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useApp();
  const [imgError, setImgError] = useState(false);

  const cleanHost = project.liveUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const isAcademic = project.projectType === "academic";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/60 hover:shadow-xl dark:hover:border-emerald-500/50 dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.55)]"
    >
      <div>
        {/* Ventana Panorámica de Vista Previa */}
        <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-950">
          {!imgError ? (
            <>
              <Image
                src={project.image}
                alt={project.title[lang]}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                onError={() => setImgError(true)}
                className="sp-shot object-cover object-top"
              />
              {/* Insignia Superior de Tipo de Proyecto */}
              <div className="pointer-events-none absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
                    isAcademic
                      ? "border-indigo-500/40 bg-zinc-950/85 text-indigo-300"
                      : "border-emerald-500/40 bg-zinc-950/85 text-emerald-300"
                  }`}
                >
                  {isAcademic ? (
                    <GraduationCap className="h-3 w-3" />
                  ) : (
                    <Briefcase className="h-3 w-3" />
                  )}
                  <span>
                    {isAcademic
                      ? lang === "es"
                        ? "Académico UCC + IA"
                        : "UCC Academic + AI"
                      : lang === "es"
                        ? "Producción Comercial"
                        : "Live Commercial"}
                  </span>
                </span>

                {project.isPrivateRepo && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-zinc-950/85 px-2.5 py-1 font-mono text-[10px] font-semibold text-amber-300 shadow-md backdrop-blur-md">
                    <Lock className="h-2.5 w-2.5" />
                    <span>
                      {lang === "es" ? "Cliente / Privado" : "Client / Private"}
                    </span>
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="sp-shot relative flex h-full w-full flex-col justify-between bg-zinc-50 dark:bg-zinc-950 p-4">
              <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-75 dark:opacity-50" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/15 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/15 blur-2xl transition-opacity group-hover:opacity-100" />

              {/* Barra de Navegador / Terminal Mockup */}
              <div className="relative z-10 flex items-center justify-between rounded-lg border border-zinc-200/90 dark:border-zinc-800/90 bg-white/90 dark:bg-zinc-900/90 px-3 py-1.5 backdrop-blur-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
                  <Globe className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{cleanHost}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  0{index + 1}
                </span>
              </div>

              {/* Centro Geométrico del Proyecto */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <Layers className="h-6 w-6" />
                </div>
                <span className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {project.category[lang]}
                </span>
              </div>

              {/* Barra Glassmorphic Inferior con Título y Categoría */}
              <div className="relative z-10 flex items-center justify-between rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/85 px-3 py-2 backdrop-blur-md">
                <span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
                  <Terminal className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  PROD.READY
                </span>
                <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  {project.technologies[0]}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Contenido Principal de la Tarjeta */}
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>{project.category[lang]}</span>
            <span className="text-zinc-400 dark:text-zinc-500">
              #0{index + 1}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {project.title[lang]}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.description[lang]}
          </p>
        </div>
      </div>

      {/* Pie de Tarjeta: Etiquetas de Tecnologías + Enlaces Obligatorios (Código & Demo en vivo) */}
      <div className="px-6 pb-6 pt-2">
        {/* Etiquetas de Tecnologías */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Enlaces Obligatorios: GitHub (Código / Code) y Demo (Demo en vivo / Live Demo) */}
        <div className="grid grid-cols-2 gap-3 border-t border-zinc-200 dark:border-zinc-800/80 pt-4">
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
            className="cursor-can-hover inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-2.5 font-mono text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {project.isPrivateRepo ? (
              <Lock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            ) : (
              <Code2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            )}
            <span className="truncate">
              {project.isPrivateRepo
                ? lang === "es"
                  ? "Código (NDA / Perfil GitHub)"
                  : "Code (Client NDA / GitHub)"
                : lang === "es"
                  ? "Código"
                  : "Code"}
            </span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-can-hover inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-600/30 dark:border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-zinc-950"
          >
            <span>{lang === "es" ? "Demo en vivo" : "Live Demo"}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>
      </div>
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
      className="relative border-t border-zinc-200 dark:border-zinc-800/80 bg-transparent py-20 sm:py-28 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado Monumental de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-2xs backdrop-blur-md">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>
                {lang === "es"
                  ? "02 // PROYECTOS DESTACADOS"
                  : "02 // FEATURED PROJECTS"}
              </span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              {lang === "es" ? (
                <>
                  Producción Comercial &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Ingeniería IA
                  </span>
                </>
              ) : (
                <>
                  Commercial Production &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    AI Engineering
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Filtros Interactivos: Todos / Comerciales & E-Commerce / Proyectos Académicos UCC */}
          <div
            role="tablist"
            aria-label={
              lang === "es" ? "Filtrar proyectos" : "Filter projects"
            }
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              onClick={() => setFilter("all")}
              className={`cursor-can-hover rounded-xl border px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                filter === "all"
                  ? "border-emerald-500 bg-emerald-500 text-zinc-950 shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50"
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
              className={`cursor-can-hover inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                filter === "commercial"
                  ? "border-emerald-500 bg-emerald-500 text-zinc-950 shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>
                {lang === "es"
                  ? `Comerciales & E-Commerce (${commercialCount})`
                  : `Commercial & E-Commerce (${commercialCount})`}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={filter === "academic"}
              onClick={() => setFilter("academic")}
              className={`cursor-can-hover inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                filter === "academic"
                  ? "border-indigo-500 bg-indigo-500 text-white shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/50"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>
                {lang === "es"
                  ? `Académicos UCC & IA (${academicCount})`
                  : `UCC Academic & AI (${academicCount})`}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cuadrícula Responsiva Estricta: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
