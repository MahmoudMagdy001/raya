import React, { useState, useEffect, useRef } from 'react'
import { CORE_VALUES } from '../../../data/initialData'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'

export const AboutPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const STAGE_DURATION = 3500 // 3.5s per stage
  const INTERVAL_STEP = 35 // update every 35ms

  useEffect(() => {
    if (isPaused) return

    const startTime = Date.now()
    setStageProgress(0)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / STAGE_DURATION) * 100, 100)
      setStageProgress(progress)

      if (elapsed >= STAGE_DURATION) {
        clearInterval(interval)
        setActiveStage((prev) => (prev + 1) % CORE_VALUES.length)
      }
    }, INTERVAL_STEP)

    return () => clearInterval(interval)
  }, [isPaused, activeStage])

  useEffect(() => {
    if (cardRefs.current[activeStage] && window.innerWidth < 1024) {
      cardRefs.current[activeStage]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
    }
  }, [activeStage])

  const handleSelectStage = (idx: number) => {
    setActiveStage(idx)
    setStageProgress(0)
  }

  return (
    <div>
      {/* Page Header */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4EFE6]">
            عن رايـة —{' '}
            <span className="relative inline-block text-[#C5A880]">
              قصة شغف سعودية
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
          <p className="text-lg sm:text-xl text-[#b9d5c7] max-w-3xl mx-auto leading-relaxed pt-1">
            نعيد تعريف صناعة المحتوى والإنتاج الفني للشركات والمؤثرين بروح وطنية تترجم طموحات المستقبل.
          </p>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 sm:py-24 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight leading-[1.25]">
                راية شركة إنتاج{' '}
                <span className="relative inline-block text-[#C5A880]">
                  إبداعي سعودية
                  <svg
                    className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#335948] leading-relaxed">
                متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص.
              </p>
              <p className="text-base text-[#6b7f74] leading-relaxed">
                نحن لا نكتفي بمجرد تصوير ما يطلبه العميل بالأسلوب التقليدي، بل نعتبر أنفسنا شركاء فكر؛ نشارك في بناء الفكرة من جذورها وطريقة تقديمها المبتكرة، لنضمن بكل ثقة أن المحتوى يخدم الهدف الموضوع، ويخاطب العقلية المناسبة للجمهور، ويظهر بالشكل اللائق على كل منصة عرض.
              </p>

              <div className="p-6 bg-white rounded-2xl border border-[#E5DFD3] space-y-2">
                <h4 className="text-base font-bold text-[#12372A]">
                  طريقتنا في العمل:
                </h4>
                <p className="text-sm text-[#6b7f74] leading-relaxed">
                  ما نصنع محتوى لمجرد إن فيه منشور لازم ينزل أو جدول زمني يحتاج تعبئة! كل قطعة محتوى نشتغل عليها لا بد أن تمتلك: هدفاً استراتيجياً واضحاً، جمهوراً محدداً بعناية، ورسالة ملهمة تصل بأقصر الطرق وأكثرها تأثيراً.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                  alt="فريق راية الإبداعي"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#12372A] text-[#F4EFE6] p-6 rounded-2xl shadow-xl border border-[#C5A880]/30 hidden sm:block max-w-xs">
                <p className="text-xs font-bold text-[#C5A880] mb-1">شعارنا الخالد</p>
                <p className="text-sm font-extrabold">أفكار تصنع الفرق</p>
                <p className="text-[11px] text-[#b9d5c7] mt-1">Ideas Make the Difference</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6]/50 to-[#FAF7F2] border-y border-[#E5DFD3] overflow-hidden">
        {/* Ambient Decorative Orbs */}
        <div className="absolute -top-28 right-12 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 left-12 w-96 h-96 bg-[#12372A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Eyebrow & Title */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight">
              بوصلتنا —{' '}
              <span className="relative inline-block text-[#C5A880]">
                الرؤية والمهمة
                <svg
                  className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5a7769] leading-relaxed">
              المنطلقات الاستراتيجية التي تصنع بصمتنا وتحدد وجهتنا في كل إنتاج إبداعي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="group relative bg-white rounded-[2rem] p-8 sm:p-10 border border-[#E5DFD3] hover:border-[#C5A880]/70 shadow-[0_4px_20px_rgba(18,55,42,0.03)] hover:shadow-[0_20px_45px_rgba(18,55,42,0.09)] transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1">
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Header: English Tag & Number */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] text-[11px] font-extrabold tracking-[0.16em] text-[#9C7546] uppercase">
                    OUR MISSION
                  </span>
                  <span className="text-2xl font-black text-[#C5A880]/50 group-hover:text-[#C5A880] transition-colors duration-300 font-sans tracking-widest">
                    ٠١
                  </span>
                </div>

                {/* Arabic Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#12372A] mb-4 flex items-center gap-3">
                  <span>مهمتنا</span>
                  <span className="h-[2px] w-8 bg-[#C5A880]/40 rounded-full group-hover:w-12 group-hover:bg-[#C5A880] transition-all duration-300" />
                </h3>

                {/* Body Text */}
                <div className="pt-1">
                  <p className="text-base sm:text-lg text-[#335948] leading-[1.85] font-medium">
                    نحوّل أهداف وأفكار العلامات التجارية إلى{" "}
                    <span className="text-[#12372A] font-bold">محتوى واضح ومبتكر</span>، ومصنوع باحتراف؛
                    يساعدها على الظهور، والتواصل، وصناعة{" "}
                    <span className="text-[#9C7546] font-bold">تأثير حقيقي مستدام</span>.
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-5 border-t border-[#E5DFD3]/80">
                <span className="inline-block px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3] text-xs font-bold text-[#12372A]">
                  التزام بالجودة والدقة في كل إطار
                </span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white rounded-[2rem] p-8 sm:p-10 border border-[#E5DFD3] hover:border-[#C5A880]/70 shadow-[0_4px_20px_rgba(18,55,42,0.03)] hover:shadow-[0_20px_45px_rgba(18,55,42,0.09)] transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1">
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Header: English Tag & Number */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] text-[11px] font-extrabold tracking-[0.16em] text-[#9C7546] uppercase">
                    OUR VISION
                  </span>
                  <span className="text-2xl font-black text-[#C5A880]/50 group-hover:text-[#C5A880] transition-colors duration-300 font-sans tracking-widest">
                    ٠٢
                  </span>
                </div>

                {/* Arabic Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#12372A] mb-4 flex items-center gap-3">
                  <span>رؤيتنا</span>
                  <span className="h-[2px] w-8 bg-[#C5A880]/40 rounded-full group-hover:w-12 group-hover:bg-[#C5A880] transition-all duration-300" />
                </h3>

                {/* Body Text */}
                <div className="pt-1">
                  <p className="text-base sm:text-lg text-[#335948] leading-[1.85] font-medium">
                    أن تكون راية{" "}
                    <span className="text-[#12372A] font-bold">شريكاً إبداعياً موثوقاً</span> للعلامات التجارية التي تبحث عن محتوى له شخصية وهدف، و
                    <span className="text-[#9C7546] font-bold">تأثير لا يُمحى</span> في المشهد الرقمي السعودي والعربي.
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-5 border-t border-[#E5DFD3]/80">
                <span className="inline-block px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3] text-xs font-bold text-[#12372A]">
                  مواكبة تطلعات رؤية السعودية ٢٠٣٠
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 6 Core Values - Two Balanced Rows with Connecting Lines */}
      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight">
              قيم راية{' '}
              <span className="relative inline-block text-[#C5A880]">
                الستة
                <svg
                  className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5a7769] leading-relaxed">
              المبادئ الجوهرية التي تحكم كل مشروع ونبضة إبداعية في أروقة راية.
            </p>
          </div>

          {/* 2 Rows with Connecting Middle Lines */}
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Row 1: Cards 0, 1, 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {CORE_VALUES.slice(0, 3).map((val, rowIdx) => {
                const idx = rowIdx
                const isActive = idx === activeStage
                const isCompleted = idx < activeStage

                const match = val.title.match(/^(.*?)\s*\((.*?)\)$/)
                const arTitle = match ? match[1] : val.title
                const enTitle = match ? match[2] : ''

                return (
                  <React.Fragment key={val.number}>
                    <div
                      onClick={() => handleSelectStage(idx)}
                      className={`w-full md:flex-1 p-[3px] rounded-[2rem] cursor-pointer transition-all duration-300 ease-out flex flex-col select-none ${
                        isActive
                          ? 'shadow-xl -translate-y-2 ring-4 ring-[#12372A]/10 z-10 scale-[1.01]'
                          : isCompleted
                          ? 'shadow-sm hover:-translate-y-0.5'
                          : 'shadow-xs hover:-translate-y-1'
                      }`}
                      style={{
                        background: isActive
                          ? `conic-gradient(from -90deg, #12372A ${stageProgress}%, #E5DFD3 ${stageProgress}%)`
                          : isCompleted
                          ? '#12372A'
                          : '#E5DFD3'
                      }}
                    >
                      <div className="w-full h-full bg-white p-6 sm:p-8 rounded-[calc(2rem-3px)] flex flex-col justify-center text-center min-h-[210px] sm:min-h-[230px]">
                        <div className="mb-2.5">
                          <h3 className="text-xl sm:text-2xl font-black text-[#12372A] tracking-tight">
                            {arTitle}
                          </h3>
                          {enTitle && (
                            <span className="block text-xs sm:text-sm font-bold text-[#9C7546] mt-1 tracking-wider uppercase">
                              ({enTitle})
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-[#556b60] leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    </div>

                    {/* Connecting line between cards in Row 1 */}
                    {rowIdx < 2 && (
                      <div className="hidden md:flex items-center w-8 sm:w-12 lg:w-14 shrink-0 h-1 bg-[#E5DFD3] rounded-full overflow-hidden mx-2 sm:mx-3">
                        <div
                          className="h-full bg-[#12372A] transition-all duration-500 ease-out"
                          style={{
                            width: activeStage > idx ? '100%' : '0%'
                          }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Row 2: Cards 3, 4, 5 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {CORE_VALUES.slice(3, 6).map((val, rowIdx) => {
                const idx = rowIdx + 3
                const isActive = idx === activeStage
                const isCompleted = idx < activeStage

                const match = val.title.match(/^(.*?)\s*\((.*?)\)$/)
                const arTitle = match ? match[1] : val.title
                const enTitle = match ? match[2] : ''

                return (
                  <React.Fragment key={val.number}>
                    <div
                      onClick={() => handleSelectStage(idx)}
                      className={`w-full md:flex-1 p-[3px] rounded-[2rem] cursor-pointer transition-all duration-300 ease-out flex flex-col select-none ${
                        isActive
                          ? 'shadow-xl -translate-y-2 ring-4 ring-[#12372A]/10 z-10 scale-[1.01]'
                          : isCompleted
                          ? 'shadow-sm hover:-translate-y-0.5'
                          : 'shadow-xs hover:-translate-y-1'
                      }`}
                      style={{
                        background: isActive
                          ? `conic-gradient(from -90deg, #12372A ${stageProgress}%, #E5DFD3 ${stageProgress}%)`
                          : isCompleted
                          ? '#12372A'
                          : '#E5DFD3'
                      }}
                    >
                      <div className="w-full h-full bg-white p-6 sm:p-8 rounded-[calc(2rem-3px)] flex flex-col justify-center text-center min-h-[210px] sm:min-h-[230px]">
                        <div className="mb-2.5">
                          <h3 className="text-xl sm:text-2xl font-black text-[#12372A] tracking-tight">
                            {arTitle}
                          </h3>
                          {enTitle && (
                            <span className="block text-xs sm:text-sm font-bold text-[#9C7546] mt-1 tracking-wider uppercase">
                              ({enTitle})
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-[#556b60] leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    </div>

                    {/* Connecting line between cards in Row 2 */}
                    {rowIdx < 2 && (
                      <div className="hidden md:flex items-center w-8 sm:w-12 lg:w-14 shrink-0 h-1 bg-[#E5DFD3] rounded-full overflow-hidden mx-2 sm:mx-3">
                        <div
                          className="h-full bg-[#12372A] transition-all duration-500 ease-out"
                          style={{
                            width: activeStage > idx ? '100%' : '0%'
                          }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Master CTA Section (Same as Home page) */}
      <MasterCtaSection />
    </div>
  )
}
