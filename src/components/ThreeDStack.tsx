"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDStackProps {
  activePlate?: number | null;
  onPlateChange?: (idx: number | null) => void;
}

export default function ThreeDStack({ activePlate, onPlateChange }: ThreeDStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const activePlateRef = useRef<number | null>(null);
  const onPlateChangeRef = useRef<((idx: number | null) => void) | undefined>(undefined);

  useEffect(() => {
    activePlateRef.current = activePlate !== undefined ? activePlate : null;
  }, [activePlate]);

  useEffect(() => {
    onPlateChangeRef.current = onPlateChange;
  }, [onPlateChange]);

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

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();

    // ---- fixed isometric camera ----
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    function setCam() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      renderer.setSize(w, h);
      const a = w / h;
      const f = 7.8;
      if (a < 1) {
        camera.left = -f;
        camera.right = f;
        camera.top = f / a;
        camera.bottom = -f / a;
      } else {
        camera.left = -f * a;
        camera.right = f * a;
        camera.top = f;
        camera.bottom = -f;
      }
      camera.updateProjectionMatrix();
    }
    camera.position.set(9, 8.2, 9);
    camera.lookAt(0, 0, 0);
    setCam();

    const onResize = () => setCam();
    window.addEventListener("resize", onResize);

    // Camera rig Y movement
    const camView = new THREE.Vector3(9, 8.2, 9);
    let camTargetY = 0;
    let camRigY = 0;
    function applyCam() {
      camera.position.set(camView.x, camView.y + camRigY, camView.z);
      camera.lookAt(0, camRigY, 0);
    }

    // ====================================================================
    //  REUSABLE SHADER MATERIALS
    // ====================================================================
    function dottedLineMat(
      color: number,
      density = 42,
      opacity = 0.6,
      _size = 1.0
    ) {
      return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uProg: { value: 0 },
          uDen: { value: density },
          uOp: { value: opacity },
          uSize: { value: _size },
        },
        vertexShader: `attribute float aDist; varying float vD; uniform float uSize;
          void main(){ vD=aDist; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `precision highp float; varying float vD;
          uniform vec3 uColor; uniform float uProg,uDen,uOp;
          void main(){
            if(vD>uProg) discard;
            float d=fract(vD*uDen);
            float dot=smoothstep(0.5,0.42,abs(d-0.5));
            float edge=smoothstep(uProg,uProg-0.04,vD);
            float a=dot*uOp*(0.85+0.6*edge);
            gl_FragColor=vec4(uColor*(1.0+edge*0.8),a);
          }`,
      });
    }

    function drawLineMat(color: number, opacity = 0.9) {
      return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uProg: { value: 0 },
          uOp: { value: opacity },
        },
        vertexShader: `attribute float aDist; varying float vD;
          void main(){ vD=aDist; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `varying float vD; uniform vec3 uColor; uniform float uProg,uOp;
          void main(){ if(vD>uProg) discard;
            float edge=smoothstep(uProg,uProg-0.06,vD);
            gl_FragColor=vec4(uColor*(1.0+edge),uOp*(0.6+0.4*edge)); }`,
      });
    }

    // glow texture
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,255,255,.7)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    function glowNode(color: number, scale = 0.34) {
      const m = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: false,
          opacity: 0,
        })
      );
      m.scale.setScalar(scale);
      return m;
    }

    function withDist(pts: THREE.Vector3[]) {
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const d = new Float32Array(pts.length);
      let tot = 0;
      for (let i = 1; i < pts.length; i++) {
        tot += pts[i].distanceTo(pts[i - 1]);
        d[i] = tot;
      }
      for (let i = 0; i < d.length; i++) d[i] /= tot || 1;
      g.setAttribute("aDist", new THREE.BufferAttribute(d, 1));
      return g;
    }

    // ====================================================================
    //  PLATFORMS
    // ====================================================================
    const PW = 6.2,
      PD = 6.2,
      PT = 0.5,
      GAP = 1.95,
      baseY = -2.0;

    function rgbEdges(geo: THREE.BoxGeometry, depthDim = 1) {
      const e = new THREE.EdgesGeometry(geo, 1);
      const g = new THREE.Group();
      const mk = (dx: number, dz: number, col: number, op: number) => {
        const m = new THREE.LineBasicMaterial({
          color: col,
          transparent: true,
          opacity: op,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        (m.userData as Record<string, number>).base = op * depthDim;
        const l = new THREE.LineSegments(e, m);
        l.position.set(dx, 0, dz);
        return l;
      };
      g.add(mk(0.02, 0.011, 0xff2540, 0.28));
      g.add(mk(-0.02, -0.011, 0x18c4ff, 0.28));
      g.add(mk(0.0, 0.0, 0x39ff8a, 0.06));
      g.add(mk(0, 0, 0x8a9098, 0.7));
      return g;
    }

    function makePlatform(depthDim: number) {
      const grp = new THREE.Group();
      const geo = new THREE.BoxGeometry(PW, PT, PD);
      const face = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color: 0x03050a,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        })
      );
      grp.add(face);
      const e = rgbEdges(geo, depthDim);
      grp.add(e);
      grp.userData = {
        edgeGroup: e,
        faceMat: face.material,
        faceBase: 0.35 * depthDim,
      };
      return grp;
    }

    const layerDefs = [
      { name: "AI Applications", y: baseY, dim: 0.7 },
      { name: "GPU Compute", y: baseY + GAP, dim: 0.82 },
      { name: "Cooling & Network", y: baseY + GAP * 2, dim: 0.92 },
      { name: "Power Infrastructure", y: baseY + GAP * 3, dim: 1.0 },
    ];

    const layers = layerDefs.map((d) => {
      const p = makePlatform(d.dim);
      p.position.set(0, d.y, 0);
      p.userData.targetY = d.y;
      p.userData.def = d;
      scene.add(p);
      return p;
    });

    // labels - skewed canvas mesh
    function textPlane(text: string) {
      const cv = document.createElement("canvas");
      cv.width = 1024;
      cv.height = 160;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, 1024, 160);
      ctx.font = "600 70px Helvetica,Arial,sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(text, 512, 86);
      const tex = new THREE.CanvasTexture(cv);
      tex.anisotropy = 8;
      const w = PW * 0.92,
        h = (w * 160) / 1024;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        opacity: 0,
      });
      return new THREE.Mesh(geo, mat);
    }

    layers.forEach((p) => {
      const m = textPlane(p.userData.def.name);
      m.position.set(0, 0, PD * 0.5 + 0.012);
      p.add(m);
      p.userData.label = m;
    });

    // ====================================================================
    //  VERTICAL DOTTED GUIDE COLUMNS + LAYER JOINT CONNECTORS
    // ====================================================================
    const dots = new THREE.Group();
    scene.add(dots);

    function dottedColumn(x: number, z: number, top: number, bot: number) {
      const pts = [new THREE.Vector3(x, bot, z), new THREE.Vector3(x, top, z)];
      const g = withDist(pts);
      const m = dottedLineMat(0xffffff, (top - bot) * 3.2, 0.5);
      const l = new THREE.Line(g, m);
      l.userData.mat = m;
      l.userData.baseOp = 0.5;
      return l;
    }

    function jointTick(x: number, z: number, y: number) {
      const p2 = [
        new THREE.Vector3(x - 0.05, y, z + 0.3),
        new THREE.Vector3(x - 0.05, y, z - 0.3),
      ];
      const g = withDist(p2);
      const m = dottedLineMat(0xffffff, 12, 0.65);
      const l = new THREE.Line(g, m);
      l.userData.mat = m;
      l.userData.baseOp = 0.65;
      l.userData.y0 = y;
      return l;
    }

    const PT_TOP = PT * 0.5;
    const joints = [
      [PW * 0.5, PD * 0.11, 0], // joint 1-4 (front-right, longest) -> AI Applications
      [PW * 0.5, -PD * 0.21, 1], // joint 1-3 (mid-right) -> GPU Compute
      [PW * 0.5, -PD * 0.4, 2], // joint 1-2 (back-right, shortest) -> Cooling & Network
    ];

    interface JointGroup extends THREE.Group {
      userData: {
        plate: number;
        x: number;
        z: number;
        col: THREE.Line;
        topTick: THREE.Line;
        botTick: THREE.Line;
      };
    }

    const jointGroups: JointGroup[] = [];
    joints.forEach(([x, z, li]) => {
      const g = new THREE.Group() as JointGroup;
      g.userData = {
        plate: li,
        x,
        z,
        col: dottedColumn(x, z, 1, 0),
        topTick: jointTick(x, z, 0),
        botTick: jointTick(x, z, 0),
      };
      g.add(g.userData.col);
      g.add(g.userData.topTick);
      g.add(g.userData.botTick);
      dots.add(g);
      jointGroups.push(g);
    });

    function layoutJoint(g: JointGroup, topY: number, botY: number) {
      const x = g.userData.x,
        z = g.userData.z;
      const pos = g.userData.col.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, x, botY, z);
      pos.setXYZ(1, x, topY, z);
      pos.needsUpdate = true;
      g.userData.col.geometry.computeBoundingSphere();

      const mat = g.userData.col.userData.mat as THREE.ShaderMaterial;
      mat.uniforms.uDen.value = Math.max(0.001, topY - botY) * 3.2;

      g.userData.topTick.position.y = topY - g.userData.topTick.userData.y0;
      g.userData.botTick.position.y = botY - g.userData.botTick.userData.y0;
    }

    // ====================================================================
    //  STEP 6 — TOP GRID NETWORK
    // ====================================================================
    const TOP = layers[3];
    const topNet = new THREE.Group();
    TOP.add(topNet);
    const netNodes: THREE.Sprite[] = [];
    const netLines: THREE.Line[] = [];
    (() => {
      const N = 6,
        span = PW * 0.66,
        y = PT * 0.5 + 0.12;
      const litColors = [0x39ff8a, 0xffffff, 0x18c4ff];
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const x = (i / (N - 1) - 0.5) * span,
            z = (j / (N - 1) - 0.5) * span;
          const lit = (i * 7 + j * 5) % 4 === 0;
          const col = lit ? litColors[(i + j) % 3] : 0x5a606a;
          const g = glowNode(col, lit ? 0.32 : 0.18);
          g.position.set(x, y, z);
          topNet.add(g);
          g.userData = { d: Math.hypot(x, z), lit };
          netNodes.push(g);
        }
      }
      for (let i = 0; i < N; i++) {
        const a = (i / (N - 1) - 0.5) * span;
        const rowH = [
          new THREE.Vector3(-span / 2, y - 0.1, a),
          new THREE.Vector3(span / 2, y - 0.1, a),
        ];
        const rowV = [
          new THREE.Vector3(a, y - 0.1, -span / 2),
          new THREE.Vector3(a, y - 0.1, span / 2),
        ];
        [rowH, rowV].forEach((r) => {
          const m = dottedLineMat(0x70767e, span * 4.0, 0.45);
          const l = new THREE.Line(withDist(r), m);
          l.userData.mat = m;
          topNet.add(l);
          netLines.push(l);
        });
      }
    })();

    // ====================================================================
    //  STEP 8 — CENTER SQUARE + CONCENTRIC DOTTED RINGS  (Cooling & Network)
    // ====================================================================
    const SQL = layers[2];
    const squareGrp = new THREE.Group();
    SQL.add(squareGrp);
    const squareRings: THREE.Line[] = [];
    (() => {
      const y = PT * 0.5 + 0.02;
      for (let k = 1; k <= 4; k++) {
        const s = 0.46 * k;
        const pts = (
          [
            [-s, -s],
            [s, -s],
            [s, s],
            [-s, s],
            [-s, -s],
          ] as [number, number][]
        ).map((p) => new THREE.Vector3(p[0], y, p[1]));
        const dense: THREE.Vector3[] = [];
        for (let c = 0; c < 4; c++) {
          for (let t = 0; t < 14; t++) {
            const u = t / 14;
            dense.push(pts[c].clone().lerp(pts[c + 1], u));
          }
        }
        dense.push(pts[0].clone());
        const m = dottedLineMat(0xc8ccd2, 7 + k * 3, 0.8);
        const l = new THREE.Line(withDist(dense), m);
        l.userData = { mat: m, k };
        squareGrp.add(l);
        squareRings.push(l);
      }
      const eg = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(0.95, 0.02, 0.95)
      );
      const em = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const inner = new THREE.LineSegments(eg, em);
      inner.position.y = y;
      squareGrp.add(inner);
      squareGrp.userData.inner = inner;
      const gn = glowNode(0x39ff8a, 0.4);
      gn.position.set(0, y, 0);
      squareGrp.add(gn);
      squareGrp.userData.coreNode = gn;
    })();

    // ====================================================================
    //  STEP 9 — CIRCULAR SYSTEM  (GPU Compute)
    // ====================================================================
    const CRL = layers[1];
    const circGrp = new THREE.Group();
    CRL.add(circGrp);
    const circRings: THREE.Line[] = [];
    (() => {
      const y = PT * 0.5 + 0.02;
      for (let k = 1; k <= 4; k++) {
        const r = 0.45 * k,
          pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          pts.push(
            new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r)
          );
        }
        const dotted = k % 2 === 0;
        const m = dotted
          ? dottedLineMat(0xb8bcc2, 18, 0.75)
          : drawLineMat(k === 1 ? 0x18c4ff : 0xd8dce2, 0.85);
        const l = new THREE.Line(withDist(pts), m);
        l.userData = { mat: m, k };
        circGrp.add(l);
        circRings.push(l);
      }
      // spiral accent arc
      const sp: THREE.Vector3[] = [];
      for (let i = 0; i <= 90; i++) {
        const a = (i / 90) * Math.PI * 1.7;
        const r = 0.5 + (i / 90) * 1.0;
        sp.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      const sm = drawLineMat(0xffffff, 0.9);
      const sl = new THREE.Line(withDist(sp), sm);
      sl.userData = { mat: sm, k: 0 };
      circGrp.add(sl);
      circRings.push(sl);
      const gn = glowNode(0x18c4ff, 0.36);
      gn.position.set(0.45, y, 0);
      circGrp.add(gn);
      circGrp.userData.node = gn;
    })();

    // ====================================================================
    //  STEP 10 — INTERSECTING CIRCLES / VENN  (AI Applications)
    // ====================================================================
    const VNL = layers[0];
    const vennGrp = new THREE.Group();
    VNL.add(vennGrp);
    (() => {
      const y = PT * 0.5 + 0.02,
        R = 1.25,
        off = 0.95;
      const lpts: THREE.Vector3[] = [];
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        lpts.push(
          new THREE.Vector3(-off + Math.cos(a) * R, y, Math.sin(a) * R)
        );
      }
      const lm = drawLineMat(0xffffff, 0.9);
      const ll = new THREE.Line(withDist(lpts), lm);
      ll.userData = { mat: lm };
      vennGrp.add(ll);
      const rpts: THREE.Vector3[] = [];
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        rpts.push(
          new THREE.Vector3(off + Math.cos(a) * R, y, Math.sin(a) * R)
        );
      }
      const rm = dottedLineMat(0xc8ccd2, 20, 0.7);
      const rl = new THREE.Line(withDist(rpts), rm);
      rl.userData = { mat: rm };
      vennGrp.add(rl);
      // lens particles
      const lens: THREE.Vector3[] = [];
      for (let i = 0; i < 1100; i++) {
        const x = (Math.random() - 0.5) * 2.2,
          z = (Math.random() - 0.5) * 2.6;
        if (
          (x + off) ** 2 + z * z < R * R &&
          (x - off) ** 2 + z * z < R * R
        )
          lens.push(new THREE.Vector3(x, y, z));
      }
      const lg = new THREE.BufferGeometry().setFromPoints(lens);
      const lpm = new THREE.PointsMaterial({
        color: 0xe6e8ea,
        size: 0.05,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lp = new THREE.Points(lg, lpm);
      lp.userData = { pm: lpm };
      vennGrp.add(lp);
      const tn: THREE.Sprite[] = [];
      for (let i = 0; i < 2; i++) {
        const g = glowNode(i ? 0x39ff8a : 0xff2f5e, 0.4);
        vennGrp.add(g);
        tn.push(g);
      }
      vennGrp.userData = { travel: tn, R, off, y, parts: lp };
    })();

    // ====================================================================
    //  REVEAL EASE HELPERS
    // ====================================================================
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
    const seg = (t: number, a: number, b: number) =>
      clamp01((t - a) / (b - a));

    function setLayerOpacity(p: THREE.Group, o: number) {
      p.userData.faceMat.opacity = p.userData.faceBase * o;
      p.userData.edgeGroup.children.forEach((c: THREE.LineSegments) => {
        (c.material as THREE.LineBasicMaterial).opacity =
          (c.material as THREE.LineBasicMaterial & { userData: Record<string, number> }).userData.base * o;
      });
      if (p.userData.label) {
        ((p.userData.label as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = o * 0.92;
      }
    }
    layers.forEach((p) => {
      p.visible = false;
      setLayerOpacity(p, 0);
    });

    function revealLayer(p: THREE.Group, prog: number, riseFrom: number) {
      if (prog <= 0) {
        p.visible = false;
        p.userData.buildOff = riseFrom;
        return;
      }
      p.visible = true;
      const e = easeOut(clamp01(prog));
      setLayerOpacity(p, e);
      p.userData.buildOff = (1 - e) * riseFrom;
    }

    // ====================================================================
    //  CLICK-DRIVEN OPEN/CLOSE MODEL
    // ====================================================================
    const OPEN_LIFT = 2.2;
    const BUILD = 0.9;
    const BUILD_GAP = 0.55;

    const buildStart = 0.4;
    const bTimes = layers.map((_, i) => buildStart + i * BUILD_GAP);
    const buildEnd = bTimes[bTimes.length - 1] + BUILD;

    const openProg = [0, 0, 0, 0]; // 0 closed .. 1 open (indexed by plate; top layer 3 unused)
    let openPlate: number | null = null;

    const clock = new THREE.Clock();

    function hideNet() {
      netNodes.forEach((n) => (n.material.opacity = 0));
      netLines.forEach(
        (l) =>
          ((l.userData.mat as THREE.ShaderMaterial).uniforms.uProg.value = 0)
      );
    }

    function setSquare(p: number, fade: number) {
      squareRings.forEach((l) => {
        const local = clamp01(p * 1.6 - (l.userData.k - 1) * 0.16);
        (l.userData.mat as THREE.ShaderMaterial).uniforms.uProg.value =
          easeOut(local);
        (l.userData.mat as THREE.ShaderMaterial).uniforms.uOp.value =
          0.8 * fade;
      });
      ((squareGrp.userData.inner as THREE.LineSegments).material as THREE.LineBasicMaterial).opacity =
        easeOut(clamp01(p * 2)) * 0.9 * fade;
      const pulse = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 3);
      (squareGrp.userData.coreNode as THREE.Sprite).material.opacity =
        easeOut(clamp01(p * 2)) * (0.5 + 0.5 * pulse) * fade;
    }

    function setCircles(p: number, fade: number) {
      circRings.forEach((l, i) => {
        const local = clamp01(p * 1.7 - i * 0.11);
        if ((l.userData.mat as THREE.ShaderMaterial).uniforms.uProg) {
          (l.userData.mat as THREE.ShaderMaterial).uniforms.uProg.value =
            easeOut(local);
        }
        (l.userData.mat as THREE.ShaderMaterial).uniforms.uOp.value =
          (i === 0 ? 0.9 : 0.78) * fade;
      });
      (circGrp.userData.node as THREE.Sprite).material.opacity =
        easeOut(clamp01(p * 1.5)) * fade;
    }

    function setVenn(p: number, fade: number) {
      const vis = easeOut(p);
      vennGrp.children.forEach((ch) => {
        if (
          ch.userData.mat &&
          (ch.userData.mat as THREE.ShaderMaterial).uniforms
        ) {
          if ((ch.userData.mat as THREE.ShaderMaterial).uniforms.uProg) {
            (ch.userData.mat as THREE.ShaderMaterial).uniforms.uProg.value =
              vis;
          }
          (ch.userData.mat as THREE.ShaderMaterial).uniforms.uOp.value =
            0.85 * fade;
        }
      });
      (
        (vennGrp.userData.parts as THREE.Points).userData
          .pm as THREE.PointsMaterial
      ).opacity = vis * 0.8 * fade;

      const { travel, R: vR, off: vOff, y: vY } = vennGrp.userData;
      (travel as THREE.Sprite[]).forEach((m, i) => {
        m.material.opacity = vis * fade;
        const a = clock.getElapsedTime() * 0.9 + i * Math.PI;
        m.position.set(
          (i ? vOff : -vOff) + Math.cos(a) * vR,
          vY,
          Math.sin(a) * vR
        );
      });
    }

    function playPlate(idx: number, prog: number, fade: number) {
      if (idx === 2) setSquare(prog, fade);
      else if (idx === 1) setCircles(prog, fade);
      else if (idx === 0) setVenn(prog, fade);
    }

    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isInView) return; // Skip updating/rendering if off-screen

      const t = clock.getElapsedTime();
      const built = t > buildEnd;

      // BUILD: fade and rise into stack (once at start)
      layers.forEach((p, i) => {
        const bp = seg(t, bTimes[i], bTimes[i] + BUILD);
        revealLayer(p, bp, 1.8);
      });

      // Sync openPlate from parent ref if passed, otherwise use local openPlate
      const currentOpenPlate = onPlateChangeRef.current !== undefined ? activePlateRef.current : openPlate;

      // EASE open/close state
      for (let i = 0; i < 4; i++) {
        const target = built && i === currentOpenPlate ? 1 : 0;
        openProg[i] += (target - openProg[i]) * 0.12;
        if (Math.abs(target - openProg[i]) < 0.0005) openProg[i] = target;
      }

      // POSITION: lift layers above opened gap
      const lift = [0, 0, 0, 0];
      for (let k = 0; k < 3; k++) {
        if (openProg[k] <= 0.0001) continue;
        for (let above = k + 1; above <= 3; above++) {
          lift[above] += OPEN_LIFT * openProg[k];
        }
      }
      layers.forEach((p, i) => {
        const buildOff = p.userData.buildOff || 0;
        p.position.y = p.userData.targetY + buildOff + lift[i];
      });

      // DOTTED JOINTS: visible only when stretching open
      dots.visible = built;
      jointGroups.forEach((g) => {
        const k = g.userData.plate;
        const topY = layers[3].position.y + PT_TOP;
        const botY = layers[k].position.y + PT_TOP;
        layoutJoint(g, topY, botY);

        const vis = openProg[k];
        g.visible = vis > 0.001;
        g.children.forEach((l) => {
          (l.userData.mat as THREE.ShaderMaterial).uniforms.uProg.value =
            easeOut(clamp01(vis * 1.3));
          (l.userData.mat as THREE.ShaderMaterial).uniforms.uOp.value =
            (l.userData.baseOp || 0.5) * vis;
        });
      });

      // INNER ANIMATIONS
      hideNet();
      setSquare(0, 0);
      setCircles(0, 0);
      setVenn(0, 0);

      const anyOpen = Math.max(openProg[0], openProg[1], openProg[2]);
      const netShow = easeOut(seg(t, buildEnd, buildEnd + 0.9));
      netNodes.forEach((n) => {
        n.material.opacity = netShow * (n.userData.lit ? 1.0 : 0.55);
        n.scale.setScalar(n.userData.lit ? 0.32 : 0.18);
      });
      netLines.forEach((l) => {
        (l.userData.mat as THREE.ShaderMaterial).uniforms.uProg.value =
          netShow;
        (l.userData.mat as THREE.ShaderMaterial).uniforms.uOp.value =
          0.5 * netShow;
      });

      for (let k = 0; k < 3; k++) {
        if (openProg[k] <= 0.001) continue;
        playPlate(k, easeOut(clamp01(openProg[k] * 1.2)), openProg[k]);
      }

      if (openProg[1] > 0.5) {
        circGrp.rotation.y += 0.004;
      }

      // CAMERA POSITIONING
      let focusY: number;
      if (currentOpenPlate != null && anyOpen > 0.001) {
        focusY = (layers[currentOpenPlate].position.y + layers[3].position.y) / 2;
      } else {
        focusY = (layers[0].position.y + layers[3].position.y) / 2;
      }
      camTargetY = focusY;
      camRigY += (camTargetY - camRigY) * 0.06;
      applyCam();

      renderer.render(scene, camera);
    }
    animate();

    // Raycast pick layer labels
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const labelMeshes = layers.map((p) => p.userData.label as THREE.Mesh);

    function pickLayer(ev: MouseEvent) {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(labelMeshes, false);
      if (!hits.length) return null;
      return labelMeshes.indexOf(hits[0].object as THREE.Mesh);
    }

    function toggleLayer(idx: number | null) {
      if (idx == null) return;
      if (idx === 3) {
        // If clicking anchor (Power Infrastructure), trigger onPlateChange(null) to close all layers
        if (onPlateChangeRef.current) {
          onPlateChangeRef.current(null);
        } else {
          openPlate = null;
        }
        return;
      }
      const currentOpenPlate = onPlateChangeRef.current !== undefined ? activePlateRef.current : openPlate;
      const nextPlate = currentOpenPlate === idx ? null : idx;
      if (onPlateChangeRef.current) {
        onPlateChangeRef.current(nextPlate);
      } else {
        openPlate = nextPlate;
      }
    }

    const clickHandler = (ev: MouseEvent) => {
      toggleLayer(pickLayer(ev));
    };
    const hoverHandler = (ev: MouseEvent) => {
      const idx = pickLayer(ev);
      canvas.style.cursor = idx != null && idx !== 3 ? "pointer" : "default";
    };

    canvas.addEventListener("click", clickHandler);
    canvas.addEventListener("mousemove", hoverHandler);

    // Global Hooks
    (window as any).openLayerByName = function (name: string) {
      const i = layers.findIndex(
        (p) =>
          p.userData.def.name.toLowerCase() ===
          String(name).toLowerCase()
      );
      if (i >= 0) toggleLayer(i);
    };
    (window as any).openLayerByIndex = function (i: number) {
      toggleLayer(i);
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", clickHandler);
      canvas.removeEventListener("mousemove", hoverHandler);
      renderer.dispose();
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Points
        ) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            (obj.material as THREE.Material).dispose();
          }
        }
        if (obj instanceof THREE.Sprite) {
          obj.material?.dispose();
        }
      });
      glowTex.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      delete (window as any).openLayerByName;
      delete (window as any).openLayerByIndex;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
}
