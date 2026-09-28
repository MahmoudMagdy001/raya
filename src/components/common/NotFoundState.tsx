import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface NotFoundStateProps {
  code?: string
  title: string
  description: string
  backLink: string
  backLabel: string
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  code = 'RAAYA / 404',
  title,
  description,
  backLink,
  backLabel,
}) => {
  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#12372A] text-[#F4EFE6] font-sans antialiased">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <span className="text-xs font-bold text-[#C5A880] tracking-widest uppercase">{code}</span>
        <h2 className="text-3xl font-black text-[#F4EFE6]">{title}</h2>
        <p className="text-sm text-[#b9d5c7] leading-relaxed">{description}</p>
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 bg-[#C5A880] text-[#12372A] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#b0926b] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>{backLabel}</span>
        </Link>
      </div>
    </div>
  )
}
