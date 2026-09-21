import React, { useState, useEffect, useMemo } from 'react'
import { Client } from '../../lib/types'
import { PARTNERS_DATA } from './PartnerLogos'
import { Building2 } from 'lucide-react'
import { getClients } from '../../lib/supabase'
import { ClientLogoSkeleton } from '../ui/skeleton'

interface ClientsSectionProps {
  clients?: Client[]
  loading?: boolean
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ clients: propClients, loading: propLoading }) => {
  const [clients, setClients] = useState<Client[]>(propClients || [])
  const [internalLoading, setInternalLoading] = useState<boolean>(!propClients || propClients.length === 0)

  const isLoading = propLoading !== undefined ? propLoading : internalLoading

  useEffect(() => {
    if (propClients && propClients.length > 0) {
      setClients(propClients)
      setInternalLoading(false)
    } else {
      setInternalLoading(true)
      getClients().then(data => {
        if (data && data.length > 0) setClients(data)
      }).catch(console.error).finally(() => setInternalLoading(false))
    }
  }, [propClients])

  const activeClients = useMemo(() => {
    return (clients || []).filter(c => c.status !== 'draft')
  }, [clients])

  // Create lookup for initial SVG icons
  const iconLookup: Record<string, React.FC<{ className?: string }>> = {}
  PARTNERS_DATA.forEach(p => {
    iconLookup[p.id] = p.Icon
    iconLookup[p.name] = p.Icon
  })

  // Deduplicate active clients strictly from database
  const uniqueClients = useMemo(() => {
    const list = activeClients.map(c => ({
      id: c.id,
      name: c.name,
      en_name: c.en_name,
      logo_url: c.logo_url
    }))
    
    const seen = new Set<string>()
    return list.filter(item => {
      const key = item.name.trim().toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [activeClients])

  // Split into Row 1 and Row 2 regardless of total count
  const { row1, row2 } = useMemo(() => {
    if (uniqueClients.length === 0) return { row1: [], row2: [] }
    
    const half = Math.ceil(uniqueClients.length / 2)
    const r1 = uniqueClients.slice(0, half)
    const r2 = uniqueClients.slice(half)

    // Expand items so track has at least 8 items for a continuous seamless loop
    const ensureLoopLength = (arr: typeof uniqueClients) => {
      if (arr.length === 0) return []
      let res = [...arr]
      while (res.length < 8) {
        res = [...res, ...arr]
      }
      return res
    }

    return {
      row1: ensureLoopLength(r1),
      row2: ensureLoopLength(r2.length > 0 ? r2 : r1)
    }
  }, [uniqueClients])

  // Don't render section if no clients exist and not loading
  if (uniqueClients.length === 0 && !isLoading) {
    return null
  }

  // Render Card
  const renderCard = (client: { id: string; name: string; en_name?: string; logo_url?: string }, key: string) => {
    const MatchingIcon = iconLookup[client.id] || iconLookup[client.name]
    return (
      <div
        key={key}
        className="group w-44 sm:w-56 p-4 sm:p-5 bg-white rounded-3xl border border-[#E5DFD3] hover:border-[#C5A880] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center gap-3 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden shrink-0 select-none"
        title={client.name}
      >
        {/* Top Golden Hover Accent Line */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Brand Emblem / Logo Image */}
        <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] group-hover:bg-[#12372A] text-[#12372A] group-hover:text-[#F4EFE6] flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110 shrink-0 overflow-hidden p-1.5">
          {client.logo_url ? (
            <img 
              src={client.logo_url} 
              alt={client.name} 
              className="w-full h-full object-contain" 
            />
          ) : MatchingIcon ? (
            <MatchingIcon className="w-7 h-7 transition-colors" />
          ) : (
            <Building2 className="w-6 h-6 transition-colors" />
          )}
        </div>

        {/* Typography Brand Lockup */}
        <div className="space-y-0.5 w-full">
          <span className="text-xs sm:text-sm font-black text-[#12372A] group-hover:text-[#205341] block transition-colors leading-tight truncate">
            {client.name}
          </span>
          {client.en_name && (
            <span className="text-[9px] font-bold text-[#C5A880] tracking-wider uppercase block truncate">
              {client.en_name}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className="pt-4 sm:pt-8 pb-16 sm:pb-24 bg-[#FAF7F2] border-b border-[#E5DFD3] relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-[#12372A]/5 rounded-full blur-3xl" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* Dual-Row Infinite Marquee Container */}
        {isLoading ? (
          <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
            <div className="flex gap-3 sm:gap-4 overflow-hidden select-none" dir="ltr">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <ClientLogoSkeleton key={`sk-r1-${i}`} />
              ))}
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-hidden select-none" dir="ltr">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <ClientLogoSkeleton key={`sk-r2-${i}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
            {/* Luxury Edge Faders */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />

            {/* Row 1: Infinite Auto-Scroll Left (شمال) */}
            <div className="flex overflow-hidden select-none" dir="ltr">
              <div className="animate-infinite-scroll flex shrink-0 items-center">
                <div className="flex shrink-0 gap-3 sm:gap-4 items-center pr-3 sm:pr-4">
                  {row1.map((client, idx) => renderCard(client, `r1-track1-${client.id}-${idx}`))}
                </div>
                <div className="flex shrink-0 gap-3 sm:gap-4 items-center pr-3 sm:pr-4" aria-hidden="true">
                  {row1.map((client, idx) => renderCard(client, `r1-track2-${client.id}-${idx}`))}
                </div>
              </div>
            </div>

            {/* Row 2: Infinite Auto-Scroll Right (يمين) */}
            <div className="flex overflow-hidden select-none" dir="ltr">
              <div className="animate-infinite-scroll-reverse flex shrink-0 items-center">
                <div className="flex shrink-0 gap-3 sm:gap-4 items-center pr-3 sm:pr-4">
                  {row2.map((client, idx) => renderCard(client, `r2-track1-${client.id}-${idx}`))}
                </div>
                <div className="flex shrink-0 gap-3 sm:gap-4 items-center pr-3 sm:pr-4" aria-hidden="true">
                  {row2.map((client, idx) => renderCard(client, `r2-track2-${client.id}-${idx}`))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
