import React from 'react'
import { AlertCircle, RefreshCw, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
  showHomeLink?: boolean
  className?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'تعذر تحميل البيانات',
  message = 'حدث خطأ مؤقت أثناء جلب البيانات من الخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مجدداً.',
  onRetry,
  retryLabel = 'إعادة المحاولة الآن',
  showHomeLink = true,
  className = ''
}) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-xs p-10 sm:p-14 rounded-3xl border border-rose-200/80 text-center space-y-5 max-w-lg mx-auto shadow-sm ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500 shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-black text-[#12372A]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#6b7f74] leading-relaxed max-w-md mx-auto">
          {message}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{retryLabel}</span>
          </button>
        )}

        {showHomeLink && (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE4D9] border border-[#E5DFD3] text-[#12372A] text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>العودة للرئيسية</span>
          </Link>
        )}
      </div>
    </div>
  )
}
