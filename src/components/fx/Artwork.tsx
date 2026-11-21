import { useId } from 'react';
import type { Accent, Project } from '../../data/types';
import { cn } from '../../lib/utils';

const palette: Record<Accent, { a: string; b: string; c: string }> = {
  violet: { a: '#8b5cf6', b: '#4c6fff', c: '#c4b5fd' },
  electric: { a: '#4c6fff', b: '#22d3ee', c: '#9db6ff' },
  cyan: { a: '#22d3ee', b: '#4c6fff', c: '#a5f3fc' },
  emerald: { a: '#10b981', b: '#22d3ee', c: '#a7f3d0' },
  amber: { a: '#f59e0b', b: '#f472b6', c: '#fde68a' },
  rose: { a: '#fb7185', b: '#8b5cf6', c: '#fecdd3' },
};

function Motif({ motif, id }: { motif: string; id: string }) {
  if (motif === 'pulse') {
    return (
      <g>
        <path
          d="M40 176h86l22-46 30 92 28-64 18 26h60"
          fill="none"
          stroke={`url(#${id}-line)`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 214h74l20-24 24 44 26-32 20 14h84"
          fill="none"
          stroke={`url(#${id}-line)`}
          strokeOpacity="0.35"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {[40, 196, 250, 356].map((x, index) => (
          <circle key={x} cx={x} cy={index % 2 ? 196 : 176} r="3.4" fill={`url(#${id}-dot)`} />
        ))}
      </g>
    );
  }

  if (motif === 'network') {
    const nodes = [
      [90, 96],
      [176, 58],
      [252, 112],
      [330, 72],
      [392, 140],
      [150, 190],
      [232, 214],
      [316, 188],
      [82, 240],
      [370, 250],
    ];
    return (
      <g>
        {nodes.map(([x, y], index) =>
          nodes.slice(index + 1).map(([x2, y2]) => {
            const distance = Math.hypot(x2 - x, y2 - y);
            if (distance > 140) return null;
            return (
              <line
                key={`${x}-${y}-${x2}-${y2}`}
                x1={x}
                y1={y}
                x2={x2}
                y2={y2}
                stroke={`url(#${id}-line)`}
                strokeOpacity={0.24}
                strokeWidth="1"
              />
            );
          }),
        )}
        {nodes.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 3 === 0 ? 5 : 3} fill={`url(#${id}-dot)`} />
        ))}
      </g>
    );
  }

  if (motif === 'query') {
    return (
      <g fontFamily="JetBrains Mono, monospace" fontSize="13" fill={`url(#${id}-dot)`}>
        <rect x="58" y="72" width="250" height="150" rx="12" fill="rgba(4,5,12,0.55)" stroke={`url(#${id}-line)`} strokeOpacity="0.4" />
        <text x="78" y="104" opacity="0.9">SELECT</text>
        <text x="78" y="130" opacity="0.55">  customer_id,</text>
        <text x="78" y="156" opacity="0.55">  SUM(amount)</text>
        <text x="78" y="182" opacity="0.9">FROM transactions</text>
        <path d="M318 148h52m0 0-14-12m14 12-14 12" stroke={`url(#${id}-line)`} strokeWidth="2" fill="none" strokeLinecap="round" />
        {[0, 1, 2, 3].map((row) => (
          <rect key={row} x="368" y={104 + row * 30} width="66" height="8" rx="4" fill={`url(#${id}-dot)`} opacity={0.85 - row * 0.16} />
        ))}
      </g>
    );
  }

  if (motif === 'grid') {
    return (
      <g>
        <rect x="66" y="60" width="348" height="200" rx="14" fill="none" stroke={`url(#${id}-line)`} strokeOpacity="0.35" />
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const flagged = (row * 6 + col) % 7 === 3 || (row === 2 && col === 4);
            return (
              <rect
                key={`${row}-${col}`}
                x={82 + col * 54}
                y={78 + row * 36}
                width="44"
                height="24"
                rx="5"
                fill={flagged ? `url(#${id}-dot)` : 'rgba(255,255,255,0.06)'}
                opacity={flagged ? 0.75 : 1}
              />
            );
          }),
        )}
        <rect x="290" y="28" width="132" height="34" rx="17" fill="rgba(4,5,12,0.7)" stroke={`url(#${id}-line)`} strokeOpacity="0.5" />
        <circle cx="309" cy="45" r="4" fill="#34d399" />
        <rect x="321" y="41" width="78" height="7" rx="3.5" fill={`url(#${id}-dot)`} opacity="0.5" />
      </g>
    );
  }

  if (motif === 'orbit' || motif === 'orbits') {
    return (
      <g>
        <circle cx="240" cy="160" r="52" fill={`url(#${id}-dot)`} opacity="0.28" />
        <circle cx="240" cy="160" r="86" fill="none" stroke={`url(#${id}-line)`} strokeOpacity="0.5" />
        <circle cx="240" cy="160" r="122" fill="none" stroke={`url(#${id}-line)`} strokeOpacity="0.28" />
        <circle cx="240" cy="160" r="42" fill="none" stroke={`url(#${id}-line)`} strokeOpacity="0.7" />
        <circle cx="322" cy="104" r="7" fill={`url(#${id}-dot)`} />
        <circle cx="152" cy="214" r="5" fill={`url(#${id}-dot)`} opacity="0.8" />
        <circle cx="350" cy="216" r="4" fill={`url(#${id}-dot)`} opacity="0.6" />
        <path d="M240 34v-4M240 290v-4M96 160h-6M390 160h-6" stroke={`url(#${id}-line)`} strokeOpacity="0.4" />
      </g>
    );
  }

  // ledger: transaction chain
  return (
    <g>
      {[0, 1, 2, 3].map((index) => {
        const x = 68 + index * 100;
        return (
          <g key={index}>
            <rect x={x} y={118} width="72" height="76" rx="14" fill="rgba(4,5,12,0.6)" stroke={`url(#${id}-line)`} strokeOpacity="0.55" />
            <circle cx={x + 36} cy={146} r="9" fill={`url(#${id}-dot)`} opacity={1 - index * 0.14} />
            <rect x={x + 16} y={166} width="40" height="6" rx="3" fill={`url(#${id}-dot)`} opacity="0.5" />
            <rect x={x + 24} y={180} width="24" height="4" rx="2" fill="white" opacity="0.18" />
            {index < 3 ? (
              <path d={`M${x + 76} 156h20`} stroke={`url(#${id}-line)`} strokeWidth="1.6" strokeDasharray="4 4" />
            ) : null}
          </g>
        );
      })}
      <path d="M68 250h344" stroke={`url(#${id}-line)`} strokeOpacity="0.22" />
      <path d="M68 74c46 0 60 30 100 30s58-26 100-26 58 28 100 28 32-10 44-10" fill="none" stroke={`url(#${id}-line)`} strokeOpacity="0.3" />
    </g>
  );
}

