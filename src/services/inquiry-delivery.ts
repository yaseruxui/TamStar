import 'server-only';
import { getServerEnv } from '@/lib/env';

export type InquiryKind = 'rfq' | 'contact' | 'career';

export interface InquiryEnvelope<TPayload> {
  kind: InquiryKind;
  reference: string;
  locale: string;
  submittedAt: string;
  payload: TPayload;
}

export type DeliveryResult = 'sent' | 'unavailable' | 'failed';

/**
 * Forwards a submission to the configured intake endpoint as multipart/form-data:
 * `envelope` (JSON) plus each file under `attachments`. The endpoint can be a CRM,
 * an automation hook or, later, the platform's RFQ service backed by Odoo.
 */
export async function deliverInquiry<TPayload>(
  envelope: InquiryEnvelope<TPayload>,
  files: readonly File[] = [],
): Promise<DeliveryResult> {
  const { INQUIRY_WEBHOOK_URL } = getServerEnv();
  if (!INQUIRY_WEBHOOK_URL) return 'unavailable';

  const body = new FormData();
  body.set('envelope', JSON.stringify(envelope));
  for (const file of files) body.append('attachments', file, file.name);

  try {
    const response = await fetch(INQUIRY_WEBHOOK_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
      headers: { 'X-Tamstar-Reference': envelope.reference, 'X-Tamstar-Kind': envelope.kind },
    });
    if (!response.ok) {
      console.error(`[inquiry] ${envelope.kind} ${envelope.reference} rejected with HTTP ${response.status}`);
      return 'failed';
    }
    return 'sent';
  } catch (error) {
    console.error(`[inquiry] ${envelope.kind} ${envelope.reference} delivery failed`, error);
    return 'failed';
  }
}
