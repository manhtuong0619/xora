'use client';

import { ChevronDown, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

interface AutoModeToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AutoModeToggle({ enabled, onToggle }: AutoModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-[5px] text-[12px] font-medium transition-colors',
        enabled
          ? 'border-[var(--xora-blue-border)] bg-[var(--xora-blue-light)] text-[#1d4ed8]'
          : 'border-[var(--xora-border-mid)] bg-[var(--xora-bg-hover)] text-[#333] hover:bg-[#ececec]'
      )}
    >
      <Sparkles className="size-3.5" strokeWidth={2} />
      Auto
      <ChevronDown className="size-3" strokeWidth={2} />
    </button>
  );
}
