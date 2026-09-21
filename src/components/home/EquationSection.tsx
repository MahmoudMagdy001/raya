import React from 'react'
import { Target, Lightbulb, ClipboardList, Camera, Award, ChevronLeft } from 'lucide-react'

export const EquationSection: React.FC = () => {
  const equationSteps = [
    { label: 'هدف', icon: Target },
    { label: 'فكرة', icon: Lightbulb },
    { label: 'تخطيط', icon: ClipboardList },
    { label: 'تنفيذ', icon: Camera },
    { label: 'محتوى نهائي', icon: Award }
  ]

  const subValues = [
    'رؤية استراتيجية واضحة',
    'زاوية طرح مبتكرة',
    'هندسة سيناريو محكم',
    'إنتاج وإخراج سينمائي',
    'أثر حقيقي وانتشار'
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#F4EFE6] text-[#12372A] relative overflow-hidden border-y border-[#E5DFD3]">
      {/* Subtle warm ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight leading-tight max-w-3xl mx-auto">
            المعادلة الذهبية لتحويل الفكرة إلى{' '}
            <span className="relative inline-block text-[#b38e5c]">
              أثر ملموس
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

          <p className="mt-4 text-base sm:text-lg text-[#335948] max-w-2xl mx-auto font-medium leading-relaxed">
            خمس محطات إبداعية متسلسلة نمر بها في كل مشروع لضمان محتوى يترك بصمة حقيقية ويحقق أهدافك التسويقية.
          </p>
        </div>

        {/* The Equation Capsule Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#12372A] hover:bg-[#0E2B21] border border-[#C5A880]/30 hover:border-[#C5A880]/50 rounded-full px-6 py-3.5 sm:px-8 sm:py-4 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1">
              {equationSteps.map((step, idx) => {
                const IconComponent = step.icon
                return (
                  <React.Fragment key={step.label}>
                    <div className="group/step flex items-center gap-2 sm:gap-2.5 shrink-0 select-none cursor-default">
                      {/* Unified Calm Icon Circle */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0B221A] border border-[#C5A880]/30 group-hover/step:border-[#C5A880] flex items-center justify-center text-[#C5A880] transition-all duration-300 group-hover/step:scale-105 shadow-inner">
                        <IconComponent className="w-4 h-4 text-[#C5A880] transition-transform duration-300" />
                      </div>

                      {/* Unified Calm Label */}
                      <span className="text-sm sm:text-base font-bold tracking-wide text-[#F4EFE6] group-hover/step:text-[#C5A880] transition-colors duration-300">
                        {step.label}
                      </span>
                    </div>

                    {/* Unified Calm Directional Connector */}
                    {idx < equationSteps.length - 1 && (
                      <div className="flex items-center justify-center shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft className="w-4 h-4 text-[#C5A880] stroke-[2]" />
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>

        {/* Micro-Value Anchor Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-[#6b7f74]">
          {subValues.map((val) => (
            <div key={val} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70" />
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
