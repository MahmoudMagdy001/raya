import React, { useState, useEffect } from 'react'
import { getSiteSettings, updateSiteSettings } from '../../../lib/supabase'
import { SiteSettings } from '../../../lib/types'
import { INITIAL_SITE_SETTINGS } from '../../../data/initialData'
import {
  Save, CheckCircle2, Settings, Globe, Phone, Share2, Search, Bot
} from 'lucide-react'
import { AdminGeneralSettingsTab } from '../components/settings/AdminGeneralSettingsTab'
import { AdminContactSettingsTab } from '../components/settings/AdminContactSettingsTab'
import { AdminSocialSettingsTab } from '../components/settings/AdminSocialSettingsTab'
import { AdminSeoSettingsTab } from '../components/settings/AdminSeoSettingsTab'
import { AdminRobotsSitemapTab } from '../components/settings/AdminRobotsSitemapTab'

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'seo' | 'robots'>('general')

  useEffect(() => {
    async function load() {
      const s = await getSiteSettings()
      if (s) setSettings(s)
    }
    load()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSiteSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'general', label: 'الهوية والبيانات العامة', icon: Globe },
    { id: 'contact', label: 'بيانات التواصل', icon: Phone },
    { id: 'social', label: 'السوشيال ميديا', icon: Share2 },
    { id: 'seo', label: 'السيو والتحليلات', icon: Search },
    { id: 'robots', label: 'Robots & Sitemap', icon: Bot },
  ] as const

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              إعدادات الموقع والهوية والتواصل
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            التحكم في بيانات الموقع العامة، أرقام التواصل والواتساب، وروابط حسابات التواصل الاجتماعي.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم الحفظ فورياً!</span>
          </span>
        )}
      </div>

      {/* Settings Form with Tabs */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E5DFD3] shadow-xs overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5DFD3] bg-[#FAF7F2] px-6 gap-1 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === id
                  ? 'border-[#12372A] text-[#12372A]'
                  : 'border-transparent text-[#6b7f74] hover:text-[#12372A]'
              }`}
            >
              <Icon className="w-4 h-4 text-[#C5A880]" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="p-8 space-y-6">
          {activeTab === 'general' && (
            <AdminGeneralSettingsTab
              settings={settings}
              onChange={setSettings}
            />
          )}

          {activeTab === 'contact' && (
            <AdminContactSettingsTab
              settings={settings}
              onChange={setSettings}
            />
          )}

          {activeTab === 'social' && (
            <AdminSocialSettingsTab
              settings={settings}
              onChange={setSettings}
            />
          )}

          {activeTab === 'seo' && (
            <AdminSeoSettingsTab
              settings={settings}
              onChange={setSettings}
            />
          )}

          {activeTab === 'robots' && (
            <AdminRobotsSitemapTab
              settings={settings}
              onChange={setSettings}
            />
          )}

          {/* Save Button — hidden in robots tab (robots tab has its own save button below) */}
          {activeTab !== 'robots' && (
            <div className="pt-6 border-t border-[#E5DFD3] flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] px-8 py-3 rounded-2xl font-black text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#C5A880]" />
                <span>حفظ الإعدادات</span>
              </button>
            </div>
          )}

          {/* Save in robots tab - to save site_url & settings */}
          {activeTab === 'robots' && (
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] px-6 py-2.5 rounded-xl font-black text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>حفظ إعدادات Robots & Sitemap</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
