import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../../../lib/supabase'
import { Service } from '../../../lib/types'
import { ArrowRight, CheckCircle2, MessageSquare, ArrowUpLeft, ShieldCheck, Zap } from 'lucide-react'

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (slug) {
        setLoading(true)
        const s = await getServiceBySlug(slug)
        setService(s || null)
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#F4EFE6]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#12372A]">جاري تحميل تفاصيل الخدمة...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#F4EFE6]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#12372A]">الخدمة غير موجودة</h2>
          <Link to="/services" className="inline-flex items-center gap-2 text-[#C5A880] font-bold">
            <ArrowRight className="w-4 h-4" />
            <span>العودة لصفحة الخدمات</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 bg-[#F4EFE6]">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6b7f74] hover:text-[#12372A] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لجميع خدمات راية</span>
        </Link>
      </div>

      {/* Service Hero */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#12372A] text-[#F4EFE6] rounded-3xl p-8 sm:p-14 shadow-xl border border-[#205341] relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#205341] text-[#C5A880] text-xs font-bold">
                {service.badge || 'خدمة احترافية'}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                {service.title}
              </h1>
              {service.subtitle && (
                <p className="text-lg font-bold text-[#C5A880]">
                  {service.subtitle}
                </p>
              )}
              <p className="text-base text-[#b9d5c7] leading-relaxed">
                {service.description}
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#F4EFE6] text-[#12372A] hover:bg-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all"
                >
                  <span>طلب هذه الخدمة الآن</span>
                  <ArrowUpLeft className="w-4 h-4 text-[#C5A880]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Content & Deliverables */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Detailed Content */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-[#12372A]">
              نظرة عامة على الخدمة والقيمة المضافة
            </h3>
            <p className="text-base text-[#335948] leading-relaxed">
              {service.full_content || service.description}
            </p>
          </div>

          {/* Deliverables Checklist */}
          {service.deliverables && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-[#12372A] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                <span>ماذا تتضمن مخرجات هذه الخدمة؟ (Deliverables)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                    <CheckCircle2 className="w-5 h-5 text-[#205341] shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-[#12372A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Steps if present */}
          {service.workflow_steps && service.workflow_steps.length > 0 && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-[#12372A] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#C5A880]" />
                <span>مراحل تنفيذ العمل لهذه الخدمة</span>
              </h3>
              <div className="space-y-4">
                {service.workflow_steps.map((st, i) => (
                  <div key={st.title} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3]">
                    <span className="w-8 h-8 rounded-full bg-[#12372A] text-[#C5A880] font-bold text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#12372A]">{st.title}</h4>
                      <p className="text-xs text-[#6b7f74] mt-1">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instant Request Banner */}
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#12372A]/20 text-center space-y-4">
            <h3 className="text-2xl font-black text-[#12372A]">
              جاهز لبدء العمل في {service.title}؟
            </h3>
            <p className="text-sm text-[#6b7f74] max-w-xl mx-auto">
              تواصل معنا لتحديد تفاصيل مشروعك واستلام عرض مالي وجدول زمني دقيق في غضون 24 ساعة.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#12372A] text-[#F4EFE6] px-8 py-3.5 rounded-full text-sm font-bold shadow-md hover:bg-[#174233]"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                <span>إرسال بريف المشروع الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
