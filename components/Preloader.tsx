"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useT } from "@/messages";

export default function Preloader() {
  const { sceneReady } = useApp();
  const t = useT();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // The keyboard only mounts up front on wide layouts; skip the GLB prefetch elsewhere.
    const preloadAssets = window.innerWidth >= 1024 ? ["/assets/keyboard/keycaps.glb"] : [];
    preloadAssets.forEach((url) => {
      fetch(url, { cache: "force-cache" }).catch(() => {});
    });

    // Never block the page for long: hide after the scene is ready or 900 ms at most.
    const fallbackTimer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (sceneReady) {
      const doneTimer = window.setTimeout(() => setVisible(false), 120);
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
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {t.preloader.brand}
              </span>
            </div>
            <span>Pasto, CO · UTC-5</span>
          </div>

          {/* Center Brand & Status */}
          <div className="my-auto flex flex-col items-start gap-4 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              {t.preloader.status}
            </span>
            <p className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Gabriel Esteban Paz Guerrero
            </p>
            <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div className="progress-indeterminate h-full w-1/3 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            </div>
          </div>

          {/* Bottom Counter */}
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
              {t.preloader.tagline}
            </span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
