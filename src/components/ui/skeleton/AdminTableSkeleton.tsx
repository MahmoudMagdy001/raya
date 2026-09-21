import React from 'react'
import { Skeleton } from './Skeleton'

interface AdminTableSkeletonProps {
  rows?: number
  columns?: number
  hasThumbnail?: boolean
}

export const AdminTableSkeleton: React.FC<AdminTableSkeletonProps> = ({
  rows = 5,
  hasThumbnail = true
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs select-none">
      {/* Search & Filter Bar Placeholder */}
      <div className="p-4 sm:p-5 border-b border-[#E5DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Skeleton variant="light" rounded="xl" className="h-10 w-full sm:w-72" />
        <div className="flex items-center gap-2">
          <Skeleton variant="light" rounded="xl" className="h-10 w-28" />
          <Skeleton variant="light" rounded="xl" className="h-10 w-32" />
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="w-full text-right" dir="rtl">
          <thead className="bg-[#FAF7F2] border-b border-[#E5DFD3] text-xs font-bold text-[#12372A]">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">
                <Skeleton variant="light" rounded="sm" className="w-4 h-4 mx-auto" />
              </th>
              {hasThumbnail && (
                <th className="py-3.5 px-4 w-20">
                  <Skeleton variant="light" rounded="md" className="w-12 h-3.5" />
                </th>
              )}
              <th className="py-3.5 px-4">
                <Skeleton variant="light" rounded="md" className="w-24 h-3.5" />
              </th>
              <th className="py-3.5 px-4">
                <Skeleton variant="light" rounded="md" className="w-20 h-3.5" />
              </th>
              <th className="py-3.5 px-4">
                <Skeleton variant="light" rounded="md" className="w-16 h-3.5" />
              </th>
              <th className="py-3.5 px-4 text-left w-24">
                <Skeleton variant="light" rounded="md" className="w-14 h-3.5 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DFD3]/60">
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                <td className="py-4 px-4 text-center">
                  <Skeleton variant="light" rounded="sm" className="w-4 h-4 mx-auto" />
                </td>
                {hasThumbnail && (
                  <td className="py-4 px-4">
                    <Skeleton variant="light" rounded="lg" className="w-14 h-10" />
                  </td>
                )}
                <td className="py-4 px-4">
                  <div className="space-y-1.5">
                    <Skeleton variant="light" rounded="md" className="h-4 w-48" />
                    <Skeleton variant="light" rounded="md" className="h-3 w-28 opacity-60" />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Skeleton variant="light" rounded="full" className="h-6 w-24" />
                </td>
                <td className="py-4 px-4">
                  <Skeleton variant="light" rounded="md" className="h-3.5 w-20" />
                </td>
                <td className="py-4 px-4 text-left">
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton variant="light" rounded="lg" className="w-8 h-8" />
                    <Skeleton variant="light" rounded="lg" className="w-8 h-8" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const AdminGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden p-4 space-y-4">
          <Skeleton variant="light" rounded="xl" className="h-40 w-full" />
          <div className="space-y-2">
            <Skeleton variant="light" rounded="md" className="h-5 w-3/4" />
            <Skeleton variant="light" rounded="md" className="h-3.5 w-1/2" />
          </div>
          <div className="pt-3 border-t border-[#E5DFD3]/60 flex items-center justify-between">
            <Skeleton variant="light" rounded="full" className="h-6 w-20" />
            <div className="flex items-center gap-1.5">
              <Skeleton variant="light" rounded="lg" className="w-7 h-7" />
              <Skeleton variant="light" rounded="lg" className="w-7 h-7" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
