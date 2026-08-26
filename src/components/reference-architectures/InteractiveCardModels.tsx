"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/* -------------------------------------------------------------
 * 1. Index View Interactive Cards
 * ------------------------------------------------------------- */
interface IndexCardsProps {
  onNavigate?: (route: string) => void;
}

export function IndexCards({ onNavigate }: IndexCardsProps) {
  const handleClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = "#" + route;
    }
  };

  return (
    <div className="container cards">
      {/* ═══ Card 01: Modular Pod Growth ═══ */}
      <a
        className="panel card in-view"
        href="#/ra-01"
        onClick={(e) => handleClick(e, "/ra-01")}
      >
        <span className="eyebrow">Reference Architecture 01</span>
        <h2>Start with one pod and grow to a cluster without redesigning the build.</h2>
        <p className="sum">
          Most buyers need two to three megawatts now and cannot commit to twenty. The pod is the unit of purchase, so the second and sixth pod land on the same design as the first.
        </p>
        
        <div className="viz" aria-hidden="true">
          <svg className="dg mini interactive-mini" viewBox="0 0 300 150">
            <defs>
              {/* Glow Filters */}
              <filter id="m1-glow-p" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="m1-glow-c" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Particle Paths */}
              <path id="m1-p-pod1" d="M55 44 V60 H55 V82" />
              <path id="m1-p-pod2" d="M55 44 V60 H150 V82" />
              <path id="m1-c-pod1" d="M245 44 V68 H62 V82" />
              <path id="m1-c-pod2" d="M245 44 V68 H157 V82" />
              <path id="m1-net-bus" d="M55 118 V130 H150 V118" />
            </defs>

            {/* Background Container Box */}
            <rect x="6" y="6" width="288" height="138" rx="4" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />

            {/* Top Facility Systems */}
            <g className="box">
              <rect x="20" y="20" width="70" height="24" rx="3" className="transition-all duration-300" />
              <rect x="115" y="20" width="70" height="24" rx="3" className="transition-all duration-300" />
              <rect x="210" y="20" width="70" height="24" rx="3" className="transition-all duration-300" />
            </g>
            <text x="26" y="36" className="t1 font-semibold">SUBSTN</text>
            <text x="121" y="36" className="dim">CONTROL</text>
            <text x="216" y="36" className="t1 font-semibold" style={{ fill: "var(--cool)" }}>COOLING</text>

            {/* Power & Cooling Distribution Header Wires */}
            <path className="wire power" d="M55 44 V60 H245 V44" style={{ strokeWidth: 1.5 }} />
            <path className="wire cool" d="M245 60 V68 H55" style={{ strokeWidth: 1.5 }} />

            {/* Bottom Pod Clusters */}
            <g className="box">
              <rect x="20" y="82" width="70" height="36" rx="3" className="cold" />
              <rect x="115" y="82" width="70" height="36" rx="3" className="cold" />
              <rect x="210" y="82" width="70" height="36" rx="3" strokeDasharray="3 3" fill="none" className="opacity-40" />
            </g>

            {/* Feeder Taps */}
            <path className="wire power" d="M55 60 V82 M150 60 V82" style={{ strokeWidth: 1.5 }} />
            <path className="wire cool" d="M62 68 V82 M157 68 V82" style={{ strokeWidth: 1.5 }} />

            <text x="26" y="104" className="t1 font-semibold">POD 01</text>
            <text x="121" y="104" className="t1 font-semibold">POD 02</text>
            <text x="216" y="104" className="dim">POD 03</text>

            {/* Network Fabric Link */}
            <path className="wire net" d="M55 118 V130 H150 V118" />

            {/* ═══ LIVE RUNNING PARTICLES ═══ */}
            {/* Power Pulses (Substation -> Pod 01) */}
            <circle r="2.6" fill="var(--accent)" filter="url(#m1-glow-p)">
              <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s" calcMode="linear">
                <mpath href="#m1-p-pod1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#fff" opacity="0.9">
              <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.2s" calcMode="linear">
                <mpath href="#m1-p-pod1" />
              </animateMotion>
            </circle>

            {/* Power Pulses (Substation -> Pod 02) */}
            <circle r="2.6" fill="var(--accent)" filter="url(#m1-glow-p)">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.4s" calcMode="linear">
                <mpath href="#m1-p-pod2" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#fff" opacity="0.9">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.8s" calcMode="linear">
                <mpath href="#m1-p-pod2" />
              </animateMotion>
            </circle>

            {/* Cooling Pulses (Cooling Plant -> Pod 01) */}
            <circle r="2.6" fill="var(--cool)" filter="url(#m1-glow-c)">
              <animateMotion dur="3s" repeatCount="indefinite" begin="0s" calcMode="linear">
                <mpath href="#m1-c-pod1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#fff" opacity="0.8">
              <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" calcMode="linear">
                <mpath href="#m1-c-pod1" />
              </animateMotion>
            </circle>

            {/* Cooling Pulses (Cooling Plant -> Pod 02) */}
            <circle r="2.6" fill="var(--cool)" filter="url(#m1-glow-c)">
              <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.7s" calcMode="linear">
                <mpath href="#m1-c-pod2" />
              </animateMotion>
            </circle>

            {/* Network Fabric Packet */}
            <circle r="2.2" fill="var(--net)">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0s" calcMode="linear">
                <mpath href="#m1-net-bus" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <div className="mstrip">
          <div>
            <div className="v">~2.8 MW</div>
            <div className="l">NVIDIA Vera Rubin NVL72 reference IT load</div>
          </div>
          <div>
            <div className="v">4–6 pods</div>
            <div className="l">Illustrative 10–15 MW campus</div>
          </div>
        </div>
        <span className="link">
          Read the architecture <span className="arrow" aria-hidden="true">→</span>
        </span>
      </a>

      {/* ═══ Card 02: Prefill Sidecar & Decode Floor ═══ */}
      <a
        className="panel card in-view"
        href="#/ra-02"
        onClick={(e) => handleClick(e, "/ra-02")}
      >
        <span className="eyebrow">Reference Architecture 02</span>
        <h2>A pod is two machines, a prefill sidecar and a decode floor.</h2>
        <p className="sum">
          Serving a model has two phases with opposite hardware appetites. Splitting them inside one pod lets each phase run on the silicon it actually needs.
        </p>
        
        <div className="viz" aria-hidden="true">
          <svg className="dg mini interactive-mini" viewBox="0 0 300 150">
            <defs>
              <filter id="m2-glow-w" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="m2-kv-bridge" d="M100 80 H130" />
              <path id="m2-prefill-rack1" d="M30 86 H90" />
              <path id="m2-prefill-rack2" d="M30 96 H90" />
              <path id="m2-decode-rack1" d="M140 86 H270" />
              <path id="m2-decode-rack2" d="M140 96 H270" />
              <path id="m2-decode-rack3" d="M140 106 H270" />
            </defs>

            {/* Outer Pod Envelope */}
            <rect x="6" y="6" width="288" height="138" rx="4" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
            <text x="14" y="22" className="t2 font-medium">ONE POD · TWO ROLES</text>

            {/* Left Box: Prefill Sidecar */}
            <rect x="20" y="40" width="80" height="80" rx="3" className="hot" />
            <text x="28" y="58" className="t1 font-semibold" style={{ fill: "var(--warm)" }}>PREFILL</text>
            <text x="28" y="70" className="dim">SIDECAR</text>

            {/* Right Box: Decode Floor */}
            <rect x="130" y="40" width="150" height="80" rx="3" className="cold" />
            <text x="138" y="58" className="t1 font-semibold" style={{ fill: "var(--accent)" }}>DECODE</text>
            <text x="138" y="70" className="dim">FLOOR</text>

            {/* Compute Racks */}
            <g className="rk">
              <line x1="30" y1="86" x2="90" y2="86" stroke="var(--warm)" opacity="0.4" />
              <line x1="30" y1="96" x2="90" y2="96" stroke="var(--warm)" opacity="0.4" />
            </g>
            <g className="rk">
              <line x1="140" y1="86" x2="270" y2="86" stroke="var(--accent)" opacity="0.4" />
              <line x1="140" y1="96" x2="270" y2="96" stroke="var(--accent)" opacity="0.4" />
              <line x1="140" y1="106" x2="270" y2="106" stroke="var(--accent)" opacity="0.4" />
            </g>

            {/* KV Transfer Bridge */}
            <path className="wire net" d="M100 80 H130" style={{ strokeWidth: 1.5 }} />
            <text x="107" y="74" className="dim font-mono font-bold" style={{ fill: "var(--warm)", fontSize: 9 }}>KV</text>

            {/* ═══ LIVE RUNNING PARTICLES ═══ */}
            {/* Rapid KV Cache Transfer Stream (Prefill -> Decode) */}
            <circle r="3" fill="var(--warm)" filter="url(#m2-glow-w)">
              <animateMotion dur="1.2s" repeatCount="indefinite" begin="0s" calcMode="linear">
                <mpath href="#m2-kv-bridge" />
              </animateMotion>
            </circle>
            <circle r="2.2" fill="#fff" opacity="0.95">
              <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.4s" calcMode="linear">
                <mpath href="#m2-kv-bridge" />
              </animateMotion>
            </circle>
            <circle r="2.6" fill="var(--warm)" filter="url(#m2-glow-w)">
              <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.8s" calcMode="linear">
                <mpath href="#m2-kv-bridge" />
              </animateMotion>
            </circle>

            {/* Prefill Compute Load Pulses */}
            <circle r="1.8" fill="var(--warm)">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="0s" calcMode="linear">
                <mpath href="#m2-prefill-rack1" />
              </animateMotion>
            </circle>
            <circle r="1.8" fill="var(--warm)">
              <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.9s" calcMode="linear">
                <mpath href="#m2-prefill-rack2" />
              </animateMotion>
            </circle>

            {/* Decode Memory Bandwidth Pulses */}
            <circle r="2" fill="var(--accent)">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.2s" calcMode="linear">
                <mpath href="#m2-decode-rack1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--accent)">
              <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.8s" calcMode="linear">
                <mpath href="#m2-decode-rack2" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--accent)">
              <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.4s" calcMode="linear">
                <mpath href="#m2-decode-rack3" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <div className="mstrip">
          <div>
            <div className="v q">Prefill: compute-bound, near sustained TDP</div>
          </div>
          <div>
            <div className="v q">Decode: bandwidth-bound, bursty</div>
          </div>
        </div>
        <span className="link">
          Read the architecture <span className="arrow" aria-hidden="true">→</span>
        </span>
      </a>

      {/* ═══ Card 03: KV Cache Network Backbone ═══ */}
      <a
        className="panel card in-view"
        href="#/ra-03"
        onClick={(e) => handleClick(e, "/ra-03")}
      >
        <span className="eyebrow">Reference Architecture 03</span>
        <h2>KV cache becomes a network service across the USDC footprint.</h2>
        <p className="sum">
          Agentic workloads send the same long context back to the model over and over. A shared cache tier turns that repetition from a cost into an advantage, and it only works if the sites sit on good fiber.
        </p>
        
        <div className="viz" aria-hidden="true">
          <svg className="dg mini interactive-mini" viewBox="0 0 300 150">
            <defs>
              <filter id="m3-glow-net" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* 3 Diverse Fiber Paths */}
              <path id="m3-path1-forward" d="M120 60 H180" />
              <path id="m3-path2-wave" d="M120 75 C140 60 160 90 180 75" />
              <path id="m3-path2-rev" d="M180 75 C160 90 140 60 120 75" />
              <path id="m3-path3-rev" d="M180 90 H120" />
            </defs>

            {/* Outer Box */}
            <rect x="6" y="6" width="288" height="138" rx="4" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />

            {/* Site A & Site B Nodes */}
            <g className="box">
              <rect x="20" y="30" width="100" height="90" rx="3" className="cold" />
              <rect x="180" y="30" width="100" height="90" rx="3" className="cold" />
            </g>
            <text x="28" y="46" className="t1 font-bold">SITE A</text>
            <text x="188" y="46" className="t1 font-bold">SITE B</text>

            {/* Tier Levels (GPU -> CPU -> NVMe -> Pool) */}
            <g className="rk">
              <line x1="30" y1="60" x2="110" y2="60" />
              <line x1="30" y1="72" x2="110" y2="72" />
              <line x1="30" y1="84" x2="110" y2="84" />
              <line x1="30" y1="96" x2="110" y2="96" />
            </g>
            <g className="rk">
              <line x1="190" y1="60" x2="270" y2="60" />
              <line x1="190" y1="72" x2="270" y2="72" />
              <line x1="190" y1="84" x2="270" y2="84" />
              <line x1="190" y1="96" x2="270" y2="96" />
            </g>
            <text x="28" y="112" className="dim" style={{ fontSize: 7.5 }}>GPU·CPU·NVME·POOL</text>
            <text x="188" y="112" className="dim" style={{ fontSize: 7.5 }}>GPU·CPU·NVME·POOL</text>

            {/* 3 Diverse Fiber Interconnects */}
            <path className="wire net" d="M120 60 H180" style={{ stroke: "var(--accent)", strokeDasharray: "3 2" }} />
            <path className="wire net" d="M120 75 C140 60 160 90 180 75" style={{ stroke: "var(--cool)", strokeDasharray: "none", strokeWidth: 1.4 }} />
            <path className="wire net" d="M120 90 H180" style={{ stroke: "var(--net)", strokeDasharray: "3 2" }} />

            <text x="116" y="136" className="dim font-mono font-semibold" style={{ letterSpacing: "0.1em" }}>
              BACKBONE · 3 PATHS · &lt;10 MS
            </text>

            {/* ═══ LIVE RUNNING PARTICLES ═══ */}
            {/* Primary Fiber Route (Site A -> Site B) */}
            <circle r="2.8" fill="var(--accent)" filter="url(#m3-glow-net)">
              <animateMotion dur="1.4s" repeatCount="indefinite" begin="0s" calcMode="linear">
                <mpath href="#m3-path1-forward" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#fff">
              <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.7s" calcMode="linear">
                <mpath href="#m3-path1-forward" />
              </animateMotion>
            </circle>

            {/* Diverse Express Wave Route (Site A <-> Site B) */}
            <circle r="3" fill="var(--cool)" filter="url(#m3-glow-net)">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.2s" calcMode="linear">
                <mpath href="#m3-path2-wave" />
              </animateMotion>
            </circle>
            <circle r="2.6" fill="var(--warm)" filter="url(#m3-glow-net)">
              <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.1s" calcMode="linear">
                <mpath href="#m3-path2-rev" />
              </animateMotion>
            </circle>

            {/* Redundant Low-Latency Sync Path (Site B -> Site A) */}
            <circle r="2.6" fill="var(--net)" filter="url(#m3-glow-net)">
              <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.5s" calcMode="linear">
                <mpath href="#m3-path3-rev" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <div className="mstrip">
          <div>
            <div className="v">1.7 → 92.2%</div>
            <div className="l">Cache hit rate on Codex traces (vLLM + Mooncake, published)</div>
          </div>
          <div>
            <div className="v">&lt;10 ms</div>
            <div className="l">Inter-site round-trip target, three diverse paths</div>
          </div>
        </div>
        <span className="link">
          Read the architecture <span className="arrow" aria-hidden="true">→</span>
        </span>
      </a>
    </div>
  );
}

