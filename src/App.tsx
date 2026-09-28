import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { RouteLoadingFallback } from './components/common/RouteLoadingFallback'

// Public Pages (Lazy Loaded for route-level code splitting)
const HomePage = lazy(() => import('./features/home/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('./features/about/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() => import('./features/services/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const ServiceDetailPage = lazy(() => import('./features/services/pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })))
const WorksPage = lazy(() => import('./features/portfolio/pages/WorksPage').then((m) => ({ default: m.WorksPage })))
const CaseStudyDetailPage = lazy(() => import('./features/portfolio/pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })))
const BlogPage = lazy(() => import('./features/blog/pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostDetailPage = lazy(() => import('./features/blog/pages/BlogPostDetailPage').then((m) => ({ default: m.BlogPostDetailPage })))
const ContactPage = lazy(() => import('./features/contact/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const PrivacyPage = lazy(() => import('./features/privacy/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const NotFoundPage = lazy(() => import('./features/not-found/pages/NotFoundPage'))

// Admin & Auth (Decoupled from Public bundle)
const AuthProvider = lazy(() => import('./features/admin/context/AuthContext').then((m) => ({ default: m.AuthProvider })))
const AdminProtectedRoute = lazy(() => import('./features/admin/components/AdminProtectedRoute').then((m) => ({ default: m.AdminProtectedRoute })))
const AdminLoginPage = lazy(() => import('./features/admin/pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })))
const AdminLayout = lazy(() => import('./components/layout/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminProjectsPage = lazy(() => import('./features/admin/pages/AdminProjectsPage').then((m) => ({ default: m.AdminProjectsPage })))
const AdminServicesPage = lazy(() => import('./features/admin/pages/AdminServicesPage').then((m) => ({ default: m.AdminServicesPage })))
const AdminClientsPage = lazy(() => import('./features/admin/pages/AdminClientsPage').then((m) => ({ default: m.AdminClientsPage })))
const AdminReelsPage = lazy(() => import('./features/admin/pages/AdminReelsPage').then((m) => ({ default: m.AdminReelsPage })))
const AdminPostsPage = lazy(() => import('./features/admin/pages/AdminPostsPage').then((m) => ({ default: m.AdminPostsPage })))
const AdminInquiriesPage = lazy(() => import('./features/admin/pages/AdminInquiriesPage').then((m) => ({ default: m.AdminInquiriesPage })))
const AdminMediaPage = lazy(() => import('./features/admin/pages/AdminMediaPage').then((m) => ({ default: m.AdminMediaPage })))
const AdminSettingsPage = lazy(() => import('./features/admin/pages/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })))

// Public layout wrapper with Suspense boundary
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

// Admin layout wrapper scoping AuthProvider strictly to Admin views
const AdminAuthScope: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </Suspense>
  )
}

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Shared Header & Footer */}
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
          {/* Explicit 404 Catch-All within Public Layout */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Scoped Admin Routes (AuthProvider dynamically loaded only when navigating to /admin) */}
        <Route element={<AdminAuthScope />}>
          {/* Admin Login Route (Public within Admin Scope) */}
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
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
