"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useApp } from "@/context/AppContext";
import TiltSurface from "./TiltSurface";

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
      className="h-full"
    >
      <TiltSurface maxTilt={5} className="h-full">
        <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/75 p-6 sm:p-7 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-zinc-400 dark:hover:border-zinc-600">
          <div>
            <div
              className="mb-4 flex items-center gap-1"
              aria-label={`${testimonial.rating} / 5 stars`}
            >
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              &ldquo;{testimonial.content[lang]}&rdquo;
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3.5 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-4">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
              {!avatarError ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="44px"
                  onError={() => setAvatarError(true)}
                  className="object-cover object-center"
                />
              ) : (
                <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {initials}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {testimonial.name}
              </h3>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {testimonial.role[lang]}
              </p>
            </div>
          </div>
        </div>
      </TiltSurface>
    </motion.article>
  );
}

export default function Testimonials() {
  const { lang } = useApp();

  return (
    <section
      id="testimonials"
      className="relative border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl">
            {lang === "es" ? "Testimonios" : "Testimonials"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
            {lang === "es"
              ? "Referencias directas de clientes comerciales, docentes universitarios y socios de desarrollo."
              : "Direct references from commercial clients, university faculty, and engineering partners."}
          </p>
        </motion.div>

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
