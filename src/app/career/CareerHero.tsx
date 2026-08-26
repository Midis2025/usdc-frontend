"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ═══════════════════════ Career Hero ═══════════════════════ */

const ROLES_TICKER = [
  "Chiller Operator",
  "Mechanical Technician",
  "Data Center MEP Engineer",
  "MEP Manager",
];

export default function CareerHero() {
  const [mounted, setMounted] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % ROLES_TICKER.length);
        setTickerVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const fade = (d: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-16 pt-28 pb-20 overflow-hidden bg-[#04070f] select-none"
      style={{
        backgroundImage: "url('/Group 346.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      {/* ── Deep layered glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.10) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,100,200,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
        <div className="absolute top-[30%] right-[-8%] w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(80,60,200,0.05) 0%, transparent 70%)", filter: "blur(90px)" }} />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* ── Floating orbs ── */}
      {[
        { size: 6, top: "15%", left: "8%", dur: "8s", del: "0s", opacity: 0.3 },
        { size: 4, top: "25%", left: "88%", dur: "10s", del: "1.5s", opacity: 0.2 },
        { size: 8, top: "70%", left: "12%", dur: "7s", del: "3s", opacity: 0.25 },
        { size: 5, top: "60%", left: "82%", dur: "9s", del: "0.8s", opacity: 0.2 },
        { size: 3, top: "45%", left: "5%", dur: "11s", del: "2s", opacity: 0.15 },
        { size: 4, top: "80%", left: "70%", dur: "8s", del: "4s", opacity: 0.2 },
      ].map((orb, i) => (
        <div key={i} className="absolute rounded-full animate-float pointer-events-none"
          style={{
            width: orb.size, height: orb.size,
            top: orb.top, left: orb.left,
            background: `radial-gradient(circle, rgba(61,174,255,${orb.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${orb.size * 3}px rgba(61,174,255,0.4)`,
            animationDuration: orb.dur,
            animationDelay: orb.del,
          }} />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">

        {/* Badge */}
        <div style={fade(0)}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
            We&apos;re Hiring · Join the AI Infrastructure Revolution
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10" style={fade(80)}>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:0ms]">We&apos;re&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:80ms]">looking&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:160ms] text-[#3daeff] select-none">for&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:240ms] text-[#3daeff] select-none">builders.</span>
          </span>
        </h1>

        {/* Animated role ticker */}
        <div className="flex items-center gap-3 mb-10 min-h-10 flex-wrap justify-center" style={fade(160)}>
          <span className="text-[15px] md:text-[17px] text-white/45 font-medium">Hiring</span>
          <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg border border-[#3daeff]/40 bg-[#3daeff]/[0.08] shadow-[0_0_18px_rgba(61,174,255,0.18),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden h-9 w-[190px] md:w-[240px]">
            <span
              className="text-[14px] md:text-[16px] font-bold text-[#3daeff] block w-full text-center"
              style={{
                opacity: tickerVisible ? 1 : 0,
                transform: tickerVisible ? "translateY(0)" : "translateY(-8px)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                whiteSpace: "nowrap",
              }}
            >
              {ROLES_TICKER[tickerIdx]}
            </span>
          </div>
          <span className="text-[15px] md:text-[17px] text-white/45 font-medium">&amp; more.</span>
        </div>

        {/* Sub-copy */}
        <p className="text-[15px] md:text-[16px] text-white/40 max-w-[560px] leading-[1.85] mb-12" style={fade(220)}>
          USDC is transforming underutilized energy assets into enterprise-scale <br />
          AI compute infrastructure. Join us at the frontier — where megawatts meet machine intelligence.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20" style={fade(300)}>
          <a href="#open-roles"
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-[13px] font-bold overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #3daeff 0%, #0068d6 100%)",
              boxShadow: "0 0 0 1px rgba(61,174,255,0.3), 0 8px 32px rgba(61,174,255,0.35)",
            }}>
            <span className="relative z-10">Explore Open Roles</span>
            <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border border-white/40 group-hover:border-white transition-colors duration-300">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            {/* Shine sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)", backgroundSize: "200% 100%" }} />
          </a>

          <a href="#career-culture"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.02] hover:bg-white/[0.04] text-white/60 hover:text-white text-[13px] font-semibold transition-all duration-300 cursor-pointer">
            <span>Our Culture</span>
            <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-300" />
          </a>
        </div>

        {/* Stats row */}
        <div className="w-full max-w-[700px]" style={fade(400)}>
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#3daeff]/35 via-white/[0.05] to-[#3daeff]/5 shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(8,13,26,0.9) 0%, rgba(4,7,15,0.95) 100%)",
              }}>
              {/* Top accent line */}
              <div className="absolute top-0 left-[15%] right-[15%] h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.5), transparent)" }} />

              <div className="flex flex-col sm:flex-row items-center justify-center w-full py-2">
                {[
                  { value: "50+", label: "Open Roles", sub: "Across all teams" },
                  { value: "4", label: "US Sites", sub: "& growing" },
                  { value: "100%", label: "AI-Native", sub: "Infrastructure" },
                ].map((s, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flex-1 flex flex-col items-center py-6 px-4 gap-1 w-full">
                      <span className="text-[28px] md:text-[32px] font-black text-white leading-none tracking-tight"
                        style={{ textShadow: "0 0 20px rgba(61,174,255,0.3)" }}>
                        {s.value}
                      </span>
                      <span className="text-[10px] font-bold text-[#3daeff]/80 tracking-[0.15em] uppercase">{s.label}</span>
                      <span className="text-[9px] text-white/25 tracking-wider">{s.sub}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden sm:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>

      {/* Bottom gradient mask */}
      <div className="absolute bottom-0 left-0 w-full h-36 pointer-events-none"
        style={{ background: "linear-gradient(to top, #04070f, transparent)" }} />
    </section>
  );


  
}














