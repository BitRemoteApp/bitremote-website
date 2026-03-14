'use client';

import { useState, type ReactNode } from 'react';

type NewClientPageProps = {
  onClose: () => void;
  renderButton: (props: {
    children: ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
    className?: string;
    disabled?: boolean;
  }) => ReactNode;
};

const clientTypes = ['aria2', 'qBittorrent', 'Transmission', 'Synology DS', 'QNAP DS'] as const;
const defaultNameByType = {
  aria2: 'aria2',
  qBittorrent: 'qBittorrent',
  Transmission: 'Transmission',
  'Synology DS': 'Synology DS',
  'QNAP DS': 'QNAP DS',
} as const satisfies Record<(typeof clientTypes)[number], string>;

type FormFieldRowProps = {
  label: string;
  children: ReactNode;
};

function FormFieldRow({ label, children }: FormFieldRowProps) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-[0.85rem] py-[0.78rem]">
      <label className="text-[0.98rem] font-[650] tracking-[0.01em] text-fg">{label}</label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function FormDivider() {
  return <div className="mx-[0.85rem] h-px bg-[var(--line-soft)]" />;
}

function fieldClassName(isMuted = false): string {
  return `w-full border-0 bg-transparent p-0 text-right text-[0.92rem] outline-none placeholder:text-ink-soft ${
    isMuted ? 'text-ink-soft' : 'text-fg'
  }`;
}

export function AsciiPanelNewClientPage({
  onClose,
  renderButton,
}: NewClientPageProps) {
  const [clientType, setClientType] = useState<(typeof clientTypes)[number]>('aria2');
  const [name, setName] = useState<string>(defaultNameByType.aria2);
  const [host, setHost] = useState('');
  const [password, setPassword] = useState('');
  const [disableCertificateEvaluation, setDisableCertificateEvaluation] = useState(false);

  return (
    <div className="flex h-full flex-col px-[0.85rem] py-[0.8rem]">
      <div className="flex items-center justify-between gap-4">
        {renderButton({ children: '[CLOSE]', onClick: onClose })}
        {renderButton({ children: '[SAVE]', onClick: onClose, ariaLabel: 'Close new client preview' })}
      </div>

      <div className="pt-[0.9rem]">
        <div className="text-[2rem] font-extrabold tracking-[-0.03em] text-fg">New Client</div>
      </div>

      <div className="mt-[0.95rem] overflow-hidden rounded-[0.85rem] border border-blue-line bg-[var(--bg-panel-88)]">
        <FormFieldRow label="Type">
          <select
            className={`${fieldClassName()} cursor-pointer appearance-none text-blue-strong`}
            value={clientType}
            onChange={(event) => {
              const nextType = event.target.value as (typeof clientTypes)[number];
              const currentDefaultName = defaultNameByType[clientType];
              const nextDefaultName = defaultNameByType[nextType];

              setClientType(nextType);
              setName((currentName) => (currentName === currentDefaultName ? nextDefaultName : currentName));
            }}
            aria-label="Client type"
          >
            {clientTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormFieldRow>

        <FormDivider />

        <FormFieldRow label="Name">
          <input
            className={fieldClassName()}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Client name"
          />
        </FormFieldRow>

        <FormDivider />

        <FormFieldRow label="Host">
          <input
            className={fieldClassName(true)}
            value={host}
            onChange={(event) => setHost(event.target.value)}
            placeholder="scheme://domain:port/jsonrpc"
            aria-label="Client host"
          />
        </FormFieldRow>

        <FormDivider />

        <FormFieldRow label="Password">
          <input
            className={fieldClassName(true)}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            aria-label="Client password"
          />
        </FormFieldRow>

        <FormDivider />

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-[0.85rem] py-[0.78rem]">
          <div className="text-[0.98rem] font-[650] tracking-[0.01em] text-fg">
            Disable certificate evaluation
          </div>
          <button
            type="button"
            className={`inline-flex items-center border border-blue-line px-[0.55rem] py-[0.22rem] text-[0.84rem] uppercase tracking-[0.16em] transition-colors duration-150 ${
              disableCertificateEvaluation
                ? 'bg-blue-strong text-bg'
                : 'bg-transparent text-ink-soft hover:bg-[var(--bg-glass-92)]'
            }`}
            onClick={() => setDisableCertificateEvaluation((value) => !value)}
            aria-pressed={disableCertificateEvaluation}
          >
            {disableCertificateEvaluation ? '[ON]' : '[OFF]'}
          </button>
        </div>
      </div>
    </div>
  );
}
