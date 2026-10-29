"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, ArrowUpRight, Quote } from "lucide-react";
import { useApp } from "@/context/AppContext";

export interface Testimonial {
  id: string;
  code: string;
  name: string;
  role: {
    es: string;
    en: string;
  };
  badge: {
    es: string;
    en: string;
  };
  impactMetric: {
    es: string;
    en: string;
  };
  projectUrl?: string;
  content: {
    es: string;
    en: string;
  };
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-brisal",
    code: "REF // 01",
    name: "Brisal by Salvador",
    role: {
      es: "Cliente E-Commerce de Accesorios (brisal.com.co)",
      en: "Accessories E-Commerce Client (brisal.com.co)",
    },
    badge: {
      es: "CLIENTE COMERCIAL VERIFICADO",
      en: "VERIFIED COMMERCIAL CLIENT",
    },
    impactMetric: {
      es: "Catálogo Mayorista & Minorista en Producción",
      en: "Live Wholesale & Retail E-Commerce",
    },
    projectUrl: "https://brisal.com.co",
    content: {
      es: "Gabriel diseñó y desplegó nuestra tienda online de joyería y accesorios en acero y rodio (brisal.com.co) superando cada expectativa. La velocidad de carga, el catálogo mayorista/minorista y la experiencia móvil impulsaron nuestras ventas en toda Colombia.",
      en: "Gabriel designed and deployed our steel and rhodium jewelry & accessories online store (brisal.com.co), exceeding every expectation. The loading speed, wholesale/retail catalog, and mobile checkout boosted our nationwide sales.",
    },
    avatar: "/images/testimonials/ronaldo.jpg",
    rating: 5,
  },
  {
    id: "testimonial-electrotech",
    code: "REF // 02",
    name: "Dirección Corporativa",
    role: {
      es: "Cliente, ElectroTech Pasto",
      en: "Corporate Client, ElectroTech Pasto",
    },
    badge: {
      es: "INFRAESTRUCTURA INDUSTRIAL",
      en: "INDUSTRIAL INFRASTRUCTURE",
    },
    impactMetric: {
      es: "Cotizaciones Automatizadas con Resend API",
      en: "Automated Quoting via Resend API",
    },
    projectUrl: "https://electrotechpasto.com",
    content: {
      es: "La infraestructura web y el sistema de cotización automatizada con Resend API que Gabriel construyó para ElectroTech Pasto modernizaron por completo nuestra captación de clientes industriales en Nariño.",
      en: "The web infrastructure and automated quoting system with Resend API that Gabriel built for ElectroTech Pasto completely modernized our industrial client acquisition across Nariño.",
    },
    avatar: "/images/testimonials/electrotech.jpg",
    rating: 5,
  },
  {
    id: "testimonial-ucc",
    code: "REF // 03",
    name: "Docente de Ingeniería de Software",
    role: {
      es: "Profesor Universitario, UCC Pasto",
      en: "Software Engineering Professor, UCC",
    },
    badge: {
      es: "AVAL ACADÉMICO · UCC PASTO",
      en: "ACADEMIC ENDORSEMENT · UCC",
    },
    impactMetric: {
      es: "5 Proyectos Universitarios con IA Integrada",
      en: "5 University Systems with Integrated AI",
    },
    content: {
      es: "Gabriel destaca en la facultad por su rigor arquitectónico y su capacidad para llevar conceptos avanzados de algoritmos, nube e inteligencia artificial hacia productos reales en producción antes de graduarse.",
      en: "Gabriel stands out in the faculty for his architectural rigor and his ability to translate advanced concepts in algorithms, cloud, and artificial intelligence into live production products before graduation.",
    },
    avatar: "/images/testimonials/ucc-prof.jpg",
    rating: 5,
  },
  {
    id: "testimonial-obsidion",
    code: "REF // 04",
    name: "Socio de Desarrollo",
    role: {
      es: "Co-fundador en Obsidion & Compañero de Ingeniería",
      en: "Co-founder at Obsidion & Engineering Peer",
    },
    badge: {
      es: "CO-FUNDADOR & ARQUITECTURA",
      en: "CO-FOUNDER & ARCHITECTURE",
    },
    impactMetric: {
      es: "Sistemas Modulares en TypeScript & Python",
      en: "Modular Systems in TypeScript & Python",
    },
    content: {
      es: "Trabajar junto a Gabriel en Obsidion y proyectos de optimización logística es garantía de código limpio, tipado estricto en TypeScript y entregas listas para escalar bajo presión real.",
      en: "Working alongside Gabriel at Obsidion and on logistics optimization projects guarantees clean code, strict TypeScript typing, and deliverables ready to scale under real-world pressure.",
    },
    avatar: "/images/testimonials/obsidion-peer.jpg",
    rating: 5,
  },
];

