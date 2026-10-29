const BUMP_EVENT = 'tamstar:cart-bump';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The visible header cart button (only one is laid out at a time). */
function cartTarget(): HTMLElement | null {
  const targets = document.querySelectorAll<HTMLElement>('[data-cart-target]');
  return Array.from(targets).find((el) => el.getClientRects().length > 0) ?? null;
}

/**
 * Flies a ghost of the product image from the add button's product into the header cart,
 * then bumps the cart badge. Resolves when the ghost lands (immediately under reduced motion).
 */
export async function flyToCart(trigger: Element): Promise<void> {
  const image = trigger.closest('[data-product]')?.querySelector<HTMLImageElement>('[data-product-media] img');
  const target = cartTarget();

  if (!image || !target || prefersReducedMotion()) {
    window.dispatchEvent(new Event(BUMP_EVENT));
    return;
  }

  const from = image.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const size = Math.min(from.width, from.height, 160);
  const startX = from.left + from.width / 2 - size / 2;
  const startY = from.top + from.height / 2 - size / 2;
  const dx = to.left + to.width / 2 - (startX + size / 2);
  const dy = to.top + to.height / 2 - (startY + size / 2);

  const ghost = document.createElement('img');
  ghost.src = image.currentSrc || image.src;
  ghost.alt = '';
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'cover',
    borderRadius: '9999px',
    boxShadow: '0 18px 40px -12px rgb(11 20 36 / 0.45)',
    zIndex: '100',
    pointerEvents: 'none',
  });
  document.body.append(ghost);

  const animation = ghost.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 80}px) scale(0.6)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.6 },
    ],
    { duration: 750, easing: 'cubic-bezier(0.5, 0, 0.3, 1)' },
  );

  await animation.finished.catch(() => undefined);
  ghost.remove();
  window.dispatchEvent(new Event(BUMP_EVENT));
}

export function onCartBump(listener: () => void): () => void {
  window.addEventListener(BUMP_EVENT, listener);
  return () => window.removeEventListener(BUMP_EVENT, listener);
}
