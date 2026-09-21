import React, { useMemo } from 'react'
import { X, VideoOff } from 'lucide-react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
  aspectRatio?: '9:16' | '16:9'
}

function getEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube & YouTube Shorts
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/)
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  }

  return null
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  aspectRatio = '16:9'
}) => {
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setHasError(false)
  }, [videoUrl, isOpen])

  const embedUrl = useMemo(() => getEmbedUrl(videoUrl), [videoUrl])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0B221A] border border-[#C5A880]/30 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#205341]">
          <h4 className="text-lg font-bold text-[#F4EFE6] truncate">
            {title || 'معاينة الفيديو — راية للإنتاج الإبداعي'}
          </h4>
          <button
            onClick={onClose}
            className="p-2 text-[#b9d5c7] hover:text-white hover:bg-[#205341] rounded-full transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className={`relative w-full ${aspectRatio === '9:16' ? 'max-w-xs mx-auto aspect-[9/16]' : 'aspect-video'} bg-black flex items-center justify-center`}>
          {hasError ? (
            <div className="p-8 text-center text-[#F4EFE6]/70 flex flex-col items-center gap-3">
              <VideoOff className="w-10 h-10 text-[#C5A880]" />
              <p className="text-sm">تعذر تشغيل ملف الفيديو حالياً.</p>
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || 'معاينة الفيديو'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              preload="auto"
              onError={() => setHasError(true)}
              className="w-full h-full object-contain"
            >
              عذراً، متصفحك لا يدعم تشغيل هذا الفيديو.
            </video>
          )}
        </div>
      </div>
    </div>
  )
}

