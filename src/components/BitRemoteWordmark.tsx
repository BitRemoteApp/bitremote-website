export function BitRemoteWordmark() {
  return (
    <svg
      className="h-auto w-[min(520px,100%)]"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 520 56"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="pixelate" x="0" y="0">
          <feFlood x="1" y="1" width="10" height="10">
            <animate attributeName="height" from="0" to="10" dur="0.9s" repeatCount="1" />
            <animate attributeName="width" from="5" to="10" dur="0.9s" repeatCount="1" />
            <animate attributeName="y" from="-5" to="0" dur="0.9s" repeatCount="1" />
            <animate
              attributeName="height"
              values="10;2;5;10;10"
              dur="6s"
              begin="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="width"
              dur="6s"
              values="10;7.5;10;10;10"
              begin="6s"
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite width="8" height="8" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology operator="dilate">
            <animate
              attributeName="radius"
              values="0;0.25;0.75;0;0"
              dur="6s"
              begin="6s"
              repeatCount="indefinite"
            />
          </feMorphology>
        </filter>
      </defs>

      <text
        x="0"
        y="46"
        textAnchor="start"
        fill="var(--blue)"
        stroke="none"
        className="font-sans motion-reduce:opacity-0"
        filter="url(#pixelate)"
        style={{ fontSize: 52, letterSpacing: '-0.06em', textTransform: 'uppercase' }}
      >
        BitRemote
      </text>

      <text
        x="0"
        y="46"
        textAnchor="start"
        fill="var(--blue)"
        stroke="none"
        className="font-sans opacity-0 motion-reduce:opacity-100"
        style={{ fontSize: 52, letterSpacing: '-0.06em', textTransform: 'uppercase' }}
      >
        BitRemote
      </text>
    </svg>
  );
}
