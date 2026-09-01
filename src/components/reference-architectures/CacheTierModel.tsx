"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface StageDefinition {
  duration: number;
  caption: string;
}

const STAGES: StageDefinition[] = [
  { duration: 2800, caption: "A long prompt prefix is cached in GPU memory on Pod 01." },
  { duration: 3200, caption: "The cache tiers down: GPU → CPU → local NVMe → site pool." },
  { duration: 3200, caption: "Any pod on the site reads the same pool. Hit rate no longer depends on which node answers." },
  { duration: 3600, caption: "Over the USDC backbone, three diverse paths under ten milliseconds, the pool extends to Site B." },
  { duration: 4200, caption: "A session follows the customer to whichever site has capacity." },
];

interface CacheTierModelProps {
  isActive?: boolean;
}

export default function CacheTierModel({ isActive = true }: CacheTierModelProps) {
  const [stage, setStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalStages = STAGES.length;

  const advanceStage = useCallback(() => {
    setStage((prev) => (prev < totalStages ? prev + 1 : 1));
  }, [totalStages]);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(totalStages);
      return;
    }

    if (!isActive || !isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const holdTime = STAGES[stage - 1]?.duration || 3000;
    timerRef.current = setTimeout(() => {
      advanceStage();
    }, holdTime);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stage, isActive, isPlaying, advanceStage, totalStages]);

  // Pause when off-screen
  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setIsPlaying(e.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  const handleStepClick = (idx: number) => {
    setStage(idx + 1);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleReplay = () => {
    setStage(1);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="cache-tier-root" ref={containerRef} aria-label="Cache tier architecture model">
      <style jsx>{`
        .cache-tier-root {
          --ct-bg: #040813;
          --ct-bg-card: rgba(10, 20, 42, 0.72);
          --ct-ink: #e6effd;
          --ct-ink-dim: #7ba2dd;
          --ct-ink-mute: #486a9e;
          --ct-blue: #3b82f6;
          --ct-cyan: #06b6d4;
          --ct-cyan-bright: #67e8f9;
          --ct-purple: #8b5cf6;
          --ct-purple-bright: #c4b5fd;
          --ct-border: rgba(59, 130, 246, 0.3);
          --ct-border-strong: rgba(59, 130, 246, 0.55);

          position: relative;
          width: 100%;
          border: 1px solid var(--ct-border);
          border-radius: 18px;
          background: linear-gradient(180deg, #070e1e 0%, #03060d 100%);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
          padding: clamp(14px, 2vw, 22px);
          font-family: var(--font-mono, monospace), ui-monospace, sans-serif;
          color: var(--ct-ink);
        }

        .grid-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.85;
        }

        .ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 25% 30%, rgba(6, 182, 212, 0.12), transparent 50%),
            radial-gradient(circle at 75% 70%, rgba(139, 92, 246, 0.1), transparent 50%);
        }

        /* Top Header */
        .ct-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }
        .ct-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #e6effd;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ct-title .sep {
          color: #38bdf8;
        }
        .ct-head-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .stage-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #38bdf8;
        }
        .stage-label b {
          color: #ffffff;
        }
        .stage-pills {
          display: flex;
          gap: 5px;
        }
        .stage-pill {
          width: 22px;
          height: 6px;
          border-radius: 3px;
          background: rgba(56, 189, 248, 0.2);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .stage-pill.active {
          background: #38bdf8;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
        }

        .replay-btn {
          position: absolute;
          right: 14px;
          bottom: 12px;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #7dd3fc;
          background: rgba(12, 26, 54, 0.75);
          border: 1px solid rgba(56, 189, 248, 0.4);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .replay-btn:hover {
          border-color: #38bdf8;
          color: #ffffff;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
        }

        /* SVG Schematic Container */
        .svg-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }
        svg.ct-schematic {
          display: block;
          width: 100%;
          height: auto;
        }

        /* SVG Typography & Styles */
        :global(.cache-tier-root text) {
          font-family: var(--font-mono, monospace), ui-monospace, sans-serif;
          user-select: none;
        }
        :global(.cache-tier-root .site-title) {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          fill: #e6effd;
        }
        :global(.cache-tier-root .site-sub) {
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 1.2px;
          fill: #7ba2dd;
        }
        :global(.cache-tier-root .pod-title) {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          fill: #e6effd;
        }
        :global(.cache-tier-root .tier-label) {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          fill: #e6effd;
        }
        :global(.cache-tier-root .tier-sub) {
          font-size: 7.5px;
          font-weight: 600;
          letter-spacing: 0.5px;
          fill: #7ba2dd;
        }
        :global(.cache-tier-root .tag-text) {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        /* Transitions */
        :global(.cache-tier-root .rv) {
          opacity: 0;
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        :global(.cache-tier-root .rv.is-on) {
          opacity: 1;
        }

        /* Animated Wires */
        :global(.cache-tier-root .wire-base) {
          fill: none;
          stroke: rgba(56, 189, 248, 0.25);
          stroke-width: 1.8;
          stroke-dasharray: 4 4;
        }
        :global(.cache-tier-root .wire-pulse) {
          fill: none;
          stroke: #38bdf8;
          stroke-width: 2.4;
          stroke-linecap: round;
          stroke-dasharray: 8 92;
          animation: pulseFlow 2.2s linear infinite;
        }
        :global(.cache-tier-root .wire-backbone) {
          fill: none;
          stroke: rgba(168, 85, 247, 0.35);
          stroke-width: 2;
          stroke-dasharray: 5 5;
        }
        :global(.cache-tier-root .backbone-pulse) {
          fill: none;
          stroke: #c084fc;
          stroke-width: 2.8;
          stroke-linecap: round;
          stroke-dasharray: 10 90;
          animation: pulseFlow 2s linear infinite;
        }

        @keyframes pulseFlow {
          to {
            stroke-dashoffset: -100;
          }
        }

        /* Caption Bar */
        .caption-bar {
          margin-top: 10px;
          padding: 8px 12px;
          background: rgba(10, 20, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #93c5fd;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
        }
        .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          flex: 0 0 auto;
        }
      `}</style>

      <div className="grid-layer" />
      <div className="ambient-glow" />

      {/* Top Header */}
      <div className="ct-header">
        <div className="ct-title">
          CACHE TIER <span className="sep">·</span> POD → SITE → FOOTPRINT
        </div>
        <div className="ct-head-right">
          <div className="stage-label">
            STAGE <b>{stage}</b> / {totalStages}
          </div>
          <div className="stage-pills">
            {STAGES.map((_, idx) => (
              <div
                key={idx}
                className={`stage-pill ${idx + 1 === stage ? "active" : ""}`}
                onClick={() => handleStepClick(idx)}
                title={`Go to Stage ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button className="replay-btn" type="button" onClick={handleReplay} aria-label="Replay animation">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-2.64-6.36" />
          <path d="M21 3v5h-5" />
        </svg>
        <span>REPLAY</span>
      </button>

      {/* Main SVG Schematic */}
      <div className="svg-container">
        <svg className="ct-schematic" viewBox="0 0 840 540" role="img" aria-label="Hierarchical KV Cache Tier Flow Diagram">
          <defs>
            <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d1b38" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#081024" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="gpuActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.28)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.4)" />
            </linearGradient>
            <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(14, 116, 144, 0.35)" />
              <stop offset="100%" stopColor="rgba(3, 105, 161, 0.25)" />
            </linearGradient>
            <linearGradient id="siteBGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(88, 28, 135, 0.3)" />
              <stop offset="100%" stopColor="rgba(15, 23, 42, 0.6)" />
            </linearGradient>
          </defs>

          {/* ========================================================================= */}
          {/* SITE A (LEFT / CENTRAL ENCLOSURE)                                         */}
          {/* ========================================================================= */}
          <g className={`rv ${stage >= 1 ? "is-on" : ""}`}>
            {/* Site A Boundary */}
            <rect
              x="20"
              y="20"
              width={stage >= 4 ? "470" : "800"}
              height="490"
              rx="14"
              fill="rgba(8, 16, 36, 0.45)"
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="1.4"
              strokeDasharray="6 4"
            />
            {/* Site A Header Badge */}
            <rect x="36" y="12" width="170" height="22" rx="5" fill="#071124" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
            <text className="site-title" x="46" y="27">SITE A</text>
            <text className="site-sub" x="100" y="26">· FABRIC SPEED</text>
          </g>

          {/* -------------------- POD 01 (SITE A) -------------------- */}
          <g className={`rv ${stage >= 1 ? "is-on" : ""}`} transform="translate(42, 54)">
            <rect x="0" y="0" width="200" height="290" rx="10" fill="url(#cardGrad)" stroke={stage === 1 ? "#38bdf8" : "rgba(56, 189, 248, 0.45)"} strokeWidth="1.3" />

            {/* Pod 01 Header */}
            <rect x="12" y="12" width="24" height="20" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
            <path d="M18 22 h12 M24 16 v12" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
            <text className="pod-title" x="44" y="27">POD 01</text>
            <text className="tag-text" x="188" y="26" textAnchor="end" fill="#38bdf8">PRIMARY</text>

            {/* GPU Memory Tier */}
            <g transform="translate(12, 46)">
              <rect
                x="0"
                y="0"
                width="176"
                height="44"
                rx="6"
                fill={stage >= 1 ? "url(#gpuActiveGrad)" : "rgba(15, 23, 42, 0.5)"}
                stroke={stage >= 1 ? "#38bdf8" : "rgba(56, 189, 248, 0.3)"}
                strokeWidth={stage === 1 ? "1.6" : "1"}
              />
              <circle cx="16" cy="22" r="5" fill={stage >= 1 ? "#38bdf8" : "rgba(56, 189, 248, 0.4)"} />
              <text className="tier-label" x="28" y="21">GPU MEMORY</text>
              <text className="tier-sub" x="28" y="34">HBM3e · SUB-MICROSECOND</text>
              {stage >= 1 && (
                <rect x="134" y="14" width="34" height="16" rx="3" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="0.8" />
              )}
              {stage >= 1 && <text className="tag-text" x="151" y="25" textAnchor="middle" fill="#e0f2fe">HOT</text>}
            </g>

            {/* CPU Memory Tier */}
            <g transform="translate(12, 102)">
              <rect
                x="0"
                y="0"
                width="176"
                height="44"
                rx="6"
                fill={stage >= 2 ? "rgba(30, 58, 110, 0.4)" : "rgba(15, 23, 42, 0.4)"}
                stroke={stage >= 2 ? "rgba(56, 189, 248, 0.6)" : "rgba(56, 189, 248, 0.25)"}
                strokeWidth="1"
              />
              <circle cx="16" cy="22" r="5" fill={stage >= 2 ? "#60a5fa" : "rgba(56, 189, 248, 0.3)"} />
              <text className="tier-label" x="28" y="21">CPU MEMORY</text>
              <text className="tier-sub" x="28" y="34">DDR5 HOST RAM · ~100ns</text>
              {stage >= 2 && (
                <rect x="130" y="14" width="38" height="16" rx="3" fill="rgba(96, 165, 250, 0.2)" stroke="#60a5fa" strokeWidth="0.8" />
              )}
              {stage >= 2 && <text className="tag-text" x="149" y="25" textAnchor="middle" fill="#bfdbfe">WARM</text>}
            </g>

            {/* Local NVMe Tier */}
            <g transform="translate(12, 158)">
              <rect
                x="0"
                y="0"
                width="176"
                height="44"
                rx="6"
                fill={stage >= 2 ? "rgba(30, 58, 110, 0.3)" : "rgba(15, 23, 42, 0.4)"}
                stroke={stage >= 2 ? "rgba(56, 189, 248, 0.5)" : "rgba(56, 189, 248, 0.2)"}
                strokeWidth="1"
              />
              <circle cx="16" cy="22" r="5" fill={stage >= 2 ? "#818cf8" : "rgba(56, 189, 248, 0.25)"} />
              <text className="tier-label" x="28" y="21">LOCAL NVMe</text>
              <text className="tier-sub" x="28" y="34">PCIe Gen5 SSD · ~10µs</text>
              {stage >= 2 && (
                <rect x="132" y="14" width="36" height="16" rx="3" fill="rgba(129, 140, 248, 0.2)" stroke="#818cf8" strokeWidth="0.8" />
              )}
              {stage >= 2 && <text className="tag-text" x="150" y="25" textAnchor="middle" fill="#c7d2fe">CAP</text>}
            </g>

            {/* Status Line */}
            <rect x="12" y="218" width="176" height="28" rx="5" fill="rgba(8, 18, 40, 0.6)" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
            <circle cx="24" cy="232" r="3.5" fill="#38bdf8" />
            <text className="tag-text" x="34" y="235" fill="#38bdf8">PREFIX REUSED · 94% HIT</text>

            {/* Downward Tier Arrows inside Pod 01 (Stage 2+) */}
            {stage >= 2 && (
              <g className="rv is-on">
                <path d="M100 90 V100" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" markerEnd="url(#arrow)" />
                <path d="M100 146 V156" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" markerEnd="url(#arrow)" />
              </g>
            )}
          </g>

          {/* -------------------- POD 02 (SITE A - ACTIVE IN STAGE 3+) -------------------- */}
          <g className={`rv ${stage >= 3 ? "is-on" : ""}`} transform="translate(268, 54)">
            <rect x="0" y="0" width="200" height="290" rx="10" fill="url(#cardGrad)" stroke={stage === 3 ? "#38bdf8" : "rgba(56, 189, 248, 0.45)"} strokeWidth="1.3" />

            {/* Pod 02 Header */}
            <rect x="12" y="12" width="24" height="20" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
            <path d="M18 22 h12 M24 16 v12" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
            <text className="pod-title" x="44" y="27">POD 02</text>
            <text className="tag-text" x="188" y="26" textAnchor="end" fill="#38bdf8">SECONDARY</text>

            {/* GPU Memory Tier */}
            <g transform="translate(12, 46)">
              <rect x="0" y="0" width="176" height="44" rx="6" fill={stage >= 3 ? "url(#gpuActiveGrad)" : "rgba(15, 23, 42, 0.5)"} stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
              <circle cx="16" cy="22" r="5" fill="#38bdf8" />
              <text className="tier-label" x="28" y="21">GPU MEMORY</text>
              <text className="tier-sub" x="28" y="34">HBM3e · READY</text>
            </g>

            {/* CPU Memory Tier */}
            <g transform="translate(12, 102)">
              <rect x="0" y="0" width="176" height="44" rx="6" fill="rgba(30, 58, 110, 0.3)" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" />
              <circle cx="16" cy="22" r="5" fill="#60a5fa" />
              <text className="tier-label" x="28" y="21">CPU MEMORY</text>
              <text className="tier-sub" x="28" y="34">DDR5 HOST RAM</text>
            </g>

            {/* Local NVMe Tier */}
            <g transform="translate(12, 158)">
              <rect x="0" y="0" width="176" height="44" rx="6" fill="rgba(30, 58, 110, 0.3)" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
              <circle cx="16" cy="22" r="5" fill="#818cf8" />
              <text className="tier-label" x="28" y="21">LOCAL NVMe</text>
              <text className="tier-sub" x="28" y="34">PCIe Gen5 SSD</text>
            </g>

            {/* Status Line */}
            <rect x="12" y="218" width="176" height="28" rx="5" fill="rgba(8, 18, 40, 0.6)" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
            <circle cx="24" cy="232" r="3.5" fill="#22c55e" />
            <text className="tag-text" x="34" y="235" fill="#4ade80">READS SAME POOL · ZERO MISS</text>
          </g>

          {/* -------------------- SITE POOL (SITE A - ACTIVE IN STAGE 2+) -------------------- */}
          <g className={`rv ${stage >= 2 ? "is-on" : ""}`} transform="translate(42, 380)">
            <rect
              x="0"
              y="0"
              width="426"
              height="96"
              rx="10"
              fill="url(#poolGrad)"
              stroke="#06b6d4"
              strokeWidth="1.4"
            />
            {/* Pool Header & Chips */}
            <g transform="translate(16, 14)">
              <rect x="0" y="0" width="26" height="22" rx="4" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1" />
              <circle cx="13" cy="11" r="5" fill="#06b6d4" />
              <text className="pod-title" x="36" y="16">SITE A CACHE POOL</text>
              <text className="site-sub" x="36" y="30">LMCACHE CLUSTER · ANY POD READS INSTANTLY</text>
            </g>

            <rect x="16" y="56" width="394" height="26" rx="5" fill="rgba(6, 30, 60, 0.6)" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            <text className="tag-text" x="28" y="73" fill="#67e8f9">SHARED TIER · FABRIC-INTERCONNECTED · MULTI-TB CAPACITY</text>
            <text className="tag-text" x="398" y="73" textAnchor="end" fill="#22d3ee">READY</text>
          </g>

          {/* Connector Wires (Pod 01 -> Site Pool) */}
          <g className={`rv ${stage >= 2 ? "is-on" : ""}`}>
            <path className="wire-base" d="M142 344 V380" />
            <path className="wire-pulse" d="M142 344 V380" />
          </g>

          {/* Connector Wires (Site Pool -> Pod 02) */}
          <g className={`rv ${stage >= 3 ? "is-on" : ""}`}>
            <path className="wire-base" d="M368 380 V344" />
            <path className="wire-pulse" d="M368 380 V344" />
          </g>

          {/* ========================================================================= */}
          {/* STAGES 4 & 5: SITE B & USDC MULTI-PATH BACKBONE                           */}
          {/* ========================================================================= */}
          <g className={`rv ${stage >= 4 ? "is-on" : ""}`}>
            {/* Site B Enclosure */}
            <rect
              x="570"
              y="20"
              width="250"
              height="490"
              rx="14"
              fill="url(#siteBGrad)"
              stroke="rgba(168, 85, 247, 0.45)"
              strokeWidth="1.4"
              strokeDasharray="6 4"
            />
            {/* Site B Header Badge */}
            <rect x="586" y="12" width="160" height="22" rx="5" fill="#180c30" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="1" />
            <text className="site-title" x="596" y="27" fill="#f3e8ff">SITE B</text>
            <text className="site-sub" x="650" y="26" fill="#c084fc">· REMOTE MIRROR</text>

            {/* Site B Pod 01 */}
            <g transform="translate(590, 54)">
              <rect x="0" y="0" width="210" height="290" rx="10" fill="url(#cardGrad)" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1.3" />
              <text className="pod-title" x="16" y="27">POD 01 (SITE B)</text>
              <text className="tag-text" x="194" y="26" textAnchor="end" fill="#c084fc">STANDBY</text>

              {/* Memory Tiers */}
              <g transform="translate(12, 46)">
                <rect x="0" y="0" width="186" height="44" rx="6" fill={stage >= 5 ? "rgba(147, 51, 234, 0.35)" : "rgba(15, 23, 42, 0.5)"} stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
                <circle cx="16" cy="22" r="5" fill="#c084fc" />
                <text className="tier-label" x="28" y="21">GPU MEMORY</text>
                <text className="tier-sub" x="28" y="34">HBM3e · READY</text>
              </g>

              <g transform="translate(12, 102)">
                <rect x="0" y="0" width="186" height="44" rx="6" fill="rgba(24, 16, 44, 0.4)" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
                <circle cx="16" cy="22" r="5" fill="#a855f7" />
                <text className="tier-label" x="28" y="21">CPU MEMORY</text>
                <text className="tier-sub" x="28" y="34">DDR5 HOST RAM</text>
              </g>

              <g transform="translate(12, 158)">
                <rect x="0" y="0" width="186" height="44" rx="6" fill="rgba(24, 16, 44, 0.4)" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1" />
                <circle cx="16" cy="22" r="5" fill="#9333ea" />
                <text className="tier-label" x="28" y="21">LOCAL NVMe</text>
                <text className="tier-sub" x="28" y="34">PCIe Gen5 SSD</text>
              </g>

              <rect x="12" y="218" width="186" height="28" rx="5" fill="rgba(16, 8, 32, 0.7)" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
              <circle cx="24" cy="232" r="3.5" fill="#c084fc" />
              <text className="tag-text" x="34" y="235" fill="#e9d5ff">SESSION FOLLOWS CAPACITY</text>
            </g>

            {/* Site B Remote Pool */}
            <g transform="translate(590, 380)">
              <rect x="0" y="0" width="210" height="96" rx="10" fill="rgba(88, 28, 135, 0.25)" stroke="#a855f7" strokeWidth="1.4" />
              <g transform="translate(14, 16)">
                <circle cx="10" cy="10" r="5" fill="#c084fc" />
                <text className="pod-title" x="24" y="14">SITE B POOL</text>
                <text className="site-sub" x="24" y="28">EXTENDED CACHE MIRROR</text>
              </g>
              <rect x="12" y="56" width="186" height="26" rx="5" fill="rgba(24, 12, 44, 0.6)" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
              <text className="tag-text" x="22" y="73" fill="#e9d5ff">BACKBONE EXTENDED · &lt;10ms</text>
            </g>

            {/* Backbone Connection Paths (Site A -> Site B) */}
            <g>
              {/* Path 1 - Top Curved Route */}
              <path className="wire-backbone" d="M468 400 C 510 380, 530 380, 590 400" />
              <path className="backbone-pulse" d="M468 400 C 510 380, 530 380, 590 400" />

              {/* Path 2 - Direct Center Route */}
              <path className="wire-backbone" d="M468 428 H 590" />
              <path className="backbone-pulse" d="M468 428 H 590" style={{ animationDelay: "-0.7s" }} />

              {/* Path 3 - Bottom Curved Route */}
              <path className="wire-backbone" d="M468 456 C 510 476, 530 476, 590 456" />
              <path className="backbone-pulse" d="M468 456 C 510 476, 530 476, 590 456" style={{ animationDelay: "-1.4s" }} />

              {/* Backbone Meta HUD Badge */}
              <rect x="476" y="482" width="112" height="22" rx="5" fill="#110824" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1" />
              <text className="tag-text" x="532" y="496" textAnchor="middle" fill="#d8b4fe">3 DIVERSE PATHS · &lt;10ms</text>
            </g>
          </g>
        </svg>
      </div>

      {/* Dynamic Narrative Caption Bar */}
      <div className="caption-bar">
        <span className="caption-dot" />
        <span>{STAGES[stage - 1]?.caption}</span>
      </div>
    </div>
  );
}
