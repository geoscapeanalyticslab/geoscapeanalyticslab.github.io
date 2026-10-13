import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { news } from '../data/news'
import Gallery from '../components/Gallery'
import ScrollReveal from '../components/ScrollReveal'
import { LinkedInIcon } from '../components/SocialIcons'
import { PageHeader } from './Research'

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

      <section className="max-w-7xl mx-auto px-6 py-20">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No news yet. Check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const date = new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
              })
              return (
                <ScrollReveal key={item.id} delay={i * 0.08} className="h-full">
                  <article className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {item.image && (
                      <button
                        type="button"
                        onClick={() => setZoom(item)}
                        aria-label={`Zoom image: ${item.title}`}
                        className="group/img block h-48 w-full cursor-zoom-in overflow-hidden bg-forest-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-300/70"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain transition-transform duration-500 motion-reduce:transition-none group-hover/img:scale-105"
                          onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
                        />
                      </button>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wide text-forest-700 bg-forest-50 px-3 py-1 rounded-full">
                          {item.tag}
                        </span>
                        <span className="text-xs text-gray-400">{date}</span>
                      </div>
                      <h3 className="font-black text-gray-900 text-lg leading-snug">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-3 leading-relaxed flex-1">{item.excerpt}</p>
                      {item.hashtags && (
                        <p className="text-forest-200/80 text-xs mt-3 leading-relaxed">{item.hashtags}</p>
                      )}
                      {item.linkedin && (
                        <div className="mt-4">
                          <a
                            href={item.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View this update on LinkedIn"
                            aria-label="View this update on LinkedIn"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-300/40 text-forest-200 transition-colors hover:bg-forest-300 hover:border-forest-300 hover:text-forest-950"
                          >
                            <LinkedInIcon size={18} />
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </section>

      {/* Photo gallery (Seminars, Presentations, Lab Visits) */}
      <Gallery />

      <NewsImageLightbox item={zoom} onClose={() => setZoom(null)} />
    </div>
  )
}
