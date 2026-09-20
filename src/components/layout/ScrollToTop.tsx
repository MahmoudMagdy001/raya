import React, { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Automatically scrolls the window to the top instantly on route changes.
 * Supports smooth scrolling to specific element hashes when present.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
      return () => clearTimeout(timer)
    }

    // Instantly reset window scroll to top before painting the new page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [pathname, hash])

  return null
}
