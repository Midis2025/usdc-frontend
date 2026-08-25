"use client";

import React, { useEffect, useRef, useState } from "react";

// Point structure for 3D coordinates
interface Point3D {
  x: number;
  y: number;
  z: number;
  isLand?: boolean;
}

// Simple polygon contains points in degrees: [lon, lat]
// Coastlines approximation for a tech globe
const LAND_DEGREES = [
  // North America
  [
    [-168, 65], [-150, 70], [-120, 70], [-90, 75], [-60, 60], [-50, 48],
    [-65, 45], [-75, 35], [-80, 25], [-82, 9], [-95, 15], [-110, 22],
    [-120, 32], [-125, 48], [-140, 58], [-168, 65]
  ],
  // South America
  [
    [-80, 9], [-72, 10], [-60, 10], [-50, -5], [-35, -6], [-48, -25],
    [-60, -45], [-72, -54], [-75, -45], [-81, -15], [-81, -5], [-80, 9]
  ],
  // Africa
  [
    [-17, 32], [-5, 35], [10, 37], [25, 31], [34, 27], [43, 12],
    [51, 11], [40, -15], [30, -31], [18, -34], [10, -10], [9, 5],
    [-14, 4], [-17, 14], [-17, 32]
  ],
  // Eurasia
  [
    [-9, 38], [0, 50], [10, 58], [25, 70], [40, 75], [60, 75], [80, 75],
    [100, 77], [120, 75], [140, 72], [160, 70], [170, 65], [170, 50],
    [140, 35], [120, 30], [108, 15], [96, 10], [80, 7], [60, 12],
    [45, 12], [35, 15], [15, 30], [-9, 38]
  ],
  // UK / Madagascar / India detail
  [
    [70, 22], [75, 10], [80, 8], [88, 22], [70, 22]
  ],
  // Australia & SE Asia
  [
    [113, -26], [115, -35], [130, -37], [140, -37], [151, -34],
    [153, -28], [145, -15], [130, -12], [115, -15], [113, -26]
  ],
  [
    [95, 5], [105, 10], [110, 0], [120, 8], [130, -5], [140, -2],
    [105, -8], [95, 5]
  ]
];

