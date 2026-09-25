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

export default function Visualization() {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
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
      video.play().catch(() => setIsBuffering(false))
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

      {/* ── GRACE / GRACE-FO visualization video ── */}
      <section className="bg-forest-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

              {/* Text column */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-forest-300">
                  Satellite Gravimetry
                </span>
                <h2 className="text-3xl font-black text-white mt-3 leading-tight">
                  Terrestrial Water Storage Anomaly over Asia
                </h2>
                <p className="text-forest-200 text-sm mt-4 leading-relaxed">
                  Annual mean estimates of how much water is stored on and beneath Asia&rsquo;s land
                  surface, measured from space since 2002 using GRACE and GRACE-FO satellite gravimetry.
                </p>
              </div>

              {/* Video column */}
              <div className="w-full">
                <div
                  ref={playerRef}
                  className="relative w-full rounded-xl overflow-hidden bg-black aspect-video shadow-xl group/player [&:fullscreen]:max-w-none [&:fullscreen]:rounded-none [&:fullscreen]:aspect-auto [&:fullscreen]:bg-black [&:fullscreen]:cursor-default"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    src="/videos/GRACE_Viz.mp4"
                    playsInline
                    preload="metadata"
                    onClick={e => e.stopPropagation()}
                    onLoadStart={() => setIsBuffering(true)}
                    onWaiting={() => setIsBuffering(true)}
                    onStalled={() => setIsBuffering(true)}
                    onSeeking={() => setIsBuffering(true)}
                    onCanPlay={() => setIsBuffering(false)}
                    onPlaying={() => { setIsBuffering(false); setIsPlaying(true) }}
                    onPause={() => { setIsBuffering(false); setIsPlaying(false) }}
                    onSeeked={() => setIsBuffering(false)}
                    onEnded={() => { setIsBuffering(false); setIsPlaying(false) }}
                    onError={() => setIsBuffering(false)}
                    onLoadedMetadata={onLoadedMetadata}
                    onTimeUpdate={onTimeUpdate}
                    onVolumeChange={onVolumeChange}
                    aria-label="GRACE and GRACE-FO terrestrial water storage anomaly over Asia"
                  >
                    Your browser does not support embedded video.{' '}
                    <a href="/videos/GRACE_Viz.mp4" download>Download the video</a>
                  </video>

                  {isBuffering && (
                    <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full border-[3px] border-white/25 border-t-forest-300 border-r-forest-400 animate-spin" />
                    </div>
                  )}

                  {!isPlaying && !isBuffering && (
                    <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
                      <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/45 text-white backdrop-blur-sm">
                        <Play size={26} strokeWidth={2} fill="currentColor" className="ml-1" />
                      </span>
                    </div>
                  )}

                  {/* Controls */}
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
                        href="/videos/GRACE_Viz.mp4"
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
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming soon placeholder */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Coming Soon</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">More Visualizations On the Way</h2>
          <p className="text-gray-500 mt-5 max-w-lg mx-auto leading-relaxed">
            Interactive maps, GEE apps, and geospatial dashboards from our research will be
            published here soon. Check back shortly.
          </p>
        </ScrollReveal>
      </section>
    </div>
  )
}