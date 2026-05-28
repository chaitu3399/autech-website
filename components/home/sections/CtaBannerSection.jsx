import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/components/shared/scrollToSection";

export default function CtaBannerSection({ t }) {
  return (
    <section data-testid="cta-banner" className="py-12 md:py-16 bg-[#F6F6F6]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div
          className="relative overflow-hidden rounded-sm border border-[#151515]/10 bg-[#151515] noise-bg p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(200,55,11,0.12) 0 14px, transparent 14px 28px), linear-gradient(180deg, #151515, #191919)",
          }}
        >
          <h3 className="font-display text-3xl md:text-5xl text-white leading-[0.95]">
            {t.cta_banner.title_a}
            <br />
            <span className="text-[#F66234]">{t.cta_banner.title_b}</span>
          </h3>
          <button
            data-testid="cta-banner-btn"
            onClick={() => scrollToSection("#contact")}
            className="btn-primary"
            style={{ background: "#C8370B", borderColor: "#C8370B" }}
          >
            <span>{t.cta_banner.btn}</span>
            <span className="arrow-pill" style={{ background: "#151515" }}>
              <ArrowUpRight size={16} color="#fff" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
