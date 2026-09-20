import React, { useState } from 'react'
import { submitProjectInquiry } from '../../../lib/supabase'
import { ProjectInquiry } from '../../../lib/types'
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Sparkles, Clock, DollarSign } from 'lucide-react'

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    client_name: '',
    company_name: '',
    phone: '',
    email: '',
    services_requested: ['إنتاج المقاطع القصيرة'],
    estimated_budget: '15,000 - 30,000 ريال',
    deadline: 'خلال شهر',
    project_details: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const availableServices = [
    'إنتاج المقاطع القصيرة (Reels & Shorts)',
    'تغطية المعارض والمؤتمرات',
    'إنشاء المواقع الإلكترونية',
    'تطوير تطبيقات الجوال',
    'حلول وأنظمة الذكاء الاصطناعي'
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
    <div className="pb-20 bg-[#F4EFE6]">
      {/* Header */}
      <section className="pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] text-center relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#205341] text-[#C5A880] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ابدأ مشروعك القادم معنا</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4EFE6]">
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
          <p className="text-lg sm:text-xl text-[#b9d5c7] max-w-2xl mx-auto leading-relaxed pt-1">
            أرسل تفاصيل فكرتك أو البريف (Brief)، وسنقوم بتحليله والجلوس معك للانطلاق فوراً.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Direct Contact Information */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5DFD3] shadow-sm">
              <h2 className="text-2xl font-black text-[#12372A] mb-2">
                نموذج إرسال البريف (Project Brief)
              </h2>
              <p className="text-xs sm:text-sm text-[#6b7f74] mb-8">
                أخبرنا بما ترغب في إنتاجه، وسنعد لك خطة العمل المناسبة.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#F0F6F3] border border-[#205341]/30 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#12372A] text-[#C5A880] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12372A]">
                    تم استلام طلبك بنجاح!
                  </h3>
                  <p className="text-sm text-[#335948]">
                    {responseMessage}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        client_name: '',
                        company_name: '',
                        phone: '',
                        email: '',
                        services_requested: ['إنتاج المقاطع القصيرة'],
                        estimated_budget: '15,000 - 30,000 ريال',
                        deadline: 'خلال شهر',
                        project_details: ''
                      })
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#12372A] text-white text-xs font-bold"
                  >
                    إرسال بريف آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                        الاسم الكريم <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        placeholder="مثال: تركي السعدون"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                        اسم الشركة أو الجهة
                      </label>
                      <input
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        placeholder="مثال: شركة إتقان للاستثمار"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                        رقم الجوال أو الواتساب <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 50 123 4567"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50 text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50 text-right"
                      />
                    </div>
                  </div>

                  {/* Services Requested (Checklist) */}
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-2.5">
                      الخدمات المطلوبة: <span className="text-[#6b7f74] font-normal">(يمكنك اختيار أكثر من خدمة)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availableServices.map((srv) => {
                        const checked = formData.services_requested.includes(srv)
                        return (
                          <div
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                              checked
                                ? 'bg-[#12372A] text-[#F4EFE6] border-[#12372A]'
                                : 'bg-[#FAF7F2] text-[#335948] border-[#E5DFD3] hover:border-[#12372A]/30'
                            }`}
                          >
                            <span>{srv}</span>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                              checked ? 'bg-[#C5A880] text-[#12372A]' : 'border border-[#C5A880]'
                            }`}>
                              {checked ? '✓' : ''}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Budget & Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1.5 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>الميزانية المقترحة</span>
                      </label>
                      <select
                        value={formData.estimated_budget}
                        onChange={(e) => setFormData({ ...formData, estimated_budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12372A] mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>الموعد المطلوب للإنجاز</span>
                      </label>
                      <input
                        type="text"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        placeholder="مثال: خلال أسبوعين"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                      تفاصيل الفكرة أو التحدي الإبداعي <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.project_details}
                      onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
                      placeholder="اشرح لنا فكرة المشروع، الجمهور المستهدف، وأهم ما تود تحقيقه..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] focus:outline-none focus:border-[#12372A] text-sm text-[#12372A] bg-[#FAF7F2]/50 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#12372A] hover:bg-[#174233] text-[#F4EFE6] py-4 rounded-xl font-bold text-base shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>جاري إرسال البريف...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-[#C5A880]" />
                        <span>إرسال طلب المشروع الآن</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details & Headquarters Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#12372A] text-[#F4EFE6] p-8 sm:p-10 rounded-3xl border border-[#205341] shadow-xl space-y-6">
                <h3 className="text-2xl font-black text-[#F4EFE6]">
                  مقر رايـة بالرياض
                </h3>
                <p className="text-sm text-[#b9d5c7] leading-relaxed">
                  فريقنا مستعد دائماً لاستقبالكم في مقرنا أو الاجتماع بكم افتراضياً لمناقشة آفاق التعاون والإنتاج.
                </p>

                <div className="space-y-4 pt-4 border-t border-[#205341]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#205341] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-xs text-[#C5A880] font-bold">الموقع</h4>
                      <p className="text-sm font-semibold text-[#F4EFE6]">طريق الملك فهد، الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#205341] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-xs text-[#C5A880] font-bold">الهاتف المباشر</h4>
                      <p className="text-sm font-semibold text-[#F4EFE6]" dir="ltr">+966 50 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#205341] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <div>
                      <h4 className="text-xs text-[#C5A880] font-bold">البريد الإلكتروني</h4>
                      <p className="text-sm font-semibold text-[#F4EFE6]">info@raya.sa</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#205341]">
                  <a
                    href="https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B9%20%D8%B1%D8%A7%D9%8A%D8%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>محادثة فورية عبر واتساب</span>
                  </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5DFD3] shadow-xs">
                <h4 className="text-sm font-bold text-[#12372A] mb-2">أوقات العمل الرسمية:</h4>
                <p className="text-xs text-[#6b7f74]">
                  الأحد — الخميس: 9:00 صباحاً حتى 6:00 مساءً (بتوقيت الرياض).
                </p>
                <p className="text-xs text-[#C5A880] mt-1 font-semibold">
                  خدمة الدعم والاستفسارات العاجلة متوفرة 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
