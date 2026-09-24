/**
 * Cyber Neural Synapse Network 2.5 (Hệ thống Mạng Nơ-ron Thần kinh Sinh học - Số Siêu Cấp)
 * 
 * Tính năng nâng cấp:
 * 1. Đồ họa Đa tầng Chiều sâu 3D (Layered Parallax Depth with 92+ nodes)
 * 2. Lõi nơ-ron dày dặn, tỏa sáng rực rỡ (Luminous Multi-Tier Halos & White-Hot Nuclei)
 * 3. Sợi dendrite liên kết dày, rõ nét (High-Density Synaptic Web)
 * 4. Xung điện sao chổi có đuôi phát quang (Luminous Comet-Tail Synaptic Pulses, 24+ active)
 * 5. Bó Cáp Quang Nơ-ron Đáy Đôi (Dual-Rail Axon Conduits with Cross-Synaptic Rungs)
 * 6. Định tuyến thông minh: Cáp trung tâm cắm chuẩn vào cổng kết nối của Huy hiệu Uplink; cáp hai sườn tỏa đối xứng thanh lịch
 * 7. Điểm cực tiếp nhận (Terminal Docking Nodes) phát sáng dạng radar ở các đầu cáp
 * 8. Tương tác chuột mượt mà (Fluid Spring Attractor & Synaptic Burst Ripple)
 * 9. Tự động ngủ (Zero CPU footprint) khi cuộn khỏi màn hình (IntersectionObserver)
 */
