"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Globe2, Cpu } from "lucide-react";

import CommunicationHub3D from "@/components/contact/CommunicationHub3D";

/* ═══════════════════════════ Contact Hero ═══════════════════════════
   Full-screen immersive hero. Particle wave field + neural grid + the
   3D AI Communication Hub centerpiece, wrapped in floating glass panels
   with mouse-responsive volumetric lighting.
   ═══════════════════════════════════════════════════════════════════ */

export default function ContactHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  // Mouse-responsive light position, %-based.
  const [light, setLight] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setLight({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  // Premium page-load sequence via CSS keyframes (no setState-in-effect).
  const enter = (d: number) =>
    `animate-slide-up [animation-fill-mode:both] [animation-delay:${d}ms]`;

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center pt-28 md:pt-32 pb-16"
    >


      {/* ── Mouse-responsive volumetric light ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] transition-[background] duration-300"
        style={{
          background: `radial-gradient(620px circle at ${light.x}% ${light.y}%, rgba(61,174,255,0.14), transparent 60%)`,
        }}
      />

      {/* ── Ambient corner glows ── */}
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-blue-500/[0.07] rounded-full blur-[150px] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 -right-24 w-[480px] h-[480px] bg-cyan-400/[0.05] rounded-full blur-[140px] pointer-events-none z-[1]" />

      {/* ── Content grid ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">
        {/* ── LEFT: copy in floating glass panel ── */}
        <div className="relative">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-7 shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${enter(80)}`}
          >
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              Enterprise AI Infrastructure
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10"
          >
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:0ms]">Let&apos;s&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:80ms]">Build&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:160ms]">The&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:240ms] text-[#3daeff] select-none">Future</span>
            </span>{" "}
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:320ms]">Together</span>
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            className={`text-sm md:text-[15px] text-white/60 leading-[1.75] max-w-[520px] mb-9 ${enter(240)}`}
          >
            Connect with the team architecting the next generation of{" "}
            <span className="text-white/80">data centers</span>,<br />
            <span className="text-white/80">AI compute</span>,{" "}
            <span className="text-white/80">colocation</span> and{" "}
            <span className="text-white/80">cloud infrastructure</span>. From
            megawatt-scale deployments to sovereign AI clusters — our engineers
            are ready to scope your build.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 ${enter(320)}`}>
            <a
              href="#contact-portal"
              className="group relative px-6 py-3.5 rounded-[10px] bg-gradient-to-r from-[#3daeff] to-[#0082f3] text-white text-[13px] font-semibold flex items-center justify-center gap-2.5 shadow-[0_6px_24px_rgba(61,174,255,0.3)] hover:shadow-[0_8px_30px_rgba(61,174,255,0.45)] active:scale-[0.98] transition-all overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">Open Communication Portal</span>
              <div className="relative flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40">
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
            <a
              href="#global-presence"
              className="px-6 py-3.5 rounded-[10px] border border-white/12 hover:border-white/25 hover:bg-white/[0.03] text-white/90 hover:text-white text-[13px] font-semibold flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all backdrop-blur-sm"
            >
              <ArrowUpRight className="w-4 h-4 text-[#3daeff]" />
              <span>View Global Network</span>
            </a>
          </div>

          {/* Mini live-status glass strip */}
          <div
            className={`inline-flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 rounded-2xl bg-[#02050c]/55 backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${enter(400)}`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-70 cx-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] text-white/70 font-medium">
                Network online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#3daeff]" />
              <span className="text-[11px] text-white/70 font-medium">
                14 regions live
              </span>
            </div>
            <span className="text-[11px] text-white/45 font-medium">
              Avg. response &lt; 2 hrs
            </span>
          </div>
        </div>

        {/* ── RIGHT: 3D Communication Hub ── */}
        <div className={`relative ${enter(260)}`}>
          <div className="relative aspect-square w-full max-w-[560px] mx-auto cx-floatY">
            {/* The Three.js hub */}
            <CommunicationHub3D />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#04070f] pointer-events-none z-[2]" />
    </section>
  );
}
