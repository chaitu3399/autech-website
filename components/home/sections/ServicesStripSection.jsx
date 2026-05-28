export default function ServicesStripSection({ t }) {
  return (
    <section className="bg-[#151515] py-6 md:py-7 border-y border-white/5 overflow-hidden">
      <div className="marquee-track">
        {[...t.strip, ...t.strip].map((s, i) => (
          <div key={i} className="flex items-center gap-8 px-6 shrink-0">
            <span className="font-display text-2xl md:text-3xl text-white/95 whitespace-nowrap">{s}</span>
            <span className="text-[#F66234] text-2xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
