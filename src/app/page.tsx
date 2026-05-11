'use client';

import { useCallback, useState } from 'react';

import { ChatBody } from '@/components/xora/chat/chat-body';
import { ChatHeader } from '@/components/xora/chat/chat-header';
import { EmptyState } from '@/components/xora/chat/empty-state';
import { ChatInput } from '@/components/xora/input/chat-input';
import { PageShell } from '@/components/xora/layout/page-shell';
import { buildAssistantResponses } from '@/lib/xora/conversation';
import { DEFAULT_ACTIVE_MODEL_IDS } from '@/lib/xora/models';
import type { ConversationItem } from '@/lib/xora/types';

export default function HomePage() {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeModelIds, setActiveModelIds] = useState<string[]>(DEFAULT_ACTIVE_MODEL_IDS);
  const [autoMode, setAutoMode] = useState(true);
  const [title, setTitle] = useState('New conversation');

  const handleSubmit = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    const ids = activeModelIds.length > 0 ? activeModelIds : DEFAULT_ACTIVE_MODEL_IDS;
    const userId = `u-${Date.now()}`;
    const aId = `a-${Date.now()}`;
    setConversation((prev) => [
      ...prev,
      { id: userId, role: 'user', text },
      {
        id: aId,
        role: 'assistant',
        responses: buildAssistantResponses(ids, text),
      },
    ]);
    setInputValue('');
    if (conversation.length === 0) setTitle(text.slice(0, 64));
  }, [inputValue, activeModelIds, conversation.length]);

  const handleToggleModel = useCallback((id: string) => {
    setActiveModelIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }, []);

  const handleNewChat = useCallback(() => {
    setConversation([]);
    setInputValue('');
    setTitle('New conversation');
  }, []);

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(conversation, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xora-chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [conversation]);

  const isEmpty = conversation.length === 0;

  return (
    <PageShell>
      {isEmpty ? (
        <EmptyState
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          activeModelIds={activeModelIds}
          onToggleModel={handleToggleModel}
          autoMode={autoMode}
          onToggleAuto={() => setAutoMode((a) => !a)}
        />
      ) : (
        <>
          <ChatHeader title={title} onNewChat={handleNewChat} onExport={handleExport} />
          <ChatBody conversation={conversation} />
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            activeModelIds={activeModelIds}
            onToggleModel={handleToggleModel}
            autoMode={autoMode}
            onToggleAuto={() => setAutoMode((a) => !a)}
          />
        </>
      )}
    </PageShell>
  );
}