/* -------------------------------------------------------------
 * 2. Interactive Flow Toggles (Power / Cooling / Network)
 * ------------------------------------------------------------- */
const FLOW_HELP = {
  ra1: {
    power: "Power: utility interconnect → substation → bus → every energized pod. Shared upstream, tapped per pod.",
    cooling: "Cooling: one plant → headers sized for the end state → each pod taps the header as it arrives.",
    network: "Network: the skid joins Pods 01–03 into a single fabric. One skid serves up to five IT pods.",
    none: "Hover or press a system to trace its path through the campus.",
  },
  ra2: {
    power: "Prefill sidecar: a smaller number of compute-dense accelerators, fed and cooled for sustained load, on its own refresh cycle.",
    cooling: "Decode floor: the bulk of the pod, chosen for bandwidth and concurrency, fed and cooled for bursty load.",
    network: "Pod fabric: joins the two roles. The KV cache moves sidecar → floor across it.",
    none: "Hover or press a role to see what it owns inside the pod.",
  },
  ra3: {
    power: "Node scope: GPU memory → CPU memory → local NVMe on one node.",
    cooling: "Site scope: the site pool, readable by any pod at fabric speed. East–west traffic between pods.",
    network: "Footprint scope: the pool extended across the backbone to other sites, at backbone speed.",
    none: "Hover or press a scope to see which tiers it spans.",
  },
};

