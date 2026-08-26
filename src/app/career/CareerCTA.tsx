"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

/* ═══════════════════════ Career CTA — Premium ═══════════════════════ */

const STEPS = [
  { 
    num: "01", 
    title: "Apply Online", 
    body: (
      <>
        Submit your application in under 5 minutes. <br /> No cover letter required — just your resume.
      </>
    )
  },
  { num: "02", title: "Intro Call", body: "A 30-min conversation with our team to understand your background and your ambitions." },
  { num: "03", title: "Technical Review", body: "A focused, respectful assessment aligned to the role — no trick questions, no puzzles." },
  { num: "04", title: "Offer & Onboard", body: "Fast decisions. If it's a fit, we move quickly. Onboarding designed for day-one impact." },
];

export default function CareerCTA() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
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
    <section ref={ref}
      className="w-full relative overflow-hidden py-28 md:py-36"
      style={{ background: "#04070f" }}>

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.15), transparent)" }} />

      {/* Deep center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 900, height: 500,
          background: "radial-gradient(ellipse, rgba(61,174,255,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(ellipse, rgba(61,174,255,0.07) 0%, transparent 70%)",
          filter: "blur(30px)",
        }} />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Hiring Process ── */}
        <div className="mb-24" style={fadeUp(0)}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-7">
              <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[9px] font-bold text-white/60 tracking-[0.28em] uppercase">Hiring Process</span>
            </div>
            <h2 className="text-[34px] sm:text-[42px] md:text-[56px] font-black tracking-[-0.02em] text-white">
              Simple.{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(120deg, #74d1ff, #3daeff, #0068d6)" }}>
                Transparent.
              </span>{" "}
              Fast.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">


            {STEPS.map((s, i) => (
              <div key={i} className="group relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(8,13,26,0.7)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  ...fadeUp(i * 80),
                }}>
                {/* Top hover line */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.5), transparent)" }} />

                {/* Step number */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl z-10"
                  style={{
                    background: "rgba(61,174,255,0.07)",
                    border: "1px solid rgba(61,174,255,0.18)",
                  }}>
                  <span className="text-[13px] font-black text-[#3daeff]/80 tracking-wider">{s.num}</span>
                  {/* Ring pulse */}
                  <div className="absolute -inset-1 rounded-xl border border-[#3daeff]/10 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </div>

                <h3 className="text-[15px] font-bold text-white group-hover:text-[#3daeff] transition-colors duration-200">{s.title}</h3>
                <p className="text-[12.5px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.38)" }}>{s.body}</p>

                {/* Large step watermark */}
                <div className="absolute bottom-3 right-4 text-[56px] font-black leading-none pointer-events-none select-none"
                  style={{ color: "rgba(61,174,255,0.04)" }}>
                  {s.num}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Final CTA card ── */}
        <div className="relative rounded-[28px] overflow-hidden" style={fadeUp(300)}>
          {/* Background layers */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(10,18,36,0.98) 0%, rgba(5,9,18,0.98) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(61,174,255,0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
              opacity: 0.5,
            }} />
          {/* Top shimmer */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.6), transparent)" }} />
          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top left, rgba(61,174,255,0.07) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(80,60,200,0.06) 0%, transparent 65%)" }} />

          <div className="relative z-10 px-10 sm:px-16 md:px-20 py-16 md:py-20 flex flex-col items-center text-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
              style={{
                background: "rgba(52,211,153,0.06)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"
                style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)", animation: "glowPulse 2s ease-in-out infinite" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#34d399]/90">
                Actively hiring — apply today
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-[42px] sm:text-[56px] md:text-[52px] font-black tracking-[-0.025em] leading-[0.95] text-white mb-6">
              Ready to shape{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(125deg, #74d1ff 0%, #3daeff 35%, #0068d6 80%)" }}>
                the AI era?
              </span>
            </h2>

            <p className="text-[14px] md:text-[16px] max-w-[500px] leading-[1.85] mb-12"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              Join a mission-driven team of builders deploying real infrastructure at scale.
              Your next career-defining chapter starts here.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
              <a href="#open-roles"
                className="group relative flex items-center gap-3 px-9 py-4 rounded-2xl text-white text-[13.5px] font-bold overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #3daeff 0%, #0068d6 100%)",
                  boxShadow: "0 0 0 1px rgba(61,174,255,0.3), 0 10px 40px rgba(61,174,255,0.4)",
                }}>
                <span className="relative z-10">View All Open Roles</span>
                <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border border-white/40 group-hover:border-white transition-colors duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                {/* Hover shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)" }} />
              </a>

              <a href="mailto:careers@usdc.com"
                className="group flex items-center gap-2.5 px-9 py-4 rounded-2xl text-[13.5px] font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                }}>
                <Mail className="w-4 h-4" />
                <span>Email Us Directly</span>
              </a>
            </div>


          </div>
        </div>

      </div>
    </section>
  );
}
