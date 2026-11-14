"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Disc3, Gamepad2, Ticket } from "lucide-react";
import { useT } from "@/messages";
import Rich from "./Rich";
import TechBadge from "./TechBadge";
import SectionEyebrow from "./SectionEyebrow";

const TECH_STACK_PILLS = [
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Python",
  "FastAPI",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "AWS",
];

const CARD =
  "rounded-card border border-line bg-surface-1/80 shadow-elev-1 backdrop-blur-xl";

const INTERESTS = [
  { key: "music", hash: "#beyond-music", icon: Disc3 },
  { key: "games", hash: "#beyond-games", icon: Gamepad2 },
  { key: "club", hash: "#beyond-club", icon: Ticket },
] as const;

export default function About() {
  const t = useT();
  const [imageError, setImageError] = useState(false);

  const facts = [
    { id: "location", label: t.about.facts.location, value: t.about.facts.locationValue },
    { id: "education", label: t.about.facts.education, value: t.about.facts.educationValue },
    { id: "brand", label: t.about.facts.brand, value: t.about.facts.brandValue },
    { id: "focus", label: t.about.facts.focus, value: t.about.facts.focusValue },
  ];

  return (
    <section id="about" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center" data-reveal>
            <SectionEyebrow id="about" />
          <h2 className="font-display text-[length:var(--text-h2)] font-bold leading-[var(--leading-tight)] tracking-tight text-ink">
            {t.about.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-muted">{t.about.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <div className={`overflow-hidden p-4 ${CARD}`}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] bg-surface-2">
                {!imageError ? (
                  <Image
                    src="/images/avatar.jpeg"
                    alt={t.about.portraitAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    onError={() => setImageError(true)}
                    className="object-cover object-center transition-transform duration-700 ease-out-expo hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-ink-subtle">
                    Gabriel Paz
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between px-1 text-xs text-ink-muted">
                <span className="font-medium text-ink">Gabriel Esteban Paz Guerrero</span>
                <span className="font-mono">@itsGabo22</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7" data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties}>
            <div className={`p-6 sm:p-8 ${CARD}`}>
              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                <Rich text={t.about.bio} />
              </p>

              <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.id} className="space-y-1">
                    <dt className="text-xs font-medium text-ink-subtle">{fact.label}</dt>
                    <dd className="font-display text-sm font-semibold text-ink">{fact.value}</dd>
                  </div>
                ))}
                <div className="space-y-2 sm:col-span-2">
                  <dt className="text-xs font-medium text-ink-subtle">{t.about.facts.interests}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {INTERESTS.map(({ key, hash, icon: Icon }) => (
                        <li key={key}>
                          <a
                            href={hash}
                            aria-label={`${t.about.interests.goTo} ${t.about.interests[key]}`}
                            className="cursor-can-hover group inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-ink transition-[border-color,background-color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-primary-line hover:bg-primary-soft"
                          >
                            <Icon
                              className="h-4 w-4 text-primary-ink transition-transform duration-300 group-hover:rotate-12"
                              aria-hidden="true"
                            />
                            <span>{t.about.interests[key]}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-ink-muted">{t.about.coreStack}</h3>
              <ul className="flex flex-wrap gap-2">
                {TECH_STACK_PILLS.map((tech) => (
                  <li key={tech}>
                    <TechBadge name={tech} size="sm" interactive />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
