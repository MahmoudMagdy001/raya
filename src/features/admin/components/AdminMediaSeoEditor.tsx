import React, { useState } from 'react'
import { MediaItem } from '../../../lib/types'
import { 
  ArrowRight, 
  Play, 
  Check, 
  Copy, 
  Eye, 
  Globe, 
  Info, 
  Tag, 
  Save 
} from 'lucide-react'

interface AdminMediaSeoEditorProps {
  media: MediaItem
  copiedId: string | null
  onCopyUrl: (media: MediaItem) => void
  onSave: (data: Partial<MediaItem>) => Promise<void>
  onCancel: () => void
}

export const AdminMediaSeoEditor: React.FC<AdminMediaSeoEditorProps> = ({
  media,
  copiedId,
  onCopyUrl,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<MediaItem>>({
    name: media.name,
    alt_text: media.alt_text || '',
    caption: media.caption || '',
    description: media.description || '',
    keywords: media.keywords || '',
    dimensions: media.dimensions || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="space-y-6 max-w-5xl animate-fadeIn">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#12372A] text-[#12372A] hover:text-[#F3D7A4] transition-colors cursor-pointer"
            title="العودة لمكتبة الوسائط"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
              <span>مكتبة الوسائط</span>
              <span>/</span>
              <span className="text-[#12372A] font-bold">تعديل بيانات وسيو الملف</span>
            </div>
            <h2 className="text-xl font-black text-[#12372A]">
              تعديل سيو وبيانات: {media.name}
            </h2>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#12372A]/10 text-[#12372A] uppercase">
          {media.file_type}
        </span>
      </div>

      {/* Main Editor Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Media Preview & Google Images Simulator */}
        <div className="space-y-5">
          {/* Visual Preview */}
          <div className="bg-white p-4 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#12372A] block">معاينة الملف</span>
            <div className="aspect-square w-full rounded-2xl bg-[#FAF7F2] overflow-hidden flex items-center justify-center relative border border-[#E5DFD3]">
              {media.file_type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0B221A] text-[#F3D7A4]">
                  <Play className="w-12 h-12 mb-2 opacity-80" />
                  <span className="text-xs font-bold text-[#b9d5c7]">ملف فيديو</span>
                </div>
              ) : (
                <img
                  src={media.file_url}
                  alt={formData.alt_text || media.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Copy URL Box */}
            <div className="pt-2">
              <span className="text-[10px] text-[#6b7f74] block mb-1">الرابط المباشر:</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={media.file_url}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#E5DFD3] text-[11px] font-mono bg-[#FAF7F2] text-slate-600 truncate"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => onCopyUrl(media)}
                  className="p-2 rounded-xl bg-[#12372A] text-[#F3D7A4] hover:bg-[#205341] transition-colors cursor-pointer shrink-0"
                  title="نسخ الرابط"
                >
                  {copiedId === media.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* File Specs */}
            <div className="pt-3 border-t border-[#E5DFD3] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-[#6b7f74] block">الحجم:</span>
                <span className="font-mono font-bold text-[#12372A]">{media.file_size || 'غير محدد'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6b7f74] block">المجلد:</span>
                <span className="font-bold text-[#12372A]">{media.folder || 'general'}</span>
              </div>
            </div>
          </div>

          {/* Google Images Result Simulator */}
          <div className="bg-white p-4 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#12372A]">
              <Eye className="w-4 h-4 text-[#8C6D46]" />
              <span>محاكاة الظهور في Google Images</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={media.file_url}
                  alt={formData.alt_text || media.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden leading-tight flex-1">
                <div className="text-[10px] text-slate-500 font-mono">raya-tawny.vercel.app • {formData.dimensions || '1920×1080'}</div>
                <div className="text-xs font-bold text-[#1a0dab] truncate">
                  {formData.alt_text || formData.name || 'عنوان الصورة في بحث جوجل'}
                </div>
                <p className="text-[10px] text-slate-600 line-clamp-1 mt-0.5">
                  {formData.description || 'صورة من أرشيف راية للإنتاج والتسويق الإبداعي.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SEO Fields Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#E5DFD3]">
            <Globe className="w-5 h-5 text-[#8C6D46]" />
            <h3 className="text-base font-bold text-[#12372A]">بيانات تحسين محركات البحث وسيو الصور</h3>
          </div>

          {/* Alt Text */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black text-[#12372A] flex items-center gap-1.5">
                <span>النص البديل لمحركات البحث (Alt Text) *</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  العنصر الأكثر أهمية
                </span>
              </label>
              <span className="text-[10px] text-slate-500">
                {(formData.alt_text || '').length} حرف
              </span>
            </div>
            <input
              type="text"
              required
              value={formData.alt_text || ''}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              placeholder="اكتب وصفاً دقيقاً لما تحتويه الصورة لمحركات البحث وقارئات الشاشة..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
            />
            <p className="text-[11px] text-[#6b7f74] mt-1.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>تقوم خوارزمية Google بتصنيف وأرشفة الصور اعتماداً على هذا الحقل.</span>
            </p>
          </div>

          {/* Name & Caption */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                اسم الملف التوضيحي (Title)
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                التسمية التوضيحية (Caption)
              </label>
              <input
                type="text"
                value={formData.caption || ''}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder="شرح يظهر أسفل الصورة في المعارض..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
              />
            </div>
          </div>

          {/* Focus Keywords */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>الكلمات المفتاحية والوسوم (SEO Keywords)</span>
            </label>
            <input
              type="text"
              value={formData.keywords || ''}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="مثال: تصوير إعلاني، ريلز، عطور، الرياض، إنتاج سينمائي"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
            />
            <p className="text-[10px] text-[#6b7f74] mt-1">افصل بين الكلمات المفتاحية بفاصلة.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              الوصف المفصل (Extended Description)
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="تفاصيل إضافية عن كواليس الإنتاج وسياق استخدام هذا الملف..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none resize-y"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              الأبعاد والدقة (Dimensions)
            </label>
            <input
              type="text"
              value={formData.dimensions || ''}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              placeholder="مثال: 1920x1080 أو 1080x1920"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none font-mono text-left"
              dir="ltr"
            />
          </div>

          {/* Form Footer Action Buttons */}
          <div className="pt-6 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 transition-colors cursor-pointer"
            >
              إلغاء والعودة
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-black shadow-md cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>حفظ بيانات السيو والتعديلات</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
