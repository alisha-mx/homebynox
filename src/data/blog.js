/**
 * Blog data-access layer.
 *
 * Currently returns static placeholder data.
 * To connect a Strapi backend, replace the functions below with API calls:
 *   const res = await fetch(`${STRAPI_URL}/api/posts?locale=${locale}&populate=*`)
 *
 * Components must NEVER import raw post data directly — always call these functions
 * so the data source can be swapped without touching presentation code.
 */

const STATIC_POSTS = []

/**
 * Fetch all published posts for a given locale.
 * @param {string} locale - e.g. 'en' | 'sv'
 * @returns {Promise<Array>}
 */
export async function getPosts(locale = 'en') {
  // TODO: replace with Strapi call when backend is ready
  return STATIC_POSTS.filter((p) => p.locale === locale)
}

/**
 * Fetch a single post by slug and locale.
 * @param {string} slug
 * @param {string} locale
 * @returns {Promise<Object|null>}
 */
export async function getPost(slug, locale = 'en') {
  // TODO: replace with Strapi call
  return STATIC_POSTS.find((p) => p.slug === slug && p.locale === locale) ?? null
}

/**
 * Post shape (for reference when adding Strapi integration):
 * {
 *   id: string,
 *   locale: 'en' | 'sv',
 *   slug: string,
 *   title: string,
 *   description: string,   // SEO meta description
 *   excerpt: string,
 *   body: string,          // HTML or Markdown
 *   coverImage: string,    // URL
 *   publishedAt: string,   // ISO 8601
 *   tags: string[],
 * }
 */
