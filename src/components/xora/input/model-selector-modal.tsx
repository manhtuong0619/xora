'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { groupByProvider, MOCK_MODELS, TRENDING_PAIR_IDS } from '@/lib/xora/models';
import type { Model } from '@/lib/xora/types';

import { ModelRow } from './model-row';
import { ModelTrendingCard } from './model-trending-card';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pro', label: 'PRO' },
  { id: 'max', label: 'MAX' },
  { id: 'recent', label: 'Recent Picks' },
  { id: 'new', label: 'New' },
  { id: 'reasoning', label: 'Reasoning' },
  { id: 'fast', label: 'Fast' },
  { id: 'search', label: 'Search' },
  { id: 'images', label: 'Images' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

function applyFilter(models: Model[], filter: FilterId): Model[] {
  switch (filter) {
    case 'pro':
      return models.filter((m) => m.tier === 'PRO');
    case 'max':
      return models.filter((m) => m.tier === 'MAX');
    case 'recent':
      return models.filter((m) => m.recent);
    case 'new':
      return models.filter((m) => m.isNew);
    case 'reasoning':
      return models.filter((m) => m.categories?.includes('Reasoning'));
    case 'fast':
      return models.filter((m) => m.categories?.includes('Fast'));
    case 'search':
      return models.filter((m) => m.categories?.includes('Search'));
    case 'images':
      return models.filter((m) => m.categories?.includes('Images'));
    default:
      return models;
  }
}

interface ModelSelectorModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ModelSelectorModal({ open, onOpenChange, selectedIds, onToggle }: ModelSelectorModalProps) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');

  const baseFiltered = useMemo(() => applyFilter(MOCK_MODELS, filter), [filter]);

  const displayed = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseFiltered;
    return baseFiltered.filter(
      (m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q)
    );
  }, [baseFiltered, query]);

  const grouped = useMemo(() => groupByProvider(displayed), [displayed]);

  const trending = useMemo(
    () =>
      TRENDING_PAIR_IDS.map((id) => MOCK_MODELS.find((m) => m.id === id)).filter(
        (m): m is Model => Boolean(m)
      ),
    []
  );

  const showTrending = filter === 'all' && !query.trim();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 flex w-[min(640px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_24px_60px_-8px_rgba(0,0,0,0.18)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          style={{ maxHeight: 'min(82vh, 620px)' }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#f0f0f0] px-5 pb-4 pt-5">
            <DialogPrimitive.Title className="text-[16px] font-semibold text-[#0a0a0a]">
              Select a model
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="flex size-7 items-center justify-center rounded-full border border-[#e5e5e5] text-[#888] transition-colors hover:bg-[#f5f5f5] hover:text-[#0a0a0a]">
              <X className="size-3.5" strokeWidth={2} />
            </DialogPrimitive.Close>
          </div>

          {/* Search */}
          <div className="shrink-0 px-5 pt-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-[15px] -translate-y-1/2 text-[#bbb]" />
              <input
                type="text"
                placeholder="Explore models..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="h-10 w-full rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] pl-9 pr-3 text-[13px] text-[#0a0a0a] outline-none transition-colors placeholder:text-[#c0c0c0] focus:border-[#0066ff] focus:bg-white"
              />
            </div>
          </div>

          {/* Filter pills */}
          <div className="scrollbar-hide flex shrink-0 gap-1.5 overflow-x-auto px-5 pb-1 pt-3">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-[5px] text-[11px] font-medium transition-colors',
                  filter === f.id
                    ? 'bg-[#0a0a0a] text-white'
                    : 'border border-[#e5e5e5] text-[#666] hover:bg-[#f5f5f5]'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Trending section — outside the scroll container so the vertical scrollbar can't clip it */}
          {showTrending && (
            <div className="shrink-0 px-5 pb-1 pt-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#bbb]">
                Trending Model Picks
              </p>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
                {trending.map((m) => (
                  <ModelTrendingCard
                    key={m.id}
                    model={m}
                    selected={selectedIds.includes(m.id)}
                    onToggle={() => onToggle(m.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scrollable body — provider list only */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-2">
            {displayed.length === 0 ? (
              <div className="py-10 text-center text-[13px] text-[#bbb]">No models found.</div>
            ) : (
              Object.entries(grouped).map(([provider, models]) => (
                <div key={provider} className="mt-4">
                  <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#bbb]">
                    {provider}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {models.map((m) => (
                      <ModelRow
                        key={m.id}
                        model={m}
                        selected={selectedIds.includes(m.id)}
                        onToggle={() => onToggle(m.id)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-[#f0f0f0] px-5 pb-5 pt-3">
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setQuery('');
              }}
              className="h-10 w-full rounded-xl bg-[#0a0a0a] text-[13px] font-semibold text-white transition-colors hover:bg-[#1f1f1f]"
            >
              View all
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
