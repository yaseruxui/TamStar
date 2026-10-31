'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** Fixed header shell that turns into frosted glass once the page scrolls or the menu opens. */
export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        'group/header fixed inset-x-0 top-0 z-50 flex h-(--header-h) items-center border-b border-transparent transition-[background-color,backdrop-filter,border-color] duration-300',
        'data-scrolled:border-line data-scrolled:bg-ink/72 data-scrolled:backdrop-blur-[14px]',
        'has-[[aria-expanded=true]]:border-line has-[[aria-expanded=true]]:bg-ink/72 has-[[aria-expanded=true]]:backdrop-blur-[14px]',
      )}
    >
      {children}
    </header>
  );
}
