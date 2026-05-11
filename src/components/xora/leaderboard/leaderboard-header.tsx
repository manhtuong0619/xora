export function LeaderboardHeader() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h1 className="text-[28px] font-bold leading-tight text-black">Model Leaderboard</h1>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: '#e8f4ff', color: '#0052CC' }}
        >
          Beta
        </span>
      </div>
      <p className="max-w-2xl text-[13px] text-black/55">
        Compare 20+ AI models by quality, speed, and cost on real Xora usage data.
      </p>
    </header>
  );
}
