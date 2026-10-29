import { z } from 'zod';
import type { ExternalStore } from '@/hooks/use-external-store';
import type { CartLine, CartLineKey } from '../types';

const STORAGE_KEY = 'tamstar.cart.v1';
const MAX_LINES = 50;
export const MAX_QUANTITY = 1_000_000;

const lineSchema = z.object({
  category: z.string().min(1).max(80),
  slug: z.string().min(1).max(120),
  quantity: z.number().int().positive().max(MAX_QUANTITY),
});
const cartSchema = z.array(lineSchema).max(MAX_LINES);

const EMPTY: readonly CartLine[] = [];
let snapshot: readonly CartLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): readonly CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = cartSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: readonly CartLine[]): void {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory cart still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return;
  snapshot = read();
  listeners.forEach((listener) => listener());
}

export const cartStore: ExternalStore<readonly CartLine[]> = {
  subscribe(listener) {
    listeners.add(listener);
    if (listeners.size === 1) window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) window.removeEventListener('storage', onStorage);
    };
  },
  getSnapshot() {
    if (!hydrated) {
      hydrated = true;
      snapshot = read();
    }
    return snapshot;
  },
  getServerSnapshot() {
    return EMPTY;
  },
};

const same = (a: CartLineKey, b: CartLineKey) => a.category === b.category && a.slug === b.slug;
const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));

/** Adds the quantity to an existing line, or appends a new line. */
export function addToCart(item: CartLineKey, quantity = 1): void {
  const current = cartStore.getSnapshot();
  const existing = current.find((line) => same(line, item));
  if (existing) {
    write(current.map((line) => (same(line, item) ? { ...line, quantity: clamp(line.quantity + quantity) } : line)));
    return;
  }
  write([...current, { ...item, quantity: clamp(quantity) }].slice(-MAX_LINES));
}

export function setQuantity(item: CartLineKey, quantity: number): void {
  write(cartStore.getSnapshot().map((line) => (same(line, item) ? { ...line, quantity: clamp(quantity) } : line)));
}

export function removeFromCart(item: CartLineKey): void {
  write(cartStore.getSnapshot().filter((line) => !same(line, item)));
}

export function clearCart(): void {
  write(EMPTY);
}
