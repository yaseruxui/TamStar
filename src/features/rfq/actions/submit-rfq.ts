'use server';

import { getLocale } from 'next-intl/server';
import { ATTACHMENT_LIMITS, DOCUMENT_EXTENSIONS, validateAttachments } from '@/lib/validation/attachments';
import { isLikelySpam, readFiles, readString, toFieldErrors } from '@/lib/validation/form-data';
import { deliverInquiry } from '@/services/inquiry-delivery';
import type { RfqStatus } from '@/types/domain';
import type { FormState } from '@/types/forms';
import { createReference } from '@/utils/reference';
import { RFQ_MAX_LINES, rfqSchema, type RfqSubmission } from '../schemas/rfq';

const LINE_FIELD = /^lines\.(\d+)\.product$/;

function readLines(formData: FormData) {
  const indexes = new Set<number>();
  for (const key of formData.keys()) {
    const match = LINE_FIELD.exec(key);
    if (match?.[1]) indexes.add(Number(match[1]));
  }
  return [...indexes]
    .sort((a, b) => a - b)
    .slice(0, RFQ_MAX_LINES + 1)
    .map((index) => ({
      product: readString(formData, `lines.${index}.product`),
      specs: readString(formData, `lines.${index}.specs`),
      quantity: readString(formData, `lines.${index}.quantity`),
      unit: readString(formData, `lines.${index}.unit`),
      brand: readString(formData, `lines.${index}.brand`),
      catalogRef: readString(formData, `lines.${index}.catalogRef`),
    }));
}

export async function submitRfq(_previous: FormState<string>, formData: FormData): Promise<FormState<string>> {
  const reference = createReference('RFQ');
  if (isLikelySpam(formData)) return { status: 'success', reference };

  const parsed = rfqSchema.safeParse({
    lines: readLines(formData),
    deliveryLocation: readString(formData, 'deliveryLocation'),
    deliveryDate: readString(formData, 'deliveryDate'),
    notes: readString(formData, 'notes'),
    company: readString(formData, 'company'),
    name: readString(formData, 'name'),
    email: readString(formData, 'email'),
    phone: readString(formData, 'phone'),
  });

  const attachments = readFiles(formData, 'attachments');
  const attachmentError = validateAttachments(attachments, DOCUMENT_EXTENSIONS, ATTACHMENT_LIMITS);

  const errors = parsed.success ? {} : toFieldErrors(parsed.error);
  if (attachmentError) errors.attachments = attachmentError;
  if (parsed.success && parsed.data.lines.length === 0 && attachments.length === 0) errors.lines = 'lines';
  if (!parsed.success || Object.keys(errors).length > 0) return { status: 'invalid', errors };

  const status: RfqStatus = 'submitted';
  const result = await deliverInquiry<RfqSubmission & { status: RfqStatus }>(
    {
      kind: 'rfq',
      reference,
      locale: await getLocale(),
      submittedAt: new Date().toISOString(),
      payload: { ...parsed.data, status },
    },
    attachments,
  );

  if (result === 'sent') return { status: 'success', reference };
  return { status: result === 'unavailable' ? 'unavailable' : 'error' };
}
