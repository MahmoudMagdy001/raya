import React from 'react'

interface CurvedUnderlineProps {
  className?: string
}

export const CurvedUnderline: React.FC<CurvedUnderlineProps> = ({
  className = 'absolute -bottom-2.5 sm:-bottom-3.5 right-0 w-full h-2.5 sm:h-3 text-[#C5A880]/60 pointer-events-none'
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
