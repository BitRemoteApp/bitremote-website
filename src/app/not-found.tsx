import { TextButton } from '@/components/TextButton';

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden bg-[#090b0d] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgb(59_130_246_/_0.12),_transparent_34%),linear-gradient(180deg,_rgb(17_20_24),_rgb(9_11_13))]" />
        <div className="absolute left-1/2 top-[14%] h-56 w-56 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-16 md:px-8">
        <section className="flex w-full max-w-[56rem] flex-col items-center text-center">
          <p className="m-0 text-[clamp(6rem,20vw,10rem)] font-semibold leading-none tracking-[-0.08em] text-[#93c5fd]">
            404
          </p>

          <h1 className="m-0 mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-white">
            Page Not Found
          </h1>

          <p className="m-0 mt-3 text-[clamp(1.1rem,2.4vw,1.7rem)] font-medium text-white/68">
            ページが見つかりません
          </p>

          <p className="m-0 mt-2 text-[clamp(1.05rem,2.1vw,1.45rem)] font-medium text-white/56">
            找不到頁面
          </p>

          <div className="mt-10 flex w-full max-w-[56rem] flex-col items-center gap-3 text-center text-[1.05rem] leading-8 text-white/64">
            <p className="m-0 max-w-full text-pretty md:whitespace-nowrap">
              The page you are looking for does not exist or may have been moved.
            </p>
            <p className="m-0 max-w-full text-pretty md:whitespace-nowrap">
              お探しのページは存在しないか、移動した可能性があります。
            </p>
            <p className="m-0 max-w-full text-pretty md:whitespace-nowrap">
              您要尋找的頁面不存在，或可能已被移動。
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <TextButton
              href="/en/"
              className="min-w-44 border-transparent bg-[#1d4ed8] text-white shadow-[0_18px_50px_rgb(0_0_0_/_0.18)] hover:bg-[#2563eb] hover:text-white"
            >
              Go to Home
            </TextButton>
            <TextButton
              href="/ja/"
              className="min-w-44 border border-white/10 bg-white/5 text-[#93c5fd] shadow-[0_18px_50px_rgb(0_0_0_/_0.18)] hover:border-blue-300/30 hover:bg-white/8 hover:text-white"
            >
              ホームへ戻る
            </TextButton>
            <TextButton
              href="/zh-hant/"
              className="min-w-44 border border-white/10 bg-white/5 text-[#93c5fd] shadow-[0_18px_50px_rgb(0_0_0_/_0.18)] hover:border-blue-300/30 hover:bg-white/8 hover:text-white"
            >
              返回首頁
            </TextButton>
          </div>
        </section>
      </div>
    </main>
  );
}
