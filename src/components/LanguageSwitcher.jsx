import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LOCALES } from '../data/navigation.js'

/**
 * EN / SV switcher.
 * Swaps only the locale segment of the current path — never bounces to home.
 */
export default function LanguageSwitcher({ className = '', scrolled = false }) {
  const { locale } = useParams()
  const location   = useLocation()
  const navigate   = useNavigate()
  const { i18n }   = useTranslation()

  function switchTo(targetLocale) {
    if (targetLocale === locale) return

    // Replace leading /<current-locale> with /<target-locale>
    const newPath = location.pathname.replace(
      new RegExp(`^/${locale}`),
      `/${targetLocale}`
    )

    // Persist preference
    localStorage.setItem('hbn_language', targetLocale)
    i18n.changeLanguage(targetLocale)
    navigate(newPath + location.search + location.hash)
  }

  return (
    <div className={`flex items-center gap-1 text-xs tracking-widest font-sans font-medium ${className}`}>
      {SUPPORTED_LOCALES.map((loc, idx) => (
        <span key={loc} className="flex items-center gap-1">
          {idx > 0 && <span className="text-travertine">|</span>}
          <button
            onClick={() => switchTo(loc)}
            className={`uppercase transition-colors duration-200 ${
              locale === loc
                ? scrolled ? 'text-primary font-semibold' : 'text-white font-semibold'
                : scrolled ? 'text-ink/50 hover:text-secondary hover:font-semibold' : 'text-white/70 hover:text-white hover:font-semibold'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