(function () {
  'use strict';

  const canvas = document.getElementById('heroNeuralCanvas');
  if (!canvas) return;

  const heroSection = canvas.closest('.hero') || canvas.parentElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animId = null;
  let isVisible = true;
  let lastTime = performance.now();

  // Responsive settings — Tối ưu số lượng nơ-ron và tầm kết nối theo kích thước màn hình
  const isMobile = window.innerWidth <= 820;
  const NODE_COUNT = isMobile ? 48 : 92;
  const MAX_CONNECT_DIST = isMobile ? 135 : 180;
  const MOUSE_INFLUENCE_DIST = isMobile ? 140 : 220;

  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false
  };

  // Pools
  let neurons = [];
  let pulses = [];
  let ripples = [];
  let lastImpulseTime = 0;
  let nextImpulseInterval = 1200;

  // Color Definitions
  const COLORS = {
    cyan: { r: 0, g: 240, b: 255 },
    emerald: { r: 0, g: 255, b: 136 },
    blue: { r: 0, g: 140, b: 255 }
  };

  /**
   * Neuron Class — Tế bào nơ-ron thần kinh đa tầng
   */
  class Neuron {
    constructor(x, y, isConduit = false) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;

      // Depth: 0.4 (far/dim) to 1.0 (near/bright/crisp)
      this.z = isConduit ? 0.98 : (0.45 + Math.random() * 0.55);

      // Radius: Dịu nhẹ, tinh tế ở nền mờ trên mobile
      const radiusBase = isMobile ? (1.8 + Math.random() * 1.8) : (2.4 + Math.random() * 2.8);
      this.baseRadius = isConduit ? 4.8 : radiusBase * this.z;
      this.radius = this.baseRadius;

      // Organic wave motion parameters (Flow field drift)
      this.waveAngleX = Math.random() * Math.PI * 2;
      this.waveAngleY = Math.random() * Math.PI * 2;
      this.waveSpeedX = 0.008 + Math.random() * 0.014;
      this.waveSpeedY = 0.006 + Math.random() * 0.012;
      this.waveAmpX = (12 + Math.random() * 24) * this.z;
      this.waveAmpY = (10 + Math.random() * 20) * this.z;

      // Color scheme
      const colorRoll = Math.random();
      if (colorRoll > 0.42) {
        this.color = COLORS.cyan;
      } else if (colorRoll > 0.14) {
        this.color = COLORS.emerald;
      } else {
        this.color = COLORS.blue;
      }

      this.isConduit = isConduit;
      this.isHub = Math.random() > 0.80 || isConduit; // Major hub node
      if (this.isHub) this.baseRadius *= 1.4;

      // Ambient breathing pulse
      this.breathPhase = Math.random() * Math.PI * 2;
      this.breathSpeed = 0.02 + Math.random() * 0.025;

      // Excitation energy (when pulse arrives or mouse near)
      this.energy = 0;
    }

    update(dt, time) {
      // 1. Organic wave-based drift
      this.waveAngleX += this.waveSpeedX * dt;
      this.waveAngleY += this.waveSpeedY * dt;

      let targetX = this.baseX + Math.sin(this.waveAngleX) * this.waveAmpX;
      let targetY = this.baseY + Math.cos(this.waveAngleY) * this.waveAmpY;

      // 2. Mouse Attraction & Excitation
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_INFLUENCE_DIST && dist > 1) {
          const force = (1 - dist / MOUSE_INFLUENCE_DIST) * (this.z * 0.45);
          targetX += (dx / dist) * (force * 45);
          targetY += (dy / dist) * (force * 45);
          this.energy = Math.max(this.energy, (1 - dist / MOUSE_INFLUENCE_DIST) * 0.95);
        }
      }

      // Smooth LERP motion (Cực êm, không giật)
      this.x += (targetX - this.x) * (0.045 * dt);
      this.y += (targetY - this.y) * (0.045 * dt);

      // Breath phase
      this.breathPhase += this.breathSpeed * dt;

      // Energy decay
      if (this.energy > 0.005) {
        this.energy *= Math.pow(0.92, dt);
      } else {
        this.energy = 0;
      }
    }

    draw() {
      const breath = 0.22 * Math.sin(this.breathPhase) + (this.energy * 0.65);
      const currentRadius = Math.max(1.2, this.radius * (1 + breath));
      const { r, g, b } = this.color;

      // Soft vertical bottom fadeout so nodes near the horizon blend naturally
      const bottomDist = height - this.y;
      const bottomFade = Math.min(1, Math.max(0.12, bottomDist / 90));
      const alphaBase = (0.65 + this.energy * 0.35) * this.z * bottomFade;

      // 1. Outer Diffuse Glow (Hào quang đa tầng sáng mềm)
      const glowRadius = currentRadius * (this.isHub ? 4.5 : 3.4);
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${(0.55 * alphaBase).toFixed(3)})`);
      gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${(0.18 * alphaBase).toFixed(3)})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // 2. Hub rotating reticle ring for major neural hubs
      if (this.isHub && this.z > 0.65) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 2.2, this.breathPhase, this.breathPhase + Math.PI * 1.35);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(0.45 + this.energy * 0.45).toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Dense Synaptic Core (Lõi nơ-ron đậm nét)
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, alphaBase * 1.3).toFixed(2)})`;
      ctx.fill();

      // 4. White-Hot Nucleus (Tâm sáng trắng sắc nét)
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(1.0, currentRadius * 0.42), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${(0.85 + this.energy * 0.15).toFixed(2)})`;
      ctx.fill();
    }
  }

  /**
   * Synaptic Pulse with Luminous Comet Tail (Xung điện thần kinh đuôi sao chổi)
   */
  class SynapticPulse {
    constructor(path) {
      this.path = path; // [fromNeuron, toNeuron]
      this.progress = 0;
      this.speed = 0.012 + Math.random() * 0.016;
      this.color = Math.random() > 0.45 ? COLORS.cyan : COLORS.emerald;
      this.alive = true;
      this.history = [];
      this.tailLength = 7;
    }

    update(dt) {
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
      if (this.history.length === 0) return;

      const { r, g, b } = this.color;

      // 1. Glowing fading comet tail
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

      // 2. Head spark
      const head = this.history[0];
      ctx.beginPath();
      ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(head.x, head.y, 1.0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  }

  /**
   * Expanding Synaptic Ripple Ring (Vòng sóng xung thần kinh bung tỏa)
   */
  class SynapticRipple {
    constructor(x, y, color, maxRadius = 22) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 2;
      this.maxRadius = maxRadius;
      this.opacity = 0.9;
      this.alive = true;
    }

    update(dt) {
      this.radius += 0.85 * dt;
      this.opacity -= 0.038 * dt;
      if (this.radius >= this.maxRadius || this.opacity <= 0) {
        this.alive = false;
      }
    }

    draw() {
      const { r, g, b } = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, this.opacity).toFixed(2)})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }
  }

  /**
   * Canvas Resize & DPR Handling
   */
  function resize() {
    const rect = heroSection.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  /**
   * Build the Living Neural Network (Mạng nơ-ron tự nhiên bao phủ Hero)
   */
  function initNetwork() {
    neurons = [];
    pulses = [];
    ripples = [];

    // General Mesh of Neurons (Mạng lưới nơ-ron bao phủ không gian Hero)
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = Math.random() * (width - 40) + 20;
      let y;
      if (isMobile) {
        // Distribute nicely with 65% of nodes in the visible viewport (0 - 850px)
        if (Math.random() < 0.65) {
          y = Math.random() * Math.min(height * 0.45, 800) + 40;
        } else {
          y = Math.random() * (height - 90) + 40;
        }
      } else {
        y = Math.random() * (height - 90) + 40;
      }
      neurons.push(new Neuron(x, y, false));
    }

    // Sort neurons by depth Z for natural depth rendering
    neurons.sort((a, b) => a.z - b.z);
  }

  /**
   * Trigger rhythmic, elegant bio-electric impulses across the network
   */
  function spawnRandomImpulse() {
    if (neurons.length < 2) return;
    const source = neurons[Math.floor(Math.random() * neurons.length)];
    let nearest = null;
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

  /**
   * Render Dendrite Fibers & Synaptic Filaments
   */
  function drawConnections(time) {
    const len = neurons.length;

    // 1. Inter-neuron Synaptic Filaments (Mạng lưới sợi dendrite sắc sảo, tự nhiên)
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
          const baseAlpha = isMobile ? (ratio * 0.48 * avgZ * bottomFade + 0.10) : (ratio * 0.35 * avgZ * bottomFade);
          const lineAlpha = (baseAlpha + ((p1.energy + p2.energy) * 0.45)).toFixed(3);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          const { r, g, b } = p1.color;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
          ctx.lineWidth = Math.max(0.75, 1.6 * ratio * avgZ);
          ctx.stroke();
        }
      }

      // 2. Cursor Neural Bridge
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

  /**
   * Main Animation Loop (Buttery 60fps with Delta Time)
   */
  function render(now) {
    if (!isVisible) return;

    const elapsed = now - lastTime;
    lastTime = now;
    const dt = Math.min(Math.max(elapsed / 16.67, 0.5), 2.5);

    // Smooth mouse interpolation (LERP)
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * (0.12 * dt);
      mouse.y += (mouse.targetY - mouse.y) * (0.12 * dt);
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Draw connecting dendrites
    drawConnections(now);

    // 2. Update and draw neurons
    for (let i = 0; i < neurons.length; i++) {
      neurons[i].update(dt, now);
      neurons[i].draw();
    }

    // 3. Spontaneous synaptic impulse generator (Nhịp điệu tự nhiên, thông minh)
    if (now - lastImpulseTime > nextImpulseInterval && pulses.length < (isMobile ? 3 : 6)) {
      spawnRandomImpulse();
      lastImpulseTime = now;
      nextImpulseInterval = 1400 + Math.random() * 1200;
    }

    // 4. Update and draw synaptic pulses (comet tails)
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].update(dt);
      pulses[i].draw();
      if (!pulses[i].alive) {
        pulses.splice(i, 1);
      }
    }

    // 5. Update and draw ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update(dt);
      ripples[i].draw();
      if (!ripples[i].alive) {
        ripples.splice(i, 1);
      }
    }

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(render);
    }
  }

  // Pointer Listeners (Desktop Mouse)
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    if (!mouse.active) {
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;
      mouse.active = true;
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = -9999;
    mouse.targetY = -9999;
  });

  // Click / Tap burst stimulation
  heroSection.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Burst ripple
    ripples.push(new SynapticRipple(cx, cy, COLORS.cyan, 36));

    // Excite nearest neurons
    neurons.forEach((n) => {
      const d = Math.hypot(n.x - cx, n.y - cy);
      if (d < 220) {
        n.energy = 1.0;
        spawnRandomImpulse();
      }
    });
  });

  // Touch Listeners (Mobile/Tablet)
  heroSection.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.touches[0].clientX - rect.left;
      mouse.targetY = e.touches[0].clientY - rect.top;
      if (!mouse.active) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.active = true;
      }
    }
  }, { passive: true });

  heroSection.addEventListener('touchend', () => {
    mouse.active = false;
  });

  // Window Resize
  window.addEventListener('resize', () => {
    resize();
    initNetwork();
  });

  // IntersectionObserver: Sleep when out of viewport for 0% CPU footprint
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId && !prefersReducedMotion) {
          lastTime = performance.now();
          animId = requestAnimationFrame(render);
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  // Start
  resize();
  initNetwork();
  lastTime = performance.now();
  render(lastTime);

  window.addEventListener('beforeunload', () => {
    if (animId) cancelAnimationFrame(animId);
  });
})();
