import React, { useState, useEffect } from 'react'
import { getServices } from '../../../lib/supabase'
import { Service } from '../../../lib/types'
import { INITIAL_SERVICES } from '../../../data/initialData'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceCardSkeleton } from '../../../components/ui/skeleton'

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices()
        if (data && data.length > 0) setServices(data)
      } catch (err) {
        console.error('Error loading services:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4EFE6]">
            خدمات راية{' '}
            <span className="relative inline-block text-[#C5A880]">
              الإبداعية والتقنية
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
            نجمع بين عمق التفكير الاستراتيجي وأحدث أدوات الإنتاج السينمائي والتقني.
          </p>
        </div>
      </section>

      {/* Services List with Detailed Breakdown */}
      <section className="py-20 sm:py-24 bg-[#F4EFE6] border-t border-[#E5DFD3]/60 relative">
        <div className="max-w-7xl 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {loading ? (
            <>
              <ServiceCardSkeleton mode="detailed" />
              <ServiceCardSkeleton mode="detailed" />
              <ServiceCardSkeleton mode="detailed" />
            </>
          ) : (
            services.map((service, index) => (
              <ServiceCard
                key={service.id || service.slug || index}
                service={service}
                index={index}
              />
            ))
          )}
        </div>
      </section>

      {/* Master CTA Section (Same as Home page) */}
      <MasterCtaSection />
    </div>
  )
}
