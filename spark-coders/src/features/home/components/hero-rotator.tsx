'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';

const INTERVAL_MS = 2600;
const LEAVE_MS = 800;

/** Cycles through sector words under the hero headline. */
export function HeroRotator({ words }: { words: readonly string[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    let leaveTimer = 0;
    const id = window.setInterval(() => {
      const current = activeRef.current;
      activeRef.current = (current + 1) % words.length;
      setLeaving(current);
      setActive(activeRef.current);
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => setLeaving(null), LEAVE_MS);
    }, INTERVAL_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(leaveTimer);
    };
  }, [reduced, words.length]);

  return (
    <span aria-live="polite" className="relative block h-[1.2em] max-sm:text-[0.82em]">
      {words.map((word, index) => (
        <span
          key={word}
          aria-hidden={index !== active}
          className={cn(
            'text-gradient absolute start-0 top-0 whitespace-nowrap transition-[opacity,translate] duration-[600ms,800ms] ease-brand',
            index === active
              ? 'translate-y-0 opacity-100 delay-250'
              : index === leaving
                ? '-translate-y-[60%] opacity-0'
                : 'translate-y-[60%] opacity-0',
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