// Helper to check if a point is inside a polygon
function isPointInPolygon(point: [number, number], vs: number[][]) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function ThreeDGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Globe States
    let radius = Math.min(width, height) * 0.46;
    let yaw = 1.6; // initial angle
    let pitch = -0.32; // slight downward view tilt (in radians)
    let spinSpeed = 0.0035;

    // Landmass Dots Density
    const landDots: Point3D[] = [];
    const stepLat = 3.6; // degrees
    const stepLon = 3.6; // degrees

    for (let lat = -80; lat <= 80; lat += stepLat) {
      const phi = (lat * Math.PI) / 180;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const numLonSteps = Math.max(12, Math.round(360 / stepLon * cosPhi));
      const lonStep = 360 / numLonSteps;

      for (let i = 0; i < numLonSteps; i++) {
        const lon = -180 + i * lonStep;
        const theta = (lon * Math.PI) / 180;

        let isLand = false;
        for (const poly of LAND_DEGREES) {
          if (isPointInPolygon([lon, lat], poly)) {
            isLand = true;
            break;
          }
        }

        if (isLand) {
          landDots.push({
            x: cosPhi * Math.cos(theta),
            y: sinPhi,
            z: cosPhi * Math.sin(theta),
            isLand: true,
          });
        }
      }
    }

    // Precompute Grid Lines
    // Latitude circles (parallels)
    const latLines: Point3D[][] = [];
    const latAngles = [-60, -40, -20, 0, 20, 40, 60];
    for (const lat of latAngles) {
      const phi = (lat * Math.PI) / 180;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);
      const line: Point3D[] = [];
      for (let thetaDeg = 0; thetaDeg <= 360; thetaDeg += 3) {
        const theta = (thetaDeg * Math.PI) / 180;
        line.push({
          x: cosPhi * Math.cos(theta),
          y: sinPhi,
          z: cosPhi * Math.sin(theta)
        });
      }
      latLines.push(line);
    }

    // Longitude circles (meridians)
    const lonLines: Point3D[][] = [];
    const lonAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    for (const lon of lonAngles) {
      const theta = (lon * Math.PI) / 180;
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      const line: Point3D[] = [];
      for (let latDeg = -90; latDeg <= 90; latDeg += 3) {
        const phi = (latDeg * Math.PI) / 180;
        line.push({
          x: Math.cos(phi) * cosTheta,
          y: Math.sin(phi),
          z: Math.cos(phi) * sinTheta
        });
      }
      lonLines.push(line);
    }

    // Floating satellite data points
    interface Satellite {
      lat: number;
      lon: number;
      alt: number;
      phase: number;
      speed: number;
      size: number;
    }

    const satellites: Satellite[] = [
      { lat: 10, lon: 30, alt: 1.15, phase: 0, speed: 0.012, size: 3 },
      { lat: -30, lon: 120, alt: 1.2, phase: 2, speed: 0.008, size: 2 },
      { lat: 45, lon: -80, alt: 1.18, phase: 4, speed: 0.015, size: 2.5 },
      { lat: -15, lon: -40, alt: 1.12, phase: 1, speed: 0.01, size: 3.5 },
      { lat: 60, lon: 180, alt: 1.25, phase: 3, speed: 0.006, size: 2 },
    ];

    // Pointer Drag Support
    const pointer = {
      isDragging: false,
      startX: 0,
      startY: 0,
      targetYaw: yaw,
      targetPitch: pitch,
    };

    const handleMouseDown = (e: MouseEvent) => {
      pointer.isDragging = true;
      pointer.startX = e.clientX;
      pointer.startY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!pointer.isDragging) return;
      const dx = e.clientX - pointer.startX;
      const dy = e.clientY - pointer.startY;

      pointer.targetYaw += dx * 0.006;
      pointer.targetPitch = Math.max(-1.4, Math.min(1.4, pointer.targetPitch + dy * 0.006));

      pointer.startX = e.clientX;
      pointer.startY = e.clientY;
    };

    const handleMouseUp = () => {
      pointer.isDragging = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Animation Loop
    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (pointer.isDragging) {
        yaw = yaw * 0.85 + pointer.targetYaw * 0.15;
        pitch = pitch * 0.85 + pointer.targetPitch * 0.15;
      } else {
        if (!reduceMotion) {
          yaw += spinSpeed;
        }
        pointer.targetYaw = yaw;
        pointer.targetPitch = pitch;
      }

      const cx = width / 2;
      const cy = height / 2;

      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);

      const project = (p: Point3D, scale = 1): { sx: number; sy: number; sz: number } => {
        const x1 = p.x * cosYaw - p.z * sinYaw;
        const z1 = p.x * sinYaw + p.z * cosYaw;
        const y1 = p.y;

        const x2 = x1;
        const y2 = y1 * cosPitch - z1 * sinPitch;
        const z2 = y1 * sinPitch + z1 * cosPitch;

        return {
          sx: x2 * radius * scale + cx,
          sy: y2 * radius * scale + cy,
          sz: z2,
        };
      };

      // ── Draw Globe Background Glow ──
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      const sphereGlow = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
      sphereGlow.addColorStop(0, "rgba(8, 20, 52, 0.25)");
      sphereGlow.addColorStop(0.7, "rgba(5, 12, 34, 0.4)");
      sphereGlow.addColorStop(1, "rgba(4, 7, 15, 0.8)");
      ctx.fillStyle = sphereGlow;
      ctx.fill();

      // Spherical edge ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(61, 174, 255, 0.18)";
      ctx.stroke();

      // Edge inner glow overlay
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 1, 0, 2 * Math.PI);
      const edgeGlow = ctx.createRadialGradient(cx, cy, radius - 20, cx, cy, radius);
      edgeGlow.addColorStop(0, "rgba(61, 174, 255, 0)");
      edgeGlow.addColorStop(0.8, "rgba(61, 174, 255, 0.05)");
      edgeGlow.addColorStop(1, "rgba(61, 174, 255, 0.25)");
      ctx.fillStyle = edgeGlow;
      ctx.fill();

      // ── Draw Back-Facing Grid Lines ──
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 6]);

      // Latitudes back
      ctx.strokeStyle = "rgba(61, 174, 255, 0.05)";
      for (const line of latLines) {
        ctx.beginPath();
        let active = false;
        for (const pt of line) {
          const { sx, sy, sz } = project(pt);
          if (sz < 0) {
            if (!active) {
              ctx.moveTo(sx, sy);
              active = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            active = false;
          }
        }
        ctx.stroke();
      }

      // Longitudes back
      for (const line of lonLines) {
        ctx.beginPath();
        let active = false;
        for (const pt of line) {
          const { sx, sy, sz } = project(pt);
          if (sz < 0) {
            if (!active) {
              ctx.moveTo(sx, sy);
              active = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            active = false;
          }
        }
        ctx.stroke();
      }

      // ── Draw Land Dots ──
      for (const dot of landDots) {
        const { sx, sy, sz } = project(dot);
        if (sz >= -0.05) {
          const edgeFade = Math.max(0, sz);
          const dotOpacity = edgeFade * 0.42;

          ctx.fillStyle = `rgba(96, 165, 250, ${dotOpacity})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.25, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      // ── Draw Front-Facing Grid Lines ──
      ctx.lineWidth = 0.95;
      ctx.strokeStyle = "rgba(61, 174, 255, 0.24)";
      ctx.setLineDash([4, 5]);

      // Latitudes front
      for (const line of latLines) {
        ctx.beginPath();
        let active = false;
        for (const pt of line) {
          const { sx, sy, sz } = project(pt);
          if (sz >= -0.05) {
            if (!active) {
              ctx.moveTo(sx, sy);
              active = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            active = false;
          }
        }
        ctx.stroke();
      }

      // Longitudes front
      for (const line of lonLines) {
        ctx.beginPath();
        let active = false;
        for (const pt of line) {
          const { sx, sy, sz } = project(pt);
          if (sz >= -0.05) {
            if (!active) {
              ctx.moveTo(sx, sy);
              active = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            active = false;
          }
        }
        ctx.stroke();
      }

      // ── Draw Satellites & Connections ──
      ctx.setLineDash([]);
      for (const sat of satellites) {
        if (!reduceMotion) {
          sat.lon += sat.speed;
        }

        const phi = (sat.lat * Math.PI) / 180;
        const theta = (sat.lon * Math.PI) / 180;

        const satPoint = {
          x: Math.cos(phi) * Math.cos(theta),
          y: Math.sin(phi),
          z: Math.cos(phi) * Math.sin(theta)
        };

        const { sx, sy, sz } = project(satPoint, sat.alt);

        if (sz >= -0.15) {
          const edgeFade = Math.max(0, (sz + 0.15) / 1.15);
          const opacity = edgeFade * 0.75;

          const surfacePoint = project(satPoint);

          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(surfacePoint.sx, surfacePoint.sy);
          ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.beginPath();
          ctx.arc(sx, sy, sat.size, 0, 2 * Math.PI);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sx, sy, sat.size * (2 + Math.sin(Date.now() * 0.003 + sat.phase) * 0.5), 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // ── Atmosphere Glow (Rim) ──
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, 0, 2 * Math.PI);
      const rimGlow = ctx.createRadialGradient(cx, cy, radius - 2, cx, cy, radius + 8);
      rimGlow.addColorStop(0, "rgba(61, 174, 255, 0.12)");
      rimGlow.addColorStop(0.5, "rgba(61, 174, 255, 0.04)");
      rimGlow.addColorStop(1, "rgba(61, 174, 255, 0)");
      ctx.fillStyle = rimGlow;
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;

      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      radius = Math.min(width, height) * 0.46;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClient]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[350px] md:min-h-[480px] lg:min-h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-full max-h-full block z-10 pointer-events-auto"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] rounded-full bg-sky-400/[0.03] blur-[60px] pointer-events-none z-0" />
    </div>
  );
}
