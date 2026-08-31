"use client";

import React, { useState } from "react";

export function Ra2SituationSection() {
  const [activeCard, setActiveCard] = useState<number>(0);

  const cardInsights = [
    "A uniform block of identical GPUs optimized for training does not efficiently serve inference.",
    "Post-training idle capital: massive power and compute envelopes sit unutilized between training runs.",
    "A training pod's uniform topology creates extreme latency and bandwidth bottlenecks across inference prefill and decode."
  ];

  return (
    <section className="ra2-situation-section" aria-labelledby="ra2-sit">
      <div className="ra2-situation-container">
        {/* Meta & Eyebrow row */}
        <div className="ra2-sit-top-meta">
          <div className="ra2-sit-meta-row">
            <span className="ra2-sit-index">01 / 07</span>
          </div>
          <div className="ra2-sit-eyebrow-row">
            <span className="ra2-sit-eyebrow-dash">—</span>
            <span className="ra2-sit-eyebrow-text">THE SITUATION</span>
          </div>
        </div>

        {/* 2-Column Equal Header: Left Title + Right Lead */}
        <div className="ra2-sit-head">
          <div className="ra2-sit-head-left">
            <h2 id="ra2-sit" className="ra2-sit-title">
              A training pod becomes idle<br />capital the moment the run ends.
            </h2>
          </div>

          <div className="ra2-sit-head-right">
            <p className="ra2-sit-lead">
              The obvious answer is to serve inference on it. The less obvious problem is that inference is not one workload, and a pod configured as a uniform block of identical GPUs is the wrong shape for it.
            </p>
          </div>
        </div>

        {/* Visual Canvas Box */}
        <div className="ra2-sit-canvas-box">
          <div className="ra2-sit-canvas-header">
            <span className="ra2-canvas-eyebrow">WHAT HAPPENS AFTER TRAINING?</span>
            <p className="ra2-canvas-sub">There are three possible outcomes for a training pod. Click any card to inspect.</p>
          </div>

          {/* 3 Outcome Cards Grid */}
          <div className="ra2-cards-grid">
            {/* Card 1: TRAINING RUN */}
            <div
              className={`ra2-outcome-card ${activeCard === 0 ? "card-active" : "card-idle"}`}
              onClick={() => setActiveCard(0)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(0)}
              role="button"
              tabIndex={0}
              aria-pressed={activeCard === 0}
            >
              {activeCard === 0 && <span className="ra2-active-dot" aria-hidden="true" />}

              <div className="ra2-card-top">
                <div className={`ra2-card-icon ${activeCard === 0 ? "icon-blue" : "icon-muted"}`}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path
                      d="M12 2.5 L20.5 7.4 V17.2 L12 22.1 L3.5 17.2 V7.4 Z"
                      fill={activeCard === 0 ? "rgba(56, 189, 248, 0.15)" : "rgba(148, 163, 184, 0.08)"}
                      stroke={activeCard === 0 ? "#38bdf8" : "#94a3b8"}
                      strokeWidth="1.6"
                    />
                    <path d="M12 12.3 L20.5 7.4" stroke={activeCard === 0 ? "#38bdf8" : "#94a3b8"} strokeWidth="1.6" />
                    <path d="M12 12.3 V22.1" stroke={activeCard === 0 ? "#38bdf8" : "#94a3b8"} strokeWidth="1.6" />
                    <path d="M12 12.3 L3.5 7.4" stroke={activeCard === 0 ? "#38bdf8" : "#94a3b8"} strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="ra2-card-info">
                  <h3 className="ra2-card-title">TRAINING RUN</h3>
                  <p className="ra2-card-desc">Homogeneous GPU block</p>
                  <span className="ra2-card-bullet">• Fully used</span>
                </div>
              </div>

              <div className="ra2-card-bottom">
                <div className="ra2-bar-label-row">
                  <span className="ra2-bar-k">UTILIZATION</span>
                  <span className={`ra2-bar-v ${activeCard === 0 ? "val-blue" : "val-muted"}`}>100%</span>
                </div>
                <div className="ra2-progress-track">
                  <div className={`ra2-progress-fill ${activeCard === 0 ? "fill-100" : "fill-100-dim"}`} />
                </div>
              </div>
            </div>

            {/* Card 2: RUN ENDS */}
            <div
              className={`ra2-outcome-card ${activeCard === 1 ? "card-active" : "card-dashed"}`}
              onClick={() => setActiveCard(1)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(1)}
              role="button"
              tabIndex={0}
              aria-pressed={activeCard === 1}
            >
              {activeCard === 1 && <span className="ra2-active-dot" aria-hidden="true" />}

              <div className="ra2-card-top">
                <div className={`ra2-card-icon ${activeCard === 1 ? "icon-blue" : "icon-muted"}`}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" stroke={activeCard === 1 ? "#38bdf8" : "#94a3b8"} strokeWidth="1.8" />
                    <polyline points="12 7.5 12 12 15.5 14" stroke={activeCard === 1 ? "#38bdf8" : "#94a3b8"} strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="ra2-card-info">
                  <h3 className="ra2-card-title">RUN ENDS</h3>
                  <p className="ra2-card-desc">Idle capital</p>
                  <span className="ra2-card-bullet">• 0% cluster utilization</span>
                </div>
              </div>

              <div className="ra2-card-bottom">
                <div className="ra2-bar-label-row">
                  <span className="ra2-bar-k">UTILIZATION</span>
                  <span className={`ra2-bar-v ${activeCard === 1 ? "val-blue" : "val-muted"}`}>0%</span>
                </div>
                <div className="ra2-progress-track">
                  <div className="ra2-progress-fill fill-0" />
                </div>
              </div>
            </div>

            {/* Card 3: SERVE INFERENCE? */}
            <div
              className={`ra2-outcome-card ${activeCard === 2 ? "card-active" : "card-muted"}`}
              onClick={() => setActiveCard(2)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(2)}
              role="button"
              tabIndex={0}
              aria-pressed={activeCard === 2}
            >
              {activeCard === 2 && <span className="ra2-active-dot" aria-hidden="true" />}

              <div className="ra2-card-top">
                <div className={`ra2-card-icon ${activeCard === 2 ? "icon-blue" : "icon-cross"}`}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill={activeCard === 2 ? "rgba(56, 189, 248, 0.2)" : "rgba(37, 99, 235, 0.45)"}
                      stroke={activeCard === 2 ? "#38bdf8" : "#2563eb"}
                      strokeWidth="1.5"
                    />
                    <line x1="15" y1="9" x2="9" y2="15" stroke={activeCard === 2 ? "#38bdf8" : "#93c5fd"} strokeWidth="2" />
                    <line x1="9" y1="9" x2="15" y2="15" stroke={activeCard === 2 ? "#38bdf8" : "#93c5fd"} strokeWidth="2" />
                  </svg>
                </div>
                <div className="ra2-card-info">
                  <h3 className="ra2-card-title">SERVE INFERENCE?</h3>
                  <p className="ra2-card-desc">
                    Wrong shape for<br />two phases
                  </p>
                </div>
              </div>

              <div className="ra2-card-bottom">
                <div className="ra2-bar-label-row">
                  <span className="ra2-bar-k">IMPACT</span>
                  <span className="ra2-bar-v val-red">HIGH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer: Core Insight */}
          <div className="ra2-canvas-footer">
            <div className="ra2-insight-left">
              <div className="ra2-info-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <span className="ra2-insight-title">Core Insight</span>
            </div>

            <div className="ra2-insight-divider" aria-hidden="true" />

            <div className="ra2-insight-right">
              <p className="ra2-insight-text">
                {cardInsights[activeCard]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ra2-situation-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .ra2-situation-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* ═══ Meta & Eyebrow row ═══ */
        .ra2-sit-top-meta {
          margin-bottom: 16px;
        }

        .ra2-sit-meta-row {
          margin-bottom: 10px;
        }

        .ra2-sit-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .ra2-sit-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ra2-sit-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra2-sit-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* ═══ Header Section: 50/50 Equal Split ═══ */
        .ra2-sit-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(32px, 5vw, 56px);
        }

        .ra2-sit-head-left {
          display: flex;
          flex-direction: column;
        }

        .ra2-sit-title {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0;
        }

        .ra2-sit-head-right {
          display: flex;
          align-items: flex-start;
          padding-top: 4px;
        }

        .ra2-sit-lead {
          font-size: clamp(15px, 1.15vw, 17px);
          line-height: 1.65;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }

        /* ═══ Visual Canvas Box ═══ */
        .ra2-sit-canvas-box {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 16px;
          padding: clamp(24px, 3.5vw, 36px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .ra2-sit-canvas-header {
          margin-bottom: 24px;
        }

        .ra2-canvas-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .ra2-canvas-sub {
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
        }

        /* ═══ 3 Cards Grid ═══ */
        .ra2-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }

        .ra2-outcome-card {
          border-radius: 12px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 190px;
          position: relative;
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          user-select: none;
          outline: none;
        }

        .ra2-outcome-card:focus-visible {
          box-shadow: 0 0 0 2px #38bdf8;
        }

        .ra2-outcome-card:not(.card-active):hover {
          border-color: rgba(56, 189, 248, 0.45);
          background: rgba(10, 22, 45, 0.6);
          transform: translateY(-2px);
        }

        /* Active Card Style (applied to any clicked card) */
        .card-active {
          background: radial-gradient(circle at 80% 20%, rgba(29, 78, 216, 0.28) 0%, rgba(8, 18, 38, 0.85) 100%) !important;
          border: 1px solid #38bdf8 !important;
          box-shadow: 0 0 24px rgba(56, 189, 248, 0.22), inset 0 0 14px rgba(56, 189, 248, 0.06);
          transform: translateY(-2px);
        }

        .ra2-active-dot {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8, 0 0 16px #38bdf8;
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.8; }
        }

        /* Inactive Variants */
        .card-idle {
          background: rgba(6, 12, 24, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.18);
        }

        .card-dashed {
          background: rgba(6, 12, 24, 0.5);
          border: 1px dashed rgba(100, 140, 200, 0.35);
        }

        .card-muted {
          background: rgba(6, 12, 24, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Card Elements */
        .ra2-card-top {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .ra2-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-blue {
          background: radial-gradient(circle, rgba(14, 38, 74, 0.9) 0%, rgba(6, 16, 36, 0.9) 100%);
          border: 1px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.3);
        }

        .icon-muted {
          background: radial-gradient(circle, rgba(18, 24, 38, 0.9) 0%, rgba(8, 14, 26, 0.9) 100%);
          border: 1px solid rgba(100, 116, 139, 0.35);
        }

        .icon-cross {
          background: radial-gradient(circle, rgba(29, 78, 216, 0.35) 0%, rgba(10, 20, 44, 0.9) 100%);
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .ra2-card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ra2-card-title {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #ffffff;
          margin: 0;
        }

        .ra2-card-desc {
          font-size: 12.5px;
          line-height: 1.4;
          color: #94a3b8;
          margin: 0;
        }

        .ra2-card-bullet {
          font-size: 12px;
          color: #cbd5e1;
          margin-top: 2px;
        }

        /* Card Bottom */
        .ra2-card-bottom {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ra2-bar-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ra2-bar-k {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        .ra2-bar-v {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .val-blue {
          color: #38bdf8;
        }

        .val-muted {
          color: #64748b;
        }

        .val-red {
          color: #ef4444;
        }

        .ra2-progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .ra2-progress-fill {
          height: 100%;
          border-radius: 2px;
        }

        .fill-100 {
          width: 100%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        .fill-100-dim {
          width: 100%;
          background: #64748b;
        }

        .fill-0 {
          width: 0%;
        }

        /* ═══ Footer: Core Insight ═══ */
        .ra2-canvas-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .ra2-insight-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .ra2-info-badge {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: rgba(14, 38, 74, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
        }

        .ra2-insight-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
        }

        .ra2-insight-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.12);
          flex-shrink: 0;
        }

        .ra2-insight-right {
          flex: 1;
        }

        .ra2-insight-text {
          font-size: 13px;
          line-height: 1.5;
          color: #cbd5e1;
          margin: 0;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 900px) {
          .ra2-sit-head {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .ra2-sit-vertical-divider {
            display: none;
          }

          .ra2-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .ra2-canvas-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .ra2-insight-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
