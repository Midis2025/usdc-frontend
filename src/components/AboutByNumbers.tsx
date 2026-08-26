"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutByNumbers() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: "2017",
      label: "COMPANY FOUNDED",
    },
    {
      value: "NASDAQ",
      label: "PUBLIC LISTING - N/A",
    },
    {
      value: "04",
      label: "OPERATING AND DEVELOPMENT SITES",
    },
    {
      value: "400MW+",
      label: "TOTAL PORTFOLIO CAPACITY",
    },
  ];

  // Coordinates to overlay interactive pulsing rings exactly on the pins drawn in the user's map image
  const pins = [
    { id: 1, top: "41.2%", left: "70.3%", delay: "0ms", label: "Northeast Node A" },
    { id: 2, top: "43.1%", left: "69.5%", delay: "200ms", label: "Northeast Node B" },
    { id: 3, top: "54.6%", left: "66.9%", delay: "400ms", label: "Mid-Atlantic Node" },
    { id: 4, top: "59.0%", left: "62.4%", delay: "600ms", label: "Southern Node" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full relative bg-[#04070f] py-6 md:py-20 overflow-hidden select-none border-t border-white/[0.03]"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">

        {/* Heading */}
        <div
          className="text-center mb-8 md:mb-16 transition-all duration-1000 transform"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-3xl md:text-[56px] font-bold tracking-tight text-white mb-4 uppercase font-sans">
            BY THE <span className="text-[#3daeff]">NUMBERS</span>
          </h2>
          <p className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-wider uppercase">
            Our scale and impact across the industry
          </p>
        </div>

        {/* Stats Card */}
        <div
          className="w-full max-w-[1100px] border border-white/[0.08] bg-[#02050c]/80 rounded-[16px] shadow-[0_24px_50px_rgba(0,0,0,0.55)] transition-all duration-1000 delay-200 transform mb-10 md:mb-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center">
            {stats.map((stat, i, arr) => (
              <React.Fragment key={i}>
                <div
                  className={`flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-9 px-2 sm:px-6 min-h-[120px] sm:min-h-[150px]
                    ${i % 2 === 0 ? "border-r border-white/10" : "border-r-0"}
                    ${i < 2 ? "border-b border-white/10" : "border-b-0"}
                    md:border-b-0 md:border-r-0`}
                >
                  <span className="text-base sm:text-2xl md:text-[36px] font-bold text-white tracking-tight leading-none font-sans">
                    {stat.value}
                  </span>
                  <span className="text-[7.5px] sm:text-[9px] font-bold text-white/50 tracking-[0.18em] uppercase leading-[1.5] max-w-[180px] mt-2 sm:mt-3 mb-2">
                    {stat.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block w-[1px] h-10 bg-gradient-to-b from-[#3daeff]/30 via-[#3daeff]/55 to-[#3daeff]/30 shadow-[0_0_12px_rgba(61,174,255,0.18)] flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Map Visualization */}
        <div
          className="w-full max-w-[900px] relative transition-all duration-1000 delay-400 transform"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* North America Map Image */}
          <div className="w-full aspect-[4/3] max-h-[500px] flex items-center justify-center relative overflow-hidden rounded-2xl">
            <Image
              src="/usa_sites_map.avif"
              alt="USDC Operating and Development Sites Map"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            />

            {/* Interactive Pulse Overlay for Pins */}
            {pins.map((pin) => (
              <div
                key={pin.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer"
                style={{
                  top: pin.top,
                  left: pin.left,
                }}
              >
                {/* Outer glowing pulsing ring */}
                <span className="absolute flex h-7 w-7">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3daeff]/35 opacity-75"
                    style={{ animationDelay: pin.delay }}
                  ></span>
                  <span className="relative inline-flex rounded-full h-7 w-7 bg-transparent border border-[#3daeff]/20"></span>
                </span>

                {/* Invisible hover trigger area */}
                <div className="w-8 h-8 rounded-full bg-transparent z-10" />


              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
