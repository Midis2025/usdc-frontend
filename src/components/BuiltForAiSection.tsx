"use client";

import React from "react";

export default function BuiltForAiSection() {
  return (
    <section className="w-full bg-[#04070f] py-10 md:py-20 lg:py-28 select-none relative overflow-hidden border-t border-white/[0.03]">
      {/* Ambient background glows */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-sky-500/[0.02] rounded-full blur-[130px] pointer-events-none" />

      {/* Style inject for animation classes */}
      <style>{`
        @keyframes blinkLight {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        .animate-led-blink {
          animation: blinkLight 1.6s ease-in-out infinite;
        }
        @keyframes pathFlow {
          to { stroke-dashoffset: -30; }
        }
        .animate-coolant-flow {
          stroke-dasharray: 6, 4;
          animation: pathFlow 1.8s linear infinite;
        }
        @keyframes heatFlow {
          to { stroke-dashoffset: 20; }
        }
        .animate-heat-rise {
          stroke-dasharray: 4, 4;
          animation: heatFlow 1.4s linear infinite;
        }
        @keyframes dataFlow {
          to { stroke-dashoffset: -40; }
        }
        .animate-data-flow {
          stroke-dasharray: 4, 6;
          animation: dataFlow 1s linear infinite;
        }
        @keyframes gpuGlow {
          0%, 100% { opacity: 0.4; fill: rgba(61,174,255,0.2); }
          50% { opacity: 1; fill: rgba(61,174,255,0.5); }
        }
        .animate-gpu-glow {
          animation: gpuGlow 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="text-center max-w-[800px] mx-auto mb-10 md:mb-16">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#02050c]/60 mb-6">
            <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-black tracking-[0.25em] text-white/95 uppercase font-sans">
              ENGINEERED FOR AI WORKLOADS
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[36px] sm:text-[44px] md:text-[52px] font-black tracking-tight leading-[1.1] text-white font-sans uppercase mb-6">
            BUILT FOR AI, <br />
            <span className="text-[#3daeff]">NOT RETROFITTED.</span>
          </h2>

          {/* Excerpt */}
          <p className="text-[14px] md:text-[15px] text-white/50 font-normal leading-[1.8] font-sans">
            Every USDC facility is designed around AI workloads from day one, integrating
            power, cooling, networking and compute into one purpose-built infrastructure platform.
          </p>
        </div>

        {/* ── 3-COLUMN LAYER GRID ── */}
        <div className="w-full rounded-[20px] border border-white/[0.08] bg-[#050b18]/25 backdrop-blur-sm overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* ══════ COLUMN 1: LAYER 1 — GPU-DENSE ROW ARCHITECTURE ══════ */}
            <div className="group relative w-full h-[500px] sm:h-[520px] md:h-[540px] border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 transition-all duration-500 cursor-pointer overflow-hidden bg-transparent">
              {/* Default Face View (Model & Title Header) */}
              <div className="p-8 sm:p-10 flex flex-col justify-between items-start w-full h-full transition-all duration-500 group-hover:opacity-10 group-hover:scale-95">
                {/* Header */}
                <div className="w-full flex flex-col items-start">
                  <span className="text-[9px] font-black text-white/45 tracking-[0.18em] uppercase">LAYER 1</span>
                  <span className="text-[13px] font-black text-[#3daeff] tracking-wider uppercase mt-1">GPU-DENSE ROW ARCHITECTURE</span>
                </div>

                {/* SVG Visual Model Container */}
                <div className="w-full flex-grow flex items-center justify-center py-4">
                  <div className="w-full h-[200px] flex items-center justify-center bg-white/[0.01] rounded-xl border border-white/[0.03] overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Perspective Aisle Grid Floor */}
                      {/* Horizon line */}
                      <line x1="15" y1="52" x2="265" y2="52" stroke="#3daeff" strokeWidth="0.8" opacity="0.15" />
                      
                      {/* Floor grid radiating lines from vanishing point (140, 52) */}
                      <line x1="140" y1="52" x2="15" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.15" />
                      <line x1="140" y1="52" x2="70" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="140" y1="52" x2="110" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="140" y1="52" x2="140" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.15" />
                      <line x1="140" y1="52" x2="170" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="140" y1="52" x2="210" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="140" y1="52" x2="265" y2="145" stroke="#3daeff" strokeWidth="0.8" opacity="0.15" />

                      {/* Floor grid horizontal depth lines */}
                      <line x1="110" y1="58" x2="170" y2="58" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="95" y1="66" x2="185" y2="66" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="77" y1="78" x2="203" y2="78" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="55" y1="95" x2="225" y2="95" stroke="#3daeff" strokeWidth="0.8" opacity="0.1" />
                      <line x1="30" y1="118" x2="250" y2="118" stroke="#3daeff" strokeWidth="0.8" opacity="0.15" />

                      {/* Left Server Rack Row */}
                      {/* Outline */}
                      <polygon points="15,15 110,52 110,108 15,145" stroke="#3daeff" strokeWidth="1.2" fill="#04070f" />
                      {/* Cabinet separators */}
                      <line x1="45" y1="26.6" x2="45" y2="133.4" stroke="#3daeff" strokeWidth="0.8" opacity="0.4" />
                      <line x1="78" y1="39.5" x2="78" y2="120.5" stroke="#3daeff" strokeWidth="0.8" opacity="0.4" />
                      
                      {/* Rack 1 Server slots */}
                      <line x1="15" y1="35" x2="45" y2="42" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="15" y1="55" x2="45" y2="59" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="15" y1="75" x2="45" y2="76" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="15" y1="95" x2="45" y2="93" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="15" y1="115" x2="45" y2="110" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="15" y1="130" x2="45" y2="123" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />

                      {/* Rack 2 Server slots */}
                      <line x1="45" y1="42" x2="78" y2="52" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="45" y1="59" x2="78" y2="66" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="45" y1="76" x2="78" y2="80" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="45" y1="93" x2="78" y2="94" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="45" y1="110" x2="78" y2="107" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="45" y1="123" x2="78" y2="116" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />

                      {/* Rack 3 Server slots */}
                      <line x1="78" y1="52" x2="110" y2="61" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="78" y1="66" x2="110" y2="71" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="78" y1="80" x2="110" y2="82" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="78" y1="94" x2="110" y2="93" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="78" y1="107" x2="110" y2="102" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />

                      {/* Right Server Rack Row */}
                      {/* Outline */}
                      <polygon points="265,15 170,52 170,108 265,145" stroke="#3daeff" strokeWidth="1.2" fill="#04070f" />
                      {/* Cabinet separators */}
                      <line x1="235" y1="26.6" x2="235" y2="133.4" stroke="#3daeff" strokeWidth="0.8" opacity="0.4" />
                      <line x1="202" y1="39.5" x2="202" y2="120.5" stroke="#3daeff" strokeWidth="0.8" opacity="0.4" />

                      {/* Rack 1 Server slots */}
                      <line x1="265" y1="35" x2="235" y2="42" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="265" y1="55" x2="235" y2="59" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="265" y1="75" x2="235" y2="76" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="265" y1="95" x2="235" y2="93" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="265" y1="115" x2="235" y2="110" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="265" y1="130" x2="235" y2="123" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />

                      {/* Rack 2 Server slots */}
                      <line x1="235" y1="42" x2="202" y2="52" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="235" y1="59" x2="202" y2="66" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="235" y1="76" x2="202" y2="80" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="235" y1="93" x2="202" y2="94" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="235" y1="110" x2="202" y2="107" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="235" y1="123" x2="202" y2="116" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />

                      {/* Rack 3 Server slots */}
                      <line x1="202" y1="52" x2="170" y2="61" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="202" y1="66" x2="170" y2="71" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="202" y1="80" x2="170" y2="82" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="202" y1="94" x2="170" y2="93" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="202" y1="107" x2="170" y2="102" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />

                      {/* Telemetry Indicator Blinking Lights */}
                      {/* Left side LEDs */}
                      <circle cx="20" cy="45" r="1" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.1s" }} />
                      <circle cx="25" cy="46" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.5s" }} />
                      <circle cx="20" cy="85" r="1" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.9s" }} />
                      <circle cx="35" cy="65" r="1.1" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.3s" }} />
                      <circle cx="38" cy="105" r="0.9" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.7s" }} />
                      <circle cx="55" cy="60" r="1" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.4s" }} />
                      <circle cx="65" cy="80" r="0.8" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.8s" }} />
                      <circle cx="90" cy="70" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.2s" }} />

                      {/* Right side LEDs */}
                      <circle cx="260" cy="45" r="1" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.2s" }} />
                      <circle cx="255" cy="46" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.6s" }} />
                      <circle cx="260" cy="85" r="1" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "1.0s" }} />
                      <circle cx="245" cy="65" r="1.1" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.4s" }} />
                      <circle cx="242" cy="105" r="0.9" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.8s" }} />
                      <circle cx="225" cy="60" r="1" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.5s" }} />
                      <circle cx="215" cy="80" r="0.8" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.9s" }} />
                      <circle cx="190" cy="70" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.3s" }} />

                      {/* Hot-Aisle Containment Canopy & Wavy Thermal Paths */}
                      <polygon points="122,52 158,52 185,15 95,15" fill="rgba(0,145,255,0.02)" stroke="#3daeff" strokeWidth="0.8" opacity="0.25" />
                      
                      <path d="M 132 105 Q 130 85 134 65 Q 132 45 136 20" stroke="#ff4d4d" strokeWidth="1.2" fill="none" className="animate-heat-rise" opacity="0.8" />
                      <path d="M 140 105 Q 142 85 138 65 Q 142 45 140 20" stroke="#ff4d4d" strokeWidth="1.2" fill="none" className="animate-heat-rise" opacity="0.8" />
                      <path d="M 148 105 Q 146 85 150 65 Q 148 45 152 20" stroke="#ff4d4d" strokeWidth="1.2" fill="none" className="animate-heat-rise" opacity="0.8" />

                      {/* Overhead Cable Tray Structure & glowing pulse */}
                      <line x1="95" y1="15" x2="125" y2="52" stroke="#3daeff" strokeWidth="1" opacity="0.4" />
                      <line x1="185" y1="15" x2="155" y2="52" stroke="#3daeff" strokeWidth="1" opacity="0.4" />
                      <line x1="105" y1="20" x2="175" y2="20" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="112" y1="28" x2="168" y2="28" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="118" y1="36" x2="162" y2="36" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      <line x1="122" y1="44" x2="158" y2="44" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      
                      {/* Glowing cable pulses */}
                      <circle r="1.5" fill="#3daeff">
                        <animateMotion path="M 95 15 L 125 52" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle r="1.5" fill="#ffffff">
                        <animateMotion path="M 185 15 L 155 52" dur="2.8s" repeatCount="indefinite" />
                      </circle>

                      {/* Aisle floor boundaries */}
                      <line x1="15" y1="145" x2="265" y2="145" stroke="#3daeff" strokeWidth="1" opacity="0.4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Slide-Up Overlay View (Full height & width text overlay) */}
              <div className="absolute inset-0 bg-[#050b18]/98 backdrop-blur-md p-5 sm:p-8 md:p-10 flex flex-col justify-between items-start transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 border border-[#3daeff]/30 shadow-[inset_0_0_30px_rgba(61,174,255,0.06)]">
                <div className="w-full flex flex-col items-start">
                  <span className="text-[9px] font-black text-white/40 tracking-[0.18em] uppercase">LAYER 1</span>
                  <span className="text-[14px] font-bold text-white tracking-wider uppercase mt-1">GPU-DENSE ROW ARCHITECTURE</span>
                  
                  <div className="w-12 h-[2px] bg-[#3daeff] mt-4" />
                  
                  <p className="text-[11.5px] sm:text-[13px] text-white/70 leading-relaxed font-sans font-normal mt-4 sm:mt-6">
                    Rack layouts are planned around accelerator power draw, heat removal path, cable routing and structured service access — not legacy 1U server assumptions.
                  </p>
                </div>

                {/* Bullets list */}
                <ul className="space-y-2.5 sm:space-y-4 w-full mt-auto">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">High-density GPU rack rows with per-cabinet PDU monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">Hot-aisle containment and cable tray infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">Expansion-ready room layouts with conditioned floor space</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">Rack-level power metering and environmental sensing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ══════ COLUMN 2: LAYER 2 — COOLING READY ══════ */}
            <div className="group relative w-full h-[500px] sm:h-[520px] md:h-[540px] border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 transition-all duration-500 cursor-pointer overflow-hidden bg-transparent">
              {/* Default Face View (Model & Title Header) */}
              <div className="p-8 sm:p-10 flex flex-col justify-between items-start w-full h-full transition-all duration-500 group-hover:opacity-10 group-hover:scale-95">
                {/* Header */}
                <div className="w-full flex flex-col items-start">
                  <span className="text-[9px] font-black text-white/45 tracking-[0.18em] uppercase">LAYER 2</span>
                  <span className="text-[13px] font-black text-[#3daeff] tracking-wider uppercase mt-1">COOLING READY</span>
                </div>

                {/* SVG Visual Model Container */}
                <div className="w-full flex-grow flex items-center justify-center py-4">
                  <div className="w-full h-[200px] flex items-center justify-center bg-white/[0.01] rounded-xl border border-white/[0.03] overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Chassis / Motherboard base container */}
                      <rect x="40" y="45" width="200" height="90" rx="4" stroke="#3daeff" strokeWidth="1" fill="#04070f" opacity="0.3" />
                      
                      {/* Dual high-density cold plates (representing CPU/GPU blocks) */}
                      <rect x="70" y="65" width="45" height="45" rx="3" stroke="#3daeff" strokeWidth="1.5" fill="#04070f" />
                      <rect x="75" y="70" width="35" height="35" rx="1.5" stroke="#3daeff" strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />
                      
                      {/* Heat exchange micro-fins representation */}
                      <path d="M 80 72 V 103 M 84 72 V 103 M 88 72 V 103 M 92 72 V 103 M 96 72 V 103 M 100 72 V 103 M 104 72 V 103" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      
                      <rect x="165" y="65" width="45" height="45" rx="3" stroke="#3daeff" strokeWidth="1.5" fill="#04070f" />
                      <rect x="170" y="70" width="35" height="35" rx="1.5" stroke="#3daeff" strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />
                      <path d="M 175 72 V 103 M 179 72 V 103 M 183 72 V 103 M 187 72 V 103 M 191 72 V 103 M 195 72 V 103 M 199 72 V 103" stroke="#3daeff" strokeWidth="0.6" opacity="0.3" />
                      
                      {/* Cold intake manifold secondary supply loop (Blue) */}
                      <path d="M 25 125 H 55 V 35 H 188 V 65" stroke="#00b0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M 92 35 V 65" stroke="#00b0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      {/* Inner animated flow lines */}
                      <path d="M 25 125 H 55 V 35 H 188 V 65" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" className="animate-coolant-flow" />
                      <path d="M 92 35 V 65" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" className="animate-coolant-flow" />

                      {/* Hot exhaust return manifold loop (Red) */}
                      <path d="M 92 110 V 125 H 255" stroke="#ff4d4d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M 188 110 V 125" stroke="#ff4d4d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      {/* Inner animated flow lines */}
                      <path d="M 92 110 V 125 H 255" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" className="animate-heat-rise" />
                      <path d="M 188 110 V 125" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" className="animate-heat-rise" />

                      {/* Flow dials & gauges */}
                      <circle cx="55" cy="35" r="4" fill="#04070f" stroke="#00b0ff" strokeWidth="1.2" />
                      <line x1="55" y1="35" x2="57" y2="32" stroke="#00b0ff" strokeWidth="0.8" />
                      
                      <circle cx="188" cy="125" r="4" fill="#04070f" stroke="#ff4d4d" strokeWidth="1.2" />
                      <line x1="188" y1="125" x2="191" y2="128" stroke="#ff4d4d" strokeWidth="0.8" />

                      {/* Digital Temperature telemetry overlays */}
                      <text x="28" y="27" fill="#00b0ff" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.8">IN: 16°C</text>
                      <text x="215" y="142" fill="#ff4d4d" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.8">OUT: 24°C</text>

                      {/* Ground line */}
                      <line x1="20" y1="145" x2="260" y2="145" stroke="#3daeff" strokeWidth="1" opacity="0.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Slide-Up Overlay View (Full height & width text overlay) */}
              <div className="absolute inset-0 bg-[#050b18]/98 backdrop-blur-md p-5 sm:p-8 md:p-10 flex flex-col justify-between items-start transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 border border-[#3daeff]/30 shadow-[inset_0_0_30px_rgba(61,174,255,0.06)]">
                <div className="w-full flex flex-col items-start">
                  <span className="text-[9px] font-black text-white/40 tracking-[0.18em] uppercase">LAYER 2</span>
                  <span className="text-[14px] font-bold text-white tracking-wider uppercase mt-1">COOLING READY</span>
                  
                  <div className="w-12 h-[2px] bg-[#3daeff] mt-4" />
                  
                  <p className="text-[11.5px] sm:text-[13px] text-white/70 leading-relaxed font-sans font-normal mt-4 sm:mt-6">
                    Secondary loop cooling manifolds deliver high-flow treated water directly to GPU micro-channels, removing thermal limits.
                  </p>
                </div>

                {/* Bullets list */}
                <ul className="space-y-2.5 sm:space-y-4 w-full mt-auto">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">Direct liquid cooling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">High-density rack support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">Optimized thermal efficiency</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ══════ COLUMN 3: LAYER 3 — GPU READY ══════ */}
            <div className="group relative w-full h-[500px] sm:h-[520px] md:h-[540px] transition-all duration-500 cursor-pointer overflow-hidden bg-transparent">
              {/* Default Face View (Model & Title Header) */}
              <div className="p-8 sm:p-10 flex flex-col justify-between items-start w-full h-full transition-all duration-500 group-hover:opacity-10 group-hover:scale-95">
                {/* Header */}
                <div className="w-full flex flex-col items-start">
                  <span className="text-[9px] font-black text-white/45 tracking-[0.18em] uppercase">LAYER 3</span>
                  <span className="text-[13px] font-black text-[#3daeff] tracking-wider uppercase mt-1">GPU READY</span>
                </div>

                {/* SVG Visual Model Container */}
                <div className="w-full flex-grow flex items-center justify-center py-4">
                  <div className="w-full h-[200px] flex items-center justify-center bg-white/[0.01] rounded-xl border border-white/[0.03] overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Isometric Rack Cabinet Frame */}
                      {/* Top Lid */}
                      <polygon points="105,30 175,30 150,15 80,15" stroke="#3daeff" strokeWidth="1" fill="#04070f" />
                      
                      {/* Pillars */}
                      <line x1="80" y1="15" x2="80" y2="125" stroke="#3daeff" strokeWidth="1" opacity="0.4" />
                      <line x1="150" y1="15" x2="150" y2="125" stroke="#3daeff" strokeWidth="1" opacity="0.4" />
                      <line x1="105" y1="30" x2="105" y2="140" stroke="#3daeff" strokeWidth="1.2" />
                      <line x1="175" y1="30" x2="175" y2="140" stroke="#3daeff" strokeWidth="1.2" />

                      {/* Bottom Base */}
                      <polygon points="105,140 175,140 150,125 80,125" stroke="#3daeff" strokeWidth="1" fill="#04070f" />

                      {/* Stack of exposed GPU Server Blades */}
                      {/* Blade 1 (Bottom) */}
                      <polygon points="105,134 175,134 150,119 80,119" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      {/* Heatsinks on Blade 1 */}
                      <line x1="115" y1="126" x2="115" y2="131" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="126" x2="120" y2="131" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="124" x2="135" y2="129" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="124" x2="140" y2="129" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      {/* Front blade indicator LEDs */}
                      <circle cx="110" cy="134" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.1s" }} />
                      <circle cx="125" cy="134" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.4s" }} />
                      <circle cx="150" cy="134" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.7s" }} />

                      {/* Blade 2 */}
                      <polygon points="105,121 175,121 150,106 80,106" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="113" x2="115" y2="118" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="113" x2="120" y2="118" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="111" x2="135" y2="116" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="111" x2="140" y2="116" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="121" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.3s" }} />
                      <circle cx="125" cy="121" r="0.8" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.2s" }} />
                      <circle cx="150" cy="121" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.5s" }} />

                      {/* Blade 3 */}
                      <polygon points="105,108 175,108 150,93 80,93" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="100" x2="115" y2="105" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="100" x2="120" y2="105" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="98" x2="135" y2="103" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="98" x2="140" y2="103" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="108" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.5s" }} />
                      <circle cx="125" cy="108" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.9s" }} />
                      <circle cx="150" cy="108" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.1s" }} />

                      {/* Blade 4 */}
                      <polygon points="105,95 175,95 150,80 80,80" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="87" x2="115" y2="92" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="87" x2="120" y2="92" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="85" x2="135" y2="90" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="85" x2="140" y2="90" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="95" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.2s" }} />
                      <circle cx="125" cy="95" r="0.8" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.6s" }} />
                      <circle cx="150" cy="95" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.3s" }} />

                      {/* Blade 5 */}
                      <polygon points="105,82 175,82 150,67 80,67" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="74" x2="115" y2="79" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="74" x2="120" y2="79" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="72" x2="135" y2="77" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="72" x2="140" y2="77" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="82" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.8s" }} />
                      <circle cx="125" cy="82" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.1s" }} />
                      <circle cx="150" cy="82" r="0.8" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.4s" }} />

                      {/* Blade 6 */}
                      <polygon points="105,69 175,69 150,54 80,54" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="61" x2="115" y2="66" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="61" x2="120" y2="66" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="59" x2="135" y2="64" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="59" x2="140" y2="64" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="69" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.4s" }} />
                      <circle cx="125" cy="69" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.7s" }} />
                      <circle cx="150" cy="69" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.9s" }} />

                      {/* Blade 7 */}
                      <polygon points="105,56 175,56 150,41 80,41" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="48" x2="115" y2="53" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="48" x2="120" y2="53" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="46" x2="135" y2="51" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="46" x2="140" y2="51" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="56" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.6s" }} />
                      <circle cx="125" cy="56" r="0.8" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.3s" }} />
                      <circle cx="150" cy="56" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.2s" }} />

                      {/* Blade 8 (Top) */}
                      <polygon points="105,43 175,43 150,28 80,28" stroke="#3daeff" strokeWidth="0.8" fill="#04070f" />
                      <line x1="115" y1="35" x2="115" y2="40" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="120" y1="35" x2="120" y2="40" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="135" y1="33" x2="135" y2="38" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <line x1="140" y1="33" x2="140" y2="38" stroke="#3daeff" strokeWidth="0.6" opacity="0.5" />
                      <circle cx="110" cy="43" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.1s" }} />
                      <circle cx="125" cy="43" r="0.8" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.5s" }} />
                      <circle cx="150" cy="43" r="0.8" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.8s" }} />

                      {/* Outer front door glass frame outline */}
                      <polygon points="105,30 175,30 175,140 105,140" stroke="#00b0ff" strokeWidth="1" opacity="0.35" />

                      {/* Fiber optic network interconnect cables looping out of the rear backplane */}
                      {/* Left-side backplane loop */}
                      <path d="M 80,119 C 60,119 45,100 35,80" stroke="#00ffcc" strokeWidth="1" fill="none" opacity="0.75" strokeDasharray="3, 3" className="animate-coolant-flow" />
                      <path d="M 80,93 C 58,93 42,75 32,55" stroke="#3daeff" strokeWidth="1.2" fill="none" opacity="0.8" />
                      
                      {/* Right-side backplane loop */}
                      <path d="M 150,106 C 180,106 210,85 235,65" stroke="#00ffcc" strokeWidth="1" fill="none" opacity="0.75" strokeDasharray="3, 3" className="animate-coolant-flow" />
                      <path d="M 150,80 C 182,80 215,65 240,45" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.7" />

                      {/* Interconnect node points outside the cabinet */}
                      <circle cx="35" cy="80" r="2" fill="#00ffcc" className="animate-led-blink" />
                      <circle cx="32" cy="55" r="2.2" fill="#3daeff" className="animate-led-blink" style={{ animationDelay: "0.5s" }} />
                      <circle cx="235" cy="65" r="2" fill="#00ffcc" className="animate-led-blink" style={{ animationDelay: "0.3s" }} />
                      <circle cx="240" cy="45" r="2.2" fill="#ffffff" className="animate-led-blink" style={{ animationDelay: "0.8s" }} />

                      {/* Ground line */}
                      <line x1="20" y1="145" x2="260" y2="145" stroke="#3daeff" strokeWidth="1" opacity="0.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Slide-Up Overlay View (Full height & width text overlay) */}
              <div className="absolute inset-0 bg-[#050b18]/98 backdrop-blur-md p-5 sm:p-8 md:p-10 flex flex-col justify-between items-start transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 border border-[#3daeff]/30 shadow-[inset_0_0_30px_rgba(61,174,255,0.06)]">
                <div className="w-full flex flex-col items-start">
                  <span className="text-[9px] font-black text-white/40 tracking-[0.18em] uppercase">LAYER 3</span>
                  <span className="text-[14px] font-bold text-white tracking-wider uppercase mt-1">GPU READY</span>
                  
                  <div className="w-12 h-[2px] bg-[#3daeff] mt-4" />
                  
                  <p className="text-[11.5px] sm:text-[13px] text-white/70 leading-relaxed font-sans font-normal mt-4 sm:mt-6">
                    High-bandwidth networking links and low-latency NVLink buses are structured to support massive synchronized model training.
                  </p>
                </div>

                {/* Bullets list */}
                <ul className="space-y-2.5 sm:space-y-4 w-full mt-auto">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">NVIDIA roadmap ready</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">AI optimized layouts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] mt-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12.5px] font-medium text-white/80 leading-snug">Enterprise reliability</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
