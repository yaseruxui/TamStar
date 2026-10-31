import { ImageResponse } from 'next/og';
import { routing } from '@/lib/i18n/routing';

export const alt = 'skodr — Spark Coders';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Brand card: the logo mark and wordmark on the dark gradient (Latin only, so no font fetch is needed). */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        background:
          'radial-gradient(60% 80% at 15% 20%, rgba(178,108,255,0.45), transparent 70%), radial-gradient(50% 70% at 85% 80%, rgba(12,142,199,0.4), transparent 70%), #07051A',
      }}
    >
      <svg width="260" height="260" viewBox="0 0 1024 1024">
        <path d="M38 15h28l26 585-40 145-40-40z" fill="#B26CFF" />
        <path d="M52 705 540 32" stroke="#6E29AC" strokeWidth="76" strokeLinecap="round" fill="none" />
        <path d="M565 50 42 958" stroke="#0C8EC7" strokeWidth="92" strokeLinecap="round" fill="none" />
        <path d="M52 972 494 516" stroke="#88EFFA" strokeWidth="94" strokeLinecap="round" fill="none" />
        <path d="M462 486c18-22 46-22 64-3l490 476c10 12-6 34-20 26L498 570z" fill="#A497FA" />
      </svg>
      <div style={{ display: 'flex', fontSize: 190, fontWeight: 800, color: '#F5F2FF', letterSpacing: -6 }}>skodr</div>
    </div>,
    size,
  );
}
