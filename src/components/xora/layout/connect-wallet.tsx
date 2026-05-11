'use client';

import { useState } from 'react';
import { Wallet } from 'lucide-react';

import { cn } from '@/lib/utils';

const FAKE_ADDRESS = '7vF3...K9aB';

export function ConnectWallet() {
  const [connected, setConnected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setConnected((c) => !c)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-[7px] text-[12px] font-semibold transition-colors',
        connected
          ? 'border border-[var(--xora-border)] bg-white text-[var(--xora-black)] hover:bg-[var(--xora-bg-hover)]'
          : 'bg-[var(--xora-black)] text-white hover:bg-[#333]'
      )}
    >
      <Wallet className="size-3.5" strokeWidth={2} aria-hidden />
      {connected ? FAKE_ADDRESS : 'Connect Wallet'}
    </button>
  );
}
