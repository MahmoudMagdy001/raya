import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../../../lib/supabase'
import { Service } from '../../../lib/types'
import { 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'
import { usePageSeo } from '../../../components/common/SEO'
import { ServiceDetailSkeleton } from '../../../components/ui/skeleton'

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  usePageSeo({
    title: service?.meta_title || (service ? `${service.title} | راية للإنتاج والتسويق الإبداعي` : undefined),
    description: service?.meta_description || service?.description,
    keywords: service?.meta_keywords,
    ogImage: service?.og_image || service?.image,
    canonicalUrl: service?.canonical_url,
    noIndex: service?.no_index
  })

  useEffect(() => {
    async function load() {
      if (slug) {
        setLoading(true)
        try {
          const s = await getServiceBySlug(slug)
          setService(s || null)
        } catch (err) {
          console.error('Error loading service details:', err)
        } finally {
          setLoading(false)
        }
      }
    }
    load()
  }, [slug])

  if (loading) {
    return <ServiceDetailSkeleton />
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#12372A] text-[#F4EFE6] font-sans antialiased">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <span className="text-xs font-bold text-[#C5A880] tracking-widest uppercase">RAAYA / 404</span>
          <h2 className="text-3xl font-black text-[#F4EFE6]">الخدمة غير موجودة</h2>
          <p className="text-sm text-[#b9d5c7] leading-relaxed">
            الرابط المطلوب غير متاح حالياً أو تم نقله. يمكنك تصفح جميع خدمات راية الإبداعية.
          </p>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 bg-[#C5A880] text-[#12372A] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#b0926b] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لصفحة الخدمات</span>
          </Link>
        </div>
      </div>
    )
  }

  const renderHighlightedTitle = (title: string) => {
    const words = title.trim().split(/\s+/)
    if (words.length <= 1) {
      return (
        <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-3">
          {title}
          <svg
            className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-3 text-[#C5A880]/60 pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      )
    }
    const highlightCount = words.length >= 4 ? 2 : 1
    const firstPart = words.slice(0, words.length - highlightCount).join(' ')
    const lastPart = words.slice(words.length - highlightCount).join(' ')

    return (
      <>
        {firstPart}{' '}
        <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-3">
          {lastPart}
          <svg
            className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-3 text-[#C5A880]/60 pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      </>
    )
  }

  return (
    <div className="bg-[#F4EFE6] text-[#12372A] font-sans antialiased selection:bg-[#C5A880]/30 selection:text-[#12372A]">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 bg-[#12372A] text-[#F4EFE6] overflow-hidden border-b border-[#205341]/40">
        {/* Exact About Page Gradient Base & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        {/* Background Service Image with Subtle Transparency */}
        {(service.image || '/header-banner.jpg') && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <img
              src={service.image || '/header-banner.jpg'}
              alt=""
              className="w-full h-full object-cover object-center transform scale-105 opacity-10 mix-blend-overlay"
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Breadcrumb & Taxonomy */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#205341]/60">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#b9d5c7] hover:text-[#C5A880] transition-colors group"
            >
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              <span>الرجوع لجميع خدمات راية</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <span className="text-[#C5A880]">RAAYA</span>
              <span className="text-[#205341]">/</span>
              <span className="text-[#b9d5c7]">
                {service.category === 'tech' ? 'حلول تقنية ورقمية' : 'إنتاج إبداعي وسينمائي'}
              </span>
            </div>
          </div>

          {/* Asymmetric Hero Header Composition */}
          <div className="pt-6 sm:pt-8 space-y-3 sm:space-y-4">
            {/* Large Service Title - Dominant Typography with signature curved underline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F4EFE6] tracking-tight leading-[1.25] max-w-5xl">
              {renderHighlightedTitle(service.title)}
            </h1>

            {/* Subtitle / Value Proposition */}
            {service.subtitle && (
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#C5A880] max-w-3xl leading-relaxed">
                {service.subtitle}
              </p>
            )}

            {/* Description Paragraph - Single line across desktop */}
            <p className="text-base sm:text-lg text-[#b9d5c7] max-w-none leading-relaxed font-normal">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SERVICE STRATEGY & OVERVIEW (Editorial Content Block - No Cards)
          ───────────────────────────────────────────────────────────── */}
      <section id="overview" className="py-14 sm:py-20 bg-[#F4EFE6] text-[#12372A] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Right Meta Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45]">
                نظرة استراتيجية{' '}
                <span className="relative inline-block text-[#C5A880] pb-1.5 sm:pb-2">
                  والقيمة المضافة
                  <svg
                    className="absolute -bottom-1 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#5a7769] leading-relaxed">
                في راية، لا نعتبر الإنتاج مجرد تنفيذ لمهام مطلوبة، بل استثمار استراتيجي يصنع صورة علامتك الذهنية ويرسخ حضورها في عقول الجمهور.
              </p>

              <div className="pt-4 border-t border-[#E5DFD3] space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-[#E5DFD3]/60">
                  <span className="text-[#6b7f74] font-medium">نوع الخدمة</span>
                  <span className="font-bold text-[#12372A]">
                    {service.category === 'tech' ? 'حلول تقنية ورقمية' : 'إنتاج إبداعي وسينمائي'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E5DFD3]/60">
                  <span className="text-[#6b7f74] font-medium">نطاق العمل</span>
                  <span className="font-bold text-[#12372A]">شامل (من الفكرة حتى التسليم)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#6b7f74] font-medium">مستوى الجودة</span>
                  <span className="font-bold text-[#C5A880]">معايير راية السينمائية</span>
                </div>
              </div>
            </div>

            {/* Left Editorial Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {service.subtitle && (
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#12372A] leading-relaxed border-r-4 border-[#C5A880] pr-6">
                  "{service.subtitle}"
                </blockquote>
              )}

              <div className="text-base sm:text-lg text-[#335948] leading-loose space-y-6 pt-2 font-normal">
                <p className="whitespace-pre-line">
                  {service.full_content || service.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. WHAT WE DELIVER (Editorial Deliverables Grid - No Cards)
          ───────────────────────────────────────────────────────────── */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section id="deliverables" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E5DFD3]/70 text-[#12372A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            {/* Section Header (Matching Home Page) */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
                مخرجات الخدمة{' '}
                <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                  والتسليمات
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5a7769] max-w-2xl mx-auto leading-relaxed">
                مخرجات دقيقة معدة بأعلى معايير الإتقان الفني لتمنح علامتك الحضور والتأثير الذي تستحقه.
              </p>
            </div>

            {/* Editorial Deliverables List */}
            <div className="divide-y divide-[#E5DFD3]">
              {service.deliverables.map((item, index) => {
                const match = item.match(/^(.*?)(?:\s*\((.*?)\))?$/)
                const mainTitle = match ? match[1].trim() : item
                const subNote = match && match[2] ? match[2].trim() : null
                const num = String(index + 1).padStart(2, '0')

                return (
                  <div
                    key={item}
                    className="group py-7 sm:py-9 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-all duration-300 hover:bg-white/60 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl cursor-default"
                  >
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#C5A880]/35 group-hover:text-[#C5A880] transition-colors duration-300 select-none shrink-0 group-hover:-translate-y-0.5 transform">
                        {num}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#12372A] group-hover:text-[#0B3B2E] transition-colors leading-snug">
                          {mainTitle}
                        </h3>
                        {subNote && (
                          <p className="text-xs sm:text-sm font-bold text-[#8c7456] mt-1">
                            {subNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <span className="text-xs font-bold text-[#b38e5c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline-block">
                        تسليم معتمد
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#12372A]/5 group-hover:bg-[#12372A] flex items-center justify-center text-[#12372A] group-hover:text-[#C5A880] transition-all duration-300 group-hover:-translate-x-1 transform">
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. HOW WE WORK (Connected Process Timeline - Conditional)
          ───────────────────────────────────────────────────────────── */}
      {service.workflow_steps && service.workflow_steps.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#E5DFD3]/70 text-[#12372A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            {/* Header (Matching Home Page WorkflowSection) */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
                طريقة عملنا —{' '}
                <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                  لهذه الخدمة
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5a7769] max-w-2xl mx-auto leading-relaxed">
                كيف ننتقل بالفكرة من التخطيط الأولي إلى التنفيذ الكامل والاعتماد النهائي.
              </p>
            </div>

            {/* Desktop Connected Horizontal Timeline */}
            <div className="hidden lg:grid grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              <div className="absolute top-6 left-8 right-8 h-[2px] bg-[#C5A880]/30 -z-0" aria-hidden="true" />

              {service.workflow_steps.map((st, i) => (
                <div key={st.title} className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#12372A] text-[#C5A880] border-2 border-[#C5A880] font-black text-sm flex items-center justify-center shadow-md">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-lg font-bold text-[#12372A] leading-snug">{st.title}</h4>
                  <p className="text-sm text-[#6b7f74] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet Connected Vertical Timeline */}
            <div className="lg:hidden relative border-r-2 border-[#C5A880]/30 pr-6 space-y-8 mr-3">
              {service.workflow_steps.map((st, i) => (
                <div key={st.title} className="relative space-y-2">
                  <span className="absolute -right-[34px] top-0 w-8 h-8 rounded-full bg-[#12372A] text-[#C5A880] font-black text-xs flex items-center justify-center border-2 border-[#C5A880]">
                    {i + 1}
                  </span>
                  <h4 className="text-base font-bold text-[#12372A] leading-snug">{st.title}</h4>
                  <p className="text-sm text-[#6b7f74] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. WHY THIS SERVICE MATTERS (Agency Value Pillars - No Cards)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E5DFD3]/70 text-[#12372A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Header (Matching Home Page) */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
              لماذا تختار راية{' '}
              <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                لهذه الخدمة؟
                <svg
                  className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5a7769] max-w-2xl mx-auto leading-relaxed">
              ركائز عمل تضمن تحويل كل استثمار في المحتوى والإنتاج إلى عوائد وأثر حقيقي ملموس.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pt-4">
            <div className="space-y-4">
              <span className="text-3xl font-black text-[#C5A880]/40 select-none">01</span>
              <h3 className="text-lg sm:text-xl font-bold text-[#12372A] leading-snug">الفكرة والاستراتيجية أولاً</h3>
              <p className="text-sm sm:text-base text-[#6b7f74] leading-relaxed">
                لا نبدأ التصوير أو التنفيذ قبل هندسة الفكرة واختيار أذكى زاوية تفاعل تلائم جمهورك والمنصات المستهدفة.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-3xl font-black text-[#C5A880]/40 select-none">02</span>
              <h3 className="text-lg sm:text-xl font-bold text-[#12372A] leading-snug">حرفية سينمائية لا تقبل المساومة</h3>
              <p className="text-sm sm:text-base text-[#6b7f74] leading-relaxed">
                نستخدم أحدث معدات التصوير السينمائي، الإضاءة المدروسة، وهندسة الصوت لنقدم جودة تليق بقيمة علامتك التجارية.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-3xl font-black text-[#C5A880]/40 select-none">03</span>
              <h3 className="text-lg sm:text-xl font-bold text-[#12372A] leading-snug">صناعة أثر ملموس ومستمر</h3>
              <p className="text-sm sm:text-base text-[#6b7f74] leading-relaxed">
                كل مخرج نصنعه مهيأ لتجاوز خوارزميات المنصات وتحقيق أهدافك التسويقية والتجارية، وتمديد أثر علامتك لأطول فترة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Master CTA Section (نفس قسم الرئيسية) */}
      <MasterCtaSection />
    </div>
  )
}