interface FlowToggleProps {
  id: "ra1" | "ra2" | "ra3";
  activeFlow: string | null;
  onFlowChange: (flow: string | null) => void;
}

export function FlowToggle({ id, activeFlow, onFlowChange }: FlowToggleProps) {
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null);
  const helpObj = FLOW_HELP[id] || FLOW_HELP.ra1;

  const currentDisplayFlow = hoveredFlow || activeFlow;
  const currentHelpText = currentDisplayFlow
    ? helpObj[currentDisplayFlow as keyof typeof helpObj] || helpObj.none
    : helpObj.none;

  const handleBtnClick = (flow: string) => {
    if (activeFlow === flow) {
      onFlowChange(null);
    } else {
      onFlowChange(flow);
    }
  };

  const labels =
    id === "ra1"
      ? [
          { flow: "power", label: "Power", swStyle: {} },
          { flow: "cooling", label: "Cooling", swStyle: {} },
          { flow: "network", label: "Network", swStyle: {} },
        ]
      : id === "ra2"
      ? [
          { flow: "power", label: "Prefill", swStyle: { background: "var(--warm)" } },
          { flow: "cooling", label: "Decode", swStyle: { background: "var(--accent)" } },
          { flow: "network", label: "Fabric", swStyle: {} },
        ]
      : [
          { flow: "power", label: "Node", swStyle: {} },
          { flow: "cooling", label: "Site", swStyle: { background: "var(--accent)" } },
          { flow: "network", label: "Footprint", swStyle: {} },
        ];

  return (
    <>
      <div className="flow-toggle" role="group" aria-label="Highlight infrastructure flow">
        {labels.map((item) => (
          <button
            key={item.flow}
            className="flow-btn"
            type="button"
            data-flow={item.flow}
            aria-pressed={activeFlow === item.flow}
            onClick={() => handleBtnClick(item.flow)}
            onMouseEnter={() => setHoveredFlow(item.flow)}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <span className="sw" aria-hidden="true" style={item.swStyle}></span>
            {item.label}
          </button>
        ))}
      </div>
      <p className="flow-help" data-flow-help>
        {currentHelpText}
      </p>
    </>
  );
}

