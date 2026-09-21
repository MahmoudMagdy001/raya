import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { HomePage } from './features/home/HomePage'
import { AboutPage } from './features/about/pages/AboutPage'
import { ServicesPage } from './features/services/pages/ServicesPage'
import { ServiceDetailPage } from './features/services/pages/ServiceDetailPage'
import { WorksPage } from './features/portfolio/pages/WorksPage'
import { CaseStudyDetailPage } from './features/portfolio/pages/CaseStudyDetailPage'
import { ContactPage } from './features/contact/pages/ContactPage'
import { BlogPage } from './features/blog/pages/BlogPage'
import { BlogPostDetailPage } from './features/blog/pages/BlogPostDetailPage'
import { PrivacyPage } from './features/privacy/pages/PrivacyPage'

// Admin & Auth
import { AuthProvider } from './features/admin/context/AuthContext'
import { AdminProtectedRoute } from './features/admin/components/AdminProtectedRoute'
import { AdminLoginPage } from './features/admin/pages/AdminLoginPage'
import { AdminLayout } from './components/layout/AdminLayout'
import { AdminProjectsPage } from './features/admin/pages/AdminProjectsPage'
import { AdminServicesPage } from './features/admin/pages/AdminServicesPage'
import { AdminClientsPage } from './features/admin/pages/AdminClientsPage'
import { AdminReelsPage } from './features/admin/pages/AdminReelsPage'
import { AdminPostsPage } from './features/admin/pages/AdminPostsPage'
import { AdminInquiriesPage } from './features/admin/pages/AdminInquiriesPage'
import { AdminMediaPage } from './features/admin/pages/AdminMediaPage'
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
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Admin Login Route (Public) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/projects" replace />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="reels" element={<AdminReelsPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="media" element={<AdminMediaPage />} />
          <Route path="redirects" element={<AdminGenericPage title="التحويلات" subtitle="إدارة روابط 301 و 302" />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
