/**
 * Smooth in-page jump that still lands exactly under the sticky navbar.
 *
 * Native smooth anchor scrolling computes the destination once; lazily mounted
 * content (Device Lab, Beyond, project images) and pinned scenes change the
 * page height mid-flight, so long jumps used to stop short. After the scroll
 * settles we re-check the target and snap the last few pixels if needed.
 */
export function scrollToSection(target: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const margin = () => parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const offBy = () => Math.abs(target.getBoundingClientRect().top - margin());

  target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  if (reduced) return;

  let tries = 0;
  const correct = () => {
    if (offBy() <= 6 || tries >= 3) return;
    tries += 1;
    target.scrollIntoView({ behavior: "instant", block: "start" });
    // content can still be settling right after the snap
    window.setTimeout(correct, 350);
  };
  const fallback = window.setTimeout(correct, 1600);
  window.addEventListener(
    "scrollend",
    () => {
      window.clearTimeout(fallback);
      window.setTimeout(correct, 120);
    },
    { once: true }
  );
}
