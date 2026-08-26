"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, ArrowRight, Bell, FileText, Rss, User, CheckCircle2 } from "lucide-react";

/* ═══════════════════════════ Press Release CTA ═══════════════════════════
   Newsletter subscription + media contact CTA with futuristic styling.
   ═══════════════════════════════════════════════════════════════════════ */

export default function PressReleaseCTA() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    try {
      const response = await fetch("https://peaceful-power-64c420fe0a.strapiapp.com/api/subcribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          data: {
            fullName: name,
            email: email,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setSubmitting(false);
      setSuccess(true);
      setEmail("");
      setName("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubmitting(false);
    }
  };

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

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const channels = [
    {
      icon: Bell,
      title: "Press Alerts",
      desc: "Get notified instantly when new press releases are published.",
    },
    {
      icon: FileText,
      title: "Media Kit",
      desc: "Download brand assets, logos and executive bios.",
    },
    {
      icon: Rss,
      title: "RSS Feed",
      desc: "Subscribe via RSS for automated press release delivery.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#04070f] pt-6 pb-6 md:pt-12 md:pb-16 overflow-hidden"
    >
      {/* ── Top decorative line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3daeff]/15 to-transparent" />

      {/* ── Ambient glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Main CTA Card ── */}
        <div
          style={fadeUp(0)}
          className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-[#0a1628]/80 to-[#04070f]/90 p-6 sm:p-10 md:p-14"
        >
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(61,174,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,174,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Gradient accent at top */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#3daeff]/40 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Text + Email signup */}
            <div>
              <div
                style={fadeUp(80)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3daeff]/15 bg-[#3daeff]/5 mb-6"
              >
                <Mail className="w-3 h-3 text-[#3daeff]" />
                <span className="text-[9px] font-bold text-[#3daeff]/80 tracking-[0.2em] uppercase">
                  Stay Connected
                </span>
              </div>

              <h2
                style={fadeUp(140)}
                className="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold tracking-tight leading-[1.1] text-white mb-4"
              >
                Never Miss a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#3daeff]">
                  Headline
                </span>
              </h2>

              <p
                style={fadeUp(200)}
                className="text-[13px] text-white/45 leading-[1.8] max-w-[440px] mb-8"
              >
                Subscribe to USDC&apos;s press release distribution list and be
                the first to know about partnerships, expansions and technology
                breakthroughs.
              </p>

              {/* Subscription form */}
              <div style={fadeUp(260)}>
                {success ? (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 flex items-center gap-3 w-fit animate-[fadeIn_0.5s_ease-out]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Successfully subscribed!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-[440px]">
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-[12px] placeholder:text-white/20 focus:outline-none focus:border-[#3daeff]/30 focus:bg-white/[0.06] transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-[12px] placeholder:text-white/20 focus:outline-none focus:border-[#3daeff]/30 focus:bg-white/[0.06] transition-all duration-300"
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={submitting}
                        className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white text-[11px] font-bold tracking-[0.08em] uppercase shadow-[0_4px_20px_rgba(61,174,255,0.25)] hover:shadow-[0_6px_25px_rgba(61,174,255,0.35)] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50"
                      >
                        {submitting ? "Subscribing..." : "Subscribe"}
                        {!submitting && <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Channel cards */}
            <div className="flex flex-col gap-4">
              {channels.map((ch, i) => (
                <div
                  key={i}
                  style={fadeUp(200 + i * 80)}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#3daeff]/15 hover:bg-white/[0.04] transition-all duration-400 cursor-pointer"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3daeff]/8 border border-[#3daeff]/12 flex-shrink-0">
                    <ch.icon className="w-4.5 h-4.5 text-[#3daeff]" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white/80 mb-1 group-hover:text-[#3daeff] transition-colors duration-300">
                      {ch.title}
                    </h4>
                    <p className="text-[11px] text-white/35 leading-[1.7]">
                      {ch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
