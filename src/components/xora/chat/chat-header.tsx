'use client';

import { Download, Plus } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  onNewChat?: () => void;
  onExport?: () => void;
}

export function ChatHeader({ title, onNewChat, onExport }: ChatHeaderProps) {
  return (
    <div className="flex h-12 items-center justify-between gap-3 border-b border-black/[0.06] px-5">
      <h1 className="truncate text-[14px] font-medium text-black/85" title={title}>
        {title}
      </h1>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onNewChat}
          aria-label="New chat"
          className="flex size-8 items-center justify-center rounded-md text-black/55 transition-colors hover:bg-black/[0.05] hover:text-black"
        >
          <Plus className="size-4" />
        </button>
        <button
          type="button"
          onClick={onExport}
          aria-label="Export"
          className="flex size-8 items-center justify-center rounded-md text-black/55 transition-colors hover:bg-black/[0.05] hover:text-black"
        >
          <Download className="size-4" />
        </button>
      </div>
    </div>
  );
}
