import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FileSpreadsheet,
  Headset,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { Link } from '@/lib/i18n/navigation';
import { company } from '@/lib/config/site';
import { cn } from '@/utils/cn';
import { toTelHref } from '@/utils/format';

interface PromoProps {
  href: string;
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
  arrow: LucideIcon;
  tone: 'navy' | 'brand';
}

function Promo({ href, icon: Icon, title, body, cta, arrow: Arrow, tone }: PromoProps) {
  const navy = tone === 'navy';
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-start gap-4 rounded-xl p-4 transition-colors',
        navy ? 'bg-navy text-navy-on hover:bg-navy-700' : 'bg-brand text-navy-950 hover:bg-brand-hover',
      )}
    >
      <span
        className={cn(
          'grid size-10 shrink-0 place-items-center rounded-md',
          navy ? 'bg-white/10 text-brand' : 'bg-white/30',
        )}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <span className="min-w-0">
        <span className={cn('block font-display text-md', navy && 'text-white')}>{title}</span>
        <span className={cn('mt-1 block text-sm leading-6', !navy && 'text-navy-950/80')}>{body}</span>
        <span className={cn('mt-2 inline-flex items-center gap-1.5 text-sm font-semibold', navy && 'text-brand')}>
          {cta}
          <Arrow
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          />
        </span>
      </span>
    </Link>
  );
}

export async function Hero() {
  const [t, tCommon, locale] = await Promise.all([getTranslations('home'), getTranslations('common'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="container-site pt-5 pb-3 sm:pt-6">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="relative isolate overflow-hidden rounded-xl bg-hero lg:col-span-9 lg:min-h-[23rem]">
          <div className="relative z-10 flex flex-col p-6 sm:p-9 lg:max-w-[52%]">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-navy shadow-card">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              {t('hero.eyebrow')}
            </p>
            <h1 className="mt-4 text-2xl leading-tight sm:text-[2rem] sm:leading-[1.3]">{t('hero.title')}</h1>
            <p className="mt-3 text-base leading-7 text-body">{t('hero.lead')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
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
          <Image
            src="/products/hero.webp"
            alt=""
            width={1600}
            height={980}
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="relative -mt-2 w-full lg:absolute lg:end-[-3%] lg:bottom-0 lg:mt-0 lg:h-[92%] lg:w-[56%] lg:object-contain lg:object-bottom rtl:lg:-scale-x-100"
          />
        </div>

        <div className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
          <Promo
            href="/account"
            icon={UserRound}
            title={t('promos.account.title')}
            body={t('promos.account.body')}
            cta={t('promos.account.cta')}
            arrow={Arrow}
            tone="navy"
          />
          <Promo
            href="/rfq"
            icon={FileSpreadsheet}
            title={t('promos.boq.title')}
            body={t('promos.boq.body')}
            cta={t('promos.boq.cta')}
            arrow={Arrow}
            tone="brand"
          />
          <a
            href={toTelHref(company.phones[0])}
            className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-navy sm:col-span-2 lg:col-span-1"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-tint-100 text-navy">
              <Headset aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted">{tCommon('contactBand.eyebrow')}</span>
              <span dir="ltr" className="block font-display text-md text-ink tabular">
                {company.phones[0]}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
