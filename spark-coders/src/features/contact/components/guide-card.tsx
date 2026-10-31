import { getTranslations } from 'next-intl/server';
import { SkodrWordmark } from '@/components/common/skodr-wordmark';
import { TiltCard } from '@/components/ui/tilt-card';
import { GuideForm } from './guide-form';

/** Lead magnet: the free guide's cover next to what it is and the form that sends it. */
export async function GuideCard() {
  const t = await getTranslations('contact.guide');

  return (
    <div className="mt-[clamp(48px,7vw,88px)] grid items-center gap-10 rounded-[36px] bg-ink/70 p-[clamp(24px,4vw,48px)] shadow-[0_30px_80px_-40px_rgb(7_5_26/0.95)] lg:grid-cols-[auto_1fr] lg:gap-14">
      <TiltCard
        className="w-[min(70vw,240px)] -rotate-4 justify-self-center"
        cardClassName="rounded-[6px_18px_18px_6px] shadow-[-12px_0_0_-5px_rgb(7_5_26/0.6),0_40px_70px_-24px_rgb(0_0_0/0.8)]"
      >
        <div
          aria-hidden="true"
          className="flex aspect-[3/4] flex-col justify-between bg-[radial-gradient(80%_60%_at_80%_10%,rgb(178_108_255/0.6),transparent_60%),radial-gradient(70%_60%_at_10%_100%,rgb(12_142_199/0.6),transparent_60%)] bg-ink p-6"
        >
          <SkodrWordmark className="w-20 self-end text-aqua" />
          <b className="font-display text-[1.6rem] leading-[1.35] font-extrabold">{t('cover')}</b>
        </div>
      </TiltCard>
      <div>
        <span className="inline-flex rounded-full bg-aqua px-3.5 py-1 font-display text-sm font-extrabold text-ink">
          {t('badge')}
        </span>
        <h3 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.3] font-extrabold">
          {t('title')}
        </h3>
        <p className="mt-3 mb-6 max-w-[36rem] text-lg text-text/85">{t('question')}</p>
        <GuideForm />
      </div>
    </div>
  );
}
