'use client';

import { useMemo, useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { PageShell } from '@/components/xora/layout/page-shell';
import { FilterTabs } from '@/components/xora/leaderboard/filter-tabs';
import { HighlightCharts } from '@/components/xora/leaderboard/highlight-charts';
import { LeaderboardHeader } from '@/components/xora/leaderboard/leaderboard-header';
import { LeaderboardTable } from '@/components/xora/leaderboard/leaderboard-table';
import { SummaryStats } from '@/components/xora/leaderboard/summary-stats';
import { filterByTab, type FilterTab, type SortDir, type SortKey, sortModels } from '@/lib/xora/leaderboard';
import { LEADERBOARD_MODELS } from '@/lib/xora/leaderboard-data';

export default function LeaderboardPage() {
  const [tab, setTab] = useState<FilterTab>('all');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSortChange = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'rank' || key === 'name' ? 'asc' : 'desc');
    }
  };

  const filtered = useMemo(() => filterByTab(LEADERBOARD_MODELS, tab), [tab]);
  const sorted = useMemo(() => sortModels(filtered, sortKey, sortDir), [filtered, sortKey, sortDir]);

  return (
    <PageShell>
      <ScrollArea className="flex-1 min-h-0">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8">
          <LeaderboardHeader />
          <FilterTabs active={tab} onChange={setTab} />
          <SummaryStats />
          <LeaderboardTable models={sorted} sortKey={sortKey} sortDir={sortDir} onSortChange={handleSortChange} />
          <HighlightCharts models={filtered} />
        </div>
      </ScrollArea>
    </PageShell>
  );
}
