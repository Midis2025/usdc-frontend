"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════ Card 1: Isometric Grid with Glow Cube ═══════════════ */
interface IsometricCubeProps {
  i: number;
  j: number;
  w?: number;
  h?: number;
  colorType: "glow" | "outline";
  className?: string;
}

function IsometricCube({ i, j, w = 18, h = 22, colorType, className = "" }: IsometricCubeProps) {
  // Calculate node coordinates
  const cx = 100 + (i - j) * 20;
  const cy = 80 + (i + j - 4) * 10;

  // Project vertices
  const dx = w * 0.866;
  const dy = w * 0.5;

  const BC = { x: cx, y: cy };
  const BL = { x: cx - dx, y: cy - dy };
  const BR = { x: cx + dx, y: cy - dy };
  const BT = { x: cx, y: cy - w };

  const TC = { x: cx, y: cy - h };
  const TL = { x: cx - dx, y: cy - dy - h };
  const TR = { x: cx + dx, y: cy - dy - h };
  const TT = { x: cx, y: cy - w - h };

  if (colorType === "glow") {
    return (
      <g className={className}>
        {/* Left face */}
        <polygon
          points={`${BC.x},${BC.y} ${BL.x},${BL.y} ${TL.x},${TL.y} ${TC.x},${TC.y}`}
          fill="url(#cube-left)"
          stroke="#0072ff"
          strokeWidth="0.5"
        />
        {/* Right face */}
        <polygon
          points={`${BC.x},${BC.y} ${BR.x},${BR.y} ${TR.x},${TR.y} ${TC.x},${TC.y}`}
          fill="url(#cube-right)"
          stroke="#0091ff"
          strokeWidth="0.5"
        />
        {/* Top face */}
        <polygon
          points={`${TC.x},${TC.y} ${TR.x},${TR.y} ${TT.x},${TT.y} ${TL.x},${TL.y}`}
          fill="url(#cube-top)"
          stroke="#45b6ff"
          strokeWidth="0.5"
        />
      </g>
    );
  } else {
    return (
      <g className={className}>
        {/* Left face */}
        <polygon
          points={`${BC.x},${BC.y} ${BL.x},${BL.y} ${TL.x},${TL.y} ${TC.x},${TC.y}`}
          fill="rgba(6, 12, 28, 0.75)"
          stroke="rgba(0, 145, 255, 0.6)"
          strokeWidth="1"
        />
        {/* Right face */}
        <polygon
          points={`${BC.x},${BC.y} ${BR.x},${BR.y} ${TR.x},${TR.y} ${TC.x},${TC.y}`}
          fill="rgba(6, 12, 28, 0.6)"
          stroke="rgba(0, 145, 255, 0.6)"
          strokeWidth="1"
        />
        {/* Top face */}
        <polygon
          points={`${TC.x},${TC.y} ${TR.x},${TR.y} ${TT.x},${TT.y} ${TL.x},${TL.y}`}
          fill="rgba(6, 12, 28, 0.65)"
          stroke="rgba(0, 145, 255, 0.75)"
          strokeWidth="1"
        />
      </g>
    );
  }
}

