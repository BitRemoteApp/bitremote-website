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

export const downloaderLandingDictionary: DownloaderLandingDictionary = {
  en: {
    aria2: {
      slug: 'aria2',
      clientName: 'aria2',
      primaryKeyword: 'aria2 remote control app',
      seoTitle: 'BitRemote for aria2 | aria2 Remote Control App',
      seoDescription:
        'Use BitRemote as an aria2 remote control app on iPhone, iPad, and Mac. Monitor queues, add tasks, and manage aria2 downloads from anywhere.',
      heroTitle: 'Control aria2 downloads from iPhone, iPad, and Mac.',
      heroBody:
        'BitRemote gives you a focused way to monitor aria2 activity, review queues, and manage remote download tasks without going back to your server dashboard.',
      overviewTitle: 'Why use BitRemote with aria2',
      overviewBody:
        'If you already run aria2 on a NAS, VPS, seedbox, or home server, BitRemote gives you a native Apple interface for checking progress and controlling download tasks while you are away from your main machine.',
      capabilityTitle: 'What you can do',
      capabilityItems: [
        'Review active, waiting, stopped, and completed aria2 tasks.',
        'Pause, resume, remove, and add download tasks remotely.',
        'Check transfer activity and queue status from Apple devices.',
      ],
      useCaseTitle: 'Common aria2 use cases',
      useCaseItems: [
        'Monitor remote download jobs while away from your desk.',
        'Manage self-hosted aria2 setups on a NAS or home server.',
        'Keep track of large download queues from a simpler mobile UI.',
      ],
    },
    qbittorrent: {
      slug: 'qbittorrent',
      clientName: 'qBittorrent',
      primaryKeyword: 'qbittorrent remote app',
      seoTitle: 'BitRemote for qBittorrent | qBittorrent Remote App',
      seoDescription:
        'Manage qBittorrent remotely with BitRemote on iPhone, iPad, and Mac. Review queues, monitor activity, and control qBittorrent tasks from anywhere.',
      heroTitle: 'Use BitRemote as a qBittorrent remote app.',
      heroBody:
        'BitRemote helps you stay on top of qBittorrent queues from Apple devices, with a cleaner mobile-friendly view of remote download activity and task controls.',
      overviewTitle: 'Why use BitRemote with qBittorrent',
      overviewBody:
        'qBittorrent is powerful, but the desktop web workflow is not always ideal on mobile devices. BitRemote gives you a dedicated Apple interface for remote task management and status checks.',
      capabilityTitle: 'What you can do',
      capabilityItems: [
        'Monitor qBittorrent queues and transfer activity remotely.',
        'Pause, resume, remove, and add qBittorrent tasks from Apple devices.',
        'Filter and inspect tasks without relying on a desktop browser session.',
      ],
      useCaseTitle: 'Common qBittorrent use cases',
      useCaseItems: [
        'Check home server download progress while away from home.',
        'Manage remote queues without opening the full web UI.',
        'Keep iPhone, iPad, and Mac in sync with the same downloader workflow.',
      ],
    },
    transmission: {
      slug: 'transmission',
      clientName: 'Transmission',
      primaryKeyword: 'transmission remote app',
      seoTitle: 'BitRemote for Transmission | Transmission Remote App',
      seoDescription:
        'Control Transmission remotely with BitRemote on iPhone, iPad, and Mac. Monitor transfer activity, manage queues, and update remote tasks from anywhere.',
      heroTitle: 'Manage Transmission from your Apple devices.',
      heroBody:
        'BitRemote gives Transmission users a focused remote control app for queue management, transfer monitoring, and fast status checks from iPhone, iPad, and Mac.',
      overviewTitle: 'Why use BitRemote with Transmission',
      overviewBody:
        'When your Transmission client runs on a NAS, server, or home setup, BitRemote makes it easier to check activity and control tasks without navigating a desktop-style interface.',
      capabilityTitle: 'What you can do',
      capabilityItems: [
        'Review Transmission task status and transfer activity remotely.',
        'Pause, resume, remove, and add tasks from a dedicated Apple app.',
        'Use a simpler interface for frequent queue checks and quick actions.',
      ],
      useCaseTitle: 'Common Transmission use cases',
      useCaseItems: [
        'Check remote Transmission activity during the day.',
        'Manage home server downloads from iPhone or iPad.',
        'Use a cleaner Mac interface for quick queue updates.',
      ],
    },
    'synology-download-station': {
      slug: 'synology-download-station',
      clientName: 'Synology Download Station',
      primaryKeyword: 'synology download station remote app',
      seoTitle: 'BitRemote for Synology Download Station | Remote App',
      seoDescription:
        'Use BitRemote to manage Synology Download Station remotely on iPhone, iPad, and Mac. Monitor tasks, review queues, and control downloads from anywhere.',
      heroTitle: 'Remote control for Synology Download Station.',
      heroBody:
        'BitRemote gives Synology users a dedicated Apple app for monitoring Download Station activity and managing remote download tasks without opening DSM every time.',
      overviewTitle: 'Why use BitRemote with Synology Download Station',
      overviewBody:
        'If your downloads run through Download Station on a Synology NAS, BitRemote gives you a simpler mobile and desktop Apple experience for checking activity and controlling queues.',
      capabilityTitle: 'What you can do',
      capabilityItems: [
        'Review Synology Download Station task status and queue activity.',
        'Pause, resume, remove, and add download tasks remotely.',
        'Keep track of NAS download progress from iPhone, iPad, or Mac.',
      ],
      useCaseTitle: 'Common Synology use cases',
      useCaseItems: [
        'Check NAS downloads without logging in to DSM.',
        'Manage download tasks while away from home or the office.',
        'Use a dedicated Apple client instead of a browser-based workflow.',
      ],
    },
    'qnap-download-station': {
      slug: 'qnap-download-station',
      clientName: 'QNAP Download Station',
      primaryKeyword: 'qnap download station remote app',
      seoTitle: 'BitRemote for QNAP Download Station | Remote App',
      seoDescription:
        'Control QNAP Download Station remotely with BitRemote on iPhone, iPad, and Mac. Monitor queue activity and manage remote download tasks from anywhere.',
      heroTitle: 'Remote download management for QNAP Download Station.',
      heroBody:
        'BitRemote helps QNAP users monitor Download Station activity and control remote queues from a native Apple app built for quick task management.',
      overviewTitle: 'Why use BitRemote with QNAP Download Station',
      overviewBody:
        'When your downloads run on a QNAP NAS, BitRemote gives you a simpler way to check progress and manage tasks from iPhone, iPad, and Mac without relying on the full NAS interface.',
      capabilityTitle: 'What you can do',
      capabilityItems: [
        'Monitor QNAP Download Station task status and remote activity.',
        'Pause, resume, remove, and add tasks from Apple devices.',
        'Use a cleaner interface for regular queue reviews and quick changes.',
      ],
      useCaseTitle: 'Common QNAP use cases',
      useCaseItems: [
        'Track NAS download progress while away from your desk.',
        'Manage QNAP queues from iPhone or iPad without opening the full web UI.',
        'Use Mac for faster remote queue checks and task cleanup.',
      ],
    },
  },
};

export function getDownloaderLandingContent(locale: Locale, slug: DownloaderLandingSlug) {
  return downloaderLandingDictionary[locale]?.[slug];
}

export function getDownloaderLandingEntries() {
  return Object.entries(downloaderLandingDictionary).flatMap(([locale, entries]) =>
    Object.values(entries ?? {}).map((content) => ({
      locale: locale as Locale,
      content,
    })),
  );
}

export function getAvailableDownloaderLandingLocales(slug: DownloaderLandingSlug): Locale[] {
  return (Object.keys(downloaderLandingDictionary) as Locale[]).filter(
    (locale) => downloaderLandingDictionary[locale]?.[slug],
  );
}
