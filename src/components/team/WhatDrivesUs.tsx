"use client";

import React from "react";
import { Zap, Shield, Sun } from "lucide-react";

export default function WhatDrivesUs() {
  return (
    <section className="relative z-10 w-full bg-[#04070f] py-6 md:py-20 lg:py-24 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 text-center select-none">

      {/* ── HEADER ── */}
      <div className="flex flex-col items-center mb-6 md:mb-16 space-y-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
            What Drives Us
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl font-sans uppercase">
          Leadership that turns <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#3daeff] font-extrabold">
            power into compute
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] md:text-[16px] text-white/50 leading-relaxed max-w-3xl font-sans font-normal pt-2">
          Every member of the USDC team shares a single mandate: move infrastructure from
          conception to deployment with uncommon speed, discipline and reliability.
        </p>
      </div>

      {/* ── THREE COLUMN CARD CONTAINER ── */}
      <div className="relative w-full rounded-[24px] border border-white/[0.08] bg-[#050915]/40 backdrop-blur-md shadow-2xl overflow-hidden">

        {/* Ambient backing glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/[0.015] blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] relative z-10">

          {/* Column 1: Speed to deployment */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl border border-[#3daeff]/35 bg-[#3daeff]/5 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#3daeff] stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase font-sans">
                Speed to deployment
              </h3>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal">
              Traditional builds take years. The USDC team converts existing energy assets into
              Tier III HPC capacity in under 4 months for operators who move at the pace
              AI demands.
            </p>
          </div>

          {/* Column 2: Operational rigor */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl border border-[#3daeff]/25 bg-[#3daeff]/5 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#3daeff] stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase font-sans">
                Operational rigor
              </h3>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal">
              Tier III standards and 99.99% reliability maintained by a team with decades in
              mission-critical facility engineering, power systems and concurrent maintainability.
            </p>
          </div>

          {/* Column 3: Technical edge */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl border border-[#3daeff]/25 bg-[#3daeff]/5 flex items-center justify-center flex-shrink-0">
                <Sun className="w-5 h-5 text-[#3daeff] stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase font-sans">
                Technical edge
              </h3>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed font-normal">
              Pioneering direct-to-chip liquid cooling and the proprietary ARMS 200 modular
              platform engineered for ultra-dense NVIDIA GPU clusters from day one.
            </p>
          </div>

        </div>

        {/* Tech Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/10 rounded-tl-[24px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/10 rounded-br-[24px] pointer-events-none" />
      </div>

    </section>
  );
}
