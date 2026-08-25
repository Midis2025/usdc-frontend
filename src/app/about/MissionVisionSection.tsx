"use client";

import React from "react";

export default function MissionVisionSection() {
  const infrastructureStack = [
    "AI APPLICATIONS",
    "COOLING & NETWORK",
    "POWER INFRASTRUCTURE",
    "AI APPLICATIONS",
  ];

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] text-white py-6 md:py-14 border-t border-white/[0.03] select-none">
      
      {/* Ambient backgrounds */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Main Grid Layout: Mission | Infrastructure Stack | Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          
          {/* ── LEFT: MISSION BOX ── */}
          <div className="flex flex-col justify-center">
            <div className="relative p-8 md:p-10 rounded-[20px] bg-gradient-to-br from-[#02050c]/60 to-[#0a0e1a]/40 border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.3)]">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-3 h-[2px] bg-[#3daeff] rounded-full" />
                <span className="text-[9px] font-bold text-[#3daeff] tracking-[0.15em] uppercase">
                  Mission
                </span>
              </div>

              {/* Main Title */}
              <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-[28px] font-bold text-white leading-tight mb-4 font-sans">
                Accelerate AI <br />
                Deployment
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[12.5px] text-white/60 leading-relaxed font-normal font-sans">
                Build AI-ready infrastructure faster <br />
                than traditional operators through <br />energy-first development.
              </p>

            </div>
          </div>

          {/* ── CENTER: INFRASTRUCTURE STACK ── */}
          <div className="flex flex-col justify-center items-center gap-3">
            {infrastructureStack.map((item, index) => (
              <div
                key={index}
                className="w-full px-4 py-4 md:py-3.5 rounded-[12px] border border-white/[0.12] bg-gradient-to-r from-[#0a0e1a]/70 to-[#051620]/70 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:border-[#3daeff]/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-[11px] md:text-[10px] font-bold text-white/90 tracking-[0.12em] uppercase text-center block">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT: VISION BOX ── */}
          <div className="flex flex-col justify-center">
            <div className="relative p-8 md:p-10 rounded-[20px] bg-gradient-to-br from-[#02050c]/60 to-[#0a0e1a]/40 border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.3)]">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-3 h-[2px] bg-[#3daeff] rounded-full" />
                <span className="text-[9px] font-bold text-[#3daeff] tracking-[0.15em] uppercase">
                  Vision
                </span>
              </div>

              {/* Main Title */}
              <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-[28px] font-bold text-white leading-tight mb-4 font-sans">
                The Infrastructure <br />
                Platform
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[12.5px] text-white/60 leading-relaxed font-normal font-sans">
                Create a global ecosystem connecting power, infrastructure and compute.
              </p>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
