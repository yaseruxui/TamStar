'use server';

import { getLocale } from 'next-intl/server';
import { isLikelySpam, readString, toFieldErrors } from '@/lib/validation/form-data';
import { deliverInquiry } from '@/services/inquiry-delivery';
import type { FormState } from '@/types/forms';
import { createReference } from '@/utils/reference';
import { contactSchema } from '../schemas/contact';

export async function submitContact(_previous: FormState<string>, formData: FormData): Promise<FormState<string>> {
  const reference = createReference('MSG');
  if (isLikelySpam(formData)) return { status: 'success', reference };

  const parsed = contactSchema.safeParse({
    name: readString(formData, 'name'),
    email: readString(formData, 'email'),
    phone: readString(formData, 'phone'),
    topic: readString(formData, 'topic'),
    message: readString(formData, 'message'),
  });
  if (!parsed.success) return { status: 'invalid', errors: toFieldErrors(parsed.error) };

  const result = await deliverInquiry({
    kind: 'contact',
    reference,
    locale: await getLocale(),
    submittedAt: new Date().toISOString(),
    payload: parsed.data,
  });

  if (result === 'sent') return { status: 'success', reference };
  return { status: result === 'unavailable' ? 'unavailable' : 'error' };
}
