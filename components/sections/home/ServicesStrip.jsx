"use client";

import { useLang } from "@/components/language-provider";
import Section from "@/components/ui/Section";

export default function ServicesStrip() {
  const { t } = useLang();

  return (
    <Section variant="strip" testId="services-strip" ariaLabel="Services offered" className="header-dark-zone">
      <div className="marquee-track">
        {[...t.strip, ...t.strip].map((s, i) => (
          <div key={i} className="flex items-center gap-8 px-6 shrink-0">
            <span className="text-display-card text-inverse-95 whitespace-nowrap">{s}</span>
            <span className="text-accent-dark text-xl" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
