"use client";

import React from "react";
import Image from "next/image";

export default function WaterFreeCooling() {

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] text-white">
      {/* ── Top decorative line matching other sections ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />


      <div className="wfc-root relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 select-none">

        {/* ═════════ SPLIT: CONTENT LEFT / IMAGE RIGHT ═════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/65 tracking-[0.22em] uppercase font-sans">
                COOLING WITHOUT WATER CONSUMPTION
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-[34px] sm:text-[44px] md:text-[48px] lg:text-[52px] leading-[1.06] font-extrabold tracking-[-0.02em] text-white mb-6">
              Water-Free Cooling for{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#3daeff]">
                High-Density Compute.
              </span>
            </h2>

            {/* Paragraphs */}
            <p className="text-[#a0aec0] text-[14px] sm:text-[15px] leading-[1.75] mb-4 max-w-[520px] font-normal">
              Our modular data center solution is designed to operate without evaporative cooling, eliminating the continuous water consumption associated with traditional data center cooling systems.
            </p>
            <p className="text-[#a0aec0] text-[14px] sm:text-[15px] leading-[1.75] max-w-[520px] font-normal">
              Using a closed-loop liquid cooling architecture, coolant is continuously recirculated through the system rather than consumed. This enables highly efficient heat removal while requiring no ongoing water consumption for cooling.
            </p>

          </div>

          {/* RIGHT: Cooling System Image */}
          <div className="relative rounded-2xl overflow-hidden group">
            <Image
              src="/water-free-cooling.png"
              alt="USDC Closed-Loop Liquid Cooling System — High-density compute racks with closed loop recirculating coolant and zero water consumption"
              width={1200}
              height={800}
              sizes="(max-width: 1200px) 100vw, 1140px"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority={false}
            />
          </div>

        </div>

        {/* ═════════ KEY BENEFITS RESULT BANNER (EXACT MATCH) ═════════ */}
        <div className="mt-16 md:mt-20 border border-white/[0.08] rounded-2xl bg-gradient-to-b from-[#070d1d]/90 via-[#050914]/95 to-[#02050c]/90 p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.04)]">
          {/* Ambient inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[150px] bg-blue-500/[0.05] rounded-full blur-[70px] pointer-events-none" />

          {/* Top accent bar */}
          <div className="w-12 h-[2.5px] bg-[#3daeff] rounded-full mx-auto mb-6 shadow-[0_0_10px_rgba(61,174,255,0.8)] relative z-10" />

          {/* Headline */}
          <h3 className="text-[20px] sm:text-[25px] md:text-[28px] font-bold text-center text-white mb-10 md:mb-12 max-w-[850px] mx-auto leading-[1.3] tracking-[-0.01em] relative z-10">
            The result is a more{" "}
            <span className="text-[#3daeff]">
              environmentally responsible infrastructure platform
            </span>{" "}
            with:
          </h3>

          {/* 5 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.08] relative z-10">
            {/* Item 1: No evaporative cooling */}
            <div className="flex flex-col items-center text-center px-4 py-1 group">
              <div className="w-[66px] h-[66px] rounded-full border border-[#3daeff]/35 bg-[#3daeff]/[0.06] flex items-center justify-center text-[#3daeff] shadow-[0_0_20px_rgba(61,174,255,0.1)] group-hover:scale-105 group-hover:border-[#3daeff]/60 group-hover:shadow-[0_0_25px_rgba(61,174,255,0.25)] transition-all duration-300">
                <svg className="w-7 h-7 text-[#3daeff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  <line x1="4" y1="4" x2="20" y2="20" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="w-5 h-[1.5px] bg-[#3daeff]/70 rounded-full my-3.5 block" />
              <p className="text-[13px] sm:text-[14px] leading-[1.4] text-white/90 font-medium max-w-[170px] m-0">
                No evaporative cooling
              </p>
            </div>

            {/* Item 2: No ongoing water consumption for cooling */}
            <div className="flex flex-col items-center text-center px-4 py-1 group">
              <div className="w-[66px] h-[66px] rounded-full border border-[#3daeff]/35 bg-[#3daeff]/[0.06] flex items-center justify-center text-[#3daeff] shadow-[0_0_20px_rgba(61,174,255,0.1)] group-hover:scale-105 group-hover:border-[#3daeff]/60 group-hover:shadow-[0_0_25px_rgba(61,174,255,0.25)] transition-all duration-300">
                <svg className="w-7 h-7 text-[#3daeff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="w-5 h-[1.5px] bg-[#3daeff]/70 rounded-full my-3.5 block" />
              <p className="text-[13px] sm:text-[14px] leading-[1.4] text-white/90 font-medium max-w-[170px] m-0">
                No ongoing water consumption for cooling
              </p>
            </div>

            {/* Item 3: Closed-loop liquid cooling */}
            <div className="flex flex-col items-center text-center px-4 py-1 group">
              <div className="w-[66px] h-[66px] rounded-full border border-[#3daeff]/35 bg-[#3daeff]/[0.06] flex items-center justify-center text-[#3daeff] shadow-[0_0_20px_rgba(61,174,255,0.1)] group-hover:scale-105 group-hover:border-[#3daeff]/60 group-hover:shadow-[0_0_25px_rgba(61,174,255,0.25)] transition-all duration-300">
                <svg className="w-7 h-7 text-[#3daeff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M21 21v-5h-5" />
                </svg>
              </div>
              <span className="w-5 h-[1.5px] bg-[#3daeff]/70 rounded-full my-3.5 block" />
              <p className="text-[13px] sm:text-[14px] leading-[1.4] text-white/90 font-medium max-w-[170px] m-0">
                Closed-loop liquid cooling
              </p>
            </div>

            {/* Item 4: Reduced environmental impact */}
            <div className="flex flex-col items-center text-center px-4 py-1 group">
              <div className="w-[66px] h-[66px] rounded-full border border-[#3daeff]/35 bg-[#3daeff]/[0.06] flex items-center justify-center text-[#3daeff] shadow-[0_0_20px_rgba(61,174,255,0.1)] group-hover:scale-105 group-hover:border-[#3daeff]/60 group-hover:shadow-[0_0_25px_rgba(61,174,255,0.25)] transition-all duration-300">
                <svg className="w-7 h-7 text-[#3daeff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2-1.3 7.3-6.5 8.8-9 8.8z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6" />
                </svg>
              </div>
              <span className="w-5 h-[1.5px] bg-[#3daeff]/70 rounded-full my-3.5 block" />
              <p className="text-[13px] sm:text-[14px] leading-[1.4] text-white/90 font-medium max-w-[170px] m-0">
                Reduced environmental impact
              </p>
            </div>

            {/* Item 5: Greater deployment flexibility */}
            <div className="flex flex-col items-center text-center px-4 py-1 group">
              <div className="w-[66px] h-[66px] rounded-full border border-[#3daeff]/35 bg-[#3daeff]/[0.06] flex items-center justify-center text-[#3daeff] shadow-[0_0_20px_rgba(61,174,255,0.1)] group-hover:scale-105 group-hover:border-[#3daeff]/60 group-hover:shadow-[0_0_25px_rgba(61,174,255,0.25)] transition-all duration-300">
                <svg className="w-7 h-7 text-[#3daeff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="w-5 h-[1.5px] bg-[#3daeff]/70 rounded-full my-3.5 block" />
              <p className="text-[13px] sm:text-[14px] leading-[1.4] text-white/90 font-medium max-w-[170px] m-0">
                Greater deployment flexibility in water-constrained regions
              </p>
            </div>
          </div>
        </div>

        {/* ═════════ BOTTOM CALLOUT LINE UNDER CARD ═════════ */}
        <div className="mt-8 md:mt-10 text-center max-w-[860px] mx-auto px-4">
          <p className="text-[#a0aec0] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] font-normal m-0">
            By eliminating reliance on evaporative cooling, our modular platform delivers high-density AI and HPC cooling without placing additional demand on local water resources.
          </p>
        </div>

      </div>
    </section>
  );
}
