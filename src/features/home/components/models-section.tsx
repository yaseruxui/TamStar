import { FileText, Handshake, Wallet, Warehouse, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/section-heading';

const MODELS: ReadonlyArray<{ key: 'bpa' | 'vmi' | 'finance' | 'local'; icon: LucideIcon; tone: string }> = [
  { key: 'bpa', icon: FileText, tone: 'bg-tint-200 text-navy' },
  { key: 'vmi', icon: Warehouse, tone: 'bg-success-soft text-success' },
  { key: 'finance', icon: Wallet, tone: 'bg-tint-200 text-link' },
  { key: 'local', icon: Handshake, tone: 'bg-brand-soft/50 text-brand-ink' },
];

export async function ModelsSection() {
  const t = await getTranslations('home.models');

  return (
    <section aria-labelledby="home-models" className="container-site py-16 sm:py-20">
      <SectionHeading id="home-models" eyebrow={t('eyebrow')} title={t('title')} description={t('body')} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map(({ key, icon: Icon, tone }) => (
          <li key={key} className="rounded-lg border border-line bg-surface p-5 shadow-card">
            <span aria-hidden className={`grid size-10 place-items-center rounded-md ${tone}`}>
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-md font-semibold">{t(`${key}.title`)}</h3>
            <p className="mt-1.5 text-sm leading-6">{t(`${key}.body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
