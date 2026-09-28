import { describe, it, expect } from 'vitest'
import { generateRobotsTxt, generateSitemapXml } from './seoTools'
import { SiteSettings, Project, Service, Post } from './types'

describe('SEO Tools: Robots.txt & Sitemap Generator', () => {
  const mockSettings: SiteSettings = {
    site_name: 'راية',
    slogan_ar: '',
    slogan_en: '',
    site_description: '',
    phone_number: '',
    whatsapp_number: '',
    email_address: '',
    address: '',
    social_x: '',
    social_instagram: '',
    social_linkedin: '',
    social_tiktok: '',
    social_youtube: '',
    site_url: 'https://raya-tawny.vercel.app',
    sitemap_include_projects: true,
    sitemap_include_services: true,
    sitemap_include_posts: true,
  }

  it('generates robots.txt that shields /admin routes from web crawlers', () => {
    const robots = generateRobotsTxt(mockSettings)
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('Disallow: /admin/')
    expect(robots).toContain('Sitemap: https://raya-tawny.vercel.app/sitemap.xml')
  })

  it('generates sitemap with correct canonical URLs for works, services, and blog', () => {
    const mockProjects: Partial<Project>[] = [
      { id: '1', slug: 'saudi-founding-day', status: 'published', is_featured: true, display_order: 1, title: 'يوم التأسيس', client_name: 'جهة حكومية', cover_image: '' },
    ]
    const mockServices: Partial<Service>[] = [
      { id: '1', slug: 'reels-production', status: 'published', display_order: 1, title: 'إنتاج ريلز', description: 'وصف' },
    ]
    const mockPosts: Partial<Post>[] = [
      { id: '1', slug: 'content-creation-guide', status: 'published', title: 'دليل صناعة المحتوى', excerpt: 'مقدمة', content: 'نص', cover_image: '', author: 'راية', category: 'تسويق' },
    ]

    const xml = generateSitemapXml(
      mockSettings,
      mockProjects as Project[],
      mockServices as Service[],
      mockPosts as Post[]
    )

    // Verify canonical path structure
    expect(xml).toContain('<loc>https://raya-tawny.vercel.app/works/saudi-founding-day</loc>')
    expect(xml).toContain('<loc>https://raya-tawny.vercel.app/services/reels-production</loc>')
    expect(xml).toContain('<loc>https://raya-tawny.vercel.app/blog/content-creation-guide</loc>')
    expect(xml).not.toContain('/projects/saudi-founding-day') // Must not use old /projects path
  })

  it('escapes special characters to prevent XML injection', () => {
    const mockServices: Partial<Service>[] = [
      { id: '1', slug: 'marketing-&-branding', status: 'published', display_order: 1, title: 'تسويق & هوية', description: 'وصف' },
    ]

    const xml = generateSitemapXml(
      mockSettings,
      [],
      mockServices as Service[],
      []
    )

    expect(xml).toContain('marketing-&amp;-branding')
    expect(xml).not.toContain('marketing-&-branding')
  })
})
