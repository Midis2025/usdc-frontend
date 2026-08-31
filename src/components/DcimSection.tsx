"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Activity, ShieldAlert, Cpu, Zap } from "lucide-react";

type DcimTab = "cooling" | "power";

export default function DcimSection() {
  const [activeTab, setActiveTab] = useState<DcimTab>("cooling");
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
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const tabContent = {
    cooling: {
      src: "/image.webp",
      alt: "USDC DCIM Cooling Loop Telemetry Dashboard",
      title: "Closed-Loop Cooling Telemetry",
      badge: "LIQUID COOLING MANIFOLD",
      desc: "Live schematic tracking of chiller piping, water tank levels, heat exchanger performance and pressure/temperature sensor array telemetry. \nSystem logs monitor chiller modes and pump flow rates in real-time.",
      features: [
        { label: "Water Tank Level", val: "0.6m" },
        { label: "Chilled Water Flow", val: "15.52 m³" },
        { label: "Cooling Mode", val: "Chiller Cooling" },
      ]
    },
    power: {
      src: "/image (1).webp",
      alt: "USDC DCIM Cabinet and Power Telemetry Dashboard",
      title: "Grid & Cabinet Load Telemetry",
      badge: "ELECTRICAL LOAD BALANCING",
      desc: "Live floor plan mapping and real-time kW telemetry monitoring for server cabinets, power factor efficiency, energy trends (kWh) and system alarm logs.",
      features: [
        { label: "Cabinet Load", val: "22 kW (Typical)" },
        { label: "Telemetry Frequency", val: "59.97 Hz" },
        { label: "Alarm Log Trigger", val: "<10% of CT Primary" },
      ]
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-6 md:py-16 border-t border-white/[0.03]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-8 md:mb-16">
          {/* Pill Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            style={fadeUp(0)}
          >
            <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-bold text-white/80 tracking-[0.2em] uppercase font-sans">
              INTELLIGENT TELEMETRY
            </span>
          </div>

          <h2
            className="text-[32px] sm:text-[40px] md:text-[56px] font-bold tracking-tight text-white mb-6 font-sans leading-[1.1] uppercase"
            style={fadeUp(80)}
          >
            USDC <span className="text-[#3daeff]">DCIM</span> Telemetry
          </h2>

          <p
            className="text-sm text-white/45 max-w-[780px] leading-relaxed font-sans"
            style={fadeUp(160)}
          >
            Datacenters operate at sub-millisecond precision. Our proprietary Data Center Infrastructure Management (DCIM) dashboard coordinates thermal loads, chiller configurations and server rack power levels dynamically to prevent anomalies and maximize compute density.
          </p>

          {/* Interactive Navigation Tabs */}
          <div
            className="flex items-center justify-center p-1 rounded-xl bg-[#02050c]/80 border border-white/[0.06] mt-10 relative z-20 max-w-sm w-full"
            style={fadeUp(220)}
          >
            <button
              onClick={() => setActiveTab("cooling")}
              className={`flex-1 py-2.5 px-4 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-300 ${activeTab === "cooling"
                  ? "bg-[#3daeff] text-white shadow-[0_4px_12px_rgba(61,174,255,0.25)]"
                  : "text-white/40 hover:text-white/70"
                }`}
            >
              Cooling Loop
            </button>
            <button
              onClick={() => setActiveTab("power")}
              className={`flex-1 py-2.5 px-4 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-300 ${activeTab === "power"
                  ? "bg-[#3daeff] text-white shadow-[0_4px_12px_rgba(61,174,255,0.25)]"
                  : "text-white/40 hover:text-white/70"
                }`}
            >
              Power &amp; Layout
            </button>
          </div>
        </div>

        {/* Dashboard Display Card */}
        <div
          className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#3daeff]/35 via-white/[0.05] to-[#3daeff]/5 shadow-[0_0_60px_rgba(61,174,255,0.05)] w-full overflow-hidden"
          style={fadeUp(280)}
        >
          <div className="w-full bg-[#02050c]/90 rounded-2xl p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Visual Dashboard Screenshot */}
            <div className="lg:col-span-8 relative w-full aspect-[3/2] sm:aspect-[2.75/1] min-h-[280px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#04070f] group">
              <Image
                src={tabContent[activeTab].src}
                alt={tabContent[activeTab].alt}
                fill
                className="object-contain sm:object-cover transition-transform duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Status Indicator */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest text-green-400 font-bold uppercase">
                  LIVE TELEMETRY
                </span>
              </div>
            </div>

            {/* Right Column: Info Details & Telemetry Values */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <div className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.02] mb-3">
                <span className="text-[9px] font-mono tracking-widest text-[#3daeff] font-bold uppercase">
                  {tabContent[activeTab].badge}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 font-sans">
                {tabContent[activeTab].title}
              </h3>

              <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-sans font-normal mb-8 whitespace-pre-line">
                {tabContent[activeTab].desc}
              </p>

              {/* Specs Sub-metrics list */}
              <div className="w-full space-y-4">
                {tabContent[activeTab].features.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/[0.06] pb-3 last:border-b-0">
                    <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider font-sans">
                      {item.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-white/95 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
