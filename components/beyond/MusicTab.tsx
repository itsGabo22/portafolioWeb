"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Music2, Play } from "lucide-react";
import { artists, playlist, type Artist, type MoodId } from "@/data/personal";
import { useApp } from "@/context/AppContext";
import { fmt, useT } from "@/messages";
import { styles } from "./styles";

const link = `${styles.focusRing} cursor-can-hover inline-flex min-h-11 items-center gap-1.5 rounded-control text-sm font-semibold underline-offset-4 hover:underline`;

/** Original, logo-free sleeve compositions — each one a different layout. */
function SleeveArt({ artist }: { artist: Artist }) {
  if (artist.id === "joji") {
    return (
      <div className="relative aspect-square w-full">
        <div
          className={`${styles.disc} absolute inset-[8%] rounded-full`}
          style={{
            background:
              "radial-gradient(circle, #ff5ad9 0 14%, #0a0a0a 14.5% 16%, transparent 16.5%), repeating-radial-gradient(circle, #121212 0 2px, #1d1d1d 2px 4px)",
          }}
        />
        <div
          className={`${styles.art} absolute inset-0 rounded-[calc(var(--radius-card)-0.4rem)]`}
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgb(255 90 217 / 0.55), transparent 55%), linear-gradient(160deg, #2a1f63, #14112b 70%)",
          }}
        />
        <span className="absolute bottom-2 left-2.5 font-display text-lg font-bold text-[#f3eefe] sm:bottom-3 sm:left-3 sm:text-2xl">{artist.name}</span>
      </div>
    );
  }
  if (artist.id === "radiohead") {
    return (
      <div
        className={`${styles.art} relative aspect-square w-full overflow-hidden rounded-[calc(var(--radius-card)-0.4rem)] bg-[#0d0d0d]`}
      >
        <span className="absolute left-[14%] top-[14%] h-[38%] w-[38%] bg-[#ff5a2e]" />
        <span className="absolute left-[30%] top-[30%] h-[46%] w-[46%] border-2 border-[#f2f2f2]" />
        <span className="absolute inset-x-0 top-[72%] h-px bg-[#f2f2f2]/60" />
        <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2f2f2] sm:bottom-3 sm:left-3 sm:text-sm">
          {artist.name}
        </span>
      </div>
    );
  }
  return (
    <div className="relative aspect-square w-full">
      <div className={`${styles.polaroid} absolute inset-[6%] rounded-md bg-[#fffaf0] p-[7%] pb-[22%] shadow-elev-2`}>
        <div
          className="h-full w-full rounded-sm"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, #ffd46b 0 18%, transparent 19%), linear-gradient(180deg, #ffe9b0 0 55%, #2f7d6d 55% 100%)",
          }}
        />
        <span className="absolute inset-x-0 bottom-[5%] text-center font-display text-[11px] font-bold leading-tight text-[#2b2111] sm:text-base">
          {artist.name}
        </span>
      </div>
    </div>
  );
}

export default function MusicTab({ onMood }: { onMood: (mood: MoodId) => void }) {
  const { lang } = useApp();
  const t = useT();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className={`${styles.surface} rounded-card p-5 sm:p-6 lg:col-span-3`}>
        <div className="flex items-center gap-2.5">
          <span className={styles.eq} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
          <h3 className={`${styles.accent} text-sm font-semibold`}>{t.beyond.music.nowPlaying}</h3>
        </div>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className={`${styles.vinyl} relative h-28 w-28 shrink-0 sm:h-36 sm:w-36`} aria-hidden="true" />
          <div className="min-w-0">
            <p className={`${styles.muted} text-xs font-medium`}>{t.beyond.music.playlist}</p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">{playlist.name}</p>
            <p className={`${styles.muted} mt-1 text-sm`}>
              {fmt(t.beyond.music.tracks, { count: playlist.trackCount })}
            </p>
          </div>
        </div>

        <div className="mt-6">
          {loaded ? (
            <iframe
              title={fmt(t.beyond.music.playerTitle, { name: playlist.name })}
              src={playlist.embedUrl}
              loading="lazy"
              allow="encrypted-media"
              height={352}
              className="w-full rounded-[12px] border-0"
            />
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLoaded(true)}
                  className={`${styles.focusRing} cursor-can-hover inline-flex min-h-11 items-center gap-2 rounded-control px-5 py-2.5 text-sm font-bold transition-transform duration-150 active:scale-[0.97]`}
                  style={{ background: "var(--mood-accent)", color: "var(--mood-bg)" }}
                >
                  <Play className="h-4 w-4" aria-hidden="true" />
                  <span>{t.beyond.music.play}</span>
                </button>
                <a href={playlist.url} target="_blank" rel="noopener noreferrer" className={`${link} px-1`}>
                  <Music2 className="h-4 w-4" aria-hidden="true" />
                  <span>{t.beyond.music.follow}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only"> {t.common.newTab}</span>
                </a>
              </div>
              <p className={`${styles.muted} text-xs`}>{t.beyond.music.playHint}</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-sm font-semibold">{t.beyond.music.artists}</h3>
        <ul className="mt-3 grid grid-cols-3 gap-3 lg:grid-cols-1 xl:grid-cols-3">
          {artists.map((artist) => (
            <li key={artist.id}>
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${fmt(t.beyond.music.artistAria, { name: artist.name })} ${t.common.newTab}`}
                data-mood={artist.id}
                onPointerEnter={() => onMood(artist.id)}
                onFocus={() => onMood(artist.id)}
                className={`${styles.sleeve} ${styles.focusRing} cursor-can-hover block rounded-card`}
              >
                <SleeveArt artist={artist} />
              </a>
              {artist.note?.[lang] && <p className={`${styles.muted} mt-2 text-xs`}>{artist.note[lang]}</p>}
            </li>
          ))}
        </ul>
        <a href="#project-musicscript-ai" className={`${link} ${styles.accent} mt-4`}>
          <ArrowDown className="h-4 w-4 rotate-180" aria-hidden="true" />
          <span>{t.beyond.music.crossLink}</span>
        </a>
      </div>
    </div>
  );
}
