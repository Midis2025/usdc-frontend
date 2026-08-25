import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamHero from "@/components/team/TeamHero";
import TeamGrid from "@/components/team/TeamGrid";
import TeamCTA from "@/components/team/TeamCTA";
import WhatDrivesUs from "@/components/team/WhatDrivesUs";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "Management Team — USDC | Architecting AI Infrastructure",
  description:
    "Meet the management team at USDC. We bring together deep expertise in energy integration, grid engineering, server hardware and cloud compute to scale the physical backbone of AI.",
};

export default function ManagementTeamPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Immersive Hero Header */}
      <TeamHero />

      {/* What Drives Us values block */}
      <WhatDrivesUs />
      
      {/* Interactive Core Team Grid */}
      <TeamGrid />
      
      {/* Call to action */}
      <TeamCTA />
      
      {/* Partner Section */}
      <PartnerSection />

      <Footer />
    </div>
  );
}
