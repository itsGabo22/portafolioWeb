"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";
export type Language = "es" | "en";

interface AppContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "gabo-portfolio-theme";
const LANG_STORAGE_KEY = "gabo-portfolio-lang";
const PREFS_EVENT = "gabo-portfolio-prefs-change";

function subscribeToPrefs(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(PREFS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PREFS_EVENT, callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

function getLangSnapshot(): Language {
  if (typeof window === "undefined") return "es";
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

function getLangServerSnapshot(): Language {
  return "es";
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToPrefs,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const lang = useSyncExternalStore(
    subscribeToPrefs,
    getLangSnapshot,
    getLangServerSnapshot
  );

  // Sincronizar el DOM externo (<html>) con el tema activo
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Sincronizar el atributo lang del DOM externo (<html>) con el idioma activo
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      window.dispatchEvent(new Event(PREFS_EVENT));
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const next: Theme = current === "light" ? "dark" : "light";
    setTheme(next);
  }, [setTheme]);

  const setLang = useCallback((newLang: Language) => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, newLang);
      window.dispatchEvent(new Event(PREFS_EVENT));
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, []);

  const toggleLang = useCallback(() => {
    const current = getLangSnapshot();
    const next: Language = current === "es" ? "en" : "es";
    setLang(next);
  }, [setLang]);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de un AppProvider");
  }
  return context;
}

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useApp();
  return { theme, setTheme, toggleTheme };
}

export function useLanguage() {
  const { lang, setLang, toggleLang } = useApp();
  return { lang, setLang, toggleLang };
}
