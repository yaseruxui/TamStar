'use client';

import { useSyncExternalStore } from 'react';

export interface ExternalStore<TSnapshot> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => TSnapshot;
  getServerSnapshot: () => TSnapshot;
}

export function useExternalStore<TSnapshot>(store: ExternalStore<TSnapshot>): TSnapshot {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}
