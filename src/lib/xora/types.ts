export type Provider = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'Mistral' | 'DeepSeek' | 'xAI' | 'Moonshot';

export type ModelTier = 'PRO' | 'MAX' | 'Free';

export type ModelCategory = 'Reasoning' | 'Fast' | 'Search' | 'Images';

export interface Model {
  id: string;
  name: string;
  provider: Provider;
  tier: ModelTier;
  dotColor: string;
  trending?: boolean;
  recent?: boolean;
  isNew?: boolean;
  categories?: ModelCategory[];
}

export interface ModelResponse {
  modelId: string;
  text: string;
  costUsdc: number;
}

export type ConversationItem =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; responses: ModelResponse[] };
