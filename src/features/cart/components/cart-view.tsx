'use client';

import { ClipboardList, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { useCart, useCartCount } from '../hooks/use-cart';
import { clearCart } from '../store/cart-store';
import type { CartCatalog } from '../types';
import { CartLines } from './cart-lines';

export function CartView({ catalog }: { catalog: CartCatalog }) {
  const t = useTranslations('cart');
  const lines = useCart();
  const count = useCartCount();

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-line bg-surface px-6 py-16 text-center shadow-card">
        <span className="grid size-16 place-items-center rounded-full bg-tint-100 text-navy">
          <ShoppingCart aria-hidden className="size-7" />
        </span>
        <h2 className="mt-5 text-xl">{t('empty')}</h2>
        <p className="mt-2 max-w-md text-base">{t('emptyBody')}</p>
        <Link href="/catalog" className={cn(buttonVariants({ variant: 'navy', size: 'lg' }), 'mt-6')}>
          {t('browse')}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
      <section aria-label={t('title')} className="rounded-lg border border-line bg-surface px-5 shadow-card sm:px-6">
        <CartLines lines={lines} catalog={catalog} />
        <div className="flex justify-between border-t border-line py-4">
          <Link href="/catalog" className="text-sm font-medium text-link hover:underline">
            {t('continue')}
          </Link>
          <button type="button" onClick={clearCart} className="text-sm text-muted hover:text-danger">
            {t('clear')}
          </button>
        </div>
      </section>
      <aside className="rounded-lg border border-line bg-surface p-5 shadow-card lg:sticky lg:top-28">
        <h2 className="text-lg">{t('summary')}</h2>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt>{t('lines')}</dt>
            <dd className="font-medium text-ink tabular">{lines.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t('units')}</dt>
            <dd className="font-medium text-ink tabular">{count}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3">
            <dt>{t('pricing')}</dt>
            <dd className="font-medium text-brand-ink">{t('pricingValue')}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted">{t('vat')}</p>
        <div className="mt-5 grid gap-2">
          <Link href="/checkout" className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
            {t('checkout')}
          </Link>
          <Link href="/rfq" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full')}>
            <ClipboardList aria-hidden />
            {t('requestQuote')}
          </Link>
        </div>
      </aside>
    </div>
  );
}
