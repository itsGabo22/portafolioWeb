"use client";

import React from "react";

const TECH_LOGO_MAP: Record<string, string> = {
  "javascript": "/assets/keyboard/logos/js.svg",
  "js": "/assets/keyboard/logos/js.svg",
  "typescript": "/assets/keyboard/logos/ts.svg",
  "ts": "/assets/keyboard/logos/ts.svg",
  "next.js": "/assets/keyboard/logos/nextjs.svg",
  "next.js 16": "/assets/keyboard/logos/nextjs.svg",
  "react": "/assets/keyboard/logos/react.svg",
  "tailwind css": "/assets/keyboard/logos/tailwind.svg",
  "tailwind css v4": "/assets/keyboard/logos/tailwind.svg",
  "node.js": "/assets/keyboard/logos/nodejs.svg",
  "express": "/assets/keyboard/logos/express.svg",
  "postgresql": "/assets/keyboard/logos/postgres.svg",
  "postgresql / postgis": "/assets/keyboard/logos/postgres.svg",
  "mongodb": "/assets/keyboard/logos/mongodb.svg",
  "docker": "/assets/keyboard/logos/docker.svg",
  "aws": "/assets/keyboard/logos/aws.svg",
  "aws lambda & s3": "/assets/keyboard/logos/aws.svg",
  "git": "/assets/keyboard/logos/git.svg",
  "linux": "/assets/keyboard/logos/linux.svg",
  "cloudflare": "/assets/keyboard/logos/cloudflare.svg",
  "hostinger dns": "/assets/keyboard/logos/cloudflare.svg",
  "steam api": "/assets/keyboard/logos/steam.svg",
  "gemini ai": "/assets/keyboard/logos/claude.svg",
  "conversational ai": "/assets/keyboard/logos/claude.svg",
  "ai analytics": "/assets/keyboard/logos/claude.svg",
  "ai integration": "/assets/keyboard/logos/claude.svg",
  "capacitor mobile": "/assets/keyboard/logos/expo.svg",
  "webapk / pwa": "/assets/keyboard/logos/expo.svg",
  "kotlin / wear os": "/assets/keyboard/logos/gcp.svg",
  "java": "/assets/keyboard/logos/proxmox.svg",
  "java 17": "/assets/keyboard/logos/proxmox.svg",
  "spring boot": "/assets/keyboard/logos/leaf.svg",
  "python": "/assets/logos/python-mono.svg",
  "fastapi": "/assets/logos/python-mono.svg",
  "astro": "/assets/logos/astro-mono.svg",
  "supabase": "/assets/logos/supabase-mono.svg",
  "vercel": "/assets/logos/vercel-mono.svg",
  "tauri v2": "/assets/keyboard/logos/bun.svg",
  "tauri v2 / rust": "/assets/keyboard/logos/bun.svg",
  "resend api": "/assets/keyboard/logos/nginx.svg",
  "web audio api": "/assets/keyboard/logos/js.svg",
};

export function getTechLogo(techName: string): string {
  const key = techName.trim().toLowerCase();
  if (key === "spring boot") return "/assets/keyboard/logos/nodejs.svg";
  return TECH_LOGO_MAP[key] ?? "/assets/keyboard/logos/ts.svg";
}

export default function TechBadge({
  name,
  size = "sm",
  interactive = false,
}: {
  name: string;
  size?: "xs" | "sm" | "md";
  interactive?: boolean;
}) {
  const logo = getTechLogo(name);
  const sizeClasses =
    size === "xs"
      ? "px-2.5 py-1 text-[11px] gap-1.5"
      : size === "md"
        ? "px-3.5 py-2 text-xs gap-2"
        : "px-3 py-1.5 text-xs gap-1.5";
  const imgSize = size === "xs" ? "h-3.5 w-3.5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <span
      className={`${
        interactive ? "cursor-can-hover" : ""
      } group/badge inline-flex items-center rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/70 font-medium text-zinc-700 dark:text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white ${sizeClasses}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className={`${imgSize} shrink-0 object-contain opacity-80 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:opacity-100 dark:brightness-110`}
      />
      <span>{name}</span>
    </span>
  );
}
