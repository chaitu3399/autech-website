"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/language-provider";
import { scrollToSection } from "@/components/shared/scrollToSection";
import HeroSection from "@/components/home/sections/HeroSection";
import ShowcaseSection from "@/components/home/sections/ShowcaseSection";
import ServicesStripSection from "@/components/home/sections/ServicesStripSection";
import AboutSection from "@/components/home/sections/AboutSection";
import ServicesSection from "@/components/home/sections/ServicesSection";
import IndustriesSection from "@/components/home/sections/IndustriesSection";
import WhyUsSection from "@/components/home/sections/WhyUsSection";
import CtaBannerSection from "@/components/home/sections/CtaBannerSection";
import ContactSection from "@/components/home/sections/ContactSection";

export default function HomeSections() {
  const { t } = useLang();
  const [serviceOpen, setServiceOpen] = useState(0);
  const [industryActive, setIndustryActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", company: "", phone: "", email: "", type: "", message: "" });

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
      <HeroSection t={t} />
      <ShowcaseSection />
      <ServicesStripSection t={t} />
      <AboutSection t={t} />
      <ServicesSection t={t} serviceOpen={serviceOpen} setServiceOpen={setServiceOpen} />
      <IndustriesSection t={t} industryActive={industryActive} setIndustryActive={setIndustryActive} />
      <WhyUsSection t={t} />
      <CtaBannerSection t={t} />
      <ContactSection t={t} form={form} sent={sent} onChange={onChange} submitContact={submitContact} />
    </main>
  );
}
