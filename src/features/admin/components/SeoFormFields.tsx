import React, { useState } from 'react'
import { 
  Globe, 
  Share2, 
  Smartphone, 
  Monitor, 
  Eye, 
  Link as LinkIcon,
  EyeOff
} from 'lucide-react'

export interface SeoFormFieldsProps {
  metaTitle?: string
  onChangeMetaTitle: (val: string) => void
  metaDescription?: string
  onChangeMetaDescription: (val: string) => void
  metaKeywords?: string
  onChangeMetaKeywords: (val: string) => void
  canonicalUrl?: string
  onChangeCanonicalUrl: (val: string) => void
  ogImage?: string
  onChangeOgImage: (val: string) => void
  noIndex?: boolean
  onChangeNoIndex: (val: boolean) => void
  
  // Fallbacks for live preview
  fallbackTitle: string
  fallbackDescription: string
  fallbackImage?: string
  urlSlug: string
  pathPrefix: string // e.g. "/services/", "/works/", "/posts/"
}

export const SeoFormFields: React.FC<SeoFormFieldsProps> = ({
  metaTitle = '',
  onChangeMetaTitle,
  metaDescription = '',
  onChangeMetaDescription,
  metaKeywords = '',
  onChangeMetaKeywords,
  canonicalUrl = '',
  onChangeCanonicalUrl,
  ogImage = '',
  onChangeOgImage,
  noIndex = false,
  onChangeNoIndex,
  fallbackTitle = '',
  fallbackDescription = '',
  fallbackImage,
  urlSlug = '',
  pathPrefix = ''
}) => {
  const [previewMode, setPreviewMode] = useState<'google' | 'social'>('google')
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Safe string sanitization to prevent crashes when values come as `null` from PostgreSQL / Supabase
  const safeMetaTitle = metaTitle || ''
  const safeMetaDescription = metaDescription || ''
  const safeMetaKeywords = metaKeywords || ''
  const safeCanonicalUrl = canonicalUrl || ''
  const safeOgImage = ogImage || ''
  const safeFallbackTitle = fallbackTitle || ''
  const safeFallbackDescription = fallbackDescription || ''
  const safeUrlSlug = urlSlug || 'page-slug'

  // Derived display values
  const displayTitle = (safeMetaTitle.trim() || safeFallbackTitle.trim() || 'صفحة بدون عنوان') + ' | راية'
  const displayDescription = safeMetaDescription.trim() || safeFallbackDescription.trim() || 'اكتشف المزيد من التفاصيل والإنتاجات الإبداعية المتميزة مع راية.'
  const displayUrl = `https://raya.sa${pathPrefix}${safeUrlSlug}`
  const displayImage = safeOgImage.trim() || fallbackImage || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80'

  // Character counter helper logic
  const titleLength = safeMetaTitle.length
  const descLength = safeMetaDescription.length

  const getTitleStatus = () => {
    if (titleLength === 0) return { text: 'يستخدم العنوان الافتراضي', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' }
    if (titleLength <= 60 && titleLength >= 30) return { text: 'طول مثالي لـ Google', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' }
    if (titleLength < 30) return { text: 'قصير نوعاً ما', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' }
    return { text: 'طويل وسيتم اقتطاعه (>60)', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' }
  }

  const getDescStatus = () => {
    if (descLength === 0) return { text: 'يستخدم الوصف الافتراضي', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' }
    if (descLength <= 160 && descLength >= 80) return { text: 'طول مثالي لـ Google', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' }
    if (descLength < 80) return { text: 'قصير نوعاً ما', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' }
    return { text: 'طويل وسيتم اقتطاعه (>160)', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' }
  }

  const titleStatus = getTitleStatus()
  const descStatus = getDescStatus()

  return (
    <div className="rounded-2xl border border-[#E5DFD3] bg-[#FAF7F2]/60 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DFD3] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-[#12372A] text-[#F3D7A4]">
            <Globe className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-sm font-black text-[#12372A] flex items-center gap-2">
              <span>تحسين محركات البحث والظهور (SEO & Social)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#12372A]/10 text-[#12372A]">
                SEO Specialist Mode
              </span>
            </h4>
            <p className="text-[11px] text-[#6b7f74]">
              تخصيص ظهور هذه الصفحة في نتائج بحث جوجل ومنصات التواصل الاجتماعي (Open Graph).
            </p>
          </div>
        </div>

        {/* Preview Selector */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5DFD3] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPreviewMode('google')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === 'google'
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>معاينة جوجل</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('social')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              previewMode === 'social'
                ? 'bg-[#12372A] text-[#F3D7A4]'
                : 'text-[#6b7f74] hover:text-[#12372A]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>معاينة التواصل</span>
          </button>
        </div>
      </div>

      {/* Live SERP / Social Preview Simulator Box */}
      <div className="bg-white rounded-2xl border border-[#E5DFD3] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-[#F0EBE1] pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#12372A]">
            <Eye className="w-4 h-4 text-[#8C6D46]" />
            <span>
              {previewMode === 'google' ? 'محاكاة نتيجة البحث في Google (SERP Preview)' : 'محاكاة بطاقة المشاركة (Social Card - Open Graph)'}
            </span>
          </div>

          {previewMode === 'google' && (
            <div className="flex items-center gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  deviceView === 'desktop' ? 'bg-[#12372A]/10 text-[#12372A]' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="شاشة كمبيوتر"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  deviceView === 'mobile' ? 'bg-[#12372A]/10 text-[#12372A]' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="شاشة جوال"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 1. Google Preview Display */}
        {previewMode === 'google' && (
          <div 
            className={`font-sans text-right transition-all ${
              deviceView === 'mobile' ? 'max-w-sm mx-auto p-3 bg-[#F8F9FA] rounded-xl border border-slate-200' : 'p-2'
            }`}
            dir="rtl"
          >
            {/* Breadcrumbs / URL */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#12372A] flex items-center justify-center text-[10px] text-[#F3D7A4] font-black shrink-0">
                ر
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-xs font-medium text-[#202124]">راية للإنتاج والتسويق الإبداعي</div>
                <div className="text-[11px] text-[#5f6368] truncate ltr text-right" dir="ltr">
                  {displayUrl}
                </div>
              </div>
            </div>

            {/* Clickable Title */}
            <h5 className="text-[#1a0dab] hover:underline cursor-pointer text-base sm:text-lg font-medium leading-snug mb-1 line-clamp-2">
              {displayTitle}
            </h5>

            {/* Snippet Description */}
            <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2">
              {displayDescription}
            </p>

            {noIndex && (
              <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                <EyeOff className="w-3 h-3" />
                <span>تحذير: تم تفعيل وسم noindex (هذه الصفحة لن تظهر في محركات البحث)</span>
              </div>
            )}
          </div>
        )}

        {/* 2. Social Card Preview Display */}
        {previewMode === 'social' && (
          <div className="max-w-md mx-auto rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
            <div className="aspect-[1.91/1] w-full bg-slate-100 overflow-hidden relative">
              <img 
                src={displayImage} 
                alt="Social Card Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80'
                }}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                Open Graph Card
              </div>
            </div>
            <div className="p-3 bg-[#F8F9FA] border-t border-slate-200 text-right">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                RAYA.SA
              </div>
              <div className="text-sm font-bold text-[#12372A] line-clamp-1 mb-1">
                {displayTitle}
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-snug">
                {displayDescription}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SEO Form Controls */}
      <div className="grid grid-cols-1 gap-4">
        {/* Meta Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#12372A] flex items-center gap-1.5">
              <span>عنوان السيو في محركات البحث (Meta Title)</span>
              <span className="text-[10px] text-[#8C6D46] font-normal">(موصى به: 40 - 60 حرف)</span>
            </label>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${titleStatus.bg} ${titleStatus.color} ${titleStatus.border}`}>
              {titleLength} / 60 حرف • {titleStatus.text}
            </span>
          </div>

          <input
            type="text"
            value={safeMetaTitle}
            onChange={(e) => onChangeMetaTitle(e.target.value)}
            placeholder={safeFallbackTitle ? `افتراضي: ${safeFallbackTitle}` : 'مثال: إنتاج مقاطع ريلز وتيك توك احترافية | راية'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white placeholder:text-slate-400"
          />
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#12372A] flex items-center gap-1.5">
              <span>الوصف التعريفي في جوجل (Meta Description)</span>
              <span className="text-[10px] text-[#8C6D46] font-normal">(موصى به: 120 - 160 حرف)</span>
            </label>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${descStatus.bg} ${descStatus.color} ${descStatus.border}`}>
              {descLength} / 160 حرف • {descStatus.text}
            </span>
          </div>

          <textarea
            rows={3}
            value={safeMetaDescription}
            onChange={(e) => onChangeMetaDescription(e.target.value)}
            placeholder={safeFallbackDescription ? `افتراضي: ${safeFallbackDescription}` : 'اكتب وصفاً جذاباً يشجع العميل على النقر في نتائج البحث...'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white placeholder:text-slate-400 resize-y"
          />
        </div>

        {/* Focus Keywords */}
        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1.5">
            الكلمات المفتاحية المستهدفة (Focus Keywords)
          </label>
          <input
            type="text"
            value={safeMetaKeywords}
            onChange={(e) => onChangeMetaKeywords(e.target.value)}
            placeholder="مثال: إنتاج محتوى، ريلز، تيك توك، شركة إنتاج بالرياض، فيديو قصير"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white placeholder:text-slate-400"
          />
          <p className="text-[10px] text-[#6b7f74] mt-1">
            افصل بين الكلمات المفتاحية بفاصلة (،).
          </p>
        </div>

        {/* Advanced SEO Toggle */}
        <div className="pt-2 border-t border-[#E5DFD3]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-bold text-[#8C6D46] hover:text-[#12372A] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{showAdvanced ? '− إخفاء إعدادات السيو المتقدمة' : '+ إظهار إعدادات السيو المتقدمة (Canonical, OG Image, Robots)'}</span>
          </button>
        </div>

        {/* Advanced SEO Fields */}
        {showAdvanced && (
          <div className="p-4 rounded-xl bg-white border border-[#E5DFD3] space-y-4 animate-fadeIn">
            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1">
                الرابط الدائم المعتمد (Canonical URL)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={safeCanonicalUrl}
                  onChange={(e) => onChangeCanonicalUrl(e.target.value)}
                  placeholder={displayUrl}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E5DFD3] text-xs focus:border-[#12372A] focus:outline-none ltr text-left"
                  dir="ltr"
                />
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <p className="text-[10px] text-[#6b7f74] mt-1">
                اتركه فارغاً للاعتماد على الرابط الافتراضي التلقائي لمنع مشاكل المحتوى المكرر.
              </p>
            </div>

            {/* Custom OG Image */}
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1">
                رابط صورة المشاركة المخصصة (Open Graph Image URL)
              </label>
              <input
                type="url"
                value={safeOgImage}
                onChange={(e) => onChangeOgImage(e.target.value)}
                placeholder={fallbackImage || 'https://images.unsplash.com/...'}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-xs focus:border-[#12372A] focus:outline-none ltr text-left"
                dir="ltr"
              />
              <p className="text-[10px] text-[#6b7f74] mt-1">
                المقاس المثالي للشبكات الاجتماعية هو 1200 × 630 بكسل. إن تركته فارغاً سيتم استخدام صورة الغلاف تلقائياً.
              </p>
            </div>

            {/* No-index toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
              <div>
                <span className="text-xs font-bold text-[#12372A] block">
                  منع محركات البحث من الفهرسة (Robots: noindex)
                </span>
                <span className="text-[10px] text-[#6b7f74]">
                  فعّل هذا الخيار فقط إذا كانت هذه الصفحة تجريبية أو خاصة ولا تريد ظهورها في نتائج جوجل.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={noIndex}
                  onChange={(e) => onChangeNoIndex(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
