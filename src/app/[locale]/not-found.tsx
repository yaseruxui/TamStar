import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';

export default async function NotFound() {
  const [t, locale] = await Promise.all([getTranslations('common'), getLocale()]);
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="container-site flex flex-col items-center py-24 text-center">
      <p className="font-mono text-sm font-semibold text-brand-ink">{t('notFound.eyebrow')}</p>
      <h1 className="mt-3 text-3xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-base">{t('notFound.body')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="navy">
          {t('backHome')}
        </ButtonLink>
        <ButtonLink href="/catalog" variant="outline">
          {t('viewAll')}
          <Arrow aria-hidden />
        </ButtonLink>
      </div>
    </div>
  );
}
