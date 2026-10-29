import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { CatalogCategory } from '../types';
import { productImage } from '../utils/images';

export async function CategoryCard({ category, itemCount }: { category: CatalogCategory; itemCount: number }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-hover"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-canvas">
        <Image
          src={productImage(category.cover)}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-1 items-end justify-between gap-3 p-4">
        <span>
          <span className="block font-display text-md font-medium text-ink">{category.name[locale]}</span>
          <span className="mt-1 block text-xs text-muted tabular">{t('itemsCount', { count: itemCount })}</span>
        </span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-canvas text-navy transition-colors group-hover:bg-brand group-hover:text-navy-950">
          <Arrow aria-hidden className="size-4" />
        </span>
      </span>
    </Link>
  );
}
