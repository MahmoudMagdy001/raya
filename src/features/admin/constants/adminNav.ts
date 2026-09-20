import React from 'react'
import { 
  FileText, 
  Layers, 
  Film, 
  Video, 
  Image, 
  Inbox, 
  Settings,
  Building2 
} from 'lucide-react'

export interface AdminLinkItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badgeCountKey?: string
}

export const RAYA_ADMIN_LINKS: AdminLinkItem[] = [
  { to: '/admin/projects', label: 'المشاريع ودراسات الحالة', icon: Film },
  { to: '/admin/services', label: 'الخدمات الإبداعية والتقنية', icon: Layers },
  { to: '/admin/clients', label: 'شركاء النجاح والعملاء', icon: Building2 },
  { to: '/admin/reels', label: 'شريط الشووريل المتدفق (9:16)', icon: Video },
  { to: '/admin/posts', label: 'المقالات والنشرات الفكرية', icon: FileText },
  { to: '/admin/inquiries', label: 'طلبات المشاريع (Inbox)', icon: Inbox },
  { to: '/admin/media', label: 'مكتبة الوسائط', icon: Image },
  { to: '/admin/settings', label: 'إعدادات الموقع والهوية', icon: Settings },
]
