import React, { useState, useEffect } from 'react'
import { getShowcaseReels } from '../../../lib/supabase'
import { ShowcaseReel } from '../../../lib/types'
import { INITIAL_SHOWCASE_REELS } from '../../../data/initialData'

export const AdminReelsPage: React.FC = () => {
  const [reels, setReels] = useState<ShowcaseReel[]>(INITIAL_SHOWCASE_REELS)

  useEffect(() => {
    async function load() {
      const data = await getShowcaseReels()
      if (data && data.length > 0) setReels(data)
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#12372A]">
            إدارة المحتوى القصير والريلز (Showcase Reels)
          </h2>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            التحكم في شريط العرض الرأسي التفاعلي بالصفحة الرئيسية (9:16).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E5DFD3] shadow-xs flex flex-col"
          >
            <div className="relative aspect-[9/16] bg-[#0B221A]">
              <img
                src={reel.thumbnail_url}
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                {reel.views_label}
              </span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#12372A]/80 text-[#C5A880] text-[10px] font-bold">
                {reel.platform}
              </span>
            </div>
            <div className="p-3">
              <h4 className="text-xs font-bold text-[#12372A] line-clamp-2 leading-snug">
                {reel.title}
              </h4>
              <span className="text-[10px] text-[#6b7f74] block mt-1">
                {reel.client_name || 'عميل راية'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
