"use client";

import dynamic from "next/dynamic";
import AmbientParticles from "./AmbientParticles";
import CustomCursor from "./CustomCursor";

const InteractiveKeyboard3D = dynamic(
  () => import("./InteractiveKeyboard3D"),
  { ssr: false }
);

export default function InteractiveStage() {
  return (
    <>
      <AmbientParticles quantity={85} />
      <InteractiveKeyboard3D />
      <CustomCursor />
    </>
  );
}
