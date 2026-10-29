import { getLocale } from 'next-intl/server';
import { StarMark } from '@/components/illustrations/star-mark';
import { clients } from '../data/projects';

/** Infinite wordmark ticker; the list is duplicated once so the loop is seamless (copy is aria-hidden). */
export async function ClientsMarquee({ label }: { label: string }) {
  const locale = await getLocale();
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pe-10">
      {clients.map((client) => (
        <li key={client.key} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-xl font-medium text-white/85">{client.name[locale]}</span>
          <StarMark />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="overflow-hidden bg-navy-950 py-6">
      <div className="container-site mb-4">
        <p className="label-tech text-navy-on/70">{label}</p>
      </div>
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none rtl:[--marquee-shift:50%]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
