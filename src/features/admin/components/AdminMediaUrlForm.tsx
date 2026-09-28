import React, { useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'

interface AdminMediaUrlFormProps {
  onSubmit: (data: {
    name: string
    url: string
    type: 'image' | 'video'
    folder: string
    alt_text: string
    keywords: string
  }) => Promise<void>
  onCancel: () => void
}

export const AdminMediaUrlForm: React.FC<AdminMediaUrlFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'image' as 'image' | 'video',
    folder: 'general',
    alt_text: '',
    keywords: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
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
              <span className="text-[#12372A] font-bold">إضافة رابط وسائط مباشر</span>
            </div>
            <h2 className="text-xl font-black text-[#12372A]">إضافة ملف خارجي وضبط بيانات السيو</h2>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              اسم الملف أو العنوان التوضيحي *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: غلاف إعلان راية الرئيسي"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              نوع الملف *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video' })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
            >
              <option value="image">صورة (Image)</option>
              <option value="video">فيديو (Video)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1.5">
            الرابط المباشر للملف (Direct File URL) *
          </label>
          <input
            type="url"
            required
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://images.unsplash.com/... أو رابط mp4 مباشر"
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left font-mono"
            dir="ltr"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              النص البديل لمحركات البحث (Alt Text)
            </label>
            <input
              type="text"
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              placeholder="وصف الصورة لمحركات البحث وقارئات الشاشة..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
            />
            <p className="text-[10px] text-[#6b7f74] mt-1">يساعد الصورة في تصدر نتائج بحث Google Images.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5">
              الكلمات المفتاحية (Keywords)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="ريلز, تصوير سينمائي, الرياض"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
            />
            <p className="text-[10px] text-[#6b7f74] mt-1">افصل بين الكلمات بفاصلة.</p>
          </div>
        </div>

        {/* Action Buttons */}
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
            <Plus className="w-4 h-4" />
            <span>إضافة الملف للمكتبة</span>
          </button>
        </div>
      </form>
    </div>
  )
}
