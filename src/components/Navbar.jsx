import { useState, useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NAV_LINKS, buildPath } from '../data/navigation.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar() {
  const { locale } = useParams()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navBg = scrolled || menuOpen
    ? 'bg-linen/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent'

  const textColor = scrolled || menuOpen ? 'text-ink' : 'text-linen'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            to={buildPath(locale, '')}
            className={`font-serif text-base md:text-lg tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${textColor}`}
          >
            HOME BY NOX
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.key}
                to={buildPath(locale, link.slug)}
                end={link.slug === ''}
                className={({ isActive }) =>
                  `font-sans text-[11px] tracking-widest uppercase transition-all duration-200 ${
                    isActive
                      ? scrolled ? 'text-primary font-semibold' : 'text-white font-semibold'
                      : scrolled
                        ? `${textColor} hover:text-primary opacity-80 hover:opacity-100 hover:font-semibold`
                        : 'text-linen opacity-80 hover:opacity-100 hover:font-semibold hover:text-white'
                  }`
                }
              >
                {t(link.i18nKey)}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-5">
            <LanguageSwitcher scrolled={scrolled} />
            <Link
              to={buildPath(locale, 'contact')}
              className={`font-sans text-[11px] tracking-widest uppercase border px-5 py-2 transition-all duration-200 ${
                scrolled
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-linen text-linen hover:bg-linen hover:text-ink'
              }`}
            >
              {t('nav.inquire')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-[5px] p-2 ${textColor}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-limestone pb-6 pt-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.key}
                to={buildPath(locale, link.slug)}
                end={link.slug === ''}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-sans text-[11px] tracking-widest uppercase py-1 transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-ink/70 hover:text-primary'
                  }`
                }
              >
                {t(link.i18nKey)}
              </NavLink>
            ))}
            <div className="pt-2 flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                to={buildPath(locale, 'contact')}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-[11px] tracking-widest uppercase border border-primary text-primary px-5 py-2 hover:bg-primary hover:text-white transition-all"
              >
                {t('nav.inquire')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
