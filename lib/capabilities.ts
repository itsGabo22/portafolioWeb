"use client";

import { useSyncExternalStore } from "react";

export type LabMode = "pending" | "3d" | "2d" | "static";

let webgl: boolean | null = null;
export function hasWebGL(): boolean {
  if (webgl !== null) return webgl;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    webgl = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webgl = false;
  }
  return webgl;
}

/**
 * 3D only on capable devices: ≥768px viewport, >4 GB RAM, >4 cores, WebGL.
 * `prefers-reduced-motion` → static composition. `?lab=3d|2d|static` overrides (QA).
 */
function computeMode(): LabMode {
  const override = new URLSearchParams(window.location.search).get("lab");
  if (override === "3d" || override === "2d" || override === "static") return override;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  if (window.innerWidth < 768) return "2d";
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return "2d";
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return "2d";
  if (!hasWebGL()) return "2d";
  return "3d";
}

function subscribe(onChange: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = window.matchMedia("(max-width: 767px)");
  motion.addEventListener("change", onChange);
  narrow.addEventListener("change", onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    narrow.removeEventListener("change", onChange);
  };
}

export function useLabMode(): LabMode {
  return useSyncExternalStore(subscribe, computeMode, () => "pending");
}

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
