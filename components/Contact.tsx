"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Copy,
  Check,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Clock,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

type FormStatus = "idle" | "submitting" | "success";

const CONTACT_EMAIL = "vicardev2026@gmail.com";

const DIRECT_CHANNELS = [
  {
    label: "VICARDEV Agency",
    handle: "vicardev.digital",
    href: "https://vicardev.digital",
  },
  {
    label: "GitHub",
    handle: "@itsGabo22",
    href: "https://github.com/itsGabo22",
  },
  {
    label: "LinkedIn",
    handle: "in/itsgabo22",
    href: "https://www.linkedin.com/in/itsgabo22",
  },
];

export default function Contact() {
  const { lang } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg(
        lang === "es"
          ? "Por favor completa todos los campos obligatorios."
          : "Please fill out all required fields."
      );
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg(
        lang === "es"
          ? "Por favor ingresa un correo electrónico válido."
          : "Please enter a valid email address."
      );
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 450);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left/Center Studio Dispatch Desk (7 cols) + Right Spatial Stage for Levitating 3D Keycaps (5 cols) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            {/* Studio Dispatch Header */}
            <div className="border-b border-zinc-300/60 dark:border-zinc-800 pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {lang === "es"
                      ? "Disponible para nuevos proyectos"
                      : "Available for new projects"}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Pasto, Colombia</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {lang === "es" ? "Respuesta < 24h" : "Response < 24h"}
                  </span>
                </span>
              </div>

              <h2 className="font-display text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl leading-[0.92]">
                {lang === "es" ? (
                  <>
                    TRABAJEMOS{" "}
                    <span className="font-serif italic font-normal text-emerald-600 dark:text-emerald-400">
                      JUNTOS
                    </span>
                  </>
                ) : (
                  <>
                    LET&apos;S WORK{" "}
                    <span className="font-serif italic font-normal text-emerald-600 dark:text-emerald-400">
                      TOGETHER
                    </span>
                  </>
                )}
              </h2>

              {/* Magnetic Direct Email Strip with Frosted Glass */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="cursor-can-hover group inline-flex items-center gap-3 rounded-2xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 px-4 py-2.5 text-left ring-1 ring-zinc-900/[0.06] shadow-[0_8px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl transition-all hover:border-emerald-500"
                >
                  <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {CONTACT_EMAIL}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-zinc-950">
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400 dark:text-emerald-600" />
                        <span>{lang === "es" ? "Copiado" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                      </>
                    )}
                  </span>
                </button>

                {DIRECT_CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-can-hover inline-flex items-center gap-1.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/55 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-900/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-colors hover:bg-white/80 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
                  >
                    <span>{ch.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Translucent Liquid Frosted Glass Studio Dispatch Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 rounded-3xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 p-6 sm:p-8 ring-1 ring-zinc-900/[0.06] shadow-[0_16px_48px_-12px_rgba(15,23,42,0.1),inset_0_1px_0_0_rgba(255,255,255,0.92)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400"
                  >
                    {lang === "es" ? "Nombre completo" : "Full Name"}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (status === "success") setStatus("idle");
                    }}
                    placeholder={
                      lang === "es"
                        ? "Ej. Carlos Mendoza"
                        : "e.g. Alex Morgan"
                    }
                    className="mt-2 w-full border-b-2 border-zinc-300/80 dark:border-zinc-700 bg-transparent px-1 py-3 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400"
                  >
                    {lang === "es" ? "Correo electrónico" : "Email Address"}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "success") setStatus("idle");
                    }}
                    placeholder={
                      lang === "es"
                        ? "carlos@empresa.com"
                        : "alex@company.com"
                    }
                    className="mt-2 w-full border-b-2 border-zinc-300/80 dark:border-zinc-700 bg-transparent px-1 py-3 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400"
                >
                  {lang === "es"
                    ? "Detalles de tu proyecto"
                    : "Project Details & Objectives"}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status === "success") setStatus("idle");
                  }}
                  placeholder={
                    lang === "es"
                      ? "Cuéntame sobre tu plataforma web, e-commerce o integración con IA..."
                      : "Tell me about your web platform, e-commerce store, or AI integration..."
                  }
                  className="mt-2 w-full border-b-2 border-zinc-300/80 dark:border-zinc-700 bg-transparent px-1 py-3 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    role="alert"
                    className="flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-700 dark:text-red-300"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-3 rounded-xl border border-emerald-500/50 bg-emerald-500/15 px-4 py-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-200"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      {lang === "es"
                        ? "¡Mensaje enviado con éxito! Te responderé muy pronto."
                        : "Message sent successfully! I will get back to you soon."}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="cursor-can-hover text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                >
                  {CONTACT_EMAIL}
                </a>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="cursor-can-hover inline-flex items-center justify-center gap-2.5 rounded-2xl bg-zinc-900 dark:bg-zinc-100 px-8 py-4 text-sm font-bold text-white dark:text-zinc-950 transition-all hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>
                        {lang === "es" ? "Enviando..." : "Sending..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {lang === "es" ? "Enviar mensaje" : "Send Message"}
                      </span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Open Spatial Stage for the Levitating Zero-Gravity 3D Keycaps */}
          <div className="pointer-events-none hidden min-h-[520px] lg:col-span-5 lg:block" />
        </div>
      </div>
    </section>
  );
}
