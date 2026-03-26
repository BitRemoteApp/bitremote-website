import { TextButton } from '@/components/TextButton';

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 md:px-8 lg:px-8">
      <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
        404
      </div>
      <h1 className="m-0 mt-4 font-sans text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-text-primary">
        Page not found
      </h1>
      <p className="mt-3 max-w-[62ch] text-base leading-7 text-text-secondary">
        This page could not be found.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <TextButton href="/">Go home</TextButton>
      </div>
    </main>
  );
}
