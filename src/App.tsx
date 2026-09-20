import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './features/home/HomePage'
import { AboutPage } from './features/about/pages/AboutPage'
import { ServicesPage } from './features/services/pages/ServicesPage'
import { ServiceDetailPage } from './features/services/pages/ServiceDetailPage'
import { WorksPage } from './features/portfolio/pages/WorksPage'
import { CaseStudyDetailPage } from './features/portfolio/pages/CaseStudyDetailPage'
import { ContactPage } from './features/contact/pages/ContactPage'

// Admin
import { AdminLayout } from './components/layout/AdminLayout'
import { AdminProjectsPage } from './features/admin/pages/AdminProjectsPage'
import { AdminServicesPage } from './features/admin/pages/AdminServicesPage'
import { AdminReelsPage } from './features/admin/pages/AdminReelsPage'
import { AdminInquiriesPage } from './features/admin/pages/AdminInquiriesPage'
import { AdminSettingsPage } from './features/admin/pages/AdminSettingsPage'
import { AdminGenericPage } from './features/admin/pages/AdminGenericPage'

// Public layout wrapper
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/projects" replace />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="reels" element={<AdminReelsPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
        <Route path="offers" element={<AdminGenericPage title="الباقات والعروض" subtitle="إدارة العروض الترويجية والاشتراكات الشهرية" />} />
        <Route path="media" element={<AdminGenericPage title="مكتبة الوسائط" subtitle="إدارة ملفات الفيديو والصور عبر Supabase Storage" />} />
        <Route path="categories" element={<AdminGenericPage title="التصنيفات" subtitle="إدارة تصنيفات المشاريع والخدمات" />} />
        <Route path="posts" element={<AdminGenericPage title="المقالات والمدونة" subtitle="إدارة مقالات ونشرات راية الفكرية" />} />
        <Route path="redirects" element={<AdminGenericPage title="التحويلات" subtitle="إدارة روابط 301 و 302" />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
