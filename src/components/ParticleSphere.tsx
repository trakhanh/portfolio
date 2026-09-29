"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Intro timeline in seconds: fly into the name, hold, then melt into the orb. */
export const INTRO = { form: 1.5, hold: 0.8, morph: 1.7 };
/** When the real DOM name should fade in over the particle lettering. */
export const INTRO_REVEAL_AT = INTRO.form + INTRO.hold - 0.15;

/** One glyph of the on-page name, in viewport coordinates. */
export interface Glyph {
  ch: string;
  x: number;
  lineTop: number;
  lineHeight: number;
  font: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  seed: number;
  /** intro: scattered start, lettering target, stagger */
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  d: number;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Bioluminescent data orb: a Fibonacci-distributed particle sphere.
 * With `intro`, particles first fly in to spell the name (sampled from the
 * real DOM glyphs), hold, then stream out into the orb. Particles part
 * around the pointer; a latitude "signal" sweeps through the sphere.
 */
export function ParticleSphere({
  className,
  density = 1,
  intro = null,
}: {
  className?: string;
  density?: number;
  intro?: (() => Glyph[]) | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const lite = small || window.matchMedia("(pointer: coarse)").matches;
    const count = Math.round((small ? 800 : lite ? 1400 : 2200) * density);
    // fillStyle strings are cached per colour + quantised alpha, so the hot
    // loop allocates nothing.
    const styleCache = new Map<number, string>();
    const style = (r: number, g: number, b: number, a: number) => {
      const q = Math.max(0, Math.min(20, Math.round(a * 20)));
      const key = ((r * 256 + g) * 256 + b) * 32 + q;
      let s = styleCache.get(key);
      if (!s) {
        s = `rgba(${r},${g},${b},${q / 20})`;
        styleCache.set(key, s);
      }
      return s;
    };

    const particles: Particle[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      particles.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, seed: Math.random(), sx: 0, sy: 0, tx: 0, ty: 0, d: 0 });
    }
    const ringCount = small ? 110 : 260;
    const ring = Array.from({ length: ringCount }, (_, i) => {
      const a = (i / ringCount) * Math.PI * 2;
      const rr = 1.32 + (Math.random() - 0.5) * 0.08;
      return { x: Math.cos(a) * rr, y: (Math.random() - 0.5) * 0.03, z: Math.sin(a) * rr, seed: Math.random() };
    });

