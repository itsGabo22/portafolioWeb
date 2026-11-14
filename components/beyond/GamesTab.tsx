"use client";

import { ArrowDown } from "lucide-react";
import { games, type MoodId } from "@/data/personal";
import { useApp } from "@/context/AppContext";
import { fmt, useT } from "@/messages";
import { FACE_CLASS, MOODS, moodStyle } from "./moods";
import { styles } from "./styles";

const link = `${styles.focusRing} cursor-can-hover inline-flex min-h-11 items-center gap-1.5 rounded-control text-sm font-semibold underline-offset-4 hover:underline`;

/** "Inventory" of favourite games: each slot carries its own original mood. */
export default function GamesTab({
  selected,
  onMood,
}: {
  selected: MoodId;
  onMood: (mood: MoodId) => void;
}) {
  const { lang } = useApp();
  const t = useT();

  return (
    <div>
      <h3 className="text-sm font-semibold">{t.beyond.games.title}</h3>
      <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {games.map((game, index) => {
          const mood = MOODS[game.id];
          const pressed = selected === game.id;
          return (
            <li key={game.id}>
              <button
                type="button"
                aria-pressed={pressed}
                onClick={() => onMood(game.id)}
                onPointerEnter={() => onMood(game.id)}
                onFocus={() => onMood(game.id)}
                style={moodStyle(game.id)}
                className={`${styles.card} ${styles.focusRing} cursor-can-hover flex aspect-[4/5] w-full flex-col justify-end rounded-card border border-[var(--mood-line)] p-5 text-left text-[var(--mood-fg)] sm:aspect-[3/4]`}
              >
                <span className={styles.cardArt} data-mood={game.id} aria-hidden="true" />
                <span className="relative text-xs font-semibold text-[var(--mood-accent)]">
                  {fmt(t.beyond.games.slot, { n: index + 1 })}
                </span>
                <span
                  className={`relative mt-1 text-2xl font-bold leading-tight ${FACE_CLASS[mood.face]} ${
                    mood.caps ? "uppercase tracking-[0.08em]" : ""
                  } ${game.id === "bloodborne" ? "italic" : ""}`}
                >
                  {game.title}
                </span>
                {game.note?.[lang] && (
                  <span className="relative mt-2 text-sm text-[var(--mood-muted)]">{game.note[lang]}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className={styles.muted}>{t.beyond.games.crossLink}</span>
        <a href="#project-gamerbox-ai" className={`${link} ${styles.accent}`}>
          <ArrowDown className="h-4 w-4 rotate-180" aria-hidden="true" />
          <span>{t.beyond.games.gamerbox}</span>
        </a>
        <a href="#project-nexo-protocolo-sombra" className={`${link} ${styles.accent}`}>
          <ArrowDown className="h-4 w-4 rotate-180" aria-hidden="true" />
          <span>{t.beyond.games.nexo}</span>
        </a>
      </p>
    </div>
  );
}
