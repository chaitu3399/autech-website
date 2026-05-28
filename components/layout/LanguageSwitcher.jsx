"use client";

import { useLang } from "@/components/language-provider";

export default function LanguageSwitcher({ dark = false }) {
  const { lang, setLang } = useLang();
  const base = "label-pill px-2 py-1 transition-colors";
  const active = dark ? "text-white" : "text-[#151515]";
  const inactive = dark ? "text-white/40 hover:text-white/70" : "text-[#151515]/40 hover:text-[#151515]/70";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border ${dark ? "border-white/15" : "border-[#151515]/15"} px-1 py-0.5`}
    >
      <button type="button" onClick={() => setLang("es")} className={`${base} ${lang === "es" ? active : inactive}`}>
        ES
      </button>
      <span className={`${dark ? "text-white/20" : "text-[#151515]/20"} label-pill`}>/</span>
      <button type="button" onClick={() => setLang("en")} className={`${base} ${lang === "en" ? active : inactive}`}>
        EN
      </button>
    </div>
  );
}
