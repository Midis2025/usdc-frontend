"use client";

import React from "react";
import { Activity, Server, Gauge, Globe2 } from "lucide-react";
import { useReveal } from "@/components/contact/useReveal";

/* ═══════════════════════ Global Presence ═══════════════════════
   Interactive world-map visualization on a 1000×500 viewBox. Data
   center nodes pulse, great-circle-style connection lines animate a
   flowing dash and floating glass statistic cards frame the map.
   The map continents are drawn as a dotted point-field so it reads
   as a holographic network rather than a literal atlas.
   ═══════════════════════════════════════════════════════════════ */

// Data-center node coordinates on the 1000×500 viewBox (approx. world map).
const NODES = [
  { id: "sfo", x: 165, y: 205, label: "San Francisco", hub: true },
  { id: "mia", x: 250, y: 250, label: "Miami", hub: true },
  { id: "nyc", x: 275, y: 185, label: "New York" },
  { id: "lon", x: 480, y: 165, label: "London", hub: true },
  { id: "fra", x: 520, y: 175, label: "Frankfurt" },
  { id: "dxb", x: 615, y: 250, label: "Dubai" },
  { id: "mum", x: 690, y: 270, label: "Mumbai" },
  { id: "sin", x: 775, y: 315, label: "Singapore", hub: true },
  { id: "tok", x: 860, y: 205, label: "Tokyo", hub: true },
  { id: "syd", x: 870, y: 400, label: "Sydney" },
  { id: "sao", x: 330, y: 360, label: "São Paulo" },
];

// Connections (great-circle-ish arcs) between node indices.
const LINKS: [string, string][] = [
  ["sfo", "nyc"],
  ["nyc", "lon"],
  ["mia", "sao"],
  ["lon", "fra"],
  ["fra", "dxb"],
  ["dxb", "mum"],
  ["mum", "sin"],
  ["sin", "tok"],
  ["sin", "syd"],
  ["tok", "sfo"],
  ["lon", "dxb"],
  ["mia", "lon"],
];

const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

// Build a quadratic arc path that bows away from the equator for a 3D feel.
function arcPath(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dist = Math.hypot(bx - ax, by - ay);
  const lift = Math.min(120, dist * 0.32);
  return `M ${ax} ${ay} Q ${mx} ${my - lift} ${bx} ${by}`;
}

const STATS = [
  {
    icon: <Server className="w-5 h-5" />,
    value: "14",
    label: "Regions live",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    value: "0.8ms",
    label: "Edge latency",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    value: "99.99%",
    label: "Network uptime",
  },
  {
    icon: <Globe2 className="w-5 h-5" />,
    value: "6",
    label: "Continents",
  },
];

