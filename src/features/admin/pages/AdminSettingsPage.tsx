import React, { useState, useEffect } from 'react'
import { getSiteSettings, updateSiteSettings, getProjects, getServices, getPosts } from '../../../lib/supabase'
import { SiteSettings } from '../../../lib/types'
import { INITIAL_SITE_SETTINGS } from '../../../data/initialData'
import {
  Save, CheckCircle2, Settings, Globe, Phone, Share2, Search, Eye, BarChart3,
  Bot, Map, Copy, Download, RefreshCw, Check, Link, FileText
} from 'lucide-react'
import { generateRobotsTxt, generateSitemapXml, downloadTextFile, copyToClipboard } from '../../../lib/seoTools'

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'seo' | 'robots'>('general')

  // Robots & Sitemap state
  const [robotsPreview, setRobotsPreview] = useState('')
  const [sitemapPreview, setSitemapPreview] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState<'robots' | 'sitemap' | null>(null)

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

  const handleGenerate = async () => {
    setGenerating(true)
    const [projects, services, posts] = await Promise.all([
      getProjects(),
      getServices(),
      getPosts()
    ])
    setRobotsPreview(generateRobotsTxt(settings))
    setSitemapPreview(generateSitemapXml(settings, projects, services, posts))
    setGenerating(false)
  }

  const handleCopy = async (type: 'robots' | 'sitemap') => {
    const text = type === 'robots' ? robotsPreview : sitemapPreview
    await copyToClipboard(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (type: 'robots' | 'sitemap') => {
    if (type === 'robots') {
      downloadTextFile(robotsPreview, 'robots.txt', 'text/plain')
    } else {
      downloadTextFile(sitemapPreview, 'sitemap.xml', 'application/xml')
    }
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
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">اسم الموقع والمنشأة</label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">المقر الرئيسي</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
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
                    onChange={(e) => setSettings({ ...settings, slogan_ar: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">الشعار اللفظي الإنجليزي</label>
                  <input
                    type="text"
                    value={settings.slogan_en}
                    onChange={(e) => setSettings({ ...settings, slogan_en: e.target.value })}
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
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm leading-relaxed focus:border-[#12372A] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  value={settings.phone_number}
                  onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left font-mono focus:border-[#12372A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">رقم الواتساب المباشر</label>
                <input
                  type="text"
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left font-mono focus:border-[#12372A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">البريد الإلكتروني الرسمي</label>
                <input
                  type="email"
                  value={settings.email_address}
                  onChange={(e) => setSettings({ ...settings, email_address: e.target.value })}
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL */}
          {activeTab === 'social' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'social_x', label: 'رابط منصة X (تويتر)', placeholder: 'https://x.com/raya_creative' },
                { key: 'social_instagram', label: 'رابط إنستغرام (Instagram)', placeholder: 'https://instagram.com/raya_creative' },
                { key: 'social_linkedin', label: 'رابط لينكد إن (LinkedIn)', placeholder: 'https://linkedin.com/company/raya-creative' },
                { key: 'social_tiktok', label: 'رابط تيك توك (TikTok)', placeholder: 'https://tiktok.com/@raya_creative' },
                { key: 'social_youtube', label: 'رابط يوتيوب (YouTube)', placeholder: 'https://youtube.com/@raya_creative' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">{label}</label>
                  <input
                    type="url"
                    value={settings[key as keyof SiteSettings] as string || ''}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    dir="ltr"
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SEO & ANALYTICS */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              {/* Google SERP Preview */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DFD3]">
                <div className="flex items-center gap-2 mb-3 text-xs font-black text-[#12372A]">
                  <Eye className="w-4 h-4 text-[#8C6D46]" />
                  <span>محاكاة ظهور الصفحة الرئيسية في نتائج بحث Google</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E5DFD3] text-right" dir="rtl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#12372A] flex items-center justify-center text-[10px] text-[#F3D7A4] font-black shrink-0">
                      ر
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[#202124]">راية للإنتاج والتسويق الإبداعي</div>
                      <div className="text-[11px] text-[#5f6368] ltr text-right" dir="ltr">
                        {(settings.site_url || 'https://raya.sa').replace(/\/$/, '')}
                      </div>
                    </div>
                  </div>
                  <h5 className="text-[#1a0dab] text-base sm:text-lg font-medium leading-snug mb-1">
                    {settings.default_meta_title || settings.site_name}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
                    {settings.default_meta_description || settings.site_description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#12372A]">عنوان الموقع الافتراضي (Default Meta Title)</label>
                    <span className="text-[10px] font-bold text-[#8C6D46]">
                      {(settings.default_meta_title || '').length} / 60 حرف
                    </span>
                  </div>
                  <input
                    type="text"
                    value={settings.default_meta_title || ''}
                    onChange={(e) => setSettings({ ...settings, default_meta_title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#12372A]">الوصف الافتراضي (Default Meta Description)</label>
                    <span className="text-[10px] font-bold text-[#8C6D46]">
                      {(settings.default_meta_description || '').length} / 160 حرف
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={settings.default_meta_description || ''}
                    onChange={(e) => setSettings({ ...settings, default_meta_description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1.5">الكلمات الدلالية (Meta Keywords)</label>
                  <input
                    type="text"
                    value={settings.default_keywords || ''}
                    onChange={(e) => setSettings({ ...settings, default_keywords: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1.5">صورة المشاركة الافتراضية (Default OG Image)</label>
                  <input
                    type="url"
                    value={settings.default_og_image || ''}
                    onChange={(e) => setSettings({ ...settings, default_og_image: e.target.value })}
                    dir="ltr"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DFD3] space-y-4">
                <h4 className="text-xs font-black text-[#12372A] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#8C6D46]" />
                  <span>أدوات مشرفي المواقع والتحليلات (Webmaster & GA4)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">كود التحقق من Google Search Console</label>
                    <input
                      type="text"
                      value={settings.google_site_verification || ''}
                      onChange={(e) => setSettings({ ...settings, google_site_verification: e.target.value })}
                      dir="ltr"
                      placeholder="google-site-verification=abc..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#6b7f74] mt-1">رمز التحقق من ملكية النطاق عبر ميتا تاج.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">معرف Google Analytics 4 (Measurement ID)</label>
                    <input
                      type="text"
                      value={settings.google_analytics_id || ''}
                      onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                      dir="ltr"
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#6b7f74] mt-1">معرف قياس الزيارات والأحداث لتحليلات جوجل.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ROBOTS & SITEMAP */}
          {activeTab === 'robots' && (
            <div className="space-y-6">
              {/* Site URL */}
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1 flex items-center gap-1.5">
                  <Link className="w-3.5 h-3.5 text-[#C5A880]" />
                  رابط الموقع الرسمي (Site URL)
                </label>
                <input
                  type="url"
                  value={settings.site_url || ''}
                  onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
                  dir="ltr"
                  placeholder="https://raya.sa"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm text-left focus:border-[#12372A] focus:outline-none font-mono"
                />
                <p className="text-[10px] text-[#6b7f74] mt-1">يُستخدم لبناء روابط sitemap.xml و robots.txt تلقائياً.</p>
              </div>

              {/* Sitemap Config */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#E5DFD3] p-5 space-y-4">
                <h4 className="text-xs font-black text-[#12372A] flex items-center gap-2">
                  <Map className="w-4 h-4 text-[#8C6D46]" />
                  إعدادات Sitemap.xml التلقائي
                </h4>

                {/* Include toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'sitemap_include_projects', label: 'تضمين المشاريع', desc: '/projects/slug' },
                    { key: 'sitemap_include_services', label: 'تضمين الخدمات', desc: '/services/slug' },
                    { key: 'sitemap_include_posts', label: 'تضمين المقالات', desc: '/blog/slug' },
                  ].map(({ key, label, desc }) => (
                    <label key={key} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-[#E5DFD3] cursor-pointer hover:border-[#12372A] transition-colors">
                      <input
                        type="checkbox"
                        checked={settings[key as keyof SiteSettings] as boolean ?? true}
                        onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#12372A] cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#12372A]">{label}</div>
                        <div className="text-[10px] text-[#6b7f74] font-mono">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Change Freq & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">تكرار الفهرسة (Change Frequency)</label>
                    <select
                      value={settings.sitemap_change_freq || 'weekly'}
                      onChange={(e) => setSettings({ ...settings, sitemap_change_freq: e.target.value as SiteSettings['sitemap_change_freq'] })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm bg-white focus:border-[#12372A] focus:outline-none"
                    >
                      <option value="always">دائماً (Always)</option>
                      <option value="hourly">كل ساعة (Hourly)</option>
                      <option value="daily">يومياً (Daily)</option>
                      <option value="weekly">أسبوعياً (Weekly) — مُوصى به</option>
                      <option value="monthly">شهرياً (Monthly)</option>
                      <option value="yearly">سنوياً (Yearly)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12372A] mb-1">
                      أولوية الصفحة الرئيسية (Homepage Priority)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.sitemap_priority_homepage ?? 1.0}
                        onChange={(e) => setSettings({ ...settings, sitemap_priority_homepage: parseFloat(e.target.value) })}
                        className="flex-1 accent-[#12372A]"
                      />
                      <span className="text-sm font-black text-[#12372A] w-8 text-center">
                        {(settings.sitemap_priority_homepage ?? 1.0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Robots.txt Custom Rules */}
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#C5A880]" />
                  قواعد Robots.txt الإضافية (اختياري)
                </label>
                <textarea
                  rows={5}
                  dir="ltr"
                  value={settings.robots_txt_custom || ''}
                  onChange={(e) => setSettings({ ...settings, robots_txt_custom: e.target.value })}
                  placeholder={`# مثال:\nUser-agent: Googlebot\nDisallow: /api/\n\nUser-agent: Bingbot\nCrawl-delay: 5`}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DFD3] text-sm text-left font-mono focus:border-[#12372A] focus:outline-none resize-y bg-[#FAF7F2]"
                />
                <p className="text-[10px] text-[#6b7f74] mt-1">
                  القواعد الافتراضية تمنع فهرسة /admin تلقائياً. أضف قواعد مخصصة إضافية هنا.
                </p>
              </div>

              {/* Generate Button */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E5DFD3]">
                <p className="text-xs text-[#6b7f74]">
                  اضغط "توليد" لمعاينة الملفات بناءً على المحتوى المنشور الآن.
                </p>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#205341] disabled:opacity-60 text-[#F3D7A4] px-5 py-2.5 rounded-xl font-black text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  {generating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span>{generating ? 'جاري التوليد...' : 'توليد الملفات'}</span>
                </button>
              </div>

              {/* Previews */}
              {(robotsPreview || sitemapPreview) && (
                <div className="space-y-4">
                  {/* robots.txt preview */}
                  {robotsPreview && (
                    <div className="rounded-2xl border border-[#E5DFD3] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-[#12372A]">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-[#F3D7A4]" />
                          <span className="text-xs font-black text-[#F3D7A4] font-mono">robots.txt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy('robots')}
                            className="flex items-center gap-1 text-[10px] text-[#C5A880] hover:text-[#F3D7A4] transition-colors cursor-pointer"
                          >
                            {copied === 'robots' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'robots' ? 'تم النسخ!' : 'نسخ'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownload('robots')}
                            className="flex items-center gap-1 text-[10px] text-[#C5A880] hover:text-[#F3D7A4] transition-colors cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            تنزيل
                          </button>
                        </div>
                      </div>
                      <pre className="p-4 text-xs font-mono text-[#12372A] bg-[#FAF7F2] overflow-x-auto whitespace-pre-wrap leading-relaxed" dir="ltr">
                        {robotsPreview}
                      </pre>
                    </div>
                  )}

                  {/* sitemap.xml preview */}
                  {sitemapPreview && (
                    <div className="rounded-2xl border border-[#E5DFD3] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-[#205341]">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#F3D7A4]" />
                          <span className="text-xs font-black text-[#F3D7A4] font-mono">sitemap.xml</span>
                          <span className="text-[10px] text-[#C5A880]">
                            ({sitemapPreview.match(/<url>/g)?.length ?? 0} رابط)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy('sitemap')}
                            className="flex items-center gap-1 text-[10px] text-[#C5A880] hover:text-[#F3D7A4] transition-colors cursor-pointer"
                          >
                            {copied === 'sitemap' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'sitemap' ? 'تم النسخ!' : 'نسخ'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownload('sitemap')}
                            className="flex items-center gap-1 text-[10px] text-[#C5A880] hover:text-[#F3D7A4] transition-colors cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            تنزيل
                          </button>
                        </div>
                      </div>
                      <pre className="p-4 text-xs font-mono text-[#205341] bg-[#FAF7F2] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto" dir="ltr">
                        {sitemapPreview}
                      </pre>
                    </div>
                  )}

                  {/* Instructions */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <p className="text-xs font-bold text-amber-800 mb-2">📋 كيفية رفع الملفات على الاستضافة</p>
                    <ol className="text-xs text-amber-700 space-y-1 list-decimal list-inside">
                      <li>نزّل الملفين بزر "تنزيل" أعلاه</li>
                      <li>ارفع <code className="font-mono bg-amber-100 px-1 rounded">robots.txt</code> على جذر الموقع: <code className="font-mono bg-amber-100 px-1 rounded dir-ltr" dir="ltr">public/robots.txt</code></li>
                      <li>ارفع <code className="font-mono bg-amber-100 px-1 rounded">sitemap.xml</code> على جذر الموقع: <code className="font-mono bg-amber-100 px-1 rounded dir-ltr" dir="ltr">public/sitemap.xml</code></li>
                      <li>أرسل رابط Sitemap لـ Google Search Console</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Save Button — hidden in robots tab (no form data to save there) */}
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
