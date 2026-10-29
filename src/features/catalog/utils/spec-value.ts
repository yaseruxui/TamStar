import type { Locale } from '@/lib/i18n/routing';
import type { ItemSpec } from '../types';

export function specValue(spec: ItemSpec, locale: Locale): string {
  return typeof spec.value === 'string' ? spec.value : spec.value[locale];
}
