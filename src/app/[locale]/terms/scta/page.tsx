import type { Metadata } from 'next';

import { LegalDocumentPage } from '@/components/LegalDocumentPage';
import { getLegalDocument, legalDocumentPathByKind } from '@/domain/legal-documents';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { buildMetadataForCurrentLocalePage } from '@/seo/metadata';
import { buildBreadcrumbSchema, serializeJsonLd } from '@/seo/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);

  return buildMetadataForCurrentLocalePage({
    locale,
    pathname: legalDocumentPathByKind.scta,
    messages,
    page: 'termsScta',
  });
}

export default async function SpecifiedCommercialTransactionsActPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);
  const document = getLegalDocument(locale, 'scta');
  const breadcrumbSchema = buildBreadcrumbSchema({
    locale,
    items: [
      { name: messages.nav.home, path: '/' },
      { name: messages.pages.terms.title, path: '/terms/' },
      { name: document.title, path: legalDocumentPathByKind.scta },
    ],
  });

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(breadcrumbSchema)}
      />
      <LegalDocumentPage document={document} />
    </main>
  );
}
