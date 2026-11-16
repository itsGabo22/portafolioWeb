"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MoodId } from "@/data/personal";
import { useReducedMotion } from "@/lib/capabilities";
import { BEYOND_PHOTOS, photoFor } from "./photos";

/**
 * Real-photo layer for the active mood: cross-fades between moods and drifts
 * with scroll + pointer (parallax). A mood-coloured scrim keeps text AA.
 * Images load lazily (the section itself mounts near the viewport) and only
 * for moods that were actually shown. Purely decorative.
 */
export default function MoodPhoto({ mood }: { mood: MoodId }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState<MoodId[]>([]);

  // Keep every mood shown so far mounted, so switching cross-fades instead of popping.
  if (photoFor(mood) && !seen.includes(mood)) setSeen([...seen, mood]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (panel above centre) .. 1 (below): image moves slower than the page
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      el.style.setProperty("--bx-py", `${(p * 5).toFixed(2)}%`);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      el.style.setProperty("--bx-px", `${(((e.clientX - r.left) / r.width - 0.5) * -2.4).toFixed(2)}%`);
      el.style.setProperty("--bx-pt", `${(((e.clientY - r.top) / r.height - 0.5) * -1.6).toFixed(2)}%`);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  if (!BEYOND_PHOTOS) return null;
  const hasActive = Boolean(photoFor(mood));

  return (
    <div ref={ref} aria-hidden="true" className="bx-photos" data-active={hasActive}>
      {seen.map((id) => {
        const photo = photoFor(id);
        if (!photo) return null;
        return (
          <div key={id} className="bx-photo" data-on={id === mood} data-tone={id === "macdemarco" ? "light" : "dark"}>
            <Image
              src={photo.bg}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={70}
              className="object-cover"
              style={{ objectPosition: photo.position ?? "50% 50%" }}
            />
          </div>
        );
      })}
      <div className="bx-photo-scrim" />
    </div>
  );
}
