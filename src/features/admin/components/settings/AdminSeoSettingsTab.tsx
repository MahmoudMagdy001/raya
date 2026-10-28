import React from 'react'
import { SiteSettings } from '../../../../lib/types'
import { Eye } from 'lucide-react'
import { ImagePickerField } from '../ImagePickerField'

interface AdminSeoSettingsTabProps {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
}

export const AdminSeoSettingsTab: React.FC<AdminSeoSettingsTabProps> = ({
  settings,
  onChange
}) => {
  return (
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
                {(settings.site_url || 'https://raya-tawny.vercel.app').replace(/\/$/, '')}
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
            onChange={(e) => onChange({ ...settings, default_meta_title: e.target.value })}
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
            onChange={(e) => onChange({ ...settings, default_meta_description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12372A] mb-1.5">الكلمات الدلالية (Meta Keywords)</label>
          <input
            type="text"
            value={settings.default_keywords || ''}
            onChange={(e) => onChange({ ...settings, default_keywords: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
          />
        </div>

        <ImagePickerField
          label="صورة المشاركة الافتراضية (Default OG Image)"
          value={settings.default_og_image || ''}
          onChange={(url) => onChange({ ...settings, default_og_image: url })}
          hint="الحجم الموصى به لشبكات التواصل الاجتماعي: 1200 × 630 بكسل"
        />
      </div>

    </div>
  )
}
