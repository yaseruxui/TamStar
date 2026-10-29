'use client';

import { RotateCcw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-site flex flex-col items-center py-24 text-center">
      <span className="grid size-14 place-items-center rounded-lg bg-danger-soft text-danger">
        <TriangleAlert aria-hidden className="size-7" />
      </span>
      <h1 className="mt-6 text-2xl font-bold">{t('error.title')}</h1>
      <p className="mt-2 max-w-md text-base">{t('error.body')}</p>
      {error.digest ? <p className="mt-2 font-mono text-xs text-muted">{error.digest}</p> : null}
      <Button variant="navy" className="mt-8" onClick={reset}>
        <RotateCcw aria-hidden />
        {t('tryAgain')}
      </Button>
    </div>
  );
}
