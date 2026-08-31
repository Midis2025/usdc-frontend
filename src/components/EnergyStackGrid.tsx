"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   Shared colours & helpers
   ────────────────────────────────────────────────────────────────────────── */
const C = {
  line: "rgba(61,174,255,0.50)",
  lineBright: "rgba(61,174,255,0.72)",
  lineDim: "rgba(61,174,255,0.22)",
  lineVDim: "rgba(61,174,255,0.10)",
  fill: "rgba(4,7,15,0.93)",
  fillLighter: "rgba(14,18,28,0.85)",
  white8: "rgba(255,255,255,0.08)",
  white15: "rgba(255,255,255,0.15)",
  white25: "rgba(255,255,255,0.25)",
  dot: "rgba(61,174,255,0.90)",
  glow: "#3daeff",
};

function initCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const r = canvas.getBoundingClientRect();
  const w = r.width || 340; const h = r.height || 260;
  const d = window.devicePixelRatio || 1;
  canvas.width = w * d; canvas.height = h * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
  return { w, h };
}

/* Tiny helper: draw a dot with glow */
function glowDot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = C.dot;
  ctx.shadowColor = C.glow; ctx.shadowBlur = 7;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
}

/* ══════════════════════════════════════════════════════════════════════════
   1.  GENERATION ASSETS
   ══════════════════════════════════════════════════════════════════════════ */
