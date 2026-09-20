import React from 'react'
import { 
  FileText, 
  Layers, 
  Tag, 
  Film, 
  Video, 
  Image, 
  FolderOpen, 
  Inbox, 
  ArrowRightLeft, 
  Settings 
} from 'lucide-react'

export interface AdminLinkItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badgeCountKey?: string
}

export const RAYA_ADMIN_LINKS: AdminLinkItem[] = [
  { to: '/admin/projects', label: 'المشاريع ودراسات الحالة', icon: Film },
  { to: '/admin/services', label: 'الخدمات الإبداعية', icon: Layers },
  { to: '/admin/reels', label: 'المحتوى القصير (Reels)', icon: Video },
  { to: '/admin/offers', label: 'الباقات والعروض', icon: Tag },
  { to: '/admin/inquiries', label: 'طلبات المشاريع (Inbox)', icon: Inbox, badgeCountKey: 'newInquiries' },
  { to: '/admin/media', label: 'مكتبة الوسائط', icon: Image },
  { to: '/admin/categories', label: 'التصنيفات', icon: FolderOpen },
  { to: '/admin/posts', label: 'المقالات والمدونة', icon: FileText },
  { to: '/admin/redirects', label: 'التحويلات وإعادة التوجيه', icon: ArrowRightLeft },
  { to: '/admin/settings', label: 'إعدادات الموقع والسيو', icon: Settings },
]
