"use client";

import React, { useEffect, useRef } from "react";

export default function EnergyHeroModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Track mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Isometric View Parameters
    let yaw = 0;       // side-to-side sway orbit
    let pitch = 0.52;  // standard isometric tilt angle
    let time = 0;

    // Projection Function
    const project = (x3d: number, y3d: number, z3d: number, centerX: number, centerY: number) => {
      // 1. Yaw Orbit (rotation around Y-axis)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      let rx = x3d * cosY - z3d * sinY;
      let rz = x3d * sinY + z3d * cosY;

      // 2. Pitch Tilt (rotation around X-axis)
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      let ry = y3d * cosX - rz * sinX;
      let rzFinal = y3d * sinX + rz * cosX;

      // Camera focal length
      const fov = 420;
      const camZ = rzFinal + 420;
      const scale = fov / camZ;

      // Isometric-like screen coordinates
      const screenX = centerX + rx * scale;
      const screenY = centerY + ry * scale;

      return { x: screenX, y: screenY, z: camZ };
    };

    // Draw a 3D box (wireframe + translucent fill)
    const drawBox = (cx: number, cy: number, cz: number, w: number, h: number, d: number, faceColor: string, strokeColor: string, centerX: number, centerY: number) => {
      const pT0 = project(cx - w, cy - h, cz - d, centerX, centerY);
      const pT1 = project(cx + w, cy - h, cz - d, centerX, centerY);
      const pT2 = project(cx + w, cy - h, cz + d, centerX, centerY);
      const pT3 = project(cx - w, cy - h, cz + d, centerX, centerY);

      const pB0 = project(cx - w, cy + h, cz - d, centerX, centerY);
      const pB1 = project(cx + w, cy + h, cz - d, centerX, centerY);
      const pB2 = project(cx + w, cy + h, cz + d, centerX, centerY);
      const pB3 = project(cx - w, cy + h, cz + d, centerX, centerY);

      ctx.fillStyle = faceColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.7;

      // Fill faces
      ctx.beginPath();
      ctx.moveTo(pT0.x, pT0.y);
      ctx.lineTo(pT1.x, pT1.y);
      ctx.lineTo(pT2.x, pT2.y);
      ctx.lineTo(pT3.x, pT3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pT3.x, pT3.y);
      ctx.lineTo(pT2.x, pT2.y);
      ctx.lineTo(pB2.x, pB2.y);
      ctx.lineTo(pB3.x, pB3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pT1.x, pT1.y);
      ctx.lineTo(pT2.x, pT2.y);
      ctx.lineTo(pB2.x, pB2.y);
      ctx.lineTo(pB1.x, pB1.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Rest of frame edges
      const edges = [
        [pT0, pT3], [pB0, pB3], [pB0, pB1], [pB1, pB2], [pB2, pB3],
        [pT0, pB0], [pT1, pB1], [pT3, pB3]
      ];
      edges.forEach(([pS, pE]) => {
        ctx.beginPath();
        ctx.moveTo(pS.x, pS.y);
        ctx.lineTo(pE.x, pE.y);
        ctx.stroke();
      });
    };

    // Draw a vector lightning bolt inside a polygon face
    const drawLightning = (pTopLeft: { x: number; y: number }, pBottomRight: { x: number; y: number }, scaleVal: number) => {
      const cx = (pTopLeft.x + pBottomRight.x) * 0.5;
      const cy = (pTopLeft.y + pBottomRight.y) * 0.5;

      ctx.strokeStyle = "rgba(0, 180, 255, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - 3 * scaleVal, cy - 8 * scaleVal);
      ctx.lineTo(cx + 4 * scaleVal, cy - 2 * scaleVal);
      ctx.lineTo(cx - 1 * scaleVal, cy + 0 * scaleVal);
      ctx.lineTo(cx + 2 * scaleVal, cy + 8 * scaleVal);
      ctx.lineTo(cx - 4 * scaleVal, cy + 2 * scaleVal);
      ctx.lineTo(cx + 1 * scaleVal, cy + 0 * scaleVal);
      ctx.closePath();
      ctx.stroke();
    };

    // Particle tracking smoke
    const smokeParticles: Array<{ x: number; y: number; z: number; age: number; maxAge: number }> = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // Smooth mouse coordinates LERP
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x += (-1000 - mouse.x) * 0.06;
        mouse.y += (-1000 - mouse.y) * 0.06;
      }

      time += 0.8;

      // Orbit camera sway based on mouse position
      let targetYaw = 0;
      let targetPitch = 0.52;

      if (mouse.active && mouse.x !== -1000) {
        targetYaw = ((mouse.x - centerX) / width) * 0.4;
        targetPitch = 0.52 + ((mouse.y - centerY) / height) * 0.22;
      }

      yaw += (targetYaw - yaw) * 0.06;
      pitch += (targetPitch - pitch) * 0.06;

      // ── Draw 2D Illustrator-style grid pattern ──
      const gridSize = 40;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = (x % (gridSize * 4) === 0) ? "rgba(61, 174, 255, 0.04)" : "rgba(61, 174, 255, 0.015)";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = (y % (gridSize * 4) === 0) ? "rgba(61, 174, 255, 0.04)" : "rgba(61, 174, 255, 0.015)";
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── Draw 3D Ground Layout Guideline Squares ──
      ctx.strokeStyle = "rgba(61, 174, 255, 0.06)";
      ctx.lineWidth = 0.5;
      const g0 = project(-160, 0, -130, centerX, centerY);
      const g1 = project(160, 0, -130, centerX, centerY);
      const g2 = project(160, 0, 150, centerX, centerY);
      const g3 = project(-160, 0, 150, centerX, centerY);
      ctx.beginPath();
      ctx.moveTo(g0.x, g0.y);
      ctx.lineTo(g1.x, g1.y);
      ctx.lineTo(g2.x, g2.y);
      ctx.lineTo(g3.x, g3.y);
      ctx.closePath();
      ctx.stroke();

      // Inner coordinate box guides
      const gi0 = project(-90, 0, -70, centerX, centerY);
      const gi1 = project(90, 0, -70, centerX, centerY);
      const gi2 = project(90, 0, 95, centerX, centerY);
      const gi3 = project(-90, 0, 95, centerX, centerY);
      ctx.beginPath();
      ctx.moveTo(gi0.x, gi0.y);
      ctx.lineTo(gi1.x, gi1.y);
      ctx.lineTo(gi2.x, gi2.y);
      ctx.lineTo(gi3.x, gi3.y);
      ctx.closePath();
      ctx.strokeStyle = "rgba(0, 150, 255, 0.04)";
      ctx.stroke();

      // Node Coordinates List
      const nodes = [
        { name: "Turbine", x: -140, z: -100, label: "WIND" },
        { name: "Pylon", x: 130, z: -100, label: "GRID" },
        { name: "Solar", x: 140, z: 10, label: "SOLAR" },
        { name: "Substation", x: 110, z: 110, label: "SUB" },
        { name: "Transformer", x: 0, z: 120, label: "XFMR" },
        { name: "Factory", x: -110, z: 110, label: "GEN" },
        { name: "Battery", x: -140, z: 10, label: "BATT" }
      ];

      // ── Draw Connection Path Wires (with signal pulses) ──
      nodes.forEach((node) => {
        // Paths connect from node coordinates right-angled to central platform boundaries
        const pStart = project(node.x, 0, node.z, centerX, centerY);
        const pTurn = project(node.x * 0.4, 0, node.z * 0.4, centerX, centerY);
        const pEnd = project(0, 0, 0, centerX, centerY);

        ctx.strokeStyle = "rgba(61, 174, 255, 0.07)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(pStart.x, pStart.y);
        ctx.lineTo(pTurn.x, pTurn.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();

        // Glowing Blue Signal Packets crawling along wires
        const progress = ((time * 0.9 + Math.abs(node.x + node.z)) % 150) / 150;
        let px = 0;
        let pz = 0;

        if (progress < 0.5) {
          const ratio = progress / 0.5;
          px = node.x + (node.x * 0.4 - node.x) * ratio;
          pz = node.z;
        } else {
          const ratio = (progress - 0.5) / 0.5;
          px = node.x * 0.4 - (node.x * 0.4) * ratio;
          pz = node.z - node.z * ratio;
        }

        const signalProj = project(px, 0, pz, centerX, centerY);
        const alpha = Math.sin(progress * Math.PI) * 0.8;
        ctx.beginPath();
        ctx.arc(signalProj.x, signalProj.y, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${alpha})`;
        ctx.shadowColor = "#00b4ff";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Depth sorted object render list
      const renderList: Array<{ depth: number; draw: () => void }> = [];

      // ── Wind Turbine Node (Draw mast + rotating blades) ──
      renderList.push({
        depth: project(-140, 0, -100, centerX, centerY).z,
        draw: () => {
          const base = project(-140, 0, -100, centerX, centerY);
          const head = project(-140, -65, -100, centerX, centerY);

          // Pad Base
          drawBox(-140, 0, -100, 10, 2, 10, "rgba(255,255,255,0.01)", "rgba(61,174,255,0.12)", centerX, centerY);

          // Tower Mast
          ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(head.x, head.y);
          ctx.stroke();

          // Blades
          const bladeAngle = time * 0.035;
          ctx.strokeStyle = "rgba(0, 180, 255, 0.85)";
          ctx.lineWidth = 1.0;
          for (let i = 0; i < 3; i++) {
            const angle = bladeAngle + i * ((2 * Math.PI) / 3);
            const bx = -140 + Math.sin(angle) * 26;
            const by = -65 + Math.cos(angle) * 26;
            const bladeEnd = project(bx, by, -100, centerX, centerY);

            ctx.beginPath();
            ctx.moveTo(head.x, head.y);
            ctx.lineTo(bladeEnd.x, bladeEnd.y);
            ctx.stroke();
          }
        }
      });

      // ── Power Grid Pylon Node (Wireframe grid truss tower) ──
      renderList.push({
        depth: project(130, 0, -100, centerX, centerY).z,
        draw: () => {
          const pB0 = project(118, 0, -112, centerX, centerY);
          const pB1 = project(142, 0, -112, centerX, centerY);
          const pB2 = project(142, 0, -88, centerX, centerY);
          const pB3 = project(118, 0, -88, centerX, centerY);

          const pT0 = project(126, -75, -104, centerX, centerY);
          const pT1 = project(134, -75, -104, centerX, centerY);
          const pT2 = project(134, -75, -96, centerX, centerY);
          const pT3 = project(126, -75, -96, centerX, centerY);

          const pTop = project(130, -90, -100, centerX, centerY);

          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.65;

          // Main vertical truss lines
          const trusses = [
            [pB0, pT0], [pB1, pT1], [pB2, pT2], [pB3, pT3],
            [pT0, pT1], [pT1, pT2], [pT2, pT3], [pT3, pT0],
            [pT0, pTop], [pT1, pTop], [pT2, pTop], [pT3, pTop]
          ];
          trusses.forEach(([pS, pE]) => {
            ctx.beginPath();
            ctx.moveTo(pS.x, pS.y);
            ctx.lineTo(pE.x, pE.y);
            ctx.stroke();
          });

          // Horizontal Crossbars
          const cross0 = project(114, -55, -100, centerX, centerY);
          const cross1 = project(146, -55, -100, centerX, centerY);
          ctx.beginPath();
          ctx.moveTo(cross0.x, cross0.y);
          ctx.lineTo(cross1.x, cross1.y);
          ctx.stroke();

          // Connect wires towards the center
          const pCoreWireEnd = project(90, -10, -70, centerX, centerY);
          ctx.strokeStyle = "rgba(0, 180, 255, 0.18)";
          ctx.beginPath();
          ctx.moveTo(cross0.x, cross0.y);
          ctx.lineTo(pCoreWireEnd.x, pCoreWireEnd.y);
          ctx.moveTo(cross1.x, cross1.y);
          ctx.lineTo(pCoreWireEnd.x, pCoreWireEnd.y);
          ctx.stroke();
        }
      });

      // ── Solar Panel Array Node (Angled grids) ──
      renderList.push({
        depth: project(140, 0, 10, centerX, centerY).z,
        draw: () => {
          // Panel base support lines
          const pCenter = project(140, 0, 10, centerX, centerY);
          const pHead = project(140, -14, 10, centerX, centerY);
          ctx.strokeStyle = "rgba(255,255,255,0.45)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pCenter.x, pCenter.y);
          ctx.lineTo(pHead.x, pHead.y);
          ctx.stroke();

          // Angled surface box
          const pS0 = project(118, -20, -4, centerX, centerY);
          const pS1 = project(162, -20, -4, centerX, centerY);
          const pS2 = project(162, -8, 24, centerX, centerY);
          const pS3 = project(118, -8, 24, centerX, centerY);

          ctx.fillStyle = "rgba(0, 130, 255, 0.08)";
          ctx.strokeStyle = "rgba(0, 180, 255, 0.45)";
          ctx.beginPath();
          ctx.moveTo(pS0.x, pS0.y);
          ctx.lineTo(pS1.x, pS1.y);
          ctx.lineTo(pS2.x, pS2.y);
          ctx.lineTo(pS3.x, pS3.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Subdivide grid cells
          ctx.strokeStyle = "rgba(0, 180, 255, 0.15)";
          for (let f = 1; f < 3; f++) {
            const r = f / 3;
            // horizontal line
            const pL0 = { x: pS0.x + (pS3.x - pS0.x) * r, y: pS0.y + (pS3.y - pS0.y) * r };
            const pR0 = { x: pS1.x + (pS2.x - pS1.x) * r, y: pS1.y + (pS2.y - pS1.y) * r };
            ctx.beginPath();
            ctx.moveTo(pL0.x, pL0.y);
            ctx.lineTo(pR0.x, pR0.y);
            ctx.stroke();

            // vertical line
            const pT0 = { x: pS0.x + (pS1.x - pS0.x) * r, y: pS0.y + (pS1.y - pS0.y) * r };
            const pB0 = { x: pS3.x + (pS2.x - pS3.x) * r, y: pS3.y + (pS2.y - pS3.y) * r };
            ctx.beginPath();
            ctx.moveTo(pT0.x, pT0.y);
            ctx.lineTo(pB0.x, pB0.y);
            ctx.stroke();
          }
        }
      });

      // ── Storage Battery Node (Battery tube with filling blue level bar) ──
      renderList.push({
        depth: project(-140, 0, 10, centerX, centerY).z,
        draw: () => {
          // Base cylinder pad
          drawBox(-140, 0, 10, 8, 1, 8, "rgba(255,255,255,0.01)", "rgba(61,174,255,0.12)", centerX, centerY);

          // Battery tube
          const pB = project(-140, 0, 10, centerX, centerY);
          const pT = project(-140, -32, 10, centerX, centerY);

          ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(pB.x - 5, pB.y);
          ctx.lineTo(pT.x - 5, pT.y);
          ctx.moveTo(pB.x + 5, pB.y);
          ctx.lineTo(pT.x + 5, pT.y);
          ctx.stroke();

          // Cap
          ctx.beginPath();
          ctx.arc(pT.x, pT.y, 5, Math.PI, 0);
          ctx.stroke();

          // Inside filling neon-blue charge segments
          const fillRatio = 0.5 + Math.sin(time * 0.04) * 0.3; // oscillate charge level
          const segments = 4;
          for (let s = 0; s < segments; s++) {
            const hPct = s / segments;
            if (hPct < fillRatio) {
              const segY = pB.y - 4 - s * 6;
              ctx.fillStyle = "rgba(0, 180, 255, 0.75)";
              ctx.beginPath();
              ctx.roundRect ? ctx.roundRect(pB.x - 3, segY, 6, 4, 1) : ctx.rect(pB.x - 3, segY, 6, 4);
              ctx.fill();
            }
          }
        }
      });

      // ── Industrial Factory Node (Sawtooth roofs + smoking chimneys) ──
      renderList.push({
        depth: project(-110, 0, 110, centerX, centerY).z,
        draw: () => {
          // Factory main building
          drawBox(-110, 0, 110, 16, 8, 12, "rgba(255,255,255,0.02)", "rgba(255,255,255,0.22)", centerX, centerY);

          // Chimney towers
          const c0 = project(-120, 0, 104, centerX, centerY);
          const c0Top = project(-120, -26, 104, centerX, centerY);
          const c1 = project(-114, 0, 104, centerX, centerY);
          const c1Top = project(-114, -26, 104, centerX, centerY);

          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(c0.x, c0.y);
          ctx.lineTo(c0Top.x, c0Top.y);
          ctx.moveTo(c1.x, c1.y);
          ctx.lineTo(c1Top.x, c1Top.y);
          ctx.stroke();

          // Emit smoke particles
          if (Math.random() < 0.08) {
            smokeParticles.push({
              x: -120 + (Math.random() - 0.5) * 4,
              y: -26,
              z: 104 + (Math.random() - 0.5) * 4,
              age: 0,
              maxAge: 35 + Math.random() * 20
            });
          }

          // Render smoke particles
          for (let i = smokeParticles.length - 1; i >= 0; i--) {
            const p = smokeParticles[i];
            p.y -= 0.6; // drift upward
            p.x += Math.sin(time * 0.05 + p.y * 0.1) * 0.2; // sway side to side
            p.age++;

            if (p.age >= p.maxAge) {
              smokeParticles.splice(i, 1);
            } else {
              const proj = project(p.x, p.y, p.z, centerX, centerY);
              const opacity = (1.0 - p.age / p.maxAge) * 0.35;
              ctx.beginPath();
              ctx.arc(proj.x, proj.y, 2 + (p.age / p.maxAge) * 5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 150, 255, ${opacity})`;
              ctx.fill();
            }
          }
        }
      });

      // ── Transformer Substation Node (Towers with bushings + lightning icon) ──
      renderList.push({
        depth: project(0, 0, 120, centerX, centerY).z,
        draw: () => {
          // Transformer main box
          drawBox(0, 0, 120, 15, 10, 12, "rgba(255,255,255,0.02)", "rgba(255,255,255,0.22)", centerX, centerY);

          // Front-Right Face endpoints for lightning icon
          const pT = project(15, -10, 108, centerX, centerY);
          const pB = project(15, 10, 132, centerX, centerY);
          drawLightning(pT, pB, 0.7);

          // 3 vertical insulator bushings
          for (let i = -1; i <= 1; i++) {
            const bx = i * 6;
            const bB = project(bx, -10, 120, centerX, centerY);
            const bT = project(bx, -22, 120, centerX, centerY);

            ctx.strokeStyle = "rgba(255,255,255,0.45)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(bB.x, bB.y);
            ctx.lineTo(bT.x, bT.y);
            ctx.stroke();

            // Glowing top sphere
            ctx.beginPath();
            ctx.arc(bT.x, bT.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#00d2ff";
            ctx.shadowColor = "#00b4ff";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // ── Control Substation Building Node ──
      renderList.push({
        depth: project(110, 0, 110, centerX, centerY).z,
        draw: () => {
          // Building block
          drawBox(110, 0, 110, 15, 11, 15, "rgba(255,255,255,0.02)", "rgba(255,255,255,0.22)", centerX, centerY);

          // Vents/Door indicators on front face
          const pL = project(95, -6, 115, centerX, centerY);
          const pR = project(95, 6, 125, centerX, centerY);
          ctx.strokeStyle = "rgba(0, 180, 255, 0.35)";
          ctx.strokeRect ? ctx.strokeRect(pL.x, pL.y, 4, 8) : ctx.rect(pL.x, pL.y, 4, 8);
          ctx.stroke();
        }
      });

      // ── Central Generator Core Platform (Double decker base + central core cube + hovering small cube) ──
      renderList.push({
        depth: project(0, 0, 0, centerX, centerY).z,
        draw: () => {
          // Lower deck base
          drawBox(0, 0, 0, 48, 2, 48, "rgba(0,120,255,0.05)", "rgba(0,180,255,0.3)", centerX, centerY);

          // Upper deck base
          drawBox(0, -2, 0, 40, 2, 40, "rgba(0,120,255,0.08)", "rgba(0,180,255,0.4)", centerX, centerY);

          // Central core cube (sits on upper deck)
          drawBox(0, -18, 0, 22, 14, 22, "rgba(255,255,255,0.03)", "rgba(255,255,255,0.35)", centerX, centerY);

          // Print Lightning bolts on the two front visible faces of central core
          // Left visible face center coordinates
          const faceLL = project(-22, -32, 22, centerX, centerY);
          const faceLR = project(-22, -4, 22, centerX, centerY);
          drawLightning(faceLL, faceLR, 0.95);

          const faceRL = project(22, -32, 22, centerX, centerY);
          const faceRR = project(22, -4, 22, centerX, centerY);
          drawLightning(faceRL, faceRR, 0.95);

          // Hovering small data cube (floating/bouncing)
          const bounceY = -48 + Math.sin(time * 0.04) * 5;
          drawBox(0, bounceY, 0, 9, 9, 9, "rgba(0,180,255,0.22)", "rgba(0,255,240,0.8)", centerX, centerY);

          // Radiant glow behind hovering cube
          const glowProj = project(0, bounceY, 0, centerX, centerY);
          ctx.beginPath();
          ctx.arc(glowProj.x, glowProj.y, 16, 0, Math.PI * 2);
          const radGrad = ctx.createRadialGradient(glowProj.x, glowProj.y, 2, glowProj.x, glowProj.y, 16);
          radGrad.addColorStop(0, "rgba(0, 210, 255, 0.22)");
          radGrad.addColorStop(1, "rgba(0, 210, 255, 0.0)");
          ctx.fillStyle = radGrad;
          ctx.fill();
        }
      });

      // Render all depth-sorted objects
      renderList.forEach((obj) => obj.draw());

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />
    </div>
  );
}
