/* =====================================================================
   keyboard.js — Teclado 3D con Three.js.
   Las teclas salen de SKILLS (data.js): no hace falta tocar este archivo.
   ===================================================================== */

import * as THREE from "three";
import { RoundedBoxGeometry } from "./RoundedBoxGeometry.js";

export function createKeyboard({ canvas, onKeyPress, getLang }) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Render, escena, cámara ---------- */
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return null; // Sin WebGL: la página sigue funcionando con la lista.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
  camera.position.set(0, 9, 11);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x10121c, 1.3));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(-4, 10, 6);
  scene.add(sun);
  const rim = new THREE.PointLight(0x7c5cff, 40, 30);
  rim.position.set(5, 3, -4);
  scene.add(rim);

  /* ---------- Estrellas ---------- */
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1400;
  const pos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 120;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    pos[i * 3 + 2] = -Math.random() * 90 - 5;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.14, transparent: true, opacity: 0.75, depthWrite: false })
  );
  scene.add(stars);

  /* ---------- Teclado ---------- */
  const board = new THREE.Group();
  scene.add(board);

  const skills = SKILLS.flatMap((g) => g.items).filter((i) => i.key);
  const rows = chunkRows(skills.length);
  const pitch = 1.08;
  const keySize = 0.94;
  const keyGeo = new RoundedBoxGeometry(keySize, 0.56, keySize, 5, 0.16);
  const capGeo = new THREE.PlaneGeometry(keySize * 0.86, keySize * 0.86);

  const keys = [];
  let idx = 0;
  const maxCols = Math.max(...rows);
  rows.forEach((count, r) => {
    const offset = (r % 2) * 0.35;
    for (let c = 0; c < count; c++) {
      const skill = skills[idx++];
      const color = new THREE.Color(KEY_COLORS[skill.color] || KEY_COLORS.black);
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.05 });
      const key = new THREE.Mesh(keyGeo, mat);

      const label = new THREE.Mesh(
        capGeo,
        new THREE.MeshBasicMaterial({ map: legendTexture(skill.key, color), transparent: true })
      );
      label.rotation.x = -Math.PI / 2;
      label.position.y = 0.285;
      key.add(label);

      const x = (c - (maxCols - 1) / 2) * pitch + offset;
      const z = (r - (rows.length - 1) / 2) * pitch;
      key.userData = { skill, baseX: x, baseZ: z, press: 0, hover: 0, drop: reduceMotion ? 0 : 6 + Math.random() * 3, delay: idx * 45 };
      key.position.set(x, key.userData.drop, z);
      board.add(key);
      keys.push(key);
    }
  });

  // Base del teclado
  const baseW = maxCols * pitch + 0.9;
  const baseD = rows.length * pitch + 0.7;
  const base = new THREE.Mesh(
    new RoundedBoxGeometry(baseW, 0.4, baseD, 4, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x151a26, roughness: 0.6, metalness: 0.2 })
  );
  base.position.y = -0.42;
  board.add(base);

  /* ---------- Posiciones según la sección ---------- */
  // Cada sección con data-stage="nombre" mueve el teclado a su pose.
  const poses = {
    desktop: {
      hero:     { x: 3.1, y: 0.2, z: 0, rx: 0.15, ry: -0.55, rz: 0.12, s: 0.62 },
      aside:    { x: 5.4, y: 0.4, z: -1, rx: 0.35, ry: -0.9, rz: 0.25, s: 0.4 },
      skills:   { x: 1.2, y: -0.4, z: 0, rx: 0.05, ry: -0.78, rz: 0, s: 0.82 },
      projects: { x: 13, y: 4, z: -6, rx: 0.6, ry: -1.2, rz: 0.5, s: 0.45 },
      contact:  { x: 3.2, y: -0.3, z: 0, rx: 0.1, ry: -0.35, rz: 0.1, s: 0.6 },
    },
    mobile: {
      hero:     { x: 0.2, y: 1.7, z: -3, rx: 0.25, ry: -0.6, rz: 0.12, s: 0.3 },
      aside:    { x: 3.5, y: 6, z: -8, rx: 0.5, ry: -1.1, rz: 0.4, s: 0.3 },
      skills:   { x: 0, y: -0.2, z: 0, rx: 0.1, ry: -0.78, rz: 0, s: 0.42 },
      projects: { x: 3.5, y: 6, z: -8, rx: 0.5, ry: -1.1, rz: 0.4, s: 0.3 },
      contact:  { x: 0.3, y: 1.9, z: -3, rx: 0.2, ry: -0.4, rz: 0.1, s: 0.28 },
    },
  };
  let stage = "hero";
  const current = { ...poses.desktop.hero };

  function setStage(name) {
    if (poses.desktop[name]) stage = name;
  }

  /* ---------- Interacción ---------- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-10, -10);
  let hovered = null;
  let interactive = false;

  function updatePointer(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function pick() {
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(keys, true)[0];
    if (!hit) return null;
    let obj = hit.object;
    while (obj && !obj.userData.skill) obj = obj.parent;
    return obj;
  }

  const isUiTarget = (t) => t.closest && t.closest("a, button, input, textarea, dialog, .no-3d");

  window.addEventListener("pointermove", (e) => {
    if (!interactive || isUiTarget(e.target)) { hovered = null; document.body.style.cursor = ""; return; }
    updatePointer(e);
    hovered = pick();
    document.body.style.cursor = hovered ? "pointer" : "";
  });

  window.addEventListener("pointerdown", (e) => {
    if (!interactive || isUiTarget(e.target)) return;
    updatePointer(e);
    const key = pick();
    if (key) pressKey(key);
  });

  let cycleIndex = -1;
  window.addEventListener("keydown", (e) => {
    if (!interactive || e.metaKey || e.ctrlKey || e.altKey || isUiTarget(e.target)) return;
    let key = null;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      cycleIndex = (cycleIndex + (e.key === "ArrowRight" ? 1 : -1) + keys.length) % keys.length;
      key = keys[cycleIndex];
    } else if (/^[a-z0-9]$/i.test(e.key)) {
      const letter = e.key.toLowerCase();
      const matches = keys.filter((k) => k.userData.skill.key.toLowerCase().startsWith(letter));
      key = matches.length
        ? matches[(matches.indexOf(lastPressed) + 1) % matches.length]
        : keys[Math.floor(Math.random() * keys.length)];
      cycleIndex = keys.indexOf(key);
    }
    if (key) { e.preventDefault(); pressKey(key); }
  });

  let lastPressed = null;
  function pressKey(key) {
    key.userData.press = 1;
    lastPressed = key;
    onKeyPress(key.userData.skill);
  }

  /* ---------- Tamaño ---------- */
  let isMobile = false;
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    isMobile = w < 820;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  /* ---------- Bucle de animación ---------- */
  const clock = new THREE.Clock();
  const start = performance.now();
  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) { clock.getDelta(); loop(); }
  });

  function damp(a, b, lambda, dt) { return THREE.MathUtils.damp(a, b, lambda, dt); }

  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const since = performance.now() - start;

    // Pose del tablero
    const target = (isMobile ? poses.mobile : poses.desktop)[stage];
    const speed = reduceMotion ? 50 : 3.2;
    for (const k of ["x", "y", "z", "rx", "ry", "rz", "s"]) current[k] = damp(current[k], target[k], speed, dt);
    const bob = reduceMotion || stage === "skills" ? 0 : Math.sin(t * 0.9) * 0.12;
    board.position.set(current.x, current.y + bob, current.z);
    board.rotation.set(current.rx + (reduceMotion ? 0 : Math.sin(t * 0.5) * 0.02), current.ry, current.rz);
    board.scale.setScalar(current.s);

    // Teclas: caída inicial, hover y presión
    for (const key of keys) {
      const d = key.userData;
      if (d.drop > 0 && since > d.delay) d.drop = damp(d.drop, 0, 6, dt);
      if (d.drop < 0.001) d.drop = 0;
      d.hover = damp(d.hover, key === hovered ? 1 : 0, 12, dt);
      d.press = damp(d.press, 0, 7, dt);
      key.position.y = d.drop + d.hover * 0.18 - d.press * 0.32;
    }

    stars.rotation.y = t * 0.006;
    stars.rotation.x = Math.sin(t * 0.05) * 0.02;
    renderer.render(scene, camera);
  }
  loop();

  return {
    setStage,
    setInteractive(value) { interactive = value; if (!value) { hovered = null; document.body.style.cursor = ""; } },
    pressBySkillName(name) {
      const key = keys.find((k) => k.userData.skill.name === name);
      if (key) pressKey(key);
    },
  };
}

/* ---------- Helpers ---------- */

// Reparte las teclas en filas de hasta 7, como un teclado.
function chunkRows(n) {
  const perRow = n <= 12 ? 4 : n <= 20 ? 5 : n <= 30 ? 7 : 8;
  const rows = [];
  for (let left = n; left > 0; left -= perRow) rows.push(Math.min(perRow, left));
  return rows;
}

// Dibuja el texto de la tecla en un canvas.
function legendTexture(text, color) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const light = color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 0.62;
  ctx.fillStyle = light ? "rgba(20,20,30,0.9)" : "rgba(255,255,255,0.95)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let fontSize = text.length <= 2 ? 120 : text.length <= 4 ? 92 : text.length <= 5 ? 76 : 66;
  ctx.font = `800 ${fontSize}px "Manrope", "Segoe UI", system-ui, sans-serif`;
  while (ctx.measureText(text).width > size * 0.98 && fontSize > 30) {
    fontSize -= 4;
    ctx.font = `800 ${fontSize}px "Manrope", "Segoe UI", system-ui, sans-serif`;
  }
  ctx.fillText(text, size / 2, size / 2 + 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}
