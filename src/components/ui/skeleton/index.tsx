import React from 'react'
import { Skeleton } from './Skeleton'

export * from './Skeleton'

export const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-[#0B221A] rounded-3xl overflow-hidden border border-[#C5A880]/20 shadow-xl flex flex-col justify-between p-4 space-y-4 select-none">
    <Skeleton variant="card" className="w-full aspect-[16/10] rounded-2xl" />
    <div className="space-y-2">
      <Skeleton variant="dark" rounded="md" className="h-5 w-4/5" />
      <Skeleton variant="dark" rounded="md" className="h-4 w-3/5 opacity-60" />
    </div>
    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#12372A]/80">
      <Skeleton variant="dark" rounded="xl" className="h-12 w-full" />
      <Skeleton variant="dark" rounded="xl" className="h-12 w-full" />
    </div>
  </div>
)

export const ServiceCardSkeleton: React.FC<{ mode?: 'detailed' | 'grid'; bentoSpan?: string }> = ({
  mode = 'detailed',
  bentoSpan = ''
}) => {
  if (mode === 'grid') {
    return (
      <div className={`bg-white rounded-3xl p-6 border border-[#E5DFD3] shadow-sm flex flex-col justify-between space-y-4 select-none ${bentoSpan}`}>
        <Skeleton variant="light" className="w-full h-44 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton variant="light" rounded="md" className="h-6 w-3/4" />
          <Skeleton variant="light" rounded="md" className="h-4 w-full" />
        </div>
        <div className="flex gap-2 pt-2 border-t border-[#E5DFD3]/60">
          <Skeleton variant="light" rounded="full" className="h-7 w-20" />
          <Skeleton variant="light" rounded="full" className="h-7 w-24" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[28px] border border-[#E5DFD3] shadow-sm overflow-hidden select-none grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
      <div className="p-8 lg:col-span-7 flex flex-col justify-between space-y-4">
        <Skeleton variant="light" rounded="md" className="h-8 w-2/3" />
        <div className="space-y-2">
          <Skeleton variant="light" rounded="md" className="h-4 w-full" />
          <Skeleton variant="light" rounded="md" className="h-4 w-4/5" />
        </div>
        <div className="flex gap-2 pt-3">
          <Skeleton variant="light" rounded="full" className="h-8 w-28" />
          <Skeleton variant="light" rounded="full" className="h-8 w-24" />
        </div>
      </div>
      <div className="lg:col-span-5 bg-[#FAF7F2] min-h-[200px]">
        <Skeleton variant="light" className="w-full h-full" rounded="none" />
      </div>
    </div>
  )
}

export const ReelCardSkeleton: React.FC = () => (
  <div className="relative flex-none w-64 sm:w-72 aspect-[9/16] rounded-2xl overflow-hidden shadow-md border border-[#E5DFD3]/80 bg-[#0B221A] select-none p-4 flex flex-col justify-between">
    <div className="flex justify-between">
      <Skeleton variant="dark" rounded="full" className="h-6 w-20" />
      <Skeleton variant="dark" rounded="full" className="h-6 w-16" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="gold" rounded="md" className="h-3 w-20" />
      <Skeleton variant="dark" rounded="md" className="h-4 w-4/5" />
    </div>
  </div>
)

export const ClientLogoSkeleton: React.FC = () => (
  <div className="w-44 sm:w-56 p-4 sm:p-5 bg-white rounded-3xl border border-[#E5DFD3] shadow-xs flex flex-col items-center justify-between gap-3 shrink-0 select-none">
    <Skeleton variant="light" rounded="2xl" className="w-16 h-16" />
    <Skeleton variant="light" rounded="md" className="h-4 w-24" />
  </div>
)

export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] shadow-sm flex flex-col justify-between select-none p-5 space-y-4">
    <Skeleton variant="card" className="w-full h-48 rounded-2xl" />
    <div className="space-y-2">
      <Skeleton variant="light" rounded="md" className="h-5 w-3/4" />
      <Skeleton variant="light" rounded="md" className="h-4 w-full" />
    </div>
    <div className="flex justify-between pt-2 border-t border-[#E5DFD3]/60">
      <Skeleton variant="light" rounded="md" className="h-4 w-20" />
      <Skeleton variant="light" rounded="full" className="w-7 h-7" />
    </div>
  </div>
)

