import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'


const links = [
  { to: '/',             label: 'Home'          },
  { to: '/research',     label: 'Research'      },
  { to: '/people',       label: 'People'        },
  { to: '/volunteers',   label: 'Volunteers'    },
  { to: '/blogs',        label: 'Blogs'         },
  { to: '/visualization',label: 'Visualization' },
  { to: '/contact',      label: 'Contact'       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()
  const isHome                  = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  /* Style logic — dark navbar always, squeezes on scroll */
  const atop    = isHome && !scrolled
  const navBg   = atop
    ? 'bg-transparent'
    : 'bg-forest-950/95 backdrop-blur-md border-b border-forest-800 shadow-md'
  const linkCol = 'text-white/80 hover:text-white'
  const activeStyle = 'text-white border-b-2 border-white'

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className={`max-w-7xl mx-auto px-6 flex items-center gap-8 transition-all duration-300 ${scrolled ? 'h-[8rem] md:h-[12rem]' : 'h-[10rem] md:h-[20rem]'}`}>
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3 flex-1 min-w-0 select-none">
          <img
             src="/gsal-logo-transparent1.png"
            alt="GSAL Logo"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-28 md:h-40' : 'h-36 md:h-64'}`}
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap text-white">
              GeoScape Analytics Lab <span className="mx-2 font-light opacity-60"></span> 
            </span>
          </div>
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7 shrink-0">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide pb-0.5 transition-colors ${linkCol} ${isActive ? activeStyle : ''}`
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
          className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#0d2b29', borderBottom: '1px solid #1d4a46' }}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end={to === '/'}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
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