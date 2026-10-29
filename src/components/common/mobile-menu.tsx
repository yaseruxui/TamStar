'use client';

import { Mail, Menu, Phone, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { company } from '@/lib/config/site';
import { primaryNav, routes } from '@/lib/config/routes';
import { cn } from '@/utils/cn';
import { toMailHref, toTelHref } from '@/utils/format';
import { isActivePath } from './main-nav';

export function MobileMenu() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close when navigation completes (derived during render, no effect needed).
  if (open && pathname !== openedAt) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t('closeMenu') : t('openMenu')}
        onClick={() => {
          setOpenedAt(pathname);
          setOpen((value) => !value);
        }}
        className="grid size-11 place-items-center rounded-sm border border-paper-line text-navy"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-dvh overflow-y-auto overscroll-contain border-t border-paper-line bg-canvas"
      >
        <nav aria-label={t('mainLabel')} className="container-site py-4">
          <ul className="divide-y divide-line">
            {primaryNav.map((key) => {
              const href = routes[key];
              const active = isActivePath(pathname, href);
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex h-14 items-center font-display text-lg font-medium text-ink',
                      active && 'text-navy-700',
                    )}
                  >
                    {active ? <span aria-hidden className="me-3 h-5 w-0.5 bg-brand" /> : null}
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            {company.phones.map((phone) => (
              <a key={phone} href={toTelHref(phone)} className="inline-flex items-center gap-2 text-navy">
                <Phone aria-hidden className="size-4 text-brand" />
                <span dir="ltr" className="tabular">
                  {phone}
                </span>
              </a>
            ))}
            <a href={toMailHref(company.email)} className="inline-flex items-center gap-2 text-navy">
              <Mail aria-hidden className="size-4 text-brand" />
              {company.email}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
