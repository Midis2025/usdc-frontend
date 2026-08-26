"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampusSchematicModel from "@/components/reference-architectures/CampusSchematicModel";
import {
  IndexCards,
  FlowToggle,
  Ra1PhaseTabs,
  StepsSwitcher,
} from "@/components/reference-architectures/InteractiveCardModels";
import useReveal from "@/components/reference-architectures/useReveal";
import useFlowPulses from "@/components/reference-architectures/useFlowPulses";

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
          <div className="container index-hero">
            <p className="eyebrow">Use cases · Reference architectures</p>
            <h1 id="index-title" className="h-display">
              Three architectures, one way of thinking about a deployment.
            </h1>
            <p className="lead">
              USDC plans deployments in a repeatable way. Each reference architecture runs the same seven blocks in the same order, states only sourced figures, and closes with what it does not solve.
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

          <IndexCards onNavigate={navigateTo} />
        </section>

        {/* =====================================================================
            VIEW: RA-01 — One pod to cluster
            ===================================================================== */}
        <section className={`view ${currentRoute === "/ra-01" ? "is-active" : ""}`} id="view-ra-01" data-route="/ra-01" aria-labelledby="ra1-title">
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="#/" onClick={(e) => { e.preventDefault(); navigateTo("/"); }}>
                Use cases
              </a>
              <i></i>
              <span>Reference Architecture 01</span>
            </nav>
            <nav className="ra-switch" aria-label="Reference architectures">
              <a href="#/ra-01" aria-current="page" onClick={(e) => { e.preventDefault(); navigateTo("/ra-01"); }}>
                01 · One pod to cluster
              </a>
              <a href="#/ra-02" onClick={(e) => { e.preventDefault(); navigateTo("/ra-02"); }}>
                02 · Prefill sidecar
              </a>
              <a href="#/ra-03" onClick={(e) => { e.preventDefault(); navigateTo("/ra-03"); }}>
                03 · KV cache fabric
              </a>
            </nav>
          </div>

          {/* Hero */}
          <div className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">Reference Architecture 01</p>
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
          <section className="section" aria-labelledby="ra1-sit">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">01 / 07</p>
                  <p className="eyebrow">The Situation</p>
                  <h2 id="ra1-sit" className="h-section">
                    A funded near term and an unforecastable curve.
                  </h2>
                </div>
                <p className="lead">
                  An AI company has a funded workload for the next twelve months and a demand curve after that which nobody can forecast honestly. It needs two to three megawatts of capacity now.
                </p>
              </div>
              <div className="situation-grid reveal" data-delay="1">
                <div className="panel sit-panel now">
                  <div className="meta">
                    <span className="tag">Now</span>
                    <span>Committed</span>
                  </div>
                  <div>
                    <p className="big">2–3<small>MW</small></p>
                    <p className="sub">Funded near-term workload. The number the company can defend.</p>
                  </div>
                </div>
                <div className="sit-link" aria-hidden="true">
                  <svg viewBox="0 0 160 60">
                    <path className="solid" d="M0 30 H70" />
                    <path className="dotted" d="M70 30 H152" />
                    <path className="dotted" d="M144 24 L152 30 L144 36" />
                  </svg>
                </div>
                <div className="panel sit-panel future">
                  <div className="meta">
                    <span className="tag">Future</span>
                    <span>Unknown</span>
                  </div>
                  <div>
                    <p className="big">?</p>
                    <p className="sub">Demand curve uncertain. A build-to-suit asks for a shell sized for the whole curve.</p>
                  </div>
                </div>
              </div>
              <div className="demand reveal" data-delay="2" aria-hidden="true">
                <svg viewBox="0 0 800 180">
                  <line className="axis" x1="40" y1="150" x2="780" y2="150" />
                  <line className="axis" x1="40" y1="20" x2="40" y2="150" />
                  <rect className="band" x="40" y="20" width="240" height="130" />
                  <path className="known" d="M40 140 C120 132 200 118 280 96" />
                  <path className="unknown" d="M280 96 C360 74 440 64 520 60 C600 56 700 52 780 50" />
                  <path className="unknown" d="M280 96 C360 92 440 96 520 104 C600 112 700 118 780 122" />
                  <line className="ceiling" x1="40" y1="34" x2="780" y2="34" />
                  <text x="48" y="30">Build-to-suit shell · sized once, occupied in 18–24 months</text>
                  <text x="48" y="165">0 – 12 months · funded</text>
                  <text x="296" y="165">12 months + · not forecastable</text>
                  <text x="780" y="165" textAnchor="end">Time</text>
                </svg>
                <div className="demand-caption">
                  <span>0–12 mo · funded</span>
                  <span>12 mo+ · not forecastable</span>
                </div>
              </div>
              <div className="situation-copy reveal prose" data-delay="2">
                <p>
                  A build to suit data center asks the company to commit to a shell sized for the whole curve, then wait eighteen to twenty four months to occupy it.
                </p>
                <p>
                  The company signs for what it can defend, which is the near term number, and then discovers that the facility it signed into was designed once, around one power topology, one cooling loop, and one rack density. When phase two arrives with different silicon at a different density, the original design is the ceiling.
                </p>
              </div>
            </div>
          </section>

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
                  Modularity is usually sold as a speed argument. Speed is real, but it is not the important part. A modular pod makes the engineering decision repeatable: if the pod is the unit of design, the tenth pod is the same engineering as the first, and adding capacity stops being a redesign.
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

              <div className="panel campus reveal" data-delay="1" data-campus data-flow={flowRa1 || undefined}>
                <svg className="dg" viewBox="0 0 640 600" role="img" aria-label="Campus stack diagram">
                  {/* rails */}
                  <text x="30" y="14" textAnchor="middle" className="sec">Pwr</text>
                  <text x="62" y="14" textAnchor="middle" className="sec">Cool</text>
                  <text x="94" y="14" textAnchor="middle" className="sec">Net</text>
                  <line className="rail power" x1="30" y1="24" x2="30" y2="590" />
                  <line className="rail cool" x1="62" y1="24" x2="62" y2="590" />
                  <line className="rail net" x1="94" y1="24" x2="94" y2="590" />
                  {/* vertical connectors between nodes */}
                  <line className="tapv" x1="380" y1="86" x2="380" y2="104" />
                  <line className="tapv" x1="380" y1="166" x2="380" y2="184" />
                  <line className="tapv" x1="380" y1="246" x2="380" y2="204" />
                  <line className="tapv" x1="380" y1="246" x2="380" y2="264" />
                  <line className="tapv" x1="380" y1="326" x2="380" y2="344" />
                  <line className="tapv" x1="380" y1="520" x2="380" y2="536" />
                  {/* taps */}
                  <line className="tap power" x1="30" y1="55" x2="130" y2="55" />
                  <line className="tap power" x1="30" y1="135" x2="130" y2="135" />
                  <line className="tap cool" x1="62" y1="215" x2="130" y2="215" />
                  <line className="tap net" x1="94" y1="295" x2="130" y2="295" />
                  <line className="tap power" x1="30" y1="288" x2="130" y2="288" />
                  <line className="tap cool" x1="62" y1="302" x2="130" y2="302" />
                  <line className="tap power" x1="30" y1="376" x2="130" y2="376" />
                  <line className="tap cool" x1="62" y1="386" x2="130" y2="386" />
                  <line className="tap net" x1="94" y1="396" x2="130" y2="396" />
                  <line className="tap net" x1="94" y1="562" x2="130" y2="562" />
                  {/* pod tap bus */}
                  <line className="tap power" x1="130" y1="376" x2="606" y2="376" />
                  <line className="tap cool" x1="130" y1="386" x2="606" y2="386" />
                  <line className="tap net" x1="130" y1="396" x2="606" y2="396" />
                  {/* nodes */}
                  <g className="node" data-power>
                    <rect x="130" y="24" width="480" height="62" rx="4" />
                    <text x="146" y="48" className="t1">Utility interconnect</text>
                    <text x="146" y="66">One interconnect for the whole campus · not modular</text>
                    <rect x="548" y="40" width="48" height="18" rx="3" fill="none" stroke="var(--line)" />
                    <text x="572" y="52" textAnchor="middle" style={{ fontSize: 8 }}>Shared</text>
                  </g>
                  <g className="node" data-power>
                    <rect x="130" y="104" width="480" height="62" rx="4" />
                    <text x="146" y="128" className="t1">Substation / site infrastructure</text>
                    <text x="146" y="146">Pad, yard, perimeter sized for the end state</text>
                    <rect x="548" y="120" width="48" height="18" rx="3" fill="none" stroke="var(--line)" />
                    <text x="572" y="132" textAnchor="middle" style={{ fontSize: 8 }}>Shared</text>
                  </g>
                  <g className="node" data-cooling>
                    <rect x="130" y="184" width="480" height="62" rx="4" />
                    <text x="146" y="208" className="t1">Cooling plant + headers</text>
                    <text x="146" y="226">One plant · headers sized for the campus</text>
                    <rect x="548" y="200" width="48" height="18" rx="3" fill="none" stroke="var(--line)" />
                    <text x="572" y="212" textAnchor="middle" style={{ fontSize: 8 }}>Shared</text>
                  </g>
                  <g className="node" data-power data-cooling data-network>
                    <rect x="130" y="264" width="480" height="62" rx="4" />
                    <text x="146" y="288" className="t1">Control plane</text>
                    <text x="146" y="306">One control plane across every pod on the site</text>
                    <rect x="548" y="280" width="48" height="18" rx="3" fill="none" stroke="var(--line)" />
                    <text x="572" y="292" textAnchor="middle" style={{ fontSize: 8 }}>Shared</text>
                  </g>
                  {/* pods */}
                  <g className="node podn" data-power data-cooling data-network>
                    <rect x="130" y="344" width="150" height="80" rx="4" />
                    <line className="lbar" x1="131" y1="348" x2="131" y2="420" />
                    <text x="146" y="368" className="t1">Pod 01</text>
                    <text x="146" y="386">Built, energized</text>
                    <text x="146" y="410" style={{ fill: "var(--accent)", fontSize: 8.5 }}>IT pod</text>
                  </g>
                  <g className="node podn" data-power data-cooling data-network>
                    <rect x="295" y="344" width="150" height="80" rx="4" />
                    <line className="lbar" x1="296" y1="348" x2="296" y2="420" />
                    <text x="311" y="368" className="t1">Pod 02</text>
                    <text x="311" y="386">Same design</text>
                    <text x="311" y="410" style={{ fill: "var(--accent)", fontSize: 8.5 }}>IT pod</text>
                  </g>
                  <g className="node podn" data-power data-cooling data-network>
                    <rect x="460" y="344" width="150" height="80" rx="4" />
                    <line className="lbar" x1="461" y1="348" x2="461" y2="420" />
                    <text x="476" y="368" className="t1">Pod 03</text>
                    <text x="476" y="386">Silicon per pod</text>
                    <text x="476" y="410" style={{ fill: "var(--accent)", fontSize: 8.5 }}>IT pod</text>
                  </g>
                  <g className="node ghostn">
                    <rect x="130" y="436" width="150" height="48" rx="4" />
                    <line className="lbar" x1="131" y1="440" x2="131" y2="480" />
                    <text x="146" y="456">Pod 04 · planned</text>
                    <text x="146" y="472" className="dim">Not yet paid for</text>
                  </g>
                  <g className="node ghostn">
                    <rect x="295" y="436" width="150" height="48" rx="4" />
                    <line className="lbar" x1="296" y1="440" x2="296" y2="480" />
                    <text x="311" y="456">Pod 05 · planned</text>
                    <text x="311" y="472" className="dim">Not yet paid for</text>
                  </g>
                  <g className="node ghostn">
                    <rect x="460" y="436" width="150" height="48" rx="4" />
                    <line className="lbar" x1="461" y1="440" x2="461" y2="480" />
                    <text x="476" y="456">Pod 06 · planned</text>
                    <text x="476" y="472" className="dim">Not yet paid for</text>
                  </g>
                  {/* fabric */}
                  <path className="tap net" d="M205 424 V500 H535 V424" />
                  <path className="tap net" d="M370 424 V500" />
                  <path className="tap net" d="M370 500 V536" />
                  <g className="node" data-network>
                    <rect x="130" y="536" width="480" height="54" rx="4" />
                    <text x="146" y="558" className="t1">Network skid</text>
                    <text x="146" y="576">One per five IT pods · turns islands into one fabric</text>
                    <rect x="548" y="548" width="48" height="18" rx="3" fill="none" stroke="var(--net)" />
                    <text x="572" y="560" textAnchor="middle" style={{ fontSize: 8, fill: "var(--net)" }}>Fabric</text>
                  </g>
                  {/* pulses */}
                  <path data-pulse="power" data-dur="4" data-n="3" d="M30 24 V55 H130 M30 55 V135 H130" />
                  <path data-pulse="power" data-dur="5" data-n="3" d="M30 135 V376 H606" />
                  <path data-pulse="cool" data-dur="4" data-n="2" d="M62 24 V215 H130" />
                  <path data-pulse="cool" data-dur="5" data-n="3" d="M62 215 V386 H606" />
                  <path data-pulse="net" data-dur="4" data-n="2" d="M94 24 V562 H130" />
                  <path data-pulse="net" data-dur="3.4" data-n="2" d="M370 536 V500 H205 V424" />
                  <path data-pulse="net" data-dur="3.4" data-n="2" d="M370 536 V500 H535 V424" />
                </svg>
                <span className="pan-hint" aria-hidden="true">Pan the diagram →</span>
                <div className="campus-foot">
                  <span>Shared once · built per pod</span>
                  <span>10–15 MW campus ≈ 4–6 pods + 1–2 skids</span>
                </div>
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
          <section className="section" aria-labelledby="ra1-env">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">05 / 07</p>
                  <p className="eyebrow">Reference Envelope</p>
                  <h2 id="ra1-env" className="h-section">Two pod configurations USDC has planned against.</h2>
                </div>
                <p className="lead">
                  Both figures come from named engineering documents, not from a marketing estimate. They define the envelope a pod must accommodate.
                </p>
              </div>
              <div className="grid-2">
                <article className="panel env-card reveal">
                  <div className="env-head">
                    <span className="micro">Pod reference · 01</span>
                    <span className="name">NVIDIA Vera Rubin NVL72</span>
                  </div>
                  <div className="env-body">
                    <p className="micro">IT load</p>
                    <p className="env-load">
                      <span className="pre">About</span>2.8<small>MW</small>
                    </p>
                    <div className="env-rows">
                      <div className="env-row">
                        <span className="k">Physical unit</span>
                        <span>14 IT racks plus 2 network and storage racks in a single row, network racks in the middle.</span>
                      </div>
                      <div className="env-row">
                        <span className="k">Source</span>
                        <span>Vera Rubin NVL72 Facility Planning Summary</span>
                      </div>
                    </div>
                    <div className="env-viz" aria-hidden="true">
                      <svg viewBox="0 0 400 60">
                        <g>
                          <rect className="it" x="4" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="28" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="52" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="76" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="100" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="124" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="148" y="14" width="20" height="32" rx="1" />
                          <rect className="nw" x="176" y="14" width="20" height="32" rx="1" />
                          <rect className="nw" x="200" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="228" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="252" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="276" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="300" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="324" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="348" y="14" width="20" height="32" rx="1" />
                          <rect className="it" x="372" y="14" width="20" height="32" rx="1" />
                        </g>
                        <text x="4" y="8">14 IT racks</text>
                        <text x="164" y="8">2 NW / storage</text>
                        <text x="396" y="58" textAnchor="end">Single row</text>
                      </svg>
                    </div>
                  </div>
                </article>
                <article className="panel env-card reveal" data-delay="1">
                  <div className="env-head">
                    <span className="micro">Pod reference · 02</span>
                    <span className="name">Cerebras CS4</span>
                  </div>
                  <div className="env-body">
                    <p className="micro">IT load</p>
                    <p className="env-load">
                      2.5<small>MW</small>
                    </p>
                    <div className="env-rows">
                      <div className="env-row">
                        <span className="k">Physical unit</span>
                        <span>11 containers, about 3,970 sq ft.</span>
                      </div>
                      <div className="env-row">
                        <span className="k">Source</span>
                        <span>DigiPowerX Cerebras CS4 Business Case</span>
                      </div>
                    </div>
                    <div className="env-viz" aria-hidden="true">
                      <svg viewBox="0 0 400 60">
                        <g>
                          <rect className="it" x="4" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="40" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="76" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="112" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="148" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="184" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="220" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="256" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="292" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="328" y="14" width="30" height="32" rx="1" />
                          <rect className="it" x="364" y="14" width="30" height="32" rx="1" />
                        </g>
                        <text x="4" y="8">11 containers</text>
                        <text x="396" y="58" textAnchor="end">≈ 3,970 sq ft</text>
                      </svg>
                    </div>
                  </div>
                </article>
              </div>
              <div className="note reveal" data-delay="2">
                <span className="micro">Multi-pod layout</span>
                <span>
                  Rows of IT pods placed contiguously across the length, with one network skid per five IT pods. A ten to fifteen megawatt campus is therefore four to six pods and one to two network skids.
                </span>
              </div>
            </div>
          </section>

          {/* 06 Facility */}
          <section className="section" aria-labelledby="ra1-fac">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">06 / 07</p>
                  <p className="eyebrow">What This Means for the Facility</p>
                  <h2 id="ra1-fac" className="h-section">Capital tracks demand instead of leading it.</h2>
                </div>
                <p className="lead">The argument that separates a repeatable pod campus from a hall built once.</p>
              </div>
              <div className="grid-4">
                <article className="panel fac reveal">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="26" width="8" height="10" />
                      <rect x="16" y="18" width="8" height="18" />
                      <rect x="28" y="10" width="8" height="26" strokeDasharray="2 2" />
                      <path d="M4 8 L20 4 L36 8" />
                    </svg>
                  </div>
                  <h3>Capacity tracks demand</h3>
                  <p>Capacity is added in pod increments rather than hall increments, so capital tracks demand instead of leading it.</p>
                  <span className="idx">Pod increments</span>
                </article>
                <article className="panel fac reveal" data-delay="1">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="12" width="14" height="16" rx="1" />
                      <rect x="22" y="12" width="14" height="16" rx="1" />
                      <path d="M11 6 V12 M29 6 V12 M4 6 H36 M11 28 V34 M29 28 V34" />
                    </svg>
                  </div>
                  <h3>Repeatable engineering</h3>
                  <p>The power and cooling design at pod six is the design at pod one. Nothing is re-engineered mid growth.</p>
                  <span className="idx">Pod 06 = Pod 01</span>
                </article>
                <article className="panel fac reveal" data-delay="2">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="8" width="14" height="24" rx="1" />
                      <rect x="22" y="8" width="14" height="24" rx="1" strokeDasharray="3 2" />
                      <circle cx="11" cy="20" r="3" />
                      <path d="M26 16 h6 M26 20 h6 M26 24 h6" />
                    </svg>
                  </div>
                  <h3>Silicon flexibility</h3>
                  <p>Silicon is chosen per pod. A later pod can hold a different accelerator generation, or a different vendor, without disturbing the pods already running.</p>
                  <span className="idx">Chosen per pod</span>
                </article>
                <article className="panel fac reveal" data-delay="3">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="22" width="12" height="12" />
                      <rect x="20" y="22" width="12" height="12" strokeDasharray="2 2" opacity=".5" />
                      <path d="M4 14 C12 14 16 8 22 8 C28 8 30 12 36 12" strokeDasharray="3 3" />
                    </svg>
                  </div>
                  <h3>Less stranded build</h3>
                  <p>If the demand curve flattens, there is no stranded shell. The pods that were never built were never paid for.</p>
                  <span className="idx">No stranded shell</span>
                </article>
              </div>
            </div>
          </section>

          {/* 07 Does not solve */}
          <section className="section limits" aria-labelledby="ra1-lim">
            <div className="container limits-grid">
              <div className="reveal">
                <p className="section-index">07 / 07</p>
                <p className="eyebrow">Engineering constraint</p>
                <h2 id="ra1-lim" className="h-section">What This Does Not Solve</h2>
                <p className="sub">Modular compute does not eliminate site-level constraints.</p>
                <div className="prose">
                  <p>
                    The shared elements have to be sized for the end state on day one. Substation capacity, water, land, and the utility interconnect are not modular, and interconnect queues are measured in quarters or years depending on the ISO. Pod modularity removes the compute commitment risk. It does not remove the interconnect lead time.
                  </p>
                </div>
                <div className="callout">
                  <p className="micro">Where the campus conversation starts</p>
                  <p className="q">Start the campus conversation with the interconnect date, not the pod schedule.</p>
                </div>
              </div>
              <div className="reveal" data-delay="1">
                <p className="micro" style={{ marginBottom: 14 }}>Site-level elements · fixed vs modular</p>
                <ul className="fixed-list">
                  <li><span className="k">Interconnect</span><span>Utility interconnect is not modular. Queue times depend on the ISO.</span><span className="s">Fixed</span></li>
                  <li><span className="k">Land</span><span>Parcel and perimeter are committed once.</span><span className="s">Fixed</span></li>
                  <li><span className="k">Water</span><span>Water is not modular and must be secured for the end state.</span><span className="s">Fixed</span></li>
                  <li><span className="k">Substation</span><span>Capacity must be planned for the full campus on day one.</span><span className="s">Fixed</span></li>
                  <li><span className="k">Shared infra</span><span>Cooling plant, headers and control plane are sized for the end state.</span><span className="s">Sized once</span></li>
                  <li><span className="k">Lead time</span><span>Pod modularity does not remove interconnection lead time.</span><span className="s">Fixed</span></li>
                  <li><span className="k">Compute</span><span>Pods are added in increments. Commitment risk is removed here, and only here.</span><span className="s mod">Modular</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="cta" id="ra1-cta">
            <div className="container">
              <div className="panel cta-box reveal">
                <div>
                  <p className="eyebrow">Discuss your deployment</p>
                  <h2 className="h-section">Start with the workload, then design the infrastructure around it.</h2>
                  <p className="sub">
                    Bring the near-term number you can defend and the interconnect date you are working toward. USDC will plan the campus around both.
                  </p>
                  <p className="source">
                    <b>Sources.</b> Vera Rubin NVL72 Facility Planning Summary (NVIDIA) · DigiPowerX Cerebras CS4 Business Case. Reference IT loads are published planning figures, not USDC measured results. Campus pod counts are illustrative.
                  </p>
                </div>
                <a className="btn btn-primary" href="#top" onClick={handleCta} data-cta>
                  Discuss Your Deployment <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            VIEW: RA-02 — Prefill sidecar and decode floor
            ===================================================================== */}
        <section className={`view ${currentRoute === "/ra-02" ? "is-active" : ""}`} id="view-ra-02" data-route="/ra-02" aria-labelledby="ra2-title">
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="#/" onClick={(e) => { e.preventDefault(); navigateTo("/"); }}>
                Use cases
              </a>
              <i></i>
              <span>Reference Architecture 02</span>
            </nav>
            <nav className="ra-switch" aria-label="Reference architectures">
              <a href="#/ra-01" onClick={(e) => { e.preventDefault(); navigateTo("/ra-01"); }}>
                01 · One pod to cluster
              </a>
              <a href="#/ra-02" aria-current="page" onClick={(e) => { e.preventDefault(); navigateTo("/ra-02"); }}>
                02 · Prefill sidecar
              </a>
              <a href="#/ra-03" onClick={(e) => { e.preventDefault(); navigateTo("/ra-03"); }}>
                03 · KV cache fabric
              </a>
            </nav>
          </div>

          <div className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">Reference Architecture 02</p>
                <h1 id="ra2-title" className="h-display">
                  A pod is two machines, a prefill sidecar and a decode floor.
                </h1>
                <p className="lead">
                  Serving a model has two phases with opposite hardware appetites. Splitting them inside one pod lets each phase run on the silicon it actually needs, and lets power and cooling be provisioned per role.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#cta" onClick={handleCta} data-cta>
                    Discuss a Deployment <span className="arrow" aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn-ghost" href="#ra2-deploys" onClick={(e) => handleJump(e, "ra2-deploys")} data-jump>
                    View the architecture
                  </a>
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

          {/* 01 Situation */}
          <section className="section" aria-labelledby="ra2-sit">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">01 / 07</p>
                  <p className="eyebrow">The Situation</p>
                  <h2 id="ra2-sit" className="h-section">
                    A training pod becomes idle capital the moment the run ends.
                  </h2>
                </div>
                <p className="lead">
                  The obvious answer is to serve inference on it. The less obvious problem is that inference is not one workload, and a pod configured as a uniform block of identical GPUs is the wrong shape for it.
                </p>
              </div>
              <div className="panel limit-viz reveal" data-delay="1" aria-hidden="true">
                <svg className="dg" viewBox="0 0 800 150">
                  <line x1="20" y1="90" x2="780" y2="90" stroke="var(--line-strong)" />
                  <rect x="20" y="40" width="300" height="50" rx="3" className="cold" />
                  <text x="32" y="62" className="t2">Training run</text>
                  <text x="32" y="78" className="sec">Homogeneous GPU block · fully used</text>
                  <rect x="340" y="40" width="200" height="50" rx="3" fill="none" stroke="var(--text-3)" strokeDasharray="3 3" />
                  <text x="352" y="62" className="t2">Run ends</text>
                  <text x="352" y="78" className="sec">Idle capital</text>
                  <rect x="560" y="40" width="220" height="50" rx="3" fill="none" stroke="var(--line-strong)" />
                  <text x="572" y="62" className="t2">Serve inference?</text>
                  <text x="572" y="78" className="sec">Wrong shape for two phases</text>
                  <text x="20" y="120">Time</text>
                  <text x="780" y="120" textAnchor="end" className="sec">Same pod, three states</text>
                </svg>
              </div>
            </div>
          </section>

          {/* 02 Insight */}
          <section className="section" aria-labelledby="ra2-ins">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">02 / 07</p>
                  <p className="eyebrow">The Insight</p>
                  <h2 id="ra2-ins" className="h-section">Two phases that want opposite things from the hardware.</h2>
                </div>
                <p className="lead">
                  A homogeneous fleet sized correctly for one of those phases is sized incorrectly for the other. That is true of the silicon, and it is equally true of the power and cooling design wrapped around it.
                </p>
              </div>
              <div className="two-phase">
                <article className="panel phase-card pf reveal">
                  <p className="micro">
                    <span>Phase · Prefill</span>
                    <span>Compute</span>
                  </p>
                  <h3>Reads the prompt, builds the KV cache</h3>
                  <ul className="spec">
                    <li><span className="k">Bound by</span><span>Compute</span></li>
                    <li><span className="k">Power profile</span><span>Near sustained TDP</span></li>
                    <li><span className="k">Silicon</span><span>High arithmetic density</span></li>
                  </ul>
                  <div className="profile" aria-hidden="true">
                    <svg viewBox="0 0 400 110">
                      <line className="axis" x1="20" y1="90" x2="380" y2="90" />
                      <line className="tdp" x1="20" y1="30" x2="380" y2="30" />
                      <text x="24" y="24">Sustained TDP</text>
                      <path className="line pf" d="M20 88 C40 40 60 34 90 33 L380 32" />
                      <text x="20" y="104">Time →</text>
                    </svg>
                  </div>
                </article>
                <article className="panel phase-card dc reveal" data-delay="1">
                  <p className="micro">
                    <span>Phase · Decode</span>
                    <span>Bandwidth</span>
                  </p>
                  <h3>Emits output tokens one at a time</h3>
                  <ul className="spec">
                    <li><span className="k">Bound by</span><span>Memory bandwidth</span></li>
                    <li><span className="k">Power profile</span><span>Bursty</span></li>
                    <li><span className="k">Silicon</span><span>High bandwidth memory, high concurrency</span></li>
                  </ul>
                  <div className="profile" aria-hidden="true">
                    <svg viewBox="0 0 400 110">
                      <line className="axis" x1="20" y1="90" x2="380" y2="90" />
                      <line className="tdp" x1="20" y1="30" x2="380" y2="30" />
                      <text x="24" y="24">Sustained TDP</text>
                      <path className="line dc" d="M20 82 h18 v-30 h8 v30 h28 v-40 h8 v40 h22 v-26 h8 v26 h34 v-44 h8 v44 h26 v-22 h8 v22 h36 v-36 h8 v36 h30 v-18 h8 v18 h30 v-40 h8 v40 h26" />
                      <text x="20" y="104">Time →</text>
                    </svg>
                  </div>
                </article>
              </div>
            </div>
          </section>

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
                  <rect x="10" y="10" width="620" height="400" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
                  <text x="22" y="30" className="t2">Pod envelope · one unit to the customer</text>
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="48" width="596" height="44" rx="4" />
                    <text x="36" y="68" className="t1">Pod power + cooling feed</text>
                    <text x="36" y="84">Metered and cooled per role, not as one averaged load</text>
                  </g>
                  <line className="tap power" x1="150" y1="92" x2="150" y2="130" style={{ stroke: "var(--warm)" }} />
                  <line className="tap cool" x1="430" y1="92" x2="430" y2="130" />
                  {/* sidecar */}
                  <g className="node podn" data-power data-network>
                    <rect x="22" y="130" width="230" height="200" rx="4" />
                    <line className="lbar" x1="23" y1="134" x2="23" y2="326" style={{ stroke: "var(--warm)" }} />
                    <text x="38" y="154" className="t1">Prefill sidecar</text>
                    <text x="38" y="172">Smaller number of accelerators</text>
                    <text x="38" y="188">Chosen for raw compute</text>
                    <g className="rk">
                      <line x1="38" y1="214" x2="236" y2="214" />
                      <line x1="38" y1="228" x2="236" y2="228" />
                      <line x1="38" y1="242" x2="236" y2="242" />
                    </g>
                    <text x="38" y="278" style={{ fill: "var(--warm)", fontSize: 8.5 }}>Near sustained TDP</text>
                    <text x="38" y="296" className="dim">Own refresh cycle</text>
                    <text x="38" y="312" className="dim">Own vendor</text>
                  </g>
                  {/* floor */}
                  <g className="node podn" data-cooling data-network>
                    <rect x="292" y="130" width="326" height="200" rx="4" />
                    <line className="lbar" x1="293" y1="134" x2="293" y2="326" />
                    <text x="308" y="154" className="t1">Decode floor</text>
                    <text x="308" y="172">Bulk of the pod</text>
                    <text x="308" y="188">Chosen for bandwidth and concurrency</text>
                    <g className="rk">
                      <line x1="308" y1="214" x2="602" y2="214" />
                      <line x1="308" y1="228" x2="602" y2="228" />
                      <line x1="308" y1="242" x2="602" y2="242" />
                      <line x1="308" y1="256" x2="602" y2="256" />
                    </g>
                    <text x="308" y="278" style={{ fill: "var(--accent)", fontSize: 8.5 }}>Bursty</text>
                    <text x="308" y="296" className="dim">Keeps running while the sidecar is opened</text>
                    <text x="308" y="312" className="dim">Own vendor</text>
                  </g>
                  {/* fabric */}
                  <path className="tap net" d="M252 230 H292" />
                  <g className="node" data-network>
                    <rect x="22" y="352" width="596" height="44" rx="4" />
                    <text x="36" y="372" className="t1">Pod fabric</text>
                    <text x="36" y="388">Joins the two roles · KV cache moves sidecar → floor</text>
                  </g>
                  <path className="tap net" d="M137 330 V352" />
                  <path className="tap net" d="M455 330 V352" />
                  <path data-pulse="warm" data-dur="3" data-n="2" d="M150 92 V130" />
                  <path data-pulse="cool" data-dur="3" data-n="2" d="M430 92 V130" />
                  <path data-pulse="net" data-dur="2.2" data-n="2" d="M252 230 H292" />
                  <path data-pulse="net" data-dur="3.2" data-n="2" d="M137 330 V374 H455 V330" />
                </svg>
                <span className="pan-hint" aria-hidden="true">Pan the diagram →</span>
                <div className="campus-foot">
                  <span>Sidecar · compute · sustained</span>
                  <span>Floor · bandwidth · bursty</span>
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
                  The serving stack routes an incoming request to a prefill worker, which computes the KV cache, and then transfers that cache to a decode worker which produces the output tokens.
                </p>
              </div>
              <StepsSwitcher id="ra2" />
            </div>
          </section>

          {/* 05 Reference envelope */}
          <section className="section" aria-labelledby="ra2-env">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">05 / 07</p>
                  <p className="eyebrow">Reference Envelope</p>
                  <h2 id="ra2-env" className="h-section">Two roles, two envelopes.</h2>
                </div>
                <p className="lead">
                  The published characteristics USDC plans each role against. No throughput or latency figures are claimed for this configuration.
                </p>
              </div>
              <div className="grid-2">
                <article className="panel env-card reveal">
                  <div className="env-head">
                    <span className="micro">Role · 01</span>
                    <span className="name">Prefill sidecar</span>
                  </div>
                  <div className="env-body">
                    <p className="micro">What it does</p>
                    <p className="env-load" style={{ fontSize: "clamp(22px,2.2vw,30px)", fontFamily: "var(--font-ui)", letterSpacing: "-.02em" }}>
                      Reads the prompt, computes the KV cache
                    </p>
                    <div className="env-rows">
                      <div className="env-row"><span className="k">Bound by</span><span>Compute</span></div>
                      <div className="env-row"><span className="k">Power profile</span><span>Near sustained TDP</span></div>
                      <div className="env-row"><span className="k">Silicon preference</span><span>High arithmetic density</span></div>
                      <div className="env-row"><span className="k">Envelope</span><span>Smaller number of accelerators inside the same pod</span></div>
                    </div>
                  </div>
                </article>
                <article className="panel env-card reveal" data-delay="1">
                  <div className="env-head">
                    <span className="micro">Role · 02</span>
                    <span className="name">Decode floor</span>
                  </div>
                  <div className="env-body">
                    <p className="micro">What it does</p>
                    <p className="env-load" style={{ fontSize: "clamp(22px,2.2vw,30px)", fontFamily: "var(--font-ui)", letterSpacing: "-.02em" }}>
                      Emits output tokens one at a time
                    </p>
                    <div className="env-rows">
                      <div className="env-row"><span className="k">Bound by</span><span>Memory bandwidth</span></div>
                      <div className="env-row"><span className="k">Power profile</span><span>Bursty</span></div>
                      <div className="env-row"><span className="k">Silicon preference</span><span>High bandwidth memory, high concurrency</span></div>
                      <div className="env-row"><span className="k">Envelope</span><span>The bulk of the pod</span></div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* 06 Facility */}
          <section className="section" aria-labelledby="ra2-fac">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">06 / 07</p>
                  <p className="eyebrow">What This Means for the Facility</p>
                  <h2 id="ra2-fac" className="h-section">Where the argument stops being a software argument.</h2>
                </div>
                <p className="lead">This is where it becomes a USDC argument.</p>
              </div>
              <div className="grid-4">
                <article className="panel fac reveal">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <path d="M4 30 C10 30 12 10 18 10 L36 10" style={{ stroke: "var(--warm)" }} />
                      <path d="M4 34 h4 v-8 h3 v8 h5 v-12 h3 v12 h5 v-6 h3 v6 h9" />
                    </svg>
                  </div>
                  <h3>Power per role</h3>
                  <p>
                    Prefill sits near sustained TDP while decode is bursty. Metering and cooling them as a single averaged load oversizes one and starves the other. A sidecar lets power and cooling be provisioned per role.
                  </p>
                  <span className="idx">Two profiles</span>
                </article>
                <article className="panel fac reveal" data-delay="1">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="8" width="12" height="24" rx="1" strokeDasharray="3 2" />
                      <rect x="22" y="8" width="14" height="24" rx="1" />
                      <path d="M10 4 v4 M10 32 v4" />
                    </svg>
                  </div>
                  <h3>Refresh per role</h3>
                  <p>
                    Prefill silicon can be replaced on a different schedule than decode silicon, and only the sidecar is opened. The decode floor keeps running.
                  </p>
                  <span className="idx">Two cycles</span>
                </article>
                <article className="panel fac reveal" data-delay="2">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="10" width="14" height="20" rx="1" style={{ stroke: "var(--warm)" }} />
                      <rect x="22" y="10" width="14" height="20" rx="1" />
                      <path d="M18 20 h4" />
                    </svg>
                  </div>
                  <h3>Vendor per role</h3>
                  <p>
                    The two roles do not have to come from the same vendor. A high arithmetic density accelerator can serve prefill while current generation GPUs serve decode. This is where GPU agnostic stops being a slogan.
                  </p>
                  <span className="idx">Two logos</span>
                </article>
                <article className="panel fac reveal" data-delay="3">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <path d="M6 14 h28 M6 26 h28" />
                      <path d="M30 10 l4 4 -4 4 M10 22 l-4 4 4 4" />
                    </svg>
                  </div>
                  <h3>Train, then serve</h3>
                  <p>
                    The same pod serves training between contracts and disaggregated inference under them. The reconfiguration is a software and sidecar change, not a rebuild.
                  </p>
                  <span className="idx">No rebuild</span>
                </article>
              </div>
            </div>
          </section>

          {/* 07 Does not solve */}
          <section className="section limits" aria-labelledby="ra2-lim">
            <div className="container limits-grid">
              <div className="reveal">
                <p className="section-index">07 / 07</p>
                <p className="eyebrow">Engineering constraint</p>
                <h2 id="ra2-lim" className="h-section">What This Does Not Solve</h2>
                <p className="sub">Disaggregation is not always faster.</p>
                <div className="prose">
                  <p>
                    Disaggregation pays off when prompts are long enough that the cache transfer costs less than recomputing prefill. For short prompts it can cost more than it saves. Production stacks handle this by deciding per request whether to disaggregate, and the pod supports both modes.
                  </p>
                </div>
                <div className="callout">
                  <p className="micro">The honest version</p>
                  <p className="q">The workload decides, not the building. Anyone who says disaggregation is always faster is selling rather than engineering.</p>
                </div>
              </div>
              <div className="panel limit-viz reveal" data-delay="1" aria-hidden="true">
                <p className="micro" style={{ marginBottom: 14 }}>Break-even · transfer cost vs recompute cost</p>
                <svg className="dg" viewBox="0 0 520 260">
                  <line x1="40" y1="220" x2="500" y2="220" stroke="var(--line-strong)" />
                  <line x1="40" y1="20" x2="40" y2="220" stroke="var(--line-strong)" />
                  <text x="500" y="240" textAnchor="end">Prompt length →</text>
                  <text x="14" y="16">Cost</text>
                  <path className="wire warm" d="M40 200 L500 60" />
                  <text x="380" y="80" style={{ fill: "var(--warm)" }}>Recompute prefill</text>
                  <path className="wire net" d="M40 120 L500 140" />
                  <text x="380" y="160" style={{ fill: "var(--net)" }}>Transfer KV cache</text>
                  <line x1="222" y1="20" x2="222" y2="220" stroke="var(--text-3)" strokeDasharray="2 4" />
                  <text x="228" y="34" className="t2">Break-even</text>
                  <rect x="40" y="20" width="182" height="200" fill="rgba(255,255,255,.02)" />
                  <text x="48" y="212" className="sec">Short prompts · disaggregation can cost more</text>
                  <text x="228" y="212" className="sec">Long prompts · disaggregation pays</text>
                  <text x="40" y="250" className="sec">Decided per request · pod supports both modes</text>
                </svg>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="cta">
            <div className="container">
              <div className="panel cta-box reveal">
                <div>
                  <p className="eyebrow">Discuss your deployment</p>
                  <h2 className="h-section">Start with the workload, then design the infrastructure around it.</h2>
                  <p className="sub">
                    Bring the model, the prompt profile and the concurrency you expect. USDC will size the sidecar and the floor around them.
                  </p>
                  <p className="source">
                    <b>Source.</b> NVIDIA Dynamo documentation, disaggregated serving design notes (NIXL, SGLang backend). No throughput, latency or power figures are claimed for this configuration.
                  </p>
                </div>
                <a className="btn btn-primary" href="#top" onClick={handleCta} data-cta>
                  Discuss Your Deployment <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            VIEW: RA-03 — KV cache as a network service
            ===================================================================== */}
        <section className={`view ${currentRoute === "/ra-03" ? "is-active" : ""}`} id="view-ra-03" data-route="/ra-03" aria-labelledby="ra3-title">
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="#/" onClick={(e) => { e.preventDefault(); navigateTo("/"); }}>
                Use cases
              </a>
              <i></i>
              <span>Reference Architecture 03</span>
            </nav>
            <nav className="ra-switch" aria-label="Reference architectures">
              <a href="#/ra-01" onClick={(e) => { e.preventDefault(); navigateTo("/ra-01"); }}>
                01 · One pod to cluster
              </a>
              <a href="#/ra-02" onClick={(e) => { e.preventDefault(); navigateTo("/ra-02"); }}>
                02 · Prefill sidecar
              </a>
              <a href="#/ra-03" aria-current="page" onClick={(e) => { e.preventDefault(); navigateTo("/ra-03"); }}>
                03 · KV cache fabric
              </a>
            </nav>
          </div>

          <div className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">Reference Architecture 03</p>
                <h1 id="ra3-title" className="h-display">
                  KV cache becomes a network service across the USDC footprint.
                </h1>
                <p className="lead">
                  Agentic workloads send the same long context back to the model over and over. A shared cache tier turns that repetition from a cost into an advantage, and it only works if the sites sit on good fiber.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#cta" onClick={handleCta} data-cta>
                    Discuss a Deployment <span className="arrow" aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn-ghost" href="#ra3-deploys" onClick={(e) => handleJump(e, "ra3-deploys")} data-jump>
                    View the architecture
                  </a>
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
          <section className="section" aria-labelledby="ra3-sit">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">01 / 07</p>
                  <p className="eyebrow">The Situation</p>
                  <h2 id="ra3-sit" className="h-section">
                    The same prefix, resent on every turn.
                  </h2>
                </div>
                <p className="lead">
                  Agentic and long context workloads resend the same prompt prefix on every turn. Each repeat that lands on a node without the cache pays the full prefill cost again. The user sees it as time to first token, and the operator sees it as GPU hours spent recomputing something that was already computed an hour ago.
                </p>
              </div>
              <div className="panel limit-viz reveal" data-delay="1" aria-hidden="true">
                <svg className="dg" viewBox="0 0 800 170">
                  <text x="20" y="24">Agent turns →</text>
                  <g>
                    <rect x="20" y="40" width="130" height="44" rx="3" className="cold" />
                    <text x="30" y="58" className="t2">Turn 1</text>
                    <text x="30" y="74" className="sec">Prefix · full prefill</text>
                    <rect x="170" y="40" width="130" height="44" rx="3" className="hot" />
                    <text x="180" y="58" className="t2">Turn 2</text>
                    <text x="180" y="74" className="sec">Same prefix · recomputed</text>
                    <rect x="320" y="40" width="130" height="44" rx="3" className="hot" />
                    <text x="330" y="58" className="t2">Turn 3</text>
                    <text x="330" y="74" className="sec">Same prefix · recomputed</text>
                    <rect x="470" y="40" width="130" height="44" rx="3" className="hot" />
                    <text x="480" y="58" className="t2">Turn 4</text>
                    <text x="480" y="74" className="sec">Same prefix · recomputed</text>
                    <text x="620" y="66" className="sec">… every turn</text>
                  </g>
                  <path className="wire warm" d="M20 120 H780" />
                  <text x="20" y="145" style={{ fill: "var(--warm)" }}>Cost the user sees · time to first token</text>
                  <text x="780" y="145" textAnchor="end" style={{ fill: "var(--warm)" }}>Cost the operator sees · GPU hours</text>
                </svg>
              </div>
            </div>
          </section>

          {/* 02 Constraint */}
          <section className="section" aria-labelledby="ra3-con">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">02 / 07</p>
                  <p className="eyebrow">The Constraint</p>
                  <h2 id="ra3-con" className="h-section">
                    Scaling out makes the problem worse, not better.
                  </h2>
                </div>
                <p className="lead">
                  Cache held in GPU memory is local, small, and lost when the instance moves. Once a deployment grows past a single node the hit rate falls, because the router cannot reliably send a request back to the machine that happens to hold its prefix.
                </p>
              </div>
              <div className="grid-2">
                <div className="panel compare-col traditional reveal">
                  <p className="micro">
                    <span>Cache in GPU memory</span>
                    <span>Per node</span>
                  </p>
                  <ul className="compare-list">
                    <li><span className="g" aria-hidden="true"></span>Local to one node</li>
                    <li><span className="g" aria-hidden="true"></span>Small</li>
                    <li><span className="g" aria-hidden="true"></span>Lost when the instance moves</li>
                    <li><span className="g" aria-hidden="true"></span>Hit rate falls as nodes are added</li>
                  </ul>
                  <div className="compare-viz" aria-hidden="true">
                    <svg viewBox="0 0 400 90">
                      <rect x="4" y="10" width="392" height="70" rx="3" className="hall" />
                      <text x="14" y="28">Router cannot find the node holding the prefix</text>
                      <rect x="14" y="40" width="70" height="30" rx="2" style={{ stroke: "var(--accent)" }} />
                      <text x="22" y="59">Node · hit</text>
                      <rect x="94" y="40" width="70" height="30" rx="2" style={{ stroke: "var(--text-3)" }} />
                      <text x="102" y="59">Miss</text>
                      <rect x="174" y="40" width="70" height="30" rx="2" style={{ stroke: "var(--text-3)" }} />
                      <text x="182" y="59">Miss</text>
                      <rect x="254" y="40" width="70" height="30" rx="2" style={{ stroke: "var(--text-3)" }} />
                      <text x="262" y="59">Miss</text>
                      <text x="334" y="59">…</text>
                    </svg>
                  </div>
                </div>
                <div className="panel compare-col modular reveal" data-delay="1">
                  <p className="micro">
                    <span>Cache as a shared tier</span>
                    <span>Per site · per footprint</span>
                  </p>
                  <ul className="compare-list">
                    <li><span className="g" aria-hidden="true"></span>Lives in a sidecar, not the GPU</li>
                    <li><span className="g" aria-hidden="true"></span>Layered: GPU → CPU → NVMe → pool</li>
                    <li><span className="g" aria-hidden="true"></span>Any pod on the site can read</li>
                    <li><span className="g" aria-hidden="true"></span>Extends to other sites over the backbone</li>
                  </ul>
                  <div className="compare-viz" aria-hidden="true">
                    <svg viewBox="0 0 400 90">
                      <rect x="4" y="10" width="392" height="70" rx="3" className="hall" style={{ stroke: "var(--line-strong)" }} />
                      <text x="14" y="28">Any node reads the shared pool</text>
                      <rect className="podbox" x="14" y="40" width="70" height="30" rx="2" /><text x="22" y="59">Node · hit</text>
                      <rect className="podbox" x="94" y="40" width="70" height="30" rx="2" /><text x="102" y="59">Hit</text>
                      <rect className="podbox" x="174" y="40" width="70" height="30" rx="2" /><text x="182" y="59">Hit</text>
                      <rect className="podbox" x="254" y="40" width="70" height="30" rx="2" /><text x="262" y="59">Hit</text>
                      <text x="334" y="59">…</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                <svg className="dg" viewBox="0 0 640 460" role="img" aria-label="Two sites cache tiers">
                  {/* site A */}
                  <rect x="10" y="10" width="300" height="440" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
                  <text x="22" y="30" className="t2">Site A</text>
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="48" width="130" height="34" rx="3" />
                    <text x="32" y="69" className="t1">Pod 01 · GPU</text>
                  </g>
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="94" width="130" height="34" rx="3" />
                    <text x="32" y="115" className="t1">CPU memory</text>
                  </g>
                  <g className="node" data-power data-cooling>
                    <rect x="22" y="140" width="130" height="34" rx="3" />
                    <text x="32" y="161" className="t1">Local NVMe</text>
                  </g>
                  <g className="node" data-cooling>
                    <rect x="168" y="48" width="130" height="34" rx="3" />
                    <text x="178" y="69" className="t1">Pod 02 · GPU</text>
                  </g>
                  <g className="node" data-cooling>
                    <rect x="168" y="94" width="130" height="34" rx="3" />
                    <text x="178" y="115" className="t1">CPU memory</text>
                  </g>
                  <g className="node" data-cooling>
                    <rect x="168" y="140" width="130" height="34" rx="3" />
                    <text x="178" y="161" className="t1">Local NVMe</text>
                  </g>
                  <path className="tap net" d="M87 174 V230" />
                  <path className="tap net" d="M233 174 V230" />
                  <g className="node" data-cooling data-network>
                    <rect x="22" y="230" width="276" height="54" rx="4" style={{ stroke: "var(--accent)" }} />
                    <text x="32" y="252" className="t1">Site pool</text>
                    <text x="32" y="270">Any pod on the site reads · fabric speed</text>
                  </g>
                  <text x="22" y="320" className="sec">East–west traffic between pods</text>
                  {/* site B */}
                  <rect x="330" y="10" width="300" height="440" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
                  <text x="342" y="30" className="t2">Site B</text>
                  <g className="node" data-network>
                    <rect x="342" y="48" width="130" height="34" rx="3" />
                    <text x="352" y="69" className="t1">Pod 01 · GPU</text>
                  </g>
                  <g className="node" data-network>
                    <rect x="342" y="94" width="130" height="34" rx="3" />
                    <text x="352" y="115" className="t1">CPU memory</text>
                  </g>
                  <g className="node" data-network>
                    <rect x="342" y="140" width="130" height="34" rx="3" />
                    <text x="352" y="161" className="t1">Local NVMe</text>
                  </g>
                  <g className="node ghostn">
                    <rect x="488" y="48" width="130" height="34" rx="3" />
                    <text x="498" y="69">Pod 02 · planned</text>
                  </g>
                  <path className="tap net" d="M407 174 V230" />
                  <g className="node" data-network>
                    <rect x="342" y="230" width="276" height="54" rx="4" style={{ stroke: "var(--accent)" }} />
                    <text x="352" y="252" className="t1">Site pool</text>
                    <text x="352" y="270">Extended over the backbone · backbone speed</text>
                  </g>
                  {/* backbone */}
                  <g className="node" data-network>
                    <rect x="22" y="360" width="596" height="70" rx="4" />
                    <text x="32" y="382" className="t1">USDC backbone</text>
                    <text x="32" y="400">Three diverse paths · round-trip target under ten milliseconds</text>
                    <text x="32" y="418" className="dim">Session context follows the customer to whichever site has capacity</text>
                  </g>
                  <path className="tap net" d="M160 284 V360" />
                  <path className="tap net" d="M480 284 V360" />
                  <path data-pulse="power" data-dur="2.4" data-n="2" d="M87 82 V94 M87 128 V140" />
                  <path data-pulse="cool" data-dur="3" data-n="2" d="M87 174 V257 H233 V174" />
                  <path data-pulse="net" data-dur="4" data-n="3" d="M160 284 V395 H480 V284" />
                </svg>
                <span className="pan-hint" aria-hidden="true">Pan the diagram →</span>
                <div className="campus-foot">
                  <span>Node · Site · Footprint</span>
                  <span>Fiber adjacency is a siting requirement</span>
                </div>
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
          <section className="section" aria-labelledby="ra3-res">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">05 / 07</p>
                  <p className="eyebrow">Published results</p>
                  <h2 id="ra3-res" className="h-section">Why the facility design matters.</h2>
                </div>
                <p className="lead">
                  The published results on agentic traces are the reason this matters. They describe what the software layer achieves.
                </p>
              </div>
              <div className="results reveal">
                <div className="panel res">
                  <div>
                    <p className="v">1.7→92.2<small>%</small></p>
                    <p className="l">Cache hit rate</p>
                  </div>
                  <p className="from"><b>Codex traces</b> · vLLM + Mooncake</p>
                </div>
                <div className="panel res">
                  <div>
                    <p className="v">3.8<small>×</small></p>
                    <p className="l">Throughput improvement</p>
                  </div>
                  <p className="from"><b>Codex traces</b> · vLLM + Mooncake</p>
                </div>
                <div className="panel res">
                  <div>
                    <p className="v">46<small>×</small></p>
                    <p className="l">Median time to first token, lower</p>
                  </div>
                  <p className="from"><b>Codex traces</b> · vLLM + Mooncake</p>
                </div>
                <div className="panel res">
                  <div>
                    <p className="v">8.6<small>×</small></p>
                    <p className="l">End-to-end latency, lower</p>
                  </div>
                  <p className="from"><b>Codex traces</b> · vLLM + Mooncake</p>
                </div>
                <div className="panel res">
                  <div>
                    <p className="v">60<small>GPUs</small></p>
                    <p className="l">Near-linear throughput scaling to 60 GB200 GPUs, hit rate held above 95%</p>
                  </div>
                  <p className="from"><b>Codex traces</b> · vLLM + Mooncake</p>
                </div>
              </div>
              <div className="note attrib reveal" data-delay="1">
                <span className="micro">Attribution</span>
                <span>
                  These are published benchmark figures from the vLLM and Mooncake teams, measured on their traces and their hardware. They describe what the software layer achieves. USDC cites them to explain why the facility design matters. They are not a USDC measured result.
                </span>
              </div>
            </div>
          </section>

          {/* 06 Facility */}
          <section className="section" aria-labelledby="ra3-fac">
            <div className="container">
              <div className="section-head reveal">
                <div>
                  <p className="section-index">06 / 07</p>
                  <p className="eyebrow">What This Means for the Facility</p>
                  <h2 id="ra3-fac" className="h-section">Fiber adjacency becomes a siting requirement.</h2>
                </div>
                <p className="lead">
                  A shared cache tier is only useful if the sites holding it are close in network terms. That turns fiber adjacency into a siting requirement rather than a convenience, and it is the strongest available argument for how USDC selects land.
                </p>
              </div>
              <div className="grid-4">
                <article className="panel fac reveal">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="14" width="10" height="12" rx="1" />
                      <rect x="26" y="14" width="10" height="12" rx="1" />
                      <path d="M14 17 H26 M14 20 C18 24 22 24 26 20 M14 23 C18 28 22 28 26 23" />
                    </svg>
                  </div>
                  <h3>Inter-site fabric</h3>
                  <p>
                    Three diverse paths with a round trip target under ten milliseconds, as described on the Global Network page, make cross-site cache reuse and session migration practical.
                  </p>
                  <span className="idx">&lt;10 ms · 3 paths</span>
                </article>
                <article className="panel fac reveal" data-delay="1">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="6" y="10" width="10" height="20" rx="1" />
                      <rect x="24" y="10" width="10" height="20" rx="1" />
                      <path d="M16 16 h8 M16 24 h8 M20 4 v6 M20 30 v6" />
                    </svg>
                  </div>
                  <h3>East–west provisioning</h3>
                  <p>
                    Cache movement is a bandwidth consumer, not a rounding error. Sites have to be provisioned for east to west traffic between pods, not only for north to south traffic to the internet.
                  </p>
                  <span className="idx">Pod ↔ pod</span>
                </article>
                <article className="panel fac reveal" data-delay="2">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <path d="M4 32 L36 8" strokeDasharray="3 3" />
                      <rect x="6" y="20" width="12" height="12" rx="1" />
                      <rect x="22" y="6" width="12" height="12" rx="1" strokeDasharray="2 2" />
                    </svg>
                  </div>
                  <h3>Land on fiber routes</h3>
                  <p>
                    Land selection favours parcels on dense fiber routes over the lowest cost acreage. A cheaper parcel that adds latency between sites removes the reason the footprint exists.
                  </p>
                  <span className="idx">Fiber over acreage</span>
                </article>
                <article className="panel fac reveal" data-delay="3">
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 40 40">
                      <rect x="4" y="14" width="12" height="12" rx="1" />
                      <rect x="24" y="14" width="12" height="12" rx="1" />
                      <path d="M16 20 H24 M21 17 l3 3 -3 3" />
                      <circle cx="10" cy="8" r="2" />
                    </svg>
                  </div>
                  <h3>Capacity as scheduling</h3>
                  <p>
                    A customer can be routed to whichever site has capacity while the session context follows them, which converts a multi site footprint from an operational burden into a scheduling advantage.
                  </p>
                  <span className="idx">Context follows</span>
                </article>
              </div>
            </div>
          </section>

          {/* 07 Does not solve */}
          <section className="section limits" aria-labelledby="ra3-lim">
            <div className="container limits-grid">
              <div className="reveal">
                <p className="section-index">07 / 07</p>
                <p className="eyebrow">Engineering constraint</p>
                <h2 id="ra3-lim" className="h-section">What This Does Not Solve</h2>
                <p className="sub">
                  The site boundary is where the cache tier changes from a performance feature to a capacity feature.
                </p>
                <div className="prose">
                  <p>
                    Cross site reuse works for prefix reuse and for moving a session to where capacity exists. It does not work for a tight prefill and decode loop split across two cities. Within a site, cache moves at fabric speed. Between sites it moves at backbone speed, and the workload has to tolerate that difference.
                  </p>
                </div>
                <div className="callout">
                  <p className="micro">The honest version</p>
                  <p className="q">Within a site: performance. Between sites: capacity. Do not split a prefill–decode loop across two cities.</p>
                </div>
              </div>
              <div className="panel limit-viz reveal" data-delay="1" aria-hidden="true">
                <p className="micro" style={{ marginBottom: 14 }}>What crosses the site boundary</p>
                <svg className="dg" viewBox="0 0 520 260">
                  <rect x="10" y="20" width="230" height="220" rx="5" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
                  <text x="22" y="40" className="t2">Within a site</text>
                  <text x="22" y="56" className="sec">Fabric speed</text>
                  <rect x="280" y="20" width="230" height="220" rx="5" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
                  <text x="292" y="40" className="t2">Between sites</text>
                  <text x="292" y="56" className="sec">Backbone speed</text>
                  <g>
                    <rect x="22" y="76" width="206" height="34" rx="3" className="cold" />
                    <text x="32" y="97" className="t1">Prefix reuse</text>
                  </g>
                  <g>
                    <rect x="22" y="120" width="206" height="34" rx="3" className="cold" />
                    <text x="32" y="141" className="t1">Session migration</text>
                  </g>
                  <g>
                    <rect x="22" y="164" width="206" height="34" rx="3" className="cold" />
                    <text x="32" y="185" className="t1">Prefill ↔ decode loop</text>
                  </g>
                  <g>
                    <rect x="292" y="76" width="206" height="34" rx="3" className="cold" />
                    <text x="302" y="97" className="t1">Prefix reuse</text>
                  </g>
                  <g>
                    <rect x="292" y="120" width="206" height="34" rx="3" className="cold" />
                    <text x="302" y="141" className="t1">Session migration</text>
                  </g>
                  <g>
                    <rect x="292" y="164" width="206" height="34" rx="3" fill="none" stroke="var(--text-3)" strokeDasharray="3 3" />
                    <text x="302" y="185" className="dim">Prefill ↔ decode loop</text>
                    <text x="302" y="212" className="sec">Not across two cities</text>
                  </g>
                  <text x="22" y="226" className="sec">Performance feature</text>
                  <text x="292" y="234" className="sec">Capacity feature</text>
                </svg>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="cta">
            <div className="container">
              <div className="panel cta-box reveal">
                <div>
                  <p className="eyebrow">Discuss your deployment</p>
                  <h2 className="h-section">Start with the workload, then design the infrastructure around it.</h2>
                  <p className="sub">
                    Bring the prompt reuse profile and the sites you need to reach. USDC will plan the cache tier and the fiber around both.
                  </p>
                  <p className="source">
                    <b>Sources.</b> vLLM and Mooncake published benchmark results on Codex traces · Mooncake Store and LMCache documentation. Benchmark figures are measured by their authors on their hardware and are not USDC results. Inter-site targets are from the USDC Global Network page.
                  </p>
                </div>
                <a className="btn btn-primary" href="#top" onClick={handleCta} data-cta>
                  Discuss Your Deployment <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Embedded CSS styling for the Reference Architecture views */}
      <style jsx global>{`
        .ra-page-root {
          --bg: #070a10;
          --bg-2: #0b1019;
          --bg-3: #0f1622;
          --line: rgba(148, 172, 204, 0.14);
          --line-strong: rgba(148, 172, 204, 0.28);
          --grid: rgba(148, 172, 204, 0.05);
          --text: #e7edf5;
          --text-2: #a9b6c8;
          --text-3: #6e7d94;
          --accent: #4c8dff;
          --accent-soft: rgba(76, 141, 255, 0.14);
          --cool: #5fc3d2;
          --cool-soft: rgba(95, 195, 210, 0.12);
          --net: #c9d3e2;
          --net-soft: rgba(201, 211, 226, 0.1);
          --warm: #e0b36a;
          --warm-soft: rgba(224, 179, 106, 0.12);
          --radius: 6px;
          --radius-lg: 10px;
          --max: 1240px;
          --gutter: clamp(20px, 4vw, 48px);
          --font-ui: var(--font-geist-sans), var(--font-sans), system-ui, -apple-system, "SF Pro Text", "Segoe UI", Inter, Roboto, sans-serif;
          --font-mono: var(--font-geist-mono), var(--font-mono), ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          --ease: cubic-bezier(0.22, 0.61, 0.36, 1);

          background: var(--bg);
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
          background-size: 64px 64px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.6));
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
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .ra-page-root .eyebrow::before {
          content: "";
          width: 18px;
          height: 1px;
          background: var(--accent);
          opacity: 0.8;
        }

        .ra-page-root .micro {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
        }

        .ra-page-root .h-display {
          font-size: clamp(34px, 4.4vw, 56px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          font-weight: 500;
        }
        .ra-page-root .h-section {
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 500;
        }
        .ra-page-root .lead {
          font-size: clamp(16px, 1.2vw, 18px);
          color: var(--text-2);
          max-width: 60ch;
          line-height: 1.6;
        }
        .ra-page-root .prose {
          color: var(--text-2);
          font-size: 15.5px;
          max-width: 62ch;
          line-height: 1.6;
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
          padding: clamp(72px, 8.5vw, 120px) 0;
          position: relative;
        }
        .ra-page-root .section + .section {
          border-top: 1px solid var(--line);
        }
        .ra-page-root .section-head {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 40px;
          align-items: end;
          margin-bottom: clamp(36px, 5vw, 60px);
        }
        .ra-page-root .section-head .eyebrow {
          margin-bottom: 16px;
        }
        .ra-page-root .section-index {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-3);
          letter-spacing: 0.14em;
          margin-bottom: 12px;
        }
        .ra-page-root .panel {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0)), var(--bg-2);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          position: relative;
        }
        .ra-page-root .panel::before {
          content: "";
          position: absolute;
          inset: 8px;
          pointer-events: none;
          border-radius: 4px;
          background: linear-gradient(var(--line-strong), var(--line-strong)) top left / 8px 1px no-repeat,
            linear-gradient(var(--line-strong), var(--line-strong)) top left / 1px 8px no-repeat,
            linear-gradient(var(--line-strong), var(--line-strong)) bottom right / 8px 1px no-repeat,
            linear-gradient(var(--line-strong), var(--line-strong)) bottom right / 1px 8px no-repeat;
        }
        .ra-page-root .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 44px;
          padding: 0 20px;
          border-radius: var(--radius);
          font-size: 14px;
          font-weight: 500;
          border: 1px solid var(--line-strong);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .ra-page-root .btn:hover {
          border-color: rgba(148, 172, 204, 0.5);
        }
        .ra-page-root .btn-primary {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .ra-page-root .btn-primary:hover {
          background: #3d7cf0;
          border-color: #3d7cf0;
        }
        .ra-page-root .btn-ghost {
          color: var(--text-2);
        }
        .ra-page-root .btn .arrow {
          transition: transform 0.25s var(--ease);
        }
        .ra-page-root .btn:hover .arrow {
          transform: translateX(3px);
        }
        .ra-page-root .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .ra-page-root .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* Header */
        .ra-page-root .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(7, 10, 16, 0.72);
          backdrop-filter: saturate(140%) blur(14px);
          -webkit-backdrop-filter: saturate(140%) blur(14px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
        }
        .ra-page-root .site-header.is-scrolled {
          border-bottom-color: var(--line);
        }
        .ra-page-root .nav {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .ra-page-root .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          font-size: 14px;
        }
        .ra-page-root .brand-mark {
          width: 26px;
          height: 26px;
          border: 1px solid var(--line-strong);
          border-radius: 5px;
          display: grid;
          place-items: center;
        }
        .ra-page-root .brand-mark span {
          width: 10px;
          height: 10px;
          background: var(--accent);
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(76, 141, 255, 0.55);
        }
        .ra-page-root .nav-links {
          display: flex;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ra-page-root .nav-links a {
          display: block;
          padding: 8px 14px;
          border-radius: var(--radius);
          font-size: 14px;
          color: var(--text-2);
          position: relative;
          transition: color 0.2s;
        }
        .ra-page-root .nav-links a:hover,
        .ra-page-root .nav-links a[aria-current="page"] {
          color: var(--text);
        }
        .ra-page-root .nav-links a[aria-current="page"]::after {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 2px;
          height: 1px;
          background: var(--accent);
        }
        .ra-page-root .nav-cta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ra-page-root .nav-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          place-items: center;
        }
        .ra-page-root .nav-toggle span {
          display: block;
          width: 16px;
          height: 1px;
          background: var(--text);
          position: relative;
        }
        .ra-page-root .nav-toggle span::before,
        .ra-page-root .nav-toggle span::after {
          content: "";
          position: absolute;
          left: 0;
          width: 16px;
          height: 1px;
          background: var(--text);
        }
        .ra-page-root .nav-toggle span::before {
          top: -5px;
        }
        .ra-page-root .nav-toggle span::after {
          top: 5px;
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
          padding: 22px 0 0;
          display: flex;
          gap: 10px;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
        }
        .ra-page-root .crumbs a:hover {
          color: var(--text);
        }
        .ra-page-root .crumbs i {
          width: 14px;
          height: 1px;
          background: var(--line-strong);
        }
        .ra-page-root .ra-switch {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 22px;
        }
        .ra-page-root .ra-switch a {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 8px 12px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          color: var(--text-3);
          transition: border-color 0.2s, color 0.2s;
        }
        .ra-page-root .ra-switch a:hover {
          color: var(--text);
        }
        .ra-page-root .ra-switch a[aria-current="page"] {
          color: var(--accent);
          border-color: rgba(76, 141, 255, 0.4);
        }

        /* Hero */
        .ra-page-root .hero {
          padding: clamp(40px, 6vw, 88px) 0 clamp(56px, 6vw, 88px);
          position: relative;
          overflow: hidden;
        }
        .ra-page-root .hero::after {
          content: "";
          position: absolute;
          right: -10%;
          top: 0;
          width: 60%;
          height: 100%;
          pointer-events: none;
          background: radial-gradient(ellipse at 60% 40%, rgba(76, 141, 255, 0.1), transparent 60%);
        }
        .ra-page-root .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .ra-page-root .hero-copy .eyebrow {
          margin-bottom: 24px;
        }
        .ra-page-root .hero-copy h1 {
          margin-bottom: 22px;
          max-width: 16ch;
        }
        .ra-page-root .hero-copy .lead {
          margin-bottom: 32px;
        }
        .ra-page-root .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .ra-page-root .metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin: 0;
        }
        .ra-page-root .metric {
          padding: 18px 18px 18px 0;
          border-left: 1px solid var(--line);
          padding-left: 18px;
        }
        .ra-page-root .metric:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .ra-page-root .metric .val {
          font-family: var(--font-mono);
          font-size: clamp(22px, 2vw, 28px);
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0 0 6px;
          font-variant-numeric: tabular-nums;
        }
        .ra-page-root .metric .val small {
          font-size: 0.58em;
          color: var(--text-3);
          margin-left: 4px;
          letter-spacing: 0.04em;
        }
        .ra-page-root .metric .lbl {
          font-size: 12px;
          color: var(--text-3);
          line-height: 1.45;
          margin: 0;
        }
        .ra-page-root .metric.qual .val {
          font-family: var(--font-ui);
          font-size: 15px;
          letter-spacing: -0.01em;
          padding-top: 6px;
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
        }
        .ra-page-root .sit-panel {
          padding: clamp(24px, 3vw, 40px);
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .ra-page-root .sit-panel .big {
          font-family: var(--font-mono);
          font-size: clamp(44px, 6vw, 80px);
          line-height: 1;
          letter-spacing: -0.04em;
          margin: 28px 0 12px;
        }
        .ra-page-root .sit-panel .big small {
          font-size: 0.4em;
          color: var(--text-3);
          letter-spacing: 0.04em;
          margin-left: 8px;
        }
        .ra-page-root .sit-panel .sub {
          color: var(--text-2);
          font-size: 15px;
        }
        .ra-page-root .sit-panel.future .big {
          color: var(--text-3);
        }
        .ra-page-root .sit-panel .meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
        }
        .ra-page-root .sit-panel .meta .tag {
          color: var(--accent);
        }
        .ra-page-root .sit-panel.future .meta .tag {
          color: var(--text-3);
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
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          transition: stroke-dashoffset 1.2s var(--ease);
        }
        .ra-page-root .sit-link .dotted {
          stroke: var(--text-3);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 3 5;
          opacity: 0;
          transition: opacity 0.8s 0.9s;
        }
        .ra-page-root .in-view .sit-link .solid {
          stroke-dashoffset: 0;
        }
        .ra-page-root .in-view .sit-link .dotted {
          opacity: 1;
        }
        .ra-page-root .situation-copy {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-top: 40px;
        }
        .ra-page-root .demand {
          margin-top: 48px;
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: 20px 24px 12px;
          background: var(--bg-2);
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
          fill: var(--accent-soft);
        }
        .ra-page-root .demand .known {
          stroke: var(--accent);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 1.4s var(--ease);
        }
        .ra-page-root .demand .unknown {
          stroke: var(--text-3);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 4 6;
          opacity: 0;
          transition: opacity 0.8s 1s;
        }
        .ra-page-root .demand .ceiling {
          stroke: var(--text-3);
          stroke-dasharray: 2 4;
        }
        .ra-page-root .demand text {
          font-family: var(--font-mono);
          font-size: 10px;
          fill: var(--text-3);
          letter-spacing: 0.12em;
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
          padding: clamp(24px, 3vw, 36px);
        }
        .ra-page-root .compare-col > .micro {
          margin-bottom: 22px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .ra-page-root .compare-col.modular {
          border-color: rgba(76, 141, 255, 0.35);
        }
        .ra-page-root .compare-col.modular > .micro {
          color: var(--accent);
        }
        .ra-page-root .compare-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ra-page-root .compare-list li {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: 14px;
          padding: 14px 0;
          border-top: 1px solid var(--line);
          font-size: 15px;
          color: var(--text-2);
        }
        .ra-page-root .compare-list li:last-child {
          border-bottom: 1px solid var(--line);
        }
        .ra-page-root .compare-list .g {
          width: 20px;
          height: 20px;
          position: relative;
        }
        .ra-page-root .compare-list .g::before {
          content: "";
          position: absolute;
          inset: 5px;
          border: 1px solid var(--text-3);
          border-radius: 2px;
        }
        .ra-page-root .modular .compare-list .g::before {
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .ra-page-root .traditional .compare-list .g::after {
          content: "";
          position: absolute;
          left: 4px;
          right: 4px;
          top: 9.5px;
          height: 1px;
          background: var(--text-3);
        }
        .ra-page-root .compare-viz {
          margin-top: 18px;
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
          fill: var(--accent-soft);
        }
        .ra-page-root .compare-viz .podbox.future {
          fill: none;
          stroke-dasharray: 3 3;
          stroke: rgba(76, 141, 255, 0.5);
        }
        .ra-page-root .compare-viz text {
          font-family: var(--font-mono);
          font-size: 8.5px;
          fill: var(--text-3);
          letter-spacing: 0.12em;
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
          color: var(--text-3);
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
          padding: 24px;
          min-height: 230px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .ra-page-root .fac .ico {
          width: 40px;
          height: 40px;
        }
        .ra-page-root .fac .ico svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .ra-page-root .fac .ico * {
          stroke: var(--accent);
          fill: none;
          stroke-width: 1.2;
          stroke-linecap: round;
        }
        .ra-page-root .fac h3 {
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--text);
        }
        .ra-page-root .fac p {
          font-size: 14.5px;
          color: var(--text-2);
          flex: 1;
        }
        .ra-page-root .fac .idx {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.14em;
        }

        .ra-page-root .limits {
          background: linear-gradient(180deg, var(--bg-2), var(--bg));
        }
        .ra-page-root .limits-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .ra-page-root .limits h2 {
          margin: 16px 0 14px;
        }
        .ra-page-root .limits .sub {
          font-size: clamp(18px, 1.6vw, 21px);
          color: var(--text-2);
          letter-spacing: -0.01em;
          margin-bottom: 28px;
          max-width: 32ch;
        }
        .ra-page-root .fixed-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid var(--line);
        }
        .ra-page-root .fixed-list li {
          display: grid;
          grid-template-columns: 110px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          font-size: 15px;
        }
        .ra-page-root .fixed-list .k {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-3);
        }
        .ra-page-root .fixed-list .s {
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
        .ra-page-root .fixed-list .s.mod {
          color: var(--accent);
          border-color: rgba(76, 141, 255, 0.4);
        }
        .ra-page-root .callout {
          margin-top: 36px;
          padding: 26px 28px;
          border: 1px solid rgba(76, 141, 255, 0.35);
          border-left: 2px solid var(--accent);
          border-radius: var(--radius);
          background: linear-gradient(90deg, rgba(76, 141, 255, 0.08), transparent 70%);
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
          padding: clamp(18px, 2.4vw, 28px);
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
        }
        .ra-page-root .cta-box .eyebrow {
          margin-bottom: 18px;
        }
        .ra-page-root .cta-box h2 {
          max-width: 20ch;
        }
        .ra-page-root .cta-box p.sub {
          margin-top: 14px;
          color: var(--text-2);
          max-width: 48ch;
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

        /* Index */
        .ra-page-root .index-hero {
          padding: clamp(56px, 7vw, 96px) 0 clamp(40px, 4vw, 56px);
        }
        .ra-page-root .index-hero h1 {
          max-width: 18ch;
          margin: 20px 0 20px;
        }
        .ra-page-root .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding-bottom: clamp(72px, 8vw, 120px);
        }
        .ra-page-root .card {
          display: flex;
          flex-direction: column;
          padding: 24px;
          min-height: 520px;
          opacity: 1 !important;
          visibility: visible !important;
          transition: border-color 0.3s, transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
          cursor: pointer;
        }
        .ra-page-root .card:hover {
          border-color: rgba(76, 141, 255, 0.45);
          transform: translateY(-2px);
        }
        .ra-page-root .card .eyebrow {
          margin-bottom: 16px;
        }
        .ra-page-root .card h2 {
          font-size: clamp(20px, 1.6vw, 23px);
          line-height: 1.25;
          margin-bottom: 12px;
        }
        .ra-page-root .card .sum {
          font-size: 14px;
          color: var(--text-2);
          flex: 0;
        }
        .ra-page-root .card .viz {
          margin: 22px 0;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: var(--bg-3);
          padding: 14px;
          flex: 1;
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
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
          letter-spacing: -0.02em;
        }
        .ra-page-root .card .mstrip .v.q {
          font-family: var(--font-ui);
          font-size: 13.5px;
          line-height: 1.35;
          padding-top: 4px;
        }
        .ra-page-root .card .mstrip .l {
          font-size: 11px;
          color: var(--text-3);
          line-height: 1.4;
          margin-top: 4px;
        }
        .ra-page-root .card .link {
          font-size: 14px;
          color: var(--accent);
          display: inline-flex;
          gap: 8px;
          align-items: center;
        }
        .ra-page-root .card .link .arrow {
          transition: transform 0.25s var(--ease);
        }
        .ra-page-root .card:hover .link .arrow {
          transform: translateX(3px);
        }
        .ra-page-root .template-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-top: 28px;
        }
        .ra-page-root .template-row div {
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 10px 10px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-3);
          line-height: 1.5;
        }
        .ra-page-root .template-row div b {
          display: block;
          color: var(--text-2);
          font-weight: 500;
          margin-bottom: 4px;
        }
        .ra-page-root .template-row div.last {
          border-color: rgba(76, 141, 255, 0.4);
        }
        .ra-page-root .template-row div.last b {
          color: var(--accent);
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
