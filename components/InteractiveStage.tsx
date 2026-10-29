"use client";

import dynamic from "next/dynamic";
import AmbientParticles from "./AmbientParticles";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";

const InteractiveKeyboard3D = dynamic(
  () => import("./InteractiveKeyboard3D"),
  { ssr: false }
);

export default function InteractiveStage() {
  return (
    <>
      <Preloader />
      <AmbientParticles quantity={115} />
      <InteractiveKeyboard3D />
      <CustomCursor />
    </>
  );
}
