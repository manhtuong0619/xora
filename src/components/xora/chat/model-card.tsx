'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getModelById } from '@/lib/xora/models';
import type { ModelResponse } from '@/lib/xora/types';

import { CostBadge } from './cost-badge';

interface ModelCardProps {
  response: ModelResponse;
  index?: number;
  active?: boolean;
  onSelect?: () => void;
}

export function ModelCard({ response, index = 0, active, onSelect }: ModelCardProps) {
  const model = getModelById(response.modelId);
  const name = model?.name ?? response.modelId;
  const dot = model?.dotColor ?? '#888';
  const provider = model?.provider ?? '';

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.05 }}
      className={cn(
        'group flex flex-col gap-2.5 rounded-[10px] p-3 text-left transition-colors',
        'xora-glass hover:bg-white',
        active && 'xora-glass-active'
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: dot, boxShadow: `0 0 5px ${dot}55` }}
            aria-hidden
          />
          <span className="truncate text-[12px] font-bold text-black">{name}</span>
          {provider && <span className="hidden truncate text-[11px] text-black/40 sm:inline">· {provider}</span>}
        </div>
        <div className="flex shrink-0 items-center gap-0.5 text-black/40">
          <span
            aria-label="Expand"
            className="flex size-5 items-center justify-center rounded transition-colors group-hover:bg-black/[0.05] group-hover:text-black/85"
          >
            <ArrowUpRight className="size-3" />
          </span>
          <span
            aria-label="More"
            className="flex size-5 items-center justify-center rounded transition-colors group-hover:bg-black/[0.05] group-hover:text-black/85"
          >
            <MoreHorizontal className="size-3" />
          </span>
        </div>
      </header>

      <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-black/72">{response.text}</p>

      <footer className="flex items-center justify-between pt-1">
        <CostBadge costUsdc={response.costUsdc} />
        <span className="text-[10px] text-black/35">tap to focus</span>
      </footer>
    </motion.button>
  );
}
