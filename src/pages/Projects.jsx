import { ExternalLink, Database } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

const projects = [
  {
    title: 'GeoDROP',
    tagline: 'Open Geospatial Data Repository for Pakistan',
    desc: 'GeoDROP is a centralized web platform providing free and open access to geospatial datasets for Pakistan. It brings spatial data together in one place to support research, mapping, and analysis across the geospatial community.',
    type: 'Web Application',
    accent: '#2d9462',
    icon: Database,
    url: 'https://geoscapeanalyticslab.github.io/GeoDROP/',
  },
  // Add a new project below as another { ... } block
]

function ProjectCard({ project, index }) {
  const Icon = project.icon
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full">
        {/* Header strip */}
        <div className="h-40 relative flex items-center justify-center overflow-hidden"
          style={{ background: project.accent + '1a' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300"
            style={{ background: project.accent + '22', color: project.accent }}>
            <Icon size={30} strokeWidth={1.5} />
          </div>
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90"
            style={{ color: project.accent }}>
            {project.type}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-black text-gray-900 text-lg leading-snug">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-forest-700 transition-colors">
              {project.title}
            </a>
          </h3>
          <p className="text-forest-700 text-sm font-semibold mt-1">{project.tagline}</p>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed flex-1">{project.desc}</p>
          
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all hover:opacity-90"
            style={{ background: project.accent, color: '#fff' }}
          >
            Visit Site <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <div>
      <PageHeader
        label=""
        title="Projects"
        subtitle="Applied geospatial tools, platforms, and web applications built at GSAL."
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-bold uppercase tracking-widest text-forest-600">Web Applications</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </section>
    </div>
  )
}