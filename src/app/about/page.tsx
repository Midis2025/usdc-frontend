import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/app/about/AboutHero";
import AboutJourneySection from "@/components/AboutJourneySection";

import MissionVisionSection from "@/app/about/MissionVisionSection";
import CoreValuesSection from "@/app/about/CoreValuesSection";
import AboutByNumbers from "@/components/AboutByNumbers";
import PartnerSection from "@/components/PartnerSection";


export const metadata: Metadata = {
  title: "About Us — USDC | Building the Future of AI Infrastructure",
  description:
    "Learn about USDC's mission to transform underutilized energy assets into enterprise-scale AI infrastructure designed for next-generation compute and AI deployment.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero section cloned to match the reference image */}
      <AboutHero />

      {/* Interactive scroll-linked milestone journey timeline */}
      <AboutJourneySection />



      {/* Mission Vision Section */}
      <MissionVisionSection />

      {/* Core Values Section */}
      <CoreValuesSection />

      {/* Cloned By The Numbers Section */}
      <AboutByNumbers />

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
