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
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import TiltSurface from "./TiltSurface";

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
      className="relative min-h-screen border-t border-zinc-200/70 dark:border-zinc-800/60 bg-transparent py-24 sm:py-32 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Monumental Centered Header (exact naresh_ref LET'S WORK TOGETHER style) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-7xl leading-[0.95]">
            {lang === "es" ? (
              <>
                TRABAJEMOS <br /> JUNTOS
              </>
            ) : (
              <>
                LET&apos;S WORK <br /> TOGETHER
              </>
            )}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Frosted Contact Form Card (7 columns on LG while 3D keycaps levitate on the right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <TiltSurface maxTilt={3}>
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/75 p-6 sm:p-8 shadow-xl backdrop-blur-md">
                <div className="mb-6">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {lang === "es" ? "Formulario de Contacto" : "Contact Form"}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {lang === "es" ? (
                      <>
                        Escríbeme directamente a{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="cursor-can-hover font-medium text-zinc-900 dark:text-zinc-200 underline underline-offset-4"
                        >
                          {CONTACT_EMAIL}
                        </a>{" "}
                        o deja tus datos aquí.
                      </>
                    ) : (
                      <>
                        Please contact me directly at{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="cursor-can-hover font-medium text-zinc-900 dark:text-zinc-200 underline underline-offset-4"
                        >
                          {CONTACT_EMAIL}
                        </a>{" "}
                        or drop your info here.
                      </>
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
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
                        lang === "es" ? "Tu nombre" : "Your Name"
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-zinc-900 dark:focus:border-zinc-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
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
                        lang === "es" ? "tu@correo.com" : "you@example.com"
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-zinc-900 dark:focus:border-zinc-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {lang === "es" ? "Tu mensaje" : "Your Message"}
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
                          ? "Cuéntame sobre tu proyecto..."
                          : "Tell me about your project..."
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors focus:border-zinc-900 dark:focus:border-zinc-200 focus:outline-none"
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

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cursor-can-hover inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3.5 text-sm font-semibold text-white dark:text-zinc-950 transition-colors hover:bg-zinc-800 dark:hover:bg-white disabled:opacity-60"
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
                </form>

                {/* Minimalist Direct Contact Bar inside Card Footer */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-5 text-xs">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="cursor-can-hover inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 font-mono text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>
                          {lang === "es" ? "Correo copiado" : "Email copied"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{CONTACT_EMAIL}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/itsGabo22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover inline-flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/itsgabo22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover inline-flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="https://vicardev.digital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover inline-flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    >
                      <span>VICARDEV</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltSurface>
          </motion.div>

          {/* Right Column: Open Stage for the Levitating Zero-Gravity 3D Keycaps */}
          <div className="pointer-events-none hidden min-h-[420px] lg:col-span-5 lg:block" />
        </div>
      </div>
    </section>
  );
}
