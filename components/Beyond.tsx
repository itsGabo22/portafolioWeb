"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BEYOND_TAB_IDS, type BeyondTabId } from "@/data/beyondTabs";
import { useT } from "@/messages";
import { BEYOND_PHOTOS } from "./beyond/photos";
// only the loader shell ships with the page; beyond.css comes with the menu chunk
import "./beyond/beyond-shell.css";

function MenuLoader() {
  const t = useT();
  return (
    <div role="status" className="ps-loader">
      <span className="text-sm text-ink-muted">{t.beyond.loading}</span>
    </div>
  );
}

const PsMenu = dynamic(() => import("./beyond/PsMenu"), { ssr: false, loading: () => <MenuLoader /> });

/* Active tab lives in the URL hash (#beyond-games | #beyond-media | #beyond-likes). */
const HASH_EVENT = "beyond-hash";
const LEGACY: Record<string, BeyondTabId> = { music: "media", club: "likes" };
const tabFromHash = (hash: string): BeyondTabId | null => {
  if (!hash.startsWith("#beyond-")) return null;
  const id = hash.slice("#beyond-".length);
  if ((BEYOND_TAB_IDS as readonly string[]).includes(id)) return id as BeyondTabId;
  return LEGACY[id] ?? null;
};
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}
const readHash = () => window.location.hash;

export default function Beyond() {
  const t = useT();
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const hashTab = tabFromHash(hash);
  // Other in-page links (#contact...) replace the hash: keep the last menu tab (and its player).
  const [lastTab, setLastTab] = useState<BeyondTabId>("games");
  if (hashTab && hashTab !== lastTab) setLastTab(hashTab);
  const tab: BeyondTabId = hashTab ?? lastTab;

  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  // A #beyond-* deep link mounts the menu right away; once mounted it stays mounted
  // (a later #contact link must not unmount it or stop its player).
  if (hashTab && !near) setNear(true);
  const [paused, setPaused] = useState(true);

  // Deep links (#beyond-*) scroll the section into view, on load and on hashchange.
  useEffect(() => {
    const reveal = () => {
      if (!tabFromHash(window.location.hash)) return;
      window.requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          block: "start",
        })
      );
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);

  // Lazy-mount near the viewport; pause textures, particles and the gamepad while off-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    const viewObserver = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    nearObserver.observe(el);
    viewObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  const onTab = useCallback((next: BeyondTabId) => {
    window.history.replaceState(null, "", `#beyond-${next}`);
    window.dispatchEvent(new Event(HASH_EVENT));
  }, []);

  return (
    <section id="beyond" ref={sectionRef} className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl" data-reveal>
          <h2 className="font-display text-[length:var(--text-h2)] font-bold leading-[var(--leading-tight)] tracking-tight text-ink">
            {t.beyond.title}
          </h2>
          <p className="mt-4 text-base text-ink-muted">{t.beyond.subtitle}</p>
        </div>

        {near ? <PsMenu tab={tab} onTab={onTab} paused={paused} /> : <MenuLoader />}

        <p className="mt-3 max-w-3xl text-xs text-ink-muted">
          {BEYOND_PHOTOS ? t.beyond.photoNote : t.beyond.moodNote}{" "}
          <a
            href="/CREDITS.md"
            target="_blank"
            rel="noopener"
            className="cursor-can-hover inline-flex min-h-6 items-center font-semibold text-primary-ink underline underline-offset-4"
          >
            {t.beyond.credits}
            <span className="sr-only"> {t.common.newTab}</span>
          </a>
        </p>
      </div>
    </section>
  );
}
