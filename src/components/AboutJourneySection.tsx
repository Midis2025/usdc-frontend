"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  imagePath: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2023",
    title: "SITE ACQUISITION",
    desc: "Identified key energy assets with long-term power potential and strategic infrastructure reach.",
   
     imagePath: "/013e20fe-e810-4412-abe2-7ea19eafdfd7.webp"
  },
  {
    year: "2024",
    title: "INFRASTRUCTURE DESIGN",
    desc: "Designed utility infrastructure and integrated Tier III standard architecture.",
     imagePath: "/dac65ca0-3720-4961-b0a0-4e8c0717606e.webp"
    
  },
  {
    year: "2025",
    title: "AI EXPANSION",
   
    desc: "Deployed ARMS 200 platform and enabled GPU-ready compute environments.",
    imagePath: "/4c1111db-a838-4990-998d-8313badaf9bc.webp"
     

  },
  {
    year: "2026",
    title: "OPERATIONAL DEPLOYMENT",
    desc: "Scaled infrastructure capacity and onboarded enterprise AI workloads.",
    imagePath: "/6cf1770a-3599-4397-b86b-84cc9e139d6d.webp"
  },
  {
    year: "+2030",
    title: "400MW+ POTENTIAL CAPACITY",
    desc: "Expanding multi-site infrastructure network to support next-wave AI growth.",
       imagePath: "/c639f2e7-d601-41bb-b53d-732956c33826.webp"
  }
];

