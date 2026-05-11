'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { type ConversationModelFamily, PROFILE_CONVERSATIONS } from '@/lib/xora/profile';

const MODEL_PILL_STYLES: Record<ConversationModelFamily, string> = {
  GPT: 'bg-emerald-100 text-emerald-700',
  Claude: 'bg-orange-100 text-orange-700',
  Gemini: 'bg-blue-100 text-blue-700',
};

const INITIAL_VISIBLE = 4;

export function RecentConversations() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROFILE_CONVERSATIONS : PROFILE_CONVERSATIONS.slice(0, INITIAL_VISIBLE);
  const hasMore = PROFILE_CONVERSATIONS.length > INITIAL_VISIBLE;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[14px] font-semibold text-black">Recent conversations</h2>

      <ul className="flex flex-col divide-y divide-black/[0.06] rounded-[10px] border border-black/[0.06] bg-white">
        {visible.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex shrink-0 items-center gap-1">
                {c.models.map((m) => (
                  <span
                    key={m}
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
                      MODEL_PILL_STYLES[m]
                    )}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <span className="truncate text-[11px] text-black/70" title={c.title}>
                {c.title}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-[12px] font-medium text-(--xora-blue) tabular-nums">${c.costUsdc.toFixed(3)}</span>
              <span className="text-[9px] text-black/45 tabular-nums">{c.timestampLabel}</span>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="self-start text-[12px] font-medium text-(--xora-blue) transition-colors hover:text-(--xora-blue-hover)"
        >
          Load more
        </button>
      )}
    </section>
  );
}
