'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { CopyButton } from '@/components/copy-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { MOCK_MODELS } from '@/lib/xora/models';
import { maskApiKey, PROFILE_API_KEY } from '@/lib/xora/profile';

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-(--xora-blue)' : 'bg-black/15'
      )}
    >
      <span
        className={cn(
          'inline-block size-4 transform rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

interface RowProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Row({ title, description, children }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-black">{title}</p>
        {description && <p className="mt-0.5 text-[11px] text-black/55">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function SettingsSection() {
  const [open, setOpen] = useState(true);
  const [defaultModel, setDefaultModel] = useState('gpt-5-1');
  const [autoSelect, setAutoSelect] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyInApp, setNotifyInApp] = useState(false);

  return (
    <section className="rounded-[10px] border border-black/[0.06] bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-[14px] font-semibold text-black">Settings</span>
        <ChevronDown
          className={cn('size-4 text-black/55 transition-transform', open ? 'rotate-180' : 'rotate-0')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="divide-y divide-black/[0.06] border-t border-black/[0.06] px-4">
          <Row title="Default model" description="Pre-selected when starting a new chat">
            <Select value={defaultModel} onValueChange={setDefaultModel}>
              <SelectTrigger className="h-8 w-[200px] rounded-md border-black/15 bg-white text-[12px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="text-[12px]">
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>

          <Row title="Auto-select model" description="Let Xora pick the best model per prompt">
            <Toggle checked={autoSelect} onChange={setAutoSelect} label="Auto-select model" />
          </Row>

          <Row title="Email notifications" description="Usage summaries and billing alerts">
            <Toggle checked={notifyEmail} onChange={setNotifyEmail} label="Email notifications" />
          </Row>

          <Row title="In-app notifications" description="Show toasts for completions and errors">
            <Toggle checked={notifyInApp} onChange={setNotifyInApp} label="In-app notifications" />
          </Row>

          <Row title="API key" description="Use this key to call Xora from your apps">
            <div className="flex items-center gap-2">
              <code className="rounded-md bg-[#f8f8f8] px-2 py-1 font-mono text-[11px] text-black/75">
                {maskApiKey(PROFILE_API_KEY)}
              </code>
              <CopyButton text={PROFILE_API_KEY} size="sm" />
            </div>
          </Row>
        </div>
      )}
    </section>
  );
}
