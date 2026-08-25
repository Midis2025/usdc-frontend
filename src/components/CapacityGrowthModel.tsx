"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/* ═══════════════════════ CapacityGrowthModel ═══════════════════════ */

export default function CapacityGrowthModel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const labelsContainer = labelsRef.current;
    if (!container || !canvas || !labelsContainer) return;

    let isInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Remove any existing labels just in case
    labelsContainer.innerHTML = "";

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background

    const scene = new THREE.Scene();

    // ---- Static orthographic camera locked to the reference angle ----
    const ISO_DIR = new THREE.Vector3(6.2, 4.6, 13).normalize();
    const ISO_DIST = 30;
    const rig = {
      target: new THREE.Vector3(0.0, 3.2, 0), // Shift camera target to the center (from 0.5) to slide model slightly right
      d: 12.2, // Zoom out slightly (from 11.2) to give margin to the left and right edges
    };

    let camera: THREE.OrthographicCamera;
    let curAspect = container.clientWidth / container.clientHeight;

    camera = new THREE.OrthographicCamera(
      -rig.d * curAspect,
      rig.d * curAspect,
      rig.d,
      -rig.d,
      -100,
      200
    );
    camera.position.copy(rig.target).addScaledVector(ISO_DIR, ISO_DIST);
    camera.lookAt(rig.target);

    // ---------- palette ----------
    const COL = {
      bright: 0xffffff,
      dim: 0x9a9a9a,
      faint: 0x4a4a4a,
    };

    // ============ FLOOR GRID ============
    const floorGroup = new THREE.Group();
    // scene.add(floorGroup); // Disabled floor grid to remove the background grid lines as requested

    const gridMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      vertexColors: true,
    });

    (function buildGrid() {
      const size = 70, step = 5;
      const pts: number[] = [];
      const cols: number[] = [];
      const center = new THREE.Vector3(0, 0, 2);

      const pushSeg = (
        ax: number,
        ay: number,
        az: number,
        bx: number,
        by: number,
        bz: number
      ) => {
        pts.push(ax, ay, az, bx, by, bz);
        const da = 1 - Math.min(1, new THREE.Vector3(ax, ay, az).distanceTo(center) / 55);
        const db = 1 - Math.min(1, new THREE.Vector3(bx, by, bz).distanceTo(center) / 55);
        const ca = Math.max(0, da * 0.55);
        const cb = Math.max(0, db * 0.55);
        cols.push(ca, ca, ca, cb, cb, cb);
      };

      for (let i = -size; i <= size; i += step) {
        pushSeg(-size, 0, i, size, 0, i);
        pushSeg(i, 0, -size, i, 0, size);
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
      const lines = new THREE.LineSegments(g, gridMat);
      floorGroup.add(lines);
    })();

    // Reflective floor plane (removed to make background fully transparent)
    /*
    const floorPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.6 })
    );
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.position.y = -0.02;
    scene.add(floorPlane);
    */

    // ============ MATERIALS ============
    function edgeMat(opacity = 1) {
      return new THREE.LineBasicMaterial({ color: COL.bright, transparent: true, opacity });
    }
    function gridLineMat(opacity = 1) {
      return new THREE.LineBasicMaterial({ color: 0x6e6e6e, transparent: true, opacity });
    }
    function glassMat() {
      return new THREE.MeshBasicMaterial({
        color: 0x080808,
        transparent: true,
        opacity: 0.82,
        depthWrite: true,
      });
    }

    // Helper to draw range
    function makeDrawable(geo: THREE.BufferGeometry, mat: THREE.LineBasicMaterial) {
      const ls = new THREE.LineSegments(geo, mat);
      ls.userData.total = geo.getAttribute("position").count;
      geo.setDrawRange(0, 0);
      return ls;
    }

    // ============ CUBE CONSTRUCTION ============
    function makeCube(
      sizeX: number,
      sizeY: number,
      sizeZ: number,
      sub: number,
      label?: string
    ) {
      const grp = new THREE.Group();
      const hx = sizeX / 2, hy = sizeY / 2, hz = sizeZ / 2;

      // Glass Mesh
      const gMat = glassMat();
      gMat.polygonOffset = true;
      gMat.polygonOffsetFactor = 1;
      gMat.polygonOffsetUnits = 1;
      const glass = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ), gMat);
      glass.renderOrder = 0;
      grp.add(glass);

      // Outer Edges
      const eGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(sizeX, sizeY, sizeZ));
      const edges = makeDrawable(eGeo, edgeMat(1));
      edges.renderOrder = 2;
      grp.add(edges);

      // Glow Edges
      const glowGeo = eGeo.clone();
      const glowMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.LineSegments(glowGeo, glowMat);
      glow.scale.setScalar(1.004);
      glow.renderOrder = 3;
      glow.userData.total = glowGeo.getAttribute("position").count;
      glowGeo.setDrawRange(0, 0);
      grp.add(glow);
      grp.userData.glow = glow;

      // Internal Subdivisions Grid
      const gp: number[] = [];
      const facePush = (x: number, y: number, z: number) => gp.push(x, y, z);
      for (let i = 1; i < sub; i++) {
        const t = -0.5 + i / sub;
        for (const yy of [hy, -hy]) {
          facePush(-hx, yy, t * sizeZ); facePush(hx, yy, t * sizeZ);
          facePush(t * sizeX, yy, -hz); facePush(t * sizeX, yy, hz);
        }
        for (const zz of [hz, -hz]) {
          facePush(-hx, t * sizeY, zz); facePush(hx, t * sizeY, zz);
          facePush(t * sizeX, -hy, zz); facePush(t * sizeX, hy, zz);
        }
        for (const xx of [hx, -hx]) {
          facePush(xx, -hy, t * sizeZ); facePush(xx, hy, t * sizeZ);
          facePush(xx, t * sizeY, -hz); facePush(xx, t * sizeY, hz);
        }
      }
      const igGeo = new THREE.BufferGeometry();
      igGeo.setAttribute("position", new THREE.Float32BufferAttribute(gp, 3));
      const internal = makeDrawable(igGeo, gridLineMat(0.5));
      internal.renderOrder = 1;
      grp.add(internal);

      // Canvas Label Overlay
      if (label) {
        const cv = document.createElement("canvas");
        cv.width = 256;
        cv.height = 128;
        const ctx = cv.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 256, 128);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 56px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor = "rgba(255,255,255,0.5)";
          ctx.shadowBlur = 8;
          ctx.fillText(label, 128, 68);
        }
        const tex = new THREE.CanvasTexture(cv);
        tex.anisotropy = 8;
        const tw = sizeX * 0.72, th = tw * 0.5;
        const tMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(tw, th), tMat);
        plane.position.set(0, -sizeY * 0.06, hz + 0.02);
        grp.add(plane);
        grp.userData.textMat = tMat;
      }

      grp.userData.edges = edges;
      grp.userData.internal = internal;
      grp.userData.glass = glass;
      return grp;
    }

    // ============ PEDESTAL ============
    function makePlatformLayer(w: number, h: number, d: number) {
      const grp = new THREE.Group();
      const glass = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), glassMat());
      grp.add(glass);
      const eGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
      const edges = new THREE.LineSegments(eGeo, edgeMat(1));
      grp.add(edges);
      return grp;
    }

    function makePedestal() {
      const grp = new THREE.Group();
      const slabs = [
        { w: 6.4, h: 0.45, d: 6.4, y: 0.225 },
        { w: 5.4, h: 0.4, d: 5.4, y: 0.7 },
        { w: 4.4, h: 0.4, d: 4.4, y: 1.12 },
      ];
      slabs.forEach((s) => {
        const layer = makePlatformLayer(s.w, s.h, s.d);
        layer.position.y = s.y;
        grp.add(layer);
      });
      grp.userData.topY = 1.32;
      return grp;
    }

    // ============ ASSEMBLE 3 STACKS ============
    const CUBE = 3.0;
    const SUB = 4;
    const GAP = 9.5;

    interface Stack {
      root: THREE.Group;
      ped: THREE.Group;
      cubes: THREE.Group[];
      indicator: THREE.Line;
      indMat: THREE.LineBasicMaterial;
      ring: THREE.Mesh;
      ringMat: THREE.MeshBasicMaterial;
      dot: THREE.Mesh;
      dotMat: THREE.MeshBasicMaterial;
      markerWorld: THREE.Vector3;
      yrWorld: THREE.Vector3;
      valEl: HTMLDivElement;
      yrEl: HTMLDivElement;
      data: typeof data[number];
    }

    const stacks: Stack[] = [];

    const data = [
      { year: "2023", val: "55 GW", cubes: 1, x: -GAP },
      { year: "2027", val: "171 GW", cubes: 3, x: 0 },
      { year: "2030", val: "219 GW", cubes: 4, x: GAP },
    ];

    // Build labels helper
    const mkLabel = (cls: string, txt: string) => {
      const e = document.createElement("div");
      e.className = "lbl " + cls;
      e.textContent = txt;
      e.style.position = "absolute";
      e.style.color = cls === "yr" ? "#3daeff" : "#fff";
      e.style.fontFamily = "Arial, Helvetica, sans-serif";
      e.style.pointerEvents = "none";
      e.style.whiteSpace = "nowrap";
      e.style.transform = "translate(-50%, -50%)";
      e.style.textShadow = cls === "yr" ? "0 0 12px rgba(61, 174, 255, 0.65)" : "0 0 8px rgba(255, 255, 255, 0.35)";
      e.style.opacity = "0";
      e.style.transition = "opacity .6s ease";
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      if (cls === "val") {
        e.style.fontSize = isMobile ? "16px" : "26px";
        e.style.fontWeight = "400";
        e.style.letterSpacing = "1px";
      } else if (cls === "yr") {
        e.style.fontSize = isMobile ? "15px" : "24px";
        e.style.fontWeight = "bold";
        e.style.letterSpacing = "2px";
      }
      labelsContainer.appendChild(e);
      return e;
    };

    data.forEach((d, si) => {
      const root = new THREE.Group();
      root.position.x = d.x;
      scene.add(root);

      const ped = makePedestal();
      root.add(ped);

      const cubes: THREE.Group[] = [];
      for (let i = 0; i < d.cubes; i++) {
        const cu = makeCube(CUBE, CUBE, CUBE, SUB, "USDC");
        cu.position.y = ped.userData.topY + CUBE / 2 + i * CUBE;
        root.add(cu);
        cubes.push(cu);
      }
      const topCubeY = ped.userData.topY + d.cubes * CUBE;

      // indicator line
      const indLen = 2.0;
      const fz = 2.2;
      const indMat = new THREE.LineBasicMaterial({ color: COL.bright, transparent: true, opacity: 0 });
      const indGeo = new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute([0, topCubeY, fz, 0, topCubeY + indLen, fz], 3)
      );
      const indicator = new THREE.Line(indGeo, indMat);
      root.add(indicator);

      // marker ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: COL.bright,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.16, 24), ringMat);
      ring.position.set(0, topCubeY + indLen, fz);
      ring.quaternion.copy(camera.quaternion);
      ring.renderOrder = 6;
      root.add(ring);

      // dot marker
      const dotMat = new THREE.MeshBasicMaterial({ color: COL.bright, transparent: true, opacity: 0 });
      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), dotMat);
      dot.position.copy(ring.position);
      dot.quaternion.copy(camera.quaternion);
      dot.renderOrder = 7;
      root.add(dot);

      const markerWorld = new THREE.Vector3(d.x, topCubeY + indLen, fz);
      const yrWorld = new THREE.Vector3(d.x, -1.6, fz);

      const valEl = mkLabel("val", d.val);
      const yrEl = mkLabel("yr", d.year);

      stacks.push({
        root,
        ped,
        cubes,
        indicator,
        indMat,
        ring,
        ringMat,
        dot,
        dotMat,
        markerWorld,
        yrWorld,
        valEl,
        yrEl,
        data: d,
      });
    });

    // ============ GROWTH CURVE ============
    const markerAnchors = stacks.map((s) => s.markerWorld.clone());
    function buildSCurve() {
      const out: THREE.Vector3[] = [];
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const segPts = 40;
      for (let i = 0; i < markerAnchors.length - 1; i++) {
        const a = markerAnchors[i], b = markerAnchors[i + 1];
        for (let j = 0; j <= segPts; j++) {
          const u = j / segPts;
          const e = ease(u);
          const x = a.x + (b.x - a.x) * u;
          const y = a.y + (b.y - a.y) * e;
          const z = a.z + (b.z - a.z) * u;
          if (!(i > 0 && j === 0)) out.push(new THREE.Vector3(x, y, z));
        }
      }
      return out;
    }

    const curveRaw = buildSCurve();
    const curve = new THREE.CatmullRomCurve3(curveRaw, false, "catmullrom", 0.5);
    const CURVE_SEG = 260;
    const curveSampled = curve.getPoints(CURVE_SEG);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curveSampled);
    const curveMat = new THREE.LineBasicMaterial({ color: COL.bright, transparent: true, opacity: 0.95 });
    const curveLine = new THREE.Line(curveGeo, curveMat);
    curveLine.renderOrder = 5;
    curveGeo.setDrawRange(0, 0);
    scene.add(curveLine);

    // travelling particle
    const partMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particle = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), partMat);
    particle.visible = false;
    scene.add(particle);

    // faint scatter particles
    const scatterGeo = new THREE.BufferGeometry();
    const scN = 140, scPos: number[] = [];
    for (let i = 0; i < scN; i++) {
      const tVal = Math.random();
      const p = curve.getPoint(tVal);
      scPos.push(
        p.x + (Math.random() - 0.5) * 1.2,
        p.y + (Math.random() - 0.5) * 1.0,
        p.z + (Math.random() - 0.5) * 1.2
      );
    }
    scatterGeo.setAttribute("position", new THREE.Float32BufferAttribute(scPos, 3));
    const scatterMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0,
    });
    const scatter = new THREE.Points(scatterGeo, scatterMat);
    scene.add(scatter);

    // ============ HTML LABEL PROJECTION ============
    function projectLabels() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      const isMobile = w < 640 || curAspect < 1;

      stacks.forEach((s, idx) => {
        // Adjust horizontal pixel shift based on viewport width
        const xAdjustment = isMobile
          ? (idx === 1 ? -6 : idx === 2 ? 6 : 0)
          : (idx === 1 ? -18 : idx === 2 ? 18 : 0);

        // Responsive typography for mobile legibility without horizontal crowding
        if (isMobile) {
          s.valEl.style.fontSize = "17px";
          s.valEl.style.letterSpacing = "0.5px";
          s.yrEl.style.fontSize = "15px";
          s.yrEl.style.letterSpacing = "1px";
        } else {
          s.valEl.style.fontSize = "26px";
          s.valEl.style.letterSpacing = "1px";
          s.yrEl.style.fontSize = "24px";
          s.yrEl.style.letterSpacing = "2px";
        }

        // Project Value Label
        const v = s.markerWorld.clone().project(camera);
        s.valEl.style.left = (v.x * 0.5 + 0.5) * w + xAdjustment + "px";
        const valTopOffset = isMobile ? -18 : -26;
        s.valEl.style.top = (-v.y * 0.5 + 0.5) * h + valTopOffset + "px";

        // Project Year Label
        // On mobile view (curAspect < 1), orthographic camera vertical bounds are expanded.
        // We use a lower 3D Y position and centered Z offset on mobile so year labels sit cleanly below the pedestals.
        const yrWorldPos = isMobile
          ? new THREE.Vector3(s.data.x, -2.8, 1.2)
          : s.yrWorld;

        const vy = yrWorldPos.project(camera);
        s.yrEl.style.left = (vy.x * 0.5 + 0.5) * w + xAdjustment + "px";
        const yrTopOffset = isMobile ? 8 : 0;
        s.yrEl.style.top = (-vy.y * 0.5 + 0.5) * h + yrTopOffset + "px";
      });
    }

    // ============ ANIMATION TIMELINE ============
    let t = 0;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
    const seg = (time: number, start: number, dur: number) => clamp01((time - start) / dur);

    // pre-store base Y for cube rise
    stacks.forEach((s) =>
      s.cubes.forEach((c) => {
        c.userData.baseY = c.position.y;
      })
    );

    function setCubeBuild(cube: THREE.Group, p: number) {
      const rise = easeOut(clamp01(p / 0.5));
      cube.position.y = cube.userData.baseY - (1 - rise) * 2.2;
      (cube.userData.glass.material as THREE.MeshBasicMaterial).opacity = 0.55 * clamp01(p / 0.4);

      const ed = cube.userData.edges;
      const ig = cube.userData.internal;
      const ep = clamp01((p - 0.1) / 0.5);
      const edn = Math.floor(ed.userData.total * easeInOut(ep));

      ed.geometry.setDrawRange(0, edn);
      if (cube.userData.glow) {
        cube.userData.glow.geometry.setDrawRange(0, edn);
      }
      const gp2 = clamp01((p - 0.35) / 0.55);
      ig.geometry.setDrawRange(0, Math.floor(ig.userData.total * gp2));
      if (cube.userData.textMat) {
        (cube.userData.textMat as THREE.MeshBasicMaterial).opacity = clamp01((p - 0.6) / 0.4);
      }
    }

    const clock = new THREE.Clock();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isInView) return; // Skip updating/rendering if off-screen
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      // Scheduled build times for each stack
      const stackStart = [1.0, 3.8, 7.2];
      const PED_DUR = 1.0;
      const perCube = 0.8;

      // 1. Grid Reveal
      gridMat.opacity = easeInOut(seg(t, 0.0, 1.0));

      // 2. Pedestals & Cubes Build
      const stackDone: number[] = [];
      stacks.forEach((s, si) => {
        const pedStart = stackStart[si];
        s.root.visible = t >= pedStart - 0.05;
        if (!s.root.visible) return;

        const pp = easeOut(seg(t, pedStart, PED_DUR));
        s.ped.position.y = -3.5 * (1 - pp);

        const stackCubeStart = pedStart + PED_DUR * 0.75;
        s.cubes.forEach((cube, ci) => {
          const cs = stackCubeStart + ci * perCube;
          const p = seg(t, cs, perCube * 1.15);
          setCubeBuild(cube, p);
        });

        // Built timestamp
        const builtAt = stackCubeStart + s.cubes.length * perCube + 0.2;
        stackDone[si] = builtAt;

        // Indicator and markers show
        const ip = easeOut(seg(t, builtAt, 0.55));
        s.indMat.opacity = ip;
        s.ringMat.opacity = ip;
        s.dotMat.opacity = ip;
        s.ring.quaternion.copy(camera.quaternion);
        s.dot.quaternion.copy(camera.quaternion);

        if (ip > 0.5 && s.valEl.style.opacity !== "1") s.valEl.style.opacity = "1";
        if (pp > 0.5 && s.yrEl.style.opacity !== "1") s.yrEl.style.opacity = "1";
      });

      // 3. Draw S-Curve once endpoints are ready
      const half = (CURVE_SEG + 1) / 2;
      const seg1Start = (stackDone[1] || 99) + 0.1;
      const seg2Start = (stackDone[2] || 99) + 0.1;
      const c1 = easeInOut(seg(t, seg1Start, 1.4));
      const c2 = easeInOut(seg(t, seg2Start, 1.4));
      const drawn = Math.floor(half * c1 + half * c2);
      curveGeo.setDrawRange(0, drawn);
      scatterMat.opacity = 0.45 * clamp01((t - seg1Start) / 2.0);

      const cTotal = c1 * 0.5 + c2 * 0.5;
      if (cTotal > 0 && cTotal < 1) {
        particle.visible = true;
        particle.position.copy(curve.getPoint(cTotal));
      } else if (cTotal >= 1) {
        particle.visible = true;
        const loop = (t * 0.1) % 1;
        particle.position.copy(curve.getPoint(loop));
      } else {
        particle.visible = false;
      }

      // 4. Ambient floating glow pulse on built stacks
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6);
      stacks.forEach((s, si) => {
        if (!s.root.visible) return;
        const fl = Math.sin(t * 0.8 + si) * 0.04;
        s.cubes.forEach((c, ci) => {
          if (c.userData.edges) {
            (c.userData.edges.material as THREE.LineBasicMaterial).opacity = 0.85 + 0.15 * pulse;
          }
          if (c.userData.glow) {
            (c.userData.glow.material as THREE.LineBasicMaterial).opacity = 0.12 + 0.10 * pulse;
          }
          c.position.y = c.userData.baseY + fl * (ci + 1) * 0.25;
        });
      });
      scatter.rotation.y += dt * 0.05;

      projectLabels();
      renderer.render(scene, camera);
    }
    animate();

    // Resize Canvas Handler
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      curAspect = w / h;

      const isMobile = w < 640;
      stacks.forEach((s) => {
        if (s.valEl) s.valEl.style.fontSize = isMobile ? "16px" : "26px";
        if (s.yrEl) s.yrEl.style.fontSize = isMobile ? "15px" : "24px";
      });

      if (curAspect < 1) {
        // Use correct camera aspect ratio mapping to avoid distortion
        const horizontalMargin = 13.5;
        camera.left = -horizontalMargin;
        camera.right = horizontalMargin;
        camera.top = horizontalMargin / curAspect;
        camera.bottom = -horizontalMargin / curAspect;
      } else {
        camera.left = -rig.d * curAspect;
        camera.right = rig.d * curAspect;
        camera.top = rig.d;
        camera.bottom = -rig.d;
      }
      camera.updateProjectionMatrix();
      camera.position.copy(rig.target).addScaledVector(ISO_DIR, ISO_DIST);
      camera.lookAt(rig.target);
    };

    window.addEventListener("resize", resize);
    resize();

    // Cleanup Resources
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      observer.disconnect();
      scene.clear();
      renderer.dispose();
      gridMat.dispose();
      // floorPlane.geometry.dispose();
      // (floorPlane.material as THREE.MeshBasicMaterial).dispose();
      curveGeo.dispose();
      curveMat.dispose();
      partMat.dispose();
      particle.geometry.dispose();
      scatterGeo.dispose();
      scatterMat.dispose();
      labelsContainer.innerHTML = "";
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[250px]">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
    </div>
  );
}
