import { Routes, Route, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './data/navigation.js'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LanguageBanner from './components/LanguageBanner.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home         from './routes/Home.jsx'
import Interiors    from './routes/Interiors.jsx'
import VillaV       from './routes/VillaV.jsx'
import Blog         from './routes/Blog.jsx'
import Testimonials from './routes/Testimonials.jsx'
import Contact      from './routes/Contact.jsx'

/**
 * Layout wrapper that syncs i18n language with the :locale URL param.
 * All locale-aware pages are rendered inside this wrapper.
 */
function LocaleLayout() {
  const { locale } = useParams()
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <LanguageBanner />
    </>
  )
}

/**
 * Thin wrapper that reads the locale from the URL and syncs i18n.
 */
function LocaleSync({ children }) {
  const location   = useLocation()
  const { i18n }   = useTranslation()
  const localeMatch = location.pathname.match(/^\/(en|sv)/)
  const locale     = localeMatch ? localeMatch[1] : DEFAULT_LOCALE

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return children
}

/**
 * Determines the default redirect target for `/`:
 * 1. Stored localStorage preference
 * 2. Otherwise: DEFAULT_LOCALE
 *
 * Browser language is intentionally NOT used for redirect (see spec / SEO note).
 */
function DefaultRedirect() {
  const stored = localStorage.getItem('hbn_language')
  const target = SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE
  return <Navigate to={`/${target}`} replace />
}

export default function App() {
  return (
    <LocaleSync>
      <Routes>
        {/* Root → locale redirect */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Locale-prefixed routes — :locale param makes useParams() work everywhere */}
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index              element={<Home />} />
          <Route path="interiors"   element={<Interiors />} />
          <Route path="villa-v"     element={<VillaV />} />
          <Route path="blog"        element={<Blog />} />
          <Route path="testimonials"element={<Testimonials />} />
          <Route path="contact"     element={<Contact />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
      </Routes>
    </LocaleSync>
  )
}
