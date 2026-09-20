import React, { useState, useEffect } from 'react'
import { getProjects, supabase } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { INITIAL_PROJECTS } from '../../../data/initialData'
import { Plus, Trash2, CheckCircle, Sparkles, X } from 'lucide-react'

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'case_study'>('info')
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
    case_challenge: '',
    case_objective: '',
    case_idea: '',
    case_production: '',
    case_final_content: '',
    case_takeaway: '',
    status: 'published'
  })

  useEffect(() => {
    async function load() {
      const data = await getProjects()
      if (data && data.length > 0) setProjects(data)
    }
    load()
  }, [])

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    const newSlug = formData.slug || `project-${Date.now()}`
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: formData.title || 'مشروع جديد',
      slug: newSlug,
      client_name: formData.client_name || 'عميل راية',
      category_name: formData.category_name,
      cover_image: formData.cover_image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      video_url: formData.video_url,
      video_aspect_ratio: formData.video_aspect_ratio || '9:16',
      is_featured: formData.is_featured ?? true,
      display_order: formData.display_order ?? 1,
      views_count: 500000,
      metrics: { views: '+500K', growth: '+35%' },
      case_challenge: formData.case_challenge,
      case_objective: formData.case_objective,
      case_idea: formData.case_idea,
      case_production: formData.case_production,
      case_final_content: formData.case_final_content,
      case_takeaway: formData.case_takeaway,
      status: 'published'
    }

    // Try saving to Supabase
    try {
      await supabase.from('projects').insert([newProject])
    } catch {
      // Graceful fallback
    }

    setProjects([newProject, ...projects])
    setModalOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        await supabase.from('projects').delete().eq('id', id)
      } catch {
        // Fallback
      }
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#12372A]">
            إدارة المشاريع ودراسات الحالة الستة
          </h2>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            إضافة وتعديل معرض الأعمال وإدارة منهجية (The 6-Step Case Study).
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#174233] text-[#F4EFE6] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>إضافة مشروع ودراسة حالة جديدة</span>
        </button>
      </div>

      {/* Projects Table / List */}
      <div className="bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E5DFD3] text-xs font-bold text-[#6b7f74]">
                <th className="py-3.5 px-4">المشروع</th>
                <th className="py-3.5 px-4">العميل</th>
                <th className="py-3.5 px-4">التصنيف</th>
                <th className="py-3.5 px-4">أبعاد الفيديو</th>
                <th className="py-3.5 px-4">المشاهدات</th>
                <th className="py-3.5 px-4">الحالة</th>
                <th className="py-3.5 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD3] text-sm text-[#12372A]">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.cover_image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-black/10 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-[#12372A] line-clamp-1">{proj.title}</h4>
                        <span className="text-[11px] text-[#6b7f74]">{proj.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#335948]">
                    {proj.client_name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#12372A]/8 text-xs font-bold text-[#12372A]">
                      {proj.category_name || 'عام'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#6b7f74]">
                    {proj.video_aspect_ratio || '9:16'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs">
                    {proj.metrics?.views || '1.2M+'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#205341]">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>منشور</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
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

      {/* Add Project Modal with 6-Step Case Study Tabs */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#E5DFD3] shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD3]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-xl font-bold text-[#12372A]">
                  إضافة مشروع ودراسة حالة جديدة
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 text-[#6b7f74] hover:text-[#12372A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 my-4 border-b border-[#E5DFD3] pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'info' ? 'bg-[#12372A] text-white' : 'bg-[#FAF7F2] text-[#6b7f74]'
                }`}
              >
                ١. البيانات والوسائط الأساسية
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('case_study')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'case_study' ? 'bg-[#12372A] text-white' : 'bg-[#FAF7F2] text-[#6b7f74]'
                }`}
              >
                ٢. الخطوات الست لدراسة الحالة (The 6-Step Case Study)
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              {activeTab === 'info' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">عنوان المشروع</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="مثال: حملة إطلاق عطر سمو"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">اسم العميل / البراند</label>
                      <input
                        type="text"
                        required
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        placeholder="مثال: دار سمو للعطور"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">رابط المشروع (Slug)</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="sumou-perfume-campaign"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">التصنيف</label>
                      <select
                        value={formData.category_name}
                        onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
                      >
                        <option value="إنتاج المقاطع القصيرة">إنتاج المقاطع القصيرة</option>
                        <option value="تغطية المعارض والمؤتمرات">تغطية المعارض والمؤتمرات</option>
                        <option value="المواقع والتطبيقات">المواقع والتطبيقات</option>
                        <option value="حلول الذكاء الاصطناعي">حلول الذكاء الاصطناعي</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">رابط صورة الغلاف</label>
                      <input
                        type="url"
                        value={formData.cover_image}
                        onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">نسبة أبعاد الفيديو</label>
                      <select
                        value={formData.video_aspect_ratio}
                        onChange={(e) => setFormData({ ...formData, video_aspect_ratio: e.target.value as '9:16' | '16:9' })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
                      >
                        <option value="9:16">9:16 (عمودي للمنصات والجوال)</option>
                        <option value="16:9">16:9 (أفقي سينمائي)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">رابط ملف الفيديو (MP4 / HLS)</label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
                    />
                  </div>
                </>
              ) : (
                /* The 6-Step Case Study Schema Sub-tabs */
                <div className="space-y-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 text-xs font-bold">
                    {[
                      { s: 1, title: '١. التحدي' },
                      { s: 2, title: '٢. الهدف' },
                      { s: 3, title: '٣. الفكرة' },
                      { s: 4, title: '٤. الإنتاج' },
                      { s: 5, title: '٥. المحتوى النهائي' },
                      { s: 6, title: '٦. الخلاصة' }
                    ].map((stepItem) => (
                      <button
                        key={stepItem.s}
                        type="button"
                        onClick={() => setCaseStep(stepItem.s)}
                        className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                          caseStep === stepItem.s ? 'bg-[#C5A880] text-[#12372A]' : 'bg-[#FAF7F2] text-[#6b7f74]'
                        }`}
                      >
                        {stepItem.title}
                      </button>
                    ))}
                  </div>

                  {caseStep === 1 && (
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">١. التحدي — The Challenge</label>
                      <textarea
                        rows={4}
                        value={formData.case_challenge}
                        onChange={(e) => setFormData({ ...formData, case_challenge: e.target.value })}
                        placeholder="ما هي المشكلة أو الفجوة التي واجهها العميل قبل راية؟"
                        className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  )}

                  {caseStep === 2 && (
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">٢. الهدف — The Objective</label>
                      <textarea
                        rows={4}
                        value={formData.case_objective}
                        onChange={(e) => setFormData({ ...formData, case_objective: e.target.value })}
                        placeholder="ما الهدف المحدد المطلوب تحقيقه؟"
                        className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  )}

                  {caseStep === 3 && (
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">٣. الفكرة — The Idea</label>
                      <textarea
                        rows={4}
                        value={formData.case_idea}
                        onChange={(e) => setFormData({ ...formData, case_idea: e.target.value })}
                        placeholder="زاوية الطرح والسيناريو والحل الإبداعي المعتمد..."
                        className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  )}

                  {caseStep === 4 && (
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">٤. الإنتاج — The Production</label>
                      <textarea
                        rows={4}
                        value={formData.case_production}
                        onChange={(e) => setFormData({ ...formData, case_production: e.target.value })}
                        placeholder="تفاصيل التصوير، العدسات، الإضاءة، والمونتاج الميداني..."
                        className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  )}

                  {caseStep === 5 && (
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">٥. المحتوى النهائي — The Final Content</label>
                      <textarea
                        rows={4}
                        value={formData.case_final_content}
                        onChange={(e) => setFormData({ ...formData, case_final_content: e.target.value })}
                        placeholder="وصف المقاطع الناتجة وروابط النشر..."
                        className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  )}

                  {caseStep === 6 && (
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1">٦. الخلاصة — The Takeaway</label>
                      <textarea
                        rows={4}
                        value={formData.case_takeaway}
                        onChange={(e) => setFormData({ ...formData, case_takeaway: e.target.value })}
                        placeholder="النتائج الرقمية، الأثر على العلامة، وانطباع العميل..."
                        className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-sm"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-[#E5DFD3] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#6b7f74]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#174233] text-white text-xs font-bold"
                >
                  حفظ ونشر المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
