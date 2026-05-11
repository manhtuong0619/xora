'use client';

import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SendButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function SendButton({ onClick, disabled }: SendButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Send"
      className={cn(
        'flex size-[30px] shrink-0 items-center justify-center rounded-lg text-white transition-colors',
        disabled
          ? 'cursor-not-allowed bg-[var(--xora-bg-hover)] text-[var(--xora-muted)]'
          : 'bg-[var(--xora-black)] hover:bg-[#333]'
      )}
    >
      <ArrowUp className="size-4" strokeWidth={1.5} />
    </button>
  );
}
