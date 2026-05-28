import { BadgeCheck, FileText, MapPin, Wrench } from "lucide-react";

export default function AboutSection({ t }) {
  return (
    <section id="about" data-testid="about-section" className="relative py-24 md:py-32 dash-guides">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-[#C8370B]">+</span>
            <span className="label-pill text-[#151515]/60">{t.about.label}</span>
          </div>
          <h2 className="font-display text-[10vw] md:text-[6.5vw] lg:text-[5vw] leading-[0.95] text-[#151515]">
            {t.about.title_a}
            <br />
            <span className="text-[#C8370B]">{t.about.title_b}</span>
          </h2>
          <p className="text-base md:text-lg text-[#151515]/70 max-w-2xl mt-8 leading-relaxed">{t.about.body}</p>
        </div>
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {[Wrench, BadgeCheck, MapPin, FileText].map((Icon, i) => (
              <div key={i} className="tilt-card group bg-white border border-[#151515]/8 p-5 rounded-sm">
                <div className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center mb-4">
                  <Icon size={18} color="#fff" />
                </div>
                <div className="font-display text-lg text-[#151515]">{t.about.pillars[i].t}</div>
                <div className="text-sm text-[#151515]/60 mt-2 leading-relaxed">{t.about.pillars[i].d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
