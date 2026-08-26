"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

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
  const stageList = STAGES[id] || STAGES.ra1;
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
        <span className="micro">{title || (id === "ra1" ? "Campus schematic · not to scale" : id === "ra2" ? "Request path · one pod, two roles" : "Cache tier · pod → site → footprint")}</span>
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

      {id === "ra1" && (
        <svg
          className={`dg hs s${stageIndex}`}
          data-stage-svg
          viewBox="0 0 720 520"
          role="img"
          aria-labelledby="ra1-hs-t ra1-hs-d"
        >
          <title id="ra1-hs-t">Animated campus schematic</title>
          <desc id="ra1-hs-d">
            One pod appears; utility, cooling and control plane energize; pods two and three are added; a network skid joins the pods into one fabric; the view resolves into a modular campus with space for further pods.
          </desc>
          <g className="scene">
            <g className={`fade ${stageIndex >= 7 ? "on" : ""}`} data-on="7">
              <rect x="22" y="22" width="676" height="476" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
              <text x="34" y="44">Campus perimeter · shared site</text>
              <text x="574" y="490" className="sec">Sized for end state</text>
            </g>

            {/* shared infrastructure (stage 2) */}
            <g className={`fade ${stageIndex >= 2 ? "on" : ""}`} data-on="2">
              <g transform="translate(60,70)">
                <rect className="box" width="130" height="58" rx="4" />
                <text x="12" y="24" className="t2">Utility</text>
                <text x="12" y="42" className="sec">Interconnect</text>
                <g stroke="var(--accent)" strokeWidth="1.5">
                  <line x1="105" y1="14" x2="118" y2="14" />
                  <line x1="105" y1="22" x2="118" y2="22" opacity=".5" />
                  <line x1="105" y1="30" x2="118" y2="30" opacity=".25" />
                </g>
              </g>
              <g transform="translate(60,160)">
                <rect className="box" width="130" height="50" rx="4" />
                <text x="12" y="22" className="t2">Substation</text>
                <text x="12" y="38" className="sec">Sized for campus</text>
              </g>
              <g transform="translate(240,70)">
                <rect className="box" width="240" height="58" rx="4" />
                <text x="12" y="24" className="t2">Control plane</text>
                <text x="12" y="42" className="sec">One per campus</text>
                <g stroke="var(--line-strong)">
                  <line x1="160" y1="16" x2="228" y2="16" />
                  <line x1="160" y1="28" x2="212" y2="28" />
                  <line x1="160" y1="40" x2="220" y2="40" />
                </g>
              </g>
              <g transform="translate(530,70)">
                <rect className="box" width="130" height="58" rx="4" />
                <text x="12" y="24" className="t2">Cooling</text>
                <text x="12" y="42" className="sec">Plant + headers</text>
                <circle cx="108" cy="24" r="9" fill="none" stroke="var(--cool)" strokeWidth="1.2" />
                <path d="M108 15 v9 l6 4" fill="none" stroke="var(--cool)" strokeWidth="1.2" />
              </g>
              <g transform="translate(530,160)">
                <rect className="box" width="130" height="50" rx="4" />
                <text x="12" y="22" className="t2">Headers</text>
                <text x="12" y="38" className="sec">Supply / return</text>
              </g>
              <path className="wire power" d="M125 128 V160" />
              <path className="wire cool" d="M595 128 V160" />
              <path className="wire power" d="M125 210 V252 H595" />
              <text x="132" y="247" className="sec">Power bus</text>
              <path className="wire cool circ" d="M595 210 V268 H125" />
              <text x="470" y="283" className="sec">Cooling header</text>
            </g>

            {/* pod drops */}
            <path className={`wire power draw ${stageIndex >= 2 ? "on" : ""}`} data-on="2" d="M180 252 V300" />
            <path className={`wire cool draw ${stageIndex >= 2 ? "on" : ""}`} data-on="2" d="M200 268 V300" />
            <path className={`wire power draw ${stageIndex >= 3 ? "on" : ""}`} data-on="3" d="M360 252 V300" />
            <path className={`wire cool draw ${stageIndex >= 3 ? "on" : ""}`} data-on="3" d="M380 268 V300" />
            <path className={`wire power draw ${stageIndex >= 4 ? "on" : ""}`} data-on="4" d="M540 252 V300" />
            <path className={`wire cool draw ${stageIndex >= 4 ? "on" : ""}`} data-on="4" d="M560 268 V300" />

            {/* pods */}
            <g transform="translate(120,300)">
              <g className={`rise ${stageIndex >= 1 ? "on" : ""}`} data-on="1">
                <rect className="pod-frame box" width="160" height="90" rx="4" />
                <g className="rk">
                  <line className="rk-row" x1="18" y1="42" x2="142" y2="42" />
                  <line className="rk-row" x1="18" y1="52" x2="142" y2="52" />
                  <line className="rk-row" x1="18" y1="62" x2="142" y2="62" />
                  <line className="rk-row" x1="18" y1="72" x2="142" y2="72" />
                </g>
                <text x="12" y="24" className="t2">Pod 01</text>
                <text x="110" y="24" className="sec">IT row</text>
              </g>
            </g>

            <g transform="translate(300,300)">
              <g className={`rise ${stageIndex >= 3 ? "on" : ""}`} data-on="3">
                <rect className="pod-frame box" width="160" height="90" rx="4" />
                <g className="rk">
                  <line className="rk-row" x1="18" y1="42" x2="142" y2="42" />
                  <line className="rk-row" x1="18" y1="52" x2="142" y2="52" />
                  <line className="rk-row" x1="18" y1="62" x2="142" y2="62" />
                  <line className="rk-row" x1="18" y1="72" x2="142" y2="72" />
                </g>
                <text x="12" y="24" className="t2">Pod 02</text>
                <text x="110" y="24" className="sec">IT row</text>
              </g>
            </g>

            <g transform="translate(480,300)">
              <g className={`rise ${stageIndex >= 4 ? "on" : ""}`} data-on="4">
                <rect className="pod-frame box" width="160" height="90" rx="4" />
                <g className="rk">
                  <line className="rk-row" x1="18" y1="42" x2="142" y2="42" />
                  <line className="rk-row" x1="18" y1="52" x2="142" y2="52" />
                  <line className="rk-row" x1="18" y1="62" x2="142" y2="62" />
                  <line className="rk-row" x1="18" y1="72" x2="142" y2="72" />
                </g>
                <text x="12" y="24" className="t2">Pod 03</text>
                <text x="110" y="24" className="sec">IT row</text>
              </g>
            </g>

            {/* fabric (stage 6) + skid (stage 5) */}
            <path className={`wire net draw ${stageIndex >= 6 ? "on" : ""}`} data-on="6" d="M200 390 V420 H560 V390" />
            <path className={`wire net draw ${stageIndex >= 6 ? "on" : ""}`} data-on="6" d="M380 390 V440" />
            <g transform="translate(300,440)">
              <g className={`rise ${stageIndex >= 5 ? "on" : ""}`} data-on="5">
                <rect className="box" width="160" height="48" rx="4" style={{ stroke: "var(--net)" }} />
                <text x="12" y="20" className="t2">Network skid</text>
                <text x="12" y="36" className="sec">1 per 5 IT pods</text>
                <g stroke="var(--net)" opacity=".6">
                  <line x1="118" y1="14" x2="148" y2="14" />
                  <line x1="118" y1="24" x2="140" y2="24" />
                  <line x1="118" y1="34" x2="146" y2="34" />
                </g>
              </g>
            </g>

            {/* planned pods (stage 7) */}
            <g className={`ghost fade ${stageIndex >= 7 ? "on" : ""}`} data-on="7">
              <g transform="translate(120,404)">
                <rect width="160" height="24" rx="3" />
                <text x="10" y="16" className="sec">Pod 04 · planned</text>
              </g>
              <g transform="translate(480,404)">
                <rect width="160" height="24" rx="3" />
                <text x="10" y="16" className="sec">Pod 05 · planned</text>
              </g>
            </g>

            {/* flow pulses */}
            <path data-pulse="power" data-on="2" data-dur="4.5" data-n="2" d="M125 128 V252 H180 V300" className={stageIndex >= 2 ? "on" : ""} />
            <path data-pulse="power" data-on="3" data-dur="5" data-n="2" d="M125 128 V252 H360 V300" className={stageIndex >= 3 ? "on" : ""} />
            <path data-pulse="power" data-on="4" data-dur="5.5" data-n="2" d="M125 128 V252 H540 V300" className={stageIndex >= 4 ? "on" : ""} />
            <path data-pulse="cool" data-on="2" data-dur="6" data-n="2" d="M595 128 V268 H200 V300" className={stageIndex >= 2 ? "on" : ""} />
            <path data-pulse="cool" data-on="3" data-dur="5.2" data-n="1" d="M595 128 V268 H380 V300" className={stageIndex >= 3 ? "on" : ""} />
            <path data-pulse="cool" data-on="4" data-dur="4.4" data-n="1" d="M595 128 V268 H560 V300" className={stageIndex >= 4 ? "on" : ""} />
            <path data-pulse="net" data-on="6" data-dur="3.6" data-n="2" d="M380 440 V420 H200 V390" className={stageIndex >= 6 ? "on" : ""} />
            <path data-pulse="net" data-on="6" data-dur="3.6" data-n="2" d="M380 440 V420 H560 V390" className={stageIndex >= 6 ? "on" : ""} />
            <path data-pulse="net" data-on="6" data-dur="2.6" data-n="1" d="M200 390 V420 H560 V390" className={stageIndex >= 6 ? "on" : ""} />
          </g>
        </svg>
      )}

      {id === "ra2" && (
        <svg
          className={`dg s${stageIndex}`}
          data-stage-svg
          viewBox="0 0 720 520"
          role="img"
          aria-labelledby="ra2-hs-t ra2-hs-d"
        >
          <title id="ra2-hs-t">Animated request path through a disaggregated pod</title>
          <desc id="ra2-hs-d">
            A request enters the pod, the prefill sidecar computes the KV cache under sustained load, the cache transfers across the pod fabric, and the decode floor emits tokens in bursts.
          </desc>
          {/* pod envelope */}
          <rect x="22" y="80" width="676" height="400" rx="6" fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
          <text x="34" y="102" className="t2">Pod envelope</text>
          <text x="34" y="118" className="sec">Presented to the customer as one pod</text>

          {/* request in */}
          <g className={`rise ${stageIndex >= 1 ? "on" : ""}`} data-on="1">
            <rect className="box" x="40" y="24" width="150" height="36" rx="4" />
            <text x="52" y="46" className="t2">Request in</text>
            <text x="132" y="46" className="sec">Prompt</text>
          </g>
          <path className={`wire net draw ${stageIndex >= 1 ? "on" : ""}`} data-on="1" d="M115 60 V150" />

          {/* prefill sidecar */}
          <g className={`rise ${stageIndex >= 1 ? "on" : ""}`} data-on="1">
            <rect className="box" x="40" y="150" width="200" height="200" rx="4" />
            <text x="54" y="174" className="t2">Prefill sidecar</text>
            <text x="54" y="190" className="sec">High arithmetic density</text>
            <g className="rk">
              <line className="rk-row" x1="54" y1="222" x2="226" y2="222" />
              <line className="rk-row" x1="54" y1="236" x2="226" y2="236" />
              <line className="rk-row" x1="54" y1="250" x2="226" y2="250" />
            </g>
            <rect x="54" y="272" width="172" height="60" rx="3" fill="none" stroke="var(--line)" />
            <text x="62" y="288" className="sec">Load</text>
            <path className={`wire warm draw ${stageIndex >= 2 ? "on" : ""}`} data-on="2" d="M62 320 H218" />
            <text x="62" y="310" className={`sec fade ${stageIndex >= 2 ? "on" : ""}`} data-on="2">Near sustained TDP</text>
          </g>

          {/* hot fill on stage 2 */}
          <rect
            className={`fade ${stageIndex >= 2 ? "on" : ""}`}
            data-on="2"
            x="41"
            y="151"
            width="198"
            height="198"
            rx="4"
            fill="var(--warm-soft)"
            style={{ pointerEvents: "none" }}
          />

          {/* decode floor */}
          <g className={`rise ${stageIndex >= 1 ? "on" : ""}`} data-on="1">
            <rect className="box" x="300" y="150" width="380" height="200" rx="4" />
            <text x="314" y="174" className="t2">Decode floor</text>
            <text x="314" y="190" className="sec">High bandwidth memory · high concurrency</text>
            <g className="rk">
              <line className="rk-row" x1="314" y1="222" x2="666" y2="222" />
              <line className="rk-row" x1="314" y1="236" x2="666" y2="236" />
              <line className="rk-row" x1="314" y1="250" x2="666" y2="250" />
              <line className="rk-row" x1="314" y1="264" x2="666" y2="264" />
            </g>
            <rect x="314" y="272" width="352" height="60" rx="3" fill="none" stroke="var(--line)" />
            <text x="322" y="288" className="sec">Load</text>
            <path
              className={`wire power draw ${stageIndex >= 4 ? "on" : ""}`}
              data-on="4"
              d="M322 322 h20 v-16 h6 v16 h30 v-20 h6 v20 h28 v-14 h6 v14 h34 v-22 h6 v22 h26 v-12 h6 v12 h36 v-18 h6 v18 h30 v-10 h6 v10 h30 v-20 h6 v20 h26"
            />
            <text x="322" y="310" className={`sec fade ${stageIndex >= 4 ? "on" : ""}`} data-on="4">Bursty</text>
          </g>
          <rect
            className={`fade ${stageIndex >= 4 ? "on" : ""}`}
            data-on="4"
            x="301"
            y="151"
            width="378"
            height="198"
            rx="4"
            fill="var(--accent-soft)"
            style={{ pointerEvents: "none" }}
          />

          {/* fabric */}
          <path className={`wire net draw ${stageIndex >= 3 ? "on" : ""}`} data-on="3" d="M240 205 H300" />
          <text x="248" y="198" className={`sec fade ${stageIndex >= 3 ? "on" : ""}`} data-on="3">KV cache</text>
          <text x="244" y="222" className={`sec fade ${stageIndex >= 3 ? "on" : ""}`} data-on="3">Pod fabric</text>

          {/* tokens out */}
          <path className={`wire net draw ${stageIndex >= 4 ? "on" : ""}`} data-on="4" d="M490 350 V440" />
          <g className={`rise ${stageIndex >= 4 ? "on" : ""}`} data-on="4">
            <rect className="box" x="400" y="440" width="180" height="36" rx="4" />
            <text x="412" y="462" className="t2">Tokens out</text>
            <text x="506" y="462" className="sec">One at a time</text>
          </g>

          {/* roles resolve */}
          <g className={`fade ${stageIndex >= 5 ? "on" : ""}`} data-on="5">
            <text x="34" y="500" className="sec">Two power profiles · two refresh cycles · one pod</text>
            <text x="686" y="500" textAnchor="end" className="sec">Vendor chosen per role</text>
          </g>

          {/* pulses */}
          <path data-pulse="net" data-on="1" data-dur="2.4" data-n="1" d="M115 60 V150" className={stageIndex >= 1 ? "on" : ""} />
          <path data-pulse="warm" data-on="3" data-dur="1.8" data-n="2" d="M240 205 H300" className={stageIndex >= 3 ? "on" : ""} />
          <path data-pulse="power" data-on="4" data-dur="2" data-n="3" d="M490 350 V440" className={stageIndex >= 4 ? "on" : ""} />
        </svg>
      )}

      {id === "ra3" && (
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
      )}

      <span className="pan-hint" aria-hidden="true">Pan the schematic →</span>
      <p className="frame-caption" data-stage-caption aria-live="polite">
        {stageList[currentStage]?.caption}
      </p>
    </div>
  );
}

export default CampusSchematicModel;
