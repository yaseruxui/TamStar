'use client';

import { useExternalStore } from '@/hooks/use-external-store';
import { cartStore } from '../store/cart-store';

export function useCart() {
  return useExternalStore(cartStore);
}

export function useCartCount(): number {
  return useCart().reduce((total, line) => total + line.quantity, 0);
}
