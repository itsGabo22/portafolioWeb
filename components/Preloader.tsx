"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function Preloader() {
  const { sceneReady, lang } = useApp();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Pre-warm 3D .glb assets in browser HTTP cache immediately
    const preloadAssets = [
      "/assets/keyboard/keycaps.glb",
      "/assets/keyboard/bongo-frames.glb",
    ];
    preloadAssets.forEach((url) => {
      fetch(url, { cache: "force-cache" }).catch(() => {});
    });

    let current = 0;
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const step = sceneReady ? 18 : prev < 75 ? 9 : 2;
        current = Math.min(sceneReady ? 100 : 92, prev + step);
        return current;
      });
    }, 45);

    // Hard fallback timeout of 1.35s max so the preloader never hangs on slow networks
    const fallbackTimer = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => setVisible(false), 260);
    }, 1350);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fallbackTimer);
    };
  }, [sceneReady]);

  useEffect(() => {
    if (sceneReady) {
      const doneTimer = window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => setVisible(false), 240);
      }, 60);
      return () => window.clearTimeout(doneTimer);
    }
  }, [sceneReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="architectural-preloader"
          initial={{ opacity: 1, y: "0%" }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[120] flex flex-col justify-between bg-[#f4f4f0] dark:bg-zinc-950 px-6 py-8 sm:px-12 sm:py-10 border-b border-zinc-300/80 dark:border-zinc-800"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                GABRIEL PAZ // PORTFOLIO
              </span>
            </div>
            <span>PASTO, CO · UTC-5</span>
          </div>

          {/* Center Architectural Brand & Status */}
          <div className="my-auto flex flex-col items-start gap-4 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
              {lang === "es"
                ? "Inicializando motor 3D & WebGL"
                : "Initializing 3D WebGL stage"}
            </span>
            <p className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Gabriel Esteban Paz Guerrero
            </p>
            <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Monumental Counter */}
          <div className="flex items-end justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              VICARDEV · ELECTROTECH · OBSIDION
            </span>
            <span className="font-display text-6xl sm:text-8xl font-black tracking-tighter tabular-nums leading-none text-zinc-900 dark:text-zinc-50">
              {String(progress).padStart(2, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
