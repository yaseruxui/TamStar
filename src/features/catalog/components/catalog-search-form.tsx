import { Search } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { getCategories } from '../services/catalog';

interface CatalogSearchFormProps {
  idPrefix: string;
  defaultQuery?: string;
  defaultCategory?: string;
  size?: 'md' | 'lg';
  className?: string;
}

/** Plain GET form — works before hydration and costs no client JavaScript. */
export async function CatalogSearchForm({
  idPrefix,
  defaultQuery = '',
  defaultCategory = '',
  size = 'md',
  className,
}: CatalogSearchFormProps) {
  const [t, locale] = await Promise.all([getTranslations('navigation'), getLocale()]);
  const action = getPathname({ href: '/search', locale });
  const large = size === 'lg';

  return (
    <form
      action={action}
      method="get"
      role="search"
      className={cn(
        'flex w-full overflow-hidden rounded-sm border border-navy/25 bg-surface shadow-card focus-within:border-navy',
        large ? 'h-14' : 'h-12',
        className,
      )}
    >
      <label htmlFor={`${idPrefix}-category`} className="sr-only">
        {t('categoriesLabel')}
      </label>
      <select
        id={`${idPrefix}-category`}
        name="category"
        defaultValue={defaultCategory}
        className="hidden w-44 shrink-0 appearance-none truncate border-e border-line bg-canvas/60 px-4 text-sm text-ink outline-none sm:block"
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
          className="pointer-events-none absolute start-4 top-1/2 size-[18px] -translate-y-1/2 text-muted"
        />
        <input
          id={`${idPrefix}-q`}
          name="q"
          type="search"
          required
          maxLength={120}
          defaultValue={defaultQuery}
          enterKeyHint="search"
          autoComplete="off"
          placeholder={t('searchPlaceholder')}
          className={cn(
            'h-full w-full bg-transparent ps-11 pe-3 text-ink outline-none placeholder:text-muted/80',
            large ? 'text-md' : 'text-base',
          )}
        />
      </div>
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-2 bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 sm:px-7"
      >
        <Search aria-hidden className="size-4 sm:hidden" />
        <span className="sr-only sm:not-sr-only">{t('searchSubmit')}</span>
      </button>
    </form>
  );
}
