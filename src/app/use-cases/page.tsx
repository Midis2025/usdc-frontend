"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampusSchematicModel from "@/components/reference-architectures/CampusSchematicModel";
import WhatUsdcDeploysModel from "@/components/reference-architectures/WhatUsdcDeploysModel";
import PodReferenceCards from "@/components/reference-architectures/PodReferenceCards";
import {
  IndexCards,
  FlowToggle,
  Ra1PhaseTabs,
  StepsSwitcher,
} from "@/components/reference-architectures/InteractiveCardModels";
import useReveal from "@/components/reference-architectures/useReveal";
import useFlowPulses from "@/components/reference-architectures/useFlowPulses";
import { WhatThisDoesNotSolveSection } from "@/components/reference-architectures/WhatThisDoesNotSolveSection";
import { DiscussDeploymentCtaSection } from "@/components/reference-architectures/DiscussDeploymentCtaSection";
import { Ra1SituationSection } from "@/components/reference-architectures/Ra1SituationSection";
import { Ra2SituationSection } from "@/components/reference-architectures/Ra2SituationSection";
import { Ra2InsightPhasesSection } from "@/components/reference-architectures/Ra2InsightPhasesSection";
import { TwoRolesEnvelopesSection } from "@/components/reference-architectures/TwoRolesEnvelopesSection";
import { Ra2EngineeringConstraintSection } from "@/components/reference-architectures/Ra2EngineeringConstraintSection";
import { Ra3SituationSection } from "@/components/reference-architectures/Ra3SituationSection";
import { Ra3ConstraintScalingSection } from "@/components/reference-architectures/Ra3ConstraintScalingSection";
import { Ra3FacilityDesignMattersSection } from "@/components/reference-architectures/Ra3FacilityDesignMattersSection";
import {
  Ra1FacilitySection,
  Ra2FacilitySection,
  Ra3FacilitySection,
} from "@/components/reference-architectures/FacilityImpactSection";
import { Ra3EngineeringConstraintSection } from "@/components/reference-architectures/Ra3EngineeringConstraintSection";

interface ArchitectureSwitcherProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

