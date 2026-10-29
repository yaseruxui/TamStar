import { z } from 'zod';
import type { ExternalStore } from '@/hooks/use-external-store';
import type { RfqBasketEntry } from '../types';

const STORAGE_KEY = 'tamstar.rfq-basket.v1';
const MAX_ENTRIES = 50;

const entrySchema = z.object({
  category: z.string().min(1).max(80),
  slug: z.string().min(1).max(120),
  quantity: z.number().int().positive().max(1_000_000),
});
const basketSchema = z.array(entrySchema).max(MAX_ENTRIES);

const EMPTY: readonly RfqBasketEntry[] = [];
let snapshot: readonly RfqBasketEntry[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): readonly RfqBasketEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = basketSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: readonly RfqBasketEntry[]): void {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory list still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return;
  snapshot = read();
  listeners.forEach((listener) => listener());
}

export const rfqBasketStore: ExternalStore<readonly RfqBasketEntry[]> = {
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

const sameEntry = (a: Pick<RfqBasketEntry, 'category' | 'slug'>, b: Pick<RfqBasketEntry, 'category' | 'slug'>) =>
  a.category === b.category && a.slug === b.slug;

export function addToBasket(entry: Omit<RfqBasketEntry, 'quantity'>, quantity = 1): void {
  const current = rfqBasketStore.getSnapshot();
  if (current.some((existing) => sameEntry(existing, entry))) return;
  write([...current, { ...entry, quantity }].slice(-MAX_ENTRIES));
}

export function removeFromBasket(entry: Pick<RfqBasketEntry, 'category' | 'slug'>): void {
  write(rfqBasketStore.getSnapshot().filter((existing) => !sameEntry(existing, entry)));
}

export function clearBasket(): void {
  write(EMPTY);
}
