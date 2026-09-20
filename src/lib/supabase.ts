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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// ==============================================================================
// 1. SERVICES CRUD
// ==============================================================================

const SERVICES_STORAGE_KEY = 'raya_services'

export async function getServices(): Promise<Service[]> {
  const local = getLocalData<Service>(SERVICES_STORAGE_KEY, INITIAL_SERVICES)
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.warn('Supabase services query error:', error)
      return local
    }
    if (data) {
      setLocalData(SERVICES_STORAGE_KEY, data)
      return data as Service[]
    }
    return local
  } catch (err) {
    console.warn('Supabase services exception:', err)
    return local
  }
}

export async function createService(service: Omit<Service, 'id'> & { id?: string }): Promise<Service> {
  const newService: Service = {
    ...service,
    id: service.id || generateUUID()
  }

  // Update local storage immediately
  const current = getLocalData<Service>(SERVICES_STORAGE_KEY, INITIAL_SERVICES)
  const updated = [...current, newService]
  setLocalData(SERVICES_STORAGE_KEY, updated)

  // Sync to Supabase
  try {
    await supabase.from('services').insert([newService])
  } catch (err) {
    console.warn('Supabase service insert fallback to local:', err)
  }

  return newService
}

export async function updateService(id: string, updates: Partial<Service>): Promise<void> {
  const current = getLocalData<Service>(SERVICES_STORAGE_KEY, INITIAL_SERVICES)
  const updated = current.map((s) => (s.id === id ? { ...s, ...updates } : s))
  setLocalData(SERVICES_STORAGE_KEY, updated)

  try {
    await supabase.from('services').update(updates).eq('id', id)
  } catch (err) {
    console.warn('Supabase service update fallback to local:', err)
  }
}

export async function deleteService(id: string): Promise<void> {
  const current = getLocalData<Service>(SERVICES_STORAGE_KEY, INITIAL_SERVICES)
  const updated = current.filter((s) => s.id !== id)
  setLocalData(SERVICES_STORAGE_KEY, updated)

  try {
    await supabase.from('services').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase service delete fallback to local:', err)
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices()
  return services.find((s) => s.slug === slug)
}

// ==============================================================================
// 2. PROJECTS & CASE STUDIES CRUD
// ==============================================================================

const PROJECTS_STORAGE_KEY = 'raya_projects'

export async function getProjects(): Promise<Project[]> {
  const local = getLocalData<Project>(PROJECTS_STORAGE_KEY, INITIAL_PROJECTS)
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.warn('Supabase projects query error:', error)
      return local
    }
    if (data) {
      setLocalData(PROJECTS_STORAGE_KEY, data)
      return data as Project[]
    }
    return local
  } catch (err) {
    console.warn('Supabase projects exception:', err)
    return local
  }
}

export async function createProject(project: Omit<Project, 'id'> & { id?: string }): Promise<Project> {
  const newProject: Project = {
    ...project,
    id: project.id || generateUUID()
  }

  const current = getLocalData<Project>(PROJECTS_STORAGE_KEY, INITIAL_PROJECTS)
  const updated = [newProject, ...current]
  setLocalData(PROJECTS_STORAGE_KEY, updated)

  try {
    await supabase.from('projects').insert([newProject])
  } catch (err) {
    console.warn('Supabase project insert fallback to local:', err)
  }

  return newProject
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  const current = getLocalData<Project>(PROJECTS_STORAGE_KEY, INITIAL_PROJECTS)
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p))
  setLocalData(PROJECTS_STORAGE_KEY, updated)

  try {
    await supabase.from('projects').update(updates).eq('id', id)
  } catch (err) {
    console.warn('Supabase project update fallback to local:', err)
  }
}

export async function deleteProject(id: string): Promise<void> {
  const current = getLocalData<Project>(PROJECTS_STORAGE_KEY, INITIAL_PROJECTS)
  const updated = current.filter((p) => p.id !== id)
  setLocalData(PROJECTS_STORAGE_KEY, updated)

  try {
    await supabase.from('projects').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase project delete fallback to local:', err)
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug)
}

// ==============================================================================
// 3. CLIENTS & PARTNERS CRUD
// ==============================================================================

const CLIENTS_STORAGE_KEY = 'raya_clients'

export async function getClients(): Promise<Client[]> {
  const local = getLocalData<Client>(CLIENTS_STORAGE_KEY, INITIAL_CLIENTS)
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.warn('Supabase clients query error:', error)
      return local
    }
    if (data) {
      setLocalData(CLIENTS_STORAGE_KEY, data)
      return data as Client[]
    }
    return local
  } catch (err) {
    console.warn('Supabase clients exception:', err)
    return local
  }
}

export async function createClientRecord(client: Omit<Client, 'id'> & { id?: string }): Promise<Client> {
  const newClient: Client = {
    ...client,
    id: client.id || generateUUID()
  }

  const current = getLocalData<Client>(CLIENTS_STORAGE_KEY, INITIAL_CLIENTS)
  const updated = [...current, newClient]
  setLocalData(CLIENTS_STORAGE_KEY, updated)

  try {
    await supabase.from('clients').insert([newClient])
  } catch (err) {
    console.warn('Supabase client insert fallback to local:', err)
  }

  return newClient
}

