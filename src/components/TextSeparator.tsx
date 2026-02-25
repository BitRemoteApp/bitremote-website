import { useId } from 'react';

type Props = {
  height?: number;
};

export function TextSeparator({ height = 14 }: Props) {
  const rawId = useId();
  const patternId = `sep_${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      className="separator"
      width="100%"
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <text
            x="0"
            y="10"
            fill="currentColor"
            className="mono"
            fontSize="12"
          >
            ░
          </text>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

