"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { gsap } from "gsap";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const apply = () => setMatches(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [query]);

  return matches;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

// Velocity-driven squeeze amount for the free-roaming blob (from naresh_ref)
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Movement direction in degrees for the velocity stretch axis (from naresh_ref)
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getUnpushedRect(
  el: HTMLElement,
  activeTarget: HTMLElement | null,
  offX: number,
  offY: number
) {
  const r = el.getBoundingClientRect();
  const ox = el === activeTarget ? offX : 0;
  const oy = el === activeTarget ? offY : 0;
  const left = r.left - ox;
  const top = r.top - oy;
  return {
    left,
    top,
    right: left + r.width,
    bottom: top + r.height,
    width: r.width,
    height: r.height,
    cx: left + r.width / 2,
    cy: top + r.height / 2,
  };
}

const CURSOR_DIAMETER = 50;
const WRAP_PADDING = 8;
const WRAP_RADIUS = 12;
const WRAP_EASE = 0.22;
const TARGET_EASE = 0.2;
const TARGET_PULL = 0.35;
const TARGET_MAX_PULL = 12;

type QuickSetterFn = (v: number) => void;

type Setters = {
  x?: QuickSetterFn;
  y?: QuickSetterFn;
  r?: QuickSetterFn;
  width?: QuickSetterFn;
  height?: QuickSetterFn;
  radius?: QuickSetterFn;
  sx?: QuickSetterFn;
  sy?: QuickSetterFn;
  opacity?: QuickSetterFn;
  dotX?: QuickSetterFn;
  dotY?: QuickSetterFn;
  dotOpacity?: QuickSetterFn;
};

type TargetMagnetState = {
  el: HTMLElement | null;
  offX: number;
  offY: number;
};

