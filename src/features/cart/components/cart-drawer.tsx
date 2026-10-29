'use client';

import { ShoppingCart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { useCart, useCartCount } from '../hooks/use-cart';
import type { CartCatalog } from '../types';
import { CartLines } from './cart-lines';
import { onOpenCartDrawer } from './cart-drawer-events';

/** Header cart button + native <dialog> drawer (focus trap, Esc and backdrop handled by the browser). */
export function CartDrawer({ catalog }: { catalog: CartCatalog }) {
  const t = useTranslations('cart');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lines = useCart();
  const count = useCartCount();

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  useEffect(() => onOpenCartDrawer(open), []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`${t('open')} — ${t('count', { count })}`}
        className="relative grid size-12 place-items-center rounded-full bg-navy-950 text-white transition-colors hover:bg-navy"
      >
        <ShoppingCart aria-hidden className="size-5" />
        <span
          aria-hidden
          className={cn(
            'absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-2xs font-bold tabular ring-2 ring-surface transition-transform',
            count > 0 ? 'scale-100 bg-brand text-navy-950' : 'scale-0',
          )}
        >
          {count > 99 ? '99+' : count}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="cart-drawer-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="fixed inset-y-0 end-0 start-auto m-0 h-dvh max-h-none w-full max-w-md bg-surface p-0 text-body shadow-raised backdrop:bg-navy-950/40 backdrop:backdrop-blur-[2px] open:flex open:flex-col sm:rounded-s-xl"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-drawer-title" className="text-lg">
            {t('title')} <span className="text-sm font-normal text-muted">· {t('count', { count })}</span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t('close')}
            className="grid size-10 place-items-center rounded-sm hover:bg-canvas"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-tint-100 text-navy">
              <ShoppingCart aria-hidden className="size-7" />
            </span>
            <p className="mt-5 font-display text-lg text-ink">{t('empty')}</p>
            <p className="mt-2 text-sm">{t('emptyBody')}</p>
            <Link href="/catalog" onClick={close} className={cn(buttonVariants({ variant: 'navy' }), 'mt-6')}>
              {t('browse')}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <CartLines lines={lines} catalog={catalog} compact onNavigate={close} />
            </div>
            <footer className="border-t border-line bg-canvas px-5 py-5">
              <dl className="flex items-center justify-between text-sm">
                <dt>{t('pricing')}</dt>
                <dd className="font-medium text-ink">{t('pricingValue')}</dd>
              </dl>
              <p className="mt-1 text-xs text-muted">{t('vat')}</p>
              <div className="mt-4 grid gap-2">
                <Link href="/checkout" onClick={close} className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
                  {t('checkout')}
                </Link>
                <Link
                  href="/cart"
                  onClick={close}
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full')}
                >
                  {t('viewCart')}
                </Link>
              </div>
            </footer>
          </>
        )}
      </dialog>
    </>
  );
}
