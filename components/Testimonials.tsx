"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageSquareQuote,
  Star,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export interface Testimonial {
  id: string;
  name: string;
  role: {
    es: string;
    en: string;
  };
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
    content: {
      es: "Gabriel diseñó y desplegó nuestra tienda online de joyería y accesorios en acero y rodio (brisal.com.co) superando cada expectativa. La velocidad de carga, el catálogo mayorista/minorista y la experiencia móvil impulsaron nuestras ventas en toda Colombia.",
      en: "Gabriel designed and deployed our steel and rhodium jewelry & accessories online store (brisal.com.co), exceeding every expectation. The loading speed, wholesale/retail catalog, and mobile checkout boosted our nationwide sales.",
    },
    avatar: "/images/testimonials/ronaldo.jpg",
    rating: 5,
  },
  {
    id: "testimonial-electrotech",
    name: "Dirección Corporativa",
    role: {
      es: "Cliente, ElectroTech Pasto",
      en: "Corporate Client, ElectroTech Pasto",
    },
    content: {
      es: "La infraestructura web y el sistema de cotización automatizada con Resend API que Gabriel construyó para ElectroTech Pasto modernizaron por completo nuestra captación de clientes industriales en Nariño.",
      en: "The web infrastructure and automated quoting system with Resend API that Gabriel built for ElectroTech Pasto completely modernized our industrial client acquisition across Nariño.",
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
    content: {
      es: "Gabriel destaca en la facultad por su rigor arquitectónico y su capacidad para llevar conceptos avanzados de algoritmos, nube e inteligencia artificial hacia productos reales en producción antes de graduarse.",
      en: "Gabriel stands out in the faculty for his architectural rigor and his ability to translate advanced concepts in algorithms, cloud, and artificial intelligence into live production products before graduation.",
    },
    avatar: "/images/testimonials/ucc-prof.jpg",
    rating: 5,
  },
  {
    id: "testimonial-obsidion",
    name: "Socio de Desarrollo",
    role: {
      es: "Co-fundador en Obsidion & Compañero de Ingeniería",
      en: "Co-founder at Obsidion & Engineering Peer",
    },
    content: {
      es: "Trabajar junto a Gabriel en Obsidion y proyectos de optimización logística es garantía de código limpio, tipado estricto en TypeScript y entregas listas para escalar bajo presión real.",
      en: "Working alongside Gabriel at Obsidion and on logistics optimization projects guarantees clean code, strict TypeScript typing, and deliverables ready to scale under real-world pressure.",
    },
    avatar: "/images/testimonials/obsidion-peer.jpg",
    rating: 5,
  },
];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const { lang } = useApp();
  const [avatarError, setAvatarError] = useState(false);
  const initials = getInitials(testimonial.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-6 sm:p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-md"
    >
      {/* Cabecera: Estrellas de calificación (5 estrellas) + Ícono de Cita */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex items-center gap-1"
            aria-label={`${testimonial.rating} / 5 stars`}
          >
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <Quote className="h-6 w-6 text-zinc-200 dark:text-zinc-800 transition-colors group-hover:text-emerald-500/30" />
        </div>

        {/* Cita / Testimonio en idioma activo */}
        <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          &ldquo;{testimonial.content[lang]}&rdquo;
        </p>
      </div>

      {/* Pie de tarjeta: Avatar (con fallback de iniciales) + Nombre + Rol/Relación */}
      <div className="mt-6 flex items-center gap-3.5 border-t border-zinc-200 dark:border-zinc-800/80 pt-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-emerald-500/40 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
          {!avatarError ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              sizes="48px"
              onError={() => setAvatarError(true)}
              className="object-cover object-center"
            />
          ) : (
            <span className="bg-gradient-to-br from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text font-mono text-sm font-extrabold text-transparent">
              {initials}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {testimonial.name}
            </h3>
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {testimonial.role[lang]}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const { lang } = useApp();

  return (
    <section
      id="testimonials"
      className="relative border-t border-zinc-200 dark:border-zinc-800/80 bg-transparent py-20 sm:py-28 transition-colors duration-200 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-45 dark:opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-2xs">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>
                {lang === "es"
                  ? "03 // TESTIMONIOS & REFERENCIAS"
                  : "03 // TESTIMONIALS & REFERENCES"}
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
              {lang === "es" ? (
                <>
                  Impacto validado por{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    clientes y academia
                  </span>
                </>
              ) : (
                <>
                  Impact validated by{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    clients &amp; academia
                  </span>
                </>
              )}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {lang === "es"
              ? "Referencias directas de fundadores, empresas aliadas, docentes universitarios y socios de ingeniería."
              : "Direct references from founders, partner companies, university faculty, and engineering peers."}
          </p>
        </motion.div>

        {/* Cuadrícula Responsiva de 4 Testimonios */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
