'use client';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PROFILE_USER } from '@/lib/xora/profile';

export function ProfileHero() {
  const { username, initials, email, joinedLabel, badge } = PROFILE_USER;

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="flex size-14 items-center justify-center rounded-full text-[16px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #0066ff 0%, #22d3ee 100%)' }}
          aria-hidden
        >
          {initials}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[20px] font-semibold leading-none text-black">{username}</h1>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ background: '#e8f4ff', color: '#0052CC' }}
            >
              {badge}
            </span>
          </div>
          <p className="text-[12px] text-black/55">
            {email} · {joinedLabel}
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-9 self-start rounded-md border-black/15 bg-white px-4 text-[13px] font-medium text-black hover:bg-black/[0.04] md:self-auto"
      >
        <Pencil className="size-3.5" aria-hidden />
        Edit Profile
      </Button>
    </section>
  );
}
