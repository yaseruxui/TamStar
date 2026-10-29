import { ArrowLeft, ArrowRight, ClipboardList, Globe, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { stats } from '@/lib/config/site';

export async function Hero() {
  const [t, tStats, locale] = await Promise.all([
    getTranslations('home'),
    getTranslations('common.stats'),
    getLocale(),
  ]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="container-site pt-4 sm:pt-6">
      <div className="relative isolate overflow-hidden rounded-2xl bg-hero">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_15%_60%,rgb(252_144_37/0.28),transparent_70%),radial-gradient(50%_60%_at_95%_0%,rgb(0_71_186/0.08),transparent_70%)] rtl:bg-[radial-gradient(60%_80%_at_85%_60%,rgb(252_144_37/0.28),transparent_70%),radial-gradient(50%_60%_at_5%_0%,rgb(0_71_186/0.08),transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(11_20_36/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(11_20_36/0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
        />

        <div className="grid items-center gap-8 px-6 pt-10 pb-6 sm:px-12 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:py-14">
          <div className="motion-rise relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-navy shadow-card backdrop-blur">
              <span aria-hidden className="size-2 rounded-full bg-brand" />
              {t('hero.eyebrow')}
            </p>
            <h1 className="mt-6 text-[2rem] leading-[1.25] font-bold sm:text-[2.6rem] sm:leading-[1.25]">
              {t('hero.titleLead')}{' '}
              <span className="bg-gradient-to-l from-brand-hover to-brand-light bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-md leading-8 text-body">{t('hero.lead')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/catalog" size="lg">
                {t('hero.primary')}
                <Arrow aria-hidden />
              </ButtonLink>
              <ButtonLink href="/rfq" size="lg" variant="outline">
                <ClipboardList aria-hidden />
                {t('hero.secondary')}
              </ButtonLink>
            </div>
          </div>

          <div className="motion-rise relative" style={{ animationDelay: '150ms' }}>
            <Image
              src="/products/hero-composite.webp"
              alt=""
              width={1432}
              height={844}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full drop-shadow-[0_30px_40px_rgb(11_20_36/0.12)] rtl:-scale-x-100"
            />
            <div className="motion-float absolute start-0 bottom-4 hidden items-center gap-3 rounded-lg bg-surface/90 p-3.5 pe-5 shadow-raised backdrop-blur sm:flex">
              <span className="grid size-10 place-items-center rounded-full bg-sand text-brand-ink">
                <LockKeyhole aria-hidden className="size-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{t('hero.priceCardTitle')}</span>
                <span className="block text-xs text-muted">{t('hero.priceCardBody')}</span>
              </span>
            </div>
            <div
              className="motion-float absolute end-2 top-2 hidden items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-xs font-semibold text-white shadow-raised sm:inline-flex"
              style={{ animationDelay: '-2.5s' }}
            >
              <Globe aria-hidden className="size-4 text-brand" />
              {t('hero.sourcingChip')}
            </div>
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl bg-tile lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.key}
            className={`flex flex-col-reverse gap-1 px-6 py-6 ${index > 0 ? 'lg:border-s lg:border-white' : ''} ${index % 2 === 1 ? 'border-s border-white lg:border-s' : ''} ${index < 2 ? 'max-lg:border-b max-lg:border-white' : ''}`}
          >
            <dt className="text-sm text-muted">{tStats(stat.key)}</dt>
            <dd className="font-display text-3xl font-bold text-ink tabular sm:text-4xl">
              <bdi>{stat.value}</bdi>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
