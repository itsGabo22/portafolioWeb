"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/messages";

export default function NotFound() {
  const t = useT();
  return (
    <main className="relative flex min-h-dvh items-center justify-center px-4 py-24">
      <div className="bg-dot-matrix pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative w-full max-w-xl rounded-stage border border-line bg-surface-1/85 p-8 text-center shadow-elev-2 backdrop-blur-xl sm:p-12">
        <p className="text-sm font-semibold text-accent">{t.notFound.code}</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {t.notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted">{t.notFound.body}</p>
        <Link
          href="/"
          className="cursor-can-hover mt-8 inline-flex min-h-11 items-center gap-2 rounded-control bg-ink px-6 py-3 text-sm font-semibold text-surface-0 transition-[background-color,transform] duration-150 hover:bg-accent-strong active:scale-[0.98] dark:hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{t.notFound.back}</span>
        </Link>
      </div>
    </main>
  );
}
