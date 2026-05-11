'use client';

import { cn } from '@/lib/utils';
import { FILTER_TABS, type FilterTab } from '@/lib/xora/leaderboard';

interface FilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
      {FILTER_TABS.map((tab) => {
        const isActive = active === tab.id;
        const activeClass = tab.featured
          ? 'bg-(--xora-blue) text-white hover:bg-(--xora-blue-hover)'
          : 'bg-black text-white hover:bg-black/85';
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors',
              isActive
                ? activeClass
                : 'border border-black/[0.08] bg-white text-black/65 hover:bg-black/[0.04] hover:text-black'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
