"use client";

import React from "react";

export default function FacilitySpecification() {
  const specRows = [
    {
      layer: "POWER DENSITY",
      direction: "High-density rack architecture targeting AI/HPC accelerator loads",
      spec: "200KW+ PER CABINET",
    },
    {
      layer: "COOLING",
      direction: "Direct liquid-to-chip heat rejection and closed-loop cooling architecture",
      spec: "PUE TARGET <1.3",
    },
    {
      layer: "NETWORK",
      direction: "Low-latency fabric with carrier-neutral interconnect access",
      spec: "400G FABRIC CAPABLE",
    },
    {
      layer: "OPERATIONS",
      direction: "24/7 NOC monitoring, remote hands, biometric access control",
      spec: "TIER III DESIGN PATH",
    },
    {
      layer: "POWER BASE",
      direction: "Owned generation and utility-connected sites across the U.S. footprint",
      spec: "400MW+ OWNED & PIPELINE",
    },
    {
      layer: "CONNECTIVITY",
      direction: "Diverse carrier access and dark fiber pathway",
      spec: "MULTI-CARRIER READY",
    },
  ];

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] pt-10 md:pt-12 pb-10 md:pb-20 border-t border-white/[0.03]">
      {/* Deep ambient background glows matching the reference image */}
      <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Glow element placed directly behind the card to create the center backdrop aura */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%] h-[40%] bg-blue-500/[0.05] rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">
        {/* Header Capsule Badge with precise styling */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-[#02050c]/80 mb-8">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-white/90 uppercase font-sans">
            TECHNICAL SPECIFICATION
          </span>
        </div>

        {/* Huge Heading - pixel perfect typography and leading */}
        <h2 className="text-[38px] sm:text-[46px] md:text-[56px] lg:text-[56px] font-black tracking-tight leading-[0.92] text-white uppercase font-sans mb-8 mx-auto">
          FULL-STACK FACILITY{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-[#0091ff]">
            SPECIFICATION.
          </span>
        </h2>

        {/* Description */}
        <p className="text-[14px] md:text-[15px] text-white/50 font-normal leading-[1.7] max-w-[620px] mb-14 font-sans mx-auto">
          From incoming utility to GPU rack output - each layer of the facility is <br className="hidden sm:inline" />
          designed with AI workload performance as the primary constraint.
        </p>

        {/* Premium Glassmorphic Table Card Container */}
        <div className="w-full relative rounded-2xl p-[1px] bg-gradient-to-b from-[#3daeff]/35 via-white/[0.05] to-[#3daeff]/5 shadow-[0_0_60px_rgba(61,174,255,0.04)] overflow-hidden">
          <div className="w-full bg-[#02050c]/90 rounded-2xl p-6 md:p-12 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.4] pointer-events-none mix-blend-screen"
              style={{ backgroundImage: "url('/bg.webp')" }}
            />
            <div className="w-full overflow-x-auto scrollbar-thin">
              <div className="min-w-[640px] md:min-w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="pb-5 text-[10px] font-bold text-white/40 tracking-[0.25em] uppercase font-sans w-1/4">
                        LAYER
                      </th>
                      <th className="pb-5 text-[10px] font-bold text-white/40 tracking-[0.25em] uppercase font-sans w-1/2">
                        DESIGN DIRECTION
                      </th>
                      <th className="pb-5 text-[10px] font-bold text-white/40 tracking-[0.25em] uppercase font-sans w-1/4">
                        SPECIFICATION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-transparent">
                        {/* Layer column with blue line underline matching text width */}
                        <td className="py-6 align-top">
                          <div className="inline-block border-b-[2px] border-[#3daeff] pb-1.5">
                            <span className="text-[12px] md:text-[13px] font-bold text-white tracking-widest uppercase font-sans">
                              {row.layer}
                            </span>
                          </div>
                        </td>

                        {/* Design direction column - muted gray and readable */}
                        <td className="py-6 text-[12.5px] md:text-[13.5px] text-white/60 font-normal leading-relaxed align-top pr-8 font-sans">
                          {row.direction}
                        </td>

                        {/* Specification column with blue line underline matching text width */}
                        <td className="py-6 align-top">
                          <div className="inline-block border-b-[2px] border-[#3daeff] pb-1.5">
                            <span className="text-[12px] md:text-[13px] font-bold text-white tracking-widest uppercase font-sans">
                              {row.spec}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

