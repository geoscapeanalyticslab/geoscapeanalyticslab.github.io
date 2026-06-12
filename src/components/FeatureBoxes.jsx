import { useEffect, useRef, useState } from 'react'
import { Satellite, Globe2, Cpu, Layers, Map, CloudRain, Trees, BarChart3 } from 'lucide-react'

const BOXES = [
  { id: 'sat', label: 'Satellite\nImaging',   icon: Satellite, accent: '#2a9d8f', speed: 3.2, floatIdx: 0 },
  { id: 'gee', label: 'Earth\nEngine',         icon: Globe2,    accent: '#264653', speed: 3.8, floatIdx: 1 },
  { id: 'ai',  label: 'GeoAI',                 icon: Cpu,       accent: '#e76f51', speed: 3.0, floatIdx: 2 },
  { id: 'lc',  label: 'Land\nCover',           icon: Layers,    accent: '#e9c46a', speed: 4.0, floatIdx: 3 },
  { id: 'gis', label: 'GIS\nMapping',          icon: Map,       accent: '#2a9d8f', speed: 3.5, floatIdx: 1 },
  { id: 'cl',  label: 'Climate\nRisk',         icon: CloudRain, accent: '#264653', speed: 2.9, floatIdx: 0 },
  { id: 'fm',  label: 'Forest\nMapping',       icon: Trees,     accent: '#f4a261', speed: 3.6, floatIdx: 3 },
  { id: 'sa',  label: 'Spatial\nAnalytics',    icon: BarChart3, accent: '#e76f51', speed: 3.3, floatIdx: 2 },
]

/* Four distinct float patterns for visual variety */
const FLOATS = [
  'floatA', 'floatB', 'floatC', 'floatD',
]

function FeatureCard({ box, index }) {
  const ref           = useRef(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)
  const [shine, setShine] = useState(false)
  const Icon  = box.icon
  const anim  = FLOATS[box.floatIdx]
  const delay = index * 0.07

  useEffect(() => {
    const el  = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleEnter = () => {
    setHov(true)
    setShine(false)
    requestAnimationFrame(() => setShine(true))
  }

  return (
    /* Outer: entry opacity only */
    <div
      ref={ref}
      style={{
        opacity:    vis ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}s`,
      }}
    >
      {/* Inner: entry slide-up + float animation (both on transform, no conflict) */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={() => { setHov(false); setShine(false) }}
        style={{
          transform:  vis ? 'translateY(0)' : 'translateY(22px) scale(0.95)',
          transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
          
        }}
        className="feature-card relative bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center gap-3 cursor-default select-none"
      >
        {/* Hover glow border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity:    hov ? 1 : 0,
            boxShadow:  `0 0 0 1.5px ${box.accent}55, 0 8px 30px ${box.accent}22`,
          }}
        />

        {/* Shine sweep */}
        {shine && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{ zIndex: 10 }}
          >
            <div className="shine-sweep absolute top-0 bottom-0 w-1/2 -skew-x-12"
              style={{
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)',
                animation: 'cardShine 0.45s ease forwards',
              }}
            />
          </div>
        )}

        {/* Icon */}
        <div
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300"
          style={{
            background: box.accent + '14',
            color: box.accent,
            transform: hov ? 'scale(1.12) rotate(-4deg)' : 'scale(1)',
          }}
        >
          <Icon size={22} strokeWidth={1.8} />
        </div>

        {/* Label — pre-line preserves the \n */}
        <span
          className="relative z-10 text-xs font-bold text-gray-700 leading-snug whitespace-pre-line"
          style={{ color: hov ? box.accent : undefined, transition: 'color 0.2s' }}
        >
          {box.label}
        </span>
      </div>
    </div>
  )
}

export default function FeatureBoxes() {
  /* Inject float + shine keyframes once */
  useEffect(() => {
    if (document.getElementById('feature-kf')) return
    const s = document.createElement('style')
    s.id = 'feature-kf'
    s.textContent = `
      @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes floatB{0%,100%{transform:translateY(-5px)}50%{transform:translateY(7px)}}
      @keyframes floatC{0%,100%{transform:translateY(0) rotate(-0.7deg)}50%{transform:translateY(-9px) rotate(0.7deg)}}
      @keyframes floatD{0%,100%{transform:translateY(5px)}50%{transform:translateY(-7px)}}
      @keyframes cardShine{0%{left:-60%}100%{left:130%}}
    `
    document.head.appendChild(s)
    return () => document.getElementById('feature-kf')?.remove()
  }, [])

  return (
    <section className="bg-gray-50 border-y border-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Capabilities</span>
          <h2 className="text-2xl font-black text-gray-900 mt-2">What We Do</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BOXES.map((box, i) => (
            <FeatureCard key={box.id} box={box} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
