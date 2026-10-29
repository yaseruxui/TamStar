'use client';

import { Check, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button, type ButtonVariantProps } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { useRfqBasket } from '../hooks/use-rfq-basket';
import { addToBasket, removeFromBasket } from '../store/rfq-basket';

interface AddToRfqButtonProps extends Pick<ButtonVariantProps, 'size'> {
  category: string;
  slug: string;
  itemName: string;
  className?: string;
}

export function AddToRfqButton({ category, slug, itemName, size = 'md', className }: AddToRfqButtonProps) {
  const t = useTranslations('catalog');
  const inBasket = useRfqBasket().some((entry) => entry.category === category && entry.slug === slug);

  return (
    <Button
      variant={inBasket ? 'soft' : 'navy'}
      size={size}
      aria-pressed={inBasket}
      aria-label={`${inBasket ? t('inRfq') : t('addToRfq')}: ${itemName}`}
      onClick={() => (inBasket ? removeFromBasket({ category, slug }) : addToBasket({ category, slug }))}
      className={cn('w-full', className)}
    >
      {inBasket ? <Check aria-hidden /> : <Plus aria-hidden />}
      {inBasket ? t('inRfq') : t('addToRfq')}
    </Button>
  );
}
