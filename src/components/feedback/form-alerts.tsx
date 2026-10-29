'use client';

import { useTranslations } from 'next-intl';
import type { FormState } from '@/types/forms';
import { FormStatus } from './form-status';

/** Form-level error banners shared by every inquiry form. */
export function FormAlerts({ state }: { state: FormState<string> }) {
  const t = useTranslations('forms.errors');
  switch (state.status) {
    case 'invalid':
      return <FormStatus tone="error">{t('invalidForm')}</FormStatus>;
    case 'unavailable':
      return <FormStatus tone="error">{t('unavailable')}</FormStatus>;
    case 'error':
      return <FormStatus tone="error">{t('server')}</FormStatus>;
    default:
      return null;
  }
}
