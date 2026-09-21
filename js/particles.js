/**
 * Particle Network — Canvas-based neural network effect
 * For Hero section background — Data Science / AI themed
 * Desktop only (>768px), respects prefers-reduced-motion
 */
(function () {
  'use strict';

  if (window.innerWidth < 768) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles, mouse, animId;

  const CONFIG = {
    count: 80,
    speed: 0.3,
    radius: 2,
    connectDist: 150,
    mouseDist: 200,
    mouseForce: 0.02
  };

  mouse = { x: -9999, y: -9999 };

  function getColors() {
    const isDark = document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark-mode');
    return {
      isDark,
      node: isDark ? 'rgba(56,189,248,' : 'rgba(99,102,241,',
      line: isDark ? 'rgba(56,189,248,' : 'rgba(99,102,241,',
      nodeBright: isDark ? 'rgba(6,182,212,' : 'rgba(139,92,246,'
    };
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        r: CONFIG.radius + Math.random() * 1.5
      });
    }
  }

  function drawParticle(p, colors) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = colors.node + (colors.isDark ? '0.6)' : '0.45)');
    ctx.fill();

    // Subtle glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + 2.5, 0, Math.PI * 2);
    ctx.fillStyle = colors.nodeBright + (colors.isDark ? '0.15)' : '0.08)');
    ctx.fill();
  }

  function drawLine(p1, p2, dist, colors) {
    const maxOpacity = colors.isDark ? 0.22 : 0.12;
    const opacity = (1 - dist / CONFIG.connectDist) * maxOpacity;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = colors.line + opacity + ')';
    ctx.lineWidth = 0.65;
    ctx.stroke();
  }

  function update() {
    const colors = getColors();
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse interaction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseDist && dist > 0) {
        // Repel: push away from mouse
        const force = (CONFIG.mouseDist - dist) / CONFIG.mouseDist; // 0 at edge, 1 at cursor
        p.vx -= (dx / dist) * force * 0.5;
        p.vy -= (dy / dist) * force * 0.5;
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      drawParticle(p, colors);

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = p.y - p2.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < CONFIG.connectDist) {
          drawLine(p, p2, cdist, colors);
        }
      }

      // Connect to mouse
      if (dist < CONFIG.mouseDist) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = colors.nodeBright + ((1 - dist / CONFIG.mouseDist) * 0.2) + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    animId = requestAnimationFrame(update);
  }

  // Events
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', () => {
    resize();
    if (particles.length === 0) createParticles();
  });

  // Init
  resize();
  createParticles();
  update();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animId);
  });
})();
