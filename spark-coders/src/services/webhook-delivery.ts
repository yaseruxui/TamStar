import 'server-only';
import { getServerEnv } from '@/lib/env';

export type DeliveryResult = 'delivered' | 'unconfigured' | 'failed';

/** POSTs a JSON envelope to the configured webhook. Never throws. */
export async function deliverToWebhook(kind: 'contact' | 'guide', payload: object): Promise<DeliveryResult> {
  const { CONTACT_WEBHOOK_URL } = getServerEnv();
  if (!CONTACT_WEBHOOK_URL) return 'unconfigured';

  try {
    const response = await fetch(CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), payload }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    return response.ok ? 'delivered' : 'failed';
  } catch {
    return 'failed';
  }
}
