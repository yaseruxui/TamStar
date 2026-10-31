'use client';

import { useTranslations } from 'next-intl';

/** Client-side so it reads the provider's messages and keeps the locale pages statically rendered. */
export default function Loading() {
  const t = useTranslations('common');
  return (
    <div role="status" className="container-site grid min-h-svh place-items-center">
      <span className="sr-only">{t('loading')}</span>
      <span
        aria-hidden="true"
        className="size-10 animate-spin rounded-full border-2 border-line-strong border-t-aqua"
      />
    </div>
  );
}
