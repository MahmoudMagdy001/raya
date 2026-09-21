import React, { useState } from 'react'
import { submitProjectInquiry } from '../../../lib/supabase'
import { ProjectInquiry } from '../../../lib/types'
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  DollarSign,
  User,
  Building2,
  Calendar,
  FileText,
  Bot,
  ShieldCheck,
  Film,
  Camera,
  Globe,
  Smartphone,
  ChevronDown,
  ArrowUpLeft
} from 'lucide-react'

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    client_name: '',
    company_name: '',
    phone: '',
    email: '',
    services_requested: ['إنتاج المقاطع القصيرة (Reels & Shorts)'],
    estimated_budget: '15,000 - 30,000 ريال',
    deadline: 'خلال شهر',
    project_details: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const availableServices = [
    {
      id: 'إنتاج المقاطع القصيرة (Reels & Shorts)',
      label: 'إنتاج المقاطع القصيرة (Reels & Shorts)',
      icon: Film,
      badge: 'الأكثر طلباً'
    },
    {
      id: 'تغطية المعارض والمؤتمرات',
      label: 'تغطية المعارض والمؤتمرات',
      icon: Camera,
      badge: 'تغطيات حية'
    },
    {
      id: 'إنشاء المواقع الإلكترونية',
      label: 'إنشاء المواقع الإلكترونية',
      icon: Globe,
      badge: 'UI/UX متقدم'
    },
    {
      id: 'تطوير تطبيقات الجوال',
      label: 'تطوير تطبيقات الجوال',
      icon: Smartphone,
      badge: 'iOS & Android'
    },
    {
      id: 'حلول وأنظمة الذكاء الاصطناعي',
      label: 'حلول وأنظمة الذكاء الاصطناعي',
      icon: Bot,
      badge: 'تقنيات الجيل القادم'
    }
  ]

  const budgets = [
    'أقل من 10,000 ريال',
    '10,000 - 25,000 ريال',
    '25,000 - 50,000 ريال',
    'أكثر من 50,000 ريال'
  ]

  const toggleService = (srv: string) => {
    if (formData.services_requested.includes(srv)) {
      setFormData({
        ...formData,
        services_requested: formData.services_requested.filter((s) => s !== srv)
      })
    } else {
      setFormData({
        ...formData,
        services_requested: [...formData.services_requested, srv]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await submitProjectInquiry(formData)
    setLoading(false)
    setResponseMessage(res.message)
    setSubmitted(true)
  }

  return (
    <div className="pb-24 bg-[#F4EFE6]">
      {/* Header */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-12 bg-[#12372A] text-[#F4EFE6] overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4EFE6]">
            تواصل مع{' '}
            <span className="relative inline-block text-[#C5A880]">
              رايـة
              <svg
                className="absolute -bottom-2 right-0 w-full h-3 text-[#C5A880]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#b9d5c7] max-w-2xl mx-auto leading-relaxed">
            أرسل تفاصيل فكرتك أو البريف (Brief)، وسنقوم بتحليله والجلوس معك للانطلاق فوراً.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Direct Contact Information */}
      <section className="relative pt-6 sm:pt-8 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E6E0D5] shadow-xl shadow-[#12372A]/5 relative overflow-hidden">
              {/* Subtle luxury top decorative accent */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#12372A] via-[#C5A880] to-[#12372A]" />

              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] tracking-tight">
                  إرسال بريف المشروع (Project Brief)
                </h2>
                <p className="text-sm text-[#5B7166] mt-2 leading-relaxed">
                  أخبرنا بما ترغب في إنتاجه وأهدافك الرئيسية، وسنعد لك خطة العمل المناسبة مع جدول زمني ونطاق استثماري دقيق.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#F0F6F3] to-[#E5EFEA] border border-[#205341]/20 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#12372A] to-[#205341] text-[#C5A880] flex items-center justify-center mx-auto shadow-lg shadow-[#12372A]/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#12372A]">
                      تم استلام طلبك بنجاح!
                    </h3>
                    <p className="text-sm sm:text-base text-[#335948] max-w-md mx-auto leading-relaxed">
                      {responseMessage || 'سيتواصل معك مستشار المشاريع في راية خلال أقل من 24 ساعة لمناقشة التفاصيل وترتيب الجلسة الأولى.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        client_name: '',
                        company_name: '',
                        phone: '',
                        email: '',
                        services_requested: ['إنتاج المقاطع القصيرة (Reels & Shorts)'],
                        estimated_budget: '15,000 - 30,000 ريال',
                        deadline: 'خلال شهر',
                        project_details: ''
                      })
                    }}
                    className="mt-2 px-8 py-3 rounded-full bg-[#12372A] hover:bg-[#1b4a39] text-[#F4EFE6] text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    إرسال بريف آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-2">
                        الاسم الكريم <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8A9B92]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.client_name}
                          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                          placeholder="مثال: تركي السعدون"
                          className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-2">
                        اسم الشركة أو الجهة
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8A9B92]">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.company_name}
                          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                          placeholder="مثال: شركة إتقان للاستثمار"
                          className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-2">
                        رقم الجوال أو الواتساب <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8A9B92]">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+966 50 123 4567"
                          dir="ltr"
                          className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-2">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8A9B92]">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          dir="ltr"
                          className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs text-right"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Requested (Selection Cards) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-bold text-[#12372A]">
                        الخدمات المطلوبة:
                      </label>
                      <span className="text-[11px] text-[#788C82] font-medium">
                        (يمكنك اختيار أكثر من خدمة)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableServices.map((srv, idx) => {
                        const checked = formData.services_requested.includes(srv.id)
                        const Icon = srv.icon
                        const isLastAndOdd = idx === availableServices.length - 1 && availableServices.length % 2 !== 0

                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleService(srv.id)}
                            className={`group relative p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between select-none ${
                              isLastAndOdd ? 'sm:col-span-2' : ''
                            } ${
                              checked
                                ? 'bg-[#12372A] text-[#F4EFE6] border-[#12372A] shadow-md shadow-[#12372A]/15 scale-[1.01]'
                                : 'bg-[#FAF8F5] text-[#244234] border-[#E4DDD2] hover:border-[#C5A880]/60 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                  checked
                                    ? 'bg-[#205341] text-[#C5A880]'
                                    : 'bg-white text-[#5F756B] border border-[#E4DDD2] group-hover:text-[#12372A]'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-bold leading-snug">
                                {srv.label}
                              </span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-all ${
                                checked
                                  ? 'bg-[#C5A880] text-[#12372A]'
                                  : 'border-2 border-[#D8CFC2] group-hover:border-[#C5A880]'
                              }`}
                            >
                              {checked ? '✓' : ''}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Budget & Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-2 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>الميزانية المقترحة</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.estimated_budget}
                          onChange={(e) => setFormData({ ...formData, estimated_budget: e.target.value })}
                          className="w-full pr-4 pl-10 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs appearance-none cursor-pointer"
                        >
                          {budgets.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A9B92]">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>الموعد المطلوب للإنجاز</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8A9B92]">
                          <Clock className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.deadline}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          placeholder="مثال: خلال شهر"
                          className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-2">
                      تفاصيل الفكرة أو التحدي الإبداعي <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 right-4 pointer-events-none text-[#8A9B92]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        rows={4}
                        value={formData.project_details}
                        onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
                        placeholder="اشرح لنا فكرة المشروع، الجمهور المستهدف، المخرجات المطلوبة، وأهم ما تود تحقيقه..."
                        className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-[#E4DDD2] focus:border-[#12372A] focus:ring-4 focus:ring-[#12372A]/10 text-sm font-medium text-[#12372A] placeholder:text-[#9EA8A2] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white transition-all shadow-xs leading-relaxed resize-y min-h-[110px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-[#12372A] via-[#1a4a39] to-[#12372A] hover:from-[#174535] hover:to-[#1e5642] text-[#F4EFE6] py-4 rounded-2xl font-black text-base shadow-xl shadow-[#12372A]/20 hover:shadow-2xl hover:shadow-[#12372A]/30 transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-[#C5A880] rounded-full animate-spin" />
                        <span>جاري إرسال البريف...</span>
                      </div>
                    ) : (
                      <>
                        <span>إرسال طلب المشروع الآن</span>
                        <Send className="w-5 h-5 text-[#C5A880] transition-transform group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  {/* Trust & Guarantee Micro-Badges */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#EAE4D9]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#546b60]">
                      <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>سرية وحماية تامة للحقوق</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#546b60]">
                      <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>رد أولي خلال 24 ساعة</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#546b60]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>جلسة استشارية أولى مجاناً</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Details & Headquarters Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Main HQ Luxury Card */}
              <div className="relative bg-gradient-to-b from-[#12372A] via-[#0E2C22] to-[#081B15] text-[#F4EFE6] p-7 sm:p-9 rounded-3xl border border-[#23503F] shadow-2xl overflow-hidden space-y-6">
                {/* Decorative ambient flare */}
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#205341]/40 rounded-full blur-2xl pointer-events-none" />

                <div className="relative space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#F4EFE6] tracking-tight">
                    مقر رايـة بالرياض
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B0C9BC] leading-relaxed">
                    فريقنا مستعد دائماً لاستقبالكم في مقرنا أو الاجتماع بكم افتراضياً لمناقشة آفاق التعاون والإنتاج الإبداعي.
                  </p>
                </div>

                {/* Contact List */}
                <div className="relative space-y-3 pt-2">
                  {/* Location */}
                  <a
                    href="https://maps.google.com/?q=Riyadh+King+Fahd+Road"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#C5A880]/40 transition-all duration-200 flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#205341] border border-[#C5A880]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C5A880] transition-all">
                      <MapPin className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-[#C5A880] uppercase tracking-wider">الموقع</span>
                        <ArrowUpLeft className="w-3 h-3 text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm font-semibold text-[#F4EFE6] leading-snug mt-0.5">
                        طريق الملك فهد، الرياض، المملكة العربية السعودية
                      </p>
                    </div>
                  </a>

                  {/* Direct Phone */}
                  <a
                    href="tel:+966501234567"
                    className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#C5A880]/40 transition-all duration-200 flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#205341] border border-[#C5A880]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C5A880] transition-all">
                      <Phone className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#C5A880] uppercase tracking-wider">الهاتف المباشر</span>
                      <p className="text-sm font-semibold text-[#F4EFE6] leading-snug mt-0.5" dir="ltr">
                        +966 50 123 4567
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@raya.sa"
                    className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#C5A880]/40 transition-all duration-200 flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#205341] border border-[#C5A880]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C5A880] transition-all">
                      <Mail className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#C5A880] uppercase tracking-wider">البريد الإلكتروني الرسمي</span>
                      <p className="text-sm font-semibold text-[#F4EFE6] leading-snug mt-0.5">
                        info@raya.sa
                      </p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp Button */}
                <div className="relative pt-2">
                  <a
                    href="https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B9%20%D8%B1%D8%A7%D9%8A%D8%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative overflow-hidden w-full flex items-center justify-center gap-3 bg-[#C5A880] hover:bg-[#b8996e] text-[#12372A] py-4 px-6 rounded-2xl font-black text-sm shadow-xl shadow-[#C5A880]/20 hover:shadow-2xl hover:shadow-[#C5A880]/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-[#12372A] transition-transform group-hover:scale-110" />
                    <span>محادثة فورية عبر واتساب</span>
                  </a>
                </div>
              </div>

              {/* Working Hours & Quick Steps Card */}
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#E6E0D5] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 text-[#12372A]">
                  <Clock className="w-5 h-5 text-[#C5A880]" />
                  <h4 className="text-sm font-black text-[#12372A]">
                    أوقات العمل واستقبال الزيارات
                  </h4>
                </div>
                <div className="space-y-2 text-xs text-[#5B7166] leading-relaxed">
                  <p className="font-semibold text-[#12372A]">
                    الأحد — الخميس: 9:00 صباحاً حتى 6:00 مساءً (بتوقيت الرياض)
                  </p>
                  <p className="text-[11px] text-[#8C7149] font-bold bg-[#FAF5ED] border border-[#E8DFCE] p-2.5 rounded-xl text-center">
                    خدمة الدعم والمشاريع العاجلة متوفرة على مدار الساعة 24/7.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

