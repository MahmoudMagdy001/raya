import { useEffect } from 'react'

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
  useEffect(() => {
    // 1. Document Title
    const siteTitle = 'راية للإنتاج والتسويق الإبداعي'
    if (title) {
      document.title = title.includes('راية') ? title : `${title} | ${siteTitle}`
    } else {
      document.title = `${siteTitle} | أفكار تصنع الفرق`
    }

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
    if (description) {
      setMetaTag('name', 'description', description)
      setMetaTag('property', 'og:description', description)
      setMetaTag('property', 'twitter:description', description)
    }

    // 3. Meta Keywords
    if (keywords) {
      setMetaTag('name', 'keywords', keywords)
    }

    // 4. Open Graph Title
    if (title) {
      setMetaTag('property', 'og:title', title)
      setMetaTag('property', 'twitter:title', title)
    }

    // 5. Open Graph Image
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage)
      setMetaTag('property', 'twitter:image', ogImage)
    }

    // 6. Robots (noindex)
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow')
    } else {
      setMetaTag('name', 'robots', 'index, follow')
    }

    // 7. Canonical URL
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.setAttribute('href', canonicalUrl)
    }
  }, [title, description, keywords, ogImage, canonicalUrl, noIndex])
}
