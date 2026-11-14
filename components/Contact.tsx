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
import { useT } from "@/messages";

type FormStatus = "idle" | "submitting" | "success";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const CONTACT_EMAIL = "vicardev2026@gmail.com";

const DIRECT_CHANNELS = [
  { key: "agency", href: "https://vicardev.digital" },
  { key: "github", href: "https://github.com/itsGabo22" },
  { key: "linkedin", href: "https://www.linkedin.com/in/itsgabo22" },
] as const;

export default function Contact() {
  const t = useT();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [website, setWebsite] = useState(""); // honeypot
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: FieldErrors = {};

    if (!trimmedName) errors.name = t.contact.errors.name;
    if (!trimmedEmail) {
      errors.email = t.contact.errors.email;
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = t.contact.errors.emailInvalid;
    }
    if (!trimmedMessage) {
      errors.message = t.contact.errors.message;
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          website,
        }),
      });

      if (!response.ok) {
        setStatus("idle");
        setErrorMsg(response.status === 503 ? t.contact.errors.unavailable : t.contact.errors.failed);
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("idle");
      setErrorMsg(t.contact.errors.network);
    }
  };

  return (
    <section
      id="contact"
      className="dark band-primary band-gradient-rev relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left/Center Studio Dispatch Desk (7 cols) + Right Spatial Stage for Levitating 3D Keycaps (5 cols) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div data-reveal
            className="lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3"
          >
            {/* Studio Dispatch Header */}
            <div className="border-b border-zinc-300/60 dark:border-zinc-800 pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.contact.available}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.contact.location}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.contact.response}</span>
                </span>
              </div>

              <h2 className="font-display text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl leading-[0.92] uppercase">
                {t.contact.titleA}{" "}
                <span className="font-serif italic font-normal text-primary-300">
                  {t.contact.titleB}
                </span>
              </h2>

              {/* Magnetic Direct Email Strip with Frosted Glass */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? t.contact.copied : t.contact.copyAria}
                  className="cursor-can-hover group inline-flex items-center gap-3 rounded-2xl border border-white/80 dark:border-white/10 bg-white/55 dark:bg-zinc-900/60 px-4 py-2.5 text-left ring-1 ring-zinc-900/[0.06] shadow-[0_8px_30px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-2xl transition-all hover:border-emerald-500"
                >
                  <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {CONTACT_EMAIL}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-zinc-950">
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400 dark:text-emerald-600" />
                        <span>{t.contact.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>{t.contact.copy}</span>
                      </>
                    )}
                  </span>
                </button>

                {DIRECT_CHANNELS.map((ch) => (
                  <a
                    key={ch.key}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-can-hover inline-flex items-center gap-1.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/55 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-900/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-colors hover:bg-white/80 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
                  >
                    <span>{t.contact.channels[ch.key]}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only"> {t.common.newTab}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Translucent Liquid Frosted Glass Studio Dispatch Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 space-y-6 rounded-3xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-zinc-900/60 p-6 sm:p-8 ring-1 ring-zinc-900/[0.06] shadow-[0_16px_48px_-12px_rgba(15,23,42,0.1),inset_0_1px_0_0_rgba(255,255,255,0.92)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150"
            >
              {/* Honeypot: hidden from users and assistive tech, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-website">{t.contact.form.honeypot}</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400"
                  >
                    {t.contact.form.name}
                  </label>
                  <input
                    id="contact-name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (status === "success") setStatus("idle");
                    }}
                    placeholder={t.contact.form.namePh}
                    className="mt-2 w-full border-b-2 border-zinc-300/80 dark:border-zinc-700 bg-transparent px-1 py-3 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 transition-colors focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none"
                  />
                {fieldErrors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
                    {fieldErrors.name}
                  </p>
                )}
                </div>

                <div className="group">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400"
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    id="contact-email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "success") setStatus("idle");
                    }}
                    placeholder={t.contact.form.emailPh}
                    className="mt-2 w-full border-b-2 border-zinc-300/80 dark:border-zinc-700 bg-transparent px-1 py-3 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 transition-colors focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none"
                  />
                {fieldErrors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
                    {fieldErrors.email}
                  </p>
                )}
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-400"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="contact-message"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                  name="message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status === "success") setStatus("idle");
                  }}
                  placeholder={t.contact.form.messagePh}
                  className="mt-2 w-full border-b-2 border-zinc-300/80 dark:border-zinc-700 bg-transparent px-1 py-3 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 transition-colors focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none"
                />
                {fieldErrors.message && (
                  <p id="contact-message-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
                    {fieldErrors.message}
                  </p>
                )}
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
                    <span>{t.contact.success}</span>
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
                  className="cursor-can-hover inline-flex items-center justify-center gap-2.5 rounded-2xl bg-primary-200 px-8 py-4 text-sm font-bold text-primary-950 transition-all hover:bg-primary-100 disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t.contact.form.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.form.send}</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
