"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  color: string;
}

export default function AmbientParticles({
  quantity = 65,
  staticity = 55,
  ease = 55,
}: {
  quantity?: number;
  staticity?: number;
  ease?: number;
}) {
  const { theme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rectLeft = 0;
    let rectTop = 0;
    let rafId = 0;
    let paused = false;
    const dpr =
      typeof window !== "undefined"
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : 1;
    const circles: Circle[] = [];

    const paletteForTheme = () =>
      themeRef.current === "dark"
        ? ["16, 185, 129", "99, 102, 241", "244, 244, 245"]
        : ["5, 150, 105", "79, 70, 229", "82, 82, 91"];

    const createCircle = (): Circle => {
      const colors = paletteForTheme();
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        translateX: 0,
        translateY: 0,
        size: Math.floor(Math.random() * 2) + 0.8,
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.42 + 0.1).toFixed(2)),
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        magnetism: 0.1 + Math.random() * 3.5,
        color,
      };
    };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      const rect = canvas.getBoundingClientRect();
      rectLeft = rect.left;
      rectTop = rect.top;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      circles.length = 0;
      const count = window.innerWidth < 768 ? Math.floor(quantity * 0.55) : quantity;
      for (let i = 0; i < count; i++) {
        circles.push(createCircle());
      }
    };

    const remapValue = (
      value: number,
      start1: number,
      end1: number,
      start2: number,
      end2: number
    ): number => {
      const remapped =
        ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
      return remapped > 0 ? remapped : 0;
    };

    const animate = () => {
      if (paused) return;
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === "dark";

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const edge = [
          circle.x + circle.translateX - circle.size,
          width - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          height - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = Math.min(edge[0], edge[1], edge[2], edge[3]);
        const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1);

        if (remapClosestEdge > 1) {
          circle.alpha = Math.min(circle.targetAlpha, circle.alpha + 0.02);
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }
        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) -
            circle.translateX) /
          ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) -
            circle.translateY) /
          ease;

        if (
          circle.x < -circle.size ||
          circle.x > width + circle.size ||
          circle.y < -circle.size ||
          circle.y > height + circle.size
        ) {
          circles[i] = createCircle();
        } else {
          const alphaBoost = isDark ? circle.alpha : circle.alpha * 0.82;
          ctx.beginPath();
          ctx.arc(
            circle.x + circle.translateX,
            circle.y + circle.translateY,
            circle.size,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = `rgba(${circle.color}, ${alphaBoost.toFixed(2)})`;
          ctx.fill();
        }
      }

      rafId = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX - rectLeft - width / 2;
      const y = e.clientY - rectTop - height / 2;
      if (x < width / 2 && x > -width / 2 && y < height / 2 && y > -height / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) {
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(animate);
      }
    };

    resize();
    animate();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [quantity, staticity, ease]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden will-change-transform"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
