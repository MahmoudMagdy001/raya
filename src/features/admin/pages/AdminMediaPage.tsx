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
  Trash2, 
  Copy, 
  Check, 
  Play, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Search, 
  Plus, 
  X,
  Edit3,
  Globe,
  Eye,
  Tag,
  Info,
  ArrowRight,
  Save
} from 'lucide-react'
import { VideoModal } from '../../../components/ui/VideoModal'
import { AdminGridSkeleton } from '../../../components/ui/skeleton'

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

  // Direct URL form state
  const [urlFormData, setUrlFormData] = useState({
    name: '',
    url: '',
    type: 'image' as 'image' | 'video',
    folder: 'general',
    alt_text: '',
    keywords: ''
  })

  // SEO Edit form state
  const [seoFormData, setSeoFormData] = useState<Partial<MediaItem>>({
    name: '',
    alt_text: '',
    caption: '',
    description: '',
    keywords: '',
    dimensions: ''
  })

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

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlFormData.url.trim()) return

    await createMediaItem({
      name: urlFormData.name || 'ملف وسائط جديد',
      file_url: urlFormData.url,
      file_type: urlFormData.type,
      file_size: 'رابط خارجي',
      folder: urlFormData.folder,
      alt_text: urlFormData.alt_text || urlFormData.name,
      keywords: urlFormData.keywords
    })

    setViewMode('list')
    setUrlFormData({ name: '', url: '', type: 'image', folder: 'general', alt_text: '', keywords: '' })
    await loadData()
  }

  const handleOpenSeo = (item: MediaItem) => {
    setEditingMedia(item)
    setSeoFormData({
      name: item.name,
      alt_text: item.alt_text || '',
      caption: item.caption || '',
      description: item.description || '',
      keywords: item.keywords || '',
      dimensions: item.dimensions || ''
    })
    setViewMode('edit_seo')
  }

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMedia) return
    await updateMediaItem(editingMedia.id, seoFormData)
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

  // ============================================================================
  // VIEW 1: ADD URL SCREEN (In-place screen, NOT a modal)
  // ============================================================================
  if (viewMode === 'add_url') {
    return (
      <div className="space-y-6 max-w-4xl animate-fadeIn">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#E5DFD3] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#12372A] text-[#12372A] hover:text-[#F3D7A4] transition-colors cursor-pointer"
              title="العودة لمكتبة الوسائط"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
                <span>مكتبة الوسائط</span>
                <span>/</span>
                <span className="text-[#12372A] font-bold">إضافة رابط وسائط مباشر</span>
              </div>
              <h2 className="text-xl font-black text-[#12372A]">إضافة ملف خارجي وضبط بيانات السيو</h2>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleAddUrl} className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                اسم الملف أو العنوان التوضيحي *
              </label>
              <input
                type="text"
                required
                value={urlFormData.name}
                onChange={(e) => setUrlFormData({ ...urlFormData, name: e.target.value })}
                placeholder="مثال: غلاف إعلان راية الرئيسي"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                نوع الملف *
              </label>
              <select
                value={urlFormData.type}
                onChange={(e) => setUrlFormData({ ...urlFormData, type: e.target.value as 'image' | 'video' })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
              >
                <option value="image">صورة (Image)</option>
                <option value="video">فيديو (Video)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              الرابط المباشر للملف (Direct File URL) *
            </label>
            <input
              type="url"
              required
              value={urlFormData.url}
              onChange={(e) => setUrlFormData({ ...urlFormData, url: e.target.value })}
              placeholder="https://images.unsplash.com/... أو رابط mp4 مباشر"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left font-mono"
              dir="ltr"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                النص البديل لمحركات البحث (Alt Text)
              </label>
              <input
                type="text"
                value={urlFormData.alt_text}
                onChange={(e) => setUrlFormData({ ...urlFormData, alt_text: e.target.value })}
                placeholder="وصف الصورة لمحركات البحث وقارئات الشاشة..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
              <p className="text-[10px] text-[#6b7f74] mt-1">يساعد الصورة في تصدر نتائج بحث Google Images.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                الكلمات المفتاحية (Keywords)
              </label>
              <input
                type="text"
                value={urlFormData.keywords}
                onChange={(e) => setUrlFormData({ ...urlFormData, keywords: e.target.value })}
                placeholder="ريلز, تصوير سينمائي, الرياض"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
              <p className="text-[10px] text-[#6b7f74] mt-1">افصل بين الكلمات بفاصلة.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-6 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 transition-colors cursor-pointer"
            >
              إلغاء والعودة
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-black shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة الملف للمكتبة</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // ============================================================================
  // VIEW 2: EDIT SEO & METADATA SCREEN (In-place screen, NOT a modal)
  // ============================================================================
  if (viewMode === 'edit_seo' && editingMedia) {
    return (
      <div className="space-y-6 max-w-5xl animate-fadeIn">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#E5DFD3] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingMedia(null)
                setViewMode('list')
              }}
              className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#12372A] text-[#12372A] hover:text-[#F3D7A4] transition-colors cursor-pointer"
              title="العودة لمكتبة الوسائط"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
                <span>مكتبة الوسائط</span>
                <span>/</span>
                <span className="text-[#12372A] font-bold">تعديل بيانات وسيو الملف</span>
              </div>
              <h2 className="text-xl font-black text-[#12372A]">
                تعديل سيو وبيانات: {editingMedia.name}
              </h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#12372A]/10 text-[#12372A] uppercase">
            {editingMedia.file_type}
          </span>
        </div>

        {/* Main Editor Grid */}
        <form onSubmit={handleSaveSeo} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Media Preview & Google Images Simulator */}
          <div className="space-y-5">
            {/* Visual Preview */}
            <div className="bg-white p-4 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#12372A] block">معاينة الملف</span>
              <div className="aspect-square w-full rounded-2xl bg-[#FAF7F2] overflow-hidden flex items-center justify-center relative border border-[#E5DFD3]">
                {editingMedia.file_type === 'video' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#0B221A] text-[#F3D7A4]">
                    <Play className="w-12 h-12 mb-2 opacity-80" />
                    <span className="text-xs font-bold text-[#b9d5c7]">ملف فيديو</span>
                  </div>
                ) : (
                  <img
                    src={editingMedia.file_url}
                    alt={seoFormData.alt_text || editingMedia.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Copy URL Box */}
              <div className="pt-2">
                <span className="text-[10px] text-[#6b7f74] block mb-1">الرابط المباشر:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={editingMedia.file_url}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E5DFD3] text-[11px] font-mono bg-[#FAF7F2] text-slate-600 truncate"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(editingMedia)}
                    className="p-2 rounded-xl bg-[#12372A] text-[#F3D7A4] hover:bg-[#205341] transition-colors cursor-pointer shrink-0"
                    title="نسخ الرابط"
                  >
                    {copiedId === editingMedia.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* File Specs */}
              <div className="pt-3 border-t border-[#E5DFD3] grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#6b7f74] block">الحجم:</span>
                  <span className="font-mono font-bold text-[#12372A]">{editingMedia.file_size || 'غير محدد'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6b7f74] block">المجلد:</span>
                  <span className="font-bold text-[#12372A]">{editingMedia.folder || 'general'}</span>
                </div>
              </div>
            </div>

            {/* Google Images Result Simulator */}
            <div className="bg-white p-4 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#12372A]">
                <Eye className="w-4 h-4 text-[#8C6D46]" />
                <span>محاكاة الظهور في Google Images</span>
              </div>
              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={editingMedia.file_url}
                    alt={seoFormData.alt_text || editingMedia.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden leading-tight flex-1">
                  <div className="text-[10px] text-slate-500 font-mono">raya.sa • {seoFormData.dimensions || '1920×1080'}</div>
                  <div className="text-xs font-bold text-[#1a0dab] truncate">
                    {seoFormData.alt_text || seoFormData.name || 'عنوان الصورة في بحث جوجل'}
                  </div>
                  <p className="text-[10px] text-slate-600 line-clamp-1 mt-0.5">
                    {seoFormData.description || 'صورة من أرشيف راية للإنتاج والتسويق الإبداعي.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: SEO Fields Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#E5DFD3]">
              <Globe className="w-5 h-5 text-[#8C6D46]" />
              <h3 className="text-base font-bold text-[#12372A]">بيانات تحسين محركات البحث وسيو الصور</h3>
            </div>

            {/* Alt Text */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-[#12372A] flex items-center gap-1.5">
                  <span>النص البديل لمحركات البحث (Alt Text) *</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    العنصر الأكثر أهمية
                  </span>
                </label>
                <span className="text-[10px] text-slate-500">
                  {(seoFormData.alt_text || '').length} حرف
                </span>
              </div>
              <input
                type="text"
                required
                value={seoFormData.alt_text || ''}
                onChange={(e) => setSeoFormData({ ...seoFormData, alt_text: e.target.value })}
                placeholder="اكتب وصفاً دقيقاً لما تحتويه الصورة لمحركات البحث وقارئات الشاشة..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
              <p className="text-[11px] text-[#6b7f74] mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#8C6D46]" />
                <span>تقوم خوارزمية Google بتصنيف وأرشفة الصور اعتماداً على هذا الحقل.</span>
              </p>
            </div>

            {/* Name & Caption */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  اسم الملف التوضيحي (Title)
                </label>
                <input
                  type="text"
                  value={seoFormData.name || ''}
                  onChange={(e) => setSeoFormData({ ...seoFormData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  التسمية التوضيحية (Caption)
                </label>
                <input
                  type="text"
                  value={seoFormData.caption || ''}
                  onChange={(e) => setSeoFormData({ ...seoFormData, caption: e.target.value })}
                  placeholder="شرح يظهر أسفل الصورة في المعارض..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                />
              </div>
            </div>

            {/* Focus Keywords */}
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#8C6D46]" />
                <span>الكلمات المفتاحية والوسوم (SEO Keywords)</span>
              </label>
              <input
                type="text"
                value={seoFormData.keywords || ''}
                onChange={(e) => setSeoFormData({ ...seoFormData, keywords: e.target.value })}
                placeholder="مثال: تصوير إعلاني، ريلز، عطور، الرياض، إنتاج سينمائي"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
              <p className="text-[10px] text-[#6b7f74] mt-1">افصل بين الكلمات المفتاحية بفاصلة.</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                الوصف المفصل (Extended Description)
              </label>
              <textarea
                rows={3}
                value={seoFormData.description || ''}
                onChange={(e) => setSeoFormData({ ...seoFormData, description: e.target.value })}
                placeholder="تفاصيل إضافية عن كواليس الإنتاج وسياق استخدام هذا الملف..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none resize-y"
              />
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                الأبعاد والدقة (Dimensions)
              </label>
              <input
                type="text"
                value={seoFormData.dimensions || ''}
                onChange={(e) => setSeoFormData({ ...seoFormData, dimensions: e.target.value })}
                placeholder="مثال: 1920x1080 أو 1080x1920"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none font-mono text-left"
                dir="ltr"
              />
            </div>

            {/* Form Footer Action Buttons */}
            <div className="pt-6 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingMedia(null)
                  setViewMode('list')
                }}
                className="px-6 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 transition-colors cursor-pointer"
              >
                إلغاء والعودة
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-black shadow-md cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>حفظ بيانات السيو والتعديلات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // ============================================================================
  // VIEW 3: LIST / GRID VIEW
  // ============================================================================
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
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
            {/* Thumbnail Preview Area */}
            <div
              onClick={() => setPreviewMedia(item)}
              className="aspect-square w-full bg-[#FAF7F2] relative overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {item.file_type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0B221A] text-[#F3D7A4]">
                  <Play className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold mt-1 text-[#b9d5c7]">معاينة فيديو</span>
                </div>
              ) : (
                <img
                  src={item.file_url}
                  alt={item.alt_text || item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80'
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-bold text-white uppercase backdrop-blur-xs">
                  {item.file_type}
                </span>
                {item.dimensions && (
                  <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[8px] font-mono text-white/90 backdrop-blur-xs">
                    {item.dimensions}
                  </span>
                )}
              </div>

              {item.file_size && (
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-mono text-white/80">
                  {item.file_size}
                </span>
              )}
            </div>

            {/* Title & SEO Metadata Status Bar */}
            <div className="p-2.5 bg-white space-y-2">
              <div>
                <span className="text-xs font-bold text-[#12372A] block truncate" title={item.name}>
                  {item.name}
                </span>

                {/* Alt Text Status */}
                <div className="mt-1">
                  {item.alt_text ? (
                    <span 
                      className="inline-block max-w-full truncate text-[9px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded"
                      title={`النص البديل: ${item.alt_text}`}
                    >
                      Alt: {item.alt_text}
                    </span>
                  ) : (
                    <span className="inline-block text-[9px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      ⚠️ بدون Alt Text (يحتاج سيو)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5DFD3]">
                <div className="flex items-center gap-1">
                  {/* Open In-Place SEO Edit Screen */}
                  <button
                    onClick={() => handleOpenSeo(item)}
                    className="p-1.5 rounded-lg text-[#12372A] bg-[#FAF7F2] hover:bg-[#12372A] hover:text-[#F3D7A4] transition-colors cursor-pointer"
                    title="تعديل بيانات السيو والنص البديل في شاشة مخصصة"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyUrl(item)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      copiedId === item.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#FAF7F2] text-[#12372A] hover:bg-[#12372A] hover:text-[#F3D7A4]'
                    }`}
                    title="نسخ الرابط المباشر"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>منسوخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {filteredMedia.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-[#E5DFD3] text-center space-y-3">
          <ImageIcon className="w-10 h-10 text-[#8C6D46] mx-auto" />
          <h3 className="text-base font-bold text-[#12372A]">لم يتم العثور على وسائط مطابقة</h3>
          <p className="text-xs text-[#6b7f74]">جرب تغيير شروط البحث أو قم برفع ملفات جديدة.</p>
        </div>
      )}

      {/* Video Preview Lightbox */}
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
