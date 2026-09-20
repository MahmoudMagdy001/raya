import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield } from 'lucide-react'

export const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B221A] flex flex-col items-center justify-center text-[#F4EFE6] gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#12372A] border border-[#C5A880]/30 flex items-center justify-center shadow-xl animate-pulse">
            <Shield className="w-8 h-8 text-[#C5A880]" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-[#C5A880] border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-bold text-[#b9d5c7] tracking-wider">جاري التحقق من الصلاحيات الأمنية...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
