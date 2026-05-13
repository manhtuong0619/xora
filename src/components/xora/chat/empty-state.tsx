'use client';

import Image from 'next/image';

import { ChatInput, type ChatInputProps } from '@/components/xora/input/chat-input';
import { QuickActionButtons } from '@/components/xora/input/quick-action-buttons';
import { SuggestionChips } from '@/components/xora/input/suggestion-chips';

type EmptyStateProps = Omit<ChatInputProps, 'variant'>;

export function EmptyState(props: EmptyStateProps) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 110%, rgba(0,102,255,0.07) 0%, rgba(255,255,255,0) 70%)',
      }}
    >
      <div className="flex w-full flex-col items-center">
        <Image
          src="/xora.svg"
          alt="Xora"
          height={48}
          width={48 * (1440 / 810)}
          priority
          unoptimized
          style={{ marginBottom: 16 }}
        />
        <h1
          className="text-center text-[28px] font-extrabold text-[var(--xora-black)] sm:text-[36px]"
          style={{ letterSpacing: '-0.02em', lineHeight: 1.18, marginBottom: 32 }}
        >
          Ask any AI, side by side.
        </h1>

        <div className="w-full max-w-[700px]">
          <ChatInput {...props} variant="hero" />
        </div>

        <div className="mt-[18px] w-full max-w-2xl">
          <SuggestionChips onPick={props.onChange} />
        </div>

        <div className="mt-[22px]">
          <QuickActionButtons />
        </div>
      </div>
    </div>
  );
}
