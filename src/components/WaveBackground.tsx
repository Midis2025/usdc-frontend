"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WaveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x04070f, 1);
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04070f, 0.085);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
    const CAM_BASE = new THREE.Vector3(0, 7.6, 16.5);
    const LOOK_AT = new THREE.Vector3(0, -3.4, -7);
    camera.position.copy(CAM_BASE);
    camera.lookAt(LOOK_AT);

    // Particle Field Grid
    const GRID_X = 320;
    const GRID_Z = 320;
    const SPACING = 0.135;
    const COUNT = GRID_X * GRID_Z;

    const positions = new Float32Array(COUNT * 3);
    const aRandom = new Float32Array(COUNT);
    const aGrid = new Float32Array(COUNT * 2);

    let i = 0, j = 0, k = 0;
    for (let z = 0; z < GRID_Z; z++) {
      for (let x = 0; x < GRID_X; x++) {
        const px = (x - GRID_X / 2) * SPACING;
        const pz = (z - GRID_Z / 2) * SPACING;
        positions[i++] = px;
        positions[i++] = 0;
        positions[i++] = pz;

        aRandom[k] = Math.random();
        aGrid[j++] = x / GRID_X;
        aGrid[j++] = z / GRID_Z;
        k++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(aRandom, 1));
    geometry.setAttribute("aGrid", new THREE.BufferAttribute(aGrid, 2));

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 13.0 },
      uColorLow: { value: new THREE.Color(0x0d1f44) }, // deep valley blue
      uColorHigh: { value: new THREE.Color(0x3a7bff) }, // electric ridge blue
    };

    const vertexShader = `
      uniform float uTime;
      uniform float uSize;
      uniform float uPixelRatio;

      attribute float aRandom;
      attribute vec2 aGrid;

      varying float vElevation;
      varying float vFade;
      varying float vRand;

      // smooth value noise
      vec2 hash2(vec2 p){
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
              dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
          mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
              dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x),
          u.y);
      }

      void main() {
        vec3 pos = position;
        float t = uTime;

        // Shared current direction
        vec2 flow = vec2(0.42, 0.78) * t;

        // Layered swells
        float e = 0.0;
        e += noise(pos.xz * 0.10 + flow)              * 5.80;
        e += noise(pos.xz * 0.22 + flow * 1.6)        * 2.90;
        e += noise(pos.xz * 0.52 + flow * 2.5)        * 1.10;

        // A long travelling swell
        float roll = sin(pos.x * 0.08 + pos.z * 0.05 - t * 1.30);
        e += roll * 2.40;

        // Travelling directional ridge (the diagonal fold)
        float ridge = sin(pos.x * 0.10 + pos.z * 0.07 - t * 1.65);
        e += ridge * 1.45;

        pos.y += e;
        vElevation = e;
        vRand = aRandom;

        // Fade particles near the far edge and front edge for depth
        float distFade = smoothstep(0.0, 0.22, aGrid.y) * (1.0 - smoothstep(0.82, 1.0, aGrid.y));
        vFade = distFade;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float sizeVar = 0.6 + aRandom * 0.7;
        gl_PointSize = uSize * sizeVar * uPixelRatio * (1.0 / -mvPosition.z);
      }
    `;

    const fragmentShader = `
      uniform vec3 uColorLow;
      uniform vec3 uColorHigh;

      varying float vElevation;
      varying float vFade;
      varying float vRand;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float core = smoothstep(0.5, 0.0, d);
        float glow = smoothstep(0.5, 0.12, d);

        float lift = smoothstep(-2.5, 4.5, vElevation);
        vec3 col = mix(uColorLow, uColorHigh, lift);

        float hot = smoothstep(3.0, 7.0, vElevation);
        col += vec3(0.12, 0.28, 0.6) * hot;

        float alpha = (core * 0.9 + glow * 0.35) * vFade;
        alpha *= (0.55 + lift * 0.65);

        if (alpha < 0.01) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = -0.15;
    particles.position.y = -2.6;
    particles.position.z = -2.0;
    scene.add(particles);

    // Pointer drift logic
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", handlePointerMove);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isInView) return; // Skip updating/rendering if off-screen
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = reduceMotion ? 0.0 : elapsed;

      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;

      const drift = reduceMotion ? 0 : Math.sin(elapsed * 0.12) * 0.35;
      camera.position.x = CAM_BASE.x + drift + pointer.x * 0.8;
      camera.position.y = CAM_BASE.y + Math.cos(elapsed * 0.1) * 0.15 - pointer.y * 0.4;
      camera.position.z = CAM_BASE.z;
      camera.lookAt(LOOK_AT);

      renderer.render(scene, camera);
    };

    animate();

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
