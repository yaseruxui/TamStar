export type FieldErrors<TField extends string> = Partial<Record<TField, string>>;

export type FormState<TField extends string> =
  | { status: 'idle' }
  | { status: 'success'; reference: string }
  | { status: 'invalid'; errors: FieldErrors<TField> }
  | { status: 'unavailable' }
  | { status: 'error' };
