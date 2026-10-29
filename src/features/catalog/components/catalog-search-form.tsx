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
  withCategory?: boolean;
  className?: string;
}

/** Plain GET form — works before hydration and costs no client JavaScript. */
export async function CatalogSearchForm({
  idPrefix,
  defaultQuery = '',
  defaultCategory = '',
  size = 'md',
  withCategory = false,
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
        'flex w-full items-center rounded-full bg-tile p-1.5 ring-1 ring-transparent transition focus-within:bg-surface focus-within:ring-navy/20',
        large ? 'h-16' : 'h-12',
        className,
      )}
    >
      {withCategory ? (
        <>
          <label htmlFor={`${idPrefix}-category`} className="sr-only">
            {t('categoriesLabel')}
          </label>
          <select
            id={`${idPrefix}-category`}
            name="category"
            defaultValue={defaultCategory}
            className="hidden h-full w-48 shrink-0 appearance-none truncate rounded-full bg-surface px-4 text-sm text-ink outline-none sm:block"
          >
            <option value="">{t('allCategories')}</option>
            {getCategories().map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name[locale]}
              </option>
            ))}
          </select>
        </>
      ) : null}
      <div className="relative h-full min-w-0 flex-1">
        <label htmlFor={`${idPrefix}-q`} className="sr-only">
          {t('searchLabel')}
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute start-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
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
            'h-full w-full bg-transparent ps-10 pe-3 text-ink outline-none placeholder:text-muted/80',
            large ? 'text-md' : 'text-sm',
          )}
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-full shrink-0 items-center gap-2 rounded-full bg-navy-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-navy sm:px-6"
      >
        <Search aria-hidden className="size-4 sm:hidden" />
        <span className="sr-only sm:not-sr-only">{t('searchSubmit')}</span>
      </button>
    </form>
  );
}
