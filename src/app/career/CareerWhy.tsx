"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, Shield, TrendingUp, Users, Clock, Award, ArrowRight } from "lucide-react";

/* ═══════════════════════ Why Join USDC — Premium ═══════════════════════ */

const perks = [
  {
    icon: Zap,
    accent: "#3daeff",
    tag: "TECHNOLOGY",
    title: "Frontier Tech Stack",
    body: "Work hands-on with NVIDIA GB200 clusters, liquid-cooled hyperscale racks and custom AI inference stacks months before market availability.",
    highlight: "NVIDIA GB200 · Liquid Cooling · AI Inference",
  },
  {
    icon: TrendingUp,
    accent: "#3daeff",
    tag: "COMPENSATION",
    title: "Equity & Upside",
    body: (
      <>
        Meaningful ownership in a company at the intersection of AI and energy — one of the <br />
        fastest-growing verticals of the decade.
      </>
    ),
    highlight: "Early-stage equity · Competitive salary",
  },
  {
    icon: Shield,
    accent: "#3daeff",
    tag: "BENEFITS",
    title: "Tier-1 Coverage",
    body: "Comprehensive health, dental and vision. Generous PTO, 401(k) matching and remote-first flexibility that respects your life.",
    highlight: "Health · Dental · Vision · 401(k)",
  },
  {
    icon: Users,
    accent: "#3daeff",
    tag: "TEAM",
    title: "World-Class Colleagues",
    body: "Work alongside engineers from Google DeepMind, NVIDIA, AWS and top energy operators who have deployed at unprecedented scale.",
    highlight: "Ex-Google · NVIDIA · AWS · Top Energy Cos.",
  },
  {
    icon: Clock,
    accent: "#3daeff",
    tag: "IMPACT",
    title: "Decisions That Ship",
    body: "No bureaucracy. At USDC, your work moves megawatts, reaches Fortune 500 AI teams and ships to production within weeks — not years.",
    highlight: "Direct production impact · Fast cycles",
  },
  {
    icon: Award,
    accent: "#3daeff",
    tag: "GROWTH",
    title: "$5K Learning Budget",
    body: "Annual stipend for courses, conferences and certifications. Plus on-site labs where you prototype on real enterprise hardware.",
    highlight: "Conferences · Certs · On-site Labs",
  },
];

export default function CareerWhy() {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fadeUp = (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  return (
    <section ref={ref}
      className="w-full relative overflow-hidden py-28 md:py-36"
      style={{ background: "linear-gradient(180deg, #04070f 0%, #060a16 50%, #04070f 100%)" }}>

      {/* Large decorative number watermark */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[300px] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(61,174,255,0.015)", letterSpacing: "-0.05em" }}>
        WHY
      </div>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[3px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.3), transparent)" }} />
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 mb-8" style={fadeUp(0)}>
              <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[9px] font-bold text-white/60 tracking-[0.28em] uppercase">Why Join USDC</span>
            </div>
            <h2 className="text-[38px] sm:text-[48px] md:text-[52px] font-black tracking-[-0.02em] leading-[1.0] text-white" style={fadeUp(80)}>
              Built for those<br />
              who{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(120deg, #74d1ff, #3daeff, #0068d6)" }}>
                build at scale.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:items-end" style={fadeUp(140)}>
            <p className="text-[14px] md:text-[15px] text-white/40 max-w-[420px] leading-[1.85] lg:text-right">
              We don&apos;t offer ordinary jobs. We offer the rare chance to define the compute
              backbone of the AI era — alongside people obsessed with doing it right.
            </p>
            <a href="#open-roles"
              className="group inline-flex items-center gap-2 text-[12px] font-bold text-[#3daeff] hover:text-white transition-colors duration-200 cursor-pointer">
              <span>See All Open Roles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Perk cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {perks.map((p, i) => {
            const Icon = p.icon;
            const isHov = hovered === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex flex-col p-7 rounded-2xl cursor-default overflow-hidden transition-all duration-400"
                style={{
                  background: isHov
                    ? "linear-gradient(145deg, rgba(12,20,40,0.95) 0%, rgba(8,13,26,0.98) 100%)"
                    : "rgba(8,13,26,0.7)",
                  border: isHov ? "1px solid rgba(61,174,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
                  boxShadow: isHov
                    ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(61,174,255,0.1), inset 0 1px 0 rgba(61,174,255,0.05)"
                    : "0 4px 24px rgba(0,0,0,0.2)",
                  transform: isHov ? "translateY(-4px)" : "translateY(0)",
                  ...fadeUp(80 + i * 60),
                }}>

                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(ellipse at top right, rgba(61,174,255,0.08) 0%, transparent 70%)",
                    opacity: isHov ? 1 : 0,
                  }} />

                {/* Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[8.5px] font-black tracking-[0.3em] uppercase"
                    style={{ color: isHov ? "#3daeff" : "rgba(255,255,255,0.2)" }}>
                    {p.tag}
                  </span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isHov ? "rgba(61,174,255,0.15)" : "rgba(61,174,255,0.06)",
                      border: isHov ? "1px solid rgba(61,174,255,0.3)" : "1px solid rgba(61,174,255,0.12)",
                      boxShadow: isHov ? "0 0 16px rgba(61,174,255,0.2)" : "none",
                    }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: isHov ? "#3daeff" : "rgba(61,174,255,0.6)", width: 18, height: 18 }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-white mb-3 tracking-tight leading-snug transition-colors duration-200"
                  style={{ color: isHov ? "#fff" : "rgba(255,255,255,0.9)" }}>
                  {p.title}
                </h3>

                {/* Body */}
                <p className="text-[12.5px] leading-[1.8] mb-5 flex-1"
                  style={{ color: "rgba(255,255,255,0.38)" }}>
                  {p.body}
                </p>

                {/* Highlight pill */}
                <div className="mt-auto px-3 py-1.5 rounded-lg self-start transition-all duration-300"
                  style={{
                    background: isHov ? "rgba(61,174,255,0.08)" : "rgba(255,255,255,0.02)",
                    border: isHov ? "1px solid rgba(61,174,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
                  }}>
                  <span className="text-[9px] font-bold tracking-wider"
                    style={{ color: isHov ? "rgba(61,174,255,0.9)" : "rgba(255,255,255,0.25)" }}>
                    {p.highlight}
                  </span>
                </div>

                {/* Bottom shine */}
                <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.4), transparent)",
                    opacity: isHov ? 1 : 0,
                  }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
