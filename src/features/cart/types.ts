import type { UnitOfMeasure } from '@/features/catalog/types';

export interface CartLine {
  category: string;
  slug: string;
  quantity: number;
}

export type CartLineKey = Pick<CartLine, 'category' | 'slug'>;

/** Display data for a catalog item, shipped to client components that render cart lines. */
export interface CartProduct {
  name: string;
  categoryName: string;
  image: string;
  unit: UnitOfMeasure;
  unitLabel: string;
  href: string;
}

export type CartCatalog = Readonly<Record<string, CartProduct>>;

export const cartKey = (line: CartLineKey): string => `${line.category}/${line.slug}`;
