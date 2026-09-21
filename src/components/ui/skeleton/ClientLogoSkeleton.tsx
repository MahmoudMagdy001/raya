import React from 'react'
import { Skeleton } from './Skeleton'

export const ClientLogoSkeleton: React.FC = () => {
  return (
    <div className="w-44 sm:w-56 p-4 sm:p-5 bg-white rounded-3xl border border-[#E5DFD3] shadow-xs flex flex-col items-center justify-between text-center gap-3 shrink-0 select-none">
      {/* Client Logo / Icon Box */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FAF7F2] flex items-center justify-center p-2 border border-[#E5DFD3]/40">
        <Skeleton variant="light" rounded="xl" className="w-9 h-9" />
      </div>

      {/* Client Names */}
      <div className="w-full flex flex-col items-center gap-1.5 pt-1">
        <Skeleton variant="light" rounded="md" className="h-4 w-24" />
        <Skeleton variant="light" rounded="md" className="h-3 w-16 opacity-60" />
      </div>
    </div>
  )
}
