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
  quantity = 85,
  staticity = 50,
  ease = 50,
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
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
        targetAlpha: parseFloat((Math.random() * 0.45 + 0.12).toFixed(2)),
        dx: (Math.random() - 0.5) * 0.22,
        dy: (Math.random() - 0.5) * 0.22,
        magnetism: 0.1 + Math.random() * 4,
        color,
      };
    };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      circles.length = 0;
      for (let i = 0; i < quantity; i++) {
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
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === "dark";

      circles.forEach((circle, i) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          width - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          height - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha;
          }
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
          ctx.save();
          ctx.translate(circle.translateX, circle.translateY);
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
          const alphaBoost = isDark ? circle.alpha : circle.alpha * 0.85;
          ctx.fillStyle = `rgba(${circle.color}, ${alphaBoost})`;
          ctx.fill();
          ctx.restore();
        }
      });

      rafId = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      if (x < width / 2 && x > -width / 2 && y < height / 2 && y > -height / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [quantity, staticity, ease]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
