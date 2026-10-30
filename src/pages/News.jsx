import { useEffect, useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { news } from '../data/news'
import Gallery from '../components/Gallery'
import ScrollReveal from '../components/ScrollReveal'
import { LinkedInIcon } from '../components/SocialIcons'
import { PageHeader } from './Research'

const inter = { fontFamily: "'Inter', 'Segoe UI', sans-serif" }
const serif = { fontFamily: "'Times New Roman', Times, serif" }
const ACCENT = '#2d9462'

const formatDate = d =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

// Click-to-zoom viewer for a news image.
function NewsImageLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-forest-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X size={22} strokeWidth={2.5} />
      </button>

      <figure className="flex max-h-full max-w-full flex-col items-center" onClick={e => e.stopPropagation()}>
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-base font-black text-white">{item.title}</figcaption>
      </figure>
    </div>
  )
}

// Small uppercase dateline, the thing that makes a page read as news.
function Dateline({ date, kicker }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {kicker && (
        <span
          className="font-bold uppercase tracking-[0.18em]"
          style={{ color: ACCENT, fontSize: '0.68rem' }}
        >
          {kicker}
        </span>
      )}
      {kicker && <span className="h-3 w-px bg-slate-900/20" />}
      <span className="uppercase tracking-[0.14em] text-slate-500" style={{ fontSize: '0.68rem' }}>
        {formatDate(date)}
      </span>
    </div>
  )
}

function LinkedInLink({ href, compact = false }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold text-slate-700 underline-offset-4 transition-colors hover:text-[#2d9462] hover:underline`}
      style={{ fontSize: compact ? '0.78rem' : '0.85rem' }}
    >
      <LinkedInIcon size={compact ? 13 : 15} />
      Read the post
      <ArrowUpRight size={compact ? 13 : 15} strokeWidth={2.5} />
    </a>
  )
}

function NewsImage({ item, onZoom, className, imgClassName }) {
  if (!item.image) return null
  const cover = item.imageFit === 'cover'
  return (
    <button
      type="button"
      onClick={() => onZoom(item)}
      aria-label={`Zoom image: ${item.title}`}
      className={`group/img relative block cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d9462]/60 ${cover ? '' : 'p-5'} ${className}`}
      style={{ background: cover ? '#e9edea' : ACCENT + '14' }}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`transition-transform duration-500 group-hover/img:scale-[1.04] ${cover ? 'h-full w-full object-cover' : 'h-full w-full object-contain'} ${imgClassName || ''}`}
        onError={e => { e.currentTarget.closest('button').style.display = 'none' }}
      />
    </button>
  )
}

// Every item gets the same treatment: a dated row, hairline-separated, no boxes.
function NewsRow({ item, onZoom }) {
  return (
    <article className="flex min-h-[172px] items-center gap-5 py-6 sm:gap-7" style={inter}>
      <NewsImage
        item={item}
        onZoom={onZoom}
        className="h-[100px] w-[112px] shrink-0 rounded-sm sm:h-[124px] sm:w-[176px]"
      />

      <div className="flex min-w-0 flex-col gap-2">
        <Dateline date={item.date} />

        <h3
          className="font-bold text-slate-900"
          style={{ ...serif, fontSize: '1.22rem', lineHeight: 1.3 }}
        >
          {item.title}
        </h3>

        {item.excerpt && (
          <p className="line-clamp-2 text-slate-600" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
            {item.excerpt}
          </p>
        )}

        <LinkedInLink href={item.linkedin} compact />
      </div>
    </article>
  )
}

export default function News() {
  const items = news
  const [zoom, setZoom] = useState(null)

  return (
    <div className="bg-[#faf9f7]">
      <PageHeader
        label=""
        title="News"
        subtitle="Announcements, projects, and updates from GeoScape Analytics Lab."
      />

      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No news yet. Check back soon.</p>
        ) : (
          <>
            <div className="mb-1 flex items-center gap-4">
              <h2
                className="font-bold uppercase tracking-[0.2em] text-slate-500"
                style={{ ...serif, fontSize: '0.78rem' }}
              >
                Latest Updates
              </h2>
              <span className="h-px flex-1 bg-slate-900/15" />
            </div>

            <div className="divide-y divide-slate-900/10 border-b border-slate-900/10">
              {items.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.06}>
                  <NewsRow item={item} onZoom={setZoom} />
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Photo gallery (Seminars, Presentations, Lab Visits) */}
      <Gallery />

      <NewsImageLightbox item={zoom} onClose={() => setZoom(null)} />
    </div>
  )
}
