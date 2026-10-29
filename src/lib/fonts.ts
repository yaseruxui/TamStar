import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-plex-arabic',
  preload: true,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
  preload: false,
});
