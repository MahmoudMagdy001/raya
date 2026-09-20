import React, { useState, useEffect } from 'react'
import { getServices } from '../../../lib/supabase'
import { Service } from '../../../lib/types'
import { INITIAL_SERVICES } from '../../../data/initialData'
import { Check } from 'lucide-react'

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)

  useEffect(() => {
    async function load() {
      const data = await getServices()
      if (data && data.length > 0) setServices(data)
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#12372A]">
          إدارة الخدمات الإبداعية والتقنية
        </h2>
        <p className="text-xs sm:text-sm text-[#6b7f74]">
          مراجعة الخدمات الخمس، المخرجات وقوائم التسليم (Deliverables)، وحالات النشر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white p-6 rounded-2xl border border-[#E5DFD3] shadow-xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider block">
                  {srv.slug}
                </span>
                <h3 className="text-lg font-bold text-[#12372A]">
                  {srv.title}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#205341]/10 text-xs font-bold text-[#205341]">
                {srv.badge || 'نشط'}
              </span>
            </div>

            <p className="text-xs text-[#6b7f74] line-clamp-2">
              {srv.description}
            </p>

            {srv.deliverables && (
              <div className="pt-3 border-t border-[#E5DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#12372A] block mb-1">المخرجات المعتمدة:</span>
                {srv.deliverables.slice(0, 3).map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#335948]">
                    <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
