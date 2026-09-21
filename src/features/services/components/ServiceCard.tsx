import React from 'react'
import { Link } from 'react-router-dom'
import { Service } from '../../../lib/types'
import { 
  Film, 
  Camera, 
  Globe, 
  Smartphone, 
  Cpu, 
  ArrowUpLeft, 
  Layers, 
  Video, 
  Radio, 
  Tv, 
  PenTool 
} from 'lucide-react'

interface ServiceCardProps {
  service: Service
  index: number
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const isEven = index % 2 === 1

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'Camera': return <Camera className="w-6 h-6 stroke-[1.8]" />
      case 'Globe': return <Globe className="w-6 h-6 stroke-[1.8]" />
      case 'Smartphone': return <Smartphone className="w-6 h-6 stroke-[1.8]" />
      case 'Cpu': return <Cpu className="w-6 h-6 stroke-[1.8]" />
      case 'Layers': return <Layers className="w-6 h-6 stroke-[1.8]" />
      case 'Video': return <Video className="w-6 h-6 stroke-[1.8]" />
      case 'Radio': return <Radio className="w-6 h-6 stroke-[1.8]" />
      case 'Tv': return <Tv className="w-6 h-6 stroke-[1.8]" />
      case 'PenTool': return <PenTool className="w-6 h-6 stroke-[1.8]" />
      case 'Film':
      default: return <Film className="w-6 h-6 stroke-[1.8]" />
    }
  }

  const categoryLabel = service.category === 'tech' 
    ? 'حلول تقنية ورقمية' 
    : 'إنتاج إبداعي وسينمائي'

  const formattedNumber = String(index + 1).padStart(2, '0')

  return (
    <article
      id={service.slug}
      aria-label={service.title}
      className="group relative bg-white rounded-[28px] sm:rounded-[32px] border border-[#E5DFD3] hover:border-[#C9A66B]/50 shadow-[0_4px_24px_-4px_rgba(18,55,42,0.04)] hover:shadow-[0_20px_48px_-12px_rgba(18,55,42,0.09)] transition-all duration-500 ease-out overflow-hidden"
    >
      {/* Background Accent Subtle Glow on Hover */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 bg-[#C9A66B]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        aria-hidden="true" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-full">
        {/* Visual / Image Side - Takes full space edge-to-edge */}
        <div className={`lg:col-span-5 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full overflow-hidden bg-[#071712] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0B3B2E] text-[#C9A66B]">
              {getServiceIcon(service.icon_name)}
            </div>
          )}

          {/* Directional Shadow Towards Text (ظل من اليمين للشمال مع اتجاه الكلام) */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isEven
                ? 'bg-gradient-to-r from-transparent via-[#071712]/40 via-55% to-[#071712]/95'
                : 'bg-gradient-to-l from-transparent via-[#071712]/40 via-55% to-[#071712]/95'
            }`}
            aria-hidden="true"
          />

          {/* Subtle Top Floating Badge */}
          {service.badge && (
            <div className="absolute top-5 right-5 z-10">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-[#F4EFE6] border border-white/15 shadow-sm">
                {service.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content Side with Dedicated Breathing Room */}
        <div className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          {/* Metadata & Service Counter Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-xs font-bold tracking-widest text-[#C9A66B] bg-[#C9A66B]/10 px-2.5 py-0.5 rounded-full border border-[#C9A66B]/25">
              {formattedNumber}
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#6b7f74]">
              {categoryLabel}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E5DFD3]" aria-hidden="true" />
          </div>

          {/* Service Title Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#12352D] tracking-tight leading-tight group-hover:text-[#0B3B2E] transition-colors">
              {service.title}
            </h2>
            {service.subtitle && (
              <p className="text-xs sm:text-sm font-bold text-[#C9A66B] mt-1.5 leading-snug">
                {service.subtitle}
              </p>
            )}
          </div>

          {/* Editorial Description */}
          <p className="text-[15px] sm:text-base text-[#335948] leading-[1.85] max-w-2xl font-normal">
            {service.description}
          </p>

          {/* Deliverables / Feature Chips */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" aria-hidden="true" />
                <h3 className="text-xs font-extrabold text-[#12352D] tracking-wide">
                  ما الذي تستلمه في هذه الخدمة؟
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]/70 hover:border-[#C9A66B]/40 hover:bg-[#F4EFE6] transition-all duration-200"
                  >
                    <span className="text-xs font-semibold text-[#12352D] leading-snug line-clamp-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs (Strict Hierarchy) */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
            {/* Primary CTA */}
            <Link
              to={`/services/${service.slug}`}
              className="group/btn inline-flex items-center gap-3 bg-[#0B3B2E] hover:bg-[#12372A] text-[#F7F4ED] px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-300 border border-[#C9A66B]/25 hover:border-[#C9A66B]/60"
            >
              <span>عرض كامل المخرجات ونماذج العمل</span>
              <span 
                className="w-6 h-6 rounded-full bg-white/10 group-hover/btn:bg-[#C9A66B] text-[#C9A66B] group-hover/btn:text-[#0B3B2E] flex items-center justify-center transition-all duration-300 transform group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              >
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#12352D] hover:text-[#0B3B2E] px-4 sm:px-5 py-3.5 rounded-full hover:bg-[#FAF7F2] border border-transparent hover:border-[#E5DFD3] transition-all duration-200"
            >
              <span>طلب الخدمة مباشرة</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
