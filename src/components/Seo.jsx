import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://homebynox.com'
const SUPPORTED_LOCALES = ['en', 'sv']

/**
 * SEO wrapper — sets per-route title, meta description, canonical and hreflang tags.
 * Usage: <Seo pageKey="home" locale="en" />
 *
 * pageKey must match a key under seo.* in the translation files.
 * Pass extra props (title, description) to override the translation-derived defaults.
 */
export default function Seo({ pageKey, locale = 'en', slug = '', title: titleOverride, description: descOverride }) {
  const { t } = useTranslation()

  const title       = titleOverride  ?? t(`seo.${pageKey}.title`)
  const description = descOverride   ?? t(`seo.${pageKey}.description`)

  const canonicalPath = slug ? `/${locale}/${slug}` : `/${locale}`
  const canonical     = `${BASE_URL}${canonicalPath}`

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang for every supported locale */}
      {SUPPORTED_LOCALES.map((loc) => {
        const href = slug ? `${BASE_URL}/${loc}/${slug}` : `${BASE_URL}/${loc}`
        return <link key={loc} rel="alternate" hreflang={loc} href={href} />
      })}
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/en${slug ? `/${slug}` : ''}`} />

      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:locale"      content={locale === 'sv' ? 'sv_SE' : 'en_GB'} />
    </Helmet>
  )
}
