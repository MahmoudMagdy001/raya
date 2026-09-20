import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already authenticated
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/projects'

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || !password.trim()) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني وكلمة المرور.')
      return
    }

    setSubmitting(true)
    try {
      const res = await login(email, password)
      if (res.success) {
        navigate(from, { replace: true })
      } else {
        setErrorMsg(res.error || 'فشل تسجيل الدخول. يرجى التأكد من صحة البيانات.')
      }
    } catch {
      setErrorMsg('حدث خطأ غير متوقع أثناء محاولة الدخول. يرجى المحاولة لاحقاً.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071711] text-[#F4EFE6] flex flex-col justify-center items-center p-4 relative overflow-hidden select-none" dir="rtl">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-[#205341]/20 rounded-full blur-3xl" />

      {/* Top Bar back to site */}
      <div className="absolute top-6 right-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-[#b9d5c7] hover:text-[#F4EFE6] border border-white/10 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>العودة للموقع العام</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Lockup Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#205341] to-[#12372A] border border-[#C5A880]/40 shadow-2xl shadow-black/50 text-[#C5A880] mb-2 transform hover:scale-105 transition-transform duration-300">
            <Shield className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#205341]/40 border border-[#C5A880]/20 text-[11px] font-bold text-[#C5A880]">
            <Sparkles className="w-3 h-3" />
            <span>بوابة الإدارة المركزية</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F4EFE6]">
            تسجيل الدخول للوحة التحكم
          </h1>
          <p className="text-xs sm:text-sm text-[#b9d5c7]">
            راية للإنتاج والتسويق الإبداعي — نظام الإدارة المحمي
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0B221A]/80 backdrop-blur-xl p-8 rounded-3xl border border-[#174233] shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#b9d5c7]">
                البريد الإلكتروني للمسؤول
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@raya.sa"
                  required
                  autoFocus
                  className="w-full bg-[#071711] border border-[#174233] focus:border-[#C5A880] rounded-xl px-4 py-3.5 pr-11 text-sm text-[#F4EFE6] placeholder-[#4e6b5d] outline-none transition-colors"
                />
                <Mail className="w-5 h-5 text-[#5e8270] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#b9d5c7]">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#071711] border border-[#174233] focus:border-[#C5A880] rounded-xl px-4 py-3.5 pr-11 pl-11 text-sm text-[#F4EFE6] placeholder-[#4e6b5d] outline-none transition-colors"
                />
                <Lock className="w-5 h-5 text-[#5e8270] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5e8270] hover:text-[#C5A880] transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#C5A880] hover:bg-[#d8bc93] disabled:opacity-50 text-[#12372A] font-black py-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#12372A] border-t-transparent rounded-full animate-spin" />
                  <span>جاري التحقق والدخول...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-[#12372A]" />
                  <span>دخول لوحة التحكم</span>
                </>
              )}
            </button>
          </form>

          {/* Emergency Default Account Hint */}
          <div className="pt-4 border-t border-[#174233]/60 text-center">
            <p className="text-[11px] text-[#7a9d8c] leading-relaxed">
              الحساب الافتراضي للنظام:{' '}
              <span className="text-[#C5A880] font-mono font-bold">admin@raya.sa</span>
              <br />
              كلمة المرور الافتراضية:{' '}
              <span className="text-[#C5A880] font-mono font-bold">raya2026!</span>
            </p>
          </div>
        </div>

        {/* Security Footer Note */}
        <p className="text-center text-[11px] text-[#5e8270] mt-6">
          جميع محاولات الدخول مراقبة ومحمية بنظام تشفير أمني متقدم.
        </p>
      </div>
    </div>
  )
}
