'use client';

import { ClipboardList } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import { useRfqBasket } from '../hooks/use-rfq-basket';

export function RfqBasketLink({ className }: { className?: string }) {
  const t = useTranslations('navigation');
  const count = useRfqBasket().length;

  return (
    <Link
      href="/rfq"
      aria-label={`${t('rfq')} — ${t('rfqBasketCount', { count })}`}
      className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'h-11 gap-2.5', className)}
    >
      <ClipboardList aria-hidden />
      <span className="hidden sm:inline">{t('rfq')}</span>
      <span
        aria-hidden
        className="tabular grid min-w-5 place-items-center rounded-full bg-navy-950 px-1.5 text-2xs leading-5 text-white"
      >
        {count}
      </span>
    </Link>
  );
}
