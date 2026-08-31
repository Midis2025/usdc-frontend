"use client";

import React from "react";
import Link from "next/link";
import { Building2, Zap, ArrowRight } from "lucide-react";
import WaveBackground from "@/components/WaveBackground";

export default function PartnerSection() {

  return (
    <section className="w-full bg-[#04070f] py-6 md:py-12 px-6 md:px-12 lg:px-16 select-none overflow-hidden">
      {/* ── Centered Bordered Card Section Wrapper ── */}
      <div className="relative w-full max-w-[1280px] mx-auto rounded-[24px] border border-[#3daeff]/40 bg-[#04070f] overflow-hidden p-5 sm:p-12 md:p-14 lg:p-10 xl:p-16 min-h-[500px] shadow-[0_0_50px_rgba(61,174,255,0.06)]">

        {/* ── Ambient Background Glows inside the card ── */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        {/* ── Wave Background (Three.js WebGL animation) inside the card ── */}
        <WaveBackground />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ══════ LEFT COLUMN: Heading & Copy ══════ */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-6">
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-black tracking-[0.25em] text-white/95 uppercase">
                PARTNER WITH US
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[26px] sm:text-[40px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px] font-black tracking-tight leading-[1.1] text-white font-sans uppercase">
              READY TO OWN THE <span className="text-[#3daeff]">AI INFRASTRUCTURE</span> LAYER?
            </h2>

            {/* Subtext */}
            <p className="text-[13.5px] md:text-[14.5px] text-white/50 font-normal leading-[1.8] max-w-[500px] mt-6 font-sans">
              Whether you need co-location, a turnkey data center build, or bare-metal <br className="hidden xl:inline" />
              GPU compute - USDC provides the infrastructure, the scale <br className="hidden xl:inline" />
              and the team to deliver.
            </p>
          </div>

          {/* ══════ RIGHT COLUMN: Glassmorphic Details Card ══════ */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[520px] rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-10 lg:p-8 xl:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

              {/* Header inside card */}
              <div className="border-b border-[#3daeff]/30 pb-6 mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase leading-tight font-sans">
                  BUILD THE FUTURE.
                </h3>
                <h4 className="text-xl sm:text-2xl font-black text-[#3daeff] tracking-wide uppercase leading-tight mt-1 font-sans">
                  POWER THE INTELLIGENCE ERA.
                </h4>
              </div>

              {/* List of features */}
              <div className="flex flex-col gap-6 mb-8">
                {/* Feature 1: Scale */}
                <div className="flex items-start gap-4 border-b border-white/[0.07] pb-6">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] text-white flex-shrink-0">
                    <Building2 className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-[#3daeff] tracking-wider uppercase mb-1">
                      SCALE WITHOUT LIMITS
                    </span>
                    <span className="text-[12px] text-white/50 leading-relaxed font-normal">
                      Purpose-built facilities designed to grow with your ambitions.
                    </span>
                  </div>
                </div>

                {/* Feature 2: Performance */}
                <div className="flex items-start gap-4 border-b border-white/[0.07] pb-6">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] text-white flex-shrink-0">
                    <Zap className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-[#3daeff] tracking-wider uppercase mb-1">
                      PERFORMANCE WITHOUT COMPROMISE
                    </span>
                    <span className="text-[12px] text-white/50 leading-relaxed font-normal">
                      High-density power, advanced cooling and elite connectivity <br /> for AI at scale.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3.5 sm:gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[11px] font-black tracking-wider uppercase rounded-lg transition-all duration-200"
                >
                  <span>TALK TO OUR TEAM</span>
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-2.5 h-2.5" strokeWidth={3} />
                  </div>
                </Link>

                <a
                  href="/usdc-deck.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 px-5 py-3.5 border border-white/15 hover:border-white/40 bg-transparent text-white text-[11px] font-black tracking-wider uppercase rounded-lg transition-all duration-200"
                >
                  <span>VIEW DECK</span>
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white/25 text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-2.5 h-2.5" strokeWidth={3} />
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
