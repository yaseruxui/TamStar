import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { routing } from '@/lib/i18n/routing';

export const alt = 'TAMSTAR — Industrial procurement & supply, Dammam, Saudi Arabia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Latin-only copy: the bilingual wordmark is part of the logo image (Satori cannot shape Arabic). */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/brand/tamstar-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#ffffff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, flex: 1 }}>
        <img src={logoSrc} width={440} height={150} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#101c2a', lineHeight: 1.15 }}>
            Industrial procurement & supply
          </div>
          <div style={{ fontSize: 30, color: '#424750', marginTop: 20 }}>
            Sourcing from 27 countries · Dammam, Saudi Arabia
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: 28, background: '#fc9025' }} />
      <div style={{ display: 'flex', width: 120, background: '#002d59' }} />
    </div>,
    size,
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
