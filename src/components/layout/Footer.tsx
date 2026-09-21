import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react'
import { getServices, getSiteSettings } from '../../lib/supabase'
import { Service, SiteSettings } from '../../lib/types'
import { INITIAL_SITE_SETTINGS } from '../../data/initialData'

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const DEFAULT_SERVICES: Array<{ id?: string; title: string; slug: string }> = [
  { id: '1', title: 'إنتاج المقاطع القصيرة', slug: 'short-form-content' },
  { id: '2', title: 'تغطية المعارض والمؤتمرات', slug: 'events-coverage' },
  { id: '3', title: 'الأفلام الوثائقية والإعلانات التجارية', slug: 'documentaries-commercials' },
  { id: '4', title: 'صناعة المحتوى الشخصي والبودكاست', slug: 'podcast-personal-branding' },
  { id: '5', title: 'إنشاء المواقع الإلكترونية والمنصات', slug: 'web-development' },
  { id: '6', title: 'تطوير تطبيقات الجوال الذكية', slug: 'mobile-app-development' },
  { id: '7', title: 'حلول وأنظمة الذكاء الاصطناعي', slug: 'ai-solutions' },
  { id: '8', title: 'بناء الهوية البصرية والاستراتيجية', slug: 'brand-identity-strategy' }
]

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  const [services, setServices] = useState<Service[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('raya_services')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
      } catch {
        // ignore
      }
    }
    return []
  })

  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('raya_site_settings')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (parsed && typeof parsed === 'object') return { ...INITIAL_SITE_SETTINGS, ...parsed }
        }
      } catch {
        // ignore
      }
    }
    return INITIAL_SITE_SETTINGS
  })

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const [servicesData, settingsData] = await Promise.all([
        getServices(),
        getSiteSettings()
      ])
      if (isMounted) {
        if (servicesData && servicesData.length > 0) {
          setServices(servicesData)
        }
        if (settingsData) {
          setSettings(settingsData)
        }
      }
    }

    loadData()

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key?: string }>
      if (!customEvent.detail?.key || customEvent.detail.key === 'raya_services') {
        getServices().then((data) => {
          if (isMounted && data && data.length > 0) setServices(data)
        })
      }
      if (!customEvent.detail?.key || customEvent.detail.key === 'raya_site_settings') {
        getSiteSettings().then((data) => {
          if (isMounted && data) setSettings(data)
        })
      }
    }

    window.addEventListener('raya_storage_updated', handleStorageUpdate)

    return () => {
      isMounted = false
      window.removeEventListener('raya_storage_updated', handleStorageUpdate)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleLinkClick = (path: string) => {
    if (location.pathname === path) {
      scrollToTop()
    }
  }

  const displayServices = (services.length > 0 ? services : DEFAULT_SERVICES).filter(
    (s: any) => !s.status || s.status === 'published'
  )

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
            <Link to="/" onClick={() => handleLinkClick('/')} className="inline-block">
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
                <Link to="/" onClick={() => handleLinkClick('/')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => handleLinkClick('/about')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>عن راية</span>
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={() => handleLinkClick('/services')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>خدماتنا</span>
                </Link>
              </li>
              <li>
                <Link to="/works" onClick={() => handleLinkClick('/works')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>أعمالنا</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => handleLinkClick('/blog')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>المدونة</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => handleLinkClick('/contact')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/70 shrink-0 group-hover/item:bg-[#C5A880] transition-colors" />
                  <span>تواصل معنا</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" onClick={() => handleLinkClick('/privacy')} className="hover:text-[#C5A880] transition-colors flex items-center gap-2 py-0.5 group/item">
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
                onClick={() => handleLinkClick('/services')}
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
                    onClick={() => handleLinkClick(`/services/${service.slug}`)}
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
                  {settings.phone_number || '+966 50 123 4567'}
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
            <p>© 2026 {settings.site_name || 'شركة راية للإنتاج والتسويق الإبداعي'}. جميع الحقوق محفوظة.</p>
            <span className="hidden sm:inline text-[#205341]">•</span>
            <Link
              to="/privacy"
              onClick={() => handleLinkClick('/privacy')}
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
    </footer>
  )
}
