import React from 'react'
import { MediaItem } from '../../../lib/types'
import { 
  Play, 
  Trash2, 
  Copy, 
  Check, 
  Edit3 
} from 'lucide-react'

interface AdminMediaCardProps {
  item: MediaItem
  copiedId: string | null
  onPreview: (item: MediaItem) => void
  onOpenSeo: (item: MediaItem) => void
  onCopyUrl: (item: MediaItem) => void
  onDelete: (id: string, name: string) => void
}

export const AdminMediaCard: React.FC<AdminMediaCardProps> = ({
  item,
  copiedId,
  onPreview,
  onOpenSeo,
  onCopyUrl,
  onDelete
}) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* Thumbnail Preview Area */}
      <div
        onClick={() => onPreview(item)}
        className="aspect-square w-full bg-[#FAF7F2] relative overflow-hidden flex items-center justify-center cursor-pointer"
      >
        {item.file_type === 'video' ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0B221A] text-[#F3D7A4]">
            <Play className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold mt-1 text-[#b9d5c7]">معاينة فيديو</span>
          </div>
        ) : (
          <img
            src={item.file_url}
            alt={item.alt_text || item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80'
            }}
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-bold text-white uppercase backdrop-blur-xs">
            {item.file_type}
          </span>
          {item.dimensions && (
            <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[8px] font-mono text-white/90 backdrop-blur-xs">
              {item.dimensions}
            </span>
          )}
        </div>

        {item.file_size && (
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-mono text-white/80">
            {item.file_size}
          </span>
        )}
      </div>

      {/* Title & SEO Metadata Status Bar */}
      <div className="p-2.5 bg-white space-y-2">
        <div>
          <span className="text-xs font-bold text-[#12372A] block truncate" title={item.name}>
            {item.name}
          </span>

          {/* Alt Text Status */}
          <div className="mt-1">
            {item.alt_text ? (
              <span 
                className="inline-block max-w-full truncate text-[9px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded"
                title={`النص البديل: ${item.alt_text}`}
              >
                Alt: {item.alt_text}
              </span>
            ) : (
              <span className="inline-block text-[9px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                ⚠️ بدون Alt Text (يحتاج سيو)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#E5DFD3]">
          <div className="flex items-center gap-1">
            {/* Open In-Place SEO Edit Screen */}
            <button
              onClick={() => onOpenSeo(item)}
              className="p-1.5 rounded-lg text-[#12372A] bg-[#FAF7F2] hover:bg-[#12372A] hover:text-[#F3D7A4] transition-colors cursor-pointer"
              title="تعديل بيانات السيو والنص البديل في شاشة مخصصة"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            {/* Copy Button */}
            <button
              onClick={() => onCopyUrl(item)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                copiedId === item.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#FAF7F2] text-[#12372A] hover:bg-[#12372A] hover:text-[#F3D7A4]'
              }`}
              title="نسخ الرابط المباشر"
            >
              {copiedId === item.id ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>منسوخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>نسخ</span>
                </>
              )}
            </button>
          </div>

          {/* Delete */}
          <button
            onClick={() => onDelete(item.id, item.name)}
            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
            title="حذف"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