const motifBySlug: Record<string, string> = {
  healthlens: 'pulse',
  'rag-teaching-assistant': 'network',
  'text-to-sql': 'query',
  'dataguard-ai': 'grid',
  'contextforge-ai': 'orbit',
  'transaction-risk-investigation': 'ledger',
};

export function Artwork({ project, className }: { project: Pick<Project, 'slug' | 'accent'>; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const colors = palette[project.accent] ?? palette.violet;
  const motif = motifBySlug[project.slug] ?? 'network';

  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label={`Abstract artwork representing the ${project.slug.replace(/-/g, ' ')} project`}
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="480" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a0d1c" />
          <stop offset="1" stopColor="#05060f" />
        </linearGradient>
        <linearGradient id={`${uid}-line`} x1="40" y1="40" x2="440" y2="290" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.a} />
          <stop offset="1" stopColor={colors.b} />
        </linearGradient>
        <radialGradient id={`${uid}-dot`} cx="0" cy="0" r="1" gradientTransform="translate(240 160) rotate(90) scale(180)" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.c} />
          <stop offset="1" stopColor={colors.a} />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="0" cy="0" r="1" gradientTransform="translate(350 80) rotate(130) scale(220)" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.a} stopOpacity="0.45" />
          <stop offset="1" stopColor={colors.a} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" fill="none" stroke="white" strokeOpacity="0.04" />
        </pattern>
      </defs>
      <rect width="480" height="320" fill={`url(#${uid}-bg)`} />
      <rect width="480" height="320" fill={`url(#${uid}-grid)`} />
      <rect width="480" height="320" fill={`url(#${uid}-glow)`} />
      <g className="animate-float" style={{ transformOrigin: '240px 160px' }}>
        <Motif motif={motif} id={uid} />
      </g>
    </svg>
  );
}
