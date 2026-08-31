"use client";

import React, { useState, useEffect, useRef } from "react";

export function Ra2InsightPhasesSection() {
  const [activeTab, setActiveTab] = useState<"all" | "prefill" | "decode">("all");
  const [simTick, setSimTick] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<"prefill" | "decode" | null>(null);

  // Live simulation tick loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSimTick((prev) => (prev + 1) % 1000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Compute live waveform positions for decode pulses
  const pulseOffsets = [0, 18, 38, 56, 76, 96, 116, 136, 156];

  return (
    <section className="ra2-insight-section" aria-labelledby="ra2-ins">
      <style jsx>{`
        .ra2-insight-section {
          padding: clamp(36px, 4vw, 56px) 0;
          position: relative;
          background: #050b14;
          border-top: 1px solid rgba(74, 144, 255, 0.12);
          border-bottom: 1px solid rgba(74, 144, 255, 0.12);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Section Head */
        .section-head {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) 1px minmax(0, 1fr);
          gap: clamp(24px, 4vw, 48px);
          align-items: end;
          margin-bottom: clamp(40px, 5vw, 56px);
        }

        .head-left {
          display: flex;
          flex-direction: column;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }

        .section-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          letter-spacing: 0.15em;
          color: #38bdf8;
          font-weight: 600;
        }

        .eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 4px 12px;
          border-radius: 999px;
        }

        .eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
        }

        .title {
          font-family: var(--font-display, inherit);
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: #ffffff;
          margin: 0;
        }

        .vertical-divider {
          width: 1px;
          height: 100%;
          min-height: 90px;
          align-self: stretch;
          background: linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.3), transparent);
        }

        .head-right {
          display: flex;
          align-items: flex-end;
          padding-bottom: 4px;
        }

        .lead {
          font-size: clamp(15px, 1.4vw, 17px);
          line-height: 1.65;
          color: #94a3b8;
          margin: 0;
        }

        /* Filter Controls */
        .phase-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          color: #cbd5e1;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
        }

        .tab-btn-group {
          display: flex;
          background: rgba(10, 20, 38, 0.7);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 10px;
          padding: 4px;
          gap: 4px;
        }

        .tab-btn {
          padding: 6px 16px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #94a3b8;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          color: #f1f5f9;
        }

        .tab-btn.active {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        /* Two Phase Cards Grid */
        .two-phase-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 36px;
        }

        .phase-card {
          background: rgba(10, 20, 40, 0.7);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 18px;
          padding: 28px 30px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s ease;
        }

        .phase-card.prefill {
          border-color: rgba(245, 158, 11, 0.4);
        }

        .phase-card.prefill:hover,
        .phase-card.prefill.focus {
          border-color: #f59e0b;
        }

        .phase-card.decode {
          border-color: rgba(56, 189, 248, 0.4);
        }

        .phase-card.decode:hover,
        .phase-card.decode.focus {
          border-color: #38bdf8;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .card-role-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .card-role-tag.pf {
          color: #fbbf24;
        }

        .card-role-tag.dc {
          color: #38bdf8;
        }

        .card-bound-badge {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
        }

        .card-bound-badge.pf {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.4);
        }

        .card-bound-badge.dc {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.4);
        }

        .card-title {
          font-family: var(--font-display, inherit);
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          color: #ffffff;
          margin: 0 0 22px 0;
          min-height: 52px;
        }

        /* Spec Table */
        .spec-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          min-height: 38px;
        }

        .spec-key {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #64748b;
          text-transform: uppercase;
        }

        .spec-val {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          font-weight: 600;
          color: #f1f5f9;
        }

        .spec-val.hl-amber {
          color: #fcd34d;
        }

        .spec-val.hl-cyan {
          color: #7dd3fc;
        }

        /* Power Profile Oscilloscope Chart Box */
        .chart-box {
          background: #060e1a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 16px;
          position: relative;
          margin-top: auto;
        }

        .chart-hud-top {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #64748b;
          margin-bottom: 8px;
        }

        .chart-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        /* Takeaway Footer Bar */
        .takeaway-bar {
          background: rgba(12, 22, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .takeaway-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.35);
          padding: 6px 14px;
          border-radius: 8px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #38bdf8;
          font-weight: 700;
          white-space: nowrap;
        }

        .takeaway-text {
          font-size: 13.5px;
          line-height: 1.5;
          color: #cbd5e1;
          margin: 0;
        }

        .takeaway-text strong {
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .section-head {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .vertical-divider {
            display: none;
          }
          .two-phase-grid {
            grid-template-columns: 1fr;
          }
          .takeaway-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="container">
        {/* Section Head */}
        <div className="section-head reveal">
          <div>
            <div className="meta-row">
              <span className="section-index">02 / 07</span>
              <div className="eyebrow-row">
                <span className="eyebrow-text">THE INSIGHT</span>
              </div>
            </div>
            <h2 id="ra2-ins" className="title">
              Two phases that want opposite things from the hardware.
            </h2>
          </div>

          <div className="vertical-divider" aria-hidden="true" />

          <div>
            <p className="lead">
              A homogeneous fleet sized correctly for one of those phases is sized incorrectly for the other. That is true of the silicon, and it is equally true of the power and cooling design wrapped around it.
            </p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="phase-controls">
          <div className="live-status-pill">
            <span className="status-dot" />
            <span>LIVE WORKLOAD PROFILE OSCILLOSCOPE</span>
          </div>

          <div className="tab-btn-group" role="tablist">
            <button
              className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Side-by-Side View
            </button>
            <button
              className={`tab-btn ${activeTab === "prefill" ? "active" : ""}`}
              onClick={() => setActiveTab("prefill")}
            >
              Prefill Phase
            </button>
            <button
              className={`tab-btn ${activeTab === "decode" ? "active" : ""}`}
              onClick={() => setActiveTab("decode")}
            >
              Decode Phase
            </button>
          </div>
        </div>

        {/* 2-Phase Cards */}
        <div className="two-phase-grid">
          {/* 1. PREFILL PHASE CARD */}
          {(activeTab === "all" || activeTab === "prefill") && (
            <article
              className={`phase-card prefill ${hoveredCard === "prefill" ? "focus" : ""}`}
              onMouseEnter={() => setHoveredCard("prefill")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <span className="card-role-tag pf">Phase 01 · Prefill</span>
                <span className="card-bound-badge pf">Compute-Bound</span>
              </div>

              <h3 className="card-title">Reads the prompt, builds the KV cache</h3>

              <ul className="spec-list">
                <li className="spec-item">
                  <span className="spec-key">Bound By</span>
                  <span className="spec-val hl-amber">Compute (Raw FLOPS)</span>
                </li>
                <li className="spec-item">
                  <span className="spec-key">Power Profile</span>
                  <span className="spec-val hl-amber">Near sustained TDP (~94%)</span>
                </li>
                <li className="spec-item">
                  <span className="spec-key">Silicon Architecture</span>
                  <span className="spec-val">High arithmetic density accelerators</span>
                </li>
                <li className="spec-item">
                  <span className="spec-key">Hardware Lifecycle</span>
                  <span className="spec-val">Frequent refresh cycle (Fast compute evolution)</span>
                </li>
              </ul>

              {/* Power Profile Oscilloscope Chart */}
              <div className="chart-box">
                <div className="chart-hud-top">
                  <span>TELEMETRY · POWER PROFILE</span>
                  <span style={{ color: "#fbbf24" }}>~94% SUSTAINED LOAD</span>
                </div>

                <svg className="chart-svg" viewBox="0 0 440 120">
                  {/* Axis Baseline */}
                  <line x1="20" y1="95" x2="420" y2="95" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

                  {/* Sustained TDP Ceiling Baseline */}
                  <line x1="20" y1="28" x2="420" y2="28" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.75" />
                  <text x="24" y="21" fill="#f59e0b" style={{ fontSize: 9.5, fontFamily: "monospace", fontWeight: 700 }}>
                    SUSTAINED TDP (PEAK LOAD)
                  </text>

                  {/* Prefill Waveform Line */}
                  <path
                    d="M 20 95 C 50 48, 80 40, 120 38 L 420 38"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* Moving Pulse Indicator */}
                  <circle
                    cx={120 + ((simTick * 3) % 290)}
                    cy="38"
                    r="4"
                    fill="#ffffff"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />

                  <text x="24" y="110" fill="#64748b" style={{ fontSize: 9, fontFamily: "monospace" }}>
                    PROMPT INGESTION →
                  </text>
                  <text x="416" y="110" textAnchor="end" fill="#64748b" style={{ fontSize: 9, fontFamily: "monospace" }}>
                    CONTINUOUS EXECUTION
                  </text>
                </svg>
              </div>
            </article>
          )}

          {/* 2. DECODE PHASE CARD */}
          {(activeTab === "all" || activeTab === "decode") && (
            <article
              className={`phase-card decode ${hoveredCard === "decode" ? "focus" : ""}`}
              onMouseEnter={() => setHoveredCard("decode")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <span className="card-role-tag dc">Phase 02 · Decode</span>
                <span className="card-bound-badge dc">Bandwidth-Bound</span>
              </div>

              <h3 className="card-title">Emits output tokens one at a time</h3>

              <ul className="spec-list">
                <li className="spec-item">
                  <span className="spec-key">Bound By</span>
                  <span className="spec-val hl-cyan">Memory Bandwidth (HBM3e/HBM4)</span>
                </li>
                <li className="spec-item">
                  <span className="spec-key">Power Profile</span>
                  <span className="spec-val hl-cyan">Bursty (Low arithmetic utilisation)</span>
                </li>
                <li className="spec-item">
                  <span className="spec-key">Silicon Architecture</span>
                  <span className="spec-val">High bandwidth memory, high concurrency</span>
                </li>
                <li className="spec-item">
                  <span className="spec-key">Hardware Lifecycle</span>
                  <span className="spec-val">Longer amortisation (Stable memory architecture)</span>
                </li>
              </ul>

              {/* Power Profile Oscilloscope Chart */}
              <div className="chart-box">
                <div className="chart-hud-top">
                  <span>TELEMETRY · POWER PROFILE</span>
                  <span style={{ color: "#38bdf8" }}>BURSTY AUTOREGRESSIVE SPIKES</span>
                </div>

                <svg className="chart-svg" viewBox="0 0 440 120">
                  {/* Axis Baseline */}
                  <line x1="20" y1="95" x2="420" y2="95" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

                  {/* Sustained TDP Ceiling */}
                  <line x1="20" y1="28" x2="420" y2="28" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.6" />
                  <text x="24" y="21" fill="#38bdf8" style={{ fontSize: 9.5, fontFamily: "monospace", fontWeight: 700 }}>
                    SUSTAINED TDP CEILING (UNDERUTILIZED)
                  </text>

                  {/* Bursty Square Wave Pulse Path */}
                  <path
                    d="M 20 88 h 18 v -32 h 10 v 32 h 26 v -42 h 10 v 42 h 20 v -26 h 10 v 26 h 32 v -46 h 10 v 46 h 24 v -22 h 10 v 22 h 34 v -38 h 10 v 38 h 28 v -20 h 10 v 20 h 28 v -44 h 10 v 44 h 26 v -30 h 10 v 30 h 26"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Animated Token Emission Pulse */}
                  <circle
                    cx={30 + ((simTick * 5) % 380)}
                    cy="88"
                    r="4"
                    fill="#ffffff"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />

                  <text x="24" y="110" fill="#64748b" style={{ fontSize: 9, fontFamily: "monospace" }}>
                    1 TOKEN EMITTED PER BURST →
                  </text>
                  <text x="416" y="110" textAnchor="end" fill="#64748b" style={{ fontSize: 9, fontFamily: "monospace" }}>
                    42 MS / TOKEN
                  </text>
                </svg>
              </div>
            </article>
          )}
        </div>

        {/* Architectural Insight Takeaway */}
        <div className="takeaway-bar reveal">
          <div className="takeaway-badge">
            <span>⚡</span>
            <span>WHY IT MATTERS</span>
          </div>
          <p className="takeaway-text">
            <strong>The Architectural Mismatch:</strong> Sizing a single homogeneous cluster for <em>Decode</em> starves <em>Prefill</em> of compute throughput; sizing for <em>Prefill</em> wastes massive power and cooling envelope during intermittent <em>Decode</em> memory bandwidth stalls. USDC solves this by co-locating both roles with tailored feeds inside one pod.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Ra2InsightPhasesSection;
