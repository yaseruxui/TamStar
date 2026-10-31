'use client';

import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/field';
import { site } from '@/lib/config/site';
import { submitGuide } from '../services/actions';
import { initialFormStatus } from '../types';
import { FormMessage } from './form-message';
import { Honeypot } from './honeypot';

export function GuideForm() {
  const t = useTranslations('contact');
  const [state, action, pending] = useActionState(submitGuide, initialFormStatus);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
  }, [state]);

  const message =
    state.status === 'success'
      ? t('guide.success')
      : state.status === 'invalid'
        ? t('invalid')
        : state.status === 'unconfigured'
          ? t('unconfigured', { email: site.email })
          : state.status === 'failed'
            ? t('failed')
            : null;

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      className="relative mt-[clamp(40px,6vw,64px)] max-w-[640px] rounded-card bg-ink/60 p-6 backdrop-blur-[8px]"
    >
      <p className="mb-4 text-muted">
        {t.rich('guide.question', { b: (chunks) => <b className="text-text">{chunks}</b> })}
      </p>
      <div className="flex gap-2.5 max-sm:flex-col">
        <label className="sr-only" htmlFor="guide-email">
          {t('guide.emailLabel')}
        </label>
        <Input
          id="guide-email"
          type="email"
          name="email"
          dir="ltr"
          required
          autoComplete="email"
          placeholder={t('guide.placeholder')}
          aria-invalid={state.status === 'invalid' || undefined}
          className="min-w-0 flex-1"
        />
        <Button type="submit" variant="light" disabled={pending}>
          {pending ? t('sending') : t('guide.submit')}
        </Button>
      </div>
      <Honeypot />
      {message ? (
        <div className="mt-3">
          <FormMessage message={message} tone={state.status === 'success' ? 'ok' : 'error'} />
        </div>
      ) : null}
    </form>
  );
}
