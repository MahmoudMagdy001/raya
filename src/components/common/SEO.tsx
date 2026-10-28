import { useEffect } from 'react'
import { useSiteSettings } from '../../context/SiteSettingsContext'

export interface SeoProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
}

/**
 * usePageSeo
 * Dynamic SEO hook to synchronize document title and essential meta tags
 * with database-driven SEO data.
 */
export function usePageSeo({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  noIndex = false,
}: SeoProps) {
  const { settings } = useSiteSettings()
  const defaultTitle = settings.default_meta_title?.trim()
  const siteName = settings.site_name?.trim()
  const finalDescription = description || settings.default_meta_description || settings.site_description
  const finalKeywords = keywords || settings.default_keywords
  const finalOgImage = ogImage || settings.default_og_image

  useEffect(() => {
    // 1. Document Title (page title + site name, or the admin default meta title)
    const siteTitle = siteName || 'راية للإنتاج والتسويق الإبداعي'
    const homeTitle = defaultTitle || `${siteTitle} | ${settings.slogan_ar || 'أفكار تصنع الفرق'}`
    const fullTitle = title
      ? title.includes(siteTitle) ? title : `${title} | ${siteTitle}`
      : homeTitle
    document.title = fullTitle

    // Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Meta Description
    if (finalDescription) {
      setMetaTag('name', 'description', finalDescription)
      setMetaTag('property', 'og:description', finalDescription)
      setMetaTag('property', 'twitter:description', finalDescription)
    }

    // 3. Meta Keywords
    if (finalKeywords) {
      setMetaTag('name', 'keywords', finalKeywords)
    }

    // 4. Open Graph Title
    setMetaTag('name', 'title', fullTitle)
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'twitter:title', fullTitle)
    if (siteName) setMetaTag('property', 'og:site_name', siteName)

    // 5. Open Graph Image
    if (finalOgImage) {
      setMetaTag('property', 'og:image', finalOgImage)
      setMetaTag('property', 'twitter:image', finalOgImage)
    }

    // 6. Robots (noindex)
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow')
    } else {
      setMetaTag('name', 'robots', 'index, follow')
    }

    // 7. Canonical URL (falls back to the admin Site URL + current path)
    const baseUrl = settings.site_url?.trim().replace(/\/+$/, '')
    const finalCanonical = canonicalUrl || (baseUrl ? `${baseUrl}${window.location.pathname}` : '')
    if (finalCanonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.setAttribute('href', finalCanonical)
      setMetaTag('property', 'og:url', finalCanonical)
    }
  }, [
    title,
    finalDescription,
    finalKeywords,
    finalOgImage,
    canonicalUrl,
    noIndex,
    defaultTitle,
    siteName,
    settings.slogan_ar,
    settings.site_url,
  ])
}
