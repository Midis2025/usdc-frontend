"use client";

import React from "react";
import { Zap, Cpu, Server, Shield, Globe, Users, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AboutContent() {
  const pillars = [
    {
      icon: <Zap className="w-5 h-5 text-[#3daeff]" />,
      title: "Sustainable Energy Assets",
      description: "We locate and harness underutilized power infrastructure, integrating renewable and stranded energy nodes directly with compute modules to optimize thermodynamic and structural efficiency.",
      stat: "100% Renewable Support",
      glowColor: "rgba(59, 130, 246, 0.15)"
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#3daeff]" />,
      title: "Enterprise AI Compute",
      description: "Purpose-built data environments optimized for dense GPU deployment, high-throughput fabrics, liquid-to-air heat rejection systems and ultra-low PUE operations.",
      stat: "NVIDIA Blackwell Ready",
      glowColor: "rgba(16, 185, 129, 0.15)"
    },
    {
      icon: <Server className="w-5 h-5 text-[#3daeff]" />,
      title: "Accelerated Deployment",
      description: "Proprietary modular construction workflows cut facility setup timelines from years to less than 4 months, bringing critical compute power to market ahead of scale demands.",
      stat: "4 Mo. Construction",
      glowColor: "rgba(245, 158, 11, 0.15)"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Uncompromising Reliability",
      desc: "Designed to meet Tier III standards, our architectures ensure high availability, redundancy and operational security for critical enterprise operations."
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: "Decentralized Grid Balancing",
      desc: "Our power integration strategies directly balance regional grids, operating dynamically to support utility networks while preserving compute consistency."
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Expert Leadership",
      desc: "Backed by leaders with deep-domain background in hardware engineering, electrical utility design, grid architecture and server management."
    }
  ];

  return (
    <div className="relative w-full bg-[#04070f] text-white overflow-hidden py-24 select-none">

      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Section 1: Visionary Mission Statement ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-32">

          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[10px] font-extrabold text-[#3daeff] tracking-[0.25em] uppercase mb-4">
              OUR CORE PURPOSE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-black tracking-tight text-white mb-6 leading-tight">
              Bridging Clean Power and Heavy Compute
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed mb-6 font-normal">
              USDC was founded with a singular conviction: the explosive expansion of artificial intelligence should not come at the expense of global energy stability. We solve this bottleneck by engineering hyper-efficient infrastructure that couples directly with primary energy sources.
            </p>
            <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed mb-8 font-normal">
              By co-locating compute facilities with green power plants and stranded energy, we bypass grid transmission bottlenecks, dramatically reduce overhead and deliver scalable AI clusters in fraction of the standard development timelines.
            </p>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-[#3daeff]" />
                <span className="text-[13px] font-bold text-white/95 uppercase tracking-wider">
                  Data Driven Strategy
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="text-[13px] text-white/50 font-bold uppercase tracking-wider">
                Dynamic Load Balancing
              </div>
            </div>
          </div>

          {/* Right side: High-Tech Glass Telemetry Card */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] p-[1.5px] rounded-[24px] bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.04] shadow-[0_24px_50px_rgba(0,0,0,0.5)] overflow-hidden group">

              {/* Internal Glass Card body */}
              <div className="relative z-10 w-full h-full bg-[#02050c]/85 rounded-[22.5px] p-8 md:p-10">
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono text-white/40 tracking-wider">
                      INFRASTRUCTURE STATUS: ACTIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3daeff] tracking-wider uppercase font-bold">
                    ver 4.2.0
                  </span>
                </div>

                {/* Main telemetry detail */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono text-white/30 tracking-widest block uppercase mb-1">
                      Target Capacity
                    </span>
                    <span className="text-3xl font-black text-white tracking-tight">
                      120MW+
                    </span>
                  </div>
                  <div className="h-px bg-white/[0.04] w-full" />
                  <div>
                    <span className="text-[9px] font-mono text-white/30 tracking-widest block uppercase mb-1">
                      Typical PUE Rating
                    </span>
                    <span className="text-3xl font-black text-white tracking-tight">
                      1.12 - 1.15
                    </span>
                  </div>
                  <div className="h-px bg-white/[0.04] w-full" />
                  <div>
                    <span className="text-[9px] font-mono text-white/30 tracking-widest block uppercase mb-1">
                      Global Footprint
                    </span>
                    <span className="text-3xl font-black text-white tracking-tight">
                      3 Active Nodes
                    </span>
                  </div>
                </div>

                {/* Background Grid Pattern inside card */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none opacity-60 z-0" />
              </div>

              {/* Decorative Corner shimmers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#3daeff]/35 rounded-tl-[24px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#3daeff]/35 rounded-br-[24px] pointer-events-none" />
            </div>
          </div>

        </div>

        {/* ── Section 2: Strategic Pillars Bento Grid ── */}
        <div className="mb-32">
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <span className="text-[10px] font-extrabold text-[#3daeff] tracking-[0.25em] uppercase mb-4 block">
              OUR PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-black tracking-tight text-white mb-6">
              Engineering the Backbone of Intelligence
            </h2>
            <p className="text-white/55 text-[14px] leading-relaxed">
              We leverage vertical integration to solve the hard engineering challenges of data center cooling, power generation and compute density.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="relative p-[1px] rounded-[20px] bg-gradient-to-b from-white/[0.06] to-transparent shadow-[0_15px_30px_rgba(0,0,0,0.4)] overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]"
              >
                {/* Hover Aura Light */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle 180px at 50% 30%, ${pillar.glowColor}, transparent 100%)`
                  }}
                />

                <div className="relative z-10 w-full h-full bg-[#03060d]/85 rounded-[19px] p-8 flex flex-col items-start">
                  {/* Icon Wrapper */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>

                  <h3 className="text-[17px] font-black text-white mb-4">
                    {pillar.title}
                  </h3>

                  <p className="text-[13px] text-white/50 leading-relaxed font-normal mb-8 flex-grow">
                    {pillar.description}
                  </p>

                  <div className="w-full h-px bg-white/[0.06] my-4" />

                  <span className="text-[10px] font-mono text-[#3daeff] tracking-widest font-black uppercase">
                    {pillar.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: Core Values Grid ── */}
        <div className="mb-24 py-16 border-t border-white/[0.05] border-b border-white/[0.05]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {values.map((val, idx) => (
              <div key={idx} className="flex flex-col items-start">
                {/* Header (Icon + Title) */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/0 border border-white/[0.05] flex items-center justify-center shrink-0">
                    {val.icon}
                  </div>
                  <h3 className="text-[16px] font-black tracking-wide text-white">
                    {val.title}
                  </h3>
                </div>
                <p className="text-[12.5px] text-white/45 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Premium Call-to-Action ── */}
        <div className="relative w-full rounded-[24px] overflow-hidden p-[1px] bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <div className="relative z-10 w-full bg-[#02050c]/85 rounded-[23px] px-8 py-12 md:py-16 md:px-12 text-center flex flex-col items-center justify-center">

            {/* Background pattern inside CTA */}
            <div className="absolute inset-0 bg-[radial-gradient(#3daeff04_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none opacity-50 z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#3daeff]/5 rounded-full blur-[80px] pointer-events-none z-0" />

            <span className="relative z-10 text-[10px] font-extrabold text-[#3daeff] tracking-[0.25em] uppercase mb-4">
              COLLABORATION & SUPPORT
            </span>

            <h2 className="relative z-10 text-2xl sm:text-3xl md:text-[52px] font-black tracking-tight text-white mb-6 max-w-2xl leading-tight">
              Ready to Accelerate Your Compute Deployment?
            </h2>

            <p className="relative z-10 text-white/50 text-[13px] sm:text-[14px] leading-relaxed max-w-[560px] mb-8 font-normal">
              Whether you are looking for custom wholesale power/compute leases, strategic partnerships, or career opportunities, our teams are here to assist.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="group px-7 py-3 bg-white text-black font-extrabold text-[12.5px] rounded-xl flex items-center justify-center gap-2 hover:bg-[#3daeff] hover:text-white transition-all duration-300"
              >
                <span>Partner with USDC</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/press-release"
                className="px-7 py-3 border border-white/12 hover:border-white/20 hover:bg-white/[0.02] text-white/80 hover:text-white font-extrabold text-[12.5px] rounded-xl"
              >
                Read Press Releases
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
