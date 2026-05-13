'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Model } from '@/lib/xora/types';

interface ModelRowProps {
  model: Model;
  selected: boolean;
  onToggle: () => void;
}

export function ModelRow({ model, selected, onToggle }: ModelRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
        selected
          ? 'bg-[#eff6ff] ring-1 ring-inset ring-[rgba(0,102,255,0.25)]'
          : 'hover:bg-[#f5f5f5]'
      )}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{
          backgroundColor: model.dotColor,
          boxShadow: `0 0 5px ${model.dotColor}66`,
        }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13px] font-medium text-[#0a0a0a]">{model.name}</span>
        <span className="text-[11px] text-[#aaa]">{model.provider}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {model.isNew && (
          <span className="rounded bg-[#dcfce7] px-1.5 py-0.5 text-[9px] font-bold text-[#15803d]">
            NEW
          </span>
        )}
        {model.tier !== 'Free' && (
          <span
            className={cn(
              'rounded px-1.5 py-0.5 text-[9px] font-bold',
              model.tier === 'MAX' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f5f5f5] text-[#555]'
            )}
          >
            {model.tier}
          </span>
        )}
        <Check
          className={cn(
            'size-3.5 text-[#0066ff] transition-opacity',
            selected ? 'opacity-100' : 'opacity-0'
          )}
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}
