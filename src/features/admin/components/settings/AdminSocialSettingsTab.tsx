import React from 'react'
import { SiteSettings } from '../../../../lib/types'

interface AdminSocialSettingsTabProps {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
}

const SOCIAL_FIELDS = [
  { key: 'social_x', label: 'رابط منصة X (تويتر)', placeholder: 'https://x.com/raya_creative' },
  { key: 'social_instagram', label: 'رابط إنستغرام (Instagram)', placeholder: 'https://instagram.com/raya_creative' },
  { key: 'social_linkedin', label: 'رابط لينكد إن (LinkedIn)', placeholder: 'https://linkedin.com/company/raya-creative' },
  { key: 'social_tiktok', label: 'رابط تيك توك (TikTok)', placeholder: 'https://tiktok.com/@raya_creative' },
  { key: 'social_youtube', label: 'رابط يوتيوب (YouTube)', placeholder: 'https://youtube.com/@raya_creative' },
] as const

export const AdminSocialSettingsTab: React.FC<AdminSocialSettingsTabProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block text-xs font-bold text-[#12372A] mb-1">{label}</label>
          <input
            type="url"
            value={(settings[key] as string) || ''}
            onChange={(e) => onChange({ ...settings, [key]: e.target.value })}
            dir="ltr"
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none"
          />
        </div>
      ))}
    </div>
  )
}
