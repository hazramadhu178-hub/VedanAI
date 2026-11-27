import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

const THEMES = {
  dark: {
    base: "#06030f",
    nebula: [
      { x: 0.36, y: 0.58, r: 0.56, rgb: [82, 36, 158], alpha: 0.34 },
      { x: 0.78, y: 0.46, r: 0.5, rgb: [62, 26, 132], alpha: 0.28 },
      { x: 0.48, y: 0.14, r: 0.44, rgb: [44, 18, 98], alpha: 0.22 },
    ],
    bands: [
      "rgba(96, 58, 172, 0.26)",
      "rgba(134, 86, 218, 0.46)",
      "rgba(176, 128, 248, 0.70)",
      "rgba(220, 192, 255, 0.90)",
      "rgba(252, 246, 255, 1.00)",
    ],
    filament: "rgba(156, 106, 242, 0.09)",
    sheen: [152, 96, 240],
    flare: [250, 238, 255],
    dust: "rgba(212, 186, 255, 0.48)",
    vignette: 0.52,
    blend: "lighter",
    glowGain: 1,
  },
};

// Wide, long-wavelength 3D silk particle sheets spanning well past screen edges (no tube caps!)
const RIBBONS = [
  {
    // Main sweeping silk wave: mid-left -> glowing center-left fold -> sweeping up to top-right
    cols: 148,
    rows: 18,
    x0: -1.78,
    x1: 1.78,
    yBase: 0.01,
    ySlope: -0.34,
    zBase: 0.04,
    ampY: 0.22,
    ampZ: 0.38,
    freq: 0.52,
    speed: 0.26,
    twistFreq: 2.35,
    twistSpeed: 0.34,
    twistPhase: 0.9,
    halfWidth: 0.44,
    flareBoost: 1.05,
  },
  {
    // Secondary right-hand silk veil curving down-center to mid-right (matching reference right sweep)
    cols: 104,
    rows: 14,
    x0: -0.35,
    x1: 1.82,
    yBase: 0.28,
    ySlope: -0.48,
    zBase: 0.16,
    ampY: 0.24,
    ampZ: 0.32,
    freq: 0.48,
    speed: 0.22,
    twistFreq: 2.1,
    twistSpeed: -0.28,
    twistPhase: 2.4,
    halfWidth: 0.38,
    flareBoost: 0.84,
  },
  {
    // Upper distant gossamer silk wave near top edge
    cols: 84,
    rows: 9,
    x0: -1.7,
    x1: 1.65,
    yBase: -0.46,
    ySlope: -0.05,
    zBase: 0.66,
    ampY: 0.12,
    ampZ: 0.24,
    freq: 0.62,
    speed: 0.18,
    twistFreq: 1.9,
    twistSpeed: 0.21,
    twistPhase: 4.2,
    halfWidth: 0.26,
    flareBoost: 0.38,
  },
];

const MAX_COLS = 148;
const DUST_COUNT = 60;

const rgba = (rgb, alpha) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

// Smooth Gaussian-like radial bloom sprite (zero hard edge, zero tube outline)
function makeCausticSprite(sheenRgb, flareRgb, size = 128) {
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, rgba(flareRgb, 0.95));
  grad.addColorStop(0.14, rgba(flareRgb, 0.58));
  grad.addColorStop(0.34, rgba(sheenRgb, 0.24));
  grad.addColorStop(0.62, rgba(sheenRgb, 0.07));
  grad.addColorStop(1, rgba(sheenRgb, 0));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

function makeBackdrop(palette, width, height) {
  const off = document.createElement("canvas");
  off.width = Math.max(1, Math.round(width));
  off.height = Math.max(1, Math.round(height));
  const ctx = off.getContext("2d", { alpha: false });
  if (!ctx) return off;

  ctx.fillStyle = palette.base;
  ctx.fillRect(0, 0, off.width, off.height);

  palette.nebula.forEach((blob) => {
    const cx = off.width * blob.x;
    const cy = off.height * blob.y;
    const radius = Math.max(off.width, off.height) * blob.r;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, rgba(blob.rgb, blob.alpha));
    grad.addColorStop(0.5, rgba(blob.rgb, blob.alpha * 0.34));
    grad.addColorStop(1, rgba(blob.rgb, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, off.width, off.height);
  });

  if (palette.vignette > 0) {
    const vig = ctx.createRadialGradient(
      off.width * 0.5,
      off.height * 0.48,
      Math.min(off.width, off.height) * 0.18,
      off.width * 0.5,
      off.height * 0.5,
      Math.max(off.width, off.height) * 0.78,
    );
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, `rgba(0,0,0,${palette.vignette})`);
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, off.width, off.height);
  }
  return off;
}

