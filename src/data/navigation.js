// Navigation structure — translation keys mapped to route slugs.
// Add new locales to SUPPORTED_LOCALES; routes are auto-prefixed.

export const SUPPORTED_LOCALES = ['en', 'sv']
export const DEFAULT_LOCALE = 'en'

export const NAV_LINKS = [
  { key: 'home',         slug: '',            i18nKey: 'nav.home' },
  { key: 'interiors',    slug: 'interiors',   i18nKey: 'nav.interiors' },
  { key: 'villaV',       slug: 'villa-v',     i18nKey: 'nav.villaV' },
  { key: 'blog',         slug: 'blog',        i18nKey: 'nav.blog' },
  { key: 'testimonials', slug: 'testimonials',i18nKey: 'nav.testimonials' },
  { key: 'contact',      slug: 'contact',     i18nKey: 'nav.contact' },
]

export function buildPath(locale, slug) {
  return slug ? `/${locale}/${slug}` : `/${locale}`
}
