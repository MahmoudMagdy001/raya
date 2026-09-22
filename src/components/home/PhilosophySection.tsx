import React, { useState } from 'react'

export const PhilosophySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null)

  const pillars = [
    {
      step: '٠١',
      title: 'وضوح الهدف',
      desc: 'دراسة طبيعة المنشأة أو المنتج وتحديد الرسالة الأساسية ومؤشرات الأداء بدقة تامة قبل بدء التصوير.',
      highlight: 'البداية السليمة',
      tags: ['تحديد الجمهور بدقة', 'مؤشرات الأداء KPIs']
    },
    {
      step: '٠٢',
      title: 'قوة الفكرة',
      desc: 'الخروج من الصندوق وكسر التكرار والملل الإعلاني عبر زوايا طرح جريئة تصنع الدهشة وتخاطب المشاعر.',
      highlight: 'سر التميز',
      tags: ['صناعة الـ Hook الجذاب', 'سرد قصصي مبتكر']
    },
    {
      step: '٠٣',
      title: 'ذكاء التنفيذ',
      desc: 'إخراج بصري عالي الدقة بمعدات تصوير سينمائية وهندسة صوتية وتصحيح لوني استثنائي دون هدر للموارد.',
      highlight: 'الحرفية الفنية',
      tags: ['تصوير سينمائي ٤K', 'مونتاج إيقاعي محكم']
    }
  ]

  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] relative overflow-hidden border-b border-[#E5DFD3]">
      {/* Ambient Lighting & Luxury Depth */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 bg-[#12372A]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Right / Editorial Manifesto Column */}
          <div className="lg:col-span-6 space-y-7">
            {/* Main Headline with Curved Gold Underline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#12372A] leading-[1.25] tracking-tight">
              «ما نصنع محتوى لمجرد إن فيه{' '}
              <span className="relative inline-block text-[#C5A880]">
                منشور لازم ينزل!
                <svg
                  className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>»
            </h2>

            {/* Main Statement */}
            <p className="text-lg sm:text-xl text-[#205341] font-medium leading-relaxed">
              كل قطعة محتوى نشتغل عليها في راية لازم يكون لها <span className="text-[#12372A] font-bold underline decoration-[#C5A880]/50 decoration-2 underline-offset-4">هدف استراتيجي واضح</span>، جمهور محدد بدقة، ورسالة توصل بأعلى فاعلية وتأثير.
            </p>

            {/* Styled Pull-Quote / Core Belief Card */}
            <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#E5DFD3] border-r-4 border-r-[#C5A880] shadow-xs">
              <p className="text-sm sm:text-base text-[#12372A] font-semibold leading-relaxed">
                إيماننا العميق: لما يكون الهدف واضحاً، تكون الفكرة أقوى، والتنفيذ أذكى، والنتيجة النهائية مضاعفة التأثير في عقلية العميل والمشهد التجاري.
              </p>
            </div>

            {/* Two High-Trust Pillar Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 border border-[#E5DFD3]/80 hover:border-[#C5A880]/50 transition-colors shadow-xs">
                <span className="text-[#C5A880] font-bold text-xl select-none leading-none shrink-0">—</span>
                <span className="text-sm sm:text-base font-bold text-[#12372A]">
                  شراكة فكر وإنتاج، ولسنا مجرد كاميرا لتصوير الطلبات.
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 border border-[#E5DFD3]/80 hover:border-[#C5A880]/50 transition-colors shadow-xs">
                <span className="text-[#C5A880] font-bold text-xl select-none leading-none shrink-0">—</span>
                <span className="text-sm sm:text-base font-bold text-[#12372A]">
                  فهم عميق لثقافة السوق السعودي وتوجهات الجيل الشاب ورؤية ٢٠٣٠.
                </span>
              </div>
            </div>
          </div>

          {/* Left / 3 Connected Pillars Column */}
          <div className="lg:col-span-6 relative">
            {/* Subtle connecting vertical golden spine */}
            <div className="hidden sm:block absolute right-8 top-14 bottom-14 w-0.5 bg-gradient-to-b from-[#C5A880] via-[#12372A]/20 to-[#C5A880]/40" />

            <div className="space-y-5 relative z-10">
              {pillars.map((pillar, i) => {
                const isHovered = activePillar === i

                return (
                  <div
                    key={pillar.title}
                    onMouseEnter={() => setActivePillar(i)}
                    onMouseLeave={() => setActivePillar(null)}
                    className={`group relative bg-white/90 hover:bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#12372A]/10 transform hover:-translate-y-1 ${
                      isHovered ? 'border-[#C5A880] bg-white ring-2 ring-[#C5A880]/20' : 'border-[#E5DFD3]'
                    }`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Editorial Typographic Index Number */}
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] group-hover:border-[#C5A880] group-hover:bg-[#12372A] flex items-center justify-center transition-all duration-300 shadow-xs">
                        <span className="font-mono text-base font-black text-[#12372A] group-hover:text-[#F3D7A4] transition-colors">
                          {pillar.step}
                        </span>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#12372A] group-hover:text-[#205341] transition-colors">
                            {pillar.title}
                          </h3>
                          <span className="text-xs font-bold text-[#C5A880] bg-[#12372A]/5 border border-[#C5A880]/30 px-3 py-0.5 rounded-full">
                            {pillar.highlight}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-[#4f6b5c] leading-relaxed">
                          {pillar.desc}
                        </p>

                        {/* Capability Micro-Tags */}
                        <div className="mt-3.5 pt-3 border-t border-[#E5DFD3]/60 flex flex-wrap items-center gap-2">
                          {pillar.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-[#12372A] bg-[#FAF7F2] border border-[#E5DFD3] group-hover:border-[#C5A880]/40 px-2.5 py-0.5 rounded-lg transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


