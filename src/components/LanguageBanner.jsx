import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * Dismissible suggestion banner shown when the browser language
 * doesn't match the current locale — never forces a redirect.
 */
export default function LanguageBanner() {
  const { locale }        = useParams()
  const location          = useLocation()
  const navigate          = useNavigate()
  const { t, i18n }       = useTranslation()
  const [visible, setVisible] = useState(false)
  const [suggestedLocale, setSuggestedLocale]  = useState(null)

  useEffect(() => {
    const dismissed  = sessionStorage.getItem('hbn_banner_dismissed')
    const stored     = localStorage.getItem('hbn_language')
    if (dismissed || stored) return

    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase()
    const supported   = ['en', 'sv']
    if (supported.includes(browserLang) && browserLang !== locale) {
      setSuggestedLocale(browserLang)
      setVisible(true)
    }
  }, [locale])

  function accept() {
    const newPath = location.pathname.replace(
      new RegExp(`^/${locale}`),
      `/${suggestedLocale}`
    )
    localStorage.setItem('hbn_language', suggestedLocale)
    i18n.changeLanguage(suggestedLocale)
    navigate(newPath)
    setVisible(false)
  }

  function dismiss() {
    sessionStorage.setItem('hbn_banner_dismissed', '1')
    setVisible(false)
  }

  if (!visible || !suggestedLocale) return null

  const langLabel = suggestedLocale === 'sv' ? t('banner.svenska') : t('banner.english')

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-linen text-sm font-sans px-6 py-3 rounded-full shadow-xl flex items-center gap-4 animate-fade-in">
      <span>{t('banner.viewIn')} <strong>{langLabel}</strong>?</span>
      <button
        onClick={accept}
        className="bg-primary text-white px-4 py-1 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors"
      >
        {langLabel}
      </button>
      <button
        onClick={dismiss}
        className="text-linen/50 hover:text-linen text-xs transition-colors"
      >
        {t('banner.dismiss')}
      </button>
    </div>
  )
}
