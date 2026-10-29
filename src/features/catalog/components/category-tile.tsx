import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { CatalogCategory } from '../types';
import { productImage } from '../utils/images';

/** Compact square tile for category rails (home page). */
export async function CategoryTile({ category, itemCount }: { category: CatalogCategory; itemCount: number }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);

  return (
    <Link href={`/catalog/${category.slug}`} className="group flex flex-col items-center text-center">
      <span className="relative block aspect-square w-full overflow-hidden rounded-lg border border-line bg-surface transition-shadow group-hover:shadow-hover">
        <Image
          src={productImage(category.cover)}
          alt=""
          fill
          sizes="(min-width: 1024px) 140px, (min-width: 640px) 20vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </span>
      <span className="mt-2.5 line-clamp-2 text-sm leading-5 font-medium text-ink group-hover:text-navy-700">
        {category.name[locale]}
      </span>
      <span className="mt-0.5 text-2xs text-muted tabular">{t('itemsCount', { count: itemCount })}</span>
    </Link>
  );
}
