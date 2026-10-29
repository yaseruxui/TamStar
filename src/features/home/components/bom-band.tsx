import { FileSpreadsheet, FileUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/button-link';

export async function BomBand() {
  const t = await getTranslations('home.bom');

  return (
    <section className="container-site py-12">
      <div className="flex flex-col gap-6 rounded-lg bg-navy p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-md bg-white/10 text-brand">
            <FileSpreadsheet aria-hidden className="size-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">{t('title')}</h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-navy-on">{t('body')}</p>
          </div>
        </div>
        <ButtonLink href="/rfq" size="lg" className="shrink-0">
          <FileUp aria-hidden />
          {t('cta')}
        </ButtonLink>
      </div>
    </section>
  );
}
