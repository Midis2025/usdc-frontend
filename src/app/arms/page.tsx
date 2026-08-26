import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArmsHero from "@/components/ArmsHero";

// Lazy load below-the-fold components
const Arms200Advantages = dynamic(() => import("@/components/Arms200Advantages"));
const ArmsModelShowcase = dynamic(() => import("@/components/ArmsModelShowcase"));
const ArmsInfrastructureGrid = dynamic(() => import("@/components/ArmsInfrastructureGrid"));
const Arms200System = dynamic(() => import("@/components/Arms200System"));
const ArmsTechnicalSpecs = dynamic(() => import("@/components/ArmsTechnicalSpecs"));
const PartnerSection = dynamic(() => import("@/components/PartnerSection"));

export const metadata: Metadata = {
  title: "ARMS Modular Systems — USDC | Enterprise-Scale AI Infrastructure",
  description:
    "Discover ARMS Modular Systems - USDC's premier modular datacenter platform delivering up to 1.8 MW of critical IT load with Tier III redundancy and rapid deployment.",
};

export default function ArmsPage() {
  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero section */}
      <ArmsHero />

      {/* ARMS 200 Advantages section */}
      <Arms200Advantages />

      {/* Interactive 3D ARMS Model Showcase */}
      <ArmsModelShowcase />

      {/* 3D Modular Infrastructure Grid Section */}
      <ArmsInfrastructureGrid />

      {/* ARMS 200 System detailed specs grid & Certificate section */}
      <Arms200System />


      {/* ARMS Technical Specifications list & Future Ready platform */}
      <ArmsTechnicalSpecs />

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}

