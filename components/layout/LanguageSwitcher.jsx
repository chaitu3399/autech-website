"use client";

import { useLang } from "@/components/language-provider";

export default function LanguageSwitcher({ dark = false }) {
  const { lang, setLang, t } = useLang();
  const base =
    "label-pill min-h-11 min-w-11 inline-flex items-center justify-center px-3 py-2 transition-colors focus-ring rounded-sm touch-manipulation";
  const active = dark ? "text-inverse" : "text-primary";
  const inactive = dark ? "text-faint-inverse hover:text-inverse-70" : "text-faint hover:text-accent";

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center gap-1 rounded-full border px-1 py-0.5 ${dark ? "border-inverse" : "border-default"}`}
    >
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`${base} ${lang === "es" ? active : inactive}`}
      >
        {t.lang.es}
      </button>
      <span className={`label-pill ${dark ? "text-white/20" : "text-faint"}`} aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${base} ${lang === "en" ? active : inactive}`}
      >
        {t.lang.en}
      </button>
    </div>
  );
}
