"use client";

import { useSyncExternalStore } from "react";
import { useApp } from "@/context/AppContext";

/** Minute store: re-renders only on minute boundaries (no per-second work). */
function subscribeMinute(onChange: () => void) {
  let timer = 0;
  const schedule = () => {
    timer = window.setTimeout(() => {
      onChange();
      schedule();
    }, 60_000 - (Date.now() % 60_000) + 30);
  };
  schedule();
  return () => window.clearTimeout(timer);
}
const minuteNow = () => Math.floor(Date.now() / 60_000);

/**
 * Visitor's local time, 12-hour, via Intl. The server renders an empty
 * placeholder of fixed width (no hydration mismatch, no layout shift).
 */
export default function Clock({ label }: { label: string }) {
  const { lang } = useApp();
  const minute = useSyncExternalStore(subscribeMinute, minuteNow, () => null);
  const text =
    minute === null
      ? ""
      : new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(minute * 60_000));

  return (
    <time className="ps-clock" aria-label={text ? `${label}: ${text}` : label}>
      {text}
    </time>
  );
}
