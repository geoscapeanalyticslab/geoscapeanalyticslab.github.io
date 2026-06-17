import { ExternalLink, Globe2, Map, BarChart3, Layers } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

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

      {/* Coming soon placeholder */}
      <section className="max-w-3xl mx-auto px-6 py-28 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Coming Soon</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Visualizations On the Way</h2>
          <p className="text-gray-500 mt-5 max-w-lg mx-auto leading-relaxed">
            Interactive maps, GEE apps, and geospatial dashboards from our research will be
            published here soon. Check back shortly.
          </p>
        </ScrollReveal>
      </section>
    </div>
  )
}