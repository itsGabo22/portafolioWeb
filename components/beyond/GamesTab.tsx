"use client";

import { useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Gamepad2 } from "lucide-react";
import { games, type MoodId } from "@/data/personal";
import { useApp } from "@/context/AppContext";
import { fmt, useT } from "@/messages";
import { FACE_CLASS, MOODS, moodStyle } from "./moods";
import { photoFor } from "./photos";
import { styles } from "./styles";

/**
 * Console-style "home screen" of favourite games: a row of square covers
 * (the selected one grows, like a console launcher), the game's art fills the
 * panel behind (MoodPhoto) and its title and actions sit below.
 * Keyboard: Left/Right/Home/End move the selection and focus (roving tabindex).
 */
export default function GamesTab({
  selected,
  onMood,
}: {
  selected: MoodId;
  onMood: (mood: MoodId) => void;
}) {
  const { lang } = useApp();
  const t = useT();
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(0, games.findIndex((g) => g.id === selected));
  const game = games[activeIndex];
  const mood = MOODS[game.id];

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    let next = activeIndex;
    if (event.key === "ArrowRight") next = (activeIndex + 1) % games.length;
    else if (event.key === "ArrowLeft") next = (activeIndex - 1 + games.length) % games.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = games.length - 1;
    else return;
    event.preventDefault();
    onMood(games[next].id);
    tiles.current[next]?.focus();
    tiles.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <div className="min-h-[24rem] sm:min-h-[28rem]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-sm font-semibold">
          <Gamepad2 className="h-4 w-4 text-[var(--mood-accent)]" aria-hidden="true" />
          <span>{t.beyond.games.title}</span>
        </h3>
        <span className={`${styles.surface} font-mono text-xs rounded-full px-2.5 py-1`} aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(games.length).padStart(2, "0")}
        </span>
      </div>

      <ul
        aria-label={t.beyond.games.menuAria}
        onKeyDown={onKeyDown}
        className="bx-console-row mt-3"
      >
        {games.map((g, index) => {
          const current = index === activeIndex;
          const photo = photoFor(g.id);
          return (
            <li key={g.id} className="flex">
              <button
                ref={(el) => {
                  tiles.current[index] = el;
                }}
                type="button"
                aria-current={current}
                aria-label={`${g.title} · ${fmt(t.beyond.games.slot, { n: index + 1 })}`}
                tabIndex={current ? 0 : -1}
                onClick={() => onMood(g.id)}
                onPointerEnter={() => onMood(g.id)}
                onFocus={() => onMood(g.id)}
                style={moodStyle(g.id)}
                className="bx-console-tile cursor-can-hover"
              >
                {photo?.tile ? (
                  <Image src={photo.tile} alt="" fill sizes="192px" className="object-cover" />
                ) : (
                  <>
                    <span className={styles.cardArt} data-mood={g.id} aria-hidden="true" />
                    <span
                      className={`absolute inset-x-2 bottom-2 text-left text-xs font-bold leading-tight text-[var(--mood-fg)] ${FACE_CLASS[MOODS[g.id].face]}`}
                    >
                      {g.title}
                    </span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Selected game: title + actions, re-animated on every change */}
      <div key={game.id} className="bx-console-hero mt-6 max-w-2xl" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mood-accent)]">
          {fmt(t.beyond.games.slot, { n: activeIndex + 1 })}
        </p>
        <p
          className={`mt-2 text-4xl font-bold leading-[0.95] tracking-tight drop-shadow-[0_2px_16px_rgb(0_0_0/0.45)] sm:text-6xl ${FACE_CLASS[mood.face]} ${
            mood.caps ? "uppercase tracking-[0.06em]" : ""
          } ${game.id === "bloodborne" ? "italic" : ""}`}
        >
          {game.title}
        </p>
        {game.note?.[lang] && <p className={`${styles.muted} mt-3 text-sm`}>{game.note[lang]}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className={`${styles.muted} w-full text-sm sm:w-auto`}>{t.beyond.games.crossLink}</span>
          <a
            href="#project-gamerbox-ai"
            className={`${styles.focusRing} bx-console-pill cursor-can-hover`}
            style={{ background: "var(--mood-fg)", color: "var(--mood-bg)" }}
          >
            <span>{t.beyond.games.gamerbox}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#project-nexo-protocolo-sombra"
            className={`${styles.focusRing} ${styles.surface} bx-console-pill cursor-can-hover`}
          >
            <span>{t.beyond.games.nexo}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
