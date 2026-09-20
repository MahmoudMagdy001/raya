import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpLeft, Sparkles } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'عن راية', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'أعمالنا', path: '/works' },
    { name: 'المدونة', path: '/blog' },
    { name: 'تواصل معنا', path: '/contact' }
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('/#')) return false
    return location.pathname.startsWith(path)
  }

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B221A]/85 backdrop-blur-md py-3 shadow-lg border-b border-[#205341]/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="شعار راية"
              className="h-10 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    active
                      ? 'text-[#C5A880] bg-white/10 shadow-xs'
                      : 'text-[#F4EFE6]/90 hover:text-[#C5A880] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              onClick={() => handleNavClick('/contact')}
              className="group relative inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b0926b] text-[#12372A] px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>ابدأ مشروعك</span>
              <ArrowUpLeft className="w-4 h-4 text-[#12372A] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#F4EFE6] hover:bg-white/10 transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B221A]/95 backdrop-blur-xl border-b border-[#205341]/50 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleNavClick(link.path)
                }}
                className="px-4 py-2.5 rounded-xl text-base font-bold text-[#F4EFE6] hover:text-[#C5A880] hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-[#205341]/50 flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleNavClick('/contact')
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#C5A880] text-[#12372A] py-3 rounded-xl font-black shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#12372A]" />
                <span>ابدأ مشروعك معنا</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
