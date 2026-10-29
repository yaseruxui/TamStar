import { getLocale } from 'next-intl/server';
import { processSteps } from '../data/values';

export async function ProcessSteps() {
  const locale = await getLocale();
  return (
    <ol className="grid gap-4 lg:grid-cols-3">
      {processSteps.map((step, index) => (
        <li key={step.key} className="relative rounded-lg border border-line bg-surface p-6 shadow-card">
          <span className="tabular font-mono text-3xl font-semibold text-tint-300">0{index + 1}</span>
          <h3 className="mt-3 text-lg font-semibold">{step.title[locale]}</h3>
          <p className="mt-2 text-sm leading-6">{step.body[locale]}</p>
        </li>
      ))}
    </ol>
  );
}
