import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { CatalogCategory } from '../types';
import { productImage } from '../utils/images';

/** Compact category tile: soft image well, name and count beneath. */
export async function CategoryTile({ category, itemCount }: { category: CatalogCategory; itemCount: number }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);

  return (
    <Link href={`/catalog/${category.slug}`} className="reveal group flex flex-col items-center text-center">
      <span className="relative block aspect-square w-full overflow-hidden rounded-xl bg-tile">
        <Image
          src={productImage(category.cover)}
          alt=""
          fill
          sizes="(min-width: 1024px) 140px, (min-width: 640px) 20vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />
      </span>
      <span className="mt-3 line-clamp-2 text-sm leading-5 font-semibold text-ink group-hover:text-brand-ink">
        {category.name[locale]}
      </span>
      <span className="mt-0.5 text-2xs text-muted tabular">{t('itemsCount', { count: itemCount })}</span>
    </Link>
  );
}
