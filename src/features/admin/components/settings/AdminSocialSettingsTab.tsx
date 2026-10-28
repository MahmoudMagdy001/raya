import React from 'react'
import { SiteSettings } from '../../../../lib/types'
import {
  XIcon,
  InstagramIcon,
  TikTokIcon,
  SnapchatIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
  WhatsAppIcon,
  BehanceIcon,
  VimeoIcon,
  ThreadsIcon,
  TelegramIcon,
  PinterestIcon
} from '../../../../components/ui/icons/SocialIcons'
import { Info, CheckCircle2, EyeOff } from 'lucide-react'

interface AdminSocialSettingsTabProps {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
}

interface SocialPlatformConfig {
  key: keyof SiteSettings
  labelAr: string
  labelEn: string
  placeholder: string
  icon: React.FC<{ className?: string }>
  badgeColor: string
}

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    key: 'social_x',
    labelAr: 'منصة X (تويتر سابقاً)',
    labelEn: 'X / Twitter',
    placeholder: 'https://x.com/raya_creative',
    icon: XIcon,
    badgeColor: 'text-zinc-900 bg-zinc-100'
  },
  {
    key: 'social_instagram',
    labelAr: 'إنستغرام',
    labelEn: 'Instagram',
    placeholder: 'https://instagram.com/raya_creative',
    icon: InstagramIcon,
    badgeColor: 'text-pink-600 bg-pink-50'
  },
  {
    key: 'social_tiktok',
    labelAr: 'تيك توك',
    labelEn: 'TikTok',
    placeholder: 'https://tiktok.com/@raya_creative',
    icon: TikTokIcon,
    badgeColor: 'text-cyan-700 bg-cyan-50'
  },
  {
    key: 'social_snapchat',
    labelAr: 'سناب شات',
    labelEn: 'Snapchat',
    placeholder: 'https://snapchat.com/add/raya_creative',
    icon: SnapchatIcon,
    badgeColor: 'text-yellow-700 bg-yellow-50'
  },
  {
    key: 'social_linkedin',
    labelAr: 'لينكد إن',
    labelEn: 'LinkedIn',
    placeholder: 'https://linkedin.com/company/raya-creative',
    icon: LinkedInIcon,
    badgeColor: 'text-blue-700 bg-blue-50'
  },
  {
    key: 'social_facebook',
    labelAr: 'فيسبوك',
    labelEn: 'Facebook',
    placeholder: 'https://facebook.com/raya.creative',
    icon: FacebookIcon,
    badgeColor: 'text-blue-600 bg-blue-50'
  },
  {
    key: 'social_youtube',
    labelAr: 'يوتيوب',
    labelEn: 'YouTube',
    placeholder: 'https://youtube.com/@raya_creative',
    icon: YouTubeIcon,
    badgeColor: 'text-red-600 bg-red-50'
  },
  {
    key: 'social_whatsapp',
    labelAr: 'واتساب للأعمال',
    labelEn: 'WhatsApp',
    placeholder: 'https://wa.me/966501234567',
    icon: WhatsAppIcon,
    badgeColor: 'text-emerald-700 bg-emerald-50'
  },
  {
    key: 'social_behance',
    labelAr: 'بيهانس (معرض الأعمال)',
    labelEn: 'Behance',
    placeholder: 'https://behance.net/raya_creative',
    icon: BehanceIcon,
    badgeColor: 'text-sky-700 bg-sky-50'
  },
  {
    key: 'social_vimeo',
    labelAr: 'فيميو (مكتبة الفيديو)',
    labelEn: 'Vimeo',
    placeholder: 'https://vimeo.com/raya_creative',
    icon: VimeoIcon,
    badgeColor: 'text-sky-600 bg-sky-50'
  },
  {
    key: 'social_threads',
    labelAr: 'ثريدز',
    labelEn: 'Threads',
    placeholder: 'https://threads.net/@raya_creative',
    icon: ThreadsIcon,
    badgeColor: 'text-zinc-800 bg-zinc-100'
  },
  {
    key: 'social_telegram',
    labelAr: 'تيليجرام',
    labelEn: 'Telegram',
    placeholder: 'https://t.me/raya_creative',
    icon: TelegramIcon,
    badgeColor: 'text-sky-500 bg-sky-50'
  },
  {
    key: 'social_pinterest',
    labelAr: 'بينترست',
    labelEn: 'Pinterest',
    placeholder: 'https://pinterest.com/raya_creative',
    icon: PinterestIcon,
    badgeColor: 'text-rose-600 bg-rose-50'
  }
]

export const AdminSocialSettingsTab: React.FC<AdminSocialSettingsTabProps> = ({
  settings,
  onChange
}) => {
  const activeCount = SOCIAL_PLATFORMS.filter(
    (p) => typeof settings[p.key] === 'string' && (settings[p.key] as string).trim().length > 0
  ).length

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DFD3] flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#12372A]/10 text-[#12372A] flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-black text-[#12372A]">
            إدارة ظهور منصات التواصل في الفوتر ({activeCount} من {SOCIAL_PLATFORMS.length} مفعّلة)
          </h4>
          <p className="text-xs text-[#526D60] leading-relaxed">
            المنصة التي تضع لها رابطاً هي فقط التي ستظهر في فوتر الموقع تلقائياً. أي منصة تترك حقلها فارغاً ستكون مخفية تماماً ولن تظهر للزوار.
          </p>
        </div>
      </div>

      {/* Grid of Social Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SOCIAL_PLATFORMS.map(({ key, labelAr, labelEn, placeholder, icon: Icon, badgeColor }) => {
          const rawValue = settings[key]
          const value = typeof rawValue === 'string' ? rawValue : ''
          const isActive = value.trim().length > 0

          return (
            <div
              key={key}
              className={`p-4 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-white border-[#12372A]/30 shadow-xs'
                  : 'bg-[#FAF7F2]/60 border-[#E5DFD3] hover:border-[#12372A]/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${badgeColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#12372A] block leading-tight">{labelAr}</span>
                    <span className="text-[10px] text-[#8C6D46] font-mono leading-none">{labelEn}</span>
                  </div>
                </div>

                {/* Active Indicator */}
                {isActive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    مفعّل بالفوتر
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-500">
                    <EyeOff className="w-3 h-3 text-zinc-400" />
                    مخفي
                  </span>
                )}
              </div>

              <input
                type="url"
                value={value}
                onChange={(e) => onChange({ ...settings, [key]: e.target.value })}
                dir="ltr"
                placeholder={placeholder}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-xs font-mono text-left focus:border-[#12372A] focus:outline-none bg-white transition-colors"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
