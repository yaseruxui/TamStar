import { cn } from '@/utils/cn';
import { SparkMark } from './spark-mark';
import { Wordmark } from './wordmark';

interface BrandLogoProps {
  size?: 'md' | 'lg';
  className?: string;
}

/**
 * The Sparkoders lockup: the vector S mark, SPARKODERS lettering and the "CRAFTING DIGITAL
 * EXCELLENCE" slogan. On phones the header shows the name without the slogan, which would shrink
 * below a legible size there. The lettering is Latin and always reads left-to-right.
 */
export function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  if (size === 'lg') {
    return (
      <span dir="ltr" className={cn('inline-flex items-center gap-3.5', className)}>
        <SparkMark id="footer-mark" className="w-[78px]" />
        <Wordmark withSlogan className="w-[290px] text-text" />
      </span>
    );
  }
  return (
    <span dir="ltr" className={cn('inline-flex items-center gap-3', className)}>
      <SparkMark id="header-mark" className="w-[50px] sm:w-[62px]" />
      <Wordmark className="w-[150px] text-text sm:hidden" />
      <Wordmark withSlogan className="w-[236px] text-text max-sm:hidden" />
    </span>
  );
}
