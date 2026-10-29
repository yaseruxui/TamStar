import { Clock, FileText, Handshake, MapPin, Ship, Truck, Wallet, Warehouse, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { company } from '@/lib/config/site';

const MODELS: ReadonlyArray<{ key: 'bpa' | 'vmi' | 'finance' | 'local'; icon: LucideIcon }> = [
  { key: 'bpa', icon: FileText },
  { key: 'vmi', icon: Warehouse },
  { key: 'finance', icon: Wallet },
  { key: 'local', icon: Handshake },
];

const LOGISTICS = [
  { key: 'freight', icon: Ship },
  { key: 'jit', icon: Clock },
  { key: 'cargo', icon: Truck },
] as const;

export async function CapabilitiesSection() {
  const [t, tLogistics, tCommon] = await Promise.all([
    getTranslations('home.models'),
    getTranslations('home.logistics'),
    getTranslations('common'),
  ]);

  return (
    <section aria-labelledby="home-capabilities" className="bg-navy-900 text-navy-on">
      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2 text-xs font-medium text-brand">
            <span aria-hidden className="h-px w-8 bg-brand" />
            {t('eyebrow')}
          </p>
          <h2 id="home-capabilities" className="mt-5 text-2xl leading-snug text-white sm:text-3xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-md text-md leading-8">{t('body')}</p>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="label-tech text-navy-on/70">{tLogistics('eyebrow')}</p>
            <p className="mt-3 font-display text-lg text-white">{tLogistics('title')}</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {LOGISTICS.map(({ key, icon: Icon }) => (
                <li key={key} className="flex items-center gap-3">
                  <Icon aria-hidden className="size-4 shrink-0 text-brand" />
                  {tLogistics(key)}
                </li>
              ))}
              <li>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white underline-offset-4 hover:underline"
                >
                  <MapPin aria-hidden className="size-4 shrink-0 text-brand" />
                  {tCommon('addressLine1')} · {tCommon('addressLine2')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-7">
          {MODELS.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="rounded-lg bg-white/[0.05] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]"
            >
              <Icon aria-hidden className="size-6 text-brand" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg text-white">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-6">{t(`${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
