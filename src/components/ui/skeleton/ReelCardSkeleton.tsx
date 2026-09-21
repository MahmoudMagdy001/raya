import React from 'react'
import { Skeleton } from './Skeleton'

export const ReelCardSkeleton: React.FC = () => {
  return (
    <div className="relative flex-none w-64 sm:w-72 aspect-[9/16] rounded-2xl overflow-hidden shadow-md border border-[#E5DFD3]/80 bg-[#0B221A] select-none">
      {/* Background Media Shimmer */}
      <Skeleton variant="card" className="w-full h-full" rounded="none" />

      {/* Top Badges */}
      <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
        <Skeleton variant="dark" rounded="full" className="h-6 w-20 bg-black/60 border border-white/10" />
        <Skeleton variant="dark" rounded="full" className="h-6 w-16 bg-[#12372A]/80 border border-white/10" />
      </div>

      {/* Center Play Button Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-14 h-14 rounded-full bg-[#C5A880]/30 flex items-center justify-center border border-[#C5A880]/40">
          <Skeleton variant="gold" rounded="full" className="w-10 h-10" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 right-4 left-4 text-right space-y-2 z-10">
        <Skeleton variant="gold" rounded="md" className="h-3 w-20" />
        <Skeleton variant="dark" rounded="md" className="h-4 w-5/6" />
        <Skeleton variant="dark" rounded="md" className="h-3 w-2/3 opacity-70" />
        <div className="pt-1">
          <Skeleton variant="dark" rounded="full" className="h-3 w-16 opacity-60" />
        </div>
      </div>
    </div>
  )
}
