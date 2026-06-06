import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Jumps the window to the top whenever the route changes.
 * useLayoutEffect runs synchronously before the browser paints, so the new
 * page already appears at the top — no visible scroll or flash of old position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
