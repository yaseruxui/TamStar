import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/i18n/navigation';
import type { CatalogCategory } from '../types';
import { CategoryIcon } from './category-icon';

export async function CategoryCard({ category, itemCount }: { category: CatalogCategory; itemCount: number }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] hover:border-navy-600/40 hover:shadow-raised"
    >
      <div className="flex items-start justify-between gap-3">
        <CategoryIcon icon={category.icon} />
        <Badge tone="navy" size="sm" className="tabular">
          {t('itemsCount', { count: itemCount })}
        </Badge>
      </div>
      <h3 className="mt-4 text-md font-semibold">{category.name[locale]}</h3>
      <p className="mt-1.5 flex-1 text-sm">{category.summary[locale]}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
        {t('viewCategory')}
        <Arrow
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        />
      </span>
    </Link>
  );
}
