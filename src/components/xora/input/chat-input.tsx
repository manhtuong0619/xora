'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Lock, Mic, Paperclip } from 'lucide-react';

import { cn } from '@/lib/utils';

import { AutoModeToggle } from './auto-mode-toggle';
import { ModelSelectorModal } from './model-selector-modal';
import { ModelSelectorTrigger } from './model-selector-trigger';
import { SendButton } from './send-button';

export interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  activeModelIds: string[];
  onToggleModel: (id: string) => void;
  autoMode: boolean;
  onToggleAuto: () => void;
  variant?: 'docked' | 'hero';
}

const ICON_BUTTON =
  'flex size-7 items-center justify-center rounded-[7px] border border-[var(--xora-border)] text-[#bbb] transition-colors hover:bg-[var(--xora-bg-hover)] hover:text-[var(--xora-text-secondary)]';

export function ChatInput({
  value,
  onChange,
  onSubmit,
  activeModelIds,
  onToggleModel,
  autoMode,
  onToggleAuto,
  variant = 'docked',
}: ChatInputProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const empty = value.length === 0;
  const isHero = variant === 'hero';

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (empty) return;
    onSubmit();
  };

  const formNode = (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-[14px] border-[1.5px] border-[var(--xora-blue)] bg-white px-4 py-[14px]"
      style={{ boxShadow: '0 0 0 4px var(--xora-blue-glow)' }}
    >
      <ModelSelectorTrigger count={activeModelIds.length} onClick={() => setPickerOpen(true)} />
      <ModelSelectorModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        selectedIds={activeModelIds}
        onToggle={onToggleModel}
      />

      <AutoModeToggle enabled={autoMode} onToggle={onToggleAuto} />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask any AI anything..."
        className="min-w-0 flex-1 bg-transparent px-1.5 text-[13px] text-[var(--xora-black)] placeholder:text-[var(--xora-muted)] focus:outline-none"
      />

      <div className="flex items-center gap-1.5">
        <button type="button" aria-label="Attach" className={ICON_BUTTON}>
          <Paperclip className="size-3.5" strokeWidth={1.75} />
        </button>
        <button type="button" aria-label="Voice" className={ICON_BUTTON}>
          <Mic className="size-3.5" strokeWidth={1.75} />
        </button>
        <button type="button" aria-label="Privacy mode" className={ICON_BUTTON}>
          <Lock className="size-3.5" strokeWidth={1.75} />
        </button>
        <SendButton onClick={() => handleSubmit()} disabled={empty} />
      </div>
    </form>
  );

  if (isHero) return formNode;

  return (
    <div className={cn('border-t border-[var(--xora-border)] px-5 py-4')}>
      <div className="mx-auto w-full max-w-[560px]">{formNode}</div>
    </div>
  );
}
