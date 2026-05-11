'use client';

import { type ReactNode, useState } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

interface PageShellProps {
  children: ReactNode;
  initialCollapsedSidebar?: boolean;
}

export function PageShell({ children, initialCollapsedSidebar = false }: PageShellProps) {
  const [expanded, setExpanded] = useState(!initialCollapsedSidebar);

  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden">
      <Navbar expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      <div className="flex flex-1 min-h-0">
        <Sidebar expanded={expanded} />
        <main className="flex flex-1 flex-col min-h-0 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
