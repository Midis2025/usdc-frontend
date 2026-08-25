"use client";

import React from "react";



export default function AboutStory() {
  const timelineEvents = [
    {
      year: "2023",
      title: "SITE ACQUISITION",
      desc: "Identified key energy assets with long-term potential and strategic infrastructure value.",
    },
    {
      year: "2024",
      title: "INFRASTRUCTURE DESIGN",
      desc: "Completed site evaluations and designed Tier III-ready infrastructure.",
    },
    {
      year: "2025",
      title: "AI EXPANSION",
      desc: "Deployed ARMS 200 platform and enabled GPU-ready compute environments.",
    },
    {
      year: "2026",
      title: "OPERATIONAL DEPLOYMENT",
      desc: "Scaled infrastructure capacity and accelerated enterprise AI workloads.",
    },
    {
      year: "+2030",
      title: "200MW+ POTENTIAL CAPACITY",
      desc: "Expanding multi-site infrastructure network to support national-scale AI growth.",
    },
  ];

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] text-white py-24 border-t border-white/[0.03] select-none">
      
      {/* Ambient backgrounds */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ── Header Area ── */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/80 tracking-[0.2em] uppercase font-sans">
              Our Story
            </span>
          </div>

          {/* Heading Title */}
          <h2 className="text-4xl sm:text-5xl md:text-[52px] font-bold tracking-tight text-white leading-[1.1] mb-6 font-sans">
            From Energy Assets To <br />
            <span className="text-[#3daeff]">AI Infrastructure</span>
          </h2>

          {/* Subtitle Description */}
          <p className="text-sm md:text-base text-white/50 max-w-[700px] leading-relaxed font-normal font-sans">
            USDC identifies and transforms underutilized energy assets into enterprise-grade AI infrastructure.
            By combining power, cooling, networking and compute, we accelerate deployment timelines from years to months.
          </p>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: 3D Stack Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[480px] h-[420px] sm:h-[480px] md:h-[520px] overflow-hidden">
           
            </div>
          </div>

          {/* Center Column: Vertical Timeline Connector (Desktop Only) */}
          <div className="hidden lg:col-span-1 lg:flex justify-center py-4 relative">
            <div className="w-[1.5px] h-full bg-gradient-to-b from-[#3daeff] via-blue-500/30 to-blue-500/5 flex justify-center">
              <div className="absolute top-[8%] w-2.5 h-2.5 rounded-full bg-[#3daeff] shadow-[0_0_12px_#3daeff] animate-pulse" />
            </div>
          </div>

          {/* Right Column: Timeline Events List */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-6 md:gap-8 border-b border-white/[0.06] pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0"
              >
                {/* Year Label */}
                <span className="text-3xl md:text-[40px] font-extrabold text-[#3daeff] tracking-tight min-w-[85px] md:min-w-[120px] leading-none">
                  {event.year}
                </span>

                {/* Text Content */}
                <div className="flex flex-col text-left">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/95 leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-[12.5px] text-white/45 leading-relaxed mt-2.5 max-w-[340px] font-medium font-sans">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
