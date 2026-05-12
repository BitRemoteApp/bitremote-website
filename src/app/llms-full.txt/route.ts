import { downloaderSlugByDownloader, getDownloaderLandingContent } from '@/domain/downloader-landings';
import { supportedDownloaders } from '@/domain/downloaders';
import { getLegalDocument, legalDocumentPathByKind } from '@/domain/legal-documents';
import { LINKS } from '@/i18n/links';
import { getMessages } from '@/i18n/messages';
import { absoluteUrl } from '@/i18n/urls';

export const dynamic = 'force-static';

export function GET() {
  const messages = getMessages('en');
  const sections: string[] = [];

  // Header
  sections.push(`# BitRemote`);
  sections.push(`\n> ${messages.site.description}`);

  // About
  sections.push(`\n## About\n`);
  sections.push(messages.seo.home.description);
  sections.push(`\n- Website: ${absoluteUrl('/en/')}`);
  sections.push(`- App Store: ${LINKS.appStore}`);
  sections.push(`- GitHub: ${LINKS.github}`);
  sections.push(`- Discord: ${LINKS.discord}`);
  sections.push(`- Telegram: ${LINKS.telegram}`);
  sections.push(`- Privacy Policy: ${absoluteUrl(`/en${legalDocumentPathByKind.privacy}`)}`);
  sections.push(`- End User License Agreement: ${absoluteUrl(`/en${legalDocumentPathByKind.eula}`)}`);
  sections.push(`- Specified Commercial Transactions Act Disclosure: ${absoluteUrl(`/en${legalDocumentPathByKind.scta}`)}`);

  // Features
  sections.push(`\n## Features\n`);
  for (const item of messages.sections.benefits.items) {
    sections.push(`### ${item.title}\n`);
    sections.push(item.subtitle);
    sections.push('');
  }

  // Supported Downloaders
  sections.push(`## Supported Downloaders\n`);
  for (const d of supportedDownloaders) {
    const slug = downloaderSlugByDownloader[d];
    sections.push(`- [${d}](${absoluteUrl(`/en/downloaders/${slug}/`)})`);
  }

  // Quickstart
  sections.push(`\n## Quickstart\n`);
  for (const step of messages.sections.quickstart.steps) {
    sections.push(`### ${step.title}\n`);
    sections.push(step.body);
    sections.push('');
  }

  // FAQ
  sections.push(`\n## FAQ\n`);
  for (const item of messages.sections.faq.items) {
    sections.push(`### ${item.q}\n`);
    sections.push(item.a);
    sections.push('');
  }

  // Downloader Landing Pages
  sections.push(`## Downloader Details\n`);
  for (const d of supportedDownloaders) {
    const slug = downloaderSlugByDownloader[d];
    const content = getDownloaderLandingContent('en', slug);
    if (!content) continue;

    sections.push(`### ${d}\n`);
    sections.push(content.heroBody);
    sections.push(`\n#### ${content.overviewTitle}\n`);
    sections.push(content.overviewBody);
    sections.push(`\n#### ${content.capabilityTitle}\n`);
    for (const item of content.capabilityItems) {
      sections.push(`- ${item}`);
    }
    sections.push(`\n#### ${content.useCaseTitle}\n`);
    for (const item of content.useCaseItems) {
      sections.push(`- ${item}`);
    }
    sections.push('');
  }

  // Legal Documents
  sections.push(`## Legal Documents\n`);
  for (const kind of ['privacy', 'eula', 'scta'] as const) {
    const document = getLegalDocument('en', kind);
    sections.push(`### ${document.title}\n`);
    sections.push(document.intro);
    sections.push('');
    for (const section of document.sections) {
      sections.push(`#### ${section.title}\n`);
      sections.push(section.content);
      if (section.links) {
        for (const link of section.links) {
          sections.push(`- [${link.title}](${link.href})`);
        }
      }
      sections.push('');
    }
  }

  const body = sections.join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