export default function GlobalPresence() {
  const ref = useReveal<HTMLDivElement>(90);

  return (
    <section
      id="global-presence"
      className="relative w-full bg-[#04070f] py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a14] to-[#04070f] pointer-events-none" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="cx-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md mb-5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#3daeff] opacity-70 cx-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3daeff]" />
            </span>
            <span className="text-[9.5px] font-bold tracking-[0.24em] uppercase text-white/70">
              Global Network
            </span>
          </div>
          <h2 className="cx-reveal text-[32px] sm:text-[42px] font-bold tracking-tight text-white leading-[1.1] mb-4">
            One network,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff]">
              every continent
            </span>
          </h2>
          <p className="cx-reveal text-[14px] text-white/55 leading-[1.7]">
            Real-time data flows between our interconnected facilities. Hover a
            node to trace its live links.
          </p>
        </div>

        {/* Map panel */}
        <div className="cx-reveal relative rounded-[26px] bg-[#070b16]/70 backdrop-blur-2xl border border-white/[0.07] p-4 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.04)] overflow-hidden" data-delay="150">
          {/* faint grid */}
          <div
            className="absolute inset-0 opacity-[0.5] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(61,174,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,174,255,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <svg
            viewBox="0 0 1000 500"
            className="relative w-full h-auto"
            style={{ maxHeight: "560px" }}
          >
            <defs>
              <radialGradient id="cx-node" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#bfe6ff" />
                <stop offset="100%" stopColor="#0091ff" />
              </radialGradient>
              <linearGradient id="cx-link" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3daeff" stopOpacity="0" />
                <stop offset="50%" stopColor="#7fc8ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3daeff" stopOpacity="0" />
              </linearGradient>
              <filter id="cx-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Holographic continents as a dotted point field */}
            <g fill="#3daeff" opacity="0.16">
              {DOTS.map((d, i) => (
                <circle key={i} cx={d[0]} cy={d[1]} r={1.6} />
              ))}
            </g>

            {/* Connection arcs with flowing dash */}
            <g fill="none" stroke="url(#cx-link)" strokeWidth="1.6">
              {LINKS.map(([a, b], i) => {
                const na = nodeById(a);
                const nb = nodeById(b);
                return (
                  <path
                    key={i}
                    d={arcPath(na.x, na.y, nb.x, nb.y)}
                    strokeDasharray="6 10"
                    style={{
                      animation: `dashFlow ${4 + (i % 4)}s linear infinite`,
                    }}
                  />
                );
              })}
            </g>

            {/* Travelling data pulses along each arc */}
            <g>
              {LINKS.map(([a, b], i) => {
                const na = nodeById(a);
                const nb = nodeById(b);
                return (
                  <circle key={i} r="3" fill="#bfe6ff" filter="url(#cx-glow)">
                    <animateMotion
                      dur={`${3 + (i % 5) * 0.7}s`}
                      repeatCount="indefinite"
                      path={arcPath(na.x, na.y, nb.x, nb.y)}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur={`${3 + (i % 5) * 0.7}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {NODES.map((n) => (
                <g key={n.id} className="cx-mapnode" style={{ cursor: "pointer" }}>
                  {/* pulsing halo */}
                  <circle cx={n.x} cy={n.y} r={n.hub ? 16 : 11} fill="#3daeff" opacity="0.12">
                    <animate
                      attributeName="r"
                      values={`${n.hub ? 8 : 6};${n.hub ? 20 : 15};${n.hub ? 8 : 6}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.25;0;0.25"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* core dot */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.hub ? 5 : 3.4}
                    fill="url(#cx-node)"
                    filter="url(#cx-glow)"
                  />
                  {/* label */}
                  <text
                    x={n.x}
                    y={n.y - (n.hub ? 14 : 11)}
                    textAnchor="middle"
                    fill="#cfe6ff"
                    fontSize="11"
                    fontWeight="600"
                    opacity="0.0"
                    className="cx-maplabel"
                    style={{ transition: "opacity 0.25s" }}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>

          {/* Floating stat cards over the map */}
          <div className="relative mt-2 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="cx-reveal flex items-center gap-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] px-4 py-3.5 hover:border-[#3daeff]/30 hover:bg-white/[0.05] transition-all"
                data-delay={200 + i * 70}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#3daeff]/25 to-transparent border border-[#3daeff]/30 text-[#7fc8ff] flex-shrink-0">
                  {s.icon}
                </span>
                <div>
                  <div className="text-[20px] font-bold text-white leading-none tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[10.5px] text-white/45 mt-1 tracking-wide uppercase font-semibold">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reveal labels on node hover (scoped CSS) */}
      <style>{`
        .cx-mapnode:hover .cx-maplabel { opacity: 1 !important; }
      `}</style>
    </section>
  );
}

/* A sparse dotted point-field roughly suggesting the continents.
   Generated as coordinate pairs on the 1000×500 viewBox. */
const DOTS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  // rough rectangular landmass blobs [x0,y0,x1,y1]
  const blobs: [number, number, number, number][] = [
    [120, 150, 300, 290], // N. America
    [280, 320, 380, 430], // S. America
    [450, 130, 560, 210], // Europe
    [470, 220, 620, 380], // Africa
    [560, 150, 880, 300], // Asia
    [820, 360, 910, 430], // Australia
  ];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  blobs.forEach(([x0, y0, x1, y1]) => {
    const area = (x1 - x0) * (y1 - y0);
    const count = Math.floor(area / 240);
    for (let i = 0; i < count; i++) {
      pts.push([x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0)]);
    }
  });
  return pts;
})();
