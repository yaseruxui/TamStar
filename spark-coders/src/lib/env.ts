import { z } from 'zod';

const isLocalHttp = (value: string) => /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(value);

const serverSchema = z.object({
  // HTTPS only; plain http is accepted for a localhost receiver outside production.
  CONTACT_WEBHOOK_URL: z
    .url()
    .refine((value) => value.startsWith('https://') || (process.env.NODE_ENV !== 'production' && isLocalHttp(value)), {
      message: 'CONTACT_WEBHOOK_URL must use https',
    })
    .optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('https://skodr.com'),
});

const emptyToUndefined = (value: string | undefined): string | undefined =>
  value === undefined || value.trim() === '' ? undefined : value;

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: emptyToUndefined(process.env.NEXT_PUBLIC_SITE_URL),
});

export function getServerEnv(): z.infer<typeof serverSchema> {
  return serverSchema.parse({
    CONTACT_WEBHOOK_URL: emptyToUndefined(process.env.CONTACT_WEBHOOK_URL),
  });
}

export const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
