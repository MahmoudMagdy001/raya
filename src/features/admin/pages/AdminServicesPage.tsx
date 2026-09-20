import React, { useState, useEffect } from 'react'
import { getServices, createService, updateService, deleteService } from '../../../lib/supabase'
import { Service } from '../../../lib/types'
import { INITIAL_SERVICES } from '../../../data/initialData'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  ExternalLink,
  ArrowRight
} from 'lucide-react'
import { SeoFormFields } from '../components/SeoFormFields'
import { ImagePickerField } from '../components/ImagePickerField'

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [activeFilter, setActiveFilter] = useState<'all' | 'creative' | 'tech'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  // Form State
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    full_content: '',
    badge: 'خدمة حصرية',
    category: 'creative',
    icon_name: 'Film',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    deliverables: [],
    status: 'published',
    display_order: 1
  })

  // Tag input for deliverables
  const [newDeliverable, setNewDeliverable] = useState('')

  const loadData = async () => {
    const data = await getServices()
    if (data) setServices(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenAdd = () => {
    setEditingService(null)
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      full_content: '',
      badge: 'جديد',
      category: 'creative',
      icon_name: 'Film',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      deliverables: ['تسليم بجودة 4K فائقة الدقة', 'ملفات مهيأة لمنصات التواصل'],
      status: 'published',
      display_order: services.length + 1
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      ...service,
      title: service.title || '',
      slug: service.slug || '',
      subtitle: service.subtitle || '',
      description: service.description || '',
      full_content: service.full_content || '',
      badge: service.badge || '',
      category: service.category || 'creative',
      icon_name: service.icon_name || 'Film',
      image: service.image || '',
      deliverables: Array.isArray(service.deliverables) ? service.deliverables : [],
      status: service.status || 'published',
      display_order: service.display_order || 1,
      meta_title: service.meta_title || '',
      meta_description: service.meta_description || '',
      meta_keywords: service.meta_keywords || '',
      canonical_url: service.canonical_url || '',
      og_image: service.og_image || '',
      no_index: !!service.no_index
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return
    const currentList = formData.deliverables || []
    setFormData({ ...formData, deliverables: [...currentList, newDeliverable.trim()] })
    setNewDeliverable('')
  }

  const handleRemoveDeliverable = (index: number) => {
    const currentList = formData.deliverables || []
    setFormData({ ...formData, deliverables: currentList.filter((_, i) => i !== index) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    const slug = formData.slug?.trim() || `service-${Date.now()}`

    if (editingService) {
      await updateService(editingService.id, {
        ...formData,
        slug
      })
    } else {
      await createService({
        title: formData.title || '',
        slug,
        subtitle: formData.subtitle || '',
        description: formData.description || '',
        full_content: formData.full_content || '',
        badge: formData.badge || '',
        category: formData.category || 'creative',
        icon_name: formData.icon_name || 'Layers',
        image: formData.image || '',
        deliverables: formData.deliverables || [],
        status: formData.status || 'published',
        display_order: formData.display_order || services.length + 1
      })
    }

    setModalOpen(false)
    await loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف خدمة «${title}»؟`)) {
      await deleteService(id)
      await loadData()
    }
  }

  const toggleStatus = async (srv: Service) => {
    const newStatus = srv.status === 'published' ? 'draft' : 'published'
    await updateService(srv.id, { status: newStatus })
    await loadData()
  }

  // Render in-place form screen when adding or editing
  if (modalOpen) {
    return (
      <div className="space-y-6 max-w-4xl animate-fadeIn">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#E5DFD3] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#12372A] text-[#12372A] hover:text-[#F3D7A4] transition-colors cursor-pointer"
              title="العودة لقائمة الخدمات"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
                <span>الخدمات الإبداعية والتقنية</span>
                <span>/</span>
                <span className="text-[#12372A] font-bold">
                  {editingService ? `تعديل: ${editingService.title}` : 'إضافة خدمة جديدة'}
                </span>
              </div>
              <h2 className="text-xl font-black text-[#12372A]">
                {editingService ? `تعديل بيانات الخدمة: ${editingService.title}` : 'إضافة خدمة إبداعية / تقنية جديدة'}
              </h2>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1">
                عنوان الخدمة *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: إنتاج المقاطع القصيرة"
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
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="مثال: short-form-content"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1">
                تصنيف الخدمة
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'creative' | 'tech' })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
              >
                <option value="creative">إنتاج فني وصناعة محتوى</option>
                <option value="tech">أنظمة وحلول تقنية</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1">
                الشارة (Badge)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="الأكثر طلباً / إنتاج سينمائي"
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

          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">
              الشعار الفرعي (Subtitle)
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="من الفكرة إلى الشاشة.. محتوى يخطف الأنظار"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">
              الوصف الرئيسي للخدمة *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="ننتج المحتوى من البداية للنهاية، من التصوير الاحترافي إلى المونتاج..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none resize-y"
            />
          </div>

          <ImagePickerField
            label="صورة المعاينة (Cover Image)"
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            hint="الحجم الأمثل: 800 × 600 بكسل"
          />

          {/* Deliverables List Builder */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              قائمة المخرجات الرئيسية (Deliverables Checklist)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddDeliverable()
                  }
                }}
                placeholder="أدخل مخرجاً (مثال: مقاطع ريلز 4K) واضغط إضافة"
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-xs focus:border-[#12372A] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-4 py-2 rounded-xl bg-[#12372A] text-[#F3D7A4] text-xs font-bold cursor-pointer hover:bg-[#205341]"
              >
                + إضافة
              </button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3]">
              {formData.deliverables?.map((del, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DFD3] text-xs text-[#12372A]"
                >
                  <span>{del}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(i)}
                    className="p-0.5 hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {(!formData.deliverables || formData.deliverables.length === 0) && (
                <span className="text-xs text-[#8C6D46] italic">لم يتم إضافة مخرجات بعد.</span>
              )}
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
            fallbackDescription={formData.description || formData.subtitle || ''}
            fallbackImage={formData.image}
            urlSlug={formData.slug || ''}
            pathPrefix="/services/"
          />

          {/* Action Buttons */}
          <div className="pt-6 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 transition-colors cursor-pointer"
            >
              إلغاء والعودة
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-black shadow-md cursor-pointer transition-all"
            >
              {editingService ? 'حفظ التعديلات' : 'إنشاء الخدمة الآن'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  const filteredServices = services.filter((s) => {
    if (activeFilter === 'all') return true
    return s.category === activeFilter
  })

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              إدارة الخدمات الإبداعية والتقنية
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            التحكم في خدمات راية المعروضة في شبكة الـ Bento Grid بالصفحة الرئيسية وصفحة الخدمات.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 bg-[#EAE4D9]/60 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#12372A] text-[#F3D7A4] shadow-xs'
              : 'text-[#12372A] hover:bg-white/60'
          }`}
        >
          جميع الخدمات ({services.length})
        </button>
        <button
          onClick={() => setActiveFilter('creative')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'creative'
              ? 'bg-[#12372A] text-[#F3D7A4] shadow-xs'
              : 'text-[#12372A] hover:bg-white/60'
          }`}
        >
          خدمات الإنتاج الفني ({services.filter((s) => s.category === 'creative').length})
        </button>
        <button
          onClick={() => setActiveFilter('tech')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'tech'
              ? 'bg-[#12372A] text-[#F3D7A4] shadow-xs'
              : 'text-[#12372A] hover:bg-white/60'
          }`}
        >
          الحلول والأنظمة التقنية ({services.filter((s) => s.category === 'tech').length})
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-[#E5DFD3] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Top Bar with Badge & Category */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FAF7F2] text-[#8C6D46] border border-[#E5DFD3]">
                  {service.badge || (service.category === 'creative' ? 'إنتاج فني' : 'حل تقني')}
                </span>
                <span className="text-xs font-mono text-[#6b7f74]">#{service.display_order}</span>
              </div>

              {/* Cover Image Thumbnail */}
              {service.image && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-[#E5DFD3]">
                  <img
                    src={service.image}
                    alt={service.meta_title || service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Title & Subtitle */}
              <h3 className="text-lg font-black text-[#12372A] mb-1">{service.title}</h3>
              {service.subtitle && (
                <p className="text-xs text-[#8C6D46] font-medium mb-3">{service.subtitle}</p>
              )}

              {/* Description */}
              <p className="text-xs text-[#6b7f74] leading-relaxed line-clamp-3 mb-4">
                {service.description}
              </p>

              {/* Deliverables snippet */}
              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-1.5 pt-3 border-t border-[#F0EBE1] mb-4">
                  <span className="text-[10px] font-bold text-[#12372A] block">المخرجات الأساسية:</span>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[#12372A]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {service.deliverables.length > 3 && (
                    <span className="text-[10px] text-[#8C6D46] italic block">
                      +{service.deliverables.length - 3} مخرجات إضافية
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(service)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                    service.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {service.status === 'published' ? 'منشور' : 'مسودة'}
                </button>
                <a
                  href={`/services/${service.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#12372A] transition-colors"
                  title="معاينة الصفحة العامة"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="p-2 rounded-xl bg-[#FAF7F2] text-[#12372A] hover:bg-[#12372A] hover:text-[#F3D7A4] transition-all cursor-pointer"
                  title="تعديل الخدمة"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-2 rounded-xl bg-[#FAF7F2] text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                  title="حذف الخدمة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
