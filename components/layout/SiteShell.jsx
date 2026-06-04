"use client";

import { useLang } from "@/components/language-provider";
import Header from "@/components/layout/Header";
import FooterShell from "@/components/layout/FooterShell";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function SiteShell({ children }) {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-page">
      <a href="#main-content" className="skip-link focus-ring">
        {t.skip}
      </a>
      <Header />
      {children}
      <FooterShell />
      <WhatsAppButton />
    </div>
  );
}
