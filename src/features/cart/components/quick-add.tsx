'use client';

import { Check, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { useCart } from '../hooks/use-cart';
import { addToCart } from '../store/cart-store';
import { flyToCart } from '../utils/fly-to-cart';

/** Round "+" button on product cards: adds one unit; quantities are edited in the cart. */
export function QuickAdd({ category, slug, itemName }: { category: string; slug: string; itemName: string }) {
  const t = useTranslations('cart');
  const [justAdded, setJustAdded] = useState(false);
  const inCart = useCart().find((line) => line.category === category && line.slug === slug)?.quantity ?? 0;

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={(event) => {
          addToCart({ category, slug }, 1);
          setJustAdded(true);
          void flyToCart(event.currentTarget);
        }}
        aria-label={`${t('addToCart')}: ${itemName}`}
        className={cn(
          'grid size-11 place-items-center rounded-full text-white transition-all active:scale-95',
          justAdded ? 'motion-pop bg-success' : 'bg-navy-950 hover:bg-navy',
        )}
      >
        {justAdded ? <Check aria-hidden className="size-5" /> : <Plus aria-hidden className="size-5" />}
      </button>
      {inCart > 0 ? (
        <span
          aria-hidden
          className="absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-2xs font-bold text-navy-950 tabular ring-2 ring-surface"
        >
          {inCart}
        </span>
      ) : null}
      <span aria-live="polite" className="sr-only">
        {justAdded ? `${t('added')}: ${itemName}` : ''}
      </span>
    </span>
  );
}
