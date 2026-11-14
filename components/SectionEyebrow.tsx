const SECTION_ORDER = [
  "hero",
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
  "beyond",
] as const;

type SectionId = (typeof SECTION_ORDER)[number];

/**
 * Chapter marker above each section title, in the primary colour:
 * "02 — / 08". Decorative (the h2 below carries the name), so it is
 * hidden from assistive tech and needs no translated copy.
 */
export default function SectionEyebrow({
  id,
  align = "center",
}: {
  id: SectionId;
  align?: "center" | "start";
}) {
  const index = SECTION_ORDER.indexOf(id);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <p
      aria-hidden="true"
      className={`mb-4 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.18em] text-primary-ink ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <span>{pad(index)}</span>
      <span className="h-px w-10 bg-current opacity-60" />
      <span className="opacity-70">{pad(SECTION_ORDER.length - 1)}</span>
    </p>
  );
}