export const BlogHeroSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] shadow-sm grid grid-cols-1 lg:grid-cols-12 select-none min-h-[320px]">
    <div className="lg:col-span-7 bg-[#0B221A] min-h-[240px]">
      <Skeleton variant="card" className="w-full h-full" rounded="none" />
    </div>
    <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <Skeleton variant="light" rounded="full" className="h-6 w-24" />
        <Skeleton variant="light" rounded="md" className="h-8 w-4/5" />
        <Skeleton variant="light" rounded="md" className="h-4 w-full" />
      </div>
      <Skeleton variant="light" rounded="full" className="h-8 w-32" />
    </div>
  </div>
)

export const CaseStudyDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#FAF7F2] select-none space-y-8 pb-16">
    <div className="pt-32 pb-16 bg-[#12372A] text-center px-4 space-y-4">
      <Skeleton variant="gold" rounded="full" className="h-7 w-28 mx-auto" />
      <Skeleton variant="dark" rounded="lg" className="h-10 w-2/3 mx-auto" />
      <Skeleton variant="dark" rounded="md" className="h-4 w-1/2 mx-auto" />
    </div>
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <Skeleton variant="card" className="w-full aspect-video rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton variant="light" rounded="2xl" className="h-48 w-full" />
        <Skeleton variant="light" rounded="2xl" className="h-48 w-full" />
      </div>
    </div>
  </div>
)

export const ServiceDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#FAF7F2] select-none space-y-8 pb-16">
    <div className="pt-32 pb-16 bg-[#12372A] text-center px-4 space-y-4">
      <Skeleton variant="gold" rounded="full" className="h-7 w-28 mx-auto" />
      <Skeleton variant="dark" rounded="lg" className="h-10 w-2/3 mx-auto" />
    </div>
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <Skeleton variant="light" rounded="2xl" className="h-64 w-full" />
      <Skeleton variant="light" rounded="2xl" className="h-40 w-full" />
    </div>
  </div>
)

export const BlogPostDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#FAF7F2] select-none space-y-8 pb-16">
    <div className="pt-32 pb-16 bg-[#12372A] text-center px-4 space-y-4">
      <Skeleton variant="gold" rounded="full" className="h-7 w-28 mx-auto" />
      <Skeleton variant="dark" rounded="lg" className="h-10 w-3/4 mx-auto" />
    </div>
    <div className="max-w-3xl mx-auto px-4 space-y-4">
      <Skeleton variant="card" className="w-full aspect-[16/9] rounded-2xl" />
      <Skeleton variant="light" rounded="md" className="h-4 w-full" />
      <Skeleton variant="light" rounded="md" className="h-4 w-5/6" />
    </div>
  </div>
)

export const AdminTableSkeleton: React.FC<{ rows?: number; hasThumbnail?: boolean }> = ({ rows = 5 }) => (
  <div className="bg-white rounded-2xl border border-[#E5DFD3] p-4 shadow-xs select-none space-y-4">
    <div className="flex justify-between items-center pb-4 border-b border-[#E5DFD3]">
      <Skeleton variant="light" rounded="xl" className="h-10 w-64" />
      <Skeleton variant="light" rounded="xl" className="h-10 w-28" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2 border-b border-[#E5DFD3]/40">
          <Skeleton variant="light" rounded="lg" className="w-12 h-10 shrink-0" />
          <div className="flex-1 space-y-1">
            <Skeleton variant="light" rounded="md" className="h-4 w-48" />
            <Skeleton variant="light" rounded="md" className="h-3 w-28 opacity-60" />
          </div>
          <Skeleton variant="light" rounded="full" className="h-6 w-20" />
        </div>
      ))}
    </div>
  </div>
)

export const AdminGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl border border-[#E5DFD3] p-4 space-y-4 shadow-xs">
        <Skeleton variant="light" rounded="xl" className="h-40 w-full" />
        <Skeleton variant="light" rounded="md" className="h-5 w-3/4" />
        <Skeleton variant="light" rounded="md" className="h-3.5 w-1/2 opacity-60" />
      </div>
    ))}
  </div>
)
