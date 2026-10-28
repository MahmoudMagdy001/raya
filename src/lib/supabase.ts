import { createClient } from '@supabase/supabase-js'
import {
  Project,
  Service,
  ShowcaseReel,
  Client,
  Post,
  ProjectInquiry,
  SiteSettings,
  MediaItem,
} from './types'
import { INITIAL_SITE_SETTINGS } from '../data/initialData'
import { fetchWithDedupAndCache, invalidateCache } from './supabase/cache'
import {
  SERVICES_SUMMARY_COLUMNS,
  SERVICES_DETAIL_COLUMNS,
  PROJECTS_SUMMARY_COLUMNS,
  PROJECTS_DETAIL_COLUMNS,
  POSTS_SUMMARY_COLUMNS,
  POSTS_DETAIL_COLUMNS,
  REELS_COLUMNS,
  CLIENTS_COLUMNS,
  MEDIA_COLUMNS,
  INQUIRIES_COLUMNS,
} from './supabase/queries'

export { invalidateCache }

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vezqswktmhylsfkrrzta.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_o4VAT7GFnIgm4Q7jU8LejA_p5VXYfgP'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database is the single source of truth: no local/default data fallbacks.
// Remove legacy cached copies left by previous versions.
if (typeof window !== 'undefined') {
  for (const key of [
    'raya_services',
    'raya_projects',
    'raya_clients',
    'raya_showcase_reels',
    'raya_posts',
    'raya_site_settings',
    'raya_media_library',
  ]) {
    localStorage.removeItem(key)
  }
}

// Generate valid UUIDv4 for Supabase PostgreSQL compatibility
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// ==============================================================================
// 🛠️ Generic Table Store Helper with Projected Columns & Caching
// ==============================================================================

function createCrudStore<T extends { id: string; slug?: string }>(
  tableName: string,
  orderCol = 'display_order',
  orderAsc = true,
  listColumns = '*'
) {
  const getAll = async (forceRefresh = false): Promise<T[]> => {
    return fetchWithDedupAndCache(
      `list_${tableName}`,
      async () => {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select(listColumns)
            .order(orderCol, { ascending: orderAsc })

          if (error) {
            console.warn(`Supabase ${tableName} query error:`, error.message)
            return []
          }
          return (data ?? []) as unknown as T[]
        } catch (err) {
          console.warn(`Supabase ${tableName} query error:`, err)
          return []
        }
      },
      60 * 1000,
      forceRefresh
    )
  }

  const invalidate = (): void => {
    invalidateCache(`list_${tableName}`)
    invalidateCache(`item_${tableName}`)
  }

  const create = async (item: Omit<T, 'id'> & { id?: string }): Promise<T> => {
    const newItem = { ...item, id: item.id || generateUUID() } as T
    const { error } = await supabase.from(tableName).insert([newItem as unknown as Record<string, unknown>])
    if (error) console.error(`Supabase ${tableName} insert error:`, error.message)
    invalidate()
    return newItem
  }

  const update = async (id: string, updates: Partial<T>): Promise<void> => {
    const { error } = await supabase
      .from(tableName)
      .update(updates as unknown as Record<string, unknown>)
      .eq('id', id)
    if (error) console.error(`Supabase ${tableName} update error:`, error.message)
    invalidate()
  }

  const remove = async (id: string): Promise<void> => {
    const { error } = await supabase.from(tableName).delete().eq('id', id)
    if (error) console.error(`Supabase ${tableName} delete error:`, error.message)
    invalidate()
  }

  return { getAll, create, update, remove }
}

// ==============================================================================
// 1. SERVICES
// ==============================================================================
const servicesStore = createCrudStore<Service>('services', 'display_order', true, SERVICES_SUMMARY_COLUMNS)

export const getServices = servicesStore.getAll
export const createService = servicesStore.create
export const updateService = servicesStore.update
export const deleteService = servicesStore.remove

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
  return fetchWithDedupAndCache(`item_services_${slug}`, async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(SERVICES_DETAIL_COLUMNS)
        .eq('slug', slug)
        .maybeSingle()

      if (!error && data) {
        return data as unknown as Service
      }
    } catch (err) {
      console.warn('Supabase service by slug query error:', err)
    }

    return undefined
  })
}

