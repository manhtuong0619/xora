import { PROFILE_USAGE } from '@/lib/xora/profile';

export function UsageChart() {
  const max = Math.max(...PROFILE_USAGE.map((d) => d.count), 1);

  return (
    <section className="flex flex-col gap-3 rounded-[10px] border border-black/[0.06] bg-white p-4">
      <h2 className="text-[14px] font-semibold text-black">API calls this week</h2>

      <div className="flex flex-col gap-2">
        {PROFILE_USAGE.map((d) => {
          const widthPct = Math.max((d.count / max) * 100, 4);
          return (
            <div key={d.day} className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-[11px] font-medium text-black/55">{d.day}</span>
              <div className="flex-1">
                <div
                  className="h-5 rounded-md bg-(--xora-blue)"
                  style={{ width: `${widthPct}%` }}
                  aria-label={`${d.day}: ${d.count} calls`}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-[11px] font-medium text-black tabular-nums">
                {d.count}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
