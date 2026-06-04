"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/components/language-provider";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { key: "home", hash: "#home" },
  { key: "about", hash: "#about" },
  { key: "services", hash: "#services" },
  { key: "industries", hash: "#industries" },
  { key: "contact", hash: "#contact" },
  { key: "team", href: "/careers" },
];

const DARK_ZONE_SELECTOR = "[data-header-dark-zone], .header-dark-zone, .section--dark";

function headerOverlapsDarkZone(headerEl) {
  const zones = document.querySelectorAll(DARK_ZONE_SELECTOR);
  const headerRect = headerEl.getBoundingClientRect();
  for (const zone of zones) {
    const r = zone.getBoundingClientRect();
    if (r.top < headerRect.bottom && r.bottom > headerRect.top) return true;
  }
  return false;
}

export default function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const headerEl = document.querySelector("[data-testid='navbar']");
    if (!headerEl) return;

    const update = () => {
      setScrolled(window.scrollY > 20);
      setOverDark(headerOverlapsDarkZone(headerEl));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navHref = (hash) => (pathname === "/" ? hash : `/${hash}`);

  const labels = {
    home: t.nav.home,
    about: t.nav.about,
    services: t.nav.services,
    industries: t.nav.industries,
    contact: t.nav.contact,
    team: t.nav.team,
  };

  const headerSurface = overDark
    ? "site-header--over-dark bg-dark/95 backdrop-blur-md border-b border-inverse shadow-sm"
    : scrolled
      ? "bg-page backdrop-blur-md border-b border-default shadow-sm"
      : "bg-page/80 backdrop-blur-sm md:bg-page/60 md:backdrop-blur-sm";

  const navLinkClass = overDark ? "nav-link nav-link--inverse" : "nav-link";

  return (
    <header
      data-testid="navbar"
      data-over-dark={overDark ? "true" : "false"}
      className={`site-header fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] ${headerSurface}`}
    >
      <div className="site-container py-3 flex items-center justify-between gap-4">
        <Link href="/" data-testid="navbar-logo" className="shrink-0 flex items-center focus-ring rounded-sm">
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const href = link.href ?? navHref(link.hash);
            const testId = link.hash ? `nav-link-${link.hash.slice(1)}` : "nav-link-careers";
            return (
              <Link
                key={link.key}
                href={href}
                data-testid={testId}
                className={`${navLinkClass} px-3 xl:px-4 py-2 focus-ring rounded-sm touch-manipulation`}
              >
                {labels[link.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher dark={overDark} />
          <div className="hidden lg:block shrink-0">
            <Button
              variant={overDark ? "inverse" : "primary"}
              href={navHref("#contact")}
              showArrow
              testId="navbar-cta-btn"
            >
              {t.nav.cta}
            </Button>
          </div>
          <button
            data-testid="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden p-2.5 -mr-1 focus-ring rounded-sm touch-manipulation ${overDark ? "text-inverse" : "text-primary"}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div
          id="mobile-menu"
          data-testid="mobile-menu"
          className="lg:hidden bg-page border-t border-default max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
        >
          <nav className="site-container py-4 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const href = link.href ?? navHref(link.hash);
              return (
                <Link
                  key={link.key}
                  href={href}
                  className="text-left py-3.5 text-body font-semibold text-primary border-b border-default focus-ring rounded-sm touch-manipulation"
                >
                  {labels[link.key]}
                </Link>
              );
            })}
            <Button variant="primary" href={navHref("#contact")} showArrow className="mt-4 w-full justify-center">
              {t.nav.cta}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
