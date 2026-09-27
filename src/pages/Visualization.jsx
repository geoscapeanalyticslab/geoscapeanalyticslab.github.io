import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Globe2, Map, BarChart3, Layers, Maximize2, Minimize2, Play, Pause, Volume2, VolumeX, Download } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

const formatTime = seconds => {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

// lucide-react v1 no longer ships brand marks, so the social logos are inlined.
const LinkedInIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FacebookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

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
]

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

function VideoBlock({ label, title, description, source, links, file, alt }) {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const src = `/videos/${file}`
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const onLoadedMetadata = e => {
    const video = e.currentTarget
    setDuration(Number.isFinite(video.duration) ? video.duration : 0)
    setHasAudio(video.mozHasAudio || Boolean(video.webkitAudioDecodedByteCount) || (video.audioTracks ? video.audioTracks.length > 0 : true))
  }

  const onTimeUpdate = e => setCurrentTime(e.currentTarget.currentTime)

  const onVolumeChange = e => setIsMuted(e.currentTarget.muted)

  const onSeek = e => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (videoRef.current) videoRef.current.currentTime = time
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      playerRef.current?.requestFullscreen?.().catch(() => {})
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div
        ref={playerRef}
        className="relative w-full bg-black aspect-video cursor-pointer group/player [&:fullscreen]:w-[min(92vw,1000px)] [&:fullscreen]:h-[calc(min(92vw,1000px)*0.5625)] [&:fullscreen]:max-h-[85vh] [&:fullscreen]:m-auto [&:fullscreen]:rounded-2xl [&:fullscreen]:shadow-2xl [&:fullscreen]:bg-black [&::backdrop]:bg-forest-950"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={src}
          playsInline
          preload="metadata"
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onVolumeChange={onVolumeChange}
          aria-label={alt}
        >
          Your browser does not support embedded video.{' '}
          <a href={src} download>Download the video</a>
        </video>

            {!isPlaying && (
              <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/45 text-white backdrop-blur-sm">
                  <Play size={26} strokeWidth={2} fill="currentColor" className="ml-1" />
                </span>
              </div>
            )}

            {/* Controls — clicks here must not toggle playback */}
            <div
              onClick={e => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 px-3 pb-2.5 pt-6 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover/player:opacity-100 focus-within:opacity-100 transition-opacity"
            >
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.05}
                value={currentTime}
                disabled={!duration}
                onChange={onSeek}
                aria-label="Seek"
                className="w-full h-1.5 cursor-pointer disabled:cursor-default"
                style={{ accentColor: '#58ccbf' }}
              />

              <div className="flex items-center gap-2 text-white">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isPlaying
                    ? <Pause size={17} strokeWidth={2} fill="currentColor" />
                    : <Play size={17} strokeWidth={2} fill="currentColor" className="ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isMuted || !hasAudio
                    ? <VolumeX size={17} strokeWidth={2} />
                    : <Volume2 size={17} strokeWidth={2} />}
                </button>

                <span className="text-[11px] font-semibold tabular-nums text-white/85">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <div className="flex-1" />

                <a
                  href={src}
                  download
                  aria-label="Download video"
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Download size={16} strokeWidth={2} />
                </a>

                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit full screen' : 'Play full screen'}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isFullscreen
                    ? <Minimize2 size={16} strokeWidth={2} />
                    : <Maximize2 size={16} strokeWidth={2} />}
                </button>
              </div>
            </div>
          </div>

      {/* Text block */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <span className="text-[11px] font-black uppercase tracking-widest text-forest-300">{label}</span>
        <h2 className="text-lg font-black text-white leading-snug">{title}</h2>
        <p className="text-[13px] text-forest-200/85 leading-relaxed">{description}</p>
        {source && (
          <p className="text-[11px] text-forest-300/60 leading-relaxed">{source}</p>
        )}
        {links?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 mt-auto">
            {links.map(link => {
              const Icon = SOCIAL_ICONS[link.network]
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${link.label} post`}
                  aria-label={`${link.label} post`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-forest-100 transition-colors hover:bg-white/15 hover:text-white"
                >
                  {Icon && <Icon size={14} />}
                  {link.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Visualization() {
  return (
    <div className="pt-16">
      <PageHeader
        label=""
        title="Visualizations"
        subtitle="Interactive maps, GEE apps, and geospatial dashboards from GSAL research outputs."
      />

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

      {/* ── Video blocks: two per row, identical card layout ── */}
      <section className="bg-forest-950 py-14">
        {/* Outer div matches the page's standard content container so the cards
            line up with the left edge of everything else on the site.
            Inner grid is px-capped (not rem) on purpose: the site's root
            font-size scales up to 22px on 4K, which would balloon a rem-based
            container and make the video box huge. Left-aligned, not centered,
            so the space sits on the right instead of both sides. */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6 max-w-[960px]">
            {VIDEO_BLOCKS.map((v, i) => (
              <ScrollReveal key={v.file} delay={i * 0.08}>
                <VideoBlock {...v} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}