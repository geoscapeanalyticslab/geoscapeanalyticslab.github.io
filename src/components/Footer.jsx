import { NavLink } from 'react-router-dom'
import { Mail, MapPin, Globe } from 'lucide-react'

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const links = [
  { to: '/',              label: 'Home'          },
  { to: '/research',      label: 'Research'      },
  { to: '/people',        label: 'People'        },
  { to: '/blogs',         label: 'Blogs'         },
  { to: '/visualization', label: 'Visualization' },
  { to: '/news',          label: 'News'          },
  { to: '/contact',       label: 'Contact'       },
]

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-200">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 pb-10 border-b border-forest-800">

          {/* Brand / contact — left */}
          <div className="max-w-md">
            <img src="/gsal_trans_logo1.png" alt="GSAL Logo" className="h-16 w-auto" />
            <p className="mt-5 text-sm text-forest-300 leading-relaxed">
              Advancing research and training in GIS, remote sensing, GeoAI, and spatial
              data analytics. Independent research lab based in Lahore, Pakistan.
            </p>
            <div className="mt-6 space-y-2 text-sm text-forest-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-forest-400" />
                <span>31°29′38.8″N 74°17′55.3″E — Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-forest-400" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=geoscapeanalyticslab@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  geoscapeanalyticslab@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-forest-400" />
                <a href="https://geoscapeanalyticslab.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  geoscapeanalyticslab.github.io
                </a>
              </div>
            </div>

            <a href="https://www.linkedin.com/company/geoscape-analytics-lab-gsal/" target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-forest-300 hover:text-white transition-colors">
              <LinkedInIcon size={16} />
              <span>Follow us on LinkedIn</span>
            </a>
          </div>

          {/* Nav links — right */}
          <div className="md:text-right">
            <ul className="space-y-3">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className="text-sm text-forest-300 hover:text-white transition-colors">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest-500">
          <span>© {new Date().getFullYear()} GeoScape Analytics Lab (GSAL). All rights reserved.</span>
          <span>GeoScape Analytics Lab — Lahore, Pakistan</span>
        </div>
      </div>
    </footer>
  )
}