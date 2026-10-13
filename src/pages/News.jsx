import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { news } from '../data/news'
import Gallery from '../components/Gallery'
import ScrollReveal from '../components/ScrollReveal'
import { LinkedInIcon } from '../components/SocialIcons'
import { PageHeader } from './Research'

const inter = { fontFamily: "'Inter', 'Segoe UI', sans-serif" }
const ACCENT = '#2d9462'

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

function NewsCard({ item, onZoom }) {
  const date = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <article
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={inter}
    >
      {/* Top media: the poster image, natural height, never cropped */}
      {item.image && (
        <button
          type="button"
          onClick={() => onZoom(item)}
          aria-label={`Zoom image: ${item.title}`}
          className="block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-300/70"
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            onError={e => { e.currentTarget.closest('button').style.display = 'none' }}
          />
        </button>
      )}

      {/* Content: brand colour fading into dark charcoal, same as Projects cards */}
      <div
        className="relative flex flex-col gap-2 p-5"
        style={{ background: `linear-gradient(180deg, ${ACCENT} 0%, #3a4047 58%, #1b1e22 100%)` }}
      >
        <span className="text-white/60" style={{ fontSize: '0.72rem' }}>{date}</span>

        <h3 className="font-bold text-white" style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>
          {item.title}
        </h3>

        <p className="line-clamp-3 text-white/80" style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>
          {item.excerpt}
        </p>

        {item.hashtags && (
          <p className="text-white/55" style={{ fontSize: '0.72rem', lineHeight: 1.5 }}>
            {item.hashtags}
          </p>
        )}

        {item.linkedin && (
          <div className="mt-1 flex items-center gap-2">
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View post on LinkedIn"
              title="View post on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
            >
              <LinkedInIcon size={14} />
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default function News() {
  const items = [...news].sort((a, b) => new Date(b.date) - new Date(a.date))
  const [zoom, setZoom] = useState(null)

  return (
    <div>
      <PageHeader
        label=""
        title="News"
        subtitle="Announcements, projects, and updates from GeoScape Analytics Lab."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No news yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 justify-center gap-[24px] min-[760px]:max-[1099px]:grid-cols-[repeat(2,340px)] min-[1100px]:grid-cols-[repeat(3,340px)]">
            {items.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.08} className="mx-auto w-full max-w-[340px]">
                <NewsCard item={item} onZoom={setZoom} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Photo gallery (Seminars, Presentations, Lab Visits) */}
      <Gallery />

      <NewsImageLightbox item={zoom} onClose={() => setZoom(null)} />
    </div>
  )
}
