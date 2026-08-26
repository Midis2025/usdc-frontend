"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════════
   CommunicationHub3D — Futuristic AI Communication Hub
   A holographic communication core surrounded by interconnected glowing
   nodes, rotating energy rings, flowing data streams and particle emissions.
   Pure three.js (matches the rest of the codebase). Additive glow aesthetic,
   soft blue / cyan / white palette, cinematic float + mouse parallax.
   ══════════════════════════════════════════════════════════════════════ */

export default function CommunicationHub3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 11);
    camera.lookAt(0, 0, 0);

    /* ─── World group: floats, parallaxes and spins as a whole ─── */
    const world = new THREE.Group();
    scene.add(world);

    /* Reusable radial glow texture (for sprites) */
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.2, "rgba(220,240,255,0.85)");
      g.addColorStop(0.5, "rgba(80,170,255,0.35)");
      g.addColorStop(1, "rgba(80,170,255,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    function sprite(color: number, scale: number, opacity = 1) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: false,
          opacity,
        })
      );
      s.scale.setScalar(scale);
      return s;
    }

    /* ════════════════ HOLOGRAPHIC CORE ════════════════ */
    const core = new THREE.Group();
    world.add(core);

    // Inner solid-ish icosahedron (faint volumetric body)
    const coreBody = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 1),
      new THREE.MeshBasicMaterial({
        color: 0x0a2a55,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    core.add(coreBody);

    // Wireframe shell
    const coreWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.18, 1)),
      new THREE.LineBasicMaterial({
        color: 0x6cc6ff,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    core.add(coreWire);

    // Outer rotating wire (counter-spin)
    const coreWire2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.OctahedronGeometry(1.55, 0)),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    core.add(coreWire2);

    // Central glow
    const coreGlow = sprite(0x8fd0ff, 4.2, 0.9);
    core.add(coreGlow);
    const coreGlowSoft = sprite(0x2f7fff, 7.5, 0.4);
    core.add(coreGlowSoft);

    /* ════════════════ ENERGY RINGS ════════════════ */
    const rings: { mesh: THREE.Mesh; axis: THREE.Vector3; speed: number }[] = [];
    const ringDefs = [
      { r: 2.0, tube: 0.012, color: 0x4ab6ff, tilt: [1.2, 0.2, 0.3], speed: 0.5 },
      { r: 2.55, tube: 0.01, color: 0x8fe0ff, tilt: [0.3, 1.1, 0.6], speed: -0.34 },
      { r: 3.15, tube: 0.008, color: 0xffffff, tilt: [0.9, 0.6, 1.3], speed: 0.22 },
    ];
    ringDefs.forEach((d) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, d.tube, 8, 160),
        new THREE.MeshBasicMaterial({
          color: d.color,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      ring.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2]);
      world.add(ring);
      rings.push({
        mesh: ring,
        axis: new THREE.Vector3(0, 0, 1),
        speed: d.speed,
      });
    });

    /* ════════════════ ORBITING NODES + CONNECTIONS ════════════════ */
    interface NodeInfo {
      group: THREE.Group;
      glow: THREE.Sprite;
      base: THREE.Vector3;
      orbit: number; // angular speed
      radius: number;
      phase: number;
      incline: number;
      tilt: number;
    }
    const nodes: NodeInfo[] = [];
    const NODE_COUNT = 9;
    const nodeColors = [0x4ab6ff, 0x8fe0ff, 0xffffff, 0x2f7fff];

    for (let i = 0; i < NODE_COUNT; i++) {
      const g = new THREE.Group();
      const col = nodeColors[i % nodeColors.length];

      // node body
      const body = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.12, 0),
        new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      g.add(body);
      const ng = sprite(col, 0.95, 0.95);
      g.add(ng);

      world.add(g);
      nodes.push({
        group: g,
        glow: ng,
        base: new THREE.Vector3(),
        orbit: 0.12 + (i % 3) * 0.05,
        radius: 3.2 + (i % 3) * 0.55,
        phase: (i / NODE_COUNT) * Math.PI * 2,
        incline: (i / NODE_COUNT) * Math.PI,
        tilt: ((i * 73) % 100) / 100 - 0.5,
      });
    }

    // Connection lines (rebuilt each frame: core↔node and node↔node)
    const MAX_LINES = NODE_COUNT * 2;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4ab6ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const connections = new THREE.LineSegments(lineGeo, lineMat);
    world.add(connections);

    /* ════════════════ DATA STREAM PULSES (sprites travelling links) ═══ */
    const pulseCount = 7;
    const pulses: { sprite: THREE.Sprite; from: number; t: number; speed: number }[] =
      [];
    for (let i = 0; i < pulseCount; i++) {
      const p = sprite(0xffffff, 0.5, 0.9);
      world.add(p);
      pulses.push({
        sprite: p,
        from: i % NODE_COUNT,
        t: i / pulseCount,
        speed: 0.55 + (i % 3) * 0.18,
      });
    }

    /* ════════════════ AMBIENT PARTICLE EMISSION AROUND CORE ════════════════ */
    const PCOUNT = 420;
    const pPos = new Float32Array(PCOUNT * 3);
    const pSeed = new Float32Array(PCOUNT);
    for (let i = 0; i < PCOUNT; i++) {
      // distribute on a shell with random radius
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = 1.6 + Math.random() * 3.4;
      pPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pPos[i * 3 + 1] = Math.cos(phi) * r * 0.7;
      pPos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
      pSeed[i] = Math.random();
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    partGeo.setAttribute("aSeed", new THREE.BufferAttribute(pSeed, 1));
    const partMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        uniform float uTime; uniform float uPixelRatio;
        attribute float aSeed; varying float vA;
        void main(){
          vec3 p = position;
          float t = uTime * (0.15 + aSeed*0.25);
          // gentle orbital drift
          float c = cos(t), s = sin(t);
          p.xz = mat2(c,-s,s,c) * p.xz;
          p.y += sin(uTime*0.6 + aSeed*6.28) * 0.25;
          vA = 0.4 + 0.6*abs(sin(uTime*1.2 + aSeed*9.0));
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (4.0 + aSeed*7.0) * uPixelRatio * (1.0/-mv.z);
        }`,
      fragmentShader: `
        varying float vA;
        void main(){
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if(d>0.5) discard;
          float a = smoothstep(0.5,0.0,d) * vA;
          vec3 col = mix(vec3(0.4,0.7,1.0), vec3(1.0), 0.4);
          gl_FragColor = vec4(col, a*0.7);
        }`,
    });
    const particles = new THREE.Points(partGeo, partMat);
    world.add(particles);



    /* ════════════════ INTERACTION + ANIMATION ════════════════ */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    let intro = 0; // 0→1 entrance progress
    const tmpA = new THREE.Vector3();
    const tmpB = new THREE.Vector3();

    function nodePos(n: NodeInfo, t: number, out: THREE.Vector3) {
      const a = n.phase + t * n.orbit * (reduceMotion ? 0 : 1);
      const x = Math.cos(a) * n.radius;
      const z = Math.sin(a) * n.radius;
      const y = Math.sin(a * 1.3 + n.incline) * n.radius * 0.45 * n.tilt * 2;
      out.set(x, y, z);
      return out;
    }

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      intro = Math.min(1, intro + 0.012);
      const ei = 1 - Math.pow(1 - intro, 3); // easeOutCubic

      // smooth pointer
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      // World float + parallax + entrance scale
      const floatY = reduceMotion ? 0 : Math.sin(t * 0.7) * 0.25;
      world.position.y = floatY;
      world.rotation.y = pointer.x * 0.5 + (reduceMotion ? 0 : t * 0.04);
      world.rotation.x = pointer.y * 0.3;
      world.scale.setScalar(0.55 + ei * 0.45);

      // Core spins
      coreWire.rotation.y += 0.004;
      coreWire.rotation.x += 0.0016;
      coreWire2.rotation.y -= 0.006;
      coreWire2.rotation.z += 0.003;
      coreBody.rotation.y -= 0.002;
      const beat = 0.5 + 0.5 * Math.sin(t * 2.2);
      coreGlow.material.opacity = (0.7 + beat * 0.3) * ei;
      coreGlow.scale.setScalar(4.0 + beat * 0.6);
      coreGlowSoft.material.opacity = (0.3 + beat * 0.15) * ei;

      // Rings rotate on their own tilt
      rings.forEach((r) => {
        r.mesh.rotation.z += r.speed * 0.01;
        r.mesh.rotation.x += r.speed * 0.004;
        (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0.7 * ei;
      });

      // Position nodes
      nodes.forEach((n) => {
        nodePos(n, t, n.base);
        n.group.position.copy(n.base);
        const np = 0.55 + 0.45 * Math.sin(t * 2 + n.phase * 3);
        n.glow.scale.setScalar((0.75 + np * 0.35) * (0.6 + ei * 0.4));
        (n.group.children[0] as THREE.Mesh).rotation.y += 0.02;
      });

      // Rebuild connection lines: each node → core and node → next node
      let li = 0;
      const writeSeg = (a: THREE.Vector3, b: THREE.Vector3) => {
        linePositions[li++] = a.x;
        linePositions[li++] = a.y;
        linePositions[li++] = a.z;
        linePositions[li++] = b.x;
        linePositions[li++] = b.y;
        linePositions[li++] = b.z;
      };
      const ORIGIN = tmpB.set(0, 0, 0);
      nodes.forEach((n, i) => {
        writeSeg(n.base, ORIGIN);
        const nx = nodes[(i + 1) % nodes.length];
        writeSeg(n.base, nx.base);
      });
      lineGeo.attributes.position.needsUpdate = true;
      lineMat.opacity = (0.06 + 0.1 * beat) * ei;

      // Data-stream pulses travel from a node toward the core
      pulses.forEach((p) => {
        p.t += 0.006 * p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.from = (p.from + 3) % nodes.length;
        }
        const from = nodes[p.from].base;
        tmpA.copy(from).multiplyScalar(1 - p.t); // lerp toward origin
        p.sprite.position.copy(tmpA);
        const fade = Math.sin(p.t * Math.PI);
        p.sprite.material.opacity = fade * 0.9 * ei;
        p.sprite.scale.setScalar(0.35 + fade * 0.3);
      });

      // Particles
      partMat.uniforms.uTime.value = reduceMotion ? 0 : t;



      renderer.render(scene, camera);
    };

    // pause animation while off-screen
    let isRunning = false;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          animate();
        }
      } else {
        if (isRunning) {
          isRunning = false;
          cancelAnimationFrame(frameRef.current);
        }
      }
    });
    intersectionObserver.observe(container);

    const onResize = () => {
      width = container.clientWidth || width;
      height = container.clientHeight || height;
      const aspect = width / height;
      camera.aspect = aspect;
      if (aspect < 1.2) {
        camera.fov = 42 * (1.2 / aspect);
      } else {
        camera.fov = 42;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      partMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener("resize", onResize);
    onResize(); // Initialize with correct responsive FOV

    return () => {
      cancelAnimationFrame(frameRef.current);
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      glowTex.dispose();
      scene.traverse((o) => {
        const any = o as THREE.Mesh & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        any.geometry?.dispose?.();
        if (Array.isArray(any.material))
          any.material.forEach((m) => m.dispose());
        else any.material?.dispose?.();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: "380px" }}
    />
  );
}
