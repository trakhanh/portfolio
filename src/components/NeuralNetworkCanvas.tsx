"use client";

import React, { useEffect, useRef } from "react";

export function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId: number | null = null;
    let isVisible = true;
    let lastTime = performance.now();

    const isMobile = window.innerWidth <= 820;
    const NODE_COUNT = isMobile ? 48 : 92;
    const MAX_CONNECT_DIST = isMobile ? 135 : 180;
    const MOUSE_INFLUENCE_DIST = isMobile ? 140 : 220;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    const COLORS = {
      cyan: { r: 0, g: 240, b: 255 },
      emerald: { r: 0, g: 255, b: 136 },
      blue: { r: 0, g: 140, b: 255 },
    };

    class Neuron {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      z: number;
      baseRadius: number;
      radius: number;
      waveAngleX: number;
      waveAngleY: number;
      waveSpeedX: number;
      waveSpeedY: number;
      waveAmpX: number;
      waveAmpY: number;
      color: { r: number; g: number; b: number };
      isHub: boolean;
      breathPhase: number;
      breathSpeed: number;
      energy: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.z = 0.45 + Math.random() * 0.55;

        const radiusBase = isMobile
          ? 1.8 + Math.random() * 1.8
          : 2.4 + Math.random() * 2.8;
        this.baseRadius = radiusBase * this.z;
        this.radius = this.baseRadius;

        this.waveAngleX = Math.random() * Math.PI * 2;
        this.waveAngleY = Math.random() * Math.PI * 2;
        this.waveSpeedX = 0.008 + Math.random() * 0.014;
        this.waveSpeedY = 0.006 + Math.random() * 0.012;
        this.waveAmpX = (12 + Math.random() * 24) * this.z;
        this.waveAmpY = (10 + Math.random() * 20) * this.z;

        const colorRoll = Math.random();
        if (colorRoll > 0.42) {
          this.color = COLORS.cyan;
        } else if (colorRoll > 0.14) {
          this.color = COLORS.emerald;
        } else {
          this.color = COLORS.blue;
        }

        this.isHub = Math.random() > 0.8;
        if (this.isHub) this.baseRadius *= 1.4;

        this.breathPhase = Math.random() * Math.PI * 2;
        this.breathSpeed = 0.02 + Math.random() * 0.025;
        this.energy = 0;
      }

      update(dt: number) {
        this.waveAngleX += this.waveSpeedX * dt;
        this.waveAngleY += this.waveSpeedY * dt;

        let targetX = this.baseX + Math.sin(this.waveAngleX) * this.waveAmpX;
        let targetY = this.baseY + Math.cos(this.waveAngleY) * this.waveAmpY;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE_DIST && dist > 1) {
            const force = (1 - dist / MOUSE_INFLUENCE_DIST) * (this.z * 0.45);
            targetX += (dx / dist) * (force * 45);
            targetY += (dy / dist) * (force * 45);
            this.energy = Math.max(
              this.energy,
              (1 - dist / MOUSE_INFLUENCE_DIST) * 0.95
            );
          }
        }

        this.x += (targetX - this.x) * (0.045 * dt);
        this.y += (targetY - this.y) * (0.045 * dt);
        this.breathPhase += this.breathSpeed * dt;

        if (this.energy > 0.005) {
          this.energy *= Math.pow(0.92, dt);
        } else {
          this.energy = 0;
        }
      }

      draw() {
        if (!ctx) return;
        const breath = 0.22 * Math.sin(this.breathPhase) + this.energy * 0.65;
        const currentRadius = Math.max(1.2, this.radius * (1 + breath));
        const { r, g, b } = this.color;

        const bottomDist = height - this.y;
        const bottomFade = Math.min(1, Math.max(0.12, bottomDist / 90));
        const alphaBase = (0.65 + this.energy * 0.35) * this.z * bottomFade;

        const glowRadius = currentRadius * (this.isHub ? 4.5 : 3.4);
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          glowRadius
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${(0.55 * alphaBase).toFixed(3)})`);
        gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${(0.18 * alphaBase).toFixed(3)})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (this.isHub && this.z > 0.65) {
          ctx.beginPath();
          ctx.arc(
            this.x,
            this.y,
            currentRadius * 2.2,
            this.breathPhase,
            this.breathPhase + Math.PI * 1.35
          );
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(0.45 + this.energy * 0.45).toFixed(2)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, alphaBase * 1.3).toFixed(2)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1.0, currentRadius * 0.42), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.85 + this.energy * 0.15).toFixed(2)})`;
        ctx.fill();
      }
    }

    class SynapticPulse {
      path: [Neuron, Neuron];
      progress = 0;
      speed: number;
      color: { r: number; g: number; b: number };
      alive = true;
      history: { x: number; y: number }[] = [];
      tailLength = 7;

      constructor(path: [Neuron, Neuron]) {
        this.path = path;
        this.speed = 0.012 + Math.random() * 0.016;
        this.color = Math.random() > 0.45 ? COLORS.cyan : COLORS.emerald;
      }

      update(dt: number) {
        this.progress += this.speed * dt;
        const [from, to] = this.path;
        const currentX = from.x + (to.x - from.x) * this.progress;
        const currentY = from.y + (to.y - from.y) * this.progress;

        this.history.unshift({ x: currentX, y: currentY });
        if (this.history.length > this.tailLength) {
          this.history.pop();
        }

        if (this.progress >= 1) {
          this.alive = false;
          const dest = this.path[1];
          if (dest) {
            dest.energy = 0.9;
            ripples.push(new SynapticRipple(dest.x, dest.y, this.color, 16));
          }
        }
      }

      draw() {
        if (!ctx || this.history.length === 0) return;
        const { r, g, b } = this.color;

        for (let i = this.history.length - 1; i > 0; i--) {
          const pt = this.history[i];
          const prev = this.history[i - 1];
          const tailAlpha = ((1 - i / this.history.length) * 0.75).toFixed(3);
          const tailWidth = (1 - i / this.history.length) * 2.2;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${tailAlpha})`;
          ctx.lineWidth = tailWidth;
          ctx.stroke();
        }

        const head = this.history[0];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
    }

    class SynapticRipple {
      x: number;
      y: number;
      color: { r: number; g: number; b: number };
      radius = 2;
      maxRadius: number;
      opacity = 0.9;
      alive = true;

      constructor(
        x: number,
        y: number,
        color: { r: number; g: number; b: number },
        maxRadius = 22
      ) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.maxRadius = maxRadius;
      }

      update(dt: number) {
        this.radius += 0.85 * dt;
        this.opacity -= 0.038 * dt;
        if (this.radius >= this.maxRadius || this.opacity <= 0) {
          this.alive = false;
        }
      }

      draw() {
        if (!ctx) return;
        const { r, g, b } = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, this.opacity).toFixed(2)})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
    }

    let neurons: Neuron[] = [];
    let pulses: SynapticPulse[] = [];
    let ripples: SynapticRipple[] = [];
    let lastImpulseTime = 0;
    const nextImpulseInterval = 1200;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, 600);
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

    function initNetwork() {
      neurons = [];
      pulses = [];
      ripples = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const x = Math.random() * (width - 40) + 20;
        let y: number;
        if (isMobile) {
          if (Math.random() < 0.65) {
            y = Math.random() * Math.min(height * 0.45, 800) + 40;
          } else {
            y = Math.random() * (height - 90) + 40;
          }
        } else {
          y = Math.random() * (height - 90) + 40;
        }
        neurons.push(new Neuron(x, y));
      }

      neurons.sort((a, b) => a.z - b.z);
    }

    function spawnRandomImpulse() {
      if (neurons.length < 2) return;
      const source = neurons[Math.floor(Math.random() * neurons.length)];
      let nearest: Neuron | null = null;
      let minD = Infinity;

      for (let i = 0; i < neurons.length; i++) {
        const target = neurons[i];
        if (target === source) continue;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_CONNECT_DIST && d < minD) {
          minD = d;
          nearest = target;
        }
      }

      if (nearest) {
        pulses.push(new SynapticPulse([source, nearest]));
      }
    }

    function drawConnections() {
      if (!ctx) return;
      const len = neurons.length;

      for (let i = 0; i < len; i++) {
        const p1 = neurons[i];

        for (let j = i + 1; j < len; j++) {
          const p2 = neurons[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECT_DIST) {
            const ratio = 1 - dist / MAX_CONNECT_DIST;
            const avgZ = (p1.z + p2.z) * 0.5;
            const midY = (p1.y + p2.y) * 0.5;
            const bottomDist = height - midY;
            const bottomFade = Math.min(1, Math.max(0.06, bottomDist / 80));
            const baseAlpha = isMobile
              ? ratio * 0.48 * avgZ * bottomFade + 0.1
              : ratio * 0.35 * avgZ * bottomFade;
            const lineAlpha = (
              baseAlpha +
              (p1.energy + p2.energy) * 0.45
            ).toFixed(3);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const { r, g, b } = p1.color;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
            ctx.lineWidth = Math.max(0.75, 1.6 * ratio * avgZ);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < MOUSE_INFLUENCE_DIST) {
            const mRatio = 1 - mdist / MOUSE_INFLUENCE_DIST;
            const mAlpha = (mRatio * 0.55 * p1.z).toFixed(3);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${mAlpha})`;
            ctx.lineWidth = 1.35 * mRatio;
            ctx.stroke();
          }
        }
      }
    }

    function render(now: number) {
      if (!isVisible || !ctx) return;

      const elapsed = now - lastTime;
      lastTime = now;
      const dt = Math.min(Math.max(elapsed / 16.67, 0.5), 2.5);

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * (0.12 * dt);
        mouse.y += (mouse.targetY - mouse.y) * (0.12 * dt);
      }

      ctx.clearRect(0, 0, width, height);

      drawConnections();

      for (let i = 0; i < neurons.length; i++) {
        if (!prefersReducedMotion) neurons[i].update(dt);
        neurons[i].draw();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.update(dt);
        ripple.draw();
        if (!ripple.alive) ripples.splice(i, 1);
      }

      if (!prefersReducedMotion) {
        if (now - lastImpulseTime > nextImpulseInterval) {
          spawnRandomImpulse();
          lastImpulseTime = now;
        }

        for (let i = pulses.length - 1; i >= 0; i--) {
          const pulse = pulses[i];
          pulse.update(dt);
          pulse.draw();
          if (!pulse.alive) pulses.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;

      if (!mouse.active) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.active = true;
      }
    }

    function onPointerLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    }

    resize();
    initNetwork();
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
      initNetwork();
    });

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", onPointerMove);
      parent.addEventListener("mouseleave", onPointerLeave);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", onPointerMove);
        parent.removeEventListener("mouseleave", onPointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      id="heroNeuralCanvas"
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-25 md:opacity-85"
      aria-hidden="true"
    />
  );
}
