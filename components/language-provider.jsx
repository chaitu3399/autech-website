"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "autech_lang";
const DEFAULT_LANG = "es";

function parseLang(value) {
  return value === "es" || value === "en" ? value : DEFAULT_LANG;
}

function getClientLang() {
  return parseLang(window.localStorage.getItem(STORAGE_KEY));
}

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};

  const onChange = () => callback();
  window.addEventListener("storage", onChange);
  window.addEventListener("autech-lang-change", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("autech-lang-change", onChange);
  };
}

export function LanguageProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getClientLang, () => DEFAULT_LANG);

  const setLang = (nextLang) => {
    const value = parseLang(nextLang);
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("autech-lang-change"));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}
