import React, { useState, useEffect, useRef } from 'react'
import { 
  getMediaItems, 
  createMediaItem, 
  updateMediaItem, 
  deleteMediaItem, 
  uploadMediaFile 
} from '../../../lib/supabase'
import { MediaItem } from '../../../lib/types'
import { INITIAL_MEDIA } from '../../../data/initialData'
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Search, 
  Plus, 
  X
} from 'lucide-react'
import { VideoModal } from '../../../components/ui/VideoModal'
import { AdminGridSkeleton } from '../../../components/ui/skeleton'
import { EmptyState } from '../../../components/common/EmptyState'
import { AdminMediaUrlForm } from '../components/AdminMediaUrlForm'
import { AdminMediaSeoEditor } from '../components/AdminMediaSeoEditor'
import { AdminMediaCard } from '../components/AdminMediaCard'

export const AdminMediaPage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA)
  const [loading, setLoading] = useState<boolean>(true)
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Navigation State: 'list' | 'add_url' | 'edit_seo'
  const [viewMode, setViewMode] = useState<'list' | 'add_url' | 'edit_seo'>('list')
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null)
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadData = async () => {
    try {
      const data = await getMediaItems()
      if (data) setMedia(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const uploaded = await uploadMediaFile(file)
        const cleanName = uploaded.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        await createMediaItem({
          name: cleanName,
          file_url: uploaded.url,
          file_type: uploaded.type,
          file_size: uploaded.size,
          folder: uploaded.type === 'video' ? 'videos' : 'images',
          alt_text: cleanName,
          keywords: 'راية, إنتاج إبداعي'
        })
      }
      await loadData()
    } catch (err) {
      console.error('File upload error:', err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAddUrl = async (data: {
    name: string
    url: string
    type: 'image' | 'video'
    folder: string
    alt_text: string
    keywords: string
  }) => {
    if (!data.url.trim()) return

    await createMediaItem({
      name: data.name || 'ملف وسائط جديد',
      file_url: data.url,
      file_type: data.type,
      file_size: 'رابط خارجي',
      folder: data.folder,
      alt_text: data.alt_text || data.name,
      keywords: data.keywords
    })

    setViewMode('list')
    await loadData()
  }

  const handleOpenSeo = (item: MediaItem) => {
    setEditingMedia(item)
    setViewMode('edit_seo')
  }

  const handleSaveSeo = async (data: Partial<MediaItem>) => {
    if (!editingMedia) return
    await updateMediaItem(editingMedia.id, data)
    setEditingMedia(null)
    setViewMode('list')
    await loadData()
  }

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف الملف «${name}» من مكتبة الوسائط؟`)) {
      await deleteMediaItem(id)
      await loadData()
    }
  }

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.file_url)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Filtering
  const filteredMedia = media.filter((item) => {
    if (filterType !== 'all' && item.file_type !== filterType) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        item.name.toLowerCase().includes(q) ||
        (item.alt_text && item.alt_text.toLowerCase().includes(q)) ||
        (item.keywords && item.keywords.toLowerCase().includes(q)) ||
        item.file_url.toLowerCase().includes(q)
      )
    }
    return true
  })

  // VIEW 1: ADD URL SCREEN
  if (viewMode === 'add_url') {
    return (
      <AdminMediaUrlForm
        onSubmit={handleAddUrl}
        onCancel={() => setViewMode('list')}
      />
    )
  }

  // VIEW 2: EDIT SEO & METADATA SCREEN
  if (viewMode === 'edit_seo' && editingMedia) {
    return (
      <AdminMediaSeoEditor
        media={editingMedia}
        copiedId={copiedId}
        onCopyUrl={handleCopyUrl}
        onSave={handleSaveSeo}
        onCancel={() => {
          setEditingMedia(null)
          setViewMode('list')
        }}
      />
    )
  }

  // VIEW 3: LIST / GRID VIEW
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              مكتبة الوسائط وسيو الصور (Media SEO)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            إدارة الصور والفيديوهات مع ضبط نصوص الـ Alt والبيانات الوصفية لمحركات البحث.
          </p>
        </div>

        {/* Upload & Add Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="media-upload-input"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4 text-[#C5A880]" />
            <span>{uploading ? 'جاري الرفع...' : 'رفع من جهازك'}</span>
          </button>

          <button
            onClick={() => setViewMode('add_url')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#EAE4D9] border border-[#E5DFD3] text-[#12372A] text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#8C6D46]" />
            <span>إضافة رابط مباشر</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5DFD3]">
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'text-[#12372A] hover:bg-white/60'
            }`}
          >
            جميع الوسائط ({media.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'image'
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'text-[#12372A] hover:bg-white/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>صور ({media.filter((m) => m.file_type === 'image').length})</span>
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterType === 'video'
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'text-[#12372A] hover:bg-white/60'
            }`}
          >
            <VideoIcon className="w-3.5 h-3.5" />
            <span>فيديوهات ({media.filter((m) => m.file_type === 'video').length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، Alt Text، أو الكلمات المفتاحية..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E5DFD3] text-xs focus:border-[#12372A] focus:outline-none bg-[#FAF7F2]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <AdminGridSkeleton count={10} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <AdminMediaCard
              key={item.id}
              item={item}
              copiedId={copiedId}
              onPreview={setPreviewMedia}
              onOpenSeo={handleOpenSeo}
              onCopyUrl={handleCopyUrl}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {filteredMedia.length === 0 && (
        <EmptyState
          icon={ImageIcon}
          title="لم يتم العثور على وسائط مطابقة"
          description="جرب تغيير شروط البحث أو قم برفع ملفات جديدة إلى المكتبة."
          actionLabel="رفع ملفات جديدة"
          onAction={() => fileInputRef.current?.click()}
        />
      )}

      {/* Video / Image Preview Lightbox */}
      {previewMedia && (
        previewMedia.file_type === 'video' ? (
          <VideoModal
            isOpen={!!previewMedia}
            onClose={() => setPreviewMedia(null)}
            videoUrl={previewMedia.file_url}
            title={previewMedia.name}
            aspectRatio="16:9"
          />
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-[#E5DFD3] shadow-2xl max-w-3xl w-full overflow-hidden">
              <div className="p-4 bg-[#0B221A] text-[#F4EFE6] flex items-center justify-between">
                <span className="text-sm font-bold text-white">{previewMedia.name}</span>
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="p-1 rounded-lg text-white hover:bg-white/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 bg-[#FAF7F2] max-h-[70vh] flex items-center justify-center overflow-auto">
                <img
                  src={previewMedia.file_url}
                  alt={previewMedia.alt_text || previewMedia.name}
                  className="max-h-[60vh] max-w-full rounded-xl object-contain shadow-md"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#E5DFD3] flex items-center justify-between">
                <span className="text-xs font-mono text-[#6b7f74] truncate max-w-md">
                  {previewMedia.file_url}
                </span>
                <button
                  onClick={() => handleCopyUrl(previewMedia)}
                  className="px-4 py-2 rounded-xl bg-[#12372A] text-[#F3D7A4] text-xs font-bold cursor-pointer"
                >
                  {copiedId === previewMedia.id ? 'تم نسخ الرابط!' : 'نسخ الرابط'}
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
