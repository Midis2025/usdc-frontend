"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ═══════════════════════ ARMS 200 Platform Section ═══════════════════════ */

export default function Arms200Platform() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
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
    { value: "ARMS 200 PODS", label: "MODULE DENSITY" },
    { value: "4 Months", label: "TYPICAL DEPLOYMENT" },
    { value: ">30% Less Energy", label: "EFFICIENCY GAIN" },
  ];

  return (
    <section
      id="arms200-platform"
      ref={sectionRef}
      className="w-full relative bg-white"
    >
      {/* ── Full width and height section container ── */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* ══════ LEFT COLUMN ══════ */}
          <div className="flex flex-col items-start">

            {/* Pill Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8"
              style={{
                background: "linear-gradient(135deg, #e6f2ff 0%, #eef7ff 100%)",
                ...fadeUp(0),
              }}
            >
              <span
                className="w-6 h-[2px] rounded-full"
                style={{ background: "linear-gradient(90deg, #0091ff, #3daeff)" }}
              />
              <span className="text-[10px] font-bold text-[#1a3a5c] tracking-[0.2em] uppercase">
                ARMS 200 PLATFORM
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-[32px] sm:text-[38px] md:text-[52px] lg:text-[52px] font-extrabold tracking-[-0.025em] leading-[1.1] mb-6"
              style={fadeUp(80)}
            >
              <span className="text-[#0080e6]">ARMS 200 - </span>
              <span className="text-[#111827]">Rapid,</span>
              <br />
              <span className="text-[#111827]">Modular Data Center Pods</span>
            </h2>

            {/* Description */}
            <p
              className="text-[13px] md:text-[14px] text-[#6b7280] leading-[1.85] max-w-[480px] font-normal mb-10"
              style={fadeUp(160)}
            >
              The ARMS 200 is a modular, containerized data center platform engineered for AI and
              HPC. Each ARMS 200 pod delivers dense GPU compute, fast site commissioning and
              native renewable-energy integration for lower carbon intensity.
            </p>

            {/* Stats Bar */}
            <div
              className="w-full max-w-[540px] grid grid-cols-3 border border-[#e5e7eb] rounded-xl overflow-hidden"
              style={fadeUp(260)}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-start justify-center px-5 py-5 ${
                    i < stats.length - 1 ? "border-r border-[#e5e7eb]" : ""
                  }`}
                >
                  <span className="text-[15px] md:text-[17px] font-bold text-[#111827] tracking-tight leading-tight mb-1.5">
                    {stat.value}
                  </span>
                  <span className="text-[8px] font-bold text-[#9ca3af] tracking-[0.2em] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════ RIGHT COLUMN — Container Photo ══════ */}
          <div
            className="flex justify-center lg:justify-end items-center"
            style={fadeUp(180)}
          >
            <div className="relative w-full max-w-[480px]">
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
                <Image
                  src="/USDC (3).avif"
                  alt="ARMS 200 Modular Data Center Platform"
                  width={560}
                  height={560}
                  className="w-full h-auto object-cover"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