/* -------------------------------------------------------------
 * 3. RA-01 Phase Tabs Switcher
 * ------------------------------------------------------------- */
export function Ra1PhaseTabs() {
  const [currentPhase, setCurrentPhase] = useState(1);

  const phaseData = {
    1: {
      title: "Phase 01 · One pod",
      note: "<strong>Phase 01.</strong> One pod is built and energized. The substation, pad, yard and cooling headers are already sized for the full campus, so nothing is re-engineered later.",
    },
    2: {
      title: "Phase 02 · Add pods",
      note: "<strong>Phase 02.</strong> Pods 02 and 03 land on the same pad and share the substation and cooling plant. Incremental pod capital only. Until the skid arrives they operate as three islands.",
    },
    3: {
      title: "Phase 03 · Add network skid",
      note: "<strong>Phase 03.</strong> A network skid is added, one per five IT pods. The three pods become one fabric. The compute already in place is unaffected.",
    },
  };

  const currentInfo = phaseData[currentPhase as 1 | 2 | 3] || phaseData[1];

  return (
    <div className="phases" data-phases="ra1">
      <div className="phase-list reveal" role="tablist" aria-label="Deployment phases" aria-orientation="vertical">
        <button
          className="phase"
          role="tab"
          id="ra1-tab-1"
          aria-selected={currentPhase === 1}
          aria-controls="ra1-stage"
          data-phase="1"
          onClick={() => setCurrentPhase(1)}
        >
          <span className="num">PHASE 01</span>
          <span>
            <h3>One Pod</h3>
            <p>Substation, pad, yard and headers prepared for the wider campus.</p>
            <span className="cost">One pod of capital · shared site work carried by USDC</span>
          </span>
        </button>
        <button
          className="phase"
          role="tab"
          id="ra1-tab-2"
          aria-selected={currentPhase === 2}
          aria-controls="ra1-stage"
          data-phase="2"
          onClick={() => setCurrentPhase(2)}
        >
          <span className="num">PHASE 02</span>
          <span>
            <h3>Add Pods</h3>
            <p>Pods two and three on the same pad, sharing the substation and the cooling plant.</p>
            <span className="cost">Incremental pod capital only · no redesign, no second permitting cycle</span>
          </span>
        </button>
        <button
          className="phase"
          role="tab"
          id="ra1-tab-3"
          aria-selected={currentPhase === 3}
          aria-controls="ra1-stage"
          data-phase="3"
          onClick={() => setCurrentPhase(3)}
        >
          <span className="num">PHASE 03</span>
          <span>
            <h3>Add Network Skid</h3>
            <p>One network skid per five IT pods. The pods become one fabric rather than three islands.</p>
            <span className="cost">Incremental network capital · compute already in place is unaffected</span>
          </span>
        </button>
      </div>

      <div className="panel phase-stage reveal" data-delay="1" id="ra1-stage" role="tabpanel" aria-labelledby={`ra1-tab-${currentPhase}`}>
        <div className="bar">
          <span className="micro" data-phase-title>{currentInfo.title}</span>
          <span className="micro">Plan view · not to scale</span>
        </div>
        <svg className="dg ps" data-phase-svg viewBox="0 0 600 340" aria-hidden="true">
          <rect x="10" y="10" width="580" height="320" rx="5" fill="rgba(255,255,255,.02)" stroke="var(--line-strong)" strokeDasharray="3 3" />
          <text x="20" y="30">Shared campus systems · sized for end state</text>
          <g transform="translate(20,46)">
            <rect className="box" width="150" height="40" rx="3" />
            <text x="10" y="24">Substation</text>
          </g>
          <g transform="translate(225,46)">
            <rect className="box" width="150" height="40" rx="3" />
            <text x="10" y="24">Control plane</text>
          </g>
          <g transform="translate(430,46)">
            <rect className="box" width="150" height="40" rx="3" />
            <text x="10" y="24">Cooling plant</text>
          </g>
          <path className="wire power pwr on-line" d="M95 86 V120 H505" />
          <path className="wire cool cl on-line" d="M505 86 V132 H95" />
          <text x="102" y="115">Bus</text>
          <text x="440" y="146">Headers</text>
          <path className="wire power pwr d1 on-line" d="M90 120 V160" />
          <path className="wire cool cl d1 on-line" d="M106 132 V160" />
          <path className={`wire power pwr d2 ${currentPhase >= 2 ? "on-line" : ""}`} d="M290 120 V160" />
          <path className={`wire cool cl d2 ${currentPhase >= 2 ? "on-line" : ""}`} d="M306 132 V160" />
          <path className={`wire power pwr d3 ${currentPhase >= 2 ? "on-line" : ""}`} d="M490 120 V160" />
          <path className={`wire cool cl d3 ${currentPhase >= 2 ? "on-line" : ""}`} d="M506 132 V160" />

          {/* Pods */}
          <g className="pod p1 on" transform="translate(20,160)">
            <rect className="frame" width="160" height="80" rx="3" />
            <g className="rk">
              <line x1="16" y1="36" x2="144" y2="36" />
              <line x1="16" y1="46" x2="144" y2="46" />
              <line x1="16" y1="56" x2="144" y2="56" />
              <line x1="16" y1="66" x2="144" y2="66" />
            </g>
            <text x="10" y="22">Pod 01</text>
          </g>

          <g className={`pod p2 ${currentPhase >= 2 ? "on" : ""}`} transform="translate(220,160)">
            <rect className="frame" width="160" height="80" rx="3" />
            <g className="rk">
              <line x1="16" y1="36" x2="144" y2="36" />
              <line x1="16" y1="46" x2="144" y2="46" />
              <line x1="16" y1="56" x2="144" y2="56" />
              <line x1="16" y1="66" x2="144" y2="66" />
            </g>
            <text x="10" y="22">Pod 02</text>
          </g>

          <g className={`pod p3 ${currentPhase >= 2 ? "on" : ""}`} transform="translate(420,160)">
            <rect className="frame" width="160" height="80" rx="3" />
            <g className="rk">
              <line x1="16" y1="36" x2="144" y2="36" />
              <line x1="16" y1="46" x2="144" y2="46" />
              <line x1="16" y1="56" x2="144" y2="56" />
              <line x1="16" y1="66" x2="144" y2="66" />
            </g>
            <text x="10" y="22">Pod 03</text>
          </g>

          <g className={`island isl ${currentPhase === 2 ? "on" : ""}`}>
            <rect x="14" y="154" width="172" height="92" rx="4" />
            <rect x="214" y="154" width="172" height="92" rx="4" />
            <rect x="414" y="154" width="172" height="92" rx="4" />
            <text x="20" y="262">Three islands · no shared fabric yet</text>
          </g>

          <path className={`wire net draw fab ${currentPhase >= 3 ? "on" : ""}`} d="M100 240 V270 H500 V240" />
          <path className={`wire net draw fab ${currentPhase >= 3 ? "on" : ""}`} d="M300 240 V285" />

          <g transform="translate(220,285)">
            <g className={`rise skid ${currentPhase >= 3 ? "on" : ""}`}>
              <rect className="box" width="160" height="36" rx="3" style={{ stroke: "var(--net)" }} />
              <text x="10" y="22">Network skid · 1 per 5 IT pods</text>
            </g>
          </g>

          <path data-pulse="power" data-phase="1" data-dur="4" data-n="2" d="M95 86 V120 H90 V160" className="on" />
          <path data-pulse="cool" data-phase="1" data-dur="4.5" data-n="1" d="M505 86 V132 H106 V160" className="on" />
          <path data-pulse="power" data-phase="2" data-dur="4.5" data-n="2" d="M95 86 V120 H290 V160" className={currentPhase >= 2 ? "on" : ""} />
          <path data-pulse="power" data-phase="2" data-dur="5" data-n="2" d="M95 86 V120 H490 V160" className={currentPhase >= 2 ? "on" : ""} />
          <path data-pulse="cool" data-phase="2" data-dur="4" data-n="1" d="M505 86 V132 H306 V160" className={currentPhase >= 2 ? "on" : ""} />
          <path data-pulse="cool" data-phase="2" data-dur="3.6" data-n="1" d="M505 86 V132 H506 V160" className={currentPhase >= 2 ? "on" : ""} />
          <path data-pulse="net" data-phase="3" data-dur="3" data-n="2" d="M300 285 V270 H100 V240" className={currentPhase >= 3 ? "on" : ""} />
          <path data-pulse="net" data-phase="3" data-dur="3" data-n="2" d="M300 285 V270 H500 V240" className={currentPhase >= 3 ? "on" : ""} />
        </svg>
        <p className="phase-note" data-phase-note dangerouslySetInnerHTML={{ __html: currentInfo.note }} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 4. Step Lists Switcher (RA-02 & RA-03)
 * ------------------------------------------------------------- */
interface StepsSwitcherProps {
  id: "ra2" | "ra3";
}

const STEP_DATA = {
  ra2: {
    steps: [
      { num: "01", heading: "Route", text: "The serving stack routes the incoming request to a prefill worker." },
      { num: "02", heading: "Prefill computes the KV cache", text: "The prefill engine reads the prompt and builds the cache under sustained compute load." },
      { num: "03", heading: "NIXL moves the cache", text: "In NVIDIA Dynamo the transfer is handled by NIXL, directly from the video memory of the prefill engine to the video memory of the decode engine. The transfer is non blocking, so GPU forward passes continue serving other requests while it happens." },
      { num: "04", heading: "Decode starts immediately", text: "With the SGLang backend, prefill runs as a background task and decode begins immediately while the transfer proceeds in parallel." },
    ],
    notes: {
      1: { title: "Step 01 · Route", note: "<strong>Step 01.</strong> The router sends the request to a prefill worker." },
      2: { title: "Step 02 · Prefill", note: "<strong>Step 02.</strong> The prefill worker computes the KV cache under sustained compute load." },
      3: { title: "Step 03 · Transfer", note: "<strong>Step 03.</strong> NIXL moves the cache from prefill GPU memory to decode GPU memory. Non-blocking: forward passes keep serving other requests." },
      4: { title: "Step 04 · Decode", note: "<strong>Step 04.</strong> Decode begins immediately and emits tokens while the transfer completes in parallel (SGLang backend)." },
    },
    source: "NVIDIA Dynamo documentation, disaggregated serving design notes.",
  },
  ra3: {
    steps: [
      { num: "01", heading: "Mooncake Store · pool", text: "Runs a cluster wide distributed KV cache pool, with a master server holding metadata and clients on each GPU node." },
      { num: "02", heading: "GPUDirect RDMA · transfer", text: "Moves cache without consuming GPU streaming multiprocessors and without a CPU staging buffer, on dedicated background threads so GPU kernel launches are not blocked." },
      { num: "03", heading: "LMCache · tiers and reuse", text: "Does the same job across GPU memory, CPU memory, local SSD, and remote backends, and reuses cache across requests, sessions, and engine instances." },
    ],
    notes: {
      1: { title: "Step 01 · Pool", note: "<strong>Step 01.</strong> Mooncake Store keeps a cluster-wide pool: one master server for metadata, a client on every GPU node." },
      2: { title: "Step 02 · Transfer", note: "<strong>Step 02.</strong> GPUDirect RDMA moves cache between nodes without consuming GPU SMs or a CPU staging buffer, on background threads." },
      3: { title: "Step 03 · Tiers", note: "<strong>Step 03.</strong> LMCache spans GPU, CPU, local SSD and remote backends, reusing cache across requests, sessions and engine instances." },
    },
    source: "",
  },
};

export function StepsSwitcher({ id }: StepsSwitcherProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const data = STEP_DATA[id];
  const stepInfo = (data.notes as Record<number, { title: string; note: string }>)[currentStep] || data.notes[1];

  return (
    <div className="phases" data-steps={id}>
      <div className="steps reveal">
        {data.steps.map((s, idx) => {
          const stepNum = idx + 1;
          return (
            <div
              key={s.num}
              className={`step ${currentStep === stepNum ? "is-on" : ""}`}
              data-step={stepNum}
              role="button"
              tabIndex={0}
              onClick={() => setCurrentStep(stepNum)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentStep(stepNum);
                }
              }}
            >
              <span className="n">{s.num}</span>
              <div>
                <h4>{s.heading}</h4>
                <p>{s.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel phase-stage reveal" data-delay="1">
        <div className="bar">
          <span className="micro" data-step-title>{stepInfo.title}</span>
          <span className="micro">{id === "ra2" ? "Disaggregated serving" : "Software layer"}</span>
        </div>

        {id === "ra2" && (
          <svg className="dg" data-step-svg viewBox="0 0 600 300" aria-hidden="true">
            <g transform="translate(20,20)">
              <rect className="box" width="130" height="40" rx="3" />
              <text x="10" y="24" className="t2">Router</text>
            </g>
            <g transform="translate(20,110)">
              <rect className="box" width="230" height="110" rx="3" />
              <text x="10" y="22" className="t2">Prefill worker</text>
              <text x="10" y="38" className="sec">GPU memory</text>
              <rect className={`hot fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2" x="10" y="52" width="210" height="44" rx="3" />
              <text x="18" y="78" className={`fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2">KV cache</text>
            </g>
            <g transform="translate(350,110)">
              <rect className="box" width="230" height="110" rx="3" />
              <text x="10" y="22" className="t2">Decode worker</text>
              <text x="10" y="38" className="sec">GPU memory</text>
              <rect className={`cold fade ${currentStep >= 3 ? "on" : ""}`} data-step-on="3" x="10" y="52" width="210" height="44" rx="3" />
              <text x="18" y="78" className={`fade ${currentStep >= 3 ? "on" : ""}`} data-step-on="3">KV cache</text>
            </g>
            <path className={`wire net draw ${currentStep >= 1 ? "on" : ""}`} data-step-on="1" d="M85 60 V110" />
            <path className={`wire warm draw ${currentStep >= 3 ? "on" : ""}`} data-step-on="3" d="M250 165 H350" />
            <text x="262" y="158" className={`sec fade ${currentStep >= 3 ? "on" : ""}`} data-step-on="3">NIXL</text>
            <text x="262" y="184" className={`sec fade ${currentStep >= 3 ? "on" : ""}`} data-step-on="3">Non-blocking</text>
            <path className={`wire power draw ${currentStep >= 4 ? "on" : ""}`} data-step-on="4" d="M465 220 V262" />
            <g className={`rise ${currentStep >= 4 ? "on" : ""}`} data-step-on="4" transform="translate(380,262)">
              <rect className="box" width="170" height="30" rx="3" />
              <text x="10" y="19" className="t2">Tokens out</text>
            </g>
            <text x="20" y="262" className={`fade sec ${currentStep >= 3 ? "on" : ""}`} data-step-on="3">Forward passes keep serving other requests</text>

            <path data-pulse="net" data-step="1" data-dur="1.8" data-n="1" d="M85 60 V110" className={currentStep === 1 ? "on" : ""} />
            <path data-pulse="warm" data-step="3" data-dur="1.6" data-n="3" d="M250 165 H350" className={currentStep === 3 ? "on" : ""} />
            <path data-pulse="power" data-step="4" data-dur="1.4" data-n="3" d="M465 220 V262" className={currentStep === 4 ? "on" : ""} />
          </svg>
        )}

        {id === "ra3" && (
          <svg className="dg" data-step-svg viewBox="0 0 600 300" aria-hidden="true">
            <g transform="translate(220,20)">
              <rect className="box" width="160" height="40" rx="3" />
              <text x="10" y="17" className="t2">Master server</text>
              <text x="10" y="32" className="sec">Metadata</text>
            </g>
            <g transform="translate(20,110)">
              <rect className="box" width="160" height="70" rx="3" />
              <text x="10" y="20" className="t2">GPU node A</text>
              <text x="10" y="36" className="sec">Client</text>
              <rect className={`cold fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2" x="10" y="44" width="140" height="18" rx="2" />
              <text x="16" y="57" className={`fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2">KV block</text>
            </g>
            <g transform="translate(220,110)">
              <rect className="box" width="160" height="70" rx="3" />
              <text x="10" y="20" className="t2">GPU node B</text>
              <text x="10" y="36" className="sec">Client</text>
              <rect className={`cold fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2" x="10" y="44" width="140" height="18" rx="2" />
              <text x="16" y="57" className={`fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2">KV block</text>
            </g>
            <g transform="translate(420,110)">
              <rect className="box" width="160" height="70" rx="3" />
              <text x="10" y="20" className="t2">GPU node C</text>
              <text x="10" y="36" className="sec">Client</text>
              <rect className={`cold fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2" x="10" y="44" width="140" height="18" rx="2" />
              <text x="16" y="57" className={`fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2">KV block</text>
            </g>
            <path className={`wire net draw ${currentStep >= 1 ? "on" : ""}`} data-step-on="1" d="M300 60 V85 H100 V110" />
            <path className={`wire net draw ${currentStep >= 1 ? "on" : ""}`} data-step-on="1" d="M300 85 V110" />
            <path className={`wire net draw ${currentStep >= 1 ? "on" : ""}`} data-step-on="1" d="M300 85 H500 V110" />
            <path className={`wire power draw ${currentStep >= 2 ? "on" : ""}`} data-step-on="2" d="M180 163 H220" />
            <path className={`wire power draw ${currentStep >= 2 ? "on" : ""}`} data-step-on="2" d="M380 163 H420" />
            <text x="20" y="210" className={`sec fade ${currentStep >= 2 ? "on" : ""}`} data-step-on="2">
              GPUDirect RDMA · no SM time · no CPU staging · background threads
            </text>
            <g className={`fade ${currentStep >= 3 ? "on" : ""}`} data-step-on="3">
              <rect x="20" y="228" width="560" height="52" rx="3" fill="none" stroke="var(--line-strong)" strokeDasharray="3 3" />
              <text x="32" y="248" className="t2">LMCache tiers</text>
              <text x="32" y="266" className="sec">GPU · CPU · local SSD · remote backends — reused across requests, sessions, engines</text>
            </g>

            <path data-pulse="net" data-step="1" data-dur="2.2" data-n="1" d="M300 60 V85 H100 V110" className={currentStep === 1 ? "on" : ""} />
            <path data-pulse="net" data-step="1" data-dur="2.2" data-n="1" d="M300 60 V85 H500 V110" className={currentStep === 1 ? "on" : ""} />
            <path data-pulse="power" data-step="2" data-dur="1.4" data-n="2" d="M180 163 H220" className={currentStep === 2 ? "on" : ""} />
            <path data-pulse="power" data-step="2" data-dur="1.4" data-n="2" d="M380 163 H420" className={currentStep === 2 ? "on" : ""} />
            <path data-pulse="net" data-step="3" data-dur="4" data-n="3" d="M32 280 H570" className={currentStep === 3 ? "on" : ""} />
          </svg>
        )}

        <p className="phase-note" data-step-note dangerouslySetInnerHTML={{ __html: stepInfo.note }} />
        {data.source && (
          <p className="source" style={{ marginTop: 16 }}>
            <b>Source.</b> {data.source}
          </p>
        )}
      </div>
    </div>
  );
}
