'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';

const SEEN_KEY = 'skodr:intro-seen';
const DURATION_MS = 1500;

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage can be unavailable (private mode); the intro simply plays again */
  }
}

/**
 * First-visit intro: the logo's four strokes draw themselves, then the curtain lifts.
 * Plays once per browser session and is skipped entirely for reduced-motion users.
 */
export function PageLoader({ label }: { label: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<'idle' | 'play' | 'leave' | 'done'>('idle');

  useEffect(() => {
    const skip = reduced || hasSeenIntro();
    if (!skip) markIntroSeen();
    const start = requestAnimationFrame(() => setPhase(skip ? 'done' : 'play'));
    if (skip) return () => cancelAnimationFrame(start);
    const leave = window.setTimeout(() => setPhase('leave'), DURATION_MS);
    const done = window.setTimeout(() => setPhase('done'), DURATION_MS + 700);
    return () => {
      cancelAnimationFrame(start);
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, [reduced]);

  if (phase === 'idle' || phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[80] grid place-items-center bg-ink transition-[clip-path] duration-700 ease-brand [clip-path:inset(0_0_0_0)]',
        phase === 'leave' && '[clip-path:inset(0_0_100%_0)]',
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 1024 1024" className="size-28 overflow-visible">
          <defs>
            <linearGradient id="ld-o" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0C8EC7" />
              <stop offset="1" stopColor="#6EDDF0" />
            </linearGradient>
            <linearGradient id="ld-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#88EFFA" />
              <stop offset="1" stopColor="#A497FA" />
            </linearGradient>
          </defs>
          {[
            { d: 'M52 30 60 720', stroke: '#B26CFF', width: 54, delay: 0 },
            { d: 'M52 705 540 32', stroke: '#6E29AC', width: 76, delay: 120 },
            { d: 'M565 50 42 958', stroke: 'url(#ld-o)', width: 92, delay: 240 },
            { d: 'M52 972 494 516 1000 972', stroke: 'url(#ld-a)', width: 88, delay: 360 },
          ].map((path) => (
            <path
              key={path.d}
              d={path.d}
              fill="none"
              stroke={path.stroke}
              strokeWidth={path.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[draw_0.9s_var(--ease-brand)_forwards]"
              style={{ animationDelay: `${path.delay}ms` }}
            />
          ))}
        </svg>
        <span dir="ltr" className="text-gradient font-display text-3xl font-extrabold tracking-[-0.02em]">
          {label}
        </span>
      </div>
    </div>
  );
}
