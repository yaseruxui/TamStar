import { Award, Flag, Handshake, HeartHandshake, Repeat, type LucideIcon } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { values } from '../data/values';

const icons: Record<string, LucideIcon> = {
  quality: Award,
  integrity: Handshake,
  commitment: HeartHandshake,
  patriotic: Flag,
  improvement: Repeat,
};

export async function ValuesGrid() {
  const locale = await getLocale();
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
      {values.map((value) => {
        const Icon = icons[value.key] ?? Award;
        return (
          <li key={value.key} className="bg-surface p-5">
            <Icon aria-hidden className="size-6 text-brand" strokeWidth={1.75} />
            <h3 className="mt-4 text-md font-semibold">{value.title[locale]}</h3>
            <p className="mt-1.5 text-sm leading-6">{value.body[locale]}</p>
          </li>
        );
      })}
    </ul>
  );
}
