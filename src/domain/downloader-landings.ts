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
  'zh-hant': {
    aria2: {
      slug: 'aria2',
      clientName: 'aria2',
      primaryKeyword: 'aria2 遠端控制 app',
      seoTitle: 'BitRemote for aria2 | aria2 遠端控制 App',
      seoDescription:
        '在 iPhone、iPad 與 Mac 上使用 BitRemote 遠端管理 aria2。隨時查看佇列、新增任務並管理 aria2 下載。',
      heroTitle: '在 iPhone、iPad 與 Mac 上控制 aria2 下載。',
      heroBody:
        'BitRemote 讓你不用回到伺服器後台，也能查看 aria2 活動、檢查佇列並管理遠端下載任務。',
      overviewTitle: '為什麼搭配 aria2 使用 BitRemote',
      overviewBody:
        '如果你的 aria2 執行在 NAS、VPS、seedbox 或家用伺服器上，BitRemote 能在 Apple 裝置上提供更適合日常管理的遠端介面。',
      capabilityTitle: '你可以做什麼',
      capabilityItems: [
        '查看 aria2 進行中、等待中、停止中與已完成的任務。',
        '遠端暫停、恢復、刪除與新增下載任務。',
        '在 Apple 裝置上檢查傳輸活動與佇列狀態。',
      ],
      useCaseTitle: '常見 aria2 使用情境',
      useCaseItems: [
        '離開座位時查看遠端下載工作。',
        '管理 NAS 或家用伺服器上的自架 aria2。',
        '用更適合手機的介面追蹤大型下載佇列。',
      ],
    },
    qbittorrent: {
      slug: 'qbittorrent',
      clientName: 'qBittorrent',
      primaryKeyword: 'qBittorrent 遠端 app',
      seoTitle: 'BitRemote for qBittorrent | qBittorrent 遠端 App',
      seoDescription:
        '在 iPhone、iPad 與 Mac 上用 BitRemote 遠端管理 qBittorrent。隨時查看佇列、監控活動並控制 qBittorrent 任務。',
      heroTitle: '把 BitRemote 當成你的 qBittorrent 遠端 App。',
      heroBody:
        'BitRemote 幫助你在 Apple 裝置上更輕鬆查看 qBittorrent 佇列、掌握活動狀態，並快速執行任務操作。',
      overviewTitle: '為什麼搭配 qBittorrent 使用 BitRemote',
      overviewBody:
        'qBittorrent 功能很完整，但在手機上不一定適合長時間使用。BitRemote 提供更專注的 Apple 介面來處理遠端任務管理。',
      capabilityTitle: '你可以做什麼',
      capabilityItems: [
        '遠端監控 qBittorrent 佇列與傳輸活動。',
        '從 Apple 裝置暫停、恢復、刪除與新增 qBittorrent 任務。',
        '不用依賴桌面瀏覽器也能篩選與檢查任務。',
      ],
      useCaseTitle: '常見 qBittorrent 使用情境',
      useCaseItems: [
        '離家時檢查家中伺服器的下載進度。',
        '不開完整 Web UI 也能管理遠端佇列。',
        '在 iPhone、iPad、Mac 上維持一致的下載管理流程。',
      ],
    },
    transmission: {
      slug: 'transmission',
      clientName: 'Transmission',
      primaryKeyword: 'Transmission 遠端 app',
      seoTitle: 'BitRemote for Transmission | Transmission 遠端 App',
      seoDescription:
        '在 iPhone、iPad 與 Mac 上用 BitRemote 遠端控制 Transmission。隨時監控傳輸活動、管理佇列並更新遠端任務。',
      heroTitle: '用 Apple 裝置管理 Transmission。',
      heroBody:
        'BitRemote 為 Transmission 使用者提供專注的遠端控制 App，方便在 iPhone、iPad 與 Mac 上查看佇列與傳輸狀態。',
      overviewTitle: '為什麼搭配 Transmission 使用 BitRemote',
      overviewBody:
        '當 Transmission 執行在 NAS、伺服器或家用環境上時，BitRemote 讓你不用面對桌面式介面，也能快速檢查活動與控制任務。',
      capabilityTitle: '你可以做什麼',
      capabilityItems: [
        '遠端查看 Transmission 任務狀態與傳輸活動。',
        '透過專用 Apple App 暫停、恢復、刪除與新增任務。',
        '用更簡潔的介面完成常見佇列檢查與操作。',
      ],
      useCaseTitle: '常見 Transmission 使用情境',
      useCaseItems: [
        '白天查看遠端 Transmission 活動。',
        '在 iPhone 或 iPad 上管理家用伺服器下載。',
        '用 Mac 更快速地清理與更新佇列。',
      ],
    },
    'synology-download-station': {
      slug: 'synology-download-station',
      clientName: 'Synology Download Station',
      primaryKeyword: 'Synology Download Station 遠端 app',
      seoTitle: 'BitRemote for Synology Download Station | 遠端 App',
      seoDescription:
        '在 iPhone、iPad 與 Mac 上用 BitRemote 遠端管理 Synology Download Station。隨時查看任務、佇列與下載活動。',
      heroTitle: 'Synology Download Station 的遠端控制 App。',
      heroBody:
        'BitRemote 為 Synology 使用者提供專用的 Apple App，可查看 Download Station 活動並管理遠端下載任務，不必每次都打開 DSM。',
      overviewTitle: '為什麼搭配 Synology Download Station 使用 BitRemote',
      overviewBody:
        '如果你的下載任務跑在 Synology NAS 的 Download Station 上，BitRemote 能在行動裝置與 Mac 上提供更簡單的管理體驗。',
      capabilityTitle: '你可以做什麼',
      capabilityItems: [
        '查看 Synology Download Station 任務狀態與佇列活動。',
        '遠端暫停、恢復、刪除與新增下載任務。',
        '在 iPhone、iPad 或 Mac 上追蹤 NAS 下載進度。',
      ],
      useCaseTitle: '常見 Synology 使用情境',
      useCaseItems: [
        '不登入 DSM 也能查看 NAS 下載狀態。',
        '外出時管理家中或辦公室的下載任務。',
        '用專用 Apple 用戶端取代瀏覽器操作流程。',
      ],
    },
    'qnap-download-station': {
      slug: 'qnap-download-station',
      clientName: 'QNAP Download Station',
      primaryKeyword: 'QNAP Download Station 遠端 app',
      seoTitle: 'BitRemote for QNAP Download Station | 遠端 App',
      seoDescription:
        '在 iPhone、iPad 與 Mac 上用 BitRemote 遠端控制 QNAP Download Station。隨時監控佇列活動並管理遠端下載任務。',
      heroTitle: 'QNAP Download Station 的遠端下載管理。',
      heroBody:
        'BitRemote 幫助 QNAP 使用者用原生 Apple App 監看 Download Station 活動，並更快速地處理遠端佇列。',
      overviewTitle: '為什麼搭配 QNAP Download Station 使用 BitRemote',
      overviewBody:
        '當你的下載任務跑在 QNAP NAS 上時，BitRemote 能在 iPhone、iPad 與 Mac 上提供更簡單的查看與管理方式。',
      capabilityTitle: '你可以做什麼',
      capabilityItems: [
        '監控 QNAP Download Station 任務狀態與遠端活動。',
        '從 Apple 裝置暫停、恢復、刪除與新增任務。',
        '用更乾淨的介面進行例行佇列檢查與調整。',
      ],
      useCaseTitle: '常見 QNAP 使用情境',
      useCaseItems: [
        '離開座位時追蹤 NAS 下載進度。',
        '在 iPhone 或 iPad 上管理 QNAP 佇列而不打開完整 Web UI。',
        '用 Mac 更快完成遠端佇列檢查與整理。',
      ],
    },
  },
  'zh-hans': {
    aria2: {
      slug: 'aria2',
      clientName: 'aria2',
      primaryKeyword: 'aria2 远程控制 app',
      seoTitle: 'BitRemote for aria2 | aria2 远程控制 App',
      seoDescription:
        '在 iPhone、iPad 和 Mac 上使用 BitRemote 远程管理 aria2。随时查看队列、新增任务并管理 aria2 下载。',
      heroTitle: '在 iPhone、iPad 和 Mac 上控制 aria2 下载。',
      heroBody:
        'BitRemote 让你不用回到服务器后台，也能查看 aria2 活动、检查队列并管理远程下载任务。',
      overviewTitle: '为什么搭配 aria2 使用 BitRemote',
      overviewBody:
        '如果你的 aria2 运行在 NAS、VPS、seedbox 或家庭服务器上，BitRemote 能在 Apple 设备上提供更适合日常使用的远程管理界面。',
      capabilityTitle: '你可以做什么',
      capabilityItems: [
        '查看 aria2 进行中、等待中、停止中与已完成的任务。',
        '远程暂停、恢复、删除与新增下载任务。',
        '在 Apple 设备上检查传输活动与队列状态。',
      ],
      useCaseTitle: '常见 aria2 使用场景',
      useCaseItems: [
        '离开座位时查看远程下载任务。',
        '管理 NAS 或家庭服务器上的自托管 aria2。',
        '用更适合手机的界面追踪大型下载队列。',
      ],
    },
    qbittorrent: {
      slug: 'qbittorrent',
      clientName: 'qBittorrent',
      primaryKeyword: 'qBittorrent 远程 app',
      seoTitle: 'BitRemote for qBittorrent | qBittorrent 远程 App',
      seoDescription:
        '在 iPhone、iPad 和 Mac 上用 BitRemote 远程管理 qBittorrent。随时查看队列、监控活动并控制 qBittorrent 任务。',
      heroTitle: '把 BitRemote 当作你的 qBittorrent 远程 App。',
      heroBody:
        'BitRemote 帮助你在 Apple 设备上更轻松地查看 qBittorrent 队列、掌握活动状态，并快速执行任务操作。',
      overviewTitle: '为什么搭配 qBittorrent 使用 BitRemote',
      overviewBody:
        'qBittorrent 功能强大，但在移动设备上不一定适合长期使用。BitRemote 提供更专注的 Apple 界面来处理远程任务管理。',
      capabilityTitle: '你可以做什么',
      capabilityItems: [
        '远程监控 qBittorrent 队列与传输活动。',
        '从 Apple 设备暂停、恢复、删除与新增 qBittorrent 任务。',
        '不用依赖桌面浏览器也能筛选与检查任务。',
      ],
      useCaseTitle: '常见 qBittorrent 使用场景',
      useCaseItems: [
        '离家时检查家庭服务器的下载进度。',
        '不开完整 Web UI 也能管理远程队列。',
        '在 iPhone、iPad、Mac 上保持一致的下载管理流程。',
      ],
    },
    transmission: {
      slug: 'transmission',
      clientName: 'Transmission',
      primaryKeyword: 'Transmission 远程 app',
      seoTitle: 'BitRemote for Transmission | Transmission 远程 App',
      seoDescription:
        '在 iPhone、iPad 和 Mac 上用 BitRemote 远程控制 Transmission。随时监控传输活动、管理队列并更新远程任务。',
      heroTitle: '用 Apple 设备管理 Transmission。',
      heroBody:
        'BitRemote 为 Transmission 用户提供专注的远程控制 App，方便在 iPhone、iPad 和 Mac 上查看队列与传输状态。',
      overviewTitle: '为什么搭配 Transmission 使用 BitRemote',
      overviewBody:
        '当 Transmission 运行在 NAS、服务器或家庭环境上时，BitRemote 让你不用面对桌面式界面，也能快速检查活动与控制任务。',
      capabilityTitle: '你可以做什么',
      capabilityItems: [
        '远程查看 Transmission 任务状态与传输活动。',
        '通过专用 Apple App 暂停、恢复、删除与新增任务。',
        '用更简洁的界面完成常见队列检查与操作。',
      ],
      useCaseTitle: '常见 Transmission 使用场景',
      useCaseItems: [
        '白天查看远程 Transmission 活动。',
        '在 iPhone 或 iPad 上管理家庭服务器下载。',
        '用 Mac 更快清理与更新队列。',
      ],
    },
    'synology-download-station': {
      slug: 'synology-download-station',
      clientName: 'Synology Download Station',
      primaryKeyword: 'Synology Download Station 远程 app',
      seoTitle: 'BitRemote for Synology Download Station | 远程 App',
      seoDescription:
        '在 iPhone、iPad 和 Mac 上用 BitRemote 远程管理 Synology Download Station。随时查看任务、队列与下载活动。',
      heroTitle: 'Synology Download Station 的远程控制 App。',
      heroBody:
        'BitRemote 为 Synology 用户提供专用的 Apple App，可查看 Download Station 活动并管理远程下载任务，不必每次都打开 DSM。',
      overviewTitle: '为什么搭配 Synology Download Station 使用 BitRemote',
      overviewBody:
        '如果你的下载任务运行在 Synology NAS 的 Download Station 上，BitRemote 能在移动设备与 Mac 上提供更简单的管理体验。',
      capabilityTitle: '你可以做什么',
      capabilityItems: [
        '查看 Synology Download Station 任务状态与队列活动。',
        '远程暂停、恢复、删除与新增下载任务。',
        '在 iPhone、iPad 或 Mac 上追踪 NAS 下载进度。',
      ],
      useCaseTitle: '常见 Synology 使用场景',
      useCaseItems: [
        '不登录 DSM 也能查看 NAS 下载状态。',
        '外出时管理家里或办公室的下载任务。',
        '用专用 Apple 客户端替代浏览器操作流程。',
      ],
    },
    'qnap-download-station': {
      slug: 'qnap-download-station',
      clientName: 'QNAP Download Station',
      primaryKeyword: 'QNAP Download Station 远程 app',
      seoTitle: 'BitRemote for QNAP Download Station | 远程 App',
      seoDescription:
        '在 iPhone、iPad 和 Mac 上用 BitRemote 远程控制 QNAP Download Station。随时监控队列活动并管理远程下载任务。',
      heroTitle: 'QNAP Download Station 的远程下载管理。',
      heroBody:
        'BitRemote 帮助 QNAP 用户用原生 Apple App 监看 Download Station 活动，并更快处理远程队列。',
      overviewTitle: '为什么搭配 QNAP Download Station 使用 BitRemote',
      overviewBody:
        '当你的下载任务运行在 QNAP NAS 上时，BitRemote 能在 iPhone、iPad 和 Mac 上提供更简单的查看与管理方式。',
      capabilityTitle: '你可以做什么',
      capabilityItems: [
        '监控 QNAP Download Station 任务状态与远程活动。',
        '从 Apple 设备暂停、恢复、删除与新增任务。',
        '用更干净的界面完成日常队列检查与调整。',
      ],
      useCaseTitle: '常见 QNAP 使用场景',
      useCaseItems: [
        '离开座位时追踪 NAS 下载进度。',
        '在 iPhone 或 iPad 上管理 QNAP 队列而不打开完整 Web UI。',
        '用 Mac 更快完成远程队列检查与整理。',
      ],
    },
  },
  ja: {
    aria2: {
      slug: 'aria2',
      clientName: 'aria2',
      primaryKeyword: 'aria2 リモート管理アプリ',
      seoTitle: 'BitRemote for aria2 | aria2 リモート管理アプリ',
      seoDescription:
        'iPhone、iPad、Mac で BitRemote を使って aria2 をリモート管理。キュー確認、新規追加、ダウンロード操作をどこからでも行えます。',
      heroTitle: 'iPhone、iPad、Mac から aria2 を操作。',
      heroBody:
        'BitRemote を使えば、サーバー画面に戻らなくても aria2 の状態確認、キュー管理、遠隔操作ができます。',
      overviewTitle: 'aria2 に BitRemote を使う理由',
      overviewBody:
        'aria2 を NAS、VPS、seedbox、ホームサーバーで運用しているなら、BitRemote が Apple デバイス向けの扱いやすい管理インターフェースになります。',
      capabilityTitle: 'できること',
      capabilityItems: [
        'aria2 の進行中、待機中、停止中、完了済みタスクを確認。',
        'ダウンロードタスクの追加、一時停止、再開、削除を遠隔操作。',
        'Apple デバイスから転送状況とキュー状態を確認。',
      ],
      useCaseTitle: '主な aria2 の使い方',
      useCaseItems: [
        '席を離れている間に遠隔ダウンロード状況を確認。',
        'NAS やホームサーバー上の自前 aria2 を管理。',
        '大きなダウンロードキューをスマホ向け UI で追跡。',
      ],
    },
    qbittorrent: {
      slug: 'qbittorrent',
      clientName: 'qBittorrent',
      primaryKeyword: 'qBittorrent リモートアプリ',
      seoTitle: 'BitRemote for qBittorrent | qBittorrent リモートアプリ',
      seoDescription:
        'iPhone、iPad、Mac で BitRemote を使って qBittorrent をリモート管理。キュー確認、アクティビティ監視、タスク操作をどこからでも行えます。',
      heroTitle: 'qBittorrent 用のリモートアプリとして使う。',
      heroBody:
        'BitRemote は Apple デバイスで qBittorrent のキュー確認、状態把握、タスク操作を行いやすくする専用アプリです。',
      overviewTitle: 'qBittorrent に BitRemote を使う理由',
      overviewBody:
        'qBittorrent は高機能ですが、モバイルでは操作しづらいことがあります。BitRemote はリモート管理に集中した Apple 向け UI を提供します。',
      capabilityTitle: 'できること',
      capabilityItems: [
        'qBittorrent のキューと転送状況を遠隔監視。',
        'Apple デバイスからタスクの追加、一時停止、再開、削除を実行。',
        'デスクトップブラウザに頼らずタスクを絞り込み・確認。',
      ],
      useCaseTitle: '主な qBittorrent の使い方',
      useCaseItems: [
        '外出中にホームサーバーの進捗を確認。',
        'フル Web UI を開かずに遠隔キューを管理。',
        'iPhone、iPad、Mac で同じ管理フローを維持。',
      ],
    },
    transmission: {
      slug: 'transmission',
      clientName: 'Transmission',
      primaryKeyword: 'Transmission リモートアプリ',
      seoTitle: 'BitRemote for Transmission | Transmission リモートアプリ',
      seoDescription:
        'iPhone、iPad、Mac で BitRemote を使って Transmission をリモート操作。転送状況の監視、キュー管理、遠隔タスク更新が可能です。',
      heroTitle: 'Apple デバイスから Transmission を管理。',
      heroBody:
        'BitRemote は iPhone、iPad、Mac から Transmission のキューや転送状況をすばやく確認できるリモート管理アプリです。',
      overviewTitle: 'Transmission に BitRemote を使う理由',
      overviewBody:
        'Transmission が NAS やサーバーで動いている場合でも、BitRemote ならデスクトップ向け画面に頼らず日常的な確認と操作ができます。',
      capabilityTitle: 'できること',
      capabilityItems: [
        'Transmission のタスク状況と転送状況を遠隔確認。',
        '専用 Apple アプリからタスクの追加、一時停止、再開、削除を実行。',
        'よくあるキュー確認をよりシンプルな UI で処理。',
      ],
      useCaseTitle: '主な Transmission の使い方',
      useCaseItems: [
        '日中に遠隔 Transmission の状態を確認。',
        'iPhone や iPad からホームサーバーのダウンロードを管理。',
        'Mac で素早くキューを見直して整理。',
      ],
    },
    'synology-download-station': {
      slug: 'synology-download-station',
      clientName: 'Synology Download Station',
      primaryKeyword: 'Synology Download Station リモートアプリ',
      seoTitle: 'BitRemote for Synology Download Station | リモートアプリ',
      seoDescription:
        'iPhone、iPad、Mac で BitRemote を使って Synology Download Station をリモート管理。タスク、キュー、ダウンロード状況をどこからでも確認できます。',
      heroTitle: 'Synology Download Station 用のリモートアプリ。',
      heroBody:
        'BitRemote は Download Station の状況確認と遠隔操作を Apple デバイスから行える専用アプリで、毎回 DSM を開く必要がありません。',
      overviewTitle: 'Synology Download Station に BitRemote を使う理由',
      overviewBody:
        'Synology NAS の Download Station でダウンロードを回しているなら、BitRemote がモバイルや Mac での管理をより簡単にします。',
      capabilityTitle: 'できること',
      capabilityItems: [
        'Synology Download Station のタスク状況とキュー活動を確認。',
        'ダウンロードタスクの追加、一時停止、再開、削除を遠隔実行。',
        'iPhone、iPad、Mac から NAS の進捗を追跡。',
      ],
      useCaseTitle: '主な Synology の使い方',
      useCaseItems: [
        'DSM にログインせず NAS の状態を確認。',
        '外出中に自宅や職場のダウンロードタスクを管理。',
        'ブラウザ中心の操作を Apple 専用クライアントに置き換え。',
      ],
    },
    'qnap-download-station': {
      slug: 'qnap-download-station',
      clientName: 'QNAP Download Station',
      primaryKeyword: 'QNAP Download Station リモートアプリ',
      seoTitle: 'BitRemote for QNAP Download Station | リモートアプリ',
      seoDescription:
        'iPhone、iPad、Mac で BitRemote を使って QNAP Download Station をリモート操作。キュー状況を監視し、遠隔ダウンロードタスクを管理できます。',
      heroTitle: 'QNAP Download Station の遠隔ダウンロード管理。',
      heroBody:
        'BitRemote は QNAP ユーザー向けに、Download Station の状況確認とキュー操作を素早く行える Apple アプリを提供します。',
      overviewTitle: 'QNAP Download Station に BitRemote を使う理由',
      overviewBody:
        'QNAP NAS でダウンロードを運用している場合、BitRemote は iPhone、iPad、Mac からの確認と管理をよりシンプルにします。',
      capabilityTitle: 'できること',
      capabilityItems: [
        'QNAP Download Station のタスク状況と遠隔活動を監視。',
        'Apple デバイスからタスクの追加、一時停止、再開、削除を実行。',
        '日常的なキュー確認と調整をより見やすい UI で実施。',
      ],
      useCaseTitle: '主な QNAP の使い方',
      useCaseItems: [
        '席を離れている間に NAS の進捗を確認。',
        'iPhone や iPad からフル Web UI を開かずに QNAP キューを管理。',
        'Mac で遠隔キューの整理や確認をすばやく実施。',
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
