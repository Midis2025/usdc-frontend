"use client";

import React, { useState } from "react";

interface PhaseDeploymentStageProps {
  currentPhase: number;
}

export default function PhaseDeploymentStage({ currentPhase }: PhaseDeploymentStageProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isPhase1 = currentPhase === 1;
  const isPhase2 = currentPhase === 2;
  const isPhase3 = currentPhase === 3;

  return (
    <div className="phase-stage-root">
      <style jsx>{`
        .phase-stage-root {
          width: 100%;
          position: relative;
          background: radial-gradient(900px 500px at 50% 0%, #0a1428 0%, #05070f 65%, #03040a 100%);
          border: 1px solid rgba(93, 140, 230, 0.35);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono), ui-monospace, monospace;
          color: #e6eefc;
        }

        .stage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(83, 125, 210, 0.2);
        }

        .phase-badge-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4f8bff;
          box-shadow: 0 0 10px #4f8bff;
          animation: beaconPulse 2s ease-in-out infinite;
        }

        .phase-title-text {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #eaf1ff;
        }

        .scale-text {
          font-size: 11px;
          letter-spacing: 1.2px;
          color: #7184a8;
          text-transform: uppercase;
        }

        .svg-wrap {
          width: 100%;
          position: relative;
        }

        svg.phase-schematic {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Frame & Ticks */
        :global(.phase-stage-root .p-frame) {
          fill: none;
          stroke: rgba(93, 140, 230, 0.28);
          stroke-width: 1.2;
        }
        :global(.phase-stage-root .p-tick) {
          fill: none;
          stroke: rgba(120, 165, 255, 0.6);
          stroke-width: 1.5;
          stroke-linecap: round;
        }

        /* Shared Boundary */
        :global(.phase-stage-root .shared-boundary) {
          fill: rgba(15, 26, 52, 0.25);
          stroke: rgba(79, 139, 255, 0.35);
          stroke-width: 1.2;
          stroke-dasharray: 5 5;
        }

        /* Cards Base */
        :global(.phase-stage-root .sc-card) {
          transition: all 0.35s ease;
          cursor: pointer;
        }
        :global(.phase-stage-root .sc-bg) {
          fill: rgba(14, 24, 48, 0.7);
          transition: fill 0.3s ease;
        }
        :global(.phase-stage-root .sc-border) {
          fill: none;
          stroke: rgba(83, 125, 210, 0.35);
          stroke-width: 1.2;
          transition: stroke 0.3s ease, filter 0.3s ease;
        }
        :global(.phase-stage-root .sc-card:hover .sc-border) {
          stroke: rgba(110, 160, 255, 0.9);
          filter: drop-shadow(0 0 10px rgba(70, 120, 240, 0.5));
        }

        /* Text styling */
        :global(.phase-stage-root .t-sec-head) {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 2px;
          fill: #7ea8ff;
        }
        :global(.phase-stage-root .t-title) {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          fill: #ffffff;
        }
        :global(.phase-stage-root .t-sub) {
          font-size: 9.5px;
          letter-spacing: 1px;
          fill: #7e94be;
        }

        /* Bus & Wire Flows */
        :global(.phase-stage-root .bus-pwr) {
          stroke: #4f8bff;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(.phase-stage-root .bus-cool) {
          stroke: #2fdbe6;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(.phase-stage-root .flow-pulse) {
          animation: flowMarch 1.4s linear infinite;
        }

        /* Pods */
        :global(.phase-stage-root .pod-active-bg) {
          fill: rgba(16, 28, 56, 0.8);
        }
        :global(.phase-stage-root .pod-active-border) {
          fill: none;
          stroke: rgba(110, 160, 255, 0.85);
          stroke-width: 1.4;
          filter: drop-shadow(0 0 10px rgba(70, 120, 240, 0.4));
          transition: all 0.3s ease;
        }
        :global(.phase-stage-root .pod-planned-bg) {
          fill: rgba(18, 24, 40, 0.3);
        }
        :global(.phase-stage-root .pod-planned-border) {
          fill: none;
          stroke: rgba(120, 140, 180, 0.35);
          stroke-width: 1.2;
          stroke-dasharray: 5 5;
        }
        :global(.phase-stage-root .rk-slot) {
          fill: rgba(79, 139, 255, 0.12);
          stroke: rgba(79, 139, 255, 0.35);
          stroke-width: 1;
        }
        :global(.phase-stage-root .rk-led) {
          fill: #4f8bff;
          filter: drop-shadow(0 0 3px #4f8bff);
        }

        /* Islands warning (Phase 2) */
        :global(.phase-stage-root .island-box) {
          fill: rgba(245, 158, 11, 0.05);
          stroke: rgba(245, 158, 11, 0.6);
          stroke-width: 1.2;
          stroke-dasharray: 4 4;
        }
        :global(.phase-stage-root .t-island-warn) {
          font-size: 10px;
          letter-spacing: 1.1px;
          fill: #fbbf24;
          font-weight: 700;
        }

        /* Network Skid & Fabric (Phase 3) */
        :global(.phase-stage-root .skid-card-bg) {
          fill: rgba(28, 20, 56, 0.85);
        }
        :global(.phase-stage-root .skid-card-border) {
          fill: none;
          stroke: rgba(175, 140, 255, 0.85);
          stroke-width: 1.4;
          filter: drop-shadow(0 0 12px rgba(150, 110, 255, 0.5));
        }
        :global(.phase-stage-root .fabric-wire) {
          stroke: #a48bff;
          stroke-width: 2;
          stroke-dasharray: 4 6;
          fill: none;
          stroke-linecap: round;
          filter: drop-shadow(0 0 6px rgba(164, 139, 255, 0.8));
          animation: flowMarch 1s linear infinite;
        }

        @keyframes beaconPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes flowMarch {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>

      {/* Header bar */}
      <div className="stage-header">
        <div className="phase-badge-wrap">
          <span className="status-dot" />
          <span className="phase-title-text">
            {isPhase1 && "Phase 01 · Single Pod Energization"}
            {isPhase2 && "Phase 02 · Modular Expansion (3 Pods)"}
            {isPhase3 && "Phase 03 · Unified Fabric Deployment"}
          </span>
        </div>
        <span className="scale-text">Plan View · System Schematic</span>
      </div>

      {/* SVG Canvas */}
      <div className="svg-wrap">
        <svg
          className="phase-schematic"
          viewBox="0 0 720 380"
          role="img"
          aria-label="Modular data center deployment phases schematic"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="pwrGradLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f8bff" />
              <stop offset="100%" stopColor="#79abff" />
            </linearGradient>
            <linearGradient id="coolGradLine" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#2fdbe6" />
              <stop offset="100%" stopColor="#6ef4fb" />
            </linearGradient>
            <linearGradient id="netGradLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a48bff" />
              <stop offset="100%" stopColor="#cbb8ff" />
            </linearGradient>
            <pattern id="diagGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0 L0 0 0 24" fill="none" stroke="#16305e" strokeWidth="0.8" strokeOpacity="0.25" />
            </pattern>
          </defs>

          {/* Blueprint frame & grid */}
          <rect x="8" y="8" width="704" height="364" rx="12" fill="url(#diagGrid)" />
          <rect x="8" y="8" width="704" height="364" rx="12" className="p-frame" />
          <path d="M24,14 L14,14 L14,24" className="p-tick" />
          <path d="M696,14 L706,14 L706,24" className="p-tick" />
          <path d="M24,366 L14,366 L14,356" className="p-tick" />
          <path d="M696,366 L706,366 L706,356" className="p-tick" />

          {/* ================= SHARED CAMPUS BOUNDARY ================= */}
          <rect x="20" y="20" width="680" height="96" rx="8" className="shared-boundary" />
          <text x="36" y="38" className="t-sec-head">
            SHARED CAMPUS INFRASTRUCTURE · SIZED FOR END STATE
          </text>

          {/* 1. SUBSTATION CARD */}
          <g
            className="sc-card"
            transform="translate(36, 48)"
            onMouseEnter={() => setHoveredNode("substation")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect width="190" height="56" rx="8" className="sc-bg" />
            <rect width="190" height="56" rx="8" className="sc-border" />
            <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(79,139,255,0.18)" stroke="#4f8bff" strokeWidth="1.2" />
            <path d="M27 20 L23 28 L27 28 L25 36 L31 27 L27 27 Z" fill="#7ea8ff" />
            <text x="48" y="30" className="t-title" style={{ fontSize: 12 }}>SUBSTATION</text>
            <text x="48" y="44" className="t-sub">15 MW GRID FEED</text>
            <circle cx="130" cy="56" r="3.5" fill="#4f8bff" />
          </g>

          {/* 2. CONTROL PLANE CARD */}
          <g
            className="sc-card"
            transform="translate(265, 48)"
            onMouseEnter={() => setHoveredNode("control")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect width="190" height="56" rx="8" className="sc-bg" />
            <rect width="190" height="56" rx="8" className="sc-border" />
            <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(99,102,241,0.18)" stroke="#6366f1" strokeWidth="1.2" />
            <rect x="18" y="21" width="16" height="3" rx="1.5" fill="#818cf8" />
            <rect x="18" y="27" width="16" height="3" rx="1.5" fill="#818cf8" />
            <rect x="18" y="33" width="16" height="3" rx="1.5" fill="#818cf8" />
            <text x="48" y="30" className="t-title" style={{ fontSize: 12 }}>CONTROL PLANE</text>
            <text x="48" y="44" className="t-sub">UNIFIED TELEMETRY</text>
          </g>

          {/* 3. COOLING PLANT CARD */}
          <g
            className="sc-card"
            transform="translate(494, 48)"
            onMouseEnter={() => setHoveredNode("cooling")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect width="190" height="56" rx="8" className="sc-bg" />
            <rect width="190" height="56" rx="8" className="sc-border" />
            <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(47,219,230,0.18)" stroke="#2fdbe6" strokeWidth="1.2" />
            <circle cx="26" cy="28" r="7" fill="none" stroke="#2fdbe6" strokeWidth="1.2" />
            <circle cx="26" cy="28" r="2" fill="#2fdbe6" />
            <text x="48" y="30" className="t-title" style={{ fontSize: 12 }}>COOLING PLANT</text>
            <text x="48" y="44" className="t-sub">CENTRAL CHILLERS</text>
            <circle cx="590" cy="56" r="3.5" fill="#2fdbe6" />
          </g>

          {/* ================= BUS & HEADERS DISTRIBUTION ================= */}
          {/* Power Bus & Drops */}
          {/* Drop to Pod 01 */}
          <path d="M131 104 V185" className="bus-pwr" />
          <circle cx="131" cy="104" r="3.5" fill="#4f8bff" />
          <circle cx="131" cy="185" r="3.5" fill="#4f8bff" />

          {/* Power bus branch to Pod 02 & Pod 03 in Phase 2 & 3 */}
          {currentPhase >= 2 && (
            <>
              <path d="M131 144 H589" className="bus-pwr" />
              <path d="M360 144 V185" className="bus-pwr" />
              <path d="M589 144 V185" className="bus-pwr" />
              <circle cx="131" cy="144" r="3.5" fill="#4f8bff" />
              <circle cx="360" cy="144" r="3.5" fill="#4f8bff" />
              <circle cx="360" cy="185" r="3.5" fill="#4f8bff" />
              <circle cx="589" cy="144" r="3.5" fill="#4f8bff" />
              <circle cx="589" cy="185" r="3.5" fill="#4f8bff" />
            </>
          )}

          {/* Cooling Header & Drops */}
          {/* Drop to Pod 01 (Cooling line from plant to Pod 01 in Phase 1) */}
          <path
            d="M589 104 V130 H151 V185"
            className="bus-cool"
          />
          <circle cx="589" cy="104" r="3.5" fill="#2fdbe6" />
          <circle cx="151" cy="185" r="3.5" fill="#2fdbe6" />

          {/* Cooling drops to Pod 02 & Pod 03 in Phase 2 & 3 */}
          {currentPhase >= 2 && (
            <>
              <path d="M380 130 V185" className="bus-cool" />
              <path d="M589 130 V185" className="bus-cool" />
              <circle cx="380" cy="130" r="3.5" fill="#2fdbe6" />
              <circle cx="380" cy="185" r="3.5" fill="#2fdbe6" />
              <circle cx="589" cy="130" r="3.5" fill="#2fdbe6" />
            </>
          )}

          {/* ================= COMPUTE PODS LAYER ================= */}
          {/* POD 01 (Built & Energized) */}
          <g className="sc-card" transform="translate(36, 185)">
            <rect width="190" height="96" rx="10" className="pod-active-bg" />
            <rect width="190" height="96" rx="10" className="pod-active-border" />
            <rect x="12" y="14" width="32" height="68" rx="4" className="rk-slot" />
            {[0, 1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <rect x="16" y={20 + i * 12} width="24" height="6" rx="1.5" fill="rgba(79,139,255,0.2)" />
                <circle cx="20" cy={23 + i * 12} r="1.5" className="rk-led" />
              </React.Fragment>
            ))}
            <text x="56" y="36" className="t-title">POD 01</text>
            <text x="56" y="52" className="t-sub" fill="#8cb3ff">BUILT & ENERGIZED</text>
            <rect x="56" y="62" width="60" height="18" rx="4" fill="rgba(79,139,255,0.2)" stroke="#4f8bff" strokeWidth="1" />
            <text x="86" y="74" textAnchor="middle" fill="#8cb3ff" style={{ fontSize: 9, fontWeight: 600 }}>IT POD</text>
          </g>

          {/* POD 02 (Active in Phase 2 & 3, Planned in Phase 1) */}
          <g className="sc-card" transform="translate(265, 185)">
            <rect
              width="190"
              height="96"
              rx="10"
              className={currentPhase >= 2 ? "pod-active-bg" : "pod-planned-bg"}
            />
            <rect
              width="190"
              height="96"
              rx="10"
              className={currentPhase >= 2 ? "pod-active-border" : "pod-planned-border"}
            />
            {currentPhase >= 2 ? (
              <>
                <rect x="12" y="14" width="32" height="68" rx="4" className="rk-slot" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <React.Fragment key={i}>
                    <rect x="16" y={20 + i * 12} width="24" height="6" rx="1.5" fill="rgba(79,139,255,0.2)" />
                    <circle cx="20" cy={23 + i * 12} r="1.5" className="rk-led" />
                  </React.Fragment>
                ))}
                <text x="56" y="36" className="t-title">POD 02</text>
                <text x="56" y="52" className="t-sub" fill="#8cb3ff">BUILT & ENERGIZED</text>
                <rect x="56" y="62" width="60" height="18" rx="4" fill="rgba(79,139,255,0.2)" stroke="#4f8bff" strokeWidth="1" />
                <text x="86" y="74" textAnchor="middle" fill="#8cb3ff" style={{ fontSize: 9, fontWeight: 600 }}>IT POD</text>
              </>
            ) : (
              <>
                <text x="95" y="48" textAnchor="middle" fill="#65789e" style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
                  POD 02 · PLANNED
                </text>
                <text x="95" y="64" textAnchor="middle" fill="#4d5d7e" style={{ fontSize: 10, letterSpacing: 1 }}>
                  PAD & HEADERS READY
                </text>
              </>
            )}
          </g>

          {/* POD 03 (Active in Phase 2 & 3, Planned in Phase 1) */}
          <g className="sc-card" transform="translate(494, 185)">
            <rect
              width="190"
              height="96"
              rx="10"
              className={currentPhase >= 2 ? "pod-active-bg" : "pod-planned-bg"}
            />
            <rect
              width="190"
              height="96"
              rx="10"
              className={currentPhase >= 2 ? "pod-active-border" : "pod-planned-border"}
            />
            {currentPhase >= 2 ? (
              <>
                <rect x="12" y="14" width="32" height="68" rx="4" className="rk-slot" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <React.Fragment key={i}>
                    <rect x="16" y={20 + i * 12} width="24" height="6" rx="1.5" fill="rgba(79,139,255,0.2)" />
                    <circle cx="20" cy={23 + i * 12} r="1.5" className="rk-led" />
                  </React.Fragment>
                ))}
                <text x="56" y="36" className="t-title">POD 03</text>
                <text x="56" y="52" className="t-sub" fill="#8cb3ff">SILICON PER POD</text>
                <rect x="56" y="62" width="60" height="18" rx="4" fill="rgba(79,139,255,0.2)" stroke="#4f8bff" strokeWidth="1" />
                <text x="86" y="74" textAnchor="middle" fill="#8cb3ff" style={{ fontSize: 9, fontWeight: 600 }}>IT POD</text>
              </>
            ) : (
              <>
                <text x="95" y="48" textAnchor="middle" fill="#65789e" style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
                  POD 03 · PLANNED
                </text>
                <text x="95" y="64" textAnchor="middle" fill="#4d5d7e" style={{ fontSize: 10, letterSpacing: 1 }}>
                  PAD & HEADERS READY
                </text>
              </>
            )}
          </g>

          {/* ================= PHASE 2: THREE ISLANDS STATE ================= */}
          {isPhase2 && (
            <g transform="translate(20, 175)">
              <rect x="10" y="0" width="660" height="114" rx="12" className="island-box" />
              <rect
                x="185"
                y="101"
                width="310"
                height="26"
                rx="6"
                fill="#161208"
                stroke="#f59e0b"
                strokeWidth="1.2"
                style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,0.25))" }}
              />
              <text
                x="340"
                y="114"
                textAnchor="middle"
                dominantBaseline="central"
                className="t-island-warn"
              >
                ⚠ 3 ISOLATED ISLANDS · NO FABRIC YET
              </text>
            </g>
          )}

          {/* ================= PHASE 3: NETWORK SKID & UNIFIED FABRIC ================= */}
          {isPhase3 && (
            <g>
              {/* Network Fabric Mesh Cables */}
              <path d="M131 281 V315 H589 V281" className="fabric-wire" />
              <path d="M360 281 V315" className="fabric-wire" />
              <circle cx="131" cy="281" r="3.5" fill="#a48bff" />
              <circle cx="360" cy="281" r="3.5" fill="#a48bff" />
              <circle cx="589" cy="281" r="3.5" fill="#a48bff" />

              {/* Network Skid Card */}
              <g className="sc-card" transform="translate(235, 315)">
                <rect width="250" height="48" rx="8" className="skid-card-bg" />
                <rect width="250" height="48" rx="8" className="skid-card-border" />
                <rect x="10" y="10" width="28" height="28" rx="6" fill="rgba(164,139,255,0.2)" stroke="#a48bff" strokeWidth="1.2" />
                <circle cx="24" cy="20" r="2.5" fill="#cbb8ff" />
                <circle cx="18" cy="28" r="2.5" fill="#cbb8ff" />
                <circle cx="30" cy="28" r="2.5" fill="#cbb8ff" />
                <line x1="24" y1="20" x2="18" y2="28" stroke="#cbb8ff" strokeWidth="1.2" />
                <line x1="24" y1="20" x2="30" y2="28" stroke="#cbb8ff" strokeWidth="1.2" />
                <text x="46" y="26" className="t-title" style={{ fontSize: 11.5, fill: "#eef2ff" }}>NETWORK SKID</text>
                <text x="46" y="38" className="t-sub" fill="#c4b5fd" style={{ fontSize: 9 }}>1 PER 5 PODS · ONE FABRIC</text>
                <rect x="186" y="15" width="54" height="18" rx="4" fill="rgba(168,132,255,0.2)" stroke="#a48bff" strokeWidth="1" />
                <text x="213" y="27" textAnchor="middle" fill="#cbb8ff" style={{ fontSize: 8.5, fontWeight: 600 }}>FABRIC</text>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
