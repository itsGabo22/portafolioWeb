"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { Search, Settings } from "lucide-react";
import { BEYOND_TAB_IDS, beyondMenu, type BeyondTabId } from "@/data/personal";
import { useApp } from "@/context/AppContext";
import { fmt, useT } from "@/messages";
import Clock from "./Clock";

type Popover = "search" | "settings" | null;

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const ALL = BEYOND_TAB_IDS.flatMap((tab) => beyondMenu[tab].map((item) => ({ tab, item })));

/** Type-to-jump across every tab: a filtered list of buttons (keyboard accessible). */
function SearchPanel({ onJump, autoFocus }: { onJump: (tab: BeyondTabId, id: string) => void; autoFocus: boolean }) {
  const { lang } = useApp();
  const t = useT();
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  // Opened explicitly by the visitor from the search button: focus the field.
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const results = useMemo(() => {
    const q = normalize(query);
    return q ? ALL.filter(({ item }) => normalize(`${item.title.es} ${item.title.en}`).includes(q)) : ALL;
  }, [query]);

  const onInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      listRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    } else if (event.key === "Enter" && results[0]) {
      event.preventDefault();
      onJump(results[0].tab, results[0].item.id);
    }
  };
  const onListKey = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const buttons = [...(listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "ArrowDown" ? i + 1 : i - 1;
    if (next < 0) inputRef.current?.focus();
    else buttons[Math.min(next, buttons.length - 1)]?.focus();
  };

  return (
    <div className="ps-search">
      <label htmlFor={inputId} className="ps-pop-label">
        {t.beyond.search.label}
      </label>
      <input
        id={inputId}
        type="search"
        autoComplete="off"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onInputKey}
        placeholder={t.beyond.search.placeholder}
        className="ps-input ps-focus"
      />
      <p className="sr-only" aria-live="polite">
        {results.length ? fmt(t.beyond.search.results, { count: results.length }) : t.beyond.search.empty}
      </p>
      {results.length ? (
        <ul ref={listRef} className="ps-results" onKeyDown={onListKey}>
          {results.map(({ tab, item }) => (
            <li key={item.id}>
              <button type="button" className="ps-result ps-focus cursor-can-hover" onClick={() => onJump(tab, item.id)}>
                <span>{item.title[lang]}</span>
                <span className="ps-result-tab">{t.beyond.tabs[tab]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="ps-empty">{t.beyond.search.empty}</p>
      )}
    </div>
  );
}

function SettingsPanel({
  sound,
  onSound,
  onJump,
}: {
  sound: boolean;
  onSound: (on: boolean) => void;
  onJump: (tab: BeyondTabId, id: string) => void;
}) {
  const { lang, setLang } = useApp();
  const t = useT();
  return (
    <div className="ps-settings">
      <div className="ps-setting">
        <span id="ps-sound-label">{t.beyond.settings.sounds}</span>
        <button
          type="button"
          role="switch"
          aria-checked={sound}
          aria-labelledby="ps-sound-label"
          onClick={() => onSound(!sound)}
          className="ps-switch ps-focus cursor-can-hover"
        >
          <span aria-hidden="true">{sound ? t.beyond.settings.on : t.beyond.settings.off}</span>
        </button>
      </div>
      <div className="ps-setting" role="group" aria-labelledby="ps-lang-label">
        <span id="ps-lang-label">{t.beyond.settings.language}</span>
        <span className="ps-seg">
          {(["es", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
              className="ps-seg-btn ps-focus cursor-can-hover"
            >
              {code.toUpperCase()}
            </button>
          ))}
        </span>
      </div>
      {/* < 768 px the search button collapses into this popover */}
      <div className="ps-only-mobile">
        <SearchPanel onJump={onJump} autoFocus={false} />
      </div>
    </div>
  );
}

export default function TopBar({
  tab,
  tabRefs,
  onTabClick,
  onTabKeyDown,
  onJump,
  sound,
  onSound,
}: {
  tab: BeyondTabId;
  tabRefs: RefObject<(HTMLButtonElement | null)[]>;
  onTabClick: (tab: BeyondTabId) => void;
  onTabKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onJump: (tab: BeyondTabId, id: string) => void;
  sound: boolean;
  onSound: (on: boolean) => void;
}) {
  const t = useT();
  const [open, setOpen] = useState<Popover>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const searchBtn = useRef<HTMLButtonElement>(null);
  const gearBtn = useRef<HTMLButtonElement>(null);

  // Close on outside pointer-down.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const close = (focusTrigger: boolean) => {
    const trigger = open === "search" ? searchBtn.current : gearBtn.current;
    setOpen(null);
    if (focusTrigger) trigger?.focus();
  };
  const onPopKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close(true);
    }
  };
  const jump = (tabId: BeyondTabId, id: string) => {
    setOpen(null);
    onJump(tabId, id);
  };

  return (
    <div
      ref={barRef}
      className="ps-top"
      onBlur={(event) => {
        // null relatedTarget (Safari clicks, clicks on popover padding) is not "outside":
        // pointer dismissal is handled by the pointerdown listener above.
        const next = event.relatedTarget as Node | null;
        if (open && next && !barRef.current?.contains(next)) setOpen(null);
      }}
    >
      <div role="tablist" aria-label={t.beyond.tabsAria} onKeyDown={onTabKeyDown} className="ps-tabs">
        {BEYOND_TAB_IDS.map((id, index) => (
          <button
            key={id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`beyond-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={id === tab}
            aria-controls="beyond-tabpanel"
            tabIndex={id === tab ? 0 : -1}
            onClick={() => onTabClick(id)}
            className="ps-tab ps-focus cursor-can-hover"
          >
            {t.beyond.tabs[id]}
          </button>
        ))}
      </div>

      <div className="ps-tools">
        <button
          ref={searchBtn}
          type="button"
          aria-label={t.beyond.topbar.search}
          aria-expanded={open === "search"}
          aria-controls={open === "search" ? "ps-pop-search" : undefined}
          onClick={() => setOpen(open === "search" ? null : "search")}
          className="ps-icon-btn ps-focus ps-hide-mobile cursor-can-hover"
        >
          <Search aria-hidden="true" />
        </button>
        <button
          ref={gearBtn}
          type="button"
          aria-label={t.beyond.topbar.settings}
          aria-expanded={open === "settings"}
          aria-controls={open === "settings" ? "ps-pop-settings" : undefined}
          onClick={() => setOpen(open === "settings" ? null : "settings")}
          className="ps-icon-btn ps-focus cursor-can-hover"
        >
          <Settings aria-hidden="true" />
        </button>
        <span className="ps-avatar ps-hide-mobile" role="img" aria-label={t.beyond.topbar.profile}>
          <Image src="/images/avatar.jpeg" alt="" width={48} height={48} sizes="48px" className="ps-avatar-img" />
          <span className="ps-online" aria-hidden="true" />
        </span>
        <Clock label={t.beyond.topbar.clock} />
      </div>

      {open === "search" && (
        <div id="ps-pop-search" role="dialog" aria-label={t.beyond.topbar.search} className="ps-pop" onKeyDown={onPopKey}>
          <SearchPanel onJump={jump} autoFocus />
        </div>
      )}
      {open === "settings" && (
        <div id="ps-pop-settings" role="dialog" aria-label={t.beyond.topbar.settings} className="ps-pop" onKeyDown={onPopKey}>
          <SettingsPanel sound={sound} onSound={onSound} onJump={jump} />
        </div>
      )}
    </div>
  );
}
