import { Alexandria, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';

/** Display face — geometric Arabic/Latin that echoes the TAMSTAR wordmark. Variable: one file per subset. */
export const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-alexandria',
  preload: true,
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-plex-arabic',
  preload: true,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
  preload: false,
});
