"use client";

import { club } from "@/data/personal";
import { useApp } from "@/context/AppContext";
import { useT } from "@/messages";
import { styles } from "./styles";

/**
 * Matchday ticket in the club colours (#004D98 / #A50044) used as colour only:
 * no crest, no sponsor or kit logos.
 */
export default function ClubTab() {
  const { lang } = useApp();
  const t = useT();

  return (
    <div className="mx-auto max-w-3xl py-2">
      <div className={styles.ticket}>
        <span className={styles.ticketStripes} aria-hidden="true" />
        <span className={styles.ticketShade} aria-hidden="true" />
        <div className="relative p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd23f]">{t.beyond.club.ticket}</p>
          <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl">
            {club.name}
          </h3>
          <p className="mt-3 text-base font-medium text-[#cdd7ee] sm:text-lg">{t.beyond.club.favorite}</p>
          {club.note?.[lang] && <p className="mt-3 max-w-md text-sm text-[#cdd7ee]">{club.note[lang]}</p>}
        </div>
        <div className={`${styles.stub} flex w-16 items-center justify-center sm:w-24`}>
          <span className="rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em] text-white sm:text-sm">
            {t.beyond.club.admit}
          </span>
        </div>
      </div>
    </div>
  );
}
