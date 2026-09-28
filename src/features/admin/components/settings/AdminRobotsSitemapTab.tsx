import React, { useState } from 'react'
import { SiteSettings } from '../../../../lib/types'
import { getProjects, getServices, getPosts } from '../../../../lib/supabase'
import { generateRobotsTxt, generateSitemapXml, downloadTextFile, copyToClipboard } from '../../../../lib/seoTools'
import { Link, Map, Bot, RefreshCw, Check, Copy, Download, FileText } from 'lucide-react'

interface AdminRobotsSitemapTabProps {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
}

export const AdminRobotsSitemapTab: React.FC<AdminRobotsSitemapTabProps> = ({
  settings,
  onChange
}) => {
  const [robotsPreview, setRobotsPreview] = useState('')
  const [sitemapPreview, setSitemapPreview] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState<'robots' | 'sitemap' | null>(null)

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

  return (
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
          onChange={(e) => onChange({ ...settings, site_url: e.target.value })}
          dir="ltr"
          placeholder="https://raya-tawny.vercel.app"
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
            { key: 'sitemap_include_projects', label: 'تضمين المشاريع', desc: '/works/slug' },
            { key: 'sitemap_include_services', label: 'تضمين الخدمات', desc: '/services/slug' },
            { key: 'sitemap_include_posts', label: 'تضمين المقالات', desc: '/blog/slug' },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-[#E5DFD3] cursor-pointer hover:border-[#12372A] transition-colors">
              <input
                type="checkbox"
                checked={(settings[key as keyof SiteSettings] as boolean) ?? true}
                onChange={(e) => onChange({ ...settings, [key]: e.target.checked })}
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
              onChange={(e) => onChange({ ...settings, sitemap_change_freq: e.target.value as SiteSettings['sitemap_change_freq'] })}
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
                onChange={(e) => onChange({ ...settings, sitemap_priority_homepage: parseFloat(e.target.value) })}
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
          onChange={(e) => onChange({ ...settings, robots_txt_custom: e.target.value })}
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
  )
}
