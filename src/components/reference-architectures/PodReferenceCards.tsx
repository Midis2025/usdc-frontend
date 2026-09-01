"use client";

import React from "react";

export default function PodReferenceCards() {
  return (
    <div className="envelope-wrapper">
      {/* 2 Pod Reference Cards Grid */}
      <div className="envelope-cards-grid">
        {/* ═══ CARD 01: NVIDIA Vera Rubin NVL72 ═══ */}
        <article className="env-hud-card">
          {/* Card Header */}
          <div className="env-card-header">
            <div className="env-num-badge">01</div>
            <div className="env-header-text">
              <span className="env-header-eyebrow">POD REFERENCE</span>
              <h3 className="env-header-title">NVIDIA Vera Rubin NVL72</h3>
            </div>
          </div>

          <div className="env-divider" aria-hidden="true" />

          {/* Card Middle Specs Grid */}
          <div className="env-specs-grid">
            {/* Left: IT Load */}
            <div className="env-load-col">
              <span className="env-meta-lbl">IT LOAD</span>
              <span className="env-load-pre">About</span>
              <div className="env-load-stat">
                <span className="env-load-num">2.8</span>
                <span className="env-load-unit">MW</span>
              </div>
            </div>

            {/* Right: Specs (Physical Unit + Source) */}
            <div className="env-details-col">
              {/* Physical Unit */}
              <div className="env-detail-item">
                <div className="env-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.4" />
                    <line x1="7" y1="8" x2="17" y2="8" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="7" y1="16" x2="17" y2="16" />
                    <circle cx="5" cy="8" r="0.8" fill="#38bdf8" />
                    <circle cx="5" cy="12" r="0.8" fill="#38bdf8" />
                    <circle cx="5" cy="16" r="0.8" fill="#38bdf8" />
                  </svg>
                </div>
                <div className="env-detail-text">
                  <span className="env-detail-lbl">PHYSICAL UNIT</span>
                  <p className="env-detail-desc">
                    14 IT racks plus 2 network and storage racks in a single row, network racks in the middle.
                  </p>
                </div>
              </div>

              {/* Source */}
              <div className="env-detail-item">
                <div className="env-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeOpacity="0.4" />
                    <polyline points="14 2 14 8 20 8" strokeOpacity="0.4" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                  </svg>
                </div>
                <div className="env-detail-text">
                  <span className="env-detail-lbl">SOURCE</span>
                  <p className="env-detail-desc">
                    Vera Rubin NVL72 Facility Planning Summary
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Schematic Box: Single Row Layout */}
          <div className="env-schematic-box">
            <div className="env-schematic-head">
              <span className="env-schematic-title">SINGLE ROW LAYOUT</span>
            </div>

            <div className="env-schematic-subhead">
              <span className="env-subhead-left">14 IT racks</span>
              <span className="env-subhead-mid">2 N/W / storage</span>
            </div>

            {/* SVG 16 Racks (7 blue + 2 dashed gray + 7 blue) */}
            <div className="env-racks-svg-wrap">
              <svg viewBox="0 0 460 36" className="env-racks-svg" preserveAspectRatio="none">
                <g>
                  {/* 7 Left IT Racks (Solid Blue) */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <rect
                      key={`it-l-${i}`}
                      x={2 + i * 28.5}
                      y="2"
                      width="23.5"
                      height="32"
                      rx="2"
                      fill="rgba(37, 99, 235, 0.12)"
                      stroke="#2563eb"
                      strokeWidth="1.2"
                    />
                  ))}

                  {/* 2 Middle Network Racks (Dashed Gray/Slate) */}
                  {[0, 1].map((i) => (
                    <rect
                      key={`nw-m-${i}`}
                      x={201.5 + i * 28.5}
                      y="2"
                      width="23.5"
                      height="32"
                      rx="2"
                      fill="rgba(148, 163, 184, 0.06)"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                      strokeDasharray="2.5 2.5"
                    />
                  ))}

                  {/* 7 Right IT Racks (Solid Blue) */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <rect
                      key={`it-r-${i}`}
                      x={258.5 + i * 28.5}
                      y="2"
                      width="23.5"
                      height="32"
                      rx="2"
                      fill="rgba(37, 99, 235, 0.12)"
                      stroke="#2563eb"
                      strokeWidth="1.2"
                    />
                  ))}
                </g>
              </svg>
            </div>

            {/* Dimension Line with Center Text */}
            <div className="env-dim-row">
              <div className="env-dim-arrow-l">◀</div>
              <div className="env-dim-line" />
              <span className="env-dim-label">Single row</span>
              <div className="env-dim-line" />
              <div className="env-dim-arrow-r">▶</div>
            </div>
          </div>
        </article>

        {/* ═══ CARD 02: Cerebras CS4 ═══ */}
        <article className="env-hud-card">
          {/* Card Header */}
          <div className="env-card-header">
            <div className="env-num-badge">02</div>
            <div className="env-header-text">
              <span className="env-header-eyebrow">POD REFERENCE</span>
              <h3 className="env-header-title">Cerebras CS4</h3>
            </div>
          </div>

          <div className="env-divider" aria-hidden="true" />

          {/* Card Middle Specs Grid */}
          <div className="env-specs-grid">
            {/* Left: IT Load */}
            <div className="env-load-col">
              <span className="env-meta-lbl">IT LOAD</span>
              <span className="env-load-pre">About</span>
              <div className="env-load-stat">
                <span className="env-load-num">2.5</span>
                <span className="env-load-unit">MW</span>
              </div>
            </div>

            {/* Right: Specs (Physical Unit + Source) */}
            <div className="env-details-col">
              {/* Physical Unit */}
              <div className="env-detail-item">
                <div className="env-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeOpacity="0.4" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div className="env-detail-text">
                  <span className="env-detail-lbl">PHYSICAL UNIT</span>
                  <p className="env-detail-desc">
                    11 containers, about 3,970 sq ft.
                  </p>
                </div>
              </div>

              {/* Source */}
              <div className="env-detail-item">
                <div className="env-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeOpacity="0.4" />
                    <polyline points="14 2 14 8 20 8" strokeOpacity="0.4" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                  </svg>
                </div>
                <div className="env-detail-text">
                  <span className="env-detail-lbl">SOURCE</span>
                  <p className="env-detail-desc">
                    DigiPowerX Cerebras CS4 Business Case
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Schematic Box: Container Layout */}
          <div className="env-schematic-box">
            <div className="env-schematic-head">
              <span className="env-schematic-title">CONTAINER LAYOUT</span>
            </div>

            <div className="env-schematic-subhead">
              <span className="env-subhead-left">11 containers</span>
            </div>

            {/* SVG 11 Containers (Solid Blue) */}
            <div className="env-racks-svg-wrap">
              <svg viewBox="0 0 460 36" className="env-racks-svg" preserveAspectRatio="none">
                <g>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <rect
                      key={`cs-${i}`}
                      x={2 + i * 41.6}
                      y="2"
                      width="35.5"
                      height="32"
                      rx="2"
                      fill="rgba(37, 99, 235, 0.12)"
                      stroke="#2563eb"
                      strokeWidth="1.2"
                    />
                  ))}
                </g>
              </svg>
            </div>

            {/* Dimension Line with Right-Aligned Label */}
            <div className="env-dim-row-right">
              <div className="env-dim-arrow-l">◀</div>
              <div className="env-dim-line" />
              <span className="env-dim-label">≈ 3,970 sq ft</span>
            </div>
          </div>
        </article>
      </div>

      {/* ═══ BOTTOM FULL-WIDTH BANNER: MULTI-POD LAYOUT ═══ */}
      <div className="env-multi-banner">
        <div className="env-banner-left">
          <div className="env-banner-hex-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="20 2, 36 11, 36 29, 20 38, 4 29, 4 11" stroke="rgba(56,189,248,0.3)" fill="rgba(14,38,74,0.4)" />
              {/* 3 Isometric Cubes */}
              <g transform="translate(11, 10) scale(0.75)">
                <path d="M12 2 L20 6.5 L12 11 L4 6.5 Z" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" />
                <path d="M4 6.5 L12 11 L12 20 L4 15.5 Z" stroke="#38bdf8" />
                <path d="M20 6.5 L12 11 L12 20 L20 15.5 Z" stroke="#38bdf8" />
              </g>
            </svg>
          </div>
          <span className="env-banner-title">MULTI-POD LAYOUT</span>
        </div>

        <div className="env-banner-divider" aria-hidden="true" />

        <div className="env-banner-right">
          <p className="env-banner-desc">
            Rows of IT pods placed contiguously across the length, with one network skid per five IT pods. A ten to fifteen megawatt campus is therefore four to six pods and one to two network skids.
          </p>
        </div>
      </div>

      <style jsx>{`
        .envelope-wrapper {
          width: 100%;
          font-family: inherit;
        }

        /* Two Cards Grid */
        .envelope-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 2.5vw, 32px);
        }

        /* HUD Card Container */
        .env-hud-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.18);
          border-radius: 12px;
          padding: clamp(20px, 2.5vw, 28px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Card Header */
        .env-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .env-num-badge {
          width: 44px;
          height: 44px;
          background: #1d4ed8;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono, monospace);
          font-size: 19px;
          font-weight: 700;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(29, 78, 216, 0.4);
        }

        .env-header-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .env-header-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .env-header-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* Subtle Horizontal Divider */
        .env-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 20px 0;
        }

        /* Specs Grid */
        .env-specs-grid {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 20px;
          align-items: flex-start;
          min-height: 108px;
          margin-bottom: 20px;
        }

        /* Load Col */
        .env-load-col {
          display: flex;
          flex-direction: column;
        }

        .env-meta-lbl {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.16em;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .env-load-pre {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .env-load-stat {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .env-load-num {
          font-size: clamp(38px, 3.8vw, 48px);
          font-weight: 800;
          line-height: 1;
          color: #38bdf8;
          letter-spacing: -0.03em;
        }

        .env-load-unit {
          font-family: var(--font-mono, monospace);
          font-size: 15px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        /* Details Col */
        .env-details-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .env-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .env-detail-item:first-child {
          min-height: 48px;
        }

        .env-detail-item:last-child {
          min-height: 38px;
        }

        .env-detail-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(14, 38, 74, 0.4);
          border: 1px solid rgba(56, 189, 248, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 6px;
        }

        .env-detail-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .env-detail-lbl {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        .env-detail-desc {
          font-size: 13px;
          line-height: 1.45;
          color: #cbd5e1;
          margin: 0;
        }

        /* Schematic Blueprint Box */
        .env-schematic-box {
          background: rgba(3, 7, 18, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.15);
          border-radius: 8px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }

        .env-schematic-head {
          display: flex;
          align-items: center;
        }

        .env-schematic-title {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .env-schematic-subhead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11.5px;
          color: #94a3b8;
          min-height: 18px;
        }

        .env-subhead-left {
          flex: 1;
        }

        .env-subhead-mid {
          flex: 1;
          text-align: center;
        }

        .env-racks-svg-wrap {
          width: 100%;
          height: 38px;
        }

        .env-racks-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Dimension Lines */
        .env-dim-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .env-dim-row-right {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .env-dim-arrow-l,
        .env-dim-arrow-r {
          font-size: 8px;
          color: #64748b;
          line-height: 1;
        }

        .env-dim-line {
          flex: 1;
          height: 1px;
          background: rgba(100, 116, 139, 0.4);
        }

        .env-dim-label {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          color: #94a3b8;
          white-space: nowrap;
        }

        /* Multi-Pod Layout Banner */
        .env-multi-banner {
          margin-top: 24px;
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.18);
          border-radius: 10px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 28px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .env-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .env-banner-hex-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .env-banner-title {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .env-banner-divider {
          width: 1px;
          height: 36px;
          background: rgba(255, 255, 255, 0.12);
          flex-shrink: 0;
        }

        .env-banner-right {
          flex: 1;
        }

        .env-banner-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: #cbd5e1;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .envelope-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .env-specs-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .env-multi-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
          }

          .env-banner-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
