"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/messages";
import {
  STEP_WEIGHT,
  getReadiness,
  getServerReadiness,
  markReady,
  subscribeReadiness,
  type ReadyStep,
} from "@/lib/readiness";

/** Never trap the visitor: after this the page is revealed and the keyboard finishes in the background. */
const SAFETY_TIMEOUT_MS = 9000;
/** Shortest the loader stays up, so it reads as intentional rather than as a flash. */
const MIN_VISIBLE_MS = 1100;
/** Hold on 100% before sliding away. */
const HOLD_MS = 260;

const KEY_LABELS = [
  "TS", "JS", "RE", "NX", "AS", "TW",
  "TA", "CA", "KT", "ND", "EX", "PY",
  "FA", "JV", "SB", "GM", "ST", "PG",
  "SU", "MG", "DK", "AW", "VC", "CF",
] as const;

const KEYBOARD_ASSETS = ["/assets/keyboard/keycaps.glb", "/assets/keyboard/bongo-frames.glb"];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Preloader() {
  const t = useT();
  const [visible, setVisible] = useState(true);
  const readiness = useSyncExternalStore(subscribeReadiness, getReadiness, getServerReadiness);

  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const keysRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const startRef = useRef(0);

  // --- scroll lock: only while the loader is on screen, ALWAYS released (exit, timeout, unmount) ---
  useEffect(() => {
    if (!visible) return;
    const root = document.documentElement;
    root.classList.add("is-loading");
    return () => root.classList.remove("is-loading");
  }, [visible]);

  // --- real readiness signals owned by the loader: typefaces, cover, keyboard assets ---
  useEffect(() => {
    startRef.current = performance.now();
    let cancelled = false;
    const mark = (step: ReadyStep) => {
      if (!cancelled) markReady(step);
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => mark("fonts"), () => mark("fonts"));

    // Cover: the above-the-fold <img> elements decoded (avatar) after the first painted frame.
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("#hero img"));
    Promise.all(images.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => {}))))
      .then(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
      .then(() => mark("hero"));

    // Keyboard model + cat frames: fetched now (HTTP-cached) so the 3D scene mounts without waiting on the network.
    Promise.all(KEYBOARD_ASSETS.map((url) => fetch(url, { cache: "force-cache" }).then((r) => r.arrayBuffer())))
      .catch(() => {})
      .then(() => mark("kb-assets"));

    return () => {
      cancelled = true;
    };
  }, []);

  // --- target progress follows the real steps; the shown value eases toward it (and creeps a little inside the current step) ---
  useEffect(() => {
    targetRef.current = readiness.progress;
  }, [readiness.progress]);

  // --- exit: all steps done (after the minimum time + a short hold) or the safety timeout ---
  useEffect(() => {
    if (!visible) return;
    const safety = window.setTimeout(() => setVisible(false), SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(safety);
  }, [visible]);

  useEffect(() => {
    if (!visible || !readiness.ready) return;
    const elapsed = performance.now() - startRef.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed) + HOLD_MS;
    const timer = window.setTimeout(() => setVisible(false), wait);
    return () => window.clearTimeout(timer);
  }, [visible, readiness.ready]);

  // --- draw loop: writes straight to the DOM (no React renders per frame) ---
  useEffect(() => {
    if (!visible) return;
    const reduced = prefersReducedMotion();
    const keys = Array.from(keysRef.current?.children ?? []) as HTMLElement[];
    let raf = 0;
    let last = performance.now();
    let lit = -1;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = targetRef.current;
      // creep: while a step is pending, drift up to ~85% of its weight so the bar never looks frozen
      const pending = getReadiness().pending;
      const creepCap = pending ? Math.min(0.97, target + STEP_WEIGHT[pending] * 0.85) : 1;
      const goal = reduced ? target : Math.max(target, Math.min(creepCap, shownRef.current + dt * 0.04));
      const next = reduced ? goal : shownRef.current + (goal - shownRef.current) * Math.min(1, dt * 7);
      shownRef.current = Math.abs(goal - next) < 0.0008 ? goal : next;

      const value = shownRef.current;
      if (barRef.current) barRef.current.style.transform = `scaleX(${value.toFixed(4)})`;
      if (percentRef.current) percentRef.current.textContent = String(Math.round(value * 100)).padStart(2, "0");
      const count = Math.floor(value * keys.length + (value >= 0.999 ? 1 : 0));
      if (count !== lit) {
        keys.forEach((key, i) => {
          key.dataset.on = i < count ? "1" : "0";
        });
        // the key that just lit presses itself
        if (!reduced && count > lit && lit >= 0) pressKey(keys[count - 1]);
        lit = count;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // --- pointer: spotlight + 3D tilt follow the cursor; the key under it presses (touch drags work too) ---
  useEffect(() => {
    const root = rootRef.current;
    const board = boardRef.current;
    if (!visible || !root || !board || prefersReducedMotion()) return;
    let raf = 0;
    let lastKey: Element | null = null;

    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = x / window.innerWidth - 0.5;
        const ny = y / window.innerHeight - 0.5;
        root.style.setProperty("--px", `${x}px`);
        root.style.setProperty("--py", `${y}px`);
        board.style.setProperty("--rz", `${(-20 + nx * 22).toFixed(2)}deg`);
        board.style.setProperty("--rx", `${(52 - ny * 16).toFixed(2)}deg`);
        const under = document.elementFromPoint(x, y);
        const key = under?.classList.contains("pl-key") ? under : null;
        if (key && key !== lastKey) pressKey(key as HTMLElement);
        lastKey = key;
      });
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
    };
  }, [visible]);

  const stage = readiness.ready
    ? t.preloader.steps.ready
    : readiness.pending === "fonts"
      ? t.preloader.steps.fonts
      : readiness.pending === "hero"
        ? t.preloader.steps.hero
        : readiness.pending === "kb-scene"
          ? t.preloader.steps.scene
          : t.preloader.steps.keyboard;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          key="architectural-preloader"
          role="status"
          aria-live="polite"
          aria-label={t.preloader.status}
          initial={{ opacity: 1, y: "0%" }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[120] flex flex-col justify-between overflow-hidden bg-[#f4f4f0] px-6 py-8 dark:bg-zinc-950 sm:px-12 sm:py-10 border-b border-zinc-300/80 dark:border-zinc-800"
        >
          <div aria-hidden="true" className="pl-spot pointer-events-none absolute inset-0" />

          {/* Top Bar */}
          <div className="relative flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t.preloader.brand}</span>
            </div>
            <span>Pasto, CO · UTC-5</span>
          </div>

          {/* Center: staged status + name on the left, 3D keycap board on the right */}
          <div className="relative my-auto grid w-full items-center gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
            <div className="flex w-full max-w-md flex-col items-start gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/70 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {stage}
              </span>
              <p className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                Gabriel Esteban Paz Guerrero
              </p>
              <div className="flex w-full items-center gap-3">
                <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <span className="pl-shimmer absolute inset-y-0 left-0 w-1/3" aria-hidden="true" />
                  <div ref={barRef} className="pl-bar relative h-full w-full rounded-full bg-emerald-600 dark:bg-emerald-400" style={{ transform: "scaleX(0)" }} />
                </div>
                <span className="w-9 text-right font-mono text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
                  <span ref={percentRef}>00</span>%
                </span>
              </div>
            </div>

            {/* perspective stage: the board eases in from flat and tilts with the pointer; keys rise as steps finish */}
            <div className="pl-stage mx-auto w-full max-w-[34rem]" aria-hidden="true">
              <div ref={boardRef} className="pl-board">
                <div ref={keysRef} className="pl-keys">
                  {KEY_LABELS.map((label) => (
                    <span key={label} className="pl-key" data-on="0">
                      {label}
                    </span>
                  ))}
                </div>
                <span className="pl-sweep pointer-events-none absolute inset-0 overflow-hidden rounded-lg" />
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="relative flex items-end justify-between gap-4 text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>{t.preloader.tagline}</span>
            <span className="hidden sm:inline">{t.preloader.hint}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Key press in 3D: dips along Z from wherever it currently rests (raised when lit). */
function pressKey(key: HTMLElement | undefined) {
  if (!key?.animate) return;
  const rest = key.dataset.on === "1" ? 16 : 0;
  key.animate(
    [
      { transform: `translateZ(${rest}px)` },
      { transform: `translateZ(${rest - 12}px)`, offset: 0.35 },
      { transform: `translateZ(${rest}px)` },
    ],
    { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
  );
}
