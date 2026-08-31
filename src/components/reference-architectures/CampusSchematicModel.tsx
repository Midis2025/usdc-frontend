"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import CampusSchematicDetailed from "./CampusSchematicDetailed";
import RequestPathPodModel from "./RequestPathPodModel";

export interface StageDefinition {
  duration: number;
  caption: string;
}

const STAGES: Record<string, StageDefinition[]> = {
  ra1: [
    { duration: 1600, caption: "Pod 01 is built and energized." },
    { duration: 2000, caption: "Utility, substation, cooling plant and control plane are sized for the full campus." },
    { duration: 1600, caption: "Pod 02 lands on the same pad, sharing the substation and cooling plant." },
    { duration: 1600, caption: "Pod 03 follows the same design. No redesign, no second permitting cycle." },
    { duration: 1500, caption: "A network skid is added: one per five IT pods." },
    { duration: 2000, caption: "The pods become one fabric rather than three islands." },
    { duration: 3400, caption: "A modular campus. Pods 04–06 are planned, not built, not paid for." },
  ],
  ra2: [
    { duration: 1500, caption: "A request arrives at the pod." },
    { duration: 2000, caption: "The prefill sidecar reads the prompt and builds the KV cache, near sustained TDP." },
    { duration: 1800, caption: "The cache transfers across the pod fabric, GPU memory to GPU memory, non-blocking." },
    { duration: 2400, caption: "The decode floor emits tokens one at a time. Load is bursty." },
    { duration: 3000, caption: "One pod, two roles. Two power profiles, two refresh cycles, vendor chosen per role." },
  ],
  ra3: [
    { duration: 1600, caption: "A long prompt prefix is cached in GPU memory on Pod 01." },
    { duration: 1800, caption: "The cache tiers down: GPU → CPU → local NVMe → site pool." },
    { duration: 1800, caption: "Any pod on the site reads the same pool. Hit rate no longer depends on which node answers." },
    { duration: 2200, caption: "Over the USDC backbone, three diverse paths under ten milliseconds, the pool extends to Site B." },
    { duration: 3200, caption: "A session follows the customer to whichever site has capacity." },
  ],
};

interface CampusSchematicModelProps {
  id: "ra1" | "ra2" | "ra3";
  title?: string;
  isActive?: boolean;
}

