import type { CSSProperties } from "react";
import type { MoodId } from "@/data/personal";
import { MOODS, type Mood } from "./moods";

/** Deterministic pseudo-random particle layout (no Math.random → no hydration drift). */
const PARTICLES = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: `${Math.round(r(1) * 100)}%`,
    size: 2 + Math.round(r(2) * 3),
    duration: 7 + r(3) * 9,
    delay: -r(4) * 14,
  };
});

/** Texture + ambient particles for the active mood. Purely decorative. */
export default function MoodTexture({ mood, texture }: { mood: MoodId; texture?: Mood["texture"] }) {
  const m = MOODS[mood] ?? MOODS.base;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bx-texture" data-texture={texture ?? m.texture} />
      {m.particles && (
        <div className="bx-particles" data-kind={m.particles}>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              style={
                {
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
