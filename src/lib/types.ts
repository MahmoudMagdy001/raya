export interface SeoMetadata {
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  canonical_url?: string
  og_image?: string
  no_index?: boolean
}

export interface Service extends SeoMetadata {
  id: string
  title: string
  slug: string
  subtitle?: string
  description: string
  full_content?: string
  badge?: string
  category?: 'creative' | 'tech'
  icon_name?: string
  image?: string
  gallery?: string[]
  features?: string[]
  deliverables?: string[]
  workflow_steps?: Array<{ title: string; desc: string }>
  status: 'published' | 'draft'
  display_order: number
}

export interface Client {
  id: string
  name: string
  en_name?: string
  logo_url?: string
  website_url?: string
  display_order: number
  status: 'published' | 'draft'
  created_at?: string
}

export interface Post extends SeoMetadata {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  category: string
  tags?: string[]
  reading_time?: number
  views_count?: number
  status: 'published' | 'draft'
  published_at?: string
  created_at?: string
}

export interface ProjectMetrics {
  views?: string
  growth?: string
  engagement?: string
  conversion?: string
  [key: string]: string | undefined
}

export interface Project extends SeoMetadata {
  id: string
  title: string
  slug: string
  client_name: string
  client_logo?: string
  category_name?: string
  cover_image: string
  video_url?: string
  video_aspect_ratio?: '9:16' | '16:9'
  gallery?: string[]
  completion_date?: string
  is_featured: boolean
  display_order: number
  views_count?: number
  metrics?: ProjectMetrics
  // The 6-Step Case Study Schema
  case_challenge?: string
  case_objective?: string
  case_idea?: string
  case_production?: string
  case_final_content?: string
  case_takeaway?: string
  quote?: string
  scope_of_work?: string
  quality_standard?: string
  deliverables?: Array<string | { title: string; note?: string }>
  workflow_steps?: Array<{ title: string; desc: string; description?: string }>
  status: 'published' | 'draft'
  created_at?: string
}

export interface ShowcaseReel {
  id: string
  title: string
  slug: string
  client_name?: string
  platform: 'instagram' | 'tiktok' | 'shorts' | 'snapchat'
  video_url: string
  thumbnail_url: string
  duration_seconds?: number
  views_label?: string
  likes_count?: number
  status: 'published' | 'draft'
  display_order: number
}

export interface Offer {
  id: string
  title: string
  slug: string
  description: string
  discount_label: string
  cover_image?: string
  package_type?: string
  price_from?: number
  old_price?: number
  features?: string[]
  valid_from?: string
  valid_until?: string
  status: 'published' | 'draft'
}

export interface MediaItem {
  id: string
  name: string
  file_url: string
  file_type: 'image' | 'video'
  file_size?: string
  folder?: string
  // SEO Specialist Fields for Media
  alt_text?: string // النص البديل لمحركات البحث (Alt Text)
  caption?: string // التسمية التوضيحية
  description?: string // الوصف المفصل
  keywords?: string // الكلمات المفتاحية
  dimensions?: string // أبعاد الملف (مثال: 1920x1080)
  created_at?: string
}

export interface ProjectInquiry {
  id?: string
  client_name: string
  company_name?: string
  phone: string
  email: string
  services_requested: string[]
  estimated_budget?: string
  deadline?: string
  project_details: string
  status?: 'new' | 'contacted' | 'in_progress' | 'closed'
  created_at?: string
}

export interface SiteSettings {
  site_name: string
  slogan_ar: string
  slogan_en: string
  site_description: string
  phone_number: string
  whatsapp_number: string
  email_address: string
  address: string
  social_x: string
  social_instagram: string
  social_linkedin: string
  social_tiktok: string
  social_youtube: string
  // SEO & Analytics Specialist Settings
  default_meta_title?: string
  default_meta_description?: string
  default_keywords?: string
  default_og_image?: string
  google_site_verification?: string
  google_analytics_id?: string
  // Robots.txt & Sitemap Settings
  site_url?: string
  robots_txt_custom?: string
  sitemap_include_posts?: boolean
  sitemap_include_projects?: boolean
  sitemap_include_services?: boolean
  sitemap_change_freq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  sitemap_priority_homepage?: number
}
