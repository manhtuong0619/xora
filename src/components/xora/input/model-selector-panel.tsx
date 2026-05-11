'use client';

import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { groupByProvider, MOCK_MODELS, TRENDING_PAIR_IDS } from '@/lib/xora/models';
import type { Model } from '@/lib/xora/types';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pro', label: 'PRO' },
  { id: 'max', label: 'MAX' },
  { id: 'recent', label: 'Recent' },
  { id: 'new', label: 'New' },
  { id: 'reasoning', label: 'Reasoning' },
  { id: 'fast', label: 'Fast' },
  { id: 'search', label: 'Search' },
  { id: 'images', label: 'Images' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

function applyFilter(models: Model[], f: FilterId): Model[] {
  switch (f) {
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

interface ModelSelectorPanelProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ModelSelectorPanel({ selectedIds, onToggle }: ModelSelectorPanelProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = useMemo(() => applyFilter(MOCK_MODELS, filter), [filter]);
  const grouped = useMemo(() => groupByProvider(filtered), [filtered]);
  const trending = useMemo(
    () => TRENDING_PAIR_IDS.map((id) => MOCK_MODELS.find((m) => m.id === id)).filter((m): m is Model => Boolean(m)),
    []
  );

  return (
    <div className="flex max-h-[460px] w-[min(640px,90vw)] flex-col gap-3 overflow-hidden text-black">
      <div className="flex flex-wrap gap-1 border-b border-black/[0.07] pb-2.5">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
                active ? 'bg-black text-white' : 'text-black/60 hover:bg-black/[0.05] hover:text-black'
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {filter === 'all' && (
          <section className="mb-3">
            <h4 className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-black/40">
              Trending picks
            </h4>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {trending.map((m) => (
                <ModelOption
                  key={`trend-${m.id}`}
                  model={m}
                  selected={selectedIds.includes(m.id)}
                  onToggle={() => onToggle(m.id)}
                  compact
                />
              ))}
            </div>
          </section>
        )}

        {Object.entries(grouped).map(([provider, models]) => (
          <section key={provider} className="mb-3">
            <h4 className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-black/40">{provider}</h4>
            <div className="flex flex-col gap-1">
              {models.map((m) => (
                <ModelOption
                  key={m.id}
                  model={m}
                  selected={selectedIds.includes(m.id)}
                  onToggle={() => onToggle(m.id)}
                />
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <div className="py-8 text-center text-[12px] text-black/40">No models match this filter.</div>
        )}
      </div>
    </div>
  );
}

function ModelOption({
  model,
  selected,
  onToggle,
  compact,
}: {
  model: Model;
  selected: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        'flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors',
        selected ? 'bg-(--xora-blue-soft) ring-1 ring-inset ring-[rgba(0,102,255,0.3)]' : 'hover:bg-black/[0.04]'
      )}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{
          backgroundColor: model.dotColor,
          boxShadow: `0 0 5px ${model.dotColor}55`,
        }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[12px] font-semibold text-black">{model.name}</span>
        {!compact && <span className="truncate text-[10px] text-black/45">{model.provider}</span>}
      </div>
      {model.tier !== 'Free' && (
        <span
          className={cn(
            'rounded px-1.5 py-0.5 text-[9px] font-bold',
            model.tier === 'MAX' ? 'bg-black text-white' : 'bg-black/[0.06] text-black/70'
          )}
        >
          {model.tier}
        </span>
      )}
      {selected && <Check className="size-3.5 text-(--xora-blue)" strokeWidth={2.5} />}
    </button>
  );
}
