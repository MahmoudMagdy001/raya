import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'

import { WhatsAppIcon } from '../ui/icons/WhatsAppIcon'

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

