import { Trees, Cpu, CloudRain, Building2, Wind, Sprout, MapPin, Droplets } from 'lucide-react'
import { researchAreas, focusAreas, tools } from '../data/research'
import ScrollReveal from '../components/ScrollReveal'

const iconMap = { Trees, Cpu, CloudRain, Building2, Wind, Sprout, MapPin, Droplets }

function ResearchCard({ area, index }) {
  const Icon = iconMap[area.icon] || MapPin
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden">
        <div className="h-1 w-full" style={{ background: area.accent }} />
        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <span className="text-4xl font-black text-gray-100 tabular-nums">{area.num}</span>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: area.accent + '18', color: area.accent }}>
              <Icon size={20} strokeWidth={2} />
            </div>
          </div>
          <h3 className="font-black text-gray-900 text-lg leading-snug group-hover:text-forest-800 transition-colors">
            {area.title}
          </h3>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">{area.desc}</p>
        </div>
      </div>
    </ScrollReveal>
  )
}

/* Reusable page header */
function PageHeader({ label, title, subtitle }) {
  return (
    <section className="bg-forest-950 pt-[12rem] md:pt-[16rem] pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs text-forest-400 font-bold uppercase tracking-widest">{label}</span>
        <h1 className="text-5xl md:text-6xl font-black text-white mt-3 leading-tight">{title}</h1>
        {subtitle && <p className="text-forest-300 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  )
}

export { PageHeader }

export default function Research() {
  return (
    <div>
      <PageHeader
        label="GSAL Research"
        title="Our Research"
        subtitle="Geospatial science with emphasis on GIS and satellite remote sensing for addressing environmental and urban challenges."
      />

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Research Focus</span>
            <h2 className="text-3xl font-black text-gray-900 mt-3 leading-tight">
              Multi-scale Geospatial Science
            </h2>
            <p className="text-gray-500 mt-5 leading-relaxed text-sm">
              Our research focuses on geospatial science, with a strong emphasis on GIS and satellite
              remote sensing for addressing environmental and urban challenges. We work on satellite
              image analysis, land cover change detection, and spatial modeling using GeoAI and
              multi-source Earth observation data to study landscape dynamics and support spatial
              decision-making.
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed text-sm">
              Increasingly, we integrate machine learning and cloud-based geospatial analytics to
              scale these efforts — enabling applications in forestry, climate resilience, sustainable
              resource management, and data-driven urban planning.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Key Focus Areas</span>
            <ul className="mt-4 space-y-2.5">
              {focusAreas.map((area, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-forest-50 border border-forest-200 text-forest-700 text-[10px] font-black flex items-center justify-center mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Research cards */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Eight Domains</span>
            <h2 className="text-4xl font-black text-gray-900 mt-3">Research Areas</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {researchAreas.map((area, i) => (
              <ResearchCard key={area.id} area={area} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <ScrollReveal className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Technology</span>
          <h2 className="text-3xl font-black text-gray-900 mt-3">Tools & Platforms</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2.5">
            {tools.map(tool => (
              <span key={tool}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-forest-400 hover:text-forest-700 transition-colors cursor-default">
                {tool}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
