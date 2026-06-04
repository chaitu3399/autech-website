"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useLang } from "@/components/language-provider";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function FooterShell() {
  const { t } = useLang();

  const links = t.footer.links_items;

  return (
    <Section variant="dark" testId="footer" className="pb-[env(safe-area-inset-bottom)]">
      <Container>
        <div className="border-b border-inverse pb-[var(--stack-lg)] mb-[var(--stack-lg)]">
          <div className="text-display-page text-inverse-95 select-none overflow-hidden leading-[0.85]">
            AUTE<span className="text-accent">C</span>H
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <span className="label-pill text-faint-inverse">{t.footer.tagline}</span>
            <LanguageSwitcher dark />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-section items-start">
          <div className="sm:col-span-2 lg:col-span-1 min-w-0">
            <Logo />
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-inverse flex items-center justify-center hover:border-[var(--autech-orange)] transition-colors focus-ring touch-manipulation"
                >
                  <Icon size={15} className="text-inverse" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="label-pill text-faint-inverse mb-4">{t.footer.links}</div>
            <ul className="space-y-3 text-body">
              {links.map((l) => (
                <li key={l.h}>
                  <Link href={l.h.startsWith("#") ? `/${l.h}` : l.h} className="nav-link nav-link--inverse focus-ring rounded-sm">
                    {l.k}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-pill text-faint-inverse mb-4">{t.footer.contact_block}</div>
            <ul className="space-y-3 text-body-sm">
              <li>
                <a href="mailto:service@autechsys.com" className="nav-link nav-link--inverse break-all">
                  service@autechsys.com
                </a>
              </li>
              <li>
                <a href="tel:+17870000000" className="nav-link nav-link--inverse">
                  +1 (787) 000-0000
                </a>
              </li>
              <li className="text-faint-inverse">{t.footer.hours}</li>
              <li className="text-faint-inverse">{t.footer.address}</li>
            </ul>
          </div>
          <div className="min-w-0">
            <div className="label-pill text-faint-inverse mb-4">{t.footer.network}</div>
            <p className="text-body-sm text-muted-inverse mb-5">{t.footer.network_body}</p>
            <Button variant="accent" href="/careers" showArrow className="inline-flex">
              {t.footer.network_cta}
            </Button>
          </div>
        </div>
        <div className="border-t border-inverse mt-[var(--stack-lg)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="label-pill text-faint-inverse">{t.footer.rights}</span>
          <span className="label-pill text-faint-inverse">AUTECH LLC · PR · USA</span>
        </div>
      </Container>
    </Section>
  );
}
