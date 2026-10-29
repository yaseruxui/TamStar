import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { CatalogCategory } from '../types';

/** Accent hue each category's dark tile fades from, so the rail reads as distinct groups. */
const TILE_TONES: Record<string, string> = {
  'valves-piping': '#123f80',
  instrumentation: '#0f5560',
  'safety-ppe': '#6b4508',
  'fire-safety': '#6e1a1a',
  electrical: '#2e2a78',
  'mechanical-mro': '#6a3514',
  'tools-lifting': '#334155',
  plumbing: '#0c5478',
  consumables: '#14553f',
};

/** Compact category tile: dark gradient well with a cut-out product, name and count beneath. */
export async function CategoryTile({ category, itemCount }: { category: CatalogCategory; itemCount: number }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);
  const tone = TILE_TONES[category.slug] ?? '#0b3c7b';

  return (
    <Link href={`/catalog/${category.slug}`} className="reveal group flex flex-col items-center text-center">
      <span
        className="relative block aspect-square w-full overflow-hidden rounded-xl ring-1 ring-navy-950/10 ring-inset"
        style={{
          backgroundImage: `radial-gradient(65% 55% at 50% 42%, rgb(255 255 255 / 0.16), transparent 72%), linear-gradient(160deg, ${tone} 0%, #07111f 85%)`,
        }}
      >
        <Image
          src={`/categories/${category.slug}.webp`}
          alt=""
          fill
          sizes="(min-width: 1024px) 140px, (min-width: 640px) 20vw, 30vw"
          className="object-contain p-3 drop-shadow-[0_10px_14px_rgb(0_0_0/0.35)] transition-transform duration-500 group-hover:scale-[1.08] group-hover:-rotate-2"
        />
      </span>
      <span className="mt-3 line-clamp-2 text-sm leading-5 font-semibold text-ink group-hover:text-brand-ink">
        {category.name[locale]}
      </span>
      <span className="mt-0.5 text-2xs text-muted tabular">{t('itemsCount', { count: itemCount })}</span>
    </Link>
  );
}
