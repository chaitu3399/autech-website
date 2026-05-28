import { Anchor, Plane, Shield, Truck } from "lucide-react";
import { INDUSTRIES_IMG } from "@/components/shared/constants";

export default function IndustriesSection({ t, industryActive, setIndustryActive }) {
  return (
    <section id="industries" data-testid="industries-section" className="py-24 md:py-32 bg-[#F6F6F6] dash-guides">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[#C8370B]">+</span>
            <span className="label-pill text-[#151515]/60">{t.industries.label}</span>
          </div>
          <h2 className="font-display text-[9vw] md:text-[6vw] lg:text-[4.6vw] leading-[0.95] text-[#151515]">
            {t.industries.title_a} <span className="text-[#C8370B]">{t.industries.title_b}</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 flex flex-col gap-2">
            {[Plane, Truck, Anchor, Shield].map((Icon, i) => {
              const isActive = industryActive === i;
              return (
                <button
                  key={i}
                  data-testid={`industry-${i}`}
                  onMouseEnter={() => setIndustryActive(i)}
                  onClick={() => setIndustryActive(i)}
                  className={`text-left px-5 py-5 rounded-sm border ${isActive ? "bg-[#151515] border-[#151515] text-white" : "bg-white border-[#151515]/8 text-[#151515]"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-[#C8370B]" : "bg-[#F6F6F6]"}`}>
                      <Icon size={16} color={isActive ? "#fff" : "#151515"} />
                    </span>
                    <span className="font-display text-lg">{t.industries.items[i].t}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-8 relative noise-bg rounded-sm overflow-hidden min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={INDUSTRIES_IMG} alt={t.industries.items[industryActive].t} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10 text-white">
              <div className="label-pill text-white/60 mb-3">0{industryActive + 1} / 0{t.industries.items.length}</div>
              <div className="font-display text-3xl md:text-4xl">{t.industries.items[industryActive].t}</div>
              <div className="text-white/75 mt-3 max-w-xl text-sm md:text-base leading-relaxed">{t.industries.items[industryActive].d}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
