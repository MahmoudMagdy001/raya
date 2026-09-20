import { SiteSettings, Project, Service, Post } from './types'

// ==============================================================================
// Robots.txt Generator
// ==============================================================================

export function generateRobotsTxt(settings: SiteSettings): string {
  const siteUrl = (settings.site_url || 'https://raya.sa').replace(/\/$/, '')

  const defaultRules = `User-agent: *
Allow: /

# Block admin panel from indexing
Disallow: /admin
Disallow: /admin/

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml`

  const customRules = settings.robots_txt_custom?.trim()

  return customRules
    ? `${defaultRules}\n\n# Custom Rules\n${customRules}`
    : defaultRules
}

// ==============================================================================
// Sitemap XML Generator
// ==============================================================================

interface SitemapEntry {
  url: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0]
  return new Date(dateStr).toISOString().split('T')[0]
}

export function generateSitemapXml(
  settings: SiteSettings,
  projects: Project[],
  services: Service[],
  posts: Post[]
): string {
  const siteUrl = (settings.site_url || 'https://raya.sa').replace(/\/$/, '')
  const changefreq = settings.sitemap_change_freq || 'weekly'
  const today = new Date().toISOString().split('T')[0]

  const entries: SitemapEntry[] = []

  // 1. Homepage
  entries.push({
    url: siteUrl,
    lastmod: today,
    changefreq: 'daily',
    priority: settings.sitemap_priority_homepage ?? 1.0
  })

  // 2. Static Pages
  const staticPages = [
    { path: '/#services', priority: 0.9 },
    { path: '/#projects', priority: 0.9 },
    { path: '/#reels', priority: 0.8 },
    { path: '/#blog', priority: 0.8 },
    { path: '/#clients', priority: 0.7 },
    { path: '/#contact', priority: 0.7 }
  ]
  staticPages.forEach(({ path, priority }) => {
    entries.push({
      url: `${siteUrl}${path}`,
      lastmod: today,
      changefreq: 'weekly',
      priority
    })
  })

  // 3. Projects (if enabled)
  if (settings.sitemap_include_projects !== false) {
    projects
      .filter((p) => p.status === 'published')
      .forEach((p) => {
        entries.push({
          url: `${siteUrl}/projects/${escapeXml(p.slug)}`,
          lastmod: formatDate(p.created_at || p.completion_date),
          changefreq,
          priority: 0.8
        })
      })
  }

  // 4. Services (if enabled)
  if (settings.sitemap_include_services !== false) {
    services
      .filter((s) => s.status === 'published')
      .forEach((s) => {
        entries.push({
          url: `${siteUrl}/services/${escapeXml(s.slug)}`,
          lastmod: today,
          changefreq,
          priority: 0.85
        })
      })
  }

  // 5. Posts / Blog (if enabled)
  if (settings.sitemap_include_posts !== false) {
    posts
      .filter((p) => p.status === 'published')
      .forEach((p) => {
        entries.push({
          url: `${siteUrl}/blog/${escapeXml(p.slug)}`,
          lastmod: formatDate(p.published_at || p.created_at),
          changefreq: 'monthly',
          priority: 0.7
        })
      })
  }

  // Build XML
  const urlElements = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority?.toFixed(1)}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`
}

// ==============================================================================
// File Download Helper
// ==============================================================================

export function downloadTextFile(content: string, filename: string, mimeType = 'text/plain'): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ==============================================================================
// Copy to Clipboard Helper
// ==============================================================================

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
