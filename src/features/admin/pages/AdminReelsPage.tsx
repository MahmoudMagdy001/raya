import React, { useState, useEffect } from 'react'
import { getShowcaseReels, createShowcaseReel, updateShowcaseReel, deleteShowcaseReel } from '../../../lib/supabase'
import { ShowcaseReel } from '../../../lib/types'
import { ImagePickerField } from '../components/ImagePickerField'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Video, 
  Play, 
  ArrowRight, 
  Eye
} from 'lucide-react'
import { VideoModal } from '../../../components/ui/VideoModal'
import { AdminGridSkeleton } from '../../../components/ui/skeleton'

export const AdminReelsPage: React.FC = () => {
  const [reels, setReels] = useState<ShowcaseReel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingReel, setEditingReel] = useState<ShowcaseReel | null>(null)
  const [previewVideo, setPreviewVideo] = useState<{ url: string; title: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<ShowcaseReel>>({
    title: '',
    slug: '',
    client_name: '',
    platform: 'instagram',
    video_url: '',
    thumbnail_url: '',
    duration_seconds: 30,
    views_label: '1.5M مشاهدة',
    likes_count: 50000,
    display_order: 1,
    status: 'published'
  })

  const loadData = async () => {
    try {
      const data = await getShowcaseReels()
      if (data) setReels(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenAdd = () => {
    setEditingReel(null)
    setFormData({
      title: '',
      slug: '',
      client_name: '',
      platform: 'instagram',
      video_url: '',
      thumbnail_url: '',
      duration_seconds: 30,
      views_label: '1.5M مشاهدة',
      likes_count: 50000,
      display_order: reels.length + 1,
      status: 'published'
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenEdit = (reel: ShowcaseReel) => {
    setEditingReel(reel)
    setFormData({
      ...reel,
      title: reel.title || '',
      slug: reel.slug || '',
      client_name: reel.client_name || '',
      platform: reel.platform || 'instagram',
      video_url: reel.video_url || '',
      thumbnail_url: reel.thumbnail_url || '',
      duration_seconds: reel.duration_seconds || 30,
      views_label: reel.views_label || '',
      likes_count: reel.likes_count || 0,
      display_order: reel.display_order || 1,
      status: reel.status || 'published'
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    const slug = formData.slug?.trim() || `reel-${Date.now()}`

    if (editingReel) {
      await updateShowcaseReel(editingReel.id, {
        ...formData,
        slug
      })
    } else {
      await createShowcaseReel({
        title: formData.title || '',
        slug,
        client_name: formData.client_name || '',
        platform: formData.platform || 'instagram',
        video_url: formData.video_url || '',
        thumbnail_url: formData.thumbnail_url || '',
        duration_seconds: formData.duration_seconds || 30,
        views_label: formData.views_label || '1.0M مشاهدة',
        likes_count: formData.likes_count || 10000,
        display_order: formData.display_order || reels.length + 1,
        status: formData.status || 'published'
      })
    }

    setModalOpen(false)
    await loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مقطع الريلز «${title}»؟`)) {
      await deleteShowcaseReel(id)
      await loadData()
    }
  }

  const toggleStatus = async (reel: ShowcaseReel) => {
    const newStatus = reel.status === 'published' ? 'draft' : 'published'
    await updateShowcaseReel(reel.id, { status: newStatus })
    await loadData()
  }

  return (
    <div className="space-y-6">
      {!modalOpen ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
              <Video className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              إدارة شريط الشووريل والريلز (9:16)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            التحكم في المقاطع الرأسية المعروضة في شريط العرض اللانهائي المتدفق بالصفحة الرئيسية.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>إضافة مقطع ريلز جديد</span>
        </button>
      </div>

      {/* Reels Cards Grid */}
      {loading ? (
        <AdminGridSkeleton count={5} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] hover:border-[#C5A880] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
            {/* Visual 9:16 Aspect ratio container */}
            <div className="relative aspect-[9/16] bg-[#0B221A] overflow-hidden">
              <img
                src={reel.thumbnail_url}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-black/20 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#C5A880]" />
                  <span>{reel.views_label}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#12372A]/80 text-[#C5A880] text-[10px] font-bold uppercase">
                  {reel.platform}
                </span>
              </div>

              {/* Center Play Button to Preview */}
              <button
                type="button"
                onClick={() => setPreviewVideo({ url: reel.video_url, title: reel.title })}
                className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-[#C5A880] text-[#12372A] flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-[#12372A] translate-x-0.5" />
                </div>
              </button>

              {/* Bottom Info inside thumb */}
              <div className="absolute bottom-2.5 right-2.5 left-2.5 text-right">
                {reel.client_name && (
                  <span className="text-[10px] font-bold text-[#C5A880] block truncate">
                    {reel.client_name}
                  </span>
                )}
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {reel.title}
                </h4>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-3 bg-white border-t border-[#E5DFD3] flex items-center justify-between">
              <button
                onClick={() => toggleStatus(reel)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                  reel.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {reel.status === 'published' ? 'منشور' : 'مسودة'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(reel)}
                  className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-colors cursor-pointer"
                  title="تعديل"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(reel.id, reel.title)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 transition-colors cursor-pointer"
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
    </>
  ) : (
    <>
      {/* Top In-Place Header with Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs"
            title="الرجوع لقائمة مقاطع الريلز"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
              <span>شريط الشووريل والريلز</span>
              <span>/</span>
              <span className="text-[#12372A] font-bold">
                {editingReel ? `تعديل: ${editingReel.title}` : 'إضافة ريلز جديد'}
              </span>
            </div>
            <h2 className="text-xl font-black text-[#12372A]">
              {editingReel ? 'تعديل مقطع الريلز' : 'إضافة مقطع ريلز جديد (9:16)'}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 cursor-pointer transition-colors"
        >
          إلغاء والرجوع
        </button>
      </div>

      {/* In-Place Form Card */}
      <div className="bg-white rounded-3xl border border-[#E5DFD3] shadow-xs overflow-hidden max-w-2xl">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  عنوان المقطع *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: إعلان عطر «سمو» — سحر الأصالة"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    العميل أو العلامة التجارية
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="مثال: دار سمو للعطور"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    المنصة المستهدفة
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                  >
                    <option value="instagram">Instagram Reels</option>
                    <option value="tiktok">TikTok</option>
                    <option value="shorts">YouTube Shorts</option>
                    <option value="snapchat">Snapchat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  رابط الفيديو (Video MP4 URL) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://assets.mixkit.co/...mp4"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                  dir="ltr"
                />
              </div>

              <ImagePickerField
                label="صورة الغلاف المصغرة (Thumbnail) *"
                value={formData.thumbnail_url || ''}
                onChange={(url) => setFormData({ ...formData, thumbnail_url: url })}
                required
                hint="الحجم الأمثل: 600 × 1080 بكسل (9:16 عمودي)"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    نص المشاهدات (Views Label)
                  </label>
                  <input
                    type="text"
                    value={formData.views_label}
                    onChange={(e) => setFormData({ ...formData, views_label: e.target.value })}
                    placeholder="2.4M مشاهدة"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    عدد الإعجابات (Likes)
                  </label>
                  <input
                    type="number"
                    value={formData.likes_count}
                    onChange={(e) => setFormData({ ...formData, likes_count: parseInt(e.target.value) || 0 })}
                    placeholder="140000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    الترتيب (Order)
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  {editingReel ? 'حفظ التعديلات' : 'إضافة الريلز الآن'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <VideoModal
          isOpen={!!previewVideo}
          onClose={() => setPreviewVideo(null)}
          videoUrl={previewVideo.url}
          title={previewVideo.title}
          aspectRatio="9:16"
        />
      )}
    </div>
  )
}
