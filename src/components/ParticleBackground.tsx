import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Violet, fuchsia and metallic silver energy palette matching ROX brand
    const colors = [
      'rgba(168, 85, 247,', // Electric purple
      'rgba(192, 132, 252,', // Light violet
      'rgba(124, 58, 237,',  // Deep royal violet
      'rgba(226, 232, 240,', // Cool metallic silver
      'rgba(243, 232, 255,', // Luminous lavender
    ];

    const particleCount = prefersReducedMotion ? 25 : isMobile ? 35 : 75;
    const particles: Particle[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 80 : 130,
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = 0.15 + Math.random() * 0.45;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.4, // Gentle upward effervescence drift
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting energy lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            const lineAlpha = (1 - dist / 75) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Pulse alpha gently over time
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.15;

        // Wrap around screen boundaries seamlessly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Cursor interaction: elastic displacement & glow boost
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push away smoothly from cursor
          p.x -= Math.cos(angle) * force * 3.5;
          p.y -= Math.sin(angle) * force * 3.5;
          // Temporarily boost brightness when near cursor
          p.alpha = Math.min(1, p.alpha + force * 0.5);
        }

        // Draw particle with subtle soft halo glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0, p.alpha)})`;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
        ctx.shadowBlur = p.size > 2 ? 6 : 3;
        ctx.fill();
      }

      // Reset shadow for next frame performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 w-full h-full select-none"
      style={{ opacity: 0.75 }}
      aria-hidden="true"
    />
  );
};
