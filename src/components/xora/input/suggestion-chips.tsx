'use client';

import { SUGGESTIONS } from '@/lib/xora/suggestions';

interface SuggestionChipsProps {
  onPick: (suggestion: string) => void;
}

export function SuggestionChips({ onPick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className="rounded-full border border-[var(--xora-border-mid)] bg-white px-4 py-[7px] text-[12px] font-medium text-[#444] transition-all hover:border-[var(--xora-blue)] hover:bg-[var(--xora-blue-light)] hover:text-[var(--xora-blue)]"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
