"use client";

import React from "react";
import { Zap, Clock, Shield, Cpu, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";


export default function Hero() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-28 pb-12 sm:pb-16 relative min-h-[100dvh] select-none overflow-hidden max-w-full w-full">

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/usdc-hero.mp4" type="video/mp4" />
        </video>
        {/* Black gradient fade — top & bottom (increased contrast in the middle for maximum text & button readability) */}
        <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#04070f]/85 via-[#04070f]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#04070f]/90 via-[#04070f]/55 to-transparent" />
      </div>

      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-8 animate-fade-in shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(61,174,255,0.06)] relative z-10">
        <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
        <span className="text-[10px] font-semibold text-white/85 tracking-[0.2em] uppercase font-sans">
          Premium Data Center Solutions
        </span>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10">
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:0ms]">Deploy&nbsp;</span>
        </span>
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:80ms] text-[#3daeff] select-none">AI&nbsp;</span>
        </span>
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:160ms] text-[#3daeff] select-none">Infrastructure</span>
        </span>
        <br />
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:240ms]">in&nbsp;</span>
        </span>
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:320ms]">Months&nbsp;</span>
        </span>
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:400ms]">Not&nbsp;</span>
        </span>
        <span className="animate-slide-up-mask">
          <span className="animate-slide-up-inner [animation-delay:480ms]">Years</span>
        </span>
      </h1>

      {/* Hero Description */}
      <p className="text-sm md:text-base text-white/60 max-w-[640px] font-normal leading-[1.65] mb-10 animate-slide-up [animation-delay:150ms] relative z-10">
        We specialize in building and managing state-of-the-art data centers,<br className="hidden sm:inline" /> providing
        infrastructure solutions tailored for the evolving needs of the digital economy.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto px-4 relative z-10 animate-slide-up [animation-delay:250ms]">
        {/* Explore Data Centers */}
        <Link href="/data-center" className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white text-[13px] font-semibold rounded-[8px] flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_24px_rgba(61,174,255,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer">
          <span>Explore Data Centers</span>
          <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/40">
            <ArrowRight className="w-3 h-3 text-white animate-pulse" />
          </div>
        </Link>

        {/* Latest Presentation */}
        <Link href="/contact" className="w-full sm:w-auto px-6 py-3.5 border border-white/12 hover:border-[#3daeff]/30 hover:bg-white/[0.02] text-white/90 hover:text-white text-[13px] font-semibold rounded-[8px] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all duration-200 cursor-pointer">
          <span>Latest Presentation</span>
          <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border border-white/20">
            <ArrowDown className="w-3 h-3 text-white/70" />
          </div>
        </Link>
      </div>

      {/* Styles for premium interaction */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.02), 0 0 15px rgba(61, 174, 255, 0.1); border-color: rgba(61, 174, 255, 0.15); }
            50% { box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.02), 0 0 28px rgba(61, 174, 255, 0.35); border-color: rgba(61, 174, 255, 0.45); }
          }
          .hero-capsule-glow {
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .hero-capsule-glow:hover {
            animation: pulseGlow 2.5s infinite ease-in-out;
            background-color: rgba(2, 5, 12, 0.65);
          }
          .metric-card-hover {
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .metric-card-hover:hover .metric-icon {
            transform: scale(1.18) translateY(-3px);
            color: #58c4ff;
            filter: drop-shadow(0 0 8px rgba(61, 174, 255, 0.65));
          }
          .metric-card-hover:hover .metric-value {
            text-shadow: 0 0 14px rgba(61, 174, 255, 0.5);
            color: #ffffff;
            transform: scale(1.04);
          }
          .metric-icon {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .metric-value {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `
      }} />

      {/* Metrics Capsule Dashboard */}
      <div className="w-full max-w-5xl mx-auto bg-[#010409]/75 border border-white/[0.10] rounded-[20px] sm:rounded-[24px] py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-10 grid grid-cols-2 md:flex md:flex-row items-center justify-center text-center gap-2 sm:gap-3 md:gap-2 relative z-10 shadow-[0_20px_55px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.03)] animate-slide-up [animation-delay:350ms] hero-capsule-glow">

        {/* Metric 1 */}
        <div className="flex-1 flex flex-col items-center gap-1 md:gap-2 text-center w-full metric-card-hover p-1.5 sm:p-2 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/[0.02] cursor-default group min-w-0">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#3daeff] opacity-90 metric-icon" />
          <span className="text-base sm:text-xl md:text-[28px] font-bold text-white/90 tracking-tight leading-none metric-value truncate w-full">
            1-50MW+
          </span>
          <span className="text-[8px] md:text-[9px] font-semibold text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-0.5 group-hover:text-white/60 transition-colors duration-300">
            Power Capacity
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />

        {/* Metric 2 */}
        <div className="flex-1 flex flex-col items-center gap-1 md:gap-2 text-center w-full metric-card-hover p-1.5 sm:p-2 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/[0.02] cursor-default group min-w-0">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#3daeff] opacity-90 metric-icon" />
          <span className="text-base sm:text-xl md:text-[28px] font-bold text-white/90 tracking-tight leading-none metric-value truncate w-full">
            4 Months
          </span>
          <span className="text-[8px] md:text-[9px] font-semibold text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-0.5 group-hover:text-white/60 transition-colors duration-300">
            Deployment Timeline
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />

        {/* Metric 3 */}
        <div className="flex-1 flex flex-col items-center gap-1 md:gap-2 text-center w-full metric-card-hover p-1.5 sm:p-2 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/[0.02] cursor-default group min-w-0">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#3daeff] opacity-90 metric-icon" />
          <span className="text-base sm:text-xl md:text-[28px] font-bold text-white/90 tracking-tight leading-none metric-value truncate w-full">
            TIER III
          </span>
          <span className="text-[8px] md:text-[9px] font-semibold text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-0.5 group-hover:text-white/60 transition-colors duration-300">
            Design Standard
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />

        {/* Metric 4 */}
        <div className="flex-1 flex flex-col items-center gap-1 md:gap-2 text-center w-full metric-card-hover p-1.5 sm:p-2 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/[0.02] cursor-default group min-w-0">
          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#3daeff] opacity-90 metric-icon" />
          <span className="text-base sm:text-xl md:text-[28px] font-bold text-white/90 tracking-tight leading-none metric-value truncate w-full">
            100%
          </span>
          <span className="text-[8px] md:text-[9px] font-semibold text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-0.5 group-hover:text-white/60 transition-colors duration-300">
            AI Ready
          </span>
        </div>

      </div>
    </main>
  );
}
