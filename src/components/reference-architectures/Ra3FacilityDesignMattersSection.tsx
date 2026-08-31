"use client";

import React from "react";

export function Ra3FacilityDesignMattersSection() {
  return (
    <section className="ra3-facility-section" aria-labelledby="ra3-res">
      <div className="ra3-facility-container">
        {/* Header */}
        <div className="ra3-facility-head">
          <div className="ra3-facility-head-left">
            <div className="ra3-facility-meta-row">
              <span className="ra3-facility-index">05 / 07</span>
            </div>
            <div className="ra3-facility-eyebrow-row">
              <span className="ra3-facility-eyebrow-dash">—</span>
              <span className="ra3-facility-eyebrow-text">PUBLISHED RESULTS</span>
            </div>
            <h2 id="ra3-res" className="ra3-facility-title">
              Why the facility<br />design matters<span className="title-dot">.</span>
            </h2>
          </div>

          <div className="ra3-facility-vertical-divider" aria-hidden="true" />

          <div className="ra3-facility-head-right">
            <p className="ra3-facility-lead">
              The published results on agentic traces are the<br className="desktop-br" />
              reason this matters. They describe what the<br className="desktop-br" />
              software layer achieves.
            </p>
          </div>
        </div>

        {/* Main 5 Metrics Canvas Box */}
        <div className="ra3-metrics-canvas-card">
          {/* Top Connected Timeline Bar */}
          <div className="ra3-metrics-top-line" aria-hidden="true">
            <div className="line-node"><span className="line-dot" /></div>
            <div className="line-node"><span className="line-dot" /></div>
            <div className="line-node"><span className="line-dot" /></div>
            <div className="line-node"><span className="line-dot" /></div>
            <div className="line-node"><span className="line-dot" /></div>
          </div>

          {/* 5 Metrics Grid */}
          <div className="ra3-metrics-grid">
            {/* Metric 1 */}
            <div className="metric-col">
              <div className="metric-val-wrap">
                <span className="metric-num">1.7</span>
                <span className="metric-arrow">→</span>
                <span className="metric-num">92.2</span>
                <span className="metric-unit-pct">%</span>
              </div>
              <p className="metric-label">Cache hit rate</p>
              <div className="metric-divider line-accent-blue" aria-hidden="true" />
              <p className="metric-source">
                Codex traces &nbsp;•&nbsp; vLLM +<br />Mooncake
              </p>
            </div>

            {/* Metric 2 */}
            <div className="metric-col">
              <div className="metric-val-wrap">
                <span className="metric-num">3.8</span>
                <span className="metric-multiplier">×</span>
              </div>
              <p className="metric-label">Throughput<br />improvement</p>
              <div className="metric-divider line-muted" aria-hidden="true" />
              <p className="metric-source">
                Codex traces &nbsp;•&nbsp; vLLM +<br />Mooncake
              </p>
            </div>

            {/* Metric 3 */}
            <div className="metric-col">
              <div className="metric-val-wrap">
                <span className="metric-num">46</span>
                <span className="metric-multiplier">×</span>
              </div>
              <p className="metric-label">Median time to<br />first token, lower</p>
              <div className="metric-divider line-muted" aria-hidden="true" />
              <p className="metric-source">
                Codex traces &nbsp;•&nbsp; vLLM +<br />Mooncake
              </p>
            </div>

            {/* Metric 4 */}
            <div className="metric-col">
              <div className="metric-val-wrap">
                <span className="metric-num">8.6</span>
                <span className="metric-multiplier">×</span>
              </div>
              <p className="metric-label">End-to-end latency,<br />lower</p>
              <div className="metric-divider line-muted" aria-hidden="true" />
              <p className="metric-source">
                Codex traces &nbsp;•&nbsp; vLLM +<br />Mooncake
              </p>
            </div>

            {/* Metric 5 */}
            <div className="metric-col">
              <div className="metric-val-wrap">
                <span className="metric-num">60</span>
                <span className="metric-unit-gpus">GPUs</span>
              </div>
              <p className="metric-label">
                Near-linear throughput<br />
                scaling to 60 GB200 GPUs,<br />
                hit rate held above 95%
              </p>
              <div className="metric-divider line-accent-blue" aria-hidden="true" />
              <p className="metric-source">
                Codex traces &nbsp;•&nbsp; vLLM +<br />Mooncake
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Banner */}
        <div className="ra3-attribution-card">
          <div className="attrib-left">
            <div className="attrib-bar" aria-hidden="true" />
            <span className="attrib-tag">ATTRIBUTION</span>
          </div>

          <div className="attrib-divider" aria-hidden="true" />

          <div className="attrib-right">
            <p className="attrib-text">
              These are published benchmark figures from the vLLM and Mooncake teams, measured on their traces and their hardware. They describe what the software layer achieves. <strong className="highlight-white">USDC</strong> cites them to explain why the facility design matters. They are not a <strong className="highlight-amber">USDC</strong> measured result.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ra3-facility-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .ra3-facility-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* ═══ Header ═══ */
        .ra3-facility-head {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) auto minmax(0, 1.25fr);
          align-items: center;
          gap: clamp(24px, 4vw, 56px);
          margin-bottom: clamp(40px, 5vw, 64px);
        }

        .ra3-facility-head-left {
          display: flex;
          flex-direction: column;
        }

        .ra3-facility-meta-row {
          margin-bottom: 12px;
        }

        .ra3-facility-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .ra3-facility-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .ra3-facility-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra3-facility-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra3-facility-title {
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .title-dot {
          color: #38bdf8;
        }

        .ra3-facility-vertical-divider {
          width: 1px;
          min-height: 90px;
          background: rgba(255, 255, 255, 0.1);
          align-self: stretch;
        }

        .ra3-facility-head-right {
          display: flex;
          align-items: center;
        }

        .ra3-facility-lead {
          font-size: clamp(15px, 1.15vw, 16.5px);
          line-height: 1.62;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }

        .desktop-br {
          display: inline;
        }

        /* ═══ Main 5 Metrics Canvas Box ═══ */
        .ra3-metrics-canvas-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 16px;
          padding: 24px clamp(20px, 3vw, 36px) clamp(28px, 3.5vw, 36px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        /* Top Connected Line */
        .ra3-metrics-top-line {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(16px, 2.5vw, 32px);
          height: 14px;
          margin-bottom: 24px;
        }

        .ra3-metrics-top-line::before {
          content: "";
          position: absolute;
          left: 4px;
          right: calc((100% - 4 * clamp(16px, 2.5vw, 32px)) / 5 - 4px);
          top: 50%;
          height: 1.5px;
          background: rgba(56, 189, 248, 0.38);
          transform: translateY(-50%);
          z-index: 1;
        }

        .line-node {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
        }

        .line-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          position: relative;
          z-index: 2;
        }

        /* 5 Metrics Grid */
        .ra3-metrics-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(16px, 2.5vw, 32px);
        }

        .metric-col {
          display: flex;
          flex-direction: column;
        }

        .metric-val-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .metric-num {
          font-size: clamp(28px, 2.8vw, 36px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .metric-arrow {
          color: #38bdf8;
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 700;
          margin: 0 2px;
        }

        .metric-unit-pct {
          color: #38bdf8;
          font-size: clamp(16px, 1.4vw, 20px);
          font-weight: 700;
          margin-left: 2px;
        }

        .metric-multiplier {
          color: #38bdf8;
          font-size: clamp(18px, 1.6vw, 22px);
          font-weight: 700;
          margin-left: 4px;
        }

        .metric-unit-gpus {
          color: #94a3b8;
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-left: 6px;
        }

        .metric-label {
          font-size: 13.5px;
          line-height: 1.45;
          color: #cbd5e1;
          margin: 0;
          min-height: 48px;
        }

        .metric-divider {
          width: 28px;
          height: 1px;
          margin: 20px 0 14px;
        }

        .line-accent-blue {
          background: #38bdf8;
          box-shadow: 0 0 6px rgba(56, 189, 248, 0.6);
        }

        .line-muted {
          background: rgba(255, 255, 255, 0.12);
        }

        .metric-source {
          font-size: 11px;
          line-height: 1.45;
          color: #64748b;
          margin: 0;
        }

        /* ═══ Attribution Banner ═══ */
        .ra3-attribution-card {
          background: #040914;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }

        .attrib-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .attrib-bar {
          width: 3px;
          height: 34px;
          background: #f59e0b;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
        }

        .attrib-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          letter-spacing: 0.16em;
          color: #fbbf24;
          font-weight: 700;
          text-transform: uppercase;
        }

        .attrib-divider {
          width: 1px;
          height: 34px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .attrib-right {
          flex: 1;
        }

        .attrib-text {
          font-size: 13.5px;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .highlight-white {
          color: #ffffff;
          font-weight: 600;
        }

        .highlight-amber {
          color: #fbbf24;
          font-weight: 600;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 1024px) {
          .ra3-metrics-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          .ra3-metrics-top-line {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .ra3-facility-head {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .ra3-facility-vertical-divider {
            display: none;
          }

          .desktop-br {
            display: none;
          }

          .ra3-metrics-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .metric-label {
            min-height: auto;
          }

          .ra3-attribution-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .attrib-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
