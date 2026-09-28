import React from 'react'
import { SiteSettings } from '../../../../lib/types'

interface AdminContactSettingsTabProps {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
}

export const AdminContactSettingsTab: React.FC<AdminContactSettingsTabProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block text-xs font-bold text-[#12372A] mb-1">رقم الهاتف</label>
        <input
          type="text"
          value={settings.phone_number}
          onChange={(e) => onChange({ ...settings, phone_number: e.target.value })}
          dir="ltr"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left font-mono focus:border-[#12372A] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-[#12372A] mb-1">رقم الواتساب المباشر</label>
        <input
          type="text"
          value={settings.whatsapp_number}
          onChange={(e) => onChange({ ...settings, whatsapp_number: e.target.value })}
          dir="ltr"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left font-mono focus:border-[#12372A] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-[#12372A] mb-1">البريد الإلكتروني الرسمي</label>
        <input
          type="email"
          value={settings.email_address}
          onChange={(e) => onChange({ ...settings, email_address: e.target.value })}
          dir="ltr"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none"
        />
      </div>
    </div>
  )
}
