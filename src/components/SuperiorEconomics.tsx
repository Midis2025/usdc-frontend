"use client";

import React from "react";
import { Coins, TrendingUp, Shield, Zap } from "lucide-react";

export default function SuperiorEconomics() {
  const metrics = [
    {
      title: "Structural Cost Advantage",
      metric: "~$0.04/KWH",
      desc: "Target power production cost cited for North Tonawanda site, beating market rates.",
      Icon: Coins
    },
    {
      title: "Transmission Efficiency",
      metric: "BEHIND-THE-METER",
      desc: "Direct distribution program drastically reduces grid transmission and delivery fees.",
      Icon: TrendingUp
    },
    {
      title: "Revenue Optionality",
      metric: "2N REDUNDANCY",
      desc: "Dual-path interconnection enables Tier III equivalent uptime for critical AI loads.",
      Icon: Shield
    },
    {
      title: "Pipeline Capacity",
      metric: "400MW+",
      desc: "Combined existing and expansion energy capacity designated for compute conversion.",
      Icon: Zap
    }
  ];

  return (
    <section className="w-full bg-[#04070f] py-12 md:py-16 border-t border-white/[0.03] select-none">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

        {/* Center-Aligned Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-[52px] lg:text-[52px] font-extrabold tracking-wide text-white mb-6 font-sans leading-[1.1] uppercase max-w-[1050px] mx-auto">
          Superior Economics. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">
            Sustainable Advantage.
          </span>
        </h2>

        {/* Center-Aligned Description */}
        <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[600px] mb-16 font-sans mx-auto">
          Our integrated energy model delivers structural cost advantages, operational efficiency and scalable capacity for AI infrastructure.
        </p>

        {/* Horizontal Divided Panel */}
        <div className="w-full max-w-[1160px] relative border border-white/[0.08] rounded-2xl bg-[#02050c]/40 backdrop-blur-md py-12 px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {metrics.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.title}
                className={`relative z-10 flex flex-col items-center text-center px-4 md:px-6 py-2 group transition-transform duration-300 will-change-transform hover:-translate-y-2
                  ${idx < metrics.length - 1 ? "md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-1/6 md:after:bottom-1/6 md:after:w-px md:after:bg-gradient-to-b md:after:from-transparent md:after:via-[#3daeff]/65 md:after:to-[#3daeff]/25 md:after:shadow-[0_0_18px_rgba(61,174,255,0.16)]" : ""}
                `}
              >
                {/* Metric Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#3daeff]/20 bg-[#3daeff]/5 flex items-center justify-center mb-6 shadow-[0_6px_30px_rgba(61,174,255,0.06)] group-hover:shadow-[0_10px_40px_rgba(61,174,255,0.12)] hover:border-[#3daeff]/40 hover:bg-[#3daeff]/12 transition-all duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#3daeff] transform transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Subtitle / Category Label */}
                <span className="text-[10px] font-bold text-white/35 tracking-[0.18em] uppercase mb-3.5 font-mono">
                  {item.title}
                </span>

                {/* Large Value Display */}
                <span className="text-xl md:text-2xl lg:text-[22px] font-extrabold text-white tracking-tight mb-4 font-sans uppercase">
                  {item.metric}
                </span>

                {/* Detail Description */}
                <p className="text-[12px] md:text-[13px] text-white/50 leading-relaxed font-sans max-w-[210px] mx-auto">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
