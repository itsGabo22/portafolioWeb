/**
 * Tiny readiness store for the page loader.
 *
 * Components report real load steps with `markReady(step)`; the loader subscribes
 * and only lets go once every required step is done (or its safety timeout fires).
 * Module-level on purpose: no context re-renders, nothing to hydrate.
 */
export type ReadyStep = "fonts" | "hero" | "kb-chunk" | "kb-assets" | "kb-scene";

/** Share of the progress bar each step is worth (sums to 1). */
export const STEP_WEIGHT: Record<ReadyStep, number> = {
  fonts: 0.12,
  hero: 0.16,
  "kb-chunk": 0.2,
  "kb-assets": 0.2,
  "kb-scene": 0.32,
};

/** Order the loader walks through (drives the staged status text). */
export const STEP_ORDER: readonly ReadyStep[] = ["fonts", "hero", "kb-chunk", "kb-assets", "kb-scene"];

export interface Readiness {
  /** 0..1, summed from the completed steps. */
  progress: number;
  /** Every step is done. */
  ready: boolean;
  /** First step still pending, or null when ready. */
  pending: ReadyStep | null;
}

const done = new Set<ReadyStep>();
const listeners = new Set<() => void>();

const compute = (): Readiness => {
  let progress = 0;
  for (const step of STEP_ORDER) if (done.has(step)) progress += STEP_WEIGHT[step];
  const pending = STEP_ORDER.find((step) => !done.has(step)) ?? null;
  return { progress: Math.min(1, progress), ready: pending === null, pending };
};

let snapshot: Readiness = compute();
const SERVER_SNAPSHOT: Readiness = { progress: 0, ready: false, pending: "fonts" };

export function markReady(step: ReadyStep): void {
  if (done.has(step)) return;
  done.add(step);
  snapshot = compute();
  listeners.forEach((listener) => listener());
}

/** Marks every keyboard step (no WebGL / data saver: nothing to wait for). */
export function skipKeyboardSteps(): void {
  (["kb-chunk", "kb-assets", "kb-scene"] as const).forEach(markReady);
}

export function subscribeReadiness(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const getReadiness = (): Readiness => snapshot;
export const getServerReadiness = (): Readiness => SERVER_SNAPSHOT;
