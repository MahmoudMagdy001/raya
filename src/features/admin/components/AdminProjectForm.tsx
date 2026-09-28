import React, { useState } from 'react'
import { Project } from '../../../lib/types'
import { ImagePickerField } from './ImagePickerField'
import { SeoFormFields } from './SeoFormFields'
import { 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Globe, 
  Plus, 
  Trash2 
} from 'lucide-react'

interface AdminProjectFormProps {
  editingProject: Project | null
  formData: Partial<Project>
  setFormData: React.Dispatch<React.SetStateAction<Partial<Project>>>
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
}

export const AdminProjectForm: React.FC<AdminProjectFormProps> = ({
  editingProject,
  formData,
  setFormData,
  onSubmit,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'case_study' | 'deliverables' | 'workflow' | 'metrics' | 'seo'>('info')
  const [caseStep, setCaseStep] = useState<number>(1)
  const [newDelivTitle, setNewDelivTitle] = useState('')
  const [newDelivNote, setNewDelivNote] = useState('')
  const [newStepTitle, setNewStepTitle] = useState('')
  const [newStepDesc, setNewStepDesc] = useState('')

  const handleAddDeliverable = () => {
    if (!newDelivTitle.trim()) return
    const list = formData.deliverables ? [...formData.deliverables] : []
    list.push({ title: newDelivTitle.trim(), note: newDelivNote.trim() || undefined })
    setFormData({ ...formData, deliverables: list })
    setNewDelivTitle('')
    setNewDelivNote('')
  }

  const handleRemoveDeliverable = (index: number) => {
    const list = (formData.deliverables || []).filter((_, i) => i !== index)
    setFormData({ ...formData, deliverables: list })
  }

  const handleAddWorkflowStep = () => {
    if (!newStepTitle.trim() || !newStepDesc.trim()) return
    const list = formData.workflow_steps ? [...formData.workflow_steps] : []
    list.push({ 
      title: newStepTitle.trim(), 
      desc: newStepDesc.trim(), 
      description: newStepDesc.trim() 
    })
    setFormData({ ...formData, workflow_steps: list })
    setNewStepTitle('')
    setNewStepDesc('')
  }

  const handleRemoveWorkflowStep = (index: number) => {
    const list = (formData.workflow_steps || []).filter((_, i) => i !== index)
    setFormData({ ...formData, workflow_steps: list })
  }

  return (
    <>
      {/* In-Place Header with Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
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
          onClick={onCancel}
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
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all shrink-0 ${
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
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'case_study'
                ? 'border-[#12372A] text-[#12372A]'
                : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>2. دراسة الحالة (The 6 Steps)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('deliverables')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'deliverables'
                ? 'border-[#12372A] text-[#12372A]'
                : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>3. مخرجات وتسليمات العمل ({formData.deliverables?.length || 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'workflow'
                ? 'border-[#12372A] text-[#12372A]'
                : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>4. مسار وطريقة العمل ({formData.workflow_steps?.length || 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all shrink-0 ${
              activeTab === 'metrics'
                ? 'border-[#12372A] text-[#12372A]'
                : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            5. المقاييس والأرقام المحققة
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'seo'
                ? 'border-[#12372A] text-[#12372A]'
                : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>6. تحسين محركات البحث (SEO)</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="p-8 space-y-6">
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
                    value={formData.title || ''}
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
                    value={formData.slug || ''}
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
                    value={formData.client_name || ''}
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
                    value={formData.video_url || ''}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://assets.mixkit.co/...mp4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    نطاق العمل ومجال التنفيذ (Scope of Work)
                  </label>
                  <input
                    type="text"
                    value={formData.scope_of_work || ''}
                    onChange={(e) => setFormData({ ...formData, scope_of_work: e.target.value })}
                    placeholder="مثال: حملة إطلاق متكاملة، إنتاج 8 مقاطع، وجلسات تصوير"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    معيار الجودة والتسليم (Quality Standard)
                  </label>
                  <input
                    type="text"
                    value={formData.quality_standard || ''}
                    onChange={(e) => setFormData({ ...formData, quality_standard: e.target.value })}
                    placeholder="مثال: تسليم سينمائي 4K ProRes مع هندسة صوتية مخصصة"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
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

              {/* Project Quote */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3] space-y-2">
                <h4 className="text-sm font-bold text-[#12372A]">اقتباس أو كلمة مميزة حول المشروع (Highlight Quote)</h4>
                <p className="text-xs text-[#6b7f74]">شهادة أو كلمة مقتبسة من العميل أو الفريق تلخص الأثر وتظهر كـ Quote فخم في صفحة دراسة الحالة.</p>
                <textarea
                  rows={2}
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="مثال: «استطاعت راية أن تحوّل قصة علامتنا التجارية إلى محتوى ملهم ومؤثر وصل لملايين المشاهدين في أيام قليلة.»"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                />
              </div>
            </div>
          )}

          {/* TAB 3: DELIVERABLES */}
          {activeTab === 'deliverables' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                <h4 className="text-sm font-bold text-[#12372A] mb-1">
                  مخرجات وتسليمات المشروع (Deliverables)
                </h4>
                <p className="text-xs text-[#6b7f74]">
                  أضف التسليمات الفعلية الخاصة بهذا المشروع بالتحديد. ستظهر كبطاقات تسليم مرقمة وأنيقة في صفحة دراسة الحالة. في حال تركها فارغة لن يظهر قسم المخرجات في الصفحة.
                </p>
              </div>

              {/* Add Form */}
              <div className="p-5 rounded-2xl bg-[#12372A]/5 border border-[#12372A]/15 space-y-4">
                <h5 className="text-xs font-bold text-[#12372A] flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#C5A880]" />
                  <span>إضافة مخرج / تسليم جديد</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#12372A] mb-1">
                      عنوان المخرج والتسليم *
                    </label>
                    <input
                      type="text"
                      value={newDelivTitle}
                      onChange={(e) => setNewDelivTitle(e.target.value)}
                      placeholder="مثال: 5 مقاطع ريلز فائقة الدقة 4K"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#12372A] mb-1">
                      ملاحظة أو مواصفات فنية (اختياري)
                    </label>
                    <input
                      type="text"
                      value={newDelivNote}
                      onChange={(e) => setNewDelivNote(e.target.value)}
                      placeholder="مثال: صيغ 9:16 و 16:9 مع ترجمة مدمجة"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  disabled={!newDelivTitle.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#12372A] hover:bg-[#205341] disabled:opacity-50 text-[#F3D7A4] text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة المخرج للقائمة</span>
                </button>
              </div>

              {/* List */}
              {formData.deliverables && formData.deliverables.length > 0 ? (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-[#12372A] block">
                    قائمة التسليمات المضافة ({formData.deliverables.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.deliverables.map((item, idx) => {
                      const deliv = typeof item === 'string' ? { title: item, note: undefined } : item
                      return (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-white border border-[#E5DFD3] shadow-xs"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-[#FAF7F2] border border-[#E5DFD3] text-[#8C6D46] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <h6 className="text-xs font-bold text-[#12372A] leading-relaxed">
                                {deliv.title}
                              </h6>
                              {deliv.note && (
                                <p className="text-[11px] text-[#6b7f74] mt-0.5">
                                  {deliv.note}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveDeliverable(idx)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                            title="حذف هذا المخرج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-[#FAF7F2] border border-dashed border-[#E5DFD3] text-xs text-[#6b7f74]">
                  لم يتم إضافة أي مخرجات أو تسليمات لهذا المشروع حتى الآن.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]">
                <h4 className="text-sm font-bold text-[#12372A] mb-1">
                  خطوات ومسار تنفيذ المشروع (Workflow Steps)
                </h4>
                <p className="text-xs text-[#6b7f74]">
                  حدد منهجية ومراحل العمل المخصصة لهذا المشروع بالتحديد، لتظهر في الخط الزمني (Timeline) لصفحة دراسة الحالة بدلاً من الخطوات العامة المكررة. في حال عدم إدخال خطوات سيتم إخفاء القسم تلقائياً.
                </p>
              </div>

              {/* Add Form */}
              <div className="p-5 rounded-2xl bg-[#12372A]/5 border border-[#12372A]/15 space-y-4">
                <h5 className="text-xs font-bold text-[#12372A] flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#C5A880]" />
                  <span>إضافة مرحلة أو خطوة جديدة للعمل</span>
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#12372A] mb-1">
                      عنوان الخطوة أو المرحلة *
                    </label>
                    <input
                      type="text"
                      value={newStepTitle}
                      onChange={(e) => setNewStepTitle(e.target.value)}
                      placeholder="مثال: التخطيط والرؤية البصرية"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#12372A] mb-1">
                      تفاصيل وشرح الخطوة *
                    </label>
                    <textarea
                      rows={2}
                      value={newStepDesc}
                      onChange={(e) => setNewStepDesc(e.target.value)}
                      placeholder="مثال: تفكيك أهداف العميل، صياغة لوحة الإلهام (Moodboard)، وإعداد نصوص الاسكربت الموجه."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddWorkflowStep}
                  disabled={!newStepTitle.trim() || !newStepDesc.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#12372A] hover:bg-[#205341] disabled:opacity-50 text-[#F3D7A4] text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة الخطوة للمسار</span>
                </button>
              </div>

              {/* List */}
              {formData.workflow_steps && formData.workflow_steps.length > 0 ? (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-[#12372A] block">
                    مراحل العمل المضافة ({formData.workflow_steps.length}):
                  </span>
                  <div className="space-y-2.5">
                    {formData.workflow_steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5DFD3] shadow-xs"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-8 h-8 rounded-xl bg-[#12372A] text-[#F3D7A4] font-mono text-xs font-black flex items-center justify-center shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h6 className="text-xs font-bold text-[#12372A]">
                              {step.title}
                            </h6>
                            <p className="text-xs text-[#6b7f74] mt-1 leading-relaxed">
                              {step.desc || step.description}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveWorkflowStep(idx)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="حذف هذه الخطوة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-[#FAF7F2] border border-dashed border-[#E5DFD3] text-xs text-[#6b7f74]">
                  لم يتم إضافة أي خطوات مخصصة لهذا المشروع حتى الآن.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: METRICS */}
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

          {/* TAB 6: SEO SPECIALIST */}
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
              onClick={onCancel}
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
  )
}
