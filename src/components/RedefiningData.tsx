"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function RedefiningData() {
  const [inView, setInView] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 } // Trigger as soon as the section comes into view (15% visible)
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Count up animation for the 10x multiplier when card slides in
  useEffect(() => {
    if (!inView) return;

    const delayTimeout = setTimeout(() => {
      let start = 1;
      const end = 10;
      const duration = 2200; // Slower speed of the 10x animation (duration in ms)
      const stepTime = duration / (end - start);

      const timer = setInterval(() => {
        start += 1;
        if (start >= end) {
          setMultiplier(end);
          clearInterval(timer);
        } else {
          setMultiplier(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, 1200); // Start counting up after the card slides in (duration 1200ms)

    return () => clearTimeout(delayTimeout);
  }, [inView]);

  return (
    <section className="w-full relative overflow-hidden py-16 md:py-24 z-10">

      {/* Background Image Layer for the Entire Section (Always visible immediately) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/USDC model.avif"
          alt="USDC Modular Data Center Model"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Subtle dark tint to integrate with page styling */}
        <div className="absolute inset-0 bg-[#04070f]/20" />
      </div>

      {/* Floating Centered Card Container (Animates in only when scrolled further down) */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0px)" : "translateY(50px)",
        }}
      >
        <div className="relative w-full overflow-hidden border border-[#0091ff]/25 rounded-[28px] md:rounded-[40px] shadow-[0_24_70px_rgba(0,145,255,0.08)] bg-white/45 p-6 sm:p-10 md:p-12 lg:p-14">

          {/* Content Wrapper Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">

            {/* Left Column: Information content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#42a5f5] to-[#0082f3] border border-blue-400/20 mb-8 shadow-sm">
                <span
                  className="h-[1.5px] bg-white rounded-full transition-all duration-700 ease-out origin-left"
                  style={{
                    width: inView ? "14px" : "0px",
                    transitionDelay: inView ? "300ms" : "0ms"
                  }}
                />
                <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase font-sans">
                  Innovation Leader
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                Redefining <span className="text-[#0091ff]">Data</span>
              </h2>

              {/* Description */}
              <p className="text-slate-700 text-sm md:text-[15.5px] font-normal leading-[1.7] mb-8 max-w-2xl">
                At{" "}
                <span className="text-[#0091ff] font-semibold">
                  US Data Centers (USDC)
                </span>
                , we're redefining data center infrastructure to deliver{" "}
                <span className="text-slate-900 font-bold">
                  unmatched performance, efficiency and sustainability
                </span>{" "}
                for data-intensive organizations.
              </p>

              {/* Blockquote Info */}
              <div className="flex items-stretch gap-5">
                <div
                  className="w-[3px] bg-[#0091ff] transition-all duration-[1000ms] ease-out origin-top flex-shrink-0"
                  style={{
                    transform: inView ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: inView ? "300ms" : "0ms"
                  }}
                />
                <p className="text-black text-[12px] md:text-[13px] font-medium leading-[1.65] italic max-w-xl">
                  Purpose-built to support next-generation high-performance computing, our
                  expertise lies in identifying and purchasing misused or under-utilized energy
                  assets and converting them to high-demand tier III HPC data centers.
                </p>
              </div>
            </div>

            {/* Right Column: Comparative Dashboard Element */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="bg-white border border-blue-200/50 rounded-[20px] p-6 sm:p-7 md:p-8 shadow-[0_12px_40px_rgba(0,145,255,0.04)] flex flex-col sm:flex-row items-center gap-5 sm:gap-6 max-w-md lg:max-w-full w-full relative min-h-[250px] sm:min-h-[270px] lg:min-h-[290px]">

                {/* Stat callout */}
                <div className="flex flex-col items-start text-left w-full sm:w-[38%] flex-shrink-0">
                  <span
                    className="text-6xl md:text-[72px] lg:text-[84px] font-black text-[#0091ff] tracking-tight leading-none select-none transition-all duration-300 w-full"
                    style={{
                      textShadow: inView
                        ? "1px 1px 0px #0076db, 2px 2px 0px #006abc, 3px 3px 0px #005da5, 4px 4px 0px #004f8e, 5px 5px 8px rgba(0, 145, 255, 0.35)"
                        : "none"
                    }}
                  >
                    {multiplier}x
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-900 tracking-wider uppercase mt-3 select-none">
                    Faster Deployment
                  </span>
                  <p className="text-[10px] font-semibold text-[#0091ff] mt-2.5 leading-[1.45] max-w-[130px] select-none">
                    Traditional project Takes years, USDC delivers in Months.
                  </p>
                </div>

                {/* Vertical divider */}
                <div
                  className="hidden sm:block w-[1px] bg-slate-200 transition-all duration-[1000ms] ease-out origin-center"
                  style={{
                    height: inView ? "130px" : "0px",
                    transitionDelay: inView ? "300ms" : "0ms"
                  }}
                />

                {/* Comparison bars */}
                <div className="flex flex-col gap-5 flex-grow w-full">

                  {/* Comparison Item 1 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-800 select-none">
                      <span className="text-[#0091ff] whitespace-nowrap">USDC Infrastructure</span>
                      <span className="text-[#0091ff] whitespace-nowrap">4 Months</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        className="h-full bg-black rounded-l-full"
                        style={{
                          width: inView ? "60%" : "0%",
                          transition: "width 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
                          transitionDelay: inView ? "600ms" : "0ms"
                        }}
                      />
                      <div
                        className="h-full bg-[#3daeff] rounded-r-full"
                        style={{
                          width: inView ? "40%" : "0%",
                          transition: "width 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                          transitionDelay: inView ? "2800ms" : "0ms"
                        }}
                      />
                    </div>
                  </div>

                  {/* Comparison Item 2 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-800 select-none">
                      <span className="text-[#0091ff] whitespace-nowrap">Traditional Data Center</span>
                      <span className="text-[#0091ff] whitespace-nowrap">24+ Months</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        className="h-full bg-black rounded-full"
                        style={{
                          width: inView ? "100%" : "0%",
                          transition: "width 3.2s cubic-bezier(0.16, 1, 0.3, 1)",
                          transitionDelay: inView ? "600ms" : "0ms"
                        }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
