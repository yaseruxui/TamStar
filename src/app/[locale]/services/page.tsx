import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBand } from '@/components/common/contact-band';
import { PageHeader } from '@/components/common/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { ServiceIcon } from '@/features/company/components/service-icon';
import { capabilityGroups, coreServices } from '@/features/company/data/services';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/services',
    title: t('services.title'),
    description: t('services.description'),
    siteName: t('siteName'),
  });
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('eyebrow') }]} />

      <section aria-labelledby="core-services" className="container-site py-12 sm:py-16">
        <h2 id="core-services" className="text-xl font-bold sm:text-2xl">
          {t('coreTitle')}
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {coreServices.map((service) => (
            <li
              key={service.key}
              className="flex gap-4 rounded-lg border border-line bg-surface p-5 shadow-card sm:p-6"
            >
              <ServiceIcon icon={service.icon} />
              <div>
                <h3 className="text-md font-semibold">{service.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-6">{service.body[locale]}</p>
                {service.points.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {service.points.map((point) => (
                      <li key={point.en} className="rounded-xs bg-tint-100 px-2 py-0.5 text-xs font-medium text-navy">
                        {point[locale]}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl border-s-2 border-brand ps-4 text-base leading-7 text-ink">{t('trustedBy')}</p>
      </section>

      <section aria-labelledby="capabilities" className="border-t border-line bg-surface">
        <div className="container-site py-16">
          <SectionHeading id="capabilities" eyebrow={t('capabilitiesEyebrow')} title={t('capabilitiesTitle')} />
          <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
            {capabilityGroups.map((group, index) => (
              <article key={group.key} className="border-t border-line pt-6">
                <p className="tabular font-mono text-xs font-semibold text-muted">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{group.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-6">{group.intro[locale]}</p>
                <dl className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <div key={item.title.en} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                      <div className="text-sm">
                        <dt className="inline font-semibold text-ink">{item.title[locale]}</dt>
                        <dd className="inline text-body"> — {item.body[locale]}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
