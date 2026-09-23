import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://vezqswktmhylsfkrrzta.supabase.co'
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_o4VAT7GFnIgm4Q7jU8LejA_p5VXYfgP'
const SITE_URL = 'https://raya-tawny.vercel.app'

interface SupabaseItem {
  slug: string
  status: string
  created_at?: string
  completion_date?: string
  published_at?: string
}

interface SiteSettings {
  site_url?: string
  sitemap_include_projects?: boolean
  sitemap_include_services?: boolean
  sitemap_include_posts?: boolean
  sitemap_change_freq?: string
  sitemap_priority_homepage?: number
}

async function fetchTable<T>(table: string, orderBy: string): Promise<T[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=slug,status,created_at${table === 'projects' ? ',completion_date' : ''}${table === 'posts' ? ',published_at' : ''}&order=${orderBy}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  )
  if (!res.ok) return []
  return res.json()
}

async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/site_settings?select=site_url,sitemap_include_projects,sitemap_include_services,sitemap_include_posts,sitemap_change_freq,sitemap_priority_homepage&id=eq.1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  )
  if (!res.ok) return {}
  const rows = await res.json()
  return rows?.[0] ?? {}
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0]
  try {
    return new Date(dateStr).toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

function buildEntry(url: string, lastmod: string, changefreq: string, priority: number): string {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const [settings, projects, services, posts] = await Promise.all([
      fetchSettings(),
      fetchTable<SupabaseItem>('projects', 'display_order'),
      fetchTable<SupabaseItem>('services', 'display_order'),
      fetchTable<SupabaseItem>('posts', 'created_at.desc'),
    ])

    const siteUrl = (settings.site_url || SITE_URL).replace(/\/$/, '')
    const changefreq = settings.sitemap_change_freq || 'weekly'
    const today = new Date().toISOString().split('T')[0]
    const homePriority = settings.sitemap_priority_homepage ?? 1.0

    const entries: string[] = []

    // 1. Homepage
    entries.push(buildEntry(siteUrl + '/', today, 'daily', homePriority))

    // 2. Static sections
    const staticPages = [
      { path: '/#services', priority: 0.9 },
      { path: '/#projects', priority: 0.9 },
      { path: '/#reels', priority: 0.8 },
      { path: '/#blog', priority: 0.8 },
      { path: '/#clients', priority: 0.7 },
      { path: '/#contact', priority: 0.7 },
    ]
    staticPages.forEach(({ path, priority }) => {
      entries.push(buildEntry(`${siteUrl}${path}`, today, 'weekly', priority))
    })

    // 3. Projects
    if (settings.sitemap_include_projects !== false) {
      projects
        .filter((p) => p.status === 'published' && p.slug)
        .forEach((p) => {
          entries.push(
            buildEntry(
              `${siteUrl}/projects/${escapeXml(p.slug)}`,
              formatDate(p.created_at || p.completion_date),
              changefreq,
              0.8
            )
          )
        })
    }

    // 4. Services
    if (settings.sitemap_include_services !== false) {
      services
        .filter((s) => s.status === 'published' && s.slug)
        .forEach((s) => {
          entries.push(
            buildEntry(`${siteUrl}/services/${escapeXml(s.slug)}`, today, changefreq, 0.85)
          )
        })
    }

    // 5. Blog posts
    if (settings.sitemap_include_posts !== false) {
      posts
        .filter((p) => p.status === 'published' && p.slug)
        .forEach((p) => {
          entries.push(
            buildEntry(
              `${siteUrl}/blog/${escapeXml(p.slug)}`,
              formatDate(p.published_at || p.created_at),
              'monthly',
              0.7
            )
          )
        })
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).send(xml)
  } catch (err) {
    console.error('Sitemap generation error:', err)
    res.status(500).send('Error generating sitemap')
  }
}
