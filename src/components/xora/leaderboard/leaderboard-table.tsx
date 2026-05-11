'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  formatCost,
  GRADE_STYLES,
  type LeaderboardModel,
  PROVIDER_COLORS,
  type SortDir,
  type SortKey,
} from '@/lib/xora/leaderboard';

interface LeaderboardTableProps {
  models: LeaderboardModel[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSortChange: (key: SortKey) => void;
}

const RANK_COLORS: Record<number, string> = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

const COLUMNS: { key: SortKey; label: string; align: 'left' | 'right' | 'center' }[] = [
  { key: 'rank', label: '#', align: 'left' },
  { key: 'name', label: 'Model', align: 'left' },
  { key: 'vibeScore', label: 'VIBE Score', align: 'right' },
  { key: 'speedTps', label: 'Speed (t/s)', align: 'right' },
  { key: 'costPer1k', label: 'Cost / 1K', align: 'right' },
  { key: 'grade', label: 'Grade', align: 'center' },
];

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown className="size-3 text-black/30" aria-hidden />;
  return dir === 'asc' ? (
    <ArrowUp className="size-3 text-black" aria-hidden />
  ) : (
    <ArrowDown className="size-3 text-black" aria-hidden />
  );
}

function RankCell({ rank }: { rank: number }) {
  const medal = RANK_COLORS[rank];
  if (medal) {
    return (
      <span
        className="inline-flex size-7 items-center justify-center rounded-full text-[12px] font-bold text-black"
        style={{ background: medal }}
      >
        {rank}
      </span>
    );
  }
  return <span className="inline-block w-7 text-center text-[13px] font-medium text-black/55">{rank}</span>;
}

function ModelCell({ model }: { model: LeaderboardModel }) {
  const color = PROVIDER_COLORS[model.provider];
  const openTag = model.isOpenSource ? ' · Open' : '';
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white"
        style={{ background: color }}
        aria-hidden
      >
        {model.name.charAt(0)}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-[13px] font-medium text-black">{model.name}</span>
        <span className="truncate text-[11px] text-black/50">
          {model.provider}
          {openTag}
        </span>
      </div>
    </div>
  );
}

function GradeBadge({ grade }: { grade: LeaderboardModel['grade'] }) {
  const style = GRADE_STYLES[grade];
  return (
    <span
      className="inline-flex min-w-9 items-center justify-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: style.bg, color: style.fg }}
    >
      {grade}
    </span>
  );
}

export function LeaderboardTable({ models, sortKey, sortDir, onSortChange }: LeaderboardTableProps) {
  return (
    <section className="overflow-hidden rounded-[10px] border border-black/[0.06] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-black/[0.06] bg-[#fafafa]">
              {COLUMNS.map((col) => {
                const isActive = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={cn(
                      'px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-black/55',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onSortChange(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1 transition-colors hover:text-black',
                        col.align === 'right' && 'justify-end',
                        col.align === 'center' && 'justify-center',
                        isActive && 'text-black'
                      )}
                    >
                      <span>{col.label}</span>
                      <SortIcon active={isActive} dir={sortDir} />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {models.map((m, i) => (
              <tr
                key={m.id}
                className="border-b border-black/[0.04] transition-colors last:border-b-0 hover:bg-[rgba(0,102,255,0.04)]"
              >
                <td className="px-3 py-3 align-middle">
                  <RankCell rank={i + 1} />
                </td>
                <td className="px-3 py-3 align-middle">
                  <ModelCell model={m} />
                </td>
                <td className="px-3 py-3 text-right align-middle">
                  <span className="text-[14px] font-bold text-(--xora-blue) tabular-nums">
                    {m.vibeScore.toFixed(1)}
                  </span>
                </td>
                <td className="px-3 py-3 text-right align-middle">
                  <span className="text-[13px] text-black/75 tabular-nums">{m.speedTps}</span>
                </td>
                <td className="px-3 py-3 text-right align-middle">
                  <span className="text-[13px] text-black/75 tabular-nums">{formatCost(m.costPer1k)}</span>
                </td>
                <td className="px-3 py-3 text-center align-middle">
                  <GradeBadge grade={m.grade} />
                </td>
              </tr>
            ))}
            {models.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-10 text-center text-[12px] text-black/45">
                  No models match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
