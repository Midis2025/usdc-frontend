"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Info,
  Zap,
  CheckCircle,
} from "lucide-react";
import { type JobPosting } from "@/data/careersData";

export default function JobDetailClient({ job }: { job: JobPosting }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (d: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  const fadeLeft = (d: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateX(0)" : "translateX(-20px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  // Split title at " / " for nicer display
  const titleParts = job.title.split(" / ");

  return (
    <div className="min-h-screen" style={{ background: "#04070f" }}>
      {/* Back link */}
      <div className="mx-auto max-w-6xl px-6 pt-28 md:pt-32">
        <Link
          href="/career"
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase no-underline transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Open Positions
        </Link>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        {/* Ambient glows */}
        <div
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(100,80,220,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8" style={fadeLeft(0)}>
            <div className="h-[1px] w-12" style={{ background: "#3daeff" }} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: "#3daeff" }}>
              Careers / Detail
            </span>
          </div>

          <h1
            className="text-[40px] md:text-[64px] font-black leading-[0.95] tracking-tight uppercase mb-10 text-white"
            style={fadeUp(80)}
          >
            {titleParts.map((part, idx) => (
              <span key={idx} className={idx === titleParts.length - 1 ? "text-[#3daeff]" : "text-white"}>
                {part}
                {idx < titleParts.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <div
            className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-[0.15em]"
            style={{ color: "rgba(255,255,255,0.4)", ...fadeUp(160) }}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" style={{ color: "#3daeff" }} />
              {job.department}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: "#3daeff" }} />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "#3daeff" }} />
              {job.type}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" style={{ color: "#3daeff" }} />
              {job.mode}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column — 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Role Overview */}
            <div
              className="p-8 md:p-12 rounded-2xl"
              style={{
                background: "rgba(8,13,26,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                ...fadeUp(200),
              }}
            >
              <h2 className="text-[11px] font-black tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                <Info className="w-4 h-4" style={{ color: "#3daeff" }} />
                Role Overview
              </h2>
              <p className="text-[16px] md:text-[18px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                {job.overview}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div
              className="p-8 md:p-12 rounded-2xl"
              style={{
                background: "rgba(8,13,26,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                ...fadeUp(280),
              }}
            >
              <h2 className="text-[22px] font-black uppercase tracking-tight mb-8 text-white">
                Key Responsibilities
              </h2>
              <div className="grid gap-5">
                {job.responsibilities.map((r, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                      style={{ border: "1px solid rgba(61,174,255,0.3)" }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3daeff" }} />
                    </div>
                    <p className="leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {r}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div
              className="p-8 md:p-12 rounded-2xl"
              style={{
                background: "rgba(8,13,26,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                ...fadeUp(360),
              }}
            >
              <h2 className="text-[22px] font-black uppercase tracking-tight mb-8 text-white">
                Qualifications & Requirements
              </h2>
              <div className="grid gap-4">
                {job.qualifications.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#3daeff" }} />
                    <span className="font-bold text-[13px] tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {q}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-8">
            {/* Apply CTA */}
            <div
              className="rounded-2xl p-8 text-white"
              style={{
                background: "linear-gradient(135deg, rgba(12,20,40,0.95), rgba(8,13,26,0.98))",
                border: "1px solid rgba(61,174,255,0.15)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                ...fadeUp(200),
              }}
            >
              <h3 className="text-[22px] font-black uppercase mb-3 leading-tight text-white">
                Apply for this role
              </h3>
              <p className="text-[13px] mb-8 font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
                Join our mission to power the future of digital infrastructure.
              </p>
              <Link
                href={`/career/${job.slug}/apply`}
                className="group w-full flex items-center justify-between px-6 py-4 rounded-xl text-[#04070f] font-black tracking-[0.15em] uppercase transition-all duration-300 no-underline"
                style={{ background: "#3daeff" }}
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Why It Matters */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(61,174,255,0.04)",
                border: "1px solid rgba(61,174,255,0.1)",
                ...fadeUp(280),
              }}
            >
              <Zap className="w-10 h-10 mb-6" style={{ color: "#3daeff" }} />
              <h3 className="text-[16px] font-black uppercase mb-4 tracking-tight text-white">
                Why It Matters
              </h3>
              <p className="text-[13px] leading-relaxed font-semibold italic" style={{ color: "rgba(255,255,255,0.5)" }}>
                &quot;{job.whyItMatters}&quot;
              </p>
            </div>

            {/* Environment */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(8,13,26,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                ...fadeUp(360),
              }}
            >
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                Environment
              </h3>
              <p className="text-[13px] leading-relaxed font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
                {job.environment}
              </p>
            </div>

            {/* Preferred */}
            {job.preferred.length > 0 && (
              <div className="px-2" style={fadeUp(440)}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 px-4" style={{ color: "#3daeff" }}>
                  Preference Plus
                </h3>
                <div className="space-y-3">
                  {job.preferred.map((p, idx) => (
                    <div key={idx} className="px-4 py-2 transition-colors"
                      style={{ borderLeft: "2px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {p}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom back link */}
      <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
        <Link
          href="/career"
          className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.15em] uppercase no-underline transition-colors"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Browse more positions
        </Link>
      </section>
    </div>
  );
}
