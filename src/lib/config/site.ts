import type { Stat } from '@/types/domain';

/**
 * Verified company facts, taken from https://tamstar.com.sa (About, Services, Projects, Contact).
 * Anything not listed on the live site is intentionally absent.
 */
export const company = {
  legalNameEn: 'Tamstar Trading Est.',
  brandEn: 'TAMSTAR',
  email: 'info@tamstar.com.sa',
  phones: ['+966 13 857 5514', '+966 50 137 4790'],
  address: {
    street: '8287, 6th Street, Ar Rabi',
    city: 'Dammam',
    postalCode: '32241',
    region: 'Eastern Province',
    countryCode: 'SA',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=8287+6th+Street+Ar+Rabi+Dammam+32241+Saudi+Arabia',
  openingHours: { days: 'Sa-Th', opens: '08:30', closes: '17:30' },
} as const;

export const stats: readonly Stat[] = [
  { key: 'years', value: '6' },
  { key: 'projects', value: '30+' },
  { key: 'materials', value: '19K+' },
  { key: 'countries', value: '27' },
];
