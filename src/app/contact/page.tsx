import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import SmartContactCards from "@/components/contact/SmartContactCards";
import ContactPortal from "@/components/contact/ContactPortal";

import ContactCTA from "@/components/contact/ContactCTA";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "Contact USDC — Let's Build The Future Together",
  description:
    "Connect with the team architecting next-generation data centers, AI compute, colocation and cloud infrastructure. Open the communication portal.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* Full-screen immersive hero with the AI Communication Hub centerpiece */}
      <ContactHero />

      {/* Smart contact cards — direct channels */}
      <SmartContactCards />

      {/* Immersive communication portal (the form) */}
      <ContactPortal />



      {/* Closing call-to-action */}
      <ContactCTA />

      {/* Partner Section */}
      <PartnerSection />

      <Footer />
    </div>
  );
}
