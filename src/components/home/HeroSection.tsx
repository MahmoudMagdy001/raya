import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowUpLeft } from 'lucide-react'
import { VideoModal } from '../ui/VideoModal'
import { getShowcaseReels, getProjects } from '../../lib/supabase'

export const HeroSection: React.FC = () => {
  const [showreelOpen, setShowreelOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [videoTitle, setVideoTitle] = useState<string>('شووريل راية للإنتاج والتسويق الإبداعي')

  useEffect(() => {
    // Dynamically fetch showreel video from Supabase CMS
    const fetchShowreel = async () => {
      try {
        const reels = await getShowcaseReels()
        const featuredReel = reels.find(r => r.status === 'published' && r.video_url) || reels.find(r => r.video_url)
        if (featuredReel && featuredReel.video_url) {
          setVideoUrl(featuredReel.video_url)
          setVideoTitle(featuredReel.title || 'شووريل راية للإنتاج والتسويق الإبداعي')
          return
        }

        // Fallback to featured project video if available
        const projects = await getProjects()
        const featuredProject = projects.find(p => p.is_featured && p.video_url) || projects.find(p => p.video_url)
        if (featuredProject && featuredProject.video_url) {
          setVideoUrl(featuredProject.video_url)
          setVideoTitle(featuredProject.title || 'شووريل راية للإنتاج والتسويق الإبداعي')
        }
      } catch (err) {
        console.warn('Could not load dynamic showreel:', err)
      }
    }
    fetchShowreel()
  }, [])

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B221A] text-[#F4EFE6]">
      {/* Background Banner Image with Subtle Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/header-banner.jpg"
          alt="راية للإنتاج والتسويق الإبداعي"
          className="w-full h-full object-cover object-center transform scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Cinematic Gradient Overlays to match brand palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-[#12372A]/75 to-[#0B221A]/85" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B221A]/40 to-[#0B221A]/90" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F4EFE6] tracking-tight leading-[1.2] max-w-4xl mx-auto drop-shadow-md">
          نحوّل أفكار علامتك التجارية إلى محتوى مبتكر..{' '}
          <span className="relative inline-block text-[#C5A880]">
            يصنع التأثير
            <svg className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
              <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>{' '}
          ويستحق الظهور
        </h1>

        {/* Subtitle / Philosophy */}
        <p className="mt-6 text-base sm:text-xl text-[#b9d5c7] max-w-2xl mx-auto leading-relaxed font-normal drop-shadow">
          في راية، ما نكتفي بتصوير اللي تطلبه، بل نشارك في صناعة الفكرة، هندسة الاستراتيجية، واختيار أذكى زاوية للوصول لجمهورك بالشكل المناسب على كل منصة.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C5A880] hover:bg-[#b0926b] text-[#12372A] px-8 py-4 rounded-full text-base font-black shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>ابدأ مشروعك معنا</span>
            <ArrowUpLeft className="w-5 h-5 text-[#12372A]" />
          </Link>

          {videoUrl && (
            <button
              onClick={() => setShowreelOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#12372A]/80 hover:bg-[#12372A] text-[#F4EFE6] border border-[#C5A880]/40 hover:border-[#C5A880] px-7 py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-full bg-[#C5A880] text-[#12372A] flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-[#12372A] text-[#12372A] translate-x-0.5" />
              </div>
              <span>شاهد الشووريل (Showreel)</span>
            </button>
          )}
        </div>
      </div>

      {/* Showreel Modal */}
      {videoUrl && (
        <VideoModal
          isOpen={showreelOpen}
          onClose={() => setShowreelOpen(false)}
          videoUrl={videoUrl}
          title={videoTitle}
          aspectRatio="16:9"
        />
      )}
    </section>
  )
}
