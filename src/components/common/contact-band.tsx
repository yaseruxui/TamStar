import { Headset, Mail, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { company } from '@/lib/config/site';
import { toMailHref, toTelHref } from '@/utils/format';

export async function ContactBand() {
  const t = await getTranslations('common.contactBand');
  const [primaryPhone] = company.phones;

  return (
    <section className="container-site pb-14 sm:pb-20">
      <div className="flex flex-col gap-6 rounded-2xl bg-sand p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface text-brand-hover shadow-card">
            <Headset aria-hidden className="size-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-hover">{t('eyebrow')}</p>
            <h2 className="mt-1 text-xl sm:text-2xl">{t('title')}</h2>
            <p className="mt-1.5 text-sm text-muted">{t('body')}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={toTelHref(primaryPhone)}
            className="inline-flex h-13 items-center gap-2.5 rounded-full bg-surface px-6 text-sm font-bold text-ink shadow-card hover:shadow-hover"
          >
            <Phone aria-hidden className="size-4 text-brand-hover" />
            <span className="sr-only">{t('call')}: </span>
            <span dir="ltr" className="tabular">
              {primaryPhone}
            </span>
          </a>
          <a
            href={toMailHref(company.email)}
            className="inline-flex h-13 items-center gap-2.5 rounded-full bg-navy-950 px-6 text-sm font-bold text-white hover:bg-navy"
          >
            <Mail aria-hidden className="size-4" />
            {t('email')}
          </a>
        </div>
      </div>
    </section>
  );
}
