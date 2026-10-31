'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';
import type { Quote } from '../types';

const AUTOPLAY_MS = 7000;

/** Where each client photo sits around the quote card on wide screens (inline-start / top, in %). */
const ORBIT: readonly { x: string; y: string; size: 'lg' | 'md' }[] = [
  { x: '1%', y: '6%', size: 'lg' },
  { x: '86%', y: '0%', size: 'md' },
  { x: '88%', y: '62%', size: 'lg' },
  { x: '4%', y: '70%', size: 'md' },
];

const AVATAR_BG = [
  'bg-[linear-gradient(135deg,var(--color-violet),var(--color-plum))]',
  'bg-[linear-gradient(135deg,var(--color-aqua),var(--color-ocean))]',
  'bg-[linear-gradient(135deg,var(--color-lilac),var(--color-ocean))]',
  'bg-[linear-gradient(135deg,var(--color-plum),var(--color-ocean))]',
] as const;

interface TestimonialsOrbitProps {
  quotes: readonly Quote[];
  chooseLabel: string;
}

/**
 * Client voices: the active quote sits in a central card, the clients' photos circle around it.
 * Choosing a photo switches the quote; a ring around the active photo shows the autoplay timer.
 */
export function TestimonialsOrbit({ quotes, chooseLabel }: TestimonialsOrbitProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  const select = useCallback((index: number) => {
    setActive(index);
    setCycle((value) => value + 1);
  }, []);

  useEffect(() => {
    if (reduced || paused || quotes.length < 2) return;
    const id = window.setTimeout(() => select((active + 1) % quotes.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, cycle, paused, reduced, quotes.length, select]);

  const current = quotes[active];
  if (!current) return null;

  return (
    <div
      className="relative mt-12 lg:mt-16 lg:min-h-[520px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div role="tablist" aria-label={chooseLabel} className="mb-8 flex justify-center gap-4 lg:contents">
        {quotes.map((quote, index) => {
          const spot = ORBIT[index % ORBIT.length] ?? ORBIT[0];
          const selected = index === active;
          return (
            <button
              key={quote.key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="testimonial-panel"
              aria-label={quote.name}
              onClick={() => select(index)}
              style={{ '--x': spot?.x, '--y': spot?.y, '--float-delay': `${index * -1.6}s` }}
              className={cn(
                'group/avatar relative grid shrink-0 cursor-pointer place-items-center rounded-full transition-[scale,opacity] duration-400 ease-brand active:scale-[0.96]',
                'size-16 lg:absolute lg:start-[var(--x)] lg:top-[var(--y)] motion-safe:lg:animate-[float_6s_ease-in-out_infinite] motion-safe:lg:[animation-delay:var(--float-delay)]',
                spot?.size === 'lg' ? 'lg:size-32' : 'lg:size-24',
                selected ? 'scale-100 opacity-100' : 'opacity-55 hover:opacity-90',
              )}
            >
              <span
                className={cn(
                  'relative grid size-full place-items-center overflow-hidden rounded-full font-display text-xl font-extrabold text-white shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)] lg:text-3xl',
                  AVATAR_BG[index % AVATAR_BG.length],
                )}
              >
                {quote.image ? (
                  <Image src={quote.image} alt={quote.alt} fill sizes="128px" className="object-cover" />
                ) : (
                  quote.initial
                )}
              </span>
              {selected ? (
                <svg
                  key={`${cycle}-${index}`}
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute -inset-[7px] size-[calc(100%+14px)] -rotate-90"
                >
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(127 238 250 / 0.18)" strokeWidth="2" />
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="var(--color-aqua)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    pathLength={100}
                    className={cn(
                      '[stroke-dasharray:100]',
                      reduced || paused ? '[stroke-dashoffset:0]' : 'animate-[ring-progress_7s_linear_forwards]',
                    )}
                  />
                </svg>
              ) : null}
            </button>
          );
        })}
      </div>

      <figure
        id="testimonial-panel"
        role="tabpanel"
        className="relative mx-auto max-w-3xl rounded-[32px] bg-ink-2 px-[clamp(24px,5vw,64px)] py-[clamp(32px,5vw,56px)] shadow-[0_40px_90px_-50px_rgb(178_108_255/0.55),inset_0_0_0_1px_var(--color-line-strong)] lg:mt-14"
      >
        <svg aria-hidden="true" viewBox="0 0 48 36" className="mb-6 h-9 w-12 text-violet ltr:-scale-x-100">
          <path
            fill="currentColor"
            d="M48 0v16c0 11-6 18-17 20l-2-5c6-2 9-6 9-11h-8V0h18ZM20 0v16C20 27 14 34 3 36l-2-5c6-2 9-6 9-11H2V0h18Z"
          />
        </svg>
        <blockquote key={current.key} className="swap-in m-0">
          <p className="font-display text-[clamp(1.35rem,3vw,2.25rem)] leading-[1.6] font-semibold">{current.quote}</p>
        </blockquote>
        <figcaption key={`${current.key}-who`} className="swap-in mt-8 flex items-center gap-4">
          <span
            className={cn(
              'relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full font-display font-extrabold text-white',
              AVATAR_BG[active % AVATAR_BG.length],
            )}
            aria-hidden="true"
          >
            {current.image ? (
              <Image src={current.image} alt="" fill sizes="48px" className="object-cover" />
            ) : (
              current.initial
            )}
          </span>
          <span>
            <span className="block font-semibold">{current.name}</span>
            <span className="block text-[0.9375rem] text-muted">{current.role}</span>
          </span>
          <span dir="ltr" className="ms-auto font-display text-sm text-faint tabular-nums">
            {active + 1} / {quotes.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