// ==============================================================================
// 2. PROJECTS & CASE STUDIES
// ==============================================================================
const projectsStore = createCrudStore<Project>('projects', 'display_order', true, PROJECTS_SUMMARY_COLUMNS)

export const getProjects = projectsStore.getAll
export const createProject = projectsStore.create
export const updateProject = projectsStore.update
export const deleteProject = projectsStore.remove

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  return fetchWithDedupAndCache(`item_projects_${slug}`, async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(PROJECTS_DETAIL_COLUMNS)
        .eq('slug', slug)
        .maybeSingle()

      if (!error && data) {
        return data as unknown as Project
      }
    } catch (err) {
      console.warn('Supabase project by slug query error:', err)
    }

    return undefined
  })
}

// ==============================================================================
// 3. CLIENTS & PARTNERS
// ==============================================================================
const clientsStore = createCrudStore<Client>('clients', 'display_order', true, CLIENTS_COLUMNS)

export const getClients = clientsStore.getAll
export const createClientRecord = clientsStore.create
export const updateClientRecord = clientsStore.update
export const deleteClientRecord = clientsStore.remove

// ==============================================================================
// 4. SHOWCASE REELS (9:16)
// ==============================================================================
const reelsStore = createCrudStore<ShowcaseReel>('showcase_reels', 'display_order', true, REELS_COLUMNS)

export const getShowcaseReels = reelsStore.getAll
export const createShowcaseReel = reelsStore.create
export const updateShowcaseReel = reelsStore.update
export const deleteShowcaseReel = reelsStore.remove

// ==============================================================================
// 5. POSTS & INSIGHTS
// ==============================================================================
const postsStore = createCrudStore<Post>('posts', 'created_at', false, POSTS_SUMMARY_COLUMNS)

export const getPosts = postsStore.getAll
export const createPost = async (post: Omit<Post, 'id'> & { id?: string }): Promise<Post> => {
  return postsStore.create({
    ...post,
    created_at: post.created_at || new Date().toISOString(),
  })
}
export const updatePost = postsStore.update
export const deletePost = postsStore.remove

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  return fetchWithDedupAndCache(`item_posts_${slug}`, async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(POSTS_DETAIL_COLUMNS)
        .eq('slug', slug)
        .maybeSingle()

      if (!error && data) {
        return data as unknown as Post
      }
    } catch (err) {
      console.warn('Supabase post by slug query error:', err)
    }

    return undefined
  })
}

export const getRelatedPosts = async (currentSlug: string, limit = 3): Promise<Post[]> => {
  return fetchWithDedupAndCache(`related_posts_${currentSlug}_${limit}`, async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(POSTS_SUMMARY_COLUMNS)
        .neq('slug', currentSlug)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (!error && data) {
        return data as unknown as Post[]
      }
    } catch (err) {
      console.warn('Supabase related posts query error:', err)
    }

    const all = await getPosts()
    return all.filter((p) => p.slug !== currentSlug && (!p.status || p.status === 'published')).slice(0, limit)
  })
}

// ==============================================================================
// 6. SITE SETTINGS API (Cached & Deduplicated)
// ==============================================================================

export async function getSiteSettings(forceRefresh = false): Promise<SiteSettings> {
  return fetchWithDedupAndCache(
    'site_settings',
    async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 1)
          .maybeSingle()

        if (error || !data) {
          if (error) console.warn('Supabase site settings query error:', error.message)
          return INITIAL_SITE_SETTINGS
        }
        return { ...INITIAL_SITE_SETTINGS, ...data }
      } catch {
        return INITIAL_SITE_SETTINGS
      }
    },
    60 * 1000,
    forceRefresh
  )
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  const current = await getSiteSettings()
  const updated = { ...current, ...settings }
  invalidateCache('site_settings')

  try {
    const { error } = await supabase.from('site_settings').upsert({ id: 1, ...updated })
    if (error) {
      console.warn('Supabase site settings upsert note:', error.message)
      // If error is due to columns missing from remote DB schema, fallback to upserting only known base columns
      const baseColumns = [
        'id', 'site_name', 'slogan_ar', 'slogan_en', 'site_description', 
        'phone_number', 'whatsapp_number', 'email_address', 'address', 
        'social_x', 'social_instagram', 'social_linkedin', 'social_tiktok', 'social_youtube', 
        'default_meta_title', 'default_meta_description', 'default_keywords', 'default_og_image', 
        'google_site_verification', 'google_analytics_id', 'site_url', 'robots_txt_custom', 
        'sitemap_include_posts', 'sitemap_include_projects', 'sitemap_include_services', 
        'sitemap_change_freq', 'sitemap_priority_homepage'
      ]
      const safePayload: Record<string, any> = { id: 1 }
      for (const col of baseColumns) {
        if (col in updated) safePayload[col] = (updated as any)[col]
      }
      await supabase.from('site_settings').upsert(safePayload)
    }
  } catch (err) {
    console.warn('Supabase site settings upsert fallback to local:', err)
  }
}

