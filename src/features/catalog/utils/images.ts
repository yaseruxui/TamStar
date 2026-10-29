/** Studio renders live in /public/products (1200×1200 WebP); next/image serves AVIF/WebP at the requested width. */
export function productImage(slug: string): string {
  return `/products/${slug}.webp`;
}

export const PRODUCT_IMAGE_SIZE = 1200;
