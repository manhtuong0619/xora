import type { ConversationItem, ModelResponse } from './types';

export interface RecentChat {
  id: string;
  title: string;
}

export const MOCK_RECENT_CHATS: RecentChat[] = [
  { id: 'r1', title: 'GPT-5.1 vs Claude on legal contracts' },
  { id: 'r2', title: 'Solana memo program walkthrough' },
  { id: 'r3', title: 'Kimi K2.5 reasoning samples' },
  { id: 'r4', title: 'Compare image generation models' },
  { id: 'r5', title: 'Refactor Rust async pattern' },
  { id: 'r6', title: 'Schema migration safety check' },
  { id: 'r7', title: 'Anthropic vs OpenAI pricing' },
  { id: 'r8', title: 'Postgres pgvector optimization' },
];

export const MOCK_CONVERSATION: ConversationItem[] = [
  {
    id: 'msg-1',
    role: 'user',
    text: 'Compare GPT-5.1 and Claude Sonnet 4.6 on long-context reasoning. Which one would you pick for analyzing a 200-page legal contract?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    responses: [
      {
        modelId: 'gpt-5-1',
        text: 'For a 200-page legal contract, GPT-5.1 has a clear edge on raw context window (1M tokens) and structured-output reliability. Its chain-of-thought is more verbose, which helps when you need an audit trail of why a clause was flagged. Weakness: it occasionally over-hedges and produces longer summaries than necessary. Best fit when downstream review is automated and you want predictable JSON.',
        costUsdc: 0.024,
      },
      {
        modelId: 'claude-sonnet-4-6',
        text: 'Claude Sonnet 4.6 is faster and cheaper per call, with stronger nuance on legal language and better calibration on uncertainty (it will tell you when a clause is ambiguous instead of guessing). For a one-shot human-in-the-loop review, I would pick Sonnet. For a batch pipeline that needs strict schema adherence across 1k contracts, GPT-5.1.',
        costUsdc: 0.011,
      },
    ],
  },
];

export const MOCK_RESPONSES: Record<string, string[]> = {
  'gpt-5-1': [
    "Here is my take: I'd break this down into three parts — context handling, reasoning depth, and cost per token. On the first, my window is large enough to keep the entire document in memory without chunking.",
    'Quick answer: yes, with caveats. The trade-off is between latency and depth — if you need an answer in under 2 seconds, switch to a smaller variant; otherwise, the full reasoning path is worth the wait.',
    'I see two interpretations of your question. Let me address the most likely one first, then circle back to the alternative if relevant.',
  ],
  'gpt-4o': [
    'Short version: the answer depends on which constraint matters most — speed or accuracy. Most users in your situation pick speed, but accuracy is non-negotiable here.',
    "Let me reason through this step by step. First, identify the bottleneck. Second, evaluate the alternatives. Third, pick the one with the best risk/reward ratio. Here's how that plays out:",
  ],
  'claude-sonnet-4-6': [
    "I want to flag some uncertainty here: there's a clause in your prompt that's ambiguous between two readings. Before answering, here's what I'd want to confirm.",
    "Concise answer: this works for the standard case but breaks on edge cases involving null state. I'd add an explicit guard clause at the boundary rather than relying on coercion downstream.",
    'Honest take — this is a judgement call, not a fact. The community is split roughly 60/40 in favor of approach A, but both ship in production.',
  ],
  'claude-opus-4-7': [
    "Let me think about this carefully. There are three forces in tension: correctness, ergonomics, and migration cost. I'll weigh each, then give you a recommendation with the reasoning made explicit.",
    "Here's a more nuanced view than the typical answer. The standard advice optimizes for the median case, but your constraints look closer to the 90th percentile — so the calculus shifts.",
  ],
  'gemini-2-5-pro': [
    "Based on my latest information, here's what I can tell you. I'll cite sources where I have them and flag which parts are inferred.",
    "Synthesizing across multiple sources: the consensus position is X, but there's a credible minority view from Y. The disagreement comes down to a difference in priors, not facts.",
  ],
  'gemini-2-5-flash': [
    'Quick take: yes. The official docs cover this directly under section 4. If you need the long version, ask and I will expand.',
    'Three-line summary: the cause is a missing index. The fix is one migration. The risk is a brief lock on a hot table — schedule it during low-traffic hours.',
  ],
  'kimi-k2-5': [
    "I'll lay out the search results first, then synthesize. Three sources are directly relevant; two contradict each other. Here's how I'd reconcile them.",
    'Consider this from first principles. What is the irreducible problem here? Once stripped of accidental complexity, the answer is more obvious than the framing suggests.',
  ],
  'llama-3-3-70b': [
    'Direct answer: this is a known pattern. The standard solution is straightforward, but there are two gotchas at scale that the docs do not mention prominently.',
  ],
  'mistral-large-2': [
    'Short reply: yes, with one caveat. The caveat matters in production but not in development, which is why teams are surprised when they hit it.',
  ],
  'deepseek-v3': [
    'Reasoning trace: starting from the assumptions, working forward, the conclusion follows in three steps. Each step is verifiable independently.',
  ],
  'grok-4': [
    "The mainstream answer is X, but it's wrong in your specific case for a non-obvious reason. Let me show you why and what to do instead.",
  ],
  'dall-e-3': [
    '[Image generated] A composition in the requested style with the requested subject. Generated at 1024×1024.',
  ],
};

export function buildAssistantResponses(modelIds: string[], userText: string): ModelResponse[] {
  return modelIds.map((id) => {
    const samples = MOCK_RESPONSES[id] ?? [
      "I don't have a tailored response for this prompt yet — but here's how I'd approach it.",
    ];
    const text = samples[Math.floor(Math.random() * samples.length)];
    const cost = +(0.005 + Math.random() * 0.04).toFixed(3);
    return {
      modelId: id,
      text: `${text}\n\nRe: "${userText.slice(0, 80)}${userText.length > 80 ? '…' : ''}"`,
      costUsdc: cost,
    };
  });
}
