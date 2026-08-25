"use client";

import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   Modular AI Data Centre — Three.js canvas
   Adapted from standalone HTML for embedding
   in the ARMS hero right-column panel.
══════════════════════════════════════════════ */

export default function ArmsDataCentreModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Dynamically load Three.js from CDN ── */
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => initScene(canvas);
    document.head.appendChild(script);

    return () => {
      // cleanup handled by renderer dispose inside
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
    />
  );
}

/* ─────────────────────────────────────────── */
function initScene(canvas: HTMLCanvasElement) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const THREE = (window as any).THREE as any;
  if (!THREE) return;

  const W_CONT = canvas.parentElement?.clientWidth ?? 600;
  const H_CONT = canvas.parentElement?.clientHeight ?? 520;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, W_CONT / H_CONT, 0.1, 200);
  camera.position.set(13, 7, 14);
  camera.lookAt(0, 1.5, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W_CONT, H_CONT);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  const COL = {
    sky: 0x38BDF8, skyBright: 0x7DD3FC, electric: 0x0EA5E9, cyan: 0x67E8F9,
    bodyDark: 0x16181C, bodyDarker: 0x0F1013, bodyMid: 0x202329,
  };

  // Lighting
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.20));
  scene.add(new THREE.HemisphereLight(0xBFE6FF, 0x0A0A0E, 0.35));
  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 0.72);
  keyLight.position.set(8, 18, 12);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -16; keyLight.shadow.camera.right = 16;
  keyLight.shadow.camera.top = 16; keyLight.shadow.camera.bottom = -16;
  keyLight.shadow.bias = -0.0004; keyLight.shadow.radius = 4;
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x9DB4DC, 0.20);
  fillLight.position.set(-10, 6, -8); scene.add(fillLight);
  const rimLight = new THREE.DirectionalLight(0x67E8F9, 0.28);
  rimLight.position.set(-6, 9, -14); scene.add(rimLight);
  const intLight = new THREE.PointLight(0x38BDF8, 0.7, 10);
  intLight.position.set(1, 1.6, 0); scene.add(intLight);

  // Materials
  const matBodyDark = new THREE.MeshStandardMaterial({ color: COL.bodyDark, metalness: 0.82, roughness: 0.38 });
  const matBodyMid  = new THREE.MeshStandardMaterial({ color: COL.bodyMid,  metalness: 0.80, roughness: 0.42 });
  const matBodyDarker = new THREE.MeshStandardMaterial({ color: COL.bodyDarker, metalness: 0.78, roughness: 0.46 });

  // Env map
  (() => {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const c = document.createElement("canvas"); c.width = 16; c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0.0, "#0d1622"); g.addColorStop(0.45, "#0a0f16");
    g.addColorStop(0.5, "#0c1118"); g.addColorStop(1.0, "#04060a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 16, 256);
    ctx.fillStyle = "rgba(120,200,255,0.55)"; ctx.fillRect(0, 40, 16, 10);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const env = pmrem.fromEquirectangular(tex).texture;
    scene.environment = env;
    [matBodyDark, matBodyMid, matBodyDarker].forEach(m => { m.envMap = env; m.envMapIntensity = 1.1; });
    tex.dispose(); pmrem.dispose();
  })();

  function makeEdgeMat(opacity = 0.5) {
    return new THREE.LineBasicMaterial({ color: COL.sky, transparent: true, opacity, linewidth: 1 });
  }
  function addEdge(group: any, geo: any, pos: any, op = 0.5) {
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(geo), makeEdgeMat(op));
    l.position.copy(pos); group.add(l);
  }
  function makeAccent(intensity = 1.0) {
    return new THREE.MeshStandardMaterial({
      color: COL.sky, emissive: COL.sky, emissiveIntensity: intensity,
      metalness: 0.4, roughness: 0.32,
    });
  }
  const pipeMat = new THREE.MeshStandardMaterial({
    color: COL.sky, emissive: COL.sky, emissiveIntensity: 0.7,
    metalness: 0.5, roughness: 0.28,
  });

  // ── Building ──
  const moduleGroup = new THREE.Group();
  scene.add(moduleGroup);

  const W = 7.2, H = 2.8, D = 3.6, wallThick = 0.12;
  const PB_W = W + 0.6, PB_H = 0.18, PB_D = D + 0.6;

  const plinth = new THREE.Mesh(new THREE.BoxGeometry(PB_W, PB_H, PB_D), matBodyMid);
  plinth.position.y = PB_H / 2; plinth.castShadow = plinth.receiveShadow = true;
  moduleGroup.add(plinth);
  addEdge(moduleGroup, new THREE.BoxGeometry(PB_W, PB_H, PB_D), new THREE.Vector3(0, PB_H / 2, 0), 0.55);

  const innerFloor = new THREE.Mesh(
    new THREE.BoxGeometry(W * 0.95, 0.05, D * 0.92),
    new THREE.MeshStandardMaterial({ color: 0x121419, metalness: 0.5, roughness: 0.6 })
  );
  innerFloor.position.y = PB_H + 0.025; innerFloor.receiveShadow = true;
  moduleGroup.add(innerFloor);

  function addWall(geo: any, pos: [number, number, number]) {
    const m = new THREE.Mesh(geo, matBodyDark);
    m.position.set(...pos); m.castShadow = m.receiveShadow = true;
    moduleGroup.add(m);
    addEdge(moduleGroup, geo, new THREE.Vector3(...pos), 0.5);
  }
  addWall(new THREE.BoxGeometry(W, H, wallThick), [0, PB_H + H / 2, -D / 2 + wallThick / 2]);
  addWall(new THREE.BoxGeometry(wallThick, H, D), [-W / 2 + wallThick / 2, PB_H + H / 2, 0]);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(W, 0.10, D), matBodyDarker);
  roof.position.set(0, PB_H + H + 0.05, 0); roof.castShadow = roof.receiveShadow = true;
  moduleGroup.add(roof);
  addEdge(moduleGroup, new THREE.BoxGeometry(W, 0.10, D), new THREE.Vector3(0, PB_H + H + 0.05, 0), 0.5);

  // Openable front wall
  const frontW = W * 0.5;
  const openableWall = new THREE.Group();
  openableWall.position.set(-W / 2 + frontW / 2, PB_H + H, D / 2 - wallThick / 2);
  moduleGroup.add(openableWall);
  const wallPanel = new THREE.Mesh(new THREE.BoxGeometry(frontW, H, wallThick), matBodyDark);
  wallPanel.position.set(0, -H / 2, 0); wallPanel.castShadow = wallPanel.receiveShadow = true;
  openableWall.add(wallPanel);
  addEdge(openableWall, new THREE.BoxGeometry(frontW, H, wallThick), new THREE.Vector3(0, -H / 2, 0), 0.55);

  // Roof rails
  function makeRail(x1: number, z1: number, x2: number, z2: number) {
    const dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.04, 0.025), makeAccent(0.55));
    rail.position.set((x1 + x2) / 2, PB_H + H + 0.12, (z1 + z2) / 2);
    rail.rotation.y = Math.atan2(dz, dx);
    moduleGroup.add(rail);
  }
  makeRail(-W/2+0.15, D/2-0.15, W/2-0.15, D/2-0.15);
  makeRail(-W/2+0.15, -D/2+0.15, W/2-0.15, -D/2+0.15);
  makeRail(-W/2+0.15, -D/2+0.15, -W/2+0.15, D/2-0.15);
  makeRail(W/2-0.15, -D/2+0.15, W/2-0.15, D/2-0.15);

  // Cooling units
  const fans: any[] = [];
  const coolingPositions: any[] = [];
  function makeCoolingUnit(x: number) {
    const unit = new THREE.Group();
    const housing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), matBodyMid);
    housing.position.y = 0.25; housing.castShadow = housing.receiveShadow = true;
    unit.add(housing);
    const housingLine = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 0.5, 1.2)), makeEdgeMat(0.5));
    housingLine.position.y = 0.25; unit.add(housingLine);
    const fanRim = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.035, 10, 36), makeAccent(0.75));
    fanRim.rotation.x = Math.PI / 2; fanRim.position.y = 0.52; unit.add(fanRim);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16), matBodyDark);
    hub.position.y = 0.54; unit.add(hub);
    const blades = new THREE.Group();
    for (let b = 0; b < 5; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.025, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x15171C, metalness: 0.7, roughness: 0.35 }));
      blade.rotation.y = (b / 5) * Math.PI * 2; blade.rotation.z = 0.18;
      blades.add(blade);
    }
    blades.position.y = 0.54;
    blades.userData.speed = 0.12 + Math.random() * 0.04;
    unit.add(blades); fans.push(blades);
    unit.position.set(x, PB_H + H + 0.10, -0.3);
    moduleGroup.add(unit);
    coolingPositions.push({ x, z: -0.3, y: PB_H + H + 0.10 });
  }
  makeCoolingUnit(-0.8); makeCoolingUnit(0.8);

  // ── Racks ──
  const racks: any[] = [];
  const RACK_W = 0.55, RACK_H = H * 0.8, RACK_D = D * 0.65;
  const LED_ROWS = 16, LED_COLS = 6;
  let nextIdx = 0;

  function buildRack(rx: number, rz: number, hidden = false) {
    const rack = new THREE.Group();
    const myIdx = nextIdx++;
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(RACK_W, RACK_H, RACK_D),
      new THREE.MeshStandardMaterial({ color: 0x070809, metalness: 0.7, roughness: 0.32 })
    );
    body.position.y = RACK_H / 2; body.castShadow = body.receiveShadow = true;
    body.userData.rackIndex = myIdx; rack.add(body);
    const bodyLine = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(RACK_W, RACK_H, RACK_D)), makeEdgeMat(0.45));
    bodyLine.position.y = RACK_H / 2; rack.add(bodyLine);

    const ledGroup = new THREE.Group();
    const ledData: any[] = [];
    for (let r = 0; r < LED_ROWS; r++) {
      for (let c = 0; c < LED_COLS; c++) {
        const ledMat = new THREE.MeshStandardMaterial({ color: COL.sky, emissive: COL.sky, emissiveIntensity: 0 });
        const led = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.022), ledMat);
        led.position.set(-RACK_W * 0.36 + c * (RACK_W * 0.144), RACK_H * 0.10 + r * (RACK_H * 0.052), RACK_D / 2 + 0.012);
        ledGroup.add(led); ledData.push({ mat: ledMat, row: r, col: c });
      }
    }
    rack.add(ledGroup);
    rack.position.set(rx, PB_H + 0.05, rz);
    rack.userData = { ...rack.userData, ledData, rackIndex: myIdx, baseZ: rz, finalZ: rz, targetForward: 0, currentForward: 0, rackX: rx, hoverProgress: 0, hoverWavePhase: 0, isHidden: hidden };

    if (hidden) {
      rack.visible = false;
      rack.userData.revealStartTime = null;
      rack.userData.hiddenStartZ = rz - 0.7;
      rack.position.z = rz - 0.7;
      rack.userData.baseZ = rz - 0.7;
      rack.scale.set(0.001, 0.001, 0.001);
    } else {
      rack.userData.revealStartTime = performance.now() + 200;
    }
    moduleGroup.add(rack); racks.push(rack);
    return rack;
  }

  const rackCount = 7, rackSpacing = 0.62, rackStartX = -W / 2 + 2.2;
  for (let i = 0; i < rackCount; i++) buildRack(rackStartX + i * rackSpacing, -0.1, false);
  const hiddenRackXs = [-3.15, -2.60, -2.05];
  const hiddenRacks: any[] = hiddenRackXs.map(x => { const r = buildRack(x, -0.1, true); return r; });

  // ── Pipes ──
  const PIPE_RADIUS = 0.085, PIPE_Y_TOP = PB_H + H * 0.86, PIPE_Z = -0.5;
  const PIPE_X_L = -W / 2 + 1.7, PIPE_X_R = W / 2 - 1.2;
  const pipeCurves: any[] = [];

  function makePipeCyl(p1: any, p2: any, r = PIPE_RADIUS) {
    const dir = new THREE.Vector3().subVectors(p2, p1);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 16), pipeMat);
    cyl.position.copy(mid);
    cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return cyl;
  }
  function makeSphere(pos: any, r = PIPE_RADIUS * 1.3) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 14), pipeMat);
    s.position.copy(pos); return s;
  }

  for (let i = 0; i < 3; i++) {
    const pY = PIPE_Y_TOP + i * 0.16, pZ = PIPE_Z + i * 0.10;
    const sP = new THREE.Vector3(PIPE_X_L, pY, pZ);
    const eP = new THREE.Vector3(PIPE_X_R, pY, pZ);
    moduleGroup.add(makePipeCyl(sP, eP)); moduleGroup.add(makeSphere(sP)); moduleGroup.add(makeSphere(eP));
    pipeCurves.push({ curve: new THREE.LineCurve3(sP, eP), speed: 0.20 + i * 0.02, pulses: 4 });
  }
  coolingPositions.forEach(cu => {
    const sP = new THREE.Vector3(cu.x, cu.y - 0.05, PIPE_Z);
    const eP = new THREE.Vector3(cu.x, PIPE_Y_TOP - 0.05, PIPE_Z);
    moduleGroup.add(makePipeCyl(sP, eP, PIPE_RADIUS * 0.9)); moduleGroup.add(makeSphere(eP, PIPE_RADIUS * 1.5)); moduleGroup.add(makeSphere(sP, PIPE_RADIUS * 1.4));
    pipeCurves.push({ curve: new THREE.LineCurve3(sP, eP), speed: 0.32, pulses: 2 });
  });
  racks.filter(r => !r.userData.isHidden).forEach((rack, i) => {
    const sP = new THREE.Vector3(rack.userData.rackX, PIPE_Y_TOP - 0.05, PIPE_Z);
    const eP = new THREE.Vector3(rack.userData.rackX, PB_H + RACK_H * 0.9, PIPE_Z);
    moduleGroup.add(makePipeCyl(sP, eP, PIPE_RADIUS * 0.75));
    moduleGroup.add(makeSphere(sP, PIPE_RADIUS * 1.3)); moduleGroup.add(makeSphere(eP, PIPE_RADIUS * 1.1));
    const rTP = new THREE.Vector3(rack.userData.rackX, PB_H + RACK_H * 0.9, rack.userData.finalZ - 0.2);
    moduleGroup.add(makePipeCyl(eP, rTP, PIPE_RADIUS * 0.65)); moduleGroup.add(makeSphere(rTP, PIPE_RADIUS));
    pipeCurves.push({ curve: new THREE.LineCurve3(sP, eP), speed: 0.26, pulses: 2, delay: i * 0.1 });
  });

  const allPulses: any[] = [];
  pipeCurves.forEach(pc => {
    for (let p = 0; p < pc.pulses; p++) {
      const pMat = new THREE.MeshBasicMaterial({ color: COL.skyBright, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), pMat);
      moduleGroup.add(pulse);
      allPulses.push({ mesh: pulse, mat: pMat, curve: pc.curve, phase: (p / pc.pulses + (pc.delay || 0)) % 1, speed: pc.speed });
    }
  });

  // ── UPS Cabinets ──
  function makeUPS(x: number, z: number, w = 0.7, depth = 0.9) {
    const cab = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, H * 0.75, depth),
      new THREE.MeshStandardMaterial({ color: 0x0E0F12, metalness: 0.6, roughness: 0.36 }));
    body.position.y = (H * 0.75) / 2; body.castShadow = body.receiveShadow = true; cab.add(body);
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, H * 0.75, depth)), makeEdgeMat(0.45));
    l.position.y = (H * 0.75) / 2; cab.add(l);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.02), makeAccent(2.2));
    screen.position.set(0, H * 0.55, depth / 2 + 0.012); cab.add(screen);
    cab.position.set(x, PB_H + 0.05, z); moduleGroup.add(cab);
  }
  makeUPS(W / 2 - 1.4, 0.1); makeUPS(W / 2 - 0.7, 0.1, 0.6, 0.9);

  // ── Door extension ──
  const extW = 1.2, extD = 1.8;
  function addWallSeg(geo: any, pos: [number, number, number]) {
    const m = new THREE.Mesh(geo, matBodyDark);
    m.position.set(...pos); m.castShadow = m.receiveShadow = true; moduleGroup.add(m);
    addEdge(moduleGroup, geo, new THREE.Vector3(...pos), 0.45);
  }
  addWallSeg(new THREE.BoxGeometry(extW, H, wallThick), [W/2+extW/2, PB_H+H/2, -extD/2+wallThick/2]);
  addWallSeg(new THREE.BoxGeometry(wallThick, H, extD), [W/2+extW-wallThick/2, PB_H+H/2, 0]);
  addWallSeg(new THREE.BoxGeometry(extW, H, wallThick), [W/2+extW/2, PB_H+H/2, extD/2-wallThick/2]);
  const extRoof = new THREE.Mesh(new THREE.BoxGeometry(extW+wallThick, 0.10, extD), matBodyDarker);
  extRoof.position.set(W/2+extW/2, PB_H+H+0.05, 0); extRoof.castShadow = extRoof.receiveShadow = true;
  moduleGroup.add(extRoof);
  addEdge(moduleGroup, new THREE.BoxGeometry(extW+wallThick, 0.10, extD), new THREE.Vector3(W/2+extW/2, PB_H+H+0.05, 0), 0.45);




  // ── Entrance animation ──
  moduleGroup.scale.set(0.001, 0.001, 0.001);
  const ENTRANCE_START = performance.now() + 200;
  const ENTRANCE_DUR = 1200;

  // ── Orbit controls ──
  let azimuth = Math.PI / 4, elevation = 0.1;
  let targetAzimuth = azimuth, targetElevation = elevation;
  let isDragging = false, prevX = 0, prevY = 0, lastInteraction = 0;

  canvas.addEventListener("mousedown", e => {
    isDragging = true; prevX = e.clientX; prevY = e.clientY; lastInteraction = performance.now();
  });
  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    targetAzimuth -= (e.clientX - prevX) * 0.006;
    targetElevation = Math.max(-0.1, Math.min(0.4, targetElevation - (e.clientY - prevY) * 0.003));
    prevX = e.clientX; prevY = e.clientY; lastInteraction = performance.now();
  });
  window.addEventListener("mouseup", () => { isDragging = false; });
  canvas.addEventListener("touchstart", e => {
    if (e.touches.length !== 1) return;
    isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; lastInteraction = performance.now();
  }, { passive: true });
  canvas.addEventListener("touchmove", e => {
    if (!isDragging || e.touches.length !== 1) return;
    targetAzimuth -= (e.touches[0].clientX - prevX) * 0.006;
    targetElevation = Math.max(-0.1, Math.min(0.4, targetElevation - (e.touches[0].clientY - prevY) * 0.003));
    prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; lastInteraction = performance.now();
  }, { passive: true });
  canvas.addEventListener("touchend", () => { isDragging = false; });

  // Wall open state
  let wallOpenTarget = 0, wallOpenCurrent = 0, hiddenRevealed = false;
  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2();
  let hoveredIdx = -1;

  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouseVec, camera);
    if (raycaster.intersectObjects([wallPanel], true).length > 0) {
      wallOpenTarget = wallOpenTarget > 0.5 ? 0 : 1;
      lastInteraction = performance.now();
    }
  });
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });

  // ── Clock ──
  let lastTime = performance.now();

  function animate() {
    const rafId = requestAnimationFrame(animate);
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    const t = now / 1000;

    // Auto-rotate when idle
    if (now - lastInteraction > 2500 && !isDragging) targetAzimuth += dt * 0.06;
    azimuth += (targetAzimuth - azimuth) * 0.08;
    elevation += (targetElevation - elevation) * 0.08;
    moduleGroup.rotation.y = azimuth - Math.PI / 4;
    moduleGroup.rotation.x = elevation * 0.3;

    // Entrance scale
    if (now > ENTRANCE_START) {
      const p = Math.min(1, (now - ENTRANCE_START) / ENTRANCE_DUR);
      const e = 1 - Math.pow(1 - p, 3);
      moduleGroup.scale.set(e, e, e);
    }

    // Fan spin
    fans.forEach(f => { f.rotation.y += f.userData.speed; });

    // Wall open
    wallOpenCurrent += (wallOpenTarget - wallOpenCurrent) * 0.06;
    openableWall.rotation.x = -wallOpenCurrent * Math.PI * 0.62;

    // Hidden racks
    if (!hiddenRevealed && wallOpenCurrent > 0.3) {
      hiddenRevealed = true;
      hiddenRacks.forEach((r, i) => {
        r.visible = true; r.userData.revealStartTime = now + i * 180;
      });
    }
    if (hiddenRevealed && wallOpenCurrent < 0.15) {
      hiddenRevealed = false;
      hiddenRacks.forEach(r => {
        r.visible = false; r.userData.revealStartTime = null;
        r.scale.set(0.001, 0.001, 0.001); r.userData.baseZ = r.userData.hiddenStartZ;
      });
    }
    hiddenRacks.forEach(rack => {
      if (!rack.visible || !rack.userData.revealStartTime || now < rack.userData.revealStartTime) return;
      const p = Math.min(1, (now - rack.userData.revealStartTime) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      rack.userData.baseZ = rack.userData.hiddenStartZ + (rack.userData.finalZ - rack.userData.hiddenStartZ) * eased;
      const sc = 0.001 + 0.999 * eased; rack.scale.set(sc, sc, sc);
    });

    const ROW_DELAY_MS = 50;
    racks.forEach((rack, ri) => {
      rack.userData.hoverWavePhase += dt * 4.5;
      const refTime = rack.userData.revealStartTime;
      if (!refTime || now < refTime) {
        rack.userData.ledData.forEach((d: any) => { d.mat.emissiveIntensity = 0; }); return;
      }
      const elapsed = now - refTime;
      const l1 = (t * 2.0 + ri * 0.5) % (LED_ROWS + 3) - 1;
      const l2 = (t * 3.2 + ri * 1.3 + 4) % (LED_ROWS + 3) - 1;
      rack.userData.ledData.forEach((d: any) => {
        const { mat, row, col } = d;
        const rowTime = row * ROW_DELAY_MS;
        if (elapsed < rowTime) { mat.emissiveIntensity = 0; return; }
        const fadeIn = Math.min(1, (elapsed - rowTime) / 250);
        const g1 = Math.exp(-Math.pow(row - l1, 2) * 0.45) * 2.8;
        const g2 = Math.exp(-Math.pow(row - l2, 2) * 0.7) * 1.5;
        const seed = row * 7.13 + col * 11.7 + ri * 2.71;
        const activity = (0.5 + 0.5 * Math.sin(t * 7.5 + seed)) * (0.5 + 0.5 * Math.sin(t * 11.2 + seed * 1.4));
        const colChar = 0.4 + 0.6 * Math.abs(Math.sin(col * 1.7 + ri * 0.9));
        mat.emissiveIntensity = fadeIn * (0.18 + activity * colChar * 0.7 + g1 + g2);
      });
    });

    // Pulses
    allPulses.forEach(p => {
      p.phase = (p.phase + p.speed * dt) % 1;
      p.mesh.position.copy(p.curve.getPoint(p.phase));
      const ef = Math.min(p.phase / 0.08, (1 - p.phase) / 0.08, 1);
      p.mat.opacity = 0.95 * Math.max(0, ef);
      const sc = 0.85 + 0.25 * Math.sin(t * 4 + p.phase * 6);
      p.mesh.scale.set(sc, sc, sc);
    });

    // Hover
    raycaster.setFromCamera(mouseVec, camera);
    const visibleBodies = racks.filter(r => r.visible).map((r: any) => r.children[0]);
    const hits = raycaster.intersectObjects(visibleBodies);
    hoveredIdx = hits.length > 0 ? hits[0].object.userData.rackIndex : -1;

    racks.forEach((rack: any) => {
      const isHov = rack.userData.rackIndex === hoveredIdx && rack.visible;
      rack.userData.targetForward = isHov ? 0.55 : 0;
      rack.userData.currentForward += (rack.userData.targetForward - rack.userData.currentForward) * 0.12;
      rack.position.z = rack.userData.baseZ + rack.userData.currentForward;
      rack.userData.hoverProgress += ((isHov ? 1 : 0) - rack.userData.hoverProgress) * 0.12;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Resize observer
  const ro = new ResizeObserver(() => {
    const w = canvas.parentElement?.clientWidth ?? window.innerWidth;
    const h = canvas.parentElement?.clientHeight ?? window.innerHeight;
    const aspect = w / h;
    camera.aspect = aspect;
    if (aspect < 1.2) {
      camera.fov = 32 * (1.2 / aspect);
    } else {
      camera.fov = 32;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  if (canvas.parentElement) ro.observe(canvas.parentElement);
}
