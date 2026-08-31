"use client";

import React, { useEffect, useState, useRef } from "react";

interface RequestPathPodModelProps {
  isActive?: boolean;
}

export default function RequestPathPodModel({ isActive = true }: RequestPathPodModelProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const flowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 0: Request in Prompt
  // 1: Prefill Sidecar
  // 2: Middle KV Cache connector
  // 3: Decode Floor
  // 4: Tokens Out
  const flowSteps = [0, 1, 2, 3, 4];
  const stepDurations = [900, 1200, 800, 1200, 1200];

  useEffect(() => {
    if (!isActive) {
      if (flowTimerRef.current) clearTimeout(flowTimerRef.current);
      return;
    }

    const nextStep = () => {
      setActiveStep((prev) => {
        const next = (prev + 1) % flowSteps.length;
        const dwell = stepDurations[next];
        const gap = next === 0 ? 1400 : 80;
        flowTimerRef.current = setTimeout(nextStep, dwell + gap);
        return next;
      });
    };

    flowTimerRef.current = setTimeout(nextStep, stepDurations[0]);

    return () => {
      if (flowTimerRef.current) clearTimeout(flowTimerRef.current);
    };
  }, [isActive]);

  const handleReplay = () => {
    if (flowTimerRef.current) clearTimeout(flowTimerRef.current);
    setIsRevealed(false);
    setActiveStep(0);
    setTimeout(() => {
      setIsRevealed(true);
    }, 150);
  };

  // Generate waveform SVG path for decode floor
  const renderWaveform = () => {
    const P = 300;
    const yB = 58;
    const pulses = [
      [10, 15, 42],
      [44, 10, 26],
      [70, 17, 46],
      [102, 9, 22],
      [126, 13, 36],
      [154, 19, 48],
      [190, 10, 26],
      [214, 15, 42],
      [248, 12, 32],
    ];

    let d0 = `M 0 ${yB}`;
    for (let i = 0; i < pulses.length; i++) {
      const s = pulses[i][0];
      const w = pulses[i][1];
      const h = pulses[i][2];
      const x0 = s;
      const x1 = s + w;
      const yT = yB - h;
      d0 += ` L ${x0} ${yB} L ${x0} ${yT} L ${x1} ${yT} L ${x1} ${yB}`;
    }
    d0 += ` L ${P} ${yB}`;

    let d1 = `M ${P} ${yB}`;
    for (let i = 0; i < pulses.length; i++) {
      const s = pulses[i][0];
      const w = pulses[i][1];
      const h = pulses[i][2];
      const x0 = P + s;
      const x1 = P + s + w;
      const yT = yB - h;
      d1 += ` L ${x0} ${yB} L ${x0} ${yT} L ${x1} ${yT} L ${x1} ${yB}`;
    }
    d1 += ` L ${P * 2} ${yB}`;

    return `${d0} ${d1}`;
  };

  return (
    <div className="rpp-model-root" ref={containerRef}>
      <style jsx>{`
        .rpp-model-root {
          width: 100%;
          font-family: var(--font-mono), "Chakra Petch", monospace;
          color: #e6effd;
          position: relative;
        }

        .frame {
          position: relative;
          border: 1px solid rgba(74, 144, 255, 0.38);
          border-radius: 20px;
          background: linear-gradient(180deg, #080e1c 0%, #04070f 65%);
          box-shadow: 0 0 0 1px rgba(74, 144, 255, 0.05),
            0 24px 70px rgba(6, 20, 55, 0.6), 0 0 60px rgba(24, 66, 150, 0.16),
            inset 0 1px 0 rgba(140, 185, 255, 0.09);
          overflow: hidden;
          padding: 24px 26px 22px;
        }

        .grid-layer {
          position: absolute;
          inset: -20px;
          z-index: 0;
          pointer-events: none;
          background-image: linear-gradient(
              rgba(74, 144, 255, 0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(74, 144, 255, 0.055) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          mask-image: radial-gradient(
            125% 105% at 50% 0%,
            #000 52%,
            transparent 100%
          );
        }

        .ambient {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(
              58% 42% at 50% -6%,
              rgba(42, 96, 190, 0.28),
              transparent 72%
            ),
            radial-gradient(
              38% 30% at 86% 12%,
              rgba(38, 92, 180, 0.14),
              transparent 72%
            );
        }

        .content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        h2.title {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.045em;
          color: #e6effd;
          text-shadow: 0 0 20px rgba(74, 144, 255, 0.28);
        }
        .sep {
          color: #79b4ff;
          margin: 0 5px;
          text-shadow: 0 0 12px rgba(74, 144, 255, 0.5);
        }
        .subtitle {
          margin-top: 5px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #7ba2dd;
        }

        .head-right {
          text-align: right;
        }
        .stage-text {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #79b4ff;
          text-shadow: 0 0 10px rgba(74, 144, 255, 0.4);
        }
        .stage-text b {
          color: #ffffff;
          font-weight: 700;
        }

        .stage-nodes {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 140px;
          height: 12px;
          margin: 8px 0 0 auto;
        }
        .stage-nodes .track {
          position: absolute;
          top: 50%;
          left: 3px;
          right: 3px;
          height: 2px;
          transform: translateY(-50%);
          background: linear-gradient(
            90deg,
            rgba(74, 144, 255, 0.22),
            rgba(120, 180, 255, 0.6),
            rgba(74, 144, 255, 0.22)
          );
          border-radius: 2px;
        }
        .tdot {
          position: absolute;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transform: translateY(-50%);
          background: #bcdcff;
          box-shadow: 0 0 10px 2px rgba(74, 144, 255, 0.6);
          z-index: 2;
          animation: trackAnim 3.2s ease-in-out infinite;
        }
        @keyframes trackAnim {
          0% {
            left: 0;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 6px);
            opacity: 0;
          }
        }
        .sn {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          position: relative;
          z-index: 1;
          background: radial-gradient(
            circle at 40% 35%,
            #bcdcff,
            #4a90ff 72%
          );
          box-shadow: 0 0 8px rgba(74, 144, 255, 0.5);
        }

        /* Request In Card */
        .req-stack {
          align-self: flex-start;
          margin-left: 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          z-index: 3;
        }
        .request-card {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 250px;
          padding: 11px 16px;
          border: 1px solid rgba(74, 144, 255, 0.38);
          border-radius: 12px;
          background: rgba(12, 24, 48, 0.55);
          box-shadow: 0 0 20px rgba(30, 80, 175, 0.2);
          transition: all 0.35s ease;
        }
        .request-card.active {
          border-color: #79b4ff;
          box-shadow: 0 0 32px rgba(74, 144, 255, 0.6),
            inset 0 1px 0 rgba(160, 200, 255, 0.2);
          transform: translateY(-2px);
        }
        .lbl {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: #e6effd;
        }
        .lbl.b {
          font-weight: 600;
          color: #79b4ff;
        }

        /* Vertical Connector */
        .vconn {
          width: 0;
          position: relative;
          border-left: 2px dotted rgba(120, 175, 255, 0.55);
        }
        .vconn-req {
          height: 34px;
          margin-left: 124px;
        }
        .vconn-tok {
          height: 32px;
        }
        .pulse-dot {
          position: absolute;
          left: -4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #bcdcff;
          box-shadow: 0 0 11px 2px rgba(74, 144, 255, 0.6);
          animation: travelDown 2.2s ease-in-out infinite;
        }
        @keyframes travelDown {
          0% {
            top: -3px;
            opacity: 0;
          }
          14% {
            opacity: 1;
          }
          86% {
            opacity: 1;
          }
          100% {
            top: calc(100% - 3px);
            opacity: 0;
          }
        }

        /* Pod Envelope */
        .pod {
          position: relative;
          z-index: 1;
          margin-top: -12px;
          border: 1.5px dashed rgba(74, 144, 255, 0.38);
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(14, 26, 52, 0.4),
            rgba(8, 16, 34, 0.26)
          );
          padding: 20px 22px 24px;
          box-shadow: 0 0 30px rgba(22, 64, 150, 0.14),
            inset 0 0 34px rgba(20, 52, 124, 0.08);
        }
        .pod-head {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 18px;
        }
        .pod-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #e6effd;
        }
        .pod-sub {
          margin-top: 2px;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: #7ba2dd;
        }

        /* Card Grid */
        .card-grid {
          display: grid;
          grid-template-columns: 1fr 110px 1fr;
          gap: 16px;
          align-items: stretch;
        }
        .role-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(74, 144, 255, 0.38);
          border-radius: 14px;
          background: rgba(9, 18, 38, 0.65);
          padding: 16px 18px;
          box-shadow: 0 0 22px rgba(22, 64, 155, 0.14);
          transition: all 0.35s ease;
        }
        .role-card.active {
          border-color: #79b4ff;
          box-shadow: 0 0 40px rgba(74, 144, 255, 0.5),
            inset 0 1px 0 rgba(160, 200, 255, 0.15);
          transform: translateY(-2px);
        }
        .card-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .card-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #e6effd;
        }
        .card-sub {
          margin-top: 2px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #7ba2dd;
        }

        .spec-lines {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 16px;
        }
        .spec-lines i {
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            rgba(120, 180, 255, 0.55),
            rgba(74, 144, 255, 0.1)
          );
        }
        .spec-lines i:nth-child(4) {
          width: 60%;
        }

        .load-panel {
          margin-top: auto;
          border: 1px solid rgba(74, 144, 255, 0.16);
          border-radius: 10px;
          padding: 11px 14px;
          background: rgba(7, 15, 32, 0.45);
        }
        .load-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #e6effd;
        }
        .load-sub {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #7ba2dd;
          margin: 3px 0 9px;
        }

        /* Prefill bar */
        .load-bar {
          height: 12px;
          border-radius: 6px;
          border: 1px solid rgba(74, 144, 255, 0.38);
          background: rgba(10, 20, 42, 0.65);
          position: relative;
          overflow: hidden;
        }
        .load-fill {
          position: absolute;
          top: 1px;
          left: 1px;
          height: calc(100% - 2px);
          width: 88%;
          border-radius: 5px;
          background: repeating-linear-gradient(
            118deg,
            rgba(150, 200, 255, 0.95) 0 8px,
            rgba(64, 124, 225, 0.72) 8px 17px
          );
          background-size: 34px 100%;
          box-shadow: 0 0 12px rgba(74, 144, 255, 0.6);
          animation: barberAnim 1.2s linear infinite;
        }
        @keyframes barberAnim {
          to {
            background-position: 34px 0;
          }
        }

        /* Decode Waveform */
        .wave {
          height: 52px;
          position: relative;
          overflow: hidden;
        }
        .wave svg {
          width: 100%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 0 3px rgba(74, 144, 255, 0.5));
        }

        /* Middle Connector */
        .mid {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 0;
        }
        .mid.active .mid-label {
          color: #bcdcff;
          text-shadow: 0 0 12px rgba(74, 144, 255, 0.6);
        }
        .mid-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.13em;
          color: #7ba2dd;
          white-space: nowrap;
        }
        .hconn {
          position: relative;
          width: 100%;
          height: 2px;
        }
        .hconn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-top: 2px dotted rgba(120, 175, 255, 0.55);
        }
        .mid.active .hconn::before {
          border-top-color: #79b4ff;
        }
        .node {
          position: absolute;
          top: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, #bcdcff, #4a90ff 70%);
          box-shadow: 0 0 8px rgba(74, 144, 255, 0.6);
        }
        .node-l {
          left: 0;
        }
        .node-r {
          left: 100%;
        }

        .hdot {
          position: absolute;
          top: 50%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transform: translateY(-50%);
          background: #bcdcff;
          box-shadow: 0 0 10px 2px rgba(74, 144, 255, 0.6);
        }
        .hdot.d1 {
          animation: hrightAnim 2.8s ease-in-out infinite;
        }
        .hdot.d2 {
          animation: hleftAnim 2.8s ease-in-out infinite 1.4s;
        }
        @keyframes hrightAnim {
          0% {
            left: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 5px);
            opacity: 0;
          }
        }
        @keyframes hleftAnim {
          0% {
            left: calc(100% - 5px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 0;
            opacity: 0;
          }
        }

        /* Tokens Out */
        .tokens-row {
          display: grid;
          grid-template-columns: 1fr 110px 1fr;
          margin-top: 6px;
        }
        .tokens-cell {
          grid-column: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tokens-card {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 16px;
          border: 1px solid rgba(74, 144, 255, 0.38);
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            rgba(20, 50, 112, 0.34),
            rgba(12, 24, 48, 0.44)
          );
          box-shadow: 0 0 20px rgba(34, 88, 185, 0.22);
          transition: all 0.35s ease;
        }
        .tokens-card.active {
          border-color: #79b4ff;
          box-shadow: 0 0 36px rgba(74, 144, 255, 0.55);
          transform: translateY(-2px);
        }
        .tok-title {
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #e6effd;
        }
        .tok-sub {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #7ba2dd;
        }
        .pips {
          display: flex;
          gap: 4px;
          margin-left: auto;
        }
        .pips i {
          width: 5px;
          height: 5px;
          border-radius: 2px;
          background: #4a90ff;
          opacity: 0.24;
          animation: pipAnim 2s linear infinite;
        }
        .pips i:nth-child(2) {
          animation-delay: 0.4s;
        }
        .pips i:nth-child(3) {
          animation-delay: 0.8s;
        }
        .pips i:nth-child(4) {
          animation-delay: 1.2s;
        }
        .pips i:nth-child(5) {
          animation-delay: 1.6s;
        }
        @keyframes pipAnim {
          0% {
            opacity: 1;
            background: #bcdcff;
            box-shadow: 0 0 8px 1px rgba(74, 144, 255, 0.6);
          }
          18% {
            opacity: 1;
          }
          30% {
            opacity: 0.24;
            background: #4a90ff;
            box-shadow: none;
          }
          100% {
            opacity: 0.24;
          }
        }

        /* Info Bar */
        .info-bar {
          display: flex;
          align-items: center;
          border: 1px solid rgba(74, 144, 255, 0.38);
          border-radius: 12px;
          background: rgba(12, 24, 48, 0.5);
          padding: 10px 6px;
          margin-top: 18px;
          box-shadow: 0 0 20px rgba(22, 64, 155, 0.12);
        }
        .info-module {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 4px 10px;
        }
        .info-module .ico {
          color: #79b4ff;
          display: grid;
          place-items: center;
        }
        .info-module .t {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #7ba2dd;
        }
        .divider {
          width: 1px;
          height: 22px;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(120, 175, 255, 0.55),
            transparent
          );
        }

        /* Summary Bar */
        .summary-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(74, 144, 255, 0.38);
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            rgba(22, 54, 116, 0.28),
            rgba(12, 24, 48, 0.4)
          );
          padding: 12px 18px;
          margin-top: 12px;
          box-shadow: 0 0 20px rgba(30, 80, 175, 0.14);
        }
        .summary-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #79b4ff;
          text-shadow: 0 0 8px rgba(74, 144, 255, 0.25);
        }

        /* Icon Badges */
        .ico-circle {
          width: 38px;
          height: 38px;
          flex: none;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1.5px solid rgba(74, 144, 255, 0.5);
          color: #bcdcff;
          background: radial-gradient(
            circle at 50% 38%,
            rgba(42, 96, 190, 0.4),
            rgba(10, 20, 44, 0.2)
          );
          box-shadow: 0 0 14px rgba(42, 104, 205, 0.32);
        }
        .ico-circle svg {
          width: 18px;
          height: 18px;
        }

        .ico-badge {
          width: 34px;
          height: 34px;
          flex: none;
          border-radius: 9px;
          display: grid;
          place-items: center;
          border: 1.5px solid rgba(74, 144, 255, 0.5);
          color: #bcdcff;
          background: radial-gradient(
            circle at 50% 38%,
            rgba(42, 96, 190, 0.4),
            rgba(10, 20, 44, 0.2)
          );
        }
        .ico-badge svg {
          width: 17px;
          height: 17px;
        }
        .ico-badge.sm {
          width: 28px;
          height: 28px;
          border-radius: 7px;
        }
        .ico-badge.sm svg {
          width: 14px;
          height: 14px;
        }

        /* Replay Button */
        .replay-btn {
          position: absolute;
          right: 14px;
          bottom: 12px;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 6px 11px;
          border-radius: 8px;
          font-family: inherit;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #bcdcff;
          background: rgba(12, 26, 54, 0.65);
          border: 1px solid rgba(74, 144, 255, 0.38);
          box-shadow: 0 0 16px rgba(30, 80, 175, 0.18);
          backdrop-filter: blur(4px);
          transition: all 0.25s ease;
        }
        .replay-btn:hover {
          border-color: rgba(120, 175, 255, 0.65);
          color: #ffffff;
          box-shadow: 0 0 22px rgba(48, 110, 215, 0.34);
          transform: translateY(-1px);
        }
        .replay-btn svg {
          width: 13px;
          height: 13px;
        }

        @media (max-width: 768px) {
          .frame {
            padding: 16px 14px;
          }
          .card-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .tokens-row {
            grid-template-columns: 1fr;
          }
          .tokens-cell {
            grid-column: 1;
          }
          .info-bar {
            flex-direction: column;
            gap: 8px;
          }
          .divider {
            display: none;
          }
        }
      `}</style>

      <div className="frame">
        <div className="grid-layer" />
        <div className="ambient" />

        <button
          className="replay-btn"
          type="button"
          aria-label="Replay flow animation"
          onClick={handleReplay}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v5h-5" />
          </svg>
          <span>REPLAY</span>
        </button>

        <div className="content">
          {/* HEADER */}
          <header>
            <div className="head-left">
              <h2 className="title">
                REQUEST PATH<span className="sep">·</span>ONE POD, TWO ROLES
              </h2>
              <div className="subtitle">INTELLIGENT · BALANCED · HIGH PERFORMANCE</div>
            </div>
            <div className="head-right">
              <div className="stage-text">
                STAGE <b>{activeStep + 1}</b> / 5
              </div>
              <div className="stage-nodes">
                <span className="track" />
                <span className="tdot" />
                <span className="sn" />
                <span className="sn" />
                <span className="sn" />
                <span className="sn" />
                <span className="sn" />
              </div>
            </div>
          </header>

          {/* REQUEST IN PROMPT */}
          <div className="req-stack">
            <div className={`request-card ${activeStep === 0 ? "active" : ""}`}>
              <span className="ico-circle">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 5h16a1.6 1.6 0 0 1 1.6 1.6v7.8A1.6 1.6 0 0 1 20 16H9l-4 3v-3H4a1.6 1.6 0 0 1-1.6-1.6V6.6A1.6 1.6 0 0 1 4 5z" />
                  <path d="M7.4 9.4l2.6 2.1-2.6 2.1" />
                  <path d="M12.6 13.6h4.2" />
                </svg>
              </span>
              <span>
                <span className="lbl">REQUEST IN</span>{" "}
                <span className="lbl b">PROMPT</span>
              </span>
            </div>
            <div className="vconn vconn-req">
              <span className="pulse-dot" />
            </div>
          </div>

          {/* POD ENVELOPE */}
          <section className="pod">
            <div className="pod-head">
              <span className="ico-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2.8l7.5 4.2v9L12 20.2 4.5 16.1V7z" />
                  <path d="M4.7 7.1L12 11.3l7.3-4.2" />
                  <path d="M12 11.3V20" />
                </svg>
              </span>
              <div>
                <div className="pod-title">POD ENVELOPE</div>
                <div className="pod-sub">PRESENTED TO THE CUSTOMER AS ONE POD</div>
              </div>
            </div>

            <div className="card-grid">
              {/* PREFILL SIDECAR */}
              <div className={`role-card prefill ${activeStep === 1 ? "active" : ""}`}>
                <div className="card-head">
                  <span className="ico-circle">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M13 2L5 13.2h5.1L9.2 22l8.6-11.4h-5.1L13 2z"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="card-title">PREFILL SIDECAR</div>
                    <div className="card-sub">HIGH ARITHMETIC DENSITY</div>
                  </div>
                </div>
                <div className="spec-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="load-panel">
                  <div className="load-label">LOAD</div>
                  <div className="load-sub">NEAR SUSTAINED TDP</div>
                  <div className="load-bar">
                    <div className="load-fill" />
                  </div>
                </div>
              </div>

              {/* MIDDLE CONNECTOR */}
              <div className={`mid ${activeStep === 2 ? "active" : ""}`}>
                <div className="mid-label">KV CACHE</div>
                <div className="hconn">
                  <span className="node node-l" />
                  <span className="node node-r" />
                  <span className="hdot d1" />
                  <span className="hdot d2" />
                </div>
                <div className="mid-label">POD FABRIC</div>
              </div>

              {/* DECODE FLOOR */}
              <div className={`role-card decode ${activeStep === 3 ? "active" : ""}`}>
                <div className="card-head">
                  <span className="ico-circle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12h3.4l1.9-6.4 3.6 12.8 2.4-9.1 1.7 2.7H22" />
                    </svg>
                  </span>
                  <div>
                    <div className="card-title">DECODE FLOOR</div>
                    <div className="card-sub">HIGH BANDWIDTH MEMORY · CONCURRENCY</div>
                  </div>
                </div>
                <div className="spec-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="load-panel">
                  <div className="load-label">LOAD</div>
                  <div className="load-sub">BURSTY</div>
                  <div className="wave">
                    <svg viewBox="0 0 300 74" preserveAspectRatio="none">
                      <line
                        x1="0"
                        y1="58"
                        x2="300"
                        y2="58"
                        stroke="rgba(74,144,255,.16)"
                        strokeWidth="1"
                      />
                      <g>
                        <path
                          fill="none"
                          stroke="#a9d0ff"
                          strokeWidth="2"
                          strokeLinejoin="miter"
                          d={renderWaveform()}
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            from="0 0"
                            to="-300 0"
                            dur="6.5s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* TOKENS OUT */}
            <div className="tokens-row">
              <div className="tokens-cell">
                <div className="vconn vconn-tok">
                  <span className="pulse-dot" />
                </div>
                <div className={`tokens-card ${activeStep === 4 ? "active" : ""}`}>
                  <span className="ico-circle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2.5l7 2.6v5.3c0 4.6-3 7.9-7 9.3-4-1.4-7-4.7-7-9.3V5.1l7-2.6z" />
                    </svg>
                  </span>
                  <div>
                    <div className="tok-title">TOKENS OUT</div>
                    <div className="tok-sub">ONE AT A TIME</div>
                  </div>
                  <span className="pips">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* INFO BAR */}
          <div className="info-bar">
            <div className="info-module">
              <span className="ico">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <path d="M13 3l-7 9.2h5.1L10.2 21l7-9.4h-5.1L13 3z" />
                </svg>
              </span>
              <span className="t">TWO POWER PROFILES</span>
            </div>
            <span className="divider" />
            <div className="info-module">
              <span className="ico">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 11a8 8 0 0 0-14.2-4" />
                  <path d="M4 4.5V8h3.5" />
                  <path d="M4 13a8 8 0 0 0 14.2 4" />
                  <path d="M20 19.5V16h-3.5" />
                </svg>
              </span>
              <span className="t">TWO REFRESH CYCLES</span>
            </div>
            <span className="divider" />
            <div className="info-module">
              <span className="ico">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="8.4" r="2.8" />
                  <path d="M3.6 19c0-3 2.4-5 5.4-5s5.4 2 5.4 5" />
                  <circle cx="16.6" cy="9" r="2.3" />
                  <path d="M15.2 14.2c2.5.3 4.3 2.3 4.3 4.8" />
                </svg>
              </span>
              <span className="t">VENDOR CHOSEN PER ROLE</span>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="summary-bar">
            <span className="ico-badge sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.8l7.5 4.2v9L12 20.2 4.5 16.1V7z" />
                <path d="M4.7 7.1L12 11.3l7.3-4.2" />
                <path d="M12 11.3V20" />
              </svg>
            </span>
            <span className="summary-text">
              ONE POD, TWO ROLES · TWO POWER PROFILES · TWO REFRESH CYCLES · VENDOR CHOSEN PER ROLE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