    let width = 0;
    let height = 0;
    let radius = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) * 0.36;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer: steers the tilt and pushes particles aside.
    let targetX = 0;
    let targetY = 0;
    let tiltX = 0;
    let tiltY = 0;
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
    const onPointer = (e: PointerEvent) => {
      targetY = (e.clientX / window.innerWidth - 0.5) * 0.9;
      targetX = (e.clientY / window.innerHeight - 0.5) * 0.6;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (mouse.sx < -9000) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
      }
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // Intro: sample the real name glyphs into target points.
    let introState: "off" | "pending" | "running" = intro && !reduce ? "pending" : "off";
    let introT0 = 0;
    const sampleGlyphs = (glyphs: Glyph[]) => {
      const rect = canvas.getBoundingClientRect();
      const W = Math.max(1, Math.ceil(width));
      const H = Math.max(1, Math.ceil(height));
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return false;
      o.fillStyle = "#fff";
      o.textBaseline = "alphabetic";
      for (const g of glyphs) {
        o.font = g.font;
        const m = o.measureText(g.ch);
        const asc = m.fontBoundingBoxAscent || m.actualBoundingBoxAscent;
        const desc = m.fontBoundingBoxDescent || m.actualBoundingBoxDescent;
        const baseline = g.lineTop + (g.lineHeight - (asc + desc)) / 2 + asc;
        o.fillText(g.ch, g.x - rect.left, baseline - rect.top);
      }
      const data = o.getImageData(0, 0, W, H).data;
      let filled = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 128) filled++;
      if (!filled) return false;
      // Grid step chosen so the lettering gets roughly one particle per cell.
      const step = Math.max(2, Math.sqrt(filled / count));
      const pts: [number, number][] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const ix = Math.floor(x);
          const iy = Math.floor(y);
          if (data[(iy * W + ix) * 4 + 3] > 128) pts.push([ix, iy]);
        }
      }
      if (!pts.length) return false;
      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      particles.forEach((p, i) => {
        const q = pts[i % pts.length];
        p.tx = q[0] + (Math.random() - 0.5) * step * 0.6;
        p.ty = q[1] + (Math.random() - 0.5) * step * 0.6;
        const a = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * (0.55 + Math.random() * 0.5);
        p.sx = width / 2 + Math.cos(a) * dist;
        p.sy = height / 2 + Math.sin(a) * dist;
        p.d = Math.random() * 0.4;
      });
      return true;
    };
    if (introState === "pending" && intro) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          if (sampleGlyphs(intro())) {
            introState = "running";
            introT0 = performance.now();
          } else {
            introState = "off";
          }
        });
      });
    }
    const introTotal = INTRO.form + INTRO.hold + INTRO.morph;

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    let spin = 0;
    const start = performance.now();

    function draw(time: number) {
      const t = (time - start) / 1000;
      ctx!.clearRect(0, 0, width, height);
      if (introState === "pending") return;

      const it = introState === "running" ? (time - introT0) / 1000 : Infinity;
      if (introState === "running" && it > introTotal) introState = "off";
      const inIntro = introState === "running";
      const orbIn = inIntro ? clamp01((it - INTRO.form - INTRO.hold) / INTRO.morph) : 1;

      const cx = width / 2;
      const cy = height / 2;
      tiltX += (targetX - tiltX) * 0.04;
      tiltY += (targetY - tiltY) * 0.04;
      mouse.sx += (mouse.x - mouse.sx) * 0.18;
      mouse.sy += (mouse.y - mouse.sy) * 0.18;
      const ay = spin + tiltY;
      const ax = 0.35 + tiltX;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const signal = Math.sin(t * 0.55) * 1.1;
      const breathe = 1 + Math.sin(t * 0.8) * 0.012;
      const repelR = small ? 70 : 110;

      // Core glow
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.25);
      glow.addColorStop(0, `rgba(10,108,138,${0.38 * orbIn})`);
      glow.addColorStop(0.55, `rgba(10,108,138,${0.08 * orbIn})`);
      glow.addColorStop(1, "rgba(10,108,138,0)");
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      for (const p of particles) {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2;
        const rim = 1 - Math.abs(z2);
        const band = Math.max(0, 1 - Math.abs(p.y - signal) * 5);
        const twinkle = 0.75 + Math.sin(t * 2 + p.seed * 40) * 0.25;

        let px = cx + x1 * radius * breathe;
        let py = cy + y2 * radius * breathe;
        let size = (0.7 + depth * 1.6 + band * 1.1) * (small ? 0.9 : 1);
        let alpha = Math.min(1, (0.2 + depth * 0.85 + band * 0.6) * twinkle);
        let r: number, g: number, b: number;
        if (rim > 0.82 && depth > 0.35) [r, g, b] = [124, 160, 255];
        else if (depth > 0.62) [r, g, b] = [232, 246, 255];
        else if (depth > 0.4) [r, g, b] = [62, 230, 212];
        else [r, g, b] = [20, 110, 150];
        if (band > 0.4) [r, g, b] = [255, 255, 255];

        if (inIntro) {
          const f = easeOut(clamp01((it - p.d) / (INTRO.form - 0.4)));
          const m = easeInOut(clamp01((it - INTRO.form - INTRO.hold - p.d * 0.9) / (INTRO.morph - 0.4)));
          let lx = p.sx + (p.tx - p.sx) * f;
          let ly = p.sy + (p.ty - p.sy) * f;
          if (f >= 1) {
            lx += Math.sin(t * 3 + p.seed * 30) * 0.5;
            ly += Math.cos(t * 2.6 + p.seed * 17) * 0.5;
          }
          px = lx + (px - lx) * m;
          py = ly + (py - ly) * m;
          const letterSize = small ? 2 : 2.7;
          size = letterSize + (size - letterSize) * m;
          alpha = 0.95 * f + (alpha - 0.95 * f) * m;
          if (m < 0.5) [r, g, b] = p.seed < 0.55 ? [62, 230, 212] : [232, 246, 255];
        }

        // Part around the pointer
        const dx = px - mouse.sx;
        const dy = py - mouse.sy;
        const d2 = dx * dx + dy * dy;
        if (d2 < repelR * repelR && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = Math.pow(1 - d / repelR, 2) * (small ? 18 : 30);
          px += (dx / d) * push;
          py += (dy / d) * push;
          alpha = Math.min(1, alpha + push / 60);
        }

        ctx!.fillStyle = style(r, g, b, alpha);
        ctx!.fillRect(px - size / 2, py - size / 2, size, size);
      }

      if (orbIn > 0) {
        for (const p of ring) {
          const a = t * 0.12 + p.seed * 0.02;
          const rx = p.x * Math.cos(a) - p.z * Math.sin(a);
          const rz = p.x * Math.sin(a) + p.z * Math.cos(a);
          const x1 = rx * cosY - rz * sinY;
          const z1 = rx * sinY + rz * cosY;
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX;
          const depth = (z2 / 1.32 + 1) / 2;
          const size = 0.6 + depth * 1.1;
          ctx!.fillStyle = style(124, 160, 255, (0.08 + depth * 0.5) * orbIn);
          ctx!.fillRect(cx + x1 * radius - size / 2, cy + y2 * radius - size / 2, size, size);
        }
      }
    }

    // Phones draw at ~30fps outside the intro; the orb turns slowly enough
    // that the difference is invisible, and it halves canvas work.
    let last = 0;
    function frame(time: number) {
      if (!visible) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      const minGap = lite && introState !== "running" ? 30 : 0;
      if (time - last < minGap) return;
      spin += 0.0022 * (last ? Math.min(3, (time - last) / 16.7) : 1);
      last = time;
      draw(time);
    }

    if (reduce) {
      draw(start + 1200);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [density, intro]);

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />;
}
