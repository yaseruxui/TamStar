import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { AddToRfqButton } from '@/features/rfq/components/add-to-rfq-button';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { getCategory } from '../services/catalog';
import type { CatalogItem } from '../types';
import { CategoryIcon } from './category-icon';
import { specValue } from '../utils/spec-value';

export async function ItemCard({ item }: { item: CatalogItem }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);
  const category = getCategory(item.category);
  const href = `/catalog/${item.category}/${item.slug}`;
  const name = item.name[locale];
  const previewSpecs = item.specs.slice(0, 2);

  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 shadow-card">
      <div className="bg-grid-light relative flex h-32 items-center justify-center rounded-md border border-tint-200 bg-tint-50">
        {category ? (
          <CategoryIcon icon={category.icon} className="size-14 bg-surface shadow-card [&_svg]:size-7" />
        ) : null}
        {item.standards.length > 0 ? (
          <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1">
            {item.standards.slice(0, 2).map((standard) => (
              <Badge key={standard} tone="neutral" size="sm" mono className="bg-surface">
                {standard}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      {category ? <p className="mt-4 text-xs font-medium text-brand-ink">{category.name[locale]}</p> : null}
      <h3 className="mt-1 text-md font-semibold">
        <Link href={href} className="hover:text-navy-700">
          {name}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm">{item.summary[locale]}</p>

      {previewSpecs.length > 0 ? (
        <dl
          className={cn(
            'mt-4 grid gap-px overflow-hidden rounded-sm border border-line bg-line text-xs',
            previewSpecs.length > 1 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {previewSpecs.map((spec) => (
            <div key={spec.label} className="bg-canvas px-2.5 py-2">
              <dt className="text-muted">{t(`specs.${spec.label}`)}</dt>
              <dd className="mt-0.5 truncate font-medium text-ink">
                <bdi>{specValue(spec, locale)}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-4 flex flex-col gap-2">
        <AddToRfqButton category={item.category} slug={item.slug} itemName={name} size="sm" />
        <Link
          href={href}
          className="inline-flex h-8 items-center justify-center rounded-sm border border-line px-3 text-xs font-semibold text-navy hover:bg-tint-100"
        >
          {t('viewItem')}
          <span className="sr-only">: {name}</span>
        </Link>
      </div>
    </article>
  );
}
