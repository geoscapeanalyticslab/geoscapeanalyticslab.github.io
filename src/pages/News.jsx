import Gallery from '../components/Gallery'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

export default function News() {
  return (
    <div>
      <PageHeader
        label=""
        title="News"
        subtitle="Announcements, projects, and updates from GeoScape Analytics Lab."
      />

      {/* Coming soon placeholder */}
      <section className="max-w-3xl mx-auto px-6 py-28 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Coming Soon</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Content Will Be Uploaded Soon</h2>
          <p className="text-gray-500 mt-5 max-w-lg mx-auto leading-relaxed">
            News, seminars, presentations, and lab activities will be posted here soon. Check back shortly.
          </p>
        </ScrollReveal>
      </section>

      {/* Photo gallery (Seminars, Presentations, Lab Visits) */}
      <Gallery />
    </div>
  )
}