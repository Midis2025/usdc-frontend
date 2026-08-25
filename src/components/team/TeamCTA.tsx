"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Cpu, Zap, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function TeamCTA() {
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
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const opportunities = [
    {
      icon: Zap,
      title: "Energy Partnership",
      desc: "Deploy modular compute directly at your primary renewable or stranded energy assets.",
    },
    {
      icon: Cpu,
      title: "Wholesale Compute",
      desc: "Secure long-term leases on custom Blackwell GPU clusters and sovereign cloud layers.",
    },
    {
      icon: HeartHandshake,
      title: "Career Portals",
      desc: "Join our remote-first team of electrical engineers, site managers and network designers.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#04070f] py-6 md:py-20 lg:py-28 overflow-hidden select-none"
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3daeff]/20 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#3daeff]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Main Card Container */}
        <div
          style={fadeUp(0)}
          className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-[#071324]/85 to-[#04070f]/95 p-6 sm:p-10 md:p-14 shadow-[0_25px_55px_rgba(0,0,0,0.5)]"
        >
          {/* Internal Grid Backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(61,174,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,174,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing Top Edge */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#3daeff]/40 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left Column: Heading and action */}
            <div className="flex flex-col items-start text-left">
              <div
                style={fadeUp(80)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3daeff]/15 bg-[#3daeff]/5 mb-6"
              >
                <Cpu className="w-3.5 h-3.5 text-[#3daeff]" />
                <span className="text-[9px] font-bold text-[#3daeff]/80 tracking-[0.2em] uppercase font-sans">
                  PARTNERSHIP & CAREER PORTAL
                </span>
              </div>

              <h2
                style={fadeUp(140)}
                className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold tracking-tight leading-[1.12] text-white mb-5"
              >
                Join the Architects of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">
                  Dense Compute
                </span>
              </h2>

              <p
                style={fadeUp(200)}
                className="text-[13px] text-white/50 leading-[1.8] max-w-[460px] mb-8 font-normal"
              >
                We are constantly expanding our multi-site compute footprint. Partner with us to convert grid assets, lease dedicated AI nodes, or join our systems engineering cohorts.
              </p>

              {/* Action Buttons */}
              <div
                style={fadeUp(260)}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white text-[11px] font-bold tracking-[0.08em] uppercase shadow-[0_4px_16px_rgba(61,174,255,0.2)] hover:shadow-[0_6px_22px_rgba(61,174,255,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/management-team"
                  className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-white/80 hover:text-white text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300"
                >
                  MEET TEAM
                </Link>
              </div>
            </div>

            {/* Right Column: Dynamic Channels List */}
            <div className="flex flex-col gap-4">
              {opportunities.map((item, idx) => (
                <div
                  key={idx}
                  style={fadeUp(200 + idx * 80)}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:border-[#3daeff]/15 hover:bg-white/[0.03] transition-all duration-400 cursor-pointer"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3daeff]/5 border border-[#3daeff]/10 text-[#3daeff] flex-shrink-0">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[13px] font-bold text-white/80 mb-1 group-hover:text-[#3daeff] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] text-white/40 leading-[1.65]">
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-[#3daeff] ml-auto mt-1 flex-shrink-0 transition-colors" />
                </div>
              ))}
            </div>

          </div>

          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-3xl pointer-events-none" />
        </div>

        {/* Media footnote */}
        <div
          style={fadeUp(380)}
          className="mt-8 text-center text-[10px] text-white/20 uppercase font-mono tracking-widest"
        >
          SECURE ENCRYPTED COMMUNICATIONS CHANNEL // PORTAL: ACTIVE
        </div>
      </div>
    </section>
  );
}
