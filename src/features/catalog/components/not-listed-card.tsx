import { PackageSearch } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';
import { cn } from '@/utils/cn';

export async function NotListedCard({ className }: { className?: string }) {
  const t = await getTranslations('catalog');
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-dashed border-navy-600/30 bg-tint-50 p-6 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-surface text-navy shadow-card">
          <PackageSearch aria-hidden className="size-5" />
        </span>
        <div>
          <h2 className="text-md font-semibold">{t('notListed')}</h2>
          <p className="mt-1 text-sm">{t('notListedBody')}</p>
        </div>
      </div>
      <ButtonLink href="/rfq" variant="navy" className="shrink-0">
        {t('notListedCta')}
      </ButtonLink>
    </div>
  );
}
