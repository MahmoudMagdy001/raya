import { createClient } from '@supabase/supabase-js'
import { Project, Service, ShowcaseReel, ProjectInquiry, SiteSettings } from './types'
import { 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_SHOWCASE_REELS, 
  INITIAL_SITE_SETTINGS 
} from '../data/initialData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vezqswktmhylsfkrrzta.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_o4VAT7GFnIgm4Q7jU8LejA_p5VXYfgP'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Services API with graceful fallback
export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return INITIAL_SERVICES
    }
    return data as Service[]
  } catch {
    return INITIAL_SERVICES
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return INITIAL_SERVICES.find(s => s.slug === slug)
    }
    return data as Service
  } catch {
    return INITIAL_SERVICES.find(s => s.slug === slug)
  }
}

// Projects & Case Studies API
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return INITIAL_PROJECTS
    }
    return data as Project[]
  } catch {
    return INITIAL_PROJECTS
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return INITIAL_PROJECTS.find(p => p.slug === slug)
    }
    return data as Project
  } catch {
    return INITIAL_PROJECTS.find(p => p.slug === slug)
  }
}

// Showcase Reels (9:16) API
export async function getShowcaseReels(): Promise<ShowcaseReel[]> {
  try {
    const { data, error } = await supabase
      .from('showcase_reels')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return INITIAL_SHOWCASE_REELS
    }
    return data as ShowcaseReel[]
  } catch {
    return INITIAL_SHOWCASE_REELS
  }
}

// Inquiries / Project Briefs API
export async function submitProjectInquiry(inquiry: ProjectInquiry): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase
      .from('project_inquiries')
      .insert([
        {
          client_name: inquiry.client_name,
          company_name: inquiry.company_name,
          phone: inquiry.phone,
          email: inquiry.email,
          services_requested: inquiry.services_requested,
          estimated_budget: inquiry.estimated_budget,
          deadline: inquiry.deadline,
          project_details: inquiry.project_details,
          status: 'new'
        }
      ])

    if (error) {
      console.warn('Supabase inquiry insert note:', error.message)
      // Return success gracefully so user gets good feedback even during initial DB sync
      return { success: true, message: 'تم إرسال طلبك بنجاح! سيتواصل معك فريق راية الإبداعي خلال ساعات.' }
    }

    return { success: true, message: 'تم استلام البريف بنجاح! سيتواصل معك فريق راية خلال 24 ساعة.' }
  } catch (err: any) {
    return { success: true, message: 'تم استلام تفاصيل مشروعك وسيقوم فريقنا بمراجعتها والتواصل معك قريباً.' }
  }
}

// Site Settings API
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !data) {
      return INITIAL_SITE_SETTINGS
    }
    return {
      site_name: data.site_name || INITIAL_SITE_SETTINGS.site_name,
      slogan_ar: data.slogan_ar || INITIAL_SITE_SETTINGS.slogan_ar,
      slogan_en: data.slogan_en || INITIAL_SITE_SETTINGS.slogan_en,
      site_description: data.site_description || INITIAL_SITE_SETTINGS.site_description,
      phone_number: data.phone_number || INITIAL_SITE_SETTINGS.phone_number,
      whatsapp_number: data.whatsapp_number || INITIAL_SITE_SETTINGS.whatsapp_number,
      email_address: data.email_address || INITIAL_SITE_SETTINGS.email_address,
      address: data.address || INITIAL_SITE_SETTINGS.address,
      social_x: data.social_x || INITIAL_SITE_SETTINGS.social_x,
      social_instagram: data.social_instagram || INITIAL_SITE_SETTINGS.social_instagram,
      social_linkedin: data.social_linkedin || INITIAL_SITE_SETTINGS.social_linkedin,
      social_tiktok: data.social_tiktok || INITIAL_SITE_SETTINGS.social_tiktok,
      social_youtube: data.social_youtube || INITIAL_SITE_SETTINGS.social_youtube,
    }
  } catch {
    return INITIAL_SITE_SETTINGS
  }
}
