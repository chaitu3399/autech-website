import { Check } from "lucide-react";

export default function WhyUsSection({ t }) {
  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="py-24 md:py-32 bg-[#151515] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#F66234]">+</span>
            <span className="label-pill text-white/60">{t.why.label}</span>
          </div>
          <h2 className="font-display text-[9vw] md:text-[5.5vw] lg:text-[4.4vw] leading-[0.95] text-white">
            {t.why.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#F66234]">{t.why.title.split(" ").slice(-1)}</span>
          </h2>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="absolute -top-3 -right-3 bg-[#C8370B] text-white label-pill px-3 py-2 rounded-full">
            {t.why.badge}
          </div>
          <ul className="space-y-3 bg-[#191919] border border-white/8 p-7 md:p-9 rounded-sm">
            {t.why.items.map((it, i) => (
              <li
                key={i}
                data-testid={`why-item-${i}`}
                className="flex items-start gap-4 py-3 border-b last:border-b-0 border-white/8"
              >
                <span className="font-mono text-xs text-[#F66234] pt-1">0{i + 1}</span>
                <span className="text-white/85 text-sm md:text-base leading-relaxed flex-1">{it}</span>
                <Check size={18} color="#F66234" className="mt-1 shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
