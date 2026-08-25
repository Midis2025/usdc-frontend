"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { useReveal } from "@/components/contact/useReveal";

/* ═══════════════════════ Contact CTA ═══════════════════════
   Large futuristic call-to-action inside a floating glass panel
   with a rotating holographic border, drifting background orbs,
   an animated-gradient magnetic button and a glow-pulse halo.
   ═══════════════════════════════════════════════════════════ */

export default function ContactCTA() {
  const ref = useReveal<HTMLDivElement>(120);

  return (
    <section className="relative w-full bg-[#04070f] py-24 md:py-32 overflow-hidden">
      {/* drifting background orbs */}
      <div className="absolute top-1/4 left-[12%] w-3 h-3 rounded-full bg-[#3daeff]/60 blur-[2px] cx-floatY" />
      <div className="absolute bottom-1/3 right-[18%] w-2 h-2 rounded-full bg-cyan-300/60 blur-[1px] cx-floatY" style={{ animationDelay: "1.4s" }} />
      <div className="absolute top-1/3 right-[30%] w-1.5 h-1.5 rounded-full bg-white/50 cx-pulse" />
      <div className="absolute bottom-1/4 left-[28%] w-2 h-2 rounded-full bg-[#3daeff]/50 cx-pulse" style={{ animationDelay: "0.8s" }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[420px] bg-blue-500/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div ref={ref} className="relative z-10 w-full max-w-[1080px] mx-auto px-6 md:px-10">
        <div className="cx-reveal relative rounded-[30px] p-[1px] overflow-hidden">
          {/* rotating holographic border */}
          <div className="absolute -inset-[60%] cx-spin-slow opacity-60 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(61,174,255,0.6), transparent 30%, transparent 55%, rgba(140,224,255,0.5), transparent 85%)",
              }}
            />
          </div>

          {/* panel */}
          <div className="relative rounded-[29px] bg-[#070b16]/85 backdrop-blur-2xl border border-white/[0.08] px-5 sm:px-14 py-10 md:py-18 text-center shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
            {/* inner grid texture */}
            <div
              className="absolute inset-0 opacity-[0.4] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(61,174,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,174,255,0.05) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage:
                  "radial-gradient(circle at 50% 40%, black, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 40%, black, transparent 75%)",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3daeff]/30 bg-[#3daeff]/10 mb-7">
                <Rocket className="w-3.5 h-3.5 text-[#7fc8ff]" />
                <span className="text-[9.5px] font-bold tracking-[0.24em] uppercase text-[#7fc8ff]">
                  Ready when you are
                </span>
              </div>

              <h2 className="text-[34px] sm:text-[48px] md:text-[54px] font-bold tracking-tight leading-[1.05] text-white mb-6 max-w-3xl mx-auto">
                Start Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] via-[#3daeff] to-[#0091ff] cx-gradient-flow">
                  Infrastructure Journey
                </span>
              </h2>

              <p className="text-[15px] text-white/55 leading-[1.75] max-w-[560px] mx-auto mb-10">
                From a single rack to a sovereign AI campus — our team scopes,
                builds and operates infrastructure at the speed of your
                ambition. Let&apos;s map your path to deployment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticCTA />
                <a
                  href="#contact-portal"
                  className="px-7 py-4 rounded-xl border border-white/12 hover:border-white/25 hover:bg-white/[0.03] text-white/85 hover:text-white text-[13px] font-semibold transition-all backdrop-blur-sm"
                >
                  Talk to an architect
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticCTA() {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [o, setO] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setO({
      x: (e.clientX - (r.left + r.width / 2)) * 0.3,
      y: (e.clientY - (r.top + r.height / 2)) * 0.4,
    });
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setO({ x: 0, y: 0 })}
      style={{ transform: `translate(${o.x}px, ${o.y}px)` }}
      className="group relative px-8 py-4 rounded-xl overflow-hidden text-white text-[13px] font-bold tracking-[0.06em] flex items-center justify-center gap-2.5 transition-transform duration-200 active:scale-[0.98]"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#0082f3] via-[#3daeff] to-[#0082f3] cx-gradient-flow" />
      <span className="absolute inset-0 shadow-[0_0_40px_rgba(61,174,255,0.6)] cx-pulse opacity-70" />
      <span className="absolute top-0 bottom-0 w-1/3 -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
      <span className="relative flex items-center gap-2.5">
        Start Your Journey
        <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40">
          <ArrowRight className="w-3 h-3" />
        </div>
      </span>
    </button>
  );
}
