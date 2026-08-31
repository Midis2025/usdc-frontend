"use client";

import React from "react";

export function Ra3EngineeringConstraintSection() {
  return (
    <section className="ra3-constraint-section" aria-labelledby="ra3-lim">
      <div className="ra3-constraint-container">
        {/* Left Column */}
        <div className="ra3-constraint-left">
          <div className="ra3-constraint-meta-row">
            <span className="ra3-constraint-index">07 / 07</span>
          </div>

          <div className="ra3-constraint-eyebrow-row">
            <span className="ra3-constraint-eyebrow-dash">—</span>
            <span className="ra3-constraint-eyebrow-text">ENGINEERING CONSTRAINT</span>
          </div>

          <h2 id="ra3-lim" className="ra3-constraint-title">
            What This Does<br />Not Solve
          </h2>

          <p className="ra3-constraint-subtitle">
            The site boundary is where the cache tier changes from a performance feature to a capacity feature.
          </p>

          <div className="ra3-constraint-prose">
            <p>
              Cross site reuse works for prefix reuse and for moving a session to where capacity exists. It does not work for a tight prefill and decode loop split across two cities.
            </p>
            <p>
              Within a site, cache moves at fabric speed. Between sites it moves at backbone speed, and the workload has to tolerate that difference.
            </p>
          </div>

          {/* Callout Box */}
          <div className="ra3-honest-callout">
            <div className="ra3-honest-eyebrow-row">
              <span className="ra3-honest-dash">—</span>
              <span className="ra3-honest-eyebrow-text">THE HONEST VERSION</span>
            </div>
            <h3 className="ra3-honest-heading">
              Within a site: performance. Between sites: capacity.
            </h3>
            <p className="ra3-honest-sub">
              Do not split a prefill–decode loop across two cities.
            </p>
          </div>
        </div>

        {/* Right Column: Site Boundary Canvas Card */}
        <div className="ra3-constraint-right">
          <div className="ra3-boundary-card">
            {/* Header */}
            <div className="ra3-boundary-header">
              <h3 className="ra3-boundary-title">WHAT CROSSES THE SITE BOUNDARY</h3>
              <span className="ra3-boundary-sub">LATENCY DOMAIN & CACHE SCOPE</span>
            </div>

            {/* 2-Zone Comparison Grid */}
            <div className="ra3-zones-grid">
              {/* Zone 1: Within a Site */}
              <div className="zone-box zone-within">
                <div className="zone-header">
                  <div className="zone-title-row">
                    <span className="zone-dot dot-blue" aria-hidden="true" />
                    <span className="zone-title text-blue">WITHIN A SITE</span>
                  </div>
                  <span className="zone-speed-badge badge-blue">Fabric speed</span>
                </div>

                <div className="zone-items-list">
                  <div className="zone-item item-active-blue">
                    <span className="item-name">Prefix reuse</span>
                    <span className="item-status status-blue">● Supported</span>
                  </div>

                  <div className="zone-item item-active-blue">
                    <span className="item-name">Session migration</span>
                    <span className="item-status status-blue">● Supported</span>
                  </div>

                  <div className="zone-item item-active-blue">
                    <span className="item-name">Prefill ↔ decode loop</span>
                    <span className="item-status status-blue">● Supported</span>
                  </div>
                </div>

                <div className="zone-footer footer-blue">
                  <span>Performance feature</span>
                </div>
              </div>

              {/* Zone 2: Between Sites */}
              <div className="zone-box zone-between">
                <div className="zone-header">
                  <div className="zone-title-row">
                    <span className="zone-dot dot-amber" aria-hidden="true" />
                    <span className="zone-title text-amber">BETWEEN SITES</span>
                  </div>
                  <span className="zone-speed-badge badge-amber">Backbone speed</span>
                </div>

                <div className="zone-items-list">
                  <div className="zone-item item-active-amber">
                    <span className="item-name">Prefix reuse</span>
                    <span className="item-status status-amber">● Supported</span>
                  </div>

                  <div className="zone-item item-active-amber">
                    <span className="item-name">Session migration</span>
                    <span className="item-status status-amber">● Supported</span>
                  </div>

                  <div className="zone-item item-disabled">
                    <div className="disabled-text-wrap">
                      <span className="item-name strike">Prefill ↔ decode loop</span>
                      <span className="item-sub">Not across two cities</span>
                    </div>
                    <span className="item-status status-disabled">✕ Excluded</span>
                  </div>
                </div>

                <div className="zone-footer footer-amber">
                  <span>Capacity feature</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="ra3-boundary-footer-note">
              <span className="note-text">WITHIN A SITE: FABRIC SPEED &nbsp;•&nbsp; BETWEEN SITES: BACKBONE SPEED</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ra3-constraint-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .ra3-constraint-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: start;
        }

        /* ═══ Left Column ═══ */
        .ra3-constraint-left {
          display: flex;
          flex-direction: column;
        }

        .ra3-constraint-meta-row {
          margin-bottom: 12px;
        }

        .ra3-constraint-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .ra3-constraint-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .ra3-constraint-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra3-constraint-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra3-constraint-title {
          font-size: clamp(34px, 3.8vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 16px;
        }

        .ra3-constraint-subtitle {
          font-size: 17px;
          font-weight: 500;
          line-height: 1.45;
          color: #cbd5e1;
          margin: 0 0 24px;
        }

        .ra3-constraint-prose {
          display: flex;
          flex-direction: column;
          gap: 14px;
          font-size: 14px;
          line-height: 1.65;
          color: #94a3b8;
          margin-bottom: 32px;
        }

        .ra3-constraint-prose p {
          margin: 0;
        }

        /* Callout Box */
        .ra3-honest-callout {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
        }

        .ra3-honest-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ra3-honest-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra3-honest-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra3-honest-heading {
          font-size: clamp(16px, 1.3vw, 19px);
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }

        .ra3-honest-sub {
          font-size: 13.5px;
          line-height: 1.48;
          color: #94a3b8;
          margin: 0;
        }

        /* ═══ Right Column (Boundary Card) ═══ */
        .ra3-constraint-right {
          display: flex;
          flex-direction: column;
        }

        .ra3-boundary-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 16px;
          padding: clamp(24px, 3vw, 32px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .ra3-boundary-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 24px;
        }

        .ra3-boundary-title {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          letter-spacing: 0.12em;
          color: #ffffff;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
        }

        .ra3-boundary-sub {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.16em;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* 2-Zone Grid */
        .ra3-zones-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 20px;
        }

        .zone-box {
          border-radius: 12px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          background: rgba(6, 12, 24, 0.6);
        }

        .zone-within {
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .zone-between {
          border: 1px solid rgba(245, 158, 11, 0.25);
        }

        .zone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .zone-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .zone-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .dot-blue {
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
        }

        .dot-amber {
          background: #fbbf24;
          box-shadow: 0 0 6px #fbbf24;
        }

        .zone-title {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .text-blue {
          color: #38bdf8;
        }

        .text-amber {
          color: #fbbf24;
        }

        .zone-speed-badge {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .badge-blue {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .badge-amber {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        /* Items List */
        .zone-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          margin-bottom: 16px;
        }

        .zone-item {
          border-radius: 8px;
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-active-blue {
          background: rgba(14, 38, 74, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .item-active-amber {
          background: rgba(36, 24, 10, 0.4);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .item-disabled {
          background: rgba(15, 23, 42, 0.4);
          border: 1px dashed rgba(255, 255, 255, 0.15);
        }

        .item-name {
          font-size: 12.5px;
          font-weight: 600;
          color: #ffffff;
        }

        .item-name.strike {
          color: #64748b;
          text-decoration: line-through;
        }

        .disabled-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .item-sub {
          font-size: 10.5px;
          color: #94a3b8;
        }

        .item-status {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .status-blue {
          color: #38bdf8;
        }

        .status-amber {
          color: #fbbf24;
        }

        .status-disabled {
          color: #ef4444;
        }

        /* Footer */
        .zone-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 12px;
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }

        .footer-blue {
          color: #38bdf8;
        }

        .footer-amber {
          color: #fbbf24;
        }

        /* ═══ Footer Note ═══ */
        .ra3-boundary-footer-note {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 14px;
          margin-top: 8px;
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
          .ra3-constraint-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .ra3-zones-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
