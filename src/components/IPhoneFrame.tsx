import type { ReactNode } from 'react';

type IPhoneFrameProps = { children: ReactNode };

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative mx-auto border-[12px] border-surface-alt bg-surface-alt rounded-[2.5rem] h-[628px] w-[290px] shadow-raise">
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[14px] bg-surface-alt rounded-b-xl"
        aria-hidden="true"
      />
      {/* Left volume buttons */}
      <div
        className="absolute -left-[14px] top-[100px] h-[40px] w-[3px] bg-surface-alt rounded-l-lg"
        aria-hidden="true"
      />
      <div
        className="absolute -left-[14px] top-[152px] h-[40px] w-[3px] bg-surface-alt rounded-l-lg"
        aria-hidden="true"
      />
      {/* Right power button */}
      <div
        className="absolute -right-[14px] top-[128px] h-[60px] w-[3px] bg-surface-alt rounded-r-lg"
        aria-hidden="true"
      />
      {/* Screen area */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
        {children}
      </div>
    </div>
  );
}
