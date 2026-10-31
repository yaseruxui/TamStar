'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';
import type { Quote } from '../types';

const AUTOPLAY_MS = 7000;

interface TestimonialsCarouselProps {
  quotes: readonly Quote[];
  labels: { prev: string; next: string };
}

export function TestimonialsCarousel({ quotes, labels }: TestimonialsCarouselProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  const go = useCallback(
    (step: number) => {
      setActive((current) => (current + step + quotes.length) % quotes.length);
      setCycle((value) => value + 1);
    },
    [quotes.length],
  );

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [cycle, go, reduced]);

  return (
    <>
      <div className="mt-7 grid">
        {quotes.map((quote, index) => (
          <blockquote
            key={quote.key}
            aria-hidden={index !== active}
            className={cn(
              'col-start-1 row-start-1 m-0 transition-[opacity,translate,visibility] duration-[600ms,700ms,600ms] ease-brand',
              index === active ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0',
            )}
          >
            <p className="font-display text-[clamp(1.5rem,3.8vw,3rem)] leading-normal font-semibold">{quote.quote}</p>
            <footer className="mt-6 text-aqua">{quote.author}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          aria-label={labels.prev}
          onClick={() => go(-1)}
          className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong bg-glass transition-[border-color,scale] duration-250 ease-brand hover:border-aqua active:scale-[0.96]"
        >
          <ArrowIcon className="-scale-x-100 ltr:scale-x-100" />
        </button>
        <span dir="ltr" className="font-display text-muted tabular-nums">
          <span key={active} className="swap-in inline-block">
            {active + 1}
          </span>{' '}
          / {quotes.length}
        </span>
        <button
          type="button"
          aria-label={labels.next}
          onClick={() => go(1)}
          className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong bg-glass transition-[border-color,scale] duration-250 ease-brand hover:border-aqua active:scale-[0.96]"
        >
          <ArrowIcon />
        </button>
      </div>
    </>
  );
}
