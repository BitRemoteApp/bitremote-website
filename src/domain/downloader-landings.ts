import type { Locale } from '@/i18n/locales';

export const downloaderLandingSlugs = [
  'aria2',
  'qbittorrent',
  'transmission',
  'synology-download-station',
  'qnap-download-station',
] as const;

export type DownloaderLandingSlug = (typeof downloaderLandingSlugs)[number];

export type DownloaderLandingContent = {
  slug: DownloaderLandingSlug;
  clientName: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroBody: string;
  overviewTitle: string;
  overviewBody: string;
  capabilityTitle: string;
  capabilityItems: string[];
  useCaseTitle: string;
  useCaseItems: string[];
};

export type DownloaderLandingDictionary = Partial<
  Record<Locale, Record<DownloaderLandingSlug, DownloaderLandingContent>>
>;

export const downloaderLandingDictionary: DownloaderLandingDictionary = {};
