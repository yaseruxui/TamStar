export const formErrorKeys = [
  'required',
  'email',
  'phone',
  'tooLong',
  'quantity',
  'date',
  'fileType',
  'fileSize',
  'fileCount',
  'lines',
] as const;

export type FormErrorKey = (typeof formErrorKeys)[number];

export function isFormErrorKey(value: string | undefined): value is FormErrorKey {
  return value !== undefined && (formErrorKeys as readonly string[]).includes(value);
}
