'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { FormAlerts } from '@/components/feedback/form-alerts';
import { FormStatus } from '@/components/feedback/form-status';
import { Button } from '@/components/ui/button';
import { describedBy, Field, Input, Select, Textarea } from '@/components/ui/field';
import { FileInput } from '@/components/ui/file-input';
import { Honeypot } from '@/components/ui/honeypot';
import { useFormAction } from '@/hooks/use-form-action';
import { useFormErrors } from '@/hooks/use-form-errors';
import {
  acceptAttribute,
  bytesToMegabytes,
  CV_EXTENSIONS,
  CV_LIMITS,
  validateAttachments,
  type AttachmentError,
} from '@/lib/validation/attachments';
import { submitApplication } from '../actions/submit-application';
import { careerPositions } from '../schemas/application';

export function ApplicationForm() {
  const [instance, setInstance] = useState(0);
  return <ApplicationFormInstance key={instance} onReset={() => setInstance((value) => value + 1)} />;
}

function ApplicationFormInstance({ onReset }: { onReset: () => void }) {
  const t = useTranslations('careers');
  const tForms = useTranslations('forms');
  const id = useId();
  const [cvError, setCvError] = useState<AttachmentError | null>(null);
  const { state, pending, onSubmit } = useFormAction(submitApplication, () => cvError === null);
  const errorFor = useFormErrors(state);
  const fieldId = (name: string) => `${id}-${name}`;

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-start gap-5">
        <FormStatus tone="success" title={t('success.title')} className="w-full">
          {t('success.body', { reference: state.reference })}
        </FormStatus>
        <Button variant="outline" onClick={onReset}>
          {t('success.again')}
        </Button>
      </div>
    );
  }

  const cvHint = t('fields.cvHint', { size: bytesToMegabytes(CV_LIMITS.maxFileBytes) });
  const cvMessage = cvError ? tForms(`errors.${cvError}`) : errorFor('cv');
  const textFields = [
    { name: 'name', type: 'text', autoComplete: 'name', max: 120 },
    { name: 'email', type: 'email', autoComplete: 'email', max: 200 },
    { name: 'phone', type: 'tel', autoComplete: 'tel', max: 20 },
  ] as const;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5" aria-busy={pending}>
      <Honeypot />
      <FormAlerts state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        {textFields.map((field) => {
          const error = errorFor(field.name);
          const latin = field.type !== 'text';
          return (
            <Field key={field.name} id={fieldId(field.name)} label={t(`fields.${field.name}`)} required error={error}>
              <Input
                id={fieldId(field.name)}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                maxLength={field.max}
                dir={latin ? 'ltr' : undefined}
                className={latin ? 'rtl:text-end' : undefined}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy(fieldId(field.name), { error })}
              />
            </Field>
          );
        })}
        <Field id={fieldId('position')} label={t('fields.position')} required error={errorFor('position')}>
          <Select id={fieldId('position')} name="position" defaultValue="sales">
            {careerPositions.map((position) => (
              <option key={position} value={position}>
                {t(`positions.${position}`)}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        id={fieldId('message')}
        label={t('fields.message')}
        optionalLabel={tForms('optional')}
        error={errorFor('message')}
      >
        <Textarea id={fieldId('message')} name="message" rows={5} maxLength={3000} />
      </Field>
      <Field
        id={fieldId('cv')}
        label={t('fields.cv')}
        optionalLabel={tForms('optional')}
        hint={cvHint}
        error={cvMessage}
      >
        <FileInput
          id={fieldId('cv')}
          name="cv"
          accept={acceptAttribute(CV_EXTENSIONS)}
          label={t('fields.cv')}
          removeLabel={tForms('removeFile')}
          invalid={Boolean(cvMessage)}
          describedBy={describedBy(fieldId('cv'), { hint: cvHint, error: cvMessage })}
          onFilesChange={(files) => setCvError(validateAttachments(files, CV_EXTENSIONS, CV_LIMITS))}
        />
      </Field>
      <Button type="submit" size="lg" disabled={pending} className="self-start">
        <Send aria-hidden className="rtl:-scale-x-100" />
        {pending ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
