import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  title: string;
  accent: string;
  body: string;
  align?: 'start' | 'center';
  className?: string;
}

/** Two-line display title (second line in the brand violet) + lead paragraph. The heading speaks for itself. */
export function SectionHeading({ title, accent, body, align = 'start', className }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      <h3 className="mb-6 font-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[1.12] font-extrabold tracking-[-0.01em]">
        {title}
        <br />
        <span className="text-violet">{accent}</span>
      </h3>
      <p className={cn('max-w-[34rem] text-lg text-muted', align === 'center' && 'mx-auto')}>{body}</p>
    </div>
  );
}
