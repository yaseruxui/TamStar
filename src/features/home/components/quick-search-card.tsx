'use client';

import { ClipboardList, FileUp, Search, ShieldCheck, Zap } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { getPathname, Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';

const EXAMPLES = ['API 6D', 'ASME B16.5', 'EN 388', 'ATEX'] as const;

type Tab = 'search' | 'rfq';

export function QuickSearchCard() {
  const t = useTranslations('home.quickSearch');
  const locale = useLocale();
  const [tab, setTab] = useState<Tab>('search');
  const baseId = useId();
  const searchAction = getPathname({ href: '/search', locale });

  const tabs: ReadonlyArray<{ key: Tab; label: string; icon: typeof Search }> = [
    { key: 'search', label: t('tabSearch'), icon: Search },
    { key: 'rfq', label: t('tabRfq'), icon: FileUp },
  ];

  return (
    <div className="rounded-lg bg-surface p-5 text-body shadow-raised sm:p-6">
      <h2 className="text-lg font-bold">{t('title')}</h2>
      <p className="mt-0.5 text-sm text-muted">{t('subtitle')}</p>

      <div role="tablist" aria-label={t('title')} className="mt-5 grid grid-cols-2 gap-1 rounded-md bg-tint-100 p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`${baseId}-tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`${baseId}-panel-${key}`}
            onClick={() => setTab(key)}
            className={cn(
              'inline-flex h-9 items-center justify-center gap-2 rounded-sm text-sm font-semibold transition-colors',
              tab === key ? 'bg-navy text-white shadow-card' : 'text-navy hover:bg-tint-200',
            )}
          >
            <Icon aria-hidden className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-search`}
        aria-labelledby={`${baseId}-tab-search`}
        hidden={tab !== 'search'}
      >
        <form action={searchAction} method="get" role="search" className="mt-5">
          <label htmlFor={`${baseId}-q`} className="text-sm font-medium text-ink">
            {t('label')}
          </label>
          <div className="relative mt-1.5">
            <Search
              aria-hidden
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              id={`${baseId}-q`}
              name="q"
              type="search"
              required
              maxLength={120}
              placeholder={t('placeholder')}
              className="h-11 w-full rounded-sm border border-line bg-canvas ps-9 pe-3 text-base text-ink outline-none placeholder:text-muted/80 focus:border-navy-600 focus:bg-surface"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted">{t('examples')}:</span>
            {EXAMPLES.map((example) => (
              <Link
                key={example}
                href={{ pathname: '/search', query: { q: example } }}
                className="rounded-xs bg-tint-100 px-2 py-0.5 font-mono font-medium text-navy hover:bg-tint-200"
              >
                {example}
              </Link>
            ))}
          </div>
          <button type="submit" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-5 w-full')}>
            <Search aria-hidden />
            {t('submit')}
          </button>
        </form>
      </div>

      <div role="tabpanel" id={`${baseId}-panel-rfq`} aria-labelledby={`${baseId}-tab-rfq`} hidden={tab !== 'rfq'}>
        <p className="mt-5 text-base leading-6">{t('rfqBody')}</p>
        <Link href="/rfq" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-5 w-full')}>
          <ClipboardList aria-hidden />
          {t('rfqSubmit')}
        </Link>
      </div>

      <ul className="mt-5 grid gap-2 border-t border-line pt-4 text-xs sm:grid-cols-2">
        <li className="flex items-center gap-2">
          <ShieldCheck aria-hidden className="size-4 shrink-0 text-success" />
          {t('note1')}
        </li>
        <li className="flex items-center gap-2">
          <Zap aria-hidden className="size-4 shrink-0 text-brand" />
          {t('note2')}
        </li>
      </ul>
    </div>
  );
}
