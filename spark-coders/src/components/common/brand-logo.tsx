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
 * below a legible size there; after scrolling the header keeps only the mark. The lettering is Latin and always reads left-to-right.
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
  // Header lockup: compact at the top of the page; once scrolled the lettering folds away and the
  // mark grows a little, leaving the icon on its own.
  return (
    <span dir="ltr" className={cn('inline-flex items-center', className)}>
      <SparkMark
        id="header-mark"
        className="w-[34px] transition-[width] duration-500 ease-brand group-data-scrolled/header:w-[42px] sm:w-[40px] sm:group-data-scrolled/header:w-[48px]"
      />
      <span className="grid grid-cols-[1fr] opacity-100 transition-[grid-template-columns,opacity] duration-500 ease-brand group-data-scrolled/header:grid-cols-[0fr] group-data-scrolled/header:opacity-0">
        <span className="min-w-0 overflow-hidden">
          <span className="block ps-2.5">
            <Wordmark className="w-[118px] text-text sm:hidden" />
            <Wordmark withSlogan className="w-[176px] text-text max-sm:hidden" />
          </span>
        </span>
      </span>
    </span>
  );
}
