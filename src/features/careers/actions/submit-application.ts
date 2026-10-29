'use server';

import { getLocale } from 'next-intl/server';
import { CV_EXTENSIONS, CV_LIMITS, validateAttachments } from '@/lib/validation/attachments';
import { isLikelySpam, readFiles, readString, toFieldErrors } from '@/lib/validation/form-data';
import { deliverInquiry } from '@/services/inquiry-delivery';
import type { FormState } from '@/types/forms';
import { createReference } from '@/utils/reference';
import { applicationSchema } from '../schemas/application';

export async function submitApplication(_previous: FormState<string>, formData: FormData): Promise<FormState<string>> {
  const reference = createReference('JOB');
  if (isLikelySpam(formData)) return { status: 'success', reference };

  const parsed = applicationSchema.safeParse({
    name: readString(formData, 'name'),
    email: readString(formData, 'email'),
    phone: readString(formData, 'phone'),
    position: readString(formData, 'position'),
    message: readString(formData, 'message'),
  });
  const cv = readFiles(formData, 'cv');
  const cvError = validateAttachments(cv, CV_EXTENSIONS, CV_LIMITS);

  const errors = parsed.success ? {} : toFieldErrors(parsed.error);
  if (cvError) errors.cv = cvError;
  if (!parsed.success || cvError) return { status: 'invalid', errors };

  const result = await deliverInquiry(
    {
      kind: 'career',
      reference,
      locale: await getLocale(),
      submittedAt: new Date().toISOString(),
      payload: parsed.data,
    },
    cv,
  );

  if (result === 'sent') return { status: 'success', reference };
  return { status: result === 'unavailable' ? 'unavailable' : 'error' };
}
