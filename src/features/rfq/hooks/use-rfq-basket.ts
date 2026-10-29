'use client';

import { useExternalStore } from '@/hooks/use-external-store';
import { rfqBasketStore } from '../store/rfq-basket';

export function useRfqBasket() {
  return useExternalStore(rfqBasketStore);
}
