import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react'

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

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
  return (
    <footer className="relative bg-[#0B221A] text-[#F4EFE6] pt-16 pb-12 overflow-hidden border-t border-[#205341]/40">
      {/* Background Subtle Wave Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C5A880] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#205341] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#174233]">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="شعار راية"
                className="h-12 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>

            <p className="text-sm text-[#b9d5c7] leading-relaxed">
              راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص. نحوّل أهدافكم إلى محتوى يصنع الفرق ويستحق الظهور.
            </p>

          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-base font-bold text-[#F4EFE6] mb-4 pb-1 border-b border-[#205341] inline-block">
              خدمات راية
            </h4>
            <ul className="space-y-2.5 text-sm text-[#b9d5c7]">
              <li>
                <Link to="/services/short-form-content" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60" />
                  إنتاج المقاطع القصيرة (Reels & Shorts)
                </Link>
              </li>
              <li>
                <Link to="/services/events-coverage" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60" />
                  تغطية المعارض والمؤتمرات
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60" />
                  إنشاء وتطوير المواقع الإلكترونية
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-app-development" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60" />
                  تطوير تطبيقات الجوال الذكية
                </Link>
              </li>
              <li>
                <Link to="/services/ai-solutions" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60" />
                  حلول وأنظمة الذكاء الاصطناعي
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-base font-bold text-[#F4EFE6] mb-4 pb-1 border-b border-[#205341] inline-block">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm text-[#b9d5c7]">
              <li>
                <Link to="/about" className="hover:text-[#C5A880] transition-colors">عن راية وقصة التأسيس</Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-[#C5A880] transition-colors">أعمالنا ودراسات المشاريع الستة</Link>
              </li>
              <li>
                <Link to="/#workflow" className="hover:text-[#C5A880] transition-colors">طريقة عملنا (الـ 7 خطوات)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors">إرسال بريف مشروع (Brief)</Link>
              </li>
              <li>
                <Link to="/admin/projects" className="hover:text-[#C5A880] transition-colors">بوابة الإدارة والمشرفين</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-[#F4EFE6] mb-4 pb-1 border-b border-[#205341] inline-block">
              تواصل معنا
            </h4>
            <div className="space-y-3 text-sm text-[#b9d5c7]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span dir="ltr">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>info@raya.sa</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6] font-bold text-xs"
                aria-label="X"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12372A] hover:bg-[#C5A880] hover:text-[#12372A] flex items-center justify-center transition-all duration-300 text-[#F4EFE6]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8bbba5]">
          <p>© 2026 شركة راية للإنتاج والتسويق الإبداعي. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <span>الرياض • المملكة العربية السعودية</span>
            <span className="text-[#C5A880]">أفكار تصنع الفرق</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button (Right) */}
      <a
        href="https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%B1%D8%A7%D9%8A%D8%A9%20%D9%84%D9%84%D8%A5%D9%86%D8%AA%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A5%D8%A8%D8%AF%D8%A7%D8%B9%D9%8A"
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
