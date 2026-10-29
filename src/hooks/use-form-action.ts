'use client';

import { startTransition, useActionState, type FormEvent } from 'react';
import type { FormState } from '@/types/forms';

type FormAction = (previous: FormState<string>, formData: FormData) => Promise<FormState<string>>;

const INITIAL_STATE: FormState<string> = { status: 'idle' };

/**
 * Submits through `onSubmit` instead of `<form action>` so React does not reset uncontrolled
 * fields after a failed validation round-trip — the visitor keeps everything they typed.
 */
export function useFormAction(action: FormAction, canSubmit: () => boolean = () => true) {
  const [state, dispatch, pending] = useActionState(action, INITIAL_STATE);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit()) return;
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };

  return { state, pending, onSubmit };
}
