"use client";

import React, { useEffect, useRef, useState } from "react";
import CapacityGrowthModel from "./CapacityGrowthModel";

/* ═══════════════════ Stat Icon SVGs ═══════════════════ */

function StatIcon({ type }: { type: "power" | "growth" | "workload" | "deploy" }) {
  const cls = "w-[18px] h-[18px] text-[#3daeff]";

  switch (type) {
    case "power":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "growth":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
      );
    case "workload":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "deploy":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
  }
}

/* ═══════════════════════ Main Component ═══════════════════════ */

export default function AIDemand() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const stats = [
    { value: "219", unit: "GW", label: "PROJECTED DEMAND BY 2030", icon: "power" as const },
    { value: "+22", unit: "%", label: "ANNUAL GROWTH (CAGR)", icon: "growth" as const },
    { value: "4", unit: "x", label: "INCREASE IN AI WORKLOADS", icon: "workload" as const },
    { value: "4", unit: " MONTHS", label: "USDC DEPLOYMENT", icon: "deploy" as const },
  ];

  return (
    <section
      id="ai-demand"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f]"
      style={{ minHeight: "680px" }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ══════ LEFT COLUMN ══════ */}
          <div className="flex flex-col items-start">

            {/* Pill Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]"
              style={fadeUp(0)}
            >
              <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-semibold text-white/65 tracking-[0.22em] uppercase">
                THE OPPORTUNITY
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.08] mb-7"
              style={fadeUp(80)}
            >
              <span className="text-white block">AI Demand is</span>
              <span className="text-[#0091ff] block">Outpacing</span>
              <span className="text-[#0091ff] block">Infrastructure</span>
            </h2>

            {/* Description */}
            <p
              className="text-[12px] md:text-[13px] text-white/40 leading-[1.85] max-w-[440px] font-normal mb-14"
              style={fadeUp(160)}
            >
              The Global demand for data center capacity is expected to rise at an
              annual rate between 19% and 22% from 2023 to 2030 to reach a yearly
              demand of 219 Gigawatts. At USDC, we stand poised to capitalize on
              these secular trends by taking existing energy assets and converting them
              into Tier III HPC data center&apos;s at a fraction of the cost when compared to
              the competition.
            </p>

            {/* Styles for glow effects */}
            <style dangerouslySetInnerHTML={{
              __html: `
                .text-shadow-glow-blue {
                  transition: all 0.3s ease;
                }
                .group:hover .text-shadow-glow-blue {
                  text-shadow: 0 0 10px rgba(61, 174, 255, 0.5);
                  color: #ffffff;
                }
              `
            }} />

            {/* Stats Grid 2×2 */}
            <div
              className="grid grid-cols-2 gap-4 max-w-[440px] w-full"
              style={fadeUp(280)}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-3 p-4 rounded-xl bg-[#060b18]/45 border border-white/[0.06] hover:border-[#3daeff]/35 hover:bg-[#060b18]/70 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,145,255,0.06)] transition-all duration-300 group cursor-default"
                >
                  {/* Icon + Value */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/[0.08] border border-blue-400/[0.12] group-hover:bg-[#3daeff]/15 group-hover:border-[#3daeff]/35 group-hover:shadow-[0_0_8px_rgba(61,174,255,0.25)] transition-all duration-300">
                      <StatIcon type={stat.icon} />
                    </div>
                    <span className="text-[20px] md:text-[23px] font-bold text-white tracking-tight leading-none text-shadow-glow-blue">
                      {stat.value}
                      <span className="text-[12px] md:text-[14px] font-semibold text-white/55 ml-0.5">
                        {stat.unit}
                      </span>
                    </span>
                  </div>
                  {/* Label */}
                  <span className="text-[8px] font-semibold text-white/30 tracking-[0.18em] uppercase whitespace-pre-line leading-[1.4] pl-0.5 group-hover:text-white/55 transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════ RIGHT COLUMN — Capacity Growth ThreeD Model ══════ */}
          <div className="flex justify-center lg:justify-end items-center" style={fadeUp(240)}>
            <div className="relative w-full max-w-[560px] h-[280px] sm:h-[360px] md:h-[450px] lg:h-[500px] overflow-hidden">
              <CapacityGrowthModel />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}
