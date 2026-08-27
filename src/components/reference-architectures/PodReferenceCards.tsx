"use client";

import React, { useState } from "react";

export default function PodReferenceCards() {
  const [hoveredRack, setHoveredRack] = useState<string | null>(null);

  return (
    <div className="grid-2 pod-ref-cards-grid">
      <style jsx>{`
        .pod-ref-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }

        .ref-card {
          position: relative;
          background: radial-gradient(800px 400px at 50% 0%, #0a1428 0%, #05070f 70%, #03040a 100%);
          border: 1px solid rgba(93, 140, 230, 0.28);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          font-family: var(--font-mono), ui-monospace, monospace;
        }

        .ref-card:hover {
          transform: translateY(-3px);
          border-color: rgba(110, 160, 255, 0.65);
          box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.7), 0 0 24px rgba(79, 139, 255, 0.15);
        }

        /* Top Corner Ticks */
        .corner-tick-tl {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 8px;
          height: 8px;
          border-top: 1.5px solid rgba(120, 165, 255, 0.5);
          border-left: 1.5px solid rgba(120, 165, 255, 0.5);
        }
        .corner-tick-br {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          border-bottom: 1.5px solid rgba(120, 165, 255, 0.5);
          border-right: 1.5px solid rgba(120, 165, 255, 0.5);
        }

        /* Header */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(83, 125, 210, 0.2);
        }

        .ref-index-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ref-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4f8bff;
          box-shadow: 0 0 8px #4f8bff;
        }
        .ref-dot.cerebras {
          background: #2fdbe6;
          box-shadow: 0 0 8px #2fdbe6;
        }

        .ref-index {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #768db8;
          text-transform: uppercase;
        }

        .ref-name {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #ffffff;
          text-align: right;
          background: linear-gradient(135deg, #ffffff 40%, #c4d7fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Load Block */
        .load-block {
          margin-top: 20px;
        }

        .load-meta-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 2px;
          color: #7ea8ff;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .load-val-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .load-pre {
          font-size: 14px;
          color: #8da4cf;
          font-weight: 400;
          letter-spacing: 1px;
        }

        .load-number {
          font-size: clamp(42px, 4.5vw, 56px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1;
          color: #ffffff;
          text-shadow: 0 0 24px rgba(79, 139, 255, 0.35);
        }

        .load-unit {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #6892e8;
        }

        /* Power Bar Meter */
        .power-meter {
          width: 100%;
          height: 4px;
          background: rgba(40, 60, 110, 0.4);
          border-radius: 2px;
          margin-top: 10px;
          overflow: hidden;
          position: relative;
        }
        .power-meter-fill {
          height: 100%;
          background: linear-gradient(90deg, #4f8bff 0%, #79abff 100%);
          box-shadow: 0 0 10px #4f8bff;
          border-radius: 2px;
        }
        .power-meter-fill.cerebras {
          background: linear-gradient(90deg, #2fdbe6 0%, #6ef4fb 100%);
          box-shadow: 0 0 10px #2fdbe6;
        }

        /* Spec Rows */
        .spec-list {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .spec-item {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 12px;
          padding: 10px 0;
          border-top: 1px solid rgba(83, 125, 210, 0.15);
          font-size: 13px;
          color: #d1deff;
          align-items: baseline;
        }

        .spec-k {
          font-size: 9.5px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #6d84af;
          font-weight: 600;
        }

        .spec-v {
          line-height: 1.45;
          color: #c2d5fa;
        }

        .source-tag {
          display: inline-block;
          font-size: 11.5px;
          color: #9abaff;
          background: rgba(79, 139, 255, 0.1);
          border: 1px solid rgba(79, 139, 255, 0.25);
          padding: 3px 8px;
          border-radius: 6px;
        }

        /* Visual Floorplan Schematic Container */
        .floorplan-container {
          margin-top: 22px;
          padding: 16px 14px;
          background: rgba(10, 18, 38, 0.6);
          border: 1px solid rgba(83, 125, 210, 0.25);
          border-radius: 12px;
        }

        .floorplan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 10px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .fp-badge-it {
          color: #7ea8ff;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .fp-badge-nw {
          color: #c4b5fd;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .fp-badge-dim {
          color: #7187ad;
        }

        .fp-color-dot {
          width: 6px;
          height: 6px;
          border-radius: 2px;
          display: inline-block;
        }
        .fp-color-dot.it {
          background: #4f8bff;
          box-shadow: 0 0 6px #4f8bff;
        }
        .fp-color-dot.nw {
          background: #a48bff;
          box-shadow: 0 0 6px #a48bff;
        }
        .fp-color-dot.cs {
          background: #2fdbe6;
          box-shadow: 0 0 6px #2fdbe6;
        }

        /* Floorplan SVG Racks */
        svg.rack-layout {
          width: 100%;
          height: auto;
          display: block;
        }

        :global(.pod-ref-cards-grid .rack-unit) {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        :global(.pod-ref-cards-grid .rack-it) {
          fill: rgba(30, 60, 130, 0.35);
          stroke: rgba(79, 139, 255, 0.65);
          stroke-width: 1.2;
        }
        :global(.pod-ref-cards-grid .rack-unit:hover .rack-it) {
          fill: rgba(79, 139, 255, 0.4);
          stroke: #79abff;
          filter: drop-shadow(0 0 8px rgba(79, 139, 255, 0.8));
        }

        :global(.pod-ref-cards-grid .rack-nw) {
          fill: rgba(70, 45, 140, 0.35);
          stroke: rgba(168, 132, 255, 0.7);
          stroke-width: 1.2;
        }
        :global(.pod-ref-cards-grid .rack-unit:hover .rack-nw) {
          fill: rgba(168, 132, 255, 0.4);
          stroke: #cbb8ff;
          filter: drop-shadow(0 0 8px rgba(168, 132, 255, 0.8));
        }

        :global(.pod-ref-cards-grid .rack-cs) {
          fill: rgba(20, 75, 95, 0.35);
          stroke: rgba(47, 219, 230, 0.65);
          stroke-width: 1.2;
        }
        :global(.pod-ref-cards-grid .rack-unit:hover .rack-cs) {
          fill: rgba(47, 219, 230, 0.4);
          stroke: #6ef4fb;
          filter: drop-shadow(0 0 8px rgba(47, 219, 230, 0.8));
        }

        :global(.pod-ref-cards-grid .slot-led) {
          fill: #4f8bff;
        }
        :global(.pod-ref-cards-grid .slot-led.nw) {
          fill: #a48bff;
        }
        :global(.pod-ref-cards-grid .slot-led.cs) {
          fill: #2fdbe6;
        }

        .floorplan-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          font-size: 9.5px;
          color: #768db8;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
      `}</style>

      {/* ═══ CARD 01: NVIDIA Vera Rubin NVL72 ═══ */}
      <article className="ref-card reveal">
        <div className="corner-tick-tl" />
        <div className="corner-tick-br" />

        <div className="card-header">
          <div className="ref-index-wrap">
            <span className="ref-dot" />
            <span className="ref-index">POD REFERENCE · 01</span>
          </div>
          <span className="ref-name">NVIDIA Vera Rubin NVL72</span>
        </div>

        <div className="load-block">
          <div className="load-meta-label">
            <span>IT POWER ENVELOPE</span>
          </div>
          <div className="load-val-wrap">
            <span className="load-pre">About</span>
            <span className="load-number">2.8</span>
            <span className="load-unit">MW</span>
          </div>
          <div className="power-meter">
            <div className="power-meter-fill" style={{ width: "92%" }} />
          </div>
        </div>

        <div className="spec-list">
          <div className="spec-item">
            <span className="spec-k">Physical unit</span>
            <span className="spec-v">14 IT compute racks plus 2 network and storage racks in a single continuous row (network racks in middle).</span>
          </div>
          <div className="spec-item">
            <span className="spec-k">Source</span>
            <span className="spec-v">
              <span className="source-tag">Vera Rubin NVL72 Facility Planning Summary</span>
            </span>
          </div>
        </div>

        {/* Rack Layout Visual */}
        <div className="floorplan-container">
          <div className="floorplan-header">
            <span className="fp-badge-it">
              <span className="fp-color-dot it" /> 14 IT Racks
            </span>
            <span className="fp-badge-nw">
              <span className="fp-color-dot nw" /> 2 Network / Storage
            </span>
            <span className="fp-badge-dim">Single Row</span>
          </div>

          <svg viewBox="0 0 400 48" className="rack-layout" role="img" aria-label="16 rack single row layout">
            <g>
              {/* 7 Left IT Racks */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <g key={`it-left-${i}`} className="rack-unit" transform={`translate(${4 + i * 23.5}, 4)`}>
                  <rect width="20.5" height="38" rx="3" className="rack-it" />
                  <rect x="3" y="6" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="8" r="1.2" className="slot-led" />
                  <rect x="3" y="13" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="15" r="1.2" className="slot-led" />
                  <rect x="3" y="20" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="22" r="1.2" className="slot-led" />
                  <rect x="3" y="27" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="29" r="1.2" className="slot-led" />
                </g>
              ))}

              {/* 2 Middle Network / Storage Racks */}
              {[0, 1].map((i) => (
                <g key={`nw-${i}`} className="rack-unit" transform={`translate(${172 + i * 23.5}, 4)`}>
                  <rect width="20.5" height="38" rx="3" className="rack-nw" />
                  <rect x="3" y="6" width="14.5" height="4" rx="1" fill="rgba(168,132,255,0.3)" />
                  <circle cx="6" cy="8" r="1.2" className="slot-led nw" />
                  <rect x="3" y="13" width="14.5" height="4" rx="1" fill="rgba(168,132,255,0.3)" />
                  <circle cx="6" cy="15" r="1.2" className="slot-led nw" />
                  <rect x="3" y="20" width="14.5" height="4" rx="1" fill="rgba(168,132,255,0.3)" />
                  <circle cx="6" cy="22" r="1.2" className="slot-led nw" />
                  <rect x="3" y="27" width="14.5" height="4" rx="1" fill="rgba(168,132,255,0.3)" />
                  <circle cx="6" cy="29" r="1.2" className="slot-led nw" />
                </g>
              ))}

              {/* 7 Right IT Racks */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <g key={`it-right-${i}`} className="rack-unit" transform={`translate(${223 + i * 23.5}, 4)`}>
                  <rect width="20.5" height="38" rx="3" className="rack-it" />
                  <rect x="3" y="6" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="8" r="1.2" className="slot-led" />
                  <rect x="3" y="13" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="15" r="1.2" className="slot-led" />
                  <rect x="3" y="20" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="22" r="1.2" className="slot-led" />
                  <rect x="3" y="27" width="14.5" height="4" rx="1" fill="rgba(120,165,255,0.25)" />
                  <circle cx="6" cy="29" r="1.2" className="slot-led" />
                </g>
              ))}
            </g>
          </svg>

          <div className="floorplan-footer">
            <span>Liquid Cooled · Direct-to-Chip</span>
            <span>16 Rack Continuous Row</span>
          </div>
        </div>
      </article>

      {/* ═══ CARD 02: Cerebras CS4 ═══ */}
      <article className="ref-card reveal" data-delay="1">
        <div className="corner-tick-tl" />
        <div className="corner-tick-br" />

        <div className="card-header">
          <div className="ref-index-wrap">
            <span className="ref-dot cerebras" />
            <span className="ref-index">POD REFERENCE · 02</span>
          </div>
          <span className="ref-name">Cerebras CS4</span>
        </div>

        <div className="load-block">
          <div className="load-meta-label" style={{ color: "#2fdbe6" }}>
            <span>IT POWER ENVELOPE</span>
          </div>
          <div className="load-val-wrap">
            <span className="load-number">2.5</span>
            <span className="load-unit" style={{ color: "#2fdbe6" }}>MW</span>
          </div>
          <div className="power-meter">
            <div className="power-meter-fill cerebras" style={{ width: "82%" }} />
          </div>
        </div>

        <div className="spec-list">
          <div className="spec-item">
            <span className="spec-k">Physical unit</span>
            <span className="spec-v">11 modular containers, about 3,970 sq ft footprint.</span>
          </div>
          <div className="spec-item">
            <span className="spec-k">Source</span>
            <span className="spec-v">
              <span className="source-tag" style={{ color: "#74f0f6", borderColor: "rgba(47,219,230,0.3)", background: "rgba(47,219,230,0.08)" }}>
                DigiPowerX Cerebras CS4 Business Case
              </span>
            </span>
          </div>
        </div>

        {/* Container Layout Visual */}
        <div className="floorplan-container">
          <div className="floorplan-header">
            <span className="fp-badge-it" style={{ color: "#2fdbe6" }}>
              <span className="fp-color-dot cs" /> 11 Modular Containers
            </span>
            <span className="fp-badge-dim">≈ 3,970 sq ft Footprint</span>
          </div>

          <svg viewBox="0 0 400 48" className="rack-layout" role="img" aria-label="11 modular container layout">
            <g>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <g key={`cs-cont-${i}`} className="rack-unit" transform={`translate(${4 + i * 36}, 4)`}>
                  <rect width="32" height="38" rx="4" className="rack-cs" />
                  {/* Container ribs */}
                  <line x1="10" y1="8" x2="10" y2="34" stroke="rgba(47,219,230,0.4)" strokeWidth="1" />
                  <line x1="16" y1="8" x2="16" y2="34" stroke="rgba(47,219,230,0.4)" strokeWidth="1" />
                  <line x1="22" y1="8" x2="22" y2="34" stroke="rgba(47,219,230,0.4)" strokeWidth="1" />
                  <circle cx="6" cy="8" r="1.2" className="slot-led cs" />
                  <circle cx="26" cy="8" r="1.2" className="slot-led cs" />
                </g>
              ))}
            </g>
          </svg>

          <div className="floorplan-footer">
            <span>Wafer-Scale Engine Cluster</span>
            <span>11 Prefabricated Modules</span>
          </div>
        </div>
      </article>
    </div>
  );
}
