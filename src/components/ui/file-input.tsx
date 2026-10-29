'use client';

import { Paperclip, X } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { cn } from '@/utils/cn';

interface FileInputProps {
  id: string;
  name: string;
  accept: string;
  multiple?: boolean;
  label: string;
  removeLabel: string;
  describedBy?: string;
  invalid?: boolean;
  onFilesChange?: (files: readonly File[]) => void;
}

function formatSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Native file input with a visible file list; the DataTransfer keeps the input's FileList in sync on removal. */
export function FileInput({
  id,
  name,
  accept,
  multiple = false,
  label,
  removeLabel,
  describedBy,
  invalid,
  onFilesChange,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<readonly File[]>([]);

  const sync = (next: readonly File[]) => {
    setFiles(next);
    onFilesChange?.(next);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => sync(Array.from(event.target.files ?? []));

  const remove = (index: number) => {
    const next = files.filter((_, fileIndex) => fileIndex !== index);
    const input = inputRef.current;
    if (input) {
      const transfer = new DataTransfer();
      next.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
    }
    sync(next);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed bg-canvas px-4 py-6 text-center text-sm transition-colors hover:border-navy-600 hover:bg-tint-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand',
          invalid ? 'border-danger' : 'border-subtle',
        )}
      >
        <Paperclip aria-hidden className="size-5 text-brand" />
        <span className="font-semibold text-navy">{label}</span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          onChange={onChange}
          className="sr-only"
        />
      </label>
      {files.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-sm border border-line bg-surface px-3 py-2 text-sm"
            >
              <Paperclip aria-hidden className="size-4 shrink-0 text-muted" />
              <span dir="auto" className="min-w-0 flex-1 truncate text-ink">
                {file.name}
              </span>
              <span className="tabular shrink-0 text-xs text-muted">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`${removeLabel}: ${file.name}`}
                className="grid size-7 shrink-0 place-items-center rounded-sm text-muted hover:bg-danger-soft hover:text-danger"
              >
                <X aria-hidden className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
