type AppScreenshotProps = {
  slug: string;
  alt: string;
  width: number;
  height: number;
};

export function AppScreenshot({ slug, alt, width, height }: AppScreenshotProps) {
  return (
    <picture>
      {/* Dark + WebP first (most specific — has media condition) */}
      <source
        media="(prefers-color-scheme: dark)"
        type="image/webp"
        srcSet={`/screenshots/dark/${slug}.webp 1x, /screenshots/dark/${slug}@2x.webp 2x`}
      />
      {/* Light + WebP default */}
      <source
        type="image/webp"
        srcSet={`/screenshots/light/${slug}.webp 1x, /screenshots/light/${slug}@2x.webp 2x`}
      />
      {/* Fallback */}
      <img
        src={`/screenshots/light/${slug}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
