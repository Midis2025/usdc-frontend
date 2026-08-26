import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section 
      className="relative w-full min-h-[60vh] md:min-h-screen bg-[#04070f] text-white flex items-center pt-24 pb-12 md:pt-36 md:pb-16 overflow-hidden select-none"
    >
      {/* ── Ambient Background Image ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/About hero bg.webp"
          alt="About Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

        {/* ── Content (Badge, Title, Subtitle, Joined Capsule Button) ── */}
        <div className="flex flex-col items-center text-center relative z-20 animate-fade-in">

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              About Our Company
            </span>
          </div>

          {/* Main Cloned Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10">
            <span className="inline-block md:whitespace-nowrap">
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:0ms]">Building&nbsp;</span>
              </span>
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:80ms]">The&nbsp;</span>
              </span>
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:160ms]">Future&nbsp;</span>
              </span>
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:240ms]">Of&nbsp;</span>
              </span>
            </span>
            <br className="hidden md:inline" />
            <span className="inline-block md:whitespace-nowrap">
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:320ms] text-[#3daeff] select-none">AI&nbsp;</span>
              </span>
              <span className="animate-slide-up-mask">
                <span className="animate-slide-up-inner [animation-delay:400ms] text-[#3daeff] select-none">Infrastructure</span>
              </span>
            </span>
          </h1>

          {/* Description Subtitle */}
          <p className="text-[14px] md:text-[15px] text-white/60 font-normal leading-[1.7] max-w-[620px] mb-10 font-sans">
            Transforming underutilized energy assets into enterprise-scale AI
            infrastructure designed for next-generation compute and AI deployment.
          </p>

          {/* Get in Touch Button */}
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-6 py-3 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[13px] font-bold rounded-lg transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_24px_rgba(61,174,255,0.4)]"
          >
            <span>Get in Touch</span>
            <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40 group-hover:border-white/70 transition-colors">
              <ArrowRight className="w-2.5 h-2.5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </Link>

        </div>

      </div>

      {/* Separator Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

    </section>
  );
}
