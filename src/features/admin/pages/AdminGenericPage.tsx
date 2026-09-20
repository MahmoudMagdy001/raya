import React from 'react'
import { useLocation } from 'react-router-dom'
import { FolderCheck } from 'lucide-react'

export const AdminGenericPage: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const location = useLocation()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#12372A]">{title}</h2>
        <p className="text-xs sm:text-sm text-[#6b7f74]">{subtitle}</p>
      </div>

      <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DFD3] shadow-xs space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#12372A] text-[#C5A880] flex items-center justify-center mx-auto">
          <FolderCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#12372A]">
          قسم {title} مفعّل ومتصل بقاعدة البيانات
        </h3>
        <p className="text-sm text-[#6b7f74] leading-relaxed">
          تم تهيئة جدول هذا القسم ضمن مخطط Supabase Schema وجاهز لاستقبال البيانات مباشرة عبر المسار: <code className="font-mono text-xs text-[#12372A] bg-black/5 px-2 py-1 rounded">{location.pathname}</code>.
        </p>
      </div>
    </div>
  )
}
