"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ────────────────────── Floating Feature Label ────────────────────── */
function FeatureLabel({
  icon,
  text,
  className,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className={`absolute z-20 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
        transition: `all 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* CSS Styles for floating and glowing */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes labelFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes labelGlow {
          0%, 100% { 
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45), 0 0 4px rgba(61, 174, 255, 0.15); 
            border-color: rgba(61, 174, 255, 0.15);
          }
          50% { 
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45), 0 0 12px rgba(61, 174, 255, 0.35); 
            border-color: rgba(61, 174, 255, 0.45);
          }
        }
        .animate-label-premium {
          animation: labelFloat 4s ease-in-out infinite, labelGlow 3s ease-in-out infinite;
        }
      `}} />

      <div
        className="flex items-center gap-2 px-3.5 py-[7px] rounded-full bg-[#080e1e]/90 border border-white/[0.08] animate-label-premium"
        style={{
          // Apply staggered animation delay for a wavy floating effect
          animationDelay: `${delay}ms, ${delay + 500}ms`
        }}
      >
        <span className="text-[#3daeff] text-[11px] flex-shrink-0">{icon}</span>
        <span className="text-[9px] font-semibold text-white/75 tracking-[0.16em] uppercase whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────── Timeline Dot ──────────────────── */
function TimelineDot({ active }: { active?: boolean }) {
  return (
    <div className="absolute -left-[33px] top-[5px] w-[10px] h-[10px] flex items-center justify-center">
      {/* Premium Ping Animation keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes timelinePulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .animate-timeline-ping {
          animation: timelinePulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}} />

      {/* Ripple/Ping Ring (only visible when active) */}
      {active && (
        <div className="absolute w-[18px] h-[18px] rounded-full border border-[#3daeff]/60 animate-timeline-ping pointer-events-none" />
      )}

      {/* Main Core Dot */}
      <div
        className={`rounded-full transition-all duration-500 ease-out flex items-center justify-center ${active
          ? "w-[10px] h-[10px] bg-[#3daeff]"
          : "w-[6px] h-[6px] bg-white/20 group-hover:bg-[#3daeff]/40"
          }`}
        style={{
          boxShadow: active
            ? "0 0 12px rgba(61,174,255,0.6), 0 0 24px rgba(61,174,255,0.3)"
            : "none",
        }}
      >
        {/* White Inner Center (only visible when active) */}
        {active && (
          <div className="w-[3px] h-[3px] bg-white rounded-full" />
        )}
      </div>
    </div>
  );
}

/* ──────────────────────── Main Section ──────────────────────── */
export default function NvidiaRoadmap() {
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-cycling timeline items every 3 seconds
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, activeIndex]);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case "power":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case "cooling":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
        );
      case "gpu":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="2" x2="9" y2="4" />
            <line x1="15" y1="2" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="22" />
            <line x1="15" y1="20" x2="15" y2="22" />
            <line x1="2" y1="9" x2="4" y2="9" />
            <line x1="2" y1="15" x2="4" y2="15" />
            <line x1="20" y1="9" x2="22" y2="9" />
            <line x1="20" y1="15" x2="22" y2="15" />
          </svg>
        );
      case "network":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case "shield":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case "cloud":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      case "oci":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      case "check":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case "cpu":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="15" y2="17" />
          </svg>
        );
      case "density":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        );
      case "memory":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      case "zap":
        return (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  const timelineItems = [
    {
      num: "01",
      title: "BLACKWELL",
      desc: "Optimized for high-density AI training and large-scale inference workloads.",
      img: "/Blackwell 200.avif",
      features: [
        { text: "POWER READY", iconType: "power", x: "top-[-6px] left-[-4px]" },
        { text: "DIRECT-TO-CHIP COOLING", iconType: "cooling", x: "top-[15%] right-[-2%] lg:right-[2%]" },
        { text: "GPU OPTIMIZED", iconType: "gpu", x: "bottom-[20%] left-[-4%]" },
        { text: "HIGH-SPEED NETWORKING", iconType: "network", x: "bottom-[2%] right-[8%] lg:right-[12%]" },
      ]
    },
    {
      num: "02",
      title: "GRACE BLACKWELL",
      desc: "Purpose-built infrastructure supporting enterprise-scale AI deployment.",
      img: "/Oracle Blackwell.avif",
      features: [
        { text: "ENTERPRISE SECURE", iconType: "shield", x: "top-[-6px] left-[-4px]" },
        { text: "CLOUD INTEGRATED", iconType: "cloud", x: "top-[15%] right-[-2%] lg:right-[2%]" },
        { text: "OCI COMPATIBLE", iconType: "oci", x: "bottom-[20%] left-[-4%]" },
        { text: "99.99% RELIABLE", iconType: "check", x: "bottom-[2%] right-[8%] lg:right-[12%]" },
      ]
    },
    {
      num: "03",
      title: "VERA RUBIN",
      desc: "Future-ready architecture designed for the next generation of AI compute.",
      img: "/Vera Rubin.avif",
      features: [
        { text: "NEXT-GEN ARCH", iconType: "cpu", x: "top-[-6px] left-[-4px]" },
        { text: "ULTRA-DENSE CORES", iconType: "density", x: "top-[15%] right-[-2%] lg:right-[2%]" },
        { text: "3D STACKED MEMORY", iconType: "memory", x: "bottom-[20%] left-[-4%]" },
        { text: "FUTURE READY", iconType: "zap", x: "bottom-[2%] right-[8%] lg:right-[12%]" },
      ]
    },
  ];

  const stats = [
    { value: "200KW+", label: "PER RACK" },
    { value: "DLC", label: "LIQUID COOLING" },
    { value: "100%", label: "AI READY" },
    { value: "4 Months", label: "DEPLOYMENT" },
  ];

  return (
    <section
      id="nvidia-roadmap"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f]"
      style={{ minHeight: "700px" }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute top-[-20%] left-[-12%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[10%] w-[600px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-16">
        {/* ═══ Header: Badge + Heading + Description ═══ */}
        <div className="mb-8 md:mb-16">
          {/* Pill Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]"
            style={fadeUp(0)}
          >
            <span className="w-6 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/65 tracking-[0.22em] uppercase font-sans">
              GPU PLATFORM SUPPORT
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[36px] sm:text-[48px] md:text-[52px] lg:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-6"
            style={fadeUp(80)}
          >
            <span className="text-white block">CHIP-AGNOSTIC.</span>
            <span className="text-white block">ARCHITECTURE-READY.</span>
          </h2>

          {/* Description */}
          <p
            className="text-[13px] md:text-[14.5px] text-white/50 leading-[1.8] max-w-[580px] font-normal"
            style={fadeUp(160)}
          >
            ARMS 200 provides a high-density infrastructure foundation designed to adapt to evolving accelerator architectures, enabling flexible deployment as compute platforms evolve.
          </p>
        </div>

        {/* ═══ Main Grid: Images + Timeline ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start mb-16">
          {/* ── Left Column: Hardware Images with Floating Labels ── */}
          <div
            className="relative w-full"
            style={{
              ...fadeUp(240),
            }}
          >
            {/* Primary GPU Image Container with Cross-Fade */}
            <div
              className="relative mx-auto my-8 w-[84%] aspect-[1.1] rounded-lg overflow-hidden"
              style={{
                transform: "perspective(900px) rotateY(-3deg) rotateX(1.1deg)",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {timelineItems.map((item, i) => (
                <div
                  key={item.num}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: activeIndex === i ? 1 : 0 }}
                >
                  <Image
                    src={item.img}
                    alt={`${item.title} platform details`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070f]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ── Floating Feature Labels for each active stage ── */}
            {timelineItems.map((item, stageIdx) => {
              const isStageActive = activeIndex === stageIdx;
              return (
                <div
                  key={`features-stage-${stageIdx}`}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
                  style={{ opacity: isStageActive ? 1 : 0 }}
                >
                  {item.features.map((feat, fIdx) => (
                    <FeatureLabel
                      key={`feat-${stageIdx}-${fIdx}`}
                      icon={getFeatureIcon(feat.iconType)}
                      text={feat.text}
                      className={feat.x}
                      delay={fIdx * 100}
                      inView={inView && isStageActive}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* ── Right Column: Timeline Items ── */}
          <div className="relative pl-7 lg:pl-7 pt-2" style={fadeUp(400)}>
            {/* Vertical timeline line (runs behind the dots on all screens) */}
            <div
              className="absolute left-0 top-2 bottom-6 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(61,174,255,0.35) 0%, rgba(61,174,255,0.15) 70%, transparent 100%)",
              }}
            />

            {timelineItems.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={item.num}
                  className="relative mb-12 last:mb-0 cursor-pointer group"
                  onClick={() => setActiveIndex(i)}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${500 + i * 120}ms`,
                  }}
                >
                  <TimelineDot active={isActive} />
                  <span className={`text-[11px] font-semibold tracking-[0.18em] block mb-2 transition-all duration-300 ${isActive ? "text-[#3daeff]" : "text-white/20"
                    }`}>
                    {item.num}
                  </span>
                  <h3 className={`text-[15px] md:text-[16px] font-bold tracking-[0.06em] mb-2.5 uppercase transition-all duration-300 ${isActive ? "text-[#3daeff]" : "text-white/35 group-hover:text-white/60"
                    }`}>
                    {item.title}
                  </h3>
                  <p className={`text-[11px] md:text-[12px] leading-[1.75] max-w-[260px] font-normal transition-all duration-300 ${isActive ? "text-white/70" : "text-white/20"
                    }`}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ Bottom Stats Bar ═══ */}
        <div
          className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-[#080d1a]/40 border border-white/[0.06] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          style={fadeUp(700)}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-5 py-6 bg-[#060c18]/65 hover:bg-[#060c18]/90 hover:border-white/10 border border-transparent rounded-xl transition-all duration-300 hover:-translate-y-0.5 group cursor-default"
            >
              <span className="text-[20px] md:text-[22px] font-black text-white tracking-tight leading-none mb-2 text-center group-hover:text-[#3daeff] group-hover:drop-shadow-[0_0_8px_rgba(61,174,255,0.4)] transition-all duration-300">
                {stat.value}
              </span>
              <span className="text-[8px] font-bold text-white/30 tracking-[0.2em] uppercase whitespace-nowrap leading-[1.4] text-center group-hover:text-white/50 transition-colors duration-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}
