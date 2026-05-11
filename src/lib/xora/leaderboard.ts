export type LeaderboardProvider =
  | 'OpenAI'
  | 'Anthropic'
  | 'Google'
  | 'Meta'
  | 'Mistral'
  | 'DeepSeek'
  | 'xAI'
  | 'Moonshot'
  | 'Microsoft';

export type LeaderboardCategory = 'Text' | 'Image' | 'Coding' | 'Speed';

export type Grade = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C';

export interface LeaderboardModel {
  id: string;
  name: string;
  provider: LeaderboardProvider;
  vibeScore: number;
  speedTps: number;
  costPer1k: number;
  grade: Grade;
  categories: LeaderboardCategory[];
  isOpenSource: boolean;
  usageRank: number;
}

export const PROVIDER_COLORS: Record<LeaderboardProvider, string> = {
  OpenAI: '#10A37F',
  Anthropic: '#D97757',
  Google: '#4285F4',
  Meta: '#A855F7',
  Mistral: '#FF7000',
  DeepSeek: '#1E40AF',
  xAI: '#111111',
  Moonshot: '#7C3AED',
  Microsoft: '#0EA5E9',
};

export const GRADE_STYLES: Record<Grade, { bg: string; fg: string }> = {
  'A+': { bg: '#dcfce7', fg: '#15803d' },
  A: { bg: '#dcfce7', fg: '#15803d' },
  'B+': { bg: '#dbeafe', fg: '#1d4ed8' },
  B: { bg: '#dbeafe', fg: '#1d4ed8' },
  'C+': { bg: '#fef3c7', fg: '#a16207' },
  C: { bg: '#fef3c7', fg: '#a16207' },
};

export const LEADERBOARD_SUMMARY = {
  modelsRanked: 23,
  totalApiCalls: '1.2M',
  usdcVolume: '4,820',
  dataStatus: 'Live',
} as const;

export type FilterTab = 'all' | 'text' | 'image' | 'coding' | 'speed' | 'most-used';

export const FILTER_TABS: { id: FilterTab; label: string; featured?: boolean }[] = [
  { id: 'all', label: 'All' },
  { id: 'text', label: 'Text' },
  { id: 'image', label: 'Image' },
  { id: 'coding', label: 'Coding' },
  { id: 'speed', label: 'Speed' },
  { id: 'most-used', label: 'Most used on Xora', featured: true },
];

export function filterByTab(models: LeaderboardModel[], tab: FilterTab): LeaderboardModel[] {
  if (tab === 'all') return models;
  if (tab === 'most-used') {
    return [...models].sort((a, b) => a.usageRank - b.usageRank).slice(0, 10);
  }
  const map: Record<Exclude<FilterTab, 'all' | 'most-used'>, LeaderboardCategory> = {
    text: 'Text',
    image: 'Image',
    coding: 'Coding',
    speed: 'Speed',
  };
  return models.filter((m) => m.categories.includes(map[tab]));
}

export type SortKey = 'rank' | 'name' | 'vibeScore' | 'speedTps' | 'costPer1k' | 'grade';
export type SortDir = 'asc' | 'desc';

const GRADE_ORDER: Record<Grade, number> = {
  'A+': 6,
  A: 5,
  'B+': 4,
  B: 3,
  'C+': 2,
  C: 1,
};

export function sortModels(models: LeaderboardModel[], key: SortKey, dir: SortDir): LeaderboardModel[] {
  const sorted = [...models];
  sorted.sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case 'rank':
        cmp = b.vibeScore - a.vibeScore;
        break;
      case 'name':
        cmp = a.name.localeCompare(b.name);
        break;
      case 'vibeScore':
        cmp = a.vibeScore - b.vibeScore;
        break;
      case 'speedTps':
        cmp = a.speedTps - b.speedTps;
        break;
      case 'costPer1k':
        cmp = a.costPer1k - b.costPer1k;
        break;
      case 'grade':
        cmp = GRADE_ORDER[a.grade] - GRADE_ORDER[b.grade];
        break;
    }
    return dir === 'asc' ? cmp : -cmp;
  });
  return sorted;
}

export function formatCost(cost: number): string {
  if (cost < 0.001) return `$${cost.toFixed(4)}`;
  return `$${cost.toFixed(3)}`;
}
