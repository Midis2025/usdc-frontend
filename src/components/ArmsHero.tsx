"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArmsHero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-screen bg-[#04070f] text-white flex items-center pt-24 pb-12 md:pt-36 md:pb-16 overflow-hidden select-none">

      {/* ── Hero Background Image ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/Group 341.avif"
          alt="ARMS Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-blue-600/[0.07] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
            The People Behind The Power
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 uppercase">
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:0ms]">ARMS&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:80ms] text-[#3daeff] select-none">Modular&nbsp;</span>
          </span>
          <span className="animate-slide-up-mask">
            <span className="animate-slide-up-inner [animation-delay:160ms] text-[#3daeff] select-none">Systems</span>
          </span>
        </h1>

        <p className="text-[14px] md:text-[15px] text-white/65 font-normal leading-[1.8] max-w-[620px] mb-10 font-sans line-clamp-3">
          Each ARMS 200 unit delivers up to 1.8 MW of critical IT load in a compact,
          rapidly deployable package — designed for Tier III redundancy
          and concurrent maintainability.
        </p>

        {/* CTA */}
        <Link href="#arms-specs"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-white text-[13px] font-bold cursor-pointer transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #3daeff 0%, #0068d6 100%)",
            boxShadow: "0 0 0 1px rgba(61,174,255,0.3), 0 8px 28px rgba(61,174,255,0.3)",
          }}>
          <span>Explore Specs</span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/40 group-hover:border-white transition-colors duration-300">
            <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
    </section>
  );
}
