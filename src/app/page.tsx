import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

// Lazy load below-the-fold components
const SpeedScaleSovereignty = dynamic(() => import("@/components/SpeedScaleSovereignty"));
const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"));
const InfrastructureStack = dynamic(() => import("@/components/InfrastructureStack"));
const AIDemand = dynamic(() => import("@/components/AIDemand"));
const AIInfrastructureExcellence = dynamic(() => import("@/components/AIInfrastructureExcellence"));
const NvidiaRoadmap = dynamic(() => import("@/components/NvidiaRoadmap"));
const WaterFreeCooling = dynamic(() => import("@/components/WaterFreeCooling"));
const DcimSection = dynamic(() => import("@/components/DcimSection"));
const LatestNews = dynamic(() => import("@/components/LatestNews"));
const PartnerSection = dynamic(() => import("@/components/PartnerSection"));

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full">
      {/* Background Grids and Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 max-w-full">
        {/* Top Center Massive Ambient Blue Glow behind Navbar & Hero */}
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/[0.08] rounded-full blur-[130px] animate-float" />

        {/* Top Left Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />

        {/* Top Right Ambient Gold Glow */}
        <div className="absolute top-[-15%] right-[-10%] w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[145px]" />
      </div>

      {/* Render the Navbar */}
      <Navbar />

      {/* Render the Hero section */}
      <Hero />

      {/* Render the Speed, Scale, Sovereignty section */}
      <SpeedScaleSovereignty />

      {/* Render the Video Showcase section */}
      <VideoShowcase />

      {/* Render the Infrastructure Stack section */}
      <InfrastructureStack />

      {/* Render the AI Demand section */}
      <AIDemand />

      {/* Render the AI Infrastructure Excellence section */}
      <AIInfrastructureExcellence />

      {/* Render the NVIDIA Roadmap section */}
      <NvidiaRoadmap />

      {/* Water-Free Closed-Loop Cooling section */}
      <WaterFreeCooling />

      {/* USDC DCIM software telemetry dashboard section */}
      <DcimSection />

      {/* Render the Latest News section */}
      <LatestNews />

      {/* Partner with us CTA Section */}
      <PartnerSection />

      {/* Footer / Info section */}
      <Footer />

      <CookieBanner />
    </div>
  );
}
