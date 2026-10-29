import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { countItemsByCategory, getCategories } from '../services/catalog';
import { CategoryIcon } from './category-icon';

export async function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  const [t, locale] = await Promise.all([getTranslations('catalog'), getLocale()]);
  const counts = countItemsByCategory();

  return (
    <nav aria-label={t('categoriesTitle')} className="rounded-lg border border-line bg-surface p-2 shadow-card">
      <p className="px-3 pt-2 pb-3 text-xs font-semibold text-muted">{t('categoriesTitle')}</p>
      <ul className="flex flex-col">
        {getCategories().map((category) => {
          const active = category.slug === activeSlug;
          return (
            <li key={category.slug}>
              <Link
                href={`/catalog/${category.slug}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  active ? 'bg-tint-200 font-semibold text-navy' : 'text-ink hover:bg-canvas',
                )}
              >
                <CategoryIcon icon={category.icon} className="size-8 rounded-sm [&_svg]:size-4" />
                <span className="flex-1">{category.name[locale]}</span>
                <span className="tabular text-xs text-muted">{counts.get(category.slug) ?? 0}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
