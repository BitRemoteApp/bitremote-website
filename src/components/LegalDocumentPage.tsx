import type { LegalDocument } from '@/domain/legal-documents';

function sectionId(index: number): string {
  return `section-${index + 1}`;
}

export function LegalDocumentPage({
  document,
}: Readonly<{
  document: LegalDocument;
}>) {
  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-6 md:px-8 md:pt-8 lg:px-8 lg:pt-10">
      <header className="border-b border-[var(--color-border-soft)] pb-10">
        <div>
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {document.eyebrow}
          </p>
          <h1 className="mb-0 mt-4 text-[clamp(2.15rem,4.8vw,4.35rem)] font-semibold leading-[1.02] text-text-primary">
            {document.title}
          </h1>
          <p className="mb-0 mt-5 text-base leading-7 text-text-secondary md:text-lg">
            {document.intro}
          </p>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start">
        <nav
          aria-label={document.contentsLabel}
          className="lg:sticky lg:top-28"
        >
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            {document.contentsLabel}
          </p>
          <ol className="m-0 mt-4 grid list-none gap-2 p-0 text-sm">
            {document.sections.map((section, index) => (
              <li key={section.title}>
                <a
                  className="block rounded-md px-0 py-1.5 text-text-secondary no-underline transition-colors duration-150 hover:text-text-primary"
                  href={`#${sectionId(index)}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-10">
          {document.sections.map((section, index) => (
            <section
              key={section.title}
              id={sectionId(index)}
              aria-labelledby={`${sectionId(index)}-title`}
              className="scroll-mt-28 border-b border-[var(--color-border-soft)] pb-10 last:border-b-0 last:pb-0"
            >
              <h2
                id={`${sectionId(index)}-title`}
                className="m-0 text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight text-text-primary"
              >
                {section.title}
              </h2>
              <div className="mt-4 grid gap-4 text-base leading-7 text-text-secondary">
                {section.content.split('\n\n').map((paragraph) => (
                  <p key={paragraph} className="m-0 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
                {section.links ? (
                  <ul className="m-0 grid list-none gap-2 p-0">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