export default function AboutJourneySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track the highest index card that has been scrolled into view
  const [maxIndexReached, setMaxIndexReached] = useState(0);
  // Track percentage height to animate glowing line
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dash line segments grow based on the revealed cards
  const bgLineHeights = ["32px", "25%", "50%", "75%", "100%"];
  const currentBgLineHeight = bgLineHeights[maxIndexReached];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress percentage through the container
      const totalHeight = rect.height - windowHeight + 200;
      const scrolled = -rect.top;
      let progress = scrolled / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // Determine active index based on thresholds
      let activeIndex = 0;
      if (progress >= 0.75) activeIndex = 4;
      else if (progress >= 0.55) activeIndex = 3;
      else if (progress >= 0.35) activeIndex = 2;
      else if (progress >= 0.15) activeIndex = 1;

      setMaxIndexReached((prev) => Math.max(prev, activeIndex));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#04070f] py-6 md:py-20 text-white select-none relative overflow-hidden border-t border-white/[0.03]">
      {/* Dynamic Keyframe Animations for Blueprint Icons */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes timelineBoltPulse {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 1; filter: drop-shadow(0 0 3px #3daeff); }
          }
          .timeline-bolt {
            animation: timelineBoltPulse 2s ease-in-out infinite;
          }

          @keyframes timelineTerminalPulse {
            0%, 100% { fill-opacity: 0.35; }
            50% { fill-opacity: 1; fill: #5cc4ff; filter: drop-shadow(0 0 3px #3daeff); }
          }
          .timeline-term-1 { animation: timelineTerminalPulse 1.8s ease-in-out infinite; }
          .timeline-term-2 { animation: timelineTerminalPulse 1.8s ease-in-out -0.6s infinite; }
          .timeline-term-3 { animation: timelineTerminalPulse 1.8s ease-in-out -1.2s infinite; }

          @keyframes timelineRibShimmer {
            0%, 100% { stroke-opacity: 0.25; }
            50% { stroke-opacity: 0.85; stroke: #5cc4ff; }
          }
          .timeline-rib {
            animation: timelineRibShimmer 2.8s ease-in-out infinite;
          }

          @keyframes timelineServerLed {
            0%, 100% { fill-opacity: 0.25; }
            50% { fill-opacity: 1; fill: #5cc4ff; }
          }
          .timeline-led-a { animation: timelineServerLed 1.4s ease-in-out infinite; }
          .timeline-led-b { animation: timelineServerLed 1.4s ease-in-out -0.45s infinite; }
          .timeline-led-c { animation: timelineServerLed 1.4s ease-in-out -0.9s infinite; }

          @keyframes timelineGlobePulse {
            0%, 100% { stroke-opacity: 0.4; }
            50% { stroke-opacity: 0.9; stroke: #3daeff; }
          }
          .timeline-globe-ellipse {
            animation: timelineGlobePulse 4s ease-in-out infinite;
          }
          @keyframes rotateNodes {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .timeline-globe-nodes {
            transform-origin: 50px 50px;
            animation: rotateNodes 24s linear infinite;
          }
        `
      }} />

      {/* Background glowing halo */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.02] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8">

        {/* LEFT COLUMN: Sticky heading & description */}
        <div className="lg:col-span-5 lg:sticky lg:top-36 lg:h-[fit-content] flex flex-col items-start pr-0 lg:pr-8 mb-4 lg:mb-0">

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
              OUR JOURNEY
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.1] text-white mb-6 font-sans">
            From Energy Assets To <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff] drop-shadow-[0_4px_18px_rgba(61,174,255,0.25)] select-none">
              AI Infrastructure
            </span>
          </h2>

          {/* Description */}
          <p className="text-[14px] sm:text-[14.5px] md:text-[15.5px] text-white/60 leading-[1.75] max-w-[480px] font-sans font-normal">
            USDC identifies and transforms underutilized energy assets into enterprise-grade AI infrastructure. By combining power, cooling, networking and compute, we accelerate deployment timelines from years to months.
          </p>
        </div>

        {/* RIGHT COLUMN: Interactive scrolling timeline */}
        <div className="lg:col-span-7 relative pl-6 sm:pl-10 md:pl-12 lg:pl-10">

          {/* Background dashed timeline line (only visible up to the maximum revealed card segment) */}
          <div
            className="absolute left-2 sm:left-6 md:left-8 lg:left-6 top-4 w-[2px] border-l-2 border-dashed border-white/10 pointer-events-none z-0 transition-all duration-700 ease-out"
            style={{ height: currentBgLineHeight }}
          />

          {/* Active solid glowing scroll progress line (grows smoothly with scroll progress) */}
          <div className="absolute left-2 sm:left-6 md:left-8 lg:left-6 top-4 bottom-4 w-[2px] pointer-events-none z-0">
            <div
              className="absolute top-0 -left-[2px] w-[2px] bg-gradient-to-b from-[#3daeff] via-[#0091ff] to-blue-500 rounded-full transition-all duration-300 shadow-[0_0_8px_#3daeff]"
              style={{ height: `${Math.max(7, scrollProgress * 100)}%` }}
            />
          </div>

          <div className="flex flex-col gap-5 sm:gap-6 md:gap-12 relative z-10">
            {timelineData.map((item, idx) => {

              // Only active card is highlighted
              let isActive = false;
              if (idx === 0) isActive = scrollProgress < 0.15;
              else if (idx === 1) isActive = scrollProgress >= 0.15 && scrollProgress < 0.35;
              else if (idx === 2) isActive = scrollProgress >= 0.35 && scrollProgress < 0.55;
              else if (idx === 3) isActive = scrollProgress >= 0.55 && scrollProgress < 0.75;
              else if (idx === 4) isActive = scrollProgress >= 0.75;

              const isVisible = idx <= maxIndexReached;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 sm:gap-6 md:gap-8 transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
                    }`}
                >
                  {/* Left Side: Year */}
                  <div className="w-10 sm:w-14 md:w-16 lg:w-14 text-left flex-shrink-0 relative">
                    <span
                      className={`text-xs sm:text-sm md:text-base font-extrabold tracking-tight font-sans transition-colors duration-500 ${isActive ? "text-[#3daeff] drop-shadow-[0_0_6px_rgba(61,174,255,0.4)]" : "text-white/35"
                        }`}
                    >
                      {item.year}
                    </span>

                    {/* Timeline Dot on top of the vertical line */}
                    <div
                      className={`absolute -left-[19px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border bg-[#02050c] transition-all duration-500 z-20 ${isActive
                          ? "border-[#3daeff] scale-125 shadow-[0_0_12px_#3daeff]"
                          : "border-white/20"
                        }`}
                    >
                      {/* Glowing outer core */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-[#3daeff]/20 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* Right Side: Premium Milestone Card */}
                  <div
                    className={`flex-1 min-w-0 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border bg-[#02050c]/25 transition-all duration-700 hover:-translate-y-1 relative overflow-hidden ${isActive
                        ? "border-[#0091ff]/35 shadow-[0_6px_30px_rgba(0,145,255,0.08)] bg-[#02050c]/40 scale-[1.01]"
                        : "border-white/[0.06] hover:border-white/20"
                      }`}
                  >
                    {/* Glowing highlight in active card */}
                    <div
                      className={`absolute -left-12 -top-12 w-28 h-28 rounded-full bg-[#3daeff]/[0.08] blur-[30px] pointer-events-none transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"
                        }`}
                    />

                    {/* Card Icon */}
                    <div
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl border flex items-center justify-center flex-shrink-0 bg-[#02050c]/80 transition-all duration-500 relative z-10 overflow-hidden ${isActive ? "border-[#3daeff]/40 bg-[#3daeff]/5" : "border-white/10"
                        }`}
                    >
                      <Image
                        src={item.imagePath}
                        alt={item.title}
                        width={112}
                        height={112}
                        className={`w-full h-full object-contain p-1.5 transition-all duration-500 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(61,174,255,0.6)]" : "opacity-75"
                          }`}
                      />
                    </div>

                    {/* Card Text Content */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left relative z-10">
                      <h3
                        className={`text-[12px] md:text-[13px] font-bold tracking-[0.15em] uppercase font-sans mb-2 transition-colors duration-500 ${isActive ? "text-[#3daeff]" : "text-white"
                          }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[11.5px] md:text-[12.5px] text-white/45 leading-[1.65] font-sans font-normal">
                        {item.year === "2026" ? (
                          <>Scaled infrastructure capacity and onboarded enterprise<br />AI workloads.</>
                        ) : item.year === "+2030" ? (
                          <>Expanding multi-site infrastructure network to support<br /> next-wave AI growth.</>
                        ) : (
                          item.desc
                        )}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
