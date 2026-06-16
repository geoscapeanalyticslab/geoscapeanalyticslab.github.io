import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',             label: 'Home'          },
  { to: '/research',     label: 'Research'      },
  { to: '/people',       label: 'People'        },
  { to: '/blogs',        label: 'Blogs'         },
  { to: '/visualization',label: 'Visualization' },
  { to: '/contact',      label: 'Contact'       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const navBg     = `bg-white border-b border-gray-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`
  const linkCol   = 'text-gray-600 hover:text-gray-900'
  const activeStyle = 'text-gray-900 border-b-2 border-gray-900'

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className={`max-w-7xl mx-auto px-4 flex items-center gap-8 transition-all duration-300 ${scrolled ? 'h-[5rem] md:h-[8rem]' : 'h-[6rem] md:h-[12rem]'}`}>
        {/* Brand */}
        <NavLink to="/" onClick={scrollTop} className="flex items-center gap-3 flex-1 min-w-0 select-none">
          <img
            src="/gsal_trans_logo.png"
            alt="GSAL Logo"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-20 md:h-28' : 'h-24 md:h-44'}`}
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap text-gray-900">
              GeoScape Analytics Lab
            </span>
          </div>
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7 shrink-0">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                onClick={scrollTop}
                className={({ isActive }) =>
                  `text-lg font-semibold tracking-wide pb-0.5 transition-colors ${linkCol} ${isActive ? activeStyle : ''}`
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
          className="md:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}
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
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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