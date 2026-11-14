"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Disc3, Gamepad2, Ticket } from "lucide-react";
import type { MoodId } from "@/data/personal";
import { useT } from "@/messages";
import ClubTab from "./ClubTab";
import GamesTab from "./GamesTab";
import MoodPhoto from "./MoodPhoto";
import MoodTexture from "./MoodTexture";
import { BEYOND_PHOTOS } from "./photos";
import MusicTab from "./MusicTab";
import { moodStyle } from "./moods";
import { styles } from "./styles";
import "./beyond.css";

import { BEYOND_TABS, type BeyondTab } from "./tabs";

const ICONS = { music: Disc3, games: Gamepad2, club: Ticket } as const;

/**
 * Console-style panel with an ARIA tablist (arrow keys, Home/End, automatic
 * activation). Hover/focus/selection of an item morphs the whole panel's
 * --mood-* variables; they are registered with @property so they interpolate.
 */
export default function BeyondPanel({
  tab,
  onTab,
  paused,
}: {
  tab: BeyondTab;
  onTab: (tab: BeyondTab) => void;
  paused: boolean;
}) {
  const t = useT();
  const [moods, setMoods] = useState<Record<BeyondTab, MoodId>>({
    music: "base",
    games: "rdr2",
    club: "barca",
  });
  const mood = moods[tab];
  const setMood = (next: MoodId) => setMoods((prev) => (prev[tab] === next ? prev : { ...prev, [tab]: next }));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = BEYOND_TABS.indexOf(tab);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % BEYOND_TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + BEYOND_TABS.length) % BEYOND_TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = BEYOND_TABS.length - 1;
    else return;
    event.preventDefault();
    onTab(BEYOND_TABS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className={`${styles.panel} ${paused ? styles.paused : ""} relative overflow-hidden rounded-stage shadow-elev-3`}
      style={moodStyle(mood)}
      data-mood={mood}
    >
      <MoodPhoto mood={mood} />
      <MoodTexture mood={mood} />

      <div className="relative p-4 sm:p-8">
        <div
          role="tablist"
          aria-label={t.beyond.tabsAria}
          onKeyDown={onKeyDown}
          className={`${styles.surface} mb-6 grid grid-cols-3 gap-1 rounded-control p-1 sm:inline-grid`}
        >
          {BEYOND_TABS.map((id, index) => {
            const Icon = ICONS[id];
            const selected = id === tab;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`beyond-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`beyond-panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => onTab(id)}
                className={`${styles.focusRing} cursor-can-hover inline-flex min-h-11 items-center justify-center gap-2 rounded-[calc(var(--radius-control)-0.25rem)] px-3 py-2 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:text-sm`}
                style={
                  selected
                    ? { background: "var(--mood-accent)", color: "var(--mood-bg)" }
                    : { color: "var(--mood-muted)" }
                }
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.beyond.tabs[id]}</span>
              </button>
            );
          })}
        </div>

        {BEYOND_TABS.map((id) => (
          <div
            key={id}
            id={`beyond-panel-${id}`}
            role="tabpanel"
            aria-labelledby={`beyond-tab-${id}`}
            tabIndex={0}
            hidden={id !== tab}
            className={`${styles.focusRing} rounded-card`}
          >
            {id === "music" && <MusicTab onMood={setMood} />}
            {id === "games" && <GamesTab selected={moods.games} onMood={setMood} />}
            {id === "club" && <ClubTab />}
          </div>
        ))}

        <p className={`${styles.muted} mt-8 text-xs`}>
          {BEYOND_PHOTOS ? t.beyond.photoNote : t.beyond.moodNote}
        </p>
      </div>
    </div>
  );
}
