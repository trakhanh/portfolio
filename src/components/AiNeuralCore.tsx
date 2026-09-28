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
  isSynapseNode: boolean;
}

interface SynapseConnection {
  p1: number;
  p2: number;
  intensity: number;
  sparkProgress: number;
  speed: number;
  active: boolean;
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

    // 3D rotation state
    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let isHovered = false;

    // Colors matching current palette
    const COLOR_IRIS = "#8052ff";
    const COLOR_CYAN = "#00e5ff";
    const COLOR_SAFFRON = "#ffb829";
    const COLOR_WHITE = "#ffffff";
    const COLOR_LAVENDER = "#fde9ff";

    const PALETTE = [
      COLOR_IRIS,
      COLOR_CYAN,
      COLOR_WHITE,
      COLOR_IRIS,
      COLOR_CYAN,
      COLOR_SAFFRON,
      COLOR_LAVENDER,
    ];

    // Generate Bioluminescent Sphere & Neural Nodes
    const SPHERE_RADIUS = 180;
    const points: Point3D[] = [];
    const connections: SynapseConnection[] = [];

    // 1. Fibonacci Sphere Surface Particles (Bioluminescent Data Orb)
    const numSurfacePoints = 900;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numSurfacePoints; i++) {
      const y = 1 - (i / (numSurfacePoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const color = PALETTE[i % PALETTE.length];
      const isSpecial = i % 15 === 0;

      points.push({
        x: x * SPHERE_RADIUS,
        y: y * SPHERE_RADIUS,
        z: z * SPHERE_RADIUS,
        baseX: x * SPHERE_RADIUS,
        baseY: y * SPHERE_RADIUS,
        baseZ: z * SPHERE_RADIUS,
        color: isSpecial ? COLOR_SAFFRON : color,
        size: isSpecial ? 2.8 : 1.4 + Math.random() * 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        isSynapseNode: isSpecial,
      });
    }

    // 2. Internal Neural Hemisphere Points (Brain Core Architecture)
    const numInternalPoints = 400;
    for (let i = 0; i < numInternalPoints; i++) {
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const u = Math.random();
      const v = Math.random();
      const r = (0.2 + 0.65 * Math.cbrt(u)) * SPHERE_RADIUS;
      const theta = v * 2 * Math.PI;
      const phiAngle = Math.acos(2 * Math.random() - 1);

      // Create two distinct hemisphere clusters
      const x = hemisphere * (20 + Math.abs(r * Math.sin(phiAngle) * Math.cos(theta) * 0.8));
      const y = r * Math.sin(phiAngle) * Math.sin(theta) * 0.9;
      const z = r * Math.cos(phiAngle) * 0.95;

      const isIris = Math.random() > 0.35;
      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: isIris ? COLOR_IRIS : COLOR_CYAN,
        size: 1.2 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        isSynapseNode: i % 8 === 0,
      });
    }

    // 3. Connect Synapse Nodes
    const specialIndices: number[] = [];
    points.forEach((p, idx) => {
      if (p.isSynapseNode) specialIndices.push(idx);
    });

    for (let i = 0; i < specialIndices.length; i++) {
      const idxA = specialIndices[i];
      const pA = points[idxA];
      let nearestDist = Infinity;
      let nearestIdx = -1;

      for (let j = 0; j < specialIndices.length; j++) {
        if (i === j) continue;
        const idxB = specialIndices[j];
        const pB = points[idxB];
        const dx = pA.baseX - pB.baseX;
        const dy = pA.baseY - pB.baseY;
        const dz = pA.baseZ - pB.baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 100 && dist > 15) {
          connections.push({
            p1: idxA,
            p2: idxB,
            intensity: 0.3 + Math.random() * 0.4,
            sparkProgress: Math.random(),
            speed: 0.006 + Math.random() * 0.012,
            active: true,
          });
        }
      }
    }

    // Handle Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // Mouse Tracking for Interactive Parallax Tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.8;
      targetRotX = -ny * 0.8 + 0.2;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetRotX = 0.2;
      targetRotY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation Render Loop
    let lastTime = performance.now();
    let autoAngle = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!width || !height) return;

      // Smooth camera interpolation
      autoAngle += dt * 0.35;
      const currentRotY = autoAngle + rotY;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 480;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // 1. Render Subtle Ambient Core Glow
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        SPHERE_RADIUS * 1.15
      );
      coreGrad.addColorStop(0, "rgba(128, 82, 255, 0.16)");
      coreGrad.addColorStop(0.4, "rgba(0, 229, 255, 0.08)");
      coreGrad.addColorStop(0.7, "rgba(255, 184, 41, 0.03)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Project all 3D points
      interface ProjectedPoint {
        px: number;
        py: number;
        pz: number;
        scale: number;
        color: string;
        size: number;
        alpha: number;
        isSynapseNode: boolean;
      }

      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Slight breathing pulsation
        p.pulsePhase += dt * 2;
        const pulse = 1 + Math.sin(p.pulsePhase) * 0.05;

        const bx = p.baseX * pulse;
        const by = p.baseY * pulse;
        const bz = p.baseZ * pulse;

        // Rotate around Y axis
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;

        // Rotate around X axis
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        // Perspective projection
        const depth = fov / (fov + z2);
        const px = centerX + x1 * depth;
        const py = centerY + y2 * depth;

        // Depth cueing alpha (foreground points glow brighter)
        const normZ = (z2 + SPHERE_RADIUS) / (SPHERE_RADIUS * 2);
        const alpha = Math.max(0.12, Math.min(1.0, 0.2 + normZ * 0.8));

        projected.push({
          px,
          py,
          pz: z2,
          scale: depth,
          color: p.color,
          size: p.size * depth,
          alpha,
          isSynapseNode: p.isSynapseNode,
        });
      }

      // Sort points by Z for correct depth sorting (back to front)
      const sortedIndices = projected
        .map((_, idx) => idx)
        .sort((a, b) => projected[a].pz - projected[b].pz);

      // 2. Render Synapse Lines
      ctx.lineWidth = 1;
      for (let i = 0; i < connections.length; i++) {
        const c = connections[i];
        const p1 = projected[c.p1];
        const p2 = projected[c.p2];

        // Average depth
        const avgAlpha = (p1.alpha + p2.alpha) * 0.5 * c.intensity;
        if (avgAlpha > 0.08) {
          ctx.strokeStyle = `rgba(128, 82, 255, ${avgAlpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();

          // Animate Synaptic Spark traveling along the line
          c.sparkProgress = (c.sparkProgress + c.speed) % 1;
          const sx = p1.px + (p2.px - p1.px) * c.sparkProgress;
          const sy = p1.py + (p2.py - p1.py) * c.sparkProgress;

          ctx.fillStyle = avgAlpha > 0.3 ? COLOR_CYAN : COLOR_WHITE;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Render Equatorial & Polar Telemetry Rings (Auros Technical Instrument)
      const numRingSteps = 72;
      const ringRadius = SPHERE_RADIUS * 1.16;

      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= numRingSteps; i++) {
        const angle = (i / numRingSteps) * Math.PI * 2;
        const rx = Math.cos(angle) * ringRadius;
        const rz = Math.sin(angle) * ringRadius;

        const x1 = rx * cosY - rz * sinY;
        const z1 = rx * sinY + rz * cosY;
        const y2 = -z1 * sinX;
        const z2 = z1 * cosX;

        const depth = fov / (fov + z2);
        const px = centerX + x1 * depth;
        const py = centerY + y2 * depth;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(128, 82, 255, 0.28)";
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 4. Render Bioluminescent Particles
      for (let k = 0; k < sortedIndices.length; k++) {
        const p = projected[sortedIndices[k]];

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Front glowing nodes
        if (p.isSynapseNode && p.pz > 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.75, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className || ""}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Telemetry HUD Labels (Auros Instrument Aesthetic) */}
      <div className="absolute top-4 left-4 font-mono text-[11px] text-[#bbc7c6]/70 uppercase tracking-[0.14em] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#00e5ff] shadow-[0_0_6px_#00e5ff] animate-pulse" />
        <span>// BIOLUMINESCENT_NEURAL_SPHERE</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[10px] text-[#ffb829]/80 uppercase tracking-[0.12em] pointer-events-none bg-[#0f0f18]/80 border border-white/10 px-2 py-0.5 rounded-[4px]">
        NODES: 2,400+ · 3D CORE
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#bbc7c6]/60 uppercase tracking-[0.12em] pointer-events-none">
        SYNAPSE: 120GB/s · LATENCY: 12ms
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#8052ff] uppercase tracking-[0.12em] pointer-events-none">
        AI_ERP_OS // v2026.04
      </div>
    </div>
  );
}
