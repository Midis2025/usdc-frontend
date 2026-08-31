"use client";

import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════ Press Release Hero ═══════════════════════════
   Ultra-premium hero with multi-layered aurora orb, animated star particles,
   scan-line texture, gradient typography and floating stat counters.
   ═══════════════════════════════════════════════════════════════════════ */

export default function PressReleaseHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(32px)",
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[60vh] md:min-h-[100vh] overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 md:pt-0 md:pb-0"
      style={{ background: "#04070f" }}
    >
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
            src="/USDC website/Group 336.webp"
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
      </div>
      {/* ── Custom keyframes ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroScanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100vh); }
            }
          `,
        }}
      />





      {/* ── Horizontal scan-line texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(160,210,255,0.15) 2px, rgba(160,210,255,0.15) 3px)",
        }}
      />


      {/* ═══ TEXT CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div
          style={enter(100)}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
            Press &amp; Media Center
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10"
        >
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:0ms]">Discover&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:80ms]">Our&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:160ms] text-[#3daeff] select-none">Latest</span>
          </span>
          <br />
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:240ms]">Press&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:320ms]">Releases</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={enter(360)}
          className="text-[14px] md:text-[16px] text-white/70 leading-[1.85] max-w-[520px] font-light"
        >
          Stay informed with the latest announcements, partnerships and milestones shaping the future of AI infrastructure.
        </p>
      </div>
    </section>
  );
}
