'use client';

import { Fragment, type ReactNode } from 'react';

const settingsOptions = ['GENERAL', 'APPEARANCE', 'SUBSCRIPTION', 'ABOUT'] as const;

type SettingsPageProps = {
  onClose: () => void;
  renderButton: (props: {
    children: ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
    className?: string;
    disabled?: boolean;
  }) => ReactNode;
};

export function AsciiPanelSettingsPage({
  onClose,
  renderButton,
}: SettingsPageProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-blue-line px-[0.85rem] py-[0.8rem]">
        <div className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-fg">Setting</div>
        {renderButton({ children: '[CLOSE]', onClick: onClose })}
      </div>

      <div className="grid gap-2 p-[0.85rem]">
        {settingsOptions.map((option) => (
          <Fragment key={option}>
            {renderButton({
              children: `[ ${option} ]`,
              className:
                'justify-start border border-blue-line bg-[var(--bg-panel-88)] px-[0.75rem] py-[0.7rem] text-[0.78rem] tracking-[0.18em] hover:bg-blue-strong',
              disabled: true,
              ariaLabel: `${option.toLowerCase()} settings preview`,
            })}
          </Fragment>
        ))}
      </div>
    </>
  );
}
