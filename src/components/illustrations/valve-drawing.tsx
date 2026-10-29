import { cn } from '@/utils/cn';

/** Ball valve, side elevation — companion sheet to the flange drawing. */
export function ValveDrawing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 300"
      direction="ltr"
      role="img"
      aria-label="Technical drawing of a flanged ball valve, API 6D"
      className={cn('text-navy', className)}
      fill="none"
    >
      <line
        x1="10"
        y1="190"
        x2="510"
        y2="190"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="0.75"
        strokeDasharray="16 4 2 4"
      />
      <line
        x1="260"
        y1="20"
        x2="260"
        y2="290"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="0.75"
        strokeDasharray="16 4 2 4"
      />

      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="40" y="112" width="22" height="156" pathLength={1} className="line-draw" />
        <rect x="458" y="112" width="22" height="156" pathLength={1} className="line-draw" />
        <path
          d="M62 150 H150 C172 104 348 104 370 150 H458 V230 H370 C348 276 172 276 150 230 H62 Z"
          pathLength={1}
          className="line-draw [animation-delay:150ms]"
        />
        <rect x="246" y="76" width="28" height="44" pathLength={1} className="line-draw [animation-delay:300ms]" />
        <rect
          x="118"
          y="56"
          width="284"
          height="18"
          rx="3"
          pathLength={1}
          className="line-draw [animation-delay:450ms]"
        />
      </g>
      <circle
        cx="260"
        cy="190"
        r="62"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.9"
        strokeDasharray="5 4"
      />
      <circle
        cx="260"
        cy="190"
        r="30"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.9"
        strokeDasharray="5 4"
      />
      <g stroke="currentColor" strokeWidth="1.2">
        {[124, 146, 168, 212, 234, 256].map((y) => (
          <g key={y}>
            <line x1="34" y1={y} x2="68" y2={y} />
            <line x1="452" y1={y} x2="486" y2={y} />
          </g>
        ))}
      </g>

      <g stroke="currentColor" strokeWidth="0.9">
        <polyline points="402,65 440,30 500,30" />
        <polyline points="296,166 360,96 500,96" strokeOpacity="0.7" />
      </g>
      <g className="fill-navy font-mono text-[10.5px]">
        <text x="442" y="25">
          LEVER
        </text>
        <text x="420" y="91">
          BALL · TRUNNION
        </text>
        <text x="40" y="290">
          API 6D · FLANGED RF
        </text>
      </g>
    </svg>
  );
}
