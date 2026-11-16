"use client";

import dynamic from "next/dynamic";
import { useEffect, useSyncExternalStore } from "react";
import AmbientParticles from "./AmbientParticles";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import RevealController from "./RevealController";

import { hasWebGL } from "@/lib/capabilities";
import { markReady, skipKeyboardSteps } from "@/lib/readiness";

const loadKeyboard = () => import("./InteractiveKeyboard3D");
const InteractiveKeyboard3D = dynamic(loadKeyboard, { ssr: false });

/**
 * The keyboard mounts immediately on every viewport: the page loader waits for it, so when the
 * loader leaves, the keyboard section is already loaded and working (parked + paused until the
 * hero / skills stage shows it). Devices that cannot (or should not) run it skip the wait.
 */
const subscribeNever = () => () => {};
const canRunKeyboard = (): boolean => {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData && hasWebGL();
};

function useKeyboardMount(): boolean {
  const mount = useSyncExternalStore(subscribeNever, canRunKeyboard, () => false);
  useEffect(() => {
    // Not `mount`: during hydration that is still the server value (false).
    if (!canRunKeyboard()) {
      skipKeyboardSteps();
      return;
    }
    // Same promise the dynamic() above resolves: this just reports it to the loader.
    loadKeyboard().then(
      () => markReady("kb-chunk"),
      () => skipKeyboardSteps()
    );
  }, []);
  return mount;
}

export default function InteractiveStage() {
  const mountKeyboard = useKeyboardMount();
  return (
    <>
      <Preloader />
      <RevealController />
      <AmbientParticles quantity={115} />
      {mountKeyboard && <InteractiveKeyboard3D />}
      <CustomCursor />
    </>
  );
}
