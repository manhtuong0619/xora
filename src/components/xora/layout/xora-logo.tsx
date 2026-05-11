import Image from 'next/image';

import { cn } from '@/lib/utils';

interface XoraLogoProps {
  className?: string;
  height?: number;
}

export function XoraLogo({ className, height = 28 }: XoraLogoProps) {
  return (
    <span className={cn('flex items-center', className)}>
      <Image
        src="/xora.svg"
        alt="Xora"
        height={height}
        width={height * (1440 / 810)}
        priority
        unoptimized
      />
    </span>
  );
}
