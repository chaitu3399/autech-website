"use client";

import CareersHero from "@/components/sections/careers/CareersHero";
import CareersImage from "@/components/sections/careers/CareersImage";
import CareersPerks from "@/components/sections/careers/CareersPerks";
import CareersRequirements from "@/components/sections/careers/CareersRequirements";
import CareersApply from "@/components/sections/careers/CareersApply";

export default function CareersPage() {
  return (
    <main id="main-content" data-testid="careers-page" className="bg-page hero-section">
      <CareersHero />
      <CareersImage />
      <CareersPerks />
      <CareersRequirements />
      <CareersApply />
    </main>
  );
}
