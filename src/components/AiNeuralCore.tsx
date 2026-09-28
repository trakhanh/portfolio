"use client";

import React, { useEffect, useRef } from "react";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Tract {
  points: Vec3[];
  color: string;
  glowColor: string;
  width: number;
  nodes: { t: number; size: number; phase: number; isHub: boolean }[];
  impulses: { t: number; speed: number; color: string; alive: boolean }[];
}

export function AiNeuralCore({ className }: { className?: string }) {
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

    // 3D camera & rotation
    let rotX = 0.12;
    let rotY = 0;
    let targetRotX = 0.12;
    let targetRotY = 0;
    let isHovered = false;

    // Build Streamlines (Fiber-optic neural tracts modeling the brain)
    function buildTracts(): Tract[] {
      const tracts: Tract[] = [];
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 32 : 56;

      // Color scheme: Deep Electric Iris, Cyan Neon, Saffron Accent
      const PALETTES = [
        { stroke: "rgba(128, 82, 255, 0.45)", glow: "rgba(128, 82, 255, 0.9)", color: "#8052ff" },
        { stroke: "rgba(0, 229, 255, 0.45)", glow: "rgba(0, 229, 255, 0.9)", color: "#00e5ff" },
        { stroke: "rgba(255, 184, 41, 0.45)", glow: "rgba(255, 184, 41, 0.9)", color: "#ffb829" },
        { stroke: "rgba(180, 140, 255, 0.4)", glow: "rgba(255, 255, 255, 0.9)", color: "#b48cff" },
      ];

      for (let i = 0; i < count; i++) {
        const side = i % 2 === 0 ? 1 : -1; // Left or Right hemisphere
        const pal = PALETTES[i % PALETTES.length];
        const angle = ((i / count) * Math.PI * 2);

        // Control points defining anatomical curvature
        const pts: Vec3[] = [];
        const numSegments = 16;

        // Generate different types of neural pathways:
        // Type 1: Cortical loops (sagittal arches from frontal to occipital)
        // Type 2: Corona radiata (deep thalamic radiation arching outwards)
        // Type 3: Temporal lobe sweeping under
        const tractType = i % 3;

        for (let s = 0; s <= numSegments; s++) {
          const t = s / numSegments;
          let x = 0, y = 0, z = 0;

          if (tractType === 0) {
            // Sagittal Arch (Cerebral mantle)
            const phi = t * Math.PI;
            const elevation = Math.sin(phi);
            const radius = 130 + Math.sin(angle * 2) * 20;

            x = side * (20 + radius * 0.85 * Math.sin(angle * 0.6) * elevation + Math.abs(Math.sin(t * Math.PI)) * 30);
            y = -elevation * 110 + (t - 0.5) * 35;
            z = Math.cos(phi) * 140 + Math.sin(angle) * 15;
          } else if (tractType === 1) {
            // Radiata (Internal capsule fanning upward and outward)
            const spread = t * 140;
            const theta = angle + t * 0.4;
            x = side * (15 + Math.sin(theta) * spread);
            y = (1 - t) * 75 - t * 85;
            z = Math.cos(theta) * spread * 0.95;
          } else {
            // Temporal & Occipital swoops
            const phi = t * Math.PI * 1.1;
            x = side * (35 + Math.sin(phi) * 115);
            y = 20 + Math.sin(t * Math.PI * 1.5) * 60;
            z = -Math.cos(phi) * 110 + (t - 0.5) * 40;
          }

          pts.push({ x, y, z });
        }

        // Nodes along this tract
        const nodesCount = Math.floor(Math.random() * 4) + 3;
        const nodes = [];
        for (let n = 0; n < nodesCount; n++) {
          nodes.push({
            t: (n + 0.5 + (Math.random() - 0.5) * 0.3) / nodesCount,
            size: Math.random() * 2.2 + 1.2,
            phase: Math.random() * Math.PI * 2,
            isHub: Math.random() > 0.75,
          });
        }

        tracts.push({
          points: pts,
          color: pal.color,
          glowColor: pal.glow,
          width: Math.random() * 0.8 + 0.7,
          nodes,
          impulses: [],
        });
      }

      return tracts;
    }

    let tracts = buildTracts();

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 420);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    }

    // Trigger impulse down a random tract
    function spawnImpulse() {
      if (tracts.length === 0) return;
      const tract = tracts[Math.floor(Math.random() * tracts.length)];
      if (tract.impulses.length < 2) {
        tract.impulses.push({
          t: 0,
          speed: 0.015 + Math.random() * 0.025,
          color: Math.random() > 0.35 ? "#ffffff" : "#ffb829",
          alive: true,
        });
      }
    }

    // Interpolate 3D point along piecewise segments
    function getPointOnTract(pts: Vec3[], t: number): Vec3 {
      const totalSegments = pts.length - 1;
      const floatIndex = t * totalSegments;
      const index = Math.min(Math.floor(floatIndex), totalSegments - 1);
      const frac = floatIndex - index;

      const p0 = pts[index];
      const p1 = pts[index + 1];

      return {
        x: p0.x + (p1.x - p0.x) * frac,
        y: p0.y + (p1.y - p0.y) * frac,
        z: p0.z + (p1.z - p0.z) * frac,
      };
    }

    let lastTime = performance.now();
    let impulseTimer = 0;
    let orbitalAngle = 0;

    function render(now: number) {
      if (!isVisible || !ctx) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Gentle natural continuous rotation
      targetRotY += 0.35 * dt;
      orbitalAngle += 0.45 * dt;

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
      const scaleFactor = (Math.min(width, height) / 380) * 1.05;

      // Project 3D vector to 2D screen
      function project(v: Vec3): { sx: number; sy: number; sz: number; scale: number; alpha: number } {
        // Y-axis rotation
        const x1 = v.x * cosY + v.z * sinY;
        const y1 = v.y;
        const z1 = -v.x * sinY + v.z * cosY;

        // X-axis tilt
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const fov = cameraDistance / (cameraDistance + z2 * scaleFactor * 0.85);
        const sx = centerX + x2 * scaleFactor * fov;
        const sy = centerY + y2 * scaleFactor * fov;

        const depthNorm = (z2 + 200) / 400;
        const alpha = Math.max(0.18, Math.min(1.0, 0.35 + depthNorm * 0.65));

        return { sx, sy, sz: z2, scale: fov, alpha };
      }

      // 1. Draw central glowing white-violet AI core (Singularity)
      const coreProj = project({ x: 0, y: 0, z: 0 });
      const coreRadius = 38 * coreProj.scale;
      const coreGlow = ctx.createRadialGradient(
        coreProj.sx, coreProj.sy, 0,
        coreProj.sx, coreProj.sy, coreRadius * 2.8
      );
      coreGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      coreGlow.addColorStop(0.2, "rgba(128, 82, 255, 0.65)");
      coreGlow.addColorStop(0.55, "rgba(0, 229, 255, 0.2)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(coreProj.sx, coreProj.sy, coreRadius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      // 2. Draw Precision Holographic Telemetry Rings (AI Axis & Latency rings)
      const ringRadius = 185 * scaleFactor;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotY * 0.5);

      // Outer elliptical telemetry ring
      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius, ringRadius * 0.35, 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(128, 82, 255, 0.22)";
      ctx.lineWidth = 1.0;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      // Inner fast tensor ring
      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius * 0.72, ringRadius * 0.25, -0.4, orbitalAngle, orbitalAngle + Math.PI * 1.4);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.45)";
      ctx.lineWidth = 1.3;
      ctx.setLineDash([]);
      ctx.stroke();

      // Ring satellite indicator
      const satX = Math.cos(orbitalAngle) * (ringRadius * 0.72);
      const satY = Math.sin(orbitalAngle) * (ringRadius * 0.25);
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb829";
      ctx.shadowColor = "#ffb829";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // 3. Render Neural Tracts (Fiber Streamlines)
      for (const tract of tracts) {
        const projectedPts = tract.points.map(project);

        // Draw the smooth flowing neural spline
        ctx.beginPath();
        ctx.moveTo(projectedPts[0].sx, projectedPts[0].sy);
        for (let i = 1; i < projectedPts.length - 1; i++) {
          const xc = (projectedPts[i].sx + projectedPts[i + 1].sx) * 0.5;
          const yc = (projectedPts[i].sy + projectedPts[i + 1].sy) * 0.5;
          ctx.quadraticCurveTo(projectedPts[i].sx, projectedPts[i].sy, xc, yc);
        }
        const last = projectedPts[projectedPts.length - 1];
        ctx.lineTo(last.sx, last.sy);

        const avgAlpha = (projectedPts[0].alpha + last.alpha) * 0.5;
        ctx.strokeStyle = tract.color;
        ctx.globalAlpha = avgAlpha * 0.5;
        ctx.lineWidth = tract.width * projectedPts[0].scale;
        ctx.stroke();

        // Nodes along the tract
        for (const node of tract.nodes) {
          node.phase += 0.03;
          const pos3d = getPointOnTract(tract.points, node.t);
          const proj = project(pos3d);

          const r = node.size * proj.scale;
          const breath = Math.sin(node.phase) * 0.3;

          // Glowing Halo for hub nodes
          if (node.isHub) {
            ctx.beginPath();
            ctx.arc(proj.sx, proj.sy, r * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = tract.glowColor;
            ctx.globalAlpha = proj.alpha * 0.25;
            ctx.fill();
          }

          // Core bright node
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, r * (1 + breath), 0, Math.PI * 2);
          ctx.fillStyle = tract.color;
          ctx.globalAlpha = proj.alpha * 0.95;
          ctx.fill();

          // White-hot center
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, Math.max(0.8, r * 0.45), 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = proj.alpha;
          ctx.fill();
        }

        // Draw Impulses traveling along the tract
        for (let k = tract.impulses.length - 1; k >= 0; k--) {
          const imp = tract.impulses[k];
          imp.t += imp.speed;

          if (imp.t < 1) {
            const impPos = getPointOnTract(tract.points, imp.t);
            const impProj = project(impPos);

            // Glowing impulse comet head
            ctx.beginPath();
            ctx.arc(impProj.sx, impProj.sy, 3.5 * impProj.scale, 0, Math.PI * 2);
            ctx.fillStyle = imp.color;
            ctx.globalAlpha = 1.0;
            ctx.shadowColor = imp.color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            tract.impulses.splice(k, 1);
          }
        }
      }

      // Spawn periodic rhythmic impulses
      impulseTimer += dt;
      if (impulseTimer > 0.18) {
        spawnImpulse();
        impulseTimer = 0;
      }

      // 4. Subtle Telemetry Overlay Labels around the Brain
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255, 184, 41, 0.75)";
      ctx.fillText("// NEURAL_CORTEX: ACTIVE", centerX - 140 * scaleFactor, centerY - 150 * scaleFactor);

      ctx.fillStyle = "rgba(0, 229, 255, 0.65)";
      ctx.fillText("SYNAPSE_BANDWIDTH // 120GB/s", centerX + 30 * scaleFactor, centerY + 175 * scaleFactor);

      ctx.fillStyle = "rgba(128, 82, 255, 0.7)";
      ctx.fillText("AI_ERP_OS v2026", centerX - 120 * scaleFactor, centerY + 185 * scaleFactor);

      animId = requestAnimationFrame(render);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      targetRotY += normX * 0.05;
      targetRotX = Math.max(-0.4, Math.min(0.4, normY * 0.6));
    }

    resize();
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
      className={`relative w-full h-full min-h-[460px] flex items-center justify-center select-none overflow-hidden ${className || ""}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
