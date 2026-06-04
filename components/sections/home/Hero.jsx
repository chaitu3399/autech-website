"use client";

import { useLang } from "@/components/language-provider";
import { HERO_IMG } from "@/lib/constants";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  const { t } = useLang();

  return (
    <Section id="home" variant="hero" testId="hero-section">
      <Container>
        <Reveal immediate delay={0} className="hero-section__intro">
          <Label>{t.hero.tag}</Label>
          <span className="label-pill text-faint sm:text-right">{t.hero.established}</span>
        </Reveal>

        <Reveal immediate delay={80}>
          <Heading as="h1" variant="hero" titleA={t.hero.title_a} titleB={t.hero.title_b} className="mb-[var(--stack-lg)]" />
        </Reveal>

        <Reveal immediate delay={160} className="hero-section__grid grid grid-section lg:grid-cols-12">
          <div className="lg:col-span-7 min-w-0">
            <p className="text-body-md text-muted prose-width">{t.hero.sub}</p>
            <div className="hero-section__actions">
              <Button variant="primary" href="#contact" showArrow testId="hero-cta-primary">
                {t.hero.cta_a}
              </Button>
              <Button variant="ghost" href="#about" testId="hero-cta-secondary">
                {t.hero.cta_b}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="hero-section__stats">
              {t.hero.stats.map((s, i) => (
                <div key={i} className="min-w-0">
                  <div className="text-display-stat text-primary tabular-nums">{s.k}</div>
                  <div className="label-pill text-faint mt-2">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal immediate delay={280}>
          <Media src={HERO_IMG} alt="" variant="hero" priority className="hero-section__media" data-header-dark-zone>
          <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--autech-black)_75%,transparent)] via-[color-mix(in_srgb,var(--autech-black)_25%,transparent)] to-transparent" />
          <div className="hero-section__media-caption">
            <div className="text-inverse min-w-0">
              <div className="label-pill text-white/70">{t.hero.image_caption}</div>
              <div className="text-display-panel text-inverse mt-1" translate="no">
                AUTECH <span className="text-accent-dark">/</span> ON SITE
              </div>
            </div>
            <div className="flex items-center gap-2 label-pill text-white/70 shrink-0">
              <span className="h-2 w-2 rounded-full bg-accent-dark animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              {t.hero.image_sub}
            </div>
          </div>
          </Media>
        </Reveal>
      </Container>
    </Section>
  );
}
