"use client";

import React from "react";

export function Ra2EngineeringConstraintSection() {
  return (
    <section className="ra2-constraint-section" aria-labelledby="ra2-lim">
      <div className="ra2-constraint-container">
        {/* Left Column */}
        <div className="ra2-constraint-left">
          <div className="ra2-constraint-meta-row">
            <span className="ra2-constraint-index">07 / 07</span>
          </div>

          <div className="ra2-constraint-eyebrow-row">
            <span className="ra2-constraint-eyebrow-dash">—</span>
            <span className="ra2-constraint-eyebrow-text">ENGINEERING CONSTRAINT</span>
          </div>

          <h2 id="ra2-lim" className="ra2-constraint-title">
            What This Does<br />Not Solve
          </h2>

          <p className="ra2-constraint-subtitle">
            Disaggregation is not always faster.
          </p>

          <div className="ra2-constraint-prose">
            <p>
              Disaggregation pays off when prompts are long enough that the cache transfer costs less than recomputing prefill.
            </p>
            <p>
              For short prompts it can cost more than it saves.
            </p>
            <p>
              Production stacks handle this by deciding per request whether to disaggregate, and the pod supports both modes.
            </p>
          </div>

          {/* Callout Box */}
          <div className="ra2-honest-callout">
            <div className="ra2-honest-eyebrow-row">
              <span className="ra2-honest-dash">—</span>
              <span className="ra2-honest-eyebrow-text">THE HONEST VERSION</span>
            </div>
            <h3 className="ra2-honest-heading">
              The workload decides, not the building.
            </h3>
            <p className="ra2-honest-sub">
              Anyone who says disaggregation is always faster is selling rather than engineering.
            </p>
          </div>
        </div>

        {/* Right Column: Graph Box */}
        <div className="ra2-constraint-right">
          <div className="ra2-graph-card">
            {/* Header */}
            <div className="ra2-graph-header">
              <h3 className="ra2-graph-title">TRANSFER COST VS RECOMPUTE COST</h3>
              <span className="ra2-graph-sub">BREAK-EVEN ANALYSIS</span>
            </div>

            {/* Legend */}
            <div className="ra2-graph-legend">
              <div className="legend-item">
                <span className="legend-line line-blue" aria-hidden="true" />
                <span className="legend-text text-blue">TRANSFER KV CACHE COST</span>
              </div>
              <div className="legend-item">
                <span className="legend-line line-gold" aria-hidden="true" />
                <span className="legend-text text-gold">RECOMPUTE PREFILL COST</span>
              </div>
            </div>

            {/* SVG Graph Canvas */}
            <div className="ra2-svg-wrap">
              <svg viewBox="0 0 540 300" className="ra2-graph-svg">
                <defs>
                  {/* Glowing Filter for Intersection Point */}
                  <filter id="glow-circle" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Y-Axis Labels */}
                <text x="35" y="24" className="svg-axis-title">COST</text>
                <text x="35" y="65" className="svg-label-y">HIGH</text>
                <text x="35" y="165" className="svg-label-y">MEDIUM</text>
                <text x="35" y="265" className="svg-label-y">LOW</text>

                {/* Grid Axes Lines */}
                <line x1="60" y1="50" x2="60" y2="270" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="60" y1="270" x2="520" y2="270" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                {/* Horizontal reference dashed line through medium */}
                <line x1="60" y1="165" x2="510" y2="165" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" strokeWidth="1" />

                {/* Vertical reference dashed line from Break-Even Point */}
                <line x1="285" y1="60" x2="285" y2="270" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1" />

                {/* Blue Curve: Transfer KV Cache Cost (Starts high, decreases towards longer prompts) */}
                <path
                  d="M 60 65 Q 180 120, 285 165 T 510 215"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Gold Line: Recompute Prefill Cost (Starts low, increases towards longer prompts) */}
                <path
                  d="M 60 255 Q 180 210, 285 165 T 510 80"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Break-Even Intersection Target Circle */}
                <g transform="translate(285, 165)">
                  <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
                  <circle cx="0" cy="0" r="6" fill="#040914" stroke="#ffffff" strokeWidth="2" filter="url(#glow-circle)" />
                  <circle cx="0" cy="0" r="2" fill="#38bdf8" />
                </g>

                {/* Break-Even Point Annotations */}
                <g transform="translate(285, 85)">
                  <text x="0" y="0" className="svg-be-tag">BREAK-EVEN POINT</text>
                  <text x="0" y="16" className="svg-be-desc">Transfer cost equals</text>
                  <text x="0" y="30" className="svg-be-desc">recompute cost</text>
                </g>

                {/* X-Axis Labels */}
                <text x="60" y="292" className="svg-label-x">SHORT PROMPTS</text>
                <text x="285" y="292" textAnchor="middle" className="svg-axis-title-x">PROMPT LENGTH</text>
                <text x="505" y="292" textAnchor="end" className="svg-label-x">LONGER PROMPTS</text>
              </svg>
            </div>

            {/* Bottom 2-Column Comparison Bar */}
            <div className="ra2-graph-comparison-grid">
              <div className="comp-col">
                <span className="comp-tag tag-blue">SHORT PROMPTS</span>
                <p className="comp-desc bold">Recompute is cheaper.</p>
                <p className="comp-sub">Disaggregation may cost more.</p>
              </div>

              <div className="comp-divider" aria-hidden="true" />

              <div className="comp-col">
                <span className="comp-tag tag-gold">LONGER PROMPTS</span>
                <p className="comp-desc bold">Transfer is cheaper.</p>
                <p className="comp-sub">Disaggregation pays off.</p>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="ra2-graph-footer-note">
              <span className="note-text">DECIDED PER REQUEST &nbsp;•&nbsp; POD SUPPORTS BOTH MODES</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ra2-constraint-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .ra2-constraint-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: start;
        }

        /* ═══ Left Column ═══ */
        .ra2-constraint-left {
          display: flex;
          flex-direction: column;
        }

        .ra2-constraint-meta-row {
          margin-bottom: 12px;
        }

        .ra2-constraint-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .ra2-constraint-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .ra2-constraint-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra2-constraint-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra2-constraint-title {
          font-size: clamp(34px, 3.8vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 16px;
        }

        .ra2-constraint-subtitle {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
          color: #cbd5e1;
          margin: 0 0 24px;
        }

        .ra2-constraint-prose {
          display: flex;
          flex-direction: column;
          gap: 14px;
          font-size: 14px;
          line-height: 1.65;
          color: #94a3b8;
          margin-bottom: 32px;
        }

        .ra2-constraint-prose p {
          margin: 0;
        }

        /* Callout Box */
        .ra2-honest-callout {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
        }

        .ra2-honest-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ra2-honest-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra2-honest-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra2-honest-heading {
          font-size: clamp(17px, 1.35vw, 20px);
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }

        .ra2-honest-sub {
          font-size: 13.5px;
          line-height: 1.48;
          color: #94a3b8;
          margin: 0;
        }

        /* ═══ Right Column (Graph Box) ═══ */
        .ra2-constraint-right {
          display: flex;
          flex-direction: column;
        }

        .ra2-graph-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 16px;
          padding: clamp(24px, 3vw, 32px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .ra2-graph-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }

        .ra2-graph-title {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          letter-spacing: 0.12em;
          color: #ffffff;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
        }

        .ra2-graph-sub {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.16em;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* Legend */
        .ra2-graph-legend {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-line {
          width: 18px;
          height: 2.5px;
          border-radius: 1px;
        }

        .line-blue {
          background: #38bdf8;
          box-shadow: 0 0 6px rgba(56, 189, 248, 0.6);
        }

        .line-gold {
          background: #facc15;
          box-shadow: 0 0 6px rgba(250, 204, 21, 0.6);
        }

        .legend-text {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .text-blue {
          color: #38bdf8;
        }

        .text-gold {
          color: #facc15;
        }

        /* SVG Graph Canvas */
        .ra2-svg-wrap {
          width: 100%;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .ra2-graph-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .svg-axis-title {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          fill: #64748b;
        }

        .svg-label-y {
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          fill: #64748b;
          text-anchor: end;
        }

        .svg-label-x {
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          fill: #64748b;
        }

        .svg-axis-title-x {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          fill: #94a3b8;
        }

        .svg-be-tag {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          fill: #38bdf8;
        }

        .svg-be-desc {
          font-size: 10.5px;
          fill: #cbd5e1;
          font-family: inherit;
        }

        /* ═══ Comparison Grid ═══ */
        .ra2-graph-comparison-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 18px;
          margin-top: 12px;
        }

        .comp-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .comp-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .tag-blue {
          color: #38bdf8;
        }

        .tag-gold {
          color: #facc15;
        }

        .comp-desc {
          font-size: 13px;
          color: #ffffff;
          margin: 0;
        }

        .comp-desc.bold {
          font-weight: 600;
        }

        .comp-sub {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        .comp-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
          align-self: stretch;
        }

        /* ═══ Footer Note ═══ */
        .ra2-graph-footer-note {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 14px;
          margin-top: 16px;
        }

        .note-text {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 960px) {
          .ra2-constraint-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .ra2-graph-legend {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .ra2-graph-comparison-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .comp-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
