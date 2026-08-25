"use client";

import React, { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  LifeBuoy,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { useReveal } from "@/components/contact/useReveal";

/* ═══════════════════════ Smart Contact Cards ═══════════════════════
   Four large futuristic glass cards: Email, Headquarters,
   Support, Sales. Each card has a floating 3D-style icon, neon glow,
   animated hover elevation, a moving light-sweep and 3D pointer tilt.
   ═══════════════════════════════════════════════════════════════════ */

interface CardDef {
  key: string;
  label: string;
  title: string;
  value: string;
  sub: string;
  href: string;
  icon: React.ReactNode;
  accent: string; // rgb triplet
}

const CARDS: CardDef[] = [
  {
    key: "email",
    label: "Email",
    title: "Talk to an architect",
    value: "hello@usdc.com",
    sub: "Replies within 2 hours",
    href: "mailto:hello@usdc.com",
    icon: <Mail className="w-7 h-7" strokeWidth={1.6} />,
    accent: "61,174,255",
  },
  {
    key: "hq",
    label: "Headquarters",
    title: "Visit us",
    value: "218 NW 24th St, Miami",
    sub: "FL 33127, USA",
    href: "https://maps.google.com/?q=218+NW+24th+St+Miami+FL+33127",
    icon: <MapPin className="w-7 h-7" strokeWidth={1.6} />,
    accent: "120,210,255",
  },
  {
    key: "support",
    label: "Support",
    title: "Operations desk",
    value: "support@usdc.com",
    sub: "Live 24/7/365",
    href: "mailto:support@usdc.com",
    icon: <LifeBuoy className="w-7 h-7" strokeWidth={1.6} />,
    accent: "0,145,255",
  },
  {
    key: "sales",
    label: "Sales",
    title: "Enterprise sales",
    value: "sales@usdc.com",
    sub: "Custom MW-scale quotes",
    href: "mailto:sales@usdc.com",
    icon: <Briefcase className="w-7 h-7" strokeWidth={1.6} />,
    accent: "70,140,255",
  },
];

export default function SmartContactCards() {
  const ref = useReveal<HTMLDivElement>(80);

  return (
    <section className="relative w-full bg-[#04070f] py-20 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3daeff]/15 to-transparent" />
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div ref={ref} className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Heading */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="cx-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              Direct Channels
            </span>
          </div>
          <h2 className="cx-reveal text-[32px] sm:text-[40px] font-bold tracking-tight text-white leading-[1.1] mb-4">
            Reach the right{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff]">
              frequency
            </span>
          </h2>
          <p className="cx-reveal text-[14px] text-white/55 leading-[1.7]">
            Every channel routes to a real human on our infrastructure team.
            Pick the one that fits.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {CARDS.map((c, i) => (
            <SmartCard key={c.key} def={c} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SmartCard({ def, delay }: { def: CardDef; delay: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      ry: (px - 0.5) * 12,
      rx: -(py - 0.5) * 12,
      mx: px * 100,
      my: py * 100,
    });
  };
  const reset = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const a = def.accent;

  return (
    <a
      ref={ref}
      href={def.href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="cx-reveal group relative block rounded-[22px] p-[1px] [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform"
      data-delay={delay}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
          tilt.rx || tilt.ry ? -8 : 0
        }px)`,
      }}
    >
      {/* Gradient border that lights up on hover */}
      <span
        className="absolute inset-0 rounded-[22px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(140deg, rgba(${a},0.5), transparent 40%, transparent 60%, rgba(${a},0.3))`,
        }}
      />

      {/* Card body */}
      <div className="relative h-full rounded-[21px] bg-[#080d18]/90 backdrop-blur-xl border border-white/[0.06] p-7 overflow-hidden transition-shadow duration-500">
        {/* Pointer-follow glow */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(340px circle at ${tilt.mx}% ${tilt.my}%, rgba(${a},0.18), transparent 65%)`,
          }}
        />
        {/* Moving light sweep across the card on hover */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[21px]">
          <span className="absolute top-0 left-0 h-full w-1/3 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/12 to-transparent group-hover:translate-x-[400%] transition-transform duration-[900ms] ease-in-out" />
        </span>
        {/* Subtle grid texture */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(circle at 80% 0%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 80% 0%, black, transparent 70%)",
          }}
        />

        {/* 3D floating icon */}
        <div
          className="relative mb-6 [transform:translateZ(40px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-16 h-16 cx-floatY" style={{ animationDelay: `${delay}ms` }}>
            {/* glow puddle behind icon */}
            <span
              className="absolute inset-0 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ background: `rgba(${a},0.45)` }}
            />
            {/* glass icon tile */}
            <span
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl border text-white"
              style={{
                background: `linear-gradient(145deg, rgba(${a},0.22), rgba(255,255,255,0.02))`,
                borderColor: `rgba(${a},0.35)`,
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.15), 0 10px 24px rgba(${a},0.25)`,
              }}
            >
              {def.icon}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="relative [transform:translateZ(24px)]">
          <span className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-white/40">
            {def.label}
          </span>
          <h3 className="text-[18px] font-semibold text-white mt-1.5 mb-3">
            {def.title}
          </h3>
          <p
            className="text-[15px] font-medium mb-1 transition-colors"
            style={{ color: `rgb(${a})` }}
          >
            {def.value}
          </p>
          <p className="text-[12px] text-white/45">{def.sub}</p>
        </div>

        {/* corner arrow */}
        <div className="relative mt-6 flex items-center gap-1.5 text-white/40 group-hover:text-white transition-colors [transform:translateZ(24px)]">
          <span className="text-[11px] font-semibold tracking-wide uppercase">
            Connect
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
}
