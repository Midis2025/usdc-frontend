"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BuildingFutureSection() {
  return (
    <section className="w-full bg-[#04070f] py-20 md:py-28 text-white select-none overflow-hidden relative border-t border-white/[0.03]">

      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Premium Static Image ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full animate-fade-in">
            {/* Ambient halo behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-cyan-500/[0.04] blur-[60px] pointer-events-none" />

            <div className="w-full max-w-[460px] aspect-square flex items-center justify-center overflow-hidden rounded-2xl relative">
              <Image
                src="/image 6.avif"
                alt="USDC ARMS 200 AI-Ready Modular Solution"
                width={460}
                height={460}
                className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(61,174,255,0.15)]"
              />
            </div>
          </div>

          {/* ── Right Column: Clean Copy & Action Button ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Title Heading */}
            <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight text-white leading-[1.1] mb-6 font-sans">
              Building the <span className="text-[#3daeff]">future</span> <br />
              from day one
            </h2>

            {/* Paragraph Subtitle Description */}
            <p className="text-[15px] md:text-[16px] text-white/50 font-normal leading-[1.75] max-w-[540px] mb-8 font-sans">
              Lorem ipsum dolor sit amet consectetur nec scelerisque nibh
              volutpat ante a enim augue sed tincidunt pellentesque amet
              blandit egestas morbi quam ornare neque ac sit quis in a elit vel
              ac euismod vitae cras nunc elit fringilla tempor ornare ridiculus
              velit viverra pretium et tellus sit sed cras vulputate.
            </p>

            {/* Blue Action Button */}
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[13px] font-bold rounded-lg transition-all duration-200"
            >
              <span>Join our team</span>
              <ChevronRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
