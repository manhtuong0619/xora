'use client';

import { useState } from 'react';
import { Code2, Coins, Headphones, PenLine, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { PageShell } from '@/components/xora/layout/page-shell';
import { cn } from '@/lib/utils';

type AgentCategory = 'All' | 'Research' | 'Writing' | 'Coding' | 'Crypto' | 'Support';

const CATEGORY_STYLES: Record<
  Exclude<AgentCategory, 'All'>,
  { bg: string; iconColor: string; Icon: LucideIcon }
> = {
  Research: { bg: '#eff6ff', iconColor: '#0066FF', Icon: Search },
  Writing: { bg: '#f0fdf4', iconColor: '#16a34a', Icon: PenLine },
  Coding: { bg: '#faf5ff', iconColor: '#7c3aed', Icon: Code2 },
  Crypto: { bg: '#fffbeb', iconColor: '#d97706', Icon: Coins },
  Support: { bg: '#fff1f2', iconColor: '#e11d48', Icon: Headphones },
};

interface Agent {
  id: string;
  name: string;
  description: string;
  category: Exclude<AgentCategory, 'All'>;
  models: string[];
  cost: string;
  pro?: boolean;
}

const AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Solana Research',
    description: 'Deep on-chain data research',
    category: 'Research',
    models: ['Claude', 'GPT'],
    cost: '~0.008 USDC',
  },
  {
    id: '2',
    name: 'Crypto News Digest',
    description: 'Daily crypto news summary',
    category: 'Research',
    models: ['Gemini'],
    cost: '~0.003 USDC',
  },
  {
    id: '3',
    name: 'Market Analyst',
    description: 'Token analysis and insights',
    category: 'Research',
    models: ['GPT'],
    cost: '~0.006 USDC',
    pro: true,
  },
  {
    id: '4',
    name: 'Pitch Deck Writer',
    description: 'Write investor pitch decks',
    category: 'Writing',
    models: ['Claude'],
    cost: '~0.012 USDC',
  },
  {
    id: '5',
    name: 'Thread Generator',
    description: 'Twitter/X thread from ideas',
    category: 'Writing',
    models: ['GPT'],
    cost: '~0.004 USDC',
  },
  {
    id: '6',
    name: 'Vietnamese Translator',
    description: 'Translate any content',
    category: 'Writing',
    models: ['Gemini'],
    cost: '~0.002 USDC',
  },
  {
    id: '7',
    name: 'Rust Smart Contract',
    description: 'Solana Anchor contracts',
    category: 'Coding',
    models: ['Claude'],
    cost: '~0.010 USDC',
    pro: true,
  },
  {
    id: '8',
    name: 'Code Reviewer',
    description: 'Review and suggest fixes',
    category: 'Coding',
    models: ['GPT', 'Claude'],
    cost: '~0.007 USDC',
  },
  {
    id: '9',
    name: 'Bug Hunter',
    description: 'Find bugs in your code',
    category: 'Coding',
    models: ['Llama'],
    cost: '~0.003 USDC',
  },
  {
    id: '10',
    name: 'Wallet Analyzer',
    description: 'Analyze any Solana wallet',
    category: 'Crypto',
    models: ['GPT'],
    cost: '~0.005 USDC',
  },
  {
    id: '11',
    name: 'DeFi Explainer',
    description: 'Explain DeFi protocols',
    category: 'Crypto',
    models: ['Claude'],
    cost: '~0.004 USDC',
  },
  {
    id: '12',
    name: 'NFT Appraiser',
    description: 'Estimate NFT collection value',
    category: 'Crypto',
    models: ['Gemini'],
    cost: '~0.006 USDC',
    pro: true,
  },
];

const FILTER_PILLS: AgentCategory[] = ['All', 'Research', 'Writing', 'Coding', 'Crypto', 'Support'];

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState<AgentCategory>('All');
  const [search, setSearch] = useState('');

  const filtered = AGENTS.filter((a) => {
    const matchFilter = activeFilter === 'All' || a.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <PageShell>
      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex w-full max-w-5xl flex-col px-5 py-8">
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0a0a0a]">Agents</h1>
            <p className="mt-1 text-[13px] text-[#888]">
              Prebuilt AI agents for real tasks. Click and use instantly.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setActiveFilter(pill)}
                  className={cn(
                    'rounded-full px-3.5 py-[5px] text-[11px] font-medium transition-colors',
                    activeFilter === pill
                      ? 'bg-[#0a0a0a] text-white'
                      : 'border border-[#e5e5e5] text-[#666] hover:bg-[#f5f5f5]'
                  )}
                >
                  {pill}
                </button>
              ))}
            </div>
            <div className="relative ml-4 shrink-0">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-[14px] -translate-y-1/2 text-[#aaa]" />
              <input
                type="text"
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-[32px] w-[240px] rounded-[9px] border border-[#e5e5e5] bg-[#f5f5f5] pl-8 pr-3 text-[12px] text-[#0a0a0a] outline-none placeholder:text-[#aaa] focus:border-[#0066ff]"
              />
            </div>
          </div>

          <div
            className="mt-5 flex items-center justify-between rounded-[14px] px-6 py-5"
            style={{ background: '#0a0a0a' }}
          >
            <div>
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] text-white"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                Featured
              </span>
              <h2 className="mt-2 text-[18px] font-bold text-white">Solana Research Agent</h2>
              <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Deep research on Solana ecosystem, protocols, and on-chain data
              </p>
              <button
                type="button"
                className="mt-3.5 rounded-lg bg-[#0066ff] px-4 py-[7px] text-[12px] font-semibold text-white transition-colors hover:bg-[#0052cc]"
              >
                Use Agent →
              </button>
            </div>
            <div
              className="ml-6 flex size-14 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <Search className="size-6 text-white" strokeWidth={1.75} />
            </div>
          </div>

          <div
            className="mt-5 grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
          >
            {filtered.map((agent) => {
              const style = CATEGORY_STYLES[agent.category];
              const AgentIcon = style.Icon;
              return (
                <div
                  key={agent.id}
                  className="cursor-pointer rounded-xl border border-[#ebebeb] bg-white p-4 transition-all duration-200 hover:border-[#0066ff] hover:shadow-[0_0_0_3px_rgba(0,102,255,0.06)]"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex size-10 items-center justify-center rounded-xl"
                      style={{ background: style.bg }}
                    >
                      <AgentIcon className="size-[18px]" style={{ color: style.iconColor }} strokeWidth={1.75} />
                    </div>
                    {agent.pro && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[9px] font-bold"
                        style={{ background: '#fef3c7', color: '#92400e' }}
                      >
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-[13px] font-semibold text-[#0a0a0a]">{agent.name}</p>
                  <p className="mt-1 text-[11px] leading-[1.5] text-[#888]">{agent.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {agent.models.map((m) => (
                        <span
                          key={m}
                          className="rounded px-1.5 py-0.5 text-[9px] font-medium"
                          style={{ background: '#f5f5f5', color: '#666' }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-[#0066ff]">{agent.cost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </PageShell>
  );
}
