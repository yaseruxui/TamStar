export const ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxFileBytes: 8 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
} as const;

export const CV_LIMITS = {
  maxFiles: 1,
  maxFileBytes: 5 * 1024 * 1024,
  maxTotalBytes: 5 * 1024 * 1024,
} as const;

export type AttachmentLimits = { maxFiles: number; maxFileBytes: number; maxTotalBytes: number };

export const DOCUMENT_EXTENSIONS = [
  'pdf',
  'xlsx',
  'xls',
  'csv',
  'doc',
  'docx',
  'dwg',
  'dxf',
  'png',
  'jpg',
  'jpeg',
  'zip',
] as const;
export const CV_EXTENSIONS = ['pdf', 'doc', 'docx'] as const;

export type AttachmentError = 'fileType' | 'fileSize' | 'fileCount';

interface FileLike {
  name: string;
  size: number;
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
}

/** Shared by the client (instant feedback) and the server (authoritative check). */
export function validateAttachments(
  files: readonly FileLike[],
  extensions: readonly string[],
  limits: AttachmentLimits,
): AttachmentError | null {
  if (files.length > limits.maxFiles) return 'fileCount';
  if (files.some((file) => !extensions.includes(extensionOf(file.name)))) return 'fileType';
  if (files.some((file) => file.size > limits.maxFileBytes)) return 'fileSize';
  if (files.reduce((total, file) => total + file.size, 0) > limits.maxTotalBytes) return 'fileSize';
  return null;
}

export function acceptAttribute(extensions: readonly string[]): string {
  return extensions.map((extension) => `.${extension}`).join(',');
}

export const bytesToMegabytes = (bytes: number): number => Math.round(bytes / (1024 * 1024));
