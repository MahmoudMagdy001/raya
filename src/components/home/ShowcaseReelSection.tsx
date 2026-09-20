import React, { useState } from 'react'
import { ShowcaseReel } from '../../lib/types'
import { Play, Eye, Heart } from 'lucide-react'
import { VideoModal } from '../ui/VideoModal'

interface ShowcaseReelSectionProps {
  reels: ShowcaseReel[]
}

interface ReelCardProps {
  reel: ShowcaseReel
  onOpen: (reel: ShowcaseReel) => void
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, onOpen }) => (
  <div
    onClick={() => onOpen(reel)}
    className="group relative flex-none w-64 sm:w-72 aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#E5DFD3]/80 bg-[#0B221A] select-none"
    dir="rtl"
  >
    {/* Thumbnail Image */}
    <img
      src={reel.thumbnail_url}
      alt={reel.title}
      loading="lazy"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-[#0B221A]/30 to-transparent" />

    {/* Views & Platform Badge */}
    <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F4EFE6] text-xs font-semibold flex items-center gap-1.5 border border-white/10">
        <Eye className="w-3 h-3 text-[#C5A880]" />
        <span>{reel.views_label || '1.5M+'}</span>
      </span>
      <span className="px-2.5 py-1 rounded-full bg-[#12372A]/80 backdrop-blur-md text-[#C5A880] text-[10px] font-bold uppercase tracking-wider">
        {reel.platform}
      </span>
    </div>

    {/* Center Play Button */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-14 h-14 rounded-full bg-[#C5A880] text-[#12372A] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-110 transition-transform duration-300">
        <Play className="w-6 h-6 fill-[#12372A] translate-x-0.5" />
      </div>
    </div>

    {/* Bottom Info */}
    <div className="absolute bottom-4 right-4 left-4 text-right">
      {reel.client_name && (
        <p className="text-xs text-[#C5A880] font-medium mb-1">
          {reel.client_name}
        </p>
      )}
      <h3 className="text-sm font-bold text-[#F4EFE6] line-clamp-2 leading-snug">
        {reel.title}
      </h3>

      {reel.likes_count && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#b9d5c7]">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>{(reel.likes_count / 1000).toFixed(0)}k إعجاب</span>
        </div>
      )}
    </div>
  </div>
)

export const ShowcaseReelSection: React.FC<ShowcaseReelSectionProps> = ({ reels }) => {
  const [activeVideo, setActiveVideo] = useState<ShowcaseReel | null>(null)

  const baseReels = reels && reels.length > 0 ? reels : []
  // Repeat items if list is short to guarantee ultra-wide screen coverage before loop
  const trackItems = baseReels.length > 0
    ? (baseReels.length < 6 ? [...baseReels, ...baseReels] : baseReels)
    : []

  return (
    <section className="py-20 bg-[#FAF7F2] border-y border-[#E5DFD3] overflow-hidden">
      {/* Section Header with Container Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12372A]">
              شريط الأعمال والشووريل المتدفق
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-[#6b7f74] max-w-md">
            مقاطع ريلز وفيديوهات إعلانية صُنعت بتنسيق (9:16) لتتصدر منصات التواصل وتحقق أعلى مشاهدات وتفاعل.
          </p>
        </div>
      </div>

      {/* Full-width Infinite Auto-Scroll Carousel */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Subtle Fade Masks on Screen Edges */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-[#FAF7F2]/50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-[#FAF7F2]/50 to-transparent z-10" />

        {/* Marquee Scroller */}
        <div className="flex overflow-hidden select-none" dir="ltr">
          <div className="animate-infinite-scroll flex shrink-0 items-center">
            {/* Track 1 */}
            <div className="flex shrink-0 gap-6 pr-6 items-center">
              {trackItems.map((reel, idx) => (
                <ReelCard
                  key={`track1-${reel.id}-${idx}`}
                  reel={reel}
                  onOpen={setActiveVideo}
                />
              ))}
            </div>

            {/* Track 2 (Clone for infinite seamless loop) */}
            <div className="flex shrink-0 gap-6 pr-6 items-center" aria-hidden="true">
              {trackItems.map((reel, idx) => (
                <ReelCard
                  key={`track2-${reel.id}-${idx}`}
                  reel={reel}
                  onOpen={setActiveVideo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.video_url}
          title={activeVideo.title}
          aspectRatio="9:16"
        />
      )}
    </section>
  )
}
