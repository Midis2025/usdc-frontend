"use client";

import React from "react";

export function Ra3ConstraintScalingSection() {
  return (
    <section className="ra3-scaling-section" aria-labelledby="ra3-con">
      <div className="ra3-scaling-container">
        {/* Header */}
        <div className="ra3-scaling-head">
          <div className="ra3-scaling-head-left">
            <div className="ra3-scaling-meta-row">
              <span className="ra3-scaling-dot" aria-hidden="true">•</span>
              <span className="ra3-scaling-index">02 / 07</span>
            </div>
            <div className="ra3-scaling-eyebrow-row">
              <span className="ra3-scaling-eyebrow-dash">—</span>
              <span className="ra3-scaling-eyebrow-text">THE CONSTRAINT</span>
            </div>
            <h2 id="ra3-con" className="ra3-scaling-title">
              Scaling out makes the<br />problem worse, not better.
            </h2>
          </div>

          <div className="ra3-scaling-vertical-divider" aria-hidden="true" />

          <div className="ra3-scaling-head-right">
            <p className="ra3-scaling-lead">
              Cache held in GPU memory is local, small, and lost when the instance moves. Once a deployment grows past a single node the hit rate falls, because the router cannot reliably send a request back to the machine that holds its prefix.
            </p>
          </div>
        </div>

        {/* 2 Comparison Cards Grid */}
        <div className="ra3-scaling-grid">
          {/* Card 1: Cache in GPU Memory */}
          <div className="scaling-card card-gpu">
            <div className="scaling-card-header">
              <div className="scaling-header-left">
                <span className="header-dash dash-blue">—</span>
                <span className="header-title">CACHE IN GPU MEMORY</span>
              </div>
              <span className="header-tag tag-blue">PER NODE</span>
            </div>

            {/* Connected Node List */}
            <div className="scaling-node-list">
              <div className="node-timeline-track track-blue" aria-hidden="true" />

              <div className="node-item">
                <span className="node-bullet bullet-blue" />
                <span className="node-text">Local to one node</span>
              </div>
              <div className="node-item">
                <span className="node-bullet bullet-blue" />
                <span className="node-text">Small</span>
              </div>
              <div className="node-item">
                <span className="node-bullet bullet-blue" />
                <span className="node-text">Lost when the instance moves</span>
              </div>
              <div className="node-item">
                <span className="node-bullet bullet-blue" />
                <span className="node-text">Hit rate falls as nodes are added</span>
              </div>
            </div>

            {/* Sub-card: Node Miss Viz */}
            <div className="scaling-viz-box">
              <span className="viz-eyebrow">ROUTER CANNOT FIND THE NODE HOLDING THE PREFIX</span>

              <div className="viz-boxes-row">
                <div className="viz-box box-hit-blue">
                  <span>Node • hit</span>
                </div>
                <div className="viz-line-connector" />
                <div className="viz-box box-miss">
                  <span>Miss</span>
                </div>
                <div className="viz-line-connector" />
                <div className="viz-box box-miss">
                  <span>Miss</span>
                </div>
                <div className="viz-line-connector" />
                <div className="viz-box box-miss">
                  <span>Miss</span>
                </div>
                <span className="viz-ellipsis">...</span>
              </div>

              <p className="viz-footer-desc">
                Prefix is lost across nodes, requests cannot be routed back reliably.
              </p>
            </div>
          </div>

          {/* Card 2: Cache as a Shared Tier */}
          <div className="scaling-card card-shared">
            <div className="scaling-card-header">
              <div className="scaling-header-left">
                <span className="header-dash dash-amber">—</span>
                <span className="header-title">CACHE AS A SHARED TIER</span>
              </div>
              <span className="header-tag tag-amber">PER SITE • PER FOOTPRINT</span>
            </div>

            {/* Connected Node List */}
            <div className="scaling-node-list">
              <div className="node-timeline-track track-amber" aria-hidden="true" />

              <div className="node-item">
                <span className="node-bullet bullet-amber" />
                <span className="node-text">Lives in a sidecar, not the GPU</span>
              </div>
              <div className="node-item">
                <span className="node-bullet bullet-amber" />
                <span className="node-text">Layered: GPU → CPU → NVMe → pool</span>
              </div>
              <div className="node-item">
                <span className="node-bullet bullet-amber" />
                <span className="node-text">Any pod on the site can read</span>
              </div>
              <div className="node-item">
                <span className="node-bullet bullet-amber" />
                <span className="node-text">Extends to other sites over the backbone</span>
              </div>
            </div>

            {/* Sub-card: Shared Hit Viz */}
            <div className="scaling-viz-box">
              <span className="viz-eyebrow">ANY NODE READS THE SHARED POOL</span>

              <div className="viz-boxes-row">
                <div className="viz-box box-hit-amber">
                  <span>Node • hit</span>
                </div>
                <div className="viz-line-connector" />
                <div className="viz-box box-hit-amber-soft">
                  <span>Hit</span>
                </div>
                <div className="viz-line-connector" />
                <div className="viz-box box-hit-amber-soft">
                  <span>Hit</span>
                </div>
                <div className="viz-line-connector" />
                <div className="viz-box box-hit-amber-soft">
                  <span>Hit</span>
                </div>
                <span className="viz-ellipsis">...</span>
              </div>

              <p className="viz-footer-desc">
                Shared pool is accessible, so the router can always satisfy reads.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line Takeaway */}
        <div className="ra3-scaling-takeaway">
          <span className="scaling-takeaway-tag">BOTTOM LINE</span>
          <div className="scaling-takeaway-divider" aria-hidden="true" />
          <p className="scaling-takeaway-text">
            Local GPU cache does not scale. A shared, layered cache tier preserves hit rate and reliability as you grow.
          </p>
        </div>
      </div>

      <style jsx>{`
        .ra3-scaling-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .ra3-scaling-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* ═══ Header ═══ */
        .ra3-scaling-head {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) auto minmax(0, 1.25fr);
          align-items: center;
          gap: clamp(24px, 4vw, 56px);
          margin-bottom: clamp(40px, 5vw, 64px);
        }

        .ra3-scaling-head-left {
          display: flex;
          flex-direction: column;
        }

        .ra3-scaling-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ra3-scaling-dot {
          color: #38bdf8;
          font-size: 14px;
        }

        .ra3-scaling-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .ra3-scaling-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .ra3-scaling-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra3-scaling-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra3-scaling-title {
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .ra3-scaling-vertical-divider {
          width: 1px;
          min-height: 90px;
          background: rgba(255, 255, 255, 0.1);
          align-self: stretch;
        }

        .ra3-scaling-head-right {
          display: flex;
          align-items: center;
        }

        .ra3-scaling-lead {
          font-size: clamp(15px, 1.15vw, 16.5px);
          line-height: 1.62;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }

        /* ═══ 2 Cards Grid ═══ */
        .ra3-scaling-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 28px);
          margin-bottom: 24px;
        }

        .scaling-card {
          background: #040914;
          border-radius: 14px;
          padding: clamp(24px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          position: relative;
        }

        .card-gpu {
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .card-shared {
          border: 1px solid rgba(245, 158, 11, 0.25);
        }

        /* Card Header */
        .scaling-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 26px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .scaling-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-dash {
          font-size: 14px;
          font-weight: 700;
        }

        .dash-blue {
          color: #38bdf8;
        }

        .dash-amber {
          color: #fbbf24;
        }

        .header-title {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
        }

        .header-tag {
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

        /* Node List with Timeline */
        .scaling-node-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-left: 20px;
          margin-bottom: 28px;
        }

        .node-timeline-track {
          position: absolute;
          left: 4px;
          top: 6px;
          bottom: 6px;
          width: 1.5px;
        }

        .track-blue {
          background: rgba(56, 189, 248, 0.4);
        }

        .track-amber {
          background: rgba(245, 158, 11, 0.4);
        }

        .node-item {
          display: flex;
          align-items: center;
          position: relative;
        }

        .node-bullet {
          position: absolute;
          left: -20px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          transform: translateX(0);
        }

        .bullet-blue {
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        .bullet-amber {
          background: #fbbf24;
          box-shadow: 0 0 8px #fbbf24;
        }

        .node-text {
          font-size: 14px;
          line-height: 1.45;
          color: #cbd5e1;
        }

        /* Sub-card Simulation Viz */
        .scaling-viz-box {
          background: rgba(6, 12, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .viz-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
        }

        .viz-boxes-row {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding: 4px 0;
        }

        .viz-box {
          padding: 8px 14px;
          border-radius: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .box-hit-blue {
          background: rgba(14, 38, 74, 0.8);
          border: 1px solid #38bdf8;
          color: #38bdf8;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
        }

        .box-miss {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #64748b;
        }

        .box-hit-amber {
          background: rgba(36, 24, 10, 0.7);
          border: 1px solid #fbbf24;
          color: #fbbf24;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
        }

        .box-hit-amber-soft {
          background: rgba(36, 24, 10, 0.5);
          border: 1px solid rgba(245, 158, 11, 0.5);
          color: #fbbf24;
        }

        .viz-line-connector {
          width: 8px;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }

        .viz-ellipsis {
          color: #64748b;
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-left: 4px;
        }

        .viz-footer-desc {
          font-size: 12px;
          line-height: 1.4;
          color: #64748b;
          margin: 0;
        }

        /* ═══ Bottom Line Takeaway ═══ */
        .ra3-scaling-takeaway {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }

        .scaling-takeaway-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .scaling-takeaway-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .scaling-takeaway-text {
          font-size: 13.5px;
          line-height: 1.5;
          color: #cbd5e1;
          margin: 0;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 960px) {
          .ra3-scaling-head {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .ra3-scaling-vertical-divider {
            display: none;
          }

          .ra3-scaling-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .ra3-scaling-takeaway {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .scaling-takeaway-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
