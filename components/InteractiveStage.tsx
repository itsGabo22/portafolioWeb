"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AmbientParticles from "./AmbientParticles";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import RevealController from "./RevealController";

const InteractiveKeyboard3D = dynamic(
  () => import("./InteractiveKeyboard3D"),
  { ssr: false }
);

/**
 * The 3D keyboard is only shown in the hero on wide (>=1200px) layouts, so on
 * phones/tablets its ~450 KB of JS and the WebGL scene are not loaded until the
 * visitor approaches #skills. On desktop it mounts once the browser is idle.
 */
function useKeyboardMount(): boolean {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    let done = false;
    const decide = () => {
      if (done) return;
      const skills = document.getElementById("skills");
      const wide = window.innerWidth >= 1200;
      const nearSkills = skills ? skills.getBoundingClientRect().top < window.innerHeight * 2 : false;
      if (wide || nearSkills) {
        done = true;
        setMount(true);
        window.removeEventListener("scroll", decide);
        window.removeEventListener("resize", decide);
      }
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(decide, { timeout: 1500 })
      : globalThis.setTimeout(decide, 600);
    window.addEventListener("scroll", decide, { passive: true });
    window.addEventListener("resize", decide);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else globalThis.clearTimeout(idle);
      window.removeEventListener("scroll", decide);
      window.removeEventListener("resize", decide);
    };
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
