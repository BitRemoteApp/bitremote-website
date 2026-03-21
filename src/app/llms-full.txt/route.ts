import { downloaderSlugByDownloader, getDownloaderLandingContent } from '@/domain/downloader-landings';
import { supportedDownloaders } from '@/domain/downloaders';
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
  sections.push(messages.sections.quickstart.requirements);

  // Pricing
  sections.push(`\n## Pricing\n`);
  sections.push(messages.sections.plus.subtitle);
  sections.push(`\nBitRemote+ includes:`);
  for (const item of messages.sections.plus.items) {
    sections.push(`- ${item}`);
  }
  sections.push(`\n${messages.sections.plus.note}`);

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

  const body = sections.join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
