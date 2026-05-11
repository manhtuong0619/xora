'use client';

import { Figma, Import, LayoutTemplate, Link2, type LucideIcon } from 'lucide-react';

const ACTIONS: { label: string; Icon: LucideIcon }[] = [
  { label: 'Start From URL', Icon: Link2 },
  { label: 'Import From Figma', Icon: Figma },
  { label: 'Start From Template', Icon: LayoutTemplate },
  { label: 'Import From Another Platform', Icon: Import },
];

export function QuickActionButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {ACTIONS.map(({ label, Icon }) => (
        <button
          key={label}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#e8e8e8] bg-[var(--xora-bg-secondary)] px-3.5 py-2 text-[11px] font-medium text-[var(--xora-text-secondary)] transition-colors hover:border-[var(--xora-blue-border)] hover:bg-[#f0f7ff] hover:text-[#1d4ed8]"
        >
          <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
          {label}
        </button>
      ))}
    </div>
  );
}
