import { useState, useEffect } from 'react'
import { gallery } from '../data/gallery'
import ScrollReveal from './ScrollReveal'

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  // Escape key se band karne ke liye
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!gallery.length) return null

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      {gallery.map((sec) =>
        sec.items.length > 0 ? (
          <section key={sec.section}>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">{sec.section}</h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sec.items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.07} className="h-full">
                  <figure className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div
                      onClick={() => setSelected(item)}
                      className="h-52 bg-forest-950 overflow-hidden cursor-pointer"
                    >
                      <img src={item.image} alt={item.caption}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={e => { e.currentTarget.closest('figure').style.display = 'none' }} />
                    </div>
                    {item.caption && (
                      <figcaption className="p-4 text-sm text-gray-700 font-medium leading-snug">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </section>
        ) : null
      )}

      {/* Fullscreen lightbox — image click par khulta hai */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute top-5 right-6 text-white/80 hover:text-white text-4xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={selected.image}
            alt={selected.caption}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          {selected.caption && (
            <p className="mt-4 text-white/90 text-sm text-center max-w-2xl">{selected.caption}</p>
          )}
        </div>
      )}
    </div>
  )
}