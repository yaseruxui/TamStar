import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TAMSTAR — نجم تام',
    short_name: 'TAMSTAR',
    start_url: '/ar',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#002d59',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
