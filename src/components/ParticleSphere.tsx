"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  z: number;
  seed: number;
}

/**
 * Auros "bioluminescent data orb": a Fibonacci-distributed particle sphere.
 * Front-facing dots glow white/aqua, the rim picks up lavender, the far side
 * sinks into teal. A latitude "signal" sweeps through it like data moving
 * through a model. Pointer position steers the rotation.
 */
export function ParticleSphere({ className, density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const count = Math.round((small ? 900 : 1700) * density);

    const particles: Particle[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      particles.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, seed: Math.random() });
    }

    // A thin equatorial ring of orbiting particles for depth
    const ring: Particle[] = Array.from({ length: small ? 140 : 260 }, (_, i) => {
      const a = (i / (small ? 140 : 260)) * Math.PI * 2;
      const rr = 1.32 + (Math.random() - 0.5) * 0.08;
      return { x: Math.cos(a) * rr, y: (Math.random() - 0.5) * 0.03, z: Math.sin(a) * rr, seed: Math.random() };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let radius = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    let targetX = 0;
    let targetY = 0;
    let tiltX = 0;
    let tiltY = 0;
    const onPointer = (e: PointerEvent) => {
      targetY = (e.clientX / window.innerWidth - 0.5) * 0.9;
      targetX = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    let spin = 0;
    const start = performance.now();

    const project = (p: Particle, cosY: number, sinY: number, cosX: number, sinX: number) => {
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    function draw(time: number) {
      const t = (time - start) / 1000;
      ctx!.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      tiltX += (targetX - tiltX) * 0.04;
      tiltY += (targetY - tiltY) * 0.04;
      const ay = spin + tiltY;
      const ax = 0.35 + tiltX;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      // Travelling signal band (latitude in -1..1)
      const signal = Math.sin(t * 0.55) * 1.1;
      const breathe = 1 + Math.sin(t * 0.8) * 0.012;

      // Core glow
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.25);
      glow.addColorStop(0, "rgba(10,108,138,0.38)");
      glow.addColorStop(0.55, "rgba(10,108,138,0.08)");
      glow.addColorStop(1, "rgba(10,108,138,0)");
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      for (const p of particles) {
        const q = project(p, cosY, sinY, cosX, sinX);
        const depth = (q.z + 1) / 2; // 0 = far, 1 = near
        const rim = 1 - Math.abs(q.z); // 1 at the silhouette
        const band = Math.max(0, 1 - Math.abs(p.y - signal) * 5);
        const twinkle = 0.75 + Math.sin(t * 2 + p.seed * 40) * 0.25;

        const px = cx + q.x * radius * breathe;
        const py = cy + q.y * radius * breathe;
        const size = (0.7 + depth * 1.6 + band * 1.1) * (small ? 0.9 : 1);
        const alpha = Math.min(1, (0.2 + depth * 0.85 + band * 0.6) * twinkle);

        let r: number, g: number, b: number;
        if (rim > 0.82 && depth > 0.35) {
          r = 124; g = 160; b = 255; // indigo rim light
        } else if (depth > 0.62) {
          r = 232; g = 246; b = 255; // ice white
        } else if (depth > 0.4) {
          r = 62; g = 230; b = 212; // signal cyan
        } else {
          r = 20; g = 110; b = 150; // deep ocean blue
        }
        if (band > 0.4) {
          r = 255; g = 255; b = 255;
        }

        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.fillRect(px - size / 2, py - size / 2, size, size);
      }

      for (const p of ring) {
        const a = t * 0.12 + p.seed * 0.02;
        const rx = p.x * Math.cos(a) - p.z * Math.sin(a);
        const rz = p.x * Math.sin(a) + p.z * Math.cos(a);
        const q = project({ x: rx, y: p.y, z: rz, seed: p.seed }, cosY, sinY, cosX, sinX);
        const depth = (q.z / 1.32 + 1) / 2;
        const size = 0.6 + depth * 1.1;
        ctx!.fillStyle = `rgba(124,140,255,${0.08 + depth * 0.5})`;
        ctx!.fillRect(cx + q.x * radius - size / 2, cy + q.y * radius - size / 2, size, size);
      }
    }

    function frame(time: number) {
      if (!visible) {
        raf = 0;
        return;
      }
      spin += 0.0022;
      draw(time);
      raf = requestAnimationFrame(frame);
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
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />;
}
