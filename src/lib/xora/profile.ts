export interface ProfileUser {
  username: string;
  initials: string;
  email: string;
  joinedLabel: string;
  badge: string;
}

export interface ProfileStats {
  totalApiCalls: number;
  usdcSpent: number;
  modelsUsed: number;
}

export interface ProfileWallet {
  fullAddress: string;
  truncatedAddress: string;
  usdcBalance: number;
}

export type ConversationModelFamily = 'GPT' | 'Claude' | 'Gemini';

export interface ProfileConversation {
  id: string;
  title: string;
  models: ConversationModelFamily[];
  costUsdc: number;
  timestampLabel: string;
}

export interface UsageDay {
  day: string;
  count: number;
}

export const PROFILE_USER: ProfileUser = {
  username: 'nguyen.sol',
  initials: 'NG',
  email: 'nguyen@xora.ai',
  joinedLabel: 'Joined Mar 2026',
  badge: 'Pro User · Solana Builder',
};

export const PROFILE_STATS: ProfileStats = {
  totalApiCalls: 14238,
  usdcSpent: 28.4,
  modelsUsed: 9,
};

export const PROFILE_WALLET: ProfileWallet = {
  fullAddress: '7vF3aR2pK8nQwLmJxYbHsT4eU9cZ6dXgM1oVnB5fK9aB',
  truncatedAddress: '7vF3aR2p…K9aB',
  usdcBalance: 124.5,
};

export const PROFILE_CONVERSATIONS: ProfileConversation[] = [
  {
    id: 'c1',
    title: 'Compare GPT-5.1 and Claude on legal contracts',
    models: ['GPT', 'Claude'],
    costUsdc: 0.035,
    timestampLabel: '2h ago',
  },
  {
    id: 'c2',
    title: 'Solana memo program walkthrough',
    models: ['Claude'],
    costUsdc: 0.012,
    timestampLabel: '5h ago',
  },
  {
    id: 'c3',
    title: 'Gemini-only retrieval over 500 PDFs',
    models: ['Gemini'],
    costUsdc: 0.083,
    timestampLabel: 'Yesterday',
  },
  {
    id: 'c4',
    title: 'Side-by-side: Sonnet vs Gemini for code review',
    models: ['Claude', 'Gemini'],
    costUsdc: 0.041,
    timestampLabel: '2d ago',
  },
  {
    id: 'c5',
    title: 'GPT-5.1 schema migration safety pass',
    models: ['GPT'],
    costUsdc: 0.019,
    timestampLabel: '3d ago',
  },
  {
    id: 'c6',
    title: 'Triple-model brainstorm on tokenomics',
    models: ['GPT', 'Claude', 'Gemini'],
    costUsdc: 0.064,
    timestampLabel: '4d ago',
  },
];

export const PROFILE_USAGE: UsageDay[] = [
  { day: 'Mon', count: 184 },
  { day: 'Tue', count: 312 },
  { day: 'Wed', count: 226 },
  { day: 'Thu', count: 401 },
  { day: 'Fri', count: 357 },
  { day: 'Sat', count: 145 },
  { day: 'Sun', count: 268 },
];

export const PROFILE_API_KEY = 'xora_sk_live_8f3kJ2nQwLmJxYbHsT4eU9cZ6dXgM1oVnB5fK9aB';

export function maskApiKey(key: string): string {
  if (key.length <= 12) return key;
  return `${key.slice(0, 10)}${'•'.repeat(20)}${key.slice(-4)}`;
}
