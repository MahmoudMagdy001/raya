import React from 'react'
import { PARTNERS_DATA } from './PartnerLogos'

export const ClientsSection: React.FC = () => {
  return (
    <section className="pt-4 sm:pt-8 pb-16 sm:pb-24 bg-[#FAF7F2] border-b border-[#E5DFD3] relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-[#12372A]/5 rounded-full blur-3xl" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight">
            علامات تجارية وكيانات{' '}
            <span className="relative inline-block text-[#C5A880]">
              وثقت براية
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
            نفخر بوضع بصمتنا الإبداعية والتقنية مع نخبة من الجهات الحكومية والشركات القابضة والعلامات التجارية الرائدة في المملكة.
          </p>
        </div>

        {/* 8 Distinctive Luxury Partner Brand Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-4 xl:gap-5 items-stretch justify-center">
          {PARTNERS_DATA.map((partner) => {
            const Icon = partner.Icon
            return (
              <div
                key={partner.id}
                className="group p-4 sm:p-5 bg-white rounded-3xl border border-[#E5DFD3] hover:border-[#C5A880] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center gap-3 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden"
                title={partner.name}
              >
                {/* Top Subtle Golden Hover Accent Line */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Vector Brand Emblem */}
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] group-hover:bg-[#12372A] text-[#12372A] group-hover:text-[#F4EFE6] flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110 shrink-0">
                  <Icon className="w-7 h-7 transition-colors" />
                </div>

                {/* Typography Brand Lockup */}
                <div className="space-y-0.5 w-full">
                  <span className="text-xs sm:text-sm font-black text-[#12372A] group-hover:text-[#205341] block transition-colors leading-tight truncate">
                    {partner.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#C5A880] tracking-wider uppercase block truncate">
                    {partner.enName}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