function ArchitectureSwitcher({ currentRoute, onNavigate }: ArchitectureSwitcherProps) {
  const options = [
    {
      route: "/ra-01",
      num: "01",
      name: "Arch 01",
      desc: "One Pod to Cluster",
    },
    {
      route: "/ra-02",
      num: "02",
      name: "Arch 02",
      desc: "Prefill & Decode",
    },
    {
      route: "/ra-03",
      num: "03",
      name: "Arch 03",
      desc: "KV Cache Fabric",
    },
  ];

  return (
    <div className="ra-arch-switcher-wrap">
      <div className="container">
        <div className="ra-arch-switcher-bar">
          <button
            type="button"
            className="ra-arch-overview-btn"
            onClick={() => onNavigate("/")}
            title="Back to Reference Architectures Overview"
          >
            <span className="ra-arch-arrow" aria-hidden="true">←</span>
            <span className="ra-arch-overview-text">All Architectures</span>
          </button>

          <div className="ra-arch-tabs" role="tablist" aria-label="Reference Architecture Selection">
            {options.map((opt) => {
              const isActive = currentRoute === opt.route;
              return (
                <button
                  key={opt.route}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`ra-arch-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => onNavigate(opt.route)}
                >
                  <span className="ra-arch-pill-num">{opt.num}</span>
                  <span className="ra-arch-pill-name">{opt.name}</span>
                  <span className="ra-arch-pill-desc">· {opt.desc}</span>
                  {isActive && <span className="ra-arch-pill-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UseCasesPage() {
  const [currentRoute, setCurrentRoute] = useState<string>("/");
  const [flowRa1, setFlowRa1] = useState<string | null>(null);
  const [flowRa2, setFlowRa2] = useState<string | null>(null);
  const [flowRa3, setFlowRa3] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize hash routing with state
  useEffect(() => {
    const handleHash = () => {
      let hash = window.location.hash.replace(/^#\/?/, "");
      if (!hash || hash === "") {
        setCurrentRoute("/");
      } else if (hash === "ra-01" || hash === "/ra-01") {
        setCurrentRoute("/ra-01");
      } else if (hash === "ra-02" || hash === "/ra-02") {
        setCurrentRoute("/ra-02");
      } else if (hash === "ra-03" || hash === "/ra-03") {
        setCurrentRoute("/ra-03");
      }
      document.documentElement.classList.remove("route-ra-01", "route-ra-02", "route-ra-03");
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = "#" + route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Custom hooks for reveal and SVG SMIL flow pulses
  useReveal(currentRoute);
  useFlowPulses(containerRef, currentRoute);

  const PATHS: Record<string, string> = {
    "/": "Reference architectures",
    "/ra-01": "Reference Architecture 01 · /case-studies/one-pod-to-cluster",
    "/ra-02": "Reference Architecture 02 · /case-studies/prefill-sidecar",
    "/ra-03": "Reference Architecture 03 · /case-studies/kv-cache-fabric",
  };

  const handleJump = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    const activeView = document.querySelector(".view.is-active");
    const target = activeView ? activeView.querySelector(".cta") || activeView.querySelector(".cards") : document.querySelector(".cta");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="ra-page-root" ref={containerRef}>
      {/* Zero-flash route resolver for direct URL / refresh */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            try {
              var h = (window.location.hash || '').replace(/^#\\/?/, '');
              if (h === 'ra-01' || h === 'ra-02' || h === 'ra-03') {
                document.documentElement.classList.add('route-' + h);
              }
            } catch(e){}
          })();`,
        }}
      />

      <Navbar />

      <main className="pt-[85px] md:pt-[95px]">
        {/* =====================================================================
            VIEW: INDEX
            ===================================================================== */}
        <section className={`view ${currentRoute === "/" ? "is-active" : ""}`} id="view-index" data-route="/">
          <div className="index-hero-wrapper">
            {/* Hero Background Visual as-is */}
            <div className="index-hero-bg" aria-hidden="true">
              <Image
                src="/ai_up4x_hL4ZHhZG.webp"
                alt="Use Cases AI Infrastructure"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="container index-hero">
              <p className="eyebrow">Use cases · Reference architectures</p>
              <h1 id="index-title" className="h-display">
                Three architectures,<br className="hidden sm:block" /> one way of thinking about a deployment.
              </h1>
              <p className="lead">
                USDC plans deployments in a repeatable way. Each reference architecture runs the same seven blocks in the same order, states only sourced figures and closes with what it does not solve.
              </p>
              <div className="template-row" aria-label="Seven-block template">
                <div>
                  <b>01</b>Hero
                </div>
                <div>
                  <b>02</b>Situation
                </div>
                <div>
                  <b>03</b>Constraint
                </div>
                <div>
                  <b>04</b>What USDC deploys
                </div>
                <div>
                  <b>05</b>How it works
                </div>
                <div>
                  <b>06</b>For the facility
                </div>
                <div className="last">
                  <b>07</b>Does not solve
                </div>
              </div>
            </div>
          </div>

          <IndexCards onNavigate={navigateTo} />

          <div className="container" id="index-cta" style={{ marginTop: "40px" }}>
            <DiscussDeploymentCtaSection onCtaClick={handleCta} />
          </div>
        </section>

        {/* =====================================================================
            VIEW: RA-01 — One pod to cluster
            ===================================================================== */}
        <section className={`view ${currentRoute === "/ra-01" ? "is-active" : ""}`} id="view-ra-01" data-route="/ra-01" aria-labelledby="ra1-title">
          <ArchitectureSwitcher currentRoute={currentRoute} onNavigate={navigateTo} />

          {/* Hero */}
          <div className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <h1 id="ra1-title" className="h-display">
                  Start with one pod and grow to a cluster without redesigning the build.
                </h1>
                <p className="lead">
                  Most buyers need two to three megawatts now and cannot commit to twenty. The pod is the unit of purchase, so the second and sixth pod land on the same design as the first. USDC prepares the shared campus once; compute is added in pod increments as demand arrives.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#cta" onClick={handleCta} data-cta>
                    Discuss a Deployment <span className="arrow" aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn-ghost" href="#ra1-deploys" onClick={(e) => handleJump(e, "ra1-deploys")} data-jump>
                    View the architecture
                  </a>
                </div>
                <dl className="metrics" aria-label="Reference figures">
                  <div className="metric">
                    <dt className="sr-only">NVIDIA Vera Rubin NVL72 reference IT load</dt>
                    <dd className="val">~2.8<small>MW</small></dd>
                    <dd className="lbl">NVIDIA Vera Rubin NVL72 reference IT load</dd>
                  </div>
                  <div className="metric">
                    <dt className="sr-only">Cerebras CS4 reference IT load</dt>
                    <dd className="val">2.5<small>MW</small></dd>
                    <dd className="lbl">Cerebras CS4 reference IT load</dd>
                  </div>
                  <div className="metric">
                    <dt className="sr-only">Pods in an illustrative campus</dt>
                    <dd className="val">4–6<small>PODS</small></dd>
                    <dd className="lbl">Illustrative 10–15 MW campus range</dd>
                  </div>
                </dl>
              </div>

              <CampusSchematicModel id="ra1" isActive={currentRoute === "/ra-01"} />
            </div>
          </div>

          {/* 01 Situation */}
          <Ra1SituationSection />

          {/* 02 Constraint */}
          <section className="section" aria-labelledby="ra1-con">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">02 / 07</p>
                  <p className="eyebrow">The Constraint</p>
                  <h2 id="ra1-con" className="h-section">
                    The real value of modularity is repeatable engineering.
                  </h2>
                </div>
                <p className="lead">
                  Modularity is usually sold as a speed argument. Speed is real, but it is not the important part. A modular pod makes the engineering decision repeatable: if the pod is the unit of design, the tenth pod is the same engineering as the first and adding capacity stops being a redesign.
                </p>
              </div>
              <div className="grid-2">
                <div className="panel compare-col traditional reveal">
                  <p className="micro">
                    <span>Traditional expansion</span>
                    <span>Designed once</span>
                  </p>
                  <ul className="compare-list">
                    <li><span className="g" aria-hidden="true"></span>Fixed hall, sized for the whole curve</li>
                    <li><span className="g" aria-hidden="true"></span>Fixed cooling assumptions</li>
                    <li><span className="g" aria-hidden="true"></span>Fixed density assumptions</li>
                    <li><span className="g" aria-hidden="true"></span>Possible redesign during expansion</li>
                  </ul>
                  <div className="compare-viz" aria-hidden="true">
                    <svg viewBox="0 0 400 90">
                      <rect className="hall" x="4" y="10" width="392" height="70" rx="3" />
                      <text x="14" y="28">Hall · one topology · one loop · one density</text>
                      <rect x="14" y="40" width="80" height="30" rx="2" style={{ stroke: "var(--text-3)" }} />
                      <text x="22" y="59">Occupied</text>
                      <rect x="104" y="40" width="282" height="30" rx="2" style={{ stroke: "var(--line)", strokeDasharray: "2 3" }} />
                      <text x="112" y="59">Committed, empty</text>
                    </svg>
                  </div>
                </div>
                <div className="panel compare-col modular reveal" data-delay="1">
                  <p className="micro">
                    <span>Repeatable pod architecture</span>
                    <span>Designed per pod</span>
                  </p>
                  <ul className="compare-list">
                    <li><span className="g" aria-hidden="true"></span>Shared campus framework, sized for the end state</li>
                    <li><span className="g" aria-hidden="true"></span>Repeatable pod design</li>
                    <li><span className="g" aria-hidden="true"></span>Incremental capacity</li>
                    <li><span className="g" aria-hidden="true"></span>Silicon flexibility by pod</li>
                  </ul>
                  <div className="compare-viz" aria-hidden="true">
                    <svg viewBox="0 0 400 90">
                      <rect className="hall" x="4" y="10" width="392" height="70" rx="3" style={{ stroke: "var(--line-strong)" }} />
                      <text x="14" y="28">Campus framework · substation · plant · control plane</text>
                      <rect className="podbox" x="14" y="40" width="56" height="30" rx="2" /><text x="22" y="59">Pod 01</text>
                      <rect className="podbox" x="78" y="40" width="56" height="30" rx="2" /><text x="86" y="59">Pod 02</text>
                      <rect className="podbox" x="142" y="40" width="56" height="30" rx="2" /><text x="150" y="59">Pod 03</text>
                      <rect className="podbox future" x="206" y="40" width="56" height="30" rx="2" /><text x="214" y="59">04</text>
                      <rect className="podbox future" x="270" y="40" width="56" height="30" rx="2" /><text x="278" y="59">05</text>
                      <rect className="podbox future" x="334" y="40" width="52" height="30" rx="2" /><text x="342" y="59">06</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 What USDC deploys */}
          <section className="section" id="ra1-deploys" aria-labelledby="ra1-dep">
            <div className="container deploy-grid">
              <div className="reveal">
                <p className="section-index">03 / 07</p>
                <p className="eyebrow">What USDC Deploys</p>
                <h2 id="ra1-dep" className="h-section" style={{ margin: "16px 0 20px" }}>
                  The site is prepared for the campus.
                </h2>
                <p className="lead">
                  One utility interconnect, one perimeter, one cooling plant with headers sized for the end state, one control plane. Only the pods that are needed are built and energized.
                </p>
                <p className="thesis">Prepare the site for the campus. Build only the pods required today.</p>
                <p className="micro" style={{ marginBottom: 12 }}>Trace a system</p>
                <FlowToggle id="ra1" activeFlow={flowRa1} onFlowChange={setFlowRa1} />
              </div>

              <div className="reveal" data-delay="1">
                <WhatUsdcDeploysModel activeFlow={flowRa1} />
              </div>
            </div>
          </section>

          {/* 04 How it works */}
          <section className="section" aria-labelledby="ra1-how">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">04 / 07</p>
                  <p className="eyebrow">How It Works</p>
                  <h2 id="ra1-how" className="h-section">Three phases. One design.</h2>
                </div>
                <p className="lead">
                  The shared site work is carried by USDC, not by the tenant. Each phase adds only the capital for what is added.
                </p>
              </div>
              <Ra1PhaseTabs />
            </div>
          </section>

          {/* 05 Reference envelope */}
          <section className="section section-envelope" aria-labelledby="ra1-env">
            <div className="container">
              <div className="envelope-section-head reveal">
                <div className="envelope-head-left">
                  <p className="envelope-index">05 / 07</p>
                  <div className="envelope-eyebrow-row">
                    <span className="envelope-eyebrow-dash">—</span>
                    <span className="envelope-eyebrow-text">REFERENCE ENVELOPE</span>
                  </div>
                  <h2 id="ra1-env" className="envelope-title">
                    Two pod configurations<br />USDC has planned against.
                  </h2>
                </div>
                <div className="envelope-vertical-divider" aria-hidden="true" />
                <div className="envelope-head-right">
                  <p className="envelope-lead">
                    Both figures come from named engineering documents, not from a marketing estimate. They define the envelope a pod must accommodate.
                  </p>
                </div>
              </div>
              <PodReferenceCards />
            </div>
          </section>

          {/* 06 Facility */}
          <Ra1FacilitySection />

          {/* 07 Does not solve */}
          <WhatThisDoesNotSolveSection />

          {/* CTA */}
          <div className="container" id="ra1-cta">
            <DiscussDeploymentCtaSection onCtaClick={handleCta} />
          </div>
        </section>

        {/* =====================================================================
            VIEW: RA-02 — Prefill sidecar and decode floor
            ===================================================================== */}
        <section className={`view ${currentRoute === "/ra-02" ? "is-active" : ""}`} id="view-ra-02" data-route="/ra-02" aria-labelledby="ra2-title">
          <ArchitectureSwitcher currentRoute={currentRoute} onNavigate={navigateTo} />

          <div className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="hero-copy-main">
                  <h1 id="ra2-title" className="h-display">
                    A pod is two machines, a prefill sidecar and a decode floor.
                  </h1>
                  <p className="lead">
                    Serving a model has two phases with opposite hardware appetites. Splitting them inside one pod lets each phase run on the silicon it actually needs and lets power and cooling be provisioned per role.
                  </p>
                  <div className="hero-actions">
                    <a className="btn btn-primary" href="#cta" onClick={handleCta} data-cta>
                      Discuss a Deployment <span className="arrow" aria-hidden="true">→</span>
                    </a>
                    <a className="btn btn-ghost" href="#ra2-deploys" onClick={(e) => handleJump(e, "ra2-deploys")} data-jump>
                      View the architecture
                    </a>
                  </div>
                </div>
                <dl className="metrics" aria-label="Reference characteristics">
                  <div className="metric qual">
                    <dt className="sr-only">Prefill</dt>
                    <dd className="val">Compute-bound</dd>
                    <dd className="lbl">Prefill · runs near sustained TDP</dd>
                  </div>
                  <div className="metric qual">
                    <dt className="sr-only">Decode</dt>
                    <dd className="val">Bandwidth-bound</dd>
                    <dd className="lbl">Decode · bursty, low arithmetic utilisation</dd>
                  </div>
                  <div className="metric qual">
                    <dt className="sr-only">Transfer</dt>
                    <dd className="val">Non-blocking</dd>
                    <dd className="lbl">KV cache transfer, GPU memory to GPU memory</dd>
                  </div>
                </dl>
              </div>

              <CampusSchematicModel id="ra2" isActive={currentRoute === "/ra-02"} />
            </div>
          </div>

          <Ra2SituationSection />

          {/* 02 Insight */}
          <Ra2InsightPhasesSection />

          {/* 03 What USDC deploys */}
          <section className="section" id="ra2-deploys" aria-labelledby="ra2-dep">
            <div className="container deploy-grid">
              <div className="reveal">
                <p className="section-index">03 / 07</p>
                <p className="eyebrow">What USDC Deploys</p>
                <h2 id="ra2-dep" className="h-section" style={{ margin: "16px 0 20px" }}>
                  A decode floor with a prefill sidecar inside the same envelope.
                </h2>
                <p className="lead">
                  The pod is configured as a decode floor. Alongside it, inside the same pod envelope, a prefill sidecar holds a smaller number of accelerators chosen for raw compute rather than memory bandwidth. The two are joined by the pod fabric and presented to the customer as one pod with two roles.
                </p>
                <p className="thesis">One pod. Two roles. Power and cooling provisioned per role.</p>
                <p className="micro" style={{ marginBottom: 12 }}>Trace a role</p>
                <FlowToggle id="ra2" activeFlow={flowRa2} onFlowChange={setFlowRa2} />
              </div>
              <div className="panel campus reveal" data-delay="1" data-campus data-help="ra2" data-flow={flowRa2 || undefined}>
                <svg className="dg" viewBox="0 0 640 420" role="img" aria-label="Pod envelope containing prefill and decode">
                  <defs>
                    <linearGradient id="podEnvGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(10, 24, 52, 0.75)" />
                      <stop offset="100%" stopColor="rgba(4, 10, 24, 0.92)" />
                    </linearGradient>
                    <linearGradient id="podCardGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(8, 20, 44, 0.95)" />
                      <stop offset="100%" stopColor="rgba(4, 10, 22, 0.98)" />
                    </linearGradient>
                  </defs>

                  {/* Outer Pod Envelope */}
                  <rect x="10" y="10" width="620" height="400" rx="10" fill="url(#podEnvGrad2)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" strokeOpacity="0.9" />
                  <text x="22" y="32" fill="#38bdf8" fontSize="11.5" fontWeight="800" letterSpacing="0.12em">POD ENVELOPE · ONE UNIT TO THE CUSTOMER</text>

                  {/* Top Feed Card */}
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="48" width="596" height="44" rx="6" fill="url(#podCardGrad2)" stroke="#38bdf8" strokeWidth="1.6" strokeOpacity="0.85" />
                    <text x="36" y="67" fill="#ffffff" fontWeight="800" fontSize="12.5" letterSpacing="0.05em">POD POWER + COOLING FEED</text>
                    <text x="36" y="82" fill="#38bdf8" fontWeight="600" fontSize="10" letterSpacing="0.04em">METERED AND COOLED PER ROLE, NOT AS ONE AVERAGED LOAD</text>
                  </g>

                  {/* Feed Connectors */}
                  <line className="tap power" x1="150" y1="92" x2="150" y2="130" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="150" cy="111" r="3.5" fill="#f59e0b" />
                  <line className="tap cool" x1="430" y1="92" x2="430" y2="130" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="430" cy="111" r="3.5" fill="#38bdf8" />

                  {/* Sidecar Card */}
                  <g className="node podn" data-power data-network>
                    <rect x="22" y="130" width="230" height="200" rx="8" fill="url(#podCardGrad2)" stroke="#38bdf8" strokeWidth="1.8" strokeOpacity="0.95" />
                    <line className="lbar" x1="23" y1="134" x2="23" y2="326" stroke="#f59e0b" strokeWidth="3" />
                    <text x="38" y="154" fill="#ffffff" fontWeight="800" fontSize="13" letterSpacing="0.05em">PREFILL SIDECAR</text>
                    <text x="38" y="173" fill="#38bdf8" fontWeight="600" fontSize="10.5">SMALLER NUMBER OF ACCELERATORS</text>
                    <text x="38" y="189" fill="#ffffff" fontWeight="600" fontSize="10.5">CHOSEN FOR RAW COMPUTE</text>
                    <g className="rk" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1.2">
                      <line x1="38" y1="214" x2="236" y2="214" />
                      <line x1="38" y1="228" x2="236" y2="228" />
                      <line x1="38" y1="242" x2="236" y2="242" />
                    </g>
                    <text x="38" y="278" fill="#38bdf8" fontSize="11" fontWeight="800" letterSpacing="0.06em">NEAR SUSTAINED TDP</text>
                    <text x="38" y="295" fill="#ffffff" fontWeight="600" fontSize="10.5">OWN REFRESH CYCLE</text>
                    <text x="38" y="311" fill="#ffffff" fontWeight="600" fontSize="10.5">OWN VENDOR</text>
                  </g>

                  {/* Decode Floor Card */}
                  <g className="node podn" data-cooling data-network>
                    <rect x="292" y="130" width="326" height="200" rx="8" fill="url(#podCardGrad2)" stroke="#38bdf8" strokeWidth="1.8" strokeOpacity="0.95" />
                    <line className="lbar" x1="293" y1="134" x2="293" y2="326" stroke="#38bdf8" strokeWidth="3" />
                    <text x="308" y="154" fill="#ffffff" fontWeight="800" fontSize="13" letterSpacing="0.05em">DECODE FLOOR</text>
                    <text x="308" y="173" fill="#38bdf8" fontWeight="600" fontSize="10.5">BULK OF THE POD</text>
                    <text x="308" y="189" fill="#ffffff" fontWeight="600" fontSize="10.5">CHOSEN FOR BANDWIDTH AND CONCURRENCY</text>
                    <g className="rk" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1.2">
                      <line x1="308" y1="214" x2="602" y2="214" />
                      <line x1="308" y1="228" x2="602" y2="228" />
                      <line x1="308" y1="242" x2="602" y2="242" />
                      <line x1="308" y1="256" x2="602" y2="256" />
                    </g>
                    <text x="308" y="278" fill="#38bdf8" fontSize="11" fontWeight="800" letterSpacing="0.06em">BURSTY</text>
                    <text x="308" y="295" fill="#ffffff" fontWeight="600" fontSize="10.5">KEEPS RUNNING WHILE THE SIDECAR IS OPENED</text>
                    <text x="308" y="311" fill="#ffffff" fontWeight="600" fontSize="10.5">OWN VENDOR</text>
                  </g>

                  {/* Fabric Card & Connections */}
                  <path className="tap net" d="M252 230 H292" stroke="#cbb8ff" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="264" cy="230" r="3.5" fill="#cbb8ff" />
                  <circle cx="280" cy="230" r="3.5" fill="#cbb8ff" />
                  <g className="node" data-network>
                    <rect x="22" y="352" width="596" height="44" rx="6" fill="url(#podCardGrad2)" stroke="#38bdf8" strokeWidth="1.6" strokeOpacity="0.85" />
                    <text x="36" y="371" fill="#ffffff" fontWeight="800" fontSize="12.5" letterSpacing="0.05em">POD FABRIC</text>
                    <text x="36" y="386" fill="#38bdf8" fontWeight="600" fontSize="10" letterSpacing="0.03em">JOINS THE TWO ROLES · KV CACHE MOVES SIDECAR → FLOOR</text>
                  </g>

                  <path className="tap net" d="M137 330 V352" stroke="#cbb8ff" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path className="tap net" d="M455 330 V352" stroke="#cbb8ff" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path data-pulse="warm" data-dur="3" data-n="2" d="M150 92 V130" />
                  <path data-pulse="cool" data-dur="3" data-n="2" d="M430 92 V130" />
                  <path data-pulse="net" data-dur="2.2" data-n="2" d="M252 230 H292" />
                  <path data-pulse="net" data-dur="3.2" data-n="2" d="M137 330 V374 H455 V330" />
                </svg>
                <span className="pan-hint" aria-hidden="true">Pan the diagram →</span>
                <div className="campus-foot">
                  <span style={{ color: "#38bdf8", fontWeight: 700 }}>SIDECAR · COMPUTE · SUSTAINED</span>
                  <span style={{ color: "#ffffff", fontWeight: 700 }}>FLOOR · BANDWIDTH · BURSTY</span>
                </div>
              </div>
            </div>
          </section>

          {/* 04 How it works */}
          <section className="section" aria-labelledby="ra2-how">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">04 / 07</p>
                  <p className="eyebrow">How It Works</p>
                  <h2 id="ra2-how" className="h-section">A production pattern, not a research idea.</h2>
                </div>
                <p className="lead">
                  The serving stack routes an incoming request to a prefill worker, which computes the KV cache and then transfers that cache to a decode worker which produces the output tokens.
                </p>
              </div>
              <StepsSwitcher id="ra2" />
            </div>
          </section>

          {/* 05 Reference envelope */}
          <TwoRolesEnvelopesSection />

          {/* 06 Facility */}
          <Ra2FacilitySection />

          {/* 07 Does not solve */}
          <Ra2EngineeringConstraintSection />

          {/* CTA */}
          <div className="container" id="ra2-cta">
            <DiscussDeploymentCtaSection
              onCtaClick={handleCta}
              subText="Bring the model, the prompt profile and the concurrency you expect. USDC will size the sidecar and the floor around them."
              sourcesText={<>NVIDIA Dynamo documentation, disaggregated serving design notes (NIXL, SGLang backend). No throughput, latency or power figures are claimed for this configuration.</>}
            />
          </div>
        </section>

        {/* =====================================================================
            VIEW: RA-03 — KV cache as a network service
            ===================================================================== */}
        <section className={`view ${currentRoute === "/ra-03" ? "is-active" : ""}`} id="view-ra-03" data-route="/ra-03" aria-labelledby="ra3-title">
          <ArchitectureSwitcher currentRoute={currentRoute} onNavigate={navigateTo} />

          <div className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="hero-copy-main">
                  <h1 id="ra3-title" className="h-display">
                    KV cache becomes a network service across the USDC footprint.
                  </h1>
                  <p className="lead">
                    Agentic workloads send the same long context back to the model over and over. A shared cache tier turns that repetition from a cost into an advantage and it only works if the sites sit on good fiber.
                  </p>
                  <div className="hero-actions">
                    <a className="btn btn-primary" href="#cta" onClick={handleCta} data-cta>
                      Discuss a Deployment <span className="arrow" aria-hidden="true">→</span>
                    </a>
                    <a className="btn btn-ghost" href="#ra3-deploys" onClick={(e) => handleJump(e, "ra3-deploys")} data-jump>
                      View the architecture
                    </a>
                  </div>
                </div>
                <dl className="metrics" aria-label="Reference figures">
                  <div className="metric">
                    <dt className="sr-only">Cache hit rate</dt>
                    <dd className="val">1.7→92.2<small>%</small></dd>
                    <dd className="lbl">Cache hit rate on Codex traces · vLLM + Mooncake, published</dd>
                  </div>
                  <div className="metric">
                    <dt className="sr-only">Throughput</dt>
                    <dd className="val">3.8<small>×</small></dd>
                    <dd className="lbl">Throughput improvement · same published benchmark</dd>
                  </div>
                  <div className="metric">
                    <dt className="sr-only">Inter-site round trip</dt>
                    <dd className="val">&lt;10<small>MS</small></dd>
                    <dd className="lbl">Inter-site round-trip target · three diverse paths</dd>
                  </div>
                </dl>
              </div>

              <CampusSchematicModel id="ra3" isActive={currentRoute === "/ra-03"} />
            </div>
          </div>

          {/* 01 Situation */}
          <Ra3SituationSection />

          {/* 02 Constraint */}
          <Ra3ConstraintScalingSection />

          {/* 03 What USDC deploys */}
          <section className="section" id="ra3-deploys" aria-labelledby="ra3-dep">
            <div className="container deploy-grid">
              <div className="reveal">
                <p className="section-index">03 / 07</p>
                <p className="eyebrow">What USDC Deploys</p>
                <h2 id="ra3-dep" className="h-section" style={{ margin: "16px 0 20px" }}>
                  A KV cache tier that lives in a sidecar, not in the GPU.
                </h2>
                <p className="lead">
                  The tier is layered. GPU memory first, then CPU memory, then local NVMe, then a pool that any pod on the site can read. Across the USDC backbone, that pool extends to other sites in the footprint.
                </p>
                <p className="thesis">Within a site, cache moves at fabric speed. Between sites, at backbone speed.</p>
                <ol className="tier-list" aria-label="Cache tiers">
                  <li><span className="n">T0</span><span>GPU memory</span><span className="s">Node</span></li>
                  <li><span className="n">T1</span><span>CPU memory</span><span className="s">Node</span></li>
                  <li><span className="n">T2</span><span>Local NVMe</span><span className="s">Node</span></li>
                  <li><span className="n">T3</span><span>Site pool · any pod can read</span><span className="s hi">Site</span></li>
                  <li><span className="n">T4</span><span>Pool extended over the USDC backbone</span><span className="s hi">Footprint</span></li>
                </ol>
                <p className="micro" style={{ margin: "22px 0 12px" }}>Trace a scope</p>
                <FlowToggle id="ra3" activeFlow={flowRa3} onFlowChange={setFlowRa3} />
              </div>

              <div className="panel campus reveal" data-delay="1" data-campus data-help="ra3" data-flow={flowRa3 || undefined}>
                <svg className="dg" viewBox="0 0 640 490" role="img" aria-label="Two sites cache tiers">
                  <defs>
                    <linearGradient id="ra3CardG" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(16,30,56,0.85)" />
                      <stop offset="100%" stopColor="rgba(8,16,36,0.7)" />
                    </linearGradient>
                    <linearGradient id="ra3PoolG" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(14,116,144,0.32)" />
                      <stop offset="100%" stopColor="rgba(3,105,161,0.22)" />
                    </linearGradient>
                    <linearGradient id="ra3BbG" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(88,28,135,0.3)" />
                      <stop offset="100%" stopColor="rgba(30,10,60,0.25)" />
                    </linearGradient>
                    <linearGradient id="ra3GpuG" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(56,189,248,0.28)" />
                      <stop offset="100%" stopColor="rgba(37,99,235,0.38)" />
                    </linearGradient>
                  </defs>

                  {/* ====== SITE A ====== */}
                  <rect x="10" y="10" width="300" height="420" rx="10" fill="rgba(8,16,36,0.4)" stroke="rgba(56,189,248,0.32)" strokeWidth="1.2" strokeDasharray="5 3" />
                  <rect x="22" y="4" width="100" height="18" rx="4" fill="rgba(8,18,40,0.9)" stroke="rgba(56,189,248,0.5)" strokeWidth="0.8" />
                  <text x="32" y="16" className="t2" style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.5px" }}>SITE A</text>
                  <text x="22" y="36" style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "1px", fill: "#7ba2dd" }}>FABRIC SPEED INTERCONNECT</text>

                  {/* Pod 01 tiers */}
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="48" width="130" height="38" rx="5" fill="url(#ra3GpuG)" stroke="rgba(56,189,248,0.55)" strokeWidth="1" />
                    <circle cx="34" cy="67" r="5" fill="#38bdf8" />
                    <text x="44" y="63" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>Pod 01 · GPU</text>
                    <text x="44" y="77" style={{ fontSize: "7.5px", fill: "#7ba2dd" }}>HBM3e · Hot Tier</text>
                  </g>
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="96" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.9" />
                    <circle cx="34" cy="115" r="5" fill="#60a5fa" />
                    <text x="44" y="111" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>CPU Memory</text>
                    <text x="44" y="125" style={{ fontSize: "7.5px", fill: "#7ba2dd" }}>DDR5 Host RAM</text>
                  </g>
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="144" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(56,189,248,0.25)" strokeWidth="0.9" />
                    <circle cx="34" cy="163" r="5" fill="#818cf8" />
                    <text x="44" y="159" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>Local NVMe</text>
                    <text x="44" y="173" style={{ fontSize: "7.5px", fill: "#7ba2dd" }}>PCIe Gen5 SSD</text>
                  </g>

                  {/* Pod 02 tiers */}
                  <g className="node" data-cooling>
                    <rect x="168" y="48" width="130" height="38" rx="5" fill="url(#ra3GpuG)" stroke="rgba(56,189,248,0.45)" strokeWidth="0.9" />
                    <circle cx="180" cy="67" r="5" fill="#38bdf8" />
                    <text x="190" y="63" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>Pod 02 · GPU</text>
                    <text x="190" y="77" style={{ fontSize: "7.5px", fill: "#7ba2dd" }}>HBM3e · Hot Tier</text>
                  </g>
                  <g className="node" data-cooling>
                    <rect x="168" y="96" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.9" />
                    <circle cx="180" cy="115" r="5" fill="#60a5fa" />
                    <text x="190" y="111" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>CPU Memory</text>
                    <text x="190" y="125" style={{ fontSize: "7.5px", fill: "#7ba2dd" }}>DDR5 Host RAM</text>
                  </g>
                  <g className="node" data-cooling>
                    <rect x="168" y="144" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(56,189,248,0.25)" strokeWidth="0.9" />
                    <circle cx="180" cy="163" r="5" fill="#818cf8" />
                    <text x="190" y="159" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>Local NVMe</text>
                    <text x="190" y="173" style={{ fontSize: "7.5px", fill: "#7ba2dd" }}>PCIe Gen5 SSD</text>
                  </g>

                  {/* Vertical wires to pool */}
                  <path className="tap net" d="M87 182 V204" />
                  <path className="tap net" d="M233 182 V204" />

                  {/* Site A Pool */}
                  <g className="node" data-cooling data-network>
                    <rect x="22" y="204" width="276" height="60" rx="6" fill="url(#ra3PoolG)" stroke="var(--accent)" strokeWidth="1.2" />
                    <circle cx="36" cy="224" r="5.5" fill="#06b6d4" />
                    <text x="48" y="228" className="t1" style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.8px" }}>Site Pool</text>
                    <text x="48" y="244" style={{ fontSize: "8.5px", fill: "#67e8f9", letterSpacing: "0.3px" }}>Any pod on the site reads · fabric speed</text>
                    <rect x="222" y="218" width="66" height="16" rx="3" fill="rgba(6,30,50,0.6)" stroke="rgba(6,182,212,0.4)" strokeWidth="0.7" />
                    <text x="255" y="229" textAnchor="middle" style={{ fontSize: "7.5px", fontWeight: 700, fill: "#22d3ee", letterSpacing: "0.8px" }}>SHARED</text>
                  </g>

                  <text x="22" y="290" className="sec" style={{ fontSize: "8.5px", letterSpacing: "0.6px" }}>East–west traffic between pods</text>

                  {/* ====== SITE B ====== */}
                  <rect x="330" y="10" width="300" height="420" rx="10" fill="rgba(16,8,36,0.35)" stroke="rgba(168,85,247,0.28)" strokeWidth="1.2" strokeDasharray="5 3" />
                  <rect x="342" y="4" width="100" height="18" rx="4" fill="rgba(16,8,32,0.9)" stroke="rgba(168,85,247,0.5)" strokeWidth="0.8" />
                  <text x="352" y="16" className="t2" style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.5px", fill: "#f3e8ff" }}>SITE B</text>
                  <text x="342" y="36" style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "1px", fill: "#c4b5fd" }}>REMOTE MIRROR · DIVERSE PATHS</text>

                  {/* Site B Pod 01 tiers */}
                  <g className="node" data-network>
                    <rect x="342" y="48" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(168,85,247,0.4)" strokeWidth="0.9" />
                    <circle cx="354" cy="67" r="5" fill="#c084fc" />
                    <text x="364" y="63" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>Pod 01 · GPU</text>
                    <text x="364" y="77" style={{ fontSize: "7.5px", fill: "#b4a2e0" }}>HBM3e · Ready</text>
                  </g>
                  <g className="node" data-network>
                    <rect x="342" y="96" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.9" />
                    <circle cx="354" cy="115" r="5" fill="#a855f7" />
                    <text x="364" y="111" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>CPU Memory</text>
                    <text x="364" y="125" style={{ fontSize: "7.5px", fill: "#b4a2e0" }}>DDR5 Host RAM</text>
                  </g>
                  <g className="node" data-network>
                    <rect x="342" y="144" width="130" height="38" rx="5" fill="url(#ra3CardG)" stroke="rgba(168,85,247,0.22)" strokeWidth="0.9" />
                    <circle cx="354" cy="163" r="5" fill="#9333ea" />
                    <text x="364" y="159" className="t1" style={{ fontSize: "11px", fontWeight: 700 }}>Local NVMe</text>
                    <text x="364" y="173" style={{ fontSize: "7.5px", fill: "#b4a2e0" }}>PCIe Gen5 SSD</text>
                  </g>

                  {/* Ghost Pod 02 */}
                  <g className="node ghostn">
                    <rect x="488" y="48" width="130" height="38" rx="5" fill="rgba(10,16,32,0.3)" stroke="rgba(168,85,247,0.18)" strokeWidth="0.9" strokeDasharray="4 3" />
                    <text x="498" y="70" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.6px", fill: "rgba(180,162,224,0.5)" }}>Pod 02 · Planned</text>
                  </g>

                  <path className="tap net" d="M407 182 V204" />

                  {/* Site B Pool */}
                  <g className="node" data-network>
                    <rect x="342" y="204" width="276" height="60" rx="6" fill="url(#ra3BbG)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.2" />
                    <circle cx="356" cy="224" r="5.5" fill="#c084fc" />
                    <text x="368" y="228" className="t1" style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.8px" }}>Site Pool</text>
                    <text x="368" y="244" style={{ fontSize: "8.5px", fill: "#d8b4fe", letterSpacing: "0.3px" }}>Extended over the backbone · backbone speed</text>
                    <rect x="542" y="218" width="66" height="16" rx="3" fill="rgba(24,12,44,0.6)" stroke="rgba(168,85,247,0.45)" strokeWidth="0.7" />
                    <text x="575" y="229" textAnchor="middle" style={{ fontSize: "7.5px", fontWeight: 700, fill: "#c084fc", letterSpacing: "0.8px" }}>MIRROR</text>
                  </g>

                  {/* ====== USDC BACKBONE ====== */}
                  <path className="tap net" d="M160 264 V310" />
                  <path className="tap net" d="M480 264 V310" />

                  <g className="node" data-network>
                    <rect x="22" y="310" width="596" height="82" rx="8" fill="url(#ra3BbG)" stroke="rgba(168,85,247,0.45)" strokeWidth="1.2" />
                    <rect x="32" y="320" width="28" height="22" rx="5" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.5)" strokeWidth="0.8" />
                    <circle cx="46" cy="331" r="5" fill="#c084fc" />
                    <text x="68" y="336" className="t1" style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px" }}>USDC Backbone</text>
                    <text x="32" y="358" style={{ fontSize: "9.5px", fill: "#d8b4fe", letterSpacing: "0.3px" }}>Three diverse paths · round-trip target under ten milliseconds</text>
                    <text x="32" y="376" style={{ fontSize: "8.5px", letterSpacing: "0.3px", fill: "#93a5c4" }}>Session context follows the customer to whichever site has capacity</text>

                    {/* 3 fiber indicators */}
                    <g transform="translate(490, 322)">
                      <rect x="0" y="0" width="118" height="30" rx="5" fill="rgba(10,6,22,0.7)" stroke="rgba(168,85,247,0.35)" strokeWidth="0.8" />
                      <line x1="12" y1="10" x2="42" y2="10" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="12" y1="16" x2="42" y2="16" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
                      <line x1="12" y1="22" x2="42" y2="22" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1 3" />
                      <text x="52" y="18" style={{ fontSize: "8px", fontWeight: 700, fill: "#e9d5ff", letterSpacing: "0.6px" }}>&lt;10ms RTT</text>
                    </g>
                  </g>

                  {/* Footer text */}
                  <g>
                    <text x="22" y="418" style={{ fontSize: "10px", fontWeight: 700, fill: "#93a5c4", letterSpacing: "1.2px" }}>NODE · SITE · FOOTPRINT</text>
                    <text x="618" y="418" textAnchor="end" style={{ fontSize: "9px", fontWeight: 600, fill: "#93a5c4", letterSpacing: "0.8px" }}>FIBER ADJACENCY IS A SITING REQUIREMENT</text>
                  </g>

                  {/* Pulse paths */}
                  <path data-pulse="power" data-dur="2.4" data-n="2" d="M87 86 V96 M87 134 V144" />
                  <path data-pulse="cool" data-dur="3" data-n="2" d="M87 182 V234 H233 V182" />
                  <path data-pulse="net" data-dur="4" data-n="3" d="M160 264 V351 H480 V264" />
                </svg>
                <span className="pan-hint" aria-hidden="true">Pan the diagram →</span>
              </div>
            </div>
          </section>

          {/* 04 How it works */}
          <section className="section" aria-labelledby="ra3-how">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">04 / 07</p>
                  <p className="eyebrow">How It Works</p>
                  <h2 id="ra3-how" className="h-section">A cluster-wide pool, moved without touching the GPU.</h2>
                </div>
                <p className="lead">Named software, doing the job today.</p>
              </div>
              <StepsSwitcher id="ra3" />
            </div>
          </section>

          {/* 05 Published results */}
          <Ra3FacilityDesignMattersSection />

          {/* 06 Facility */}
          <Ra3FacilitySection />

          {/* 07 Does not solve */}
          <Ra3EngineeringConstraintSection />

          {/* CTA */}
          <div className="container" id="ra3-cta">
            <DiscussDeploymentCtaSection
              onCtaClick={handleCta}
              subText="Bring the prompt reuse profile and the sites you need to reach. USDC will plan the cache tier and the fiber around both."
              sourcesText={<>vLLM and Mooncake published benchmark results on Codex traces &nbsp;•&nbsp; Mooncake Store and LMCache documentation. Benchmark figures are measured by their authors on their hardware and are not USDC results. Inter-site targets are from the USDC Global Network page.</>}
            />
          </div>
        </section>
      </main>

      <Footer />

      {/* Embedded CSS styling for the Reference Architecture views */}
      <style jsx global>{`
        .ra-page-root {
          --bg: #04070f;
          --bg-2: #070c18;
          --bg-3: #0a1324;
          --line: rgba(74, 144, 255, 0.18);
          --line-strong: rgba(120, 175, 255, 0.38);
          --grid: rgba(74, 144, 255, 0.04);
          --text: #e6effd;
          --text-2: #a4bde2;
          --text-3: #6b86b4;
          --accent: #4f8bff;
          --accent-soft: rgba(79, 139, 255, 0.16);
          --cool: #2fdbe6;
          --cool-soft: rgba(47, 219, 230, 0.14);
          --net: #cbb8ff;
          --net-soft: rgba(203, 184, 255, 0.12);
          --warm: #e5b96c;
          --warm-soft: rgba(229, 185, 108, 0.14);
          --radius: 8px;
          --radius-lg: 14px;
          --max: 1280px;
          --gutter: clamp(20px, 4vw, 48px);
          --font-ui: var(--font-geist-sans), var(--font-sans), system-ui, -apple-system, "SF Pro Text", "Segoe UI", Inter, Roboto, sans-serif;
          --font-mono: var(--font-geist-mono), var(--font-mono), ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          --ease: cubic-bezier(0.22, 0.61, 0.36, 1);

          background: #04070f;
          color: var(--text);
          font-family: var(--font-ui);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .ra-page-root::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image: linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(130% 110% at 50% 10%, #000 60%, transparent 100%);
        }

        .ra-page-root .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        .ra-page-root .eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }
        .ra-page-root .eyebrow::before {
          content: "";
          width: 16px;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(90deg, var(--accent), #8fd0ff);
          box-shadow: 0 0 8px var(--accent);
        }

        .ra-page-root .micro {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-3);
          font-weight: 600;
        }

        .ra-page-root .h-display {
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.15;
          letter-spacing: -0.025em;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff 40%, #c4d7fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ra-page-root .h-section {
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
        }
        .ra-page-root .lead {
          font-size: clamp(16px, 1.2vw, 18.5px);
          color: var(--text-2);
          max-width: 62ch;
          line-height: 1.65;
        }
        .ra-page-root .prose {
          color: var(--text-2);
          font-size: 15.5px;
          max-width: 62ch;
          line-height: 1.65;
        }
        .ra-page-root .prose p + p {
          margin-top: 14px;
        }
        .ra-page-root .mono {
          font-family: var(--font-mono);
          font-variant-numeric: tabular-nums;
        }

        /* Layout */
        .ra-page-root .container {
          max-width: var(--max);
          margin: 0 auto;
          padding: 0 var(--gutter);
        }
        .ra-page-root .section {
          padding: clamp(36px, 4vw, 56px) 0;
          position: relative;
        }
        .ra-page-root .section + .section {
          border-top: 1px solid var(--line);
        }
        .ra-page-root .section-head {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          gap: 32px;
          align-items: end;
          margin-bottom: clamp(24px, 3vw, 36px);
        }
        .ra-page-root .section-head .eyebrow {
          margin-bottom: 12px;
        }
        .ra-page-root .section-index {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.18em;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .ra-page-root .panel {
          background: linear-gradient(180deg, rgba(16, 28, 54, 0.55) 0%, rgba(6, 12, 26, 0.7) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          position: relative;
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ra-page-root .panel::before {
          content: "";
          position: absolute;
          left: 20px;
          right: 20px;
          top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120, 190, 255, 0.4), transparent);
          pointer-events: none;
        }
        .ra-page-root .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 46px;
          padding: 0 24px;
          border-radius: var(--radius);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: 1px solid var(--line-strong);
          white-space: nowrap;
          transition: all 0.25s var(--ease);
          cursor: pointer;
        }
        .ra-page-root .btn:hover {
          border-color: rgba(120, 175, 255, 0.65);
          box-shadow: 0 0 20px rgba(79, 139, 255, 0.25);
          transform: translateY(-1px);
        }
        .ra-page-root .btn-primary {
          background: linear-gradient(135deg, #4f8bff 0%, #3572e8 100%);
          border-color: #79abff;
          color: #ffffff;
          box-shadow: 0 0 20px rgba(79, 139, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .ra-page-root .btn-primary:hover {
          background: linear-gradient(135deg, #629aff 0%, #447df0 100%);
          border-color: #a4c4ff;
          box-shadow: 0 0 28px rgba(79, 139, 255, 0.6);
        }
        .ra-page-root .btn-ghost {
          color: var(--text);
          background: rgba(12, 24, 48, 0.5);
          border-color: var(--line);
        }
        .ra-page-root .btn-ghost:hover {
          background: rgba(20, 40, 80, 0.6);
          border-color: var(--line-strong);
        }
        .ra-page-root .btn .arrow {
          transition: transform 0.25s var(--ease);
        }
        .ra-page-root .btn:hover .arrow {
          transform: translateX(4px);
        }
        .ra-page-root .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .ra-page-root .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* Views */
        .ra-page-root .view {
          display: none;
        }
        .ra-page-root .view.is-active {
          display: block;
        }

        /* Zero-flash route display rules during initial paint */
        html.route-ra-01 .ra-page-root #view-index,
        html.route-ra-02 .ra-page-root #view-index,
        html.route-ra-03 .ra-page-root #view-index {
          display: none !important;
        }
        html.route-ra-01 .ra-page-root #view-ra-01 {
          display: block !important;
        }
        html.route-ra-02 .ra-page-root #view-ra-02 {
          display: block !important;
        }
        html.route-ra-03 .ra-page-root #view-ra-03 {
          display: block !important;
        }
        .ra-page-root .crumbs {
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-3);
        }
        .ra-page-root .crumbs a {
          color: var(--text-2);
          transition: color 0.2s;
        }
        .ra-page-root .crumbs a:hover {
          color: #ffffff;
        }
        .ra-page-root .crumbs i {
          width: 14px;
          height: 1px;
          background: var(--line-strong);
        }
        /* Architecture Switcher Bar */
        .ra-page-root .ra-arch-switcher-wrap {
          padding: 20px 0 4px;
          position: relative;
          z-index: 10;
        }
        .ra-page-root .ra-arch-switcher-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 8px 12px;
          background: rgba(6, 13, 26, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 14px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .ra-page-root .ra-arch-overview-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: #94a3b8;
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .ra-page-root .ra-arch-overview-btn:hover {
          color: #ffffff;
          background: rgba(56, 189, 248, 0.1);
          border-color: rgba(56, 189, 248, 0.4);
        }
        .ra-page-root .ra-arch-arrow {
          color: #38bdf8;
          font-size: 14px;
          transition: transform 0.2s ease;
        }
        .ra-page-root .ra-arch-overview-btn:hover .ra-arch-arrow {
          transform: translateX(-3px);
        }
        .ra-page-root .ra-arch-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ra-page-root .ra-arch-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 20, 38, 0.5);
          color: #94a3b8;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .ra-page-root .ra-arch-tab:hover {
          color: #ffffff;
          background: rgba(56, 189, 248, 0.08);
          border-color: rgba(56, 189, 248, 0.3);
          transform: translateY(-1px);
        }
        .ra-page-root .ra-arch-tab.is-active {
          background: rgba(14, 38, 74, 0.95);
          border-color: #38bdf8;
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }
        .ra-page-root .ra-arch-pill-num {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.14);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 5px;
          padding: 2px 6px;
          letter-spacing: 0.05em;
        }
        .ra-page-root .ra-arch-tab.is-active .ra-arch-pill-num {
          background: #38bdf8;
          color: #030712;
          font-weight: 800;
          border-color: #38bdf8;
        }
        .ra-page-root .ra-arch-pill-name {
          font-weight: 600;
          color: #f1f5f9;
        }
        .ra-page-root .ra-arch-pill-desc {
          font-size: 12px;
          color: #64748b;
          margin-left: 2px;
        }
        .ra-page-root .ra-arch-tab.is-active .ra-arch-pill-desc {
          color: #93c5fd;
        }
        .ra-page-root .ra-arch-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          margin-left: 4px;
        }
        @media (max-width: 820px) {
          .ra-page-root .ra-arch-switcher-bar {
            justify-content: center;
          }
          .ra-page-root .ra-arch-overview-btn {
            width: 100%;
            justify-content: center;
          }
          .ra-page-root .ra-arch-tabs {
            width: 100%;
            justify-content: center;
          }
          .ra-page-root .ra-arch-tab {
            flex: 1;
            justify-content: center;
            padding: 8px 10px;
          }
          .ra-page-root .ra-arch-pill-desc {
            display: none;
          }
        }

        .ra-page-root .ra-switch {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }
        .ra-page-root .ra-switch a {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 9px 16px;
          border: 1px solid var(--line);
          border-radius: 20px;
          color: var(--text-2);
          background: rgba(10, 18, 38, 0.45);
          transition: all 0.25s ease;
          font-weight: 600;
        }
        .ra-page-root .ra-switch a:hover {
          color: #ffffff;
          border-color: rgba(79, 139, 255, 0.45);
          background: rgba(20, 36, 72, 0.6);
        }
        .ra-page-root .ra-switch a[aria-current="page"] {
          color: #ffffff;
          border-color: #4f8bff;
          background: linear-gradient(135deg, rgba(79, 139, 255, 0.25) 0%, rgba(47, 219, 230, 0.15) 100%);
          box-shadow: 0 0 16px rgba(79, 139, 255, 0.35);
        }

        /* Index Hero Wrapper & Background Image */
        .ra-page-root .index-hero-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-bottom: 1px solid var(--line);
        }
        .ra-page-root .index-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .ra-page-root .index-hero-bg :global(img) {
          opacity: 1;
        }

        /* Index Hero */
        .ra-page-root .index-hero {
          padding: clamp(48px, 5.5vw, 84px) 0 clamp(36px, 4vw, 56px);
          position: relative;
          z-index: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ra-page-root .index-hero .eyebrow {
          margin-bottom: 14px;
        }
        .ra-page-root .index-hero h1 {
          max-width: 32ch;
          margin: 0 auto 18px;
          line-height: 1.18;
          text-align: center;
        }
        .ra-page-root .index-hero .lead {
          max-width: 65ch;
          margin: 0 auto 32px;
          line-height: 1.65;
          text-align: center;
        }
        .ra-page-root .index-hero .template-row {
          width: 100%;
        }

        /* Hero */
        .ra-page-root .hero {
          padding: clamp(32px, 3.5vw, 52px) 0;
          position: relative;
          overflow: hidden;
        }
        .ra-page-root .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.15fr);
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .ra-page-root .hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }
        .ra-page-root .hero-copy-main {
          display: flex;
          flex-direction: column;
        }
        .ra-page-root .hero-copy .eyebrow {
          margin-bottom: 14px;
        }
        .ra-page-root .hero-copy h1 {
          margin-bottom: 16px;
          max-width: 24ch;
          line-height: 1.16;
        }
        .ra-page-root .hero-copy .lead {
          margin-bottom: 22px;
          line-height: 1.6;
        }
        .ra-page-root .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .ra-page-root .metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          border: none;
          margin: auto 0 0 0;
        }
        .ra-page-root .metric {
          padding: 14px 16px;
          background: rgba(10, 20, 44, 0.55);
          border: 1px solid rgba(74, 144, 255, 0.22);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .ra-page-root .metric:hover {
          border-color: rgba(110, 160, 255, 0.55);
          transform: translateY(-2px);
        }
        .ra-page-root .metric:first-child {
          border-left: 1px solid rgba(74, 144, 255, 0.22);
          padding-left: 18px;
        }
        .ra-page-root .metric .val {
          font-family: var(--font-mono);
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 6px;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 16px rgba(79, 139, 255, 0.35);
        }
        .ra-page-root .metric .val small {
          font-size: 0.52em;
          color: var(--accent);
          margin-left: 6px;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .ra-page-root .metric .lbl {
          font-size: 11.5px;
          color: var(--text-2);
          line-height: 1.4;
          margin: 0;
        }
        .ra-page-root .metric.qual .val {
          font-family: var(--font-mono);
          font-size: 15px;
          letter-spacing: 0.02em;
          color: #8fd0ff;
        }

        /* Frame */
        .ra-page-root .frame {
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          background: rgba(11, 16, 25, 0.7);
          padding: 16px 16px 12px;
          position: relative;
          overflow: hidden;
        }
        .ra-page-root .frame::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .ra-page-root .frame-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          position: relative;
          gap: 12px;
        }
        .ra-page-root .frame-bar .micro {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ra-page-root .stage-dots {
          display: flex;
          gap: 4px;
        }
        .ra-page-root .stage-dots i {
          width: 14px;
          height: 2px;
          background: var(--line-strong);
          border-radius: 1px;
          transition: background 0.3s;
        }
        .ra-page-root .stage-dots i.on {
          background: var(--accent);
        }
        .ra-page-root .pan-hint {
          display: none;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
          margin-top: 8px;
        }
        .ra-page-root .frame-caption {
          position: relative;
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-2);
          min-height: 1.6em;
          letter-spacing: 0.02em;
        }

        /* SVG Diagram Styles */
        .ra-page-root .dg {
          width: 100%;
          height: auto;
          position: relative;
          font-family: var(--font-mono);
          overflow: visible;
        }
        .ra-page-root .dg text {
          fill: var(--text-3);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ra-page-root .dg .sec {
          font-size: 9.5px;
        }
        .ra-page-root .dg.mini text {
          font-size: 9px;
        }
        .ra-page-root .dg .t2 {
          fill: var(--text-2);
        }
        .ra-page-root .dg .t1 {
          fill: var(--text);
        }
        .ra-page-root .dg .box {
          fill: var(--bg-3);
          stroke: var(--line-strong);
          stroke-width: 1;
        }
        .ra-page-root .dg .rk {
          stroke: rgba(148, 172, 204, 0.35);
          stroke-width: 1;
        }
        .ra-page-root .dg .wire {
          fill: none;
          stroke-width: 1.2;
        }
        .ra-page-root .dg .wire.power {
          stroke: var(--accent);
        }
        .ra-page-root .dg .wire.cool {
          stroke: var(--cool);
        }
        .ra-page-root .dg .wire.net {
          stroke: var(--net);
          stroke-dasharray: 3 3;
        }
        .ra-page-root .dg .wire.warm {
          stroke: var(--warm);
        }
        .ra-page-root .dg .dim {
          opacity: 0.35;
        }
        .ra-page-root .dg.interactive-mini {
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.4));
          transition: transform 0.35s var(--ease), filter 0.35s var(--ease);
        }
        .ra-page-root .card:hover .dg.interactive-mini,
        .ra-page-root .card.is-hovered .dg.interactive-mini {
          transform: translateY(-2px) scale(1.02);
          filter: drop-shadow(0 8px 24px rgba(76, 141, 255, 0.15));
        }
        .ra-page-root .card:hover .wire.power,
        .ra-page-root .card.is-hovered .wire.power {
          stroke: #66a1ff;
          filter: drop-shadow(0 0 4px rgba(76, 141, 255, 0.6));
        }
        .ra-page-root .card:hover .wire.cool,
        .ra-page-root .card.is-hovered .wire.cool {
          stroke: #7fe0ee;
          filter: drop-shadow(0 0 4px rgba(95, 195, 210, 0.6));
        }

        /* flow pulses */
        .ra-page-root .dg .pulse {
          r: 2.2;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .ra-page-root .dg .pulse.power {
          fill: var(--accent);
          filter: drop-shadow(0 0 3px rgba(76, 141, 255, 0.9));
        }
        .ra-page-root .dg .pulse.cool {
          fill: var(--cool);
          filter: drop-shadow(0 0 3px rgba(95, 195, 210, 0.9));
        }
        .ra-page-root .dg .pulse.net {
          fill: var(--net);
          filter: drop-shadow(0 0 3px rgba(201, 211, 226, 0.8));
        }
        .ra-page-root .dg .pulse.warm {
          fill: var(--warm);
          filter: drop-shadow(0 0 3px rgba(224, 179, 106, 0.9));
        }
        .ra-page-root .dg .pulse.on {
          opacity: 1;
        }

        /* Scroll Reveal System */
        .ra-page-root .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
          will-change: opacity, transform;
        }
        .ra-page-root .reveal.in-view {
          opacity: 1;
          transform: none;
        }
        .ra-page-root .reveal[data-delay="1"] {
          transition-delay: 0.1s;
        }
        .ra-page-root .reveal[data-delay="2"] {
          transition-delay: 0.2s;
        }
        .ra-page-root .reveal[data-delay="3"] {
          transition-delay: 0.3s;
        }

        /* draw-in & fades */
        .ra-page-root .dg .draw {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          opacity: 0;
          transition: stroke-dashoffset 1.1s var(--ease), opacity 0.3s;
        }
        .ra-page-root .dg .draw.on {
          stroke-dashoffset: 0;
          opacity: 1;
        }
        .ra-page-root .dg .fade {
          opacity: 0;
          transition: opacity 0.6s var(--ease);
        }
        .ra-page-root .dg .fade.on {
          opacity: 1;
        }
        .ra-page-root .dg .rise {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
        }
        .ra-page-root .dg .rise.on {
          opacity: 1;
          transform: none;
        }
        .ra-page-root .dg .ghost rect {
          fill: none;
          stroke: var(--line-strong);
          stroke-dasharray: 3 3;
        }
        .ra-page-root .dg .rk-row {
          opacity: 0;
          transition: opacity 0.35s;
        }
        .ra-page-root .dg .rise.on .rk-row {
          opacity: 1;
        }
        .ra-page-root .dg .rise.on .rk-row:nth-child(1) {
          transition-delay: 0.25s;
        }
        .ra-page-root .dg .rise.on .rk-row:nth-child(2) {
          transition-delay: 0.35s;
        }
        .ra-page-root .dg .rise.on .rk-row:nth-child(3) {
          transition-delay: 0.45s;
        }
        .ra-page-root .dg .rise.on .rk-row:nth-child(4) {
          transition-delay: 0.55s;
        }
        .ra-page-root .dg .circ {
          stroke-dasharray: 6 6;
          animation: dash 1.6s linear infinite;
        }
        .ra-page-root .dg .circ.rev {
          animation-direction: reverse;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -12;
          }
        }
        .ra-page-root .dg .steady {
          animation: none;
        }
        .ra-page-root .dg .hot {
          fill: var(--warm-soft);
          stroke: var(--warm);
        }
        .ra-page-root .dg .cold {
          fill: var(--accent-soft);
          stroke: var(--accent);
        }

        /* Specific styles */
        .ra-page-root .hs .scene {
          transform-origin: 360px 260px;
          transition: transform 1.4s var(--ease);
        }
        .ra-page-root .hs.s7 .scene {
          transform: scale(0.86);
        }
        .ra-page-root .hs .pod-frame {
          transition: stroke 0.5s;
        }
        .ra-page-root .hs.s6 .pod-frame {
          stroke: rgba(201, 211, 226, 0.55);
        }

        .ra-page-root .situation-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: stretch;
          gap: 0;
        }
        .ra-page-root .sit-panel {
          padding: clamp(28px, 3.5vw, 44px);
          min-height: 290px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(180deg, rgba(14, 26, 52, 0.7) 0%, rgba(6, 12, 26, 0.85) 100%);
          border: 1px solid rgba(74, 144, 255, 0.25);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
        }
        .ra-page-root .sit-panel.now {
          border-color: rgba(79, 139, 255, 0.45);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(79, 139, 255, 0.12);
        }
        .ra-page-root .sit-panel.future {
          border-color: rgba(229, 185, 108, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(229, 185, 108, 0.08);
        }
        .ra-page-root .sit-panel .big {
          font-family: var(--font-mono);
          font-size: clamp(48px, 6vw, 84px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          margin: 24px 0 14px;
          color: #ffffff;
          text-shadow: 0 0 24px rgba(79, 139, 255, 0.4);
        }
        .ra-page-root .sit-panel .big small {
          font-size: 0.38em;
          color: var(--accent);
          letter-spacing: 0.04em;
          margin-left: 8px;
          font-weight: 600;
        }
        .ra-page-root .sit-panel .sub {
          color: var(--text-2);
          font-size: 15px;
          line-height: 1.55;
        }
        .ra-page-root .sit-panel.future .big {
          color: var(--warm);
          text-shadow: 0 0 24px rgba(229, 185, 108, 0.4);
        }
        .ra-page-root .sit-panel .meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-3);
          font-weight: 600;
        }
        .ra-page-root .sit-panel .meta .tag {
          color: #ffffff;
          background: rgba(79, 139, 255, 0.2);
          border: 1px solid rgba(79, 139, 255, 0.5);
          padding: 4px 10px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(79, 139, 255, 0.3);
        }
        .ra-page-root .sit-panel.future .meta .tag {
          color: #ffffff;
          background: rgba(229, 185, 108, 0.2);
          border: 1px solid rgba(229, 185, 108, 0.5);
          box-shadow: 0 0 10px rgba(229, 185, 108, 0.3);
        }
        .ra-page-root .sit-link {
          width: clamp(80px, 12vw, 180px);
          display: grid;
          place-items: center;
        }
        .ra-page-root .sit-link svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .ra-page-root .sit-link .solid {
          stroke: var(--accent);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          transition: stroke-dashoffset 1.2s var(--ease);
          filter: drop-shadow(0 0 6px rgba(79, 139, 255, 0.6));
        }
        .ra-page-root .sit-link .dotted {
          stroke: var(--warm);
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 4 6;
          opacity: 0;
          transition: opacity 0.8s 0.9s;
          filter: drop-shadow(0 0 6px rgba(229, 185, 108, 0.5));
        }
        .ra-page-root .in-view .sit-link .solid {
          stroke-dashoffset: 0;
        }
        .ra-page-root .in-view .sit-link .dotted {
          opacity: 1;
        }
        .ra-page-root .situation-copy.reality-comparison-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: stretch;
          gap: clamp(28px, 4vw, 52px);
          margin-top: 48px;
          padding-top: 8px;
        }
        .ra-page-root .reality-col {
          display: flex;
          flex-direction: column;
        }
        .ra-page-root .reality-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .ra-page-root .reality-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 15px;
        }
        .ra-page-root .reality-eyebrow-text {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }
        .ra-page-root .reality-body {
          font-size: clamp(14.5px, 1.1vw, 16px);
          line-height: 1.65;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }
        .ra-page-root .reality-vertical-divider {
          width: 1px;
          background: rgba(255, 255, 255, 0.12);
          align-self: stretch;
          min-height: 80px;
        }
        @media (max-width: 800px) {
          .ra-page-root .situation-copy.reality-comparison-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ra-page-root .reality-vertical-divider {
            display: none;
          }
        }

        .ra-page-root .envelope-section-head {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) auto minmax(0, 1fr);
          align-items: center;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(36px, 5vw, 56px);
        }
        .ra-page-root .envelope-head-left {
          display: flex;
          flex-direction: column;
        }
        .ra-page-root .envelope-index {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .ra-page-root .envelope-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .ra-page-root .envelope-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }
        .ra-page-root .envelope-eyebrow-text {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }
        .ra-page-root .envelope-title {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 600;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0;
        }
        .ra-page-root .envelope-vertical-divider {
          width: 1px;
          min-height: 90px;
          background: rgba(255, 255, 255, 0.12);
          align-self: stretch;
        }
        .ra-page-root .envelope-head-right {
          display: flex;
          align-items: center;
        }
        .ra-page-root .envelope-lead {
          font-size: clamp(15px, 1.15vw, 17px);
          line-height: 1.65;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
        }
        @media (max-width: 900px) {
          .ra-page-root .envelope-section-head {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .ra-page-root .envelope-vertical-divider {
            display: none;
          }
        }
        .ra-page-root .demand {
          margin-top: 48px;
          border: 1px solid rgba(74, 144, 255, 0.25);
          border-radius: var(--radius-lg);
          padding: 24px 28px 16px;
          background: linear-gradient(180deg, rgba(12, 22, 44, 0.6) 0%, rgba(6, 12, 24, 0.8) 100%);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }
        .ra-page-root .demand svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .ra-page-root .demand .axis {
          stroke: var(--line-strong);
        }
        .ra-page-root .demand .band {
          fill: rgba(79, 139, 255, 0.12);
        }
        .ra-page-root .demand .known {
          stroke: var(--accent);
          stroke-width: 2.2;
          fill: none;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 1.4s var(--ease);
          filter: drop-shadow(0 0 8px rgba(79, 139, 255, 0.6));
        }
        .ra-page-root .demand .unknown {
          stroke: var(--warm);
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 4 6;
          opacity: 0;
          transition: opacity 0.8s 1s;
          filter: drop-shadow(0 0 6px rgba(229, 185, 108, 0.4));
        }
        .ra-page-root .demand .ceiling {
          stroke: var(--text-3);
          stroke-dasharray: 2 4;
        }
        .ra-page-root .demand text {
          font-family: var(--font-mono);
          font-size: 10px;
          fill: var(--text-2);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .ra-page-root .demand.in-view .known {
          stroke-dashoffset: 0;
        }
        .ra-page-root .demand.in-view .unknown {
          opacity: 1;
        }
        .ra-page-root .demand-caption {
          display: none;
          justify-content: space-between;
          gap: 12px;
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-3);
        }

        .ra-page-root .compare-col {
          padding: clamp(28px, 3.5vw, 40px);
          background: linear-gradient(180deg, rgba(14, 24, 48, 0.55) 0%, rgba(6, 12, 26, 0.7) 100%);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
        }
        .ra-page-root .compare-col > .micro {
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .ra-page-root .compare-col.modular {
          border-color: rgba(79, 139, 255, 0.45);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(79, 139, 255, 0.12);
        }
        .ra-page-root .compare-col.modular > .micro {
          color: #8fd0ff;
        }
        .ra-page-root .compare-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ra-page-root .compare-list li {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 14px;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid var(--line);
          font-size: 15px;
          color: var(--text-2);
        }
        .ra-page-root .compare-list li:last-child {
          border-bottom: 1px solid var(--line);
        }
        .ra-page-root .compare-list .g {
          width: 22px;
          height: 22px;
          position: relative;
        }
        .ra-page-root .compare-list .g::before {
          content: "";
          position: absolute;
          inset: 4px;
          border: 1px solid var(--text-3);
          border-radius: 3px;
        }
        .ra-page-root .modular .compare-list .g::before {
          border-color: var(--accent);
          background: rgba(79, 139, 255, 0.25);
          box-shadow: 0 0 8px rgba(79, 139, 255, 0.5);
        }
        .ra-page-root .traditional .compare-list .g::after {
          content: "";
          position: absolute;
          left: 4px;
          right: 4px;
          top: 10.5px;
          height: 1px;
          background: var(--text-3);
        }
        .ra-page-root .compare-viz {
          margin-top: 24px;
        }
        .ra-page-root .compare-viz svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .ra-page-root .compare-viz rect {
          fill: none;
          stroke: var(--line-strong);
        }
        .ra-page-root .compare-viz .hall {
          stroke: var(--text-3);
          stroke-dasharray: 2 3;
        }
        .ra-page-root .compare-viz .podbox {
          stroke: var(--accent);
          fill: rgba(79, 139, 255, 0.2);
        }
        .ra-page-root .compare-viz .podbox.future {
          fill: none;
          stroke-dasharray: 3 3;
          stroke: rgba(79, 139, 255, 0.5);
        }
        .ra-page-root .compare-viz text {
          font-family: var(--font-mono);
          font-size: 9px;
          fill: var(--text-2);
          letter-spacing: 0.14em;
        }

        .ra-page-root .deploy-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        .ra-page-root .thesis {
          font-size: clamp(20px, 1.9vw, 24px);
          letter-spacing: -0.02em;
          line-height: 1.35;
          padding: 20px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin: 28px 0;
        }
        .ra-page-root .flow-toggle {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ra-page-root .flow-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 38px;
          padding: 0 14px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-2);
          transition: border-color 0.2s, background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .ra-page-root .flow-btn .sw {
          width: 22px;
          height: 2px;
          background: var(--text-3);
          border-radius: 1px;
        }
        .ra-page-root .flow-btn[data-flow="power"] .sw {
          background: var(--accent);
        }
        .ra-page-root .flow-btn[data-flow="cooling"] .sw {
          background: var(--cool);
        }
        .ra-page-root .flow-btn[data-flow="network"] .sw {
          background: repeating-linear-gradient(90deg, var(--net) 0 3px, transparent 3px 6px);
        }
        .ra-page-root .flow-btn[aria-pressed="true"] {
          border-color: var(--line-strong);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
        }
        .ra-page-root .flow-help {
          margin-top: 16px;
          font-size: 13px;
          color: var(--text-3);
          min-height: 1.5em;
        }
        .ra-page-root .campus {
          padding: clamp(18px, 2.5vw, 28px);
        }
        .ra-page-root .panel.campus {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.38);
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 28px rgba(56, 189, 248, 0.16), inset 0 0 20px rgba(56, 189, 248, 0.04);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ra-page-root .panel.campus:hover {
          border-color: rgba(56, 189, 248, 0.65);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 36px rgba(56, 189, 248, 0.25);
        }
        .ra-page-root .campus svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .ra-page-root .campus .node rect {
          fill: var(--bg-3);
          stroke: var(--line-strong);
          transition: stroke 0.3s, fill 0.3s;
        }
        .ra-page-root .campus .node text {
          transition: fill 0.3s;
        }
        .ra-page-root .campus .node.podn rect {
          stroke-width: 1;
        }
        .ra-page-root .campus .node.podn .lbar {
          stroke: var(--accent);
          stroke-width: 2;
        }
        .ra-page-root .campus .node.ghostn rect {
          stroke-dasharray: 3 3;
          fill: none;
        }
        .ra-page-root .campus .node.ghostn .lbar {
          stroke: var(--line-strong);
        }
        .ra-page-root .campus .rail {
          stroke-width: 1.5;
          opacity: 0.35;
          transition: opacity 0.3s;
        }
        .ra-page-root .campus .rail.power {
          stroke: var(--accent);
        }
        .ra-page-root .campus .rail.cool {
          stroke: var(--cool);
        }
        .ra-page-root .campus .rail.net {
          stroke: var(--net);
          stroke-dasharray: 3 3;
        }
        .ra-page-root .campus .tap {
          fill: none;
          stroke: var(--line);
          stroke-width: 1;
          transition: stroke 0.3s;
        }
        .ra-page-root .campus svg text {
          font-size: 10.5px;
          letter-spacing: 0.07em;
        }
        .ra-page-root .campus svg .t1 {
          font-size: 12.5px;
          letter-spacing: 0.1em;
        }
        .ra-page-root .campus .tapv {
          stroke: var(--line-strong);
          stroke-width: 1;
        }
        .ra-page-root .campus[data-flow] .node {
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .ra-page-root .campus[data-flow] .rail {
          opacity: 0.1;
        }
        .ra-page-root .campus[data-flow="power"] .rail.power,
        .ra-page-root .campus[data-flow="cooling"] .rail.cool,
        .ra-page-root .campus[data-flow="network"] .rail.net {
          opacity: 1;
        }
        .ra-page-root .campus[data-flow="power"] .node[data-power],
        .ra-page-root .campus[data-flow="cooling"] .node[data-cooling],
        .ra-page-root .campus[data-flow="network"] .node[data-network] {
          opacity: 1;
        }
        .ra-page-root .campus[data-flow="power"] .node[data-power] rect {
          stroke: rgba(76, 141, 255, 0.6);
          fill: rgba(76, 141, 255, 0.06);
        }
        .ra-page-root .campus[data-flow="cooling"] .node[data-cooling] rect {
          stroke: rgba(95, 195, 210, 0.6);
          fill: rgba(95, 195, 210, 0.06);
        }
        .ra-page-root .campus[data-flow="network"] .node[data-network] rect {
          stroke: rgba(201, 211, 226, 0.6);
          fill: rgba(201, 211, 226, 0.05);
        }
        .ra-page-root .campus[data-flow="power"] .tap.power {
          stroke: var(--accent);
        }
        .ra-page-root .campus[data-flow="cooling"] .tap.cool {
          stroke: var(--cool);
        }
        .ra-page-root .campus[data-flow="network"] .tap.net {
          stroke: var(--net);
        }
        .ra-page-root .campus .pulse {
          opacity: 0;
        }
        .ra-page-root .campus[data-flow="power"] .pulse.power,
        .ra-page-root .campus[data-flow="cooling"] .pulse.cool,
        .ra-page-root .campus[data-flow="network"] .pulse.net {
          opacity: 1;
        }
        .ra-page-root .campus-foot {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
        }

        /* Phases */
        .ra-page-root .phases {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        .ra-page-root .phase-list {
          display: grid;
          gap: 8px;
          position: sticky;
          top: 88px;
        }
        .ra-page-root .phase {
          text-align: left;
          width: 100%;
          padding: 18px 20px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: var(--bg-2);
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 16px;
          align-items: start;
          transition: border-color 0.3s, background 0.3s;
          cursor: pointer;
        }
        .ra-page-root .phase:hover {
          border-color: var(--line-strong);
        }
        .ra-page-root .phase[aria-selected="true"] {
          border-color: rgba(76, 141, 255, 0.5);
          background: rgba(76, 141, 255, 0.05);
        }
        .ra-page-root .phase .num {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          color: var(--text-3);
          padding-top: 6px;
          white-space: nowrap;
        }
        .ra-page-root .phase[aria-selected="true"] .num {
          color: var(--accent);
        }
        .ra-page-root .phase h3 {
          font-size: 18px;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .ra-page-root .phase p {
          font-size: 14px;
          color: var(--text-2);
        }
        .ra-page-root .phase .cost {
          margin-top: 10px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-3);
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .ra-page-root .phase .cost::before {
          content: "";
          width: 6px;
          height: 6px;
          border: 1px solid var(--text-3);
          transform: translateY(5px) rotate(45deg);
          flex: none;
        }
        .ra-page-root .phase-stage {
          padding: clamp(18px, 2.4vw, 28px);
        }
        .ra-page-root .phase-stage .bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 12px;
        }
        .ra-page-root .phase-note {
          margin-top: 14px;
          font-size: 13.5px;
          color: var(--text-2);
          min-height: 3em;
        }
        .ra-page-root .phase-note strong {
          color: var(--text);
          font-weight: 500;
        }
        .ra-page-root .ps .pod {
          opacity: 0.14;
          transition: opacity 0.5s;
        }
        .ra-page-root .ps .pod .frame {
          fill: var(--bg-3);
          stroke: var(--line-strong);
          transition: stroke 0.5s;
        }
        .ra-page-root .ps .pod.on {
          opacity: 1;
        }
        .ra-page-root .ps .pod.on .frame {
          stroke: var(--accent);
        }
        .ra-page-root .ps .pwr,
        .ra-page-root .ps .cl {
          opacity: 0.15;
          transition: opacity 0.5s;
        }
        .ra-page-root .ps .pwr.on-line,
        .ra-page-root .ps .cl.on-line {
          opacity: 1;
        }
        .ra-page-root .ps .island {
          fill: none;
          stroke: var(--text-3);
          stroke-dasharray: 2 3;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .ra-page-root .ps .island.on {
          opacity: 0.7;
        }

        /* Environment & Spec Cards */
        .ra-page-root .env-card {
          overflow: hidden;
        }
        .ra-page-root .env-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--line);
        }
        .ra-page-root .env-head .name {
          font-size: 17px;
          font-weight: 500;
          text-align: right;
        }
        .ra-page-root .env-body {
          padding: 24px;
        }
        .ra-page-root .env-load {
          font-family: var(--font-mono);
          font-size: clamp(40px, 4vw, 56px);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .ra-page-root .env-load .pre {
          font-family: var(--font-ui);
          font-size: 0.32em;
          color: var(--text-2);
          letter-spacing: 0;
          margin-right: 10px;
          vertical-align: middle;
        }
        .ra-page-root .env-load small {
          font-size: 0.35em;
          color: var(--text-3);
          letter-spacing: 0.08em;
          margin-left: 8px;
          vertical-align: middle;
        }
        .ra-page-root .env-rows {
          margin-top: 24px;
        }
        .ra-page-root .env-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 16px;
          padding: 12px 0;
          border-top: 1px solid var(--line);
          font-size: 14px;
          color: var(--text-2);
        }
        .ra-page-root .env-row .k {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
          padding-top: 3px;
        }
        .ra-page-root .env-viz {
          margin-top: 24px;
          padding: 16px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: var(--bg-3);
        }
        .ra-page-root .env-viz svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .ra-page-root .env-viz rect {
          stroke: var(--line-strong);
          fill: rgba(255, 255, 255, 0.02);
        }
        .ra-page-root .env-viz .it {
          stroke: var(--accent);
          fill: var(--accent-soft);
        }
        .ra-page-root .env-viz .nw {
          stroke: var(--net);
          fill: var(--net-soft);
        }
        .ra-page-root .env-viz text {
          font-family: var(--font-mono);
          font-size: 8.5px;
          fill: var(--text-3);
          letter-spacing: 0.12em;
        }
        .ra-page-root .note {
          margin-top: 20px;
          padding: 18px 22px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          font-size: 14px;
          color: var(--text-2);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items: center;
        }
        .ra-page-root .note .micro {
          white-space: nowrap;
        }
        .ra-page-root .note.attrib {
          border-color: rgba(224, 179, 106, 0.35);
          background: rgba(224, 179, 106, 0.04);
        }
        .ra-page-root .note.attrib .micro {
          color: var(--warm);
        }

        .ra-page-root .fac {
          padding: 26px 22px;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: linear-gradient(180deg, rgba(14, 24, 48, 0.6) 0%, rgba(6, 12, 26, 0.8) 100%);
          border: 1px solid rgba(74, 144, 255, 0.22);
          border-radius: var(--radius-lg);
          transition: all 0.3s ease;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        .ra-page-root .fac:hover {
          border-color: rgba(110, 165, 255, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5), 0 0 24px rgba(79, 139, 255, 0.2);
        }
        .ra-page-root .fac .ico {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(79, 139, 255, 0.12);
          border: 1px solid rgba(79, 139, 255, 0.35);
          box-shadow: 0 0 16px rgba(79, 139, 255, 0.2);
          padding: 6px;
        }
        .ra-page-root .fac .ico svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .ra-page-root .fac .ico * {
          stroke: #8fd0ff;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
        }
        .ra-page-root .fac h3 {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          color: #ffffff;
        }
        .ra-page-root .fac p {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.6;
          flex: 1;
        }
        .ra-page-root .fac .idx {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent);
          letter-spacing: 0.14em;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(79, 139, 255, 0.12);
          border: 1px solid rgba(79, 139, 255, 0.3);
          align-self: flex-start;
          font-weight: 600;
        }

        .ra-page-root .limits {
          background: linear-gradient(180deg, var(--bg-2), var(--bg));
        }
        /* Section 07: What This Does Not Solve */
        .ra-page-root .limits-section {
          padding: clamp(60px, 7vw, 100px) 0;
          background: #030712;
        }

        .ra-page-root .limits-layout-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
          gap: clamp(36px, 5vw, 64px);
          align-items: start;
        }

        .ra-page-root .limits-left-col {
          display: flex;
          flex-direction: column;
        }

        .ra-page-root .limits-index {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.14em;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .ra-page-root .limits-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .ra-page-root .limits-eyebrow-dash {
          color: #38bdf8;
          font-weight: 600;
          font-size: 14px;
        }

        .ra-page-root .limits-eyebrow-text {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra-page-root .limits-title {
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 16px;
        }

        .ra-page-root .limits-subtitle {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
          color: #cbd5e1;
          margin: 0 0 24px;
        }

        .ra-page-root .limits-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin-bottom: 22px;
        }

        .ra-page-root .limits-prose {
          font-size: 14px;
          line-height: 1.65;
          color: #94a3b8;
          margin-bottom: 32px;
        }

        .ra-page-root .limits-prose p {
          margin: 0;
        }

        /* Callout Box */
        .ra-page-root .limits-callout-box {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 12px;
          padding: 22px 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ra-page-root .limits-callout-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra-page-root .limits-callout-quote-row {
          display: flex;
          align-items: stretch;
          gap: 16px;
        }

        .ra-page-root .limits-callout-accent-bar {
          width: 2.5px;
          background: #38bdf8;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
          flex-shrink: 0;
        }

        .ra-page-root .limits-callout-quote {
          font-size: clamp(17px, 1.4vw, 20px);
          font-weight: 600;
          line-height: 1.35;
          color: #ffffff;
          margin: 0;
        }

        /* Right Column Table */
        .ra-page-root .limits-right-col {
          display: flex;
          flex-direction: column;
        }

        .ra-page-root .limits-table-header {
          margin-bottom: 14px;
        }

        .ra-page-root .limits-table-header-text {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra-page-root .limits-table-card {
          background: #040914;
          border: 1px solid rgba(56, 189, 248, 0.18);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .ra-page-root .limits-row {
          display: grid;
          grid-template-columns: 135px 1fr auto;
          align-items: center;
          gap: 18px;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.2s ease;
        }

        .ra-page-root .limits-row:last-child {
          border-bottom: none;
        }

        .ra-page-root .limits-row:hover {
          background: rgba(56, 189, 248, 0.035);
        }

        .ra-page-root .limits-cell-key {
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.14em;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ra-page-root .limits-cell-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: #cbd5e1;
        }

        /* Badges */
        .ra-page-root .limits-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          font-weight: 600;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .ra-page-root .limits-badge.fixed {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #cbd5e1;
        }

        .ra-page-root .limits-badge.sized-once {
          background: rgba(14, 38, 74, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        .ra-page-root .limits-badge.modular {
          background: rgba(14, 38, 74, 0.85);
          border: 1px solid #2563eb;
          color: #38bdf8;
          font-weight: 700;
          box-shadow: 0 0 12px rgba(37, 99, 235, 0.4);
        }

        @media (max-width: 960px) {
          .ra-page-root .limits-layout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .ra-page-root .limits-row {
            grid-template-columns: 1fr auto;
            gap: 12px;
            padding: 16px;
          }

          .ra-page-root .limits-cell-desc {
            grid-column: 1 / -1;
          }
        }
        .ra-page-root .callout {
          margin-top: 36px;
          padding: 26px 28px;
          border: 1px solid rgba(79, 139, 255, 0.4);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius);
          background: linear-gradient(90deg, rgba(79, 139, 255, 0.12), transparent 70%);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        }
        .ra-page-root .callout p.micro {
          margin-bottom: 10px;
        }
        .ra-page-root .callout .q {
          font-size: clamp(19px, 1.8vw, 24px);
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .ra-page-root .limit-viz {
          padding: 16px 22px 14px;
        }
        .ra-page-root .limit-viz svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .ra-page-root .cta {
          padding: clamp(72px, 9vw, 120px) 0;
        }
        .ra-page-root .cta-box {
          padding: clamp(36px, 5vw, 64px);
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) auto;
          gap: 32px;
          align-items: center;
          background: radial-gradient(120% 120% at 20% 0%, rgba(79, 139, 255, 0.2) 0%, rgba(14, 26, 52, 0.75) 50%, rgba(6, 12, 26, 0.9) 100%);
          border: 1px solid rgba(79, 139, 255, 0.4);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }
        .ra-page-root .cta-box::after {
          content: "";
          position: absolute;
          right: -80px;
          top: -80px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79, 139, 255, 0.25) 0%, transparent 70%);
          pointer-events: none;
        }
        .ra-page-root .cta-box .eyebrow {
          margin-bottom: 18px;
        }
        .ra-page-root .cta-box h2 {
          max-width: 22ch;
          color: #ffffff;
          font-size: clamp(26px, 2.8vw, 36px);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .ra-page-root .cta-box p.sub {
          margin-top: 14px;
          color: var(--text-2);
          max-width: 50ch;
          font-size: 15.5px;
          line-height: 1.6;
        }
        .ra-page-root .source {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-3);
          letter-spacing: 0.04em;
          line-height: 1.8;
        }
        .ra-page-root .source b {
          color: var(--text-2);
          font-weight: 500;
        }
        .ra-page-root .site-footer {
          border-top: 1px solid var(--line);
          padding: 28px 0;
          font-size: 13px;
          color: var(--text-3);
        }
        .ra-page-root .site-footer .container {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Index View Cards */
        .ra-page-root .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: clamp(48px, 5.5vw, 76px);
          padding-bottom: clamp(72px, 8vw, 120px);
        }
        .ra-page-root .card {
          display: flex;
          flex-direction: column;
          padding: 28px 24px;
          min-height: 520px;
          opacity: 1 !important;
          visibility: visible !important;
          background: linear-gradient(180deg, rgba(14, 24, 48, 0.6) 0%, rgba(6, 12, 26, 0.8) 100%);
          border: 1px solid rgba(74, 144, 255, 0.22);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.35s var(--ease);
          cursor: pointer;
          position: relative;
        }
        .ra-page-root .card:hover {
          border-color: rgba(110, 165, 255, 0.65);
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 32px rgba(79, 139, 255, 0.2);
        }
        .ra-page-root .card .eyebrow {
          margin-bottom: 16px;
        }
        .ra-page-root .card h2 {
          font-size: clamp(20px, 1.6vw, 23px);
          line-height: 1.28;
          margin-bottom: 12px;
          color: #ffffff;
          font-weight: 600;
        }
        .ra-page-root .card .sum {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.55;
          flex: 0;
        }
        .ra-page-root .card .viz {
          margin: 22px 0;
          border: 1px solid rgba(74, 144, 255, 0.2);
          border-radius: var(--radius);
          background: rgba(10, 18, 38, 0.8);
          padding: 14px;
          flex: 1;
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.4);
        }
        .ra-page-root .card .viz::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .ra-page-root .card .viz svg {
          width: 100%;
          height: auto;
          position: relative;
        }
        .ra-page-root .card .mstrip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 18px;
        }
        .ra-page-root .card .mstrip > div {
          padding: 12px 0;
        }
        .ra-page-root .card .mstrip > div + div {
          border-left: 1px solid var(--line);
          padding-left: 14px;
        }
        .ra-page-root .card .mstrip .v {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .ra-page-root .card .mstrip .v.q {
          font-family: var(--font-ui);
          font-size: 13.5px;
          line-height: 1.35;
          padding-top: 4px;
          color: var(--text);
        }
        .ra-page-root .card .mstrip .l {
          font-size: 11px;
          color: var(--text-3);
          line-height: 1.4;
          margin-top: 4px;
        }
        .ra-page-root .card .card-btn,
        .ra-page-root .card .link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 22px;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(37, 99, 235, 0.28) 100%);
          border: 1.5px solid rgba(56, 189, 248, 0.45);
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transition: all 0.25s ease;
          width: fit-content;
          text-decoration: none;
          margin-top: 4px;
        }
        .ra-page-root .card .card-btn .arrow,
        .ra-page-root .card .link .arrow {
          color: #38bdf8;
          font-size: 15px;
          transition: transform 0.25s ease;
        }
        .ra-page-root .card:hover .card-btn,
        .ra-page-root .card:hover .link {
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.32) 0%, rgba(37, 99, 235, 0.5) 100%);
          border-color: #38bdf8;
          box-shadow: 0 0 24px rgba(56, 189, 248, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
        .ra-page-root .card:hover .card-btn .arrow,
        .ra-page-root .card:hover .link .arrow {
          transform: translateX(4px);
        }
        .ra-page-root .template-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          margin-top: 32px;
        }
        .ra-page-root .template-row div {
          background: rgba(12, 22, 44, 0.6);
          border: 1px solid rgba(74, 144, 255, 0.2);
          border-radius: 8px;
          padding: 12px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-2);
          line-height: 1.4;
          transition: all 0.25s ease;
        }
        .ra-page-root .template-row div:hover {
          border-color: rgba(79, 139, 255, 0.5);
          background: rgba(20, 36, 72, 0.7);
          transform: translateY(-2px);
        }
        .ra-page-root .template-row div b {
          display: block;
          color: #8fd0ff;
          font-weight: 700;
          margin-bottom: 4px;
          font-size: 11px;
        }
        .ra-page-root .template-row div.last {
          border-color: rgba(79, 139, 255, 0.45);
          background: rgba(79, 139, 255, 0.1);
        }
        .ra-page-root .template-row div.last b {
          color: var(--accent);
        }

        /* Facility Cards */
        .ra-page-root .fac {
          padding: clamp(24px, 2.5vw, 32px);
          background: linear-gradient(180deg, rgba(14, 24, 48, 0.6) 0%, rgba(6, 12, 26, 0.75) 100%);
          border: 1px solid rgba(74, 144, 255, 0.22);
          border-radius: var(--radius-lg);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 240px;
        }
        .ra-page-root .fac:hover {
          border-color: rgba(110, 165, 255, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 20px rgba(79, 139, 255, 0.15);
        }
        .ra-page-root .fac h3 {
          font-size: 19px;
          color: #ffffff;
          font-weight: 600;
          margin: 12px 0 8px;
        }
        .ra-page-root .fac p {
          color: var(--text-2);
          font-size: 14px;
          line-height: 1.55;
        }

        /* Checklist Cards */
        .ra-page-root .check-card {
          padding: 24px;
          background: linear-gradient(180deg, rgba(12, 22, 44, 0.6) 0%, rgba(6, 12, 26, 0.75) 100%);
          border: 1px solid rgba(74, 144, 255, 0.22);
          border-radius: var(--radius-lg);
          transition: all 0.3s ease;
        }
        .ra-page-root .check-card:hover {
          border-color: rgba(110, 165, 255, 0.55);
          transform: translateY(-2px);
        }
        .ra-page-root .check-card h3 {
          font-size: 18px;
          color: #ffffff;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .ra-page-root .check-card p {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.55;
        }

        /* RA-02 / RA-03 specific */
        .ra-page-root .two-phase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .ra-page-root .phase-card {
          padding: clamp(22px, 3vw, 32px);
        }
        .ra-page-root .phase-card > .micro {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }
        .ra-page-root .phase-card.pf > .micro {
          color: var(--warm);
        }
        .ra-page-root .phase-card.pf {
          border-color: rgba(224, 179, 106, 0.35);
        }
        .ra-page-root .phase-card.dc > .micro {
          color: var(--accent);
        }
        .ra-page-root .phase-card.dc {
          border-color: rgba(76, 141, 255, 0.35);
        }
        .ra-page-root .phase-card h3 {
          font-size: 22px;
          margin-bottom: 8px;
        }
        .ra-page-root .spec {
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
        }
        .ra-page-root .spec li {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 12px;
          padding: 11px 0;
          border-top: 1px solid var(--line);
          font-size: 14px;
          color: var(--text-2);
        }
        .ra-page-root .spec li:last-child {
          border-bottom: 1px solid var(--line);
        }
        .ra-page-root .spec .k {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
          padding-top: 3px;
        }
        .ra-page-root .profile {
          margin-top: 20px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: var(--bg-3);
          padding: 14px;
        }
        .ra-page-root .profile svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .ra-page-root .profile .axis {
          stroke: var(--line-strong);
        }
        .ra-page-root .profile .tdp {
          stroke: var(--text-3);
          stroke-dasharray: 2 4;
        }
        .ra-page-root .profile .line {
          fill: none;
          stroke-width: 1.8;
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          transition: stroke-dashoffset 2.2s var(--ease);
        }
        .ra-page-root .profile .line.pf {
          stroke: var(--warm);
        }
        .ra-page-root .profile .line.dc {
          stroke: var(--accent);
        }
        .ra-page-root .in-view .profile .line {
          stroke-dashoffset: 0;
        }
        .ra-page-root .profile text {
          font-family: var(--font-mono);
          font-size: 9px;
          fill: var(--text-3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ra-page-root .steps {
          display: grid;
          gap: 8px;
        }
        .ra-page-root .step {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 14px;
          padding: 16px 18px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: var(--bg-2);
          transition: border-color 0.3s, background 0.3s;
          cursor: pointer;
        }
        .ra-page-root .step .n {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-3);
          padding-top: 4px;
        }
        .ra-page-root .step h4 {
          font-size: 15px;
          margin-bottom: 4px;
          font-weight: 500;
        }
        .ra-page-root .step p {
          font-size: 13.5px;
          color: var(--text-2);
        }
        .ra-page-root .step.is-on {
          border-color: rgba(76, 141, 255, 0.5);
          background: rgba(76, 141, 255, 0.05);
        }
        .ra-page-root .step.is-on .n {
          color: var(--accent);
        }
        .ra-page-root .tier-list {
          list-style: none;
          margin: 0;
          padding: 0;
          counter-reset: t;
        }
        .ra-page-root .tier-list li {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          gap: 14px;
          align-items: center;
          padding: 14px 0;
          border-top: 1px solid var(--line);
          font-size: 15px;
        }
        .ra-page-root .tier-list li:last-child {
          border-bottom: 1px solid var(--line);
        }
        .ra-page-root .tier-list .n {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-3);
          letter-spacing: 0.12em;
        }
        .ra-page-root .tier-list .s {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
          border: 1px solid var(--line-strong);
          border-radius: 3px;
          padding: 4px 8px;
          white-space: nowrap;
        }
        .ra-page-root .tier-list .s.hi {
          color: var(--accent);
          border-color: rgba(76, 141, 255, 0.4);
        }
        .ra-page-root .results {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .ra-page-root .res {
          padding: 20px 18px;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .ra-page-root .res .v {
          font-family: var(--font-mono);
          font-size: clamp(22px, 2vw, 30px);
          letter-spacing: -0.03em;
        }
        .ra-page-root .res .v small {
          font-size: 0.5em;
          color: var(--text-3);
          margin-left: 4px;
        }
        .ra-page-root .res .l {
          font-size: 12px;
          color: var(--text-3);
          line-height: 1.45;
          margin-top: 10px;
        }
        .ra-page-root .res .from {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.1em;
          margin-top: 8px;
        }
        .ra-page-root .res .from b {
          color: var(--text-2);
          font-weight: 500;
        }

        /* Reveal & Motion */
        .ra-page-root .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .ra-page-root .reveal.in-view {
          opacity: 1;
          transform: none;
        }
        .ra-page-root .reveal[data-delay="1"] {
          transition-delay: 0.1s;
        }
        .ra-page-root .reveal[data-delay="2"] {
          transition-delay: 0.2s;
        }
        .ra-page-root .reveal[data-delay="3"] {
          transition-delay: 0.3s;
        }

        @media (prefers-reduced-motion: reduce) {
          .ra-page-root *,
          .ra-page-root *::before,
          .ra-page-root *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            transition-delay: 0s !important;
            animation: none !important;
          }
          .ra-page-root .reveal {
            opacity: 1;
            transform: none;
          }
          .ra-page-root .dg .draw,
          .ra-page-root .dg .fade,
          .ra-page-root .dg .rise {
            opacity: 1;
            transform: none;
            stroke-dashoffset: 0;
          }
          .ra-page-root .dg .rk-row {
            opacity: 1;
          }
          .ra-page-root .dg .pulse {
            display: none;
          }
          .ra-page-root .sit-link .solid,
          .ra-page-root .demand .known,
          .ra-page-root .profile .line {
            stroke-dashoffset: 0;
          }
          .ra-page-root .sit-link .dotted,
          .ra-page-root .demand .unknown {
            opacity: 1;
          }
        }

        /* Responsive Media Queries */
        @media (max-width: 1100px) {
          .ra-page-root .grid-4,
          .ra-page-root .results {
            grid-template-columns: repeat(2, 1fr);
          }
          .ra-page-root .cards {
            grid-template-columns: 1fr;
          }
          .ra-page-root .card {
            min-height: 0;
          }
          .ra-page-root .template-row {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 980px) {
          .ra-page-root .hero-grid,
          .ra-page-root .deploy-grid,
          .ra-page-root .phases,
          .ra-page-root .limits-grid,
          .ra-page-root .section-head,
          .ra-page-root .grid-2,
          .ra-page-root .two-phase {
            grid-template-columns: 1fr;
          }
          .ra-page-root .hero-copy h1 {
            max-width: none;
          }
          .ra-page-root .phase-list {
            position: static;
          }
          .ra-page-root .situation-copy {
            grid-template-columns: 1fr;
          }
          .ra-page-root .cta-box {
            grid-template-columns: 1fr;
          }
          .ra-page-root .hero::after {
            display: none;
          }
        }
        @media (max-width: 820px) {
          .ra-page-root .nav-links {
            display: none;
          }
          .ra-page-root .nav-toggle {
            display: grid;
          }
          .ra-page-root .nav-cta .btn {
            height: 38px;
            padding: 0 14px;
            font-size: 13px;
          }
          .ra-page-root .site-header.menu-open .nav-links {
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 0;
            right: 0;
            top: 64px;
            padding: 12px var(--gutter) 20px;
            background: var(--bg-2);
            border-bottom: 1px solid var(--line);
          }
          .ra-page-root .site-header.menu-open .nav-links a[aria-current="page"]::after {
            display: none;
          }
          .ra-page-root .site-header.menu-open .nav-links a[aria-current="page"] {
            color: var(--accent);
          }
        }
        @media (max-width: 720px) {
          .ra-page-root .situation-grid {
            grid-template-columns: 1fr;
          }
          .ra-page-root .sit-link {
            width: 100%;
            height: 72px;
          }
          .ra-page-root .sit-link svg {
            transform: rotate(90deg);
            width: 60px;
          }
          .ra-page-root .sit-panel {
            min-height: 0;
          }
          .ra-page-root .metrics {
            grid-template-columns: 1fr;
          }
          .ra-page-root .metric {
            border-left: 0;
            padding-left: 0;
            border-top: 1px solid var(--line);
            padding: 14px 0;
          }
          .ra-page-root .metric:first-child {
            border-top: 0;
          }
          .ra-page-root .env-row,
          .ra-page-root .fixed-list li,
          .ra-page-root .spec li,
          .ra-page-root .tier-list li {
            grid-template-columns: 1fr;
          }
          .ra-page-root .fixed-list li,
          .ra-page-root .tier-list li {
            gap: 6px;
          }
          .ra-page-root .fixed-list .s,
          .ra-page-root .tier-list .s {
            justify-self: start;
          }
          .ra-page-root .grid-4,
          .ra-page-root .results,
          .ra-page-root .template-row {
            grid-template-columns: 1fr;
          }
          .ra-page-root .fac {
            min-height: 0;
          }
          .ra-page-root .hero-actions .btn {
            flex: 1 1 auto;
            justify-content: center;
          }
          .ra-page-root .dg .sec {
            display: none;
          }
          .ra-page-root .frame-bar > .micro:first-child {
            display: none;
          }
          .ra-page-root .demand text {
            display: none;
          }
          .ra-page-root .demand {
            padding: 14px 12px 8px;
          }
          .ra-page-root .demand-caption {
            display: flex;
          }
          .ra-page-root .note {
            grid-template-columns: 1fr;
          }
          .ra-page-root .frame,
          .ra-page-root .campus,
          .ra-page-root .phase-stage,
          .ra-page-root .limit-viz {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }
          .ra-page-root .frame svg,
          .ra-page-root .campus svg,
          .ra-page-root .phase-stage svg,
          .ra-page-root .limit-viz svg {
            min-width: 580px;
          }
          .ra-page-root .frame-caption,
          .ra-page-root .phase-note,
          .ra-page-root .campus-foot,
          .ra-page-root .frame-bar,
          .ra-page-root .phase-stage .bar {
            position: sticky;
            left: 0;
            max-width: calc(100vw - 2 * var(--gutter) - 36px);
          }
          .ra-page-root .pan-hint {
            display: block;
          }
          .ra-page-root .card .mstrip {
            grid-template-columns: 1fr;
          }
          .ra-page-root .card .mstrip > div + div {
            border-left: 0;
            border-top: 1px solid var(--line);
            padding-left: 0;
          }
        }
        @media (max-width: 430px) {
          .ra-page-root .dg text {
            font-size: 11px;
          }
          .ra-page-root .h-display {
            font-size: 32px;
          }
          .ra-page-root .nav {
            height: 58px;
          }
        }
      `}</style>
    </div>
  );
}
