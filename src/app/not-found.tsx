import { TextButton } from '@/components/TextButton';

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12">
      <h1 className="m-0 font-sans text-accent">
        [404] NOT FOUND
      </h1>
      <p className="mt-3 max-w-[62ch] text-text-secondary">This page could not be found.</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <TextButton href="/">Go home</TextButton>
      </div>
    </main>
  );
}
