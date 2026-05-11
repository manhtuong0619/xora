import { LEADERBOARD_SUMMARY } from '@/lib/xora/leaderboard';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[10px] bg-[#f8f8f8] px-4 py-5 text-center">
      <div className="text-[22px] font-bold leading-tight text-black tabular-nums">{value}</div>
      <div className="mt-1 text-[11px] font-medium text-black/55">{label}</div>
    </div>
  );
}

export function SummaryStats() {
  const { modelsRanked, totalApiCalls, usdcVolume, dataStatus } = LEADERBOARD_SUMMARY;

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Models Ranked" value={modelsRanked} />
      <StatCard label="Total API Calls" value={totalApiCalls} />
      <StatCard label="USDC Volume" value={usdcVolume} />
      <StatCard
        label="Data"
        value={
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>{dataStatus}</span>
          </span>
        }
      />
    </section>
  );
}
