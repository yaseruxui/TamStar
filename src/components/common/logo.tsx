import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/cn';
import logo from '@/assets/brand/tamstar-logo.png';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export async function Logo({ className, priority = false }: LogoProps) {
  const t = await getTranslations('common');
  return (
    <Link href="/" className={cn('inline-flex shrink-0', className)} aria-label={`${t('brand')} — ${t('legalName')}`}>
      <Image src={logo} alt="" priority={priority} sizes="160px" className="h-full w-auto" />
    </Link>
  );
}
