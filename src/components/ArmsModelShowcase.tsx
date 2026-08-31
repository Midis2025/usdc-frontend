"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Cpu,
  Zap,
  Wind,
  Server,
  ShieldCheck,
  Gauge,
  RotateCcw,
  Layers,
  DollarSign,
  TrendingUp,
} from "lucide-react";

/* Load the Three.js canvas only on the client — no SSR */
const ArmsDataCentreModel = dynamic(
  () => import("@/components/ArmsDataCentreModel"),
  { ssr: false }
);

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2200, suffix = "", decimals = 0) {
  const [val, setVal] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = eased * end;
            setVal(currentVal.toFixed(decimals));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, decimals]);

  return { ref, val: val + suffix };
}

/* ── Spec Data ── */
const specs = [
  {
    icon: <Zap className="w-5 h-5" />,
    label: "IT Load Capacity",
    value: "1.8 MW",
    desc: "Per module critical IT power",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    label: "Power Cost",
    value: "$0.04 / kWh",
    desc: "Low-cost energy economics",
  },
  {
    icon: <Wind className="w-5 h-5" />,
    label: "Cooling System",
    value: "DTC",
    desc: "Direct-to-chip liquid cooling",
  },
  {
    icon: <Server className="w-5 h-5" />,
    label: "Rack Density",
    value: "200 kW+",
    desc: "Per rack power support",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Redundancy",
    value: "Tier III",
    desc: "Concurrent maintainability",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    label: "PUE Rating",
    value: "<1.3",
    desc: "Industry-leading efficiency",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Scalability",
    value: "1-50 MW+",
    desc: "Modular expansion path",
  },
  {
    icon: <RotateCcw className="w-5 h-5" />,
    label: "Deployment",
    value: "4 Months",
    desc: "From order to operational",
  },
];

const stats = [
  { end: 1.8, suffix: " MW", label: "Per Module Power", decimals: 1 },
  { end: 4, suffix: " Months", label: "Rapid Deployment" },
  { end: 100, suffix: "%", label: "GPU Compatible" },
];

export default function ArmsModelShowcase() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-6 pb-10 md:pt-8 md:pb-28 bg-[#04070f] text-white overflow-hidden select-none"
    >
      {/* ── Ambient Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/[0.04] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/[0.05] rounded-full blur-[110px] pointer-events-none z-0" />

      {/* ── Subtle grid backdrop ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Header ── */}
        <div className="text-center mb-16 md:mb-20" style={enter(0)}>
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              Interactive 3D Model
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[52px] font-bold tracking-tight leading-[1.08] mb-4">
            <span className="text-white">Explore The </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-[#0077e6]">
              ARMS 200
            </span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[640px] mx-auto">
            Interact with our modular data centre unit. Click the front panel to
            open it and reveal the internal rack infrastructure. Drag to rotate
            the model in 3D space.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          style={enter(120)}
        >
          {stats.map((s, i) => (
            <StatCard key={i} end={s.end} suffix={s.suffix} label={s.label} decimals={s.decimals} />
          ))}
        </div>

        {/* ── 3D Model + Spec Cards Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left Spec Cards */}
          <div
            className="lg:col-span-3 flex flex-col gap-4"
            style={enter(200)}
          >
            {specs.slice(0, 4).map((sp, i) => (
              <SpecCard key={i} {...sp} />
            ))}
          </div>

          {/* Center 3D Model */}
          <div className="lg:col-span-6" style={enter(300)}>
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] h-[340px] sm:h-[420px] md:h-[520px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 55%, rgba(61,174,255,0.05) 0%, rgba(4,7,15,0.0) 70%)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#3daeff]/20 rounded-tl-2xl pointer-events-none z-20" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#3daeff]/20 rounded-tr-2xl pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#3daeff]/20 rounded-bl-2xl pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#3daeff]/20 rounded-br-2xl pointer-events-none z-20" />

              {/* Subtle glow behind */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full pointer-events-none z-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(61,174,255,0.08) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* 3D Canvas */}
              <ArmsDataCentreModel />

              {/* Interaction hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <RotateCcw className="w-3 h-3 text-[#3daeff] animate-[spin_6s_linear_infinite]" />
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono">
                  Drag to rotate · Click panel to open
                </span>
              </div>
            </div>
          </div>

          {/* Right Spec Cards */}
          <div
            className="lg:col-span-3 flex flex-col gap-4"
            style={enter(400)}
          >
            {specs.slice(4, 8).map((sp, i) => (
              <SpecCard key={i} {...sp} />
            ))}
          </div>
        </div>

        {/* ── Bottom Feature Highlights ── */}
        <div
          className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={enter(500)}
        >
          {[
            {
              icon: <Cpu className="w-5 h-5 text-[#3daeff]" />,
              title: "NVIDIA Blackwell Ready",
              desc: "Designed for next-gen GPU architectures with full liquid cooling support.",
            },
            {
              icon: <Layers className="w-5 h-5 text-[#3daeff]" />,
              title: "Modular Scalability",
              desc: "Stack and combine units to match any capacity requirement from kW to MW.",
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#3daeff]" />,
              title: "Enterprise Compliance",
              desc: "SOC 2 Type II, ISO 27001 and HIPAA compliant infrastructure.",
            },
            {
              icon: <Zap className="w-5 h-5 text-[#3daeff]" />,
              title: "Integrated Power",
              desc: "Built-in UPS, PDUs and switchgear for self-contained power delivery.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-500 hover:border-[#3daeff]/15"
            >
              {/* Icon + Title row */}
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#3daeff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3daeff]/15 transition-colors duration-300">
                  {item.icon}
                </div>
                <h4 className="text-[13px] font-bold text-white tracking-tight">
                  {item.title}
                </h4>
              </div>
              <p className="text-[12px] text-white/40 leading-[1.7]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top / Bottom separators ── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
    </section>
  );
}

/* ── Stat Counter Card ── */
function StatCard({
  end,
  suffix,
  label,
  decimals = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const { ref, val } = useCounter(end, 2200, suffix, decimals);
  return (
    <div
      ref={ref}
      className="relative text-center p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden group hover:border-[#3daeff]/15 transition-all duration-500"
    >
      {/* Subtle top glow on hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#3daeff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="block text-3xl md:text-4xl font-extrabold text-white tracking-tight">
        {val}
      </span>
      <span className="block text-[11px] text-white/40 mt-1.5 tracking-wider uppercase font-mono">
        {label}
      </span>
    </div>
  );
}

/* ── Spec Card ── */
function SpecCard({
  icon,
  label,
  value,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="group relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-500 hover:border-[#3daeff]/15 overflow-hidden">
      {/* Hover glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#3daeff]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#3daeff]/10 flex items-center justify-center text-[#3daeff] group-hover:bg-[#3daeff]/15 transition-colors duration-300">
          {icon}
        </div>
        <span className="text-[10px] text-white/40 tracking-[0.15em] uppercase font-mono">
          {label}
        </span>
      </div>
      <span className="block text-xl font-extrabold text-white tracking-tight mb-1">
        {value}
      </span>
      <span className="block text-[11px] text-white/35 leading-relaxed">
        {desc}
      </span>
    </div>
  );
}
