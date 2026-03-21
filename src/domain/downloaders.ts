export enum Downloader {
  aria2 = 'aria2',
  qBittorrent = 'qBittorrent',
  Transmission = 'Transmission',
  SynologyDownloadStation = 'Synology Download Station',
  QNAPDownloadStation = 'QNAP Download Station',
}

export const supportedDownloaders: readonly Downloader[] = [
  Downloader.aria2,
  Downloader.qBittorrent,
  Downloader.Transmission,
  Downloader.SynologyDownloadStation,
  Downloader.QNAPDownloadStation,
];
