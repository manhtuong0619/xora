'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { PageShell } from '@/components/xora/layout/page-shell';
import { cn } from '@/lib/utils';

type FilterPill = 'All' | 'Text' | 'Image' | 'Code';

const MODEL_COLORS: Record<string, { bg: string; color: string }> = {
  GPT: { bg: '#dcfce7', color: '#15803d' },
  Claude: { bg: '#fef3c7', color: '#92400e' },
  Gemini: { bg: '#dbeafe', color: '#1e40af' },
  Llama: { bg: '#f3e8ff', color: '#7e22ce' },
};

interface HistoryEntry {
  id: string;
  models: string[];
  title: string;
  preview: string;
  cost: string;
  time: string;
  type: Exclude<FilterPill, 'All'>;
}

const ENTRIES: HistoryEntry[] = [
  {
    id: '1',
    models: ['GPT', 'Claude'],
    title: 'Best Solana AI projects right now?',
    preview: 'Based on recent activity...',
    cost: '0.007 USDC',
    time: '2 min ago',
    type: 'Text',
  },
  {
    id: '2',
    models: ['Gemini'],
    title: 'Generate image of robot on Solana beach',
    preview: 'Here is the generated...',
    cost: '0.021 USDC',
    time: '1h ago',
    type: 'Image',
  },
  {
    id: '3',
    models: ['Claude', 'Llama'],
    title: 'Write Rust smart contract for token staking',
    preview: "Here's a complete...",
    cost: '0.012 USDC',
    time: '3h ago',
    type: 'Code',
  },
  {
    id: '4',
    models: ['GPT'],
    title: 'Explain x402 payment protocol',
    preview: 'The x402 protocol is...',
    cost: '0.005 USDC',
    time: '5h ago',
    type: 'Text',
  },
  {
    id: '5',
    models: ['Claude'],
    title: 'Compare Anchor vs native Solana programs',
    preview: 'Anchor provides...',
    cost: '0.009 USDC',
    time: 'Yesterday',
    type: 'Text',
  },
  {
    id: '6',
    models: ['Gemini', 'GPT'],
    title: 'Translate pitch deck to Vietnamese',
    preview: 'Tôi sẽ dịch...',
    cost: '0.018 USDC',
    time: 'Yesterday',
    type: 'Text',
  },
  {
    id: '7',
    models: ['Llama'],
    title: 'Debug this TypeScript async error',
    preview: 'The issue is...',
    cost: '0.003 USDC',
    time: '2 days ago',
    type: 'Code',
  },
  {
    id: '8',
    models: ['Claude'],
    title: 'Summarize Xora AI whitepaper',
    preview: 'Xora AI là...',
    cost: '0.006 USDC',
    time: '3 days ago',
    type: 'Text',
  },
];

const FILTER_PILLS: FilterPill[] = ['All', 'Text', 'Image', 'Code'];

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterPill>('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = ENTRIES.filter((e) => {
    const matchFilter = activeFilter === 'All' || e.type === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.preview.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <PageShell>
      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex w-full max-w-4xl flex-col px-5 py-8">
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0a0a0a]">History</h1>
            <p className="mt-1 text-[13px] text-[#888]">All your past conversations across every model</p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-[14px] -translate-y-1/2 text-[#aaa]" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-[32px] w-[240px] rounded-[9px] border border-[#e5e5e5] bg-[#f5f5f5] pl-8 pr-3 text-[12px] text-[#0a0a0a] outline-none placeholder:text-[#aaa] focus:border-[#0066ff]"
              />
            </div>
            <div className="flex gap-1.5">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setActiveFilter(pill)}
                  className={cn(
                    'rounded-full px-3.5 py-[5px] text-[11px] font-medium transition-colors',
                    activeFilter === pill
                      ? 'bg-[#0a0a0a] text-white'
                      : 'border border-[#e5e5e5] text-[#666] hover:bg-[#f5f5f5]'
                  )}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="group mb-2 flex cursor-pointer items-center justify-between rounded-xl border border-[#ebebeb] bg-white px-4 py-[14px] transition-all duration-150 hover:border-[#d0d0d0] hover:bg-[#fafafa]"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex gap-1">
                    {entry.models.map((m) => (
                      <span
                        key={m}
                        className="rounded px-1.5 py-0.5 text-[9px] font-semibold"
                        style={{ background: MODEL_COLORS[m]?.bg, color: MODEL_COLORS[m]?.color }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-[13px] font-medium text-[#0a0a0a]">{entry.title}</p>
                  <p className="mt-0.5 max-w-[480px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-[#999]">
                    {entry.preview}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="text-[12px] font-semibold text-[#0066ff]">{entry.cost}</p>
                    <p className="mt-0.5 text-[11px] text-[#bbb]">{entry.time}</p>
                  </div>
                  <span className="text-[#bbb] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#666]">
            <button type="button" className="cursor-pointer hover:text-[#0a0a0a]">
              ← Previous
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  'rounded-md px-2.5 py-1 transition-colors',
                  page === n ? 'bg-[#0a0a0a] text-white' : 'hover:bg-[#f5f5f5]'
                )}
              >
                {n}
              </button>
            ))}
            <span>...</span>
            <button type="button" className="cursor-pointer hover:text-[#0a0a0a]">
              Next →
            </button>
          </div>
        </div>
      </ScrollArea>
    </PageShell>
  );
}
