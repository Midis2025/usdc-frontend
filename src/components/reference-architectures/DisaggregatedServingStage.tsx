"use client";

import React, { useEffect, useState } from "react";

interface DisaggregatedServingStageProps {
  currentStep?: number;
}

const STEP_EXPLANATIONS: Record<number, { title: string; bold: string; desc: string }> = {
  1: {
    title: "ROUTE",
    bold: "Step 01.",
    desc: "The router directs incoming prompt requests to an optimal prefill worker selected for maximum arithmetic compute density.",
  },
  2: {
    title: "PREFILL",
    bold: "Step 02.",
    desc: "The prefill engine processes the prompt context and builds the initial KV cache in GPU memory under near-sustained TDP.",
  },
  3: {
    title: "TRANSFER (NIXL)",
    bold: "Step 03.",
    desc: "NIXL streams the KV cache GPU-to-GPU across the ultra-fast pod fabric without interrupting ongoing forward passes.",
  },
  4: {
    title: "DECODE",
    bold: "Step 04.",
    desc: "Decode begins immediately and streams output tokens in parallel while memory transfer finalizes (SGLang runtime).",
  },
};

export default function DisaggregatedServingStage({ currentStep = 4 }: DisaggregatedServingStageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const step = currentStep || 4;
  const currentInfo = STEP_EXPLANATIONS[step] || STEP_EXPLANATIONS[4];

  // Particle path definitions
  const reqPath = "M240 156 L240 188";
  const dropPath = "M240 240 L240 310";
  const nixlFwd = "M588 438 L772 438";
  const nixlBwd = "M772 438 L588 438";
  const outPath = "M1036 540 L1036 612";

  return (
    <div className="disagg-model-root">
      <style jsx>{`
        .disagg-model-root {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: radial-gradient(130% 100% at 50% 0%, #0c1a38 0%, #060e20 45%, #030712 100%);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(186, 230, 253, 0.15);
          color: #f1f5f9;
          font-family: var(--font-mono), "Inter", -apple-system, sans-serif;
        }

        /* Ambient glows & Corner Accents */
        .ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%);
          z-index: 1;
        }
        .corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border: 2px solid #38bdf8;
          opacity: 0.9;
          z-index: 6;
          filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.6));
        }
        .corner.tl {
          left: 12px;
          top: 12px;
          border-right: 0;
          border-bottom: 0;
          border-radius: 6px 0 0 0;
        }
        .corner.tr {
          right: 12px;
          top: 12px;
          border-left: 0;
          border-bottom: 0;
          border-radius: 0 6px 0 0;
        }
        .corner.bl {
          left: 12px;
          bottom: 12px;
          border-right: 0;
          border-top: 0;
          border-radius: 0 0 0 6px;
        }
        .corner.br {
          right: 12px;
          bottom: 12px;
          border-left: 0;
          border-top: 0;
          border-radius: 0 0 6px 0;
        }

        /* SVG Canvas */
        .svg-canvas {
          width: 100%;
          height: auto;
          display: block;
          position: relative;
          z-index: 2;
        }

        /* CSS for SVG typography & styling */
        :global(.disagg-model-root text) {
          user-select: none;
        }
        :global(.disagg-model-root .h-title) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 800;
          font-size: 20px;
          letter-spacing: 0.16em;
          fill: #ffffff;
        }
        :global(.disagg-model-root .h-meta) {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          fill: #94a3b8;
        }
        :global(.disagg-model-root .h-r-title) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.18em;
          fill: #38bdf8;
        }
        :global(.disagg-model-root .h-r-meta) {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          fill: #94a3b8;
        }

        /* Panels */
        :global(.disagg-model-root .panel-bg) {
          fill: url(#panelGradDark);
          stroke: rgba(56, 189, 248, 0.35);
          stroke-width: 1.4;
          transition: all 0.35s ease;
        }
        :global(.disagg-model-root .panel-active .panel-bg) {
          fill: url(#panelGradActive);
          stroke: #38bdf8;
          stroke-width: 1.6;
          filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.4));
        }

        :global(.disagg-model-root .p-title) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.06em;
          fill: #ffffff;
        }
        :global(.disagg-model-root .p-sub) {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          fill: #93c5fd;
        }
        :global(.disagg-model-root .p-detail) {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          fill: #38bdf8;
        }

        /* Connectors */
        :global(.disagg-model-root .conn-wire) {
          stroke: rgba(56, 189, 248, 0.4);
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 4 6;
          stroke-linecap: round;
        }
        :global(.disagg-model-root .conn-wire.active) {
          stroke: #38bdf8;
          stroke-width: 2;
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.6));
          animation: dashMove 1.2s linear infinite;
        }
        @keyframes dashMove {
          to {
            stroke-dashoffset: -20;
          }
        }

        /* Matrix Grid LEDs */
        :global(.disagg-model-root .m-led) {
          fill: rgba(56, 189, 248, 0.2);
        }
        :global(.disagg-model-root .m-led.active) {
          fill: #38bdf8;
          filter: drop-shadow(0 0 4px #38bdf8);
        }
        :global(.disagg-model-root .m-led.hot) {
          fill: #67e8f9;
          filter: drop-shadow(0 0 5px #67e8f9);
        }

        /* Explanation Box */
        :global(.disagg-model-root .hex-bg) {
          fill: #0b2246;
          stroke: #38bdf8;
          stroke-width: 1.8;
          filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.45));
        }
        :global(.disagg-model-root .hex-txt) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 800;
          font-size: 22px;
          fill: #ffffff;
        }
        :global(.disagg-model-root .ex-bold) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 800;
          fill: #38bdf8;
          font-size: 16px;
          letter-spacing: 0.04em;
        }
        :global(.disagg-model-root .ex-text) {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 500;
          fill: #f1f5f9;
          font-size: 15px;
          letter-spacing: 0.01em;
        }

        /* Chevrons */
        :global(.disagg-model-root .chev) {
          fill: none;
          stroke: #38bdf8;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7));
        }
        :global(.disagg-model-root .c1) {
          animation: chevAnim 1.4s ease-in-out infinite;
        }
        :global(.disagg-model-root .c2) {
          animation: chevAnim 1.4s ease-in-out infinite 0.2s;
        }
        :global(.disagg-model-root .c3) {
          animation: chevAnim 1.4s ease-in-out infinite 0.4s;
        }
        @keyframes chevAnim {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Ambient Glow layer */}
      <div className="ambient-glow" />

      {/* Decorative Blueprint Corners */}
      <div className="corner tl" />
      <div className="corner tr" />
      <div className="corner bl" />
      <div className="corner br" />

      <svg
        className="svg-canvas"
        viewBox="0 0 1360 880"
        role="img"
        aria-label="Disaggregated Serving Architecture Schematic"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient definitions for cards and badges */}
          <linearGradient id="panelGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(15, 30, 60, 0.75)" />
            <stop offset="100%" stopColor="rgba(8, 16, 36, 0.85)" />
          </linearGradient>

          <linearGradient id="panelGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 48, 98, 0.88)" />
            <stop offset="100%" stopColor="rgba(10, 24, 54, 0.95)" />
          </linearGradient>

          <linearGradient id="kvSubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(18, 44, 88, 0.85)" />
            <stop offset="100%" stopColor="rgba(10, 26, 56, 0.95)" />
          </linearGradient>

          <linearGradient id="badgePillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.25)" />
          </linearGradient>

          <linearGradient id="loadMeterGradPrefill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>

          <linearGradient id="loadMeterGradDecode" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          <pattern id="dotGridCanvas" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="18" r="1.2" fill="#38bdf8" fillOpacity="0.14" />
          </pattern>
        </defs>

        {/* Blueprint Grid Background */}
        <rect width="1360" height="880" fill="url(#dotGridCanvas)" />

        {/* ================= HEADER HUD ================= */}
        <g transform="translate(60, 42)">
          <text x="0" y="22" className="h-title">
            <tspan fill="#38bdf8">STEP 0{step}</tspan> · {currentInfo.title}
          </text>
          <circle cx="4" cy="44" r="4" fill="#38bdf8">
            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1;0.4;1" />
          </circle>
          <text x="18" y="48" className="h-meta">
            LINK ACTIVE · NODE 04 · RT 0.4MS
          </text>

          <text x="1240" y="22" textAnchor="end" className="h-r-title">
            DISAGGREGATED SERVING
          </text>
          <text x="1240" y="48" textAnchor="end" className="h-r-meta">
            SGLANG · NVIDIA DYNAMO ARCHITECTURE
          </text>
        </g>

        {/* ================= TOP PANEL: REQUEST IN ================= */}
        <g
          className={step >= 1 ? "panel-active" : ""}
          transform="translate(60, 96)"
        >
          <rect width="360" height="60" rx="12" className="panel-bg" />
          {/* Prompt / Input Icon */}
          <g transform="translate(18, 16)" stroke="#38bdf8" strokeWidth="1.8" fill="none">
            <rect x="3" y="4" width="20" height="18" rx="4" />
            <path d="M8 10l3.5 3-3.5 3M14.5 16h4.5" />
          </g>
          <text x="64" y="36" className="p-title" style={{ fontSize: 16 }}>REQUEST IN</text>
          
          {/* Badge Pill */}
          <rect x="236" y="16" width="104" height="28" rx="6" fill="url(#badgePillGrad)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
          <text x="288" y="34" textAnchor="middle" className="p-sub" fill="#38bdf8" style={{ fontWeight: 800, fontSize: 11 }}>
            PROMPT
          </text>
        </g>

        {/* ================= TOP PANEL: ROUTER ================= */}
        <g
          className={step >= 1 ? "panel-active" : ""}
          transform="translate(90, 188)"
        >
          <rect width="300" height="52" rx="10" className="panel-bg" />
          <g transform="translate(18, 14)" stroke="#38bdf8" strokeWidth="1.6" fill="none">
            <rect x="3" y="8" width="18" height="8" rx="2" />
            <circle cx="7" cy="12" r="1.2" fill="#38bdf8" />
            <circle cx="11" cy="12" r="1.2" fill="#38bdf8" />
            <path d="M8 8V4M12 8V3M16 8V5" />
          </g>
          <text x="56" y="33" className="p-title" style={{ fontSize: 15 }}>ROUTER</text>
          
          {/* Router Action Pill */}
          <rect x="186" y="12" width="94" height="28" rx="6" fill="url(#badgePillGrad)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
          <text x="233" y="30" textAnchor="middle" className="p-sub" fill="#67e8f9" style={{ fontWeight: 700, fontSize: 10.5 }}>
            DISPATCH
          </text>
        </g>

        {/* Wire: Request In to Router */}
        <path
          d="M240 156 V188"
          className={`conn-wire ${step >= 1 ? "active" : ""}`}
        />

        {/* Wire: Router to Prefill Worker */}
        <path
          d="M240 240 V310"
          className={`conn-wire ${step >= 1 ? "active" : ""}`}
        />
        <circle cx="240" cy="275" r="4" fill="#38bdf8" />

        {/* ================= WORKER 01: PREFILL WORKER ================= */}
        <g
          className={step >= 1 ? "panel-active" : ""}
          transform="translate(60, 310)"
        >
          <rect width="528" height="230" rx="16" className="panel-bg" />

          {/* Icon Badge */}
          <g transform="translate(24, 20)">
            <rect width="44" height="44" rx="10" fill="rgba(24, 52, 105, 0.75)" stroke="#38bdf8" strokeWidth="1.4" />
            <g transform="translate(10, 10)" stroke="#38bdf8" strokeWidth="1.6" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
              <path d="M8 4V1M12 4V1M16 4V1M8 20v3M12 20v3M16 20v3M4 8H1M4 12H1M4 16H1M20 8h3M20 12h3M20 16h3" />
            </g>
          </g>

          <text x="82" y="40" className="p-title" style={{ fontSize: 18 }}>PREFILL WORKER</text>
          <text x="82" y="58" className="p-sub" fill="#93c5fd">GPU MEMORY · COMPUTE BOUND</text>
          
          {/* Status badge pill */}
          <g transform="translate(82, 66)">
            <circle cx="5" cy="5" r="3.5" fill={step >= 2 ? "#38bdf8" : "#4ade80"}>
              {step >= 2 && <animate attributeName="opacity" dur="1s" repeatCount="indefinite" values="1;0.4;1" />}
            </circle>
            <text x="14" y="9" className="p-detail" fill={step >= 2 ? "#67e8f9" : "#4ade80"}>
              {step >= 2 ? "COMPUTING KV CACHE · TDP PEAK (98%)" : "GPU ONLINE · READY FOR BATCH"}
            </text>
          </g>

          {/* KV Cache Sub-module */}
          <g transform="translate(20, 114)">
            <rect width="488" height="92" rx="12" fill="url(#kvSubGrad)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.4" />
            
            {/* Database Icon */}
            <g transform="translate(18, 24)" stroke="#38bdf8" strokeWidth="1.5" fill="none">
              <ellipse cx="12" cy="6" rx="7" ry="3" />
              <path d="M5 6v5.5c0 1.65 3.13 3 7 3s7-1.35 7-3V6" />
              <path d="M5 11.5v5.5c0 1.65 3.13 3 7 3s7-1.35 7-3V11.5" />
            </g>
            <text x="56" y="44" className="p-title" style={{ fontSize: 16 }}>KV CACHE</text>
            <text x="56" y="62" className="p-sub" fill="#38bdf8" style={{ fontWeight: 700, fontSize: 11 }}>SUSTAINED PREFILL</text>

            {/* Micro LED Matrix (16x4) */}
            <g transform="translate(228, 20)">
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((col) => (
                  <circle
                    key={`p-led-${row}-${col}`}
                    cx={col * 15}
                    cy={row * 13}
                    r="2.4"
                    className={`m-led ${step >= 2 && (col + row) % 3 === 0 ? "hot" : ""}`}
                  />
                ))
              )}
            </g>

            {/* Bottom load meter */}
            <rect x="0" y="86" width="488" height="6" rx="3" fill="rgba(15, 35, 75, 0.6)" />
            <rect x="0" y="86" width={step >= 2 ? "430" : "140"} height="6" rx="3" fill="url(#loadMeterGradPrefill)" />
          </g>
        </g>

        {/* ================= CENTER: NIXL KV TRANSFER ================= */}
        <g transform="translate(588, 400)">
          {/* Main NIXL wire */}
          <path
            d="M0 38 H184"
            className={`conn-wire ${step >= 3 ? "active" : ""}`}
            strokeWidth="3"
          />
          {/* Nodes */}
          <circle cx="0" cy="38" r="5" fill="#38bdf8" />
          <circle cx="46" cy="38" r="3.5" fill="#93c5fd" />
          <circle cx="92" cy="38" r="5.5" fill="#38bdf8" />
          <circle cx="138" cy="38" r="3.5" fill="#93c5fd" />
          <circle cx="184" cy="38" r="5" fill="#38bdf8" />

          {/* Labels with badge background */}
          <text x="92" y="16" textAnchor="middle" className="p-title" fill="#38bdf8" style={{ fontSize: 17, letterSpacing: 3, fontWeight: 800 }}>
            NIXL
          </text>
          <rect x="36" y="52" width="112" height="24" rx="6" fill="url(#badgePillGrad)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
          <text x="92" y="68" textAnchor="middle" className="p-sub" fill="#e0f2fe" style={{ fontSize: 10.5, letterSpacing: 1.8, fontWeight: 700 }}>
            NON-BLOCKING
          </text>
        </g>

        {/* ================= WORKER 02: DECODE WORKER ================= */}
        <g
          className={step >= 3 ? "panel-active" : ""}
          transform="translate(772, 310)"
        >
          <rect width="528" height="230" rx="16" className="panel-bg" />

          {/* Icon Badge */}
          <g transform="translate(24, 20)">
            <rect width="44" height="44" rx="10" fill="rgba(24, 52, 105, 0.75)" stroke="#38bdf8" strokeWidth="1.4" />
            <g transform="translate(10, 10)" stroke="#38bdf8" strokeWidth="1.6" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
              <path d="M8 4V1M12 4V1M16 4V1M8 20v3M12 20v3M16 20v3M4 8H1M4 12H1M4 16H1M20 8h3M20 12h3M20 16h3" />
            </g>
          </g>

          <text x="82" y="40" className="p-title" style={{ fontSize: 18 }}>DECODE WORKER</text>
          <text x="82" y="58" className="p-sub" fill="#93c5fd">GPU MEMORY · BANDWIDTH BOUND</text>
          
          {/* Status badge pill */}
          <g transform="translate(82, 66)">
            <circle cx="5" cy="5" r="3.5" fill={step >= 4 ? "#34d399" : step >= 3 ? "#38bdf8" : "#4ade80"}>
              {step >= 4 && <animate attributeName="opacity" dur="0.8s" repeatCount="indefinite" values="1;0.4;1" />}
            </circle>
            <text x="14" y="9" className="p-detail" fill={step >= 4 ? "#34d399" : step >= 3 ? "#67e8f9" : "#4ade80"}>
              {step >= 4 ? "GPU ACTIVE DECODING · EMITTING TOKENS" : step >= 3 ? "KV CACHE RECEIVED · READY" : "GPU ONLINE · IDLE"}
            </text>
          </g>

          {/* KV Cache Sub-module */}
          <g transform="translate(20, 114)">
            <rect width="488" height="92" rx="12" fill="url(#kvSubGrad)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.4" />
            
            {/* Database Icon */}
            <g transform="translate(18, 24)" stroke="#38bdf8" strokeWidth="1.5" fill="none">
              <ellipse cx="12" cy="6" rx="7" ry="3" />
              <path d="M5 6v5.5c0 1.65 3.13 3 7 3s7-1.35 7-3V6" />
              <path d="M5 11.5v5.5c0 1.65 3.13 3 7 3s7-1.35 7-3V11.5" />
            </g>
            <text x="56" y="44" className="p-title" style={{ fontSize: 16 }}>KV CACHE</text>
            <text x="56" y="62" className="p-sub" fill="#38bdf8" style={{ fontWeight: 700, fontSize: 11 }}>BURSTY DECODE</text>

            {/* Fast Micro LED Matrix (16x4) */}
            <g transform="translate(228, 20)">
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((col) => (
                  <circle
                    key={`d-led-${row}-${col}`}
                    cx={col * 15}
                    cy={row * 13}
                    r="2.4"
                    className={`m-led ${step >= 4 ? "active" : ""}`}
                  />
                ))
              )}
            </g>

            {/* Bottom load meter */}
            <rect x="0" y="86" width="488" height="6" rx="3" fill="rgba(15, 35, 75, 0.6)" />
            <rect x="0" y="86" width={step >= 4 ? "460" : step >= 3 ? "260" : "80"} height="6" rx="3" fill="url(#loadMeterGradDecode)" />
          </g>
        </g>

        {/* Wire: Decode Output to Tokens Out */}
        <path
          d="M1036 540 V596"
          className={`conn-wire ${step >= 4 ? "active" : ""}`}
          strokeWidth="2.5"
        />
        <circle cx="1036" cy="560" r="3.5" fill="#38bdf8" />
        <circle cx="1036" cy="578" r="4" fill="#38bdf8" />
        
        {/* Output Chevrons pointing down */}
        <polyline points="1024 584, 1036 596, 1048 584" className="chev c1" />
        <polyline points="1024 594, 1036 606, 1048 594" className="chev c2" />

        {/* ================= OUTPUT PANEL: TOKENS OUT ================= */}
        <g
          className={step >= 4 ? "panel-active" : ""}
          transform="translate(856, 610)"
        >
          <rect width="360" height="60" rx="12" className="panel-bg" />
          
          {/* 3D Cube / Token Icon */}
          <g transform="translate(18, 16)" stroke="#38bdf8" strokeWidth="1.8" fill="none">
            <path d="M12 2.6l8 4.6v9.6L12 21.4l-8-4.6V7.2L12 2.6z" />
            <path d="M12 12.1v9.3M12 12.1l8-4.6M12 12.1L4 7.5" />
          </g>
          <text x="64" y="36" className="p-title" style={{ fontSize: 16 }}>TOKENS OUT</text>
          
          {/* Streaming Status Pill */}
          <rect x="236" y="16" width="104" height="28" rx="6" fill={step >= 4 ? "rgba(52, 211, 153, 0.2)" : "url(#badgePillGrad)"} stroke={step >= 4 ? "rgba(52, 211, 153, 0.6)" : "rgba(56, 189, 248, 0.4)"} strokeWidth="1" />
          
          <circle cx="250" cy="30" r="3.5" fill={step >= 4 ? "#34d399" : "#64748b"}>
            {step >= 4 && <animate attributeName="opacity" dur="0.8s" repeatCount="indefinite" values="1;0.3;1" />}
          </circle>
          <text x="290" y="34" textAnchor="middle" className="p-sub" fill={step >= 4 ? "#34d399" : "#94a3b8"} style={{ fontWeight: 800, fontSize: 11 }}>
            {step >= 4 ? "STREAMING" : "STANDBY"}
          </text>
        </g>

        {/* ================= BOTTOM: EXPLANATION STRIP ================= */}
        <g transform="translate(60, 688)">
          <rect width="1240" height="92" rx="14" className="panel-bg" fill="rgba(11, 24, 52, 0.75)" />

          {/* Hexagon Step Badge */}
          <g transform="translate(28, 16)">
            <polygon
              points="30,0 60,15 60,45 30,60 0,45 0,15"
              className="hex-bg"
            />
            <text x="30" y="38" textAnchor="middle" className="hex-txt">
              0{step}
            </text>
          </g>

          <text x="110" y="42" className="ex-bold">
            {currentInfo.bold}
          </text>
          <text x="195" y="42" className="ex-text">
            {currentInfo.desc}
          </text>
          <text x="110" y="68" className="p-sub" fill="#93c5fd" style={{ fontSize: 11.5, letterSpacing: 1.5, fontWeight: 700 }}>
            NVIDIA DYNAMO ARCHITECTURE · SGLANG DISAGGREGATED INFERENCE RUNTIME
          </text>
        </g>

        {/* ================= BOTTOM: FORWARD PASSES BANNER ================= */}
        <g transform="translate(60, 796)">
          <rect width="1240" height="52" rx="10" className="panel-bg" fill="rgba(8, 18, 42, 0.65)" />
          {/* Triple Chevrons */}
          <g transform="translate(28, 18)">
            <polyline points="0,4 8,9 0,14" className="chev c1" />
            <polyline points="12,4 20,9 12,14" className="chev c2" />
            <polyline points="24,4 32,9 24,14" className="chev c3" />
          </g>
          <text x="80" y="32" className="p-title" style={{ fontSize: 13, letterSpacing: 2.5, fill: "#e2e8f0" }}>
            FORWARD PASSES KEEP SERVING OTHER REQUESTS · 100% NON-BLOCKING PIPELINE
          </text>
          <text x="1210" y="32" textAnchor="end" className="p-sub" fill="#38bdf8" style={{ fontWeight: 800 }}>
            USDC REFERENCE SPEC
          </text>
        </g>

        {/* Animated Particles when client is loaded */}
        {isClient && (
          <g>
            {/* Request In -> Router */}
            {step >= 1 && (
              <g className="p">
                <circle r="3" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={reqPath} />
                  <animate attributeName="opacity" dur="1.2s" repeatCount="indefinite" values="0;1;1;0" />
                </circle>
              </g>
            )}

            {/* Router -> Prefill */}
            {step >= 1 && (
              <g className="p">
                <circle r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)">
                  <animateMotion dur="1.5s" repeatCount="indefinite" path={dropPath} />
                  <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0;1;1;0" />
                </circle>
              </g>
            )}

            {/* NIXL Particles */}
            {step >= 3 && (
              <>
                <g className="p">
                  <circle r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 7px #38bdf8)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" path={nixlFwd} />
                    <animate attributeName="opacity" dur="1.6s" repeatCount="indefinite" values="0;1;1;0" />
                  </circle>
                </g>
                <g className="p">
                  <circle r="3" fill="#93c5fd" filter="drop-shadow(0 0 5px #93c5fd)">
                    <animateMotion dur="2s" repeatCount="indefinite" path={nixlBwd} />
                    <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0;1;1;0" />
                  </circle>
                </g>
              </>
            )}

            {/* Decode Output Particles */}
            {step >= 4 && (
              <g className="p">
                <circle r="3.5" fill="#34d399" filter="drop-shadow(0 0 8px #34d399)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={outPath} />
                  <animate attributeName="opacity" dur="1.2s" repeatCount="indefinite" values="0;1;1;0" />
                </circle>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
