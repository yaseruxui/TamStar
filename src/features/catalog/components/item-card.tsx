import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { QuickAdd } from '@/features/cart/components/quick-add';
import { Link } from '@/lib/i18n/navigation';
import { getCategory } from '../services/catalog';
import type { CatalogItem } from '../types';
import { productImage } from '../utils/images';

export async function ItemCard({ item, priority = false }: { item: CatalogItem; priority?: boolean }) {
  const [tCart, locale] = await Promise.all([getTranslations('cart'), getLocale()]);
  const category = getCategory(item.category);
  const href = `/catalog/${item.category}/${item.slug}`;
  const name = item.name[locale];

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden rounded-xl bg-tile"
        tabIndex={-1}
        aria-hidden
      >
        <Image
          src={productImage(item.slug)}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 280px, (min-width: 768px) 30vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {item.standards[0] ? (
          <span className="absolute start-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 font-mono text-2xs font-medium text-navy backdrop-blur">
            {item.standards[0]}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4">
        {category ? <p className="text-xs font-medium text-muted">{category.name[locale]}</p> : null}
        <h3 className="mt-1 line-clamp-2 font-sans text-base leading-snug font-bold text-ink">
          <Link href={href} className="hover:text-brand-ink">
            {name}
          </Link>
        </h3>
        {item.standards.length > 1 ? (
          <p className="mt-1.5 truncate font-mono text-2xs text-muted">
            <bdi>{item.standards.slice(1, 4).join(' · ')}</bdi>
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
            <LockKeyhole aria-hidden className="size-3.5" />
            {tCart('priceLocked')}
          </span>
          <QuickAdd category={item.category} slug={item.slug} itemName={name} />
        </div>
      </div>
    </article>
  );
}
