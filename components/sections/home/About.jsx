"use client";

import { BadgeCheck, FileText, MapPin, Wrench } from "lucide-react";
import { useLang } from "@/components/language-provider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const ICONS = [Wrench, BadgeCheck, MapPin, FileText];

export default function About() {
  const { t } = useLang();

  return (
    <Section id="about" testId="about-section">
      <Container className="grid grid-section lg:grid-cols-12">
        <Reveal className="lg:col-span-7 min-w-0">
          <SectionHeader animate={false} label={t.about.label} titleA={t.about.title_a} titleB={t.about.title_b} className="!mb-0" />
          <p className="text-body-md text-muted prose-width mt-[var(--stack-md)]">{t.about.body}</p>
        </Reveal>
        <div className="lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-section">
            {ICONS.map((Icon, i) => (
              <Reveal key={i} delay={i * 70} className="tilt-card surface-card min-w-0">
                <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center mb-4">
                  <Icon size={18} color="#fff" aria-hidden="true" />
                </div>
                <div className="text-display-card text-primary">{t.about.pillars[i].t}</div>
                <p className="text-body-sm text-muted mt-2">{t.about.pillars[i].d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
