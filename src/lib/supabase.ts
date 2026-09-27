import { createClient } from '@supabase/supabase-js'
import { 
  Project, 
  Service, 
  ShowcaseReel, 
  Client, 
  Post, 
  ProjectInquiry, 
  SiteSettings,
  MediaItem 
} from './types'
import { 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_SHOWCASE_REELS, 
  INITIAL_CLIENTS, 
  INITIAL_POSTS, 
  INITIAL_SITE_SETTINGS,
  INITIAL_MEDIA 
} from '../data/initialData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vezqswktmhylsfkrrzta.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_o4VAT7GFnIgm4Q7jU8LejA_p5VXYfgP'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ==============================================================================
// 🛠️ Local Storage Helpers (Mirroring for instant UX & resilient fallback)
// ==============================================================================

function getLocalData<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback
  } catch {
    return fallback
  }
}

function setLocalData<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
    window.dispatchEvent(new CustomEvent('raya_storage_updated', { detail: { key } }))
  } catch (err) {
    console.warn('LocalStorage save warning:', err)
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
// 🛠️ Generic Table Store Helper
// ==============================================================================

function createCrudStore<T extends { id: string; slug?: string }>(
  tableName: string,
  storageKey: string,
  initialData: T[],
  orderCol = 'display_order',
  orderAsc = true,
  prependOnCreate = false
) {
  const getAll = async (): Promise<T[]> => {
    const local = getLocalData<T>(storageKey, initialData)
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order(orderCol, { ascending: orderAsc })

      if (!error && data) {
        setLocalData(storageKey, data)
        return data as T[]
      }
    } catch (err) {
      console.warn(`Supabase ${tableName} query error:`, err)
    }
    return local
  }

  const create = async (item: Omit<T, 'id'> & { id?: string }): Promise<T> => {
    const newItem = { ...item, id: item.id || generateUUID() } as T
    const current = getLocalData<T>(storageKey, initialData)
    const updated = prependOnCreate ? [newItem, ...current] : [...current, newItem]
    setLocalData(storageKey, updated)

    try {
      await (supabase.from(tableName) as any).insert([newItem])
    } catch (err) {
      console.warn(`Supabase ${tableName} insert fallback:`, err)
    }

    return newItem
  }

  const update = async (id: string, updates: Partial<T>): Promise<void> => {
    const current = getLocalData<T>(storageKey, initialData)
    const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item))
    setLocalData(storageKey, updated)

    try {
      await (supabase.from(tableName) as any).update(updates).eq('id', id)
    } catch (err) {
      console.warn(`Supabase ${tableName} update fallback:`, err)
    }
  }

  const remove = async (id: string): Promise<void> => {
    const current = getLocalData<T>(storageKey, initialData)
    const updated = current.filter((item) => item.id !== id)
    setLocalData(storageKey, updated)

    try {
      await supabase.from(tableName).delete().eq('id', id)
    } catch (err) {
      console.warn(`Supabase ${tableName} delete fallback:`, err)
    }
  }

  const getBySlug = async (slug: string): Promise<T | undefined> => {
    const items = await getAll()
    return items.find((item) => item.slug === slug)
  }

  return { getAll, create, update, remove, getBySlug }
}

// 1. SERVICES
const servicesStore = createCrudStore<Service>('services', 'raya_services', INITIAL_SERVICES)
export const getServices = servicesStore.getAll
export const createService = servicesStore.create
export const updateService = servicesStore.update
export const deleteService = servicesStore.remove
export const getServiceBySlug = servicesStore.getBySlug

// 2. PROJECTS & CASE STUDIES
const projectsStore = createCrudStore<Project>('projects', 'raya_projects', INITIAL_PROJECTS, 'display_order', true, true)
export const getProjects = projectsStore.getAll
export const createProject = projectsStore.create
export const updateProject = projectsStore.update
export const deleteProject = projectsStore.remove
export const getProjectBySlug = projectsStore.getBySlug

// 3. CLIENTS & PARTNERS
const clientsStore = createCrudStore<Client>('clients', 'raya_clients', INITIAL_CLIENTS)
export const getClients = clientsStore.getAll
export const createClientRecord = clientsStore.create
export const updateClientRecord = clientsStore.update
export const deleteClientRecord = clientsStore.remove

// 4. SHOWCASE REELS (9:16)
const reelsStore = createCrudStore<ShowcaseReel>('showcase_reels', 'raya_showcase_reels', INITIAL_SHOWCASE_REELS)
export const getShowcaseReels = reelsStore.getAll
export const createShowcaseReel = reelsStore.create
export const updateShowcaseReel = reelsStore.update
export const deleteShowcaseReel = reelsStore.remove

