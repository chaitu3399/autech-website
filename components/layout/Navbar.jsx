"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { scrollToSection } from "@/components/shared/scrollToSection";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";

export default function Navbar() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#F6F6F6]/85 backdrop-blur-md border-b border-[#151515]/8" : "bg-transparent"}`}
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
