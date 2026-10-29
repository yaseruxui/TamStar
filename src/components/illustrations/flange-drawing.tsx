import { cn } from '@/utils/cn';

const CX = 220;
const CY = 240;
const OUTER = 170;
const RAISED_FACE = 108;
const BORE = 58;
const BOLT_CIRCLE = 140;
const BOLT_HOLES = Array.from({ length: 8 }, (_, index) => {
  const angle = ((22.5 + index * 45) * Math.PI) / 180;
  return { x: CX + BOLT_CIRCLE * Math.cos(angle), y: CY + BOLT_CIRCLE * Math.sin(angle) };
});

const round = (value: number) => Math.round(value * 10) / 10;

/**
 * Weld-neck flange in front view and side elevation, drawn as a technical sheet.
 * Labels are generic (no invented dimensions); strokes animate in once on load.
 */
export function FlangeDrawing({ className }: { className?: string }) {
  const [annotated] = BOLT_HOLES.slice(6, 7);
  return (
    <svg
      viewBox="0 0 560 520"
      direction="ltr"
      role="img"
      aria-label="Technical drawing of a weld-neck raised-face flange, ASME B16.5"
      className={cn('text-navy', className)}
      fill="none"
    >
      <defs>
        <marker
          id="flange-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--color-brand)" strokeWidth="1.4" />
        </marker>
      </defs>

      {/* Centre lines */}
      <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.75" strokeDasharray="16 4 2 4">
        <line x1={CX - OUTER - 30} y1={CY} x2={CX + OUTER + 30} y2={CY} />
        <line x1={CX} y1={CY - OUTER - 30} x2={CX} y2={CY + OUTER + 30} />
        <line x1="420" y1={CY} x2="548" y2={CY} />
      </g>

      {/* Front view */}
      <g stroke="currentColor" strokeWidth="1.6">
        <circle cx={CX} cy={CY} r={OUTER} pathLength={1} className="line-draw" />
        <circle cx={CX} cy={CY} r={RAISED_FACE} pathLength={1} className="line-draw [animation-delay:150ms]" />
        <circle cx={CX} cy={CY} r={BORE} pathLength={1} className="line-draw [animation-delay:300ms]" />
        {BOLT_HOLES.map((hole, index) => (
          <circle
            key={index}
            cx={round(hole.x)}
            cy={round(hole.y)}
            r="13"
            pathLength={1}
            className="line-draw"
            style={{ animationDelay: `${450 + index * 60}ms` }}
          />
        ))}
      </g>
      <circle
        cx={CX}
        cy={CY}
        r={BOLT_CIRCLE}
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="0.75"
        strokeDasharray="5 5"
      />
      <circle cx={CX} cy={CY} r={RAISED_FACE - 10} stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.75" />

      {/* Side elevation (weld neck) */}
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path
          d={`M440 ${CY - OUTER} H474 V${CY + OUTER} H440 Z`}
          pathLength={1}
          className="line-draw [animation-delay:200ms]"
        />
        <path
          d={`M434 ${CY - RAISED_FACE} H440 V${CY + RAISED_FACE} H434 Z`}
          pathLength={1}
          className="line-draw [animation-delay:350ms]"
        />
        <path
          d={`M474 ${CY - 86} L520 ${CY - 66} V${CY + 66} L474 ${CY + 86}`}
          pathLength={1}
          className="line-draw [animation-delay:500ms]"
        />
      </g>
      <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.75" strokeDasharray="5 4">
        <line x1="434" y1={CY - BORE} x2="520" y2={CY - BORE} />
        <line x1="434" y1={CY + BORE} x2="520" y2={CY + BORE} />
      </g>
      <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.75">
        {Array.from({ length: 9 }, (_, index) => (
          <line key={index} x1="441" y1={CY - OUTER + 14 + index * 12} x2="473" y2={CY - OUTER + 2 + index * 12} />
        ))}
      </g>

      {/* Outside-diameter dimension */}
      <g stroke="var(--color-brand)" strokeWidth="1">
        <line x1={CX - OUTER} y1={CY + 12} x2={CX - OUTER} y2="478" strokeOpacity="0.6" />
        <line x1={CX + OUTER} y1={CY + 12} x2={CX + OUTER} y2="478" strokeOpacity="0.6" />
        <line
          x1={CX - OUTER + 2}
          y1="468"
          x2={CX + OUTER - 2}
          y2="468"
          markerStart="url(#flange-arrow)"
          markerEnd="url(#flange-arrow)"
        />
      </g>
      <rect x={CX - 26} y="459" width="52" height="18" fill="var(--color-canvas)" />
      <text x={CX} y="472" textAnchor="middle" className="fill-brand-ink font-mono text-[11px]">
        Ø OD
      </text>

      {/* Leaders */}
      <g stroke="currentColor" strokeWidth="0.9">
        {annotated ? <polyline points={`${round(annotated.x + 9)},${round(annotated.y - 9)} 360,34 410,34`} /> : null}
        <polyline points={`${CX - 76},${CY - 76} 96,58 20,58`} strokeOpacity="0.7" />
      </g>
      <g className="fill-navy font-mono text-[10.5px]">
        <text x="412" y="38">
          8 × BOLT HOLES
        </text>
        <text x="20" y="52">
          RAISED FACE
        </text>
        <text x={CX + 6} y={CY - BORE - 8}>
          BORE
        </text>
      </g>

      {/* Title block */}
      <g stroke="currentColor" strokeWidth="0.9">
        <rect x="392" y="440" width="158" height="68" />
        <line x1="392" y1="462" x2="550" y2="462" />
        <line x1="392" y1="485" x2="550" y2="485" />
        <line x1="480" y1="462" x2="480" y2="508" />
      </g>
      <g className="fill-navy font-mono text-[9.5px]">
        <text x="400" y="455" className="font-medium">
          TAMSTAR · PROCUREMENT DESK
        </text>
        <text x="400" y="477">
          FLANGE WN-RF
        </text>
        <text x="488" y="477">
          ASME B16.5
        </text>
        <text x="400" y="500">
          SHEET 01
        </text>
        <text x="488" y="500">
          REV A
        </text>
      </g>
    </svg>
  );
}
