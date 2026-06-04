"use client";

import { CAREERS_HERO_IMG } from "@/lib/constants";
import Container from "@/components/ui/Container";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

export default function CareersImage() {
  return (
    <section data-testid="careers-image" className="mt-[var(--section-gap)]">
      <Container>
        <Reveal>
          <Media src={CAREERS_HERO_IMG} alt="Autech mobile technician at work" variant="banner" />
        </Reveal>
      </Container>
    </section>
  );
}
