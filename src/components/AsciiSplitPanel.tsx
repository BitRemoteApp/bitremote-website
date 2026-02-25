type Props = {
  imageSrc: string;
  imageAlt: string;
  captionLeft: string;
  captionRight: string;
};

export function AsciiSplitPanel({
  imageSrc,
  imageAlt,
  captionLeft,
  captionRight,
}: Props) {
  return (
    <div>
      <div className="splitPanel" role="group" aria-label="App render and byte skeleton">
        <div className="splitPane">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="splitImage"
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="splitPane">
          <div className="skeleton" aria-hidden="true">
            <div className="skeletonTop">
              <div className="skeletonTopLabel">[/ SEARCH …]</div>
              <div className="skeletonTopLabel">[+ NEW] [EXPORT]</div>
            </div>

            <div className="skeletonGrid">
              <div className="skeletonRow">
                <div className="skeletonRowTitle">
                  <span>Tasks</span>
                  <span className="skeletonRowMeta">42%</span>
                </div>
              </div>
              <div className="skeletonRow">
                <div className="skeletonRowTitle">
                  <span>Speed</span>
                  <span className="skeletonRowMeta">12.4 MB/s</span>
                </div>
              </div>
              <div className="skeletonRow">
                <div className="skeletonRowTitle">
                  <span>Peers</span>
                  <span className="skeletonRowMeta">128</span>
                </div>
              </div>
              <div className="skeletonRow">
                <div className="skeletonRowTitle">
                  <span>Queue</span>
                  <span className="skeletonRowMeta">OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="splitCaption">
        <span>{captionLeft}</span>
        <span aria-hidden="true">|</span>
        <span>{captionRight}</span>
      </div>
    </div>
  );
}