function GenerationCanvas() {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const rainParticles = React.useMemo(() => {
    const W = 1500, H = 980;
    const COUNT = 40;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * W;
      const height = 6 + Math.random() * 22;
      const width = 0.8 + Math.random() * 1.2;
      const dur = 8 + Math.random() * 10;
      const delay = -Math.random() * dur;
      const maxOpacity = 0.05 + Math.random() * 0.10;
      particles.push({
        x: x.toFixed(1),
        y: (-height).toFixed(1),
        width: width.toFixed(1),
        height: height.toFixed(1),
        dur: dur.toFixed(2) + "s",
        begin: delay.toFixed(2) + "s",
        maxOpacity: maxOpacity.toFixed(3),
        to: H + 20,
      });
    }
    return particles;
  }, []);

  return (
    <div className="w-full h-[220px] relative overflow-hidden flex items-center justify-center select-none">
      <svg className="w-full h-full block" viewBox="0 0 1500 980" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow95_t" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow110_t" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="navyFill_t" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020a26" />
            <stop offset="100%" stopColor="#04123e" />
          </linearGradient>

          {/* Tower spine paths for energy particles */}
          <path id="towerPathLeft"
            d="M 380,720 L 400,560 L 420,420 L 440,290 L 460,200 L 470,150" fill="none" />
          <path id="towerPathRight"
            d="M 560,720 L 540,560 L 520,420 L 500,290 L 480,200 L 470,150" fill="none" />
          <path id="towerPathCenter"
            d="M 470,720 L 470,150" fill="none" />

          {/* Sub-X energy paths (zig-zag through new diagonal bracing) */}
          <path id="towerZigLeft"
            d="M 348,677 L 392,591 L 369,548 L 391,419 L 405,333 L 470,200" fill="none" />
          <path id="towerZigRight"
            d="M 592,677 L 548,591 L 571,548 L 549,419 L 535,333 L 470,200" fill="none" />

          {/* Shimmer paths along the cross arms */}
          <path id="lowerCrossPath" d="M 320,290 L 620,290" fill="none" />
          <path id="upperCrossPath" d="M 395,200 L 545,200" fill="none" />

          {/* Cable path */}
          <path id="cablePath"
            d="M 645,738 L 870,738 L 870,720 L 935,720" fill="none" />
        </defs>

        <style dangerouslySetInnerHTML={{
          __html: `
            /* Breathing glow on whole illustration */
            @keyframes breathe_t {
              0%, 100% { filter: url(#glow95_t); }
              50%      { filter: url(#glow110_t); }
            }
            .illustration_t {
              animation: breathe_t 5s ease-in-out infinite;
              transform-origin: center;
            }

            /* Lightning bolt pulse */
            @keyframes boltPulse_t {
              0%, 70%, 100% { opacity: 0.95; filter: drop-shadow(0 0 3px #4ab8ff); }
              35%           { opacity: 1;    filter: drop-shadow(0 0 12px #6cc8ff) drop-shadow(0 0 20px #4ab8ff); }
            }
            .bolt_t { animation: boltPulse_t 2.6s ease-in-out infinite; }

            @keyframes cabinetPulse_t {
              0%, 100% { opacity: 0.92; }
              50%      { opacity: 1; }
            }
            .cabinet_t { animation: cabinetPulse_t 2.6s ease-in-out infinite; }

            /* Cable dashed flow */
            @keyframes dashFlow_t { to { stroke-dashoffset: -40; } }
            .cable-dash_t { stroke-dasharray: 5 5; animation: dashFlow_t 2.2s linear infinite; }

            /* Reflection flicker */
            @keyframes reflectFlicker_t {
              0%, 100% { opacity: 0.22; }
              50%      { opacity: 0.34; }
            }
            .ground-reflect_t { animation: reflectFlicker_t 5s ease-in-out infinite; }

            /* Energy particle styles */
            .energy-dot_t {
              fill: #b8e6ff;
              filter: drop-shadow(0 0 3px #6cc8ff) drop-shadow(0 0 6px #4ab8ff);
            }
            .tower-spark_t {
              fill: #cce8ff;
              filter: drop-shadow(0 0 3px #6cc8ff) drop-shadow(0 0 6px #4ab8ff);
            }

            /* Intersection joints - emissive nodes */
            @keyframes nodePulse_t {
              0%, 100% { opacity: 0.45; }
              50%      { opacity: 0.95; }
            }
            .joint-node_t {
              animation: nodePulse_t 3.6s ease-in-out infinite;
            }
            .joint-stagger-1_t { animation-delay: -0.6s; }
            .joint-stagger-2_t { animation-delay: -1.2s; }
            .joint-stagger-3_t { animation-delay: -1.8s; }
            .joint-stagger-4_t { animation-delay: -2.4s; }

            /* Crossarm shimmer */
            .shimmer-dot_t {
              fill: #e8f6ff;
              filter: drop-shadow(0 0 4px #b8e6ff) drop-shadow(0 0 8px #6cc8ff);
            }
          `
        }} />

        {/* Background digital rain */}
        <g id="rain">
          {mounted && rainParticles.map((p, idx) => (
            <rect
              key={idx}
              x={p.x}
              y={p.y}
              width={p.width}
              height={p.height}
              fill="#4ab8ff"
              opacity="0"
              rx="0.5"
            >
              <animate
                attributeName="y"
                from={p.y}
                to={p.to}
                dur={p.dur}
                begin={p.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`0;${p.maxOpacity};${p.maxOpacity};0`}
                keyTimes="0;0.15;0.85;1"
                dur={p.dur}
                begin={p.begin}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>

        {/* Ground reflection */}
        <g className="ground-reflect_t">
          <ellipse cx="470" cy="760" rx="220" ry="4" fill="#2a7fd6" opacity="0.4" />
          <ellipse cx="1080" cy="760" rx="170" ry="4" fill="#2a7fd6" opacity="0.4" />
        </g>

        {/* Ground line */}
        <line x1="120" y1="752" x2="1380" y2="752"
          stroke="#3a7fc8" strokeWidth="1" opacity="0.6" />

        <g className="illustration_t">
          {/* Outer glow rails */}
          <g stroke="#2f6fbf" strokeWidth="3" opacity="0.35" fill="none" strokeLinecap="round">
            <line x1="412" y1="290" x2="340" y2="720" />
            <line x1="528" y1="290" x2="600" y2="720" />
            <line x1="320" y1="290" x2="620" y2="290" />
            <line x1="395" y1="200" x2="545" y2="200" />
            <line x1="438" y1="200" x2="412" y2="290" />
            <line x1="502" y1="200" x2="528" y2="290" />
            <line x1="465" y1="173" x2="438" y2="200" />
            <line x1="475" y1="173" x2="502" y2="200" />
          </g>

          {/* PRIMARY STRUCTURE */}
          <g stroke="#7fc7ff" strokeWidth="1.4" fill="none"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M 460,170 L 470,150 L 480,170 Z" />
            <line x1="470" y1="170" x2="470" y2="188" />
            <line x1="458" y1="156" x2="482" y2="156" strokeWidth="1" opacity="0.85" />
            <line x1="460" y1="160" x2="460" y2="170" strokeWidth="0.8" opacity="0.7" />
            <line x1="480" y1="160" x2="480" y2="170" strokeWidth="0.8" opacity="0.7" />

            <line x1="395" y1="200" x2="545" y2="200" />
            <line x1="395" y1="200" x2="395" y2="218" />
            <line x1="545" y1="200" x2="545" y2="218" />
            <line x1="390" y1="206" x2="400" y2="206" strokeWidth="0.9" />
            <line x1="540" y1="206" x2="550" y2="206" strokeWidth="0.9" />

            <line x1="465" y1="173" x2="438" y2="200" />
            <line x1="475" y1="173" x2="502" y2="200" />
            <line x1="438" y1="200" x2="465" y2="200" />
            <line x1="502" y1="200" x2="475" y2="200" />

            <line x1="438" y1="200" x2="475" y2="173" strokeWidth="0.9" opacity="0.8" />
            <line x1="502" y1="200" x2="465" y2="173" strokeWidth="0.9" opacity="0.8" />

            <line x1="438" y1="200" x2="412" y2="290" />
            <line x1="502" y1="200" x2="528" y2="290" />
            <line x1="432" y1="222" x2="508" y2="222" strokeWidth="0.9" opacity="0.8" />
            <line x1="425" y1="245" x2="515" y2="245" />
            <line x1="419" y1="267" x2="521" y2="267" strokeWidth="0.9" opacity="0.8" />

            <line x1="438" y1="200" x2="515" y2="245" strokeWidth="0.9" />
            <line x1="502" y1="200" x2="425" y2="245" strokeWidth="0.9" />
            <line x1="425" y1="245" x2="528" y2="290" strokeWidth="0.9" />
            <line x1="515" y1="245" x2="412" y2="290" strokeWidth="0.9" />

            <line x1="320" y1="290" x2="620" y2="290" />
            <line x1="320" y1="290" x2="320" y2="312" />
            <line x1="620" y1="290" x2="620" y2="312" />
            <line x1="320" y1="290" x2="340" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="360" y1="290" x2="340" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="360" y1="290" x2="380" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="400" y1="290" x2="380" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="400" y1="290" x2="412" y2="290" strokeWidth="0.9" opacity="0.85" />
            <line x1="528" y1="290" x2="540" y2="290" strokeWidth="0.9" opacity="0.85" />
            <line x1="540" y1="290" x2="560" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="580" y1="290" x2="560" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="580" y1="290" x2="600" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="620" y1="290" x2="600" y2="302" strokeWidth="0.9" opacity="0.85" />
            <line x1="320" y1="302" x2="412" y2="302" strokeWidth="0.8" opacity="0.75" />
            <line x1="528" y1="302" x2="620" y2="302" strokeWidth="0.8" opacity="0.75" />

            <line x1="412" y1="290" x2="340" y2="720" />
            <line x1="528" y1="290" x2="600" y2="720" />

            <line x1="398" y1="376" x2="542" y2="376" />
            <line x1="384" y1="462" x2="556" y2="462" />
            <line x1="369" y1="548" x2="571" y2="548" />
            <line x1="355" y1="634" x2="585" y2="634" />

            <line x1="412" y1="290" x2="542" y2="376" strokeWidth="1.2" />
            <line x1="528" y1="290" x2="398" y2="376" strokeWidth="1.2" />
            <line x1="398" y1="376" x2="556" y2="462" strokeWidth="1.2" />
            <line x1="542" y1="376" x2="384" y2="462" strokeWidth="1.2" />
            <line x1="384" y1="462" x2="571" y2="548" strokeWidth="1.2" />
            <line x1="556" y1="462" x2="369" y2="548" strokeWidth="1.2" />
            <line x1="369" y1="548" x2="585" y2="634" strokeWidth="1.2" />
            <line x1="571" y1="548" x2="355" y2="634" strokeWidth="1.2" />
            <line x1="355" y1="634" x2="600" y2="720" strokeWidth="1.2" />
            <line x1="585" y1="634" x2="340" y2="720" strokeWidth="1.2" />
          </g>

          {/* Sub-bracing details */}
          <g stroke="#5ab0ff" strokeWidth="0.9" fill="none" opacity="0.85"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="405" y1="333" x2="535" y2="333" />
            <line x1="412" y1="290" x2="535" y2="333" />
            <line x1="528" y1="290" x2="405" y2="333" />
            <line x1="405" y1="333" x2="542" y2="376" />
            <line x1="535" y1="333" x2="398" y2="376" />

            <line x1="391" y1="419" x2="549" y2="419" />
            <line x1="398" y1="376" x2="549" y2="419" />
            <line x1="542" y1="376" x2="391" y2="419" />
            <line x1="391" y1="419" x2="556" y2="462" />
            <line x1="549" y1="419" x2="384" y2="462" />

            <line x1="378" y1="505" x2="562" y2="505" />
            <line x1="384" y1="462" x2="562" y2="505" />
            <line x1="556" y1="462" x2="378" y2="505" />
            <line x1="378" y1="505" x2="571" y2="548" />
            <line x1="562" y1="505" x2="369" y2="548" />

            <line x1="362" y1="591" x2="578" y2="591" />
            <line x1="369" y1="548" x2="578" y2="591" />
            <line x1="571" y1="548" x2="362" y2="591" />
            <line x1="362" y1="591" x2="585" y2="634" />
            <line x1="578" y1="591" x2="355" y2="634" />

            <line x1="348" y1="677" x2="592" y2="677" />
            <line x1="355" y1="634" x2="592" y2="677" />
            <line x1="585" y1="634" x2="348" y2="677" />
            <line x1="348" y1="677" x2="600" y2="720" />
            <line x1="592" y1="677" x2="340" y2="720" />
          </g>

          {/* Center stiffeners */}
          <g stroke="#4a98e0" strokeWidth="0.7" fill="none" opacity="0.6">
            <line x1="470" y1="290" x2="470" y2="333" />
            <line x1="470" y1="333" x2="470" y2="376" />
            <line x1="470" y1="376" x2="470" y2="419" />
            <line x1="470" y1="419" x2="470" y2="462" />
            <line x1="470" y1="462" x2="470" y2="505" />
            <line x1="470" y1="505" x2="470" y2="548" />
            <line x1="470" y1="548" x2="470" y2="591" />
            <line x1="470" y1="591" x2="470" y2="634" />
            <line x1="470" y1="634" x2="470" y2="677" />
            <line x1="470" y1="677" x2="470" y2="720" />
          </g>

          {/* Gusset plates */}
          <g>
            <g fill="#0b1f5c" stroke="#7fc7ff" strokeWidth="0.7">
              <polygon points="398,372 404,376 398,380 392,376" />
              <polygon points="542,372 548,376 542,380 536,376" />
              <polygon points="384,458 390,462 384,466 378,462" />
              <polygon points="556,458 562,462 556,466 550,462" />
              <polygon points="369,544 375,548 369,552 363,548" />
              <polygon points="571,544 577,548 571,552 565,548" />
              <polygon points="355,630 361,634 355,638 349,634" />
              <polygon points="585,630 591,634 585,638 579,634" />
              <polygon points="340,716 346,720 340,724 334,720" />
              <polygon points="600,716 606,720 600,724 594,720" />
              <polygon points="412,286 418,290 412,294 406,290" />
              <polygon points="528,286 534,290 528,294 522,290" />
            </g>
            <g fill="#9fd8ff">
              <circle cx="396" cy="376" r="0.7" /><circle cx="400" cy="376" r="0.7" />
              <circle cx="540" cy="376" r="0.7" /><circle cx="544" cy="376" r="0.7" />
              <circle cx="382" cy="462" r="0.7" /><circle cx="386" cy="462" r="0.7" />
              <circle cx="554" cy="462" r="0.7" /><circle cx="558" cy="462" r="0.7" />
              <circle cx="367" cy="548" r="0.7" /><circle cx="371" cy="548" r="0.7" />
              <circle cx="569" cy="548" r="0.7" /><circle cx="573" cy="548" r="0.7" />
              <circle cx="353" cy="634" r="0.7" /><circle cx="357" cy="634" r="0.7" />
              <circle cx="583" cy="634" r="0.7" /><circle cx="587" cy="634" r="0.7" />
              <circle cx="338" cy="720" r="0.7" /><circle cx="342" cy="720" r="0.7" />
              <circle cx="598" cy="720" r="0.7" /><circle cx="602" cy="720" r="0.7" />
              <circle cx="410" cy="290" r="0.7" /><circle cx="414" cy="290" r="0.7" />
              <circle cx="526" cy="290" r="0.7" /><circle cx="530" cy="290" r="0.7" />
            </g>
            <g fill="#0b1f5c" stroke="#7fc7ff" strokeWidth="0.7">
              <polygon points="320,286 326,290 320,294 314,290" />
              <polygon points="620,286 626,290 620,294 614,290" />
              <polygon points="395,196 399,200 395,204 391,200" />
              <polygon points="545,196 549,200 545,204 541,200" />
            </g>
          </g>

          {/* Insulator strings */}
          <g stroke="#7fc7ff" strokeWidth="0.9" fill="#020a26" strokeLinecap="round">
            <rect x="316" y="312" width="8" height="4" rx="1" fill="#0b1f5c" />
            <ellipse cx="320" cy="320" rx="5" ry="2.2" />
            <ellipse cx="320" cy="326" rx="5" ry="2.2" />
            <ellipse cx="320" cy="332" rx="5" ry="2.2" />
            <ellipse cx="320" cy="338" rx="5" ry="2.2" />
            <ellipse cx="320" cy="344" rx="5" ry="2.2" />
            <ellipse cx="320" cy="350" rx="5" ry="2.2" />
            <ellipse cx="320" cy="356" rx="5" ry="2.2" />
            <rect x="313" y="360" width="14" height="5" rx="1.5" fill="#0b1f5c" />
            <line x1="306" y1="365" x2="334" y2="365" strokeWidth="1.2" />
          </g>
          <g stroke="#7fc7ff" strokeWidth="0.9" fill="#020a26" strokeLinecap="round">
            <rect x="616" y="312" width="8" height="4" rx="1" fill="#0b1f5c" />
            <ellipse cx="620" cy="320" rx="5" ry="2.2" />
            <ellipse cx="620" cy="326" rx="5" ry="2.2" />
            <ellipse cx="620" cy="332" rx="5" ry="2.2" />
            <ellipse cx="620" cy="338" rx="5" ry="2.2" />
            <ellipse cx="620" cy="344" rx="5" ry="2.2" />
            <ellipse cx="620" cy="350" rx="5" ry="2.2" />
            <ellipse cx="620" cy="356" rx="5" ry="2.2" />
            <rect x="613" y="360" width="14" height="5" rx="1.5" fill="#0b1f5c" />
            <line x1="606" y1="365" x2="634" y2="365" strokeWidth="1.2" />
          </g>

          <g stroke="#7fc7ff" strokeWidth="0.8" fill="#0b1f5c" strokeLinecap="round">
            <rect x="392" y="218" width="6" height="3" rx="1" />
            <ellipse cx="395" cy="225" rx="3.5" ry="1.8" fill="#020a26" />
            <ellipse cx="395" cy="230" rx="3.5" ry="1.8" fill="#020a26" />
            <ellipse cx="395" cy="235" rx="3.5" ry="1.8" fill="#020a26" />
            <rect x="390" y="238" width="10" height="3.5" rx="1" />
            <rect x="542" y="218" width="6" height="3" rx="1" />
            <ellipse cx="545" cy="225" rx="3.5" ry="1.8" fill="#020a26" />
            <ellipse cx="545" cy="230" rx="3.5" ry="1.8" fill="#020a26" />
            <ellipse cx="545" cy="235" rx="3.5" ry="1.8" fill="#020a26" />
            <rect x="540" y="238" width="10" height="3.5" rx="1" />
          </g>

          <g stroke="#7fc7ff" strokeWidth="1.4" fill="url(#navyFill_t)" strokeLinejoin="round">
            <rect x="320" y="720" width="78" height="22" rx="2" />
            <rect x="542" y="720" width="78" height="22" rx="2" />
          </g>
          <g fill="#9fd8ff">
            <circle cx="328" cy="731" r="0.9" /><circle cx="390" cy="731" r="0.9" />
            <circle cx="550" cy="731" r="0.9" /><circle cx="612" cy="731" r="0.9" />
          </g>

          <g stroke="#9fd8ff" strokeWidth="0.4" fill="none" opacity="0.55">
            <line x1="412" y1="290" x2="340" y2="720" />
            <line x1="528" y1="290" x2="600" y2="720" />
          </g>

          {/* EMISSIVE NODES */}
          <g fill="#b8e6ff">
            <circle className="joint-node_t" cx="470" cy="333" r="1.7" />
            <circle className="joint-node_t joint-stagger-1_t" cx="470" cy="419" r="1.7" />
            <circle className="joint-node_t joint-stagger-2_t" cx="470" cy="505" r="1.7" />
            <circle className="joint-node_t joint-stagger-3_t" cx="470" cy="591" r="1.7" />
            <circle className="joint-node_t joint-stagger-4_t" cx="470" cy="677" r="1.7" />
            <circle className="joint-node_t joint-stagger-2_t" cx="470" cy="311" r="1.1" />
            <circle className="joint-node_t joint-stagger-3_t" cx="470" cy="355" r="1.1" />
            <circle className="joint-node_t joint-stagger-1_t" cx="470" cy="397" r="1.1" />
            <circle className="joint-node_t joint-stagger-4_t" cx="470" cy="441" r="1.1" />
            <circle className="joint-node_t joint-stagger-2_t" cx="470" cy="483" r="1.1" />
            <circle className="joint-node_t joint-stagger-1_t" cx="470" cy="527" r="1.1" />
            <circle className="joint-node_t joint-stagger-3_t" cx="470" cy="569" r="1.1" />
            <circle className="joint-node_t joint-stagger-4_t" cx="470" cy="613" r="1.1" />
            <circle className="joint-node_t joint-stagger-2_t" cx="470" cy="655" r="1.1" />
            <circle className="joint-node_t joint-stagger-1_t" cx="470" cy="699" r="1.1" />
            <circle className="joint-node_t" cx="470" cy="155" r="1.4" />
            <circle className="joint-node_t joint-stagger-2_t" cx="320" cy="290" r="1.4" />
            <circle className="joint-node_t joint-stagger-3_t" cx="620" cy="290" r="1.4" />
            <circle className="joint-node_t joint-stagger-1_t" cx="395" cy="200" r="1.2" />
            <circle className="joint-node_t joint-stagger-4_t" cx="545" cy="200" r="1.2" />
          </g>

          {/* Cable */}
          <g>
            <path d="M 620,738 L 870,738 L 870,720 L 935,720"
              stroke="#7fc7ff" strokeWidth="1.5" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
            <path className="cable-dash_t"
              d="M 620,738 L 870,738 L 870,720 L 935,720"
              stroke="#b8e6ff" strokeWidth="1.2" fill="none"
              strokeLinecap="round" opacity="0.85" />
            <rect x="930" y="712" width="14" height="16" rx="2"
              fill="url(#navyFill_t)" stroke="#7fc7ff" strokeWidth="1.2" />
          </g>

          {/* Cabinet */}
          <g className="cabinet_t">
            <path d="M 1180,470 L 1198,460 L 1198,738 L 1180,748 Z"
              fill="url(#navyFill_t)" stroke="#7fc7ff" strokeWidth="1.4" />
            <line x1="1188" y1="475" x2="1188" y2="730"
              stroke="#5ab0ff" strokeWidth="0.8" opacity="0.7" />
            <rect x="940" y="470" width="240" height="278" rx="8"
              fill="url(#navyFill_t)" stroke="#7fc7ff" strokeWidth="1.6" />
            <rect x="966" y="496" width="188" height="226" rx="5"
              fill="#030f33" stroke="#5ab0ff" strokeWidth="1.2" />
            <path className="bolt_t"
              d="M 1078,520 L 1030,610 L 1058,610 L 1042,690 L 1098,592 L 1066,592 L 1086,520 Z"
              fill="#4ab8ff" stroke="#b8e6ff" strokeWidth="1.1"
              strokeLinejoin="round" />
          </g>
        </g>

        {/* Energy sparks */}
        <g>
          <circle className="tower-spark_t" r="2.6">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="0s">
              <mpath href="#towerPathLeft" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="2.2">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="-1.0s">
              <mpath href="#towerPathLeft" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="2.4">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="-2.0s">
              <mpath href="#towerPathLeft" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="2.6">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="-0.5s">
              <mpath href="#towerPathRight" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="2.2">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="-1.6s">
              <mpath href="#towerPathRight" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="2.4">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="-2.6s">
              <mpath href="#towerPathRight" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="2" opacity="0.75">
            <animateMotion dur="4s" repeatCount="indefinite" begin="-0.8s">
              <mpath href="#towerPathCenter" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="1.8" opacity="0.75">
            <animateMotion dur="4s" repeatCount="indefinite" begin="-2.4s">
              <mpath href="#towerPathCenter" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="1.8" opacity="0.85">
            <animateMotion dur="5s" repeatCount="indefinite" begin="0s">
              <mpath href="#towerZigLeft" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="1.8" opacity="0.85">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-2.5s">
              <mpath href="#towerZigLeft" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="1.8" opacity="0.85">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-1.2s">
              <mpath href="#towerZigRight" /></animateMotion>
          </circle>
          <circle className="tower-spark_t" r="1.8" opacity="0.85">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-3.7s">
              <mpath href="#towerZigRight" /></animateMotion>
          </circle>
        </g>

        {/* Crossbar shimmer */}
        <g>
          <circle className="shimmer-dot_t" r="2.2">
            <animateMotion dur="3.4s" repeatCount="indefinite" begin="0s">
              <mpath href="#lowerCrossPath" /></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0"
              keyTimes="0;0.1;0.9;1" dur="3.4s" repeatCount="indefinite" />
          </circle>
          <circle className="shimmer-dot_t" r="2.2">
            <animateMotion dur="3.4s" repeatCount="indefinite" begin="-1.7s">
              <mpath href="#lowerCrossPath" /></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0"
              keyTimes="0;0.1;0.9;1" dur="3.4s" begin="-1.7s" repeatCount="indefinite" />
          </circle>
          <circle className="shimmer-dot_t" r="1.8">
            <animateMotion dur="3s" repeatCount="indefinite" begin="-0.8s">
              <mpath href="#upperCrossPath" /></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0"
              keyTimes="0;0.1;0.9;1" dur="3s" begin="-0.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Cable energy dots */}
        <g>
          <circle className="energy-dot_t" r="3">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
              <mpath href="#cablePath" /></animateMotion>
          </circle>
          <circle className="energy-dot_t" r="2.6">
            <animateMotion dur="3s" repeatCount="indefinite" begin="-0.6s">
              <mpath href="#cablePath" /></animateMotion>
          </circle>
          <circle className="energy-dot_t" r="2.8">
            <animateMotion dur="3s" repeatCount="indefinite" begin="-1.2s">
              <mpath href="#cablePath" /></animateMotion>
          </circle>
          <circle className="energy-dot_t" r="2.4">
            <animateMotion dur="3s" repeatCount="indefinite" begin="-1.8s">
              <mpath href="#cablePath" /></animateMotion>
          </circle>
          <circle className="energy-dot_t" r="2.6">
            <animateMotion dur="3s" repeatCount="indefinite" begin="-2.4s">
              <mpath href="#cablePath" /></animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   2.  TRANSFORMATION
   ══════════════════════════════════════════════════════════════════════════ */
function TransformationCanvas() {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const rainParticles = React.useMemo(() => {
    const W = 1500, H = 980;
    const COUNT = 36;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * W;
      const height = 8 + Math.random() * 22;
      const width = 1 + Math.random() * 1.2;
      const dur = 7 + Math.random() * 9;
      const delay = -Math.random() * dur;
      const maxOpacity = 0.06 + Math.random() * 0.10;
      particles.push({
        x: x.toFixed(1),
        y: (-height).toFixed(1),
        width: width.toFixed(1),
        height: height.toFixed(1),
        dur: dur.toFixed(2) + "s",
        begin: delay.toFixed(2) + "s",
        maxOpacity: maxOpacity.toFixed(3),
        to: H + 20,
      });
    }
    return particles;
  }, []);

  return (
    <div className="w-full h-[220px] relative overflow-hidden flex items-center justify-center select-none">
      <svg className="w-full h-full block" viewBox="0 0 1500 980" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Glow filters for the breathing effect */}
          <filter id="glow95" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow110" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dark navy gradient fills */}
          <linearGradient id="navyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020a26" />
            <stop offset="100%" stopColor="#04123e" />
          </linearGradient>

          <radialGradient id="fanCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0b1f5c" />
            <stop offset="100%" stopColor="#020a26" />
          </radialGradient>

          {/* Path the energy particles will travel along (power module -> cooling unit) */}
          <path id="flowPath"
            d="M 1075,580 L 1175,580 L 1175,300 L 870,300 L 870,420 L 840,420"
            fill="none" />
        </defs>

        <style dangerouslySetInnerHTML={{
          __html: `
            /* ===== Background digital rain ===== */
            .rain-particle {
              fill: #4ab8ff;
              opacity: 0;
            }

            /* ===== Neon glow breathing on the whole unit ===== */
            @keyframes breathe {
              0%, 100% { filter: url(#glow95); }
              50%      { filter: url(#glow110); }
            }
            .cooling-unit {
              animation: breathe 4.5s ease-in-out infinite;
              transform-origin: center;
            }

            /* ===== Fan rotation ===== */
            @keyframes spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            .fan-blades {
              transform-box: fill-box;
              transform-origin: center;
              animation: spin 4s linear infinite;
            }

            /* ===== Lightning pulse ===== */
            @keyframes boltPulse {
              0%, 70%, 100% { opacity: 0.95; filter: drop-shadow(0 0 4px #4ab8ff); }
              35%           { opacity: 1;    filter: drop-shadow(0 0 14px #6cc8ff) drop-shadow(0 0 22px #4ab8ff); }
            }
            .bolt {
              animation: boltPulse 2.6s ease-in-out infinite;
            }

            /* ===== Power module subtle outer pulse ===== */
            @keyframes modulePulse {
              0%, 100% { opacity: 0.9; }
              50%      { opacity: 1; }
            }
            .power-module-outer {
              animation: modulePulse 2.6s ease-in-out infinite;
            }

            /* ===== Reflection flicker ===== */
            @keyframes reflectFlicker {
              0%, 100% { opacity: 0.28; }
              40%      { opacity: 0.38; }
              65%      { opacity: 0.22; }
            }
            .ground-reflect {
              animation: reflectFlicker 4.5s ease-in-out infinite;
            }

            /* ===== Dashed connector flow ===== */
            @keyframes dashFlow {
              to { stroke-dashoffset: -40; }
            }
            .connector {
              stroke-dasharray: 6 6;
              animation: dashFlow 2.4s linear infinite;
            }

            /* ===== Energy particles in pipeline ===== */
            .energy-dot {
              fill: #b8e6ff;
              filter: drop-shadow(0 0 4px #6cc8ff) drop-shadow(0 0 8px #4ab8ff);
            }
          `
        }} />

        {/* ===== Background digital rain ===== */}
        <g id="rain">
          {mounted && rainParticles.map((p, idx) => (
            <rect
              key={idx}
              x={p.x}
              y={p.y}
              width={p.width}
              height={p.height}
              fill="#4ab8ff"
              opacity="0"
              rx="0.5"
            >
              <animate
                attributeName="y"
                from={p.y}
                to={p.to}
                dur={p.dur}
                begin={p.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`0;${p.maxOpacity};${p.maxOpacity};0`}
                keyTimes="0;0.15;0.85;1"
                dur={p.dur}
                begin={p.begin}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>

        {/* ===== Ground line ===== */}
        <line x1="120" y1="780" x2="1380" y2="780"
          stroke="#1e4a8a" strokeWidth="1" opacity="0.55" />

        {/* ===== Ground reflection (soft mirrored glow under units) ===== */}
        <g className="ground-reflect">
          <ellipse cx="540" cy="788" rx="380" ry="6" fill="#2a7fd6" opacity="0.35" />
          <ellipse cx="1115" cy="788" rx="120" ry="4" fill="#2a7fd6" opacity="0.35" />
        </g>

        {/* =====================================================
             COOLING UNIT (left, large)
             ===================================================== */}
        <g className="cooling-unit">
          {/* Top handles */}
          <rect x="260" y="245" width="60" height="22" rx="4"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.6" />
          <rect x="740" y="245" width="60" height="22" rx="4"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.6" />

          {/* Rear shadow body (slight offset to suggest depth) */}
          <rect x="232" y="278" width="822" height="402" rx="14"
            fill="#020a26" stroke="#2a6bbf" strokeWidth="1.2" opacity="0.7" />

          {/* Main body */}
          <rect x="220" y="270" width="820" height="400" rx="14"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="2.2" />

          {/* Inner recessed panel */}
          <rect x="252" y="306" width="756" height="328" rx="10"
            fill="#030f33" stroke="#5ab0ff" strokeWidth="1.6" />

          {/* ====== Left Fan ====== */}
          <g transform="translate(440,470)">
            {/* Outer ring */}
            <circle r="128" fill="url(#fanCore)" stroke="#7fc7ff" strokeWidth="2.2" />
            <circle r="118" fill="none" stroke="#5ab0ff" strokeWidth="1" opacity="0.8" />
            {/* Blades */}
            <g className="fan-blades">
              {/* 4 curved blades, each a teardrop/petal */}
              <g fill="#1f7be0" stroke="#7fc7ff" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M 0,0 C 20,-30 60,-60 95,-55 C 70,-30 35,-10 0,0 Z" />
                <path d="M 0,0 C 30,20 60,60 55,95 C 30,70 10,35 0,0 Z" />
                <path d="M 0,0 C -20,30 -60,60 -95,55 C -70,30 -35,10 0,0 Z" />
                <path d="M 0,0 C -30,-20 -60,-60 -55,-95 C -30,-70 -10,-35 0,0 Z" />
              </g>
              {/* Hub */}
              <circle r="16" fill="#0b1f5c" stroke="#7fc7ff" strokeWidth="1.8" />
              <circle r="6" fill="#7fc7ff" />
            </g>
          </g>

          {/* ====== Right Fan ====== */}
          <g transform="translate(820,470)">
            <circle r="128" fill="url(#fanCore)" stroke="#7fc7ff" strokeWidth="2.2" />
            <circle r="118" fill="none" stroke="#5ab0ff" strokeWidth="1" opacity="0.8" />
            <g className="fan-blades" style={{ animationDuration: "4s" }}>
              <g fill="#1f7be0" stroke="#7fc7ff" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M 0,0 C 20,-30 60,-60 95,-55 C 70,-30 35,-10 0,0 Z" />
                <path d="M 0,0 C 30,20 60,60 55,95 C 30,70 10,35 0,0 Z" />
                <path d="M 0,0 C -20,30 -60,60 -95,55 C -70,30 -35,10 0,0 Z" />
                <path d="M 0,0 C -30,-20 -60,-60 -55,-95 C -30,-70 -10,-35 0,0 Z" />
              </g>
              <circle r="16" fill="#0b1f5c" stroke="#7fc7ff" strokeWidth="1.8" />
              <circle r="6" fill="#7fc7ff" />
            </g>
          </g>

          {/* Feet */}
          <rect x="278" y="670" width="40" height="36" rx="3"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.6" />
          <rect x="942" y="670" width="40" height="36" rx="3"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.6" />
        </g>

        {/* =====================================================
             CONNECTOR / PIPELINE
             ===================================================== */}
        <g>
          {/* Bottom horizontal segment (enters cooling unit at right side, low) */}
          <path className="connector"
            d="M 1040,580 L 1175,580"
            stroke="#7fc7ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.95" />
          {/* Vertical segment up */}
          <path className="connector"
            d="M 1175,580 L 1175,300"
            stroke="#7fc7ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.95"
            style={{ animationDelay: "-0.6s" }} />
          {/* Top horizontal segment (over) */}
          <path className="connector"
            d="M 1175,300 L 870,300"
            stroke="#7fc7ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.95"
            style={{ animationDelay: "-1.2s" }} />
          {/* Drop down into top of cooling unit */}
          <path className="connector"
            d="M 870,300 L 870,272"
            stroke="#7fc7ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.95"
            style={{ animationDelay: "-1.8s" }} />
        </g>

        {/* ===== Energy particles riding the connector ===== */}
        <g id="energyParticles">
          <circle className="energy-dot" r="3.5">
            <animateMotion dur="3.6s" repeatCount="indefinite" rotate="0" begin="0s">
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
          <circle className="energy-dot" r="3">
            <animateMotion dur="3.6s" repeatCount="indefinite" rotate="0" begin="-0.6s">
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
          <circle className="energy-dot" r="3.5">
            <animateMotion dur="3.6s" repeatCount="indefinite" rotate="0" begin="-1.2s">
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
          <circle className="energy-dot" r="2.8">
            <animateMotion dur="3.6s" repeatCount="indefinite" rotate="0" begin="-1.8s">
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
          <circle className="energy-dot" r="3.2">
            <animateMotion dur="3.6s" repeatCount="indefinite" rotate="0" begin="-2.4s">
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
          <circle className="energy-dot" r="3">
            <animateMotion dur="3.6s" repeatCount="indefinite" rotate="0" begin="-3.0s">
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
        </g>

        {/* =====================================================
             POWER MODULE (right, small)
             ===================================================== */}
        <g className="power-module-outer">
          {/* Rear stacked layers (suggest depth) */}
          <rect x="1228" y="498" width="148" height="148" rx="8"
            fill="#020a26" stroke="#2a6bbf" strokeWidth="1.2" opacity="0.55" />
          <rect x="1218" y="490" width="148" height="148" rx="8"
            fill="#020a26" stroke="#2a6bbf" strokeWidth="1.2" opacity="0.75" />

          {/* Side handles */}
          <rect x="1196" y="540" width="14" height="36" rx="3"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.4" />
          <rect x="1356" y="540" width="14" height="36" rx="3"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.4" />

          {/* Main module body */}
          <rect x="1208" y="482" width="148" height="148" rx="8"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="2.2" />

          {/* Inner recessed panel */}
          <rect x="1224" y="498" width="116" height="116" rx="5"
            fill="#030f33" stroke="#5ab0ff" strokeWidth="1.4" />

          {/* Lightning bolt */}
          <path className="bolt"
            d="M 1290,510 L 1262,562 L 1280,562 L 1272,602 L 1304,548 L 1284,548 L 1294,510 Z"
            fill="#4ab8ff" stroke="#b8e6ff" strokeWidth="1.2" strokeLinejoin="round" />

          {/* Feet */}
          <rect x="1226" y="630" width="14" height="14" rx="2"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.2" />
          <rect x="1324" y="630" width="14" height="14" rx="2"
            fill="url(#navyFill)" stroke="#7fc7ff" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   3.  COMPUTE DELIVERY
   ══════════════════════════════════════════════════════════════════════════ */
function ComputeDeliveryCanvas() {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const rainParticles = React.useMemo(() => {
    const W = 1500, H = 980;
    const COUNT = 38;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * W;
      const height = 6 + Math.random() * 22;
      const width = 0.8 + Math.random() * 1.2;
      const dur = 8 + Math.random() * 10;
      const delay = -Math.random() * dur;
      const maxOpacity = 0.05 + Math.random() * 0.10;
      particles.push({
        x: x.toFixed(1),
        y: (-height).toFixed(1),
        width: width.toFixed(1),
        height: height.toFixed(1),
        dur: dur.toFixed(2) + "s",
        begin: delay.toFixed(2) + "s",
        maxOpacity: maxOpacity.toFixed(3),
        to: H + 20,
      });
    }
    return particles;
  }, []);

  const RACKS = [
    { x: 380, cls: "rack-1" },
    { x: 650, cls: "rack-2" },
    { x: 920, cls: "rack-3" }
  ];

  const MODULE_SLOTS = [215, 305, 395, 485];
  const PSU_TOP = 580;
  const PSU_BOTTOM = 690;
  const MOD_W = 170;
  const MOD_H = 86;

  const BLINK_CLASSES = ["blink-a", "blink-b", "blink-c", "blink-d"];
  const ACTIVITY_DURS = [2.2, 2.6, 2.4, 2.8, 3.0];
  const MAIN_LED_DELAYS = [0, -0.4, -0.8, -1.2, -1.6, -2.0, -2.4];

  return (
    <div className="w-full h-[220px] relative overflow-hidden flex items-center justify-center select-none">
      <svg className="w-full h-full block" viewBox="0 0 1500 980" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow95_s" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow110_s" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="cabinetFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020a26" />
            <stop offset="100%" stopColor="#040f3a" />
          </linearGradient>

          <linearGradient id="moduleFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020824" />
            <stop offset="100%" stopColor="#030d30" />
          </linearGradient>
        </defs>

        <style dangerouslySetInnerHTML={{
          __html: `
            /* Whole-illustration breathing */
            @keyframes breathe_s {
              0%, 100% { filter: url(#glow95_s); }
              50%      { filter: url(#glow110_s); }
            }
            .illustration_s {
              animation: breathe_s 5s ease-in-out infinite;
            }

            /* Per-rack subtle pulse */
            @keyframes rackPulse_s {
              0%, 100% { opacity: 0.96; }
              50%      { opacity: 1; }
            }
            .rack-1 { animation: rackPulse_s 4.4s ease-in-out infinite; }
            .rack-2 { animation: rackPulse_s 4.4s ease-in-out -1.5s infinite; }
            .rack-3 { animation: rackPulse_s 4.4s ease-in-out -3.0s infinite; }

            /* Reflection flicker */
            @keyframes reflectFlicker_s {
              0%, 100% { opacity: 0.22; }
              50%      { opacity: 0.36; }
            }
            .ground-reflect_s { animation: reflectFlicker_s 5s ease-in-out infinite; }

            /* ===== LED blink ===== */
            @keyframes blinkA_s {
              0%, 45%, 100% { opacity: 1; }
              50%, 55%      { opacity: 0.25; }
            }
            @keyframes blinkB_s {
              0%, 100% { opacity: 1; }
              20%, 30% { opacity: 0.3; }
              70%      { opacity: 0.6; }
            }
            @keyframes blinkC_s {
              0%, 100% { opacity: 0.95; }
              33%, 38% { opacity: 0.2; }
              66%, 70% { opacity: 0.5; }
            }
            @keyframes blinkD_s {
              0%, 100% { opacity: 1; }
              50%, 60% { opacity: 0.35; }
            }
            .blink-a { animation: blinkA_s 2.4s ease-in-out infinite; }
            .blink-b { animation: blinkB_s 3.1s ease-in-out infinite; }
            .blink-c { animation: blinkC_s 2.7s ease-in-out infinite; }
            .blink-d { animation: blinkD_s 3.5s ease-in-out infinite; }

            /* ===== Main LED slow pulse ===== */
            @keyframes mainPulse_s {
              0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 2px #6cc8ff); }
              50%      { opacity: 1;    filter: drop-shadow(0 0 5px #b8e6ff) drop-shadow(0 0 10px #6cc8ff); }
            }
            .main-led { animation: mainPulse_s 2.6s ease-in-out infinite; }

            /* ===== Activity bar ===== */
            @keyframes activityFlow_s { to { stroke-dashoffset: -90; } }
            .activity-flow {
              stroke-dasharray: 14 76;
              animation: activityFlow_s 2.4s linear infinite;
            }
          `
        }} />

        {/* Background digital rain */}
        <g id="rain">
          {mounted && rainParticles.map((p, idx) => (
            <rect
              key={idx}
              x={p.x}
              y={p.y}
              width={p.width}
              height={p.height}
              fill="#4ab8ff"
              opacity="0"
              rx="0.5"
            >
              <animate
                attributeName="y"
                from={p.y}
                to={p.to}
                dur={p.dur}
                begin={p.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`0;${p.maxOpacity};${p.maxOpacity};0`}
                keyTimes="0;0.15;0.85;1"
                dur={p.dur}
                begin={p.begin}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>

        {/* Ground reflection band */}
        <g className="ground-reflect_s">
          <ellipse cx="480" cy="775" rx="120" ry="4" fill="#2a7fd6" opacity="0.45" />
          <ellipse cx="750" cy="775" rx="120" ry="4" fill="#2a7fd6" opacity="0.45" />
          <ellipse cx="1020" cy="775" rx="120" ry="4" fill="#2a7fd6" opacity="0.45" />
          <ellipse cx="750" cy="778" rx="450" ry="2" fill="#2a7fd6" opacity="0.25" />
        </g>

        {/* Ground line */}
        <line x1="200" y1="772" x2="1300" y2="772"
          stroke="#3a7fc8" strokeWidth="1" opacity="0.55" />

        <g className="illustration_s">
          {/* Outer halo layer */}
          <g stroke="#2f6fbf" strokeWidth="3" opacity="0.35" fill="none">
            <rect x="380" y="200" width="200" height="540" rx="10" />
            <rect x="650" y="200" width="200" height="540" rx="10" />
            <rect x="920" y="200" width="200" height="540" rx="10" />
          </g>

          {/* Racks cabinets */}
          <g id="racksContainer">
            {RACKS.map((rack, rackIdx) => (
              <g key={rackIdx} className={rack.cls}>
                {/* Rear depth layer */}
                <rect x={rack.x + 4} y="204" width="200" height="540" rx="10"
                  fill="#020824" stroke="#2a6bbf" strokeWidth="0.9" opacity="0.55" />

                {/* Main cabinet body */}
                <rect x={rack.x} y="200" width="200" height="540" rx="10"
                  fill="url(#cabinetFill)" stroke="#7fc7ff" strokeWidth="1.8" />

                {/* Inner highlight outline */}
                <rect x={rack.x + 4} y="204" width="192" height="532" rx="8"
                  fill="none" stroke="#9fd8ff" strokeWidth="0.5" opacity="0.6" />

                {/* Corner mounting rail markers */}
                <g fill="#9fd8ff">
                  <circle cx={rack.x + 8} cy="208" r="0.9" />
                  <circle cx={rack.x + 192} cy="208" r="0.9" />
                  <circle cx={rack.x + 8} cy="732" r="0.9" />
                  <circle cx={rack.x + 192} cy="732" r="0.9" />
                </g>

                {/* Feet */}
                <rect x={rack.x + 18} y="740" width="22" height="14" rx="2"
                  fill="url(#cabinetFill)" stroke="#7fc7ff" strokeWidth="1.2" />
                <rect x={rack.x + 160} y="740" width="22" height="14" rx="2"
                  fill="url(#cabinetFill)" stroke="#7fc7ff" strokeWidth="1.2" />

                {/* PSU / Bottom panel */}
                {(() => {
                  const psuX = rack.x + 15;
                  return (
                    <g>
                      <rect x={psuX} y={PSU_TOP} width={MOD_W} height={PSU_BOTTOM - PSU_TOP} rx="3"
                        fill="url(#moduleFill)" stroke="#5ab0ff" strokeWidth="1.1" />
                      <rect x={psuX + 3} y={PSU_TOP + 3} width={MOD_W - 6} height={PSU_BOTTOM - PSU_TOP - 6} rx="2"
                        fill="none" stroke="#7fc7ff" strokeWidth="0.5" opacity="0.6" />
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line key={i} x1={psuX + 30} y1={PSU_TOP + 22 + i * 10}
                          x2={psuX + MOD_W - 30} y2={PSU_TOP + 22 + i * 10}
                          stroke="#3a7fc8" strokeWidth="0.7" opacity="0.7" />
                      ))}
                      <rect x={psuX + 10} y={PSU_TOP + 30} width="6" height="32" rx="1"
                        fill="#020a26" stroke="#5ab0ff" strokeWidth="0.6" />
                      <rect x={psuX + MOD_W - 16} y={PSU_TOP + 30} width="6" height="32" rx="1"
                        fill="#020a26" stroke="#5ab0ff" strokeWidth="0.6" />
                      <circle cx={psuX + 14} cy={PSU_TOP + 12} r="1.1"
                        fill="#5cc4ff" className={`blink-${["a", "b", "c", "d"][rackIdx % 4]}`} opacity="0.85" />
                      <g fill="#7fc7ff">
                        <circle cx={psuX + 4} cy={PSU_TOP + 4} r="0.7" />
                        <circle cx={psuX + MOD_W - 4} cy={PSU_TOP + 4} r="0.7" />
                        <circle cx={psuX + 4} cy={PSU_BOTTOM - 4} r="0.7" />
                        <circle cx={psuX + MOD_W - 4} cy={PSU_BOTTOM - 4} r="0.7" />
                      </g>
                    </g>
                  );
                })()}

                {/* 4 Active Server Modules */}
                {MODULE_SLOTS.map((slotY, slotIdx) => {
                  const mx = rack.x + 15;
                  const my = slotY;
                  const globalModIdx = rackIdx * 4 + slotIdx;

                  const blinkA = BLINK_CLASSES[(globalModIdx + 0) % 4];
                  const blinkB = BLINK_CLASSES[(globalModIdx + 1) % 4];
                  const blinkC = BLINK_CLASSES[(globalModIdx + 2) % 4];
                  const blinkD = BLINK_CLASSES[(globalModIdx + 3) % 4];
                  const actDur = ACTIVITY_DURS[globalModIdx % ACTIVITY_DURS.length];
                  const actDelay = -(globalModIdx * 0.37) % actDur;
                  const mainDelay = MAIN_LED_DELAYS[globalModIdx % MAIN_LED_DELAYS.length];

                  return (
                    <g key={slotIdx} transform={`translate(${mx}, ${my})`}>
                      <rect x="0" y="0" width={MOD_W} height={MOD_H} rx="3"
                        fill="url(#moduleFill)" stroke="#5ab0ff" strokeWidth="1.1" />
                      <rect x="2.5" y="2.5" width={MOD_W - 5} height={MOD_H - 5} rx="2"
                        fill="none" stroke="#7fc7ff" strokeWidth="0.45" opacity="0.55" />

                      <g>
                        <rect x="7" y="8" width="34" height="20" rx="1.5"
                          fill="#020a26" stroke="#7fc7ff" strokeWidth="0.6" />
                        <circle cx="12" cy="18" r="1.3" fill="#5cc4ff" className={blinkA} />
                        <line x1="17" y1="18" x2="37" y2="18" stroke="#3a7fc8" strokeWidth="0.5" />

                        <rect x="7" y="33" width="34" height="20" rx="1.5"
                          fill="#020a26" stroke="#7fc7ff" strokeWidth="0.6" />
                        <circle cx="12" cy="43" r="1.3" fill="#5cc4ff" className={blinkB} />
                        <line x1="17" y1="43" x2="37" y2="43" stroke="#3a7fc8" strokeWidth="0.5" />

                        <rect x="7" y="58" width="34" height="20" rx="1.5"
                          fill="#020a26" stroke="#7fc7ff" strokeWidth="0.6" />
                        <circle cx="12" cy="68" r="1.3" fill="#5cc4ff" className={blinkC} />
                        <line x1="17" y1="68" x2="37" y2="68" stroke="#3a7fc8" strokeWidth="0.5" />
                      </g>

                      <g>
                        <circle cx="55" cy="43" r="4.6" fill="#020a26" stroke="#5ab0ff" strokeWidth="0.6" />
                        <circle cx="55" cy="43" r="3.8" fill="#3a8fdc" className="main-led"
                          style={{ animationDelay: `${mainDelay}s` }} />
                        <circle cx="55" cy="43" r="1.6" fill="#cce8ff" opacity="0.95" />

                        <line x1="63" y1="43" x2="145" y2="43"
                          stroke="#284e85" strokeWidth="1.6" strokeLinecap="round" />
                        <line x1="63" y1="43" x2="145" y2="43"
                          stroke="#7fc7ff" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
                        <line x1="63" y1="43" x2="145" y2="43"
                          stroke="#e8f6ff" strokeWidth="1.5" strokeLinecap="round"
                          className="activity-flow"
                          style={{
                            strokeDasharray: "14 76",
                            animation: `activityFlow_s ${actDur}s linear ${actDelay}s infinite`
                          }} />

                        <g stroke="#5ab0ff" strokeWidth="0.5" opacity="0.55">
                          <line x1="80" y1="40" x2="80" y2="46" />
                          <line x1="100" y1="40" x2="100" y2="46" />
                          <line x1="120" y1="40" x2="120" y2="46" />
                          <line x1="140" y1="40" x2="140" y2="46" />
                        </g>
                      </g>

                      <g>
                        <g fill="#5ab0ff" opacity="0.65">
                          <circle cx="152" cy="10" r="0.7" /><circle cx="156" cy="10" r="0.7" />
                          <circle cx="160" cy="10" r="0.7" /><circle cx="164" cy="10" r="0.7" />
                          <circle cx="152" cy="14" r="0.7" /><circle cx="156" cy="14" r="0.7" />
                          <circle cx="160" cy="14" r="0.7" /><circle cx="164" cy="14" r="0.7" />
                          <circle cx="152" cy="18" r="0.7" /><circle cx="156" cy="18" r="0.7" />
                          <circle cx="160" cy="18" r="0.7" /><circle cx="164" cy="18" r="0.7" />
                          <circle cx="152" cy="22" r="0.7" /><circle cx="156" cy="22" r="0.7" />
                          <circle cx="160" cy="22" r="0.7" /><circle cx="164" cy="22" r="0.7" />
                        </g>

                        <rect x="150" y="58" width="6" height="3.5" rx="0.5"
                          fill="#020a26" stroke="#5ab0ff" strokeWidth="0.4" />
                        <rect x="158" y="58" width="6" height="3.5" rx="0.5"
                          fill="#020a26" stroke="#5ab0ff" strokeWidth="0.4" />
                        <rect x="150" y="64" width="6" height="3.5" rx="0.5"
                          fill="#020a26" stroke="#5ab0ff" strokeWidth="0.4" />
                        <rect x="158" y="64" width="6" height="3.5" rx="0.5"
                          fill="#020a26" stroke="#5ab0ff" strokeWidth="0.4" />

                        <circle cx="153" cy="74" r="1.8"
                          fill="#020a26" stroke="#5ab0ff" strokeWidth="0.5" />
                        <circle cx="153" cy="74" r="0.7" fill="#5cc4ff" className={blinkD} />
                        <circle cx="161" cy="74" r="1.8"
                          fill="#020a26" stroke="#5ab0ff" strokeWidth="0.5" />
                        <circle cx="161" cy="74" r="0.7" fill="#5cc4ff" className={blinkB} />

                        <circle cx="50" cy="9" r="0.9" fill="#5cc4ff" className={blinkA} />
                        <circle cx="60" cy="9" r="0.9" fill="#5cc4ff" className={blinkC} />
                        <circle cx="70" cy="9" r="0.9" fill="#5cc4ff" className={blinkD} />
                      </g>

                      <g stroke="#3a7fc8" strokeWidth="0.35" opacity="0.45" fill="none">
                        <path d="M 48,76 L 48,72 L 56,72 L 56,76" />
                        <path d="M 90,76 L 90,72 L 110,72 L 110,76" />
                        <circle cx="48" cy="76" r="0.4" fill="#5ab0ff" />
                        <circle cx="110" cy="76" r="0.4" fill="#5ab0ff" />
                      </g>

                      <g fill="#7fc7ff">
                        <circle cx="4" cy="4" r="0.7" />
                        <circle cx={MOD_W - 4} cy="4" r="0.7" />
                        <circle cx="4" cy={MOD_H - 4} r="0.7" />
                        <circle cx={MOD_W - 4} cy={MOD_H - 4} r="0.7" />
                      </g>
                    </g>
                  );
                })}

                {/* Inter-module rising energy pulse */}
                {(() => {
                  const pulseX = rack.x + 100;
                  return (
                    <g>
                      <circle cx={pulseX} cy="690" r="1.6" fill="#b8e6ff"
                        filter="drop-shadow(0 0 3px #6cc8ff)" opacity="0">
                        <animate attributeName="cy" from="690" to="210"
                          dur="5s" begin={`${-rackIdx * 1.6}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity"
                          values="0;0.95;0.95;0" keyTimes="0;0.15;0.85;1"
                          dur="5s" begin={`${-rackIdx * 1.6}s`} repeatCount="indefinite" />
                      </circle>
                      <circle cx={pulseX + 6} cy="690" r="1.2" fill="#b8e6ff"
                        filter="drop-shadow(0 0 3px #6cc8ff)" opacity="0">
                        <animate attributeName="cy" from="690" to="210"
                          dur="5s" begin={`${-rackIdx * 1.6 - 2.5}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity"
                          values="0;0.8;0.8;0" keyTimes="0;0.15;0.85;1"
                          dur="5s" begin={`${-rackIdx * 1.6 - 2.5}s`} repeatCount="indefinite" />
                      </circle>
                    </g>
                  );
                })()}
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   MAIN WRAPPER
   ══════════════════════════════════════════════════════════════════════════ */
export default function EnergyStackGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const columns = [
    {
      badge: "LAYER 1",
      title: "GENERATION ASSETS",
      image: "/22436f29-6646-4d55-b640-19acab77a480.avif",
      desc: "Owned power generation secures our foundation, shielding operations from market volatility and eliminating utility-queue bottlenecks.",
      bullets: [
        "Natural gas & renewable integration",
        "80MW+ base capacity scaling to 400MW+",
        "Insulated from grid pricing spikes",
        "Modular generator expansion capabilities"
      ]
    },
    {
      badge: "LAYER 2",
      title: "TRANSFORMATION",
      image: "/57048f4a-139a-4c81-9e0e-14b22ead6b8f.avif",
      desc: "Strategic substation control provides the high-voltage gateway necessary for rapid, large-scale data center deployment.",
      bullets: [
        "Direct high-voltage grid interconnection",
        "Redundant transformer architecture",
        "Tier III equivalent reliability path",
        "Optimized transmission line efficiency"
      ]
    },
    {
      badge: "LAYER 3",
      title: "COMPUTE DELIVERY",
      image: "/0e6cdac0-a098-4935-8894-58c66ebff51a.avif",
      desc: "We convert raw energy into the highest-margin output: compute-ready capacity optimized for intensive AI workloads.",
      bullets: [
        "High-density rack power architecture",
        "Advanced liquid cooling readiness",
        "Maximized compute-per-megawatt ratio",
        "Flexible colocation & bare-metal deployment"
      ]
    }
  ];

  return (
    <section className="w-full bg-[#04070f] py-12 md:py-16 border-t border-white/[0.03]">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">

        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
          <span className="text-[10px] font-semibold text-white/90 tracking-[0.25em] uppercase font-sans">
            ENERGY STACK LAYERS
          </span>
        </div>

        {/* Centered Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-[52px] lg:text-[52px] font-extrabold tracking-wide text-white mb-6 font-sans text-center max-w-[1000px] leading-[1.1] uppercase">
          Powering Compute <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3daeff] to-blue-500">
            From The Ground Up.
          </span>
        </h2>

        {/* Muted Subdescription */}
        <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[780px] text-center mb-16 font-sans">
          In the high-density computing era, energy is the ultimate currency. We don&apos;t just secure power,<br />
          we generate it, transform it and deliver it to the rack with unmatched efficiency and scale.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1160px] mx-auto">
          {columns.map((col, i) => {
            return (
              <div
                key={col.title}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setActiveIndex(activeIndex === i ? null : i);
                  }
                }}
                className={`relative group overflow-hidden h-[480px] flex flex-col justify-between border border-white/[0.08] hover:border-[#0091ff]/30 rounded-2xl bg-[#02050c]/25 transition-all duration-500 hover:shadow-[0_4px_30px_rgba(0,145,255,0.06)] ${activeIndex === i ? 'shadow-[0_8px_40px_rgba(61,174,255,0.06)]' : ''}`}
              >
                {/* Upper Half: Header & Image */}
                <div className="flex flex-col justify-between h-[370px] w-full">
                  <div className="p-8 pb-3 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff] mb-3 group-hover:opacity-0 transition-opacity duration-300">
                      {col.title}
                    </h3>
                  </div>
                  <div className="w-full flex-1 flex items-center justify-center relative transition-all duration-[4000ms] ease-out group-hover:scale-[0.88] group-hover:-translate-y-8 px-8 pb-8">
                    <div className="absolute w-[60%] h-[60%] rounded-full bg-blue-500/[0.02] blur-[40px] pointer-events-none" />
                    <div className="relative w-full h-[260px] rounded-lg overflow-hidden bg-[#02050c]/40">
                      <Image
                        src={col.image}
                        alt={col.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile toggle button: visible only on small screens */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(activeIndex === i ? null : i);
                  }}
                  aria-expanded={activeIndex === i}
                  className={`md:hidden absolute bottom-4 right-4 z-30 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-[12px] font-bold text-white/80 hover:bg-[#3daeff]/8 transition-colors ${activeIndex === i ? 'hidden' : ''}`}
                >
                  {activeIndex === i ? "Close" : "Details"}
                </button>

                {/* Sliding Drawer */}
                <div className={`absolute inset-0 w-full h-full pt-5 ${activeIndex === i ? 'pb-20' : 'pb-8'} px-8 md:px-10 bg-[#02050c]/98 border-t border-white/[0.08] transition-all duration-[4000ms] ease-out ${activeIndex === i ? 'translate-y-0' : 'translate-y-[calc(100%-110px)]'} group-hover:translate-y-0 z-20 flex flex-col justify-start`}>
                  <div className={`absolute top-8 left-8 md:left-10 right-8 ${activeIndex === i ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-[4000ms] ease-out`}>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff]">{col.title}</h3>
                  </div>
                  <div className={`w-8 h-[2px] bg-white/10 rounded-full mx-auto mb-4 transition-colors duration-[4000ms] ease-out flex-shrink-0 ${activeIndex === i ? 'bg-[#3daeff]/40' : 'group-hover:bg-[#3daeff]/40'}`} />
                  <div className={`relative overflow-y-auto max-h-[300px] mt-0 ${activeIndex === i ? 'mt-16 pb-6' : ''} group-hover:mt-16 transition-all duration-[4000ms] ease-out pr-1`}>
                    <p className={`text-[13px] md:text-sm text-white/50 leading-[1.65] font-normal transition-colors duration-300 mb-6 ${activeIndex === i ? 'text-white/80' : 'group-hover:text-white/80'}`}>{col.desc}</p>
                    <ul className={`space-y-3.5 text-xs text-white/45 font-sans ${activeIndex === i ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-[4000ms] ease-out delay-100`}>
                      {col.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#3daeff] mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute top-[86px] left-0 right-0 h-6 bg-gradient-to-t from-[#02050c] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
