import type { Model } from './types';

export const MOCK_MODELS: Model[] = [
  {
    id: 'gpt-5-1',
    name: 'GPT-5.1',
    provider: 'OpenAI',
    tier: 'MAX',
    dotColor: '#10A37F',
    trending: true,
    isNew: true,
    categories: ['Reasoning', 'Fast'],
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    tier: 'PRO',
    dotColor: '#10A37F',
    recent: true,
    categories: ['Fast', 'Images'],
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    tier: 'PRO',
    dotColor: '#D97757',
    trending: true,
    recent: true,
    categories: ['Reasoning', 'Fast'],
  },
  {
    id: 'claude-opus-4-7',
    name: 'Claude Opus 4.7',
    provider: 'Anthropic',
    tier: 'MAX',
    dotColor: '#D97757',
    trending: true,
    isNew: true,
    categories: ['Reasoning'],
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    tier: 'PRO',
    dotColor: '#4285F4',
    trending: true,
    categories: ['Reasoning', 'Search'],
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    tier: 'Free',
    dotColor: '#4285F4',
    categories: ['Fast'],
  },
  {
    id: 'kimi-k2-5',
    name: 'Kimi K2.5',
    provider: 'Moonshot',
    tier: 'PRO',
    dotColor: '#A855F7',
    trending: true,
    isNew: true,
    categories: ['Reasoning', 'Search'],
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    tier: 'Free',
    dotColor: '#0064E0',
    categories: ['Fast'],
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'Mistral',
    tier: 'PRO',
    dotColor: '#FF7000',
    categories: ['Fast', 'Reasoning'],
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    tier: 'Free',
    dotColor: '#1E40AF',
    isNew: true,
    categories: ['Reasoning'],
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    provider: 'xAI',
    tier: 'PRO',
    dotColor: '#E5E7EB',
    isNew: true,
    categories: ['Search', 'Fast'],
  },
  {
    id: 'dall-e-3',
    name: 'DALL·E 3',
    provider: 'OpenAI',
    tier: 'PRO',
    dotColor: '#10A37F',
    categories: ['Images'],
  },
];

export const TRENDING_PAIR_IDS: string[] = [
  'kimi-k2-5',
  'gpt-5-1',
  'claude-sonnet-4-6',
  'gemini-2-5-pro',
  'claude-opus-4-7',
  'grok-4',
];

export function getModelById(id: string): Model | undefined {
  return MOCK_MODELS.find((m) => m.id === id);
}

export function groupByProvider(models: Model[]): Record<string, Model[]> {
  const acc: Record<string, Model[]> = {};
  for (const m of models) {
    const list = acc[m.provider] ?? [];
    list.push(m);
    acc[m.provider] = list;
  }
  return acc;
}

export const DEFAULT_ACTIVE_MODEL_IDS = ['gpt-5-1', 'claude-sonnet-4-6'];
