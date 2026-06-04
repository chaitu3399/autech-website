"use client";

import { useLang } from "@/components/language-provider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function CareersPerks() {
  const { t } = useLang();

  return (
    <Section testId="careers-perks">
      <Container className="grid grid-section lg:grid-cols-12">
        <Reveal className="lg:col-span-5 min-w-0">
          <SectionHeader animate={false} label={t.careers.perks_title} titleA={t.careers.perks_heading} titleB={null} className="!mb-0" />
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <ul>
            {t.careers.perks.map((p, i) => (
              <li key={i} className="flex items-start gap-4 py-4 border-b border-default">
                <span className="index-num pt-0.5">0{i + 1}</span>
                <span className="text-body text-primary flex-1">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
