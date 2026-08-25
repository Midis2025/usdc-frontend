"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Zap, Snowflake, Cpu, Layers } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   CUSTOM CONTEXT-SPECIFIC ANIMATED SVG ICONS (Sized down to 32x32)
   ────────────────────────────────────────────────────────────────────────── */

// 1. Power Icon: Glowing Lightning Bolt
function PowerIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#3daeff]"
    >
      <circle cx="18" cy="18" r="14" stroke="rgba(0, 145, 255, 0.15)" strokeWidth="2" />
      <path
        d="M19.5 8L11.5 19H17.5L16.5 28L24.5 17H18.5L19.5 8Z"
        fill="#3daeff"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinejoin="round"
        style={{
          transformOrigin: "18px 18px",
          animation: "powerPulse 2s ease-in-out infinite",
        }}
      />
    </svg>
  );
}

// 2. Cooling Icon: Rotating Fan
function CoolingIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#3daeff]"
    >
      <circle cx="18" cy="18" r="14" stroke="rgba(0, 145, 255, 0.15)" strokeWidth="2" />
      <circle cx="18" cy="18" r="2.5" fill="#ffffff" />
      <g
        style={{
          transformOrigin: "18px 18px",
          animation: "fanRotate 4s linear infinite",
        }}
      >
        <path d="M18 15.5C19.2 12.5 20.5 9 18 9C15.5 9 16.8 12.5 18 15.5Z" fill="#3daeff" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <path d="M20.5 18C23.5 19.2 27 20.5 27 18C27 15.5 23.5 16.8 20.5 18Z" fill="#3daeff" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <path d="M18 20.5C16.8 23.5 15.5 27 18 27C20.5 27 19.2 23.5 18 20.5Z" fill="#3daeff" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <path d="M15.5 18C12.5 16.8 9 15.5 9 18C9 20.5 12.5 19.2 15.5 18Z" fill="#3daeff" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </g>
    </svg>
  );
}

// 3. Compute Icon: Pulsing Silicon Microchip
function ComputeIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#3daeff]"
    >
      <circle cx="18" cy="18" r="14" stroke="rgba(0, 145, 255, 0.15)" strokeWidth="2" />
      <path d="M13 9V7.5M18 9V7.5M23 9V7.5M13 27V28.5M18 27V28.5M23 27V28.5" stroke="#3daeff" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9 13H7.5M9 18H7.5M9 23H7.5M27 13H28.5M27 18H28.5M27 23H28.5" stroke="#3daeff" strokeWidth="1.2" strokeLinecap="round" />
      <rect
        x="10.5"
        y="10.5"
        width="15"
        height="15"
        rx="2"
        fill="rgba(4, 7, 15, 0.9)"
        stroke="#0091ff"
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="14"
        width="8"
        height="8"
        rx="1"
        fill="#ffffff"
        stroke="#3daeff"
        strokeWidth="1"
        style={{
          transformOrigin: "18px 18px",
          animation: "diePulse 1.8s ease-in-out infinite",
        }}
      />
    </svg>
  );
}

