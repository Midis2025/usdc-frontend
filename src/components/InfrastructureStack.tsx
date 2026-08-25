"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ThreeDStack = dynamic(() => import("./ThreeDStack"), { ssr: false });

export default function InfrastructureStack() {
  const [inView, setInView] = useState(false);
  const [activePlate, setActivePlate] = useState<number | null>(3);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      title: "Power Infrastructure",
      desc: (
        <>Grid-Connected Energy Assets Designed For Large-Scale AI Growth.</>
      ),
    },
    {
      title: "Cooling & Network",
      desc: (
        <>
          Direct-To-Chip Cooling And High-Speed Networking For <br /> Dense Workloads.
        </>
      ),
    },
    {
      title: "GPU Compute",
      desc: (
        <>NVIDIA-Ready Environments Optimized For Training And Inference.</>
      ),
    },
    {
      title: "AI Applications",
      desc: (
        <>
          Enterprise AI, Cloud Services, Inference Platforms <br />  And Advanced Research.
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-6 md:py-16 border-t border-white/[0.03]"
    >
      {/* Background Hexagonal Grid Pattern in top-right */}
      <div className="absolute top-0 right-0 w-[320px] h-[280px] opacity-80 pointer-events-none select-none z-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_top_right,white_40%,transparent_100%)]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hex-grid"
              width="50"
              height="86.6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(30)"
            >
              <path
                d="M 50 0 L 25 14.43 L 0 0 L 0 28.87 L 25 43.3 L 50 28.87 Z"
                fill="none"
                stroke="rgba(0, 145, 255, 0.25)"
                strokeWidth="1"
              />
              <path
                d="M 25 43.3 L 0 57.74 L 0 86.6 L 25 101.03 L 50 86.6 L 50 57.74 Z"
                fill="none"
                stroke="rgba(0, 145, 255, 0.25)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Badge & Headers */}
        <div className="flex flex-col items-start text-left mb-8 md:mb-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/80 tracking-[0.2em] uppercase font-sans">
              AI INFRASTRUCTURE STACK
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-[52px] font-bold text-white tracking-tight leading-none mb-6">
            From Power to <span className="text-[#0091ff]">AI Compute</span>
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-white/40 max-w-[500px] leading-[1.6] font-normal font-sans">
            USDC delivers the complete infrastructure stack required for <br /> next-generation AI deployment.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Feature List with Clickable Triggers */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 w-full text-left order-2 lg:order-2">
            {features.map((feat, index) => {
              const plateIndex = 3 - index;
              const isActive = activePlate === plateIndex;
              const isAnyCardActive = activePlate !== null;
              return (
                <div
                  key={feat.title}
                  onClick={() => {
                    setActivePlate((prev) => (prev === plateIndex ? null : plateIndex));
                  }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-500 ease-out cursor-pointer group ${
                    isActive
                      ? "bg-[#02050c]/85 border-[#0091ff]/40 shadow-[0_0_24px_rgba(0,145,255,0.12)] scale-[1.02]"
                      : "bg-[#02050c]/85 border-[#0091ff]/40 shadow-[0_0_24px_rgba(0,145,255,0.12)] lg:bg-transparent lg:border-transparent lg:hover:bg-[#02050c]/55 lg:hover:border-[#0091ff]/15 lg:hover:shadow-[0_4px_20px_rgba(0,145,255,0.03)] lg:hover:scale-[1.01] lg:scale-100"
                  }`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0px)" : "translateX(30px)",
                    transitionDelay: `${150 + index * 100}ms`,
                  }}
                >
                  {/* Vertical Indicator Line */}
                  <div
                    className={`w-[2.5px] flex-shrink-0 self-stretch rounded-full transition-all duration-[800ms] ease-out origin-top ${
                      isActive
                        ? "bg-[#3daeff] shadow-[0_0_10px_#3daeff] scale-y-110"
                        : "bg-[#3daeff] shadow-[0_0_10px_#3daeff] scale-y-110 lg:shadow-none lg:scale-y-100 " +
                          (isAnyCardActive
                            ? "lg:bg-[#0091ff]/20 lg:group-hover:bg-[#0091ff]/40"
                            : "lg:bg-[#0091ff] lg:group-hover:bg-[#3daeff]")
                    }`}
                    style={{
                      transform: inView ? "scaleY(1)" : "scaleY(0)",
                      transitionDelay: `${300 + index * 100}ms`,
                    }}
                  />

                  {/* Text details */}
                  <div className="flex flex-col">
                    <h3 className={`text-base md:text-lg font-bold tracking-tight mb-2 select-none transition-all duration-300 ${
                      isActive
                        ? "text-[#3daeff] opacity-100"
                        : "text-[#3daeff] opacity-100 lg:opacity-100 " +
                          (isAnyCardActive
                            ? "lg:text-white/30 lg:group-hover:text-white/60"
                            : "lg:text-white lg:group-hover:text-[#3daeff]")
                    }`}>
                      {feat.title}
                    </h3>
                    <p className={`text-[12px] md:text-[13px] font-medium leading-[1.6] max-w-md select-none transition-all duration-300 ${
                      isActive
                        ? "text-white/70"
                        : "text-white/70 " +
                          (isAnyCardActive
                            ? "lg:text-white/15 lg:group-hover:text-white/35"
                            : "lg:text-white/40 lg:group-hover:text-white/60")
                    }`}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Stack Model */}
          <div
            className="lg:col-span-7 flex justify-center w-full order-1 lg:order-1 transition-all duration-1000 ease-out relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(30px)",
            }}
          >
            {/* Ambient blue light behind 3D stack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/[0.06] rounded-full blur-[80px] pointer-events-none" />
            <div className="relative w-full max-w-2xl h-[450px] sm:h-[520px] md:h-[580px] lg:h-[640px] overflow-hidden z-10">
              <ThreeDStack activePlate={activePlate} onPlateChange={setActivePlate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
