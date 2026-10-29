import { z } from 'zod';
import { emailField, optionalText, phoneField, requiredText } from '@/lib/validation/fields';

export const careerPositions = ['sales', 'purchase', 'accounting', 'logistics', 'warehouse', 'other'] as const;

export const applicationSchema = z.object({
  name: requiredText(120),
  email: emailField,
  phone: phoneField,
  position: z.enum(careerPositions, 'required'),
  message: optionalText(3000),
});

export type ApplicationSubmission = z.infer<typeof applicationSchema>;
