'use client';

import { PanelLeft } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { PROFILE_USER } from '@/lib/xora/profile';

import { ConnectWallet } from './connect-wallet';
import { XoraLogo } from './xora-logo';

interface NavbarProps {
  expanded: boolean;
  onToggle: () => void;
}

export function Navbar({ expanded, onToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b border-[var(--xora-border)] bg-white">
      <div
        className={cn(
          'flex h-full shrink-0 items-center border-r border-[var(--xora-border)] transition-[width] duration-200 ease-out',
          'w-12',
          expanded ? 'md:w-[220px] md:justify-between md:px-4' : 'md:w-12 md:justify-center md:px-2',
          'justify-center px-2'
        )}
      >
        <Link
          href="/"
          aria-label="Xora home"
          className={cn('flex items-center', 'max-md:hidden', !expanded && 'md:hidden')}
        >
          <XoraLogo />
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          className="flex size-7 items-center justify-center rounded-md border border-[var(--xora-border)] text-[var(--xora-text-secondary)] transition-colors hover:bg-[var(--xora-bg-hover)] hover:text-[var(--xora-black)]"
        >
          <PanelLeft className="size-4" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 px-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--xora-bg-hover)] px-2.5 py-1 text-[11px] font-medium text-[var(--xora-text-secondary)]">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          BETA
        </span>
        <ConnectWallet />
        <Link
          href="/profile"
          aria-label="Profile"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--xora-black)] text-[12px] font-semibold text-white"
        >
          {PROFILE_USER.initials}
        </Link>
      </div>
    </header>
  );
}
