"use client";

import React from "react";

export function Ra3SituationSection() {
  return (
    <section className="ra3-situation-section" aria-labelledby="ra3-sit">
      <div className="ra3-situation-container">
        {/* Header */}
        {/* Meta & Eyebrow Row */}
        <div className="ra3-sit-top-meta">
          <div className="ra3-sit-meta-row">
            <span className="ra3-sit-index">01 / 07</span>
          </div>
          <div className="ra3-sit-eyebrow-row">
            <span className="ra3-sit-eyebrow-dash">—</span>
            <span className="ra3-sit-eyebrow-text">THE SITUATION</span>
          </div>
        </div>

        {/* Header */}
        <div className="ra3-sit-head">
          <div className="ra3-sit-head-left">
            <h2 id="ra3-sit" className="ra3-sit-title">
              The same prefix,<br />resent on every turn.
            </h2>
          </div>

          <div className="ra3-sit-head-right">
            <p className="ra3-sit-lead">
              Agentic and long context workloads resend the same prompt prefix on every turn. Each repeat that lands on a node without the cache pays the full prefill cost again.
            </p>
            <p className="ra3-sit-lead" style={{ marginTop: "14px" }}>
              The user sees it as time to first token, and the operator sees it as GPU hours spent recomputing something that was already computed an hour ago.
            </p>
          </div>
        </div>

        {/* Visual Canvas Box */}
        <div className="ra3-sit-canvas-box">
          <div className="ra3-sit-canvas-header">
            <span className="ra3-canvas-eyebrow">AGENT TURNS</span>
          </div>

          {/* Turns Horizontal Flow */}
          <div className="ra3-turns-flow-wrapper">
            <div className="ra3-turns-flow">
              {/* Turn 1 (Blue) */}
              <div className="turn-card turn-blue">
                <span className="turn-title title-blue">TURN 1</span>
                <span className="turn-sub">PREFIX</span>
                <span className="turn-sub">FULL PREFILL</span>
              </div>

              <span className="turn-arrow" aria-hidden="true">→</span>

              {/* Turn 2 (Amber) */}
              <div className="turn-card turn-amber">
                <span className="turn-title title-amber">TURN 2</span>
                <span className="turn-sub">SAME PREFIX</span>
                <span className="turn-sub">RECOMPUTED</span>
              </div>

              <span className="turn-arrow" aria-hidden="true">→</span>

              {/* Turn 3 (Amber) */}
              <div className="turn-card turn-amber">
                <span className="turn-title title-amber">TURN 3</span>
                <span className="turn-sub">SAME PREFIX</span>
                <span className="turn-sub">RECOMPUTED</span>
              </div>

              <span className="turn-arrow" aria-hidden="true">→</span>

              {/* Turn 4 (Amber) */}
              <div className="turn-card turn-amber">
                <span className="turn-title title-amber">TURN 4</span>
                <span className="turn-sub">SAME PREFIX</span>
                <span className="turn-sub">RECOMPUTED</span>
              </div>

              <div className="turns-ellipsis-wrap">
                <span className="turns-dots">...</span>
                <span className="turns-every-tag">EVERY TURN</span>
              </div>
            </div>

            {/* Baseline Timeline */}
            <div className="ra3-timeline-bar" aria-hidden="true">
              <div className="timeline-segment segment-blue">
                <span className="timeline-dot dot-blue" />
              </div>
              <div className="timeline-segment segment-amber">
                <span className="timeline-dot dot-amber" />
              </div>
              <div className="timeline-segment segment-amber">
                <span className="timeline-dot dot-amber" />
              </div>
              <div className="timeline-segment segment-amber">
                <span className="timeline-dot dot-amber" />
              </div>
              <div className="timeline-segment segment-dashed" />
            </div>
          </div>

          {/* Cost Metrics 2-Column Row */}
          <div className="ra3-cost-cards-grid">
            <div className="cost-col">
              <span className="cost-tag tag-blue">COST THE USER SEES</span>
              <h3 className="cost-val">Time to first token</h3>
            </div>

            <div className="cost-divider" aria-hidden="true" />

            <div className="cost-col">
              <span className="cost-tag tag-amber">COST THE OPERATOR SEES</span>
              <h3 className="cost-val">GPU hours</h3>
            </div>
          </div>

          {/* Bottom Line Bar */}
          <div className="ra3-bottom-line-card">
            <span className="bottom-line-tag">BOTTOM LINE</span>
            <div className="bottom-line-divider" aria-hidden="true" />
            <div className="bottom-line-body">
              <p className="bottom-line-text">
                Repeated prefix without cache locality = repeated full prefill cost.<br />
                Bad for latency. Bad for efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ra3-situation-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .ra3-situation-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* ═══ Meta & Eyebrow row ═══ */
        .ra3-sit-top-meta {
          margin-bottom: 16px;
        }

        .ra3-sit-meta-row {
          margin-bottom: 12px;
        }

        .ra3-sit-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .ra3-sit-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ra3-sit-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra3-sit-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* ═══ Header Section: 50/50 Equal Split ═══ */
        .ra3-sit-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(32px, 5vw, 56px);
        }

        .ra3-sit-head-left {
          display: flex;
          flex-direction: column;
        }

        .ra3-sit-title {
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .ra3-sit-head-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 4px;
        }

        .ra3-sit-lead {
          font-size: clamp(15px, 1.15vw, 16.5px);
          line-height: 1.62;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }

        /* ═══ Canvas Box ═══ */
        .ra3-sit-canvas-box {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 16px;
          padding: clamp(24px, 3.5vw, 36px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .ra3-sit-canvas-header {
          margin-bottom: 24px;
        }

        .ra3-canvas-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Turns Flow */
        .ra3-turns-flow-wrapper {
          width: 100%;
          margin-bottom: 28px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .ra3-turns-flow {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 680px;
          margin-bottom: 18px;
        }

        .turn-card {
          border-radius: 10px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 128px;
          flex: 1;
        }

        .turn-blue {
          background: rgba(14, 38, 74, 0.6);
          border: 1px solid #38bdf8;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }

        .turn-amber {
          background: rgba(36, 24, 10, 0.45);
          border: 1px solid rgba(245, 158, 11, 0.5);
        }

        .turn-title {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .title-blue {
          color: #38bdf8;
        }

        .title-amber {
          color: #fbbf24;
        }

        .turn-sub {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .turn-arrow {
          color: rgba(255, 255, 255, 0.35);
          font-size: 16px;
          flex-shrink: 0;
        }

        .turns-ellipsis-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: 8px;
          flex-shrink: 0;
        }

        .turns-dots {
          color: #64748b;
          font-size: 18px;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        .turns-every-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          letter-spacing: 0.14em;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Timeline Baseline */
        .ra3-timeline-bar {
          display: flex;
          align-items: center;
          height: 12px;
          width: 100%;
          min-width: 680px;
        }

        .timeline-segment {
          flex: 1;
          height: 1px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .segment-blue {
          background: #38bdf8;
        }

        .segment-amber {
          background: rgba(245, 158, 11, 0.6);
        }

        .segment-dashed {
          background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 4px, transparent 4px, transparent 8px);
          height: 1px;
          flex: 0.7;
        }

        .timeline-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .dot-blue {
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        .dot-amber {
          background: #fbbf24;
          box-shadow: 0 0 8px #fbbf24;
        }

        /* ═══ Cost Cards Grid ═══ */
        .ra3-cost-cards-grid {
          background: rgba(6, 12, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 20px 24px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          margin-bottom: 20px;
        }

        .cost-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cost-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .tag-blue {
          color: #38bdf8;
        }

        .tag-amber {
          color: #fbbf24;
        }

        .cost-val {
          font-size: clamp(17px, 1.3vw, 20px);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .cost-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
          align-self: stretch;
        }

        /* ═══ Bottom Line Box ═══ */
        .ra3-bottom-line-card {
          background: rgba(6, 12, 24, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .bottom-line-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .bottom-line-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .bottom-line-body {
          flex: 1;
        }

        .bottom-line-text {
          font-size: 13px;
          line-height: 1.5;
          color: #cbd5e1;
          margin: 0;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 900px) {
          .ra3-sit-head {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .ra3-sit-vertical-divider {
            display: none;
          }

          .ra3-cost-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .cost-divider {
            display: none;
          }

          .ra3-bottom-line-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .bottom-line-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
