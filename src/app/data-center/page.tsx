import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import Footer from "@/components/Footer";
import { Server, Thermometer, Shield, Columns } from "lucide-react";
import DataCenterArchitecture from "@/components/DataCenterArchitecture";
import BuiltForAiSection from "@/components/BuiltForAiSection";
import FacilitySpecification from "@/components/FacilitySpecification";
import WhyUsdcSection from "@/components/WhyUsdcSection";
import ArmsGallery from "@/components/ArmsGallery";
import PartnerSection from "@/components/PartnerSection";


export const metadata: Metadata = {
  title: "Data Center — USDC | High-Density GPU Computing Environment",
  description:
    "Discover USDC's high-density modular datacenter platform, liquid cooling configurations and robust structural designs built for AI compute cluster operations.",
};

export default function DataCenterPage() {
  const dcFeatures = [
    {
      title: "Direct-to-Chip Liquid Cooling",
      desc: "Native liquid-cooling manifolds supporting blind-mate configurations and high coolant flow rates to maintain optimal temperatures for NVIDIA Blackwell (B200/B300) and high-density GPU clusters.",
      Icon: Thermometer,
    },
    {
      title: "Structural Load Capacity",
      desc: "Racks constructed from aircraft-grade aluminum and heavy-duty steel, structurally rated to support up to 4,500 lbs of server weight per enclosure.",
      Icon: Columns,
    },
    {
      title: "Modular Deployment Speed",
      desc: (
        <>
          Standardized pod units manufactured off-site and commissioned on-site within <br />
          4 months, ensuring rapid scale and capacity growth.
        </>
      ),
      Icon: Server,
    },
    {
      title: "Physical Security Standards",
      desc: (
        <>
          Featuring biometric multi-factor authentication, constant surveillance and <br />
          secure enclosures conforming to corporate security baselines.
        </>
      ),
      Icon: Shield,
    },
  ];

  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full">
      {/* Navigation Header */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[60vh] md:min-h-screen flex items-center pt-24 pb-12 md:pt-40 md:pb-16 overflow-hidden select-none">
        {/* Background Video */}
        <HeroVideo
          src="/data-center-tour.mp4"
          poster="/data-center-tour-poster.webp"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: "brightness(0.4)" }}
        />

        {/* Ambient Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600/[0.08] rounded-full blur-[140px] pointer-events-none z-[2]" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto animate-fade-in">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#02050c]/50 mb-8">
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-black tracking-[0.25em] text-white/95 uppercase font-sans">
                AI READY. BUILT DIFFERENT.
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 uppercase">
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:0ms]">Data&nbsp;</span>
              </span>
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:80ms] text-[#3daeff] select-none">Centers</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-[13.5px] md:text-[14.5px] text-white/50 font-normal leading-normal max-w-[480px] mx-auto font-sans">
              Purpose-built AI-ready facilities engineered for high-density GPU infrastructure, advanced cooling and rapid deployment.
            </p>
          </div>
        </div>
      </section>

      {/* ── METRICS BANNER SECTION ── */}
      <section className="w-full bg-[#04070f] pt-10 md:pt-16 pb-10 md:pb-14 select-none relative z-10">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.01] py-4 px-4 md:py-6 md:px-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center text-center gap-3 md:gap-2">

              {/* Metric 1 */}
              <div className="flex-1 flex flex-col items-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">120KW+</div>
                <div className="text-[8px] sm:text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">RACK DENSITY</div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />

              {/* Metric 2 */}
              <div className="flex-1 flex flex-col items-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">1-50MW+</div>
                <div className="text-[8px] sm:text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">POWER CAPACITY</div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />

              {/* Metric 3 */}
              <div className="flex-1 flex flex-col items-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">4 MTHS</div>
                <div className="text-[8px] sm:text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">RAPID DEPLOYMENT</div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />

              {/* Metric 4 */}
              <div className="flex-1 flex flex-col items-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">TIER III</div>
                <div className="text-[8px] sm:text-[9px] font-black text-white/50 tracking-[0.18em] uppercase font-sans">RELIABILITY</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── DATA CENTER ARCHITECTURE SECTION ── */}
      <DataCenterArchitecture />

      {/* ── BUILT FOR AI SECTION ── */}
      {/* <BuiltForAiSection /> */}

      {/* ── WHY USDC: INTEGRATED INFRASTRUCTURE ── */}
      <WhyUsdcSection />

      {/* Real-world deployment image gallery section */}
      <ArmsGallery />

      {/* ── FACILITY SPECIFICATION SECTION ── */}
      <FacilitySpecification />

      {/* ── CORE CAPABILITIES SECTION ── */}
      <section id="facilities" className="w-full relative bg-[#04070f] border-t border-white/[0.03] pt-6 md:pt-12 pb-6 md:pb-20">
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-[900px] mx-auto mb-16">
            <h2 className="text-[38px] sm:text-[46px] md:text-[52px] lg:text-[52px] font-bold tracking-tight text-white mb-6 font-sans uppercase lg:whitespace-nowrap">
              Designed for <span className="text-[#3daeff]">Dense Compute</span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed font-sans">
              Our modular datacenter solutions deploy rapidly and support continuous GPU workloads, delivering enterprise-scale concurrent maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {dcFeatures.map((feat, idx) => {
              const Icon = feat.Icon;
              return (
                <div
                  key={idx}
                  className="group relative flex items-start gap-5 p-6 rounded-2xl border border-white/[0.06] bg-[#02050c]/30 hover:bg-[#02050c]/60 hover:border-[#0091ff]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] group-hover:bg-[#3daeff]/10 border border-white/10 group-hover:border-[#3daeff]/30 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-[#3daeff] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#3daeff] font-sans">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-white/45 leading-[1.65] font-sans">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
