"use client";

import { Check } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { SHOWCASE_IMG } from "@/lib/constants";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

export default function WhyUs() {
  const { t } = useLang();
  const titleWords = t.why.title.split(" ");
  const titleAccent = titleWords.pop();
  const titleLead = titleWords.join(" ");

  return (
    <Section id="why-us" variant="dark" testId="why-us-section">
      <Container>
        <Reveal className="stats-row grid grid-cols-1 sm:grid-cols-3 grid-section mb-[var(--section-gap-md)]">
          <StatCard tag={t.stats.jobs.tag} value={t.stats.jobs.value} label={t.stats.jobs.label} variant="dark" />
          <Media src={SHOWCASE_IMG} alt="" variant="stat" className="stat-tile stat-tile--round">
            <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--autech-black)_70%,transparent)] to-transparent" />
          </Media>
          <StatCard tag={t.stats.techs.tag} value={t.stats.techs.value} label={t.stats.techs.label} variant="accent" />
        </Reveal>

        <div className="grid lg:grid-cols-12 grid-section items-start">
          <Reveal className="lg:col-span-5 min-w-0">
            <SectionHeader animate={false} dark label={t.why.label} titleA={titleLead} titleB={titleAccent} className="!mb-0" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7 relative min-w-0">
            <div className="absolute top-0 right-0 bg-accent text-inverse label-pill px-3 py-2 rounded-full z-10">
              {t.why.badge}
            </div>
            <ul className="bg-elevated border border-inverse p-[var(--card-pad)] md:p-[var(--form-pad-md)] rounded-sm">
              {t.why.items.map((it, i) => (
                <li
                  key={i}
                  data-testid={`why-item-${i}`}
                  className="flex items-start gap-3 py-4 border-b last:border-b-0 border-inverse"
                >
                  <span className="index-num index-num--dark pt-0.5 shrink-0">0{i + 1}</span>
                  <span className="text-body text-inverse-85 flex-1 min-w-0">{it}</span>
                  <Check size={18} className="text-accent-dark mt-0.5 shrink-0" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
