'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/cn';
import type { Quote } from '../types';
import { ArabAvatar } from './arab-avatar';

/** Where each client photo sits around the quote card on wide screens (inline-start / top, in %). */
const ORBIT: readonly { x: string; y: string; size: 'lg' | 'md' }[] = [
  { x: '1%', y: '6%', size: 'lg' },
  { x: '86%', y: '0%', size: 'md' },
  { x: '88%', y: '62%', size: 'lg' },
  { x: '4%', y: '70%', size: 'md' },
];

const AVATAR_BG = [
  'bg-[linear-gradient(160deg,#efe4ff,#c9b2ff)]',
  'bg-[linear-gradient(160deg,#dcfbff,#9fe3f2)]',
  'bg-[linear-gradient(160deg,#e6ecff,#a9b9ff)]',
  'bg-[linear-gradient(160deg,#f6e6ff,#d6b4f5)]',
] as const;

/** Extra faces in the gaps around the card (AI-generated portraits, not real clients). */
const CROWD: readonly { src: string; x: string; y: string; size: string; delay: string }[] = [
  { src: '/images/clients/crowd-1.webp', x: '13%', y: '36%', size: 'size-14', delay: '-2s' },
  { src: '/images/clients/crowd-2.webp', x: '91%', y: '34%', size: 'size-20', delay: '-4s' },
  { src: '/images/clients/crowd-3.webp', x: '15%', y: '96%', size: 'size-11', delay: '-1s' },
  { src: '/images/clients/crowd-4.webp', x: '80%', y: '94%', size: 'size-16', delay: '-3s' },
];

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
                  'relative grid size-full place-items-center overflow-hidden rounded-full shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8),0_0_0_4px_rgb(255_255_255/0.14)]',
                  AVATAR_BG[index % AVATAR_BG.length],
                )}
              >
                {quote.image ? (
                  <Image src={quote.image} alt={quote.alt} fill sizes="128px" className="object-cover" />
                ) : (
                  <ArabAvatar variant={quote.avatar} />
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
                      reduced ? '[stroke-dashoffset:0]' : 'animate-[ring-progress_7s_linear_forwards]',
                      paused && '[animation-play-state:paused]',
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
              'relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full',
              AVATAR_BG[active % AVATAR_BG.length],
            )}
            aria-hidden="true"
          >
            {current.image ? (
              <Image src={current.image} alt="" fill sizes="48px" className="object-cover" />
            ) : (
              <ArabAvatar variant={current.avatar} />
            )}
          </span>
          <span>
            <span className="block font-semibold">{current.name}</span>
            <span className="block text-[0.9375rem] text-muted">{current.role}</span>
          </span>
        </figcaption>
      </figure>

      {/* Indicators under the quote: the active one fills over the autoplay interval. */}
      <div className="relative mt-8 flex justify-center gap-2.5">
        {quotes.map((quote, index) => {
          const selected = index === active;
          return (
            <button
              key={quote.key}
              type="button"
              aria-label={`${index + 1} / ${quotes.length}`}
              aria-current={selected ? 'true' : undefined}
              onClick={() => select(index)}
              className="group/dot grid h-6 cursor-pointer place-items-center"
            >
              <span
                className={cn(
                  'relative block h-1.5 overflow-hidden rounded-full bg-white/15 transition-[width,background-color] duration-400 ease-brand group-hover/dot:bg-white/30',
                  selected ? 'w-12' : 'w-1.5',
                )}
              >
                {selected ? (
                  <span
                    key={cycle}
                    className={cn(
                      'absolute inset-y-0 start-0 rounded-full bg-[linear-gradient(90deg,var(--color-aqua),var(--color-violet))]',
                      reduced ? 'w-full' : 'w-0 animate-[dot-progress_7s_linear_forwards]',
                      paused && '[animation-play-state:paused]',
                    )}
                    // Autoplay advances when the bar fills, so hovering (which pauses it) never desyncs.
                    onAnimationEnd={() => {
                      if (quotes.length > 1) select((active + 1) % quotes.length);
                    }}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* More client faces around the quote, in mixed sizes (decorative, wide screens only). */}
      {CROWD.map((face) => (
        <span
          key={face.src}
          aria-hidden="true"
          style={{ '--x': face.x, '--y': face.y, '--float-delay': face.delay }}
          className={cn(
            'pointer-events-none absolute start-[var(--x)] top-[var(--y)] hidden overflow-hidden rounded-full opacity-70 shadow-[0_16px_30px_-16px_rgb(0_0_0/0.8),0_0_0_3px_rgb(255_255_255/0.1)] lg:block motion-safe:animate-[float_7s_ease-in-out_infinite] motion-safe:[animation-delay:var(--float-delay)]',
            face.size,
          )}
        >
          <Image src={face.src} alt="" fill sizes="80px" className="object-cover" />
        </span>
      ))}
    </div>
  );
}
