"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scrollToSection";
import Hero from "@/components/sections/home/Hero";
import ServicesStrip from "@/components/sections/home/ServicesStrip";
import About from "@/components/sections/home/About";
import Services from "@/components/sections/home/Services";
import Industries from "@/components/sections/home/Industries";
import WhyUs from "@/components/sections/home/WhyUs";
import CtaBanner from "@/components/sections/home/CtaBanner";
import Contact from "@/components/sections/home/Contact";

export default function HomePage({ initialService = null, initialIndustry = null }) {
  useEffect(() => {
    if (window.location.hash) scrollToSection(window.location.hash);
  }, []);

  return (
    <main id="main-content" data-testid="home-page">
      <Hero />
      <ServicesStrip />
      <About />
      <Services initialService={initialService} />
      <Industries initialIndustry={initialIndustry} />
      <WhyUs />
      <CtaBanner />
      <Contact />
    </main>
  );
}
