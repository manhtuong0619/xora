import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { TooltipProvider } from '@/components/ui/tooltip';

import './globals.css';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Xora — Multi-Model AI Chat',
  description:
    'Xora is a multi-model AI chat workspace. Compare answers from leading models side by side, pay per response in USDC.',
  keywords: ['xora', 'ai chat', 'multi-model', 'gpt', 'claude', 'gemini', 'usdc', 'crypto ai'],
  openGraph: {
    title: 'Xora — Multi-Model AI Chat',
    description: 'Compare leading AI models side by side. Pay per response in USDC.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-(--xora-bg) text-(--xora-text) antialiased">
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
