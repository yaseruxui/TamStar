export const interestKeys = ['website', 'store', 'app', 'branding', 'seo', 'ai'] as const;
export type InterestKey = (typeof interestKeys)[number];

/** Result of a form server action, rendered by the client form. */
export type FormStatus =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'invalid'; fields: readonly string[] }
  | { status: 'unconfigured' }
  | { status: 'failed' };

export const initialFormStatus: FormStatus = { status: 'idle' };
