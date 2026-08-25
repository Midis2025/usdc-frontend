"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, Target, Telescope, Wrench } from "lucide-react";

/* ═══════════════════════ Culture & Values — Premium ═══════════════════════ */

const values = [
  {
    num: "01",
    title: "Ownership Mindset",
    body: (
      <>
        Every engineer, analyst and operator owns their domain fully. <br />
        We don&apos;t have passengers — we have pilots.
      </>
    ),
    icon: <Zap className="w-6 h-6 text-[#3daeff]" />,
  },
  {
    num: "02",
    title: "Speed with Precision",
    body: "We move fast because the opportunity demands it. But speed without integrity is chaos — we hold both.",
    icon: <Target className="w-6 h-6 text-[#3daeff]" />,
  },
  {
    num: "03",
    title: "Radical Transparency",
    body: (
      <>
        Our metrics, challenges and progress are shared openly across all levels. <br />
        No black boxes, no hidden agendas.
      </>
    ),
    icon: <Telescope className="w-6 h-6 text-[#3daeff]" />,
  },
  {
    num: "04",
    title: "Builders Welcome",
    body: (
      <>
        We hire people who see a gap and fill it without waiting for permission. <br />
        Initiative is our highest-valued trait.
      </>
    ),
    icon: <Wrench className="w-6 h-6 text-[#3daeff]" />,
  },
];

const milestones = [
  { year: "2022", event: "USDC founded in Miami, FL" },
  { year: "2023", event: "First site acquired — 55MW capacity" },
  { year: "2024", event: "ARMS 200 platform launched" },
  { year: "2025", event: "400MW+ pipeline across 4 US states" },
];

export default function CareerCulture() {
  const [inView, setInView] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fadeUp = (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  return (
    <section id="career-culture" ref={ref}
      className="w-full relative overflow-hidden py-28 md:py-36"
      style={{ background: "linear-gradient(180deg, #04070f 0%, #060a16 50%, #04070f 100%)" }}>

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.15), transparent)" }} />

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.03) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Section header ── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8" style={fadeUp(0)}>
            <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[9px] font-bold text-white/60 tracking-[0.28em] uppercase">Culture & Values</span>
          </div>
          <h2 className="text-[38px] sm:text-[48px] md:text-[52px] font-black tracking-[-0.02em] leading-[1.0] text-white" style={fadeUp(80)}>
            How we{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(120deg, #74d1ff, #3daeff, #0068d6)" }}>
              think & work.
            </span>
          </h2>
          <p className="text-[14px] md:text-[15px] max-w-[520px] mx-auto leading-[1.85] mt-5" style={{ color: "rgba(255,255,255,0.38)", ...fadeUp(140) }}>
            Culture at USDC isn&apos;t a slide deck — it&apos;s a daily practice. Four principles
            guide every decision, design and deployment we ship.
          </p>
        </div>

        {/* ── Interactive values selector ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-24" style={fadeUp(180)}>

          {/* Left: selector tabs */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {values.map((v, i) => {
              const isAct = activeValue === i;
              return (
                <button key={i} onClick={() => setActiveValue(i)}
                  className="group text-left px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                  style={{
                    background: isAct ? "rgba(12,20,40,0.95)" : "rgba(8,13,26,0.4)",
                    border: isAct ? "1px solid rgba(61,174,255,0.25)" : "1px solid rgba(255,255,255,0.04)",
                    boxShadow: isAct ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,174,255,0.08)" : "none",
                  }}>
                  {/* Left bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(180deg, #3daeff, #0068d6)",
                      opacity: isAct ? 1 : 0,
                      boxShadow: isAct ? "0 0 8px rgba(61,174,255,0.6)" : "none",
                    }} />

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-black tracking-widest transition-colors duration-200"
                      style={{ color: isAct ? "#3daeff" : "rgba(255,255,255,0.2)" }}>
                      {v.num}
                    </span>
                    <span className="text-[14px] font-bold transition-colors duration-200"
                      style={{ color: isAct ? "#fff" : "rgba(255,255,255,0.5)" }}>
                      {v.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: expanded content panel */}
          <div className="lg:col-span-3 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(12,20,40,0.95) 0%, rgba(8,13,26,0.98) 100%)",
              border: "1px solid rgba(61,174,255,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(61,174,255,0.06)",
            }}>

            {/* Top accent */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.4), transparent)" }} />

            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top right, rgba(61,174,255,0.07) 0%, transparent 65%)" }} />

            <div className="p-10 md:p-14 flex flex-col h-full min-h-[280px] justify-between">
              <div>
                {/* Icon + number */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/[0.06] border border-blue-400/[0.1] flex items-center justify-center flex-shrink-0">
                    {values[activeValue].icon}
                  </div>
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(61,174,255,0.3), transparent)" }} />
                  <span className="text-[11px] font-black tracking-widest text-[#3daeff]/50">
                    {values[activeValue].num} / 04
                  </span>
                </div>

                <h3 className="text-[26px] md:text-[32px] font-black text-white tracking-tight leading-tight mb-5">
                  {values[activeValue].title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {values[activeValue].body}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-10">
                {values.map((_, i) => (
                  <button key={i} onClick={() => setActiveValue(i)}
                    className="transition-all duration-300 rounded-full cursor-pointer"
                    style={{
                      width: activeValue === i ? 24 : 6,
                      height: 6,
                      background: activeValue === i ? "#3daeff" : "rgba(255,255,255,0.15)",
                      boxShadow: activeValue === i ? "0 0 8px rgba(61,174,255,0.5)" : "none",
                    }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Company timeline ── */}
        <div style={fadeUp(280)}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              Our Journey
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((m, i) => (
              <div key={i} className="group relative rounded-2xl px-6 py-5 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(8,13,26,0.7)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}>

                {/* Hover top glow */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.5), transparent)" }} />

                <div className="text-[11px] font-black tracking-[0.2em] mb-3 transition-colors duration-200 group-hover:text-[#3daeff]"
                  style={{ color: "rgba(61,174,255,0.5)" }}>
                  {m.year}
                </div>
                <div className="text-[13px] font-semibold text-white/70 leading-snug group-hover:text-white transition-colors duration-200">
                  {m.event}
                </div>

                {/* Number watermark */}
                <div className="absolute bottom-2 right-4 text-[48px] font-black leading-none pointer-events-none select-none"
                  style={{ color: "rgba(61,174,255,0.03)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
