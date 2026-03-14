'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { AsciiPanelFrame } from './components/AsciiPanelFrame';
import { AsciiPanelSheet } from './components/AsciiPanelSheet';
import { AsciiPanelHomePage } from './pages/HomePage';
import { AsciiPanelNewClientPage } from './pages/NewClientPage';
import { AsciiPanelSettingsPage } from './pages/SettingsPage';

type FramePageId = 'home' | 'settings' | 'new-client';
type FramePresentation = 'inline' | 'sheet';
type FrameSheetPhase = 'open' | 'closing';
type FrameSheetState = {
  pageId: FramePageId;
  presentation: FramePresentation;
  phase: FrameSheetPhase;
};
type FrameNavigationAction = {
  pageId: FramePageId;
  presentation?: FramePresentation;
};

type FrameControlButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
};

function FrameControlButton({
  children,
  onClick,
  ariaLabel,
  className,
  disabled = false,
}: FrameControlButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex select-none items-center px-[0.45rem] py-[0.15rem] text-xs uppercase tracking-[0.14em] text-blue-strong transition-colors duration-150 hover:bg-blue-strong hover:text-bg active:bg-blue-strong active:text-bg disabled:cursor-default disabled:opacity-75 disabled:hover:bg-transparent disabled:hover:text-blue-strong ${className ?? ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function AsciiPanel() {
  const [activePage] = useState<FramePageId>('home');
  const [sheet, setSheet] = useState<FrameSheetState | null>(null);

  useEffect(() => {
    if (sheet?.phase !== 'closing') {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timeoutId = window.setTimeout(() => {
      setSheet(null);
    }, prefersReducedMotion ? 0 : 360);

    return () => window.clearTimeout(timeoutId);
  }, [sheet]);

  function navigate(action: FrameNavigationAction) {
    const presentation = action.presentation ?? 'inline';

    if (presentation === 'sheet') {
      setSheet({ pageId: action.pageId, presentation, phase: 'open' });
    }
  }

  function closeSheet() {
    setSheet((currentSheet) => {
      if (!currentSheet || currentSheet.phase === 'closing') {
        return currentSheet;
      }

      return { ...currentSheet, phase: 'closing' };
    });
  }

  return (
    <AsciiPanelFrame
      title={activePage === 'home' ? 'BitRemote' : 'Setting'}
      topAction={
        activePage === 'home' ? (
          <FrameControlButton onClick={() => navigate({ pageId: 'settings', presentation: 'sheet' })}>
            [SETTINGS]
          </FrameControlButton>
        ) : undefined
      }
      footerAction={
        activePage === 'home' ? (
          <FrameControlButton
            ariaLabel="Open new client preview"
            onClick={() => navigate({ pageId: 'new-client', presentation: 'sheet' })}
          >
            [+ NEW CLIENT]
          </FrameControlButton>
        ) : undefined
      }
      overlay={
        sheet?.presentation === 'sheet' ? (
          <AsciiPanelSheet
            isClosing={sheet.phase === 'closing'}
            ariaLabel={sheet.pageId === 'new-client' ? 'New Client' : 'Setting'}
          >
            {sheet.pageId === 'settings' ? (
              <AsciiPanelSettingsPage
                onClose={closeSheet}
                renderButton={(props) => <FrameControlButton {...props} />}
              />
            ) : null}
            {sheet.pageId === 'new-client' ? (
              <AsciiPanelNewClientPage
                onClose={closeSheet}
                renderButton={(props) => <FrameControlButton {...props} />}
              />
            ) : null}
          </AsciiPanelSheet>
        ) : undefined
      }
    >
      {activePage === 'home' ? <AsciiPanelHomePage /> : null}
    </AsciiPanelFrame>
  );
}
