import React from 'react'
import { Skeleton } from './Skeleton'

interface ServiceCardSkeletonProps {
  mode?: 'detailed' | 'grid'
  bentoSpan?: string
}

export const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({
  mode = 'detailed',
  bentoSpan = ''
}) => {
  if (mode === 'grid') {
    return (
      <div
        className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD3] shadow-sm flex flex-col justify-between select-none ${bentoSpan}`}
      >
        <div>
          {/* Banner Placeholder */}
          <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl mb-6 bg-[#FAF7F2]">
            <Skeleton variant="light" className="w-full h-full" rounded="2xl" />
          </div>

          {/* Title & Category */}
          <div className="space-y-2 mb-4">
            <Skeleton variant="light" rounded="full" className="h-5 w-24" />
            <Skeleton variant="light" rounded="md" className="h-6 w-3/4" />
          </div>

          {/* Description */}
          <div className="space-y-2 mb-6">
            <Skeleton variant="light" rounded="md" className="h-4 w-full" />
            <Skeleton variant="light" rounded="md" className="h-4 w-5/6" />
          </div>

          {/* Deliverables Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton variant="light" rounded="full" className="h-7 w-20" />
            <Skeleton variant="light" rounded="full" className="h-7 w-24" />
            <Skeleton variant="light" rounded="full" className="h-7 w-16" />
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-[#E5DFD3]/60 flex items-center justify-between">
          <Skeleton variant="light" rounded="md" className="h-4 w-28" />
          <Skeleton variant="light" rounded="full" className="w-7 h-7" />
        </div>
      </div>
    )
  }

  // Detailed Stacked / Horizontal Card (Matching ServicesPage)
  return (
    <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#E5DFD3] shadow-sm overflow-hidden select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-full">
        {/* Content Side (7 cols) */}
        <div className="p-8 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header / Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton variant="light" rounded="xl" className="w-11 h-11" />
                <Skeleton variant="light" rounded="full" className="h-6 w-28" />
              </div>
              <Skeleton variant="light" rounded="md" className="h-6 w-10" />
            </div>

            {/* Title */}
            <Skeleton variant="light" rounded="md" className="h-8 w-2/3" />

            {/* Description lines */}
            <div className="space-y-2 pt-2">
              <Skeleton variant="light" rounded="md" className="h-4 w-full" />
              <Skeleton variant="light" rounded="md" className="h-4 w-11/12" />
              <Skeleton variant="light" rounded="md" className="h-4 w-4/5" />
            </div>

            {/* Deliverables Badges */}
            <div className="flex flex-wrap gap-2 pt-3">
              <Skeleton variant="light" rounded="full" className="h-8 w-28" />
              <Skeleton variant="light" rounded="full" className="h-8 w-32" />
              <Skeleton variant="light" rounded="full" className="h-8 w-24" />
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-[#E5DFD3]/60 flex items-center justify-between">
            <Skeleton variant="light" rounded="full" className="h-10 w-36" />
            <Skeleton variant="light" rounded="full" className="h-8 w-24" />
          </div>
        </div>

        {/* Media Side (5 cols) */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] bg-[#FAF7F2]">
          <Skeleton variant="light" className="w-full h-full" rounded="none" />
        </div>
      </div>
    </div>
  )
}
