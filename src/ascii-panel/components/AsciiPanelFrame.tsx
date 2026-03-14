'use client';

import type { ReactNode } from 'react';

type AsciiPanelFrameProps = {
  title: string;
  topAction?: ReactNode;
  footerAction?: ReactNode;
  children: ReactNode;
  overlay?: ReactNode;
};

export function AsciiPanelFrame({
  title,
  topAction,
  footerAction,
  children,
  overlay,
}: AsciiPanelFrameProps) {
  return (
    <div
      className="relative hidden aspect-[3/5] w-[min(320px,100%)] self-start justify-self-end overflow-hidden bg-transparent shadow-[inset_0_0_0_1px_var(--blue-line)] min-[980px]:block"
      role="group"
      aria-label="App preview frame"
    >
      <div className="absolute inset-0 flex min-h-0 flex-col gap-3 bg-[url('/textures/texture-dots-light.svg')] bg-[length:240px_240px] bg-repeat p-[0.9rem] font-mono dark:bg-[url('/textures/texture-dots-dark.svg')]">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-blue-line pb-[0.65rem]">
          <div className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-fg">{title}</div>
          {topAction ?? <div />}
        </div>

        <div className="min-h-0 flex-1">{children}</div>

        <div className="pt-[0.65rem] text-center">{footerAction ?? <div className="h-[1.65rem]" aria-hidden="true" />}</div>
      </div>

      {overlay}
    </div>
  );
}
