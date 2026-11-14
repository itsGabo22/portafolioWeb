"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Ellipsis, Gamepad2, Play, Square, Star } from "lucide-react";
import {
  BEYOND_TAB_IDS,
  INITIAL_ITEM,
  beyondMenu,
  playlist,
  type BeyondTabId,
  type MenuItem,
} from "@/data/personal";
import { useApp } from "@/context/AppContext";
import { selectInDeviceLab } from "@/lib/deviceLabSelect";
import { useReducedMotion } from "@/lib/capabilities";
import { fmt, useT } from "@/messages";
import { FACE_CLASS, MOODS, moodStyle } from "./moods";
import { BEYOND_PHOTOS } from "./photos";
import StageBackground from "./StageBackground";
import Tile from "./Tile";
import TopBar from "./TopBar";
import TrophyPanel from "./TrophyPanel";
import type { PadCommand } from "./gamepad";
import "./beyond.css";

/**
 * PS5-style home menu for "Fuera del código" (structure, proportions and
 * motion only — no console logos, glyphs, typefaces, sounds or trophy art).
 *
 * Keyboard (only while focus is inside the menu; page scroll is never hijacked):
 *   tab bar  ←/→ switch tab · ↓ to tiles
 *   tiles    ←/→ (Home/End) move · Enter primary action · ↑/Esc back to tabs · ↓ to actions
 * Gamepad: polled only while the menu is in view AND a pad is connected.
 */
