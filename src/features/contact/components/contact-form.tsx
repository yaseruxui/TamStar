'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { FormAlerts } from '@/components/feedback/form-alerts';
import { FormStatus } from '@/components/feedback/form-status';
import { Button } from '@/components/ui/button';
import { describedBy, Field, Input, Select, Textarea } from '@/components/ui/field';
import { Honeypot } from '@/components/ui/honeypot';
import { useFormAction } from '@/hooks/use-form-action';
import { useFormErrors } from '@/hooks/use-form-errors';
import { submitContact } from '../actions/submit-contact';
import { inquiryTopics } from '../schemas/contact';

export function ContactForm() {
  const [instance, setInstance] = useState(0);
  return <ContactFormInstance key={instance} onReset={() => setInstance((value) => value + 1)} />;
}

function ContactFormInstance({ onReset }: { onReset: () => void }) {
  const t = useTranslations('contact');
  const tForms = useTranslations('forms');
  const id = useId();
  const { state, pending, onSubmit } = useFormAction(submitContact);
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

  const nameError = errorFor('name');
  const emailError = errorFor('email');
  const phoneError = errorFor('phone');
  const messageError = errorFor('message');

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5" aria-busy={pending}>
      <Honeypot />
      <FormAlerts state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldId('name')} label={t('fields.name')} required error={nameError}>
          <Input
            id={fieldId('name')}
            name="name"
            autoComplete="name"
            maxLength={120}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={describedBy(fieldId('name'), { error: nameError })}
          />
        </Field>
        <Field id={fieldId('email')} label={t('fields.email')} required error={emailError}>
          <Input
            id={fieldId('email')}
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            maxLength={200}
            className="rtl:text-end"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={describedBy(fieldId('email'), { error: emailError })}
          />
        </Field>
        <Field id={fieldId('phone')} label={t('fields.phone')} optionalLabel={tForms('optional')} error={phoneError}>
          <Input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            maxLength={20}
            className="rtl:text-end"
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={describedBy(fieldId('phone'), { error: phoneError })}
          />
        </Field>
        <Field id={fieldId('topic')} label={t('fields.topic')} required error={errorFor('topic')}>
          <Select id={fieldId('topic')} name="topic" defaultValue="rfq">
            {inquiryTopics.map((topic) => (
              <option key={topic} value={topic}>
                {t(`topics.${topic}`)}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field id={fieldId('message')} label={t('fields.message')} required error={messageError}>
        <Textarea
          id={fieldId('message')}
          name="message"
          rows={6}
          maxLength={3000}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={describedBy(fieldId('message'), { error: messageError })}
        />
      </Field>
      <Button type="submit" size="lg" disabled={pending} className="self-start">
        <Send aria-hidden className="rtl:-scale-x-100" />
        {pending ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