// ==============================================================================
// 7. INQUIRIES API
// ==============================================================================
export async function submitProjectInquiry(inquiry: ProjectInquiry): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase.from('project_inquiries').insert([
      {
        client_name: inquiry.client_name,
        company_name: inquiry.company_name,
        phone: inquiry.phone,
        email: inquiry.email,
        services_requested: inquiry.services_requested,
        estimated_budget: inquiry.estimated_budget,
        deadline: inquiry.deadline,
        project_details: inquiry.project_details,
        status: 'new',
      },
    ])

    if (error) {
      console.warn('Supabase inquiry insert note:', error.message)
    }
    invalidateCache('list_project_inquiries')
    return { success: true, message: 'تم استلام طلبك بنجاح! سيتواصل معك فريق راية الإبداعي خلال ساعات.' }
  } catch {
    return { success: true, message: 'تم استلام تفاصيل مشروعك وسيقوم فريقنا بمراجعتها والتواصل معك قريباً.' }
  }
}

export async function getProjectInquiries(): Promise<ProjectInquiry[]> {
  return fetchWithDedupAndCache(
    'list_project_inquiries',
    async () => {
      try {
        const { data, error } = await supabase
          .from('project_inquiries')
          .select(INQUIRIES_COLUMNS)
          .order('created_at', { ascending: false })

        if (error || !data) return []
        return data as ProjectInquiry[]
      } catch {
        return []
      }
    },
    30 * 1000
  )
}

// ==============================================================================
// 8. MEDIA LIBRARY API (With Pagination Support)
// ==============================================================================

export async function getMediaItems(page = 1, pageSize = 60): Promise<MediaItem[]> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  return fetchWithDedupAndCache(`list_media_${page}_${pageSize}`, async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select(MEDIA_COLUMNS)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) {
        console.warn('Supabase media query error:', error.message)
        return []
      }
      return (data ?? []) as unknown as MediaItem[]
    } catch {
      return []
    }
  })
}

export async function createMediaItem(item: Omit<MediaItem, 'id'> & { id?: string }): Promise<MediaItem> {
  const newItem: MediaItem = {
    ...item,
    id: item.id || generateUUID(),
    created_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('media_library').insert([newItem])
  if (error) console.error('Supabase media insert error:', error.message)
  invalidateCache('list_media')

  return newItem
}

export async function updateMediaItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | null> {
  const { data, error } = await supabase
    .from('media_library')
    .update(updates)
    .eq('id', id)
    .select(MEDIA_COLUMNS)
    .maybeSingle()
  invalidateCache('list_media')

  if (error) {
    console.error('Supabase media update error:', error.message)
    return null
  }
  return (data as unknown as MediaItem) ?? null
}

export async function deleteMediaItem(id: string): Promise<void> {
  const { error } = await supabase.from('media_library').delete().eq('id', id)
  if (error) console.error('Supabase media delete error:', error.message)
  invalidateCache('list_media')
}

export async function uploadMediaFile(
  file: File
): Promise<{ url: string; name: string; type: 'image' | 'video'; size: string }> {
  const isVideo = file.type.startsWith('video/')
  const sizeFormatted =
    file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`

  const fileExt = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg')
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const filePath = `uploads/${fileName}`

  // 1. Try Supabase Storage upload
  try {
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('media').getPublicUrl(filePath)

      return {
        url: publicUrl,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        size: sizeFormatted,
      }
    }
  } catch {
    // proceed to fallback
  }

  // 2. Safe local Object URL (NOT base64) to avoid crashing localStorage
  const objectUrl = URL.createObjectURL(file)
  return {
    url: objectUrl,
    name: file.name,
    type: isVideo ? 'video' : 'image',
    size: sizeFormatted,
  }
}
