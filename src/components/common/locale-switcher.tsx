'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      lang={target}
      aria-label={t('switchLocaleLabel')}
      className={cn('inline-flex items-center gap-1.5 font-medium hover:text-white', className)}
    >
      <Languages aria-hidden className="size-3.5" />
      {t('switchLocale')}
    </Link>
  );
}
