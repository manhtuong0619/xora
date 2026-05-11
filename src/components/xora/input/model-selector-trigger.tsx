'use client';

import { ChevronDown } from 'lucide-react';

interface ModelSelectorTriggerProps {
  count: number;
  onClick?: () => void;
}

export function ModelSelectorTrigger({ count, onClick }: ModelSelectorTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--xora-border-mid)] bg-[var(--xora-bg-hover)] px-2.5 py-[5px] text-[12px] font-medium text-[#333] transition-colors hover:bg-[#ececec]"
    >
      <span>Choose models</span>
      {count > 0 && (
        <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--xora-black)] px-1 text-[9px] font-semibold text-white">
          {count}
        </span>
      )}
      <ChevronDown className="size-3" strokeWidth={2} />
    </button>
  );
}
