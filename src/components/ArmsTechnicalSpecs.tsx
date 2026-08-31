"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Gauge,
  Shield,
  Wind,
  Clock,
  TrendingUp,
  Box,
  Database,
  Handshake
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   ARMS 300 ANIMATED ISOMETRIC SERVER VISUAL
   ────────────────────────────────────────────────────────────────────────── */
function Arms300Visual() {
  return (
    <svg
      width="140"
      height="120"
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#3daeff] opacity-85 hover:opacity-100 transition-opacity duration-300"
    >
      {/* Ground lines */}
      <path d="M10 70L70 100M70 100L130 70" stroke="rgba(0,145,255,0.06)" strokeWidth="1" />
      <path d="M30 60L70 80M70 80L110 60" stroke="rgba(0,145,255,0.04)" strokeWidth="1" />

      {/* Isometric Server Box */}
      {/* Top face */}
      <path
        d="M70 20L105 35L70 50L35 35Z"
        fill="rgba(8, 18, 42, 0.85)"
        stroke="#3daeff"
        strokeWidth="1.5"
      />
      {/* Left face */}
      <path
        d="M35 35L35 70L70 85L70 50Z"
        fill="rgba(4, 8, 20, 0.9)"
        stroke="#3daeff"
        strokeWidth="1.5"
      />
      {/* Right face */}
      <path
        d="M70 50L70 85L105 70L105 35Z"
        fill="rgba(2, 4, 10, 0.95)"
        stroke="#3daeff"
        strokeWidth="1.5"
      />

      {/* Server grid lines (blades) on right face */}
      <path d="M74 54L101 42.5" stroke="rgba(0,145,255,0.3)" strokeWidth="1" />
      <path d="M74 60L101 48.5" stroke="rgba(0,145,255,0.3)" strokeWidth="1" />
      <path d="M74 66L101 54.5" stroke="rgba(0,145,255,0.3)" strokeWidth="1" />
      <path d="M74 72L101 60.5" stroke="rgba(0,145,255,0.3)" strokeWidth="1" />
      <path d="M74 78L101 66.5" stroke="rgba(0,145,255,0.3)" strokeWidth="1" />

      {/* Flashing server LEDs */}
      <circle cx="78" cy="52.5" r="1.2" fill="#3daeff" style={{ animation: "ledFlash 1.5s infinite" }} />
      <circle cx="78" cy="58.5" r="1.2" fill="#3daeff" style={{ animation: "ledFlash 1.5s infinite 0.3s" }} />
      <circle cx="78" cy="64.5" r="1.2" fill="#22c55e" style={{ animation: "ledFlash 1.5s infinite 0.6s" }} />
      <circle cx="78" cy="70.5" r="1.2" fill="#3daeff" style={{ animation: "ledFlash 1.5s infinite 0.1s" }} />
      <circle cx="78" cy="76.5" r="1.2" fill="#ffffff" style={{ animation: "ledFlash 1.5s infinite 0.9s" }} />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PARTNER LOGOS (RECREATED USING EMBEDDED HIGH-FIDELITY VECTOR PATHS)
   ────────────────────────────────────────────────────────────────────────── */
function SupermicroLogo() {
  return (
    <div className="flex items-center justify-center bg-black/40 px-2 py-1 rounded-xl border border-white/[0.04] w-40 h-14 relative overflow-hidden">
      <Image
        src="/supermicro_logo.avif"
        alt="Supermicro Logo"
        width={140}
        height={40}
        className="object-contain w-full h-full transform scale-110 md:scale-125"
      />
    </div>
  );
}

function NvidiaLogo() {
  return (
    <div className="flex items-center justify-center bg-black/40 px-2 py-1 rounded-xl border border-white/[0.04] w-40 h-14 relative overflow-hidden">
      <Image
        src="/nvidia_logo.avif"
        alt="NVIDIA Logo"
        width={140}
        height={40}
        className="object-contain w-full h-full transform scale-110 md:scale-125"
      />
    </div>
  );
}

function DigipowerxLogo() {
  return (
    <div className="flex items-center justify-center bg-black/40 px-2 py-1 rounded-xl border border-white/[0.04] w-40 h-14 relative overflow-hidden">
      <Image
        src="/Digipowerx.webp"
        alt="DigiPowerX Logo"
        width={140}
        height={40}
        className="object-contain w-full h-full transform scale-110 md:scale-125"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN ARMS TECHNICAL SPECS COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export default function ArmsTechnicalSpecs() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const specsList = [
    {
      name: "Critical IT Load",
      value: "Up To 1.8 MW Per Module",
      Icon: Gauge,
    },
    {
      name: "Redundancy",
      value: "Tier III (N+1)",
      Icon: Shield,
    },
    {
      name: "Cooling Systems",
      value: "Chilled-Water Or Direct-To-Chip",
      Icon: Wind,
    },
    {
      name: "Deployment Time",
      value: "4 Months",
      Icon: Clock,
    },
    {
      name: "Scalability",
      value: "1-50 MW+",
      Icon: TrendingUp,
    },
    {
      name: "Architecture",
      value: "Modular Prefabricated Pods",
      Icon: Box,
    },
  ];

  return (
    <section
      id="arms-specs"
      ref={containerRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-10 md:py-20 lg:py-28 border-t border-white/[0.03]"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ledFlash {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            @keyframes circuitFlow {
              0% { stroke-dashoffset: 100; }
              100% { stroke-dashoffset: 0; }
            }
          `,
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* ══════════ LEFT COLUMN: TECHNICAL SPECIFICATIONS ══════════ */}
          <div className="lg:col-span-6 flex flex-col items-start w-full">
            {/* Headers */}
            <div className="text-[10px] font-bold text-white/40 tracking-[0.2em] mb-1.5 uppercase font-sans">
              TECHNICAL
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-1 font-sans">
              SPECIFICATIONS
            </h2>
            <div className="w-12 h-[2px] bg-[#3daeff]/80 mt-2.5 mb-8" />

            {/* List Container Card */}
            <div className="w-full border border-white/[0.08] rounded-2xl bg-[#02050c]/25 p-5 sm:p-6 md:p-8 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col">
                {specsList.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.name}
                      className="flex flex-col sm:grid sm:grid-cols-12 gap-1.5 sm:gap-0 items-start sm:items-center py-3.5 sm:py-4.5 border-b border-white/[0.05] last:border-0 last:pb-0 first:pt-0 w-full"
                    >
                      {/* Left: Icon & Label */}
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/[0.06] border border-blue-400/[0.1] flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#3daeff]" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-white/85 tracking-wide">
                          {item.name}
                        </span>
                      </div>

                      {/* Center: Vertical Divider */}
                      <div className="col-span-1 hidden sm:flex justify-center text-white/10 font-light">
                        |
                      </div>

                      {/* Right: Spec Value */}
                      <div className="col-span-6 text-xs md:text-sm font-semibold text-[#3daeff] tracking-wide text-left pl-11 sm:pl-2">
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ══════════ RIGHT COLUMN: FUTURE READY PLATFORM ══════════ */}
          <div className="lg:col-span-6 flex flex-col items-start w-full gap-8">
            {/* Headers */}
            <div>
              <div className="text-[10px] font-bold text-white/40 tracking-[0.2em] mb-1.5 uppercase font-sans">
                FUTURE READY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-1 font-sans">
                PLATFORM
              </h2>
              <div className="w-12 h-[2px] bg-[#3daeff]/80 mt-2.5 mb-0" />
            </div>

            {/* Card 1: ARMS 300 Coming Soon */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-2.5 md:px-8 md:py-2.5 border border-white/[0.08] rounded-2xl bg-[#02050c]/25 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] group hover:border-[#3daeff]/35 transition-all duration-300">
              <div className="flex-1 flex flex-col items-start text-left">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/[0.06] border border-blue-400/[0.1] text-[#3daeff] group-hover:bg-[#3daeff]/10 group-hover:text-white transition-colors duration-300">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                      ARMS 300
                    </h3>
                  </div>
                </div>
                {/* Description */}
                <p className="text-[12px] md:text-[13px] text-white/45 leading-[1.65] max-w-[340px]">
                  The next evolution of our ARMS platform, delivering even greater capacity and efficiency for
                  next-generation AI workloads.
                </p>
              </div>
              {/* Graphic */}
              <div className="flex-shrink-0 relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] transition-all duration-300">
                <Image
                  src="/Arms 300.webp"
                  alt="ARMS 300 Model"
                  width={200}
                  height={200}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[200px] md:h-[200px] max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.08]"
                />
              </div>
            </div>

            {/* Card 2: Strategic Partnerships */}
            <div className="w-full p-6 md:p-8 border border-white/[0.08] rounded-2xl bg-[#02050c]/25 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col items-start hover:border-[#3daeff]/35 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/[0.06] border border-blue-400/[0.1] text-[#3daeff]">
                  <Handshake className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-widest uppercase font-sans">
                  STRATEGIC PARTNERSHIPS
                </h3>
              </div>
              {/* Subtext */}
              <p className="text-[12px] md:text-[13px] text-white/45 mb-6 text-left leading-[1.6]">
                DigiPowerX leverages industry-leading technology through partnerships with:
              </p>

              {/* Partner Badges */}
              <div className="w-full flex flex-col gap-4">
                {/* Partner 1: Super Micro */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                      Super Micro Computer
                    </span>
                    <span className="text-[10px] text-white/40 mt-1">
                      Advanced Server Solutions
                    </span>
                  </div>
                  <SupermicroLogo />
                </div>

                {/* Partner 2: NVIDIA */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                      NVIDIA
                    </span>
                    <span className="text-[10px] text-white/40 mt-1">
                      GPU Acceleration And AI Compute
                    </span>
                  </div>
                  <NvidiaLogo />
                </div>

                {/* Partner 3: DigiPowerX */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                      DigiPowerX
                    </span>
                    <span className="text-[10px] text-white/40 mt-1">
                      Energy Infrastructure & Compute Platforms
                    </span>
                  </div>
                  <DigipowerxLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
