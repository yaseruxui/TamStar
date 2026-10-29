import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientMessages } from '@/components/common/client-messages';
import { PageHeader } from '@/components/common/page-header';
import { JsonLdScript } from '@/components/seo/json-ld';
import { ContactForm } from '@/features/contact/components/contact-form';
import { company } from '@/lib/config/site';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { localBusinessJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { toMailHref, toTelHref } from '@/utils/format';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/contact',
    title: t('contact.title'),
    description: t('contact.description'),
    siteName: t('siteName'),
  });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const [t, tCommon] = await Promise.all([getTranslations('contact'), getTranslations('common')]);

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('eyebrow') }]} />
      <div className="container-site grid gap-8 py-10 lg:grid-cols-[22rem_1fr]">
        <aside className="flex flex-col gap-4">
          <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <MapPin aria-hidden className="size-4 text-brand" />
              {tCommon('address')}
            </h2>
            <address className="mt-3 text-base not-italic leading-7">
              {tCommon('addressLine1')}
              <br />
              {tCommon('addressLine2')}
            </address>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-link hover:underline"
            >
              {tCommon('openInMaps')}
            </a>
          </div>
          <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Phone aria-hidden className="size-4 text-brand" />
              {t('callUs')}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {company.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={toTelHref(phone)}
                    dir="ltr"
                    className="tabular text-md font-semibold text-navy hover:underline"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Mail aria-hidden className="size-4 text-brand" />
              {t('emailUs')}
            </h2>
            <a
              href={toMailHref(company.email)}
              className="mt-3 inline-flex text-md font-semibold text-navy hover:underline"
            >
              {company.email}
            </a>
          </div>
          <div className="rounded-lg bg-navy p-5 text-navy-on">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Clock aria-hidden className="size-4 text-brand" />
              {tCommon('officeHours')}
            </h2>
            <p className="mt-3 text-base">
              {tCommon('officeHoursDays')}
              <br />
              {tCommon('officeHoursTime')}
            </p>
          </div>
        </aside>
        <section
          aria-labelledby="contact-form"
          className="rounded-lg border border-line bg-surface p-5 shadow-card sm:p-8"
        >
          <h2 id="contact-form" className="mb-6 text-xl font-bold">
            {t('formTitle')}
          </h2>
          <ClientMessages namespaces={['contact', 'forms']}>
            <ContactForm />
          </ClientMessages>
        </section>
      </div>
      <JsonLdScript data={localBusinessJsonLd(locale, tCommon('brand'))} />
    </>
  );
}