function IsometricPowerGrid() {
  const getCoords = (i: number, j: number) => {
    return {
      x: 100 + (i - j) * 20,
      y: 80 + (i + j - 4) * 10,
    };
  };

  const gridLines = [];
  for (let k = 0; k < 5; k++) {
    // Line in Direction A
    const startA = getCoords(k, 0);
    const endA = getCoords(k, 4);
    gridLines.push(
      <line
        key={`a-${k}`}
        x1={startA.x}
        y1={startA.y}
        x2={endA.x}
        y2={endA.y}
        stroke="rgba(0, 145, 255, 0.18)"
        strokeWidth="0.75"
        className="animate-draw-line"
        style={{ animationDelay: `${k * 100}ms` }}
      />
    );

    // Line in Direction B
    const startB = getCoords(0, k);
    const endB = getCoords(4, k);
    gridLines.push(
      <line
        key={`b-${k}`}
        x1={startB.x}
        y1={startB.y}
        x2={endB.x}
        y2={endB.y}
        stroke="rgba(0, 145, 255, 0.18)"
        strokeWidth="0.75"
        className="animate-draw-line"
        style={{ animationDelay: `${(k + 5) * 100}ms` }}
      />
    );
  }

  const nodes = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const { x, y } = getCoords(i, j);
      nodes.push(
        <circle
          key={`node-${i}-${j}`}
          cx={x}
          cy={y}
          r="1.5"
          fill="#0091ff"
          className="animate-pulse-node"
          style={{ animationDelay: `${(i + j) * 150}ms` }}
        />
      );
    }
  }

  return (
    <svg className="w-full h-full" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Custom CSS Animation Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes drawLine {
            from { stroke-dasharray: 100; stroke-dashoffset: 100; opacity: 0; }
            to { stroke-dasharray: 100; stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes floatCentral {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes pulseNode {
            0%, 100% { opacity: 0.4; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes pulseCentralGlow {
            0%, 100% { opacity: 0.65; filter: drop-shadow(0 0 4px rgba(0, 145, 255, 0.4)); }
            50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(0, 145, 255, 0.85)); }
          }
          .animate-draw-line {
            animation: drawLine 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-pulse-node {
            transform-origin: center;
            animation: pulseNode 3s ease-in-out infinite;
          }
          .animate-float-central {
            transform-origin: 100px 80px;
            animation: floatCentral 4s ease-in-out infinite;
          }
          .animate-pulse-glow {
            animation: pulseCentralGlow 3s ease-in-out infinite;
          }
        `}} />

        {/* Glow effect for central cube */}
        <filter id="cube-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Blue gradients */}
        <linearGradient id="cube-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#45b6ff" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>
        <linearGradient id="cube-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0066e0" />
          <stop offset="100%" stopColor="#003b8a" />
        </linearGradient>
        <linearGradient id="cube-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0088ff" />
          <stop offset="100%" stopColor="#0055c7" />
        </linearGradient>
      </defs>

      {/* ── Grid Lines ── */}
      <g>{gridLines}</g>

      {/* ── Vertical Dotted Shaft Lines ── */}
      <g stroke="rgba(0, 145, 255, 0.45)" strokeWidth="0.8" strokeDasharray="2,2">
        {/* From top-most grid node (0, 0) up */}
        <line x1="100" y1="40" x2="100" y2="15" />
        {/* From left-rear grid node (0, 3) down */}
        <line x1="40" y1="70" x2="40" y2="115" />
        {/* From right-rear grid node (3, 1) down */}
        <line x1="140" y1="80" x2="140" y2="125" />
        {/* From bottom-front grid node (4, 3) down */}
        <line x1="120" y1="110" x2="120" y2="155" />
      </g>

      {/* ── Grid Intersection Nodes ── */}
      <g>{nodes}</g>

      {/* ── Outline Wireframe Cubes ── */}
      <IsometricCube i={0} j={3} colorType="outline" />
      <IsometricCube i={3} j={1} colorType="outline" />
      <IsometricCube i={2} j={4} colorType="outline" />

      {/* ── Central Glowing Solid Blue Cube with floating animation ── */}
      <g className="animate-pulse-glow">
        <IsometricCube i={2} j={2} colorType="glow" className="animate-float-central" />
      </g>
    </svg>
  );
}

/* ═══════════════ Card 2: Traditional deployment bar ═══════════════ */
function TraditionalBar() {
  return (
    <svg className="w-full h-4" viewBox="0 0 320 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="handle-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Tick Marks (approx 34 ticks) */}
      {Array.from({ length: 34 }).map((_, idx) => {
        const x = 5 + idx * 8.5;
        // Fade out ticks that overlap with chevron
        if (x > 295) return null;
        return (
          <rect
            key={idx}
            x={x}
            y={4}
            width={1.5}
            height={5}
            rx={0.75}
            fill="currentColor"
            className="text-white/20"
          />
        );
      })}

      {/* Arrow/Chevron at the very right */}
      <path
        d="M305 3.5 L309 6.5 L305 9.5"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bright Glowing handle at ~12% width */}
      <g filter="url(#handle-glow)">
        <circle cx="36" cy="6.5" r="4.5" fill="#3daeff" />
        <circle cx="36" cy="6.5" r="1.5" fill="#ffffff" />
      </g>
    </svg>
  );
}

/* ═══════════════ Card 3: Advanced Cooling Concentric Circles ═══════════════ */
function AdvancedCoolingWaves() {
  return (
    <svg className="w-full h-[120px]" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes spinCW3 {
            from { transform: translate(200px, 110px) rotate(0deg); }
            to { transform: translate(200px, 110px) rotate(360deg); }
          }
          @keyframes spinCCW3 {
            from { transform: translate(200px, 110px) rotate(360deg); }
            to { transform: translate(200px, 110px) rotate(0deg); }
          }
          .animate-spin-cw-slow3 {
            animation: spinCW3 28s linear infinite;
          }
          .animate-spin-cw-fast3 {
            animation: spinCW3 18s linear infinite;
          }
          .animate-spin-ccw3 {
            animation: spinCCW3 22s linear infinite;
          }
        `}} />
      </defs>

      {/* Static Concentric Circles (always centered at 200, 110) */}
      <circle cx="200" cy="110" r="30" stroke="rgba(61,174,255,0.55)" strokeWidth="1.2" />
      <circle cx="200" cy="110" r="48" stroke="rgba(61,174,255,0.4)" strokeWidth="1.2" />

      {/* Circle 3 Group: Dashed circle (rotating clockwise) with dots */}
      <g className="animate-spin-cw-slow3">
        <circle cx="0" cy="0" r="66" stroke="rgba(61,174,255,0.3)" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="0" cy="-66" r="2" fill="#3daeff" />
        <circle cx="0" cy="66" r="2" fill="#3daeff" />
      </g>

      {/* Circle 4 Group: Dashed circle (rotating counter-clockwise) with dots */}
      <g className="animate-spin-ccw3">
        <circle cx="0" cy="0" r="86" stroke="rgba(61,174,255,0.22)" strokeWidth="1.2" strokeDasharray="4,4" />
        <circle cx="-86" cy="0" r="2" fill="#3daeff" />
        <g filter="url(#dot-glow)">
          <circle cx="60.8" cy="60.8" r="4" fill="#3daeff" />
          <circle cx="60.8" cy="60.8" r="1.5" fill="#ffffff" />
        </g>
      </g>

      {/* Circle 5 Group: Dashed outermost circle (rotating clockwise) with dots */}
      <g className="animate-spin-cw-fast3">
        <circle cx="0" cy="0" r="106" stroke="rgba(61,174,255,0.12)" strokeWidth="1.5" strokeDasharray="5,5" />
        <g filter="url(#dot-glow)">
          <circle cx="0" cy="-106" r="5" fill="#3daeff" />
          <circle cx="0" cy="-106" r="1.8" fill="#ffffff" />
        </g>
        <g filter="url(#dot-glow)">
          <circle cx="-75" cy="75" r="5" fill="#3daeff" />
          <circle cx="-75" cy="75" r="1.8" fill="#ffffff" />
        </g>
        <circle cx="91.8" cy="-53" r="2" fill="#3daeff" />
      </g>
    </svg>
  );
}

/* ═══════════════ Card 4: AI Optimized – Reference-Matched 3D Cube Model ═══════════════ */
function IsometricCubeStack() {
  return (
    <div className="ai-cube-model-wrapper">
      <svg
        className="ai-cube-model-svg"
        viewBox="0 0 400 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style dangerouslySetInnerHTML={{
            __html: `
            /* ─── Master Scene Float ─── */
            @keyframes aiSceneFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25%      { transform: translateY(-6px) rotate(0.8deg); }
              50%      { transform: translateY(-10px) rotate(0deg); }
              75%      { transform: translateY(-6px) rotate(-0.8deg); }
            }
            /* ─── Upper wireframe independent levitation ─── */
            @keyframes aiUpperFloat {
              0%, 100% { transform: translateY(0px); }
              30%      { transform: translateY(-4px); }
              60%      { transform: translateY(-7px); }
              80%      { transform: translateY(-3px); }
            }
            /* ─── Solid cube glow pulse ─── */
            @keyframes aiSolidPulse {
              0%, 100% { filter: drop-shadow(0 0 6px rgba(0,140,255,0.4)) drop-shadow(0 0 20px rgba(0,100,255,0.15)); }
              50%      { filter: drop-shadow(0 0 14px rgba(0,160,255,0.7)) drop-shadow(0 0 35px rgba(0,120,255,0.3)); }
            }
            /* ─── Wireframe edge glow pulse ─── */
            @keyframes aiWireGlow {
              0%, 100% { stroke-opacity: 0.45; filter: drop-shadow(0 0 2px rgba(0,150,255,0.2)); }
              50%      { stroke-opacity: 0.75; filter: drop-shadow(0 0 6px rgba(0,160,255,0.5)); }
            }
            /* ─── Data stream dots falling ─── */
            @keyframes aiDataFall {
              0%   { transform: translateY(-30px); opacity: 0; }
              10%  { opacity: 1; }
              85%  { opacity: 0.8; }
              100% { transform: translateY(40px); opacity: 0; }
            }
            /* ─── Grid energy pulse radiating outward ─── */
            @keyframes aiGridRadiate {
              0%   { stroke-opacity: 0.12; }
              15%  { stroke-opacity: 0.35; }
              100% { stroke-opacity: 0.12; }
            }
            /* ─── Grid border pulse ─── */
            @keyframes aiGridBorderPulse {
              0%, 100% { stroke-opacity: 0.35; stroke-width: 1.2; }
              50%      { stroke-opacity: 0.6; stroke-width: 1.6; }
            }
            /* ─── Inner cross lines breath ─── */
            @keyframes aiCrossBreath {
              0%, 100% { stroke-opacity: 0.12; }
              50%      { stroke-opacity: 0.28; }
            }
            /* ─── Mid wireframe section breath ─── */
            @keyframes aiMidWireBreath {
              0%, 100% { stroke-opacity: 0.3; }
              50%      { stroke-opacity: 0.55; }
            }
            /* ─── Data line dot glow pulse ─── */
            @keyframes aiDotPulse {
              0%, 100% { r: 3; opacity: 0.7; }
              50%      { r: 4; opacity: 1; }
            }

            .ai-scene-float      { animation: aiSceneFloat 6s cubic-bezier(0.45,0.05,0.55,0.95) infinite; transform-origin: center center; }
            .ai-upper-float       { animation: aiUpperFloat 5s cubic-bezier(0.45,0.05,0.55,0.95) infinite; animation-delay: 0.8s; }
            .ai-solid-pulse       { animation: aiSolidPulse 3.5s ease-in-out infinite; }
            .ai-wire-glow         { animation: aiWireGlow 4s ease-in-out infinite; }
            .ai-data-fall         { animation: aiDataFall 2.8s linear infinite; }
            .ai-grid-radiate      { animation: aiGridRadiate 4s ease-out infinite; }
            .ai-grid-border-pulse { animation: aiGridBorderPulse 5s ease-in-out infinite; }
            .ai-cross-breath      { animation: aiCrossBreath 4.5s ease-in-out infinite; }
            .ai-mid-wire-breath   { animation: aiMidWireBreath 4s ease-in-out infinite; }
            .ai-dot-pulse         { animation: aiDotPulse 2s ease-in-out infinite; }

            /* ─── Hover state via parent wrapper ─── */
            .ai-cube-model-wrapper {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .ai-cube-model-svg {
              width: 100%;
              height: 210px;
              transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
            }
            .ai-cube-model-wrapper:hover .ai-cube-model-svg {
              transform: scale(1.04);
              filter: brightness(1.15);
            }
          `}} />

          {/* Glow filters */}
          <filter id="ai4-bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feGaussianBlur stdDeviation="8" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ai4-softglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="bl" />
            <feComposite in="SourceGraphic" in2="bl" operator="over" />
          </filter>
          <filter id="ai4-dotglow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="bl" />
            <feComposite in="SourceGraphic" in2="bl" operator="over" />
          </filter>
          <filter id="ai4-wireglow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="bl" />
            <feComposite in="SourceGraphic" in2="bl" operator="over" />
          </filter>

          {/* Solid cube face gradients */}
          <linearGradient id="ai4-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5ec5ff" />
            <stop offset="50%" stopColor="#2196F3" />
            <stop offset="100%" stopColor="#0d7de8" />
          </linearGradient>
          <linearGradient id="ai4-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1565C0" />
            <stop offset="100%" stopColor="#0a3d7a" />
          </linearGradient>
          <linearGradient id="ai4-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E88E5" />
            <stop offset="100%" stopColor="#0d5cb8" />
          </linearGradient>

          {/* Grid floor gradient */}
          <radialGradient id="ai4-gridglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(30,136,229,0.12)" />
            <stop offset="100%" stopColor="rgba(30,136,229,0)" />
          </radialGradient>
        </defs>

        {/* ═══════════ ENTIRE SCENE GROUP (floating) ═══════════ */}
        <g className="ai-scene-float">

          {/* ══════════════ ISOMETRIC GRID FLOOR ══════════════ */}
          {(() => {
            /* Isometric grid: diamond shape, matching reference proportions */
            const ox = 200, oy = 290;           // grid center
            const ux = 22, uy = 11;             // iso unit vectors
            const N = 6;                         // grid subdivisions
            const elems: React.ReactElement[] = [];

            /* Subtle radial glow under grid */
            elems.push(
              <ellipse key="gridglow" cx={ox} cy={oy} rx={N * ux + 10} ry={N * uy + 10}
                fill="url(#ai4-gridglow)" opacity="0.6" />
            );

            /* Grid lines along both iso axes */
            for (let i = 0; i <= N; i++) {
              // Lines parallel to j-axis (left-leaning)
              const x1 = ox + (i) * ux - 0 * ux;
              const y1 = oy + (i) * uy - 0 * uy;      // start at j=0
              const x2 = ox + (i) * ux - N * ux;
              const y2 = oy + (i) * uy - N * (-uy);    // but iso: j moves left
              // Proper iso: along j-axis => subtract ux, add uy per step
              const ax1 = ox + i * ux;
              const ay1 = oy - i * uy;
              const ax2 = ox + i * ux - N * ux;
              const ay2 = oy - i * uy + N * uy;

              const bx1 = ox - i * ux;
              const by1 = oy + i * uy;
              const bx2 = ox - i * ux + N * ux;
              const by2 = oy + i * uy - N * uy;

              elems.push(
                <line key={`ga${i}`} x1={ax1} y1={ay1} x2={ax2} y2={ay2}
                  stroke="rgba(30,136,229,0.22)" strokeWidth="0.7"
                  className="ai-grid-radiate"
                  style={{ animationDelay: `${i * 300}ms` }} />,
                <line key={`gb${i}`} x1={bx1} y1={by1} x2={bx2} y2={by2}
                  stroke="rgba(30,136,229,0.22)" strokeWidth="0.7"
                  className="ai-grid-radiate"
                  style={{ animationDelay: `${(i + N) * 300}ms` }} />
              );
            }

            /* Diamond border */
            const top = { x: ox, y: oy - N * uy };
            const right = { x: ox + N * ux, y: oy };
            const bottom = { x: ox, y: oy + N * uy };
            const left = { x: ox - N * ux, y: oy };
            elems.push(
              <polygon key="gridborder"
                points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`}
                fill="none" stroke="rgba(30,136,229,0.4)" strokeWidth="1.2"
                className="ai-grid-border-pulse" />
            );

            /* Inner cross lines on grid (connecting midpoints) */
            elems.push(
              <line key="crossH" x1={left.x} y1={left.y} x2={right.x} y2={right.y}
                stroke="rgba(30,136,229,0.15)" strokeWidth="0.5" className="ai-cross-breath" />,
              <line key="crossV" x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y}
                stroke="rgba(30,136,229,0.15)" strokeWidth="0.5" className="ai-cross-breath" />
            );

            return <g>{elems}</g>;
          })()}


          {/* ══════════════ LOWER WIREFRAME FRAMEWORK (around solid cube, integrated with grid) ══════════════ */}
          {(() => {
            const cx = 200, cy = 235;
            const hw = 40, hiso = 20, ht = 55;
            const col = "rgba(30,136,229,0.4)";

            // Bottom diamond (sits on grid)
            const BF = [cx, cy];
            const BL = [cx - hw, cy - hiso];
            const BR = [cx + hw, cy - hiso];
            const BB = [cx, cy - 2 * hiso];

            // Top diamond
            const TF = [cx, cy - ht];
            const TL = [cx - hw, cy - hiso - ht];
            const TR = [cx + hw, cy - hiso - ht];
            const TB = [cx, cy - 2 * hiso - ht];

            return (
              <g stroke={col} strokeWidth="1" fill="none" className="ai-mid-wire-breath"
                filter="url(#ai4-wireglow)">
                {/* Bottom diamond */}
                <polygon points={`${BF[0]},${BF[1]} ${BL[0]},${BL[1]} ${BB[0]},${BB[1]} ${BR[0]},${BR[1]}`} />
                {/* Top diamond */}
                <polygon points={`${TF[0]},${TF[1]} ${TL[0]},${TL[1]} ${TB[0]},${TB[1]} ${TR[0]},${TR[1]}`} />
                {/* 4 vertical edges */}
                <line x1={BF[0]} y1={BF[1]} x2={TF[0]} y2={TF[1]} />
                <line x1={BL[0]} y1={BL[1]} x2={TL[0]} y2={TL[1]} />
                <line x1={BR[0]} y1={BR[1]} x2={TR[0]} y2={TR[1]} />
                <line x1={BB[0]} y1={BB[1]} x2={TB[0]} y2={TB[1]} />

                {/* Mid-height horizontal ring */}
                {(() => {
                  const my = cy - ht / 2;
                  const miso = hiso;
                  return (
                    <polygon
                      points={`${cx},${my} ${cx - hw},${my - miso} ${cx},${my - 2 * miso} ${cx + hw},${my - miso}`}
                      strokeDasharray="4,3" strokeOpacity="0.25" />
                  );
                })()}

                {/* Vertical midlines on faces */}
                <line x1={cx - hw / 2} y1={(BL[1] + BF[1]) / 2}
                  x2={cx - hw / 2} y2={(TL[1] + TF[1]) / 2}
                  strokeDasharray="3,3" strokeOpacity="0.18" />
                <line x1={cx + hw / 2} y1={(BR[1] + BF[1]) / 2}
                  x2={cx + hw / 2} y2={(TR[1] + TF[1]) / 2}
                  strokeDasharray="3,3" strokeOpacity="0.18" />
                <line x1={cx} y1={BB[1]}
                  x2={cx} y2={TB[1]}
                  strokeDasharray="3,3" strokeOpacity="0.18" />

                {/* Horizontal midlines on left/right faces */}
                <line x1={BL[0]} y1={(BL[1] + TL[1]) / 2}
                  x2={BF[0]} y2={(BF[1] + TF[1]) / 2}
                  strokeDasharray="3,3" strokeOpacity="0.15" />
                <line x1={BR[0]} y1={(BR[1] + TR[1]) / 2}
                  x2={BF[0]} y2={(BF[1] + TF[1]) / 2}
                  strokeDasharray="3,3" strokeOpacity="0.15" />
                <line x1={BL[0]} y1={(BL[1] + TL[1]) / 2}
                  x2={BB[0]} y2={(BB[1] + TB[1]) / 2}
                  strokeDasharray="3,3" strokeOpacity="0.15" />
                <line x1={BR[0]} y1={(BR[1] + TR[1]) / 2}
                  x2={BB[0]} y2={(BB[1] + TB[1]) / 2}
                  strokeDasharray="3,3" strokeOpacity="0.15" />
              </g>
            );
          })()}


          {/* ══════════════ SOLID GLOWING BLUE CUBE (center) ══════════════ */}
          {(() => {
            const cx = 200, cy = 218;
            const hw = 28, hiso = 14, ht = 32;

            return (
              <g className="ai-solid-pulse" filter="url(#ai4-bloom)">
                {/* Left face */}
                <polygon
                  points={`${cx},${cy} ${cx - hw},${cy - hiso} ${cx - hw},${cy - hiso - ht} ${cx},${cy - ht}`}
                  fill="url(#ai4-left)" stroke="#1565C0" strokeWidth="0.8" />
                {/* Right face */}
                <polygon
                  points={`${cx},${cy} ${cx + hw},${cy - hiso} ${cx + hw},${cy - hiso - ht} ${cx},${cy - ht}`}
                  fill="url(#ai4-right)" stroke="#1E88E5" strokeWidth="0.8" />
                {/* Top face */}
                <polygon
                  points={`${cx},${cy - ht} ${cx - hw},${cy - hiso - ht} ${cx},${cy - 2 * hiso - ht} ${cx + hw},${cy - hiso - ht}`}
                  fill="url(#ai4-top)" stroke="#42A5F5" strokeWidth="0.8" />
                {/* Bright edge highlight on top */}
                <line x1={cx} y1={cy - ht} x2={cx} y2={cy - 2 * hiso - ht}
                  stroke="rgba(130,210,255,0.4)" strokeWidth="0.5" />
                <line x1={cx - hw} y1={cy - hiso - ht} x2={cx + hw} y2={cy - hiso - ht}
                  stroke="rgba(130,210,255,0.3)" strokeWidth="0.5" />
              </g>
            );
          })()}


          {/* ══════════════ UPPER WIREFRAME CUBE (floating above, with delay) ══════════════ */}
          <g className="ai-upper-float">
            {(() => {
              const cx = 200, cy = 158;
              const hw = 36, hiso = 18, ht = 48;
              const col = "rgba(30,136,229,0.5)";

              const BF = [cx, cy];
              const BL = [cx - hw, cy - hiso];
              const BR = [cx + hw, cy - hiso];
              const BB = [cx, cy - 2 * hiso];
              const TF = [cx, cy - ht];
              const TL = [cx - hw, cy - hiso - ht];
              const TR = [cx + hw, cy - hiso - ht];
              const TB = [cx, cy - 2 * hiso - ht];

              return (
                <g stroke={col} strokeWidth="1.1" fill="none" className="ai-wire-glow"
                  filter="url(#ai4-wireglow)">
                  {/* Bottom diamond */}
                  <polygon points={`${BF[0]},${BF[1]} ${BL[0]},${BL[1]} ${BB[0]},${BB[1]} ${BR[0]},${BR[1]}`} />
                  {/* Top diamond */}
                  <polygon points={`${TF[0]},${TF[1]} ${TL[0]},${TL[1]} ${TB[0]},${TB[1]} ${TR[0]},${TR[1]}`} />
                  {/* 4 vertical edges */}
                  <line x1={BF[0]} y1={BF[1]} x2={TF[0]} y2={TF[1]} />
                  <line x1={BL[0]} y1={BL[1]} x2={TL[0]} y2={TL[1]} />
                  <line x1={BR[0]} y1={BR[1]} x2={TR[0]} y2={TR[1]} />
                  <line x1={BB[0]} y1={BB[1]} x2={TB[0]} y2={TB[1]} />

                  {/* Internal structure lines — cross on top face */}
                  <line x1={TL[0]} y1={TL[1]} x2={TR[0]} y2={TR[1]}
                    strokeDasharray="4,3" strokeOpacity="0.2" />
                  <line x1={TF[0]} y1={TF[1]} x2={TB[0]} y2={TB[1]}
                    strokeDasharray="4,3" strokeOpacity="0.2" />

                  {/* Internal structure — cross on bottom face */}
                  <line x1={BL[0]} y1={BL[1]} x2={BR[0]} y2={BR[1]}
                    strokeDasharray="4,3" strokeOpacity="0.15" />
                  <line x1={BF[0]} y1={BF[1]} x2={BB[0]} y2={BB[1]}
                    strokeDasharray="4,3" strokeOpacity="0.15" />

                  {/* Mid-height ring */}
                  {(() => {
                    const my = cy - ht / 2;
                    return (
                      <polygon
                        points={`${cx},${my} ${cx - hw},${my - hiso} ${cx},${my - 2 * hiso} ${cx + hw},${my - hiso}`}
                        strokeDasharray="5,3" strokeOpacity="0.22" />
                    );
                  })()}

                  {/* Vertical subdivision lines on faces */}
                  <line x1={cx - hw / 2} y1={(BL[1] + BF[1]) / 2}
                    x2={cx - hw / 2} y2={(TL[1] + TF[1]) / 2}
                    strokeDasharray="3,4" strokeOpacity="0.15" />
                  <line x1={cx + hw / 2} y1={(BR[1] + BF[1]) / 2}
                    x2={cx + hw / 2} y2={(TR[1] + TF[1]) / 2}
                    strokeDasharray="3,4" strokeOpacity="0.15" />
                </g>
              );
            })()}
          </g>


          {/* ══════════════ VERTICAL DATA-STREAM LINES ══════════════ */}
          {[
            { x: 130, y1: 90, y2: 260, delay: 0 },
            { x: 152, y1: 60, y2: 240, delay: 500 },
            { x: 200, y1: 40, y2: 270, delay: 200 },
            { x: 248, y1: 60, y2: 240, delay: 700 },
            { x: 270, y1: 90, y2: 260, delay: 400 },
            { x: 175, y1: 50, y2: 250, delay: 900 },
            { x: 225, y1: 50, y2: 250, delay: 1100 },
          ].map((l, i) => (
            <g key={`ds${i}`}>
              {/* Dashed vertical line */}
              <line x1={l.x} y1={l.y1} x2={l.x} y2={l.y2}
                stroke="rgba(30,136,229,0.18)" strokeWidth="0.6" strokeDasharray="2,4" />

              {/* Animated falling dot */}
              <g filter="url(#ai4-dotglow)">
                <circle cx={l.x} cy={(l.y1 + l.y2) / 2} r="2.5" fill="#42A5F5" opacity="0.8"
                  className="ai-data-fall"
                  style={{ animationDelay: `${l.delay}ms`, transformOrigin: `${l.x}px ${l.y1}px` }} />
              </g>

              {/* Static anchor dots */}
              <circle cx={l.x} cy={l.y1} r="2" fill="#1E88E5" opacity="0.5" className="ai-dot-pulse"
                style={{ animationDelay: `${l.delay + 300}ms` }} />
              <circle cx={l.x} cy={l.y2} r="1.5" fill="#1565C0" opacity="0.3" />
            </g>
          ))}

          {/* ══════════════ CORNER / JUNCTION GLOW DOTS ══════════════ */}
          {[
            { x: 200, y: 290, r: 2.5 },   // grid center
            { x: 200, y: 235, r: 2 },      // lower wireframe front
            { x: 160, y: 215, r: 1.8 },    // lower wireframe left
            { x: 240, y: 215, r: 1.8 },    // lower wireframe right
            { x: 200, y: 158, r: 2 },      // upper wireframe front
            { x: 164, y: 140, r: 1.5 },    // upper wireframe left
            { x: 236, y: 140, r: 1.5 },    // upper wireframe right
          ].map((d, i) => (
            <g key={`jd${i}`} filter="url(#ai4-dotglow)">
              <circle cx={d.x} cy={d.y} r={d.r} fill="#42A5F5" opacity="0.6"
                className="ai-dot-pulse" style={{ animationDelay: `${i * 400}ms` }} />
            </g>
          ))}

        </g>
      </svg>
    </div>
  );
}

/* ═══════════════ Card 5: Enterprise Grade Radar Shield ═══════════════ */
function EnterpriseGradeShield() {
  return (
    <svg className="w-full h-full" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Glow filters */}
        <filter id="shield-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="shield-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Shield Rim Gradient */}
        <linearGradient id="shield-rim-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#0a3d7a" />
        </linearGradient>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes shieldFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes orbitCW5 {
            from { transform: translate(120px, 95px) rotate(0deg); }
            to { transform: translate(120px, 95px) rotate(360deg); }
          }
          @keyframes orbitCCW5 {
            from { transform: translate(120px, 95px) rotate(360deg); }
            to { transform: translate(120px, 95px) rotate(0deg); }
          }
          @keyframes pulseCheck {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(61,174,255,0.4)); opacity: 0.8; }
            50% { filter: drop-shadow(0 0 8px rgba(61,174,255,0.95)); opacity: 1; }
          }
          .animate-shield-float5 {
            animation: shieldFloat 4.5s ease-in-out infinite;
          }
          .animate-orbit-cw5 {
            animation: orbitCW5 30s linear infinite;
          }
          .animate-orbit-ccw5 {
            animation: orbitCCW5 24s linear infinite;
          }
          .animate-pulse-check5 {
            animation: pulseCheck 3s ease-in-out infinite;
          }
        `}} />
      </defs>

      {/* ── ISOMETRIC GRID FLOOR ── */}
      {(() => {
        const ox = 120, oy = 165;           // grid center
        const ux = 15, uy = 7.5;            // iso unit vectors
        const N = 5;                        // grid subdivisions
        const elems = [];

        // Grid lines parallel to left axis
        for (let i = -N; i <= N; i++) {
          elems.push(
            <line
              key={`g1-${i}`}
              x1={ox + i * ux - N * ux}
              y1={oy + i * uy + N * uy}
              x2={ox + i * ux + N * ux}
              y2={oy + i * uy - N * uy}
              stroke="rgba(30,136,229,0.18)"
              strokeWidth="0.8"
            />
          );
          // Grid lines parallel to right axis
          elems.push(
            <line
              key={`g2-${i}`}
              x1={ox - N * ux + i * ux}
              y1={oy + N * uy + i * uy}
              x2={ox + N * ux + i * ux}
              y2={oy - N * uy + i * uy}
              stroke="rgba(30,136,229,0.18)"
              strokeWidth="0.8"
            />
          );
        }

        // Central glowing tile on the grid
        elems.push(
          <polygon
            key="center-tile"
            points={`${ox},${oy - uy} ${ox + ux},${oy} ${ox},${oy + uy} ${ox - ux},${oy}`}
            fill="rgba(30,136,229,0.45)"
            filter="url(#shield-bloom)"
          />
        );

        // Bright white center node
        elems.push(
          <circle
            key="center-node"
            cx={ox}
            cy={oy}
            r="2.5"
            fill="#ffffff"
            filter="url(#shield-bloom)"
          />
        );

        return <g>{elems}</g>;
      })()}

      {/* ── VERTICAL PROJECTING GUIDELINES ── */}
      <g stroke="rgba(30,136,229,0.3)" strokeWidth="0.8" strokeDasharray="3,3">
        {/* Left vertical line */}
        <line x1="60" y1="70" x2="60" y2="150" />
        <circle cx="60" cy="70" r="1.5" fill="#3daeff" />
        <circle cx="60" cy="150" r="1.5" fill="#3daeff" />

        {/* Right vertical line */}
        <line x1="180" y1="70" x2="180" y2="150" />
        <circle cx="180" cy="70" r="1.5" fill="#3daeff" />
        <circle cx="180" cy="150" r="1.5" fill="#3daeff" />

        {/* Central connecting line from bottom tip to grid center */}
        <line x1="120" y1="140" x2="120" y2="165" stroke="rgba(61,174,255,0.4)" strokeWidth="1" strokeDasharray="2,2" />
      </g>

      {/* ── ORBITAL RINGS (gyroscopic target paths) ── */}
      {/* Inner dashed ring (rotating counter-clockwise) */}
      <g className="animate-orbit-ccw5">
        <circle cx="0" cy="0" r="75" stroke="rgba(61,174,255,0.22)" strokeWidth="1" strokeDasharray="4,4" />
        {/* Inner circle dots at 1:30 and 7:30 to match image exactly */}
        <circle cx="53" cy="-53" r="2" fill="#3daeff" />
        <circle cx="-53" cy="53" r="2" fill="#3daeff" />
      </g>

      {/* Outer solid ring (rotating clockwise) */}
      <g className="animate-orbit-cw5">
        <circle cx="0" cy="0" r="95" stroke="rgba(61,174,255,0.35)" strokeWidth="1" />
        {/* Orbit dots spaced by 45 degrees */}
        <circle cx="95" cy="0" r="2" fill="#3daeff" />
        {/* Glowing medium dot at bottom-right (45 deg) */}
        <g filter="url(#shield-dot-glow)">
          <circle cx="67.2" cy="67.2" r="4" fill="#3daeff" />
          <circle cx="67.2" cy="67.2" r="1.5" fill="#ffffff" />
        </g>
        <circle cx="0" cy="95" r="2" fill="#3daeff" />
        <circle cx="-67.2" cy="67.2" r="2" fill="#3daeff" />
        <circle cx="-95" cy="0" r="2" fill="#3daeff" />
        <circle cx="-67.2" cy="-67.2" r="2" fill="#3daeff" />
        <circle cx="0" cy="-95" r="2" fill="#3daeff" />
        <circle cx="67.2" cy="-67.2" r="2" fill="#3daeff" />
      </g>

      {/* ── FLOATING 3D SHIELD ── */}
      <g className="animate-shield-float5">
        {/* Left Rim */}
        <path
          d="M 120 60 Q 110 52 95 50 L 87 46 Q 102 48 112 56 Z"
          fill="url(#shield-rim-grad)"
          stroke="#0091ff"
          strokeWidth="1"
        />
        <path
          d="M 95 50 Q 88 72 85 95 L 77 91 Q 80 68 87 46 Z"
          fill="url(#shield-rim-grad)"
          stroke="#0091ff"
          strokeWidth="1"
        />
        <path
          d="M 85 95 Q 85 125 120 140 L 112 136 Q 77 121 77 91 Z"
          fill="url(#shield-rim-grad)"
          stroke="#0091ff"
          strokeWidth="1"
        />

        {/* Front Left Face */}
        <path
          d="M 120 60 Q 110 52 95 50 Q 88 72 85 95 Q 85 125 120 140 Z"
          fill="rgba(6, 12, 28, 0.7)"
          stroke="#0091ff"
          strokeWidth="1.5"
        />
        {/* Tech-y Double Inner Border (Front Left) */}
        <path
          d="M 119 65 Q 110 58 98 56 Q 92 75 89 95 Q 89 121 119 134 Z"
          fill="none"
          stroke="rgba(61, 174, 255, 0.45)"
          strokeWidth="0.8"
        />

        {/* Front Right Face */}
        <path
          d="M 120 60 Q 130 52 145 50 Q 152 72 155 95 Q 155 125 120 140 Z"
          fill="rgba(8, 16, 38, 0.65)"
          stroke="#0091ff"
          strokeWidth="1.5"
        />
        {/* Tech-y Double Inner Border (Front Right) */}
        <path
          d="M 121 65 Q 130 58 142 56 Q 148 75 151 95 Q 151 121 121 134 Z"
          fill="none"
          stroke="rgba(61, 174, 255, 0.45)"
          strokeWidth="0.8"
        />

        {/* Glowing Checkmark in Center */}
        <g className="animate-pulse-check5">
          <path
            d="M 106 100 L 115 109 L 134 90"
            stroke="#3daeff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#shield-bloom)"
          />
        </g>
      </g>
    </svg>
  );
}

/* ═══════════════ Main Component ═══════════════ */
export default function AIInfrastructureExcellence() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      id="ai-infrastructure-excellence"
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-6 md:py-16"
    >
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* ── Decorative Section Separator Lines ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Main Section Heading ── */}
        <div className="text-center mb-5" style={fadeUp(0)}>
          <h2 className="text-[28px] sm:text-[34px] md:text-[52px] lg:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.1]">
            <span className="text-white">BUILT FOR </span>
            <br className="block md:hidden" />
            <span className="text-[#3daeff] block md:inline">AI INFRASTRUCTURE</span>
            <span className="text-white"> EXCELLENCE</span>
          </h2>
        </div>

        {/* ── Section Subtitle ── */}
        <p
          className="text-center text-[12px] md:text-[13px] text-white/40 max-w-[720px] mx-auto leading-[1.8] font-normal mb-14 md:mb-16"
          style={fadeUp(80)}
        >
          Stay ahead of the curve with the latest developments from USDC - your trusted partner in digital infrastructure.

        </p>

        {/* ═══════════════ Bento Grid ═══════════════ */}
        <div className="space-y-3 md:space-y-4">
          {/* ── Row 1: 2 Equal Column Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Card 1: POWER ADVANTAGE */}
            <div
              className="relative rounded-[16px] border border-white/[0.08] bg-[#060b18]/60 p-5 md:p-7 overflow-hidden group transition-all duration-500 hover:border-[#3daeff]/35 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_20px_rgba(61,174,255,0.08)] min-h-[200px]"
              style={{
                ...fadeUp(140),
              }}
            >
              <div className="relative z-10 max-w-[60%] sm:max-w-[55%]">
                <span className="text-4xl font-extrabold text-[#3daeff] group-hover:text-[#52b9ff] group-hover:scale-105 transition-all duration-300 leading-none block mb-3 origin-left">
                  1.
                </span>
                <h3 className="text-[12px] font-extrabold text-white/80 group-hover:text-white tracking-[0.15em] uppercase mb-3 font-sans transition-colors duration-300">
                  POWER ADVANTAGE
                </h3>
                <p className="text-[11px] md:text-[12px] text-white/40 group-hover:text-white/60 leading-[1.8] font-normal transition-colors duration-300">
                  1-50MW+ capacity with strategic energy assets positioned for long-term AI infrastructure growth.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-[150px] h-[120px] sm:w-[170px] sm:h-[130px] md:w-[190px] md:h-[145px] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <IsometricPowerGrid />
              </div>
            </div>

            {/* Card 2: RAPID DEPLOYMENT */}
            <div
              className="relative rounded-[16px] border border-white/[0.08] bg-[#060b18]/60 p-5 md:p-7 overflow-hidden group transition-all duration-500 hover:border-[#3daeff]/35 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_20px_rgba(61,174,255,0.08)]"
              style={{
                ...fadeUp(200),
              }}
            >
              <div className="relative z-10 flex flex-col xl:flex-row justify-between items-stretch gap-4 h-full">
                <div className="flex-1 min-w-[200px]">
                  <span className="text-4xl font-extrabold text-[#3daeff] group-hover:text-[#52b9ff] group-hover:scale-105 transition-all duration-300 leading-none block mb-3 origin-left">
                    2.
                  </span>
                  <h3 className="text-[12px] font-extrabold text-white/80 group-hover:text-white tracking-[0.15em] uppercase mb-3 font-sans transition-colors duration-300">
                    RAPID DEPLOYMENT
                  </h3>
                  <p className="text-[11px] md:text-[12px] text-white/40 group-hover:text-white/60 leading-[1.8] font-normal transition-colors duration-300">
                    Deploy AI-ready<br />Infrastructure in weeks<br />Instead of years.
                  </p>
                </div>

                {/* Comparison bars column */}
                <div className="w-full xl:w-[240px] flex flex-col justify-start gap-4 flex-shrink-0 xl:mt-[48px]">
                  {/* Traditional */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-white/50 tracking-wider mb-2 uppercase">
                      <span>Traditional Data Center</span>
                      <span>24 Months</span>
                    </div>
                    <div className="w-full">
                      <TraditionalBar />
                    </div>
                  </div>

                  {/* USDC */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-white tracking-wider mb-2 uppercase">
                      <span>USDC Infrastructure</span>
                      <span className="text-[#3daeff]">4 Months</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-[#3daeff] rounded-full transition-all duration-[1200ms] ease-out"
                        style={{ width: inView ? "35%" : "0%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Row 2: 3 Custom Width Column Cards ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_3fr_3.5fr] gap-3 md:gap-4">
            {/* Card 3: ADVANCED COOLING */}
            <div
              className="relative rounded-[16px] border border-white/[0.08] bg-[#060b18]/60 p-5 md:p-7 overflow-hidden group transition-all duration-500 hover:border-[#3daeff]/35 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_20px_rgba(61,174,255,0.08)]"
              style={{
                ...fadeUp(260),
              }}
            >
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[190px]">
                <div>
                  <span className="text-4xl font-extrabold text-[#3daeff] group-hover:text-[#52b9ff] group-hover:scale-105 transition-all duration-300 leading-none block mb-3 origin-left">
                    3.
                  </span>
                  <h3 className="text-[12px] font-extrabold text-white/80 group-hover:text-white tracking-[0.15em] uppercase mb-2 font-sans transition-colors duration-300">
                    ADVANCED COOLING
                  </h3>
                  <p className="text-[11px] md:text-[12px] text-white/40 group-hover:text-white/60 leading-[1.8] font-normal transition-colors duration-300">
                    Direct-to-chip cooling engineered for dense AI workloads.
                  </p>
                </div>
                <div className="w-full mt-4">
                  <AdvancedCoolingWaves />
                </div>
              </div>
            </div>

            {/* Card 4: AI OPTIMIZED */}
            <div
              className="relative rounded-[16px] border border-white/[0.08] bg-[#060b18]/60 p-5 md:p-7 overflow-hidden group transition-all duration-500 hover:border-[#3daeff]/35 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_20px_rgba(61,174,255,0.08)] min-h-[200px]"
              style={{
                ...fadeUp(320),
              }}
            >
              <div className="relative z-10 max-w-[55%]">
                <span className="text-4xl font-extrabold text-[#3daeff] group-hover:text-[#52b9ff] group-hover:scale-105 transition-all duration-300 leading-none block mb-3 origin-left">
                  4.
                </span>
                <h3 className="text-[12px] font-extrabold text-white/80 group-hover:text-white tracking-[0.15em] uppercase mb-2 font-sans transition-colors duration-300">
                  AI OPTIMIZED
                </h3>
                <p className="text-[11px] md:text-[12px] text-white/40 group-hover:text-white/60 leading-[1.8] font-normal transition-colors duration-300">
                  Built for Blackwell, <br />
                  Vera Rubin and <br />future GPUs.
                </p>
              </div>
              <div className="absolute bottom-[-10px] right-[-10px] w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <IsometricCubeStack />
              </div>
            </div>

            {/* Card 5: ENTERPRISE GRADE */}
            <div
              className="relative rounded-[16px] border border-white/[0.08] bg-[#060b18]/60 p-5 md:p-7 overflow-hidden group transition-all duration-500 hover:border-[#3daeff]/35 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_20px_rgba(61,174,255,0.08)] min-h-[200px]"
              style={{
                ...fadeUp(380),
              }}
            >
              <div className="relative z-10 max-w-[60%] sm:max-w-[55%]">
                <span className="text-4xl font-extrabold text-[#3daeff] group-hover:text-[#52b9ff] group-hover:scale-105 transition-all duration-300 leading-none block mb-3 origin-left">
                  5.
                </span>
                <h3 className="text-[12px] font-extrabold text-white/80 group-hover:text-white tracking-[0.15em] uppercase mb-3 font-sans transition-colors duration-300">
                  ENTERPRISE GRADE
                </h3>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2 text-[11px] md:text-[12px] text-white/45 group-hover:text-white/65 font-normal transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] flex-shrink-0" />
                    Tier III Design
                  </li>
                  <li className="flex items-center gap-2 text-[11px] md:text-[12px] text-white/45 group-hover:text-white/65 font-normal transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] flex-shrink-0" />
                    99.99% Reliability
                  </li>
                  <li className="flex items-center gap-2 text-[11px] md:text-[12px] text-white/45 group-hover:text-white/65 font-normal transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3daeff] flex-shrink-0" />
                    Security &amp; Compliance
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-[-15px] right-[-15px] w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <EnterpriseGradeShield />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section Separator Line ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}