export default function PsMenu({
  tab,
  onTab,
  paused,
}: {
  tab: BeyondTabId;
  onTab: (tab: BeyondTabId) => void;
  paused: boolean;
}) {
  const { lang } = useApp();
  const t = useT();
  const reduced = useReducedMotion();

  const [selected, setSelected] = useState<Record<BeyondTabId, string>>(INITIAL_ITEM);
  const [embedFor, setEmbedFor] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [pad, setPad] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<(() => void) | null>(null);

  const items = beyondMenu[tab];
  const index = Math.max(0, items.findIndex((item) => item.id === selected[tab]));
  const item = items[index];
  const mood = MOODS[item.mood];
  const title = item.title[lang];

  // ── sound (synthesized, loaded only once turned on) ──
  useEffect(() => {
    if (!sound) return;
    let alive = true;
    import("./sound").then((m) => {
      if (alive) tickRef.current = m.tick;
    });
    return () => {
      alive = false;
      tickRef.current = null;
    };
  }, [sound]);

  // ── selection ──
  /** Focus without a jump, then bring it into view only if it is off-screen (WCAG 2.4.11). */
  const focusEl = useCallback(
    (el: HTMLElement | null | undefined) => {
      if (!el) return;
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );

  const revealOption = useCallback(
    (i: number) => {
      const row = rowRef.current;
      const el = optionRefs.current[i];
      if (!row || !el || row.scrollWidth <= row.clientWidth) return;
      const left = el.offsetLeft - row.clientWidth / 2 + el.offsetWidth / 2;
      row.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );

  const select = useCallback(
    (tabId: BeyondTabId, i: number, focus: boolean) => {
      const list = beyondMenu[tabId];
      const next = list[(i + list.length) % list.length];
      setSelected((prev) => (prev[tabId] === next.id ? prev : { ...prev, [tabId]: next.id }));
      if (next.id !== selected[tabId]) {
        tickRef.current?.();
        setEmbedFor(null);
        setMoreOpen(false);
      }
      const pos = (i + list.length) % list.length;
      if (focus) focusEl(optionRefs.current[pos]);
      revealOption(pos);
    },
    [focusEl, revealOption, selected]
  );

  const switchTab = useCallback(
    (next: BeyondTabId, focusTab: boolean) => {
      if (next !== tab) {
        tickRef.current?.();
        setEmbedFor(null);
        setMoreOpen(false);
        onTab(next);
      }
      if (focusTab) focusEl(tabRefs.current[BEYOND_TAB_IDS.indexOf(next)]);
    },
    [focusEl, onTab, tab]
  );

  const focusTiles = () => focusEl(optionRefs.current[index]);
  const focusTabs = () => focusEl(tabRefs.current[BEYOND_TAB_IDS.indexOf(tab)]);

  const runPrimary = useCallback(
    (target: MenuItem) => {
      const action = target.primaryAction;
      if (action.kind === "play") setEmbedFor((cur) => (cur === target.id ? null : target.id));
      else if (action.kind === "project") selectInDeviceLab(action.projectId);
    },
    []
  );

  const jump = (tabId: BeyondTabId, id: string) => {
    switchTab(tabId, false);
    const i = beyondMenu[tabId].findIndex((it) => it.id === id);
    setSelected((prev) => ({ ...prev, [tabId]: id }));
    setEmbedFor(null);
    // options of the new tab render on the next frame
    window.requestAnimationFrame(() => {
      focusEl(optionRefs.current[i]);
      revealOption(i);
    });
  };

  // ── keyboard ──
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const i = BEYOND_TAB_IDS.indexOf(tab);
    const n = BEYOND_TAB_IDS.length;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (i + 1) % n;
    else if (event.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = n - 1;
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      focusTiles();
      return;
    } else return;
    event.preventDefault();
    switchTab(BEYOND_TAB_IDS[next], true);
  };

  const onRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
        select(tab, index + 1, true);
        break;
      case "ArrowLeft":
        select(tab, index - 1, true);
        break;
      case "Home":
        select(tab, 0, true);
        break;
      case "End":
        select(tab, items.length - 1, true);
        break;
      case "ArrowUp":
      case "Escape":
        setMoreOpen(false);
        focusTabs();
        break;
      case "ArrowDown":
        actionsRef.current?.querySelector<HTMLElement>("button, a")?.focus({ preventScroll: true });
        break;
      case "Enter":
      case " ":
        runPrimary(item);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const onActionsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setMoreOpen(false);
      focusTiles();
    }
  };

  const onFrameKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || event.defaultPrevented) return;
    if (moreOpen) {
      setMoreOpen(false);
      actionsRef.current?.querySelector<HTMLElement>("[data-more]")?.focus({ preventScroll: true });
    } else focusTabs();
    event.preventDefault();
  };

  // ── gamepad: zero cost until the menu is in view AND a pad is connected ──
  const focusTilesSoon = () =>
    window.requestAnimationFrame(() => focusEl(rowRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')));
  const onPad = (command: PadCommand) => {
    const frame = frameRef.current;
    if (!frame) return;
    // Never act while the visitor types elsewhere, nor when the menu is barely on screen.
    const active = document.activeElement as HTMLElement | null;
    if (active && !frame.contains(active) && active.matches("input, textarea, select, [contenteditable]")) return;
    const r = frame.getBoundingClientRect();
    const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    if (visible < Math.min(r.height, window.innerHeight) * 0.5) return;
    const inTabs = tabRefs.current.includes(document.activeElement as HTMLButtonElement);
    const i = BEYOND_TAB_IDS.indexOf(tab);
    const n = BEYOND_TAB_IDS.length;
    if (command === "prevTab" || command === "nextTab") {
      switchTab(BEYOND_TAB_IDS[(i + (command === "nextTab" ? 1 : n - 1)) % n], false);
      focusTilesSoon();
    } else if (command === "left" || command === "right") {
      const d = command === "right" ? 1 : -1;
      if (inTabs) switchTab(BEYOND_TAB_IDS[(i + d + n) % n], true);
      else select(tab, index + d, true);
    } else if (command === "up" || command === "back") focusTabs();
    else if (command === "down") focusTiles();
    else if (inTabs) focusTiles();
    else runPrimary(item);
  };
  const padRef = useRef<(command: PadCommand) => void>(() => {});
  useEffect(() => {
    padRef.current = onPad;
  });

  useEffect(() => {
    if (paused || typeof navigator.getGamepads !== "function") return;
    let stop: (() => void) | null = null;
    let alive = true;
    let wanted = false; // a pad is connected (cleared on disconnect, checked when the module resolves)
    const start = () => {
      if (stop || !alive) return;
      wanted = true;
      setPad(true);
      import("./gamepad").then((m) => {
        if (alive && wanted && !stop) stop = m.startGamepad((c) => padRef.current(c));
      });
    };
    const onConnect = () => start();
    const onDisconnect = () => {
      if (navigator.getGamepads().some((p) => p?.connected)) return;
      wanted = false;
      stop?.();
      stop = null;
      setPad(false);
    };
    if (navigator.getGamepads().some((p) => p?.connected)) start();
    window.addEventListener("gamepadconnected", onConnect);
    window.addEventListener("gamepaddisconnected", onDisconnect);
    return () => {
      alive = false;
      stop?.();
      setPad(false);
      window.removeEventListener("gamepadconnected", onConnect);
      window.removeEventListener("gamepaddisconnected", onDisconnect);
    };
  }, [paused]);

  // ── render ──
  const action = item.primaryAction;
  const embedOpen = action.kind === "play" && embedFor === item.id;
  const kicker =
    item.kicker === "playlist"
      ? fmt(t.beyond.kicker.playlist, { count: playlist.trackCount })
      : item.kicker
        ? t.beyond.kicker[item.kicker]
        : null;

  return (
    <>
    <div
      ref={frameRef}
      className={`ps-frame ${paused ? "bx-paused" : ""}`}
      style={moodStyle(item.mood)}
      data-mood={item.mood}
      data-photos={BEYOND_PHOTOS}
      data-embed={embedOpen}
      role="region"
      aria-label={t.beyond.menuAria}
      onKeyDown={onFrameKeyDown}
    >
      <StageBackground items={items} index={index} title={title} />

      <TopBar
        tab={tab}
        tabRefs={tabRefs}
        onTabClick={(id) => switchTab(id, false)}
        onTabKeyDown={onTabKeyDown}
        onJump={jump}
        sound={sound}
        onSound={setSound}
      />

      <div id="beyond-tabpanel" role="tabpanel" aria-labelledby={`beyond-tab-${tab}`} className="ps-panel">
        <div
          ref={rowRef}
          role="listbox"
          aria-orientation="horizontal"
          aria-label={fmt(t.beyond.tilesAria, { tab: t.beyond.tabs[tab] })}
          aria-describedby="ps-kbd-hint"
          onKeyDown={onRowKeyDown}
          className="ps-row"
        >
          {items.map((it, i) => {
            const isSel = i === index;
            return (
              <div
                key={it.id}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={isSel}
                aria-label={it.title[lang]}
                tabIndex={isSel ? 0 : -1}
                onClick={() => select(tab, i, true)}
                className="ps-option cursor-can-hover"
                data-selected={isSel}
              >
                <span className="ps-tile" style={moodStyle(it.mood)}>
                  <Tile item={it} title={it.title[lang]} />
                </span>
                {isSel && (
                  <span className="ps-tile-label" aria-hidden="true">
                    {it.title[lang]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="ps-copy" data-note={Boolean(item.note)}>
          <div key={`${tab}-${item.id}`} className="ps-copy-in">
            {kicker && <p className="ps-kicker">{kicker}</p>}
            <h3
              className={`ps-title ${FACE_CLASS[mood.face]} ${mood.caps ? "ps-title-caps" : ""} ${
                item.mood === "bloodborne" ? "italic" : ""
              }`}
            >
              {title}
            </h3>
            {item.note && <p className="ps-note">{item.note[lang]}</p>}
          </div>

          <div ref={actionsRef} className="ps-actions" onKeyDown={onActionsKeyDown}>
            {action.kind === "favorite" && (
              <span className="ps-pill ps-pill-static">
                <Star aria-hidden="true" />
                <span>{t.beyond.actions.favorite}</span>
              </span>
            )}
            {action.kind === "play" && (
              <button
                type="button"
                aria-pressed={embedOpen}
                onClick={() => runPrimary(item)}
                className="ps-pill ps-focus cursor-can-hover"
              >
                {embedOpen ? <Square aria-hidden="true" /> : <Play aria-hidden="true" />}
                <span>{t.beyond.actions.play}</span>
              </button>
            )}
            {action.kind === "project" && (
              <button type="button" onClick={() => runPrimary(item)} className="ps-pill ps-focus cursor-can-hover">
                <span>{t.beyond.actions.viewProject}</span>
                <ArrowUpRight aria-hidden="true" />
              </button>
            )}

            {item.secondary && (
              <div className="ps-more">
                <button
                  type="button"
                  data-more
                  aria-label={fmt(t.beyond.actions.more, { title })}
                  aria-expanded={moreOpen}
                  aria-controls={moreOpen ? "ps-more-menu" : undefined}
                  onClick={() => setMoreOpen((o) => !o)}
                  className="ps-round ps-focus cursor-can-hover"
                >
                  <Ellipsis aria-hidden="true" />
                </button>
                {moreOpen && (
                  <div id="ps-more-menu" className="ps-more-pop">
                    <a
                      href={item.secondary.href}
                      {...(item.secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onClick={() => {
                        setMoreOpen(false);
                        const secondary = item.secondary;
                        if (!secondary || secondary.external || !secondary.href.startsWith("#")) return;
                        // in-page target: move focus there too (the link itself unmounts)
                        window.requestAnimationFrame(() => {
                          const target = document.getElementById(secondary.href.slice(1));
                          if (!target) return;
                          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
                          target.focus({ preventScroll: true });
                        });
                      }}
                      className="ps-result ps-focus cursor-can-hover"
                    >
                      <span>{item.secondary.label[lang]}</span>
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {item.secondary.external && <span className="sr-only"> {t.common.newTab}</span>}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {embedOpen && action.kind === "play" ? (
          <div className="ps-info ps-embed">
            <iframe
              title={fmt(t.beyond.actions.playerTitle, { name: title })}
              src={action.embedUrl}
              loading="lazy"
              allow="encrypted-media"
              height={152}
              className="block w-full rounded-[12px] border-0"
            />
          </div>
        ) : (
          item.trophies && <TrophyPanel trophies={item.trophies} title={title} />
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {fmt(t.beyond.announce, { title, n: index + 1, total: items.length })}
      </p>
      {pad && (
        <p className="ps-pad-hint">
          <Gamepad2 aria-hidden="true" />
          <span>{t.beyond.gamepadHint}</span>
        </p>
      )}
    </div>
    <p id="ps-kbd-hint" className="ps-hint">
      {t.beyond.keyboardHint}
    </p>
    </>
  );
}
