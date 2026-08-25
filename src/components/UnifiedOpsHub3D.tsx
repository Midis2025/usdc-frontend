"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const makeChipTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Clear transparent
  ctx.fillStyle = "rgba(4, 7, 15, 0)";
  ctx.fillRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;
  const chipSize = 270;

  // Draw metallic pins extending from sides
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  const pinLength = 32;
  const pinWidth = 8;
  const pinCount = 4;
  const offsetStep = chipSize / (pinCount + 1);

  for (let i = 1; i <= pinCount; i++) {
    const offset = -chipSize / 2 + i * offsetStep;

    // Top pins
    ctx.fillRect(cx + offset - pinWidth / 2, cy - chipSize / 2 - pinLength, pinWidth, pinLength);
    // Bottom pins
    ctx.fillRect(cx + offset - pinWidth / 2, cy + chipSize / 2, pinWidth, pinLength);
    // Left pins
    ctx.fillRect(cx - chipSize / 2 - pinLength, cy + offset - pinWidth / 2, pinLength, pinWidth);
    // Right pins
    ctx.fillRect(cx + chipSize / 2, cy + offset - pinWidth / 2, pinLength, pinWidth);
  }

  // Draw Chip Body (Dark rounded box)
  ctx.fillStyle = "#090a0f";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
  ctx.lineWidth = 10;

  const r = 24;
  const x = cx - chipSize / 2;
  const y = cy - chipSize / 2;
  const w = chipSize;
  const h = chipSize;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw website signature plug logo in the center (White)
  ctx.fillStyle = "#ffffff";
  const lSize = 70;

  // Draw the "D" plug body
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy - lSize);
  ctx.lineTo(cx + 10, cy - lSize);
  ctx.arc(cx + 10, cy, lSize, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(cx - 20, cy + lSize);
  ctx.closePath();
  ctx.fill();

  // Draw prongs on the left
  ctx.fillRect(cx - 58, cy - 38, 42, 18);
  ctx.fillRect(cx - 58, cy + 20, 42, 18);

  // Cutouts inside D to separate the prongs
  ctx.fillStyle = "#090a0f";
  ctx.fillRect(cx - 20, cy - 38, 42, 18);
  ctx.fillRect(cx - 20, cy + 20, 42, 18);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
};

const createDashedCircle = (radius: number, dashed: boolean) => {
  const points = [];
  const segments = 128;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineDashedMaterial({
    color: 0xffffff,
    dashSize: dashed ? 0.08 : 1000,
    gapSize: dashed ? 0.06 : 0,
    transparent: true,
    opacity: dashed ? 0.16 : 0.45,
    linewidth: 1,
  });
  const line = new THREE.Line(geo, mat);
  line.computeLineDistances();
  return line;
};

