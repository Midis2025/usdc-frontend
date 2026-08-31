"use client";

import React from "react";

export interface FacilityCardItem {
  number: string;
  title: string;
  desc: string;
  tag: string;
  icon: React.ReactNode;
}

export interface FacilityImpactSectionProps {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  cards: FacilityCardItem[];
  id?: string;
}

export function FacilityImpactSection({
  index = "06 / 07",
  eyebrow = "What This Means for the Facility",
  title,
  lead,
  cards,
  id = "fac-section",
}: FacilityImpactSectionProps) {
  return (
    <section className="fac-impact-section" aria-labelledby={id}>
      <div className="fac-impact-container">
        {/* Header */}
        <div className="fac-impact-head">
          <div className="fac-impact-head-left">
            <div className="fac-meta-row">
              <span className="fac-index">{index}</span>
            </div>
            <div className="fac-eyebrow-row">
              <span className="fac-eyebrow-dash">—</span>
              <span className="fac-eyebrow-text">{eyebrow}</span>
            </div>
            <h2 id={id} className="fac-title">
              {title}
            </h2>
          </div>

          <div className="fac-impact-head-right">
            <p className="fac-lead">{lead}</p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="fac-cards-grid">
          {cards.map((card, idx) => (
            <article key={idx} className="fac-card">
              {/* Top Row: Icon + Card Number */}
              <div className="fac-card-top">
                <div className="fac-icon-box" aria-hidden="true">
                  {card.icon}
                </div>
                <span className="fac-card-num">{card.number}</span>
              </div>

              {/* Title & Desc */}
              <div className="fac-card-body">
                <h3 className="fac-card-title">{card.title}</h3>
                <p className="fac-card-desc">{card.desc}</p>
              </div>

              {/* Bottom Tag */}
              <div className="fac-card-footer">
                <span className="fac-card-tag-dot" aria-hidden="true" />
                <span className="fac-card-tag-text">{card.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .fac-impact-section {
          padding: clamp(36px, 4vw, 56px) 0;
          background: #030712;
          color: #ffffff;
          position: relative;
          font-family: inherit;
        }

        .fac-impact-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* ═══ Header Section: 50/50 Equal Split ═══ */
        .fac-impact-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(32px, 5vw, 56px);
        }

        .fac-impact-head-left {
          display: flex;
          flex-direction: column;
        }

        .fac-meta-row {
          margin-bottom: 12px;
        }

        .fac-index {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
        }

        .fac-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .fac-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .fac-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .fac-title {
          font-size: clamp(30px, 3.4vw, 46px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0;
        }

        .fac-impact-head-right {
          display: flex;
          align-items: flex-end;
          padding-bottom: 4px;
        }

        .fac-lead {
          font-size: clamp(15px, 1.15vw, 16.5px);
          line-height: 1.62;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }

        /* ═══ 4 Cards Grid ═══ */
        .fac-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }

        .fac-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 14px;
          padding: 24px 22px 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          position: relative;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fac-card:hover {
          border-color: rgba(56, 189, 248, 0.45);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6), 0 0 24px rgba(56, 189, 248, 0.12);
        }

        /* Top Row */
        .fac-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .fac-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(14, 38, 74, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.15);
        }

        .fac-card-num {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #64748b;
          font-weight: 700;
        }

        /* Body */
        .fac-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .fac-card-title {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .fac-card-desc {
          font-size: 13.5px;
          line-height: 1.58;
          color: #94a3b8;
          margin: 0;
        }

        /* Footer */
        .fac-card-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fac-card-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
        }

        .fac-card-tag-text {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #cbd5e1;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 1080px) {
          .fac-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .fac-impact-head {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .fac-vertical-divider {
            display: none;
          }

          .fac-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Presets for RA-01, RA-02, RA-03
// ═══════════════════════════════════════════════════════════════════════════

export function Ra1FacilitySection() {
  const cards: FacilityCardItem[] = [
    {
      number: "01",
      title: "Capacity tracks demand",
      desc: "Capacity is added in pod increments rather than hall increments, so capital tracks demand instead of leading it.",
      tag: "Pod increments",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Repeatable engineering",
      desc: "The power and cooling design at pod six is the design at pod one. Nothing is re-engineered mid growth.",
      tag: "Pod 06 = Pod 01",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Silicon flexibility",
      desc: "Silicon is chosen per pod. A later pod can hold a different accelerator generation, or a different vendor, without disturbing the pods already running.",
      tag: "Chosen per pod",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Less stranded build",
      desc: "If the demand curve flattens, there is no stranded shell. The pods that were never built were never paid for.",
      tag: "No stranded shell",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
  ];

  return (
    <FacilityImpactSection
      id="ra1-fac"
      index="06 / 07"
      eyebrow="What This Means for the Facility"
      title="Capital tracks demand instead of leading it."
      lead="The argument that separates a repeatable pod campus from a hall built once."
      cards={cards}
    />
  );
}

export function Ra2FacilitySection() {
  const cards: FacilityCardItem[] = [
    {
      number: "01",
      title: "Power per role",
      desc: "Prefill sits near sustained TDP while decode is bursty. Metering and cooling them as a single averaged load oversizes one and starves the other. A sidecar lets power and cooling be provisioned per role.",
      tag: "Two profiles",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Refresh per role",
      desc: "Prefill silicon can be replaced on a different schedule than decode silicon, and only the sidecar is opened. The decode floor keeps running.",
      tag: "Two cycles",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Vendor per role",
      desc: "The two roles do not have to come from the same vendor. A high arithmetic density accelerator can serve prefill while current generation GPUs serve decode. This is where GPU agnostic stops being a slogan.",
      tag: "Two logos",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Train, then serve",
      desc: "The same pod serves training between contracts and disaggregated inference under them. The reconfiguration is a software and sidecar change, not a rebuild.",
      tag: "No rebuild",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <FacilityImpactSection
      id="ra2-fac"
      index="06 / 07"
      eyebrow="What This Means for the Facility"
      title="Where the argument stops being a software argument."
      lead="This is where it becomes a USDC argument."
      cards={cards}
    />
  );
}

export function Ra3FacilitySection() {
  const cards: FacilityCardItem[] = [
    {
      number: "01",
      title: "Inter-site fabric",
      desc: "Three diverse paths with a round trip target under ten milliseconds, as described on the Global Network page, make cross-site cache reuse and session migration practical.",
      tag: "<10 ms · 3 paths",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "East–west provisioning",
      desc: "Cache movement is a bandwidth consumer, not a rounding error. Sites have to be provisioned for east to west traffic between pods, not only for north to south traffic to the internet.",
      tag: "Pod ↔ pod",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 11 21 7 17 3" />
          <line x1="21" y1="7" x2="9" y2="7" />
          <polyline points="7 21 3 17 7 13" />
          <line x1="15" y1="17" x2="3" y2="17" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Land on fiber routes",
      desc: "Land selection favours parcels on dense fiber routes over the lowest cost acreage. A cheaper parcel that adds latency between sites removes the reason the footprint exists.",
      tag: "Fiber over acreage",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Capacity as scheduling",
      desc: "A customer can be routed to whichever site has capacity while the session context follows them, which converts a multi site footprint from an operational burden into a scheduling advantage.",
      tag: "Context follows",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <FacilityImpactSection
      id="ra3-fac"
      index="06 / 07"
      eyebrow="What This Means for the Facility"
      title="Fiber adjacency becomes a siting requirement."
      lead="A shared cache tier is only useful if the sites holding it are close in network terms. That turns fiber adjacency into a siting requirement rather than a convenience, and it is the strongest available argument for how USDC selects land."
      cards={cards}
    />
  );
}
