'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

export interface MenuLink {
  href: string;
  label: string;
}

interface SiteMenuProps {
  items: readonly MenuLink[];
  socials: readonly MenuLink[];
  labels: { open: string; close: string; nav: string; followUs: string; note: string };
}

const CLOSE_MS = 350;

/**
 * Full-screen menu: toggle button + overlay. The overlay is portalled to <body> so the frosted
 * header (which creates a containing block via backdrop-filter) stays above it. Escape closes it.
 */
export function SiteMenu({ items, socials, labels }: SiteMenuProps) {
  /** `rendered` keeps the overlay in the DOM during its fade-out; `open` drives the fade itself. */
  const [rendered, setRendered] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef(0);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setRendered(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const hide = (restoreFocus = false) => {
    setOpen(false);
    closeTimer.current = window.setTimeout(() => setRendered(false), CLOSE_MS);
    if (restoreFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      closeTimer.current = window.setTimeout(() => setRendered(false), CLOSE_MS);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? labels.close : labels.open}
        onClick={() => (open ? hide() : show())}
        className="group/menu relative grid size-11 cursor-pointer place-items-center transition-[scale] duration-300 ease-brand active:scale-[0.94]"
      >
        {/* Three lines of different lengths: on hover they even out, when open they fold into an ×. */}
        <span aria-hidden="true" className="relative block h-4 w-6">
          <i
            className={cn(
              'absolute start-0 top-0 block h-0.5 rounded-full bg-current transition-[translate,rotate,width] duration-400 ease-brand',
              open ? 'w-6 translate-y-[7px] rotate-45' : 'w-6',
            )}
          />
          <i
            className={cn(
              'absolute start-0 top-[7px] block h-0.5 rounded-full bg-aqua transition-[width,opacity,translate] duration-300 ease-brand',
              open ? 'w-0 opacity-0' : 'w-4 group-hover/menu:w-6',
            )}
          />
          <i
            className={cn(
              'absolute start-0 top-[14px] block h-0.5 rounded-full bg-current transition-[translate,rotate,width] duration-400 ease-brand',
              open ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-5 group-hover/menu:w-6',
            )}
          />
        </span>
      </button>

      {rendered
        ? createPortal(
            <nav
              id="site-menu"
              aria-label={labels.nav}
              className={cn(
                'fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-[calc(var(--header-h)+16px)] pb-6 transition-opacity duration-350 ease-brand',
                'bg-[radial-gradient(60%_60%_at_15%_85%,rgb(12_142_199/0.25),transparent_70%),radial-gradient(50%_50%_at_85%_15%,rgb(178_108_255/0.22),transparent_70%)]',
                open ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className="container-site grid flex-1 content-center items-end gap-[clamp(20px,4vh,48px)] lg:grid-cols-[2fr_1fr]">
                <ol>
                  {items.map((item, index) => (
                    <li
                      key={item.href}
                      // Links rise in one after another as the menu opens.
                      style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
                      className={cn(
                        'transition-[opacity,translate] duration-500 ease-brand motion-reduce:translate-y-0',
                        open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                      )}
                    >
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={() => hide()}
                        className="flex items-baseline font-display text-[clamp(1.75rem,min(5.5vw,7svh),3.75rem)] leading-[1.3] font-extrabold transition-colors duration-250 hover:text-aqua"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <div>
                  <p className="label-sm">{labels.followUs}</p>
                  <ul className="mt-3 mb-5 grid gap-1.5">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a href={social.href} rel="noopener" className="text-lg text-muted hover:text-text">
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[0.9375rem] text-faint">{labels.note}</p>
                </div>
              </div>
            </nav>,
            document.body,
          )
        : null}
    </>
  );
}