const UnifiedOpsHub3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    let W = container.clientWidth || 600;
    let H = container.clientHeight || 260;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();

    const frustum = 5.2;
    const camera = new THREE.OrthographicCamera(
      -frustum * (W / H), frustum * (W / H), frustum, -frustum, -100, 200
    );
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 10);
    scene.add(dirLight);

    const root = new THREE.Group();
    scene.add(root);

    // --- 1. AMBIENT GLOW halo behind the CPU ---
    const glowGeo = new THREE.RingGeometry(0, 1.8, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3daeff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.z = -0.05;
    root.add(glowMesh);

    // --- 2. CENTRAL CPU CHIP ---
    const chipTex = makeChipTexture();
    const chipMat = new THREE.MeshBasicMaterial({
      map: chipTex,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const chipGeo = new THREE.PlaneGeometry(2.3, 2.3);
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    root.add(chipMesh);

    // --- 3. CONCENTRIC ORBITS ---
    const orbits = [
      { r: 1.55, dashed: false }, // Innermost Solid Orbit
      { r: 2.15, dashed: true },
      { r: 2.75, dashed: true },
      { r: 3.35, dashed: true },  // Outermost Orbit
    ];

    const orbitLines = orbits.map((o) => {
      const line = createDashedCircle(o.r, o.dashed);
      root.add(line);
      return line;
    });

    // --- 4. ORBITING NODES (SPHERES) ---
    const dotGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });

    interface NodeInstance {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      phase: number;
      fixedX?: number; // Optional horizontal constraint
    }

    const nodes: NodeInstance[] = [
      // Innermost node
      {
        mesh: new THREE.Mesh(dotGeo, dotMat),
        radius: orbits[0].r,
        speed: 1.2,
        phase: 0.0,
      },
      // Middle orbit node
      {
        mesh: new THREE.Mesh(dotGeo, dotMat),
        radius: orbits[1].r,
        speed: -0.7,
        phase: Math.PI * 0.5,
      },
      // Outermost orbit node (constrained to right side for arrow link)
      {
        mesh: new THREE.Mesh(dotGeo, dotMat),
        radius: orbits[2].r,
        speed: 0.0,
        phase: 0.0, // Stays at x = R2, y = 0
      },
      // Outer orbit node
      {
        mesh: new THREE.Mesh(dotGeo, dotMat),
        radius: orbits[3].r,
        speed: 0.45,
        phase: Math.PI * 1.25,
      }
    ];

    nodes.forEach((n) => {
      root.add(n.mesh);
    });

    // --- 5. INWARD DATA ARROW (From Node 3 to Innermost Solid Orbit) ---
    const arrowGroup = new THREE.Group();
    root.add(arrowGroup);

    // Arrow line: from x = R2 (Node 3) to x = R0 (Solid inner orbit)
    const R_outer = orbits[2].r;
    const R_inner = orbits[0].r;

    const arrowLinePoints = [
      new THREE.Vector3(R_outer, 0, 0),
      new THREE.Vector3(R_inner, 0, 0),
    ];
    const arrowLineGeo = new THREE.BufferGeometry().setFromPoints(arrowLinePoints);
    const arrowLineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      linewidth: 1,
    });
    const arrowLine = new THREE.Line(arrowLineGeo, arrowLineMat);
    arrowGroup.add(arrowLine);

    // Arrowhead shape pointing LEFT (at x = R_inner)
    const headSize = 0.14;
    const arrowHeadPoints = [
      new THREE.Vector3(R_inner + headSize, headSize * 0.7, 0),
      new THREE.Vector3(R_inner, 0, 0),
      new THREE.Vector3(R_inner + headSize, -headSize * 0.7, 0),
    ];
    const arrowHeadGeo = new THREE.BufferGeometry().setFromPoints(arrowHeadPoints);
    const arrowHead = new THREE.Line(arrowHeadGeo, arrowLineMat);
    arrowGroup.add(arrowHead);

    // Data packets pulsing along the arrow
    const packetGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);
    arrowGroup.add(packetMesh);

    // --- INTERACTIVITY PARALLAX ---
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      frameId = requestAnimationFrame(animate);

      // Smooth camera parallax
      const targetRotY = mouseX * 0.28;
      const targetRotX = -mouseY * 0.12;
      root.rotation.y += (targetRotY - root.rotation.y) * 0.05;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.05;

      // Rotate orbits slightly for organic layout feel
      orbitLines[1].rotation.z = elapsed * 0.04;
      orbitLines[2].rotation.z = -elapsed * 0.02;
      orbitLines[3].rotation.z = elapsed * 0.015;

      // Animate Node positions along circles
      nodes.forEach((n, idx) => {
        if (idx === 2) {
          // Node 3 oscillates vertically on the right side
          const angle = Math.sin(elapsed * 1.5) * 0.12;
          n.mesh.position.set(Math.cos(angle) * n.radius, Math.sin(angle) * n.radius, 0);
        } else {
          // Normal circular movement
          const angle = elapsed * n.speed + n.phase;
          n.mesh.position.set(Math.cos(angle) * n.radius, Math.sin(angle) * n.radius, 0);
        }
      });

      // Align arrow line and head dynamically to Node 3
      const node3Pos = nodes[2].mesh.position;
      
      // Update Arrow Line geometry to follow Node 3's oscillation
      const linePositions = arrowLineGeo.attributes.position.array as Float32Array;
      linePositions[0] = node3Pos.x;
      linePositions[1] = node3Pos.y;
      linePositions[3] = R_inner;
      linePositions[4] = 0; // Solid inner orbit target at (R_inner, 0)
      arrowLineGeo.attributes.position.needsUpdate = true;

      // Arrowhead position and tilt follow the line angle
      const dx = R_inner - node3Pos.x;
      const dy = 0 - node3Pos.y;
      const angle = Math.atan2(dy, dx);
      arrowHead.position.set(R_inner, 0, 0);
      arrowHead.rotation.z = angle;

      // Pulse data packet along the arrow
      const pulseT = (elapsed * 0.75) % 1;
      const packetPos = node3Pos.clone().lerp(new THREE.Vector3(R_inner, 0, 0), pulseT);
      packetMesh.position.copy(packetPos);
      packetMesh.scale.setScalar(0.7 + Math.sin(pulseT * Math.PI) * 0.6);

      // CPU chip slow rotation and pulse
      chipMesh.rotation.z = Math.sin(elapsed * 0.4) * 0.04;
      const scaleVal = 1.0 + Math.sin(elapsed * 1.8) * 0.015;
      chipMesh.scale.set(scaleVal, scaleVal, 1.0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      W = container.clientWidth || W;
      H = container.clientHeight || H;
      const a = W / H;
      camera.left = -frustum * a;
      camera.right = frustum * a;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
      chipTex.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh | THREE.Line;
        const geo = (mesh as { geometry?: THREE.BufferGeometry }).geometry;
        if (geo) geo.dispose();
        const mat = (mesh as { material?: THREE.Material | THREE.Material[] }).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) (mat as THREE.Material).dispose();
      });
      if (canvas.parentElement === container) container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default UnifiedOpsHub3D;
