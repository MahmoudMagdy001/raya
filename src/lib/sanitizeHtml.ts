/**
 * Lightweight, zero-dependency HTML sanitizer for rendering trusted TipTap rich text.
 * Utilizes the browser's native DOMParser to parse and sanitize markup without external overhead.
 */

const BLOCKED_TAGS = new Set([
  'script',
  'iframe',
  'object',
  'embed',
  'form',
  'base',
  'link',
  'meta',
  'applet',
])

const SAFE_URI_PATTERN = /^(?:(?:https?|mailto|tel|sms):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i

export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== 'string') return ''
  if (typeof window === 'undefined' || !window.DOMParser) {
    // Robust fallback for non-DOM / SSR / test environments
    return rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^>]*>/gi, '')
      .replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
      .replace(/(?:href|src|poster)\s*=\s*['"]?(?:javascript|data:text\/html|vbscript):[^'">\s]*/gi, '')
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, 'text/html')

    function cleanNode(node: Node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement
        const tagName = el.tagName.toLowerCase()

        // 1. Remove dangerous or non-content tags
        if (BLOCKED_TAGS.has(tagName)) {
          el.remove()
          return
        }

        // 2. Strip inline event listeners (onclick, onerror, onload, etc.)
        const attrs = Array.from(el.attributes)
        for (const attr of attrs) {
          const attrName = attr.name.toLowerCase()
          if (attrName.startsWith('on')) {
            el.removeAttribute(attr.name)
            continue
          }

          // 3. Strip dangerous URI schemes from href / src / poster / data
          if (['href', 'src', 'poster', 'data'].includes(attrName)) {
            const val = attr.value.trim().toLowerCase()
            if (
              val.startsWith('javascript:') ||
              val.startsWith('data:text/html') ||
              val.startsWith('vbscript:') ||
              !SAFE_URI_PATTERN.test(val)
            ) {
              el.removeAttribute(attr.name)
            }
          }
        }
      }

      // Recursively clean children (iterate backwards to allow removal)
      const children = Array.from(node.childNodes)
      for (const child of children) {
        cleanNode(child)
      }
    }

    cleanNode(doc.body)
    return doc.body.innerHTML
  } catch {
    // If parsing fails, return stripped string
    return rawHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }
}
