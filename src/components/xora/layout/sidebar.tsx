'use client';

import { Bot, History, LayoutGrid, MessageSquare, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { MOCK_RECENT_CHATS } from '@/lib/xora/conversation';
import { PROFILE_USER } from '@/lib/xora/profile';

const ITEMS = [
  { id: 'chat', label: 'Chat', Icon: MessageSquare, href: '/' },
  { id: 'agent', label: 'Agents', Icon: Bot, href: '/agents' },
  { id: 'leaderboard', label: 'Leaderboard', Icon: Trophy, href: '/leaderboard' },
  { id: 'history', label: 'History', Icon: History, href: '/history' },
  { id: 'profile', label: 'Profile', Icon: User, href: '/profile' },
  { id: 'apps', label: 'Apps', Icon: LayoutGrid, href: '#apps' },
] as const;

interface SidebarProps {
  expanded: boolean;
}

export function Sidebar({ expanded }: SidebarProps) {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href.startsWith('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const labelHidden = cn('max-md:hidden', !expanded && 'md:hidden');

  return (
    <aside
      className={cn(
        'z-20 flex shrink-0 flex-col border-r border-[var(--xora-border)] bg-white transition-[width] duration-200 ease-out',
        'w-12',
        expanded ? 'md:w-[220px]' : 'md:w-12'
      )}
    >
      <nav className="flex flex-col gap-1 px-2.5 pt-2.5">
        {ITEMS.map(({ id, label, Icon, href }) => {
          const isActive = isItemActive(href);
          return (
            <Link
              key={id}
              href={href}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-[9px] rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
                expanded ? 'md:justify-start' : 'md:justify-center',
                'max-md:justify-center',
                isActive
                  ? 'bg-[var(--xora-black)] text-white'
                  : 'text-[var(--xora-text-secondary)] hover:bg-[var(--xora-bg-hover)] hover:text-[var(--xora-black)]'
              )}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.75} />
              <span className={cn('truncate', labelHidden)}>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={cn('mt-4 flex min-h-0 flex-1 flex-col px-2.5', labelHidden)}>
        <div className="mb-1 flex items-center justify-between px-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--xora-muted)]">
            Recents
          </span>
          <button
            type="button"
            className="text-[10px] font-medium text-[var(--xora-blue)] transition-colors hover:text-[var(--xora-blue-hover)]"
          >
            View all
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
          {MOCK_RECENT_CHATS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="truncate rounded-md px-2.5 py-[5px] text-left text-[12px] text-[#666] transition-colors hover:bg-[var(--xora-bg-hover)] hover:text-[var(--xora-black)]"
              title={c.title}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'mt-auto flex items-center gap-2.5 border-t border-[var(--xora-border)]',
          expanded ? 'md:justify-start md:px-4 md:py-3' : 'md:justify-center md:px-2 md:py-3',
          'justify-center px-2 py-3'
        )}
      >
        <Link
          href="/profile"
          aria-label="Profile"
          className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[var(--xora-black)] text-[11px] font-semibold text-white"
        >
          {PROFILE_USER.initials}
        </Link>
        <div className={cn('flex min-w-0 flex-col', labelHidden)}>
          <span className="truncate text-[12px] font-medium text-[var(--xora-black)]">{PROFILE_USER.username}</span>
          <span className="text-[10px] text-[var(--xora-muted)]">12.5 USDC</span>
        </div>
      </div>
    </aside>
  );
}
