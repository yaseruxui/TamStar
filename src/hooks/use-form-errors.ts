'use client';

import { useTranslations } from 'next-intl';
import { isFormErrorKey } from '@/lib/validation/error-keys';
import type { FormState } from '@/types/forms';

/** Resolves server-side error keys for a field into translated messages. */
export function useFormErrors(state: FormState<string>) {
  const t = useTranslations('forms.errors');

  return (field: string): string | undefined => {
    const key = state.status === 'invalid' ? state.errors[field] : undefined;
    if (key === undefined) return undefined;
    return isFormErrorKey(key) ? t(key) : t('required');
  };
}
