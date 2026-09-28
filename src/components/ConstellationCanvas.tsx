"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  // Base 3D coordinates
  x: number;
  y: number;
  z: number;
  // Current projected 2D coordinates
  projX: number;
  projY: number;
  projScale: number;
  // Visual attributes
  size: number;
  color: string;
  isTriangle: boolean;
  angle: number;
  rotSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
  isAmbient: boolean;
}

const CHROMATIC_COLORS = [
  "#8052ff", // Electric Iris
  "#ffb829", // Saffron Spark
  "#15846e", // Deep Verdant
  "#00d4ff", // Cyan
  "#f43f5e", // Rose
  "#c084fc", // Soft Violet
  "#ffffff", // Bone White
];

export function ConstellationCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastTime = performance.now();

    const isMobile = window.innerWidth <= 820;
    const TOTAL_PARTICLES = isMobile ? 120 : 260;
    const AMBIENT_COUNT = isMobile ? 35 : 70;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const particles: Particle[] = [];

    // Helper: Draw a sharp outlined micro-triangle
    function drawTriangle(
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      angle: number,
      color: string,
      alpha: number
    ) {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const px = Math.cos(a) * radius;
        const py = Math.sin(a) * radius;
        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.closePath();
      context.strokeStyle = color;
      context.globalAlpha = alpha;
      context.lineWidth = 1.2;
      context.stroke();
      context.restore();
    }

    function initParticles() {
      particles.length = 0;

      // 1. Core Brain / Intelligence Constellation
      const coreCount = TOTAL_PARTICLES - AMBIENT_COUNT;
      for (let i = 0; i < coreCount; i++) {
        // Parametric brain-like dual ellipsoid distribution
        const hemisphere = Math.random() > 0.5 ? 1 : -1;
        const u = Math.random() * Math.PI * 2;
        const v = (Math.random() - 0.5) * Math.PI;

        const radX = (110 + Math.random() * 50);
        const radY = (85 + Math.random() * 45);
        const radZ = (85 + Math.random() * 45);

        const bx = Math.cos(v) * Math.cos(u) * radX + hemisphere * 45;
        const by = Math.sin(v) * radY + Math.sin(u * 2) * 20;
        const bz = Math.cos(v) * Math.sin(u) * radZ;

        particles.push({
          x: bx,
          y: by,
          z: bz,
          projX: 0,
          projY: 0,
          projScale: 1,
          size: 2.2 + Math.random() * 3.5,
          color: CHROMATIC_COLORS[Math.floor(Math.random() * CHROMATIC_COLORS.length)],
          isTriangle: Math.random() > 0.35,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          isAmbient: false,
        });
      }

      // 2. Ambient Floating Field (Scattered chromatic dust)
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        particles.push({
          x: (Math.random() - 0.5) * 750,
          y: (Math.random() - 0.5) * 650,
          z: (Math.random() - 0.5) * 400,
          projX: 0,
          projY: 0,
          projScale: 1,
          size: 1.5 + Math.random() * 2.5,
          color: CHROMATIC_COLORS[Math.floor(Math.random() * CHROMATIC_COLORS.length)],
          isTriangle: Math.random() > 0.5,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          isAmbient: true,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    }

    function render(now: number) {
      if (!isVisible || !ctx) return;

      const elapsed = now - lastTime;
      lastTime = now;
      const dt = Math.min(Math.max(elapsed / 16.67, 0.5), 2.5);

      // Smooth auto-rotation with gentle mouse parallax
      targetRotY += 0.003 * dt;
      if (mouse.active) {
        targetRotX = (mouse.y / height - 0.5) * 0.5;
        targetRotY += (mouse.x / width - 0.5) * 0.008;
      }

      rotX += (targetRotX - rotX) * (0.05 * dt);
      rotY += (targetRotY - rotY) * (0.05 * dt);

      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 420;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project all 3D coordinates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const distance = fov / (fov + z2 + 250);
        p.projScale = distance;
        p.projX = centerX + x1 * distance;
        p.projY = centerY + y1 * distance;

        p.angle += p.rotSpeed * dt;
        p.pulsePhase += p.pulseSpeed * dt;
      }

      // Sort by depth Z
      particles.sort((a, b) => b.projScale - a.projScale);

      // Draw subtle connecting filaments between close core particles
      const maxConnectDist = isMobile ? 42 : 55;
      const coreParticles = particles.filter((p) => !p.isAmbient);

      for (let i = 0; i < coreParticles.length; i++) {
        const p1 = coreParticles[i];
        for (let j = i + 1; j < Math.min(i + 8, coreParticles.length); j++) {
          const p2 = coreParticles[j];
          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.18 * p1.projScale;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Draw particles (micro-triangles & glowing points)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 0.25 * Math.sin(p.pulsePhase);
        const currentSize = Math.max(0.8, p.size * p.projScale * (1 + pulse));
        const alpha = p.isAmbient
          ? Math.min(0.4, 0.22 * p.projScale)
          : Math.min(0.95, (0.55 + pulse * 0.25) * p.projScale);

        if (p.isTriangle) {
          drawTriangle(ctx, p.projX, p.projY, currentSize * 1.5, p.angle, p.color, alpha);
        } else {
          // Circular particle with subtle soft halo
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          if (currentSize > 2) {
            ctx.beginPath();
            ctx.arc(p.projX, p.projY, currentSize * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = Math.min(1, alpha * 1.4);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
      targetRotX = 0;
    }

    resize();
    initParticles();
    animId = requestAnimationFrame(render);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          lastTime = performance.now();
          animId = requestAnimationFrame(render);
        }
      });
    });

    observer.observe(canvas);

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseleave", onPointerLeave);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
