import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'card' | 'gold'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'light',
  rounded = 'md',
  ...props
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  }[rounded]

  const variantClasses = {
    light: 'skeleton-shimmer-light',
    dark: 'skeleton-shimmer-dark',
    card: 'skeleton-shimmer-card',
    gold: 'skeleton-shimmer-dark !bg-[#C5A880]/20'
  }[variant]

  return (
    <div
      className={`relative select-none pointer-events-none ${roundedClasses} ${variantClasses} ${className}`}
      aria-hidden="true"
      {...props}
    />
  )
}
