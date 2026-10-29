import { Headset, Mail, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { company } from '@/lib/config/site';
import { toMailHref, toTelHref } from '@/utils/format';

export async function ContactBand() {
  const t = await getTranslations('common.contactBand');
  const [primaryPhone] = company.phones;

  return (
    <section className="bg-sand">
      <div className="container-site flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-navy text-white">
            <Headset aria-hidden className="size-7" />
          </span>
          <div>
            <p className="text-xs font-semibold text-brand-ink">{t('eyebrow')}</p>
            <h2 className="mt-1 text-lg font-bold sm:text-xl">{t('title')}</h2>
            <p className="mt-1 text-sm">{t('body')}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={toTelHref(primaryPhone)}
            className="inline-flex h-12 items-center gap-2.5 rounded-sm border border-line bg-surface px-5 text-sm font-semibold text-navy hover:border-navy-600"
          >
            <Phone aria-hidden className="size-4 text-brand" />
            <span className="sr-only">{t('call')}: </span>
            <span dir="ltr" className="tabular">
              {primaryPhone}
            </span>
          </a>
          <a
            href={toMailHref(company.email)}
            className="inline-flex h-12 items-center gap-2.5 rounded-sm bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-700"
          >
            <Mail aria-hidden className="size-4" />
            {t('email')}
          </a>
        </div>
      </div>
    </section>
  );
}
