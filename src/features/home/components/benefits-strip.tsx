import { BadgePercent, Globe, Handshake, Warehouse, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const BENEFITS: ReadonlyArray<{ key: 'sourcing' | 'contract' | 'models' | 'local'; icon: LucideIcon }> = [
  { key: 'sourcing', icon: Globe },
  { key: 'contract', icon: BadgePercent },
  { key: 'models', icon: Warehouse },
  { key: 'local', icon: Handshake },
];

export async function BenefitsStrip() {
  const t = await getTranslations('home.benefits');
  return (
    <section className="container-site py-4">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
        {BENEFITS.map(({ key, icon: Icon }) => (
          <li key={key} className="flex items-center gap-3 bg-surface p-4 sm:p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tint-100 text-navy">
              <Icon aria-hidden className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{t(`${key}.title`)}</span>
              <span className="mt-0.5 block text-xs text-muted">{t(`${key}.body`)}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
