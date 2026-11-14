"use client";

import { useEffect } from "react";

/**
 * The site's single reveal system. Content is visible by default (no-JS and
 * reduced-motion safe); when motion is welcome we arm `[data-reveal]`
 * elements and fade them in once as they enter the viewport. Lazily mounted
 * content (Device Lab, Beyond) is picked up through a MutationObserver.
 */
export default function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const track = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        // Anything already above the fold stays visible without a flash.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("is-in");
        else io.observe(el);
      });
    };

    track(document);
    root.classList.add("reveal-armed");

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches("[data-reveal]")) track(node.parentElement ?? document);
            else track(node);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("reveal-armed");
    };
  }, []);

  return null;
}
