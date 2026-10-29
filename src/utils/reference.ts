const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Human-friendly reference such as `RFQ-261029-7KQ4`, safe to read over the phone. */
export function createReference(prefix: string, now: Date = new Date()): string {
  const date = now.toISOString().slice(2, 10).replace(/-/g, '');
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('');
  return `${prefix}-${date}-${suffix}`;
}
