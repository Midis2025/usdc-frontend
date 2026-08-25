"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════ USDC By The Numbers ═══════════════════════ */

export default function UsdcByNumbers() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(18px)",
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const stats = [
    {
      value: "4",
      label: "UNITED STATES-BASED\nREDEVELOPMENT SITES",
      color: "#ffffff",
    },
    {
      value: "55",
      label: "MEGAWATTS CURRENTLY\nIN DEVELOPMENT",
      color: "#ffffff",
    },
    {
      value: "400+",
      label: "MEGAWATTS OF POTENTIAL\nCONVERSION ASSETS",
      color: "#ffffff",
    },
  ];

  return (
    <section
      id="usdc-by-numbers"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-20 md:py-28 lg:py-32"
    >
      {/* ── Subtle ambient glow ── */}
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Heading ── */}
        <h2
          className="text-center text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.01em] leading-[1.1] mb-12 md:mb-14"
          style={fadeUp(0)}
        >
          <span className="text-white">USDC </span>
          <span className="text-white">BY THE </span>
          <span className="text-[#3daeff]">NUMBERS</span>
        </h2>

        {/* ── Stats Card ── */}
        <div
          className="w-full rounded-2xl border border-white/[0.08] bg-[#080d1a]/80 backdrop-blur-sm overflow-hidden"
          style={{
            boxShadow: "0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
            ...fadeUp(120),
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center text-center px-6 py-5 md:py-6 transition-all duration-500 hover:bg-[#02050c]/40 group cursor-default ${i < stats.length - 1
                    ? "border-b md:border-b-0 md:border-r border-white/[0.06]"
                    : ""
                  }`}
              >
                {/* Large Number */}
                <span
                  className="text-[40px] sm:text-[46px] md:text-[52px] lg:text-[60px] font-extrabold tracking-tight leading-none mb-2 transition-all duration-500 select-none block"
                  style={{ color: stat.color }}
                >
                  <span className={`inline-block transition-all duration-500 group-hover:scale-105 ${i === 2 ? "group-hover:drop-shadow-[0_0_15px_rgba(61,174,255,0.65)]" : "group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"}`}>
                    {stat.value}
                  </span>
                </span>

                {/* Label */}
                <span className="text-[9px] md:text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase whitespace-pre-line leading-[1.6] group-hover:text-white/60 transition-colors duration-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
