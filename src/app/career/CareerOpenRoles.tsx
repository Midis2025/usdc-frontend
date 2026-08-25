"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, Briefcase, Search } from "lucide-react";
import { jobs } from "@/data/careersData";

/* ═══════════════════════ Open Roles — Premium ═══════════════════════ */

const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

const deptConfig: Record<string, { color: string; bg: string }> = {
  Engineering: { color: "#3daeff", bg: "rgba(61,174,255,0.1)" },
  Operations:  { color: "#3daeff", bg: "rgba(61,174,255,0.1)" },
  Business:    { color: "#3daeff", bg: "rgba(61,174,255,0.1)" },
  Product:     { color: "#3daeff", bg: "rgba(61,174,255,0.1)" },
};

export default function CareerOpenRoles() {
  const [inView, setInView]   = useState(false);
  const [active, setActive]   = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fadeUp = (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  const filtered = active === "All" ? jobs : jobs.filter((r) => r.department === active);
  const dept = deptConfig;

  return (
    <section id="open-roles" ref={ref}
      className="w-full relative overflow-hidden py-28 md:py-36"
      style={{ background: "#04070f" }}>

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(61,174,255,0.15), transparent)" }} />

      {/* Ambient */}
      <div className="absolute top-[5%] right-[-6%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.04) 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="absolute bottom-[5%] left-[-6%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(80,60,200,0.03) 0%, transparent 70%)", filter: "blur(90px)" }} />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/80 backdrop-blur-md mb-8" style={fadeUp(0)}>
              <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
              <span className="text-[9px] font-bold text-white/60 tracking-[0.28em] uppercase">Open Positions</span>
            </div>
            <h2 className="text-[38px] sm:text-[48px] md:text-[52px] font-black tracking-[-0.02em] leading-[1.0] text-white" style={fadeUp(80)}>
              Find your{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(120deg, #74d1ff, #3daeff, #0068d6)" }}>
                perfect role.
              </span>
            </h2>
          </div>

          {/* Live count badge */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{ background: "rgba(8,13,26,0.8)", border: "1px solid rgba(255,255,255,0.06)", ...fadeUp(120) }}>
            <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6)]"
              style={{ animation: "glowPulse 2.5s ease-in-out infinite" }} />
            <span className="text-[12px] font-bold text-white/70">
              <span className="text-white">{jobs.length}</span> positions open now
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-10" style={fadeUp(160)}>
          {departments.map((d) => {
            const isActive = active === d;
            const cfg = d !== "All" ? dept[d] : null;
            return (
              <button key={d} onClick={() => setActive(d)}
                className="px-5 py-2 rounded-xl text-[11.5px] font-bold tracking-wide transition-all duration-250 cursor-pointer relative overflow-hidden"
                style={{
                  background: isActive
                    ? (cfg ? cfg.bg : "rgba(61,174,255,0.12)")
                    : "rgba(255,255,255,0.02)",
                  border: isActive
                    ? `1px solid ${cfg ? cfg.color + "40" : "rgba(61,174,255,0.35)"}`
                    : "1px solid rgba(255,255,255,0.06)",
                  color: isActive
                    ? (cfg ? cfg.color : "#3daeff")
                    : "rgba(255,255,255,0.4)",
                  boxShadow: isActive && cfg ? `0 0 16px ${cfg.color}18` : "none",
                }}>
                {d}
                {d !== "All" && (
                  <span className="ml-1.5 text-[9px] opacity-60">
                    {jobs.filter((r) => r.department === d).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Roles list */}
        <div className="flex flex-col gap-2.5" style={fadeUp(220)}>
          {filtered.map((role, i) => {
            const cfg = dept[role.department] ?? { color: "#3daeff", bg: "rgba(61,174,255,0.08)" };
            const isHov = hovered === i;

            return (
              <Link href={`/career/${role.slug}`} key={`${role.slug}-${i}`}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 px-6 py-5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300"
                  style={{
                    background: isHov
                      ? "linear-gradient(135deg, rgba(12,20,40,0.95), rgba(8,13,26,0.98))"
                      : "rgba(8,13,26,0.6)",
                    border: isHov
                      ? `1px solid ${cfg.color}30`
                      : "1px solid rgba(255,255,255,0.05)",
                    boxShadow: isHov
                      ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${cfg.color}15`
                      : "0 2px 12px rgba(0,0,0,0.15)",
                    transform: isHov ? "translateX(4px)" : "translateX(0)",
                  }}>

                  {/* Left edge accent */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(180deg, ${cfg.color}, ${cfg.color}50)`,
                      opacity: isHov ? 1 : 0.3,
                      boxShadow: isHov ? `0 0 8px ${cfg.color}60` : "none",
                    }} />

                  {/* Shimmer */}
                  <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cfg.color}06, transparent)`,
                      opacity: isHov ? 1 : 0,
                    }} />

                  {/* Left: title + meta */}
                  <div className="flex items-start sm:items-center gap-5 pl-3">
                    {/* Dept dot */}
                    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isHov ? cfg.bg : "rgba(255,255,255,0.03)",
                        border: isHov ? `1px solid ${cfg.color}40` : "1px solid rgba(255,255,255,0.06)",
                      }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: cfg.color, opacity: isHov ? 1 : 0.5 }} />
                    </div>

                    <div>
                      {/* Title row */}
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="text-[14.5px] font-bold tracking-tight transition-colors duration-200"
                          style={{ color: isHov ? "#fff" : "rgba(255,255,255,0.85)" }}>
                          {role.title}
                        </h3>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center flex-wrap gap-4 text-[10.5px] font-medium"
                        style={{ color: "rgba(255,255,255,0.3)" }}>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {role.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3" />
                          <span style={{ color: cfg.color, fontWeight: 600 }}>{role.department}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: dept + arrow */}
                  <div className="flex items-center gap-5 sm:ml-auto pl-11 sm:pl-0">
                    <span className="hidden lg:block text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-lg"
                      style={{
                        color: isHov ? cfg.color : "rgba(255,255,255,0.2)",
                        background: isHov ? cfg.bg : "transparent",
                        border: isHov ? `1px solid ${cfg.color}30` : "1px solid transparent",
                        transition: "all 0.3s",
                      }}>
                      {role.department}
                    </span>

                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isHov ? cfg.color : "rgba(255,255,255,0.03)",
                        border: isHov ? `1px solid ${cfg.color}` : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isHov ? `0 0 16px ${cfg.color}40` : "none",
                      }}>
                      <ArrowUpRight className="w-4 h-4 transition-colors duration-300"
                        style={{ color: isHov ? "#fff" : "rgba(255,255,255,0.3)" }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Open application banner */}
        <div className="mt-8 relative overflow-hidden rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            ...fadeUp(360),
            background: "linear-gradient(135deg, rgba(61,174,255,0.05) 0%, rgba(8,13,26,0.8) 100%)",
            border: "1px solid rgba(61,174,255,0.12)",
          }}>
          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(61,174,255,0.08) 0%, transparent 70%)" }} />

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(61,174,255,0.08)", border: "1px solid rgba(61,174,255,0.2)" }}>
              <Search className="w-4.5 h-4.5 text-[#3daeff]" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white mb-0.5">Don&apos;t see the right role?</p>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                We&apos;re always open to exceptional talent — send your resume and we&apos;ll reach out.
              </p>
            </div>
          </div>

          <Link href="/career/apply"
            className="flex-shrink-0 group flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap no-underline"
            style={{
              background: "rgba(61,174,255,0.08)",
              border: "1px solid rgba(61,174,255,0.25)",
              color: "#3daeff",
            }}>
            General Application
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
