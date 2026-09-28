import React from 'react'

export const RouteLoadingFallback: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF7F2]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-3 border-[#E5DFD3]" />
        <div className="absolute inset-0 rounded-full border-3 border-[#12372A] border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold text-[#5a7769] tracking-wide animate-pulse">
        جاري التحميل...
      </p>
    </div>
  )
}
