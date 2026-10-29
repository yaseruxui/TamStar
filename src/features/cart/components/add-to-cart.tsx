'use client';

import { Check, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { cn } from '@/utils/cn';
import { useCart } from '../hooks/use-cart';
import { addToCart, MAX_QUANTITY } from '../store/cart-store';
import { openCartDrawer } from './cart-drawer-events';

interface AddToCartProps {
  category: string;
  slug: string;
  itemName: string;
  variant?: 'card' | 'detail';
  className?: string;
}

export function AddToCart({ category, slug, itemName, variant = 'card', className }: AddToCartProps) {
  const t = useTranslations('cart');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const inCart = useCart().find((line) => line.category === category && line.slug === slug)?.quantity ?? 0;

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const add = () => {
    addToCart({ category, slug }, quantity);
    setJustAdded(true);
    if (variant === 'detail') openCartDrawer();
  };

  const detail = variant === 'detail';

  return (
    <div className={cn('flex gap-2', detail ? 'flex-col sm:flex-row' : '', className)}>
      <QuantityStepper
        value={quantity}
        onChange={setQuantity}
        max={MAX_QUANTITY}
        size={detail ? 'md' : 'sm'}
        label={`${t('quantity')}: ${itemName}`}
        decreaseLabel={t('decrease')}
        increaseLabel={t('increase')}
        className={detail ? 'h-12' : undefined}
      />
      <Button
        onClick={add}
        variant={justAdded ? 'soft' : 'primary'}
        size={detail ? 'lg' : 'sm'}
        aria-label={`${t('addToCart')}: ${itemName}`}
        className={cn('flex-1', detail ? 'h-12' : 'h-9')}
      >
        {justAdded ? <Check aria-hidden /> : <ShoppingCart aria-hidden />}
        <span>
          {justAdded
            ? detail
              ? t('added')
              : t('addedShort')
            : inCart > 0 && detail
              ? t('inCart', { count: inCart })
              : detail
                ? t('addToCart')
                : t('add')}
        </span>
      </Button>
      <span aria-live="polite" className="sr-only">
        {justAdded ? `${t('added')}: ${itemName}` : ''}
      </span>
    </div>
  );
}