export async function updateClientRecord(id: string, updates: Partial<Client>): Promise<void> {
  const current = getLocalData<Client>(CLIENTS_STORAGE_KEY, INITIAL_CLIENTS)
  const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c))
  setLocalData(CLIENTS_STORAGE_KEY, updated)

  try {
    await supabase.from('clients').update(updates).eq('id', id)
  } catch (err) {
    console.warn('Supabase client update fallback to local:', err)
  }
}

export async function deleteClientRecord(id: string): Promise<void> {
  const current = getLocalData<Client>(CLIENTS_STORAGE_KEY, INITIAL_CLIENTS)
  const updated = current.filter((c) => c.id !== id)
  setLocalData(CLIENTS_STORAGE_KEY, updated)

  try {
    await supabase.from('clients').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase client delete fallback to local:', err)
  }
}

// ==============================================================================
// 4. SHOWCASE REELS (9:16) CRUD
// ==============================================================================

const REELS_STORAGE_KEY = 'raya_showcase_reels'

export async function getShowcaseReels(): Promise<ShowcaseReel[]> {
  const local = getLocalData<ShowcaseReel>(REELS_STORAGE_KEY, INITIAL_SHOWCASE_REELS)
  try {
    const { data, error } = await supabase
      .from('showcase_reels')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.warn('Supabase reels query error:', error)
      return local
    }
    if (data) {
      setLocalData(REELS_STORAGE_KEY, data)
      return data as ShowcaseReel[]
    }
    return local
  } catch (err) {
    console.warn('Supabase reels exception:', err)
    return local
  }
}

export async function createShowcaseReel(reel: Omit<ShowcaseReel, 'id'> & { id?: string }): Promise<ShowcaseReel> {
  const newReel: ShowcaseReel = {
    ...reel,
    id: reel.id || generateUUID()
  }

  const current = getLocalData<ShowcaseReel>(REELS_STORAGE_KEY, INITIAL_SHOWCASE_REELS)
  const updated = [...current, newReel]
  setLocalData(REELS_STORAGE_KEY, updated)

  try {
    await supabase.from('showcase_reels').insert([newReel])
  } catch (err) {
    console.warn('Supabase reel insert fallback to local:', err)
  }

  return newReel
}

export async function updateShowcaseReel(id: string, updates: Partial<ShowcaseReel>): Promise<void> {
  const current = getLocalData<ShowcaseReel>(REELS_STORAGE_KEY, INITIAL_SHOWCASE_REELS)
  const updated = current.map((r) => (r.id === id ? { ...r, ...updates } : r))
  setLocalData(REELS_STORAGE_KEY, updated)

  try {
    await supabase.from('showcase_reels').update(updates).eq('id', id)
  } catch (err) {
    console.warn('Supabase reel update fallback to local:', err)
  }
}

export async function deleteShowcaseReel(id: string): Promise<void> {
  const current = getLocalData<ShowcaseReel>(REELS_STORAGE_KEY, INITIAL_SHOWCASE_REELS)
  const updated = current.filter((r) => r.id !== id)
  setLocalData(REELS_STORAGE_KEY, updated)

  try {
    await supabase.from('showcase_reels').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase reel delete fallback to local:', err)
  }
}

// ==============================================================================
// 5. POSTS & INSIGHTS CRUD
// ==============================================================================

const POSTS_STORAGE_KEY = 'raya_posts'

export async function getPosts(): Promise<Post[]> {
  const local = getLocalData<Post>(POSTS_STORAGE_KEY, INITIAL_POSTS)
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase posts query error:', error)
      return local
    }
    if (data) {
      setLocalData(POSTS_STORAGE_KEY, data)
      return data as Post[]
    }
    return local
  } catch (err) {
    console.warn('Supabase posts exception:', err)
    return local
  }
}

export async function createPost(post: Omit<Post, 'id'> & { id?: string }): Promise<Post> {
  const newPost: Post = {
    ...post,
    id: post.id || generateUUID(),
    created_at: new Date().toISOString()
  }

  const current = getLocalData<Post>(POSTS_STORAGE_KEY, INITIAL_POSTS)
  const updated = [newPost, ...current]
  setLocalData(POSTS_STORAGE_KEY, updated)

  try {
    await supabase.from('posts').insert([newPost])
  } catch (err) {
    console.warn('Supabase post insert fallback to local:', err)
  }

  return newPost
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<void> {
  const current = getLocalData<Post>(POSTS_STORAGE_KEY, INITIAL_POSTS)
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p))
  setLocalData(POSTS_STORAGE_KEY, updated)

  try {
    await supabase.from('posts').update(updates).eq('id', id)
  } catch (err) {
    console.warn('Supabase post update fallback to local:', err)
  }
}

export async function deletePost(id: string): Promise<void> {
  const current = getLocalData<Post>(POSTS_STORAGE_KEY, INITIAL_POSTS)
  const updated = current.filter((p) => p.id !== id)
  setLocalData(POSTS_STORAGE_KEY, updated)

  try {
    await supabase.from('posts').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase post delete fallback to local:', err)
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug)
}

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
