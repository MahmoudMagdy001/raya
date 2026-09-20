import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

export const MasterCtaSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl sm:rounded-[2rem] bg-[#12372A] text-[#FAF7F2] p-8 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-xl border border-[#1a4a39]">
          
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-black/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#FAF7F2]">
              عندك فكرة أو مشروع؟ <br />
              <span className="text-[#C5A880]">خلّنا نحول فكرتك إلى شيء يستحق الظهور.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAF7F2]/80 leading-relaxed font-normal">
              فريق راية الإبداعي جاهز للجلوس معك، فهم أهدافك بدقة، وتحويل طموحك القادم إلى واقع مرئي وملموس يصنع الفرق.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#C5A880] hover:bg-[#b8996e] text-[#12372A] font-black text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>ابدأ مشروعك</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D9%8A%D8%A9%20%D9%85%D8%B9%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%B1%D8%A7%D9%8A%D8%A9"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 text-[#FAF7F2] border border-white/15 hover:border-[#C5A880]/50 font-bold text-sm sm:text-base transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>تواصل واتساب مباشرة</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

