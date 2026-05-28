"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Anchor,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Minus,
  Plane,
  Plus,
  Shield,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { useLang } from "@/components/language-provider";

const HERO_IMG = "https://images.pexels.com/photos/7018493/pexels-photo-7018493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600";
const INDUSTRIES_IMG = "https://images.unsplash.com/photo-1569020569118-e5cb69d8251b?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80";
const CAREERS_HERO_IMG = "https://images.pexels.com/photos/7564862/pexels-photo-7564862.jpeg?auto=compress&cs=tinysrgb&w=1600";
const WA_NUMBER = "17870000000";

function Logo({ variant = "dark" }) {
  const main = variant === "dark" ? "#151515" : "#F6F6F6";
  const accent = "#C8370B";

  return (
    <svg viewBox="0 0 220 56" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg" aria-label="Autech LLC">
      <g fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="48" letterSpacing="-1">
        <text x="0" y="44" fill={main}>
          AU
        </text>
        <text x="74" y="44" fill={main}>
          TE
        </text>
        <text x="148" y="44" fill={main}>
          H
        </text>
        <text x="120" y="44" fill={accent}>
          C
        </text>
      </g>
      <circle cx="138" cy="28" r="3" fill={accent} />
    </svg>
  );
}

function LanguageSwitcher({ dark = false }) {
  const { lang, setLang } = useLang();
  const base = "label-pill px-2 py-1 transition-colors";
  const active = dark ? "text-white" : "text-[#151515]";
  const inactive = dark ? "text-white/40 hover:text-white/70" : "text-[#151515]/40 hover:text-[#151515]/70";

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border ${dark ? "border-white/15" : "border-[#151515]/15"} px-1 py-0.5`}>
      <button type="button" onClick={() => setLang("es")} className={`${base} ${lang === "es" ? active : inactive}`}>
        ES
      </button>
      <span className={`${dark ? "text-white/20" : "text-[#151515]/20"} label-pill`}>/</span>
      <button type="button" onClick={() => setLang("en")} className={`${base} ${lang === "en" ? active : inactive}`}>
        EN
      </button>
    </div>
  );
}

function scrollToSection(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goSection = (hash) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push(`/${hash}`);
      return;
    }
    scrollToSection(hash);
  };

  const links = [
    { k: t.nav.home, h: "#home" },
    { k: t.nav.about, h: "#about" },
    { k: t.nav.services, h: "#services" },
    { k: t.nav.industries, h: "#industries" },
    { k: t.nav.contact, h: "#contact" },
  ];

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F6F6F6]/85 backdrop-blur-md border-b border-[#151515]/8" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-6">
        <Link href="/" data-testid="navbar-logo" className="shrink-0 flex items-center">
          <Logo variant="dark" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button key={l.h} data-testid={`nav-link-${l.h.slice(1)}`} onClick={() => goSection(l.h)} className="px-4 py-2 text-sm font-medium text-[#151515] hover:text-[#C8370B] transition-colors">
              {l.k}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button data-testid="navbar-cta-btn" onClick={() => goSection("#contact")} className="btn-primary hidden md:inline-flex">
            <span>{t.nav.cta}</span>
            <span className="arrow-pill">
              <ArrowUpRight size={16} color="#fff" />
            </span>
          </button>
          <button data-testid="mobile-menu-toggle" onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 text-[#151515]" aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div data-testid="mobile-menu" className="lg:hidden bg-[#F6F6F6] border-t border-[#151515]/8">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button key={l.h} onClick={() => goSection(l.h)} className="text-left py-3 text-base font-semibold text-[#151515] border-b border-[#151515]/8">
                {l.k}
              </button>
            ))}
            <button onClick={() => goSection("#contact")} className="btn-primary mt-4 self-start">
              <span>{t.nav.cta}</span>
              <span className="arrow-pill">
                <ArrowUpRight size={16} color="#fff" />
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function HomeSections() {
  const { t } = useLang();
  const [serviceOpen, setServiceOpen] = useState(0);
  const [industryActive, setIndustryActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", company: "", phone: "", email: "", type: "", message: "" });

  const servicesImages = [
    "https://images.unsplash.com/photo-1770715897376-22215c26e2a7?crop=entropy&cs=srgb&fm=jpg&w=900&q=80",
    "https://images.unsplash.com/photo-1770705950498-d373e33ecb1a?crop=entropy&cs=srgb&fm=jpg&w=900&q=80",
    "https://images.pexels.com/photos/7564862/pexels-photo-7564862.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.unsplash.com/photo-1523559094051-53bac879eb80?crop=entropy&cs=srgb&fm=jpg&w=900&q=80",
  ];

  useEffect(() => {
    if (window.location.hash) scrollToSection(window.location.hash);
  }, []);

  const submitContact = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ first: "", last: "", company: "", phone: "", email: "", type: "", message: "" });
  };

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <main data-testid="home-page">
      <section id="home" data-testid="hero-section" className="relative pt-28 md:pt-32 pb-0 dash-guides">
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
                <button data-testid="hero-cta-primary" onClick={() => scrollToSection("#contact")} className="btn-primary">
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
                        <img src={servicesImages[i]} alt={item.t} className="w-full h-56 md:h-64 object-cover" />
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
      <section id="why-us" data-testid="why-us-section" className="py-24 md:py-32 bg-[#151515] relative overflow-hidden dash-guides-dark">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#F66234]">+</span>
              <span className="label-pill text-white/60">{t.why.label}</span>
            </div>
            <h2 className="font-display text-[9vw] md:text-[5.5vw] lg:text-[4.4vw] leading-[0.95] text-white">
              {t.why.title.split(" ").slice(0, -1).join(" ")} <span className="text-[#F66234]">{t.why.title.split(" ").slice(-1)}</span>
            </h2>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-3 -right-3 bg-[#C8370B] text-white label-pill px-3 py-2 rounded-full">{t.why.badge}</div>
            <ul className="space-y-3 bg-[#191919] border border-white/8 p-7 md:p-9 rounded-sm">
              {t.why.items.map((it, i) => (
                <li key={i} data-testid={`why-item-${i}`} className="flex items-start gap-4 py-3 border-b last:border-b-0 border-white/8">
                  <span className="font-mono text-xs text-[#F66234] pt-1">0{i + 1}</span>
                  <span className="text-white/85 text-sm md:text-base leading-relaxed flex-1">{it}</span>
                  <Check size={18} color="#F66234" className="mt-1 shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section data-testid="cta-banner" className="py-12 md:py-16 bg-[#F6F6F6]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div
            className="relative overflow-hidden rounded-sm border border-[#151515]/10 bg-[#151515] noise-bg p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(200,55,11,0.12) 0 14px, transparent 14px 28px), linear-gradient(180deg, #151515, #191919)" }}
          >
            <h3 className="font-display text-3xl md:text-5xl text-white leading-[0.95]">
              {t.cta_banner.title_a}
              <br />
              <span className="text-[#F66234]">{t.cta_banner.title_b}</span>
            </h3>
            <button data-testid="cta-banner-btn" onClick={() => scrollToSection("#contact")} className="btn-primary" style={{ background: "#C8370B", borderColor: "#C8370B" }}>
              <span>{t.cta_banner.btn}</span>
              <span className="arrow-pill" style={{ background: "#151515" }}>
                <ArrowUpRight size={16} color="#fff" />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-white dash-guides">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#C8370B]">+</span>
              <span className="label-pill text-[#151515]/60">{t.contact.label}</span>
            </div>
            <h2 className="font-display text-[9vw] md:text-[5.5vw] lg:text-[4.4vw] leading-[0.95] text-[#151515]">
              {t.contact.title_a}
              <br />
              <span className="text-[#C8370B]">{t.contact.title_b}</span>
            </h2>
            <p className="text-[#151515]/70 mt-6 max-w-md leading-relaxed">{t.contact.body}</p>
            <div className="mt-10 space-y-5">
              {t.contact.info.map((i, idx) => (
                <div key={idx} className="flex items-start justify-between border-b border-[#151515]/10 pb-4">
                  <span className="label-pill text-[#151515]/50">{i.k}</span>
                  <span className="font-display text-base md:text-lg text-[#151515] text-right">{i.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <form data-testid="contact-form" onSubmit={submitContact} className="bg-[#F6F6F6] border border-[#151515]/8 p-7 md:p-10 rounded-sm">
              <div className="grid md:grid-cols-2 gap-5">
                <input required value={form.first} onChange={onChange("first")} className="autech-input" placeholder={t.contact.form.first} />
                <input required value={form.last} onChange={onChange("last")} className="autech-input" placeholder={t.contact.form.last} />
                <input value={form.company} onChange={onChange("company")} className="autech-input" placeholder={t.contact.form.company} />
                <input value={form.phone} onChange={onChange("phone")} className="autech-input" placeholder={t.contact.form.phone} />
                <input required type="email" value={form.email} onChange={onChange("email")} className="autech-input md:col-span-2" placeholder={t.contact.form.email} />
                <select value={form.type} onChange={onChange("type")} className="autech-input md:col-span-2">
                  {t.contact.form.type_options.map((o, i) => (
                    <option key={i} value={i === 0 ? "" : o} disabled={i === 0}>
                      {o}
                    </option>
                  ))}
                </select>
                <textarea value={form.message} onChange={onChange("message")} rows={4} className="autech-input md:col-span-2 resize-none" placeholder={t.contact.form.message} />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4 mt-8">
                {sent ? <div className="text-[#C8370B] font-semibold">{t.contact.form.success}</div> : <span className="label-pill text-[#151515]/40">* Required fields</span>}
                <button data-testid="contact-submit" type="submit" className="btn-primary">
                  <span>{t.contact.form.submit}</span>
                  <span className="arrow-pill">
                    <ArrowUpRight size={16} color="#fff" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function CareersSections() {
  const { t, lang } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    experience: "",
    certs: "",
    vehicle_types: "",
    message: "",
    mvr: false,
    sida: false,
    compliance: false,
  });

  const onChange = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [k]: v }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.compliance) return;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm({
      first: "",
      last: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      experience: "",
      certs: "",
      vehicle_types: "",
      message: "",
      mvr: false,
      sida: false,
      compliance: false,
    });
  };

  return (
    <main data-testid="careers-page" className="bg-[#F6F6F6] pt-28">
      <section className="px-5 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <Link href="/" data-testid="back-to-home" className="inline-flex items-center gap-2 label-pill text-[#151515]/60 hover:text-[#C8370B] mb-8">
            <ArrowLeft size={14} /> {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <h1 className="font-display text-[12vw] md:text-[8vw] lg:text-[6.6vw] leading-[0.92] text-[#151515]">
            {t.careers.title_a}
            <br />
            <span className="text-[#C8370B]">{t.careers.title_b}</span>
          </h1>
          <p className="text-base md:text-lg text-[#151515]/70 max-w-2xl mt-8 leading-relaxed">{t.careers.sub}</p>
        </div>
      </section>
      <section className="px-5 md:px-10 mt-12">
        <div className="max-w-[1440px] mx-auto relative noise-bg rounded-sm overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CAREERS_HERO_IMG} alt="Autech mobile technician at work" className="w-full h-72 md:h-[420px] object-cover" />
        </div>
      </section>
      <section className="py-20 md:py-24 dash-guides">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C8370B]">+</span>
              <span className="label-pill text-[#151515]/60">{t.careers.perks_title}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#151515] leading-[0.95]">{t.careers.perks_title}</h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {t.careers.perks.map((p, i) => (
                <li key={i} className="flex items-start gap-4 py-4 border-b border-[#151515]/10">
                  <span className="font-mono text-xs text-[#C8370B] pt-1">0{i + 1}</span>
                  <span className="text-[#151515] flex-1">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-24 bg-white dash-guides">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#C8370B]">+</span>
            <span className="label-pill text-[#151515]/60">{t.careers.reqs_title}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#151515] leading-[0.95] mb-12">{t.careers.reqs_title}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {t.careers.reqs.map((g, i) => (
              <div key={i} className="border border-[#151515]/8 rounded-sm p-6 bg-[#F6F6F6]">
                <div className="font-display text-lg text-[#151515] mb-4">{g.t}</div>
                <ul className="space-y-2">
                  {g.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#151515]/80">
                      <Check size={14} color="#C8370B" className="mt-1 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="apply" className="py-24 md:py-32 bg-[#151515] relative overflow-hidden dash-guides-dark mt-16">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#F66234]">+</span>
            <span className="label-pill text-white/60">{t.careers.form_title}</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95] mb-10">{t.careers.form_title}</h2>
          <form data-testid="careers-form" onSubmit={submit} className="bg-[#191919] border border-white/8 p-7 md:p-10 rounded-sm">
            <div className="grid md:grid-cols-2 gap-5">
              <input required value={form.first} onChange={onChange("first")} className="autech-input-dark" placeholder={t.careers.form.first} />
              <input required value={form.last} onChange={onChange("last")} className="autech-input-dark" placeholder={t.careers.form.last} />
              <input required type="email" value={form.email} onChange={onChange("email")} className="autech-input-dark" placeholder={t.careers.form.email} />
              <input required value={form.phone} onChange={onChange("phone")} className="autech-input-dark" placeholder={t.careers.form.phone} />
              <input required value={form.city} onChange={onChange("city")} className="autech-input-dark" placeholder={t.careers.form.city} />
              <input required value={form.state} onChange={onChange("state")} className="autech-input-dark" placeholder={t.careers.form.state} />
              <input value={form.experience} onChange={onChange("experience")} className="autech-input-dark md:col-span-2" placeholder={t.careers.form.experience} />
              <input value={form.certs} onChange={onChange("certs")} className="autech-input-dark md:col-span-2" placeholder={t.careers.form.certs} />
              <input value={form.vehicle_types} onChange={onChange("vehicle_types")} className="autech-input-dark md:col-span-2" placeholder={t.careers.form.vehicle_types} />
              <textarea rows={4} value={form.message} onChange={onChange("message")} className="autech-input-dark md:col-span-2 resize-none" placeholder={t.careers.form.message} />
            </div>
            <div className="mt-8 space-y-3">
              <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                <input type="checkbox" checked={form.mvr} onChange={onChange("mvr")} className="mt-1 accent-[#C8370B]" />
                <span>{t.careers.form.mvr_ack}</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                <input type="checkbox" checked={form.sida} onChange={onChange("sida")} className="mt-1 accent-[#C8370B]" />
                <span>{t.careers.form.sida_ack}</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-white/90 cursor-pointer">
                <input required type="checkbox" checked={form.compliance} onChange={onChange("compliance")} className="mt-1 accent-[#C8370B]" />
                <span className="font-semibold">{t.careers.form.compliance_ack}</span>
              </label>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 mt-10">
              {sent ? <div className="text-[#F66234] font-semibold">{t.careers.form.success}</div> : <span className="label-pill text-white/40">*</span>}
              <button data-testid="careers-submit" type="submit" className="btn-primary" style={{ background: "#C8370B", borderColor: "#C8370B" }}>
                <span>{t.careers.form.submit}</span>
                <span className="arrow-pill" style={{ background: "#151515" }}>
                  <ArrowUpRight size={16} color="#fff" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  const { t } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  const goSection = (hash) => {
    if (pathname !== "/") {
      router.push(`/${hash}`);
      return;
    }
    scrollToSection(hash);
  };

  return (
    <footer data-testid="footer" className="bg-[#151515] text-white relative overflow-hidden">
      <div className="absolute inset-0 dash-guides-dark pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-20 relative">
        <div className="border-b border-white/10 pb-10 mb-10">
          <div className="font-display text-[18vw] md:text-[14vw] leading-[0.85] text-white/95 select-none">
            AUTE<span className="text-[#C8370B]">C</span>H
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
            <span className="label-pill text-white/50">{t.footer.tagline}</span>
            <LanguageSwitcher dark />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo variant="light" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mt-5">{t.footer.tagline}.</p>
            <div className="flex items-center gap-3 mt-5">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="label-pill text-white/40 mb-4">{t.footer.links}</div>
            <ul className="space-y-3">
              {t.footer.links_items.map((l) => (
                <li key={l.h}>
                  <button onClick={() => goSection(l.h)} className="text-white/85 hover:text-[#F66234] transition-colors">
                    {l.k}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-pill text-white/40 mb-4">{t.footer.contact_block}</div>
            <ul className="space-y-3 text-sm">
              <li className="text-white/85">service@autechsys.com</li>
              <li className="text-white/85">+1 (787) 000-0000</li>
              <li className="text-white/60">{t.footer.hours}</li>
              <li className="text-white/60">{t.footer.address}</li>
            </ul>
          </div>
          <div>
            <div className="label-pill text-white/40 mb-4">{t.footer.network}</div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              {t.footer.network === "Únete a la red"
                ? "¿Eres mecánico móvil? Construye tu carrera con la red Autech."
                : "Mobile mechanic? Build your career with the Autech network."}
            </p>
            <Link href="/careers" className="btn-primary" style={{ background: "#C8370B", borderColor: "#C8370B" }}>
              <span>{t.footer.network_cta}</span>
              <span className="arrow-pill" style={{ background: "#151515" }}>
                <ArrowUpRight size={16} color="#fff" />
              </span>
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex items-center justify-between flex-wrap gap-4">
          <span className="label-pill text-white/40">{t.footer.rights}</span>
          <span className="label-pill text-white/40">AUTECH LLC · PR · USA</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  const { t } = useLang();
  const msg = encodeURIComponent("Hola Autech, me interesa solicitar información sobre sus servicios.");
  const href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  return (
    <a data-testid="whatsapp-float" href={href} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp} className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 group">
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute inset-0 rounded-full wa-pulse" />
        <span className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-[#25D366]/30">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
            <path d="M19.11 17.21c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.61-.66 1.84-1.29.23-.63.23-1.17.16-1.29-.07-.12-.25-.18-.52-.32zM16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.46 1.66 6.34L3 29l6.84-1.79A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" />
          </svg>
        </span>
      </span>
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#151515] text-white text-xs font-medium px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        {t.whatsapp}
      </span>
    </a>
  );
}

export function SiteScaffold({ children }) {
  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export function HomePageContent() {
  return <HomeSections />;
}

export function CareersPageContent() {
  return <CareersSections />;
}
