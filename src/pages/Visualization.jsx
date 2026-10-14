import { useCallback, useEffect, useRef, useState } from 'react'
import { ExternalLink, Globe2, Map, BarChart3, Layers, Maximize2, Minimize2, Play, ChevronLeft, ChevronRight, X } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { LinkedInIcon, FacebookIcon } from '../components/SocialIcons'

const SOCIAL_ICONS = { linkedin: LinkedInIcon, facebook: FacebookIcon }

// Every video block on this page. Layout is rendered by <VideoBlock> so each entry
// is guaranteed to have exactly the same structure.
const VIDEO_BLOCKS = [
  {
    label: 'Satellite Gravimetry',
    title: 'Terrestrial Water Storage Anomaly over Asia',
    description:
      'Annual mean estimates of how much water is stored on and beneath Asia\u2019s land surface, measured from space since 2002 using GRACE and GRACE-FO satellite gravimetry.',
    links: [
      { network: 'linkedin', label: 'LinkedIn', href: 'https://tinyurl.com/asia-water-storage-grace' },
    ],
    file: 'GRACE_Viz.mp4',
    alt: 'GRACE and GRACE-FO terrestrial water storage anomaly over Asia',
  },
  {
    label: 'Climate Anomaly',
    title: 'Daily Temperature Anomaly over South Asia, June 2026',
    description:
      'Temperature anomaly for every day of June 2026 across South Asia. Each day\u2019s temperature is compared with its 1991\u20132020 normal. Warm areas rise and turn red, cool areas sink and turn blue.',
    links: [
      { network: 'linkedin', label: 'LinkedIn', href: 'https://tinyurl.com/south-asia-june-temp-2026' },
    ],
    file: 'south_asia_temp.mp4',
    alt: 'Daily temperature anomaly across South Asia for every day of June 2026 against its 1991 to 2020 normal',
  },
  {
    label: 'Climate Change',
    title: 'How Temperature Moves across Pakistan, 2000\u20132025',
    description:
      'Year-by-year visualization of how temperature moves across Pakistan from 2000 to 2025, showing shifting warm and cool zones over time.',
    links: [
      { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7515815842865967104' },
    ],
    file: 'pakistan_year_titled.mp4',
    alt: 'Year-by-year temperature movement across Pakistan from 2000 to 2025',
  },
  {
    label: 'Biodiversity',
    title: 'Migratory Birds',
    description:
      'Animation showing the seasonal movement of migratory birds, tracking how their range shifts over the year.',
    links: [],
    file: 'Migratory_Birds.mp4',
    alt: 'Animation of migratory bird movement over the year',
  },
]

// Static map images. Only the visual is shown — no credit/source lines.
const MAPS = [
  { title: 'Pakistan Solar Radiation', src: '/Pak_solar_radiation.jpeg' },
  { title: 'Pakistan Temperature and Evapotranspiration', src: '/pak_temp_ev.jpeg' },
  { title: 'Pakistan Temperature and Precipitation', src: '/pak_temp_preci.jpeg' },
  { title: 'Pakistan Vapor Pressure Deficit', src: '/pak_vapor_pressure_defi.jpeg' },
]

// Shared LinkedIn post for the static maps carousel.
const MAPS_LINK = 'https://www.linkedin.com/feed/update/urn:li:activity:7511023130639826944'

const VIZ = [
  {
    icon: Globe2,
    title: 'Forest Cover Change — Pakistan',
    desc: 'Google Earth Engine app showing forest fragmentation over 20 years using Sentinel-2 NDVI time series.',
    type: 'GEE App',
    accent: '#2d9462',
    url: null,
  },
  {
    icon: Map,
    title: 'Urban Heat Islands — Lahore',
    desc: 'Interactive map of land surface temperature dynamics in Lahore from 2000–2024 using Landsat data.',
    type: 'Web Map',
    accent: '#6b5c45',
    url: null,
  },
  {
    icon: Layers,
    title: 'Flood Susceptibility — Indus Basin',
    desc: 'Multi-criteria flood hazard assessment map using DEM, slope, and land cover classification.',
    type: 'Static Map',
    accent: '#2a6080',
    url: null,
  },
  {
    icon: BarChart3,
    title: 'Land Cover Classification Dashboard',
    desc: 'Time-series analysis of land use / land cover change across Punjab using Random Forest and GEE.',
    type: 'Dashboard',
    accent: '#1b5c3b',
    url: null,
  },
]

// ── Stacked-card carousel ────────────────────────────────────────────────────

// Disable slide/scale animations when the user asks for reduced motion.
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

// Round teal control used beside the deck and inside the lightbox.
function ArrowButton({ direction, onClick, className = '' }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={`inline-flex items-center justify-center w-11 h-11 rounded-full border border-forest-300 bg-forest-300 text-forest-950 shadow-lg transition-all duration-200 motion-reduce:transition-none hover:bg-forest-100 hover:border-forest-100 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-300/70 ${className}`}
    >
      <Icon size={22} strokeWidth={2.5} />
    </button>
  )
}

