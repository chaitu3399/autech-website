import { Check, Minus, Plus } from "lucide-react";
import { SERVICES_IMAGES } from "@/components/shared/constants";

export default function ServicesSection({ t, serviceOpen, setServiceOpen }) {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-32 bg-white dash-guides">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C8370B]">+</span>
              <span className="label-pill text-[#151515]/60">{t.services.label}</span>
            </div>
            <h2 className="font-display text-[9vw] md:text-[6vw] lg:text-[4.6vw] leading-[0.95] text-[#151515]">
              {t.services.title_a} <span className="text-[#C8370B]">{t.services.title_b.split(" ").slice(0, 1)}</span> {t.services.title_b.split(" ").slice(1).join(" ")}
            </h2>
          </div>
        </div>
        <div className="border-t border-[#151515]/10">
          {t.services.items.map((item, i) => {
            const isOpen = serviceOpen === i;
            return (
              <div key={i} data-testid={`service-row-${i}`} className="border-b border-[#151515]/10">
                <button type="button" onClick={() => setServiceOpen(isOpen ? -1 : i)} className="w-full text-left grid grid-cols-12 gap-4 items-center py-6 group">
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-sm text-[#151515]/40">0{i + 1}</span>
                  </div>
                  <div className="col-span-7 md:col-span-5">
                    <span className="font-display text-xl md:text-2xl text-[#151515] group-hover:text-[#C8370B]">{item.t}</span>
                  </div>
                  <div className="hidden md:block md:col-span-5 text-sm text-[#151515]/60 max-w-md">{item.d}</div>
                  <div className="col-span-3 md:col-span-1 flex justify-end">
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center ${isOpen ? "bg-[#C8370B]" : "bg-[#151515]"}`}>
                      {isOpen ? <Minus size={16} color="#fff" /> : <Plus size={16} color="#fff" />}
                    </span>
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-8 grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-start-2 lg:col-span-5 rounded-sm overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={SERVICES_IMAGES[i]} alt={item.t} className="w-full h-56 md:h-64 object-cover" />
                    </div>
                    <div className="lg:col-span-5">
                      <ul className="space-y-2">
                        {item.feats.map((f, j) => (
                          <li key={j} className="flex items-start gap-3 text-[#151515]">
                            <span className="mt-1 w-5 h-5 rounded-full bg-[#C8370B]/12 flex items-center justify-center shrink-0">
                              <Check size={12} color="#C8370B" />
                            </span>
                            <span className="text-sm md:text-base">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
