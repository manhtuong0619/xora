'use client';

import { type LeaderboardModel, PROVIDER_COLORS } from '@/lib/xora/leaderboard';

import { ChartCard, type ChartDatum } from './chart-card';

interface HighlightChartsProps {
  models: LeaderboardModel[];
}

const OPEN_PALETTE = ['#a855f7', '#ec4899', '#3b82f6', '#0ea5e9', '#6366f1', '#d946ef', '#8b5cf6'];

function takeByVibeDesc(models: LeaderboardModel[], n: number): LeaderboardModel[] {
  return [...models].sort((a, b) => b.vibeScore - a.vibeScore).slice(0, n);
}

function mostPreferredData(models: LeaderboardModel[]): ChartDatum[] {
  return takeByVibeDesc(models, 7).map((m) => ({
    name: m.name,
    value: m.vibeScore,
    color: PROVIDER_COLORS[m.provider],
  }));
}

function fastestInTopTenData(models: LeaderboardModel[]): ChartDatum[] {
  const topTen = takeByVibeDesc(models, 10);
  const bySpeed = [...topTen].sort((a, b) => b.speedTps - a.speedTps);
  const fastest = bySpeed[0]?.speedTps ?? 0;
  return bySpeed.map((m) => {
    const ratio = fastest > 0 ? m.speedTps / fastest : 0;
    const color = ratio >= 0.85 ? '#0066ff' : ratio >= 0.6 ? '#94a3b8' : '#cbd5e1';
    return { name: m.name, value: m.speedTps, color };
  });
}

function bestUnderOneDollarData(models: LeaderboardModel[]): ChartDatum[] {
  const cheap = models.filter((m) => m.costPer1k < 0.001);
  return takeByVibeDesc(cheap, 7).map((m) => ({
    name: m.name,
    value: m.vibeScore,
    color: PROVIDER_COLORS[m.provider],
  }));
}

function bestOpenSourceData(models: LeaderboardModel[]): ChartDatum[] {
  const open = models.filter((m) => m.isOpenSource);
  return takeByVibeDesc(open, 7).map((m, i) => ({
    name: m.name,
    value: m.vibeScore,
    color: OPEN_PALETTE[i % OPEN_PALETTE.length],
  }));
}

export function HighlightCharts({ models }: HighlightChartsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard
        title="Most preferred models"
        subtitle="VIBE Score (higher is better)"
        data={mostPreferredData(models)}
        valueFormatter={(v) => v.toFixed(1)}
      />
      <ChartCard
        title="Fastest models in top 10"
        subtitle="Output tokens per second"
        data={fastestInTopTenData(models)}
        valueFormatter={(v) => `${v}`}
      />
      <ChartCard
        title="Best under $1 per 1M tokens"
        subtitle="VIBE Score among low-cost models"
        data={bestUnderOneDollarData(models)}
        valueFormatter={(v) => v.toFixed(1)}
      />
      <ChartCard
        title="Best open-source models"
        subtitle="VIBE Score · open weights only"
        data={bestOpenSourceData(models)}
        valueFormatter={(v) => v.toFixed(1)}
      />
    </section>
  );
}
