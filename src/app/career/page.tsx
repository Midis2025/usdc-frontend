import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerHero from "@/app/career/CareerHero";
import CareerWhy from "@/app/career/CareerWhy";
import CareerOpenRoles from "@/app/career/CareerOpenRoles";
import CareerCulture from "@/app/career/CareerCulture";
import CareerCTA from "@/app/career/CareerCTA";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "Careers — USDC | Shape the Future of AI Infrastructure",
  description:
    "Join the USDC team and help build next-generation AI data center infrastructure. Explore open roles across engineering, operations and business development.",
};

export default function CareerPage() {
  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full">
      <Navbar />
      <CareerHero />
      <CareerWhy />
      <CareerOpenRoles />
      <CareerCulture />
      <CareerCTA />
      <PartnerSection />
      <Footer />
    </div>
  );
}
