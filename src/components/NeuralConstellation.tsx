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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Palette strictly matching DESIGN.md
    const COLORS = [
      "#8052ff", // Electric Iris (Primary)
      "#ffb829", // Saffron Spark (Accent)
      "#15846e", // Deep Verdant (Teal)
      "#00d4ff", // Cyan accent
      "#ffffff", // Bone White
    ];

    // 3D rotation state
    let rotX = 0.15;
    let rotY = 0;
    let targetRotX = 0.15;
    let targetRotY = 0;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    let points: Point3D[] = [];
    let impulses: Impulse[] = [];

    // Helper: generate dual-hemisphere brain geometry
    function createBrainPoints(count: number): Point3D[] {
      const pts: Point3D[] = [];
      const isMobile = window.innerWidth < 768;
      const actualCount = isMobile ? Math.floor(count * 0.6) : count;

      for (let i = 0; i < actualCount; i++) {
        // Choose hemisphere: left (-1) or right (1)
        const hemisphere = Math.random() > 0.5 ? 1 : -1;

        // Spherical coords with anatomical deformation
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);

        // Parametric brain radii: elongated in Z (front-back), wider in X (lateral), flattened bottom in Y
        const rBase = 160 + (Math.random() - 0.5) * 40;
        
        // Cortex fold noise (gyri and sulci)
        const foldNoise =
          1 +
          0.16 * Math.sin(theta * 6) * Math.cos(phi * 5) +
          0.09 * Math.sin(phi * 12);

        // Anatomical shaping:
        // Frontal lobe fuller (+z), occipital lobe rounded (-z), temporal lobes curving under
        let x = rBase * Math.sin(phi) * Math.sin(theta) * foldNoise;
        let y = rBase * Math.cos(phi) * 0.78 * foldNoise;
        let z = rBase * Math.sin(phi) * Math.cos(theta) * 1.25 * foldNoise;

        // Separate hemispheres with sagittal fissure
        const fissureOffset = 18 + Math.abs(x) * 0.15;
        x = hemisphere * (Math.abs(x) * 0.88 + fissureOffset);

        // Lower brainstem / cerebellum cluster
        if (Math.random() < 0.14) {
          x = (Math.random() - 0.5) * 45;
          y = 80 + Math.random() * 85;
          z = -40 + (Math.random() - 0.5) * 55;
        }

        const colorRoll = Math.random();
        let color = COLORS[0]; // #8052ff (45%)
        if (colorRoll > 0.82) color = COLORS[1]; // #ffb829 (18%)
        else if (colorRoll > 0.62) color = COLORS[2]; // #15846e (20%)
        else if (colorRoll > 0.45) color = COLORS[3]; // #00d4ff (17%)

        pts.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          color,
          size: Math.random() * 2.2 + 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          isAmbient: false,
          connections: [],
        });
      }

      // Add ambient particles floating in the outer void
      const ambientCount = isMobile ? 35 : 90;
      for (let i = 0; i < ambientCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const dist = 280 + Math.random() * 220;

        const x = dist * Math.sin(phi) * Math.cos(theta);
        const y = (dist * 0.7) * Math.cos(phi);
        const z = dist * Math.sin(phi) * Math.sin(theta);

        pts.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          color: Math.random() > 0.5 ? "#8052ff" : "#ffb829",
          size: Math.random() * 1.5 + 0.8,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          isAmbient: true,
          connections: [],
        });
      }

      // Pre-calculate nearest connections in 3D for brain nodes
      const maxConnectDist = isMobile ? 48 : 56;
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

    // Spawn an electrical impulse along existing synapses
    function spawnImpulse() {
      if (impulses.length > 18) return;
      const validNodes = points.filter((p) => p.connections.length > 0);
      if (validNodes.length === 0) return;

      const src = validNodes[Math.floor(Math.random() * validNodes.length)];
      const targetIdx = src.connections[Math.floor(Math.random() * src.connections.length)];
      const srcIdx = points.indexOf(src);

      impulses.push({
        fromIndex: srcIdx,
        toIndex: targetIdx,
        progress: 0,
        speed: 0.025 + Math.random() * 0.035,
        color: Math.random() > 0.4 ? "#ffb829" : "#ffffff",
      });
    }

    // Draw tiny outlined triangle particle glyph (from DESIGN.md)
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
      context.lineWidth = 1.1;
      context.stroke();
      context.restore();
    }

    // Animation Loop
    let lastTime = performance.now();
    let impulseTimer = 0;

    function render(now: number) {
      if (!isVisible || !ctx) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Natural slow rotation
      targetRotY += 0.28 * dt;

      // Smooth camera interpolation with mouse influence
      rotX += (targetRotX - rotX) * (4 * dt);
      rotY += (targetRotY - rotY) * (4 * dt);

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const cameraDistance = 580;
      const scaleFactor = Math.min(width, height) * 0.0016;

      // 3D Projection for each point
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

        // Apply breathing jitter
        const breathe = Math.sin(p.pulsePhase) * 3;
        const px0 = p.baseX + (p.isAmbient ? Math.sin(p.pulsePhase * 0.5) * 12 : 0);
        const py0 = p.baseY + breathe;
        const pz0 = p.baseZ + (p.isAmbient ? Math.cos(p.pulsePhase * 0.5) * 12 : 0);

        // Rotate around Y axis
        const x1 = px0 * cosY + pz0 * sinY;
        const y1 = py0;
        const z1 = -px0 * sinY + pz0 * cosY;

        // Rotate around X axis
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Perspective Projection
        const fov = cameraDistance / (cameraDistance + z2 * scaleFactor);
        const screenX = centerX + x2 * scaleFactor * fov;
        const screenY = centerY + y2 * scaleFactor * fov;

        // Depth-based fading (points closer to camera are brighter)
        const depthNorm = (z2 + 250) / 500;
        const baseAlpha = p.isAmbient
          ? Math.max(0.12, Math.min(0.4, 0.2 + depthNorm * 0.2))
          : Math.max(0.15, Math.min(0.95, 0.35 + depthNorm * 0.6));

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

      // Sort by depth Z (painter's algorithm)
      projected.sort((a, b) => a.pz - b.pz);

      // 1. Draw Synaptic Connection Lines
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.isAmbient || p.connections.length === 0) continue;
        const projA = projected.find((item) => item.index === i);
        if (!projA) continue;

        for (const targetIdx of p.connections) {
          const projB = projected.find((item) => item.index === targetIdx);
          if (!projB) continue;

          const lineAlpha = (projA.alpha + projB.alpha) * 0.22;
          ctx.beginPath();
          ctx.moveTo(projA.px, projA.py);
          ctx.lineTo(projB.px, projB.py);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(0.55, lineAlpha));
          ctx.lineWidth = Math.max(0.6, 1.2 * projA.scale);
          ctx.stroke();
        }
      }

      // 2. Update and Draw Impulses (electrical signals along synapses)
      impulseTimer += dt;
      if (impulseTimer > 0.22) {
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

          // Glowing spark head
          ctx.beginPath();
          ctx.arc(ix, iy, 2.2 * pA.scale, 0, Math.PI * 2);
          ctx.fillStyle = imp.color;
          ctx.globalAlpha = 0.95;
          ctx.fill();

          // Spark aura
          ctx.beginPath();
          ctx.arc(ix, iy, 5.5 * pA.scale, 0, Math.PI * 2);
          ctx.fillStyle = imp.color;
          ctx.globalAlpha = 0.25;
          ctx.fill();
        }

        if (imp.progress >= 1) {
          impulses.splice(k, 1);
        }
      }

      // 3. Draw Triangular Particle Glyphs (from DESIGN.md)
      for (const proj of projected) {
        const glyphSize = proj.point.size * proj.scale * 1.3;
        drawTriangleGlyph(
          ctx,
          proj.px,
          proj.py,
          glyphSize,
          proj.point.color,
          proj.alpha
        );

        // Core soft glow for brightest foreground points
        if (proj.alpha > 0.7 && !proj.point.isAmbient) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, glyphSize * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = proj.point.color;
          ctx.globalAlpha = proj.alpha * 0.25;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      targetRotY += normX * 0.05;
      targetRotX = Math.max(-0.6, Math.min(0.6, normY * 0.9));
    }

    resize();
    points = createBrainPoints(950);
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
    });

    const parent = canvas.parentElement || window;
    parent.addEventListener("mousemove", onPointerMove as EventListener);
    parent.addEventListener("touchmove", onPointerMove as EventListener, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      parent.removeEventListener("mousemove", onPointerMove as EventListener);
      parent.removeEventListener("touchmove", onPointerMove as EventListener);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className || ""}`}
      aria-hidden="true"
    />
  );
}
