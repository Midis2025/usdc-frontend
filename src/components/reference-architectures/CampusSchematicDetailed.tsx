"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_STAGES = 7;

const CAPTIONS: Record<number, string> = {
  1: "Pod 01 is built and energized first — revenue before the campus is finished.",
  2: "Utility, substation, cooling and control plane are sized for the full campus.",
  3: "Pod 02 drops onto the same power bus and cooling header. Same design, repeated.",
  4: "Pod 03 follows the same design. No redesign, no second permitting cycle.",
  5: "One network skid serves up to five IT pods and ties them together.",
  6: "The pods resolve into a single network fabric — one campus, one control plane.",
  7: "Modular campus — expandable to Pods 04–06 and beyond without redesign.",
};

interface CampusSchematicDetailedProps {
  isActive?: boolean;
}

export default function CampusSchematicDetailed({ isActive = true }: CampusSchematicDetailedProps) {
  const [stage, setStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // IntersectionObserver to auto-play when in view
  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(TOTAL_STAGES);
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isActive) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isActive]);

  // Timer loop for auto-play (loops continuously 1 -> 7 -> 1)
  useEffect(() => {
    if (!isPlaying || !isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setStage((prev) => (prev < TOTAL_STAGES ? prev + 1 : 1));
    }, 2800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, isActive, stage]);

  return (
    <div
      className="cs-schematic-wrapper"
      ref={containerRef}
      role="region"
      aria-label="Modular data center campus schematic animation"
    >
      <style jsx>{`
        .cs-schematic-wrapper {
          --cs-bg: #050b14;
          --cs-bg2: #0a1524;
          --cs-ink: #e9f1fb;
          --cs-ink-dim: #a7bcd8;
          --cs-ink-mute: #5f77a0;
          --cs-panel-edge: rgba(96, 150, 210, 0.3);
          --cs-grid: rgba(90, 130, 180, 0.075);
          --cs-grid-strong: rgba(90, 130, 180, 0.14);

          --cs-power: #3f8efc;
          --cs-power-bright: #8bc0ff;
          --cs-power-glow: rgba(63, 142, 252, 0.55);

          --cs-cool: #21d4ee;
          --cs-cool-bright: #96f0f9;
          --cs-cool-glow: rgba(33, 212, 238, 0.5);

          --cs-net: #a78bfa;
          --cs-net-bright: #cbb9ff;
          --cs-net-glow: rgba(167, 139, 250, 0.55);

          --cs-mono: ui-monospace, "SFMono-Regular", "JetBrains Mono", "Roboto Mono", Menlo, Consolas, monospace;
          --cs-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

          width: 100%;
          position: relative;
          background: radial-gradient(1200px 700px at 50% -10%, #0d1a2e 0%, transparent 60%), #050b14;
          border: 1px solid var(--cs-panel-edge);
          border-radius: 20px;
          padding: 16px 16px 20px;
          box-shadow: 0 16px 48px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          outline: none;
        }

        .cs-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          width: 100%;
        }

        .cs-frame svg {
          display: block;
          width: 100%;
          height: auto;
          max-width: 100%;
          min-width: 0;
        }

        /* SVG Element Styles */
        :global(.cs-schematic-wrapper .rv) {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        :global(.cs-schematic-wrapper .rv.is-on) {
          opacity: 1;
        }
        :global(.cs-schematic-wrapper .lift) {
          transform: translateY(12px);
        }
        :global(.cs-schematic-wrapper .lift.is-on) {
          transform: translateY(0);
        }

        :global(.cs-schematic-wrapper .t-title) {
          font-family: var(--cs-mono);
          font-size: 22px;
          letter-spacing: 5px;
          fill: var(--cs-ink-dim);
          font-weight: 500;
        }
        :global(.cs-schematic-wrapper .t-stage) {
          font-family: var(--cs-mono);
          font-size: 22px;
          letter-spacing: 3px;
          fill: var(--cs-ink);
          font-weight: 600;
        }
        :global(.cs-schematic-wrapper .t-cardtitle) {
          font-family: var(--cs-sans);
          font-size: 25px;
          letter-spacing: 1.5px;
          fill: var(--cs-ink);
          font-weight: 700;
        }
        :global(.cs-schematic-wrapper .t-cardsub) {
          font-family: var(--cs-mono);
          font-size: 14px;
          letter-spacing: 1.4px;
          fill: var(--cs-ink-mute);
        }
        :global(.cs-schematic-wrapper .t-podtitle) {
          font-family: var(--cs-sans);
          font-size: 29px;
          letter-spacing: 1px;
          fill: var(--cs-ink);
          font-weight: 700;
        }
        :global(.cs-schematic-wrapper .t-itrow) {
          font-family: var(--cs-mono);
          font-size: 15px;
          letter-spacing: 2px;
          fill: var(--cs-ink-mute);
        }
        :global(.cs-schematic-wrapper .t-buslabel) {
          font-family: var(--cs-mono);
          font-size: 15px;
          letter-spacing: 2.5px;
          font-weight: 600;
        }
        :global(.cs-schematic-wrapper .t-perim) {
          font-family: var(--cs-mono);
          font-size: 12px;
          letter-spacing: 3px;
          fill: var(--cs-ink-mute);
        }
        :global(.cs-schematic-wrapper .t-skidtitle) {
          font-family: var(--cs-sans);
          font-size: 21px;
          letter-spacing: 1.5px;
          fill: var(--cs-ink);
          font-weight: 700;
        }
        :global(.cs-schematic-wrapper .t-skidsub) {
          font-family: var(--cs-mono);
          font-size: 13px;
          letter-spacing: 1.4px;
          fill: var(--cs-ink-mute);
        }
        :global(.cs-schematic-wrapper .t-ghost) {
          font-family: var(--cs-sans);
          font-size: 19px;
          letter-spacing: 2px;
          fill: rgba(150, 175, 210, 0.42);
          font-weight: 600;
        }
        :global(.cs-schematic-wrapper .t-cap) {
          font-family: var(--cs-mono);
          font-size: 20px;
          letter-spacing: 1.4px;
          fill: var(--cs-ink-dim);
        }

        :global(.cs-schematic-wrapper .card-bg) {
          fill: rgba(16, 30, 52, 0.55);
          stroke: var(--cs-panel-edge);
          stroke-width: 1.3;
        }
        :global(.cs-schematic-wrapper .card-inner) {
          fill: none;
          stroke: rgba(120, 170, 225, 0.12);
          stroke-width: 1;
        }
        :global(.cs-schematic-wrapper .icon-box) {
          fill: rgba(10, 22, 40, 0.6);
          stroke-width: 1.3;
        }
        :global(.cs-schematic-wrapper .icon-box.pw) {
          stroke: rgba(63, 142, 252, 0.55);
        }
        :global(.cs-schematic-wrapper .icon-box.cl) {
          stroke: rgba(33, 212, 238, 0.5);
        }
        :global(.cs-schematic-wrapper .icon-box.nt) {
          stroke: rgba(167, 139, 250, 0.5);
        }

        :global(.cs-schematic-wrapper .card.pw.is-on) {
          filter: drop-shadow(0 6px 22px rgba(63, 142, 252, 0.12));
        }
        :global(.cs-schematic-wrapper .card.cl.is-on) {
          filter: drop-shadow(0 6px 22px rgba(33, 212, 238, 0.1));
        }

        :global(.cs-schematic-wrapper .pod-bg) {
          fill: rgba(14, 28, 50, 0.62);
          stroke: var(--cs-panel-edge);
          stroke-width: 1.3;
          transition: stroke 0.6s ease, filter 0.6s ease;
        }
        :global(.cs-schematic-wrapper .pod.is-on .pod-bg) {
          stroke: rgba(90, 160, 250, 0.55);
          filter: drop-shadow(0 0 26px rgba(63, 142, 252, 0.16));
        }
        :global(.cs-schematic-wrapper .pod-inner) {
          fill: none;
          stroke: rgba(120, 170, 225, 0.13);
          stroke-width: 1;
        }

        :global(.cs-schematic-wrapper .g-pw) {
          stroke: var(--cs-power);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(.cs-schematic-wrapper .g-pw-fill) {
          fill: var(--cs-power);
        }
        :global(.cs-schematic-wrapper .g-cl) {
          stroke: var(--cs-cool);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(.cs-schematic-wrapper .g-nt) {
          stroke: var(--cs-net);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(.cs-schematic-wrapper .g-nt-fill) {
          fill: var(--cs-net);
        }

        /* Wires */
        :global(.cs-schematic-wrapper .wire) {
          transition: opacity 0.6s ease;
        }
        :global(.cs-schematic-wrapper .wire.pw .base) {
          stroke: var(--cs-power);
          stroke-width: 3;
          stroke-opacity: 0.5;
          fill: none;
          filter: drop-shadow(0 0 4px var(--cs-power-glow));
        }
        :global(.cs-schematic-wrapper .wire.cl .base) {
          stroke: var(--cs-cool);
          stroke-width: 2.6;
          stroke-opacity: 0.5;
          fill: none;
          stroke-dasharray: 7 7;
          filter: drop-shadow(0 0 4px var(--cs-cool-glow));
        }
        :global(.cs-schematic-wrapper .wire.nt .base) {
          stroke: var(--cs-net);
          stroke-width: 2.6;
          stroke-opacity: 0.55;
          fill: none;
          stroke-dasharray: 6 8;
          filter: drop-shadow(0 0 4px var(--cs-net-glow));
        }

        :global(.cs-schematic-wrapper .flow) {
          fill: none;
          stroke-linecap: round;
        }
        :global(.cs-schematic-wrapper .wire.pw .flow) {
          stroke: var(--cs-power-bright);
          stroke-width: 3.2;
          stroke-dasharray: 5 95;
          filter: drop-shadow(0 0 6px var(--cs-power-glow));
        }
        :global(.cs-schematic-wrapper .wire.cl .flow) {
          stroke: var(--cs-cool-bright);
          stroke-width: 2.8;
          stroke-dasharray: 5 95;
          filter: drop-shadow(0 0 6px var(--cs-cool-glow));
        }
        :global(.cs-schematic-wrapper .wire.nt .flow) {
          stroke: var(--cs-net-bright);
          stroke-width: 2.8;
          stroke-dasharray: 5 95;
          filter: drop-shadow(0 0 6px var(--cs-net-glow));
        }
        :global(.cs-schematic-wrapper .wire.is-on .flow) {
          animation: csFlow 2.7s linear infinite;
        }
        :global(.cs-schematic-wrapper .wire.cl.is-on .flow) {
          animation-duration: 3.6s;
        }
        :global(.cs-schematic-wrapper .wire.nt.is-on .flow) {
          animation-duration: 2.3s;
        }
        :global(.cs-schematic-wrapper .flow.d2) {
          animation-delay: -1.35s !important;
        }
        @keyframes csFlow {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Nodes */
        :global(.cs-schematic-wrapper .node) {
          transform-box: fill-box;
          transform-origin: center;
        }
        :global(.cs-schematic-wrapper .node .halo) {
          opacity: 0.9;
        }
        :global(.cs-schematic-wrapper .node.pw .core) {
          fill: var(--cs-power-bright);
          filter: drop-shadow(0 0 6px var(--cs-power-glow));
        }
        :global(.cs-schematic-wrapper .node.pw .halo) {
          fill: none;
          stroke: var(--cs-power);
          stroke-width: 1.5;
          stroke-opacity: 0.5;
        }
        :global(.cs-schematic-wrapper .node.cl .core) {
          fill: var(--cs-cool-bright);
          filter: drop-shadow(0 0 6px var(--cs-cool-glow));
        }
        :global(.cs-schematic-wrapper .node.cl .halo) {
          fill: none;
          stroke: var(--cs-cool);
          stroke-width: 1.5;
          stroke-opacity: 0.5;
        }
        :global(.cs-schematic-wrapper .node.nt .core) {
          fill: var(--cs-net-bright);
          filter: drop-shadow(0 0 6px var(--cs-net-glow));
        }
        :global(.cs-schematic-wrapper .node.nt .halo) {
          fill: none;
          stroke: var(--cs-net);
          stroke-width: 1.5;
          stroke-opacity: 0.5;
        }
        :global(.cs-schematic-wrapper .node.is-on) {
          animation: csNodePulse 3.2s ease-in-out infinite;
        }
        @keyframes csNodePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.14);
          }
        }

        /* Rack slots + status */
        :global(.cs-schematic-wrapper .rack-box) {
          fill: rgba(9, 20, 38, 0.7);
          stroke: var(--cs-power);
          stroke-width: 1.4;
          stroke-opacity: 0.7;
        }
        :global(.cs-schematic-wrapper .slot) {
          fill: rgba(63, 142, 252, 0.1);
          stroke: rgba(63, 142, 252, 0.35);
          stroke-width: 1;
          rx: 3px;
        }
        :global(.cs-schematic-wrapper .slot.lit) {
          fill: rgba(63, 142, 252, 0.3);
          stroke: var(--cs-power);
        }
        :global(.cs-schematic-wrapper .status) {
          fill: var(--cs-power-bright);
        }
        :global(.cs-schematic-wrapper .pod.is-on .status) {
          animation: csBlink 1.9s ease-in-out infinite;
        }
        :global(.cs-schematic-wrapper .pod.is-on .status.s2) {
          animation-delay: 0.5s;
        }
        :global(.cs-schematic-wrapper .pod.is-on .status.s3) {
          animation-delay: 1s;
        }
        @keyframes csBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.22;
          }
        }

        :global(.cs-schematic-wrapper .data-line) {
          stroke: rgba(150, 180, 220, 0.22);
          stroke-width: 2;
          stroke-linecap: round;
        }
        :global(.cs-schematic-wrapper .data-line.hi) {
          stroke: rgba(120, 190, 255, 0.55);
        }

        /* Progress dashes */
        :global(.cs-schematic-wrapper .dash) {
          fill: rgba(120, 160, 210, 0.2);
          transition: fill 0.4s ease, filter 0.4s ease;
        }
        :global(.cs-schematic-wrapper .dash.lit) {
          fill: var(--cs-power);
          filter: drop-shadow(0 0 6px var(--cs-power-glow));
        }

        /* Perimeter + ghosts */
        :global(.cs-schematic-wrapper .perim) {
          fill: none;
          stroke: rgba(140, 170, 210, 0.28);
          stroke-width: 1.4;
          stroke-dasharray: 2 10;
          stroke-linecap: round;
          transition: stroke 0.6s ease, filter 0.6s ease;
        }
        :global(.cs-schematic-wrapper .perim.emph) {
          stroke: rgba(150, 185, 235, 0.55);
          filter: drop-shadow(0 0 14px rgba(63, 142, 252, 0.12));
        }
        :global(.cs-schematic-wrapper .ghost-bg) {
          fill: rgba(16, 28, 48, 0.3);
          stroke: rgba(130, 160, 200, 0.3);
          stroke-width: 1.3;
          stroke-dasharray: 7 6;
        }
        :global(.cs-schematic-wrapper .ghost-rack) {
          fill: none;
          stroke: rgba(130, 160, 200, 0.28);
          stroke-width: 1.3;
        }

        :global(.cs-schematic-wrapper .cap-box) {
          fill: rgba(12, 24, 44, 0.4);
          stroke: rgba(120, 160, 210, 0.22);
          stroke-width: 1.2;
          stroke-dasharray: 3 7;
        }

        :global(.cs-schematic-wrapper .central-glow) {
          fill: url(#coreGlowDetailed);
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.cs-schematic-wrapper .rv) {
            transition: none !important;
          }
          :global(.cs-schematic-wrapper .wire.is-on .flow) {
            animation: none !important;
          }
          :global(.cs-schematic-wrapper .flow) {
            display: none !important;
          }
          :global(.cs-schematic-wrapper .wire .base) {
            stroke-opacity: 0.8 !important;
          }
          :global(.cs-schematic-wrapper .node.is-on) {
            animation: none !important;
          }
          :global(.cs-schematic-wrapper .pod.is-on .status) {
            animation: none !important;
          }
        }
      `}</style>

      <div className="cs-frame" id="frame">
        <svg
          id="schematic"
          viewBox="0 0 1400 1240"
          role="img"
          aria-label="Modular data center campus schematic with a seven stage build sequence"
          data-stage={stage}
        >
          <defs>
            <pattern id="gridFineDetailed" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="var(--cs-grid)" strokeWidth="1" />
            </pattern>
            <pattern id="gridCoarseDetailed" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M160 0H0V160" fill="none" stroke="var(--cs-grid-strong)" strokeWidth="1" />
            </pattern>
            <radialGradient id="coreGlowDetailed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#12305a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#12305a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="frameFillDetailed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1626" />
              <stop offset="100%" stopColor="#060d18" />
            </linearGradient>
            <clipPath id="frameClipDetailed">
              <rect x="16" y="16" width="1368" height="1208" rx="18" />
            </clipPath>
          </defs>

          {/* Frame + Grid (always visible) */}
          <rect
            x="16"
            y="16"
            width="1368"
            height="1208"
            rx="18"
            fill="url(#frameFillDetailed)"
            stroke="var(--cs-panel-edge)"
            strokeWidth="1.4"
          />
          <g clipPath="url(#frameClipDetailed)">
            <rect x="16" y="16" width="1368" height="1208" fill="url(#gridFineDetailed)" />
            <rect x="16" y="16" width="1368" height="1208" fill="url(#gridCoarseDetailed)" />
            <ellipse className="central-glow" cx="700" cy="740" rx="620" ry="300" />
          </g>

          {/* Header (always visible) */}
          <text className="t-title" x="58" y="84">
            CAMPUS SCHEMATIC · NOT TO SCALE
          </text>
          <text className="t-stage" x="815" y="84" textAnchor="middle">
            STAGE <tspan id="stageNum">{stage}</tspan> / 7
          </text>
          <g id="progress">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                className={`dash ${i < stage ? "lit" : ""}`}
                x={1032 + i * 43}
                y="70"
                width="34"
                height="8"
                rx="4"
              />
            ))}
          </g>

          {/* ================= CAMPUS PERIMETER (from stage 2) ================= */}
          <g className={`rv ${stage >= 2 ? "is-on" : ""}`}>
            <rect
              id="perim"
              className={`perim ${stage >= 7 ? "emph" : ""}`}
              x="88"
              y="650"
              width="1224"
              height="452"
              rx="16"
            />
            <rect x="108" y="648" width="168" height="16" fill="#070f1c" />
            <text className="t-perim" x="118" y="660">
              CAMPUS PERIMETER
            </text>
          </g>

          {/* ================= CONDUCTORS ================= */}
          {/* power: utility -> substation */}
          <g className={`wire pw rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="base" d="M255 302 V372" />
            <path className="flow" pathLength="100" d="M255 302 V372" />
          </g>
          {/* power bus: substation -> bus -> spread */}
          <g className={`wire pw rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="base" d="M255 484 V560 H1090" />
            <path className="flow" pathLength="100" d="M255 484 V560 H1090" />
            <path className="flow d2" pathLength="100" d="M255 484 V560 H1090" />
          </g>
          {/* cooling: cooling -> headers */}
          <g className={`wire cl rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="base" d="M1147 302 V372" />
            <path className="flow" pathLength="100" d="M1147 302 V372" />
          </g>
          {/* cooling header: headers -> header bus -> spread left */}
          <g className={`wire cl rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="base" d="M1147 484 V605 H305" />
            <path className="flow" pathLength="100" d="M1147 484 V605 H305" />
            <path className="flow d2" pathLength="100" d="M1147 484 V605 H305" />
          </g>

          {/* pod power drops */}
          <g className={`wire pw rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="base" d="M372 560 V690" />
            <path className="flow" pathLength="100" d="M372 560 V690" />
          </g>
          <g className={`wire pw rv ${stage >= 3 ? "is-on" : ""}`}>
            <path className="base" d="M771 560 V690" />
            <path className="flow" pathLength="100" d="M771 560 V690" />
          </g>
          <g className={`wire pw rv ${stage >= 4 ? "is-on" : ""}`}>
            <path className="base" d="M1080 560 V690" />
            <path className="flow" pathLength="100" d="M1080 560 V690" />
          </g>

          {/* pod cooling drops */}
          <g className={`wire cl rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="base" d="M305 605 V690" />
            <path className="flow" pathLength="100" d="M305 605 V690" />
          </g>
          <g className={`wire cl rv ${stage >= 3 ? "is-on" : ""}`}>
            <path className="base" d="M704 605 V690" />
            <path className="flow" pathLength="100" d="M704 605 V690" />
          </g>
          <g className={`wire cl rv ${stage >= 4 ? "is-on" : ""}`}>
            <path className="base" d="M1120 605 V690" />
            <path className="flow" pathLength="100" d="M1120 605 V690" />
          </g>

          {/* network fabric (from stage 6) */}
          <g className={`wire nt rv ${stage >= 6 ? "is-on" : ""}`}>
            <path className="base" d="M190 941 H1210" />
            <path className="flow" pathLength="100" d="M190 941 H1210" />
            <path className="flow d2" pathLength="100" d="M190 941 H1210" />
          </g>
          <g className={`wire nt rv ${stage >= 6 ? "is-on" : ""}`}>
            <path className="base" d="M301 882 V912" />
            <path className="flow" pathLength="100" d="M301 882 V912" />
          </g>
          <g className={`wire nt rv ${stage >= 6 ? "is-on" : ""}`}>
            <path className="base" d="M700 882 V912" />
            <path className="flow" pathLength="100" d="M700 882 V912" />
          </g>
          <g className={`wire nt rv ${stage >= 6 ? "is-on" : ""}`}>
            <path className="base" d="M1099 882 V912" />
            <path className="flow" pathLength="100" d="M1099 882 V912" />
          </g>

          {/* bus labels */}
          <text className={`t-buslabel rv ${stage >= 2 ? "is-on" : ""}`} x="288" y="542" fill="var(--cs-power)">
            POWER BUS
          </text>
          <text className={`t-buslabel rv ${stage >= 2 ? "is-on" : ""}`} x="905" y="632" fill="var(--cs-cool)">
            COOLING HEADER
          </text>

          {/* ================= JUNCTION NODES ================= */}
          {/* power bus nodes */}
          <g className={`node pw rv ${stage >= 2 ? "is-on" : ""}`} style={{ transform: "translate(255px,560px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>
          <g className={`node pw rv ${stage >= 2 ? "is-on" : ""}`} style={{ transform: "translate(372px,560px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>
          <g className={`node pw rv ${stage >= 3 ? "is-on" : ""}`} style={{ transform: "translate(771px,560px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>
          <g className={`node pw rv ${stage >= 4 ? "is-on" : ""}`} style={{ transform: "translate(1080px,560px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>

          {/* cooling header nodes */}
          <g className={`node cl rv ${stage >= 2 ? "is-on" : ""}`} style={{ transform: "translate(1147px,605px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>
          <g className={`node cl rv ${stage >= 2 ? "is-on" : ""}`} style={{ transform: "translate(305px,605px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>
          <g className={`node cl rv ${stage >= 3 ? "is-on" : ""}`} style={{ transform: "translate(704px,605px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>
          <g className={`node cl rv ${stage >= 4 ? "is-on" : ""}`} style={{ transform: "translate(1120px,605px)" }}>
            <circle className="halo" r="8" />
            <circle className="core" r="4.5" />
          </g>

          {/* connector nodes */}
          <g className={`node pw rv ${stage >= 2 ? "is-on" : ""}`} style={{ transform: "translate(255px,337px)" }}>
            <circle className="halo" r="7" />
            <circle className="core" r="4" />
          </g>
          <g className={`node cl rv ${stage >= 2 ? "is-on" : ""}`} style={{ transform: "translate(1147px,337px)" }}>
            <circle className="halo" r="7" />
            <circle className="core" r="4" />
          </g>

          {/* ================= TOP CARDS ================= */}
          {/* UTILITY */}
          <g className={`card pw rv lift ${stage >= 2 ? "is-on" : ""}`}>
            <rect className="card-bg" x="95" y="190" width="315" height="112" rx="12" />
            <rect className="card-inner" x="99" y="194" width="307" height="104" rx="9" />
            <rect className="icon-box pw" x="117" y="223" width="46" height="46" rx="9" />
            <path className="g-pw-fill" d="M143 231 L131 251 H140 L137 265 L150 244 H141 Z" />
            <text className="t-cardtitle" x="179" y="240">
              UTILITY
            </text>
            <text className="t-cardsub" x="179" y="266">
              INTERCONNECT
            </text>
            <rect x="332" y="228" width="48" height="4" rx="2" fill="var(--cs-power)" />
            <rect x="332" y="240" width="48" height="4" rx="2" fill="var(--cs-power)" opacity="0.4" />
          </g>

          {/* CONTROL PLANE */}
          <g className={`card rv lift ${stage >= 2 ? "is-on" : ""}`}>
            <rect className="card-bg" x="543" y="190" width="315" height="112" rx="12" />
            <rect className="card-inner" x="547" y="194" width="307" height="104" rx="9" />
            <rect className="icon-box pw" x="565" y="223" width="46" height="46" rx="9" />
            <g transform="translate(565,223)">
              <rect className="g-pw" x="12" y="12" width="22" height="6.5" rx="2" />
              <rect className="g-pw" x="12" y="22" width="22" height="6.5" rx="2" />
              <rect className="g-pw" x="12" y="32" width="22" height="6.5" rx="2" />
              <circle className="g-pw-fill" cx="16" cy="15.2" r="1.5" />
              <circle className="g-pw-fill" cx="16" cy="25.2" r="1.5" />
              <circle className="g-pw-fill" cx="16" cy="35.2" r="1.5" />
            </g>
            <text className="t-cardtitle" x="627" y="240">
              CONTROL PLANE
            </text>
            <text className="t-cardsub" x="627" y="266">
              ONE PER CAMPUS
            </text>
          </g>

          {/* COOLING */}
          <g className={`card cl rv lift ${stage >= 2 ? "is-on" : ""}`}>
            <rect className="card-bg" x="990" y="190" width="315" height="112" rx="12" />
            <rect className="card-inner" x="994" y="194" width="307" height="104" rx="9" />
            <rect className="icon-box cl" x="1012" y="223" width="46" height="46" rx="9" />
            <g transform="translate(1012,223)">
              <circle className="g-cl" cx="23" cy="23" r="14.5" />
              <circle className="g-cl" cx="23" cy="23" r="2.6" fill="var(--cs-cool)" />
              <path className="g-cl" d="M23 22 C18 22 15.5 17 18.5 12.8 C21.5 15 23 18 23 22 Z" transform="rotate(0 23 23)" />
              <path className="g-cl" d="M23 22 C18 22 15.5 17 18.5 12.8 C21.5 15 23 18 23 22 Z" transform="rotate(120 23 23)" />
              <path className="g-cl" d="M23 22 C18 22 15.5 17 18.5 12.8 C21.5 15 23 18 23 22 Z" transform="rotate(240 23 23)" />
            </g>
            <text className="t-cardtitle" x="1074" y="240">
              COOLING
            </text>
            <text className="t-cardsub" x="1074" y="266">
              PLANT + HEADERS
            </text>
            <rect x="1227" y="228" width="48" height="3" rx="1.5" fill="var(--cs-ink-mute)" opacity="0.7" />
            <rect x="1227" y="238" width="48" height="3" rx="1.5" fill="var(--cs-ink-mute)" opacity="0.7" />
          </g>

          {/* ================= SECOND ROW CARDS ================= */}
          {/* SUBSTATION */}
          <g className={`card pw rv lift ${stage >= 2 ? "is-on" : ""}`}>
            <rect className="card-bg" x="95" y="372" width="315" height="112" rx="12" />
            <rect className="card-inner" x="99" y="376" width="307" height="104" rx="9" />
            <rect className="icon-box pw" x="117" y="405" width="46" height="46" rx="9" />
            <g transform="translate(117,405)">
              <path className="g-pw" d="M13 40 L19 12 M33 40 L27 12 M19 12 H27" />
              <path className="g-pw" d="M15 33 H31 M17 25 H29 M19 17 H27" />
              <path className="g-pw" d="M17 25 L29 33 M29 25 L17 33" />
              <path className="g-pw" d="M20 12 L23 8 L26 12" />
            </g>
            <text className="t-cardtitle" x="179" y="422">
              SUBSTATION
            </text>
            <text className="t-cardsub" x="179" y="448">
              SIZED FOR CAMPUS
            </text>
          </g>

          {/* HEADERS */}
          <g className={`card cl rv lift ${stage >= 2 ? "is-on" : ""}`}>
            <rect className="card-bg" x="990" y="372" width="315" height="112" rx="12" />
            <rect className="card-inner" x="994" y="376" width="307" height="104" rx="9" />
            <rect className="icon-box cl" x="1012" y="405" width="46" height="46" rx="9" />
            <g transform="translate(1012,405)">
              <path className="g-cl" d="M11 18 Q16.5 12 22 18 T33 18" />
              <path className="g-cl" d="M11 24 Q16.5 18 22 24 T33 24" />
              <path className="g-cl" d="M11 30 Q16.5 24 22 30 T33 30" />
            </g>
            <text className="t-cardtitle" x="1074" y="422">
              HEADERS
            </text>
            <text className="t-cardsub" x="1074" y="448">
              SUPPLY / RETURN
            </text>
          </g>

          {/* ================= PODS ================= */}
          {/* POD 01 (from stage 1) */}
          <g className={`pod rv lift ${stage >= 1 ? "is-on" : ""}`}>
            <rect className="pod-bg" x="125" y="690" width="352" height="192" rx="14" />
            <rect className="pod-inner" x="130" y="695" width="342" height="182" rx="10" />
            <g transform="translate(149,724)">
              <rect className="rack-box" x="0" y="0" width="52" height="132" rx="7" />
              <circle className="status s1" cx="13" cy="11" r="2.6" />
              <circle className="status s2" cx="23" cy="11" r="2.6" />
              <circle className="status s3" cx="33" cy="11" r="2.6" />
              <rect className="slot lit" x="8" y="28" width="36" height="9" rx="3" />
              <rect className="slot lit" x="8" y="46" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="64" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="82" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="100" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="116" width="36" height="8" rx="3" />
            </g>
            <text className="t-podtitle" x="237" y="758">
              POD 01
            </text>
            <text className="t-itrow" x="445" y="756" textAnchor="end">
              IT ROW
            </text>
            <line className="data-line hi" x1="237" y1="789" x2="445" y2="789" />
            <line className="data-line hi" x1="237" y1="807" x2="410" y2="807" />
            <line className="data-line" x1="237" y1="825" x2="445" y2="825" />
            <line className="data-line" x1="237" y1="843" x2="392" y2="843" />
          </g>

          {/* POD 02 (from stage 3) */}
          <g className={`pod rv lift ${stage >= 3 ? "is-on" : ""}`}>
            <rect className="pod-bg" x="524" y="690" width="352" height="192" rx="14" />
            <rect className="pod-inner" x="529" y="695" width="342" height="182" rx="10" />
            <g transform="translate(548,724)">
              <rect className="rack-box" x="0" y="0" width="52" height="132" rx="7" />
              <circle className="status s1" cx="13" cy="11" r="2.6" />
              <circle className="status s2" cx="23" cy="11" r="2.6" />
              <circle className="status s3" cx="33" cy="11" r="2.6" />
              <rect className="slot lit" x="8" y="28" width="36" height="9" rx="3" />
              <rect className="slot lit" x="8" y="46" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="64" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="82" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="100" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="116" width="36" height="8" rx="3" />
            </g>
            <text className="t-podtitle" x="636" y="758">
              POD 02
            </text>
            <text className="t-itrow" x="844" y="756" textAnchor="end">
              IT ROW
            </text>
            <line className="data-line hi" x1="636" y1="789" x2="844" y2="789" />
            <line className="data-line hi" x1="636" y1="807" x2="809" y2="807" />
            <line className="data-line" x1="636" y1="825" x2="844" y2="825" />
            <line className="data-line" x1="636" y1="843" x2="791" y2="843" />
          </g>

          {/* POD 03 (from stage 4) */}
          <g className={`pod rv lift ${stage >= 4 ? "is-on" : ""}`}>
            <rect className="pod-bg" x="923" y="690" width="352" height="192" rx="14" />
            <rect className="pod-inner" x="928" y="695" width="342" height="182" rx="10" />
            <g transform="translate(947,724)">
              <rect className="rack-box" x="0" y="0" width="52" height="132" rx="7" />
              <circle className="status s1" cx="13" cy="11" r="2.6" />
              <circle className="status s2" cx="23" cy="11" r="2.6" />
              <circle className="status s3" cx="33" cy="11" r="2.6" />
              <rect className="slot lit" x="8" y="28" width="36" height="9" rx="3" />
              <rect className="slot lit" x="8" y="46" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="64" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="82" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="100" width="36" height="9" rx="3" />
              <rect className="slot" x="8" y="116" width="36" height="8" rx="3" />
            </g>
            <text className="t-podtitle" x="1035" y="758">
              POD 03
            </text>
            <text className="t-itrow" x="1243" y="756" textAnchor="end">
              IT ROW
            </text>
            <line className="data-line hi" x1="1035" y1="789" x2="1243" y2="789" />
            <line className="data-line hi" x1="1035" y1="807" x2="1208" y2="807" />
            <line className="data-line" x1="1035" y1="825" x2="1243" y2="825" />
            <line className="data-line" x1="1035" y1="843" x2="1190" y2="843" />
          </g>

          {/* ================= NETWORK SKID (from stage 5) ================= */}
          <g className={`rv lift ${stage >= 5 ? "is-on" : ""}`}>
            <rect
              className="card-bg"
              x="170"
              y="912"
              width="1060"
              height="58"
              rx="12"
              style={{ stroke: "rgba(167,139,250,.4)" }}
            />
            <rect className="card-inner" x="174" y="916" width="1052" height="50" rx="9" />
            <rect className="icon-box nt" x="192" y="921" width="40" height="40" rx="8" />
            <g transform="translate(192,921)">
              <circle className="g-nt-fill" cx="20" cy="20" r="3.6" />
              <circle className="g-nt" cx="7" cy="7" r="2.4" />
              <circle className="g-nt" cx="33" cy="7" r="2.4" />
              <circle className="g-nt" cx="7" cy="33" r="2.4" />
              <circle className="g-nt" cx="33" cy="33" r="2.4" />
              <path className="g-nt" d="M9 9 L18 18 M31 9 L22 18 M9 31 L18 22 M31 31 L22 22" />
            </g>
            <text className="t-skidtitle" x="252" y="936">
              NETWORK SKID
            </text>
            <text className="t-skidsub" x="252" y="957">
              1 PER 5 IT PODS
            </text>
          </g>
          {/* skid "fabric active" overlay (from stage 6) */}
          <g className={`rv ${stage >= 6 ? "is-on" : ""}`}>
            <rect
              x="170"
              y="912"
              width="1060"
              height="58"
              rx="12"
              fill="none"
              stroke="rgba(167,139,250,.7)"
              strokeWidth="1.4"
              style={{ filter: "drop-shadow(0 0 16px var(--cs-net-glow))" }}
            />
          </g>

          {/* ================= PLANNED PODS 04–06 (from stage 7) ================= */}
          <g className={`rv ${stage >= 7 ? "is-on" : ""}`}>
            <g transform="translate(125,1000)">
              <rect className="ghost-bg" x="0" y="0" width="352" height="84" rx="12" />
              <rect className="ghost-rack" x="24" y="18" width="34" height="48" rx="5" />
              <line className="ghost-rack" x1="30" y1="30" x2="52" y2="30" />
              <line className="ghost-rack" x1="30" y1="42" x2="52" y2="42" />
              <line className="ghost-rack" x1="30" y1="54" x2="52" y2="54" />
              <text className="t-ghost" x="84" y="44">
                POD 04 · PLANNED
              </text>
            </g>
            <g transform="translate(524,1000)">
              <rect className="ghost-bg" x="0" y="0" width="352" height="84" rx="12" />
              <rect className="ghost-rack" x="24" y="18" width="34" height="48" rx="5" />
              <line className="ghost-rack" x1="30" y1="30" x2="52" y2="30" />
              <line className="ghost-rack" x1="30" y1="42" x2="52" y2="42" />
              <line className="ghost-rack" x1="30" y1="54" x2="52" y2="54" />
              <text className="t-ghost" x="84" y="44">
                POD 05 · PLANNED
              </text>
            </g>
            <g transform="translate(923,1000)">
              <rect className="ghost-bg" x="0" y="0" width="352" height="84" rx="12" />
              <rect className="ghost-rack" x="24" y="18" width="34" height="48" rx="5" />
              <line className="ghost-rack" x1="30" y1="30" x2="52" y2="30" />
              <line className="ghost-rack" x1="30" y1="42" x2="52" y2="42" />
              <line className="ghost-rack" x1="30" y1="54" x2="52" y2="54" />
              <text className="t-ghost" x="84" y="44">
                POD 06 · PLANNED
              </text>
            </g>
          </g>

          {/* ================= STAGE CAPTION (always visible; text updates) ================= */}
          <rect className="cap-box" x="130" y="1150" width="1140" height="64" rx="12" />
          <text id="capText" className="t-cap" x="700" y="1189" textAnchor="middle">
            {CAPTIONS[stage] || ""}
          </text>
        </svg>
      </div>
    </div>
  );
}
