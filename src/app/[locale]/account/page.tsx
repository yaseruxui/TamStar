import { Building, ShoppingCart, UserPlus, UsersRound, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientMessages } from '@/components/common/client-messages';
import { PageHeader } from '@/components/common/page-header';
import { ContactForm } from '@/features/contact/components/contact-form';
import { resolveLocale } from '@/lib/i18n/resolve-locale';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/account'>): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    pathname: '/account',
    title: t('account.title'),
    description: t('account.description'),
    siteName: t('siteName'),
  });
}

const STEPS: ReadonlyArray<{ key: 'create' | 'invite' | 'team' | 'buy'; icon: LucideIcon }> = [
  { key: 'create', icon: Building },
  { key: 'invite', icon: UserPlus },
  { key: 'team', icon: UsersRound },
  { key: 'buy', icon: ShoppingCart },
];

export default async function AccountPage({ params }: PageProps<'/[locale]/account'>) {
  setRequestLocale(resolveLocale((await params).locale));
  const t = await getTranslations('account');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: t('eyebrow') }]} />
      <div className="container-site grid gap-8 py-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ol className="grid gap-3">
            {STEPS.map(({ key, icon: Icon }, index) => (
              <li key={key} className="flex gap-4 rounded-lg border border-line bg-surface p-5 shadow-card">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tint-100 text-navy">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted tabular">{index + 1}</p>
                  <h2 className="text-md">{t(`steps.${key}.title`)}</h2>
                  <p className="mt-1 text-sm leading-6">{t(`steps.${key}.body`)}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-lg bg-sand p-5">
            <h2 className="text-md">{t('signInTitle')}</h2>
            <p className="mt-1.5 text-sm leading-6">{t('signInBody')}</p>
          </div>
        </div>
        <section
          aria-labelledby="account-request"
          className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-8 lg:col-span-7"
        >
          <h2 id="account-request" className="text-xl">
            {t('requestTitle')}
          </h2>
          <p className="mt-2 mb-6 text-base text-muted">{t('requestLead')}</p>
          <ClientMessages namespaces={['contact', 'forms']}>
            <ContactForm defaultTopic="account" />
          </ClientMessages>
        </section>
      </div>
    </>
  );
}
