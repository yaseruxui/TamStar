import 'server-only';
import { normalizeSearchText } from '@/utils/normalize-search';
import { categories } from '../data/categories';
import { items } from '../data/items';
import type { CatalogCategory, CatalogItem, ItemSpec } from '../types';

/**
 * Catalog read model. Backed by the curated product families today; the Odoo 18 product
 * sync (TAMSTAR_MVP.md §2) replaces these functions without touching the UI.
 */
export function getCategories(): readonly CatalogCategory[] {
  return categories;
}

export function getCategory(slug: string): CatalogCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getItemsByCategory(categorySlug: string): readonly CatalogItem[] {
  return items.filter((item) => item.category === categorySlug);
}

export function countItemsByCategory(): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  return counts;
}

export function getItem(categorySlug: string, itemSlug: string): CatalogItem | undefined {
  return items.find((item) => item.category === categorySlug && item.slug === itemSlug);
}

export function getAllItemParams(): ReadonlyArray<{ category: string; item: string }> {
  return items.map((item) => ({ category: item.category, item: item.slug }));
}

export function getRelatedItems(item: CatalogItem, limit = 3): readonly CatalogItem[] {
  return items.filter((other) => other.category === item.category && other.slug !== item.slug).slice(0, limit);
}

const FEATURED_SLUGS = [
  'ball-valves',
  'pressure-gauges',
  'flanges',
  'fire-extinguishers',
  'bearings-transmission',
  'mechanical-seals-pump-spares',
  'cable-glands-accessories',
  'industrial-lighting',
] as const;

export function getFeaturedItems(): readonly CatalogItem[] {
  return FEATURED_SLUGS.flatMap((slug) => items.filter((item) => item.slug === slug));
}

function specText(spec: ItemSpec): string {
  return typeof spec.value === 'string' ? spec.value : `${spec.value.en} ${spec.value.ar}`;
}

const searchIndex = items.map((item) => {
  const category = categories.find((c) => c.slug === item.category);
  const haystack = [
    item.name.en,
    item.name.ar,
    item.summary.en,
    item.summary.ar,
    category?.name.en ?? '',
    category?.name.ar ?? '',
    ...item.standards,
    ...item.specs.map(specText),
  ].join(' ');
  return { item, text: normalizeSearchText(haystack), name: normalizeSearchText(`${item.name.en} ${item.name.ar}`) };
});

export interface SearchOptions {
  category?: string;
}

/** Every query term must match; hits in the item name rank above hits in the description. */
export function searchItems(query: string, { category }: SearchOptions = {}): readonly CatalogItem[] {
  const terms = normalizeSearchText(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];

  return searchIndex
    .filter((entry) => (category ? entry.item.category === category : true))
    .filter((entry) => terms.every((term) => entry.text.includes(term)))
    .map((entry) => ({
      item: entry.item,
      score: terms.reduce((sum, term) => sum + (entry.name.includes(term) ? 2 : 1), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

export function getAllItems(): readonly CatalogItem[] {
  return items;
}