const PROOF_METRICS = [
  {
    value: "100%",
    label: {
      es: "Entregas en producción a tiempo",
      en: "On-time production delivery",
    },
  },
  {
    value: "05",
    label: {
      es: "Plataformas comerciales activas",
      en: "Live commercial platforms",
    },
  },
  {
    value: "5.0 / 5",
    label: {
      es: "Calificación de clientes & academia",
      en: "Client & faculty satisfaction",
    },
  },
];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function AvatarBadge({
  src,
  name,
  sizeClass = "h-12 w-12",
}: {
  src: string;
  name: string;
  sizeClass?: string;
}) {
  const [error, setError] = useState(false);
  const initials = getInitials(name);

  return (
    <div
      className={`relative ${sizeClass} shrink-0 overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center text-white`}
    >
      {!error ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="48px"
          onError={() => setError(true)}
          className="object-cover object-center"
        />
      ) : (
        <span className="font-mono text-xs font-bold tracking-wider text-emerald-400">
          {initials}
        </span>
      )}
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useApp();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeTestimonial = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];

  return (
    <section
      id="testimonials"
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Kinetic Proof Strip */}
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              {lang === "es"
                ? "RESPALDO COMERCIAL & ACADÉMICO"
                : "COMMERCIAL & ACADEMIC ENDORSEMENTS"}
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
              {lang === "es" ? "Testimonios" : "Testimonials"}
            </h2>
          </div>

          {/* Architectural Proof Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {PROOF_METRICS.map((m) => (
              <div
                key={m.value}
                className="border-l-2 border-emerald-500/50 pl-3.5"
              >
                <span className="block font-display text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  {m.value}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                  {m.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bespoke Split Architecture: Left Editorial Spotlight Stage + Right Interactive Index Deck */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column (7 cols): Monumental Editorial Quote Spotlight */}
          <div className="lg:col-span-7 flex">
            <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-zinc-300/80 dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-900/90 p-8 sm:p-10 lg:p-12 text-zinc-50 shadow-2xl">
              {/* Giant Typographic Quote Watermark */}
              <Quote
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rotate-12 text-white/[0.04]"
              />

              {/* Top Verified Seal & Stars */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{activeTestimonial.badge[lang]}</span>
                </span>

                <div
                  className="flex items-center gap-1"
                  aria-label={`${activeTestimonial.rating} / 5 stars`}
                >
                  {Array.from({ length: activeTestimonial.rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    )
                  )}
                </div>
              </div>

              {/* Animated Editorial Quote Body */}
              <div className="relative z-10 my-8">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="font-serif italic text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-zinc-100"
                  >
                    &ldquo;{activeTestimonial.content[lang]}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Bottom Attribution & Live Impact Strip */}
              <div className="relative z-10 flex flex-col justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3.5">
                  <AvatarBadge
                    src={activeTestimonial.avatar}
                    name={activeTestimonial.name}
                    sizeClass="h-12 w-12"
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {activeTestimonial.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {activeTestimonial.role[lang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-zinc-800/90 px-3 py-1.5 font-mono text-[11px] text-zinc-300">
                    {activeTestimonial.impactMetric[lang]}
                  </span>
                  {activeTestimonial.projectUrl && (
                    <a
                      href={activeTestimonial.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 transition-colors hover:border-emerald-500 hover:text-emerald-400"
                      aria-label={activeTestimonial.name}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Architectural Ledger Deck (All 4 Testimonials accessible in DOM) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-zinc-200/80 dark:divide-zinc-800/80 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl overflow-hidden">
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`cursor-can-hover group relative flex w-full flex-col gap-2.5 p-5 sm:p-6 text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-zinc-900/5 dark:bg-white/5"
                      : "hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Active Left Accent Indicator */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 ${
                      isSelected
                        ? "bg-emerald-500"
                        : "bg-transparent group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700"
                    }`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <AvatarBadge
                        src={item.avatar}
                        name={item.name}
                        sizeClass="h-9 w-9"
                      />
                      <div className="min-w-0">
                        <h4 className="truncate font-display text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </h4>
                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {item.role[lang]}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 font-mono text-[11px] font-bold ${
                        isSelected
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-zinc-400 dark:text-zinc-600"
                      }`}
                    >
                      {item.code}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    &ldquo;{item.content[lang]}&rdquo;
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
