import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';

export interface Crumb {
  label: string;
  href?: string;
}

export async function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  const [t, locale] = await Promise.all([getTranslations('navigation'), getLocale()]);
  const Separator = locale === 'ar' ? ChevronLeft : ChevronRight;
  const trail: readonly Crumb[] = [{ label: t('home'), href: '/' }, ...items];

  return (
    <nav aria-label={t('breadcrumbLabel')}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="hover:text-navy">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium text-ink' : undefined}>
                  {crumb.label}
                </span>
              )}
              {last ? null : <Separator aria-hidden className="size-3.5" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
