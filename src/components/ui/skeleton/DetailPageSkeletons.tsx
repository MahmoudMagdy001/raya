import React from 'react'
import { Skeleton } from './Skeleton'

/**
 * Skeleton loader for CaseStudyDetailPage
 */
export const CaseStudyDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen select-none">
      {/* Dark Luxury Hero */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          {/* Back link */}
          <div className="flex justify-center">
            <Skeleton variant="dark" rounded="full" className="h-6 w-36 bg-[#205341]" />
          </div>

          {/* Badges */}
          <div className="flex items-center justify-center gap-3">
            <Skeleton variant="gold" rounded="full" className="h-7 w-28" />
            <Skeleton variant="dark" rounded="full" className="h-7 w-32 bg-[#205341]" />
          </div>

          {/* Title */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <Skeleton variant="dark" rounded="lg" className="h-10 sm:h-12 w-full bg-[#174233]" />
            <Skeleton variant="dark" rounded="lg" className="h-9 sm:h-11 w-4/5 mx-auto bg-[#174233]" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 max-w-2xl mx-auto pt-2">
            <Skeleton variant="dark" rounded="md" className="h-4 w-full bg-[#174233]/70" />
            <Skeleton variant="dark" rounded="md" className="h-4 w-3/4 mx-auto bg-[#174233]/70" />
          </div>

          {/* 4 Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 border border-[#C5A880]/20 rounded-2xl p-4 text-center space-y-2">
                <Skeleton variant="dark" rounded="md" className="h-3 w-16 mx-auto bg-[#205341]" />
                <Skeleton variant="gold" rounded="md" className="h-7 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Showcase & Details */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cinema Video Player Placeholder */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#0B221A] shadow-2xl border border-[#E5DFD3]">
          <Skeleton variant="card" className="w-full h-full" rounded="3xl" />
        </div>

        {/* Challenge & Solution 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-[#E5DFD3] space-y-4">
            <Skeleton variant="light" rounded="md" className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton variant="light" rounded="md" className="h-4 w-full" />
              <Skeleton variant="light" rounded="md" className="h-4 w-11/12" />
              <Skeleton variant="light" rounded="md" className="h-4 w-4/5" />
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[#E5DFD3] space-y-4">
            <Skeleton variant="light" rounded="md" className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton variant="light" rounded="md" className="h-4 w-full" />
              <Skeleton variant="light" rounded="md" className="h-4 w-11/12" />
              <Skeleton variant="light" rounded="md" className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Deliverables Checklist Placeholder */}
        <div className="bg-white rounded-3xl p-8 border border-[#E5DFD3] space-y-6">
          <Skeleton variant="light" rounded="md" className="h-7 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3]/60">
                <Skeleton variant="light" rounded="full" className="w-5 h-5" />
                <Skeleton variant="light" rounded="md" className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Skeleton loader for ServiceDetailPage
 */
export const ServiceDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen select-none">
      {/* Dark Hero */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-6">
          <div className="flex justify-center">
            <Skeleton variant="dark" rounded="full" className="h-6 w-32 bg-[#205341]" />
          </div>
          <Skeleton variant="gold" rounded="full" className="h-7 w-36 mx-auto" />
          <div className="space-y-3 max-w-2xl mx-auto">
            <Skeleton variant="dark" rounded="lg" className="h-10 sm:h-12 w-full bg-[#174233]" />
            <Skeleton variant="dark" rounded="lg" className="h-9 w-3/4 mx-auto bg-[#174233]" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto pt-2">
            <Skeleton variant="dark" rounded="md" className="h-4 w-full bg-[#174233]/70" />
            <Skeleton variant="dark" rounded="md" className="h-4 w-4/5 mx-auto bg-[#174233]/70" />
          </div>
          <div className="pt-4 flex justify-center gap-4">
            <Skeleton variant="gold" rounded="full" className="h-11 w-44" />
            <Skeleton variant="dark" rounded="full" className="h-11 w-36 bg-[#205341]" />
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner Media */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#E5DFD3]">
          <Skeleton variant="light" className="w-full h-full" rounded="3xl" />
        </div>

        {/* Process Steps & Deliverables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#E5DFD3] space-y-6">
              <Skeleton variant="light" rounded="md" className="h-7 w-40" />
              <div className="space-y-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3]/60 space-y-2">
                    <div className="flex items-center gap-3">
                      <Skeleton variant="light" rounded="full" className="w-7 h-7" />
                      <Skeleton variant="light" rounded="md" className="h-5 w-44" />
                    </div>
                    <Skeleton variant="light" rounded="md" className="h-3.5 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E5DFD3] space-y-4">
              <Skeleton variant="light" rounded="md" className="h-6 w-32" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((tag) => (
                  <Skeleton key={tag} variant="light" rounded="full" className="h-7 w-20" />
                ))}
              </div>
            </div>
            <div className="bg-[#12372A] rounded-3xl p-8 space-y-4 text-center">
              <Skeleton variant="gold" rounded="md" className="h-6 w-36 mx-auto" />
              <Skeleton variant="dark" rounded="md" className="h-4 w-full bg-[#205341]" />
              <Skeleton variant="gold" rounded="full" className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Skeleton loader for BlogPostDetailPage
 */
export const BlogPostDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen select-none pb-24">
      {/* Dark Hero */}
      <section className="pt-36 pb-16 bg-[#12372A] text-[#F4EFE6] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton variant="dark" rounded="full" className="h-5 w-36 bg-[#205341]" />
          
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton variant="gold" rounded="full" className="h-6 w-24" />
            <Skeleton variant="dark" rounded="md" className="h-4 w-20 bg-[#205341]" />
            <Skeleton variant="dark" rounded="md" className="h-4 w-24 bg-[#205341]" />
          </div>

          <div className="space-y-3">
            <Skeleton variant="dark" rounded="lg" className="h-10 sm:h-12 w-full bg-[#174233]" />
            <Skeleton variant="dark" rounded="lg" className="h-9 w-4/5 bg-[#174233]" />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-10">
        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-[#0B221A] shadow-xl border border-[#E5DFD3]">
          <Skeleton variant="card" className="w-full h-full" rounded="3xl" />
        </div>

        {/* Author bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5DFD3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="light" rounded="full" className="w-11 h-11" />
            <div className="space-y-1.5">
              <Skeleton variant="light" rounded="md" className="h-4 w-28" />
              <Skeleton variant="light" rounded="md" className="h-3 w-20 opacity-60" />
            </div>
          </div>
          <Skeleton variant="light" rounded="full" className="h-8 w-24" />
        </div>

        {/* Text Paragraph Skeletons */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5DFD3] space-y-8">
          <div className="space-y-3">
            <Skeleton variant="light" rounded="md" className="h-4 w-full" />
            <Skeleton variant="light" rounded="md" className="h-4 w-full" />
            <Skeleton variant="light" rounded="md" className="h-4 w-11/12" />
            <Skeleton variant="light" rounded="md" className="h-4 w-5/6" />
          </div>

          <Skeleton variant="light" rounded="lg" className="h-7 w-48" />

          <div className="space-y-3">
            <Skeleton variant="light" rounded="md" className="h-4 w-full" />
            <Skeleton variant="light" rounded="md" className="h-4 w-full" />
            <Skeleton variant="light" rounded="md" className="h-4 w-4/5" />
          </div>

          {/* Quote Block Placeholder */}
          <div className="p-6 bg-[#FAF7F2] border-r-4 border-[#C5A880] rounded-2xl space-y-2">
            <Skeleton variant="light" rounded="md" className="h-5 w-full" />
            <Skeleton variant="light" rounded="md" className="h-5 w-3/4" />
          </div>

          <div className="space-y-3">
            <Skeleton variant="light" rounded="md" className="h-4 w-full" />
            <Skeleton variant="light" rounded="md" className="h-4 w-10/12" />
          </div>
        </div>
      </main>
    </div>
  )
}
