import { ArrowLeft, ArrowRight, ClipboardList } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { FlangeDrawing } from '@/components/illustrations/flange-drawing';
import { ButtonLink } from '@/components/ui/button-link';
import { CatalogSearchForm } from '@/features/catalog/components/catalog-search-form';
import { Link } from '@/lib/i18n/navigation';
import { stats } from '@/lib/config/site';

const EXAMPLES = ['API 6D', 'ASME B16.5', 'EN 388', 'ATEX'] as const;

export async function Hero() {
  const [t, tStats, locale] = await Promise.all([
    getTranslations('home'),
    getTranslations('common.stats'),
    getLocale(),
  ]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-drafting relative overflow-hidden border-b border-paper-line">
      <div className="container-site grid items-center gap-12 pt-12 pb-14 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-navy">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-px w-8 bg-brand" />
              {t('hero.eyebrow')}
            </span>
            <span dir="ltr" className="font-mono text-2xs text-muted">
              26.43°N · 50.10°E
            </span>
          </p>
          <h1 className="mt-6 text-3xl leading-[1.15] font-semibold text-ink sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-md leading-8 text-body">{t('hero.lead')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/rfq" size="lg">
              <ClipboardList aria-hidden />
              {t('hero.primary')}
            </ButtonLink>
            <ButtonLink href="/catalog" size="lg" variant="outline" className="bg-transparent">
              {t('hero.secondary')}
              <Arrow aria-hidden />
            </ButtonLink>
          </div>

          <div className="mt-10 max-w-2xl">
            <CatalogSearchForm idPrefix="hero-search" size="lg" />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted">{t('quickSearch.examples')}:</span>
              {EXAMPLES.map((example) => (
                <Link
                  key={example}
                  href={{ pathname: '/search', query: { q: example } }}
                  className="rounded-xs border border-paper-line bg-surface/70 px-2 py-0.5 font-mono text-navy transition-colors hover:border-navy"
                >
                  {example}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <figure className="relative lg:col-span-5">
          <div className="relative rounded-xs border border-navy/20 bg-canvas/70 p-4 sm:p-6">
            {[
              'start-0 top-0 border-s border-t',
              'end-0 top-0 border-e border-t',
              'start-0 bottom-0 border-s border-b',
              'end-0 bottom-0 border-e border-b',
            ].map((corner) => (
              <span key={corner} aria-hidden className={`absolute size-4 border-brand ${corner} -m-px`} />
            ))}
            <FlangeDrawing className="h-auto w-full" />
          </div>
          <figcaption className="label-tech mt-3 text-muted">{t('hero.caption')}</figcaption>
        </figure>
      </div>

      <dl className="border-t border-paper-line bg-canvas/80">
        <div className="container-site grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`flex flex-col-reverse gap-1 py-6 ${index % 2 === 1 ? 'ps-6' : ''} ${index > 0 ? 'lg:border-s lg:border-paper-line lg:ps-8' : ''} ${index < 2 ? 'max-lg:border-b max-lg:border-paper-line' : ''}`}
            >
              <dt className="text-sm text-muted">{tStats(stat.key)}</dt>
              <dd className="font-display text-3xl font-semibold text-navy tabular lg:text-4xl">
                <bdi>{stat.value}</bdi>
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
}
