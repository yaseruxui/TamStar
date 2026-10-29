import { Search } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCategories } from '@/features/catalog/services/catalog';
import { getPathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';

interface HeaderSearchProps {
  className?: string;
  idPrefix: string;
}

/** Plain GET form — works before hydration and costs no client JavaScript. */
export async function HeaderSearch({ className, idPrefix }: HeaderSearchProps) {
  const [t, locale] = await Promise.all([getTranslations('navigation'), getLocale()]);
  const action = getPathname({ href: '/search', locale });

  return (
    <form action={action} method="get" role="search" className={cn('flex h-11 w-full', className)}>
      <label htmlFor={`${idPrefix}-category`} className="sr-only">
        {t('categoriesLabel')}
      </label>
      <select
        id={`${idPrefix}-category`}
        name="category"
        defaultValue=""
        className="hidden w-40 shrink-0 appearance-none truncate rounded-s-sm border border-e-0 border-line bg-tint-100 px-3 text-sm text-ink outline-none focus:border-navy-600 lg:block"
      >
        <option value="">{t('allCategories')}</option>
        {getCategories().map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name[locale]}
          </option>
        ))}
      </select>
      <div className="relative min-w-0 flex-1">
        <label htmlFor={`${idPrefix}-q`} className="sr-only">
          {t('searchLabel')}
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
        <input
          id={`${idPrefix}-q`}
          name="q"
          type="search"
          required
          maxLength={120}
          enterKeyHint="search"
          autoComplete="off"
          placeholder={t('searchPlaceholder')}
          className="h-full w-full rounded-s-sm border border-line bg-surface ps-9 pe-3 text-sm text-ink outline-none placeholder:text-muted/80 focus:border-navy-600 lg:rounded-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-2 rounded-e-sm bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-700 sm:px-5"
      >
        <Search aria-hidden className="size-4 sm:hidden" />
        <span className="sr-only sm:not-sr-only">{t('searchSubmit')}</span>
      </button>
    </form>
  );
}
