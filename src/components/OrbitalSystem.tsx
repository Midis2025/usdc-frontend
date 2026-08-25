"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./OrbitalSystem.css";

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "SITE ACQUISITION",
    desc: "Identified key energy assets with long-term potential and strategic infrastructure value.",
  },
  {
    year: "2024",
    title: "INFRASTRUCTURE DESIGN",
    desc: "Completed site evaluations and designed Tier III-ready modular infrastructure.",
  },
  {
    year: "2025",
    title: "AI EXPANSION",
    desc: "Deployed ARMS 200 platform and enabled GPU-ready custom compute environments.",
  },
  {
    year: "2026",
    title: "OPERATIONAL DEPLOYMENT",
    desc: "Scaled infrastructure capacity and accelerated enterprise AI workloads.",
  },
  {
    year: "2030",
    title: "200MW+ CAPACITY",
    desc: "Expanding multi-site infrastructure network to support national-scale AI growth.",
  },
];

// Helper to create a glowing particle texture
const createParticleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(96, 178, 255, 0.8)");
    grad.addColorStop(0.6, "rgba(61, 174, 255, 0.2)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
  }
  return new THREE.CanvasTexture(canvas);
};

export default function OrbitalSystem() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);

  // Synchronize ref to avoid closing over stale state in the animation loop
  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex;
  }, [hoveredIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // ── Renderer Setup ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    // ── Camera Setup ──
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 11);
    camera.lookAt(new THREE.Vector3(0, -0.4, 0));

    // ── Light Setup ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60b2ff, 2.5, 20);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // ── Central Glowing Core ──
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Core Wireframe Sphere
    const coreGeom = new THREE.SphereGeometry(1.1, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3daeff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Central Core Glow Ball
    const glowGeom = new THREE.SphereGeometry(0.42, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3daeff,
      transparent: true,
      opacity: 0.55,
    });
    const glowMesh = new THREE.Mesh(glowGeom, glowMat);
    coreGroup.add(glowMesh);

    // ── Build Concentric Orbits & Nodes ──
    const orbitCount = TIMELINE_EVENTS.length;
    const baseRadius = 2.0;
    const radiusStep = 1.05;

    interface OrbitNode {
      mesh: THREE.Mesh;
      halo: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
    }

    const orbitNodes: OrbitNode[] = [];
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Pre-create shared assets
    const nodeGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const haloGeom = new THREE.RingGeometry(0.18, 0.24, 32);
    const particleTex = createParticleTexture();

    // Track particle systems for rotation updates
    const dustSystems: {
      points: THREE.Points;
      angles: Float32Array;
      speeds: Float32Array;
      radius: number;
    }[] = [];

    TIMELINE_EVENTS.forEach((event, i) => {
      const radius = baseRadius + i * radiusStep;
      
      // 1. Draw Orbit Ring Line
      const ringPoints: THREE.Vector3[] = [];
      const segments = 128;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x3daeff,
        transparent: true,
        opacity: 0.1,
      });
      const orbitLine = new THREE.Line(ringGeom, ringMat);
      orbitGroup.add(orbitLine);

      // 2. Year Node Mesh
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      orbitGroup.add(nodeMesh);

      // 3. Glowing Halo around Node
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x60b2ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      orbitGroup.add(haloMesh);

      // Orbit configuration
      // Spread starting positions and stagger speed multipliers (outer is slower)
      const startAngle = (i * (Math.PI * 2)) / orbitCount + 0.5;
      const speed = 0.0028 * (1.0 - i * 0.12);

      orbitNodes.push({
        mesh: nodeMesh,
        halo: haloMesh,
        radius,
        speed,
        angle: startAngle,
      });

      // 4. Orbit Dust Particles
      const particleCount = 25 + i * 5;
      const positions = new Float32Array(particleCount * 3);
      const angles = new Float32Array(particleCount);
      const speeds = new Float32Array(particleCount);

      for (let p = 0; p < particleCount; p++) {
        const pAngle = Math.random() * Math.PI * 2;
        const pRadius = radius + (Math.random() - 0.5) * 0.08;
        positions[p * 3] = Math.cos(pAngle) * pRadius;
        positions[p * 3 + 1] = (Math.random() - 0.5) * 0.04;
        positions[p * 3 + 2] = Math.sin(pAngle) * pRadius;

        angles[p] = pAngle;
        speeds[p] = (0.001 + Math.random() * 0.0015) * (Math.random() > 0.5 ? 1 : -1);
      }

      const dustGeom = new THREE.BufferGeometry();
      dustGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      
      const dustMat = new THREE.PointsMaterial({
        color: 0x3daeff,
        size: 0.075,
        transparent: true,
        opacity: 0.35,
        map: particleTex,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const dustPoints = new THREE.Points(dustGeom, dustMat);
      orbitGroup.add(dustPoints);

      dustSystems.push({
        points: dustPoints,
        angles,
        speeds,
        radius,
      });
    });

    // ── Mouse & Drag Interactions ──
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Direct drag rotation
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;
        
        // Clamp X rotation to avoid flipping upside down
        targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Support touch devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    // ── Resize Handler ──
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      
      renderer.setSize(width, height);
      const aspect = width / height;
      camera.aspect = aspect;
      if (aspect < 1.2) {
        camera.fov = 42 * (1.2 / aspect);
      } else {
        camera.fov = 42;
      }
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize with correct responsive FOV

    // ── Animation Loop ──
    let animationId = 0;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate central core gently
      coreGroup.rotation.y += 0.006;
      coreGroup.rotation.x += 0.003;

      // Gentle auto-rotation unless dragging
      if (!isDragging) {
        targetRotationY += 0.0008;
      }

      // Smooth interpolation for inertia/damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      orbitGroup.rotation.y = currentRotationY;
      // Combine target pitch tilt with user rotation
      orbitGroup.rotation.x = 0.28 + currentRotationX;
      orbitGroup.rotation.z = -0.15;

      // Update Year Node positions on orbits
      const isNodeHovered = hoveredIndexRef.current !== null;

      orbitNodes.forEach((node, idx) => {
        // Slow down orbit velocity if any node is hovered for easier selection
        const speedFactor = isNodeHovered ? 0.15 : 1.0;
        node.angle += node.speed * speedFactor;

        const nx = Math.cos(node.angle) * node.radius;
        const nz = Math.sin(node.angle) * node.radius;

        node.mesh.position.set(nx, 0, nz);
        node.halo.position.set(nx, 0, nz);

        // Slow halo pulse effect
        const scaleVal = 1.0 + Math.sin(Date.now() * 0.003 + idx) * 0.15;
        node.halo.scale.set(scaleVal, scaleVal, scaleVal);

        // Project 3D coordinate to 2D Screen Space
        node.mesh.getWorldPosition(tempV);
        tempV.project(camera);

        const labelEl = labelRefs.current[idx];
        if (labelEl) {
          // Hide label if it's behind the camera
          const isBehindCamera = tempV.z > 1.0;
          if (isBehindCamera) {
            labelEl.style.display = "none";
          } else {
            labelEl.style.display = "block";
            // Map NDC coordinates (-1 to 1) to client pixels (0 to width/height)
            const pxX = (tempV.x * 0.5 + 0.5) * width;
            const pxY = (-(tempV.y * 0.5) + 0.5) * height;

            labelEl.style.left = `${pxX}px`;
            labelEl.style.top = `${pxY}px`;
          }
        }
      });

      // Update Card Position if hovered
      if (hoveredIndexRef.current !== null) {
        const activeLabelEl = labelRefs.current[hoveredIndexRef.current];
        const cardEl = cardRef.current;
        if (activeLabelEl && cardEl) {
          cardEl.style.left = activeLabelEl.style.left;
          cardEl.style.top = activeLabelEl.style.top;
        }
      }

      // Rotate orbit dust particles
      dustSystems.forEach((sys) => {
        const positions = sys.points.geometry.attributes.position.array as Float32Array;
        const count = sys.angles.length;
        const speedFactor = isNodeHovered ? 0.25 : 1.0;

        for (let p = 0; p < count; p++) {
          sys.angles[p] += sys.speeds[p] * speedFactor;
          positions[p * 3] = Math.cos(sys.angles[p]) * sys.radius;
          positions[p * 3 + 2] = Math.sin(sys.angles[p]) * sys.radius;
        }
        sys.points.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      
      coreGeom.dispose();
      coreMat.dispose();
      glowGeom.dispose();
      glowMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      haloGeom.dispose();
      particleTex.dispose();

      dustSystems.forEach((sys) => {
        sys.points.geometry.dispose();
        if (Array.isArray(sys.points.material)) {
          sys.points.material.forEach((m) => m.dispose());
        } else {
          sys.points.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="orbital-container w-full h-full select-none">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />

      {/* HTML Overlay Timeline Node Labels */}
      <div
        id="timeline-overlay"
        className={hoveredIndex !== null ? "has-active" : ""}
      >
        {TIMELINE_EVENTS.map((event, i) => (
          <div
            key={event.year}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className={`yr-node font-mono ${hoveredIndex === i ? "active" : "in"}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="yr-inner">{event.year}</span>
          </div>
        ))}

        {/* Dynamic Glassmorphic Event Info Card */}
        <div
          ref={cardRef}
          className={`timeline-card ${hoveredIndex !== null ? "show" : ""}`}
        >
          {hoveredIndex !== null && (
            <>
              <div className="c-year font-mono">{TIMELINE_EVENTS[hoveredIndex].year}</div>
              <div className="c-title font-sans">{TIMELINE_EVENTS[hoveredIndex].title}</div>
              <p className="c-body font-sans">{TIMELINE_EVENTS[hoveredIndex].desc}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
