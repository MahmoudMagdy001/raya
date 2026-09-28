import React from 'react'
import { LucideIcon, FolderSearch } from 'lucide-react'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderSearch,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-xs p-12 sm:p-16 rounded-3xl border border-[#E5DFD3] text-center space-y-4 max-w-xl mx-auto shadow-xs ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center mx-auto text-[#C5A880] shadow-xs">
        <Icon className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-black text-[#12372A]">{title}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-[#6b7f74] max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionLabel && (
        <div className="pt-2">
          {actionHref ? (
            <Link
              to={actionHref}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {actionLabel}
            </Link>
          ) : onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
