"use client";

import React from "react";

export function Ra1SituationSection() {
  return (
    <section className="ra1-situation-section" aria-labelledby="ra1-sit">
      <div className="ra1-situation-container">
        {/* Header */}
        {/* Meta & Eyebrow Row */}
        <div className="ra1-sit-top-meta">
          <div className="ra1-sit-meta-row">
            <span className="ra1-sit-index">01 / 07</span>
          </div>
          <div className="ra1-sit-eyebrow-row">
            <span className="ra1-sit-eyebrow-dash">—</span>
            <span className="ra1-sit-eyebrow-text">THE SITUATION</span>
          </div>
        </div>

        {/* Section Header: Two Column Left Title / Right Context */}
        <div className="ra1-sit-head">
          <div className="ra1-sit-head-left">
            <h2 id="ra1-sit" className="ra1-sit-title">
              A funded near term and an<br />unforecastable curve.
            </h2>
          </div>

          <div className="ra1-sit-head-right">
            <p className="ra1-sit-lead">
              An AI company has a funded workload for the next twelve months and a demand curve after that which nobody can forecast honestly. It needs two to three megawatts of capacity now.
            </p>
          </div>
        </div>

        {/* Visual Canvas Box */}
        <div className="ra1-sit-canvas-box">
          {/* Top Status Cards: Now vs Future */}
          <div className="ra1-now-future-grid">
            {/* 01 NOW */}
            <div className="ra1-status-card now-card">
              <div className="ra1-status-head">
                <span className="ra1-badge badge-cyan">01 NOW · COMMITTED</span>
                <span className="ra1-status-led led-cyan" />
              </div>
              <div className="ra1-status-body">
                <div className="ra1-metric-val">
                  2–3<span className="unit">MW</span>
                </div>
                <p className="ra1-metric-desc">
                  Funded near-term workload. The number the company can defend today.
                </p>
              </div>
              <div className="ra1-status-foot">
                <span className="ra1-foot-pill pill-cyan">● Funded &amp; active</span>
              </div>
            </div>

            {/* Connecting Transition Indicator */}
            <div className="ra1-status-connector" aria-hidden="true">
              <div className="connector-line">
                <span className="line-solid" />
                <span className="line-dashed" />
                <svg className="connector-arrow" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M6 3 L11 8 L6 13" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="connector-label">12 MONTH CLIFF</span>
            </div>

            {/* 02 FUTURE */}
            <div className="ra1-status-card future-card">
              <div className="ra1-status-head">
                <span className="ra1-badge badge-amber">02 FUTURE · UNKNOWN</span>
                <span className="ra1-status-led led-amber" />
              </div>
              <div className="ra1-status-body">
                <div className="ra1-metric-val val-amber">
                  ?<span className="unit">UNCERTAIN</span>
                </div>
                <p className="ra1-metric-desc">
                  Demand curve uncertain. A build-to-suit asks for a shell sized for the whole curve.
                </p>
              </div>
              <div className="ra1-status-foot">
                <span className="ra1-foot-pill pill-amber">○ Unforecastable scale</span>
              </div>
            </div>
          </div>

          {/* SVG Demand Curve Chart Container */}
          <div className="ra1-chart-wrapper">
            <div className="ra1-chart-header">
              <div className="ra1-chart-title-box">
                <span className="chart-mono-label">CAPACITY FORECAST TRAJECTORY</span>
                <span className="chart-mono-sub">COMMITMENT BOUNDARY VS BUILD-TO-SUIT SHELL</span>
              </div>
              <div className="ra1-chart-legend">
                <span className="legend-item"><i className="legend-dot cyan" /> Funded demand (0–12 mo)</span>
                <span className="legend-item"><i className="legend-dot amber" /> Diverging cone (12 mo+)</span>
                <span className="legend-item"><i className="legend-dot dashed" /> BTS Shell Sizing</span>
              </div>
            </div>

            <div className="ra1-svg-viewport">
              <svg viewBox="0 0 900 240" className="ra1-demand-svg" preserveAspectRatio="none" aria-label="Capacity demand curve vs build-to-suit ceiling">
                <defs>
                  {/* Cyan Area Gradient */}
                  <linearGradient id="ra1-funded-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
                  </linearGradient>

                  {/* Amber Uncertainty Cone Gradient */}
                  <linearGradient id="ra1-amber-cone" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.16" />
                  </linearGradient>

                  {/* Linear gradient for the line glow */}
                  <linearGradient id="ra1-line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>

                {/* Background Grid Lines */}
                <line x1="40" y1="45" x2="860" y2="45" stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="3 4" />
                <line x1="40" y1="95" x2="860" y2="95" stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="3 4" />
                <line x1="40" y1="145" x2="860" y2="145" stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="3 4" />
                <line x1="40" y1="195" x2="860" y2="195" stroke="rgba(56, 189, 248, 0.18)" />

                {/* 12-Month Vertical Divider Line */}
                <line x1="330" y1="35" x2="330" y2="195" stroke="rgba(56, 189, 248, 0.35)" strokeDasharray="2 3" />

                {/* 0-12 Month Funded Region Fill */}
                <polygon points="40,195 40,175 140,165 240,145 330,118 330,195" fill="url(#ra1-funded-grad)" />

                {/* 12M+ Uncertainty Cone Fill */}
                <polygon points="330,118 480,82 640,60 860,48 860,168 640,152 480,135 330,118" fill="url(#ra1-amber-cone)" />

                {/* Build-To-Suit Ceiling Line */}
                <line x1="40" y1="45" x2="860" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.6" />

                {/* Ceiling Badge / Text */}
                <rect x="44" y="32" width="410" height="22" rx="3" fill="#040914" stroke="rgba(148, 163, 184, 0.3)" />
                <text x="52" y="47" fill="#cbd5e1" fontSize="10.5" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.08em">
                  BUILD-TO-SUIT SHELL · SIZED ONCE, OCCUPIED IN 18–24 MONTHS
                </text>

                {/* Funded Curve (0 - 12 Months) */}
                <path d="M40 175 C140 165 240 145 330 118" fill="none" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M40 175 C140 165 240 145 330 118" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="7" strokeLinecap="round" />

                {/* Diverging Uncertainty Curves (12+ Months) */}
                {/* Upper Path (Aggressive growth) */}
                <path d="M330 118 C480 82 640 60 860 48" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
                {/* Mid Path (Steady growth) */}
                <path d="M330 118 C480 110 640 102 860 96" fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 3" strokeOpacity="0.75" />
                {/* Lower Path (Plateau / slow growth) */}
                <path d="M330 118 C480 135 640 152 860 168" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />

                {/* Target Waypoint Node at 12-Month Mark */}
                <circle cx="330" cy="118" r="8" fill="rgba(56, 189, 248, 0.25)" />
                <circle cx="330" cy="118" r="4.5" fill="#38bdf8" stroke="#040914" strokeWidth="1.5" />
                <circle cx="330" cy="118" r="1.5" fill="#ffffff" />

                {/* 12-Month Annotation Tag */}
                <rect x="260" y="90" width="140" height="18" rx="3" fill="#040914" stroke="rgba(56, 189, 248, 0.5)" />
                <text x="330" y="103" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono, monospace)" fontWeight="700" textAnchor="middle">
                  2–3 MW COMMITMENT
                </text>

                {/* X-Axis Ticks & Labels */}
                <text x="40" y="214" fill="#60a5fa" fontSize="10" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.05em">
                  0 – 12 MONTHS · FUNDED
                </text>
                <text x="345" y="214" fill="#f59e0b" fontSize="10" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.05em">
                  12 MONTHS + · NOT FORECASTABLE
                </text>
                <text x="860" y="214" fill="#94a3b8" fontSize="10" fontFamily="var(--font-mono, monospace)" fontWeight="600" textAnchor="end" letterSpacing="0.08em">
                  TIME →
                </text>
              </svg>
            </div>

            {/* Bottom Timeline Segment Strip */}
            <div className="ra1-timeline-strip">
              <div className="strip-funded">
                <span className="strip-dot cyan" />
                <span className="strip-text">0–12 MO: KNOWN WORKLOAD (HIGH CONFIDENCE)</span>
              </div>
              <div className="strip-unknown">
                <span className="strip-dot amber" />
                <span className="strip-text">12+ MO: UNPREDICTABLE SCALE (CAPITAL AT RISK)</span>
              </div>
            </div>
          </div>

          {/* Bottom Reality Comparison 2-Column Cards */}
          <div className="ra1-reality-grid">
            {/* Reality Card 1 */}
            <div className="ra1-reality-card">
              <div className="ra1-reality-header">
                <span className="ra1-reality-dash">—</span>
                <span className="ra1-reality-tag">THE BUILD-TO-SUIT REALITY</span>
              </div>
              <p className="ra1-reality-text">
                A build-to-suit data center asks the company to commit to a shell sized for the whole curve, then wait eighteen to twenty four months to occupy it.
              </p>
            </div>

            <div className="ra1-reality-divider" aria-hidden="true" />

            {/* Reality Card 2 */}
            <div className="ra1-reality-card">
              <div className="ra1-reality-header">
                <span className="ra1-reality-dash">—</span>
                <span className="ra1-reality-tag">THE REALITY</span>
              </div>
              <p className="ra1-reality-text">
                The company signs for what it can defend today, but the facility it signed into was designed once—around one power topology, one cooling loop, and one rack density.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ra1-situation-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #02060e;
          color: #ffffff;
          position: relative;
        }

        .ra1-situation-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 32px);
        }

        /* ═══ Meta & Eyebrow row ═══ */
        .ra1-sit-top-meta {
          margin-bottom: 16px;
        }

        .ra1-sit-meta-row {
          margin-bottom: 8px;
        }

        .ra1-sit-index {
          font-family: var(--font-mono, monospace);
          font-size: clamp(12px, 1.1vw, 14px);
          color: #38bdf8;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .ra1-sit-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ra1-sit-eyebrow-dash {
          color: #38bdf8;
          font-weight: 700;
        }

        .ra1-sit-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: clamp(11px, 1vw, 13px);
          color: #38bdf8;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* ═══ Header Section: 50/50 Equal Split ═══ */
        .ra1-sit-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: start;
          margin-bottom: clamp(32px, 5vw, 56px);
        }

        .ra1-sit-head-left {
          display: flex;
          flex-direction: column;
        }

        .ra1-sit-title {
          font-size: clamp(26px, 3vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
        }

        .ra1-sit-head-right {
          display: flex;
          align-items: flex-start;
          padding-top: 4px;
        }

        .ra1-sit-lead {
          font-size: clamp(15px, 1.3vw, 18px);
          line-height: 1.65;
          color: #cbd5e1;
          margin: 0;
        }

        /* Visual Canvas Box */
        .ra1-sit-canvas-box {
          background: rgba(4, 9, 20, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 16px;
          padding: clamp(20px, 3vw, 36px);
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(12, 40, 90, 0.15);
          position: relative;
        }

        /* Top Status Grid (Now vs Future) */
        .ra1-now-future-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: clamp(16px, 2.5vw, 32px);
          align-items: stretch;
          margin-bottom: clamp(24px, 3.5vw, 40px);
        }

        .ra1-status-card {
          border-radius: 12px;
          padding: clamp(16px, 2vw, 24px);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.25s ease;
        }

        .now-card {
          background: rgba(6, 18, 38, 0.7);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(56, 189, 248, 0.06);
        }

        .future-card {
          background: rgba(26, 18, 6, 0.6);
          border: 1px solid rgba(245, 158, 11, 0.35);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(245, 158, 11, 0.06);
        }

        .ra1-status-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .ra1-badge {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .badge-cyan {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .badge-amber {
          background: rgba(245, 158, 11, 0.12);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .ra1-status-led {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .led-cyan {
          background: #38bdf8;
          box-shadow: 0 0 8px 1px rgba(56, 189, 248, 0.8);
        }

        .led-amber {
          background: #f59e0b;
          box-shadow: 0 0 8px 1px rgba(245, 158, 11, 0.8);
        }

        .ra1-metric-val {
          font-family: var(--font-mono, monospace);
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .ra1-metric-val .unit {
          font-size: clamp(14px, 1.5vw, 18px);
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 0.08em;
        }

        .val-amber {
          color: #fde68a;
        }

        .val-amber .unit {
          color: #f59e0b;
        }

        .ra1-metric-desc {
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.5;
          color: #94a3b8;
          margin: 0 0 16px;
        }

        .ra1-status-foot {
          margin-top: auto;
          display: flex;
        }

        .ra1-foot-pill {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .pill-cyan {
          background: rgba(56, 189, 248, 0.08);
          color: #7dd3fc;
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .pill-amber {
          background: rgba(245, 158, 11, 0.08);
          color: #fde68a;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        /* Connector */
        .ra1-status-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .connector-line {
          display: flex;
          align-items: center;
          width: 90px;
        }

        .line-solid {
          flex: 1;
          height: 2px;
          background: #38bdf8;
        }

        .line-dashed {
          flex: 1;
          height: 2px;
          border-top: 2px dashed #f59e0b;
        }

        .connector-arrow {
          margin-left: -4px;
        }

        .connector-label {
          font-family: var(--font-mono, monospace);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #64748b;
          white-space: nowrap;
        }

        /* Chart Wrapper */
        .ra1-chart-wrapper {
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          background: rgba(2, 6, 15, 0.95);
          padding: clamp(16px, 2.2vw, 24px);
          margin-bottom: clamp(20px, 3vw, 32px);
          box-shadow: inset 0 0 40px rgba(12, 40, 90, 0.12);
        }

        .ra1-chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ra1-chart-title-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .chart-mono-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #38bdf8;
        }

        .chart-mono-sub {
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          color: #64748b;
          letter-spacing: 0.08em;
        }

        .ra1-chart-legend {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: #94a3b8;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          display: inline-block;
        }

        .legend-dot.cyan {
          background: #38bdf8;
          box-shadow: 0 0 6px rgba(56, 189, 248, 0.7);
        }

        .legend-dot.amber {
          background: #f59e0b;
          box-shadow: 0 0 6px rgba(245, 158, 11, 0.7);
        }

        .legend-dot.dashed {
          background: #94a3b8;
        }

        .ra1-svg-viewport {
          width: 100%;
          position: relative;
        }

        .ra1-demand-svg {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
        }

        /* Timeline Strip */
        .ra1-timeline-strip {
          display: grid;
          grid-template-columns: 330fr 570fr;
          gap: 8px;
          margin-top: 12px;
          border-top: 1px solid rgba(56, 189, 248, 0.15);
          padding-top: 10px;
        }

        .strip-funded,
        .strip-unknown {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          letter-spacing: 0.06em;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .strip-funded {
          background: rgba(56, 189, 248, 0.08);
          color: #7dd3fc;
          border-left: 2px solid #38bdf8;
        }

        .strip-unknown {
          background: rgba(245, 158, 11, 0.08);
          color: #fde68a;
          border-left: 2px solid #f59e0b;
        }

        .strip-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .strip-dot.cyan {
          background: #38bdf8;
        }

        .strip-dot.amber {
          background: #f59e0b;
        }

        /* Reality Comparison Grid */
        .ra1-reality-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: clamp(16px, 3vw, 32px);
          align-items: stretch;
          border-top: 1px solid rgba(56, 189, 248, 0.15);
          padding-top: clamp(18px, 2.5vw, 28px);
        }

        .ra1-reality-card {
          background: rgba(6, 14, 28, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 10px;
          padding: clamp(14px, 2vw, 20px);
        }

        .ra1-reality-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .ra1-reality-dash {
          color: #38bdf8;
          font-weight: 700;
        }

        .ra1-reality-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #38bdf8;
          text-transform: uppercase;
        }

        .ra1-reality-text {
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .ra1-reality-divider {
          width: 1px;
          align-self: stretch;
          background: linear-gradient(180deg, rgba(56, 189, 248, 0.3) 0%, transparent 100%);
        }

        @media (max-width: 860px) {
          .ra1-sit-head {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .ra1-sit-vertical-divider {
            display: none;
          }
          .ra1-now-future-grid {
            grid-template-columns: 1fr;
          }
          .ra1-status-connector {
            transform: rotate(90deg);
            padding: 10px 0;
          }
          .ra1-reality-grid {
            grid-template-columns: 1fr;
          }
          .ra1-reality-divider {
            display: none;
          }
          .ra1-timeline-strip {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
