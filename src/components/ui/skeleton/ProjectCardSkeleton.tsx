import React from 'react'
import { Skeleton } from './Skeleton'

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0B221A] rounded-3xl overflow-hidden border border-[#C5A880]/20 shadow-xl flex flex-col justify-between relative select-none">
      {/* Visual Media Placeholder */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] w-full bg-[#071711] overflow-hidden">
        <Skeleton variant="card" className="w-full h-full" rounded="none" />
        
        {/* Top Badges */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-10">
          <Skeleton variant="dark" rounded="full" className="h-6 w-24 bg-[#12372A]/80 border border-white/10" />
          <Skeleton variant="dark" rounded="full" className="w-8 h-8 bg-black/40 border border-white/10" />
        </div>

        {/* Client Tag Placeholder */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          <Skeleton variant="gold" rounded="full" className="w-2 h-2" />
          <Skeleton variant="dark" rounded="md" className="h-4 w-20" />
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 pb-2 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title Lines */}
          <Skeleton variant="dark" rounded="md" className="h-5 w-4/5" />
          <Skeleton variant="dark" rounded="md" className="h-4 w-3/5 opacity-60" />
        </div>

        {/* Metrics Pill Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#12372A]/80">
          <div className="bg-[#12372A]/40 rounded-xl p-2 flex flex-col gap-1">
            <Skeleton variant="dark" rounded="md" className="h-3 w-10 opacity-70" />
            <Skeleton variant="dark" rounded="md" className="h-4 w-16" />
          </div>
          <div className="bg-[#12372A]/40 rounded-xl p-2 flex flex-col gap-1">
            <Skeleton variant="dark" rounded="md" className="h-3 w-10 opacity-70" />
            <Skeleton variant="dark" rounded="md" className="h-4 w-16" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-[#12372A]">
          <Skeleton variant="dark" rounded="full" className="h-7 w-24" />
          <Skeleton variant="dark" rounded="full" className="w-7 h-7" />
        </div>
      </div>
    </div>
  )
}
