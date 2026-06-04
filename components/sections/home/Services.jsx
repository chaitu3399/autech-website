"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/language-provider";
import { SERVICES_IMAGES } from "@/lib/constants";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";

function parseOpenIndex(value) {
  if (value === null || value === undefined || value === "") return -1;
  const n = Number.parseInt(String(value), 10);
  return Number.isNaN(n) ? -1 : n;
}

export default function Services({ initialService = null }) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  const serviceOpen = useMemo(() => parseOpenIndex(initialService), [initialService]);

  const setServiceOpen = useCallback(
    (index) => {
      const params = new URLSearchParams(window.location.search);
      if (index < 0) params.delete("service");
      else params.set("service", String(index));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    if (serviceOpen >= 0) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile || window.location.hash === "#services") setServiceOpen(0);
  }, [serviceOpen, setServiceOpen]);

  return (
    <Section id="services" variant="white" testId="services-section">
      <Container>
        <SectionHeader label={t.services.label} titleA={t.services.title_a} titleB={t.services.title_b} />
        <Reveal delay={120}>
          <Accordion
            items={t.services.items}
            images={SERVICES_IMAGES}
            openIndex={serviceOpen}
            onToggle={setServiceOpen}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
