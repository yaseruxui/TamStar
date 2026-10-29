import { z } from 'zod';
import { unitsOfMeasure } from '@/features/catalog/types';
import { emailField, optionalText, phoneField, requiredText } from '@/lib/validation/fields';

export const RFQ_MAX_LINES = 50;

export const rfqLineSchema = z.object({
  product: requiredText(200),
  specs: optionalText(1000),
  quantity: z.coerce.number('quantity').positive('quantity').max(10_000_000, 'quantity'),
  unit: z.enum(unitsOfMeasure, 'required'),
  brand: optionalText(120),
  catalogRef: z
    .string()
    .regex(/^([a-z0-9-]+\/[a-z0-9-]+)?$/)
    .default(''),
});

const todayIso = (): string => new Date().toISOString().slice(0, 10);

export const rfqSchema = z.object({
  lines: z.array(rfqLineSchema).max(RFQ_MAX_LINES, 'tooLong'),
  deliveryLocation: requiredText(200),
  deliveryDate: z
    .string()
    .trim()
    .refine((value) => value === '' || (/^\d{4}-\d{2}-\d{2}$/.test(value) && value >= todayIso()), 'date'),
  notes: optionalText(3000),
  company: requiredText(150),
  name: requiredText(120),
  email: emailField,
  phone: phoneField,
});

export type RfqLine = z.infer<typeof rfqLineSchema>;
export type RfqSubmission = z.infer<typeof rfqSchema>;
export type RfqLineField = keyof RfqLine;
