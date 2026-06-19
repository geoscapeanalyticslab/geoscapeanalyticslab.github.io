import { gallery } from '../data/gallery'
import ScrollReveal from './ScrollReveal'

export default function Gallery() {
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

            <div className="grid grid-cols-1 gap-8">
              {sec.items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.07} className="h-full">
                  <figure className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="w-full bg-forest-950 overflow-hidden">
                      <img src={item.image} alt={item.caption}
                        className="w-full h-auto object-cover"
                        onError={e => { e.currentTarget.parentElement.style.display = 'none' }} />
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
    </div>
  )
}