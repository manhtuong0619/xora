# Xora — Multi-Model AI Chat

Compare answers from leading AI models side by side. Pay per response in USDC.

## Features

- **Multi-model chat** — run GPT, Claude, Gemini, Llama, and more in parallel
- **Side-by-side responses** — compare model outputs in a single view
- **Pay-per-use** — responses priced in USDC via x402
- **Model leaderboard** — rank models by quality, speed, and cost on real usage data
- **Agents** — prebuilt AI agents for research, writing, coding, and crypto tasks
- **History** — full conversation history across every model

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + Radix UI primitives
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier (write) |
| `pnpm test` | Vitest unit tests |
| `pnpm add:ui` | Add a shadcn/ui component |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Chat (home)
│   ├── history/          # Conversation history
│   ├── agents/           # Prebuilt agents
│   ├── leaderboard/      # Model leaderboard
│   └── profile/          # User profile
├── components/
│   ├── ui/               # shadcn/ui primitives
│   └── xora/             # App-specific components
│       ├── chat/         # Chat body, model cards, cost badge
│       ├── input/        # Chat input, model selector
│       ├── layout/       # Sidebar, navbar, page shell
│       ├── leaderboard/  # Leaderboard table and charts
│       └── profile/      # Profile hero, stats, wallet
└── lib/
    └── xora/             # Data types, mock data, utilities
```