export default function CustomCursor() {
  const isClient = useIsClient();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const jellyStateRef = useRef({
    x: 0,
    y: 0,
    w: CURSOR_DIAMETER,
    h: CURSOR_DIAMETER,
    radius: CURSOR_DIAMETER / 2,
  });

  const hoverTargetRef = useRef<HTMLElement | null>(null);
  const targetMagnetRef = useRef<TargetMagnetState>({
    el: null,
    offX: 0,
    offY: 0,
  });

  const cursorMovedRef = useRef(false);
  const setRef = useRef<Setters>({});

  const isDesktop = isClient && !isMobile;

  useLayoutEffect(() => {
    if (!isDesktop) return;
    const jellyEl = jellyRef.current;
    const dotEl = dotRef.current;
    if (!jellyEl || !dotEl) return;

    gsap.set(jellyEl, { xPercent: -50, yPercent: -50 });
    gsap.set(dotEl, { xPercent: -50, yPercent: -50 });

    setRef.current = {
      x: gsap.quickSetter(jellyEl, "x", "px") as QuickSetterFn,
      y: gsap.quickSetter(jellyEl, "y", "px") as QuickSetterFn,
      r: gsap.quickSetter(jellyEl, "rotate", "deg") as QuickSetterFn,
      sx: gsap.quickSetter(jellyEl, "scaleX") as QuickSetterFn,
      sy: gsap.quickSetter(jellyEl, "scaleY") as QuickSetterFn,
      width: gsap.quickSetter(jellyEl, "width", "px") as QuickSetterFn,
      height: gsap.quickSetter(jellyEl, "height", "px") as QuickSetterFn,
      radius: gsap.quickSetter(jellyEl, "borderRadius", "px") as QuickSetterFn,
      opacity: gsap.quickSetter(jellyEl, "opacity") as QuickSetterFn,
      dotX: gsap.quickSetter(dotEl, "x", "px") as QuickSetterFn,
      dotY: gsap.quickSetter(dotEl, "y", "px") as QuickSetterFn,
      dotOpacity: gsap.quickSetter(dotEl, "opacity") as QuickSetterFn,
    };
  }, [isDesktop]);

  const render = useCallback(() => {
    const set = setRef.current;
    if (
      !set.x ||
      !set.y ||
      !set.width ||
      !set.height ||
      !set.radius ||
      !set.r ||
      !set.sx ||
      !set.sy ||
      !set.opacity ||
      !set.dotX ||
      !set.dotY ||
      !set.dotOpacity
    ) {
      return;
    }

    const active = targetMagnetRef.current;
    const pointer = pointerRef.current;
    const jelly = jellyStateRef.current;
    const pos = posRef.current;
    const vel = velRef.current;

    if (!cursorMovedRef.current) {
      set.opacity(0);
      set.dotOpacity(0);
      return;
    }
    set.opacity(1);
    set.dotOpacity(1);

    // 1. Target element magnet pull — gently nudge the hovered element toward cursor
    if (active.el && active.el.isConnected) {
      const el = active.el;
      const b = getUnpushedRect(el, active.el, active.offX, active.offY);
      const pullX = clamp(
        (pointer.x - b.cx) * TARGET_PULL,
        -TARGET_MAX_PULL,
        TARGET_MAX_PULL
      );
      const pullY = clamp(
        (pointer.y - b.cy) * TARGET_PULL,
        -TARGET_MAX_PULL,
        TARGET_MAX_PULL
      );
      active.offX = lerp(active.offX, pullX, TARGET_EASE);
      active.offY = lerp(active.offY, pullY, TARGET_EASE);
      gsap.set(el, { x: active.offX, y: active.offY });
    }

    // 2. Jelly blob — wraps the hovered target or roams with velocity stretch
    const target = hoverTargetRef.current;
    if (target && target.isConnected) {
      const b = getUnpushedRect(
        target,
        active.el,
        active.offX,
        active.offY
      );
      const leadX = (pointer.x - b.cx) * 0.08;
      const leadY = (pointer.y - b.cy) * 0.08;
      const tx = b.cx + active.offX + leadX;
      const ty = b.cy + active.offY + leadY;
      jelly.x = lerp(jelly.x, tx, WRAP_EASE);
      jelly.y = lerp(jelly.y, ty, WRAP_EASE);
      jelly.w = lerp(jelly.w, b.width + WRAP_PADDING * 2, WRAP_EASE);
      jelly.h = lerp(jelly.h, b.height + WRAP_PADDING * 2, WRAP_EASE);
      const targetRadius = Math.min(
        WRAP_RADIUS,
        Math.min(b.width, b.height) / 2
      );
      jelly.radius = lerp(jelly.radius, targetRadius, WRAP_EASE);

      set.x(jelly.x);
      set.y(jelly.y);
      set.width(jelly.w);
      set.height(jelly.h);
      set.radius(jelly.radius);
      set.r(0);
      set.sx(1);
      set.sy(1);
    } else {
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);

      jelly.x = pos.x;
      jelly.y = pos.y;
      jelly.w = lerp(jelly.w, CURSOR_DIAMETER + scale * 300, 0.4);
      jelly.h = lerp(jelly.h, CURSOR_DIAMETER - scale * 300, 0.4);
      jelly.radius = lerp(jelly.radius, CURSOR_DIAMETER / 2, 0.35);

      set.x(jelly.x);
      set.y(jelly.y);
      set.width(jelly.w);
      set.height(jelly.h);
      set.radius(jelly.radius);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    }

    // 3. Center dot always tracks the real cursor position
    set.dotX(pointer.x);
    set.dotY(pointer.y);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const releaseElement = (el: HTMLElement | null) => {
      if (!el) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    const setHoveredTarget = (next: HTMLElement | null) => {
      if (hoverTargetRef.current === next) return;
      const prev = hoverTargetRef.current;
      hoverTargetRef.current = next;

      if (prev && prev !== next) {
        releaseElement(prev);
      }
      if (next) {
        gsap.killTweensOf(next);
        targetMagnetRef.current.el = next;
        targetMagnetRef.current.offX = Number(gsap.getProperty(next, "x")) || 0;
        targetMagnetRef.current.offY = Number(gsap.getProperty(next, "y")) || 0;
      } else {
        targetMagnetRef.current.el = null;
        targetMagnetRef.current.offX = 0;
        targetMagnetRef.current.offY = 0;
      }
    };

    const evaluateHoverAt = (x: number, y: number) => {
      const hit = document.elementFromPoint(x, y);
      const hoverEl =
        (hit?.closest(".cursor-can-hover") as HTMLElement | null) ?? null;
      setHoveredTarget(hoverEl);
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      pointerRef.current.x = x;
      pointerRef.current.y = y;

      if (!cursorMovedRef.current) {
        cursorMovedRef.current = true;
        posRef.current.x = x;
        posRef.current.y = y;
        jellyStateRef.current.x = x;
        jellyStateRef.current.y = y;
      }

      evaluateHoverAt(x, y);

      const pos = posRef.current;
      const vel = velRef.current;
      const setPos = (vx: number, vy: number) => {
        vel.x = x - vx;
        vel.y = y - vy;
      };

      gsap.to(pos, {
        x,
        y,
        duration: 1.15,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => setPos(pos.x, pos.y),
        overwrite: "auto",
      });

      render();
    };

    const onScroll = () => {
      if (!cursorMovedRef.current) return;
      evaluateHoverAt(pointerRef.current.x, pointerRef.current.y);
      render();
    };

    gsap.ticker.add(render);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });

    const activeSnapshot = targetMagnetRef.current;
    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      if (activeSnapshot.el) {
        gsap.set(activeSnapshot.el, { x: 0, y: 0 });
      }
    };
  }, [isDesktop, render]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-cursor"
        className="w-[50px] h-[50px] border-2 border-black dark:border-white fixed left-0 top-0 rounded-full z-[999] pointer-events-none will-change-transform translate-x-[-50%] translate-y-[-50%]"
        style={{
          backdropFilter: "invert(100%)",
          WebkitBackdropFilter: "invert(100%)",
          opacity: 0,
        }}
      />
      <div
        ref={dotRef}
        className="w-3 h-3 rounded-full fixed z-[999] pointer-events-none left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          backdropFilter: "invert(100%)",
          WebkitBackdropFilter: "invert(100%)",
          opacity: 0,
        }}
      />
    </>
  );
}
