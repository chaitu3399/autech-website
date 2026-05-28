"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLang } from "@/components/language-provider";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import { scrollToSection } from "@/components/shared/scrollToSection";

export default function Footer() {
  const { t } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (target) => {
    if (!target.startsWith("#")) {
      router.push(target);
      return;
    }
    if (pathname !== "/") {
      router.push(`/${target}`);
      return;
    }
    scrollToSection(target);
  };

  return (
    <footer data-testid="footer" className="bg-[#151515] text-white relative overflow-hidden">
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
            <Logo />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mt-5">{t.footer.tagline}.</p>
            <div className="flex items-center gap-3 mt-5">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center"
                >
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
                  <button
                    onClick={() => navigateTo(l.h)}
                    className="text-white/85 hover:text-[#F66234] transition-colors"
                  >
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
            <p className="text-white/70 text-sm leading-relaxed mb-5">{t.footer.network_body}</p>
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
