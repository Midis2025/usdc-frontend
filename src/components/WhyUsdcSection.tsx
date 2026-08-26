"use client";

import React from "react";
import Image from "next/image";
import { Zap, Rocket, TrendingDown, Server } from "lucide-react";

export default function WhyUsdcSection() {
  const cards = [
    {
      title: "POWER + DATA CENTER",
      titleLine1: "POWER + DATA",
      titleLine2: "CENTER",
      desc: (
        <>
          Infrastructure strategy starts with energy access and site <br className="hidden sm:inline" /> capacity not with a leased building.
        </>
      ),
      Icon: Zap,
    },
    {
      title: "FASTER DEPLOYMENT",
      titleLine1: "FASTER",
      titleLine2: "DEPLOYMENT",
      desc: "Existing electrical infrastructure and approved load studies compress development timelines.",
      Icon: Rocket,
    },
    {
      title: "LOWER OPEX",
      titleLine1: "LOWER",
      titleLine2: "OPEX",
      desc: "~$0.04/kWh low-cost power visibility supports better long-term AI infrastructure economics.",
      Icon: TrendingDown,
    },
    {
      title: "AI / HPC READY",
      titleLine1: "AI / HPC",
      titleLine2: "READY",
      desc: "Designed for 200kW+ rack densities and liquid-cooled accelerator clusters not legacy workloads.",
      Icon: Server,
    },
  ];

  return (
    <section className="w-full relative overflow-hidden bg-[#010412] pt-10 md:pt-12 pb-10 md:pb-20 border-t border-white/[0.03] select-none">
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Ambient center glow */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[70%] h-[30%] bg-blue-500/[0.04] rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-[#02050c]/80 mb-8">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-white/90 uppercase font-sans">
            WHY USDC
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[32px] sm:text-[46px] md:text-[54px] lg:text-[60px] font-black tracking-tight leading-[0.95] text-white uppercase font-sans mb-8 mx-auto">
          THE ADVANTAGE IS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-[#0091ff]">
            INTEGRATED INFRASTRUCTURE.
          </span>
        </h2>

        {/* Description */}
        <p className="text-[14px] md:text-[15px] text-white/50 font-normal leading-[1.7] max-w-[660px] mb-14 font-sans mx-auto">
          The strongest data center story is not only the room. It is the integration of power generation, site control, direct liquid cooling, network access and deployment speed - owned at every layer.
        </p>

        {/* Card and Schematic Layout Wrapper */}
        <div className="relative w-full flex flex-col items-center">

          {/* ── 4-COLUMN GLASSMORPHIC CARD ── */}
          <div className="w-full relative z-20 rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="w-full bg-[#02050c]/85 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              {cards.map((card, idx) => {
                const Icon = card.Icon;
                return (
                  <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-8 py-6 md:py-2">
                    {/* Circular Icon Container */}
                    <div className="w-12 h-12 rounded-full border border-[#3daeff]/35 bg-[#3daeff]/5 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[#3daeff]" />
                    </div>
                    {/* Column Titles */}
                    <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-white tracking-[0.15em] uppercase font-sans mb-3 min-h-[40px] flex flex-col justify-center">
                      <span className="block">{card.titleLine1}</span>
                      <span className="block">{card.titleLine2}</span>
                    </h3>
                    {/* Description text */}
                    <p className="text-[11px] sm:text-xs md:text-[12.5px] text-white/45 leading-[1.65] font-sans font-normal">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── ISOMETRIC FACILITY SCHEMATIC MAP ── */}
      <div className="w-full relative z-10 flex justify-center mt-12">
        <div className="relative w-full overflow-hidden">

          <Image
            src="/why_usdc_schematic.avif"
            alt="USDC Campus Site Schematic Layout"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain filter drop-shadow-[0_0_40px_rgba(61,174,255,0.12)] opacity-90 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,white_70%,transparent_100%)]"
          />
          {/* Absolute gradient overlays to blend the image boundaries seamlessly with the section background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#010412] via-transparent to-[#010412] pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010412] via-transparent to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010412] via-transparent to-[#010412] pointer-events-none z-20 opacity-95" />
        </div>
      </div>
    </section>
  );
}
