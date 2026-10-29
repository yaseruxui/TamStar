import { ArrowLeft, ArrowRight, ClipboardList, FileSpreadsheet, UserRound } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { Link } from '@/lib/i18n/navigation';

export async function Hero() {
  const [t, locale] = await Promise.all([getTranslations('home'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="container-site pt-6 pb-4 sm:pt-8">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="relative isolate overflow-hidden rounded-xl bg-[radial-gradient(120%_120%_at_85%_20%,#ffffff_0%,#eef2f8_45%,#e3e9f2_100%)] lg:col-span-8">
          <div className="relative z-10 flex flex-col p-6 sm:p-10 lg:max-w-[58%] lg:py-14">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-navy shadow-card">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              {t('hero.eyebrow')}
            </p>
            <h1 className="mt-5 text-2xl leading-tight sm:text-4xl sm:leading-[1.2]">{t('hero.title')}</h1>
            <p className="mt-4 text-base leading-7 text-body sm:text-md">{t('hero.lead')}</p>
            <div className="mt-7 flex flex-wrap gap-3">
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
            width={1800}
            height={1100}
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="relative -mt-4 w-full lg:absolute lg:inset-y-0 lg:end-[-6%] lg:mt-0 lg:h-full lg:w-[72%] lg:object-contain lg:object-bottom rtl:lg:-scale-x-100"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <Link
            href="/account"
            className="group flex flex-col justify-between rounded-xl bg-navy p-6 text-navy-on transition-colors hover:bg-navy-700"
          >
            <span className="grid size-11 place-items-center rounded-md bg-white/10 text-brand">
              <UserRound aria-hidden className="size-5" />
            </span>
            <span className="mt-6 block">
              <span className="block font-display text-lg text-white">{t('promos.account.title')}</span>
              <span className="mt-1.5 block text-sm leading-6">{t('promos.account.body')}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                {t('promos.account.cta')}
                <Arrow
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                />
              </span>
            </span>
          </Link>
          <Link
            href="/rfq"
            className="group flex flex-col justify-between rounded-xl bg-brand p-6 text-navy-950 transition-colors hover:bg-brand-hover"
          >
            <span className="grid size-11 place-items-center rounded-md bg-white/30">
              <FileSpreadsheet aria-hidden className="size-5" />
            </span>
            <span className="mt-6 block">
              <span className="block font-display text-lg">{t('promos.boq.title')}</span>
              <span className="mt-1.5 block text-sm leading-6 text-navy-950/80">{t('promos.boq.body')}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                {t('promos.boq.cta')}
                <Arrow
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
