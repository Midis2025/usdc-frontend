"use client";

import React, { useState, useEffect } from "react";
import { Gauge, Zap, ShieldCheck, BarChart3, Lock, Link, Layers } from "lucide-react";

type TabType = "speed" | "scale" | "sovereignty";

export default function SpeedScaleSovereignty() {
  const [activeTab, setActiveTab] = useState<TabType>("speed");
  const [sliderVal, setSliderVal] = useState<number>(50); // Yields exactly 55 Megawatts initially
  const [tabTransition, setTabTransition] = useState(false);

  // Trigger entrance animation on tab change
  useEffect(() => {
    setTabTransition(true);
    const timeout = setTimeout(() => setTabTransition(false), 50);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  // Animate range slider when scale tab is shown
  useEffect(() => {
    if (activeTab === "scale") {
      setSliderVal(0);
      const targetVal = 50; // Correspond to 55 MW (50% on slider)
      const duration = 1000; // 1 second animation duration
      const startTime = performance.now();
      let frameId: number;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = progress * (2 - progress); // Smooth decelerating easing curve
        setSliderVal(easeOutQuad * targetVal);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [activeTab]);

  // Left column content configuration
  const tabData = {
    speed: {
      heading: (
        <>
          Engineered for
          <span className="block text-white">performance.</span>
          <span className="block text-white">Built for efficiency.</span>
        </>
      ),
      description:
        "Purpose-built infrastructure and optimized design deliver faster time-to-online and lower total cost of ownership.",
    },
    scale: {
      heading: (
        <>
          Deploy at the
          <span className="block text-white">scale you</span>
          <span className="block text-white">need, today.</span>
        </>
      ),
      description:
        "Right-size your deployment to match your current workloads, with the ability to scale seamlessly as your AI demands grow.",
    },
    sovereignty: {
      heading: (
        <>
          Total control,
          <span className="block text-white">wherever you</span>
          <span className="block text-white">operate.</span>
        </>
      ),
      description:
        "Keep your data, workloads and operations under your control. USDC infrastructure is built for data sovereignty and compliance at every layer.",
    },
  };

  // Piecewise mapping for sliderVal (0 to 100):
  // 0%   -> 1800 kW (1.8 MW) - 1 ARMS 200 Module
  // 25%  -> 10 MW (10,000 kW)
  // 50%  -> 55 MW (55,000 kW) - Current capacity in development
  // 75%  -> 200 MW (200,000 kW) - Substations/Plant level
  // 100% -> 400 MW (400,000 kW) - Total portfolio capacity
  const getPowerKw = (val: number): number => {
    if (val <= 25) {
      const pct = val / 25;
      return 1800 + pct * (10000 - 1800);
    } else if (val <= 50) {
      const pct = (val - 25) / 25;
      return 10000 + pct * (55000 - 10000);
    } else if (val <= 75) {
      const pct = (val - 50) / 25;
      return 55000 + pct * (200000 - 55000);
    } else {
      const pct = (val - 75) / 25;
      return 200000 + pct * (400000 - 200000);
    }
  };

  const powerKw = getPowerKw(sliderVal);

  // Formatting output power values
  const getFormattedPower = (kW: number) => {
    if (kW < 1000) {
      return { value: Math.round(kW).toString(), unit: "Kilowatts" };
    } else {
      const mw = kW / 1000;
      const valStr = parseFloat(mw.toFixed(2)).toString();
      return { value: valStr, unit: "Megawatts" };
    }
  };

  const formattedPower = getFormattedPower(powerKw);

  // Dynamic configuration metrics
  const armsPodsCount = Math.round(powerKw / 1800); // 1.8 MW (1800 kW) per pod
  const blackwellRacksCount = Math.round(powerKw / 120); // 120 kW per rack
  const b200GpusCount = blackwellRacksCount * 72; // 72 GPUs per NVL72 rack

  // Ordering of cubes to activate as capacity increases (center outwards)
  const nodeOrder = [
    { c: 1, r: 1 },
    { c: 2, r: 1 },
    { c: 1, r: 0 },
    { c: 2, r: 0 },
    { c: 1, r: 2 },
    { c: 2, r: 2 },
    { c: 0, r: 1 },
    { c: 3, r: 1 },
    { c: 0, r: 0 },
    { c: 3, r: 0 },
    { c: 0, r: 2 },
    { c: 3, r: 2 },
  ];

  // Map slider value (0-100) to 1-12 active nodes
  const activeNodesCount = Math.max(1, Math.ceil((sliderVal / 100) * 12));

  // Isometric projection params
  const x0 = 200;
  const y0 = 90;
  const dx = 42;
  const dy = 20;

  // Render a 3D isometric cube
  const renderCube = (c: number, r: number, isActive: boolean, hasRadar = false) => {
    const cx = x0 + (c - r) * dx;
    const cy = y0 + (c + r) * dy;

    // Cube height and width
    const h = 18;
    const w = 18;

    // Color definitions
    const topColor = isActive ? "#52b6ff" : "#e2e8f0";
    const leftColor = isActive ? "#0084ff" : "#94a3b8";
    const rightColor = isActive ? "#0052cc" : "#64748b";
    const opacity = isActive ? 1.0 : 0.45;

    return (
      <g key={`cube-${c}-${r}`} className="transition-all duration-500">
        {/* Glow effect at the base of active nodes */}
        {isActive && (
          <ellipse
            cx={cx}
            cy={cy + 4}
            rx={20}
            ry={10}
            fill="url(#blue-glow-gradient)"
            opacity="0.6"
          />
        )}

        {/* Radar Rings on central node for Sovereignty Tab */}
        {hasRadar && (
          <>
            <ellipse
              cx={cx}
              cy={cy + 4}
              rx={20}
              ry={10}
              fill="none"
              stroke="#3daeff"
              strokeWidth="1.5"
            >
              <animate attributeName="rx" values="12;60;110" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;30;55" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.9;0.35;0" dur="3.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse
              cx={cx}
              cy={cy + 4}
              rx={20}
              ry={10}
              fill="none"
              stroke="#3daeff"
              strokeWidth="1.5"
            >
              <animate attributeName="rx" values="12;60;110" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
              <animate attributeName="ry" values="6;30;55" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.9;0.35;0" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
            </ellipse>
          </>
        )}

        {/* Left Face */}
        <polygon
          points={`${cx - w},${cy} ${cx},${cy + 8} ${cx},${cy - h + 8} ${cx - w},${cy - h}`}
          fill={leftColor}
          opacity={opacity}
          className="transition-colors duration-500"
        />

        {/* Right Face */}
        <polygon
          points={`${cx},${cy + 8} ${cx + w},${cy} ${cx + w},${cy - h} ${cx},${cy - h + 8}`}
          fill={rightColor}
          opacity={opacity}
          className="transition-colors duration-500"
        />

        {/* Top Face */}
        <polygon
          points={`${cx},${cy - h + 8} ${cx + w},${cy - h} ${cx},${cy - h - 8} ${cx - w},${cy - h}`}
          fill={topColor}
          opacity={opacity}
          className="transition-colors duration-500"
        />
      </g>
    );
  };

  return (
    <section className="w-full relative overflow-hidden bg-[#04070f] px-4 pt-6 pb-8 md:py-28">

      {/* ── Inline keyframes for border animation & floating orbs ── */}
      <style>{`
        @keyframes border-spin {
          0% { --border-angle: 0deg; }
          100% { --border-angle: 360deg; }
        }
        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
          50% { transform: translateY(-30px) scale(1.15); opacity: 0.5; }
        }
        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-line {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .tab-content-enter {
          animation: fade-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .speed-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .speed-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(61, 174, 255, 0.12);
        }
        .speed-card:hover .speed-icon {
          box-shadow: 0 0 18px rgba(61, 174, 255, 0.4);
          border-color: rgba(61, 174, 255, 0.7);
        }
        .speed-card:hover .speed-value {
          text-shadow: 0 0 20px rgba(61, 174, 255, 0.5);
        }
      `}</style>

      {/* Centered Rounded Container Card with animated gradient border */}
      <div className="w-full max-w-[1280px] mx-auto relative rounded-[26px] p-[1px]" style={{
        background: "linear-gradient(135deg, rgba(61,174,255,0.35) 0%, rgba(61,174,255,0.05) 25%, rgba(61,174,255,0.02) 50%, rgba(61,174,255,0.08) 75%, rgba(61,174,255,0.3) 100%)",
      }}>
        <div
          className="w-full bg-[#03060d] rounded-[25px] overflow-hidden p-5 sm:p-8 md:p-12 lg:p-16 relative"
          style={{
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(61,174,255,0.08)",
          }}
        >

          {/* ── Ambient floating orbs ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-[15%] left-[8%] w-[120px] h-[120px] rounded-full bg-[#3daeff]/[0.06] blur-[60px]" style={{ animation: "float-orb 8s ease-in-out infinite" }} />
            <div className="absolute top-[55%] right-[12%] w-[90px] h-[90px] rounded-full bg-[#0084ff]/[0.08] blur-[50px]" style={{ animation: "float-orb 6s ease-in-out infinite 2s" }} />
            <div className="absolute bottom-[10%] left-[40%] w-[150px] h-[150px] rounded-full bg-[#3daeff]/[0.04] blur-[70px]" style={{ animation: "float-orb 10s ease-in-out infinite 4s" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-8 lg:gap-12 xl:gap-16 items-start relative z-10">

            {/* ═══ Left Column: Static Layout Structure (Content varies by activeTab) ═══ */}
            <div className="flex flex-col justify-between min-h-[280px] lg:min-h-[320px]">
              <div>
                {/* Tab-specific Heading */}
                <h2 className="text-[28px] sm:text-[36px] md:text-[38px] lg:text-[40px] font-extrabold tracking-[-0.02em] leading-[1.1] text-white">
                  {tabData[activeTab].heading}
                </h2>

                {/* Tab Trigger Buttons */}
                <div className="flex items-center gap-3 sm:gap-6 mt-6 sm:mt-8 mb-6 border-b border-white/[0.08] pb-3 overflow-x-auto scrollbar-none">
                  {(["speed", "scale", "sovereignty"] as TabType[]).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative text-[12px] sm:text-[15px] font-bold tracking-[0.06em] uppercase transition-all duration-300 pb-3 cursor-pointer whitespace-nowrap ${isActive ? "text-white" : "text-white/35 hover:text-white/60"
                          }`}
                      >
                        {tab}
                        {isActive && (
                          <>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3daeff] rounded-full" />
                            <span className="absolute bottom-[-2px] left-[10%] w-[80%] h-[4px] bg-[#3daeff]/40 rounded-full blur-[4px]" />
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab-specific Description */}
              <p className="text-[13.5px] sm:text-[14.5px] text-white/50 leading-[1.7] font-normal max-w-[340px]">
                {tabData[activeTab].description}
              </p>
            </div>

            {/* ═══ Right Column: Dynamic View Panels ═══ */}
            <div className="w-full flex items-center justify-center">

              {activeTab === "speed" && (
                <div className="tab-content-enter w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">

                    {/* Stat 1: 10x */}
                    <div className="speed-card flex flex-col items-start w-full rounded-2xl p-6 md:p-8 border border-white/[0.08] bg-[#02050c]/25 hover:border-[#3daeff]/35 hover:bg-white/[0.02] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300">
                      <div className="speed-icon w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff] transition-all duration-300">
                        <Gauge className="w-5 h-5" />
                      </div>
                      <span className="speed-value text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3 transition-all duration-300">
                        10x
                      </span>
                      <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                        Faster Deployment
                      </span>
                      <p className="text-[12px] text-white/50 leading-[1.6] h-[77px] line-clamp-4">
                        Modular ARMS 200 pods enable delivery in weeks, not years, getting you to compute faster.
                      </p>
                    </div>

                    {/* Stat 2: N+1 */}
                    <div className="speed-card flex flex-col items-start w-full rounded-2xl p-6 md:p-8 border border-white/[0.08] bg-[#02050c]/25 hover:border-[#3daeff]/35 hover:bg-white/[0.02] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300">
                      <div className="speed-icon w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff] transition-all duration-300">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="speed-value text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3 transition-all duration-300">
                        N+1
                      </span>
                      <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                        Enterprise Reliability
                      </span>
                      <p className="text-[12px] text-white/50 leading-[1.6] h-[77px] line-clamp-4">
                        Redundant power, cooling and network architecture delivers Tier III uptime and resilience.
                      </p>
                    </div>

                    {/* Stat 3: 50MW+ */}
                    <div className="speed-card flex flex-col items-start w-full rounded-2xl p-6 md:p-8 border border-white/[0.08] bg-[#02050c]/25 hover:border-[#3daeff]/35 hover:bg-white/[0.02] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300">
                      <div className="speed-icon w-[44px] h-[44px] rounded-full border border-[#3daeff]/35 flex items-center justify-center mb-4 text-[#3daeff] transition-all duration-300">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <span className="speed-value text-[28px] sm:text-[32px] lg:text-[24px] xl:text-[30px] font-extrabold text-[#3daeff] leading-none mb-3 transition-all duration-300">
                        50MW+
                      </span>
                      <span className="text-[13px] font-bold text-white leading-tight mb-2 min-h-[36px] block">
                        Scalable Capacity
                      </span>
                      <p className="text-[12px] text-white/50 leading-[1.6] h-[77px] line-clamp-4">
                        Existing and planned capacity pipeline supports long-term growth and expansion.
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* ── SCALE TAB VIEW ── */}
              {activeTab === "scale" && (
                <div className="tab-content-enter w-full max-w-[550px] mx-auto py-4">

                  {/* Configurator Controls */}
                  <div className="flex flex-col w-full">

                    {/* Top display value + Button */}
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <span className="text-[34px] sm:text-[38px] font-extrabold text-[#3daeff] leading-none tracking-tight block">
                          {formattedPower.value}
                        </span>
                        <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest block mt-0.5">
                          {formattedPower.unit}
                        </span>
                      </div>
                      <a href="/contact" className="px-4 py-2 text-[10px] font-bold text-[#3daeff] uppercase tracking-wider border border-[#3daeff]/35 rounded-md hover:bg-[#3daeff]/10 transition-all duration-300 cursor-pointer inline-block">
                        Configure Yours &gt;
                      </a>
                    </div>

                    {/* Range Slider Container */}
                    <div className="relative mb-8 pt-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.01"
                        value={sliderVal}
                        onChange={(e) => setSliderVal(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-[#3daeff]"
                        style={{
                          background: `linear-gradient(to right, #3daeff 0%, #3daeff ${sliderVal}%, rgba(255,255,255,0.08) ${sliderVal}%, rgba(255,255,255,0.08) 100%)`,
                        }}
                      />

                      {/* Tick Mark Labels */}
                      <div className="flex justify-between text-[9.5px] sm:text-[12px] font-bold text-white/40 tracking-wider mt-3.5 uppercase">
                        <span>1.8 MW</span>
                        <span>10 MW</span>
                        <span>55 MW</span>
                        <span>200 MW</span>
                        <span>400 MW</span>
                      </div>
                    </div>

                    {/* Configuration Outputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/[0.06] pt-6 mb-4">
                      <div>
                        <span className="text-[12.5px] font-black text-white/35 tracking-widest uppercase block mb-2">
                          ARMS 200 Pods
                        </span>
                        <span className="text-[19px] sm:text-[22px] font-extrabold text-[#3daeff] block leading-none">
                          {armsPodsCount > 0 ? armsPodsCount.toLocaleString() : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[12.5px] font-black text-white/35 tracking-widest uppercase block mb-2">
                          Blackwell Racks
                        </span>
                        <span className="text-[19px] sm:text-[22px] font-extrabold text-[#3daeff] block leading-none">
                          {blackwellRacksCount > 0 ? blackwellRacksCount.toLocaleString() : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[12.5px] font-black text-white/35 tracking-widest uppercase block mb-2">
                          B200 GPUs
                        </span>
                        <span className="text-[19px] sm:text-[22px] font-extrabold text-[#3daeff] block leading-none">
                          {b200GpusCount > 0 ? b200GpusCount.toLocaleString() : "—"}
                        </span>
                      </div>
                    </div>

                    {/* Slider Disclaimer */}
                    <span className="text-[8px] font-medium text-white/20 tracking-wide block leading-[1.3] mt-2">
                      Nearest-fit configurations. Units outside their practical range are excluded.
                    </span>
                  </div>

                </div>
              )}

              {/* ── SOVEREIGNTY TAB VIEW ── */}
              {activeTab === "sovereignty" && (
                <div className="tab-content-enter flex justify-center w-full items-center py-4">

                  {/* 3D Network Hub Visualization (Three.js) */}
                  <div className="relative w-full h-[280px] lg:h-[320px] max-w-[550px] mx-auto rounded-xl overflow-hidden">
                    <iframe
                      src="/network-hub.html"
                      title="Network Hub Visualization"
                      className="w-full h-full border-0"
                      style={{
                        borderRadius: 'inherit',
                        pointerEvents: 'auto',
                      }}
                      allow="autoplay"
                    />
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
