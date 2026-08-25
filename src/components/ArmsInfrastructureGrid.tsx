"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   1. ENERGY INFRASTRUCTURE CANVAS (Power Grid)
   ────────────────────────────────────────────────────────────────────────── */
function EnergyInfrastructureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 300;
      height = rect.height || 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Resize observer for container resizing
    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.4;
      const hover = Math.sin(time * 0.002) * 5;

      // Draw subtle grid background
      ctx.strokeStyle = "rgba(0, 145, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        // grid line 1
        ctx.beginPath();
        ctx.moveTo(cx - 120 + i * 20, cy + 90 - i * 10);
        ctx.lineTo(cx + 80 + i * 20, cy + 90 - i * 10);
        ctx.stroke();
        // grid line 2
        ctx.beginPath();
        ctx.moveTo(cx - 120 + i * 20, cy + 90 + i * 10);
        ctx.lineTo(cx + 80 + i * 20, cy + 90 + i * 10);
        ctx.stroke();
      }

      // Draw bottom base connector lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy + 85);
      ctx.lineTo(cx + 100, cy + 85);
      ctx.stroke();

      // --- 1. MAIN PANEL (Lightning Box) ---
      const boxW = 76;
      const boxH = 76;
      const bx = cx - boxW / 2;
      const by = cy - boxH / 2 + hover;

      // Main box outer glow
      ctx.shadowColor = "rgba(0, 145, 255, 0.35)";
      ctx.shadowBlur = 15;

      // Main box fill
      ctx.fillStyle = "rgba(4, 7, 15, 0.85)";
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 8);
      ctx.fill();

      // Main box border
      ctx.strokeStyle = "rgba(61, 174, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow for other lines

      // Inside lightning bolt
      ctx.shadowColor = "#0091ff";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#3daeff";
      ctx.beginPath();
      ctx.moveTo(cx + 5, by + 16);
      ctx.lineTo(cx - 12, by + 42);
      ctx.lineTo(cx - 1, by + 42);
      ctx.lineTo(cx - 5, by + 60);
      ctx.lineTo(cx + 12, by + 34);
      ctx.lineTo(cx + 1, by + 34);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // --- 2. BRANCHING LINES ---
      const trunkStartY = by + boxH;
      const trunkEndY = cy + 54 + hover;
      const branchL = cx - 58;
      const branchR = cx + 58;
      const subBoxY = cy + 78 + hover;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;

      // Vertical trunk
      ctx.beginPath();
      ctx.moveTo(cx, trunkStartY);
      ctx.lineTo(cx, trunkEndY);
      ctx.stroke();

      // Horizontal branches
      ctx.beginPath();
      ctx.moveTo(branchL, trunkEndY);
      ctx.lineTo(branchR, trunkEndY);
      ctx.stroke();

      // Branch lines going down to sub boxes
      const cols = [branchL, cx, branchR];
      cols.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x, trunkEndY);
        ctx.lineTo(x, subBoxY);
        ctx.stroke();
      });

      // --- 3. THREE DISTRIBUTOR BOXES ---
      const subSize = 16;
      cols.forEach((x) => {
        ctx.fillStyle = "rgba(4, 7, 15, 0.95)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(x - subSize / 2, subBoxY, subSize, subSize, 3);
        ctx.fill();
        ctx.stroke();
      });

      // --- 4. ENERGY FLOW PULSES ---
      const speed = 0.0015;
      const progress = (time * speed) % 1.0;

      const trunkLen = trunkEndY - trunkStartY;
      const branchLen = 58;
      const subLineLen = subBoxY - trunkEndY;
      const totalLen = trunkLen + branchLen + subLineLen;

      // Drawing glowing flow indicators
      ctx.shadowColor = "#3daeff";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#ffffff";

      // 2 pulses offset by 0.5
      [0, 0.5].forEach((offset) => {
        const p = (progress + offset) % 1.0;
        const dist = p * totalLen;

        if (dist <= trunkLen) {
          // Traveling down trunk
          const py = trunkStartY + dist;
          ctx.beginPath();
          ctx.arc(cx, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (dist <= trunkLen + branchLen) {
          // Splitting horizontally
          const bDist = dist - trunkLen;
          const py = trunkEndY;

          // Left flow
          ctx.beginPath();
          ctx.arc(cx - bDist, py, 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Right flow
          ctx.beginPath();
          ctx.arc(cx + bDist, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Traveling down outer vertical branches
          const sDist = dist - trunkLen - branchLen;
          const py = trunkEndY + sDist;

          ctx.beginPath();
          ctx.arc(cx - branchLen, py, 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(cx + branchLen, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Center branch pulse flows straight down from trunk
        const centerTotalLen = trunkLen + subLineLen;
        const cp = (progress + offset) % 1.0;
        const cdist = cp * centerTotalLen;
        if (cdist > trunkLen) {
          const cpy = trunkEndY + (cdist - trunkLen);
          ctx.beginPath();
          ctx.arc(cx, cpy, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[220px] block" />;
}

/* ──────────────────────────────────────────────────────────────────────────
   2. AI-READY FACILITIES CANVAS (Data Center Racks)
   ────────────────────────────────────────────────────────────────────────── */
function FacilitiesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 300;
      height = rect.height || 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    // Isometric projection helpers
    const angleX = 30 * Math.PI / 180;
    const angleY = 30 * Math.PI / 180;

    const project = (x: number, y: number, z: number, cx: number, cy: number) => {
      return {
        x: cx + (x - z) * Math.cos(angleX),
        y: cy + (x + z) * Math.sin(angleY) - y,
      };
    };

    const drawRack = (
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
      cx: number,
      cy: number,
      time: number,
      offset: number
    ) => {
      const v = [
        project(x - w / 2, y, z - d / 2, cx, cy), // 0: back bottom
        project(x + w / 2, y, z - d / 2, cx, cy), // 1: right bottom
        project(x + w / 2, y, z + d / 2, cx, cy), // 2: front bottom
        project(x - w / 2, y, z + d / 2, cx, cy), // 3: left bottom
        project(x - w / 2, y + h, z - d / 2, cx, cy), // 4: back top
        project(x + w / 2, y + h, z - d / 2, cx, cy), // 5: right top
        project(x + w / 2, y + h, z + d / 2, cx, cy), // 6: front top
        project(x - w / 2, y + h, z + d / 2, cx, cy), // 7: left top
      ];

      // Draw top face
      ctx.fillStyle = "rgba(8, 15, 35, 0.75)";
      ctx.beginPath();
      ctx.moveTo(v[4].x, v[4].y);
      ctx.lineTo(v[5].x, v[5].y);
      ctx.lineTo(v[6].x, v[6].y);
      ctx.lineTo(v[7].x, v[7].y);
      ctx.closePath();
      ctx.fill();

      // Draw left face
      ctx.fillStyle = "rgba(4, 9, 22, 0.85)";
      ctx.beginPath();
      ctx.moveTo(v[3].x, v[3].y);
      ctx.lineTo(v[2].x, v[2].y);
      ctx.lineTo(v[6].x, v[6].y);
      ctx.lineTo(v[7].x, v[7].y);
      ctx.closePath();
      ctx.fill();

      // Draw right face (front face)
      ctx.fillStyle = "rgba(2, 5, 12, 0.95)";
      ctx.beginPath();
      ctx.moveTo(v[2].x, v[2].y);
      ctx.lineTo(v[1].x, v[1].y);
      ctx.lineTo(v[5].x, v[5].y);
      ctx.lineTo(v[6].x, v[6].y);
      ctx.closePath();
      ctx.fill();

      // Draw main edges
      ctx.strokeStyle = "rgba(61, 174, 255, 0.35)";
      ctx.lineWidth = 1;
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom
        [4, 5], [5, 6], [6, 7], [7, 4], // top
        [0, 4], [1, 5], [2, 6], [3, 7], // columns
      ];
      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(v[i].x, v[i].y);
        ctx.lineTo(v[j].x, v[j].y);
        ctx.stroke();
      });

      // Draw server blades on the front-right face (bounded by 2, 1, 5, 6)
      const numBlades = 10;
      for (let i = 0; i < numBlades; i++) {
        const pctBottom = (i + 0.1) / numBlades;
        const byBlade = y + h * pctBottom;

        // Horizontal slot line across front-right face
        // Edge 2-6 is Left, Edge 1-5 is Right (on that specific face)
        const pLeft = project(x + w / 2, byBlade, z + d * 0.4, cx, cy);
        const pRight = project(x + w / 2, byBlade, z - d * 0.4, cx, cy);

        ctx.strokeStyle = "rgba(61, 174, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.stroke();

        // Server slot indicator glowing lights
        const flashFactor = time * 0.003 + offset - i * 0.75;
        const pulse = Math.sin(flashFactor);

        if (pulse > 0.2) {
          ctx.shadowColor = "#3daeff";
          ctx.shadowBlur = 6;
          ctx.fillStyle = "#3daeff";

          // Draw a small indicator LED dot on the blade
          const ledPos = project(x + w / 2, byBlade, z - d * 0.2, cx, cy);
          ctx.beginPath();
          ctx.arc(ledPos.x, ledPos.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw scanning activity light sweep
        const sweepSpeed = 0.001;
        const sweepPos = ((time * sweepSpeed + offset) % 1.5) - 0.25; // 0 to 1 range
        const dist = Math.abs((i / numBlades) - sweepPos);
        if (dist < 0.12) {
          ctx.shadowColor = "#0091ff";
          ctx.shadowBlur = 8;
          ctx.strokeStyle = `rgba(0, 145, 255, ${1 - dist / 0.12})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pLeft.x, pLeft.y);
          ctx.lineTo(pRight.x, pRight.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.7; // shift down to fit server height
      const hover = Math.sin(time * 0.0015) * 4;

      // Draw isometric ground grid lines
      ctx.strokeStyle = "rgba(0, 145, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let g = -4; g <= 4; g++) {
        const p1 = project(-100, 0, g * 25, cx, cy);
        const p2 = project(100, 0, g * 25, cx, cy);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project(g * 25, 0, -100, cx, cy);
        const p4 = project(g * 25, 0, 100, cx, cy);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // Draw back cabinet first, then front cabinet for correct depth sorting
      // Rack 1: Back-Right (further away)
      drawRack(26, hover, -24, 30, 94, 30, cx, cy, time, 0);

      // Rack 2: Front-Left (closer)
      drawRack(-26, hover, 24, 30, 94, 30, cx, cy, time, Math.PI);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[220px] block" />;
}

/* ──────────────────────────────────────────────────────────────────────────
   3. GPU COMPUTE PLATFORM CANVAS (Processor Core Network)
   ────────────────────────────────────────────────────────────────────────── */
function ComputeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 300;
      height = rect.height || 220;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const angleX = 30 * Math.PI / 180;
    const angleY = 30 * Math.PI / 180;

    const project = (x: number, y: number, z: number, cx: number, cy: number) => {
      return {
        x: cx + (x - z) * Math.cos(angleX),
        y: cy + (x + z) * Math.sin(angleY) - y,
      };
    };

    // Draw horizontal isometric plate
    const drawPlate = (
      x: number,
      y: number,
      z: number,
      w: number,
      d: number,
      cx: number,
      cy: number,
      color: string,
      borderColor: string,
      borderWidth = 1.5,
      glow = false
    ) => {
      const v = [
        project(x - w / 2, y, z - d / 2, cx, cy),
        project(x + w / 2, y, z - d / 2, cx, cy),
        project(x + w / 2, y, z + d / 2, cx, cy),
        project(x - w / 2, y, z + d / 2, cx, cy),
      ];

      if (glow) {
        ctx.shadowColor = borderColor;
        ctx.shadowBlur = 12;
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(v[0].x, v[0].y);
      ctx.lineTo(v[1].x, v[1].y);
      ctx.lineTo(v[2].x, v[2].y);
      ctx.lineTo(v[3].x, v[3].y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.48;
      const hover = Math.sin(time * 0.002) * 4;

      // Draw subtle background grid
      ctx.strokeStyle = "rgba(0, 145, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        const p1 = project(-110, -10, i * 30, cx, cy);
        const p2 = project(110, -10, i * 30, cx, cy);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project(i * 30, -10, -110, cx, cy);
        const p4 = project(i * 30, -10, 110, cx, cy);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // Outer peripheral nodes configuration (6 memory nodes)
      const radius = 80;
      const nodes: { x: number; y: number; z: number }[] = [];

      // Let's rotate the peripheral node coordinates slowly over time
      const rotAngle = time * 0.0003;
      for (let i = 0; i < 6; i++) {
        const baseAngle = (i * 60) * Math.PI / 180 + rotAngle;
        nodes.push({
          x: Math.cos(baseAngle) * radius,
          y: hover,
          z: Math.sin(baseAngle) * radius,
        });
      }

      // 1. Draw connecting lines from central chip to nodes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1.5;
      nodes.forEach((node) => {
        const pCore = project(0, hover, 0, cx, cy);
        const pNode = project(node.x, node.y, node.z, cx, cy);
        ctx.beginPath();
        ctx.moveTo(pCore.x, pCore.y);
        ctx.lineTo(pNode.x, pNode.y);
        ctx.stroke();
      });

      // 2. Draw central GPU chip
      const coreSize = 38;
      // Outer central plate
      drawPlate(0, hover, 0, coreSize, coreSize, cx, cy, "rgba(8, 18, 42, 0.8)", "rgba(61, 174, 255, 0.8)", 2, true);
      // Inner glowing core die
      const dieSize = 16 + Math.sin(time * 0.005) * 1.5;
      drawPlate(0, hover + 0.5, 0, dieSize, dieSize, cx, cy, "#3daeff", "#ffffff", 1, true);

      // 3. Draw peripheral nodes
      const nodeSize = 14;
      nodes.forEach((node) => {
        drawPlate(
          node.x,
          node.y,
          node.z,
          nodeSize,
          nodeSize,
          cx,
          cy,
          "rgba(4, 7, 15, 0.95)",
          "rgba(255, 255, 255, 0.45)",
          1.5,
          false
        );
      });

      // 4. Draw data packets pulsing along the line coordinates
      const packetSpeed = 0.002;
      const progress = (time * packetSpeed) % 1.0;

      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#3daeff";
      ctx.shadowBlur = 8;

      nodes.forEach((node, i) => {
        // Alternating direction for variety
        const outbound = i % 2 === 0;
        const p = outbound ? progress : 1.0 - progress;

        const px = node.x * p;
        const py = hover;
        const pz = node.z * p;

        const packetPos = project(px, py, pz, cx, cy);
        ctx.beginPath();
        ctx.arc(packetPos.x, packetPos.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[220px] block" />;
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN WRAPPER COMPONENT: ArmsInfrastructureGrid
   ────────────────────────────────────────────────────────────────────────── */
export default function ArmsInfrastructureGrid() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const columns = [
    {
      badge: "POWER",
      title: "ENERGY INFRASTRUCTURE",
      image: "/1216311d-2201-43f6-86b2-d733b61991d8.webp",

      desc: (
        <>
          Owned power generation assets and substation access create a structural cost and speed advantage that competitors building on leased utility power cannot replicate. The North Tonawanda plant produces at approximately $0.04/kWh. <br />
          The facility is backed by a 200MW <br />
          grid-connected substation with redundant feeders, securing hydro-power for <br />
          long-term pricing stability.
        </>
      ),
      specs: ["200MW Capacity", "Grid Feeder", "$0.04/kWh"],
    },
    {
      badge: "DATA CENTERS",
      title: "AI-READY FACILITIES",
      image: "/973b34f2-3a74-4c31-b056-5cefa758fb6a.webp",
      desc: (
        <>
          The company converts owned power assets into high-density, AI-ready data center capacity —
          targeting Tier III classification, direct liquid cooling and 200kW+ per-rack GPU density at the Alabama facility. Features custom closed-loop liquid-to-chip heat rejection configurations designed to sustain heavy Blackwell workloads.
        </>
      ),
      specs: ["Tier III Design", "Direct Liquid", "200kW+ Density"],
    },
    {
      badge: "COMPUTE",
      title: "GPU COMPUTE PLATFORM",
      image: "/ac665e79-d1c6-40c8-994b-f62eea6394a7.webp",
      desc: "NeoCloudz is the compute layer on top of the DigiPowerX infrastructure stack providing bare-metal GPU access, 400G InfiniBand fabric, and enterprise-grade telemetry for AI training, inference, and HPC workloads. Interconnects are optimized with RDMA support to allow seamless scaling of multi-node model execution.",
      specs: ["NVIDIA H100 / H200", "400G Fabric", "Bare-Metal RDMA"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#04070f] py-10 md:py-24 border-t border-white/[0.03]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {columns.map((col) => {
            return (
              <div
                key={col.title}
                className="relative group overflow-hidden h-[540px] md:h-[480px] flex flex-col justify-between border border-white/[0.08] hover:border-[#0091ff]/30 rounded-2xl bg-[#02050c]/25 backdrop-blur-md transition-all duration-500 hover:shadow-[0_4px_30px_rgba(0,145,255,0.06)]"
              >
                {/* Upper Half: Header & Canvas */}
                <div className="flex flex-col justify-between h-[370px] w-full">
                  {/* 1. Header Section */}
                  <div className="p-8 pb-3 flex flex-col">
                    {/* Badge */}
                    <div className="text-[10px] font-bold text-white/40 tracking-[0.2em] mb-2 uppercase">
                      {col.badge}
                    </div>
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff] mb-3 group-hover:opacity-0 transition-opacity duration-300">
                      {col.title}
                    </h3>

                    {/* Technical Spec Tags */}
                    <div className="flex flex-wrap gap-1.5 group-hover:opacity-0 transition-opacity duration-300">
                      {col.specs.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center px-2 py-0.5 rounded border border-white/[0.04] bg-white/[0.02] text-[9px] font-medium font-mono text-white/35 uppercase tracking-wider"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2. 3D Model Section */}
                  <div className="w-full flex-1 flex items-center justify-center relative transition-all duration-[850ms] ease-out group-hover:scale-[0.88] group-hover:-translate-y-8 px-6">
                    {/* Radial glow backdrop */}
                    <div className="absolute w-[60%] h-[60%] rounded-full bg-blue-500/[0.02] blur-[40px] pointer-events-none" />
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={col.image}
                        alt={col.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Sliding Drawer Overlay Panel (Covers full card on hover with dark blue background matching page/panels) */}
                <div className="absolute inset-0 w-full h-full pt-5 pb-8 px-8 md:px-10 bg-[#02050c]/98 backdrop-blur-md border-t border-white/[0.08] transition-all duration-[850ms] ease-out translate-y-[calc(100%-90px)] group-hover:translate-y-0 z-20 flex flex-col justify-start">

                  {/* Floating top header inside drawer (visible only on hover) */}
                  <div className="absolute top-8 left-8 md:left-10 right-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-[850ms] ease-out">
                    <div className="text-[10px] font-bold text-white/40 tracking-[0.2em] mb-2 uppercase">
                      {col.badge}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#0091ff]">
                      {col.title}
                    </h3>
                  </div>

                  {/* Pull handle indicator bar */}
                  <div className="w-8 h-[2px] bg-white/10 rounded-full mx-auto mb-4 group-hover:bg-[#3daeff]/40 transition-colors duration-[850ms] ease-out flex-shrink-0" />

                  {/* Description Text wrapper with dynamic margin on hover to clear the header */}
                  <div className="relative overflow-y-auto max-h-[300px] mt-0 group-hover:mt-16 transition-all duration-[850ms] ease-out pr-1">
                    <p className="text-[13px] md:text-sm text-white/50 leading-[1.65] font-normal group-hover:text-white/80 transition-colors duration-300">
                      {col.desc}
                    </p>
                  </div>

                  {/* Fade overlay on preview state (placed at the bottom of the visible 110px boundary) */}
                  <div className="absolute top-[66px] left-0 right-0 h-6 bg-gradient-to-t from-[#02050c] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />


                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
