import React from 'react'

interface IconProps {
  className?: string
}

// 1. هيئة الترفيه (GEA) - Entertainment Celebration Star Emblem
export const GeaIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 3C21.8 11.2 28.8 18.2 37 20C28.8 21.8 21.8 28.8 20 37C18.2 28.8 11.2 21.8 3 20C11.2 18.2 18.2 11.2 20 3Z" fill="currentColor" opacity="0.9" />
    <circle cx="20" cy="20" r="4.5" fill="#C5A880" />
    <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="8" cy="32" r="2" fill="currentColor" opacity="0.6" />
  </svg>
)

// 2. منشآت (Monsha'at) - The Iconic 3 Growth Swooshes
export const MonshaatIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 33C7 18 17 8 30 8C30 20 20 33 7 33Z" fill="currentColor" opacity="0.95" />
    <path d="M16 33C16 23 23 15 33 15C33 24 26 33 16 33Z" fill="#C5A880" opacity="0.9" />
    <path d="M25 33C25 27 29 22 36 22C36 28 31 33 25 33Z" fill="currentColor" opacity="0.6" />
  </svg>
)

// 3. إتقان القابضة (Itqan Holding) - Isometric Diamond Cube
export const ItqanIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4L35 12.5V29.5L20 38L5 29.5V12.5L20 4Z" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.9" />
    <path d="M20 4V21L35 29.5" stroke="#C5A880" strokeWidth="2.5" fill="none" />
    <path d="M20 21L5 29.5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7" />
    <circle cx="20" cy="21" r="3.5" fill="#C5A880" />
  </svg>
)

// 4. دار النخبة (Dar Al Nukhba) - Royal Architectural Crest
export const AlNukhbaIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 34V18L20 5L34 18V34H6Z" stroke="currentColor" strokeWidth="2.2" fill="none" opacity="0.85" />
    <path d="M14 34V22C14 18.5 16.5 15.5 20 15.5C23.5 15.5 26 18.5 26 22V34" stroke="#C5A880" strokeWidth="2.2" fill="none" />
    <path d="M20 5V12" stroke="#C5A880" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="20" cy="9" r="1.5" fill="#C5A880" />
  </svg>
)

// 5. وجد كولكشن (Wajd Collection) - Haute Couture Ring Monogram
export const WajdIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.85" />
    <path d="M11 15L15.5 27L20 17L24.5 27L29 15" stroke="#C5A880" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="20" cy="9" r="2" fill="#C5A880" />
  </svg>
)

// 6. سمو للعطور (Sumou Perfumes) - Royal Fragrance Flask
export const SumouIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="15" width="20" height="21" rx="4.5" stroke="currentColor" strokeWidth="2.2" fill="none" opacity="0.9" />
    <path d="M16 15V8H24V15" stroke="#C5A880" strokeWidth="2.2" fill="none" />
    <circle cx="20" cy="5" r="2.5" fill="#C5A880" />
    <path d="M20 20V31M14.5 25.5H25.5" stroke="#C5A880" strokeWidth="1.8" opacity="0.7" />
  </svg>
)

// 7. رسيل كافيه (Raseel Coffee) - Artisan Coffee Roasters Cup
export const RaseelIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M8 17C8 28 14.5 32.5 22 32.5C29.5 32.5 36 28 36 17H8Z" stroke="currentColor" strokeWidth="2.2" fill="none" opacity="0.9" />
    <path d="M36 20C38.5 20 40 22 40 24C40 26.5 38.5 28.5 36 28.5" stroke="#C5A880" strokeWidth="2" fill="none" />
    <path d="M15 9C16 12 15 14 16 16M22 7C23 10 22 13 23 16M29 9C30 12 29 14 30 16" stroke="#C5A880" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="6" y1="35" x2="38" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

// 8. قمة الذكاء الاصطناعي (AI Summit) - Neural Network Core
export const AiSummitIcon: React.FC<IconProps> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
    <circle cx="20" cy="20" r="4.5" fill="#C5A880" />
    <circle cx="20" cy="7" r="2.5" fill="currentColor" />
    <circle cx="31" cy="14" r="2.5" fill="currentColor" />
    <circle cx="31" cy="26" r="2.5" fill="currentColor" />
    <circle cx="20" cy="33" r="2.5" fill="currentColor" />
    <circle cx="9" cy="26" r="2.5" fill="currentColor" />
    <circle cx="9" cy="14" r="2.5" fill="currentColor" />
    <line x1="20" y1="7" x2="20" y2="15.5" stroke="#C5A880" strokeWidth="1.8" />
    <line x1="31" y1="14" x2="24" y2="18" stroke="#C5A880" strokeWidth="1.8" />
    <line x1="9" y1="26" x2="16" y2="22" stroke="#C5A880" strokeWidth="1.8" />
  </svg>
)

export const PARTNERS_DATA = [
  { id: 'gea', name: 'هيئة الترفيه', enName: 'GEA • SAUDI', Icon: GeaIcon },
  { id: 'monshaat', name: 'منشآت', enName: 'MONSHAAT', Icon: MonshaatIcon },
  { id: 'itqan', name: 'إتقان القابضة', enName: 'ITQAN HOLDING', Icon: ItqanIcon },
  { id: 'alnukhba', name: 'دار النخبة', enName: 'AL NUKHBA', Icon: AlNukhbaIcon },
  { id: 'wajd', name: 'وجد كولكشن', enName: 'WAJD HAUTE', Icon: WajdIcon },
  { id: 'sumou', name: 'سمو للعطور', enName: 'SUMOU PARFUMS', Icon: SumouIcon },
  { id: 'raseel', name: 'رسيل كافيه', enName: 'RASEEL COFFEE', Icon: RaseelIcon },
  { id: 'aisummit', name: 'قمة الذكاء الاصطناعي', enName: 'AI SUMMIT', Icon: AiSummitIcon }
]
