import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { AddToCart } from '@/features/cart/components/add-to-cart';
import { Link } from '@/lib/i18n/navigation';
import { getCategory } from '../services/catalog';
import type { CatalogItem } from '../types';
import { productImage } from '../utils/images';

export async function ItemCard({ item, priority = false }: { item: CatalogItem; priority?: boolean }) {
  const [t, tCart, locale] = await Promise.all([getTranslations('catalog'), getTranslations('cart'), getLocale()]);
  const category = getCategory(item.category);
  const href = `/catalog/${item.category}/${item.slug}`;
  const name = item.name[locale];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-hover">
      <Link href={href} className="relative block aspect-[5/4] overflow-hidden bg-canvas" tabIndex={-1} aria-hidden>
        <Image
          src={productImage(item.slug)}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 260px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {item.standards.length > 0 ? (
          <span className="absolute start-3 top-3 flex flex-wrap gap-1">
            {item.standards.slice(0, 2).map((standard) => (
              <span
                key={standard}
                className="rounded-xs bg-surface/90 px-1.5 py-0.5 font-mono text-2xs font-medium text-navy shadow-card backdrop-blur"
              >
                {standard}
              </span>
            ))}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        {category ? <p className="text-xs text-muted">{category.name[locale]}</p> : null}
        <h3 className="mt-1 line-clamp-2 font-sans text-base leading-snug font-semibold">
          <Link href={href} className="hover:text-navy-700">
            {name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted">{item.summary[locale]}</p>

        <div className="mt-4 flex items-center justify-between gap-2 rounded-sm bg-sand px-3 py-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-ink">
            <LockKeyhole aria-hidden className="size-3.5" />
            {tCart('priceLocked')}
          </span>
          <span className="text-2xs text-muted">{t(`units.${item.unit}`)}</span>
        </div>

        <AddToCart category={item.category} slug={item.slug} itemName={name} className="mt-3" />
      </div>
    </article>
  );
}
