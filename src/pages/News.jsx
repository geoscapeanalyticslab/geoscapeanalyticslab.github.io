import { news } from '../data/news'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

export default function News() {
  return (
    <div>
      <PageHeader
        label="Latest Updates"
        title="News"
        subtitle="Announcements, projects, and updates from GeoScape Analytics Lab."
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        {news.length === 0 ? (
          <p className="text-center text-gray-500">No news yet. Check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, i) => {
              const date = new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
              })
              return (
                <ScrollReveal key={item.id} delay={i * 0.08} className="h-full">
                  <article className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {item.image && (
                      <div className="h-44 bg-forest-950 overflow-hidden">
                        <img src={item.image} alt={item.title}
                          className="w-full h-full object-cover"
                          onError={e => { e.currentTarget.parentElement.style.display = 'none' }} />
                      </div>
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
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}