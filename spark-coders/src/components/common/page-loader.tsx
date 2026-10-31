'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { site } from '@/lib/config/site';
import { cn } from '@/utils/cn';
import { SkodrWordmark } from './skodr-wordmark';

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
 * First-visit intro: the S mark swings in, the lettering wipes in beside it, then the curtain lifts.
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
      <div dir="ltr" className="flex items-center gap-5">
        <Image
          src={site.mark.src}
          alt=""
          width={116}
          height={80}
          priority
          className="animate-[mark-in_0.9s_var(--ease-brand)_both]"
        />
        <span className="block animate-[wipe-in_0.8s_var(--ease-brand)_0.35s_both]">
          <SkodrWordmark withSlogan title={label} className="w-[220px] text-text" />
        </span>
      </div>
    </div>
  );
}
