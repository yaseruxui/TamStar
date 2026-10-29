import { z } from 'zod';
import { emailField, optionalPhoneField, requiredText } from '@/lib/validation/fields';

export const inquiryTopics = ['account', 'rfq', 'product', 'supplier', 'other'] as const;

export type InquiryTopicKey = (typeof inquiryTopics)[number];

export const contactSchema = z.object({
  name: requiredText(120),
  email: emailField,
  phone: optionalPhoneField,
  topic: z.enum(inquiryTopics, 'required'),
  message: requiredText(3000),
});

export type ContactSubmission = z.infer<typeof contactSchema>;
