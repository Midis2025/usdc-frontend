import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, Compass, Zap, Activity, Network, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PartnerSection from "@/components/PartnerSection";


export const metadata: Metadata = {
  title: "Global Network — USDC | Multi-region US Footprint",
  description:
    "Explore USDC's multi-region US footprint linked by diverse-path fiber backbone and unified operational control plane from grid to GPU.",
};

export default function GlobalNetworkPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[60vh] md:min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 md:pt-28 md:pb-16 md:px-6 overflow-hidden">
        {/* Ambient Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/global-hero-globe.avif"
            alt="Global Network Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          {/* Realistic space-globe vignette (radial and linear dark gradients) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#04070f_75%)]" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#04070f] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#04070f] to-transparent" />
        </div>

        {/* Top Center Massive Ambient Blue Glow behind Navbar & Hero */}
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/[0.08] rounded-full blur-[130px] pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-sky-500/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center lg:pt-12 py-2 md:py-10 animate-fade-in">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              Live Network · US Footprint
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 text-center uppercase">
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:0ms]">Global&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:80ms] text-[#3daeff] select-none">Network</span>
            </span>
          </h1>

          <p className="text-white/60 text-sm md:text-[16px] max-w-xl mb-10 leading-relaxed font-normal text-center font-sans">
            USDC connects owned generation, substation access and compute capacity across a multi-site footprint — one resilient mesh from grid to GPU.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mx-auto relative z-10">
            <Link
              className="font-sans px-6 py-3.5 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white font-semibold text-[13px] rounded-[8px] transition-all duration-300 hover:brightness-110 active:scale-95 shadow-[0_4px_20px_rgba(61,174,255,0.25)] text-center w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2"
              href="/contact"
            >
              Talk to Team
            </Link>
            <Link
              className="font-sans px-6 py-3.5 border border-white/12 hover:border-[#3daeff]/30 hover:bg-white/[0.02] text-white/90 hover:text-white font-semibold text-[13px] rounded-[8px] transition-all duration-300 active:scale-95 text-center w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2"
              href="/energy"
            >
              Power Infrastructure
            </Link>
          </div>
        </div>


      </section>

      {/* ── SECTION 2: NETWORK FLOW (FROM REGION TO RACK) ── */}
      <section className="bg-[#050914] py-6 md:py-20 lg:py-24 px-4 md:px-6 relative overflow-hidden border-t border-white/[0.04]">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-10 md:mb-20">
            <div className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.02] mb-8">
              <div className="w-10 h-[1.5px] bg-[#3daeff] mr-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                Network Flow
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-extrabold leading-[1.1] tracking-tight uppercase text-white mb-6">
              From Region to <span className="text-[#3daeff]">Rack.</span>
            </h2>
            <p className="text-white/50 text-sm md:text-[16px] leading-[1.6] font-medium tracking-wide max-w-3xl">
              Multi-region sites linked by a redundant backbone and operated as one platform. Power, fiber and compute provisioned together — without the gaps that slow leased-only competitors.
            </p>
          </div>

          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {/* Card 1 */}
            <div className="group relative bg-gradient-to-br from-[#070c1a] to-[#02050c] rounded-3xl p-6 md:p-10 border border-white/[0.06] hover:border-[#3daeff]/35 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(61,174,255,0.08)] transition-all duration-500 flex flex-col items-start overflow-hidden hover:-translate-y-1">
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3daeff 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#3daeff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-tr-3xl" />

              <div className="relative z-10 flex justify-center my-4 w-full">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#3daeff]/15 blur-[50px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite' }} />
                  <div className="absolute -inset-8 bg-[#3daeff]/8 blur-[80px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.5s' }} />
                  <Image src="/network-diverse-sites.avif" alt="Diverse server sites" width={380} height={340} className="relative z-10 drop-shadow-[0_0_30px_rgba(61,174,255,0.3)]" />
                </div>
              </div>
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 relative z-10 group-hover:text-[#3daeff] transition-colors duration-500">
                Diverse sites, independent power profiles
              </h3>



              <p className="text-white/50 text-[13px] md:text-sm leading-relaxed font-medium mb-6 relative z-10">
                Owned nodes spread across distinct ISO regions and grid operators — so a fault in one market never propagates into customer capacity in another.
              </p>

              <ul className="space-y-3 mb-7 relative z-10 w-full">
                {[
                  "Sites across NY, AL and NC anchor the active footprint",
                  "Independent generation mix at each node — gas, grid, hybrid",
                  "Customer proximity to East Coast and Southeast hubs",
                  "Diverse fiber entries and water/utility paths per site",
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3daeff]/70 shrink-0" />
                    <span className="text-white/70 text-[13px] leading-relaxed font-medium">{li}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto w-full pt-6 border-t border-white/[0.08] relative z-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Regions</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">4</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">ISOs</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">3</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Power Mix</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">Hybrid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gradient-to-br from-[#070c1a] to-[#02050c] rounded-3xl p-6 md:p-10 border border-white/[0.06] hover:border-[#3daeff]/35 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(61,174,255,0.08)] transition-all duration-500 flex flex-col items-start overflow-hidden hover:-translate-y-1">
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3daeff 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#3daeff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-tr-3xl" />

              <div className="relative z-10 flex justify-center my-4 w-full">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#3daeff]/15 blur-[50px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.3s' }} />
                  <div className="absolute -inset-8 bg-[#3daeff]/8 blur-[80px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.8s' }} />
                  <Image src="/network-server-rack.avif" alt="Network backbone" width={380} height={340} className="relative z-10 drop-shadow-[0_0_30px_rgba(61,174,255,0.3)]" />
                </div>
              </div>
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 relative z-10 group-hover:text-[#3daeff] transition-colors duration-500">
                Inter-site fabric for replication & failover
              </h3>



              <p className="text-white/55 text-[13px] md:text-sm leading-relaxed font-medium mb-6 relative z-10">
                A managed backbone stitches every node into one operating fabric — replication, failover and consistent posture across regions without leased-line gaps.
              </p>

              <ul className="space-y-3 mb-7 relative z-10 w-full">
                {[
                  "Diverse-path fiber between every region",
                  "Active replication paths for customer datasets",
                  "Automated failover for power + connectivity",
                  "Single routing policy across the footprint",
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3daeff]/70 shrink-0" />
                    <span className="text-white/70 text-[13px] leading-relaxed font-medium">{li}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto w-full pt-6 border-t border-white/[0.08] relative z-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Paths</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">3x</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">RTT Target</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">&lt;10ms</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Failover</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">Auto</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gradient-to-br from-[#070c1a] to-[#02050c] rounded-3xl p-6 md:p-10 border border-white/[0.06] hover:border-[#3daeff]/35 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(61,174,255,0.08)] transition-all duration-500 flex flex-col items-start overflow-hidden hover:-translate-y-1">
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3daeff 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#3daeff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-tr-3xl" />

              <div className="relative z-10 flex justify-center my-4 w-full">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#3daeff]/15 blur-[50px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.6s' }} />
                  <div className="absolute -inset-8 bg-[#3daeff]/8 blur-[80px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 1.1s' }} />
                  <Image src="/network-server-cube.avif" alt="AI compute infrastructure" width={350} height={350} className="relative z-10 drop-shadow-[0_0_30px_rgba(61,174,255,0.3)]" />
                </div>
              </div>

              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 relative z-10 group-hover:text-[#3daeff] transition-colors duration-500">
                Latency budget engineered for AI workloads
              </h3>

              <p className="text-white/55 text-[13px] md:text-sm leading-relaxed font-medium mb-6 relative z-10">
                Routes, optics and switching are tuned to a strict latency budget — training clusters stay tightly coupled, inference stays close to the user.
              </p>

              <ul className="space-y-3 mb-7 relative z-10 w-full">
                {[
                  "Latency-budgeted routes for distributed training",
                  "GPU-aware path engineering across the backbone",
                  "On-site inference at the network edge",
                  "Low-jitter optical transport, deterministic switching",
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3daeff]/70 shrink-0" />
                    <span className="text-white/70 text-[13px] leading-relaxed font-medium">{li}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto w-full pt-6 border-t border-white/[0.08] relative z-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Edge RTT</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">&lt;5ms</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Core RTT</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">&lt;10ms</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Jitter</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">Sub-ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-gradient-to-br from-[#070c1a] to-[#02050c] rounded-3xl p-6 md:p-10 border border-white/[0.06] hover:border-[#3daeff]/35 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(61,174,255,0.08)] transition-all duration-500 flex flex-col items-start overflow-hidden hover:-translate-y-1">
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3daeff 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#3daeff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-tr-3xl" />

              <div className="relative z-10 flex justify-center my-4 w-full">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#3daeff]/15 blur-[50px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 0.9s' }} />
                  <div className="absolute -inset-8 bg-[#3daeff]/8 blur-[80px] rounded-full" style={{ animation: 'pulseGlow 3s ease-in-out infinite 1.4s' }} />
                  <Image src="/network-ops-dashboard.avif" alt="Operations dashboard" width={380} height={340} className="relative z-10 drop-shadow-[0_0_30px_rgba(61,174,255,0.3)]" />
                </div>
              </div>

              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 relative z-10 group-hover:text-[#3daeff] transition-colors duration-500">
                One ops team across the full footprint
              </h3>

              <p className="text-white/55 text-[13px] md:text-sm leading-relaxed font-medium mb-6 relative z-10">
                Network, power and compute are observed and controlled as one — customers get a single contract, single NOC, single point of accountability.
              </p>

              <ul className="space-y-3 mb-7 relative z-10 w-full">
                {[
                  "24/7 multi-region NOC coverage",
                  "Unified telemetry across power and compute",
                  "Capacity provisioning across the footprint",
                  "Customer-facing SLAs at the network tier",
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3daeff]/70 shrink-0" />
                    <span className="text-white/70 text-[13px] leading-relaxed font-medium">{li}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto w-full pt-6 border-t border-white/[0.08] relative z-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">Coverage</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">24/7</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">NOC</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">Single</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-white/35 mb-1.5">SLA</span>
                    <span className="text-[#3daeff] text-base md:text-lg font-bold tracking-tight">Unified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ONE PLATFORM. MANY REGIONS ── */}
      <section className="bg-[#04070f] py-6 md:py-20 lg:py-24 px-4 md:px-6 border-y border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-10 md:mb-20">
            <div className="inline-flex items-center px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
              <div className="w-12 h-[1px] bg-[#3daeff] mr-4" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Network Layers
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-extrabold leading-[1.1] tracking-normal uppercase text-white mb-6 sm:whitespace-nowrap">
              One Platform. <span className="text-[#3daeff]">Many Regions.</span>
            </h2>
            <p className="text-white/40 text-sm md:text-lg leading-relaxed font-medium max-w-[850px]">
              Each site is engineered as a self-sufficient power-and-compute node, then federated into a single{" "}
              <br className="hidden md:inline" />
              operating fabric — so customers get geographic diversity without operational fragmentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden bg-[#070c1a]/40 backdrop-blur-sm">
            {/* Sites */}
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors group">
              <div className="text-[#3daeff] text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Sites</div>
              <h3 className="text-white text-xl md:text-2xl font-bold uppercase mb-6 tracking-tight">Footprint Nodes</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Owned and operated sites in NY, AL and NC anchor the footprint — each selected for power availability and customer proximity.
              </p>
              <ul className="space-y-4">
                {[
                  "North Tonawanda, NY — gas generation node",
                  "Buffalo, NY — urban interconnect",
                  "Columbiana, AL — campus expansion",
                  "Hildebran, NC — mega-site pipeline"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] shadow-[0_0_8px_#3daeff]" />
                    <span className="text-white/70 text-[13.5px] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backbone */}
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors group">
              <div className="text-[#3daeff] text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Backbone</div>
              <h3 className="text-white text-xl md:text-2xl font-bold uppercase mb-6 tracking-tight">Inter-site Fabric</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                A managed backbone links every node — enabling replication, failover and consistent operating posture across regions.
              </p>
              <ul className="space-y-4">
                {[
                  "Diverse-path fiber between regions",
                  "Latency-budgeted routes for AI training",
                  "Replication of customer datasets across sites",
                  "Failover paths for power and connectivity"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] shadow-[0_0_8px_#3daeff]" />
                    <span className="text-white/70 text-[13.5px] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operations */}
            <div className="p-10 md:p-14 hover:bg-white/[0.02] transition-colors group">
              <div className="text-[#3daeff] text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Operations</div>
              <h3 className="text-white text-xl md:text-2xl font-bold uppercase mb-6 tracking-tight">Single Control Plane</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                Network, power and compute are observed and controlled as one — customers get a single contract and a single point of accountability.
              </p>
              <ul className="space-y-4">
                {[
                  "24/7 multi-region NOC coverage",
                  "Unified telemetry across power and compute",
                  "Capacity provisioning across the footprint",
                  "Customer-facing SLAs at the network tier"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] shadow-[0_0_8px_#3daeff]" />
                    <span className="text-white/70 text-[13.5px] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: REACH IS BUILT REGION BY REGION ── */}
      <section className="bg-[#050914] pt-6 md:pt-12 pb-6 md:pb-20 lg:pb-24 px-4 md:px-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-10 md:mb-20">
            <div className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.02] mb-8">
              <div className="w-12 h-[1px] bg-[#3daeff] mr-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Network Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-extrabold leading-[0.95] tracking-tighter uppercase text-white mb-6">
              Reach is Built <span className="text-[#3daeff]">Region by Region.</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-white/50 text-sm md:text-lg leading-relaxed font-medium">
                The USDC network compounds as each new site comes online: more diversity, more capacity, lower customer latency and more revenue per megawatt across the footprint. Federated by design
                <br className="hidden md:inline" /> every node is operationally independent and operationally consistent.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { step: "STEP 01", title: "Discover", desc: "Site selection driven by power, fiber and customer-proximity — not just real estate availability." },
              { step: "STEP 02", title: "Build", desc: "Owned generation and substation control let each node come online without third-party blockers." },
              { step: "STEP 03", title: "Connect", desc: "New sites join the backbone with diverse-path fiber and unified operational tooling." },
              { step: "STEP 04", title: "Operate", desc: "One NOC, one telemetry pane, one accountable team across every region in the footprint." },
            ].map((card, idx) => (
              <div
                key={idx}
                className="relative bg-[#070c1a]/80 p-5 sm:p-8 rounded-[24px] flex flex-col items-start text-left border border-white/10 hover:border-[#3daeff]/40 transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(61,174,255,0.08)] hover:-translate-y-1 group cursor-pointer min-h-[220px] sm:min-h-[300px] overflow-hidden"
              >
                <div className="flex items-center justify-between w-full mb-6 font-mono text-xs font-semibold text-white/35 tracking-wider">
                  {card.step}
                </div>
                <h3 className="text-white group-hover:text-[#3daeff] text-xl font-bold uppercase tracking-tight mb-4 transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-white/50 group-hover:text-white/70 text-[13px] md:text-sm leading-relaxed font-medium transition-colors duration-300">
                  {card.desc}
                </p>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-[#3daeff]/[0.04] to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Grid Bottom Info */}
          <div className="bg-[#070c1a]/60 py-12 px-6 md:py-20 md:px-12 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3daeff]/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "4 Regions", subtitle: "ACTIVE OPERATING REGIONS ACROSS THE US", desc: "DIVERSIFIED POWER PROFILES AND CUSTOMER PROXIMITY." },
                { title: "Diverse Path", subtitle: "INTER-SITE FIBER ENGINEERED", desc: "WITH PHYSICAL ROUTE DIVERSITY FOR REPLICATION AND FAILOVER." },
                { title: "Single NOC", subtitle: "MULTI-REGION OPERATIONS RUN", desc: "FROM A UNIFIED CONTROL PLANE, ONE TEAM, ONE PANE OF GLASS." },
                { title: "400MW+ Pipe", subtitle: "PIPELINE CAPACITY IN DEVELOPMENT", desc: "EXTENDS THE NETWORK INTO NEW CUSTOMER GEOGRAPHIES." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#02050c]/40 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#3daeff]/20 hover:bg-[#02050c]/80 transition-all duration-500 ease-out flex flex-col gap-4"
                >
                  <div className="w-6 h-[2px] bg-[#3daeff] group-hover:w-10 transition-all duration-300" />
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-lg font-bold uppercase tracking-tight">{item.title}</span>
                    <span className="text-[9px] font-black text-white/35 tracking-widest uppercase">{item.subtitle}</span>
                  </div>
                  <p className="text-white/40 text-[11px] font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <PartnerSection />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
