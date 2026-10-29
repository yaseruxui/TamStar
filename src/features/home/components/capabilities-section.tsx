import { FileText, Handshake, Wallet, Warehouse, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/section-heading';

const MODELS: ReadonlyArray<{ key: 'bpa' | 'vmi' | 'finance' | 'local'; icon: LucideIcon }> = [
  { key: 'bpa', icon: FileText },
  { key: 'vmi', icon: Warehouse },
  { key: 'finance', icon: Wallet },
  { key: 'local', icon: Handshake },
];

export async function CapabilitiesSection() {
  const t = await getTranslations('home.models');

  return (
    <section aria-labelledby="home-capabilities" className="container-site pb-14 sm:pb-20">
      <SectionHeading id="home-capabilities" eyebrow={t('eyebrow')} title={t('title')} description={t('body')} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map(({ key, icon: Icon }) => (
          <li key={key} className="rounded-xl border border-line bg-surface p-7 transition-shadow hover:shadow-card">
            <span className="grid size-14 place-items-center rounded-lg bg-tile text-brand-hover">
              <Icon aria-hidden className="size-6" />
            </span>
            <h3 className="mt-6 text-lg">{t(`${key}.title`)}</h3>
            <p className="mt-2 text-sm leading-6">{t(`${key}.body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
