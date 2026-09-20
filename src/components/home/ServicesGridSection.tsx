import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Service } from '../../lib/types'
import { ArrowUpLeft, Check } from 'lucide-react'

interface ServicesGridSectionProps {
  services: Service[]
}

type ServiceCategory = 'all' | 'creative' | 'tech'

export const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({ services }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all')

  // Filter services based on category
  const filteredServices = services.filter((service) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'creative') {
      return service.slug === 'short-form-content' || service.slug === 'events-coverage'
    }
    if (activeCategory === 'tech') {
      return (
        service.slug === 'web-development' ||
        service.slug === 'mobile-app-development' ||
        service.slug === 'ai-solutions'
      )
    }
    return true
  })

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#E5DFD3] relative overflow-hidden">
      {/* Ambient Lighting & Luxury Atmosphere */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-[#12372A]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight">
            خدمات راية{' '}
            <span className="relative inline-block text-[#C5A880]">
              الإبداعية والتقنية
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
            من فكرة المحتوى السينمائي إلى المنصات والأنظمة الذكية.. نقدم حلولاً متكاملة تضاعف أثر علامتك وتخدم أهداف نموها التجاري.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#12372A] text-[#F3D7A4] shadow-md shadow-[#12372A]/15 border border-[#E5C378]/30 scale-105'
                : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]/30 hover:bg-[#FAF7F2]'
            }`}
          >
            جميع الخدمات والحلول ({services.length})
          </button>
          <button
            onClick={() => setActiveCategory('creative')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'creative'
                ? 'bg-[#12372A] text-[#F3D7A4] shadow-md shadow-[#12372A]/15 border border-[#E5C378]/30 scale-105'
                : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]/30 hover:bg-[#FAF7F2]'
            }`}
          >
            الإنتاج الفني وصناعة المحتوى (2)
          </button>
          <button
            onClick={() => setActiveCategory('tech')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'tech'
                ? 'bg-[#12372A] text-[#F3D7A4] shadow-md shadow-[#12372A]/15 border border-[#E5C378]/30 scale-105'
                : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]/30 hover:bg-[#FAF7F2]'
            }`}
          >
            الأنظمة والحلول التقنية (3)
          </button>
        </div>

        {/* Services Grid (Bento Grid on 'all', or uniform columns when filtered) */}
        <div
          className={
            activeCategory === 'all'
              ? 'grid grid-cols-1 md:grid-cols-12 gap-8'
              : activeCategory === 'creative'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        >
          {filteredServices.map((service, index) => {
            // Bento spans for 'all' mode: Row 1 is 7 + 5 = 12. Row 2 is 4 + 4 + 4 = 12.
            const bentoSpan =
              activeCategory === 'all'
                ? index === 0
                  ? 'md:col-span-12 lg:col-span-7'
                  : index === 1
                  ? 'md:col-span-12 lg:col-span-5'
                  : 'md:col-span-6 lg:col-span-4'
                : ''

            return (
              <div
                key={service.id}
                className={`group bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD3] hover:border-[#C5A880] shadow-sm hover:shadow-2xl hover:shadow-[#12372A]/8 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5 ${bentoSpan}`}
              >
                <div>
                  {/* Service Visual Preview Banner */}
                  {service.image && (
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl mb-6 bg-[#0B221A]">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-black/25 to-transparent" />

                      {/* Top Overlay Badge */}
                      {service.badge && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#12372A]/90 backdrop-blur-md text-[#F3D7A4] border border-[#E5C378]/30 shadow-xs">
                            {service.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#12372A] mb-1.5 group-hover:text-[#205341] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-xs font-bold text-[#C5A880] mb-3.5 line-clamp-1">
                      {service.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-[#4f6b5c] leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  {service.deliverables && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-[#E5DFD3]/80">
                      <p className="text-[11px] font-bold text-[#12372A] uppercase tracking-wider mb-2.5">
                        المخرجات الرئيسية:
                      </p>
                      {service.deliverables.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-xs text-[#205341] font-medium">
                          <div className="w-4 h-4 rounded-full bg-[#12372A]/10 text-[#12372A] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-[#12372A] stroke-[3]" />
                          </div>
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#E5DFD3]">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full text-sm font-extrabold text-[#12372A] group-hover:text-[#205341] transition-colors"
                  >
                    <span>تفاصيل الخدمة ونماذج العمل</span>
                    <div className="w-9 h-9 rounded-full bg-[#12372A]/8 group-hover:bg-[#12372A] group-hover:text-[#F3D7A4] text-[#12372A] flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1.5 shadow-xs">
                      <ArrowUpLeft className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