export function CampusSchematicModel({ id, title, isActive = true }: CampusSchematicModelProps) {
  if (id === "ra1") {
    return <CampusSchematicDetailed isActive={isActive} />;
  }
  if (id === "ra2") {
    return <RequestPathPodModel isActive={isActive} />;
  }

  const stageList = STAGES[id] || STAGES.ra2;
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalStages = stageList.length;

  const advanceStage = useCallback(() => {
    setCurrentStage((prev) => (prev + 1) % totalStages);
  }, [totalStages]);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCurrentStage(totalStages - 1);
      return;
    }

    if (!isActive || !isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const holdTime = stageList[currentStage].duration;
    timerRef.current = setTimeout(() => {
      advanceStage();
    }, holdTime);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStage, isActive, isPlaying, stageList, advanceStage, totalStages]);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setIsPlaying(e.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  const stageIndex = currentStage + 1;

  return (
    <div className="frame" data-stage-frame={id} ref={containerRef}>
      <div className="frame-bar">
        <span className="micro">{title || "Cache tier · pod → site → footprint"}</span>
        <span className="micro" data-stage-label>
          Stage {stageIndex} / {totalStages}
        </span>
        <div className="stage-dots" data-stage-dots aria-hidden="true">
          {stageList.map((_, idx) => (
            <i
              key={idx}
              className={idx <= currentStage ? "on" : ""}
              onClick={() => setCurrentStage(idx)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>



      <svg
        className={`dg s${stageIndex}`}
        data-stage-svg
        viewBox="0 0 720 520"
          role="img"
          aria-labelledby="ra3-hs-t ra3-hs-d"
        >
          <title id="ra3-hs-t">Animated layered KV cache tier across pods and sites</title>
          <desc id="ra3-hs-d">
            A prompt prefix is cached in GPU memory, then spills to CPU memory, local NVMe and a site-wide pool any pod can read; across the USDC backbone the pool extends to other sites so a session can follow the customer.
          </desc>

          {/* Site A */}
          <g className={`rise ${stageIndex >= 1 ? "on" : ""}`} data-on="1">
            <rect x="22" y="40" width="400" height="440" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
            <text x="34" y="62" className="t2">Site A</text>
            <text x="34" y="78" className="sec">Cache moves at fabric speed</text>
          </g>

          {/* pod 1 tiers */}
          <g className={`rise ${stageIndex >= 1 ? "on" : ""}`} data-on="1">
            <rect className="box" x="40" y="100" width="170" height="220" rx="4" />
            <text x="52" y="122" className="t2">Pod 01</text>
            <rect className="cold" x="52" y="136" width="146" height="34" rx="3" />
            <text x="60" y="157" className="t1">GPU memory</text>
            <rect x="52" y="180" width="146" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="60" y="201">CPU memory</text>
            <rect x="52" y="224" width="146" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="60" y="245">Local NVMe</text>
            <text x="52" y="300" className="sec">Prefix reused</text>
          </g>

          <g className={`rise ${stageIndex >= 3 ? "on" : ""}`} data-on="3">
            <rect className="box" x="232" y="100" width="170" height="220" rx="4" />
            <text x="244" y="122" className="t2">Pod 02</text>
            <rect x="244" y="136" width="146" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="252" y="157">GPU memory</text>
            <rect x="244" y="180" width="146" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="252" y="201">CPU memory</text>
            <rect x="244" y="224" width="146" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="252" y="245">Local NVMe</text>
            <text x="244" y="300" className="sec">Reads the same pool</text>
          </g>

          {/* tier arrows within pod (stage 2) */}
          <path className={`wire net draw ${stageIndex >= 2 ? "on" : ""}`} data-on="2" d="M125 170 V180 M125 214 V224" />

          {/* site pool (stage 2/3) */}
          <g className={`rise ${stageIndex >= 2 ? "on" : ""}`} data-on="2">
            <rect className="box" x="40" y="360" width="362" height="60" rx="4" style={{ stroke: "var(--accent)" }} />
            <text x="52" y="384" className="t1">Site pool</text>
            <text x="52" y="402" className="sec">Any pod on the site can read</text>
            <text x="392" y="384" textAnchor="end" className={`sec fade ${stageIndex >= 3 ? "on" : ""}`} data-on="3">Shared tier</text>
          </g>
          <path className={`wire net draw ${stageIndex >= 2 ? "on" : ""}`} data-on="2" d="M125 258 V360" />
          <path className={`wire net draw ${stageIndex >= 3 ? "on" : ""}`} data-on="3" d="M317 258 V360" />

          {/* Site B (stage 4) */}
          <g className={`rise ${stageIndex >= 4 ? "on" : ""}`} data-on="4">
            <rect x="470" y="40" width="228" height="440" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
            <text x="482" y="62" className="t2">Site B</text>
            <text x="482" y="78" className="sec">Same footprint</text>
            <rect className="box" x="488" y="100" width="192" height="220" rx="4" />
            <text x="500" y="122" className="t2">Pod 01</text>
            <rect x="500" y="136" width="168" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="508" y="157">GPU memory</text>
            <rect x="500" y="180" width="168" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="508" y="201">CPU memory</text>
            <rect x="500" y="224" width="168" height="34" rx="3" fill="none" stroke="var(--line-strong)" />
            <text x="508" y="245">Local NVMe</text>
            <rect className="box" x="488" y="360" width="192" height="60" rx="4" style={{ stroke: "var(--accent)" }} />
            <text x="500" y="384" className="t1">Site pool</text>
            <text x="500" y="402" className="sec">Extends over the backbone</text>
            <path className="wire net" d="M584 258 V360" />
          </g>

          {/* backbone (stage 4) */}
          <path className={`wire net draw ${stageIndex >= 4 ? "on" : ""}`} data-on="4" d="M402 380 H488" />
          <path className={`wire net draw ${stageIndex >= 4 ? "on" : ""}`} data-on="4" d="M402 392 C430 404 460 404 488 392" />
          <path className={`wire net draw ${stageIndex >= 4 ? "on" : ""}`} data-on="4" d="M402 404 C430 424 460 424 488 404" />
          <text x="445" y="452" textAnchor="middle" className={`sec fade ${stageIndex >= 4 ? "on" : ""}`} data-on="4">Backbone · 3 diverse paths</text>
          <text x="445" y="468" textAnchor="middle" className={`sec fade ${stageIndex >= 4 ? "on" : ""}`} data-on="4">Round trip target &lt;10 ms</text>

          {/* session follows (stage 5) */}
          <g className={`fade ${stageIndex >= 5 ? "on" : ""}`} data-on="5">
            <text x="34" y="500" className="sec">Session context follows the customer to the site with capacity</text>
          </g>

          {/* pulses */}
          <path data-pulse="net" data-on="2" data-dur="3" data-n="2" d="M125 170 V360" className={stageIndex >= 2 ? "on" : ""} />
          <path data-pulse="net" data-on="3" data-dur="3" data-n="2" d="M125 360 H317 V258" className={stageIndex >= 3 ? "on" : ""} />
          <path data-pulse="net" data-on="4" data-dur="2.4" data-n="1" d="M402 380 H488" className={stageIndex >= 4 ? "on" : ""} />
          <path data-pulse="net" data-on="4" data-dur="2.8" data-n="1" d="M402 392 C430 404 460 404 488 392" className={stageIndex >= 4 ? "on" : ""} />
          <path data-pulse="net" data-on="4" data-dur="3.2" data-n="1" d="M402 404 C430 424 460 424 488 404" className={stageIndex >= 4 ? "on" : ""} />
          <path data-pulse="power" data-on="5" data-dur="3.6" data-n="1" d="M125 258 V360 H402 M402 380 H488 M584 360 V258" className={stageIndex >= 5 ? "on" : ""} />
        </svg>

      <span className="pan-hint" aria-hidden="true">Pan the schematic →</span>
      <p className="frame-caption" data-stage-caption aria-live="polite">
        {stageList[currentStage]?.caption}
      </p>
    </div>
  );
}

export default CampusSchematicModel;
