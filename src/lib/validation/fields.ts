import { z } from 'zod';

/** Reusable field rules. Messages are translation keys under `forms.errors`. */
export const requiredText = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong');
export const optionalText = (max: number) => z.string().trim().max(max, 'tooLong');
export const emailField = z.string().trim().min(1, 'required').max(200, 'tooLong').pipe(z.email('email'));
export const phoneField = z
  .string()
  .trim()
  .min(1, 'required')
  .regex(/^\+?[\d\s()-]{7,20}$/, 'phone');
export const optionalPhoneField = z
  .string()
  .trim()
  .regex(/^(\+?[\d\s()-]{7,20})?$/, 'phone');
