"use client";

import React, { useEffect, useState, useId } from "react";

interface DisaggregatedServingStageProps {
  currentStep?: number;
}

const STEP_EXPLANATIONS: Record<number, { title: string; desc: string }> = {
  1: {
    title: "ROUTE",
    desc: "The router sends the request to a prefill worker chosen for high arithmetic compute density.",
  },
  2: {
    title: "PREFILL",
    desc: "The prefill engine reads the prompt and builds the KV cache in GPU memory under near-sustained TDP.",
  },
  3: {
    title: "TRANSFER (NIXL)",
    desc: "NIXL moves the KV cache directly GPU memory to GPU memory across the pod fabric without blocking forward passes.",
  },
  4: {
    title: "DECODE",
    desc: "Decode begins immediately and emits tokens while the transfer completes in parallel (SGLang backend).",
  },
};

export default function DisaggregatedServingStage({ currentStep = 4 }: DisaggregatedServingStageProps) {
  const [isClient, setIsClient] = useState(false);
  const idPrefix = useId();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const step = currentStep || 4;
  const currentInfo = STEP_EXPLANATIONS[step] || STEP_EXPLANATIONS[4];

  // Particle path definitions
  const dropPath = "M248 252 L248 318";
  const nixlFwd = "M588 448 L772 448";
  const nixlBwd = "M772 448 L588 448";
  const outPath = "M1026 590 L1026 690";

  return (
    <div className="disagg-model-root">
      <style jsx>{`
        .disagg-model-root {
          position: relative;
          width: 100%;
          border-radius: 18px;
          overflow: hidden;
          background: radial-gradient(130% 100% at 50% 0%, #0a1530 0%, #050b18 46%, #03060e 100%);
          border: 1px solid rgba(70, 140, 255, 0.3);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(140, 185, 255, 0.1);
          color: #dbe9ff;
          font-family: var(--font-mono), "Inter", monospace;
        }

        /* Ambient glows & Corner Accents */
        .ambient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border: 2px solid #63b8ff;
          opacity: 0.85;
          z-index: 6;
          filter: drop-shadow(0 0 6px rgba(99, 184, 255, 0.55));
        }
        .corner.tl {
          left: 10px;
          top: 10px;
          border-right: 0;
          border-bottom: 0;
          border-radius: 6px 0 0 0;
        }
        .corner.tr {
          right: 10px;
          top: 10px;
          border-left: 0;
          border-bottom: 0;
          border-radius: 0 6px 0 0;
        }
        .corner.bl {
          left: 10px;
          bottom: 10px;
          border-right: 0;
          border-top: 0;
          border-radius: 0 0 0 6px;
        }
        .corner.br {
          right: 10px;
          bottom: 10px;
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

        /* CSS for SVG elements */
        :global(.disagg-model-root .h-title) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.18em;
          fill: #8fd0ff;
        }
        :global(.disagg-model-root .h-meta) {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          fill: #7091ca;
        }
        :global(.disagg-model-root .h-r-title) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.18em;
          fill: #63b8ff;
        }
        :global(.disagg-model-root .h-r-meta) {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          fill: #55719f;
        }

        /* Panels */
        :global(.disagg-model-root .panel-bg) {
          fill: rgba(16, 34, 66, 0.55);
          stroke: rgba(70, 140, 255, 0.35);
          stroke-width: 1.2;
          transition: all 0.35s ease;
        }
        :global(.disagg-model-root .panel-active .panel-bg) {
          fill: rgba(24, 52, 105, 0.7);
          stroke: #79abff;
          filter: drop-shadow(0 0 16px rgba(79, 139, 255, 0.35));
        }

        :global(.disagg-model-root .p-title) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.05em;
          fill: #e6effd;
        }
        :global(.disagg-model-root .p-sub) {
          font-family: var(--font-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.2em;
          fill: #7091ca;
        }
        :global(.disagg-model-root .p-detail) {
          font-family: var(--font-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 0.18em;
          fill: #63b8ff;
        }

        /* Connectors */
        :global(.disagg-model-root .conn-wire) {
          stroke: rgba(120, 190, 255, 0.55);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 3 6;
          stroke-linecap: round;
        }
        :global(.disagg-model-root .conn-wire.active) {
          stroke: #8fd0ff;
          animation: dashMove 1.4s linear infinite;
        }
        @keyframes dashMove {
          to {
            stroke-dashoffset: -18;
          }
        }

        /* Matrix Grid LEDs */
        :global(.disagg-model-root .m-led) {
          fill: rgba(90, 150, 235, 0.25);
        }
        :global(.disagg-model-root .m-led.active) {
          fill: #8fd0ff;
        }
        :global(.disagg-model-root .m-led.hot) {
          fill: #63b8ff;
        }

        /* Explanation Box */
        :global(.disagg-model-root .hex-bg) {
          fill: #0b1e40;
          stroke: #63b8ff;
          stroke-width: 1.5;
        }
        :global(.disagg-model-root .hex-txt) {
          font-family: var(--font-mono), sans-serif;
          font-weight: 800;
          font-size: 22px;
          fill: #8fd0ff;
        }
        :global(.disagg-model-root .ex-bold) {
          font-weight: 700;
          fill: #8fd0ff;
          font-size: 14px;
        }
        :global(.disagg-model-root .ex-text) {
          font-weight: 400;
          fill: #dbe9ff;
          font-size: 13.5px;
        }

        /* Sweep animation */
        :global(.disagg-model-root .sweep-bar) {
          fill: url(#sweepGrad);
          animation: sweepAnim 4.5s linear infinite;
        }
        @keyframes sweepAnim {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        :global(.disagg-model-root .chev) {
          fill: none;
          stroke: #8fd0ff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
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
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(90,170,255,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <pattern id="dotGridCanvas" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="18" r="1" fill="#468cff" fillOpacity="0.12" />
          </pattern>
        </defs>

        {/* Blueprint Grid Background */}
        <rect width="1360" height="880" fill="url(#dotGridCanvas)" />

        {/* ================= HEADER HUD ================= */}
        <g transform="translate(60, 44)">
          <text x="0" y="20" className="h-title">
            STEP 0{step} · {currentInfo.title}
          </text>
          <circle cx="0" cy="38" r="3" fill="#8fd0ff" />
          <text x="12" y="41" className="h-meta">
            LINK ACTIVE · NODE 04 · RT 0.4MS
          </text>

          <text x="1240" y="20" textAnchor="end" className="h-r-title">
            DISAGGREGATED SERVING
          </text>
          <text x="1240" y="41" textAnchor="end" className="h-r-meta">
            SGLANG · DYNAMO ARCHITECTURE
          </text>
        </g>

        {/* ================= TOP PANEL: TOKENS OUT ================= */}
        <g
          className={step >= 4 ? "panel-active" : ""}
          transform="translate(60, 100)"
        >
          <rect width="320" height="64" rx="12" className="panel-bg" />
          {/* Icon */}
          <g transform="translate(20, 16)" stroke="#8fd0ff" strokeWidth="1.5" fill="none">
            <path d="M12 2.6l8 4.6v9.6L12 21.4l-8-4.6V7.2L12 2.6z" />
            <path d="M12 12.1v9.3M12 12.1l8-4.6M12 12.1L4 7.5" />
          </g>
          <text x="64" y="38" className="p-title">TOKENS OUT</text>
          {step >= 4 && (
            <circle cx="280" cy="32" r="4" fill="#63b8ff" />
          )}
        </g>

        {/* ================= TOP PANEL: ROUTER ================= */}
        <g
          className={step >= 1 ? "panel-active" : ""}
          transform="translate(100, 190)"
        >
          <rect width="280" height="52" rx="10" className="panel-bg" />
          <g transform="translate(18, 14)" stroke="#8fd0ff" strokeWidth="1.4" fill="none">
            <rect x="3" y="8" width="18" height="8" rx="1.5" />
            <circle cx="7" cy="12" r="1" fill="#8fd0ff" />
            <circle cx="11" cy="12" r="1" fill="#8fd0ff" />
            <path d="M8 8V4M12 8V3M16 8V5" />
          </g>
          <text x="56" y="32" className="p-title" style={{ fontSize: 14 }}>ROUTER</text>
          <text x="240" y="32" className="p-sub" fill="#8fd0ff">DISPATCH</text>
        </g>

        {/* Wire: Tokens Out to Router */}
        <path d="M168 164 V190" className="conn-wire" />

        {/* Wire: Router to Prefill Worker */}
        <path
          d="M248 242 V318"
          className={`conn-wire ${step >= 1 ? "active" : ""}`}
        />
        <circle cx="248" cy="280" r="3.5" fill="#8fd0ff" />

        {/* ================= WORKER 01: PREFILL WORKER ================= */}
        <g
          className={step >= 1 ? "panel-active" : ""}
          transform="translate(60, 318)"
        >
          <rect width="520" height="230" rx="14" className="panel-bg" />

          {/* Icon Badge */}
          <g transform="translate(24, 22)">
            <rect width="42" height="42" rx="10" fill="rgba(30, 66, 128, 0.6)" stroke="#63b8ff" strokeWidth="1.2" />
            <g transform="translate(9, 9)" stroke="#8fd0ff" strokeWidth="1.4" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
              <path d="M8 4V1M12 4V1M16 4V1M8 20v3M12 20v3M16 20v3M4 8H1M4 12H1M4 16H1M20 8h3M20 12h3M20 16h3" />
            </g>
          </g>

          <text x="80" y="42" className="p-title">PREFILL WORKER</text>
          <text x="80" y="58" className="p-sub">GPU MEMORY · COMPUTE BOUND</text>
          <text x="80" y="74" className="p-detail">
            ● {step >= 2 ? "COMPUTING KV CACHE · TDP PEAK" : "GPU ONLINE · READY"}
          </text>

          {/* KV Cache Sub-module */}
          <g transform="translate(20, 116)">
            <rect width="480" height="86" rx="10" fill="rgba(16, 40, 80, 0.75)" stroke="#63b8ff" strokeWidth="1.2" />
            <g transform="translate(18, 22)" stroke="#8fd0ff" strokeWidth="1.3" fill="none">
              <ellipse cx="12" cy="6" rx="6.5" ry="2.8" />
              <path d="M5.5 6v5.2c0 1.55 2.96 2.8 6.5 2.8s6.5-1.25 6.5-2.8V6" />
              <path d="M5.5 11.2c0 1.55 2.96 2.8 6.5 2.8s6.5-1.25 6.5-2.8" />
            </g>
            <text x="54" y="48" className="p-title" style={{ fontSize: 15 }}>KV CACHE</text>
            <text x="54" y="64" className="p-sub">SUSTAINED PREFILL</text>

            {/* Micro LED Matrix (16x4) */}
            <g transform="translate(220, 20)">
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((col) => (
                  <circle
                    key={`p-led-${row}-${col}`}
                    cx={col * 14}
                    cy={row * 12}
                    r="2"
                    className={`m-led ${step >= 2 && (col + row) % 3 === 0 ? "hot" : ""}`}
                  />
                ))
              )}
            </g>

            {/* Bottom load meter */}
            <rect x="0" y="82" width="480" height="4" rx="2" fill="rgba(40,80,160,0.3)" />
            <rect x="0" y="82" width={step >= 2 ? "380" : "120"} height="4" rx="2" fill="#63b8ff" />
          </g>
        </g>

        {/* ================= CENTER: NIXL KV TRANSFER ================= */}
        <g transform="translate(588, 410)">
          {/* Main NIXL wire */}
          <path
            d="M0 38 H184"
            className={`conn-wire ${step >= 3 ? "active" : ""}`}
            strokeWidth="2.5"
          />
          {/* Nodes */}
          <circle cx="0" cy="38" r="4" fill="#63b8ff" />
          <circle cx="46" cy="38" r="3" fill="#8fd0ff" />
          <circle cx="92" cy="38" r="4" fill="#63b8ff" />
          <circle cx="138" cy="38" r="3" fill="#8fd0ff" />
          <circle cx="184" cy="38" r="4" fill="#63b8ff" />

          {/* Labels */}
          <text x="92" y="18" textAnchor="middle" className="p-title" fill="#8fd0ff" style={{ fontSize: 15, letterSpacing: 2 }}>
            NIXL
          </text>
          <text x="92" y="64" textAnchor="middle" className="p-sub" fill="#7091ca" style={{ fontSize: 10, letterSpacing: 1.5 }}>
            NON-BLOCKING
          </text>
        </g>

        {/* ================= WORKER 02: DECODE WORKER ================= */}
        <g
          className={step >= 3 ? "panel-active" : ""}
          transform="translate(772, 318)"
        >
          <rect width="528" height="230" rx="14" className="panel-bg" />

          {/* Icon Badge */}
          <g transform="translate(24, 22)">
            <rect width="42" height="42" rx="10" fill="rgba(30, 66, 128, 0.6)" stroke="#63b8ff" strokeWidth="1.2" />
            <g transform="translate(9, 9)" stroke="#8fd0ff" strokeWidth="1.4" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
              <path d="M8 4V1M12 4V1M16 4V1M8 20v3M12 20v3M16 20v3M4 8H1M4 12H1M4 16H1M20 8h3M20 12h3M20 16h3" />
            </g>
          </g>

          <text x="80" y="42" className="p-title">DECODE WORKER</text>
          <text x="80" y="58" className="p-sub">GPU MEMORY · BANDWIDTH BOUND</text>
          <text x="80" y="74" className="p-detail">
            ● {step >= 4 ? "GPU · ACTIVE DECODING" : step >= 3 ? "KV CACHE RECEIVED" : "GPU ONLINE"}
          </text>

          {/* KV Cache Sub-module */}
          <g transform="translate(20, 116)">
            <rect width="488" height="86" rx="10" fill="rgba(16, 40, 80, 0.75)" stroke="#63b8ff" strokeWidth="1.2" />
            <g transform="translate(18, 22)" stroke="#8fd0ff" strokeWidth="1.3" fill="none">
              <ellipse cx="12" cy="6" rx="6.5" ry="2.8" />
              <path d="M5.5 6v5.2c0 1.55 2.96 2.8 6.5 2.8s6.5-1.25 6.5-2.8V6" />
              <path d="M5.5 11.2c0 1.55 2.96 2.8 6.5 2.8s6.5-1.25 6.5-2.8" />
            </g>
            <text x="54" y="48" className="p-title" style={{ fontSize: 15 }}>KV CACHE</text>
            <text x="54" y="64" className="p-sub">BURSTY DECODE</text>

            {/* Fast Micro LED Matrix (16x4) */}
            <g transform="translate(220, 20)">
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((col) => (
                  <circle
                    key={`d-led-${row}-${col}`}
                    cx={col * 14}
                    cy={row * 12}
                    r="2"
                    className={`m-led ${step >= 4 ? "active" : ""}`}
                  />
                ))
              )}
            </g>

            {/* Bottom load meter */}
            <rect x="0" y="82" width="488" height="4" rx="2" fill="rgba(40,80,160,0.3)" />
            <rect x="0" y="82" width={step >= 4 ? "440" : step >= 3 ? "240" : "60"} height="4" rx="2" fill="#8fd0ff" />
          </g>
        </g>

        {/* Wire: Decode Output */}
        <path
          d="M1036 548 V660"
          className={`conn-wire ${step >= 4 ? "active" : ""}`}
          strokeWidth="2"
        />
        <circle cx="1036" cy="600" r="3" fill="#8fd0ff" />
        <circle cx="1036" cy="630" r="3.5" fill="#8fd0ff" />
        {/* Output Chevrons */}
        <polyline points="1026 648, 1036 658, 1046 648" className="chev c1" />
        <polyline points="1026 658, 1036 668, 1046 658" className="chev c2" />

        {/* ================= BOTTOM: EXPLANATION STRIP ================= */}
        <g transform="translate(60, 680)">
          <rect width="1240" height="96" rx="14" className="panel-bg" fill="rgba(10, 24, 52, 0.65)" />

          {/* Hexagon Step Badge */}
          <g transform="translate(30, 18)">
            <polygon
              points="30,0 60,15 60,45 30,60 0,45 0,15"
              className="hex-bg"
            />
            <text x="30" y="38" textAnchor="middle" className="hex-txt">
              0{step}
            </text>
          </g>

          <text x="110" y="44" className="ex-bold">
            Step 0{step}.
          </text>
          <text x="180" y="44" className="ex-text">
            {currentInfo.desc}
          </text>
          <text x="110" y="68" className="p-sub" fill="#7091ca">
            NVIDIA DYNAMO ARCHITECTURE · SGLANG DISAGGREGATED INFERENCE RUNTIME
          </text>
        </g>

        {/* ================= BOTTOM: FORWARD PASSES BANNER ================= */}
        <g transform="translate(60, 792)">
          <rect width="1240" height="54" rx="10" className="panel-bg" fill="rgba(8, 18, 40, 0.55)" />
          {/* Triple Chevrons */}
          <g transform="translate(30, 20)">
            <polyline points="0,4 8,9 0,14" className="chev c1" />
            <polyline points="12,4 20,9 12,14" className="chev c2" />
            <polyline points="24,4 32,9 24,14" className="chev c3" />
          </g>
          <text x="80" y="33" className="p-title" style={{ fontSize: 12, letterSpacing: 3 }}>
            FORWARD PASSES KEEP SERVING OTHER REQUESTS · 100% NON-BLOCKING PIPELINE
          </text>
          <text x="1210" y="33" textAnchor="end" className="p-sub" fill="#8fd0ff">
            USDC REFERENCE SPEC
          </text>
        </g>

        {/* Animated Particles when client is loaded */}
        {isClient && (
          <g>
            {/* Router -> Prefill */}
            {step >= 1 && (
              <g className="p">
                <circle r="3" fill="#8fd0ff">
                  <animateMotion dur="1.6s" repeatCount="indefinite" path={dropPath} />
                  <animate attributeName="opacity" dur="1.6s" repeatCount="indefinite" values="0;1;1;0" />
                </circle>
              </g>
            )}

            {/* NIXL Particles */}
            {step >= 3 && (
              <>
                <g className="p">
                  <circle r="3" fill="#63b8ff">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path={nixlFwd} />
                    <animate attributeName="opacity" dur="1.8s" repeatCount="indefinite" values="0;1;1;0" />
                  </circle>
                </g>
                <g className="p">
                  <circle r="2.5" fill="#8fd0ff">
                    <animateMotion dur="2.1s" repeatCount="indefinite" path={nixlBwd} />
                    <animate attributeName="opacity" dur="2.1s" repeatCount="indefinite" values="0;1;1;0" />
                  </circle>
                </g>
              </>
            )}

            {/* Decode Output Particles */}
            {step >= 4 && (
              <g className="p">
                <circle r="3" fill="#63b8ff">
                  <animateMotion dur="1.5s" repeatCount="indefinite" path={outPath} />
                  <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0;1;1;0" />
                </circle>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
