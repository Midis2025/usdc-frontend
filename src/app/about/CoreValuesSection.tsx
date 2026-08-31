"use client";

import React from "react";
import { Zap, Shield, Flag, Cpu, Leaf, Rocket } from "lucide-react";

export default function CoreValuesSection() {
  const coreValues = [
    {
      id: 1,
      title: "POWER FIRST",
      description: "We own and operate the energy stack, including generation, substations and high-density facilities, to ensure customers do not have to wait on the grid.",
      icon: Zap,
    },
    {
      id: 2,
      title: "SOVEREIGN COMPUTE",
      description: "We provide dedicated, single-tenant infrastructure with no virtualization tax or \"noisy neighbors,\" allowing customers full control over their models and hardware.",
      icon: Shield,
    },
    {
      id: 3,
      title: "BUILT IN THE U.S.",
      description: "We focus on a domestic supply chain and U.S.-sited facilities, with a 400MW+ development pipeline to keep AI workloads on American soil.",
      icon: Flag,
    },
    {
      id: 4,
      title: "ENGINEERED FOR SUPERINTELLIGENCE",
      description: "We utilize liquid-cooled racks, 400 Gb/s fabric and modular factory builds designed specifically for the next generation of frontier AI models.",
      icon: Cpu,
    },
    {
      id: 5,
      title: "DYNAMIC GRID BALANCING",
      description: "We balance regional grids by operating dynamically to support utility networks while preserving compute consistency.",
      icon: Leaf,
    },
    {
      id: 6,
      title: "ACCELERATED DEPLOYMENT",
      description: "We compress development timelines from years to less than 4 months, converting underutilized energy assets into Tier III GPU capacity.",
      icon: Rocket,
    },
  ];

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] text-white py-6 md:py-14 border-t border-white/[0.03] select-none">
      
      {/* Ambient backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ── Header Section ── */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-14">
          
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-white leading-tight mb-6 font-sans">
            Our Core <span className="text-[#3daeff]">Values</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/50 max-w-[600px] leading-relaxed font-normal font-sans">
            These principles guide every decision we make and shape our company culture
          </p>
        </div>

        {/* ── Values Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreValues.map((value) => {
            const IconComponent = value.icon;
            return (
              <div
                key={value.id}
                className="group relative p-8 rounded-[16px] bg-gradient-to-br from-[#0a0e1a]/50 to-[#051620]/30 border border-[#3daeff]/20 hover:border-[#3daeff]/50 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_48px_rgba(61,174,255,0.1)]"
              >
                {/* Header (Icon + Title) */}
                <div className="flex items-center gap-4 mb-5">
                  {/* Icon Container */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#3daeff]/20 to-[#3daeff]/5 border border-[#3daeff]/30 group-hover:border-[#3daeff]/60 group-hover:bg-[#3daeff]/30 transition-all duration-300 shrink-0">
                    <IconComponent className="w-6 h-6 text-[#3daeff] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[13px] md:text-[12px] font-black uppercase tracking-[0.16em] text-white/95 leading-snug font-sans">
                    {value.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[12.5px] text-white/50 leading-relaxed font-normal font-sans">
                  {value.description}
                </p>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-[#3daeff]/0 to-[#3daeff]/0 group-hover:from-[#3daeff]/5 group-hover:to-[#3daeff]/0 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
