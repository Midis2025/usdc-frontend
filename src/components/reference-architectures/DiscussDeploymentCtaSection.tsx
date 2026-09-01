"use client";

import React from "react";

interface DiscussDeploymentCtaProps {
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  subText?: React.ReactNode;
  sourcesText?: React.ReactNode;
}

export function DiscussDeploymentCtaSection({
  onCtaClick,
  subText,
  sourcesText,
}: DiscussDeploymentCtaProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      onCtaClick(e);
    } else {
      const contactSection = document.getElementById("contact") || document.getElementById("cta");
      if (contactSection) {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const defaultSub = (
    <>
      Bring the near-term number you can defend and the interconnect date you are working toward. USDC will plan the campus around both.
    </>
  );

  const defaultSources = (
    <>
      Vera Rubin NVL72 Facility Planning Summary (NVIDIA) &nbsp;•&nbsp; DigiPowerX Cerebras CS4 Business Case.<br className="mobile-only-br" />
      Reference IT loads are published planning figures, not USDC measured results. Campus pod counts are illustrative.
    </>
  );

  return (
    <div className="discuss-cta-wrapper" id="cta">
      <div className="discuss-cta-card">
        {/* Main 2-Column Content */}
        <div className="discuss-main-row">
          {/* Left Column */}
          <div className="discuss-left-col">
            <div className="discuss-eyebrow-row">
              <span className="discuss-eyebrow-dash">—</span>
              <span className="discuss-eyebrow-text">DISCUSS YOUR DEPLOYMENT</span>
            </div>

            <h2 className="discuss-title">
              Start with the workload,<br />
              then design the<br />
              infrastructure around it.
            </h2>

            <div className="discuss-accent-bar" aria-hidden="true" />

            <p className="discuss-sub">
              {subText || defaultSub}
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="discuss-vertical-divider" aria-hidden="true" />

          {/* Right Column: Interactive Action Box */}
          <div className="discuss-right-col">
            <div className="discuss-action-box">
              <div className="discuss-action-top">
                <div className="discuss-icon-wrap">
                  <div className="discuss-icon-halo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="rgba(56, 189, 248, 0.15)" />
                      <circle cx="9" cy="10" r="0.8" fill="#38bdf8" />
                      <circle cx="12" cy="10" r="0.8" fill="#38bdf8" />
                      <circle cx="15" cy="10" r="0.8" fill="#38bdf8" />
                    </svg>
                  </div>
                </div>

                <div className="discuss-action-text">
                  <h3 className="discuss-action-heading">
                    Ready to discuss<br />your deployment?
                  </h3>
                  <p className="discuss-action-lead">
                    Let's plan your campus<br />with confidence.
                  </p>
                </div>
              </div>

              <a
                href="#top"
                className="discuss-cta-btn"
                onClick={handleClick}
                data-cta
              >
                Discuss Your Deployment <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer / Sources Bar */}
        <div className="discuss-sources-divider" aria-hidden="true" />

        <div className="discuss-sources-row">
          <span className="discuss-sources-badge">SOURCES</span>
          <p className="discuss-sources-text">
            {sourcesText || defaultSources}
          </p>
        </div>
      </div>

      <style jsx>{`
        .discuss-cta-wrapper {
          width: 100%;
          padding: clamp(32px, 5vw, 64px) 0;
          font-family: inherit;
        }

        .discuss-cta-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 16px;
          padding: clamp(28px, 4vw, 48px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
        }

        /* ═══ Main Row (2 Columns) ═══ */
        .discuss-main-row {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) auto minmax(0, 1fr);
          align-items: center;
          gap: clamp(28px, 3.5vw, 52px);
        }

        /* Left Column */
        .discuss-left-col {
          display: flex;
          flex-direction: column;
        }

        .discuss-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .discuss-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .discuss-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .discuss-title {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0 0 18px;
        }

        .discuss-accent-bar {
          width: 32px;
          height: 2px;
          background: #38bdf8;
          border-radius: 1px;
          margin-bottom: 18px;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
        }

        .discuss-sub {
          font-size: clamp(14px, 1.1vw, 15.5px);
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
          max-width: 520px;
        }

        /* Vertical Divider */
        .discuss-vertical-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
          align-self: stretch;
          min-height: 200px;
        }

        /* Right Column Action Box */
        .discuss-right-col {
          display: flex;
          align-items: center;
        }

        .discuss-action-box {
          width: 100%;
          background: radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.2) 0%, rgba(8, 16, 36, 0.7) 100%);
          border: 1px solid rgba(56, 189, 248, 0.28);
          border-radius: 14px;
          padding: clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .discuss-action-top {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .discuss-icon-wrap {
          flex-shrink: 0;
        }

        .discuss-icon-halo {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(14, 38, 74, 0.75);
          border: 1px solid rgba(56, 189, 248, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }

        .discuss-action-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .discuss-action-heading {
          font-size: clamp(16px, 1.25vw, 18px);
          font-weight: 700;
          line-height: 1.3;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .discuss-action-lead {
          font-size: 13px;
          line-height: 1.42;
          color: #94a3b8;
          margin: 0;
        }

        .discuss-cta-btn {
          width: 100%;
          background: #1d4ed8;
          color: #ffffff;
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 8px;
          padding: 14px 20px;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 18px rgba(29, 78, 216, 0.45);
        }

        .discuss-cta-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(37, 99, 235, 0.6);
        }

        .btn-arrow {
          font-size: 15px;
          transition: transform 0.2s ease;
        }

        .discuss-cta-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* ═══ Footer / Sources ═══ */
        .discuss-sources-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.07);
          margin-top: 36px;
          margin-bottom: 24px;
        }

        .discuss-sources-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .discuss-sources-badge {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(14, 38, 74, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.35);
          padding: 4px 12px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .discuss-sources-text {
          font-size: 12.5px;
          line-height: 1.55;
          color: #64748b;
          margin: 0;
        }

        .mobile-only-br {
          display: none;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 900px) {
          .discuss-main-row {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .discuss-vertical-divider {
            display: none;
          }

          .discuss-sources-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .mobile-only-br {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}
