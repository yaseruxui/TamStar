'use client';

import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { CapIcon, CartIcon, RocketIcon } from '@/components/ui/icons';
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

interface PillBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * WAI-ARIA tabs with a pill that slides between options (transitions.dev "tabs sliding").
 * Arrow keys follow the reading direction (in Arabic, ← moves to the next tab).
 */
export function SectorTabs({ panels, tabsLabel }: SectorTabsProps) {
  const [selected, setSelected] = useState(0);
  const [pill, setPill] = useState<PillBox | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const tab = tabRefs.current[selected];
      if (!tab) return;
      setPill({ x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [selected]);

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
        ref={listRef}
        role="tablist"
        aria-label={tabsLabel}
        className="relative inline-flex flex-wrap gap-1 rounded-[27px] bg-ink/45 p-[5px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)] max-sm:flex"
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 left-0 rounded-full bg-ink shadow-[0_6px_16px_-6px_rgb(7_5_26/0.8)] transition-[translate,width,height] duration-250 ease-brand motion-reduce:transition-none',
            !pill && 'opacity-0',
          )}
          style={pill ? { translate: `${pill.x}px ${pill.y}px`, width: pill.width, height: pill.height } : undefined}
        />
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
              'relative z-[1] inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-[18px] font-display text-[0.9375rem] font-semibold transition-[color,scale] duration-250 ease-brand active:scale-[0.96] max-sm:flex-auto max-sm:justify-center',
              selected === index ? 'text-text' : 'text-text/75 hover:text-text',
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
          className="mt-[clamp(32px,5vw,56px)]"
        >
          <div key={selected} className="swap-in grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <h3 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.2] font-extrabold">
              {panel.title}
              <br />
              {panel.title2}
            </h3>
            <div>
              <p className="mb-3 max-w-[35rem] text-lg text-text/90">{panel.body}</p>
              <LinkArrow href="#contact" className="text-white">
                {panel.link}
              </LinkArrow>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
