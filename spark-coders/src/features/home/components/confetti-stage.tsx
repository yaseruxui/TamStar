'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const COLORS = ['#B26CFF', '#6E29AC', '#0C8EC7', '#7FEEFA', '#A497FA', '#F5F2FF'] as const;
const GRAVITY = 0.32;
const DRAG = 0.985;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  round: boolean;
  life: number;
}

interface ConfettiStageProps {
  children: ReactNode;
  className?: string;
  tapLabel: string;
}

/**
 * Wraps a section and bursts brand-coloured confetti wherever the visitor clicks or taps,
 * plus a celebratory burst the first time the section scrolls into view.
 */
export function ConfettiStage({ children, className, tapLabel }: ConfettiStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!stage || !canvas || !context || reduced) return;

    const particles: Particle[] = [];
    let frame = 0;
    let dpr = 1;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    const tick = () => {
      frame = 0;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        if (!p) continue;
        p.vx *= DRAG;
        p.vy = p.vy * DRAG + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        p.life -= 1;
        if (p.life <= 0 || p.y > canvas.height / dpr + 40) {
          particles.splice(i, 1);
          continue;
        }
        context.save();
        context.globalAlpha = Math.min(1, p.life / 40);
        context.translate(p.x, p.y);
        context.rotate(p.rotation);
        context.fillStyle = p.color;
        if (p.round) {
          context.beginPath();
          context.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        context.restore();
      }
      if (particles.length) frame = requestAnimationFrame(tick);
    };

    const burst = (x: number, y: number, count = 90) => {
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 9;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 6,
          size: 6 + Math.random() * 8,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.4,
          color: COLORS[i % COLORS.length] ?? COLORS[0],
          round: Math.random() > 0.6,
          life: 120 + Math.random() * 60,
        });
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest('a, input, textarea, [contenteditable]')) return;
      const rect = stage.getBoundingClientRect();
      burst(event.clientX - rect.left, event.clientY - rect.top);
    };
    stage.addEventListener('pointerdown', onPointerDown);

    let celebrated = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || celebrated) return;
        celebrated = true;
        const rect = stage.getBoundingClientRect();
        burst(rect.width * 0.5, rect.height * 0.35, 140);
      },
      { threshold: 0.5 },
    );
    io.observe(stage);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener('pointerdown', onPointerDown);
    };
  }, [reduced]);

  return (
    <div ref={stageRef} data-cursor={tapLabel} className={className}>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 size-full" />
      {children}
    </div>
  );
}
