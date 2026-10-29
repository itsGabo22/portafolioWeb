"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

function subscribeMedia(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
  mq.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    mq.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

function getDesktopSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

export default function CustomCursor() {
  const isDesktop = useSyncExternalStore(
    subscribeMedia,
    getDesktopSnapshot,
    getServerSnapshot
  );

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorMoved, setCursorMoved] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const lastClient = { x: 0, y: 0 };
    let isHovering = false;
    let moved = false;

    const setX = gsap.quickSetter(ring, "x", "px");
    const setY = gsap.quickSetter(ring, "y", "px");
    const setRotation = gsap.quickSetter(ring, "rotation", "deg");
    const setScaleX = gsap.quickSetter(ring, "scaleX");
    const setScaleY = gsap.quickSetter(ring, "scaleY");
    const setWidth = gsap.quickSetter(ring, "width", "px");
    const setHeight = gsap.quickSetter(ring, "height", "px");

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    const update = () => {
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);
      setX(pos.x);
      setY(pos.y);
      if (!isHovering) {
        setRotation(rotation);
        setScaleX(1 + scale);
        setScaleY(1 - scale);
      } else {
        setRotation(0);
        setScaleX(1);
        setScaleY(1);
      }
    };

    const syncCursorTarget = (
      clientX: number,
      clientY: number,
      rawTarget: Element | null
    ) => {
      const hoverElem = rawTarget?.closest?.(
        ".cursor-can-hover"
      ) as HTMLElement | null;

      if (hoverElem) {
        const rect = hoverElem.getBoundingClientRect();
        isHovering = true;
        setWidth(rect.width + 16);
        setHeight(rect.height + 16);
        gsap.to(pos, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
          onUpdate: () => {
            vel.x = 0;
            vel.y = 0;
          },
        });
      } else {
        isHovering = false;
        setWidth(34);
        setHeight(34);
        gsap.to(pos, {
          x: clientX,
          y: clientY,
          duration: 0.38,
          ease: "power3.out",
          overwrite: "auto",
          onUpdate: () => {
            vel.x = clientX - pos.x;
            vel.y = clientY - pos.y;
          },
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!moved) {
        moved = true;
        setCursorMoved(true);
      }

      lastClient.x = e.clientX;
      lastClient.y = e.clientY;
      setDotX(e.clientX);
      setDotY(e.clientY);

      syncCursorTarget(e.clientX, e.clientY, e.target as Element | null);
    };

    const onScroll = () => {
      if (!moved) return;
      const elemUnderCursor = document.elementFromPoint(
        lastClient.x,
        lastClient.y
      );
      syncCursorTarget(lastClient.x, lastClient.y, elemUnderCursor);
    };

    gsap.ticker.add(update);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ width: 34, height: 34 }}
        className={`pointer-events-none fixed left-0 top-0 z-[999] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/10 mix-blend-difference transition-[width,height,opacity] duration-200 ease-out ${
          cursorMoved ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-opacity duration-200 ${
          cursorMoved ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
