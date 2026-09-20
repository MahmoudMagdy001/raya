import React from 'react'
import { X } from 'lucide-react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
  aspectRatio?: '9:16' | '16:9'
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  aspectRatio = '16:9'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B221A] border border-[#C5A880]/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#205341]">
          <h4 className="text-lg font-bold text-[#F4EFE6] truncate">
            {title || 'معاينة الفيديو — راية للإنتاج الإبداعي'}
          </h4>
          <button
            onClick={onClose}
            className="p-2 text-[#b9d5c7] hover:text-white hover:bg-[#205341] rounded-full transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className={`relative w-full ${aspectRatio === '9:16' ? 'max-w-xs mx-auto aspect-[9/16]' : 'aspect-video'} bg-black`}>
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          >
            عذراً، متصفحك لا يدعم تشغيل هذا الفيديو.
          </video>
        </div>
      </div>
    </div>
  )
}