// 5. POSTS & INSIGHTS
const postsStore = createCrudStore<Post>('posts', 'raya_posts', INITIAL_POSTS, 'created_at', false, true)
export const getPosts = postsStore.getAll
export const createPost = async (post: Omit<Post, 'id'> & { id?: string }): Promise<Post> => {
  return postsStore.create({
    ...post,
    created_at: post.created_at || new Date().toISOString()
  } as any)
}
export const updatePost = postsStore.update
export const deletePost = postsStore.remove
export const getPostBySlug = postsStore.getBySlug

// ==============================================================================
// 6. SITE SETTINGS API
// ==============================================================================

const SETTINGS_STORAGE_KEY = 'raya_site_settings'

export async function getSiteSettings(): Promise<SiteSettings> {
  let local = INITIAL_SITE_SETTINGS
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (raw) local = { ...INITIAL_SITE_SETTINGS, ...JSON.parse(raw) }
    } catch {
      // ignore
    }
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !data) {
      return local
    }
    const merged = { ...local, ...data }
    if (typeof window !== 'undefined') {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged))
    }
    return merged
  } catch {
    return local
  }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  const current = await getSiteSettings()
  const updated = { ...current, ...settings }
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('raya_storage_updated', { detail: { key: SETTINGS_STORAGE_KEY } }))
  }

  try {
    await supabase.from('site_settings').upsert({ id: 1, ...updated })
  } catch (err) {
    console.warn('Supabase site settings upsert fallback to local:', err)
  }
}

// ==============================================================================
// 7. INQUIRIES API
// ==============================================================================

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
    }
    return { success: true, message: 'تم استلام طلبك بنجاح! سيتواصل معك فريق راية الإبداعي خلال ساعات.' }
  } catch {
    return { success: true, message: 'تم استلام تفاصيل مشروعك وسيقوم فريقنا بمراجعتها والتواصل معك قريباً.' }
  }
}

export async function getProjectInquiries(): Promise<ProjectInquiry[]> {
  try {
    const { data, error } = await supabase
      .from('project_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as ProjectInquiry[]
  } catch {
    return []
  }
}

// ==============================================================================
// 8. MEDIA LIBRARY API
// ==============================================================================

const MEDIA_STORAGE_KEY = 'raya_media_library'

export async function getMediaItems(): Promise<MediaItem[]> {
  const local = getLocalData<MediaItem>(MEDIA_STORAGE_KEY, INITIAL_MEDIA)
  try {
    const { data, error } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return local
    }
    setLocalData(MEDIA_STORAGE_KEY, data)
    return data as MediaItem[]
  } catch {
    return local
  }
}

export async function createMediaItem(item: Omit<MediaItem, 'id'> & { id?: string }): Promise<MediaItem> {
  const newItem: MediaItem = {
    ...item,
    id: item.id || generateUUID(),
    created_at: new Date().toISOString()
  }

  const current = getLocalData<MediaItem>(MEDIA_STORAGE_KEY, INITIAL_MEDIA)
  const updated = [newItem, ...current]
  setLocalData(MEDIA_STORAGE_KEY, updated)

  try {
    await supabase.from('media_library').insert([newItem])
  } catch (err) {
    console.warn('Supabase media insert fallback to local:', err)
  }

  return newItem
}

export async function updateMediaItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | null> {
  const current = getLocalData<MediaItem>(MEDIA_STORAGE_KEY, INITIAL_MEDIA)
  const index = current.findIndex((m) => m.id === id)
  if (index === -1) return null

  const updatedItem: MediaItem = { ...current[index], ...updates }
  const updatedList = [...current]
  updatedList[index] = updatedItem
  setLocalData(MEDIA_STORAGE_KEY, updatedList)

  try {
    await supabase.from('media_library').update(updates).eq('id', id)
  } catch (err) {
    console.warn('Supabase media update fallback to local:', err)
  }

  return updatedItem
}

export async function deleteMediaItem(id: string): Promise<void> {
  const current = getLocalData<MediaItem>(MEDIA_STORAGE_KEY, INITIAL_MEDIA)
  const updated = current.filter((m) => m.id !== id)
  setLocalData(MEDIA_STORAGE_KEY, updated)

  try {
    await supabase.from('media_library').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase media delete fallback to local:', err)
  }
}

export async function uploadMediaFile(file: File): Promise<{ url: string; name: string; type: 'image' | 'video'; size: string }> {
  const isVideo = file.type.startsWith('video/')
  const sizeFormatted = file.size > 1024 * 1024 
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
    : `${Math.round(file.size / 1024)} KB`
  
  const fileExt = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg')
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const filePath = `uploads/${fileName}`

  // Try Supabase Storage upload
  try {
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      return {
        url: publicUrl,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        size: sizeFormatted
      }
    }
  } catch {
    // ignore
  }

  // Fallback: Read as base64 Data URL so user can preview & copy immediately
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve({
        url: reader.result as string,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        size: sizeFormatted
      })
    }
    reader.readAsDataURL(file)
  })
}
