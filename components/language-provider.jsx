"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";
import { DEFAULT_LANG, LANG_STORAGE, langCookieValue, parseLang } from "@/lib/lang";

const LanguageContext = createContext(null);

function readStoredLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  return parseLang(window.localStorage.getItem(LANG_STORAGE));
}

function persistLang(value) {
  window.localStorage.setItem(LANG_STORAGE, value);
  document.cookie = langCookieValue(value);
}

export function LanguageProvider({ children, initialLang = DEFAULT_LANG }) {
  const [lang, setLangState] = useState(() => parseLang(initialLang));

  useEffect(() => {
    const id = window.setTimeout(() => {
      const stored = readStoredLang();
      setLangState(stored);
      persistLang(stored);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const setLang = useCallback((nextLang) => {
    const value = parseLang(nextLang);
    persistLang(value);
    setLangState(value);
    window.dispatchEvent(new Event("autech-lang-change"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const sync = () => setLangState(readStoredLang());
    window.addEventListener("storage", sync);
    window.addEventListener("autech-lang-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("autech-lang-change", sync);
    };
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
    }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}
