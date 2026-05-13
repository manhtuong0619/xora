'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Model } from '@/lib/xora/types';

interface ModelTrendingCardProps {
  model: Model;
  selected: boolean;
  onToggle: () => void;
}

export function ModelTrendingCard({ model, selected, onToggle }: ModelTrendingCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        'flex w-[152px] shrink-0 flex-col gap-2.5 rounded-xl border p-3 text-left transition-all duration-150',
        selected
          ? 'border-[#0066ff] bg-[#eff6ff] shadow-[0_0_0_3px_rgba(0,102,255,0.08)]'
          : 'border-[#ebebeb] bg-white hover:border-[#d0d0d0] hover:bg-[#fafafa]'
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-[9px] text-[12px] font-bold text-white"
          style={{ backgroundColor: model.dotColor }}
        >
          {model.name.charAt(0)}
        </span>
        <div className="flex flex-wrap justify-end gap-1">
          {model.isNew && (
            <span className="rounded bg-[#dcfce7] px-1.5 py-0.5 text-[9px] font-bold text-[#15803d]">
              NEW
            </span>
          )}
          {model.tier !== 'Free' && (
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-[9px] font-bold',
                model.tier === 'MAX' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f0f0f0] text-[#555]'
              )}
            >
              {model.tier}
            </span>
          )}
        </div>
      </div>
      <div>
        <p className="text-[12px] font-semibold leading-tight text-[#0a0a0a]">{model.name}</p>
        <p className="mt-0.5 text-[10px] text-[#999]">{model.provider}</p>
      </div>
      {selected && (
        <div className="flex items-center gap-1 text-[#0066ff]">
          <Check className="size-3" strokeWidth={2.5} />
          <span className="text-[10px] font-medium">Selected</span>
        </div>
      )}
    </button>
  );
}
