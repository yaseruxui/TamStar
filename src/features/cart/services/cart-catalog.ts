import 'server-only';
import { getTranslations } from 'next-intl/server';
import { getAllItems, getCategory } from '@/features/catalog/services/catalog';
import { productImage } from '@/features/catalog/utils/images';
import type { Locale } from '@/lib/i18n/routing';
import { cartKey, type CartCatalog } from '../types';

/** Compact, localized product index for client components that render cart lines (≈3 KB). */
export async function getCartCatalog(locale: Locale): Promise<CartCatalog> {
  const t = await getTranslations({ locale, namespace: 'catalog' });
  const catalog: Record<string, CartCatalog[string]> = {};
  for (const item of getAllItems()) {
    catalog[cartKey(item)] = {
      name: item.name[locale],
      categoryName: getCategory(item.category)?.name[locale] ?? '',
      image: productImage(item.slug),
      unit: item.unit,
      unitLabel: t(`units.${item.unit}`),
      href: `/catalog/${item.category}/${item.slug}`,
    };
  }
  return catalog;
}
