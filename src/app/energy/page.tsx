import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, ShieldCheck, RefreshCw, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import PowerToComputeDiagram from "@/components/PowerToComputeDiagram";
import EnergyStackGrid from "@/components/EnergyStackGrid";
import EnergyEconomicsAdvantage from "@/components/EnergyEconomicsAdvantage";
import SuperiorEconomics from "@/components/SuperiorEconomics";
import PartnerSection from "@/components/PartnerSection";

export const metadata: Metadata = {
  title: "Energy Integration — USDC | Empowering High-Density AI Compute",
  description:
    "Explore USDC's grid-scale energy assets and sustainable infrastructure designed for powering the next generation of dense AI computing clusters.",
};

export default function EnergyPage() {
  const energyFeatures = [
    {
      title: "Utility Substation Integration",
      desc: "Direct integration with utility transmission networks at high voltages (115kV+), bypassing distribution-level bottlenecks and securing massive power headroom.",
      Icon: Zap,
    },
    {
      title: "Renewable Integration",
      desc: "Partnerships with local green grids and dedicated solar, wind, or hydro generation sources to minimize scope 2 emissions and ensure lower carbon intensity.",
      Icon: RefreshCw,
    },
    {
      title: "Concurrent Maintainability",
      desc: "Equipped with redundant high-voltage feeders and on-site substation setups designed to meet Tier III uptime requirements under continuous operations.",
      Icon: ShieldCheck,
    },
    {
      title: "AI Load Balancing",
      desc: (
        <>
          Direct power routing optimization dynamically adjusting load factors according to <br />
          real-time grid conditions and compute demands.
        </>
      ),
      Icon: Cpu,
    },
  ];

  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full">
      {/* Navigation Header */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[60vh] md:min-h-screen flex items-center pt-24 pb-12 md:pt-36 md:pb-16 overflow-hidden select-none">

        {/* Ambient Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: "url('/Group 344 (1).webp')" }}
          />
        </div>

        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#3daeff]/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
              SUSTAINABLE POWER
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 uppercase">
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:0ms]">Grid-Scale&nbsp;</span>
            </span>
            <br />
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:80ms] text-[#3daeff] select-none">Energy&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:160ms] text-[#3daeff] select-none">Infrastructure</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[620px] mb-12 font-sans">
            Securing utility substation access, optimizing grid connection pipelines and integrating clean generation sources to power enterprise GPU compute.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 relative z-10 animate-slide-up [animation-delay:250ms]">
            {/* Explore Infrastructure */}
            <Link href="/data-center" className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white text-[13px] font-semibold rounded-[8px] flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_24px_rgba(61,174,255,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer">
              <span>Explore Infrastructure</span>
              <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40">
                <ArrowRight className="w-3 h-3 text-white animate-pulse" />
              </div>
            </Link>

            {/* View ARMS 200 */}
            <Link href="/arms" className="w-full sm:w-auto px-6 py-3.5 border border-white/12 hover:border-[#3daeff]/30 hover:bg-white/[0.02] text-white/90 hover:text-white text-[13px] font-semibold rounded-[8px] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all duration-200 cursor-pointer">
              <span>View ARMS 200</span>
              <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/20">
                <ArrowRight className="w-3 h-3 text-white/70" />
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ── POWER TO COMPUTE SCHEMA DIAGRAM SECTION ── */}
      <PowerToComputeDiagram />

      {/* ── ENERGY STACK LAYERS SECTION ── */}
      <EnergyStackGrid />

      {/* ── THE ENERGY ECONOMICS ADVANTAGE SECTION ── */}
      <EnergyEconomicsAdvantage />

      {/* ── SUPERIOR ECONOMICS ADVANTAGE SECTION ── */}
      <SuperiorEconomics />

      {/* ── CORE CAPABILITIES SECTION ── */}
      <section className="w-full relative bg-[#04070f] border-t border-white/[0.03] py-6 md:py-20 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headers + Feature Grid */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#02050c]/60 mb-6 shadow-sm">
                <span className="w-6.5 h-[1.5px] bg-[#3daeff] rounded-full" />
                <span className="text-[10px] font-semibold tracking-[0.25em] text-white/90 uppercase font-sans">
                  CORE GRID CAPABILITIES
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-[56px] font-extrabold tracking-tight text-white mb-6 font-sans leading-[1.1] uppercase">
                Core Grid <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">Capabilities</span>
              </h2>

              {/* Description */}
              <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] font-sans mb-10 max-w-[620px]">
                Our energy infrastructure provides robust and concurrently maintainable capabilities, engineered specifically for high-capacity GPU nodes and <span className="whitespace-nowrap">long-term</span> scaling.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 gap-5 w-full">
                {energyFeatures.map((feat, idx) => {
                  const Icon = feat.Icon;
                  return (
                    <div
                      key={idx}
                      className="group relative flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-[#02050c]/30 hover:bg-[#02050c]/60 hover:border-[#0091ff]/30 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/[0.03] group-hover:bg-[#3daeff]/10 border border-white/10 group-hover:border-[#3daeff]/30 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <Icon className="w-4.5 h-4.5 text-white/60 group-hover:text-[#3daeff] transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1.5 transition-colors duration-300 group-hover:text-[#3daeff] font-sans">
                          {feat.title}
                        </h3>
                        <p className="text-[11px] text-white/45 leading-[1.6] font-sans">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Visual Model */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="relative w-full aspect-square max-w-[480px] rounded-2xl overflow-hidden bg-[#02050c]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center">
                <iframe
                  src="/magnetic-grid.html"
                  title="Core Grid Capabilities Visualization"
                  className="w-full h-full border-0"
                  style={{
                    borderRadius: 'inherit',
                    pointerEvents: 'auto',
                  }}
                  allow="autoplay"
                />
              </div>
            </div>

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
