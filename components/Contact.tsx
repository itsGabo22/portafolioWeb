"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Code2,
  Briefcase,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

type FormStatus = "idle" | "submitting" | "success";

const CONTACT_EMAIL = "contacto@vicardev.digital";

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
      className="relative border-t border-zinc-200 dark:border-zinc-800/80 bg-transparent py-20 sm:py-28 transition-colors duration-200 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-40 dark:opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado Monumental inspirado en nareshkhatri.dev: "TRABAJEMOS JUNTOS" / "LET'S WORK TOGETHER" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-2xs backdrop-blur-md">
              <Mail className="h-3.5 w-3.5" />
              <span>
                {lang === "es"
                  ? "06 // CONTACTO DIRECTO"
                  : "06 // DIRECT CONTACT"}
              </span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl leading-[0.98]">
              {lang === "es" ? (
                <>
                  TRABAJEMOS{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    JUNTOS
                  </span>
                </>
              ) : (
                <>
                  LET&apos;S WORK{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    TOGETHER
                  </span>
                </>
              )}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {lang === "es"
              ? "Disponible para desarrollo de software a medida, consultoría en arquitectura web, automatización con IA y oportunidades de ingeniería."
              : "Available for custom software development, web architecture consulting, AI automation, and software engineering opportunities."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Columna Izquierda: Formulario Interactivo Glassmorphic (7 columnas en LG, mientras el teclado 3D flota a la derecha) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <div className="interactive-surface rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-6 sm:p-8 shadow-xl backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {lang === "es"
                      ? "Formulario de Contacto"
                      : "Contact Form"}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {lang === "es"
                      ? "Contáctame directamente en contacto@vicardev.digital o deja tu mensaje aquí."
                      : "Contact me directly at contacto@vicardev.digital or drop your info here."}
                  </p>
                </div>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  SSL // READY
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Campo 1: Nombre / Name (required) */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    {lang === "es" ? "Nombre *" : "Full Name *"}
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
                        ? "Tu nombre o empresa"
                        : "Your Name or Company"
                    }
                    className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                  />
                </div>

                {/* Campo 2: Correo electrónico / Email (type="email" required) */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    {lang === "es" ? "Correo electrónico *" : "Email Address *"}
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
                      lang === "es" ? "tu@correo.com" : "you@example.com"
                    }
                    className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                  />
                </div>

                {/* Campo 3: Mensaje / Message (required) */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    {lang === "es" ? "Tu Mensaje *" : "Your Message *"}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (status === "success") setStatus("idle");
                    }}
                    placeholder={
                      lang === "es"
                        ? "Cuéntame sobre tu proyecto, objetivos técnicos o propuesta..."
                        : "Tell me about your project, technical goals, or proposal..."
                    }
                    className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                  />
                </div>

                {/* Alerta de Error de Validación */}
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

                {/* Banner de Confirmación de Éxito (status === 'success') */}
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

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="cursor-can-hover inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-emerald-600/40 dark:border-emerald-400/50 bg-emerald-500 px-6 py-3.5 font-mono text-sm font-bold text-zinc-950 shadow-[0_8px_20px_rgba(16,185,129,0.25)] transition-all hover:bg-emerald-400 disabled:opacity-60 cursor-pointer"
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
                      <Send className="h-4 w-4" />
                      <span>
                        {lang === "es" ? "Enviar mensaje" : "Send message"}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Columna Derecha: Tarjetas de Contacto Directo + Espacio para las Teclas 3D Flotantes (5 columnas en LG) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {lang === "es"
                ? "CANALES DE COMUNICACIÓN DIRECTA"
                : "DIRECT COMMUNICATION CHANNELS"}
            </h3>

            {/* Tarjeta 1: Correo Electrónico + Botón de Copiado */}
            <div className="interactive-surface rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-5 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500/50">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {lang === "es" ? "Correo Electrónico" : "Email Address"}
                    </div>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="mt-0.5 block truncate font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={
                    lang === "es"
                      ? "Copiar correo electrónico"
                      : "Copy email address"
                  }
                  className="cursor-can-hover inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {lang === "es" ? "Copiado" : "Copied"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tarjeta 2: GitHub Oficial */}
            <a
              href="https://github.com/itsGabo22"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-can-hover group flex items-center justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-5 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    GitHub
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    github.com/itsGabo22
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
            </a>

            {/* Tarjeta 3: LinkedIn Profesional */}
            <a
              href="https://www.linkedin.com/in/itsgabo22"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-can-hover group flex items-center justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-5 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    LinkedIn
                  </div>
                  <div className="mt-0.5 font-display text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    Gabriel Esteban Paz Guerrero
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
            </a>

            {/* Tarjeta 4: WhatsApp & Ubicación en Pasto, Colombia */}
            <div className="interactive-surface flex items-center justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 p-5 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500/50">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {lang === "es"
                      ? "Ubicación & Agencia"
                      : "Location & Agency"}
                  </div>
                  <div className="mt-0.5 font-display text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Pasto, Nariño — Colombia
                  </div>
                </div>
              </div>

              <a
                href="https://vicardev.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-can-hover inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500 hover:text-zinc-950 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>VICARDEV</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
