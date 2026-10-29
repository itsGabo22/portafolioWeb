"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, ArrowUpRight, Quote } from "lucide-react";
import { useApp } from "@/context/AppContext";

export interface Testimonial {
  id: string;
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
    name: "Brisal by Salvador",
    role: {
      es: "Cliente E-Commerce de Accesorios (brisal.com.co)",
      en: "Accessories E-Commerce Client (brisal.com.co)",
    },
    badge: {
      es: "Cliente Comercial Verificado",
      en: "Verified Commercial Client",
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
    name: "Dirección Corporativa — ElectroTech Pasto",
    role: {
      es: "Cliente Comercial de Automatización Industrial (electrotechpasto.com)",
      en: "Industrial Automation Commercial Client (electrotechpasto.com)",
    },
    badge: {
      es: "Cliente Corporativo en Producción",
      en: "Live Corporate Client",
    },
    impactMetric: {
      es: "Cotizaciones Automatizadas con Resend API",
      en: "Automated Quoting via Resend API",
    },
    projectUrl: "https://electrotechpasto.com",
    content: {
      es: "La plataforma web corporativa y el sistema de cotización automatizada con Resend API que Gabriel desarrolló para ElectroTech Pasto modernizaron por completo nuestra captación de clientes industriales en Nariño.",
      en: "The corporate web platform and automated quoting system with Resend API that Gabriel developed for ElectroTech Pasto completely modernized our industrial client acquisition across Nariño.",
    },
    avatar: "/images/testimonials/electrotech.jpg",
    rating: 5,
  },
  {
    id: "testimonial-ucc",
    name: "Docente de Ingeniería de Software",
    role: {
      es: "Profesor Universitario, UCC Pasto",
      en: "Software Engineering Professor, UCC",
    },
    badge: {
      es: "Aval Académico · UCC Pasto",
      en: "Academic Endorsement · UCC",
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
    id: "testimonial-bluevelvet",
    name: "Blue Velvet & Carlin Cosméticos",
    role: {
      es: "Clientes Comerciales E-Commerce (bluevelvet0.com · carlincosmeticos.com)",
      en: "Commercial E-Commerce Clients (bluevelvet0.com · carlincosmeticos.com)",
    },
    badge: {
      es: "E-Commerce Entregado con VICARDEV",
      en: "Delivered E-Commerce via VICARDEV",
    },
    impactMetric: {
      es: "Tiendas Online de Moda y Cosméticos en Producción",
      en: "Live Fashion & Cosmetics E-Commerce Stores",
    },
    projectUrl: "https://bluevelvet0.com",
    content: {
      es: "A través de su agencia VICARDEV, Gabriel construyó y puso en producción nuestras tiendas online con un diseño impecable, buscador multicategoría ultrarrápido y gestión de pedidos lista para escalar.",
      en: "Through his agency VICARDEV, Gabriel architected and launched our live online stores with an impeccable editorial design, lightning-fast multi-category search, and scalable order workflows.",
    },
    avatar: "/images/testimonials/client-ecommerce.jpg",
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
    value: "5",
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
      className={`relative ${sizeClass} shrink-0 overflow-hidden rounded-full border border-white/80 dark:border-zinc-700 bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center text-white shadow-xs`}
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
        {/* Header + Proof Strip */}
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-zinc-300/60 dark:border-zinc-800/80 pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {lang === "es"
                ? "Respaldo Comercial y Académico"
                : "Commercial & Academic Endorsements"}
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
              {lang === "es" ? "Testimonios" : "Testimonials"}
            </h2>
          </div>

          {/* Proof Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {PROOF_METRICS.map((m) => (
              <div
                key={m.value}
                className="border-l-2 border-emerald-500/50 pl-3.5"
              >
                <span className="block font-display text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  {m.value}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-zinc-600 dark:text-zinc-400">
                  {m.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bespoke Split Architecture with True Translucent Frosted Glass */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column (7 cols): Frosted Glass Editorial Quote Spotlight */}
          <div className="lg:col-span-7 flex">
            <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/65 p-8 sm:p-10 lg:p-12 text-zinc-900 dark:text-zinc-50 ring-1 ring-zinc-900/[0.06] shadow-[0_16px_48px_-12px_rgba(15,23,42,0.1),inset_0_1px_0_0_rgba(255,255,255,0.92)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
              {/* Giant Typographic Quote Watermark */}
              <Quote
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rotate-12 text-zinc-900/[0.04] dark:text-white/[0.04]"
              />

              {/* Top Verified Seal & Stars */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-300/60 dark:border-zinc-800 pb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
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
                    className="font-serif italic text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-zinc-900 dark:text-zinc-100"
                  >
                    &ldquo;{activeTestimonial.content[lang]}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Bottom Attribution & Live Impact Strip */}
              <div className="relative z-10 flex flex-col justify-between gap-4 border-t border-zinc-300/60 dark:border-zinc-800 pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3.5">
                  <AvatarBadge
                    src={activeTestimonial.avatar}
                    name={activeTestimonial.name}
                    sizeClass="h-12 w-12"
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-zinc-900 dark:text-white">
                      {activeTestimonial.name}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {activeTestimonial.role[lang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="rounded-xl border border-white/80 dark:border-zinc-700/80 bg-white/70 dark:bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {activeTestimonial.impactMetric[lang]}
                  </span>
                  {activeTestimonial.projectUrl && (
                    <a
                      href={activeTestimonial.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/80 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                      aria-label={activeTestimonial.name}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Frosted Glass Selector Deck */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-zinc-300/60 dark:divide-zinc-800/80 rounded-3xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 ring-1 ring-zinc-900/[0.06] shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 overflow-hidden">
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
                      ? "bg-white/65 dark:bg-white/[0.06]"
                      : "hover:bg-white/40 dark:hover:bg-white/[0.03]"
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
                        <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                          {item.role[lang]}
                        </p>
                      </div>
                    </div>
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