// 4. Scalability Icon: Outward Scaling Connectors
function ScalabilityIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#3daeff]"
    >
      <circle cx="18" cy="18" r="14" stroke="rgba(0, 145, 255, 0.15)" strokeWidth="2" />
      <circle cx="18" cy="18" r="2.5" fill="#ffffff" />
      <g
        style={{
          transformOrigin: "18px 18px",
          animation: "scaleOutward 2.5s ease-in-out infinite",
        }}
      >
        <line x1="18" y1="18" x2="18" y2="10" stroke="#3daeff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
        <line x1="18" y1="18" x2="11" y2="22" stroke="#3daeff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
        <line x1="18" y1="18" x2="25" y2="22" stroke="#3daeff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
        <circle cx="18" cy="10" r="2" fill="#3daeff" stroke="#ffffff" strokeWidth="0.8" />
        <circle cx="11" cy="22" r="2" fill="#3daeff" stroke="#ffffff" strokeWidth="0.8" />
        <circle cx="25" cy="22" r="2" fill="#3daeff" stroke="#ffffff" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export default function Arms200System() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "POWER",
      desc: "High-density power infrastructure built for AI workloads.",
      Icon: Zap,
    },
    {
      title: "COOLING",
      desc: "Direct-to-chip liquid cooling for maximum efficiency.",
      Icon: Snowflake,
    },
    {
      title: "COMPUTE",
      desc: "GPU-ready architecture optimized for next-generation AI.",
      Icon: Cpu,
    },
    {
      title: "SCALABILITY",
      desc: "Modular design enabling rapid capacity expansion.",
      Icon: Layers,
    },
  ];

  return (
    <section
      id="arms200-system"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] pt-6 pb-10 md:pt-8 md:pb-20 border-t border-white/[0.03]"
    >
      {/* Inline styles for custom feature icon animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes powerPulse {
              0%, 100% {
                opacity: 0.8;
                transform: scale(1);
                filter: drop-shadow(0 0 2px rgba(61,174,255,0.4));
              }
              50% {
                opacity: 1;
                transform: scale(1.08);
                filter: drop-shadow(0 0 8px rgba(61,174,255,0.9));
              }
            }
            @keyframes fanRotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes diePulse {
              0%, 100% {
                opacity: 0.65;
                fill: #3daeff;
                filter: drop-shadow(0 0 1px rgba(61,174,255,0.3));
              }
              50% {
                opacity: 1;
                fill: #ffffff;
                filter: drop-shadow(0 0 6px rgba(61,174,255,0.8));
              }
            }
            @keyframes scaleOutward {
              0%, 100% {
                transform: scale(0.92);
                opacity: 0.75;
              }
              50% {
                transform: scale(1.12);
                opacity: 1;
              }
            }
          `,
        }}
      />

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ══════ LEFT COLUMN: HEADER & 2X2 GRID ══════ */}
          <div
            className="lg:col-span-7 flex flex-col items-start text-left transition-all duration-1000 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[10px] font-bold text-white/80 tracking-[0.2em] uppercase font-sans">
                WHY ARMS 200
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[56px] font-bold tracking-tight leading-[1.05] mb-8 font-sans">
              <span className="text-[#3daeff]">ARMS 200</span> <span className="text-white">System</span>
            </h2>

            {/* Description */}
            <div className="space-y-6 text-white/45 text-[13.5px] md:text-[14.5px] leading-[1.75] max-w-[580px] font-normal mb-12">
              <p>
                The ARMS 200 is DigiPowerX&apos;s proprietary modular data-center platform. <br />
                Each module delivers up to 1.8 MW of critical IT load and is designed for Tier III redundancy (concurrent maintainability).
              </p>
              <p>
                The system&apos;s prefabricated architecture allows rapid on-site assembly and integration with chilled-water or direct-to-chip cooling systems, making it the ideal solution for <span className="whitespace-nowrap">AI-ready</span> infrastructure.
              </p>
            </div>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full mt-8">
              {features.map((feat) => {
                const Icon = feat.Icon;
                return (
                  <div
                    key={feat.title}
                    className="group/card relative p-6 rounded-2xl border border-white/[0.06] bg-[#02050c]/30 backdrop-blur-md transition-all duration-300 hover:border-[#3daeff]/35 hover:bg-[#02050c]/60 flex flex-col items-center text-center overflow-hidden"
                  >
                    {/* Hover glow effect background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#3daeff]/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover/card:bg-[#3daeff]/20 group-hover/card:border-[#3daeff]/40 transition-all duration-300 mb-4 relative z-10">
                      <Icon className="w-5 h-5 text-[#3daeff] transition-transform duration-300 group-hover/card:scale-110" />
                    </div>

                    {/* Title */}
                    <h4 className="text-[11px] md:text-xs font-bold text-white tracking-[0.25em] uppercase mb-2 font-sans relative z-10">
                      {feat.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[12px] md:text-[13px] text-white/50 leading-[1.6] max-w-[220px] relative z-10">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════ RIGHT COLUMN: EPI CERTIFICATE ══════ */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end items-center lg:sticky lg:top-28 transition-all duration-1000 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "150ms",
            }}
          >
            <div className="relative w-full max-w-[350px] bg-[#02050c]/30 p-2.5 rounded-2xl border border-white/[0.06] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]">
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-blue-500/[0.03] rounded-2xl blur-[40px] pointer-events-none" />

              <Image
                src="/arms200_certificate.avif"
                alt="EPI Certificate of Conformance ANSI/TIA-942 Rated-3"
                width={350}
                height={480}
                className="relative z-10 w-full h-auto object-contain rounded-xl"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