// One reusable carousel. Cards form a "coverflow": the front card sits centred
// at full size while the neighbours fan out to either side, scaled down and
// rotated. Cards are small by default and grow when the front one is clicked.
// Loops, and supports arrows, dots, keyboard and swipe.
function StackCarousel({ items, ariaLabel, renderItem }) {
  const count = items.length
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [stageH, setStageH] = useState(0)
  const reduced = usePrefersReducedMotion()
  const drag = useRef({ x: 0, y: 0, ok: false })
  const stageRef = useRef(null)
  const activeCardRef = useRef(null)
  const hovered = useRef(false)

  const goTo = i => { setExpanded(false); setActive(((i % count) + count) % count) }
  const step = dir => { setExpanded(false); setActive(prev => (prev + dir + count) % count) }

  // Keep the stage as tall as the front card, so the fanned-out cards never
  // change the page height. Re-measures whenever the slide or size changes.
  useEffect(() => {
    const el = activeCardRef.current
    if (!el) return
    const update = () => setStageH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [active, expanded])

  // Collapse the enlarged card when clicking away or pressing Escape.
  useEffect(() => {
    if (!expanded) return
    const onDown = e => { if (!stageRef.current?.contains(e.target)) setExpanded(false) }
    const onKey = e => { if (e.key === 'Escape') setExpanded(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  // Left/right arrow keys move the deck. Scoped to this carousel while it is
  // hovered or focused, so it never fights the page scroll or the other deck.
  useEffect(() => {
    const onKey = e => {
      const t = e.target
      if (t && t.closest && t.closest('video, input, textarea, select, a, [contenteditable]')) return
      const focused = stageRef.current?.contains(document.activeElement)
      if (!hovered.current && !focused) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); setExpanded(false); setActive(p => (p - 1 + count) % count) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); setExpanded(false); setActive(p => (p + 1) % count) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [count])

  // Swipe, but never swallow drags on the seek bar / video / links.
  const onTouchStart = e => {
    const t = e.changedTouches[0]
    drag.current = { x: t.clientX, y: t.clientY, ok: !e.target.closest('input, video, a, [role="slider"]') }
  }
  const onTouchEnd = e => {
    if (!drag.current.ok) return
    const t = e.changedTouches[0]
    const dx = t.clientX - drag.current.x
    const dy = t.clientY - drag.current.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
  }

  // Signed distance from the front card (0, ±1, ±2, ...).
  const signed = i => {
    let d = (i - active + count) % count
    if (d > count / 2) d -= count
    return d
  }

  // Coverflow placement: the front card is centred; the rest fan out to the
  // sides, shrink and rotate to face the centre.
  const cardStyle = d => {
    const abs = Math.abs(d)
    let tx = 0, scale = 1, rot = 0, opacity = 1, z = 30, hidden = false
    if (abs === 1) {
      tx = expanded ? 0.66 : 0.62
      scale = expanded ? 0.86 : 0.8
      rot = 12
      opacity = expanded ? 0.35 : 0.42
      z = 20
    } else if (abs === 2) {
      tx = expanded ? 1.04 : 0.98
      scale = 0.72
      rot = 18
      opacity = 0.12
      z = 10
    } else if (abs > 2) {
      hidden = true
      opacity = 0
      z = 0
    }
    const sign = d > 0 ? 1 : -1
    const x = tx * sign
    const transform = hidden
      ? `translateX(-50%) translateX(calc(var(--cw) * ${(1.25 * sign).toFixed(2)})) scale(0.6)`
      : `translateX(-50%) translateX(calc(var(--cw) * ${x.toFixed(2)})) scale(${scale}) rotateY(${(-sign * rot)}deg)`
    return {
      transform,
      opacity,
      zIndex: z,
      pointerEvents: abs === 0 ? 'auto' : 'none',
      transition: reduced ? 'none' : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease-in-out',
      willChange: 'transform, opacity',
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative mx-auto w-full max-w-6xl rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-forest-300/60"
    >
      <div className="relative">
        {/* Stage — holds the fanned cards. Height tracks the front card. */}
        <div
          ref={stageRef}
          className="relative w-full"
          style={{
            perspective: '1400px',
            height: stageH ? `${stageH}px` : undefined,
            transition: reduced ? 'none' : 'height 450ms cubic-bezier(0.22, 1, 0.36, 1)',
            '--cw': expanded ? 'min(760px, 88vw)' : 'min(400px, 80vw)',
          }}
        >
          {items.map((item, i) => {
            const d = signed(i)
            const isFront = d === 0
            const hidden = Math.abs(d) > 2
            return (
              <div
                key={i}
                ref={isFront ? activeCardRef : null}
                aria-hidden={!isFront}
                inert={isFront ? undefined : true}
                className="absolute left-1/2 top-0"
                style={{ width: 'var(--cw)', visibility: hidden ? 'hidden' : undefined, ...cardStyle(d) }}
              >
                {renderItem(item, i, { isActive: isFront, expanded })}

                {/* Front card: enlarge while collapsed, shrink while enlarged. */}
                {isFront && !expanded && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label="Enlarge"
                    className="absolute inset-0 z-40 cursor-zoom-in rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-300/80"
                  />
                )}
                {isFront && expanded && (
                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    aria-label="Shrink"
                    className="absolute right-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white hover:text-forest-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Minimize2 size={18} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Side arrows (desktop / tablet) */}
        <ArrowButton direction="prev" onClick={() => step(-1)} className="hidden sm:inline-flex absolute left-1 top-1/2 -translate-y-1/2 z-40" />
        <ArrowButton direction="next" onClick={() => step(1)} className="hidden sm:inline-flex absolute right-1 top-1/2 -translate-y-1/2 z-40" />
      </div>

      {/* Indicator + mobile arrows */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <ArrowButton direction="prev" onClick={() => step(-1)} className="sm:hidden" />
        <div className="flex items-center gap-2">
          {items.map((_, i) => {
            const isActive = i === active
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-[400ms] ease-in-out motion-reduce:transition-none ${
                  isActive ? 'h-8 w-8' : 'h-3 w-3 bg-forest-300/40 hover:bg-forest-300/70'
                }`}
                style={
                  isActive
                    ? {
                        background: 'var(--num-bg)',
                        boxShadow: '0 0 0 4px rgba(245, 184, 65, 0.25), 0 4px 14px rgba(0, 0, 0, 0.35)',
                      }
                    : undefined
                }
              >
                <span
                  style={{
                    opacity: isActive ? 1 : 0,
                    color: 'var(--num-text)',
                    fontWeight: 700,
                    transition: 'opacity 400ms ease-in-out',
                  }}
                  className="block text-[12px] leading-none tabular-nums"
                >
                  {i + 1}
                </span>
              </button>
            )
          })}
        </div>
        <ArrowButton direction="next" onClick={() => step(1)} className="sm:hidden" />
      </div>
    </div>
  )
}

// Fullscreen map viewer with its own arrows, keyboard support and scroll lock.
function MapLightbox({ items, index, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (index === null) return
    dialogRef.current?.focus()
    const onKey = e => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); onPrev() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); onNext() }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [index, onClose, onPrev, onNext])

  if (index === null) return null
  const item = items[index]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-8 outline-none"
    >
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Close full screen"
        className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-forest-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X size={22} strokeWidth={2.5} />
      </button>

      <ArrowButton direction="prev" onClick={e => { e.stopPropagation(); onPrev() }} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10" />
      <ArrowButton direction="next" onClick={e => { e.stopPropagation(); onNext() }} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10" />

      <figure className="flex max-h-full max-w-full flex-col items-center" onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.title} className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl" />
        <figcaption className="mt-4 text-center">
          <span className="block text-base font-black text-white">{item.title}</span>
          <span className="mt-1 block text-xs font-semibold text-forest-200">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
    </div>
  )
}

function VizCard({ item, index }) {
  const Icon = item.icon
  return (
    <ScrollReveal delay={index * 0.07}>
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full">
        {/* Header strip */}
        <div className="h-40 relative flex items-center justify-center overflow-hidden"
          style={{ background: item.accent + '1a' }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300"
            style={{ background: item.accent + '22', color: item.accent }}>
            <Icon size={26} strokeWidth={1.5} />
          </div>
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90"
            style={{ color: item.accent }}>
            {item.type}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-black text-gray-900 text-sm leading-snug">{item.title}</h3>
          <p className="text-gray-400 text-xs mt-2 leading-relaxed flex-1">{item.desc}</p>
          <button
            className="mt-4 w-full py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all group/btn"
            style={{ borderColor: item.accent, color: item.accent }}
            onMouseEnter={e => { e.currentTarget.style.background = item.accent; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = item.accent }}
          >
            <ExternalLink size={12} /> View Visualization
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}

function VideoBlock({ title, links, file, alt, isActive = true, expanded = false }) {
  const videoRef = useRef(null)
  const src = `/videos/${file}`
  const poster = `/videos/${file.replace(/\.[^.]+$/, '')}_poster.jpg`
  const controllable = isActive && expanded

  // Only the enlarged front card plays. Pause and rewind everything else.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (controllable) return
    video.pause()
    try { video.currentTime = 0 } catch { /* seeking may be blocked before metadata */ }
  }, [controllable])

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      {/* Fixed 16:9 media box in every card, whatever the video's own
          orientation. The poster is blurred and zoomed to fill the box while
          the video is letterboxed on top with object-contain (no bleeding). */}
      <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: '16 / 9' }}>
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: 'scale(1.25)', filter: 'blur(20px) brightness(0.45)' }}
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          controls={controllable}
          aria-label={alt}
        >
          Your browser does not support embedded video.{' '}
          <a href={src} download>Download the video</a>
        </video>

        {!controllable && (
          <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
              <Play size={26} strokeWidth={2} fill="currentColor" className="ml-1" />
            </span>
          </div>
        )}
      </div>

      {/* Text block — title only, shown on the front card. The fixed title
          area and the reserved link row keep every card the same height, so
          the deck never shifts up/down while navigating. */}
      <div className={`flex flex-1 flex-col gap-2 p-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="min-h-[2.7em] line-clamp-2 text-[15px] font-black text-white leading-snug">{title}</h2>
        <div className="relative z-50 mt-auto flex min-h-[2.5rem] flex-wrap items-center justify-end gap-2 pt-1">
          {(links || []).map(link => {
            const Icon = SOCIAL_ICONS[link.network]
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${link.label} post`}
                aria-label={`${link.label} post`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-forest-100 transition-colors hover:bg-white/15 hover:text-white"
              >
                {Icon && <Icon size={16} />}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MapCard({ item, link, isActive, expanded, onOpen }) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="relative">
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover"
        />

        {/* Fullscreen opens the lightbox, available only once enlarged. */}
        {isActive && expanded && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open ${item.title} in full screen`}
            className="absolute right-3 bottom-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white hover:text-forest-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Maximize2 size={18} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <figcaption className={`flex items-center justify-between gap-3 px-4 py-2.5 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <span className="block min-h-[2.7em] line-clamp-2 text-[13px] font-black leading-snug text-white">{item.title}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn post"
            aria-label="LinkedIn post"
            className="relative z-50 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-forest-100 transition-colors hover:bg-white/15 hover:text-white"
          >
            <LinkedInIcon size={16} />
          </a>
        )}
      </figcaption>
    </figure>
  )
}

export default function Visualization() {
  // Index of the map shown in the fullscreen lightbox (null = closed).
  const [lightbox, setLightbox] = useState(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevLightbox = useCallback(() => setLightbox(i => (i === null ? i : (i - 1 + MAPS.length) % MAPS.length)), [])
  const nextLightbox = useCallback(() => setLightbox(i => (i === null ? i : (i + 1) % MAPS.length)), [])

  return (
    <div className="pt-16">
      {/* Compact page header (page-local, so the shared PageHeader used by
          other pages is left untouched). Reduced padding + smaller type. */}
      <section className="bg-forest-950 pt-4 md:pt-6 pb-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Visualizations</h1>
          <p className="text-forest-300 mt-3 text-base max-w-2xl mx-auto leading-relaxed">
            Interactive maps, GEE apps, and geospatial dashboards from GSAL research outputs.
          </p>
        </div>
      </section>

      {/* ── Visualizations hidden for now — will be added soon. Code kept below for later. ──
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VIZ.map((item, i) => <VizCard key={item.title} item={item} index={i} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <ScrollReveal>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Live App</span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">Embed a GEE Application</h2>
              </div>
            </div>
            <div className="rounded-xl border-2 border-dashed border-gray-200 h-96 flex flex-col items-center justify-center bg-white text-gray-400 gap-3">
              <Globe2 size={36} className="text-gray-200" />
              <p className="text-sm font-semibold text-gray-400">GEE App Placeholder</p>
              <p className="text-xs text-gray-300">Drop your published app src here</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
      */}

      {/* ── Stacked card carousels: videos (A) and static maps (B) ── */}
      <section className="bg-forest-950 pt-6 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Carousel A — videos. Each card keeps its own title, tag,
              description, source and links. Only the front card is live. */}
          <ScrollReveal>
            <StackCarousel
              items={VIDEO_BLOCKS}
              ariaLabel="Video visualizations"
              renderItem={(item, i, { isActive, expanded }) => (
                <VideoBlock {...item} isActive={isActive} expanded={expanded} />
              )}
            />
          </ScrollReveal>

          {/* Carousel B — static maps, opened fullscreen on click. */}
          <div className="mt-16">
            <div className="text-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-forest-300">Static Maps</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Maps</h2>
            </div>
            <ScrollReveal>
              <StackCarousel
                items={MAPS}
                ariaLabel="Map visualizations"
                renderItem={(item, i, { isActive, expanded }) => (
                  <MapCard item={item} link={MAPS_LINK} isActive={isActive} expanded={expanded} onOpen={() => setLightbox(i)} />
                )}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <MapLightbox
        items={MAPS}
        index={lightbox}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />
    </div>
  )
}