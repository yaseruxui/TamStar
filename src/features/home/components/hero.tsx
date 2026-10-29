import { ArrowLeft, ArrowRight, ClipboardList } from 'lucide-react';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';

export async function Hero() {
  const [t, locale] = await Promise.all([getTranslations('home'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="container-site pt-5 pb-3 sm:pt-6">
      <div className="relative isolate overflow-hidden rounded-xl bg-hero lg:min-h-[24rem]">
        <div className="relative z-10 flex flex-col p-6 sm:p-10 lg:max-w-[50%] lg:py-12">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-navy shadow-card">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 text-2xl leading-tight sm:text-[2.25rem] sm:leading-[1.3]">{t('hero.title')}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-body">{t('hero.lead')}</p>
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
          width={1600}
          height={980}
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="relative -mt-2 w-full [mask-image:radial-gradient(ellipse_72%_70%_at_50%_55%,#000_62%,transparent_100%)] lg:absolute lg:end-[-2%] lg:bottom-0 lg:mt-0 lg:h-[94%] lg:w-[55%] lg:object-contain lg:object-bottom rtl:lg:-scale-x-100"
        />
      </div>
    </section>
  );
}
