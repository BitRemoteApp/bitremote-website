import type { Locale } from '@/i18n/locales';
import { Downloader } from '@/domain/downloaders';

export const downloaderSlugByDownloader = {
  [Downloader.aria2]: 'aria2',
  [Downloader.qBittorrent]: 'qbittorrent',
  [Downloader.Transmission]: 'transmission',
  [Downloader.SynologyDownloadStation]: 'synology-download-station',
  [Downloader.QNAPDownloadStation]: 'qnap-download-station',
} as const satisfies Record<Downloader, string>;

export type DownloaderLandingSlug = (typeof downloaderSlugByDownloader)[Downloader];

export const downloaderLandingSlugs = Object.values(downloaderSlugByDownloader);

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Fields that are unique per downloader (stored in the dictionary). */
type DownloaderLandingEntry = {
  seoDescription: string;
  heroTitle: string;
  heroBody: string;
  overviewBody: string;
  capabilityItems: string[];
  useCaseItems: string[];
};

/** Factory that produces an entry from a downloader display name. */
type DownloaderLandingEntryFactory = (d: Downloader) => DownloaderLandingEntry;

/** Full content returned to consumers (entry + generated fields). */
export type DownloaderLandingContent = DownloaderLandingEntry & {
  slug: DownloaderLandingSlug;
  downloader: Downloader;
  primaryKeyword: string;
  seoTitle: string;
  overviewTitle: string;
  capabilityTitle: string;
  useCaseTitle: string;
};

/* ------------------------------------------------------------------ */
/*  Slug ↔ Downloader mapping                                        */
/* ------------------------------------------------------------------ */

const downloaderBySlug = Object.fromEntries(
  Object.entries(downloaderSlugByDownloader).map(([d, s]) => [s, d as Downloader]),
) as Record<DownloaderLandingSlug, Downloader>;

/* ------------------------------------------------------------------ */
/*  Per-locale templates for shared fields                            */
/* ------------------------------------------------------------------ */

type LocaleTemplates = {
  primaryKeyword: (d: Downloader) => string;
  seoTitle: (d: Downloader) => string;
  overviewTitle: (d: Downloader) => string;
  capabilityTitle: string;
  useCaseTitle: string;
};

const hasCompactSeoTitle = (d: Downloader) =>
  d === Downloader.SynologyDownloadStation || d === Downloader.QNAPDownloadStation;

const localeTemplates: Record<string, LocaleTemplates> = {
  en: {
    primaryKeyword: (d) => `${d.toLowerCase()} remote control app`,
    seoTitle: (d) =>
      hasCompactSeoTitle(d)
        ? `BitRemote for ${d} | Remote Control App`
        : `BitRemote for ${d} | ${d} Remote Control App`,
    overviewTitle: (d) => `Why use BitRemote with ${d}`,
    capabilityTitle: 'What you can do',
    useCaseTitle: 'How BitRemote helps with your workflow',
  },
  'zh-hant': {
    primaryKeyword: (d) => `${d} 遠端控制工具`,
    seoTitle: (d) =>
      hasCompactSeoTitle(d)
        ? `BitRemote for ${d} | 遠端控制工具`
        : `BitRemote for ${d} | ${d} 遠端控制工具`,
    overviewTitle: (d) => `為什麼搭配 ${d} 使用 BitRemote`,
    capabilityTitle: '主要功能',
    useCaseTitle: 'BitRemote 如何幫助你最佳化工作流程',
  },
  'zh-hans': {
    primaryKeyword: (d) => `${d} 远程管理工具`,
    seoTitle: (d) =>
      hasCompactSeoTitle(d)
        ? `BitRemote for ${d} | 远程管理工具`
        : `BitRemote for ${d} | ${d} 远程管理工具`,
    overviewTitle: (d) => `为什么搭配 ${d} 使用 BitRemote`,
    capabilityTitle: '主要功能',
    useCaseTitle: 'BitRemote 如何帮助你优化工作流',
  },
  ja: {
    primaryKeyword: (d) => `${d} 遠隔操作アプリ`,
    seoTitle: (d) =>
      hasCompactSeoTitle(d)
        ? `BitRemote for ${d} | 遠隔操作アプリ`
        : `BitRemote for ${d} | ${d} 遠隔操作アプリ`,
    overviewTitle: (d) => `${d} に BitRemote を使う理由`,
    capabilityTitle: '主な機能',
    useCaseTitle: 'BitRemote でワークフローを改善する方法',
  },
};

