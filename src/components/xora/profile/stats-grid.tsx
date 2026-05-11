import { PROFILE_STATS } from '@/lib/xora/profile';

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[10px] bg-[#f8f8f8] px-4 py-6 text-center">
      <span className="text-[28px] font-bold leading-tight text-(--xora-blue) tabular-nums">{value}</span>
      <span className="mt-1 text-[12px] font-medium text-black/55">{label}</span>
    </div>
  );
}

export function StatsGrid() {
  const { totalApiCalls, usdcSpent, modelsUsed } = PROFILE_STATS;

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard label="Total API Calls" value={totalApiCalls.toLocaleString('en-US')} />
      <StatCard label="USDC Spent" value={`$${usdcSpent.toFixed(2)}`} />
      <StatCard label="Models Used" value={modelsUsed.toString()} />
    </section>
  );
}
