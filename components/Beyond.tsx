"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useT } from "@/messages";
import { BEYOND_TABS, type BeyondTab } from "./beyond/tabs";

function PanelLoader() {
  const t = useT();
  return (
    <div role="status" className="flex min-h-[520px] items-center justify-center rounded-stage border border-line bg-surface-1/60">
      <span className="text-sm text-ink-muted">{t.beyond.loading}</span>
    </div>
  );
}

const BeyondPanel = dynamic(() => import("./beyond/BeyondPanel"), { ssr: false, loading: () => <PanelLoader /> });

/* The active tab lives in the URL hash (#beyond-music | #beyond-games | #beyond-club). */
const HASH_EVENT = "beyond-hash";
const tabFromHash = (hash: string): BeyondTab | null => {
  const id = hash.replace("#beyond-", "");
  return hash.startsWith("#beyond-") && (BEYOND_TABS as readonly string[]).includes(id) ? (id as BeyondTab) : null;
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
  const tab: BeyondTab = hashTab ?? "music";

  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [paused, setPaused] = useState(true);

  // Deep links (#beyond-*) scroll the section into view, on load and on hashchange.
  useEffect(() => {
    const reveal = () => {
      if (!tabFromHash(window.location.hash)) return;
      window.requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);

  // Lazy-mount near the viewport; pause textures/particles while off-screen.
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

  const onTab = useCallback((next: BeyondTab) => {
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

        {near || hashTab ? <BeyondPanel tab={tab} onTab={onTab} paused={paused} /> : <PanelLoader />}
      </div>
    </section>
  );
}
