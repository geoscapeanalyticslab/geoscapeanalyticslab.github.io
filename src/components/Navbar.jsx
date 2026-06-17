import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',             label: 'Home'          },
  { to: '/research',     label: 'Research'      },
  { to: '/people',       label: 'People'        },
  { to: '/blogs',        label: 'Blogs'         },
  { to: '/visualization',label: 'Visualizations' },
  { to: '/contact',      label: 'Contact'       },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname }    = useLocation()

  useEffect(() => setOpen(false), [pathname])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 h-14 md:h-18">

        {/* Brand */}
        <NavLink to="/" onClick={scrollTop} className="flex items-center gap-3 flex-1 min-w-0 select-none">
          <img
            src="/gsal_trans_logo.png"
            alt="GSAL Logo"
            className="w-auto h-10 md:h-12"
          />
          <span className="text-base md:text-lg font-black tracking-wide whitespace-nowrap text-gray-900">
            GeoScape Analytics Lab
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 shrink-0">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                onClick={scrollTop}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors pb-0.5 ${
                    isActive
                      ? 'text-forest-700 border-b-2 border-forest-700'
                      : 'text-gray-900 hover:text-forest-700'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#4b5563', borderBottom: '1px solid #6b7280' }}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                onClick={scrollTop}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}