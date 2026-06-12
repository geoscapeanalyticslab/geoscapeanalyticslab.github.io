export default function GSALLogo({ size = 40, showText = true, light = false }) {
  const fg   = light ? '#ffffff'   : '#0f2318'
  const arm  = light ? '#c8ddd0'   : '#8aa89a'
  const tip  = light ? '#e8f0eb'   : '#c9ddd4'
  const gText = light ? '#e8f0eb'  : '#6b7280'

  return (
    <div className="flex items-center gap-3">
      {/* Globe + compass SVG */}
      <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Compass needle arms */}
        <g fill={arm} stroke="none">
          <polygon points="100,6 107,44 93,44"   />
          <polygon points="100,194 107,156 93,156" />
          <polygon points="6,100 44,107 44,93"   />
          <polygon points="194,100 156,107 156,93" />
        </g>
        {/* Diagonal thin arms */}
        <g stroke={arm} strokeWidth="1.4" fill="none">
          <line x1="36" y1="36" x2="70"  y2="70"  />
          <line x1="164" y1="36" x2="130" y2="70"  />
          <line x1="36" y1="164" x2="70"  y2="130" />
          <line x1="164" y1="164" x2="130" y2="130" />
        </g>
        {/* Globe body */}
        <circle cx="100" cy="100" r="58" fill="url(#gGrad)" />
        {/* Grid lines clipped to globe */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" clipPath="url(#gClip)">
          <ellipse cx="100" cy="100" rx="58" ry="19" />
          <ellipse cx="100" cy="100" rx="58" ry="38" />
          <line x1="100" y1="42" x2="100" y2="158" />
          <ellipse cx="100" cy="100" rx="29" ry="58" />
          <ellipse cx="100" cy="100" rx="52" ry="58" transform="rotate(60 100 100)"  />
          <ellipse cx="100" cy="100" rx="52" ry="58" transform="rotate(-60 100 100)" />
        </g>
        {/* Globe outline */}
        <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        {/* Compass letters */}
        <text x="100" y="3.5"  textAnchor="middle" fontSize="10" fontWeight="700" fill={fg} fontFamily="Inter,sans-serif">N</text>
        <text x="100" y="199"  textAnchor="middle" fontSize="10" fontWeight="700" fill={fg} fontFamily="Inter,sans-serif">S</text>
        <text x="2"   y="104"  textAnchor="middle" fontSize="10" fontWeight="700" fill={fg} fontFamily="Inter,sans-serif">W</text>
        <text x="198" y="104"  textAnchor="middle" fontSize="10" fontWeight="700" fill={fg} fontFamily="Inter,sans-serif">E</text>
        <defs>
          <radialGradient id="gGrad" cx="36%" cy="30%" r="68%">
            <stop offset="0%"   stopColor="#6ea8c8" />
            <stop offset="45%"  stopColor="#3d7aa0" />
            <stop offset="100%" stopColor="#1a4e6e" />
          </radialGradient>
          <clipPath id="gClip">
            <circle cx="100" cy="100" r="58" />
          </clipPath>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none select-none">
          <span className="font-black text-xs tracking-[0.18em] uppercase" style={{ color: light ? '#c8ddd0' : '#6b7280', fontSize: '9px' }}>
            GEOSCAPE
          </span>
          <span className="font-black text-xs tracking-[0.18em] uppercase" style={{ color: light ? '#c8ddd0' : '#6b7280', fontSize: '9px' }}>
            ANALYTICS LAB
          </span>
          <span className="font-black text-lg tracking-[0.28em] uppercase mt-0.5" style={{ color: light ? '#ffffff' : '#0f2318' }}>
            GSAL
          </span>
        </div>
      )}
    </div>
  )
}
