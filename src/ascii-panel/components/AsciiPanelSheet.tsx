'use client';

import type { ReactNode } from 'react';

type AsciiPanelSheetProps = {
  isClosing: boolean;
  ariaLabel: string;
  children: ReactNode;
};

export function AsciiPanelSheet({
  isClosing,
  ariaLabel,
  children,
}: AsciiPanelSheetProps) {
  return (
    <div
      className={`absolute inset-0 bg-[color:color-mix(in_srgb,var(--bg)_46%,transparent)] p-[0.65rem] pt-[0.65rem] backdrop-blur-[2px] ${isClosing ? 'br-frame-sheet-backdrop-out' : 'br-frame-sheet-backdrop-in'}`}
    >
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-[0.9rem] border border-blue-line bg-[var(--bg-glass-95)] shadow-[0_16px_30px_color-mix(in_srgb,var(--bg)_72%,transparent)] ${isClosing ? 'br-frame-sheet-panel-out' : 'br-frame-sheet-panel-in'}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  );
}
