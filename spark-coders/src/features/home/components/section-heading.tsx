import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  align?: 'start' | 'center';
  className?: string;
}

/** Eyebrow + two-line display title (second line in the brand gradient) + lead paragraph. */
export function SectionHeading({ eyebrow, title, accent, body, align = 'start', className }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      <Reveal as="p" className="eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal
        as="h3"
        className="mt-3.5 mb-5 font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[1.15] font-extrabold"
      >
        {title}
        <br />
        <span className="text-gradient">{accent}</span>
      </Reveal>
      <Reveal as="p" className={cn('max-w-[520px] text-lg text-muted', align === 'center' && 'mx-auto')}>
        {body}
      </Reveal>
    </div>
  );
}