/* ------------------------------------------------------------------ */
/*  Dictionary — entry factories keyed by Downloader enum             */
/* ------------------------------------------------------------------ */

type DownloaderLandingDictionary = Partial<
  Record<Locale, Partial<Record<Downloader, DownloaderLandingEntryFactory>>>
>;

const downloaderLandingDictionary: DownloaderLandingDictionary = {
  en: {
    [Downloader.aria2]: (d) => ({
      seoDescription:
        `Use BitRemote as an ${d} remote control app on iPhone, iPad, and Mac. Monitor queues, add tasks, and manage ${d} downloads from anywhere.`,
      heroTitle: `Control ${d} downloads from iPhone, iPad, and Mac.`,
      heroBody:
        `BitRemote gives you a focused way to monitor ${d} activity, review queues, and manage remote download tasks without going back to your server dashboard.`,
      overviewBody:
        `If you already run ${d} on a NAS, VPS, seedbox, or home server, BitRemote gives you a native interface on iPhone, iPad, and Mac for checking progress and controlling download tasks while you are away from your main machine.`,
      capabilityItems: [
        `Review active, waiting, stopped, and completed ${d} tasks.`,
        'Pause, resume, remove, and add download tasks remotely.',
        'Check transfer activity and queue status from iPhone, iPad, and Mac.',
      ],
      useCaseItems: [
        'Monitor remote download jobs while away from your desk.',
        `Manage self-hosted ${d} setups on a NAS or home server.`,
        'Keep track of large download queues from a simpler mobile UI.',
      ],
    }),
    [Downloader.qBittorrent]: (d) => ({
      seoDescription:
        `Manage ${d} remotely with BitRemote on iPhone, iPad, and Mac. Review queues, monitor activity, and control ${d} tasks from anywhere.`,
      heroTitle: `Use BitRemote as a ${d} remote control app.`,
      heroBody:
        `BitRemote helps you stay on top of ${d} queues from iPhone, iPad, and Mac, with a cleaner mobile-friendly view of remote download activity and task controls.`,
      overviewBody:
        `${d} is powerful, but the desktop web workflow is not always ideal on mobile devices. BitRemote gives you a dedicated interface on iPhone, iPad, and Mac for remote task management and status checks.`,
      capabilityItems: [
        `Monitor ${d} queues and transfer activity remotely.`,
        `Pause, resume, remove, and add ${d} tasks from iPhone, iPad, and Mac.`,
        'Filter and inspect tasks without relying on a desktop browser session.',
      ],
      useCaseItems: [
        'Check home server download progress while away from home.',
        'Manage remote queues without opening the full web UI.',
        `Access your ${d} server from iPhone, iPad, and Mac with one app.`,
      ],
    }),
    [Downloader.Transmission]: (d) => ({
      seoDescription:
        `Control ${d} remotely with BitRemote on iPhone, iPad, and Mac. Monitor transfer activity, manage queues, and update remote tasks from anywhere.`,
      heroTitle: `Manage ${d} from iPhone, iPad, and Mac.`,
      heroBody:
        `BitRemote gives ${d} users a focused remote control app for queue management, transfer monitoring, and fast status checks from iPhone, iPad, and Mac.`,
      overviewBody:
        `When your ${d} client runs on a NAS, server, or home setup, BitRemote makes it easier to check activity and control tasks without navigating a desktop-style interface.`,
      capabilityItems: [
        `Review ${d} task status and transfer activity remotely.`,
        'Pause, resume, remove, and add tasks from a native app for iPhone, iPad, and Mac.',
        'Use a simpler interface for frequent queue checks and quick actions.',
      ],
      useCaseItems: [
        `Check ${d} activity while away from your server.`,
        'Manage home server downloads from iPhone or iPad.',
        'Use a cleaner Mac interface for quick queue updates.',
      ],
    }),
    [Downloader.SynologyDownloadStation]: (d) => ({
      seoDescription:
        `Use BitRemote to manage ${d} remotely on iPhone, iPad, and Mac. Monitor tasks, review queues, and control downloads from anywhere.`,
      heroTitle: `Remote control for ${d}.`,
      heroBody:
        `BitRemote gives Synology users a native app for iPhone, iPad, and Mac to monitor Download Station activity and manage remote download tasks without opening DSM every time.`,
      overviewBody:
        `If your downloads run through Download Station on a Synology NAS, BitRemote gives you a simpler experience on iPhone, iPad, and Mac for checking activity and controlling queues.`,
      capabilityItems: [
        `Review ${d} task status and queue activity.`,
        'Pause, resume, remove, and add download tasks remotely.',
        'Keep track of NAS download progress from iPhone, iPad, or Mac.',
      ],
      useCaseItems: [
        'Check NAS downloads without logging in to DSM.',
        'Manage download tasks while away from home or the office.',
        'Use a native app for iPhone, iPad, and Mac instead of a browser-based workflow.',
      ],
    }),
    [Downloader.QNAPDownloadStation]: (d) => ({
      seoDescription:
        `Control ${d} remotely with BitRemote on iPhone, iPad, and Mac. Monitor queue activity and manage remote download tasks from anywhere.`,
      heroTitle: `Remote download management for ${d}.`,
      heroBody:
        `BitRemote helps QNAP users monitor Download Station activity and control remote queues from a native app for iPhone, iPad, and Mac, built for quick task management.`,
      overviewBody:
        `When your downloads run on a QNAP NAS, BitRemote gives you a simpler way to check progress and manage tasks from iPhone, iPad, and Mac without relying on the full NAS interface.`,
      capabilityItems: [
        `Monitor ${d} task status and remote activity.`,
        'Pause, resume, remove, and add tasks from iPhone, iPad, and Mac.',
        'Use a cleaner interface for regular queue reviews and quick changes.',
      ],
      useCaseItems: [
        'Track NAS download progress while away from your desk.',
        'Manage QNAP queues from iPhone or iPad without opening the full web UI.',
        'Use Mac for faster remote queue checks and task cleanup.',
      ],
    }),
  },
  'zh-hant': {
    [Downloader.aria2]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 與 Mac 上使用 BitRemote 遠端管理 ${d}。隨時查看佇列、新增任務並管理 ${d} 下載。`,
      heroTitle: `在 iPhone、iPad 與 Mac 上控制 ${d} 下載`,
      heroBody:
        `BitRemote 讓你不用回到伺服器後台，也能查看 ${d} 活動、檢查佇列並管理遠端下載任務。`,
      overviewBody:
        `如果你的 ${d} 執行在 NAS、VPS、seedbox 或家用伺服器上，BitRemote 能在 iPhone、iPad 與 Mac 上提供更適合日常管理的遠端介面。`,
      capabilityItems: [
        `查看 ${d} 進行中、等待中、停止中與已完成的任務`,
        '遠端暫停、恢復、刪除與新增下載任務',
        '在 iPhone、iPad 與 Mac 上檢查傳輸活動與佇列狀態',
      ],
      useCaseItems: [
        '離開座位時查看遠端下載工作',
        `管理 NAS 或家用伺服器上的自架 ${d}`,
        '用更適合手機的介面追蹤大型下載佇列',
      ],
    }),
    [Downloader.qBittorrent]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 與 Mac 上用 BitRemote 遠端管理 ${d}。隨時查看佇列、監控活動並控制 ${d} 任務。`,
      heroTitle: `把 BitRemote 當成你的 ${d} 遠端控制工具`,
      heroBody:
        `BitRemote 幫助你在 iPhone、iPad 與 Mac 上更輕鬆查看 ${d} 佇列、掌握活動狀態，並快速執行任務操作。`,
      overviewBody:
        `${d} 功能很完整，但在行動裝置上不一定好操作。BitRemote 提供更專注的 iPhone、iPad 與 Mac 介面來處理遠端任務管理。`,
      capabilityItems: [
        `遠端監控 ${d} 佇列與傳輸活動`,
        `從 iPhone、iPad 與 Mac 暫停、恢復、刪除與新增 ${d} 任務`,
        '不用依賴桌面瀏覽器也能篩選與檢查任務',
      ],
      useCaseItems: [
        '離家時檢查家中伺服器的下載進度',
        '不開完整 Web UI 也能管理遠端佇列',
        `用同一個 App 在 iPhone、iPad 與 Mac 上存取你的 ${d} 伺服器`,
      ],
    }),
    [Downloader.Transmission]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 與 Mac 上用 BitRemote 遠端控制 ${d}。隨時監控傳輸活動、管理佇列並更新遠端任務。`,
      heroTitle: `用 iPhone、iPad 與 Mac 管理 ${d}`,
      heroBody:
        `BitRemote 為 ${d} 使用者提供專注的遠端控制工具，方便在 iPhone、iPad 與 Mac 上查看佇列與傳輸狀態。`,
      overviewBody:
        `當 ${d} 執行在 NAS、伺服器或家用環境上時，BitRemote 讓你不用面對桌面式介面，也能快速檢查活動與控制任務。`,
      capabilityItems: [
        `遠端查看 ${d} 任務狀態與傳輸活動`,
        '透過 iPhone、iPad 與 Mac 上的原生 App 暫停、恢復、刪除與新增任務',
        '用更簡潔的介面完成常見佇列檢查與操作',
      ],
      useCaseItems: [
        `離開伺服器時查看 ${d} 活動`,
        '在 iPhone 或 iPad 上管理家用伺服器下載',
        '用 Mac 更快速地清理與更新佇列',
      ],
    }),
    [Downloader.SynologyDownloadStation]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 與 Mac 上用 BitRemote 遠端管理 ${d}。隨時查看任務、佇列與下載活動。`,
      heroTitle: `${d} 的遠端控制工具`,
      heroBody:
        `BitRemote 為 Synology 使用者提供 iPhone、iPad 與 Mac 上的原生 App，可查看 Download Station 活動並管理遠端下載任務，不必每次都打開 DSM。`,
      overviewBody:
        `如果你的下載任務跑在 Synology NAS 的 Download Station 上，BitRemote 能在行動裝置與 Mac 上提供更簡單的管理體驗。`,
      capabilityItems: [
        `查看 ${d} 任務狀態與佇列活動`,
        '遠端暫停、恢復、刪除與新增下載任務',
        '在 iPhone、iPad 或 Mac 上追蹤 NAS 下載進度',
      ],
      useCaseItems: [
        '不登入 DSM 也能查看 NAS 下載狀態',
        '外出時管理家中或辦公室的下載任務',
        '用 iPhone、iPad 與 Mac 上的原生 App 取代瀏覽器操作流程',
      ],
    }),
    [Downloader.QNAPDownloadStation]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 與 Mac 上用 BitRemote 遠端控制 ${d}。隨時監控佇列活動並管理遠端下載任務。`,
      heroTitle: `${d} 的遠端下載管理`,
      heroBody:
        `BitRemote 幫助 QNAP 使用者用 iPhone、iPad 與 Mac 上的原生 App 監看 Download Station 活動，並更快速地處理遠端佇列。`,
      overviewBody:
        `當你的下載任務跑在 QNAP NAS 上時，BitRemote 能在 iPhone、iPad 與 Mac 上提供更簡單的查看與管理方式。`,
      capabilityItems: [
        `監控 ${d} 任務狀態與遠端活動`,
        '從 iPhone、iPad 與 Mac 暫停、恢復、刪除與新增任務',
        '用更乾淨的介面進行例行佇列檢查與調整',
      ],
      useCaseItems: [
        '離開座位時追蹤 NAS 下載進度',
        '在 iPhone 或 iPad 上管理 QNAP 佇列而不打開完整 Web UI',
        '用 Mac 更快完成遠端佇列檢查與整理',
      ],
    }),
  },
  'zh-hans': {
    [Downloader.aria2]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 和 Mac 上使用 BitRemote 远程管理 ${d}。随时查看队列、新增任务并管理 ${d} 下载。`,
      heroTitle: `在 iPhone、iPad 和 Mac 上控制 ${d} 下载`,
      heroBody:
        `BitRemote 让你不用回到服务器后台，也能查看 ${d} 活动、检查队列并管理远程下载任务。`,
      overviewBody:
        `如果你的 ${d} 运行在 NAS、VPS、seedbox 或家庭服务器上，BitRemote 能在 iPhone、iPad 和 Mac 上提供更适合日常使用的远程管理界面。`,
      capabilityItems: [
        `查看 ${d} 进行中、等待中、停止中与已完成的任务`,
        '远程暂停、恢复、删除与新增下载任务',
        '在 iPhone、iPad 和 Mac 上检查传输活动与队列状态',
      ],
      useCaseItems: [
        '离开座位时查看远程下载任务',
        `管理 NAS 或家庭服务器上的自托管 ${d}`,
        '用更适合手机的界面追踪大型下载队列',
      ],
    }),
    [Downloader.qBittorrent]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 和 Mac 上用 BitRemote 远程管理 ${d}。随时查看队列、监控活动并控制 ${d} 任务。`,
      heroTitle: `把 BitRemote 当作你的 ${d} 远程管理工具`,
      heroBody:
        `BitRemote 帮助你在 iPhone、iPad 和 Mac 上更轻松地查看 ${d} 队列、掌握活动状态，并快速执行任务操作。`,
      overviewBody:
        `${d} 功能强大，但在移动设备上不一定好操作。BitRemote 提供更专注的 iPhone、iPad 和 Mac 界面来处理远程任务管理。`,
      capabilityItems: [
        `远程监控 ${d} 队列与传输活动`,
        `从 iPhone、iPad 和 Mac 暂停、恢复、删除与新增 ${d} 任务`,
        '不用依赖桌面浏览器也能筛选与检查任务',
      ],
      useCaseItems: [
        '离家时检查家庭服务器的下载进度',
        '不开完整 Web UI 也能管理远程队列',
        `用同一个 App 在 iPhone、iPad 和 Mac 上访问你的 ${d} 服务器`,
      ],
    }),
    [Downloader.Transmission]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 和 Mac 上用 BitRemote 远程控制 ${d}。随时监控传输活动、管理队列并更新远程任务。`,
      heroTitle: `用 iPhone、iPad 和 Mac 管理 ${d}`,
      heroBody:
        `BitRemote 为 ${d} 用户提供专注的远程管理工具，方便在 iPhone、iPad 和 Mac 上查看队列与传输状态。`,
      overviewBody:
        `当 ${d} 运行在 NAS、服务器或家庭环境上时，BitRemote 让你不用面对桌面式界面，也能快速检查活动与控制任务。`,
      capabilityItems: [
        `远程查看 ${d} 任务状态与传输活动`,
        '通过 iPhone、iPad 和 Mac 上的原生 App 暂停、恢复、删除与新增任务',
        '用更简洁的界面完成常见队列检查与操作',
      ],
      useCaseItems: [
        `离开服务器时查看 ${d} 活动`,
        '在 iPhone 或 iPad 上管理家庭服务器下载',
        '用 Mac 更快清理与更新队列',
      ],
    }),
    [Downloader.SynologyDownloadStation]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 和 Mac 上用 BitRemote 远程管理 ${d}。随时查看任务、队列与下载活动。`,
      heroTitle: `${d} 的远程管理工具`,
      heroBody:
        `BitRemote 为 Synology 用户提供 iPhone、iPad 和 Mac 上的原生 App，可查看 Download Station 活动并管理远程下载任务，不必每次都打开 DSM。`,
      overviewBody:
        `如果你的下载任务运行在 Synology NAS 的 Download Station 上，BitRemote 能在移动设备与 Mac 上提供更简单的管理体验。`,
      capabilityItems: [
        `查看 ${d} 任务状态与队列活动`,
        '远程暂停、恢复、删除与新增下载任务',
        '在 iPhone、iPad 或 Mac 上追踪 NAS 下载进度',
      ],
      useCaseItems: [
        '不登录 DSM 也能查看 NAS 下载状态',
        '外出时管理家里或办公室的下载任务',
        '用 iPhone、iPad 和 Mac 上的原生 App 替代浏览器操作流程',
      ],
    }),
    [Downloader.QNAPDownloadStation]: (d) => ({
      seoDescription:
        `在 iPhone、iPad 和 Mac 上用 BitRemote 远程控制 ${d}。随时监控队列活动并管理远程下载任务。`,
      heroTitle: `${d} 的远程下载管理`,
      heroBody:
        `BitRemote 帮助 QNAP 用户用 iPhone、iPad 和 Mac 上的原生 App 监看 Download Station 活动，并更快处理远程队列。`,
      overviewBody:
        `当你的下载任务运行在 QNAP NAS 上时，BitRemote 能在 iPhone、iPad 和 Mac 上提供更简单的查看与管理方式。`,
      capabilityItems: [
        `监控 ${d} 任务状态与远程活动`,
        '从 iPhone、iPad 和 Mac 暂停、恢复、删除与新增任务',
        '用更干净的界面完成日常队列检查与调整',
      ],
      useCaseItems: [
        '离开座位时追踪 NAS 下载进度',
        '在 iPhone 或 iPad 上管理 QNAP 队列而不打开完整 Web UI',
        '用 Mac 更快完成远程队列检查与整理',
      ],
    }),
  },
  ja: {
    [Downloader.aria2]: (d) => ({
      seoDescription:
        `iPhone、iPad、Mac で BitRemote を使って ${d} をリモート管理。キュー確認、新規追加、ダウンロード操作をどこからでも行えます。`,
      heroTitle: `iPhone、iPad、Mac から ${d} を操作`,
      heroBody:
        `BitRemote を使えば、サーバー画面に戻らなくても ${d} の状態確認、キュー管理、遠隔操作ができます。`,
      overviewBody:
        `${d} を NAS、VPS、seedbox、ホームサーバーで運用しているなら、BitRemote が iPhone、iPad、Mac 向けの扱いやすい管理インターフェースになります。`,
      capabilityItems: [
        `${d} の進行中、待機中、停止中、完了済みタスクを確認`,
        'ダウンロードタスクの追加、一時停止、再開、削除を遠隔操作',
        'iPhone、iPad、Mac から転送状況とキュー状態を確認',
      ],
      useCaseItems: [
        '席を離れている間に遠隔ダウンロード状況を確認',
        `NAS やホームサーバー上のセルフホスト ${d} を管理`,
        '大きなダウンロードキューを使いやすい UI で追跡',
      ],
    }),
    [Downloader.qBittorrent]: (d) => ({
      seoDescription:
        `iPhone、iPad、Mac で BitRemote を使って ${d} をリモート管理。キュー確認、アクティビティ監視、タスク操作をどこからでも行えます。`,
      heroTitle: `${d} 用の遠隔操作アプリとして使う`,
      heroBody:
        `BitRemote は iPhone、iPad、Mac で ${d} のキュー確認、状態把握、タスク操作を行いやすくする専用アプリです。`,
      overviewBody:
        `${d} は高機能ですが、モバイルでは操作しづらいことがあります。BitRemote は iPhone、iPad、Mac 向けのリモート管理に集中した UI を提供します。`,
      capabilityItems: [
        `${d} のキューと転送状況を遠隔監視`,
        'iPhone、iPad、Mac からタスクの追加、一時停止、再開、削除を実行',
        'デスクトップブラウザに頼らずタスクを絞り込み・確認',
      ],
      useCaseItems: [
        '外出中にホームサーバーの進捗を確認',
        'Web UI を開かずに遠隔キューを管理',
        `iPhone、iPad、Mac のどれからでも一つのアプリで ${d} サーバーにアクセス`,
      ],
    }),
    [Downloader.Transmission]: (d) => ({
      seoDescription:
        `iPhone、iPad、Mac で BitRemote を使って ${d} をリモート操作。転送状況の監視、キュー管理、遠隔タスク更新が可能です。`,
      heroTitle: `iPhone、iPad、Mac から ${d} を管理`,
      heroBody:
        `BitRemote は iPhone、iPad、Mac から ${d} のキューや転送状況をすばやく確認できるリモート管理アプリです。`,
      overviewBody:
        `${d} が NAS やサーバーで動いている場合でも、BitRemote ならデスクトップ向け画面に頼らず日常的な確認と操作ができます。`,
      capabilityItems: [
        `${d} のタスク状況と転送状況を遠隔確認`,
        'iPhone、iPad、Mac 向けの専用アプリからタスクの追加、一時停止、再開、削除を実行',
        'よくあるキュー確認をよりシンプルな UI で処理',
      ],
      useCaseItems: [
        `サーバーから離れていても ${d} の状態を確認`,
        'iPhone や iPad からホームサーバーのダウンロードを管理',
        'Mac で素早くキューを見直して整理',
      ],
    }),
    [Downloader.SynologyDownloadStation]: (d) => ({
      seoDescription:
        `iPhone、iPad、Mac で BitRemote を使って ${d} をリモート管理。タスク、キュー、ダウンロード状況をどこからでも確認できます。`,
      heroTitle: `${d} 用の遠隔操作アプリ`,
      heroBody:
        'BitRemote は Download Station の状況確認と遠隔操作を iPhone、iPad、Mac から行える専用アプリで、毎回 DSM を開く必要がありません。',
      overviewBody:
        'Synology NAS の Download Station でダウンロードを回しているなら、BitRemote がモバイルや Mac での管理をより簡単にします。',
      capabilityItems: [
        `${d} のタスク状況とキュー活動を確認`,
        'ダウンロードタスクの追加、一時停止、再開、削除を遠隔実行',
        'iPhone、iPad、Mac から NAS の進捗を追跡',
      ],
      useCaseItems: [
        'DSM にログインせず NAS の状態を確認',
        '外出中に自宅や職場のダウンロードタスクを管理',
        'ブラウザ中心の操作を iPhone、iPad、Mac の専用アプリに置き換え',
      ],
    }),
    [Downloader.QNAPDownloadStation]: (d) => ({
      seoDescription:
        `iPhone、iPad、Mac で BitRemote を使って ${d} をリモート操作。キュー状況を監視し、遠隔ダウンロードタスクを管理できます。`,
      heroTitle: `${d} の遠隔操作アプリ`,
      heroBody:
        `BitRemote は QNAP ユーザー向けに、Download Station の状況確認とキュー操作を素早く行える iPhone、iPad、Mac アプリを提供します。`,
      overviewBody:
        'QNAP NAS でダウンロードを運用している場合、BitRemote は iPhone、iPad、Mac からの確認と管理をよりシンプルにします。',
      capabilityItems: [
        `${d} のタスク状況と遠隔活動を監視`,
        'iPhone、iPad、Mac からタスクの追加、一時停止、再開、削除を実行',
        '日常的なキュー確認と調整をより見やすい UI で実施',
      ],
      useCaseItems: [
        '席を離れている間に NAS の進捗を確認',
        'iPhone や iPad から Web UI を開かずに QNAP キューを管理',
        'Mac で遠隔キューの整理や確認をすばやく実施',
      ],
    }),
  },
};

/* ------------------------------------------------------------------ */
/*  Public getters                                                    */
/* ------------------------------------------------------------------ */

function buildContent(
  locale: Locale,
  downloader: Downloader,
  factory: DownloaderLandingEntryFactory,
): DownloaderLandingContent {
  const slug = downloaderSlugByDownloader[downloader];
  const templates = localeTemplates[locale];
  const entry = factory(downloader);
  return {
    ...entry,
    slug,
    downloader,
    primaryKeyword: templates.primaryKeyword(downloader),
    seoTitle: templates.seoTitle(downloader),
    overviewTitle: templates.overviewTitle(downloader),
    capabilityTitle: templates.capabilityTitle,
    useCaseTitle: templates.useCaseTitle,
  };
}

export function getDownloaderLandingContent(
  locale: Locale,
  slug: DownloaderLandingSlug,
): DownloaderLandingContent | undefined {
  const downloader = downloaderBySlug[slug];
  const factory = downloaderLandingDictionary[locale]?.[downloader];
  if (!factory) return undefined;
  return buildContent(locale, downloader, factory);
}

export function getDownloaderLandingEntries() {
  return Object.entries(downloaderLandingDictionary).flatMap(([locale, entries]) =>
    Object.entries(entries ?? {}).map(([downloader, factory]) => ({
      locale: locale as Locale,
      content: buildContent(locale as Locale, downloader as Downloader, factory),
    })),
  );
}

export function getAvailableDownloaderLandingLocales(slug: DownloaderLandingSlug): Locale[] {
  const downloader = downloaderBySlug[slug];
  return (Object.keys(downloaderLandingDictionary) as Locale[]).filter(
    (locale) => downloaderLandingDictionary[locale]?.[downloader],
  );
}
