'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { removeFromCart, setQuantity } from '../store/cart-store';
import { cartKey, type CartCatalog, type CartLine } from '../types';

interface CartLinesProps {
  lines: readonly CartLine[];
  catalog: CartCatalog;
  compact?: boolean;
  onNavigate?: () => void;
}

export function CartLines({ lines, catalog, compact = false, onNavigate }: CartLinesProps) {
  const t = useTranslations('cart');

  return (
    <ul className="divide-y divide-line">
      {lines.map((line) => {
        const product = catalog[cartKey(line)];
        if (!product) return null;
        return (
          <li key={cartKey(line)} className={cn('flex gap-4', compact ? 'py-4' : 'py-5')}>
            <Link
              href={product.href}
              onClick={onNavigate}
              className={cn(
                'relative shrink-0 overflow-hidden rounded-sm border border-line bg-canvas',
                compact ? 'size-20' : 'size-24 sm:size-28',
              )}
            >
              <Image src={product.image} alt="" fill sizes="112px" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-xs text-muted">{product.categoryName}</p>
              <Link
                href={product.href}
                onClick={onNavigate}
                className="mt-0.5 font-medium text-ink hover:text-navy-700"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-xs text-brand-ink">
                {t('priceLocked')} · {t('unitPer', { unit: product.unitLabel })}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                <QuantityStepper
                  value={line.quantity}
                  onChange={(quantity) => setQuantity(line, quantity)}
                  size="sm"
                  label={`${t('quantity')}: ${product.name}`}
                  decreaseLabel={t('decrease')}
                  increaseLabel={t('increase')}
                />
                <button
                  type="button"
                  onClick={() => removeFromCart(line)}
                  aria-label={t('remove', { name: product.name })}
                  className="grid size-9 place-items-center rounded-sm text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                >
                  <Trash aria-hidden className="size-4" />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
