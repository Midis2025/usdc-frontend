"use client";

import React from "react";

export function TwoRolesEnvelopesSection() {
  return (
    <section className="two-roles-section" aria-labelledby="ra2-env">
      <div className="two-roles-container">
        {/* Section Header */}
        <div className="two-roles-head">
          <div className="two-roles-head-left">
            <div className="two-roles-meta-row">
              <span className="two-roles-dot" aria-hidden="true">•</span>
              <span className="two-roles-index">05 / 07</span>
            </div>
            <div className="two-roles-eyebrow-row">
              <span className="two-roles-eyebrow-dash">—</span>
              <span className="two-roles-eyebrow-text">REFERENCE ENVELOPE</span>
            </div>
            <h2 id="ra2-env" className="two-roles-title">
              Two roles,<br />two envelopes.
            </h2>
          </div>

          <div className="two-roles-head-right">
            <p className="two-roles-lead">
              The published characteristics USDC plans each role against.<br className="desktop-br" />
              No throughput or latency figures are claimed for<br className="desktop-br" />
              this configuration.
            </p>
          </div>
        </div>

        {/* 2 Roles Grid Cards */}
        <div className="two-roles-grid">
          {/* Card 01: Prefill Sidecar */}
          <div className="role-card card-prefill">
            <div className="role-card-header">
              <span className="role-badge badge-prefill">01</span>
              <span className="role-name name-prefill">PREFILL SIDECAR</span>
              <div className="role-header-line line-prefill" aria-hidden="true" />
            </div>

            <div className="role-card-body">
              <span className="role-section-tag tag-prefill">WHAT IT DOES</span>
              <h3 className="role-action-title">
                Reads the prompt,<br />computes the KV cache.
              </h3>

              <div className="role-divider" aria-hidden="true" />

              <div className="role-specs-table">
                <div className="role-spec-row">
                  <span className="spec-key">BOUND BY</span>
                  <span className="spec-val">Compute</span>
                </div>
                <div className="role-spec-row">
                  <span className="spec-key">POWER PROFILE</span>
                  <span className="spec-val">Near sustained TDP</span>
                </div>
                <div className="role-spec-row">
                  <span className="spec-key">SILICON PREFERENCE</span>
                  <span className="spec-val">High arithmetic density</span>
                </div>
                <div className="role-spec-row">
                  <span className="spec-key">ENVELOPE</span>
                  <span className="spec-val">Smaller number of accelerators inside the same pod</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 02: Decode Floor */}
          <div className="role-card card-decode">
            <div className="role-card-header">
              <span className="role-badge badge-decode">02</span>
              <span className="role-name name-decode">DECODE FLOOR</span>
              <div className="role-header-line line-decode" aria-hidden="true" />
            </div>

            <div className="role-card-body">
              <span className="role-section-tag tag-decode">WHAT IT DOES</span>
              <h3 className="role-action-title">
                Emits output tokens<br />one at a time.
              </h3>

              <div className="role-divider" aria-hidden="true" />

              <div className="role-specs-table">
                <div className="role-spec-row">
                  <span className="spec-key">BOUND BY</span>
                  <span className="spec-val">Memory bandwidth</span>
                </div>
                <div className="role-spec-row">
                  <span className="spec-key">POWER PROFILE</span>
                  <span className="spec-val">Bursty</span>
                </div>
                <div className="role-spec-row">
                  <span className="spec-key">SILICON PREFERENCE</span>
                  <span className="spec-val">High bandwidth memory, high concurrency</span>
                </div>
                <div className="role-spec-row">
                  <span className="spec-key">ENVELOPE</span>
                  <span className="spec-val">The bulk of the pod</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Takeaway Banner */}
        <div className="two-roles-takeaway-card">
          <div className="takeaway-left">
            <div className="takeaway-radar-icon">
              <svg viewBox="0 0 36 36" width="32" height="32" fill="none" stroke="#38bdf8" strokeWidth="1.4">
                <circle cx="18" cy="18" r="14" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="18" cy="18" r="9" opacity="0.8" />
                <circle cx="18" cy="18" r="4" fill="rgba(56, 189, 248, 0.3)" />
                <circle cx="18" cy="18" r="1.5" fill="#38bdf8" />
                <line x1="18" y1="2" x2="18" y2="8" />
                <line x1="18" y1="28" x2="18" y2="34" />
                <line x1="2" y1="18" x2="8" y2="18" />
                <line x1="28" y1="18" x2="34" y2="18" />
              </svg>
            </div>
            <span className="takeaway-tag">THE TAKEAWAY</span>
          </div>

          <div className="takeaway-divider" aria-hidden="true" />

          <div className="takeaway-center">
            <p className="takeaway-text">
              A pod configured as a uniform block of identical GPUs is the wrong shape for inference across two distinct phases.
            </p>
          </div>

          <div className="takeaway-matrix-dots" aria-hidden="true">
            <div className="dots-grid">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="dot" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .two-roles-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .two-roles-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* ═══ Header Section: 50/50 Equal Split ═══ */
        .two-roles-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(32px, 5vw, 56px);
        }

        .two-roles-head-left {
          display: flex;
          flex-direction: column;
        }

        .two-roles-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .two-roles-dot {
          color: #38bdf8;
          font-size: 14px;
        }

        .two-roles-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .two-roles-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .two-roles-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .two-roles-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .two-roles-title {
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .two-roles-head-right {
          display: flex;
          align-items: flex-end;
          padding-bottom: 4px;
        }

        .two-roles-lead {
          font-size: clamp(15px, 1.15vw, 16.5px);
          line-height: 1.62;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }

        .desktop-br {
          display: inline;
        }

        /* ═══ 2 Cards Grid ═══ */
        .two-roles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 28px);
          margin-bottom: 24px;
        }

        .role-card {
          background: #040914;
          border-radius: 14px;
          padding: clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 32px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          position: relative;
        }

        .card-prefill {
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 0 0 24px rgba(56, 189, 248, 0.08), 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .card-decode {
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Card Header */
        .role-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .role-badge {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          line-height: 1.2;
        }

        .badge-prefill {
          border: 1px solid #38bdf8;
          background: rgba(14, 38, 74, 0.75);
          color: #38bdf8;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
        }

        .badge-decode {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .role-name {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          letter-spacing: 0.14em;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .name-prefill {
          color: #38bdf8;
        }

        .name-decode {
          color: #ffffff;
        }

        .role-header-line {
          flex: 1;
          height: 1px;
        }

        .line-prefill {
          background: rgba(56, 189, 248, 0.25);
        }

        .line-decode {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Card Body */
        .role-card-body {
          display: flex;
          flex-direction: column;
        }

        .role-section-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }

        .tag-prefill {
          color: #38bdf8;
        }

        .tag-decode {
          color: #94a3b8;
        }

        .role-action-title {
          font-size: clamp(20px, 1.8vw, 25px);
          font-weight: 700;
          line-height: 1.28;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }

        .role-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin-bottom: 8px;
        }

        /* Specs Table */
        .role-specs-table {
          display: flex;
          flex-direction: column;
        }

        .role-spec-row {
          display: grid;
          grid-template-columns: 165px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .role-spec-row:last-child {
          border-bottom: none;
        }

        .spec-key {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
        }

        .spec-val {
          font-size: 13.5px;
          line-height: 1.45;
          color: #ffffff;
          font-weight: 400;
        }

        /* ═══ Takeaway Banner ═══ */
        .two-roles-takeaway-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
          position: relative;
          overflow: hidden;
        }

        .takeaway-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .takeaway-radar-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(14, 38, 74, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
        }

        .takeaway-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .takeaway-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.12);
          flex-shrink: 0;
        }

        .takeaway-center {
          flex: 1;
        }

        .takeaway-text {
          font-size: 13.5px;
          line-height: 1.5;
          color: #cbd5e1;
          margin: 0;
        }

        .takeaway-matrix-dots {
          display: flex;
          align-items: center;
          padding-left: 16px;
        }

        .dots-grid {
          display: grid;
          grid-template-columns: repeat(6, 4px);
          gap: 5px;
        }

        .dot {
          width: 2px;
          height: 2px;
          background: rgba(56, 189, 248, 0.3);
          border-radius: 50%;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 960px) {
          .two-roles-head {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .two-roles-vertical-divider {
            display: none;
          }

          .desktop-br {
            display: none;
          }

          .two-roles-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .two-roles-takeaway-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .takeaway-divider {
            display: none;
          }

          .takeaway-matrix-dots {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
