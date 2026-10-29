const OPEN_EVENT = 'tamstar:open-cart';

/** Lets any "add to cart" control open the header drawer without shared React context. */
export function openCartDrawer(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCartDrawer(listener: () => void): () => void {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
