"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/capabilities";

/**
 * Number that counts up once when it scrolls into view. Server HTML and
 * reduced motion show the final value; the start value is only zeroed on the
 * client while the number is still below the fold (no flash, no layout shift:
 * tabular figures keep the width stable).
 */
export default function CountUp({ value, pad = 2 }: { value: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (reduced || armed.current || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      // arm the count before it is visible
      setShown(0);
    }
  }, [reduced]);

  useEffect(() => {
    if (!inView || !armed.current || reduced) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(shown).padStart(pad, "0")}
    </span>
  );
}
