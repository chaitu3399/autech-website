"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/components/language-provider";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";

export default function CareersHero() {
  const { t } = useLang();

  return (
    <section data-testid="careers-hero">
      <Container>
        <Reveal immediate delay={0}>
          <Link
            href="/"
            data-testid="back-to-home"
            className="inline-flex items-center gap-2 label-pill text-faint hover:text-accent mb-[var(--stack-lg)] focus-ring rounded-sm"
          >
            <ArrowLeft size={14} aria-hidden="true" /> {t.careers.back}
          </Link>
        </Reveal>
        <Reveal immediate delay={80}>
          <Heading as="h1" variant="page" titleA={t.careers.title_a} titleB={t.careers.title_b} />
        </Reveal>
        <Reveal immediate delay={160}>
          <p className="text-body-md text-muted prose-width mt-[var(--stack-md)]">{t.careers.sub}</p>
        </Reveal>
      </Container>
    </section>
  );
}
