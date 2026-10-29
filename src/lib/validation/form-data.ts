import type { ZodError } from 'zod';
import type { FieldErrors } from '@/types/forms';

export function readString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

export function readFiles(formData: FormData, name: string): File[] {
  return formData.getAll(name).filter((value): value is File => value instanceof File && value.size > 0);
}

/** Zod issues carry translation keys as messages (see the schemas); map them by dotted field path. */
export function toFieldErrors(error: ZodError): FieldErrors<string> {
  const errors: FieldErrors<string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.') || 'form';
    errors[path] ??= issue.message;
  }
  return errors;
}

/** Honeypot: a visually hidden field real users never fill. */
export const HONEYPOT_FIELD = 'company_website';

export function isLikelySpam(formData: FormData): boolean {
  return readString(formData, HONEYPOT_FIELD).trim() !== '';
}
