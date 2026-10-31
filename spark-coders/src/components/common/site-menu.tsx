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
  localeSwitch: { href: string; label: string; ariaLabel: string; hrefLang: string };
}

const CLOSE_MS = 350;

/**
 * Full-screen menu: toggle button + overlay. The overlay is portalled to <body> so the frosted
 * header (which creates a containing block via backdrop-filter) stays above it. Escape closes it.
 */
export function SiteMenu({ items, socials, labels, localeSwitch }: SiteMenuProps) {
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
        onClick={() => (open ? hide() : show())}
        className="relative inline-flex min-h-11 cursor-pointer items-center gap-3 px-1 font-display text-lg font-extrabold"
      >
        <span>{open ? labels.close : labels.open}</span>
        <span aria-hidden="true" className="grid w-[26px] gap-1.5">
          <i
            className={cn(
              'block h-0.5 rounded-xs bg-current transition-transform duration-350 ease-brand',
              open && 'translate-y-1 rotate-45',
            )}
          />
          <i
            className={cn(
              'block h-0.5 rounded-xs bg-current transition-transform duration-350 ease-brand',
              open && '-translate-y-1 -rotate-45',
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
                'fixed inset-0 z-40 overflow-y-auto bg-ink pt-[calc(var(--header-h)+32px)] pb-8 transition-opacity duration-350 ease-brand',
                'bg-[radial-gradient(60%_60%_at_15%_85%,rgb(12_142_199/0.25),transparent_70%),radial-gradient(50%_50%_at_85%_15%,rgb(178_108_255/0.22),transparent_70%)]',
                open ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className="container-site grid min-h-full items-end gap-12 lg:grid-cols-[2fr_1fr]">
                <ol>
                  {items.map((item, index) => (
                    <li key={item.href}>
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={() => hide()}
                        className="flex items-baseline gap-[18px] font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.35] font-extrabold transition-colors duration-250 hover:text-aqua"
                      >
                        <span className="text-sm font-semibold text-faint">{String(index + 1).padStart(2, '0')}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <div>
                  <p className="eyebrow">{labels.followUs}</p>
                  <ul className="mt-3 mb-7 grid gap-2">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a href={social.href} rel="noopener" className="text-lg text-muted hover:text-text">
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[0.9375rem] text-faint">{labels.note}</p>
                  <a
                    href={localeSwitch.href}
                    hrefLang={localeSwitch.hrefLang}
                    aria-label={localeSwitch.ariaLabel}
                    className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 font-display text-sm font-semibold hover:border-aqua"
                  >
                    {localeSwitch.label}
                  </a>
                </div>
              </div>
            </nav>,
            document.body,
          )
        : null}
    </>
  );
}
