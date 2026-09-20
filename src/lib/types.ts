export interface Service {
  id: string
  title: string
  slug: string
  subtitle?: string
  description: string
  full_content?: string
  badge?: string
  icon_name?: string
  image?: string
  gallery?: string[]
  features?: string[]
  deliverables?: string[]
  workflow_steps?: Array<{ title: string; desc: string }>
  status: 'published' | 'draft'
  display_order: number
}

export interface ProjectMetrics {
  views?: string
  growth?: string
  engagement?: string
  conversion?: string
  [key: string]: string | undefined
}

export interface Project {
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

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  type: 'project' | 'post' | 'service' | 'offer'
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
}
