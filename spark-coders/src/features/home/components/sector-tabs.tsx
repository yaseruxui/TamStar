'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { CapIcon, CartIcon, RocketIcon } from '@/components/ui/icons';
import { SkodrWordmark } from '@/components/common/skodr-wordmark';
import { LinkArrow } from '@/components/ui/link-arrow';
import { cn } from '@/utils/cn';
import type { SectorPanel } from '../types';

const icons: Record<SectorPanel['icon'], ReactNode> = {
  rocket: <RocketIcon />,
  cap: <CapIcon />,
  cart: <CartIcon />,
};

interface SectorTabsProps {
  panels: readonly SectorPanel[];
  tabsLabel: string;
}

/** WAI-ARIA tabs. Arrow keys follow the reading direction (in Arabic, ← moves to the next tab). */
export function SectorTabs({ panels, tabsLabel }: SectorTabsProps) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = (index: number, focus = false) => {
    const next = (index + panels.length) % panels.length;
    setSelected(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const backward = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (event.key === forward) select(index + 1, true);
    else if (event.key === backward) select(index - 1, true);
    else if (event.key === 'Home') select(0, true);
    else if (event.key === 'End') select(panels.length - 1, true);
    else return;
    event.preventDefault();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={tabsLabel}
        className="inline-flex flex-wrap gap-1 rounded-full border border-white/35 bg-ink/35 p-[5px] max-sm:flex max-sm:rounded-[20px]"
      >
        {panels.map((panel, index) => (
          <button
            key={panel.key}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            id={`${baseId}-tab-${panel.key}`}
            aria-controls={`${baseId}-panel-${panel.key}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-[18px] font-display text-[0.9375rem] font-semibold transition-colors duration-250 max-sm:flex-auto max-sm:justify-center',
              selected === index ? 'bg-ink' : 'hover:bg-white/10',
            )}
          >
            {icons[panel.icon]}
            {panel.tab}
          </button>
        ))}
      </div>

      {panels.map((panel, index) => (
        <div
          key={panel.key}
          role="tabpanel"
          id={`${baseId}-panel-${panel.key}`}
          aria-labelledby={`${baseId}-tab-${panel.key}`}
          hidden={selected !== index}
          className="mt-[clamp(32px,5vw,56px)] animate-fade-up"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h3 className="mb-5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.15] font-extrabold">
                {panel.title}
                <br />
                {panel.title2}
              </h3>
              <p className="mb-4 max-w-[560px] text-lg text-text/88">{panel.body}</p>
              <LinkArrow href="#contact" className="text-white">
                {panel.link}
              </LinkArrow>
            </div>
            <div
              aria-hidden="true"
              className="flex aspect-[3/4] w-[min(100%,320px)] -rotate-5 flex-col justify-between justify-self-center rounded-[6px_20px_20px_6px] bg-[radial-gradient(80%_60%_at_80%_10%,rgb(178_108_255/0.55),transparent_60%),radial-gradient(70%_60%_at_10%_100%,rgb(12_142_199/0.55),transparent_60%)] bg-ink p-7 shadow-[-14px_0_0_-6px_rgb(7_5_26/0.5),0_40px_70px_-24px_rgb(0_0_0/0.7)] transition-transform duration-600 ease-brand hover:-translate-y-2 hover:-rotate-1"
            >
              <SkodrWordmark className="w-24 self-end text-aqua" />
              <b className="font-display text-[2rem] leading-[1.3] font-extrabold">{panel.book}</b>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
