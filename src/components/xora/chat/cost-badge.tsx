import { cn } from '@/lib/utils';

interface CostBadgeProps {
  costUsdc: number;
  className?: string;
}

export function CostBadge({ costUsdc, className }: CostBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
        'bg-(--xora-blue-soft) text-(--xora-blue) ring-1 ring-inset ring-[rgba(0,102,255,0.18)]',
        className
      )}
    >
      {costUsdc.toFixed(3)} USDC
    </span>
  );
}