function buildDust() {
  const next = seeded(424242);
  return Array.from({ length: DUST_COUNT }, () => ({
    u: next(),
    v: next(),
    size: 0.8 + next() * 1.4,
    speed: 0.006 + next() * 0.016,
    drift: (next() - 0.5) * 0.025,
    phase: next() * TAU,
  }));
}

const getTheme = () => THEMES.dark;

export default function AeroBackground({ paused = false }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return undefined;

    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!context) return undefined;

    const dust = buildDust();

    const spineScreenX = new Float32Array(MAX_COLS);
    const spineScreenY = new Float32Array(MAX_COLS);
    const spineX = new Float32Array(MAX_COLS);
    const spineY = new Float32Array(MAX_COLS);
    const spineZ = new Float32Array(MAX_COLS);
    const dirY = new Float32Array(MAX_COLS);
    const dirZ = new Float32Array(MAX_COLS);
    const foldStrength = new Float32Array(MAX_COLS);

    const MAX_POINTS = 6800;
    const bucketCounts = new Int32Array(5);
    const bucketData = Array.from({ length: 5 }, () => new Float32Array(MAX_POINTS * 3));

    // Up to 10 targeted caustic flare stamps (x, y, rx, ry, angle, alpha) — touches <3% of screen pixels!
    const MAX_FLARES = 12;
    const flareData = new Float32Array(MAX_FLARES * 6);

    let palette = getTheme();
    let causticSprite = makeCausticSprite(palette.sheen, palette.flare);
    let backdrop = null;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    let scrollResumeTimer = 0;
    let scrolling = false;
    let elapsed = 1.85;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0 };
    const scrollState = { y: 0, target: 0 };
    const pulses = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const scale = width < 700 ? 0.85 : 1;
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      backdrop = makeBackdrop(palette, width, height);
      if (!pausedRef.current || reduced) render();
    };

    function render() {
      if (backdrop) context.drawImage(backdrop, 0, 0, width, height);

      const time = elapsed;
      const isMobile = width < 700;
      const colStep = isMobile ? 2 : 1;
      const rowStep = isMobile ? 2 : 1;
      const cx = width * 0.5;
      const cy = height * 0.54;
      const fov = Math.max(width, height) * 0.76;
      const camZ = 1.95;

      const camTiltX = (pointer.x - 0.5) * 0.15;
      const camTiltY = (pointer.y - 0.5) * 0.1 - scrollState.y * 0.07;
      const cursorWX = (pointer.x - 0.5) * 2.3;
      const cursorWY = (pointer.y - 0.54) * 1.4;

      for (let b = 0; b < 5; b += 1) bucketCounts[b] = 0;
      let flareCount = 0;

      for (let rIdx = 0; rIdx < RIBBONS.length; rIdx += 1) {
        const rib = RIBBONS[rIdx];
        const cols = rib.cols;
        const rows = rib.rows;
        let peakFold = 0;
        let peakIdx = Math.floor(cols * 0.38);

        // 1) Compute smooth 3D spine & twist basis
        for (let i = 0; i < cols; i += colStep) {
          const u = i / (cols - 1);
          const wx = rib.x0 + (rib.x1 - rib.x0) * u;
          const phase1 = u * TAU * rib.freq - time * rib.speed + rib.twistPhase;
          const phase2 = u * TAU * rib.freq * 1.85 + time * rib.speed * 0.62;

          let wy =
            rib.yBase +
            rib.ySlope * (u - 0.5) +
            Math.sin(phase1) * rib.ampY +
            Math.cos(phase2) * rib.ampY * 0.28;
          let wz =
            rib.zBase +
            Math.cos(phase1 * 0.9 + 0.7) * rib.ampZ +
            Math.sin(phase2 * 0.75) * rib.ampZ * 0.24;

          if (pointer.active > 0.01) {
            const dx = wx - cursorWX;
            const dy = wy - cursorWY;
            const d2 = dx * dx + dy * dy;
            if (d2 < 0.36) {
              const push = Math.exp(-d2 * 8.5) * pointer.active * 0.09;
              wy += dy * push * 2.0;
              wz -= push;
            }
          }

          for (let p = 0; p < pulses.length; p += 1) {
            const pulse = pulses[p];
            const dist = Math.abs(u - pulse.u) - pulse.age * 0.5;
            const ring = Math.exp(-(dist * dist) * 85) * (1 - pulse.age / 2.2);
            if (ring > 0.01) {
              wy -= ring * 0.07;
              wz -= ring * 0.09;
            }
          }

          const twist =
            u * rib.twistFreq +
            time * rib.twistSpeed +
            rib.twistPhase +
            Math.sin(u * 2.6 - time * 0.28) * 0.55;
          const dy = Math.sin(twist);
          const dz = Math.cos(twist);

          const sx3 = wx + camTiltX * (1.1 - wz * 0.35);
          const sy3 = wy + camTiltY * (1.1 - wz * 0.35);
          const depth = Math.max(0.32, camZ + wz);
          const proj = fov / depth;

          spineX[i] = sx3;
          spineY[i] = sy3;
          spineZ[i] = wz;
          dirY[i] = dy;
          dirZ[i] = dz;
          spineScreenX[i] = cx + sx3 * proj;
          spineScreenY[i] = cy + sy3 * proj;

          const edgeOn = 1 - Math.min(1, Math.abs(dy) * 1.5);
          const centerWindow = Math.sin(u * Math.PI);
          const fold = edgeOn * edgeOn * centerWindow;
          foldStrength[i] = fold;
          if (fold > peakFold && u > 0.16 && u < 0.84) {
            peakFold = fold;
            peakIdx = i;
          }
        }

        // Record elongated tangent-aligned caustic bloom sprite at the ribbon's fold crest (only 3 stamps per ribbon!)
        if (peakFold > 0.12 && rib.flareBoost > 0.45 && flareCount + 3 <= MAX_FLARES) {
          const prevI = Math.max(0, peakIdx - colStep * 3);
          const nextI = Math.min(cols - 1, peakIdx + colStep * 3);
          const angle = Math.atan2(
            spineScreenY[nextI] - spineScreenY[prevI],
            spineScreenX[nextI] - spineScreenX[prevI],
          );
          const offsets = [-colStep * 5, 0, colStep * 5];
          for (let s = 0; s < 3; s += 1) {
            const idx = Math.max(0, Math.min(cols - 1, peakIdx + offsets[s]));
            const fall = s === 1 ? 1 : 0.62;
            const o = flareCount * 6;
            flareData[o] = spineScreenX[idx];
            flareData[o + 1] = spineScreenY[idx];
            flareData[o + 2] = (isMobile ? 115 : 195) * (s === 1 ? 1.15 : 0.85);
            flareData[o + 3] = (isMobile ? 34 : 54) * (s === 1 ? 1 : 0.85);
            flareData[o + 4] = angle;
            flareData[o + 5] = Math.min(0.92, peakFold * 1.15 * rib.flareBoost * fall * palette.glowGain);
            flareCount += 1;
          }
        }

        // 2) Project structured 3D grid vertices (cols × rows) into 5 brightness buckets
        for (let i = 0; i < cols; i += colStep) {
          const u = i / (cols - 1);
          const bx = spineX[i];
          const by = spineY[i];
          const bz = spineZ[i];
          const dy = dirY[i];
          const dz = dirZ[i];
          const fold = foldStrength[i];
          const widthWave = rib.halfWidth * (0.82 + 0.22 * Math.sin(u * 4.2 + time * 0.4));

          for (let j = 0; j < rows; j += rowStep) {
            const v = (j / (rows - 1)) * 2 - 1;
            // Smooth S-curve cross-section so the ribbon curls organically like silk fabric
            const silkCurve = Math.sin(v * 1.65 + u * 2.2 - time * 0.42) * 0.032;
            const px = bx + silkCurve * dz * 0.6;
            const py = by + v * widthWave * dy + silkCurve;
            const pz = bz + v * widthWave * dz;

            const depth = camZ + pz;
            if (depth <= 0.3) continue;
            const proj = fov / depth;
            const sx = cx + px * proj;
            const sy = cy + py * proj;
            if (sx < -8 || sx > width + 8 || sy < -8 || sy > height + 8) continue;

            const acrossFade = 1 - v * v * 0.48;
            const depthBright = Math.max(0.32, Math.min(1.28, 1.88 / depth));
            const lum = acrossFade * depthBright * (0.46 + fold * 1.32) * rib.flareBoost;

            let bucket = 0;
            if (lum > 1.06) bucket = 4;
            else if (lum > 0.76) bucket = 3;
            else if (lum > 0.5) bucket = 2;
            else if (lum > 0.28) bucket = 1;

            const count = bucketCounts[bucket];
            if (count < MAX_POINTS) {
              const arr = bucketData[bucket];
              const o = count * 3;
              arr[o] = sx;
              arr[o + 1] = sy;
              arr[o + 2] = Math.max(1.05, Math.min(2.45, (1.12 + fold * 0.52) * (1.8 / depth)));
              bucketCounts[bucket] = count + 1;
            }
          }
        }
      }

      context.save();
      context.globalCompositeOperation = palette.blend;

      // 3) Draw crisp 3D particle mesh in 5 single batched fill() calls
      for (let b = 0; b < 5; b += 1) {
        const count = bucketCounts[b];
        if (count === 0) continue;
        const arr = bucketData[b];
        context.fillStyle = palette.bands[b];
        context.beginPath();
        for (let k = 0; k < count; k += 1) {
          const o = k * 3;
          const s = arr[o + 2];
          context.rect(arr[o], arr[o + 1], s, s);
        }
        context.fill();
      }

      // 4) Stamp elongated tangent-aligned caustic fold glow (~6 tiny transforms total -> <0.25ms!)
      for (let f = 0; f < flareCount; f += 1) {
        const o = f * 6;
        const fx = flareData[o];
        const fy = flareData[o + 1];
        const rx = flareData[o + 2];
        const ry = flareData[o + 3];
        context.save();
        context.translate(fx, fy);
        context.rotate(flareData[o + 4]);
        context.globalAlpha = flareData[o + 5];
        context.drawImage(causticSprite, -rx, -ry, rx * 2, ry * 2);
        context.restore();
      }

      // 5) Batched cosmic stardust motes
      context.globalAlpha = 1;
      context.fillStyle = palette.dust;
      context.beginPath();
      for (let i = 0; i < dust.length; i += 1) {
        const d = dust[i];
        const x = (((d.u + time * d.speed) % 1) + 1) % 1 * width;
        const y = (((d.v + Math.sin(time * 0.35 + d.phase) * 0.02 + d.drift * time) % 1) + 1) % 1 * height;
        context.rect(x, y, d.size, d.size);
      }
      context.fill();

      context.restore();
    }

    const MIN_FRAME_MS = 20;
    const tick = (now) => {
      frameId = requestAnimationFrame(tick);
      if (document.hidden || reduced || pausedRef.current || scrolling) {
        lastTime = now;
        return;
      }
      if (lastTime && now - lastTime < MIN_FRAME_MS) return;
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;
      elapsed += delta;

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, delta * 4.5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, delta * 4.5);
      pointer.active *= Math.exp(-delta * 1.6);
      scrollState.y += (scrollState.target - scrollState.y) * Math.min(1, delta * 5);

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        pulses[i].age += delta;
        if (pulses[i].age > 2.2) pulses.splice(i, 1);
      }

      render();
    };

    const onPointerMove = (event) => {
      pointer.tx = event.clientX / Math.max(window.innerWidth, 1);
      pointer.ty = event.clientY / Math.max(window.innerHeight, 1);
      pointer.active = 1;
    };

    const onPointerDown = (event) => {
      if (reduced || event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest("a, button, input, textarea, select, label")) return;
      const u = event.clientX / Math.max(window.innerWidth, 1);
      pulses.push({ u, age: 0 });
      if (pulses.length > 3) pulses.shift();
    };

    const onScroll = () => {
      scrollState.target = Math.min(2.5, window.scrollY / Math.max(window.innerHeight, 1));
      scrolling = true;
      window.clearTimeout(scrollResumeTimer);
      scrollResumeTimer = window.setTimeout(() => {
        scrolling = false;
        lastTime = 0;
      }, 120);
    };

    const onVisibility = () => {
      lastTime = 0;
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event) => {
      reduced = event.matches;
      cancelAnimationFrame(frameId);
      if (reduced) render();
      else frameId = requestAnimationFrame(tick);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener?.("change", onMotionChange);

    if (!reduced) frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(scrollResumeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return (
    <div className="aero-background" aria-hidden="true">
      <canvas ref={canvasRef} className="particle-wave-canvas" />
    </div>
  );
}
