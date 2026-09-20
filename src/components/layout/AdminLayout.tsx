import React, { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { RAYA_ADMIN_LINKS } from '../../features/admin/constants/adminNav'
import { Menu, X, ArrowUpLeft, Shield, ExternalLink } from 'lucide-react'

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#12372A] flex flex-col md:flex-row">
      {/* Sidebar for Desktop & Drawer for Mobile */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-[#0B221A] text-[#F4EFE6] flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#174233] flex items-center justify-between">
            <Link to="/admin/projects" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#205341] flex items-center justify-center text-[#C5A880]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-[#F4EFE6] block">إدارة رايـة</span>
                <span className="text-[10px] text-[#C5A880] tracking-widest uppercase">Admin Workspace</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-[#b9d5c7] hover:bg-[#174233]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            {RAYA_ADMIN_LINKS.map((link) => {
              const IconComp = link.icon
              const isActive = location.pathname.startsWith(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#12372A] text-[#C5A880] border-r-4 border-[#C5A880]'
                      : 'text-[#b9d5c7] hover:text-[#F4EFE6] hover:bg-[#12372A]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badgeCountKey && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C5A880] text-[#12372A] text-[10px] font-black">
                      جديد
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Back to public website */}
        <div className="p-4 border-t border-[#174233] bg-[#05130E]">
          <Link
            to="/"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#174233] text-xs font-bold text-[#F4EFE6] transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#C5A880]" />
              <span>معاينة الموقع العام</span>
            </div>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:mr-72 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E5DFD3] px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#12372A] hover:bg-black/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-black text-[#12372A]">
              لوحة التحكم المركزية — راية للإنتاج والتسويق
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#205341]/10 text-[#205341] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#205341] animate-ping" />
              <span>قاعدة البيانات متصلة</span>
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
