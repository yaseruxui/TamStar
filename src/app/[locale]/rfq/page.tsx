import { Clock, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientMessages } from '@/components/common/client-messages';
import { PageHeader } from '@/components/common/page-header';
import { getCategories, getItemsByCategory } from '@/features/catalog/services/catalog';
import type { CatalogOption } from '@/features/rfq/components/rfq-form';
import { RfqFormLoader } from '@/features/rfq/components/rfq-form-loader';
import { company } from '@/lib/config/site';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { rfqStatuses } from '@/types/domain';
import { toMailHref, toTelHref } from '@/utils/format';

export async function generateMetadata({ params }: PageProps<'/[locale]/rfq'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/rfq',
    title: t('rfq.title'),
    description: t('rfq.description'),
    siteName: t('siteName'),
  });
}

export default async function RfqPage({ params }: PageProps<'/[locale]/rfq'>) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const [t, tCommon] = await Promise.all([getTranslations('rfq'), getTranslations('common')]);

  const catalog: Record<string, CatalogOption> = {};
  for (const category of getCategories()) {
    for (const item of getItemsByCategory(category.slug)) {
      catalog[`${item.category}/${item.slug}`] = { name: item.name[locale], unit: item.unit };
    }
  }
  // Statuses after submission are tracked in the customer portal (phase 1b); shown here so buyers know the flow.
  const flow = rfqStatuses.filter((status) => status !== 'rejected');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('title') }]} />
      <div className="container-site grid gap-8 py-10 lg:grid-cols-[1fr_20rem]">
        <ClientMessages namespaces={['catalog', 'rfq', 'forms']}>
          <RfqFormLoader catalog={catalog} />
        </ClientMessages>
        <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <ol className="flex flex-col gap-3">
              {flow.map((status, index) => (
                <li key={status} className="flex items-center gap-3 text-sm">
                  <span
                    className={
                      index === 0
                        ? 'tabular grid size-6 place-items-center rounded-full bg-brand text-2xs font-bold text-white'
                        : 'tabular grid size-6 place-items-center rounded-full bg-tint-200 text-2xs font-bold text-navy'
                    }
                  >
                    {index + 1}
                  </span>
                  <span className={index === 0 ? 'font-semibold text-ink' : undefined}>{t(`status.${status}`)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg bg-navy p-5 text-sm text-navy-on">
            <p className="font-semibold text-white">{tCommon('contactBand.eyebrow')}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {company.phones.map((phone) => (
                <li key={phone}>
                  <a href={toTelHref(phone)} className="inline-flex items-center gap-2 hover:text-white">
                    <Phone aria-hidden className="size-4 text-brand" />
                    <span dir="ltr" className="tabular">
                      {phone}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={toMailHref(company.email, 'RFQ')} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail aria-hidden className="size-4 text-brand" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock aria-hidden className="size-4 text-brand" />
                {tCommon('officeHoursShort')}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
