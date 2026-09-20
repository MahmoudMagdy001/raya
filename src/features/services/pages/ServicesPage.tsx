import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getServices } from '../../../lib/supabase'
import { Service } from '../../../lib/types'
import { INITIAL_SERVICES } from '../../../data/initialData'
import { Film, Camera, Globe, Smartphone, Cpu, ArrowUpLeft, Check, Sparkles } from 'lucide-react'

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)

  useEffect(() => {
    async function load() {
      const data = await getServices()
      if (data && data.length > 0) setServices(data)
    }
    load()
  }, [])

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'Camera': return <Camera className="w-8 h-8" />
      case 'Globe': return <Globe className="w-8 h-8" />
      case 'Smartphone': return <Smartphone className="w-8 h-8" />
      case 'Cpu': return <Cpu className="w-8 h-8" />
      case 'Film':
      default: return <Film className="w-8 h-8" />
    }
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] text-center relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#205341] text-[#C5A880] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>حلول الإنتاج الشاملة</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">
            خدمات راية الإبداعية والتقنية
          </h1>
          <p className="text-lg sm:text-xl text-[#b9d5c7] max-w-2xl mx-auto">
            نجمع بين عمق التفكير الاستراتيجي وأحدث أدوات الإنتاج السينمائي والتقني.
          </p>
        </div>
      </section>

      {/* Services List with Detailed Breakdown */}
      <section className="py-20 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 1
            return (
              <div
                key={service.id}
                id={service.slug}
                className={`bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DFD3] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual / Image Side */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0B221A] shadow-md group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4 text-right">
                      <span className="px-3 py-1 rounded-full bg-[#C5A880] text-[#12372A] text-xs font-black">
                        {service.badge || 'خدمة معتمدة'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#12372A] text-[#C5A880] flex items-center justify-center">
                      {getServiceIcon(service.icon_name)}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12372A]">
                        {service.title}
                      </h2>
                      {service.subtitle && (
                        <p className="text-xs sm:text-sm font-semibold text-[#C5A880]">
                          {service.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-base text-[#335948] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  {service.deliverables && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-bold text-[#12372A] uppercase tracking-wider">
                        ما الذي تستلمه في هذه الخدمة؟
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-xs text-[#6b7f74]">
                            <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#174233] text-[#F4EFE6] px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all"
                    >
                      <span>عرض كامل المخرجات ونماذج العمل</span>
                      <ArrowUpLeft className="w-4 h-4 text-[#C5A880]" />
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#12372A] hover:text-[#205341] px-4 py-3"
                    >
                      <span>طلب الخدمة مباشرة</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
