import React, { useState, useEffect } from 'react'
import { getPosts, createPost, updatePost, deletePost } from '../../../lib/supabase'
import { Post } from '../../../lib/types'
import { INITIAL_POSTS } from '../../../data/initialData'
import { ImagePickerField } from '../components/ImagePickerField'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  Clock, 
  Eye, 
  ArrowRight,
  X
} from 'lucide-react'
import { SeoFormFields } from '../components/SeoFormFields'

export const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    author: 'فريق راية الإبداعي',
    category: 'صناعة المحتوى',
    tags: ['تسويق', 'فيديو'],
    reading_time: 4,
    views_count: 0,
    status: 'published'
  })

  // Tag input
  const [tagInput, setTagInput] = useState('')

  const loadData = async () => {
    const data = await getPosts()
    if (data) setPosts(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenAdd = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      author: 'فريق راية الإبداعي',
      category: 'صناعة المحتوى',
      tags: ['إنتاج إبداعي', 'تسويق'],
      reading_time: 4,
      views_count: 0,
      status: 'published',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      canonical_url: '',
      og_image: '',
      no_index: false
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      ...post,
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image: post.cover_image || '',
      author: post.author || 'فريق راية الإبداعي',
      category: post.category || 'صناعة المحتوى',
      tags: Array.isArray(post.tags) ? post.tags : (typeof post.tags === 'string' ? [post.tags] : []),
      reading_time: post.reading_time || 4,
      views_count: post.views_count || 0,
      status: post.status || 'published',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      canonical_url: post.canonical_url || '',
      og_image: post.og_image || '',
      no_index: !!post.no_index
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddTag = () => {
    if (!tagInput.trim()) return
    const current = Array.isArray(formData.tags) ? formData.tags : []
    setFormData({ ...formData, tags: [...current, tagInput.trim()] })
    setTagInput('')
  }

  const handleRemoveTag = (index: number) => {
    const current = Array.isArray(formData.tags) ? formData.tags : []
    setFormData({ ...formData, tags: current.filter((_, i) => i !== index) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    const slug = formData.slug?.trim() || `post-${Date.now()}`

    if (editingPost) {
      await updatePost(editingPost.id, {
        ...formData,
        slug
      })
    } else {
      await createPost({
        title: formData.title || '',
        slug,
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        cover_image: formData.cover_image || '',
        author: formData.author || 'فريق راية الإبداعي',
        category: formData.category || 'صناعة المحتوى',
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        reading_time: formData.reading_time || 4,
        views_count: formData.views_count || 0,
        status: formData.status || 'published',
        meta_title: formData.meta_title || '',
        meta_description: formData.meta_description || '',
        meta_keywords: formData.meta_keywords || '',
        canonical_url: formData.canonical_url || '',
        og_image: formData.og_image || '',
        no_index: !!formData.no_index
      })
    }

    setModalOpen(false)
    await loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مقال «${title}»؟`)) {
      await deletePost(id)
      await loadData()
    }
  }

  const toggleStatus = async (post: Post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    await updatePost(post.id, { status: newStatus })
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
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              إدارة المقالات والنشرات الفكرية
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            كتابة ونشر مقالات المدونة، التحليلات، ورؤى صناعة المحتوى والتسويق لراية.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>إضافة مقال جديد</span>
        </button>
      </div>

      {/* Posts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-[#E5DFD3] hover:border-[#C5A880] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-48 w-full bg-[#0B221A] overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-black/20 to-transparent" />
                
                {/* Top Category and Status */}
                <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#12372A]/90 text-[#F3D7A4] border border-[#E5C378]/30 backdrop-blur-md">
                    {post.category}
                  </span>
                  <button
                    onClick={() => toggleStatus(post)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                      post.status === 'published'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {post.status === 'published' ? 'منشور' : 'مسودة'}
                  </button>
                </div>

                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white/80 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{post.reading_time || 4} دقيقة قراءة</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{post.views_count || 0} مشاهدة</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <span className="text-[10px] font-bold text-[#8C6D46] block mb-1 font-mono">
                  بقلم: {post.author}
                </span>
                <h3 className="text-lg font-bold text-[#12372A] leading-snug line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[#526D60] line-clamp-2 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E5DFD3]">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-bold text-[#12372A] border border-[#E5DFD3]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#E5DFD3] flex items-center justify-between">
              <span className="text-[11px] text-[#8C6D46] font-medium">
                {new Date(post.created_at || Date.now()).toLocaleDateString('ar-SA')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs text-xs font-bold"
                  title="تعديل المقال"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>تعديل</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-500 hover:text-white text-rose-600 transition-all cursor-pointer shadow-xs"
                  title="حذف المقال"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      {/* Top In-Place Header with Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs"
            title="الرجوع لقائمة المقالات"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
              <span>المدونة والمقالات</span>
              <span>/</span>
              <span className="text-[#12372A] font-bold">
                {editingPost ? `تعديل: ${editingPost.title}` : 'كتابة مقال جديد'}
              </span>
            </div>
            <h2 className="text-xl font-black text-[#12372A]">
              {editingPost ? 'تعديل بيانات المقال والنشر' : 'كتابة ونشر مقال جديد'}
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

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    عنوان المقال *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: هندسة الـ Hook في أول 3 ثوانٍ"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    الرابط اللطيف (Slug) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="the-3-second-hook"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    التصنيف
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="صناعة المحتوى / استراتيجيات"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    الكاتب
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="فريق راية الإبداعي"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    وقت القراءة (دقائق)
                  </label>
                  <input
                    type="number"
                    value={formData.reading_time ?? 4}
                    onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) || 4 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
              </div>

              <ImagePickerField
                label="صورة الغلاف (Cover Image) *"
                value={formData.cover_image || ''}
                onChange={(url) => setFormData({ ...formData, cover_image: url })}
                required
                hint="الحجم الأمثل: 1200 × 630 بكسل للظهور في السيو والتواصل الاجتماعي"
              />

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  المقدمة المختصرة (Excerpt) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="نبذة سريعة تظهر في بطاقة المقال..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  المحتوى الكامل للمقال *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="اكتب المحتوى الكامل للمقال هنا..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                />
              </div>

              {/* Tags Manager */}
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  الوسوم والكلمات المفتاحية (Tags)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    placeholder="أدخل وسماً واضغط Enter"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-xs focus:border-[#12372A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-[#12372A] text-[#F3D7A4] text-xs font-bold cursor-pointer hover:bg-[#205341]"
                  >
                    + إضافة
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-2 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3]">
                  {formData.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DFD3] text-xs text-[#12372A]"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="p-0.5 hover:text-rose-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* SEO Specialist Section */}
              <SeoFormFields
                metaTitle={formData.meta_title}
                onChangeMetaTitle={(val) => setFormData({ ...formData, meta_title: val })}
                metaDescription={formData.meta_description}
                onChangeMetaDescription={(val) => setFormData({ ...formData, meta_description: val })}
                metaKeywords={formData.meta_keywords}
                onChangeMetaKeywords={(val) => setFormData({ ...formData, meta_keywords: val })}
                canonicalUrl={formData.canonical_url}
                onChangeCanonicalUrl={(val) => setFormData({ ...formData, canonical_url: val })}
                ogImage={formData.og_image}
                onChangeOgImage={(val) => setFormData({ ...formData, og_image: val })}
                noIndex={formData.no_index}
                onChangeNoIndex={(val) => setFormData({ ...formData, no_index: val })}
                fallbackTitle={formData.title || ''}
                fallbackDescription={formData.excerpt || ''}
                fallbackImage={formData.cover_image}
                urlSlug={formData.slug || ''}
                pathPrefix="/posts/"
              />

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
                  {editingPost ? 'حفظ التعديلات' : 'نشر المقال الآن'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    )
  }
