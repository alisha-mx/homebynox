import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NAV_LINKS, buildPath } from '../data/navigation.js'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mariacapor',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@More_is_more_with_Maria',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:maria@homebynox.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { t } = useTranslation()
  const { locale } = useParams()

  const footerLinks = NAV_LINKS.filter(l => l.key !== 'home')

  return (
    <footer className="bg-background text-ink py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Logo */}
          <Link
            to={buildPath(locale, '')}
            className="font-serif text-base tracking-[0.2em] uppercase font-semibold text-secondary hover:text-secondary/80 transition-colors"
          >
            HOME BY NOX
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-7 gap-y-3">
            {footerLinks.map(link => (
              <Link
                key={link.key}
                to={buildPath(locale, link.slug)}
                className="font-sans text-[10px] tracking-widest uppercase font-semibold text-ink/60 hover:text-ink transition-colors"
              >
                {t(link.i18nKey)}
              </Link>
            ))}
          </nav>

        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 border border-ink/20 flex items-center justify-center text-ink/50 hover:border-secondary hover:text-secondary transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-ink/20 text-center">
          <p className="font-sans text-[10px] tracking-wider text-ink uppercase font-semibold">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
