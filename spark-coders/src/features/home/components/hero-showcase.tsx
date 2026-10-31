'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, motionQueries, useGSAP } from '@/lib/gsap';
import { cn } from '@/utils/cn';

export interface ShowcaseShot {
  src: string;
  alt: string;
}

interface HeroShowcaseProps {
  shots: readonly [ShowcaseShot, ShowcaseShot, ShowcaseShot];
}

/** Seconds the first-visit logo intro covers the page (matches HeroIntro). */
const LOADER_HOLD = 1.55;

/**
 * Card placement, back to front. `depth` scales the pointer parallax and the scroll drift,
 * so nearer cards move more and the stack reads as layered space.
 */
const CARDS = [
  { className: 'top-0 start-0 w-[72%] rotate-6', depth: 0.45 },
  { className: 'top-[20%] end-0 w-[70%] -rotate-5', depth: 0.75 },
  { className: 'top-[44%] start-[10%] w-[74%] rotate-2', depth: 1 },
] as const;

/**
 * Three real project screens fanned beside the hero headline: they deal in after the headline,
 * lean toward the pointer and drift apart as the visitor scrolls away.
 */
export function HeroShowcase({ shots }: HeroShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(motionQueries.full, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-showcase-card]', root);
        const delay = document.documentElement.dataset.intro === 'playing' ? LOADER_HOLD + 0.5 : 0.65;
        gsap.set(root, { visibility: 'visible' });

        gsap.from(cards, {
          y: 90,
          rotate: (index) => (index % 2 ? -14 : 14),
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.14,
          ease: 'expo.out',
          delay,
        });

        cards.forEach((card, index) => {
          const depth = CARDS[index]?.depth ?? 1;
          gsap.to(card, {
            yPercent: -40 * depth,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top 35%', end: 'bottom top', scrub: true },
          });
        });

        const movers = cards.map((card) => {
          const inner = card.firstElementChild;
          return inner
            ? {
                x: gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'power3.out' }),
                y: gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'power3.out' }),
              }
            : null;
        });
        const onPointer = (event: PointerEvent) => {
          const px = event.clientX / window.innerWidth - 0.5;
          const py = event.clientY / window.innerHeight - 0.5;
          movers.forEach((move, index) => {
            const depth = CARDS[index]?.depth ?? 1;
            move?.x(px * 28 * depth);
            move?.y(py * 22 * depth);
          });
        };
        window.addEventListener('pointermove', onPointer, { passive: true });
        return () => window.removeEventListener('pointermove', onPointer);
      });

      mm.add(motionQueries.reduced, () => {
        gsap.set(root, { visibility: 'visible' });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-hero-reveal=""
      aria-hidden="true"
      className="pointer-events-none relative mx-auto mt-12 aspect-[5/4] w-full max-w-[520px] lg:absolute lg:end-(--gutter) lg:top-[calc(var(--header-h)+clamp(32px,6vw,72px))] lg:mt-0 lg:w-[42%] lg:max-w-[560px]"
    >
      {CARDS.map((card, index) => {
        const shot = shots[index];
        if (!shot) return null;
        return (
          <div key={shot.src} data-showcase-card="" className={cn('absolute', card.className)}>
            <div className="overflow-hidden rounded-[22px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85),0_0_0_1px_rgb(255_255_255/0.1)]">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1600}
                height={1200}
                sizes="(max-width: 1024px) 70vw, 400px"
                priority={index === CARDS.length - 1}
                className="block h-auto w-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
