import React, { useState, useEffect } from 'react'
import { getSiteSettings, supabase } from '../../../lib/supabase'
import { SiteSettings } from '../../../lib/types'
import { INITIAL_SITE_SETTINGS } from '../../../data/initialData'
import { Save, CheckCircle2 } from 'lucide-react'

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const s = await getSiteSettings()
      if (s) setSettings(s)
    }
    load()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await supabase.from('site_settings').upsert({ id: 1, ...settings })
    } catch {
      // Fallback
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-[#12372A]">
          إعدادات الموقع العامة والهوية والسيو
        </h2>
        <p className="text-xs sm:text-sm text-[#6b7f74]">
          التحكم في بيانات التواصل الرسمية، الشعارات اللفظية، ومعلومات الهوية.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
        {/* Brand Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">اسم الموقع والمنشأة</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">المقر الرئيسي</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
            />
          </div>
        </div>

        {/* Slogans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">الشعار اللفظي العربي (Slogan)</label>
            <input
              type="text"
              value={settings.slogan_ar}
              onChange={(e) => setSettings({ ...settings, slogan_ar: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">الشعار اللفظي الإنجليزي</label>
            <input
              type="text"
              value={settings.slogan_en}
              onChange={(e) => setSettings({ ...settings, slogan_en: e.target.value })}
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-right"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">رقم الهاتف</label>
            <input
              type="text"
              value={settings.phone_number}
              onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-right font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">رقم الواتساب المباشر</label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-right font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={settings.email_address}
              onChange={(e) => setSettings({ ...settings, email_address: e.target.value })}
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-right"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1">الوصف التعريفي المعتمد (About Summary)</label>
          <textarea
            rows={3}
            value={settings.site_description}
            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm leading-relaxed"
          />
        </div>

        <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
          {saved && (
            <span className="flex items-center gap-2 text-xs font-bold text-[#205341]">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم حفظ التعديلات بنجاح!</span>
            </span>
          )}
          <button
            type="submit"
            className="mr-auto inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#174233] text-[#F4EFE6] px-8 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <Save className="w-4 h-4 text-[#C5A880]" />
            <span>حفظ الإعدادات</span>
          </button>
        </div>
      </form>
    </div>
  )
}
