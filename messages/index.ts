"use client";

import { useApp } from "@/context/AppContext";
import { es, type Messages } from "./es";
import { en } from "./en";

export type { Messages };
export const MESSAGES: Record<"es" | "en", Messages> = { es, en };

/** Current-language UI messages. */
export function useT(): Messages {
  const { lang } = useApp();
  return MESSAGES[lang];
}

/** Fills `{name}` placeholders: fmt("Hola {n}", { n: "Gabo" }). */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}
