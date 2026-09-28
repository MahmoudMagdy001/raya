import React from 'react'
import { Project } from '../../../lib/types'
import { 
  Trash2, 
  Edit3, 
  ExternalLink,
  Star,
  TrendingUp,
  Eye
} from 'lucide-react'

interface AdminProjectsTableProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (id: string, title: string) => void
  onToggleFeatured: (project: Project) => void
  onToggleStatus: (project: Project) => void
}

export const AdminProjectsTable: React.FC<AdminProjectsTableProps> = ({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleStatus
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[#E5DFD3] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-[#E5DFD3] bg-[#FAF7F2] text-[11px] font-bold text-[#8C6D46] uppercase">
              <th className="py-4 px-5">المشروع</th>
              <th className="py-4 px-5">العميل والتصنيف</th>
              <th className="py-4 px-5">الأبعاد</th>
              <th className="py-4 px-5">مميز في الرئيسية</th>
              <th className="py-4 px-5">المشاهدات والنمو</th>
              <th className="py-4 px-5">الحالة</th>
              <th className="py-4 px-5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DFD3]/60 text-sm">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                {/* Thumbnail & Title */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.cover_image}
                      alt={proj.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#E5DFD3] shadow-xs shrink-0"
                    />
                    <div>
                      <span className="font-bold text-[#12372A] block line-clamp-1">
                        {proj.title}
                      </span>
                      <span className="text-xs text-[#6b7f74]">
                        slug: /{proj.slug}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Client & Category */}
                <td className="py-4 px-5">
                  <div>
                    <span className="font-bold text-[#12372A] block">
                      {proj.client_name}
                    </span>
                    <span className="text-xs text-[#C5A880] font-semibold">
                      {proj.category_name}
                    </span>
                  </div>
                </td>

                {/* Aspect Ratio */}
                <td className="py-4 px-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#FAF7F2] text-[#12372A] border border-[#E5DFD3]">
                    {proj.video_aspect_ratio}
                  </span>
                </td>

                {/* Featured Toggle */}
                <td className="py-4 px-5">
                  <button
                    onClick={() => onToggleFeatured(proj)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      proj.is_featured
                        ? 'bg-amber-100/80 text-amber-700 hover:bg-amber-200'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                    title={proj.is_featured ? 'مشروع مميز (انقر للإلغاء)' : 'مشروع عادي (انقر للتمييز)'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </td>

                {/* Metrics */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#12372A] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                      {proj.metrics?.views || '+500K'}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {proj.metrics?.growth || '+35%'}
                    </span>
                  </div>
                </td>

                {/* Status Toggle */}
                <td className="py-4 px-5">
                  <button
                    onClick={() => onToggleStatus(proj)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      proj.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {proj.status === 'published' ? 'منشور' : 'مسودة'}
                  </button>
                </td>

                {/* Actions */}
                <td className="py-4 px-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={`/works/${proj.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-colors"
                      title="معاينة الصفحة"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onEdit(proj)}
                      className="p-2 rounded-xl bg-white border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs"
                      title="تعديل المشروع ودراسة الحالة"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(proj.id, proj.title)}
                      className="p-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-500 hover:text-white text-rose-600 transition-all cursor-pointer shadow-xs"
                      title="حذف المشروع"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
