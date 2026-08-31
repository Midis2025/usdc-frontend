"use client";

import React, { useState, useEffect, useRef } from "react";

interface WhatUsdcDeploysModelProps {
  activeFlow?: string | null;
}

export default function WhatUsdcDeploysModel({ activeFlow }: WhatUsdcDeploysModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [hoveredPod, setHoveredPod] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Staged build-down timeline sequence
  const TOTAL_STEPS = 14;
  const STEP_MS = 620;
  const HOLD_MS = 3200;

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStepIndex(TOTAL_STEPS);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // When no flow filter is selected, auto-animate through steps
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStepIndex(TOTAL_STEPS);
      return;
    }

    if (activeFlow) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (!inView) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (stepIndex < TOTAL_STEPS) {
      timerRef.current = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, STEP_MS);
    } else {
      timerRef.current = setTimeout(() => {
        setStepIndex(0);
      }, HOLD_MS);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inView, stepIndex, activeFlow]);

  // When activeFlow filter is chosen (power/cooling/network), highlight corresponding elements
  const isPwrFiltered = activeFlow === "power";
  const isCoolFiltered = activeFlow === "cooling";
  const isNetFiltered = activeFlow === "network";
  const hasFilter = Boolean(activeFlow);

  // Active status for cards & paths
  const isUtilityActive = hasFilter ? isPwrFiltered : stepIndex >= 1;
  const isSeg1On = hasFilter ? isPwrFiltered : stepIndex >= 2;
  const isSubstationActive = hasFilter ? isPwrFiltered : stepIndex >= 3;
  const isSeg2On = hasFilter ? isPwrFiltered : stepIndex >= 4;
  const isCoolingActive = hasFilter ? isCoolFiltered : stepIndex >= 5;
  const isSeg3On = hasFilter ? isPwrFiltered : stepIndex >= 6;
  const isControlActive = hasFilter ? (isPwrFiltered || isCoolFiltered || isNetFiltered) : stepIndex >= 7;
  const isBranchOn = hasFilter ? isPwrFiltered : stepIndex >= 8;
  const isBusOn = hasFilter ? isPwrFiltered : stepIndex >= 9;
  const isPod1Active = hasFilter ? (isPwrFiltered || isCoolFiltered || isNetFiltered) : stepIndex >= 10;
  const isPod2Active = hasFilter ? (isPwrFiltered || isCoolFiltered || isNetFiltered) : stepIndex >= 11;
  const isPod3Active = hasFilter ? (isPwrFiltered || isCoolFiltered || isNetFiltered) : stepIndex >= 12;
  const isLatticeOn = hasFilter ? isNetFiltered : stepIndex >= 13;
  const isSkidActive = hasFilter ? isNetFiltered : stepIndex >= 14;

  return (
    <div className="what-usdc-deploys-root" ref={containerRef}>
      <style jsx>{`
        .what-usdc-deploys-root {
          --bg: #05070f;
          --ink: #e6eefc;
          --dim: #8194bd;
          --dimmer: #5b6d95;
          --pwr: #4f8bff;
          --pwr-soft: #3a6fe6;
          --cool: #2fdbe6;
          --net: #a48bff;
          --line: #274680;
          --line-soft: #1c3a6e;

          width: 100%;
          position: relative;
          background: radial-gradient(1200px 800px at 50% -8%, #0a1428 0%, #05070f 60%, #03040a 100%);
          border: 1px solid rgba(93, 140, 230, 0.34);
          border-radius: 20px;
          padding: 20px 16px 24px;
          box-shadow: 0 16px 48px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          font-family: var(--font-mono), ui-monospace, monospace;
        }

        .svg-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        svg.schematic {
          width: 100%;
          height: auto;
          display: block;
          max-width: 100%;
          min-width: 0;
        }

        /* ---------- frame ---------- */
        :global(.what-usdc-deploys-root .frame) {
          fill: none;
          stroke: rgba(93, 140, 230, 0.34);
          stroke-width: 1.4;
          filter: drop-shadow(0 0 22px rgba(40, 90, 200, 0.14));
        }
        :global(.what-usdc-deploys-root .tick) {
          fill: none;
          stroke: rgba(120, 165, 255, 0.55);
          stroke-width: 1.6;
          stroke-linecap: round;
        }

        /* ---------- rails ---------- */
        :global(.what-usdc-deploys-root .rail-label) {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          font-family: inherit;
          transition: opacity 0.4s ease, filter 0.4s ease;
        }
        :global(.what-usdc-deploys-root .rail-label.pwr) {
          fill: #7ea8ff;
        }
        :global(.what-usdc-deploys-root .rail-label.cool) {
          fill: #5fe6ec;
        }
        :global(.what-usdc-deploys-root .rail-label.net) {
          fill: #b7a6ff;
        }
        :global(.what-usdc-deploys-root .rail-label.pwr.on) {
          filter: drop-shadow(0 0 8px rgba(79, 139, 255, 0.95));
        }
        :global(.what-usdc-deploys-root .rail-label.cool.on) {
          filter: drop-shadow(0 0 8px rgba(47, 219, 230, 0.95));
        }
        :global(.what-usdc-deploys-root .rail-label.net.on) {
          filter: drop-shadow(0 0 8px rgba(164, 139, 255, 0.95));
        }
        :global(.what-usdc-deploys-root .rail-label.dim) {
          opacity: 0.25;
        }

        :global(.what-usdc-deploys-root .rail) {
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          transition: stroke 0.4s ease, stroke-width 0.4s ease, opacity 0.4s ease, filter 0.4s ease;
        }
        :global(.what-usdc-deploys-root .rail-pwr) {
          stroke: rgba(79, 139, 255, 0.5);
        }
        :global(.what-usdc-deploys-root .rail-cool) {
          stroke: rgba(47, 219, 230, 0.42);
        }
        :global(.what-usdc-deploys-root .rail-net) {
          stroke: rgba(164, 139, 255, 0.5);
          stroke-dasharray: 2 7;
        }

        :global(.what-usdc-deploys-root .rail-pwr.on) {
          stroke: #4f8bff;
          stroke-width: 2.8;
          filter: drop-shadow(0 0 8px rgba(79, 139, 255, 0.9));
          opacity: 1;
        }
        :global(.what-usdc-deploys-root .rail-cool.on) {
          stroke: #2fdbe6;
          stroke-width: 2.8;
          filter: drop-shadow(0 0 8px rgba(47, 219, 230, 0.9));
          opacity: 1;
        }
        :global(.what-usdc-deploys-root .rail-net.on) {
          stroke: #a48bff;
          stroke-width: 2.8;
          filter: drop-shadow(0 0 8px rgba(164, 139, 255, 0.9));
          opacity: 1;
        }
        :global(.what-usdc-deploys-root .rail.dim) {
          opacity: 0.16;
        }

        :global(.what-usdc-deploys-root .rung) {
          stroke: rgba(79, 139, 255, 0.22);
          stroke-width: 1.4;
          transition: stroke 0.4s ease, filter 0.4s ease;
        }
        :global(.what-usdc-deploys-root .rung.on) {
          stroke: rgba(79, 139, 255, 0.85);
          filter: drop-shadow(0 0 6px rgba(79, 139, 255, 0.8));
        }
        :global(.what-usdc-deploys-root .rung.tap) {
          stroke: rgba(79, 139, 255, 0.14);
        }
        :global(.what-usdc-deploys-root .rung.tap.on) {
          stroke: rgba(79, 139, 255, 0.85);
          filter: drop-shadow(0 0 6px rgba(79, 139, 255, 0.8));
        }
        :global(.what-usdc-deploys-root .rnode) {
          fill: #0a1220;
          stroke-width: 1.6;
          transition: filter 0.5s ease, fill 0.5s ease, opacity 0.4s ease;
        }
        :global(.what-usdc-deploys-root .rnode-pwr) {
          stroke: #4f8bff;
        }
        :global(.what-usdc-deploys-root .rnode-cool) {
          stroke: #2fdbe6;
        }
        :global(.what-usdc-deploys-root .rnode-net) {
          stroke: #a48bff;
        }
        :global(.what-usdc-deploys-root .rnode.dim) {
          opacity: 0.2;
        }

        /* ---------- flow lines ---------- */
        :global(.what-usdc-deploys-root .flow) {
          fill: none;
          stroke-width: 2.4;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke-dashoffset 0.72s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease, stroke 0.4s ease;
        }
        :global(.what-usdc-deploys-root .flow-pwr) {
          stroke: url(#wudPwrGrad);
        }
        :global(.what-usdc-deploys-root .flow-net) {
          stroke: rgba(164, 139, 255, 0.55);
          stroke-width: 1.8;
          stroke-dasharray: 4 7;
        }
        :global(.what-usdc-deploys-root .jnode) {
          fill: #0a1220;
          stroke: #4f8bff;
          stroke-width: 1.8;
          transition: filter 0.5s;
        }
        :global(.what-usdc-deploys-root .spine-layer .flow) {
          stroke: var(--pwr);
        }

        :global(.what-usdc-deploys-root .flow.on) {
          filter: drop-shadow(0 0 6px rgba(79, 139, 255, 0.85));
        }
        :global(.what-usdc-deploys-root .flow-net.on) {
          filter: drop-shadow(0 0 6px rgba(164, 139, 255, 0.8));
        }

        /* NET rail tap */
        :global(.what-usdc-deploys-root .nettap) {
          stroke: rgba(164, 139, 255, 0.26);
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 4 7;
          stroke-linecap: round;
          transition: stroke 0.5s ease;
        }
        :global(.what-usdc-deploys-root .nettap.on) {
          stroke: rgba(164, 139, 255, 0.85);
          filter: drop-shadow(0 0 6px rgba(164, 139, 255, 0.8));
          animation: wudMarch 1.1s linear infinite;
        }

        /* ---------- lattice (planned) ---------- */
        :global(.what-usdc-deploys-root .lattice) {
          stroke: rgba(120, 140, 185, 0.28);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 5 6;
          stroke-linecap: round;
          transition: stroke 0.6s ease;
        }
        :global(.what-usdc-deploys-root .lattice-layer.on .lattice) {
          stroke: rgba(150, 140, 220, 0.6);
          animation: wudMarch 1.1s linear infinite;
        }
        @keyframes wudMarch {
          to {
            stroke-dashoffset: -22;
          }
        }

        /* ---------- cards ---------- */
        :global(.what-usdc-deploys-root .card) {
          transition: opacity 0.5s ease, transform 0.4s ease;
        }
        :global(.what-usdc-deploys-root .card-bg) {
          fill: rgba(15, 26, 52, 0.42);
        }
        :global(.what-usdc-deploys-root .card-border) {
          fill: none;
          stroke: #38bdf8;
          stroke-width: 1.4;
          transition: stroke 0.4s ease;
        }
        :global(.what-usdc-deploys-root .card-accent) {
          fill: #38bdf8;
          transition: fill 0.4s ease;
        }
        :global(.what-usdc-deploys-root .card-title) {
          font-size: 23px;
          font-weight: 700;
          letter-spacing: 1.2px;
          fill: #eaf1ff;
          transition: fill 0.4s ease;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .card-sub) {
          font-size: 13.5px;
          font-weight: 400;
          letter-spacing: 1.6px;
          fill: #7688b0;
          transition: fill 0.4s ease;
          font-family: inherit;
        }

        /* icons */
        :global(.what-usdc-deploys-root .icon-chip) {
          fill: rgba(46, 84, 170, 0.12);
          stroke: #38bdf8;
          stroke-width: 1.3;
          transition: stroke 0.4s;
        }
        :global(.what-usdc-deploys-root .icon-chip.cool) {
          stroke: rgba(47, 219, 230, 0.6);
        }
        :global(.what-usdc-deploys-root .ic-fill) {
          fill: #79a6ff;
          transition: fill 0.4s;
        }
        :global(.what-usdc-deploys-root .ic-fill-cool) {
          fill: #4fe3ea;
        }
        :global(.what-usdc-deploys-root .ic-stroke) {
          fill: none;
          stroke: #7ba4ff;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(.what-usdc-deploys-root .ic-stroke.thin) {
          stroke-width: 1.1;
          stroke-opacity: 0.75;
        }
        :global(.what-usdc-deploys-root .ic-stroke-rect) {
          fill: none;
          stroke: #7ba4ff;
          stroke-width: 1.5;
        }
        :global(.what-usdc-deploys-root .ic-row) {
          fill: rgba(120, 165, 255, 0.16);
        }
        :global(.what-usdc-deploys-root .ic-dot) {
          fill: #6fa2ff;
        }
        :global(.what-usdc-deploys-root .icon-glyph.cool .ic-stroke) {
          stroke: #4fe3ea;
        }
        :global(.what-usdc-deploys-root .icon-glyph) {
          transition: filter 0.4s ease;
        }

        /* pods */
        :global(.what-usdc-deploys-root .pod-bg) {
          fill: rgba(17, 30, 60, 0.65);
        }
        :global(.what-usdc-deploys-root .pod-border) {
          stroke: #38bdf8;
          stroke-width: 1.4;
        }
        :global(.what-usdc-deploys-root .pod-accent) {
          fill: #5b93ff;
          filter: drop-shadow(0 0 6px rgba(79, 139, 255, 0.6));
          transition: filter 0.5s ease, fill 0.5s ease;
        }
        :global(.what-usdc-deploys-root .pod-title) {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.5px;
          fill: #eef3ff;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .pod-sub) {
          font-size: 12.5px;
          letter-spacing: 1px;
          fill: #8496bd;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .pod-tag) {
          font-size: 12px;
          letter-spacing: 2px;
          fill: #6f9bff;
          font-weight: 500;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .pod-rack .ic-dot) {
          fill: #6fa2ff;
        }

        /* planned pods */
        :global(.what-usdc-deploys-root .planned) {
          opacity: 0.35;
          transition: opacity 0.4s ease;
        }
        :global(.what-usdc-deploys-root .planned-bg) {
          fill: rgba(20, 28, 48, 0.28);
        }
        :global(.what-usdc-deploys-root .planned-border) {
          fill: none;
          stroke: rgba(120, 140, 180, 0.42);
          stroke-width: 1.3;
          stroke-dasharray: 6 6;
        }
        :global(.what-usdc-deploys-root .planned-title) {
          font-size: 15px;
          letter-spacing: 2px;
          fill: #7182a4;
          font-weight: 500;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .planned-sub) {
          font-size: 12.5px;
          letter-spacing: 1.6px;
          fill: #586a8f;
          font-family: inherit;
        }

        /* skid */
        :global(.what-usdc-deploys-root .skid-bg) {
          fill: rgba(24, 20, 52, 0.42);
        }
        :global(.what-usdc-deploys-root .skid-border) {
          stroke: rgba(150, 128, 240, 0.4);
        }
        :global(.what-usdc-deploys-root .skid-accent) {
          fill: rgba(164, 139, 255, 0.45);
        }
        :global(.what-usdc-deploys-root .ic-stroke-net) {
          stroke: #b6a4ff;
          stroke-width: 1.7;
          fill: none;
          stroke-linecap: round;
        }
        :global(.what-usdc-deploys-root .ic-node-net) {
          fill: #0a1220;
          stroke: #b6a4ff;
          stroke-width: 1.6;
        }
        :global(.what-usdc-deploys-root .icon-glyph.net) {
          transition: filter 0.5s ease;
        }

        /* badges */
        :global(.what-usdc-deploys-root .badge) {
          fill: rgba(40, 70, 150, 0.14);
          stroke-width: 1.2;
        }
        :global(.what-usdc-deploys-root .badge-shared) {
          stroke: rgba(96, 144, 244, 0.62);
        }
        :global(.what-usdc-deploys-root .badge-fabric) {
          stroke: rgba(168, 132, 255, 0.66);
          fill: rgba(70, 45, 140, 0.16);
        }
        :global(.what-usdc-deploys-root .badge-text) {
          font-size: 12.5px;
          letter-spacing: 2.5px;
          font-weight: 600;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .badge-shared-t) {
          fill: #83abff;
        }
        :global(.what-usdc-deploys-root .badge-fabric-t) {
          fill: #bda6ff;
        }

        /* ---------- bottom bar ---------- */
        :global(.what-usdc-deploys-root .bb-bg) {
          fill: rgba(13, 22, 44, 0.5);
        }
        :global(.what-usdc-deploys-root .bb-border) {
          fill: none;
          stroke: rgba(83, 125, 210, 0.24);
          stroke-width: 1.2;
        }
        :global(.what-usdc-deploys-root .bb-divider) {
          stroke: rgba(90, 120, 180, 0.28);
          stroke-width: 1.2;
        }
        :global(.what-usdc-deploys-root .bb-text) {
          font-size: 13.5px;
          letter-spacing: 1.3px;
          fill: #9fb0d4;
          font-weight: 500;
          font-family: inherit;
        }
        :global(.what-usdc-deploys-root .bb-ic-stroke) {
          stroke: #7ea8ff;
          stroke-width: 1.6;
          stroke-linecap: round;
        }
        :global(.what-usdc-deploys-root .bb-ic-node) {
          fill: #7ea8ff;
        }
        :global(.what-usdc-deploys-root .bb-ic-fill) {
          fill: #7ea8ff;
        }
        :global(.what-usdc-deploys-root .bb-ic-rect) {
          fill: none;
          stroke: #7ea8ff;
          stroke-width: 1.4;
        }
        :global(.what-usdc-deploys-root .bb-ic-line) {
          stroke: rgba(126, 168, 255, 0.6);
          stroke-width: 1.2;
        }
        :global(.what-usdc-deploys-root .bb-ic-dot) {
          fill: #7ea8ff;
        }

        /* ACTIVE STATES */
        :global(.what-usdc-deploys-root .card:not(.active) .card-border) {
          stroke: rgba(70, 100, 165, 0.2);
        }
        :global(.what-usdc-deploys-root .card.dim) {
          opacity: 0.32;
        }
        :global(.what-usdc-deploys-root .card.dim .card-title) {
          fill: #56688f;
        }
        :global(.what-usdc-deploys-root .card.dim .card-sub) {
          fill: #43516f;
        }

        :global(.what-usdc-deploys-root .card.active .card-border) {
          stroke: rgba(110, 160, 255, 0.9);
          filter: drop-shadow(0 0 14px rgba(70, 120, 240, 0.5));
        }
        :global(.what-usdc-deploys-root .card.active .card-title) {
          fill: #ffffff;
        }
        :global(.what-usdc-deploys-root .card.active .card-sub) {
          fill: #a0b4db;
        }
        :global(.what-usdc-deploys-root .card.active .card-accent) {
          fill: #5b93ff;
          filter: drop-shadow(0 0 8px rgba(79, 139, 255, 0.85));
        }
        :global(.what-usdc-deploys-root .card.active .icon-chip) {
          stroke: rgba(120, 165, 255, 0.85);
          filter: drop-shadow(0 0 8px rgba(70, 120, 240, 0.5));
        }
        :global(.what-usdc-deploys-root .card.active .icon-glyph) {
          filter: drop-shadow(0 0 6px rgba(90, 150, 255, 0.7));
        }
        :global(.what-usdc-deploys-root .card.active .ic-fill) {
          fill: #a9c6ff;
        }
        :global(.what-usdc-deploys-root .card.active) {
          opacity: 1;
          animation: wudBreathe 3.4s ease-in-out infinite;
        }

        /* cooling active -> cyan */
        :global(.what-usdc-deploys-root #card-cooling.active .card-border) {
          stroke: rgba(70, 220, 235, 0.85);
          filter: drop-shadow(0 0 14px rgba(40, 200, 220, 0.45));
        }
        :global(.what-usdc-deploys-root #card-cooling.active .icon-glyph) {
          filter: drop-shadow(0 0 8px rgba(60, 220, 235, 0.8));
        }

        /* skid active -> violet */
        :global(.what-usdc-deploys-root #card-skid.active .card-border) {
          stroke: rgba(175, 140, 255, 0.9);
          filter: drop-shadow(0 0 14px rgba(150, 110, 255, 0.55));
        }
        :global(.what-usdc-deploys-root #card-skid.active .icon-glyph.net) {
          filter: drop-shadow(0 0 8px rgba(175, 140, 255, 0.85));
        }
        :global(.what-usdc-deploys-root #card-skid.active .skid-accent) {
          fill: #b49bff;
          filter: drop-shadow(0 0 7px rgba(164, 139, 255, 0.85));
        }

        /* pods active */
        :global(.what-usdc-deploys-root .pod.active .pod-border) {
          stroke: rgba(120, 165, 255, 0.95);
          filter: drop-shadow(0 0 14px rgba(70, 120, 240, 0.5));
        }
        :global(.what-usdc-deploys-root .pod.active .pod-accent) {
          fill: #79abff;
          filter: drop-shadow(0 0 9px rgba(90, 150, 255, 0.9));
        }
        :global(.what-usdc-deploys-root .pod.active .pod-rack) {
          filter: drop-shadow(0 0 7px rgba(90, 150, 255, 0.7));
        }
        :global(.what-usdc-deploys-root .pod.active .pod-rack .ic-dot) {
          fill: #a9c6ff;
        }
        :global(.what-usdc-deploys-root .pod.active .pod-title) {
          fill: #ffffff;
        }
        :global(.what-usdc-deploys-root .pod.active) {
          opacity: 1;
          animation: wudBreathe 3.4s ease-in-out infinite;
        }
        :global(.what-usdc-deploys-root .pod.dim) {
          opacity: 0.32;
        }

        /* rail nodes active */
        :global(.what-usdc-deploys-root .rnode.on) {
          fill: #0e1830;
        }
        :global(.what-usdc-deploys-root .rnode-pwr.on) {
          filter: drop-shadow(0 0 7px rgba(79, 139, 255, 0.95));
          fill: #1a2f5c;
        }
        :global(.what-usdc-deploys-root .rnode-cool.on) {
          filter: drop-shadow(0 0 7px rgba(47, 219, 230, 0.9));
          fill: #0c3138;
        }
        :global(.what-usdc-deploys-root .rnode-net.on) {
          filter: drop-shadow(0 0 7px rgba(164, 139, 255, 0.9));
          fill: #1e1745;
        }
        :global(.what-usdc-deploys-root .jnode.on) {
          filter: drop-shadow(0 0 7px rgba(79, 139, 255, 0.95));
          fill: #1a2f5c;
        }

        @keyframes wudBreathe {
          0%,
          100% {
            filter: drop-shadow(0 0 4px rgba(70, 120, 240, 0.18));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(80, 140, 255, 0.4));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.what-usdc-deploys-root .card.active),
          :global(.what-usdc-deploys-root .pod.active) {
            animation: none !important;
          }
          :global(.what-usdc-deploys-root .lattice-layer.on .lattice) {
            animation: none !important;
          }
          :global(.what-usdc-deploys-root .flow) {
            transition: none !important;
          }
        }
      `}</style>

      <div className="svg-container">
        <svg
          className="schematic"
          viewBox="0 0 1180 1226"
          role="img"
          aria-label="Campus infrastructure schematic: shared campus systems build down into IT pods and a network fabric."
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="wudVign" cx="50%" cy="34%" r="75%">
              <stop offset="0%" stopColor="#0b1730" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#070c1a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#03050c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wudPwrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f8bff" />
              <stop offset="100%" stopColor="#2b62f0" />
            </linearGradient>
            <pattern id="wudGrid" width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M34 0 L0 0 0 34" fill="none" stroke="#16305e" strokeWidth="1" strokeOpacity="0.35" />
            </pattern>
            <clipPath id="wudFrameClip">
              <rect x="18" y="18" width="1144" height="1194" rx="22" ry="22" />
            </clipPath>
          </defs>

          <g clipPath="url(#wudFrameClip)">
            <rect x="18" y="18" width="1144" height="1194" fill="#05070f" />
            <rect x="18" y="18" width="1144" height="1194" fill="url(#wudGrid)" />
            <rect x="18" y="18" width="1144" height="1194" fill="url(#wudVign)" />
          </g>

          <rect x="18" y="18" width="1144" height="1194" rx="22" ry="22" className="frame" />
          <path d="M58,32 L32,32 L32,58" className="tick" />
          <path d="M1122,32 L1148,32 L1148,58" className="tick" />
          <path d="M58,1198 L32,1198 L32,1172" className="tick" />
          <path d="M1122,1198 L1148,1198 L1148,1172" className="tick" />

          {/* ================= RAILS LAYER ================= */}
          <g className="rails-layer">
            <text
              x="100"
              y="60"
              textAnchor="middle"
              className={`rail-label pwr ${hasFilter ? (isPwrFiltered ? "on" : "dim") : ""}`}
            >
              PWR
            </text>
            <text
              x="162"
              y="60"
              textAnchor="middle"
              className={`rail-label cool ${hasFilter ? (isCoolFiltered ? "on" : "dim") : ""}`}
            >
              COOL
            </text>
            <text
              x="226"
              y="60"
              textAnchor="middle"
              className={`rail-label net ${hasFilter ? (isNetFiltered ? "on" : "dim") : ""}`}
            >
              NET
            </text>

            <line
              x1="100"
              y1="86"
              x2="100"
              y2="1110"
              className={`rail rail-pwr ${hasFilter ? (isPwrFiltered ? "on" : "dim") : isPwrFiltered ? "on" : ""}`}
            />
            <line
              x1="162"
              y1="86"
              x2="162"
              y2="1110"
              className={`rail rail-cool ${hasFilter ? (isCoolFiltered ? "on" : "dim") : isCoolFiltered ? "on" : ""}`}
            />
            <line
              x1="226"
              y1="86"
              x2="226"
              y2="1110"
              className={`rail rail-net ${hasFilter ? (isNetFiltered ? "on" : "dim") : isNetFiltered ? "on" : ""}`}
            />

            {/* Utility taps */}
            <g className="rail-taps">
              <line x1="100" y1="143" x2="226" y2="143" className={`rung ${isUtilityActive ? "on" : ""}`} />
              <line x1="226" y1="143" x2="288" y2="143" className={`rung tap ${isUtilityActive ? "on" : ""}`} />
              <circle
                cx="100"
                cy="143"
                r="4.2"
                className={`rnode rnode-pwr ${isUtilityActive ? "on" : hasFilter ? "dim" : ""}`}
              />
              <circle
                cx="162"
                cy="143"
                r="4.2"
                className={`rnode rnode-cool ${isUtilityActive && !hasFilter ? "on" : "dim"}`}
              />
              <circle
                cx="226"
                cy="143"
                r="4.2"
                className={`rnode rnode-net ${isUtilityActive && !hasFilter ? "on" : "dim"}`}
              />
            </g>

            {/* Substation taps */}
            <g className="rail-taps">
              <line x1="100" y1="277" x2="226" y2="277" className={`rung ${isSubstationActive ? "on" : ""}`} />
              <line x1="226" y1="277" x2="288" y2="277" className={`rung tap ${isSubstationActive ? "on" : ""}`} />
              <circle
                cx="100"
                cy="277"
                r="4.2"
                className={`rnode rnode-pwr ${isSubstationActive ? "on" : hasFilter ? "dim" : ""}`}
              />
              <circle
                cx="162"
                cy="277"
                r="4.2"
                className={`rnode rnode-cool ${isSubstationActive && !hasFilter ? "on" : "dim"}`}
              />
              <circle
                cx="226"
                cy="277"
                r="4.2"
                className={`rnode rnode-net ${isSubstationActive && !hasFilter ? "on" : "dim"}`}
              />
            </g>

            {/* Cooling taps */}
            <g className="rail-taps">
              <line x1="100" y1="411" x2="226" y2="411" className={`rung ${isCoolingActive ? "on" : ""}`} />
              <line x1="226" y1="411" x2="288" y2="411" className={`rung tap ${isCoolingActive ? "on" : ""}`} />
              <circle
                cx="100"
                cy="411"
                r="4.2"
                className={`rnode rnode-pwr ${isCoolingActive && !hasFilter ? "on" : "dim"}`}
              />
              <circle
                cx="162"
                cy="411"
                r="4.2"
                className={`rnode rnode-cool ${isCoolingActive ? "on" : hasFilter ? "dim" : ""}`}
              />
              <circle
                cx="226"
                cy="411"
                r="4.2"
                className={`rnode rnode-net ${isCoolingActive && !hasFilter ? "on" : "dim"}`}
              />
            </g>

            {/* Control plane taps */}
            <g className="rail-taps">
              <line x1="100" y1="545" x2="226" y2="545" className={`rung ${isControlActive ? "on" : ""}`} />
              <line x1="226" y1="545" x2="288" y2="545" className={`rung tap ${isControlActive ? "on" : ""}`} />
              <circle
                cx="100"
                cy="545"
                r="4.2"
                className={`rnode rnode-pwr ${isControlActive && (isPwrFiltered || !hasFilter) ? "on" : "dim"}`}
              />
              <circle
                cx="162"
                cy="545"
                r="4.2"
                className={`rnode rnode-cool ${isControlActive && (isCoolFiltered || !hasFilter) ? "on" : "dim"}`}
              />
              <circle
                cx="226"
                cy="545"
                r="4.2"
                className={`rnode rnode-net ${isControlActive && (isNetFiltered || !hasFilter) ? "on" : "dim"}`}
              />
            </g>

            {/* Direct PWR tap to Pods bus line */}
            <line
              x1="100"
              y1="634"
              x2="418"
              y2="634"
              className={`flow flow-pwr ${isBusOn ? "on" : ""}`}
              strokeDasharray="318"
              strokeDashoffset={isBusOn ? 0 : 318}
            />
            <circle
              cx="100"
              cy="634"
              r="4.2"
              className={`rnode rnode-pwr ${isBusOn ? "on" : hasFilter ? "dim" : ""}`}
            />

            {/* Net tap to Skid */}
            <line x1="226" y1="1063" x2="288" y2="1063" className={`nettap ${isSkidActive ? "on" : ""}`} />
            <circle
              cx="226"
              cy="1063"
              r="4.2"
              className={`rnode rnode-net ${isSkidActive ? "on" : hasFilter ? "dim" : ""}`}
            />
          </g>

          {/* ================= SPINE FLOW LAYER ================= */}
          <g className="spine-layer">
            <line
              x1="710"
              y1="190"
              x2="710"
              y2="230"
              className={`flow flow-pwr ${isSeg1On ? "on" : ""}`}
              strokeDasharray="40"
              strokeDashoffset={isSeg1On ? 0 : 40}
            />
            <line
              x1="710"
              y1="324"
              x2="710"
              y2="364"
              className={`flow flow-pwr ${isSeg2On ? "on" : ""}`}
              strokeDasharray="40"
              strokeDashoffset={isSeg2On ? 0 : 40}
            />
            <line
              x1="710"
              y1="458"
              x2="710"
              y2="498"
              className={`flow flow-pwr ${isSeg3On ? "on" : ""}`}
              strokeDasharray="40"
              strokeDashoffset={isSeg3On ? 0 : 40}
            />
            <line
              x1="710"
              y1="592"
              x2="710"
              y2="634"
              className={`flow flow-pwr ${isBranchOn ? "on" : ""}`}
              strokeDasharray="42"
              strokeDashoffset={isBranchOn ? 0 : 42}
            />
            <circle cx="710" cy="634" r="4.6" className={`jnode ${isBranchOn ? "on" : ""}`} />
            <line
              x1="418"
              y1="634"
              x2="1002"
              y2="634"
              className={`flow flow-pwr ${isBusOn ? "on" : ""}`}
              strokeDasharray="584"
              strokeDashoffset={isBusOn ? 0 : 584}
            />
            <line
              x1="418"
              y1="634"
              x2="418"
              y2="672"
              className={`flow flow-pwr ${isBusOn ? "on" : ""}`}
              strokeDasharray="38"
              strokeDashoffset={isBusOn ? 0 : 38}
              style={{
                filter: hoveredPod === 1 ? "drop-shadow(0 0 8px rgba(120,170,255,.95))" : undefined,
              }}
            />
            <line
              x1="710"
              y1="634"
              x2="710"
              y2="672"
              className={`flow flow-pwr ${isBusOn ? "on" : ""}`}
              strokeDasharray="38"
              strokeDashoffset={isBusOn ? 0 : 38}
              style={{
                filter: hoveredPod === 2 ? "drop-shadow(0 0 8px rgba(120,170,255,.95))" : undefined,
              }}
            />
            <line
              x1="1002"
              y1="634"
              x2="1002"
              y2="672"
              className={`flow flow-pwr ${isBusOn ? "on" : ""}`}
              strokeDasharray="38"
              strokeDashoffset={isBusOn ? 0 : 38}
              style={{
                filter: hoveredPod === 3 ? "drop-shadow(0 0 8px rgba(120,170,255,.95))" : undefined,
              }}
            />
          </g>

          {/* ================= LATTICE LAYER ================= */}
          <g className={`lattice-layer ${isLatticeOn ? "on" : ""}`}>
            <line x1="418" y1="828" x2="418" y2="862" className="lattice" />
            <line x1="710" y1="828" x2="710" y2="862" className="lattice" />
            <line x1="1002" y1="828" x2="1002" y2="862" className="lattice" />
            <line x1="418" y1="950" x2="418" y2="980" className="lattice" />
            <line x1="710" y1="950" x2="710" y2="980" className="lattice" />
            <line x1="1002" y1="950" x2="1002" y2="980" className="lattice" />
            <line x1="418" y1="980" x2="1002" y2="980" className="lattice" />
            <line x1="710" y1="980" x2="710" y2="1016" className="lattice" />
          </g>

          {/* ================= TOP SHARED CARDS ================= */}
          {/* UTILITY */}
          <g className={`card sh-card ${isUtilityActive ? "active" : "dim"}`} id="card-utility">
            <rect x="288" y="96" width="844" height="94" rx="16" ry="16" className="card-bg" />
            <rect x="288" y="96" width="844" height="94" rx="16" ry="16" className="card-border" />
            <rect x="288" y="106" width="3" height="74" rx="1.5" className="card-accent" />
            <rect x="324" y="115" width="56" height="56" rx="12" ry="12" className="icon-chip" />
            <g className="icon-glyph">
              <polygon points="349.0,131.0 358.0,131.0 352.0,142.0 358.0,142.0 347.0,156.0 351.0,144.0 345.0,144.0" className="ic-fill" />
            </g>
            <text x="410" y="137" textAnchor="start" className="card-title">
              UTILITY INTERCONNECT
            </text>
            <text x="410" y="163" textAnchor="start" className="card-sub">
              ONE INTERCONNECT FOR THE WHOLE CAMPUS • NOT MODULAR
            </text>
            <rect x="1032" y="128" width="84" height="30" rx="8" ry="8" className="badge badge-shared" />
            <text x="1074" y="148" textAnchor="middle" className="badge-text badge-shared-t">
              SHARED
            </text>
          </g>

          {/* SUBSTATION */}
          <g className={`card sh-card ${isSubstationActive ? "active" : "dim"}`} id="card-substation">
            <rect x="288" y="230" width="844" height="94" rx="16" ry="16" className="card-bg" />
            <rect x="288" y="230" width="844" height="94" rx="16" ry="16" className="card-border" />
            <rect x="288" y="240" width="3" height="74" rx="1.5" className="card-accent" />
            <g className="icon-glyph">
              <line x1="340.4" y1="291.7" x2="347.8" y2="267.6" className="ic-stroke" />
              <line x1="363.6" y1="291.7" x2="356.2" y2="267.6" className="ic-stroke" />
              <line x1="342.6" y1="273.9" x2="361.4" y2="273.9" className="ic-stroke" />
              <line x1="345.2" y1="281.2" x2="358.8" y2="281.2" className="ic-stroke" />
              <line x1="343.1" y1="267.6" x2="360.9" y2="267.6" className="ic-stroke" />
              <line x1="352.0" y1="267.6" x2="352.0" y2="261.2" className="ic-stroke" />
              <line x1="346.8" y1="264.4" x2="357.2" y2="264.4" className="ic-stroke" />
              <line x1="343.1" y1="267.6" x2="358.8" y2="281.2" className="ic-stroke thin" />
              <line x1="360.9" y1="267.6" x2="345.2" y2="281.2" className="ic-stroke thin" />
              <line x1="345.2" y1="281.2" x2="361.4" y2="291.7" className="ic-stroke thin" />
              <line x1="358.8" y1="281.2" x2="342.6" y2="291.7" className="ic-stroke thin" />
            </g>
            <text x="410" y="271" textAnchor="start" className="card-title">
              SUBSTATION / SITE INFRASTRUCTURE
            </text>
            <text x="410" y="297" textAnchor="start" className="card-sub">
              PAD, YARD, PERIMETER SIZED FOR THE END STATE
            </text>
            <rect x="1032" y="262" width="84" height="30" rx="8" ry="8" className="badge badge-shared" />
            <text x="1074" y="282" textAnchor="middle" className="badge-text badge-shared-t">
              SHARED
            </text>
          </g>

          {/* COOLING */}
          <g className={`card sh-card ${isCoolingActive ? "active" : "dim"}`} id="card-cooling">
            <rect x="288" y="364" width="844" height="94" rx="16" ry="16" className="card-bg" />
            <rect x="288" y="364" width="844" height="94" rx="16" ry="16" className="card-border" />
            <rect x="288" y="374" width="3" height="74" rx="1.5" className="card-accent" />
            <rect x="324" y="383" width="56" height="56" rx="12" ry="12" className="icon-chip cool" />
            <g className="icon-glyph cool">
              <circle cx="352" cy="411" r="12.5" className="ic-stroke" />
              <circle cx="352" cy="411" r="2.6" className="ic-fill-cool" />
              <path d="M352.0,408.4 Q358.3,406.0 352.0,400.0" className="ic-stroke thin" />
              <path d="M354.5,410.2 Q358.7,415.4 362.5,407.6" className="ic-stroke thin" />
              <path d="M353.5,413.1 Q349.9,418.7 358.5,419.9" className="ic-stroke thin" />
              <path d="M350.5,413.1 Q344.0,411.3 345.5,419.9" className="ic-stroke thin" />
              <path d="M349.5,410.2 Q349.2,403.5 341.5,407.6" className="ic-stroke thin" />
            </g>
            <text x="410" y="405" textAnchor="start" className="card-title">
              COOLING PLANT + HEADERS
            </text>
            <text x="410" y="431" textAnchor="start" className="card-sub">
              ONE PLANT • HEADERS SIZED FOR THE CAMPUS
            </text>
            <rect x="1032" y="396" width="84" height="30" rx="8" ry="8" className="badge badge-shared" />
            <text x="1074" y="416" textAnchor="middle" className="badge-text badge-shared-t">
              SHARED
            </text>
          </g>

          {/* CONTROL PLANE */}
          <g className={`card sh-card ${isControlActive ? "active" : "dim"}`} id="card-control">
            <rect x="288" y="498" width="844" height="94" rx="16" ry="16" className="card-bg" />
            <rect x="288" y="498" width="844" height="94" rx="16" ry="16" className="card-border" />
            <rect x="288" y="508" width="3" height="74" rx="1.5" className="card-accent" />
            <rect x="324" y="517" width="56" height="56" rx="12" ry="12" className="icon-chip" />
            <g className="icon-glyph">
              <rect x="338" y="528" width="28" height="34" rx="5" ry="5" className="ic-stroke-rect" />
              <rect x="342" y="536" width="20" height="3.3" rx="2" ry="2" className="ic-row" />
              <circle cx="346" cy="537.6" r="1.7" className="ic-dot" />
              <rect x="342" y="542" width="20" height="3.3" rx="2" ry="2" className="ic-row" />
              <circle cx="346" cy="543.6" r="1.7" className="ic-dot" />
              <rect x="342" y="548" width="20" height="3.3" rx="2" ry="2" className="ic-row" />
              <circle cx="346" cy="549.6" r="1.7" className="ic-dot" />
              <rect x="342" y="554" width="20" height="3.3" rx="2" ry="2" className="ic-row" />
              <circle cx="346" cy="555.6" r="1.7" className="ic-dot" />
            </g>
            <text x="410" y="539" textAnchor="start" className="card-title">
              CONTROL PLANE
            </text>
            <text x="410" y="565" textAnchor="start" className="card-sub">
              ONE CONTROL PLANE ACROSS EVERY POD ON THE SITE
            </text>
            <rect x="1032" y="530" width="84" height="30" rx="8" ry="8" className="badge badge-shared" />
            <text x="1074" y="550" textAnchor="middle" className="badge-text badge-shared-t">
              SHARED
            </text>
          </g>

          {/* ================= PODS ================= */}
          {/* POD 01 */}
          <g
            className={`card pod ${isPod1Active ? "active" : "dim"}`}
            id="pod-01"
            onMouseEnter={() => setHoveredPod(1)}
            onMouseLeave={() => setHoveredPod(null)}
          >
            <rect x="288" y="672" width="260" height="156" rx="16" ry="16" className="card-bg pod-bg" />
            <rect x="288" y="672" width="260" height="156" rx="16" ry="16" className="card-border pod-border" />
            <rect x="296" y="690" width="4" height="120" rx="2" className="pod-accent" />
            <g className="icon-glyph pod-rack">
              <rect x="329" y="708" width="34" height="84" rx="5" ry="5" className="ic-stroke-rect" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((rowIdx) => (
                <React.Fragment key={rowIdx}>
                  <rect x="333" y={716 + rowIdx * 8.7} width="26" height="5.5" rx="2" ry="2" className="ic-row" />
                  <circle cx="337" cy={718.75 + rowIdx * 8.7} r="1.5" className="ic-dot" />
                </React.Fragment>
              ))}
            </g>
            <text x="392" y="718" textAnchor="start" className="pod-title">
              POD 01
            </text>
            <text x="392" y="746" textAnchor="start" className="pod-sub">
              BUILT, ENERGIZED
            </text>
            <text x="392" y="802" textAnchor="start" className="pod-tag">
              IT POD
            </text>
          </g>

          {/* POD 02 */}
          <g
            className={`card pod ${isPod2Active ? "active" : "dim"}`}
            id="pod-02"
            onMouseEnter={() => setHoveredPod(2)}
            onMouseLeave={() => setHoveredPod(null)}
          >
            <rect x="580" y="672" width="260" height="156" rx="16" ry="16" className="card-bg pod-bg" />
            <rect x="580" y="672" width="260" height="156" rx="16" ry="16" className="card-border pod-border" />
            <rect x="588" y="690" width="4" height="120" rx="2" className="pod-accent" />
            <g className="icon-glyph pod-rack">
              <rect x="621" y="708" width="34" height="84" rx="5" ry="5" className="ic-stroke-rect" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((rowIdx) => (
                <React.Fragment key={rowIdx}>
                  <rect x="625" y={716 + rowIdx * 8.7} width="26" height="5.5" rx="2" ry="2" className="ic-row" />
                  <circle cx="629" cy={718.75 + rowIdx * 8.7} r="1.5" className="ic-dot" />
                </React.Fragment>
              ))}
            </g>
            <text x="684" y="718" textAnchor="start" className="pod-title">
              POD 02
            </text>
            <text x="684" y="746" textAnchor="start" className="pod-sub">
              SAME DESIGN
            </text>
            <text x="684" y="802" textAnchor="start" className="pod-tag">
              IT POD
            </text>
          </g>

          {/* POD 03 */}
          <g
            className={`card pod ${isPod3Active ? "active" : "dim"}`}
            id="pod-03"
            onMouseEnter={() => setHoveredPod(3)}
            onMouseLeave={() => setHoveredPod(null)}
          >
            <rect x="872" y="672" width="260" height="156" rx="16" ry="16" className="card-bg pod-bg" />
            <rect x="872" y="672" width="260" height="156" rx="16" ry="16" className="card-border pod-border" />
            <rect x="880" y="690" width="4" height="120" rx="2" className="pod-accent" />
            <g className="icon-glyph pod-rack">
              <rect x="913" y="708" width="34" height="84" rx="5" ry="5" className="ic-stroke-rect" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((rowIdx) => (
                <React.Fragment key={rowIdx}>
                  <rect x="917" y={716 + rowIdx * 8.7} width="26" height="5.5" rx="2" ry="2" className="ic-row" />
                  <circle cx="921" cy={718.75 + rowIdx * 8.7} r="1.5" className="ic-dot" />
                </React.Fragment>
              ))}
            </g>
            <text x="976" y="718" textAnchor="start" className="pod-title">
              POD 03
            </text>
            <text x="976" y="746" textAnchor="start" className="pod-sub">
              SILICON PER POD
            </text>
            <text x="976" y="802" textAnchor="start" className="pod-tag">
              IT POD
            </text>
          </g>

          {/* ================= PLANNED PODS ================= */}
          <g className="planned" id="plan-04">
            <rect x="288" y="862" width="260" height="88" rx="14" ry="14" className="planned-bg" />
            <rect x="288" y="862" width="260" height="88" rx="14" ry="14" className="planned-border" />
            <text x="418" y="900" textAnchor="middle" className="planned-title">
              POD 04 • PLANNED
            </text>
            <text x="418" y="926" textAnchor="middle" className="planned-sub">
              NOT YET PAID FOR
            </text>
          </g>
          <g className="planned" id="plan-05">
            <rect x="580" y="862" width="260" height="88" rx="14" ry="14" className="planned-bg" />
            <rect x="580" y="862" width="260" height="88" rx="14" ry="14" className="planned-border" />
            <text x="710" y="900" textAnchor="middle" className="planned-title">
              POD 05 • PLANNED
            </text>
            <text x="710" y="926" textAnchor="middle" className="planned-sub">
              NOT YET PAID FOR
            </text>
          </g>
          <g className="planned" id="plan-06">
            <rect x="872" y="862" width="260" height="88" rx="14" ry="14" className="planned-bg" />
            <rect x="872" y="862" width="260" height="88" rx="14" ry="14" className="planned-border" />
            <text x="1002" y="900" textAnchor="middle" className="planned-title">
              POD 06 • PLANNED
            </text>
            <text x="1002" y="926" textAnchor="middle" className="planned-sub">
              NOT YET PAID FOR
            </text>
          </g>

          {/* ================= NETWORK SKID ================= */}
          <g className={`card skid ${isSkidActive ? "active" : "dim"}`} id="card-skid">
            <rect x="288" y="1016" width="844" height="94" rx="16" ry="16" className="card-bg skid-bg" />
            <rect x="288" y="1016" width="844" height="94" rx="16" ry="16" className="card-border skid-border" />
            <rect x="288" y="1026" width="3" height="74" rx="1.5" className="card-accent skid-accent" />
            <g className="icon-glyph net">
              <line x1="352.0" y1="1049.3" x2="363.8" y2="1069.8" className="ic-stroke-net" />
              <line x1="363.8" y1="1069.8" x2="340.2" y2="1069.8" className="ic-stroke-net" />
              <line x1="340.2" y1="1069.8" x2="352.0" y2="1049.3" className="ic-stroke-net" />
              <circle cx="352.0" cy="1049.3" r="3.6" className="ic-node-net" />
              <circle cx="363.8" cy="1069.8" r="3.6" className="ic-node-net" />
              <circle cx="340.2" cy="1069.8" r="3.6" className="ic-node-net" />
            </g>
            <text x="410" y="1057" textAnchor="start" className="card-title">
              NETWORK SKID
            </text>
            <text x="410" y="1083" textAnchor="start" className="card-sub">
              ONE PER FIVE IT PODS • TURNS ISLANDS INTO ONE FABRIC
            </text>
            <rect x="1032" y="1048" width="84" height="30" rx="8" ry="8" className="badge badge-fabric" />
            <text x="1074" y="1068" textAnchor="middle" className="badge-text badge-fabric-t">
              FABRIC
            </text>
          </g>

          {/* ================= BOTTOM BAR ================= */}
          <g className="bottom-bar">
            <rect x="56" y="1140" width="1068" height="58" rx="16" ry="16" className="bb-bg" />
            <rect x="56" y="1140" width="1068" height="58" rx="16" ry="16" className="bb-border" />
            <line x1="448" y1="1153" x2="448" y2="1185" className="bb-divider" />
            <line x1="712" y1="1153" x2="712" y2="1185" className="bb-divider" />
            <line x1="916" y1="1153" x2="916" y2="1185" className="bb-divider" />
            <g className="bb-ic">
              <line x1="92" y1="1169" x2="107" y2="1162" className="bb-ic-stroke" />
              <line x1="92" y1="1169" x2="107" y2="1176" className="bb-ic-stroke" />
              <circle cx="92" cy="1169" r="3.2" className="bb-ic-node" />
              <circle cx="107" cy="1162" r="3.2" className="bb-ic-node" />
              <circle cx="107" cy="1176" r="3.2" className="bb-ic-node" />
            </g>
            <text x="122" y="1174" textAnchor="start" className="bb-text">
              SHARED ONCE • BUILT PER POD
            </text>
            <g className="bb-ic">
              <polygon points="473.5,1160.0 480.0,1160.0 476.0,1168.0 480.0,1168.0 472.0,1179.0 475.5,1169.5 471.0,1169.5" className="bb-ic-fill" />
            </g>
            <text x="498" y="1174" textAnchor="start" className="bb-text">
              10–15 MW CAMPUS
            </text>
            <g className="bb-ic">
              <rect x="736.4" y="1161.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="742.4" y="1161.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="748.4" y="1161.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="736.4" y="1167.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="742.4" y="1167.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="748.4" y="1167.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="736.4" y="1173.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="742.4" y="1173.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
              <rect x="748.4" y="1173.4" width="3.2" height="3.2" rx="0.8" className="bb-ic-fill" />
            </g>
            <text x="766" y="1174" textAnchor="start" className="bb-text">
              ≈ 4–6 PODS
            </text>
            <g className="bb-ic">
              <rect x="942" y="1160" width="16" height="18" rx="2.5" ry="2.5" className="bb-ic-rect" />
              <line x1="945" y1="1164" x2="955" y2="1164" className="bb-ic-line" />
              <circle cx="946.5" cy="1164" r="1.1" className="bb-ic-dot" />
              <line x1="945" y1="1168" x2="955" y2="1168" className="bb-ic-line" />
              <circle cx="946.5" cy="1168" r="1.1" className="bb-ic-dot" />
              <line x1="945" y1="1172" x2="955" y2="1172" className="bb-ic-line" />
              <circle cx="946.5" cy="1172" r="1.1" className="bb-ic-dot" />
            </g>
            <text x="972" y="1174" textAnchor="start" className="bb-text">
              + 1–2 SKIDS
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
