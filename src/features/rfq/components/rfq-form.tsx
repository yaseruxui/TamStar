'use client';

import { Lock, Plus, Send, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';
import { FormAlerts } from '@/components/feedback/form-alerts';
import { FormStatus } from '@/components/feedback/form-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { describedBy, Field, Input, Select, Textarea } from '@/components/ui/field';
import { FileInput } from '@/components/ui/file-input';
import { Honeypot } from '@/components/ui/honeypot';
import { unitsOfMeasure, type UnitOfMeasure } from '@/features/catalog/types';
import { useFormAction } from '@/hooks/use-form-action';
import { useFormErrors } from '@/hooks/use-form-errors';
import {
  acceptAttribute,
  ATTACHMENT_LIMITS,
  bytesToMegabytes,
  DOCUMENT_EXTENSIONS,
  validateAttachments,
  type AttachmentError,
} from '@/lib/validation/attachments';
import { submitRfq } from '../actions/submit-rfq';
import { useCart } from '@/features/cart/hooks/use-cart';
import { clearCart, removeFromCart } from '@/features/cart/store/cart-store';
import { RFQ_MAX_LINES } from '../schemas/rfq';

export interface CatalogOption {
  name: string;
  unit: UnitOfMeasure;
}

interface RfqFormProps {
  catalog: Readonly<Record<string, CatalogOption>>;
  minDeliveryDate: string;
}

interface LineDraft {
  id: string;
  product: string;
  specs: string;
  quantity: string;
  unit: UnitOfMeasure;
  brand: string;
  catalogRef: string;
}

let lineCounter = 0;
const newLineId = () => `line-${++lineCounter}`;

const emptyLine = (): LineDraft => ({
  id: newLineId(),
  product: '',
  specs: '',
  quantity: '1',
  unit: 'piece',
  brand: '',
  catalogRef: '',
});

/** Remounting via `key` is the cleanest way to reset `useActionState` for "submit another request". */
export function RfqForm(props: RfqFormProps) {
  const [instance, setInstance] = useState(0);
  return <RfqFormInstance key={instance} {...props} onReset={() => setInstance((value) => value + 1)} />;
}

function RfqFormInstance({ catalog, minDeliveryDate, onReset }: RfqFormProps & { onReset: () => void }) {
  const t = useTranslations('rfq');
  const tCatalog = useTranslations('catalog');
  const tForms = useTranslations('forms');
  const formId = useId();
  const basket = useCart();

  const [attachmentError, setAttachmentError] = useState<AttachmentError | null>(null);
  const { state, pending, onSubmit } = useFormAction(submitRfq, () => attachmentError === null);
  const errorFor = useFormErrors(state);
  const [lines, setLines] = useState<readonly LineDraft[]>(() => [emptyLine()]);
  const [seededFromBasket, setSeededFromBasket] = useState(false);

  // Seed lines from the RFQ list once it is read from storage after hydration.
  if (!seededFromBasket && basket.length > 0) {
    setSeededFromBasket(true);
    const fromBasket = basket.flatMap((entry): LineDraft[] => {
      const ref = `${entry.category}/${entry.slug}`;
      const option = catalog[ref];
      if (!option) return [];
      return [
        { ...emptyLine(), product: option.name, quantity: String(entry.quantity), unit: option.unit, catalogRef: ref },
      ];
    });
    const untouched = lines.every((line) => line.product === '' && line.specs === '' && line.brand === '');
    if (fromBasket.length > 0) setLines(untouched ? fromBasket : [...lines, ...fromBasket]);
  }

  const submitted = state.status === 'success';
  useEffect(() => {
    if (submitted) clearCart();
  }, [submitted]);

  const updateLine = (id: string, patch: Partial<Omit<LineDraft, 'id'>>) =>
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));

  const removeLine = (line: LineDraft) => {
    if (line.catalogRef) {
      const [category = '', slug = ''] = line.catalogRef.split('/');
      removeFromCart({ category, slug });
    }
    setLines((current) => {
      const next = current.filter((candidate) => candidate.id !== line.id);
      return next.length > 0 ? next : [emptyLine()];
    });
  };

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-start gap-6">
        <FormStatus tone="success" title={t('success.title')} className="w-full">
          {t('success.body', { reference: state.reference })}
        </FormStatus>
        <Button variant="navy" onClick={onReset}>
          {t('success.again')}
        </Button>
      </div>
    );
  }

  const fieldId = (name: string) => `${formId}-${name}`;
  const attachmentsMessage = attachmentError ? tForms(`errors.${attachmentError}`) : errorFor('attachments');
  const attachmentsHint = t('fields.attachmentsHint', {
    count: ATTACHMENT_LIMITS.maxFiles,
    size: bytesToMegabytes(ATTACHMENT_LIMITS.maxFileBytes),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-8" aria-busy={pending}>
      <Honeypot />

      <FormAlerts state={state} />

      <fieldset className="rounded-lg border border-line bg-surface p-5 shadow-card sm:p-6">
        <legend className="sr-only">{t('itemsTitle')}</legend>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{t('itemsTitle')}</h2>
            <p className="mt-1 text-sm text-muted">{basket.length === 0 ? t('basket.empty') : t('itemsHint')}</p>
          </div>
        </div>
        {errorFor('lines') ? (
          <p role="alert" className="mt-3 text-sm font-medium text-danger">
            {errorFor('lines')}
          </p>
        ) : null}

        <ol className="mt-5 flex flex-col gap-4">
          {lines.map((line, index) => {
            const base = `lines.${index}`;
            const productError = errorFor(`${base}.product`);
            const quantityError = errorFor(`${base}.quantity`);
            return (
              <li key={line.id} className="rounded-md border border-line bg-canvas p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    {t('line', { index: index + 1 })}
                    {line.catalogRef ? (
                      <Badge tone="brand" size="sm">
                        {t('basket.fromCatalog')}
                      </Badge>
                    ) : null}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLine(line)}
                    aria-label={t('removeLine', { index: index + 1 })}
                    className="text-muted hover:text-danger"
                  >
                    <Trash aria-hidden />
                  </Button>
                </div>
                <input type="hidden" name={`${base}.catalogRef`} value={line.catalogRef} />
                <div className="grid gap-4 md:grid-cols-6">
                  <Field
                    id={fieldId(`${base}.product`)}
                    label={t('fields.product')}
                    required
                    error={productError}
                    className="md:col-span-4"
                  >
                    <Input
                      id={fieldId(`${base}.product`)}
                      name={`${base}.product`}
                      value={line.product}
                      onChange={(event) => updateLine(line.id, { product: event.target.value })}
                      placeholder={t('fields.productPlaceholder')}
                      maxLength={200}
                      aria-invalid={productError ? true : undefined}
                      aria-describedby={describedBy(fieldId(`${base}.product`), { error: productError })}
                    />
                  </Field>
                  <Field
                    id={fieldId(`${base}.quantity`)}
                    label={t('fields.quantity')}
                    required
                    error={quantityError}
                    className="md:col-span-1"
                  >
                    <Input
                      id={fieldId(`${base}.quantity`)}
                      name={`${base}.quantity`}
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      value={line.quantity}
                      onChange={(event) => updateLine(line.id, { quantity: event.target.value })}
                      aria-invalid={quantityError ? true : undefined}
                      aria-describedby={describedBy(fieldId(`${base}.quantity`), { error: quantityError })}
                      className="tabular"
                    />
                  </Field>
                  <Field id={fieldId(`${base}.unit`)} label={t('fields.unit')} required className="md:col-span-1">
                    <Select
                      id={fieldId(`${base}.unit`)}
                      name={`${base}.unit`}
                      value={line.unit}
                      onChange={(event) => {
                        const unit = unitsOfMeasure.find((candidate) => candidate === event.target.value);
                        if (unit) updateLine(line.id, { unit });
                      }}
                    >
                      {unitsOfMeasure.map((unit) => (
                        <option key={unit} value={unit}>
                          {tCatalog(`units.${unit}`)}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field
                    id={fieldId(`${base}.specs`)}
                    label={t('fields.specs')}
                    error={errorFor(`${base}.specs`)}
                    optionalLabel={tForms('optional')}
                    className="md:col-span-4"
                  >
                    <Input
                      id={fieldId(`${base}.specs`)}
                      name={`${base}.specs`}
                      value={line.specs}
                      onChange={(event) => updateLine(line.id, { specs: event.target.value })}
                      placeholder={t('fields.specsPlaceholder')}
                      maxLength={1000}
                    />
                  </Field>
                  <Field
                    id={fieldId(`${base}.brand`)}
                    label={t('fields.brand')}
                    optionalLabel={tForms('optional')}
                    className="md:col-span-2"
                  >
                    <Input
                      id={fieldId(`${base}.brand`)}
                      name={`${base}.brand`}
                      value={line.brand}
                      onChange={(event) => updateLine(line.id, { brand: event.target.value })}
                      maxLength={120}
                    />
                  </Field>
                </div>
              </li>
            );
          })}
        </ol>
        <Button
          variant="soft"
          className="mt-4"
          disabled={lines.length >= RFQ_MAX_LINES}
          onClick={() => setLines((current) => [...current, emptyLine()])}
        >
          <Plus aria-hidden />
          {t('addLine')}
        </Button>
      </fieldset>

      <fieldset className="rounded-lg border border-line bg-surface p-5 shadow-card sm:p-6">
        <legend className="sr-only">{t('deliveryTitle')}</legend>
        <h2 className="text-lg font-semibold">{t('deliveryTitle')}</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field
            id={fieldId('deliveryLocation')}
            label={t('fields.deliveryLocation')}
            required
            error={errorFor('deliveryLocation')}
          >
            <Input
              id={fieldId('deliveryLocation')}
              name="deliveryLocation"
              placeholder={t('fields.deliveryLocationPlaceholder')}
              maxLength={200}
              autoComplete="address-level2"
              aria-invalid={errorFor('deliveryLocation') ? true : undefined}
              aria-describedby={describedBy(fieldId('deliveryLocation'), { error: errorFor('deliveryLocation') })}
            />
          </Field>
          <Field
            id={fieldId('deliveryDate')}
            label={t('fields.deliveryDate')}
            optionalLabel={tForms('optional')}
            error={errorFor('deliveryDate')}
          >
            <Input
              id={fieldId('deliveryDate')}
              name="deliveryDate"
              type="date"
              min={minDeliveryDate}
              aria-invalid={errorFor('deliveryDate') ? true : undefined}
              aria-describedby={describedBy(fieldId('deliveryDate'), { error: errorFor('deliveryDate') })}
            />
          </Field>
          <Field
            id={fieldId('notes')}
            label={t('fields.notes')}
            optionalLabel={tForms('optional')}
            error={errorFor('notes')}
            className="md:col-span-2"
          >
            <Textarea id={fieldId('notes')} name="notes" placeholder={t('fields.notesPlaceholder')} maxLength={3000} />
          </Field>
          <Field
            id={fieldId('attachments')}
            label={t('fields.attachments')}
            optionalLabel={tForms('optional')}
            hint={attachmentsHint}
            error={attachmentsMessage}
            className="md:col-span-2"
          >
            <FileInput
              id={fieldId('attachments')}
              name="attachments"
              multiple
              accept={acceptAttribute(DOCUMENT_EXTENSIONS)}
              label={t('fields.attachments')}
              removeLabel={tForms('removeFile')}
              invalid={Boolean(attachmentsMessage)}
              describedBy={describedBy(fieldId('attachments'), { hint: attachmentsHint, error: attachmentsMessage })}
              onFilesChange={(files) =>
                setAttachmentError(validateAttachments(files, DOCUMENT_EXTENSIONS, ATTACHMENT_LIMITS))
              }
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-line bg-surface p-5 shadow-card sm:p-6">
        <legend className="sr-only">{t('contactTitle')}</legend>
        <h2 className="text-lg font-semibold">{t('contactTitle')}</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {(
            [
              { name: 'company', autoComplete: 'organization', type: 'text', max: 150 },
              { name: 'name', autoComplete: 'name', type: 'text', max: 120 },
              { name: 'email', autoComplete: 'email', type: 'email', max: 200 },
              { name: 'phone', autoComplete: 'tel', type: 'tel', max: 20 },
            ] as const
          ).map((field) => {
            const error = errorFor(field.name);
            return (
              <Field key={field.name} id={fieldId(field.name)} label={t(`fields.${field.name}`)} required error={error}>
                <Input
                  id={fieldId(field.name)}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  maxLength={field.max}
                  dir={field.type === 'text' ? undefined : 'ltr'}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy(fieldId(field.name), { error })}
                  className={field.type === 'text' ? undefined : 'rtl:text-end'}
                />
              </Field>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-xl items-start gap-2 text-xs text-muted">
          <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0 text-success" />
          {t('privacy')}
        </p>
        <Button type="submit" size="lg" disabled={pending} className="sm:min-w-56">
          <Send aria-hidden className="rtl:-scale-x-100" />
          {pending ? t('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
