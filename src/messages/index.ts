import type { Locale } from '@/lib/i18n/routing';
import type en from './en';

export type Messages = typeof en;

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  ar: () => import('./ar'),
  en: () => import('./en'),
};

export async function loadMessages(locale: Locale): Promise<Messages> {
  return (await loaders[locale]()).default;
}
