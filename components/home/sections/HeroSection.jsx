import { ArrowUpRight } from "lucide-react";
import { HERO_IMG } from "@/components/shared/constants";
import { scrollToSection } from "@/components/shared/scrollToSection";

export default function HeroSection({ t }) {
  return (
    <section id="home" data-testid="hero-section" className="relative pt-28 md:pt-32 pb-0">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <span className="label-pill text-[#151515]/60 flex items-center gap-2">
            <span className="text-[#C8370B]">+</span> {t.hero.tag}
          </span>
          <span className="hidden md:inline label-pill text-[#151515]/60">EST. 2020 · PR / FL / TX</span>
        </div>
        <h1 className="font-display text-[14vw] md:text-[10vw] lg:text-[8.4vw] leading-[0.92] text-[#151515]">
          {t.hero.title_a}
          <br />
          <em className="not-italic text-[#C8370B]">{t.hero.title_b}</em>
        </h1>
        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-7">
            <p className="text-base md:text-lg text-[#151515]/70 max-w-2xl leading-relaxed">{t.hero.sub}</p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                data-testid="hero-cta-primary"
                onClick={() => scrollToSection("#contact")}
                className="btn-primary"
              >
                <span>{t.hero.cta_a}</span>
                <span className="arrow-pill">
                  <ArrowUpRight size={16} color="#fff" />
                </span>
              </button>
              <button data-testid="hero-cta-secondary" onClick={() => scrollToSection("#about")} className="btn-ghost">
                <span>{t.hero.cta_b}</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-2 border-t border-[#151515]/10 pt-6">
              {t.hero.stats.map((s, i) => (
                <div key={i} className="px-2">
                  <div className="font-display text-3xl md:text-4xl text-[#151515]">{s.k}</div>
                  <div className="label-pill text-[#151515]/50 mt-2">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 relative noise-bg rounded-sm overflow-hidden">
          <div className="aspect-[16/8] md:aspect-[16/7] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="Autech" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/70 via-[#151515]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="text-white">
                <div className="label-pill text-white/70">{t.hero.tag}</div>
                <div className="font-display text-2xl md:text-3xl mt-1">
                  AUTECH <span className="text-[#F66234]">/</span> ON SITE
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-white/70 label-pill">
                <span className="h-2 w-2 rounded-full bg-[#F66234] animate-pulse" /> Live Dispatch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
