import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react'
import { getServices, getSiteSettings } from '../../lib/supabase'
import { Service, SiteSettings } from '../../lib/types'
import { INITIAL_SITE_SETTINGS, INITIAL_SERVICES } from '../../data/initialData'
import { toArabicNumerals } from '../../lib/arabicNumerals'

import { WhatsAppIcon } from '../ui/icons/WhatsAppIcon'

export const Footer: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS)

  useEffect(() => {
    let isMounted = true

    getServices().then((data) => {
      if (isMounted && data?.length) setServices(data)
    })
    getSiteSettings().then((data) => {
      if (isMounted && data) setSettings(data)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const displayServices = services.filter((s) => !s.status || s.status === 'published')

  const cleanWhatsappNumber = (settings.whatsapp_number || '966501234567').replace(/[^0-9]/g, '')

  return (
    <footer className="relative bg-[#0B221A] text-[#F4EFE6] pt-16 pb-12 overflow-hidden border-t border-[#205341]/40">
      {/* Background Subtle Wave Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C5A880] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#205341] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-[#174233]">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="شعار راية"
                className="h-12 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>

            <p className="text-sm text-[#b9d5c7] leading-relaxed max-w-sm">
              {settings.site_description ||
                'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص. نحوّل أهدافكم إلى محتوى يصنع الفرق ويستحق الظهور.'}
            </p>
          </div>

          {/* Column 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 pb-2 border-b border-[#205341]">
              <h4 className="text-base font-bold text-[#F4EFE6]">
                روابط سريعة
              </h4>
            </div>
            <ul className="space-y-2.5 p-0 m-0 list-none text-sm text-[#b9d5c7]">
              <li>
                <Link to="/" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>عن راية</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>خدماتنا</span>
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>أعمالنا</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>المدونة</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>تواصل معنا</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>سياسة الخصوصية</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#205341]">
              <h4 className="text-base font-bold text-[#F4EFE6]">
                خدمات راية
              </h4>
              <Link
                to="/services"
                className="text-xs font-bold text-[#C5A880] hover:text-[#f3d7a4] transition-colors"
              >
                عرض الكل
              </Link>
            </div>
            <ul className="space-y-2.5 p-0 m-0 list-none text-sm text-[#b9d5c7]">
              {displayServices.map((service) => (
                <li key={service.slug || service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                    <span className="line-clamp-1">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center mb-4 pb-2 border-b border-[#205341]">
              <h4 className="text-base font-bold text-[#F4EFE6]">
                تواصل معنا
              </h4>
            </div>
            <div className="space-y-3 text-sm text-[#b9d5c7]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address || 'الرياض، المملكة العربية السعودية'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${(settings.phone_number || '+966 50 123 4567').replace(/\s+/g, '')}`} className="hover:text-[#C5A880] transition-colors" dir="ltr">
                  {toArabicNumerals(settings.phone_number || '+966 50 123 4567')}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${settings.email_address || 'info@raya.sa'}`} className="hover:text-[#C5A880] transition-colors">
                  {settings.email_address || 'info@raya.sa'}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.social_x && (
                <a
                  href={settings.social_x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6] font-bold text-xs"
                  aria-label="X"
                >
                  𝕏
                </a>
              )}
              {settings.social_linkedin && (
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.social_youtube && (
                <a
                  href={settings.social_youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6]"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8bbba5]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <p>© {toArabicNumerals(2026)} {settings.site_name || 'شركة راية للإنتاج والتسويق الإبداعي'}. جميع الحقوق محفوظة.</p>
            <span className="hidden sm:inline text-[#205341]">•</span>
            <Link
              to="/privacy"
              className="text-[#b9d5c7] hover:text-[#C5A880] transition-colors underline-offset-4 hover:underline font-medium"
            >
              سياسة الخصوصية
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span>الرياض • المملكة العربية السعودية</span>
            <span className="text-[#C5A880]">{settings.slogan_ar || 'أفكار تصنع الفرق'}</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button (Right) */}
      <a
        href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن خدمات راية للإنتاج الإبداعي')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:shadow-green-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
        title="تحدث مع فريق راية على واتساب"
        aria-label="تواصل عبر واتساب"
      >
        <WhatsAppIcon className="w-6 h-6 transition-transform group-hover:rotate-6" />
      </a>

      {/* Scroll to Top Action Button with Circular Progress (Left) */}
      <ScrollToTopButton />
    </footer>
  )
}

const ScrollToTopButton: React.FC = React.memo(() => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)) : 0
        const shouldShow = window.scrollY > 300

        setShowScrollTop(shouldShow)
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF7F2] hover:text-[#C5A880] shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 transform cursor-pointer group ${
        showScrollTop
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      title="العودة للأعلى"
      aria-label="العودة إلى أعلى الصفحة"
    >
      {/* Circular Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        viewBox="0 0 48 48"
      >
        {/* Subtle Background Track */}
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="#205341"
          strokeWidth="2.5"
          opacity="0.6"
        />
        {/* Active Golden Progress Ring */}
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="#C5A880"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={131.95}
          strokeDashoffset={131.95 - (scrollProgress / 100) * 131.95}
          className="transition-all duration-150 ease-out"
        />
      </svg>

      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 relative z-10" />
    </button>
  )
})
