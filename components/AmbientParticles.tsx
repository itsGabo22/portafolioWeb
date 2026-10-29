"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseDx: number;
  baseDy: number;
  size: number;
  aspect: number;
  angle: number;
  spin: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  depth: number;
  colorRgb: string;
}

export default function AmbientParticles({
  quantity = 115,
}: {
  quantity?: number;
}) {
  const { theme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    let rafId = 0;
    let paused = false;
    let tickCount = 0;
    const dpr =
      typeof window !== "undefined"
        ? Math.min(window.devicePixelRatio || 1, 1.75)
        : 1;

    const particles: Particle[] = [];

    const pointer = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      lastX: -9999,
      lastY: -9999,
      normX: 0,
      normY: 0,
    };

    const ashColors = [
      "24, 24, 27",   // #18181b deep charcoal
      "39, 39, 42",   // #27272a warm graphite
      "63, 63, 70",   // #3f3f46 ash slate
      "82, 82, 91",   // #52525b soft cinder
      "15, 23, 42",   // #0f172a obsidian speck
    ];

    const starColors = [
      "255, 255, 255", // pure starlight
      "226, 232, 240", // cool silver-white
      "167, 243, 208", // soft emerald nebula tint
      "199, 210, 254", // soft indigo starlight
    ];

    const createParticle = (isDark: boolean, randomY = true): Particle => {
      const depth = 0.35 + Math.random() * 0.85;
      if (isDark) {
        // Dark Mode: Cosmic Star
        const colorRgb =
          starColors[Math.floor(Math.random() * starColors.length)];
        const size = (0.7 + Math.random() * 1.65) * depth;
        return {
          x: Math.random() * width,
          y: randomY ? Math.random() * height : Math.random() * height,
          vx: 0,
          vy: 0,
          baseDx: (Math.random() - 0.5) * 0.12 * depth,
          baseDy: (Math.random() - 0.5) * 0.1 * depth,
          size,
          aspect: 1,
          angle: 0,
          spin: 0,
          alpha: 0.2,
          baseAlpha: 0.28 + Math.random() * 0.58,
          twinkleSpeed: 0.02 + Math.random() * 0.035,
          phase: Math.random() * Math.PI * 2,
          depth,
          colorRgb,
        };
      } else {
        // Light Mode: Floating Ash Flake
        const colorRgb =
          ashColors[Math.floor(Math.random() * ashColors.length)];
        const size = (1.6 + Math.random() * 2.3) * depth;
        return {
          x: Math.random() * width,
          y: randomY ? Math.random() * height : height + 10,
          vx: 0,
          vy: 0,
          baseDx: (Math.random() - 0.42) * 0.28 * depth,
          baseDy: -(0.18 + Math.random() * 0.36) * depth, // gentle upward ash drift
          size,
          aspect: 0.42 + Math.random() * 0.38,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.035,
          alpha: 0.2,
          baseAlpha: 0.18 + Math.random() * 0.26,
          twinkleSpeed: 0.015 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          depth,
          colorRgb,
        };
      }
    };

    const populate = () => {
      particles.length = 0;
      const isDark = themeRef.current === "dark";
      const isSmall = window.innerWidth < 768;
      const count = isSmall ? Math.floor(quantity * 0.55) : quantity;
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(isDark, true));
      }
    };

    const resize = () => {
      width = container.offsetWidth || window.innerWidth;
      height = container.offsetHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
    };

    let lastTheme = themeRef.current;

    const animate = () => {
      if (paused) return;
      tickCount += 1;

      const currentTheme = themeRef.current;
      const isDark = currentTheme === "dark";
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        populate();
      }

      ctx.clearRect(0, 0, width, height);

      pointer.vx *= 0.88;
      pointer.vy *= 0.88;

      const wakeRadius = isDark ? 125 : 140;
      const wakeRadiusSq = wakeRadius * wakeRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor interaction: aerodynamic vortex for Ash (Light) / gravitational wake for Stars (Dark)
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < wakeRadiusSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / wakeRadius;
          const nx = dx / dist;
          const ny = dy / dist;

          if (isDark) {
            // Subtle star repulsion + cursor wake
            p.vx += (nx * 0.18 + pointer.vx * 0.015) * falloff * p.depth;
            p.vy += (ny * 0.18 + pointer.vy * 0.015) * falloff * p.depth;
          } else {
            // Aerodynamic breeze + swirl for floating ash flakes
            const swirl = (i % 2 === 0 ? 1 : -1) * 0.24 * falloff;
            p.vx += (nx * 0.26 - ny * swirl + pointer.vx * 0.032) * falloff;
            p.vy += (ny * 0.26 + nx * swirl + pointer.vy * 0.032) * falloff;
            p.angle += falloff * 0.06;
          }
        }

        // Apply damping and base drift
        p.vx *= 0.94;
        p.vy *= 0.94;

        if (isDark) {
          p.x += p.baseDx + p.vx;
          p.y += p.baseDy + p.vy;
          const twinkle =
            Math.sin(tickCount * p.twinkleSpeed + p.phase) * 0.22;
          p.alpha = Math.max(0.08, Math.min(0.95, p.baseAlpha + twinkle));
        } else {
          // Organic lateral wind flutter for ash
          const flutter =
            Math.sin(tickCount * p.twinkleSpeed + p.phase) * 0.22;
          p.x += p.baseDx + flutter + p.vx;
          p.y += p.baseDy + p.vy;
          p.angle += p.spin;
          p.alpha = p.baseAlpha;
        }

        // Wrap around screen boundaries seamlessly
        const margin = 16;
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;

        // Parallax offset from pointer position
        const parX = p.x + pointer.normX * 14 * p.depth;
        const parY = p.y + pointer.normY * 14 * p.depth;

        if (isDark) {
          // Render Star with soft halo & occasional 4-point cross-glint
          ctx.beginPath();
          ctx.arc(parX, parY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.colorRgb}, ${p.alpha.toFixed(2)})`;
          ctx.fill();

          if (p.size > 1.45) {
            const glowAlpha = (p.alpha * 0.28).toFixed(2);
            ctx.beginPath();
            ctx.arc(parX, parY, p.size * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.colorRgb}, ${glowAlpha})`;
            ctx.fill();

            // Subtle 4-point starlight cross on brightest stars
            if (i % 5 === 0) {
              const arm = p.size * 3.1;
              ctx.strokeStyle = `rgba(${p.colorRgb}, ${(p.alpha * 0.38).toFixed(2)})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(parX - arm, parY);
              ctx.lineTo(parX + arm, parY);
              ctx.moveTo(parX, parY - arm);
              ctx.lineTo(parX, parY + arm);
              ctx.stroke();
            }
          }
        } else {
          // Render tumbling irregular Ash Flake in Light Mode
          ctx.save();
          ctx.translate(parX, parY);
          ctx.rotate(p.angle);
          ctx.fillStyle = `rgba(${p.colorRgb}, ${p.alpha.toFixed(2)})`;
          ctx.beginPath();
          // Organic polygon/ellipse ash flake
          const rx = p.size;
          const ry = p.size * p.aspect;
          ctx.moveTo(-rx, 0);
          ctx.quadraticCurveTo(-rx * 0.3, -ry * 1.2, rx, -ry * 0.25);
          ctx.quadraticCurveTo(rx * 0.4, ry * 1.15, -rx, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      rafId = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (pointer.lastX !== -9999) {
        pointer.vx = Math.max(-28, Math.min(28, x - pointer.lastX));
        pointer.vy = Math.max(-28, Math.min(28, y - pointer.lastY));
      }
      pointer.lastX = x;
      pointer.lastY = y;
      pointer.x = x;
      pointer.y = y;
      pointer.normX = (x / Math.max(1, width) - 0.5) * 2;
      pointer.normY = (y / Math.max(1, height) - 0.5) * 2;
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
  }, [quantity]);

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
