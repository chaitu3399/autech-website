"use client";

import { Check } from "lucide-react";
import { useLang } from "@/components/language-provider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function CareersRequirements() {
  const { t } = useLang();

  return (
    <Section variant="white" testId="careers-requirements">
      <Container>
        <SectionHeader titleA={t.careers.reqs_title} />
        <div className="grid md:grid-cols-2 grid-section">
          {t.careers.reqs.map((g, i) => (
            <Reveal key={i} delay={i * 80} className="surface-card bg-page">
              <div className="text-display-card text-primary mb-4">{g.t}</div>
              <ul className="space-y-2">
                {g.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3 text-body-sm text-muted">
                    <Check size={14} className="text-accent mt-1 shrink-0" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
