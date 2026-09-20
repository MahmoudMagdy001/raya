import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin'
}

interface AuthContextType {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MASTER_ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@raya.sa').toLowerCase().trim()
const MASTER_ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'raya2026!'

const LOCAL_STORAGE_KEY = 'raya_admin_session'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check initial session
    const initSession = async () => {
      try {
        // 1. Check if Supabase session exists
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@raya.sa',
            name: session.user.user_metadata?.name || 'مسؤول راية',
            role: 'super_admin'
          })
          setIsLoading(false)
          return
        }

        // 2. Check local fallback session
        const savedSession = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (savedSession) {
          const parsed = JSON.parse(savedSession)
          if (parsed && parsed.email) {
            setUser(parsed)
          }
        }
      } catch (err) {
        console.error('Session init error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initSession()

    // Listen to Supabase auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || 'admin@raya.sa',
          name: session.user.user_metadata?.name || 'مسؤول راية',
          role: 'super_admin'
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (emailInput: string, passInput: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = emailInput.toLowerCase().trim()
    const cleanPass = passInput.trim()

    // 1. First attempt Supabase Auth if online
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass
      })

      if (!error && data?.user) {
        const adminUser: AdminUser = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          name: data.user.user_metadata?.name || 'مدير النظام',
          role: 'super_admin'
        }
        setUser(adminUser)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(adminUser))
        return { success: true }
      }
    } catch {
      // Supabase auth network failure or not configured, proceed to fallback check
    }

    // 2. Check Master Fallback Credentials
    if (cleanEmail === MASTER_ADMIN_EMAIL && cleanPass === MASTER_ADMIN_PASS) {
      const fallbackUser: AdminUser = {
        id: 'master-admin',
        email: cleanEmail,
        name: 'المسؤول الرئيسي',
        role: 'super_admin'
      }
      setUser(fallbackUser)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackUser))
      return { success: true }
    }

    return {
      success: false,
      error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.'
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
    setUser(null)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
