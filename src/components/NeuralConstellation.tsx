"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
  pulsePhase: number;
  pulseSpeed: number;
  isAmbient: boolean;
  connections: number[];
}

interface Impulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export function NeuralConstellation({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Palette strictly matching DESIGN.md: Electric Iris, Saffron Spark, Deep Verdant, Cyan, Bone White
    const COLORS = [
      "#8052ff", // Electric Iris (45%)
      "#ffb829", // Saffron Spark (20%)
      "#00e5ff", // Electric Cyan (15%)
      "#15846e", // Deep Verdant (10%)
      "#ffffff", // Bone White (10%)
    ];

    // 3D rotation angles & target interpolation
    let rotX = 0.12;
    let rotY = 0;
    let targetRotX = 0.12;
    let targetRotY = 0;

    let points: Point3D[] = [];
    let impulses: Impulse[] = [];

    // Helper: generate true 3D anatomical dual-hemisphere brain point cloud
    function createBrainPoints(count: number): Point3D[] {
      const pts: Point3D[] = [];
      const isMobile = window.innerWidth < 768;
      const actualCount = isMobile ? Math.floor(count * 0.7) : count;

      for (let i = 0; i < actualCount; i++) {
        const hemisphere = Math.random() > 0.5 ? 1 : -1;

        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);

        // Core base radius
        const rBase = 145 + (Math.random() - 0.5) * 45;

        // Organic cortical folds (gyri & sulci)
        const foldNoise =
          1 +
          0.16 * Math.sin(theta * 6) * Math.cos(phi * 5) +
          0.08 * Math.sin(phi * 10);

        // Anatomical shaping: frontal +z, occipital -z, lateral width in X
        let x = rBase * Math.sin(phi) * Math.sin(theta) * foldNoise;
        let y = rBase * Math.cos(phi) * 0.82 * foldNoise;
        let z = rBase * Math.sin(phi) * Math.cos(theta) * 1.25 * foldNoise;

        // Interhemispheric sagittal fissure separation
        const fissure = 18 + Math.abs(x) * 0.12;
        x = hemisphere * (Math.abs(x) * 0.88 + fissure);

        // Cerebellum & brainstem cluster
        if (Math.random() < 0.15) {
          x = (Math.random() - 0.5) * 45;
          y = 75 + Math.random() * 80;
          z = -45 + (Math.random() - 0.5) * 55;
        }

        const colorRoll = Math.random();
        let color = COLORS[0];
        if (colorRoll > 0.8) color = COLORS[1]; // Saffron
        else if (colorRoll > 0.65) color = COLORS[2]; // Cyan
        else if (colorRoll > 0.55) color = COLORS[3]; // Verdant
        else if (colorRoll > 0.45) color = COLORS[4]; // White

        pts.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          color,
          size: Math.random() * 2.5 + 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          isAmbient: false,
          connections: [],
        });
      }

      // Ambient floating constellation stars around the brain
      const ambientCount = isMobile ? 30 : 70;
      for (let i = 0; i < ambientCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const dist = 240 + Math.random() * 200;

        const x = dist * Math.sin(phi) * Math.cos(theta);
        const y = dist * 0.65 * Math.cos(phi);
        const z = dist * Math.sin(phi) * Math.sin(theta);

        pts.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          color: Math.random() > 0.45 ? "#8052ff" : "#ffb829",
          size: Math.random() * 1.5 + 0.8,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          isAmbient: true,
          connections: [],
        });
      }

      // Build nearest synaptic neighbors in 3D
      const maxConnectDist = isMobile ? 44 : 52;
      for (let i = 0; i < pts.length; i++) {
        if (pts[i].isAmbient) continue;
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[j].isAmbient) continue;
          const dx = pts[i].baseX - pts[j].baseX;
          const dy = pts[i].baseY - pts[j].baseY;
          const dz = pts[i].baseZ - pts[j].baseZ;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < maxConnectDist) {
            pts[i].connections.push(j);
          }
        }
      }

      return pts;
    }

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 360);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    }

    function spawnImpulse() {
      if (impulses.length > 20) return;
      const validNodes = points.filter((p) => p.connections.length > 0);
      if (validNodes.length === 0) return;

      const src = validNodes[Math.floor(Math.random() * validNodes.length)];
      const targetIdx = src.connections[Math.floor(Math.random() * src.connections.length)];
      const srcIdx = points.indexOf(src);

      impulses.push({
        fromIndex: srcIdx,
        toIndex: targetIdx,
        progress: 0,
        speed: 0.028 + Math.random() * 0.035,
        color: Math.random() > 0.4 ? "#ffb829" : "#ffffff",
      });
    }

    // Render tiny outlined triangle particle glyph
    function drawTriangleGlyph(
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string,
      alpha: number
    ) {
      context.save();
      context.translate(cx, cy);
      context.beginPath();
      const h = size * 1.6;
      context.moveTo(0, -h * 0.6);
      context.lineTo(size, h * 0.5);
      context.lineTo(-size, h * 0.5);
      context.closePath();
      context.strokeStyle = color;
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.lineWidth = 1.2;
      context.stroke();
      context.restore();
    }

    let lastTime = performance.now();
    let impulseTimer = 0;

    function render(now: number) {
      if (!isVisible || !ctx) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Natural graceful slow yaw rotation
      targetRotY += 0.3 * dt;

      // LERP damping for rotation
      rotX += (targetRotX - rotX) * (3.5 * dt);
      rotY += (targetRotY - rotY) * (3.5 * dt);

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const cameraDistance = 550;
      // Proportional scale factor to fill the container majestically
      const scaleFactor = (Math.min(width, height) / 380) * 0.95;

      interface ProjectedPoint {
        point: Point3D;
        px: number;
        py: number;
        pz: number;
        scale: number;
        alpha: number;
        index: number;
      }

      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.pulsePhase += p.pulseSpeed;

        const breathe = Math.sin(p.pulsePhase) * 3;
        const px0 = p.baseX + (p.isAmbient ? Math.sin(p.pulsePhase * 0.5) * 10 : 0);
        const py0 = p.baseY + breathe;
        const pz0 = p.baseZ + (p.isAmbient ? Math.cos(p.pulsePhase * 0.5) * 10 : 0);

        // Y-axis rotation
        const x1 = px0 * cosY + pz0 * sinY;
        const y1 = py0;
        const z1 = -px0 * sinY + pz0 * cosY;

        // X-axis tilt
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Perspective camera projection
        const fov = cameraDistance / (cameraDistance + z2 * scaleFactor * 0.85);
        const screenX = centerX + x2 * scaleFactor * fov;
        const screenY = centerY + y2 * scaleFactor * fov;

        const depthNorm = (z2 + 220) / 440;
        const baseAlpha = p.isAmbient
          ? Math.max(0.12, Math.min(0.4, 0.2 + depthNorm * 0.2))
          : Math.max(0.25, Math.min(0.98, 0.45 + depthNorm * 0.55));

        projected.push({
          point: p,
          px: screenX,
          py: screenY,
          pz: z2,
          scale: fov,
          alpha: baseAlpha,
          index: i,
        });
      }

      // Painter's algorithm: sort depth Z
      projected.sort((a, b) => a.pz - b.pz);

      // 1. Draw Synaptic Filaments
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.isAmbient || p.connections.length === 0) continue;
        const projA = projected.find((item) => item.index === i);
        if (!projA) continue;

        for (const targetIdx of p.connections) {
          const projB = projected.find((item) => item.index === targetIdx);
          if (!projB) continue;

          const lineAlpha = (projA.alpha + projB.alpha) * 0.24;
          ctx.beginPath();
          ctx.moveTo(projA.px, projA.py);
          ctx.lineTo(projB.px, projB.py);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(0.65, lineAlpha));
          ctx.lineWidth = Math.max(0.7, 1.35 * projA.scale);
          ctx.stroke();
        }
      }

      // 2. Impulses along synapses
      impulseTimer += dt;
      if (impulseTimer > 0.2) {
        spawnImpulse();
        impulseTimer = 0;
      }

      for (let k = impulses.length - 1; k >= 0; k--) {
        const imp = impulses[k];
        imp.progress += imp.speed;

        const pA = projected.find((item) => item.index === imp.fromIndex);
        const pB = projected.find((item) => item.index === imp.toIndex);

        if (pA && pB) {
          const ix = pA.px + (pB.px - pA.px) * imp.progress;
          const iy = pA.py + (pB.py - pA.py) * imp.progress;

          ctx.beginPath();
          ctx.arc(ix, iy, 2.5 * pA.scale, 0, Math.PI * 2);
          ctx.fillStyle = imp.color;
          ctx.globalAlpha = 0.95;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(ix, iy, 6.5 * pA.scale, 0, Math.PI * 2);
          ctx.fillStyle = imp.color;
          ctx.globalAlpha = 0.3;
          ctx.fill();
        }

        if (imp.progress >= 1) {
          impulses.splice(k, 1);
        }
      }

      // 3. Draw Luminous Glyphs & Point-Lights
      for (const proj of projected) {
        const glyphSize = proj.point.size * proj.scale * 1.25;

        // Draw soft ambient halo for foreground nodes
        if (proj.alpha > 0.55 && !proj.point.isAmbient) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, glyphSize * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = proj.point.color;
          ctx.globalAlpha = proj.alpha * 0.18;
          ctx.fill();
        }

        drawTriangleGlyph(
          ctx,
          proj.px,
          proj.py,
          glyphSize,
          proj.point.color,
          proj.alpha
        );
      }

      animId = requestAnimationFrame(render);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      targetRotY += normX * 0.06;
      targetRotX = Math.max(-0.55, Math.min(0.55, normY * 0.85));
    }

    resize();
    points = createBrainPoints(920);
    animId = requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          lastTime = performance.now();
          animId = requestAnimationFrame(render);
        }
      });
    });
    observer.observe(container);

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] flex items-center justify-center select-none overflow-hidden ${className || ""}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
