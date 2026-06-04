"use client";

import { useLang } from "@/components/language-provider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  const { t } = useLang();

  return (
    <Section variant="tight" testId="cta-banner">
      <Container>
        <Reveal className="relative overflow-hidden rounded-sm border border-default bg-dark noise-bg cta-banner p-[var(--card-pad)] md:p-[var(--form-pad-md)] flex flex-col md:flex-row md:items-center justify-between grid-section">
          <Heading as="h3" variant="cta" dark titleA={t.cta_banner.title_a} titleB={t.cta_banner.title_b} className="min-w-0" />
          <Button variant="accent" href="#contact" showArrow className="shrink-0 w-full md:w-auto justify-center" testId="cta-banner-btn">
            {t.cta_banner.btn}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
