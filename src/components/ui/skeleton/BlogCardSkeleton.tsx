import React from 'react'
import { Skeleton } from './Skeleton'

export const BlogHeroSkeleton: React.FC = () => {
  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] shadow-sm select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual Cover Side */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#0B221A]">
          <Skeleton variant="card" className="w-full h-full min-h-[300px]" rounded="none" />
          <div className="absolute top-4 right-4">
            <Skeleton variant="gold" rounded="full" className="h-6 w-20" />
          </div>
        </div>

        {/* Info Side */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Badges / Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton variant="light" rounded="full" className="h-6 w-24" />
              <Skeleton variant="light" rounded="md" className="h-4 w-20" />
              <Skeleton variant="light" rounded="md" className="h-4 w-24" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Skeleton variant="light" rounded="md" className="h-8 w-11/12" />
              <Skeleton variant="light" rounded="md" className="h-7 w-4/5" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 pt-2">
              <Skeleton variant="light" rounded="md" className="h-4 w-full" />
              <Skeleton variant="light" rounded="md" className="h-4 w-11/12" />
              <Skeleton variant="light" rounded="md" className="h-4 w-3/4" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton variant="light" rounded="lg" className="h-6 w-16" />
              <Skeleton variant="light" rounded="lg" className="h-6 w-20" />
              <Skeleton variant="light" rounded="lg" className="h-6 w-14" />
            </div>
          </div>

          {/* Author footer */}
          <div className="pt-6 border-t border-[#E5DFD3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton variant="light" rounded="full" className="w-10 h-10" />
              <div className="space-y-1">
                <Skeleton variant="light" rounded="md" className="h-4 w-24" />
                <Skeleton variant="light" rounded="md" className="h-3 w-16 opacity-60" />
              </div>
            </div>
            <Skeleton variant="light" rounded="full" className="h-8 w-28" />
          </div>
        </div>
      </div>
    </article>
  )
}

export const BlogCardSkeleton: React.FC = () => {
  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] shadow-sm flex flex-col justify-between select-none">
      <div>
        {/* Cover Thumbnail */}
        <div className="relative h-52 w-full overflow-hidden bg-[#0B221A]">
          <Skeleton variant="card" className="w-full h-full" rounded="none" />
          <div className="absolute top-3 right-3">
            <Skeleton variant="dark" rounded="full" className="h-6 w-20 bg-black/50" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs">
            <Skeleton variant="light" rounded="md" className="h-3 w-16" />
            <Skeleton variant="light" rounded="md" className="h-3 w-20" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton variant="light" rounded="md" className="h-5 w-full" />
            <Skeleton variant="light" rounded="md" className="h-5 w-4/5" />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5 pt-1">
            <Skeleton variant="light" rounded="md" className="h-3.5 w-full" />
            <Skeleton variant="light" rounded="md" className="h-3.5 w-11/12" />
            <Skeleton variant="light" rounded="md" className="h-3.5 w-2/3" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Skeleton variant="light" rounded="md" className="h-5 w-14" />
            <Skeleton variant="light" rounded="md" className="h-5 w-16" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 border-t border-[#E5DFD3]/60 flex items-center justify-between mt-4">
        <Skeleton variant="light" rounded="md" className="h-4 w-20" />
        <Skeleton variant="light" rounded="full" className="w-8 h-8" />
      </div>
    </article>
  )
}
