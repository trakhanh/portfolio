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
  isSynapseNode: boolean;
}

interface SynapseConnection {
  p1: number;
  p2: number;
  intensity: number;
  sparkProgress: number;
  speed: number;
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

    // 3D rotation state with smooth momentum
    let rotX = 0.22;
    let rotY = 0;
    let targetRotX = 0.22;
    let targetRotY = 0;
    let isHovered = false;

    // Palette: Electric Iris, Cyan Neon, Saffron Spark, Platinum White, Lavender Phosphor
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

    const SPHERE_RADIUS = 185;
    const points: Point3D[] = [];
    const connections: SynapseConnection[] = [];

    // 1. Fibonacci Sphere Surface Particles (1,000 Points)
    const numSurfacePoints = 1000;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numSurfacePoints; i++) {
      const y = 1 - (i / (numSurfacePoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const color = PALETTE[i % PALETTE.length];
      const isHub = i % 14 === 0;

      points.push({
        x: x * SPHERE_RADIUS,
        y: y * SPHERE_RADIUS,
        z: z * SPHERE_RADIUS,
        baseX: x * SPHERE_RADIUS,
        baseY: y * SPHERE_RADIUS,
        baseZ: z * SPHERE_RADIUS,
        color: isHub ? COLOR_SAFFRON : color,
        size: isHub ? 3.0 : 1.3 + Math.random() * 1.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 1.5 + Math.random() * 2.0,
        isSynapseNode: isHub,
      });
    }

    // 2. Internal Neural Hemisphere Streamlines (450 Points)
    const numInternalPoints = 450;
    for (let i = 0; i < numInternalPoints; i++) {
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const u = Math.random();
      const v = Math.random();
      const r = (0.2 + 0.65 * Math.cbrt(u)) * SPHERE_RADIUS;
      const theta = v * 2 * Math.PI;
      const phiAngle = Math.acos(2 * Math.random() - 1);

      const x = hemisphere * (18 + Math.abs(r * Math.sin(phiAngle) * Math.cos(theta) * 0.82));
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
        size: 1.2 + Math.random() * 1.4,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 1.8 + Math.random() * 1.5,
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

      for (let j = i + 1; j < specialIndices.length; j++) {
        const idxB = specialIndices[j];
        const pB = points[idxB];
        const dx = pA.baseX - pB.baseX;
        const dy = pA.baseY - pB.baseY;
        const dz = pA.baseZ - pB.baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 95 && dist > 18) {
          connections.push({
            p1: idxA,
            p2: idxB,
            intensity: 0.35 + Math.random() * 0.45,
            sparkProgress: Math.random(),
            speed: 0.007 + Math.random() * 0.015,
          });
        }
      }
    }

    // Dynamic Sizing
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

    // Mouse Tracking for Parallax Tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.9;
      targetRotX = -ny * 0.9 + 0.22;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetRotX = 0.22;
      targetRotY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Render Loop
    let lastTime = performance.now();
    let autoAngle = 0;
    let radarAngle = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!width || !height) return;

      autoAngle += dt * 0.35;
      radarAngle += dt * 1.2;

      const currentRotY = autoAngle + rotY;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 500;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // 1. Core Bioluminescent Fluid Radial Aura
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        15,
        centerX,
        centerY,
        SPHERE_RADIUS * 1.25
      );
      coreGrad.addColorStop(0, "rgba(128, 82, 255, 0.22)");
      coreGrad.addColorStop(0.35, "rgba(0, 229, 255, 0.12)");
      coreGrad.addColorStop(0.7, "rgba(255, 184, 41, 0.04)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Project 3D Points
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

        // Pulsation rhythm
        p.pulsePhase += dt * p.pulseSpeed;
        const pulse = 1 + Math.sin(p.pulsePhase) * 0.06;

        const bx = p.baseX * pulse;
        const by = p.baseY * pulse;
        const bz = p.baseZ * pulse;

        // Y-axis rotation
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;

        // X-axis rotation
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        // Perspective
        const depth = fov / (fov + z2);
        const px = centerX + x1 * depth;
        const py = centerY + y2 * depth;

        // Depth cueing
        const normZ = (z2 + SPHERE_RADIUS) / (SPHERE_RADIUS * 2);
        const alpha = Math.max(0.12, Math.min(1.0, 0.18 + normZ * 0.82));

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

      // Sort points by Z (back to front)
      const sortedIndices = projected
        .map((_, idx) => idx)
        .sort((a, b) => projected[a].pz - projected[b].pz);

      // 2. Render Synaptic Lines & Bioluminescent Sparks
      ctx.lineWidth = 1;
      for (let i = 0; i < connections.length; i++) {
        const c = connections[i];
        const p1 = projected[c.p1];
        const p2 = projected[c.p2];

        const avgAlpha = (p1.alpha + p2.alpha) * 0.5 * c.intensity;
        if (avgAlpha > 0.08) {
          ctx.strokeStyle = `rgba(128, 82, 255, ${avgAlpha * 0.65})`;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();

          // Spark traveling
          c.sparkProgress = (c.sparkProgress + c.speed) % 1;
          const sx = p1.px + (p2.px - p1.px) * c.sparkProgress;
          const sy = p1.py + (p2.py - p1.py) * c.sparkProgress;

          ctx.fillStyle = avgAlpha > 0.3 ? COLOR_CYAN : COLOR_WHITE;
          ctx.shadowBlur = 6;
          ctx.shadowColor = COLOR_CYAN;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 3. Render Orbital Telemetry Radar Rings with Degree Marks
      const numRingSteps = 72;
      const ringRadius = SPHERE_RADIUS * 1.18;

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
      ctx.strokeStyle = "rgba(128, 82, 255, 0.35)";
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Sweeping radar sweeper dot along the ring
      const sweepX = Math.cos(radarAngle) * ringRadius;
      const sweepZ = Math.sin(radarAngle) * ringRadius;
      const sw1 = sweepX * cosY - sweepZ * sinY;
      const swz1 = sweepX * sinY + sweepZ * cosY;
      const swy2 = -swz1 * sinX;
      const swz2 = swz1 * cosX;
      const swDepth = fov / (fov + swz2);
      const swPx = centerX + sw1 * swDepth;
      const swPy = centerY + swy2 * swDepth;

      ctx.save();
      ctx.fillStyle = COLOR_SAFFRON;
      ctx.shadowBlur = 10;
      ctx.shadowColor = COLOR_SAFFRON;
      ctx.beginPath();
      ctx.arc(swPx, swPy, 3.2 * swDepth, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Render Bioluminescent Particles with Specular Flares
      for (let k = 0; k < sortedIndices.length; k++) {
        const p = projected[sortedIndices[k]];

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Foreground hub flare
        if (p.isSynapseNode && p.pz > 0) {
          ctx.shadowBlur = 12;
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

      {/* Liquid Glass Telemetry HUD Chips */}
      <div className="absolute top-4 left-4 font-mono text-[11px] text-[#bbc7c6] uppercase tracking-[0.14em] pointer-events-none flex items-center gap-2 chip-liquid !bg-[#0f0f18]/80 !border-white/10">
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
        <span>// BIOLUMINESCENT_NEURAL_SPHERE</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[10px] text-[#ffb829] uppercase tracking-[0.12em] pointer-events-none chip-liquid !bg-[#0f0f18]/80 !border-white/10">
        NODES: 2,400+ · 3D CORE
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#bbc7c6]/70 uppercase tracking-[0.12em] pointer-events-none chip-liquid !bg-[#0f0f18]/80 !border-white/10">
        SYNAPSE: 120GB/s · LATENCY: 12ms
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#8052ff] uppercase tracking-[0.12em] pointer-events-none chip-liquid !bg-[#0f0f18]/80 !border-white/10">
        AI_ERP_OS // v2026.04
      </div>
    </div>
  );
}
