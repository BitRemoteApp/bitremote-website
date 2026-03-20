export enum Client {
  aria2 = 'aria2',
  qBittorrent = 'qBittorrent',
  Transmission = 'Transmission',
  SynologyDownloadStation = 'Synology Download Station',
  QNAPDownloadStation = 'QNAP Download Station',
}

export const supportedClients: readonly Client[] = [
  Client.aria2,
  Client.qBittorrent,
  Client.Transmission,
  Client.SynologyDownloadStation,
  Client.QNAPDownloadStation,
];
