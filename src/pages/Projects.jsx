import { ExternalLink } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

const projects = [
  {
    title: 'GeoDROP',
    description: 'Open geospatial datasets for Pakistan — glaciers, floods, forests, soils.',
    accent: '#2d9462',
    logo: '/GeoDROP-Logo_Transparent.png',
    url: 'https://geoscapeanalyticslab.github.io/GeoDROP/',
    social: [
      { network: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/p/1DdSsQ3Zm1/' },
      { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7511782047003246593/' },
      { network: 'x', label: 'X', href: 'https://x.com/Adeal_GIS/status/2106046978820079949?s=20' },
    ],
  },
  {
    title: 'GRIPS',
    description: 'Free literature search for Pakistan-focused GIS and remote sensing research.',
    accent: '#2d9462',
    logo: '/GRIPS-Logo.png',
    url: 'https://grips-gsal.netlify.app/',
    social: [
      { network: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/p/19KCNE8UJK/' },
      { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7505969054780764160/' },
    ],
  },
]

const LinkedInIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FacebookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const SOCIAL_ICONS = { linkedin: LinkedInIcon, facebook: FacebookIcon, x: XIcon }

const inter = { fontFamily: "'Inter', 'Segoe UI', sans-serif" }

function ProjectCard({ project, index }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={inter}
      >

        {/* Top: logo on a light tint of the brand colour */}
        <div
          className="relative flex h-[190px] items-center justify-center px-6"
          style={{ background: project.accent + '1a' }}
        >
          <img
            src={project.logo}
            alt={`${project.title} logo`}
            className="max-h-[120px] max-w-[80%] object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Lower half: brand colour fading into dark charcoal so white text stays readable */}
        <div
          className="relative flex flex-1 flex-col gap-3 p-5"
          style={{ background: `linear-gradient(180deg, ${project.accent} 0%, #3a4047 58%, #1b1e22 100%)` }}
        >
          <h3 className="font-bold text-white" style={{ fontSize: '1.15rem', lineHeight: 1.3 }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-90">
              {project.title}
            </a>
          </h3>

          <p className="line-clamp-3 text-white/80" style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>
            {project.description}
          </p>

          {project.social?.length > 0 && (
            <div className="flex items-center gap-2">
              {project.social.map(link => {
                const Icon = SOCIAL_ICONS[link.network]
                return Icon ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                    title={`${project.title} on ${link.label}`} aria-label={`${project.title} on ${link.label}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white hover:text-slate-900">
                    <Icon size={14} />
                  </a>
                ) : null
              })}
            </div>
          )}

          <a href={project.url} target="_blank" rel="noopener noreferrer"
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 font-bold text-slate-900 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100"
            style={{ fontSize: '0.875rem' }}>
            Visit Site <ExternalLink size={14} strokeWidth={2.5} />
          </a>
        </div>
      </article>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <div className="bg-[#f5f5f4]">
      <PageHeader
        label=""
        title="Projects"
        subtitle="Applied geospatial tools, platforms, and web applications built at GSAL."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center gap-4">
          <h2
            className="font-bold uppercase tracking-[0.18em]"
            style={{ color: '#0f766e', fontSize: '0.85rem', fontFamily: "'Times New Roman', Times, serif" }}
          >
            Our Work
          </h2>
          <span className="h-px flex-1 bg-teal-700/25" />
        </div>

        <div className="grid grid-cols-1 items-stretch gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </section>
    </div>
  )
}