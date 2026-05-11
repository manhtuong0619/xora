'use client';

import { Button } from '@/components/ui/button';
import { PROFILE_WALLET } from '@/lib/xora/profile';

export function WalletCard() {
  const { truncatedAddress, usdcBalance } = PROFILE_WALLET;

  return (
    <section className="flex flex-col gap-3 rounded-[10px] bg-[#f8f8f8] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-black text-white"
            aria-label="Solana"
          >
            <span className="text-[18px] leading-none">◎</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[13px] font-medium text-black">{truncatedAddress}</span>
            <span className="text-[12px] text-black/55 tabular-nums">${usdcBalance.toFixed(2)} USDC</span>
          </div>
        </div>

        <Button
          type="button"
          className="h-9 self-start rounded-md bg-(--xora-blue) px-4 text-[13px] font-medium text-white hover:bg-(--xora-blue-hover) sm:self-auto"
        >
          Top up
        </Button>
      </div>

      <button
        type="button"
        className="self-start text-[12px] font-medium text-red-600 transition-colors hover:text-red-700"
      >
        Disconnect
      </button>
    </section>
  );
}
