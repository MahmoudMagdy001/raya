import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../../../components/common/SEO'
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Database,
  UserCheck,
  RefreshCw,
  Mail,
  CheckCircle2,
  Clock,
  Tag,
  ChevronLeft,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react'

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

interface PolicySection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const POLICY_SECTIONS: PolicySection[] = [
  { id: 'intro', title: 'المقدمة والأساس النظامي', icon: ShieldCheck },
  { id: 'data-collected', title: 'البيانات التي نجمعها', icon: Database },
  { id: 'data-usage', title: 'أغراض استخدام البيانات', icon: FileText },
  { id: 'cookies', title: 'ملفات تعريف الارتباط (Cookies)', icon: Layers },
  { id: 'data-security', title: 'أمن البيانات وحمايتها', icon: Lock },
  { id: 'data-sharing', title: 'مشاركة البيانات والإفصاح', icon: Eye },
  { id: 'user-rights', title: 'حقوقك النظامية (نظام PDPL)', icon: UserCheck },
  { id: 'policy-updates', title: 'التعديلات والتحديثات', icon: RefreshCw },
  { id: 'contact-privacy', title: 'التواصل ومسؤول الخصوصية', icon: Mail }
]

export const PrivacyPage: React.FC = () => {
  usePageSeo({
    title: 'سياسة الخصوصية وحماية البيانات',
    description:
      'تعرف على سياسة الخصوصية في راية للإنتاج والتسويق الإبداعي. التزام كامل بنظام حماية البيانات الشخصية السعودي (PDPL) وأعلى معايير الأمان.',
    keywords: 'سياسة الخصوصية, حماية البيانات, راية, PDPL, الأمان الرقمي, الرياض, المملكة العربية السعودية'
  })

  const [activeSection, setActiveSection] = useState<string>('intro')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (let i = POLICY_SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(POLICY_SECTIONS[i].id)
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(POLICY_SECTIONS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id)
    if (elem) {
      const yOffset = -100
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#12372A]">
      {/* ─── Hero Header Section ─── */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden">
        {/* Background Ambient Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F4EFE6] leading-tight">
            سياسة الخصوصية —{' '}
            <span className="relative inline-block text-[#C5A880]">
              حماية بياناتك أولويتنا
              <svg
                className="absolute -bottom-2 right-0 w-full h-3 text-[#C5A880]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#b9d5c7] max-w-2xl mx-auto leading-relaxed">
            نلتزم في راية للإنتاج والتسويق الإبداعي بأعلى معايير الشفافية والأمان في معالجة وحماية بيانات عملائنا وزوارنا، إيماناً بأن الثقة هي أساس كل شراكة إبداعية ناجحة.
          </p>

          {/* Policy Meta Tags */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#8bbba5]">
            <div className="flex items-center gap-1.5 bg-[#0B221A]/70 px-3 py-1.5 rounded-lg border border-[#205341]/50">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>آخر تحديث: مارس 2026</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0B221A]/70 px-3 py-1.5 rounded-lg border border-[#205341]/50">
              <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>الإصدار: 2.1</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0B221A]/70 px-3 py-1.5 rounded-lg border border-[#205341]/50">
              <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>تشفير بيانات عالي المستوى (SSL/TLS)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Highlights Cards (Core Pillars) ─── */}
      <section className="relative -mt-8 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-lg shadow-[#12372A]/5 hover:border-[#C5A880] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center mb-3 group-hover:bg-[#12372A] group-hover:text-[#C5A880] transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">أمن وتشفير سيبراني</h3>
            <p className="text-xs sm:text-sm text-[#6B7F74] leading-relaxed">
              تشفير متقدم لكافة البيانات المرسلة عبر بروتوكولات حماية متطورة تمنع أي وصول غير مصرح به.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-lg shadow-[#12372A]/5 hover:border-[#C5A880] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center mb-3 group-hover:bg-[#12372A] group-hover:text-[#C5A880] transition-colors">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">لا بيع للبيانات</h3>
            <p className="text-xs sm:text-sm text-[#6B7F74] leading-relaxed">
              لا نقوم بمطلق الأحوال ببيع أو تأجير أو المتاجرة ببياناتك الشخصية مع أي طرف تجاري ثالث.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-lg shadow-[#12372A]/5 hover:border-[#C5A880] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center mb-3 group-hover:bg-[#12372A] group-hover:text-[#C5A880] transition-colors">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">حقوقك مكفولة</h3>
            <p className="text-xs sm:text-sm text-[#6B7F74] leading-relaxed">
              يحق لك في أي وقت طلب الاطلاع على بياناتك، تحديثها، أو مسحها بالكامل وفقاً لنظام PDPL.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-lg shadow-[#12372A]/5 hover:border-[#C5A880] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center mb-3 group-hover:bg-[#12372A] group-hover:text-[#C5A880] transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">شفافية تامة</h3>
            <p className="text-xs sm:text-sm text-[#6B7F74] leading-relaxed">
              نوضح بدقة الغرض من كل معلومة نقوم بطلبها وكيفية استثمارها لخدمة مشروعك الإبداعي فقط.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content Layout ─── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sidebar / Quick Navigation (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#F4EFE6]">
                  <div className="w-7 h-7 rounded-lg bg-[#12372A] text-[#C5A880] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#12372A]">محتويات السياسة</h3>
                </div>

                <nav className="space-y-1">
                  {POLICY_SECTIONS.map((sec, idx) => {
                    const Icon = sec.icon
                    const isSelected = activeSection === sec.id
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full flex items-center justify-between text-right px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#12372A] text-[#FAF7F2] font-bold shadow-md shadow-[#12372A]/10'
                            : 'text-[#5B7166] hover:bg-[#F0F6F3] hover:text-[#12372A]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C5A880]' : 'text-[#8BBBA5]'}`} />
                          <span>{sec.title}</span>
                        </div>
                        <span className={`text-[11px] font-mono ${isSelected ? 'text-[#C5A880]' : 'text-[#8BBBA5]/60'}`}>
                          0{idx + 1}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Quick Inquiry Card */}
              <div className="bg-gradient-to-br from-[#12372A] to-[#0B221A] text-[#F4EFE6] p-6 rounded-3xl border border-[#205341] space-y-4 shadow-xl shadow-[#12372A]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 text-[#C5A880]">
                  <HelpCircle className="w-5 h-5" />
                  <h4 className="text-base font-bold">استفسار حول الخصوصية؟</h4>
                </div>
                <p className="text-xs text-[#b9d5c7] leading-relaxed">
                  فريق الامتثال وحماية البيانات لدينا جاهز للإجابة على جميع استفساراتك وحماية حقوقك في أي وقت.
                </p>
                <div className="pt-1 space-y-2">
                  <a
                    href="mailto:privacy@raya.sa"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#C5A880] hover:bg-[#b38e5c] text-[#12372A] font-bold text-xs transition-colors shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>مراسلة مسؤول الخصوصية</span>
                  </a>
                  <a
                    href="https://wa.me/966501234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AD%D9%88%D9%84%20%D8%B3%D9%8A%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9%20%D9%81%D9%8A%20%D8%B1%D8%A7%D9%8A%D8%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#205341] hover:bg-[#174233] text-[#F4EFE6] text-xs font-semibold transition-colors border border-[#C5A880]/30"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>واتساب راية المباشر</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Articles Column */}
            <main className="lg:col-span-8 space-y-10">
              {/* Section 1: Intro */}
              <article
                id="intro"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#12372A] via-[#C5A880] to-[#12372A]" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند الأول</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">المقدمة والأساس النظامي</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    أهلاً بك في منصة <strong>شركة راية للإنتاج والتسويق الإبداعي</strong> («راية»، «نحن»، «لنا»). تم إعداد هذه السياسة لتوضيح الممارسات والإجراءات التي نتبعها في جمع البيانات الشخصية واستخدامها وحمايتها وتخزينها عند زيارتك لموقعنا الإلكتروني أو استخدام خدماتنا في الإنتاج المرئي، الحملات الإعلانية، أو طلبات تقديم المشاريع.
                  </p>
                  <p>
                    تلتزم شركة راية التزاماً تاماً بأحكام <strong>نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) وتعديلاته بالمرسوم الملكي رقم (م/148)</strong> ولائحته التنفيذية المعمول بها في المملكة العربية السعودية، وتحت إشراف الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا - SDAIA).
                  </p>
                  
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#6B7F74] leading-relaxed">
                      باستخدامك لموقع راية أو تزويدنا ببياناتك عبر استمارات التواصل ونماذج بريف المشاريع، فإنك توافق على ممارسات التعامل مع البيانات الموضحة في هذه الوثيقة.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 2: Data Collected */}
              <article
                id="data-collected"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <Database className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند الثاني</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">البيانات التي نقوم بجمعها</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    نجمع البيانات بالحد الأدنى اللازم لتقديم خدماتنا الإبداعية بكفاءة واحترافية. تنقسم هذه البيانات إلى الفئات التالية:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-[#F0F6F3]/60 border border-[#205341]/10 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#12372A]">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>بيانات التواصل والهوية</span>
                      </div>
                      <ul className="text-xs sm:text-sm text-[#6B7F74] space-y-1.5 list-disc list-inside">
                        <li>الاسم الكامل أو اسم ممثل الجهة.</li>
                        <li>اسم المنشأة أو العلامة التجارية.</li>
                        <li>عنوان البريد الإلكتروني المهني.</li>
                        <li>رقم الهاتف المحمول وخدمة الواتساب.</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F0F6F3]/60 border border-[#205341]/10 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#12372A]">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>بيانات بريف المشروع</span>
                      </div>
                      <ul className="text-xs sm:text-sm text-[#6B7F74] space-y-1.5 list-disc list-inside">
                        <li>نوع الخدمة المطلوبة (ريلز، بودكاست، أفلام، إلخ).</li>
                        <li>الميزانية التقديرية ونطاق العمل.</li>
                        <li>الجدول الزمني المستهدف للإطلاق.</li>
                        <li>الملاحظات والمرفقات التوضيحية للعمل.</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F0F6F3]/60 border border-[#205341]/10 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#12372A]">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>البيانات التقنية وبيئة التصفح</span>
                      </div>
                      <ul className="text-xs sm:text-sm text-[#6B7F74] space-y-1.5 list-disc list-inside">
                        <li>عنوان بروتوكول الإنترنت (IP Address) المجهّل.</li>
                        <li>نوع المتصفح ونظام التشغيل.</li>
                        <li>الصفحات التي تمت زيارتها ومدة المكوث.</li>
                        <li>مصدر الإحالة للموقع.</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F0F6F3]/60 border border-[#205341]/10 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#12372A]">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>بيانات التواصل المباشر</span>
                      </div>
                      <ul className="text-xs sm:text-sm text-[#6B7F74] space-y-1.5 list-disc list-inside">
                        <li>سجلات المراسلات عبر الواتساب أو البريد.</li>
                        <li>محاضر اجتماعات التنسيق والمراجعة.</li>
                        <li>الملاحظات والموافقات على الأعمال المنتجة.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 3: Data Usage */}
              <article
                id="data-usage"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند الثالث</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">أغراض استخدام ومعالجة البيانات</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    نستخدم البيانات الشخصية التي نجمعها لأغراض محددة وواضحة ترتبط مباشرة بتقديم خدماتنا وتطوير تجربة شركائنا، وتتضمن:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E5DFD3]">
                      <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#12372A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-[#12372A] text-sm sm:text-base">تحليل البريف وتجهيز عروض الأسعار</h4>
                        <p className="text-xs sm:text-sm text-[#6B7F74] mt-0.5">
                          دراسة تفاصيل مشروعك الإبداعي وإعداد خطة الإنتاج والتسعير وتحديد الجدول الزمني الملائم.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E5DFD3]">
                      <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#12372A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-[#12372A] text-sm sm:text-base">تنفيذ وإدارة العقود والخدمات</h4>
                        <p className="text-xs sm:text-sm text-[#6B7F74] mt-0.5">
                          التواصل التنسيقي اليومي، تسليم المخرجات ومسودات الفيديوهات، ومتابعة التعديلات المعتمدة.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E5DFD3]">
                      <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#12372A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-[#12372A] text-sm sm:text-base">تحسين أداء واستقرار الموقع</h4>
                        <p className="text-xs sm:text-sm text-[#6B7F74] mt-0.5">
                          رصد وتحليل تجربة التصفح وحل أي مشاكل تقنية لضمان سرعة فائقة وتصفح مريح على مختلف الأجهزة.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E5DFD3]">
                      <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#12372A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-[#12372A] text-sm sm:text-base">الامتثال للمتطلبات النظامية</h4>
                        <p className="text-xs sm:text-sm text-[#6B7F74] mt-0.5">
                          الوفاء بالالتزامات الضريبية (هيئة الزكاة والضريبة والجمارك) والتنظيمية السارية في المملكة.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 4: Cookies */}
              <article
                id="cookies"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند الرابع</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">ملفات تعريف الارتباط (Cookies)</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة الموقع لمساعدتنا في تذكر تفضيلاتك وقياس أداء الصفحات.
                  </p>

                  <div className="space-y-3 pt-1">
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                      <h4 className="font-bold text-[#12372A] text-sm mb-1">1. ملفات أساسية وضرورية (Essential Cookies)</h4>
                      <p className="text-xs sm:text-sm text-[#6B7F74]">
                        لا غنى عنها لعمل وظائف الموقع الأساسية، مثل حفظ خيارات الأمان وجلسة التصفح وتمرير الاستمارات.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                      <h4 className="font-bold text-[#12372A] text-sm mb-1">2. ملفات تحليلية وتحسين الأداء (Analytics Cookies)</h4>
                      <p className="text-xs sm:text-sm text-[#6B7F74]">
                        تساعدنا في فهم كيفية تفاعل الزوار مع صفحات الأعمال والخدمات بشكل مجهّل بالكامل، مما يمكننا من تحسين تجربة التصفح.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B7F74]">
                    يمكنك في أي وقت إدارة أو تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك، مع العلم أن تعطيل بعضها قد يؤثر على طريقة عرض الموقع.
                  </p>
                </div>
              </article>

              {/* Section 5: Data Security */}
              <article
                id="data-security"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند الخامس</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">أمن البيانات ومدة الاحتفاظ بها</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    نطبق تدابير وإجراءات أمنية وإدارية وتقنية متقدمة لحماية بياناتك من الوصول غير المصرح به، التغيير، الإفصاح أو الإتلاف العرضي:
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-[#6B7F74]">
                    <li className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>تشفير اتصالات HTTPS وبروتوكولات TLS 1.3</span>
                    </li>
                    <li className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>قواعد بيانات مؤمنة سحابياً بنسخ احتياطي دوري</span>
                    </li>
                    <li className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>صلاحيات وصول مقيدة بدقة لفريق العمل المصرح له</span>
                    </li>
                    <li className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>مراجعات أمنية وفحص ثغرات مستمر</span>
                    </li>
                  </ul>

                  <div className="p-4 rounded-2xl bg-[#F0F6F3] border border-[#205341]/20 space-y-1.5">
                    <h4 className="font-bold text-[#12372A] text-sm">مدة الاحتفاظ بالبيانات:</h4>
                    <p className="text-xs sm:text-sm text-[#335948]">
                      نحتفظ ببياناتك الشخصية فقط للمدة الضرورية لتحقيق الأغراض التي جُمعت من أجلها، أو وفقاً لما تفرضه المتطلبات المحاسبية والنظامية السعودية. بمجرد انتهاء الغرض المشروّع، يتم إتلاف البيانات أو حجب هويتها بأمان تام.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 6: Data Sharing */}
              <article
                id="data-sharing"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <Eye className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند السادس</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">مشاركة البيانات والإفصاح للغير</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    نؤكد بشكل قاطع: <strong>نحن لا نبيع، ولا نؤجر، ولا نتاجر ببياناتك الشخصية لأي طرف ثالث بغرض التسويق المستقل</strong>.
                  </p>

                  <p>
                    يقتصر الإفصاح عن البيانات ومشاركتها في الحالات الحصرية والمحددة التالية فقط:
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3] flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0 mt-2" />
                      <p className="text-xs sm:text-sm text-[#6B7F74]">
                        <strong>مزودو الخدمات المعتمدون:</strong> جهات معالجة تقنية موثوقة (مثل خوادم الاستضافة السحابية الآمنة وخدمات التحليلات المشفرة) والتي تلتزم بتعهدات سرية صارمة مطابقة لأنظمة حماية البيانات.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD3] flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0 mt-2" />
                      <p className="text-xs sm:text-sm text-[#6B7F74]">
                        <strong>الامتثال القضائي والنظامي:</strong> في حال تلقينا أمراً قضائياً أو طلباً رسمياً ملزماً من جهة حكومية أو أمنية مختصة في المملكة العربية السعودية بموجب الأنظمة النافذة.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 7: User Rights (PDPL) */}
              <article
                id="user-rights"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند السابع</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">حقوقك بموجب نظام حماية البيانات السعودي</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    بصفتك صاحب بيانات شخصية، يمنحك نظام حماية البيانات الشخصية السعودي (PDPL) مجموعة من الحقوق الجوهرية التي نحرص على تمكينك من ممارستها بكل يسر:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1">
                      <h4 className="font-bold text-[#12372A] text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>1. الحق في العلم</span>
                      </h4>
                      <p className="text-xs text-[#6B7F74] leading-relaxed">
                        معرفة المسوغ النظامي والغرض من جمع ومعالجة بياناتك والجهات التي قد تُفصح لها.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1">
                      <h4 className="font-bold text-[#12372A] text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>2. الحق في الوصول والاطلاع</span>
                      </h4>
                      <p className="text-xs text-[#6B7F74] leading-relaxed">
                        الحصول على نسخة من بياناتك الشخصية المتاحة لدينا بصيغة واضحة ومقروءة.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1">
                      <h4 className="font-bold text-[#12372A] text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>3. الحق في التصحيح والتحديث</span>
                      </h4>
                      <p className="text-xs text-[#6B7F74] leading-relaxed">
                        طلب تعديل أي بيانات غير دقيقة أو غير مكتملة أو تحديث سجلات التواصل.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1">
                      <h4 className="font-bold text-[#12372A] text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>4. الحق في الإتلاف والمسح</span>
                      </h4>
                      <p className="text-xs text-[#6B7F74] leading-relaxed">
                        طلب إتلاف ومسح بياناتك الشخصية عند انتهاء الحاجة إليها أو عند سحب موافقتك.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F0F6F3] border border-[#205341]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-[#335948]">
                      لممارسة أي من هذه الحقوق، يرجى إرسال طلبك عبر البريد الرسمي وسيقوم فريقنا بالرد عليك خلال مدة أقصاها <strong>30 يوماً</strong>.
                    </p>
                    <a
                      href="mailto:privacy@raya.sa"
                      className="shrink-0 px-4 py-2 rounded-xl bg-[#12372A] text-[#C5A880] text-xs font-bold hover:bg-[#174233] transition-colors"
                    >
                      تقديم طلب حقوق
                    </a>
                  </div>
                </div>
              </article>

              {/* Section 8: Policy Updates */}
              <article
                id="policy-updates"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-5 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <RefreshCw className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند الثامن</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">التعديلات والتحديثات الدورية</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    قد نقوم بتحديث بنود سياسة الخصوصية من وقت لآخر لتعكس أي تغييرات في خدماتنا الإنتاجية أو لمواكبة التحديثات في الأنظمة واللوائح الصادرة عن الجهات التنظيمية في المملكة العربية السعودية.
                  </p>
                  <p>
                    سنقوم بنشر أي تعديل جوهري على هذه الصفحة مع تحديث تاريخ «آخر تحديث» أعلى الوثيقة، ونشجعك على مراجعة هذه الصفحة بصورة دورية للبقاء على اطلاع دائم.
                  </p>
                </div>
              </article>

              {/* Section 9: Contact */}
              <article
                id="contact-privacy"
                className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-sm relative overflow-hidden space-y-6 scroll-mt-28"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F6F3] text-[#12372A] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">البند التاسع</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#12372A]">التواصل ومسؤول حماية البيانات</h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#335948] leading-relaxed">
                  <p>
                    إذا كان لديك أي سؤال، استفسار، أو رغبة في ممارسة حقوقك المتعلقة ببياناتك الشخصية، يسعدنا تواصلك مع مسؤول الخصوصية عبر القنوات التالية:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1.5 text-center sm:text-right">
                      <span className="text-xs text-[#8BBBA5] font-semibold block">البريد المخصص للخصوصية</span>
                      <a
                        href="mailto:privacy@raya.sa"
                        className="font-bold text-[#12372A] hover:text-[#C5A880] text-sm transition-colors block"
                        dir="ltr"
                      >
                        privacy@raya.sa
                      </a>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1.5 text-center sm:text-right">
                      <span className="text-xs text-[#8BBBA5] font-semibold block">الهاتف الموحد</span>
                      <a
                        href="tel:+966501234567"
                        className="font-bold text-[#12372A] hover:text-[#C5A880] text-sm transition-colors block"
                        dir="ltr"
                      >
                        +966 50 123 4567
                      </a>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] space-y-1.5 text-center sm:text-right">
                      <span className="text-xs text-[#8BBBA5] font-semibold block">المقر الرئيسي</span>
                      <span className="font-bold text-[#12372A] text-sm block">
                        الرياض، المملكة العربية السعودية
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Bottom Quick Return Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#F0F6F3] border border-[#205341]/10">
                <div className="space-y-1 text-center sm:text-right">
                  <h4 className="text-sm font-bold text-[#12372A]">هل تود مناقشة مشروع إبداعي جديد؟</h4>
                  <p className="text-xs text-[#6B7F74]">فريق راية بانتظار فكرتك لتحويلها إلى إنتاج يصنع الفرق.</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#174233] text-[#FAF7F2] hover:text-[#C5A880] text-xs font-bold transition-all shadow-md shrink-0"
                >
                  <span>ابدأ مشروعك الآن</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
