export default function ShowcaseSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 md:px-10 mt-20 md:mt-24 pb-16 md:pb-20">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#C8370B]">+</span>
        <span className="label-pill text-[#151515]/60">WHY US</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center">
        <div className="aspect-square rounded-full bg-white border border-[#151515]/8 flex flex-col items-center justify-center p-8 text-center shadow-sm">
          <div className="label-pill text-[#151515]/40">AUTECH /</div>
          <div className="font-display text-7xl md:text-8xl text-[#151515] mt-1">
            10K<span className="text-[#C8370B]">+</span>
          </div>
          <div className="text-sm text-[#151515]/60 mt-3 max-w-[200px]">Jobs serviced over 6 years</div>
        </div>
        <div className="aspect-square rounded-full overflow-hidden relative noise-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1770705950498-d373e33ecb1a?crop=entropy&cs=srgb&fm=jpg&w=800&q=80"
            alt="Engine close-up"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 to-transparent" />
        </div>
        <div className="aspect-square rounded-full bg-[#C8370B] flex flex-col items-center justify-center p-8 text-center shadow-lg shadow-[#C8370B]/15">
          <div className="label-pill text-white/70">{"// TECHNICIANS"}</div>
          <div className="font-display text-7xl md:text-8xl text-white mt-1">
            20<span className="text-white/70">+</span>
          </div>
          <div className="text-sm text-white/85 mt-3 max-w-[200px]">Certified mobile mechanics nationwide</div>
        </div>
      </div>
    </section>
  );
}
