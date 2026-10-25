import React, { useEffect, useRef } from 'react';

interface CanvasMistProps {
  intensity?: 'subtle' | 'rich';
  className?: string;
}

export const CanvasMist: React.FC<CanvasMistProps> = ({ intensity = 'rich', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for interactive scent aura
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Ambient incense cloud particles
    const particleCount = intensity === 'rich' ? 50 : 25;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (intensity === 'rich' ? 140 : 80) + 50,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.2 - Math.random() * 0.45,
      alpha: Math.random() * 0.12 + 0.03,
      baseAlpha: Math.random() * 0.12 + 0.03,
      pulseSpeed: 0.004 + Math.random() * 0.008,
      color: Math.random() > 0.4 ? 'rgba(242, 202, 80,' : 'rgba(232, 193, 120,'
    }));

    // Floating golden sparks
    const sparkCount = intensity === 'rich' ? 40 : 20;
    const sparks = Array.from({ length: sparkCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -0.3 - Math.random() * 0.7,
      alpha: Math.random() * 0.7 + 0.3,
      twinkle: Math.random() * 0.03
    }));

    // Interactive trailing scent ripples
    const ripples: { x: number; y: number; radius: number; alpha: number; maxRadius: number }[] = [];
    let lastRippleTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Spawn subtle scent ripples near cursor
      const now = Date.now();
      if (mouse.active && now - lastRippleTime > 400) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          radius: 10,
          alpha: 0.22,
          maxRadius: Math.random() * 70 + 60
        });
        lastRippleTime = now;
      }

      // Draw and update scent ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.8;
        r.alpha *= 0.97;

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(242, 202, 80, ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render drifting amber mist plumes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = p.baseAlpha + Math.sin(Date.now() * p.pulseSpeed) * 0.02;

        // Mild mouse deflection
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            p.x += (dx / dist) * 0.6;
            p.y += (dy / dist) * 0.6;
          }
        }

        if (p.y < -p.radius * 2) {
          p.y = height + p.radius * 2;
          p.x = Math.random() * width;
        }
        if (p.x < -p.radius * 2) p.x = width + p.radius;
        if (p.x > width + p.radius * 2) p.x = -p.radius;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `${p.color} ${Math.max(0.01, Math.min(0.2, p.alpha))})`);
        gradient.addColorStop(0.5, `${p.color} ${Math.max(0.005, p.alpha * 0.4)})`);
        gradient.addColorStop(1, `${p.color} 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render mouse celestial halo glow
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        mouseGlow.addColorStop(0, 'rgba(242, 202, 80, 0.08)');
        mouseGlow.addColorStop(0.5, 'rgba(232, 193, 120, 0.03)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render golden embers
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += Math.sin(Date.now() * s.twinkle) * 0.02;

        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(242, 202, 80, ${Math.max(0.1, Math.min(0.85, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 opacity-85 ${className}`}
    />
  );
};
