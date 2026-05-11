'use client';

import { useEffect, useRef, useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { ConversationItem } from '@/lib/xora/types';

import { ModelCard } from './model-card';
import { UserMessage } from './user-message';

interface ChatBodyProps {
  conversation: ConversationItem[];
}

export function ChatBody({ conversation }: ChatBodyProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [conversation.length]);

  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-5 py-6">
        {conversation.map((item) => {
          if (item.role === 'user') {
            return <UserMessage key={item.id} text={item.text} />;
          }
          return (
            <div key={item.id} className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {item.responses.map((r, i) => {
                const key = `${item.id}-${r.modelId}`;
                return (
                  <ModelCard
                    key={key}
                    response={r}
                    index={i}
                    active={activeKey === key}
                    onSelect={() => setActiveKey((cur) => (cur === key ? null : key))}
                  />
                );
              })}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
