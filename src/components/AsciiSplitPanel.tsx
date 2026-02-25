'use client';

import { useEffect, useState } from 'react';

import { Client } from '@/domain/clients';

type ClientSpeed = { client: Client; up: string; down: string };
type ClientSpeedFrame = readonly [ClientSpeed, ClientSpeed, ClientSpeed, ClientSpeed, ClientSpeed];

const clientsDataset: readonly ClientSpeedFrame[] = [
  [
    { client: Client.aria2, up: '2 MB/s', down: '3 MB/s' },
    { client: Client.qBittorrent, up: '150 KB/s', down: '80 MB/s' },
    { client: Client.Transmission, up: '22 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '14 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '3 MB/s', down: '4 MB/s' },
    { client: Client.qBittorrent, up: '168 KB/s', down: '92 MB/s' },
    { client: Client.Transmission, up: '24 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '16 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '3 MB/s', down: '5 MB/s' },
    { client: Client.qBittorrent, up: '192 KB/s', down: '88 MB/s' },
    { client: Client.Transmission, up: '26 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '18 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '2 MB/s', down: '4 MB/s' },
    { client: Client.qBittorrent, up: '180 KB/s', down: '82 MB/s' },
    { client: Client.Transmission, up: '25 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '17 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '2 MB/s', down: '3 MB/s' },
    { client: Client.qBittorrent, up: '160 KB/s', down: '75 MB/s' },
    { client: Client.Transmission, up: '23 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '15 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '4 MB/s', down: '2 MB/s' },
    { client: Client.qBittorrent, up: '142 KB/s', down: '72 MB/s' },
    { client: Client.Transmission, up: '21 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '13 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '3 MB/s', down: '3 MB/s' },
    { client: Client.qBittorrent, up: '130 KB/s', down: '78 MB/s' },
    { client: Client.Transmission, up: '22 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '12 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '2 MB/s', down: '4 MB/s' },
    { client: Client.qBittorrent, up: '145 KB/s', down: '86 MB/s' },
    { client: Client.Transmission, up: '24 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '13 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '1 MB/s', down: '5 MB/s' },
    { client: Client.qBittorrent, up: '158 KB/s', down: '84 MB/s' },
    { client: Client.Transmission, up: '23 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '15 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
  [
    { client: Client.aria2, up: '2 MB/s', down: '3 MB/s' },
    { client: Client.qBittorrent, up: '154 KB/s', down: '79 MB/s' },
    { client: Client.Transmission, up: '22 MB/s', down: '0 KB/s' },
    { client: Client.SynologyDownloadStation, up: '14 KB/s', down: '0 KB/s' },
    { client: Client.QNAPDownloadStation, up: '0 KB/s', down: '0 KB/s' },
  ],
] as const;

const FRAME_INTERVAL_MS = 2000;

const clientBadges = {
  [Client.aria2]: 'A',
  [Client.qBittorrent]: 'Q',
  [Client.Transmission]: 'T',
  [Client.SynologyDownloadStation]: 'S',
  [Client.QNAPDownloadStation]: 'Q',
} as const satisfies Record<Client, string>;

function clientSkeletonName(client: Client): string {
  switch (client) {
    case Client.SynologyDownloadStation:
      return 'Synology DS';
    case Client.QNAPDownloadStation:
      return 'QNAP DS';
    default:
      return client;
  }
}

type Direction = 'up' | 'down' | 'none';

function parseSpeed(speed: string): { num: string; unit: string } {
  const trimmed = speed.trim();
  const firstSpaceIndex = trimmed.indexOf(' ');
  if (firstSpaceIndex === -1) {
    return { num: trimmed, unit: '' };
  }

  return {
    num: trimmed.slice(0, firstSpaceIndex),
    unit: trimmed.slice(firstSpaceIndex + 1).trim(),
  };
}

function numericDirection(prevNum: string, nextNum: string): Direction {
  const prevValue = Number.parseInt(prevNum, 10);
  const nextValue = Number.parseInt(nextNum, 10);

  if (Number.isNaN(prevValue) || Number.isNaN(nextValue) || prevValue === nextValue) {
    return 'none';
  }

  return nextValue > prevValue ? 'up' : 'down';
}

function digitText(char: string): string {
  return char === ' ' ? '\u00A0' : char;
}

type AnimatedSpeedProps = {
  prev: string;
  next: string;
  tick: number;
};

function AnimatedSpeed({ prev, next, tick }: AnimatedSpeedProps) {
  const prevParts = parseSpeed(prev);
  const nextParts = parseSpeed(next);
  const dir = numericDirection(prevParts.num, nextParts.num);

  return (
    <span>
      <AnimatedNumericText prevNum={prevParts.num} nextNum={nextParts.num} dir={dir} tick={tick} />
      {nextParts.unit ? (
        <>
          {' '}
          <span>{nextParts.unit}</span>
        </>
      ) : null}
    </span>
  );
}

type AnimatedNumericTextProps = {
  prevNum: string;
  nextNum: string;
  dir: Direction;
  tick: number;
};

function AnimatedNumericText({ prevNum, nextNum, dir, tick }: AnimatedNumericTextProps) {
  const maxLen = Math.max(prevNum.length, nextNum.length);
  const prevPadded = prevNum.padStart(maxLen, ' ');
  const nextPadded = nextNum.padStart(maxLen, ' ');

  return (
    <span className="br-num-value">
      {Array.from({ length: maxLen }, (_, index) => (
        <DigitSlot
          // Index is stable by design; animation is driven by `tick`.
          key={index}
          prevChar={prevPadded[index]}
          nextChar={nextPadded[index]}
          dir={dir}
          tick={tick}
        />
      ))}
    </span>
  );
}

type DigitSlotProps = {
  prevChar: string;
  nextChar: string;
  dir: Direction;
  tick: number;
};

function DigitSlot({ prevChar, nextChar, dir, tick }: DigitSlotProps) {
  const prevText = digitText(prevChar);
  const nextText = digitText(nextChar);

  if (prevChar === nextChar || dir === 'none') {
    return <span className="br-num-slot">{nextText}</span>;
  }

  const outClassName = dir === 'up' ? 'br-num-out-up' : 'br-num-out-down';
  const inClassName = dir === 'up' ? 'br-num-in-up' : 'br-num-in-down';

  return (
    <span className="br-num-slot">
      <span className="br-num-baseline" aria-hidden="true">
        {nextText}
      </span>
      <span className="br-num-clip" aria-hidden="true">
        <span key={`out-${tick}-${prevText}`} className={`br-num-layer br-num-old ${outClassName}`}>
          {prevText}
        </span>
        <span key={`in-${tick}-${nextText}`} className={`br-num-layer ${inClassName}`}>
          {nextText}
        </span>
      </span>
    </span>
  );
}

export function AsciiSplitPanel() {
  const [state, setState] = useState({ index: 0, prevIndex: 0, tick: 0 });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setState((prev) => ({
        index: (prev.index + 1) % clientsDataset.length,
        prevIndex: prev.index,
        tick: prev.tick + 1,
      }));
    }, FRAME_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const prevFrame = clientsDataset[state.prevIndex] ?? clientsDataset[0];
  const frame = clientsDataset[state.index] ?? clientsDataset[0];

  return (
    <div
      className="relative hidden w-[min(320px,100%)] self-start justify-self-end overflow-hidden bg-transparent shadow-[inset_0_0_0_1px_var(--blue-line)] before:block before:pt-[166.6667%] before:content-[''] min-[980px]:block"
      role="group"
      aria-label="Sidebar skeleton"
    >
      <div
        className="absolute inset-0 flex min-h-0 flex-col gap-3 bg-[url('/textures/texture-dots-light.svg')] bg-[length:240px_240px] bg-repeat p-[0.9rem] font-mono dark:bg-[url('/textures/texture-dots-dark.svg')]"
        aria-hidden="true"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-blue-line pb-[0.65rem]">
          <div className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-fg">
            BitRemote
          </div>
          <div className="text-xs uppercase tracking-[0.14em] text-blue-strong">
            <span className="inline-flex cursor-pointer select-none items-center px-[0.45rem] py-[0.15rem] transition-colors duration-150 hover:bg-blue-strong hover:text-bg active:bg-blue-strong active:text-bg">
              [SETTINGS]
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[0.85rem] border border-blue-line bg-[var(--bg-panel-88)]">
          {frame.map((client, index) => {
            const prevClient = prevFrame[index]?.client === client.client ? prevFrame[index] : client;

            return (
            <div key={client.client}>
              <div className="flex items-center gap-3 px-[0.8rem] py-[0.7rem]">
                <div className="shrink-0 font-extrabold tracking-[0.1em] text-blue-strong opacity-95">
                  [{clientBadges[client.client]}]
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-[750] tracking-[0.06em] text-fg opacity-90">
                    {clientSkeletonName(client.client)}
                  </div>
                  <div className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs tracking-[0.1em] text-ink-soft">
                    ↑ <AnimatedSpeed prev={prevClient.up} next={client.up} tick={state.tick} /> ↓{' '}
                    <AnimatedSpeed prev={prevClient.down} next={client.down} tick={state.tick} />
                  </div>
                </div>
                <div className="shrink-0 font-[750] text-blue-strong opacity-75" aria-hidden="true">
                  &gt;
                </div>
              </div>
              {index !== frame.length - 1 ? (
                <div className="mx-[0.8rem] h-px bg-[var(--line-soft)]" />
              ) : null}
            </div>
            );
          })}
        </div>

        <div className="mt-auto pt-[0.65rem] text-center text-xs uppercase tracking-[0.14em] text-blue-strong">
          <span className="inline-flex cursor-pointer select-none items-center px-[0.45rem] py-[0.15rem] transition-colors duration-150 hover:bg-blue-strong hover:text-bg active:bg-blue-strong active:text-bg">
            [+ NEW CLIENT]
          </span>
        </div>
      </div>
    </div>
  );
}
