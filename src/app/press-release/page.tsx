import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PressReleaseHero from "@/components/press/PressReleaseHero";
import PressReleaseGrid from "@/components/press/PressReleaseGrid";
import PressReleaseCTA from "@/components/press/PressReleaseCTA";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "Press Releases — USDC | Latest News & Announcements",
  description:
    "Stay informed with the latest press releases, partnerships, expansions and technology breakthroughs from USDC — your trusted partner in AI infrastructure and data center innovation.",
};

export default function PressReleasePage() {
  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full">
      <Navbar />

      {/* Immersive hero with animated headline */}
      <PressReleaseHero />

      {/* Filterable press release grid */}
      <PressReleaseGrid />

      {/* Newsletter + Media CTA */}
      <PressReleaseCTA />

      {/* Partner Section */}
      <PartnerSection />





      <Footer />
    </div>





  );
}
