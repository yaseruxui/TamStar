import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from './section-heading';

export async function EditSection() {
  const t = await getTranslations('home.edit');

  return (
    <article className="border-t border-line py-[clamp(80px,12vw,150px)]">
      <div className="container-site grid items-center gap-[clamp(32px,6vw,96px)] lg:grid-cols-[1.1fr_1fr]">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} accent={t('titleAccent')} body={t('body')} />
        <Reveal className="relative rounded-panel border border-line-strong bg-[linear-gradient(180deg,rgb(23_18_58/0.9),rgb(14_10_38/0.9))] px-7 py-10 shadow-[0_40px_80px_-40px_rgb(178_108_255/0.45)]">
          <span
            aria-hidden="true"
            className="absolute start-6 -top-3.5 rounded-lg bg-ocean px-3 py-1 text-[0.8125rem] font-semibold"
          >
            {t('tag')}
          </span>
          <p
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            aria-label={t('sampleAria')}
            data-cursor={t('cursor')}
            className="min-h-[3em] rounded-xl border-[1.5px] border-dashed border-line-strong px-4 py-3 font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-normal font-semibold outline-none transition-colors duration-250 hover:border-aqua focus:border-aqua"
          >
            {t('sample')}
          </p>
        </Reveal>
      </div>
    </article>
  );
}
