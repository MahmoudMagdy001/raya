import React, { useState, useEffect } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { INITIAL_PROJECTS } from '../../../data/initialData'
import { ImagePickerField } from '../components/ImagePickerField'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  ArrowRight,
  Film, 
  ExternalLink,
  Star,
  TrendingUp,
  Eye,
  Globe
} from 'lucide-react'
import { SeoFormFields } from '../components/SeoFormFields'

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'case_study' | 'metrics' | 'seo'>('info')
  const [caseStep, setCaseStep] = useState<number>(1)

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    client_name: '',
    category_name: 'إنتاج المقاطع القصيرة',
    cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    video_url: '',
    video_aspect_ratio: '9:16',
    is_featured: true,
    display_order: 1,
    views_count: 500000,
    metrics: { views: '+500K', growth: '+35%', engagement: '45K', conversion: '+28%' },
    case_challenge: '',
    case_objective: '',
    case_idea: '',
    case_production: '',
    case_final_content: '',
    case_takeaway: '',
    status: 'published'
  })

  const loadData = async () => {
    const data = await getProjects()
    if (data) setProjects(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenAdd = () => {
    setEditingProject(null)
    setActiveTab('info')
    setCaseStep(1)
    setFormData({
      title: '',
      slug: '',
      client_name: '',
      category_name: 'إنتاج المقاطع القصيرة',
      cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      video_url: '',
      video_aspect_ratio: '9:16',
      is_featured: true,
      display_order: projects.length + 1,
      views_count: 500000,
      metrics: { views: '+500K', growth: '+35%', engagement: '45K', conversion: '+28%' },
      case_challenge: '',
      case_objective: '',
      case_idea: '',
      case_production: '',
      case_final_content: '',
      case_takeaway: '',
      status: 'published'
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project)
    setActiveTab('info')
    setCaseStep(1)
    setFormData({
      ...project,
      title: project.title || '',
      slug: project.slug || '',
      client_name: project.client_name || '',
      client_logo: project.client_logo || '',
      category_name: project.category_name || '',
      cover_image: project.cover_image || '',
      video_url: project.video_url || '',
      gallery: Array.isArray(project.gallery) ? project.gallery : [],
      metrics: project.metrics || { views: '+500K', growth: '+35%', engagement: '45K', conversion: '+28%' },
      case_challenge: project.case_challenge || '',
      case_objective: project.case_objective || '',
      case_idea: project.case_idea || '',
      case_production: project.case_production || '',
      case_final_content: project.case_final_content || '',
      case_takeaway: project.case_takeaway || '',
      status: project.status || 'published',
      meta_title: project.meta_title || '',
      meta_description: project.meta_description || '',
      meta_keywords: project.meta_keywords || '',
      canonical_url: project.canonical_url || '',
      og_image: project.og_image || '',
      no_index: !!project.no_index
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    const slug = formData.slug?.trim() || `project-${Date.now()}`

    if (editingProject) {
      await updateProject(editingProject.id, {
        ...formData,
        slug
      })
    } else {
      await createProject({
        title: formData.title || 'مشروع جديد',
        slug,
        client_name: formData.client_name || 'عميل راية',
        category_name: formData.category_name || 'إنتاج المقاطع القصيرة',
        cover_image: formData.cover_image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        video_url: formData.video_url || '',
        video_aspect_ratio: formData.video_aspect_ratio || '9:16',
        is_featured: formData.is_featured ?? true,
        display_order: formData.display_order ?? projects.length + 1,
        views_count: formData.views_count || 500000,
        metrics: formData.metrics || { views: '+500K', growth: '+35%' },
        case_challenge: formData.case_challenge || '',
        case_objective: formData.case_objective || '',
        case_idea: formData.case_idea || '',
        case_production: formData.case_production || '',
        case_final_content: formData.case_final_content || '',
        case_takeaway: formData.case_takeaway || '',
        status: formData.status || 'published'
      })
    }

    setModalOpen(false)
    await loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مشروع «${title}»؟`)) {
      await deleteProject(id)
      await loadData()
    }
  }

  const toggleFeatured = async (project: Project) => {
    await updateProject(project.id, { is_featured: !project.is_featured })
    await loadData()
  }

  const toggleStatus = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published'
    await updateProject(project.id, { status: newStatus })
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
                  <Film className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-black text-[#12372A]">
                  إدارة المشاريع ودراسات الحالة (Case Studies)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6b7f74]">
                التحكم في معرض الأعمال، مؤشرات الأداء، ومنهجية دراسة الحالة الستة (The 6-Step Case Study).
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 text-[#C5A880]" />
              <span>إضافة مشروع جديد</span>
            </button>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-3xl border border-[#E5DFD3] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#E5DFD3] bg-[#FAF7F2] text-[11px] font-bold text-[#8C6D46] uppercase">
                    <th className="py-4 px-5">المشروع</th>
                    <th className="py-4 px-5">العميل والتصنيف</th>
                    <th className="py-4 px-5">الأبعاد</th>
                    <th className="py-4 px-5">مميز في الرئيسية</th>
                    <th className="py-4 px-5">المشاهدات والنمو</th>
                    <th className="py-4 px-5">الحالة</th>
                    <th className="py-4 px-5 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DFD3]/60 text-sm">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      {/* Thumbnail & Title */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.cover_image}
                            alt={proj.title}
                            className="w-14 h-14 rounded-2xl object-cover border border-[#E5DFD3] shadow-xs shrink-0"
                          />
                          <div>
                            <span className="font-bold text-[#12372A] block line-clamp-1">
                              {proj.title}
                            </span>
                            <span className="text-[11px] text-[#8C6D46] font-mono block mt-0.5">
                              /works/{proj.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Client & Category */}
                      <td className="py-4 px-5">
                        <span className="text-xs font-bold text-[#12372A] block">
                          {proj.client_name}
                        </span>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#12372A]/8 text-[#12372A]">
                          {proj.category_name || 'عام'}
                        </span>
                      </td>

                      {/* Aspect Ratio */}
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-[#EAE4D9]/80 text-[#12372A]">
                          {proj.video_aspect_ratio || '9:16'}
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-4 px-5">
                        <button
                          onClick={() => toggleFeatured(proj)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                            proj.is_featured
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-gray-100 text-gray-500 border border-gray-200'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${proj.is_featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                          <span>{proj.is_featured ? 'نعم (بالرئيسية)' : 'معرض الأعمال'}</span>
                        </button>
                      </td>

                      {/* Metrics */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-[#12372A] flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                            {proj.metrics?.views || '+500K'}
                          </span>
                          {proj.metrics?.growth && (
                            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3.5 h-3.5" />
                              {proj.metrics.growth}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <button
                          onClick={() => toggleStatus(proj)}
                          className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                            proj.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {proj.status === 'published' ? 'منشور' : 'مسودة'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`/works/${proj.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-colors"
                            title="معاينة الصفحة"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(proj)}
                            className="p-2 rounded-xl bg-white border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs"
                            title="تعديل المشروع ودراسة الحالة"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id, proj.title)}
                            className="p-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-500 hover:text-white text-rose-600 transition-all cursor-pointer shadow-xs"
                            title="حذف المشروع"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* In-Place Header with Back Button */}
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs"
                title="الرجوع لقائمة المشاريع"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
                  <span>معرض الأعمال والمشاريع</span>
                  <span>/</span>
                  <span className="text-[#12372A] font-bold">
                    {editingProject ? `تعديل: ${editingProject.title}` : 'إضافة مشروع جديد'}
                  </span>
                </div>
                <h2 className="text-xl font-black text-[#12372A]">
                  {editingProject ? 'تعديل بيانات المشروع ودراسة الحالة' : 'إضافة مشروع ودراسة حالة جديدة'}
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

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-[#E5DFD3] shadow-xs overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#E5DFD3] bg-[#FAF7F2] px-6 gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'info'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                1. البيانات الأساسية والفيديو
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('case_study')}
                className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeTab === 'case_study'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>2. دراسة الحالة الستة (The 6 Steps)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('metrics')}
                className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all ${
                  activeTab === 'metrics'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                3. المقاييس والأرقام المحققة
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeTab === 'seo'
                    ? 'border-[#12372A] text-[#12372A]'
                    : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#8C6D46]" />
                <span>4. تحسين محركات البحث (SEO & Social)</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">
                        عنوان المشروع *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="مثال: حملة إطلاق عطر «سمو»"
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
                        placeholder="مثال: sumou-perfume-campaign"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">
                        اسم العميل *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        placeholder="مثال: دار سمو للعطور"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">
                        التصنيف
                      </label>
                      <select
                        value={formData.category_name}
                        onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      >
                        <option value="إنتاج المقاطع القصيرة">إنتاج المقاطع القصيرة</option>
                        <option value="تغطية الفعاليات">تغطية الفعاليات والمؤتمرات</option>
                        <option value="المواقع الإلكترونية">المواقع الإلكترونية</option>
                        <option value="تطبيقات الجوال">تطبيقات الجوال</option>
                        <option value="حلول الذكاء الاصطناعي">حلول الذكاء الاصطناعي</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">
                        أبعاد الفيديو
                      </label>
                      <select
                        value={formData.video_aspect_ratio}
                        onChange={(e) => setFormData({ ...formData, video_aspect_ratio: e.target.value as '9:16' | '16:9' })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      >
                        <option value="9:16">رأسي (9:16) — Reels & Shorts</option>
                        <option value="16:9">أفقي سينمائي (16:9)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImagePickerField
                      label="صورة الغلاف (Cover Image) *"
                      value={formData.cover_image || ''}
                      onChange={(url) => setFormData({ ...formData, cover_image: url })}
                      required
                      hint="1200 × 800 بكسل أو 9:16 للريلز"
                    />
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">
                        رابط مقطع الفيديو (MP4 أو معاينة)
                      </label>
                      <input
                        type="url"
                        value={formData.video_url}
                        onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        placeholder="https://assets.mixkit.co/...mp4"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3]">
                    <label className="flex items-center gap-2 text-xs font-bold text-[#12372A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-4 h-4 rounded text-[#12372A] focus:ring-[#12372A]"
                      />
                      <span>عرض هذا العمل في الصفحة الرئيسية (Featured Project)</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#12372A]">الترتيب:</span>
                      <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                        className="w-20 px-2 py-1 rounded-lg border border-[#E5DFD3] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 6-STEP CASE STUDY */}
              {activeTab === 'case_study' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 p-1 bg-[#EAE4D9]/60 rounded-xl overflow-x-auto text-xs font-bold">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setCaseStep(step)}
                        className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all shrink-0 ${
                          caseStep === step
                            ? 'bg-[#12372A] text-[#F3D7A4]'
                            : 'text-[#12372A] hover:bg-white/60'
                        }`}
                      >
                        الخطوة {step}
                      </button>
                    ))}
                  </div>

                  {caseStep === 1 && (
                    <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                      <h4 className="text-sm font-bold text-[#12372A]">١. التحدي الأساسي (The Challenge)</h4>
                      <p className="text-xs text-[#6b7f74]">ما هي الصعوبة أو التحدي الذي كان يواجه العميل قبل تدخل راية؟</p>
                      <textarea
                        rows={4}
                        value={formData.case_challenge}
                        onChange={(e) => setFormData({ ...formData, case_challenge: e.target.value })}
                        placeholder="مثال: كان العميل يواجه ركوداً في التفاعل بسبب الإعلانات التقليدية الطويلة..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      />
                    </div>
                  )}

                  {caseStep === 2 && (
                    <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                      <h4 className="text-sm font-bold text-[#12372A]">٢. الهدف الاستراتيجي والمؤشرات (The Objective)</h4>
                      <p className="text-xs text-[#6b7f74]">ما هي النتائج والأرقام المستهدفة التي اتفقنا على تحقيقها؟</p>
                      <textarea
                        rows={4}
                        value={formData.case_objective}
                        onChange={(e) => setFormData({ ...formData, case_objective: e.target.value })}
                        placeholder="مثال: الوصول لأكثر من مليون مشاهدة مع نسبة تفاعل لا تقل عن 10%..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      />
                    </div>
                  )}

                  {caseStep === 3 && (
                    <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                      <h4 className="text-sm font-bold text-[#12372A]">٣. الفكرة الإبداعية (The Creative Idea)</h4>
                      <p className="text-xs text-[#6b7f74]">كيف كسرنا النمط؟ ما هي زاوية التناول والسرد البصري المبتكرة؟</p>
                      <textarea
                        rows={4}
                        value={formData.case_idea}
                        onChange={(e) => setFormData({ ...formData, case_idea: e.target.value })}
                        placeholder="مثال: تصميم سلسلة مقاطع تعتمد على أسلوب المفاجأة في أول 3 ثوانٍ..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      />
                    </div>
                  )}

                  {caseStep === 4 && (
                    <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                      <h4 className="text-sm font-bold text-[#12372A]">٤. كواليس الإنتاج والتنفيذ (Production & Craft)</h4>
                      <p className="text-xs text-[#6b7f74]">تفاصيل التصوير، العدسات، الإضاءة، والمونتاج وتصحيح الألوان.</p>
                      <textarea
                        rows={4}
                        value={formData.case_production}
                        onChange={(e) => setFormData({ ...formData, case_production: e.target.value })}
                        placeholder="مثال: تم التصوير بكاميرات سينمائية مع إضاءة درامية تحاكي أصالة البراند..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      />
                    </div>
                  )}

                  {caseStep === 5 && (
                    <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                      <h4 className="text-sm font-bold text-[#12372A]">٥. النتيجة والمحتوى النهائي (Final Output)</h4>
                      <p className="text-xs text-[#6b7f74]">ما الذي تم تسليمه ونشره على منصات التواصل؟</p>
                      <textarea
                        rows={4}
                        value={formData.case_final_content}
                        onChange={(e) => setFormData({ ...formData, case_final_content: e.target.value })}
                        placeholder="مثال: 5 مقاطع ريلز فائقة الدقة وبانرات رقمية حققت انتشاراً واسعاً..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      />
                    </div>
                  )}

                  {caseStep === 6 && (
                    <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                      <h4 className="text-sm font-bold text-[#12372A]">٦. الأثر والدروس المستفادة (The Takeaway)</h4>
                      <p className="text-xs text-[#6b7f74]">خلاصة المشروع وأثره المستمر على نمو العلامة التجارية.</p>
                      <textarea
                        rows={4}
                        value={formData.case_takeaway}
                        onChange={(e) => setFormData({ ...formData, case_takeaway: e.target.value })}
                        placeholder="مثال: ارتفعت المبيعات بنسبة 45% وتحولت الحملة إلى تريند في الأسبوع الأول..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: METRICS */}
              {activeTab === 'metrics' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">
                      المشاهدات (Views Metric)
                    </label>
                    <input
                      type="text"
                      value={formData.metrics?.views || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, views: e.target.value }
                      })}
                      placeholder="+1.2M"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">
                      نسبة النمو (Growth Metric)
                    </label>
                    <input
                      type="text"
                      value={formData.metrics?.growth || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, growth: e.target.value }
                      })}
                      placeholder="+45%"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">
                      التفاعل (Engagement Metric)
                    </label>
                    <input
                      type="text"
                      value={formData.metrics?.engagement || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, engagement: e.target.value }
                      })}
                      placeholder="85K"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">
                      نسبة التحويل (Conversion Metric)
                    </label>
                    <input
                      type="text"
                      value={formData.metrics?.conversion || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, conversion: e.target.value }
                      })}
                      placeholder="+32%"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: SEO SPECIALIST */}
              {activeTab === 'seo' && (
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
                  fallbackDescription={formData.case_objective || formData.case_idea || ''}
                  fallbackImage={formData.cover_image}
                  urlSlug={formData.slug || ''}
                  pathPrefix="/works/"
                />
              )}

              {/* Modal Footer Buttons */}
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
                  {editingProject ? 'حفظ تعديلات المشروع' : 'إنشاء المشروع الآن'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
