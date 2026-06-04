"use client";

import { useCallback, useMemo } from "react";
import { Anchor, Plane, Shield, Truck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/language-provider";
import { INDUSTRIES_IMG } from "@/lib/constants";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

const ICONS = [Plane, Truck, Anchor, Shield];

function parseIndustryIndex(value, max) {
  if (value === null || value === undefined || value === "") return 0;
  const n = Number.parseInt(String(value), 10);
  if (Number.isNaN(n) || n < 0 || n >= max) return 0;
  return n;
}

export default function Industries({ initialIndustry = null }) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  const industryActive = useMemo(
    () => parseIndustryIndex(initialIndustry, t.industries.items.length),
    [initialIndustry, t.industries.items.length]
  );

  const setIndustryActive = useCallback(
    (index) => {
      const params = new URLSearchParams(window.location.search);
      params.set("industry", String(index));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  return (
    <Section id="industries" variant="page" testId="industries-section">
      <Container>
        <SectionHeader
          align="center"
          label={t.industries.label}
          titleA={t.industries.title_a}
          titleB={t.industries.title_b}
          className="max-w-4xl mx-auto"
        />

        <Reveal delay={100} className="grid lg:grid-cols-12 grid-section industries-layout items-stretch">
          <div className="lg:col-span-4 industries-tabs-wrap">
            <div className="flex flex-row lg:flex-col gap-2 lg:overflow-visible pb-2 lg:pb-0 industries-tabs snap-x snap-mandatory">
            {ICONS.map((Icon, i) => {
              const isActive = industryActive === i;
              return (
                <button
                  key={i}
                  data-testid={`industry-${i}`}
                  type="button"
                  onMouseEnter={() => setIndustryActive(i)}
                  onFocus={() => setIndustryActive(i)}
                  onClick={() => setIndustryActive(i)}
                  aria-pressed={isActive}
                  className={`snap-start shrink-0 lg:shrink w-full min-w-[12.5rem] lg:min-w-0 text-left px-4 py-4 rounded-sm border focus-ring touch-manipulation ${isActive ? "bg-dark border-dark text-inverse" : "surface-card"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? "bg-accent" : "bg-page"}`}
                    >
                      <Icon size={16} color={isActive ? "#fff" : "var(--autech-black)"} aria-hidden="true" />
                    </span>
                    <span className={`text-display-card ${isActive ? "" : "text-primary"}`}>{t.industries.items[i].t}</span>
                  </div>
                </button>
              );
            })}
            </div>
          </div>
          <Media src={INDUSTRIES_IMG} alt="" variant="panel" className="lg:col-span-8 min-h-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--autech-black)_100%,transparent)] via-[color-mix(in_srgb,var(--autech-black)_55%,transparent)] to-transparent" />
            <div
              key={industryActive}
              className="absolute bottom-0 left-0 right-0 p-[var(--card-pad)] md:p-[var(--form-pad-md)] text-inverse industry-caption-enter"
            >
              <div className="label-pill text-faint-inverse mb-2 tabular-nums">
                0{industryActive + 1} / 0{t.industries.items.length}
              </div>
              <div className="text-display-panel text-balance">{t.industries.items[industryActive].t}</div>
              <p className="text-body-sm text-muted-inverse mt-2 max-w-xl">{t.industries.items[industryActive].d}</p>
            </div>
          </Media>
        </Reveal>
      </Container>
    </Section>
  );
}
