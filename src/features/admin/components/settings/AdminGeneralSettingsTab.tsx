import React from 'react'
import { SiteSettings } from '../../../../lib/types'

interface AdminGeneralSettingsTabProps {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
}

export const AdminGeneralSettingsTab: React.FC<AdminGeneralSettingsTabProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1">اسم الموقع والمنشأة</label>
          <input
            type="text"
            value={settings.site_name}
            onChange={(e) => onChange({ ...settings, site_name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1">المقر الرئيسي</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => onChange({ ...settings, address: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1">الشعار اللفظي العربي (Slogan)</label>
          <input
            type="text"
            value={settings.slogan_ar}
            onChange={(e) => onChange({ ...settings, slogan_ar: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1">الشعار اللفظي الإنجليزي</label>
          <input
            type="text"
            value={settings.slogan_en}
            onChange={(e) => onChange({ ...settings, slogan_en: e.target.value })}
            dir="ltr"
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#12372A] mb-1">الوصف التعريفي المعتمد (About Summary)</label>
        <textarea
          rows={3}
          value={settings.site_description}
          onChange={(e) => onChange({ ...settings, site_description: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm leading-relaxed focus:border-[#12372A] focus:outline-none"
        />
      </div>
    </div>
  )
}
