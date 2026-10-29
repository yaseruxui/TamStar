import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ClientMessages } from '@/components/common/client-messages';
import { ButtonLink } from '@/components/ui/button-link';
import { ClientsStrip } from '@/features/company/components/clients-strip';
import { StatsRow } from '@/features/company/components/stats-row';
import { QuickSearchCard } from './quick-search-card';

export async function Hero() {
  const [t, tCommon, locale] = await Promise.all([getTranslations('home'), getTranslations('common'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-grid-navy relative overflow-hidden text-white">
      <div aria-hidden className="absolute inset-y-0 end-0 hidden w-[38%] bg-navy-950/40 lg:block" />
      <div className="container-site relative grid gap-10 pt-12 pb-10 lg:grid-cols-[1fr_26rem] lg:gap-14 lg:pt-16">
        <div className="flex flex-col">
          <p className="inline-flex w-fit items-center gap-2 rounded-xs border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-navy-on">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold text-white sm:text-4xl">{t('hero.title')}</h1>
          <p className="mt-5 max-w-2xl text-md leading-7 text-navy-on">{t('hero.lead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/catalog" size="lg">
              {t('hero.primary')}
              <Arrow aria-hidden />
            </ButtonLink>
            <ButtonLink href="/rfq" size="lg" variant="inverseOutline">
              {t('hero.secondary')}
            </ButtonLink>
          </div>
          <StatsRow className="mt-10" />
        </div>

        <div className="lg:pt-2">
          <ClientMessages namespaces={['home']}>
            <QuickSearchCard />
          </ClientMessages>
          <p className="mt-4 flex items-center gap-2 text-xs text-navy-on">
            <MapPin aria-hidden className="size-3.5 text-brand" />
            {tCommon('addressLine1')} · {tCommon('addressLine2')}
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-navy-950/50">
        <div className="container-site py-6">
          <ClientsStrip label={t('clients.label')} />
        </div>
      </div>
    </section>
  );
}
