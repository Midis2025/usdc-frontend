"use client";

import React from "react";

export function WhatThisDoesNotSolveSection() {
  return (
    <section className="limits-section" aria-labelledby="ra1-lim">
      <div className="limits-container">
        {/* Left Column */}
        <div className="limits-left-col">
          <div className="limits-meta-row">
            <span className="limits-index">07 / 07</span>
          </div>

          <div className="limits-eyebrow-row">
            <span className="limits-eyebrow-dash">—</span>
            <span className="limits-eyebrow-text">ENGINEERING CONSTRAINT</span>
          </div>

          <h2 id="ra1-lim" className="limits-title">
            What This Does<br />Not Solve
          </h2>

          <p className="limits-subtitle">
            Modular compute does not eliminate<br />site-level constraints.
          </p>

          <div className="limits-divider" aria-hidden="true" />

          <p className="limits-prose">
            The shared elements have to be sized for the end state on day one. Substation capacity, water, land and the utility interconnect are not modular and interconnect queues are measured in quarters or years depending on the ISO. Pod modularity removes the compute commitment risk. It does not remove the interconnect lead time.
          </p>

          <div className="limits-callout-box">
            <span className="limits-callout-eyebrow">WHERE THE CAMPUS CONVERSATION STARTS</span>
            <div className="limits-callout-quote-row">
              <div className="limits-callout-accent-bar" aria-hidden="true" />
              <p className="limits-callout-quote">
                Start the campus conversation<br className="desktop-br" />with the interconnect date,<br className="desktop-br" />not the pod schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="limits-right-col">
          <div className="limits-table-header">
            <span className="limits-table-header-text">SITE-LEVEL ELEMENTS &nbsp;•&nbsp; FIXED VS MODULAR</span>
          </div>

          <div className="limits-table-card">
            {/* Row 1: Interconnect */}
            <div className="limits-row">
              <span className="limits-cell-key">INTERCONNECT</span>
              <span className="limits-cell-desc">
                Utility interconnect is not modular.<br />Queue times depend on the ISO.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-fixed">FIXED</span>
              </div>
            </div>

            {/* Row 2: Land */}
            <div className="limits-row">
              <span className="limits-cell-key">LAND</span>
              <span className="limits-cell-desc">
                Parcel and perimeter are<br />committed once.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-fixed">FIXED</span>
              </div>
            </div>

            {/* Row 3: Water */}
            <div className="limits-row">
              <span className="limits-cell-key">WATER</span>
              <span className="limits-cell-desc">
                Water is not modular and must be<br />secured for the end state.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-fixed">FIXED</span>
              </div>
            </div>

            {/* Row 4: Substation */}
            <div className="limits-row">
              <span className="limits-cell-key">SUBSTATION</span>
              <span className="limits-cell-desc">
                Capacity must be planned for the<br />full campus on day one.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-fixed">FIXED</span>
              </div>
            </div>

            {/* Row 5: Shared Infra */}
            <div className="limits-row">
              <span className="limits-cell-key">SHARED INFRA</span>
              <span className="limits-cell-desc">
                Cooling plant, headers and control<br />plane are sized for the end state.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-sized-once">SIZED ONCE</span>
              </div>
            </div>

            {/* Row 6: Lead Time */}
            <div className="limits-row">
              <span className="limits-cell-key">LEAD TIME</span>
              <span className="limits-cell-desc">
                Pod modularity does not remove<br />interconnection lead time.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-fixed">FIXED</span>
              </div>
            </div>

            {/* Row 7: Compute */}
            <div className="limits-row">
              <span className="limits-cell-key">COMPUTE</span>
              <span className="limits-cell-desc">
                Pods are added in increments.<br />Commitment risk is removed here<br />and only here.
              </span>
              <div className="limits-badge-wrap">
                <span className="limits-badge type-modular">MODULAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .limits-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .limits-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: start;
        }

        /* ═══ Left Column ═══ */
        .limits-left-col {
          display: flex;
          flex-direction: column;
        }

        .limits-meta-row {
          margin-bottom: 12px;
        }

        .limits-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .limits-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .limits-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .limits-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .limits-title {
          font-size: clamp(34px, 3.8vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 18px;
        }

        .limits-subtitle {
          font-size: clamp(16px, 1.25vw, 19px);
          font-weight: 500;
          line-height: 1.42;
          color: #cbd5e1;
          margin: 0 0 24px;
        }

        .limits-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.09);
          margin-bottom: 24px;
        }

        .limits-prose {
          font-size: 14px;
          line-height: 1.68;
          color: #8fa0b8;
          margin: 0 0 32px;
        }

        /* Callout Box */
        .limits-callout-box {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 22px 24px 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .limits-callout-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .limits-callout-quote-row {
          display: flex;
          align-items: stretch;
          gap: 16px;
        }

        .limits-callout-accent-bar {
          width: 2px;
          background: #38bdf8;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
          flex-shrink: 0;
        }

        .limits-callout-quote {
          font-size: clamp(17px, 1.35vw, 20px);
          font-weight: 600;
          line-height: 1.36;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ═══ Right Column ═══ */
        .limits-right-col {
          display: flex;
          flex-direction: column;
        }

        .limits-table-header {
          margin-bottom: 14px;
        }

        .limits-table-header-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .limits-table-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .limits-row {
          display: grid;
          grid-template-columns: 140px minmax(0, 1fr) auto;
          align-items: center;
          gap: 18px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.2s ease;
        }

        .limits-row:last-child {
          border-bottom: none;
        }

        .limits-row:hover {
          background: rgba(56, 189, 248, 0.03);
        }

        .limits-cell-key {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          letter-spacing: 0.12em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .limits-cell-desc {
          font-size: 13.5px;
          line-height: 1.48;
          color: #cbd5e1;
        }

        .limits-badge-wrap {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-width: 110px;
          flex-shrink: 0;
        }

        /* Badges */
        .limits-badge {
          position: static !important;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 6px;
          white-space: nowrap;
          text-align: center;
          display: inline-block;
          line-height: 1.2;
          box-sizing: border-box;
        }

        .limits-badge.type-fixed {
          background: rgba(18, 28, 48, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.7);
          color: #f1f5f9;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .limits-badge.type-sized-once {
          background: rgba(14, 38, 74, 0.7);
          border: 1px solid rgba(56, 189, 248, 0.7);
          color: #38bdf8;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .limits-badge.type-modular {
          background: rgba(14, 38, 74, 0.95);
          border: 1px solid #38bdf8;
          color: #38bdf8;
          font-weight: 800;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
        }

        /* Responsive Layout */
        @media (max-width: 960px) {
          .limits-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .desktop-br {
            display: none;
          }

          .limits-row {
            grid-template-columns: 1fr auto;
            gap: 12px;
            padding: 16px;
          }

          .limits-cell-desc {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </section>
  );
}
